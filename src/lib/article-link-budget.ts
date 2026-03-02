import articlePrimaryHubMap from '@/data/articles/article-primary-hub.json';
import { categoryToSlug, type BlogListItem } from '@/lib/blog';
import { getTopicHubBySlug } from '@/lib/topic-hubs';

type PrimaryHubMap = Record<string, string>;

export interface CategoryLink {
  name: string;
  slug: string;
  href: string;
}

export interface ParentHubLink {
  slug: string;
  name: string;
  title: string;
  href: string;
}

export interface ArticleInternalLinkBudget {
  categoryLink: CategoryLink;
  parentHubLink?: ParentHubLink;
  siblingPosts: BlogListItem[];
}

const PRIMARY_HUB_MAP: PrimaryHubMap = articlePrimaryHubMap as PrimaryHubMap;

const toTimestamp = (post: Pick<BlogListItem, 'isoDate' | 'date'>): number => {
  const candidate = post.isoDate ?? post.date;
  const timestamp = Date.parse(candidate);
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const byRecencyThenSlug = (a: BlogListItem, b: BlogListItem): number => {
  const timestampDelta = toTimestamp(b) - toTimestamp(a);
  if (timestampDelta !== 0) {
    return timestampDelta;
  }
  return a.slug.localeCompare(b.slug);
};

const countTagOverlap = (leftTags: string[], rightTags: string[]): number => {
  if (leftTags.length === 0 || rightTags.length === 0) {
    return 0;
  }

  const rightTagSet = new Set(rightTags);
  let overlap = 0;
  for (const tag of leftTags) {
    if (rightTagSet.has(tag)) {
      overlap += 1;
    }
  }
  return overlap;
};

export const getPrimaryHubForSlug = (slug: string): string | undefined => PRIMARY_HUB_MAP[slug];

export const getSiblingPostsForArticle = (
  currentPost: Pick<BlogListItem, 'slug' | 'category' | 'tags' | 'isoDate' | 'date'>,
  allPosts: BlogListItem[],
  primaryHubSlug?: string,
  limit = 3,
): BlogListItem[] => {
  const scored = allPosts
    .filter((candidate) => candidate.slug !== currentPost.slug)
    .map((candidate) => {
      let score = 0;
      if (primaryHubSlug && getPrimaryHubForSlug(candidate.slug) === primaryHubSlug) {
        score += 100;
      }
      if (candidate.category === currentPost.category) {
        score += 30;
      }
      score += 5 * countTagOverlap(currentPost.tags, candidate.tags);

      return { post: candidate, score };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return byRecencyThenSlug(left.post, right.post);
    });

  const ranked = scored.filter((item) => item.score > 0).map((item) => item.post).slice(0, limit);
  if (ranked.length > 0) {
    return ranked;
  }

  if (primaryHubSlug) {
    const sameHubFallback = allPosts
      .filter((candidate) => candidate.slug !== currentPost.slug && getPrimaryHubForSlug(candidate.slug) === primaryHubSlug)
      .sort(byRecencyThenSlug)
      .slice(0, limit);
    if (sameHubFallback.length > 0) {
      return sameHubFallback;
    }
  }

  return allPosts
    .filter((candidate) => candidate.slug !== currentPost.slug)
    .sort(byRecencyThenSlug)
    .slice(0, limit);
};

export const buildArticleInternalLinkBudget = (
  currentPost: Pick<BlogListItem, 'slug' | 'category' | 'tags' | 'isoDate' | 'date'>,
  allPosts: BlogListItem[],
): ArticleInternalLinkBudget => {
  const categorySlug = categoryToSlug(currentPost.category);
  const primaryHubSlug = getPrimaryHubForSlug(currentPost.slug);
  const parentHub = primaryHubSlug ? getTopicHubBySlug(primaryHubSlug) : undefined;

  return {
    categoryLink: {
      name: currentPost.category,
      slug: categorySlug,
      href: `/blog/category/${categorySlug}`,
    },
    parentHubLink: parentHub
      ? {
          slug: parentHub.slug,
          name: parentHub.name,
          title: parentHub.title,
          href: `/blog/topic/${parentHub.slug}`,
        }
      : undefined,
    siblingPosts: getSiblingPostsForArticle(currentPost, allPosts, primaryHubSlug, 3),
  };
};
