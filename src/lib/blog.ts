import { blogMetaPosts } from '@/data/articles/blog-meta';
import { fixMojibake, slugify } from '@/lib/text';
import { getPrimaryTopicMetaForPost } from '@/lib/topic-hubs';

export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  isoDate?: string;
  primaryTopicSlug?: string;
  primaryTopicName?: string;
  // Legacy keyword tags retained for transition safety; no longer used as public taxonomy.
  tags: string[];
}

const EXCLUDED_SLUGS = new Set(['default']);

const toTimestamp = (value: { isoDate?: string; date: string }): number => {
  const candidate = value.isoDate ?? value.date;
  const timestamp = new Date(candidate).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
};

export const getBlogList = (): BlogListItem[] =>
  Object.entries(blogMetaPosts)
    .filter(([slug]) => !EXCLUDED_SLUGS.has(slug))
    .map(([slug, post]) => {
      const primaryTopic = getPrimaryTopicMetaForPost(slug);
      return {
        id: post.id,
        slug,
        title: fixMojibake(post.title),
        excerpt: fixMojibake(post.excerpt ?? post.metaDescription ?? post.title),
        imageUrl: post.imageUrl,
        category: fixMojibake(post.category),
        date: fixMojibake(post.date),
        isoDate: post.isoDate,
        primaryTopicSlug: primaryTopic?.slug,
        primaryTopicName: primaryTopic?.name,
        tags: (post.tags ?? []).map((tag) => fixMojibake(tag)),
      };
    })
    .sort((a, b) => toTimestamp(b) - toTimestamp(a));

export const categoryToSlug = (category: string): string => slugify(category);

export const getCategoryCounts = (posts: BlogListItem[]): Array<{ name: string; slug: string; count: number }> => {
  const counts = new Map<string, number>();

  posts.forEach((post) => {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, slug: categoryToSlug(name), count }))
    .sort((a, b) => b.count - a.count);
};

export const filterByCategorySlug = (posts: BlogListItem[], categorySlug: string): BlogListItem[] =>
  posts.filter((post) => categoryToSlug(post.category) === categorySlug);
