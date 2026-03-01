import { blogPosts } from '@/data/articles';
import { fixMojibake, slugify, stripHtml } from '@/lib/text';

export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  isoDate?: string;
  tags: string[];
}

const EXCLUDED_SLUGS = new Set(['default']);

const toTimestamp = (value: { isoDate?: string; date: string }): number => {
  const candidate = value.isoDate ?? value.date;
  const timestamp = new Date(candidate).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
};

export const getBlogList = (): BlogListItem[] =>
  Object.entries(blogPosts)
    .filter(([slug]) => !EXCLUDED_SLUGS.has(slug))
    .map(([slug, post]) => ({
      id: post.id,
      slug,
      title: fixMojibake(post.title),
      excerpt: fixMojibake(post.excerpt ?? stripHtml(post.content).slice(0, 160)),
      imageUrl: post.imageUrl,
      category: fixMojibake(post.category),
      date: fixMojibake(post.date),
      isoDate: post.isoDate,
      tags: (post.tags ?? []).map((tag) => fixMojibake(tag)),
    }))
    .sort((a, b) => toTimestamp(b) - toTimestamp(a));

export const categoryToSlug = (category: string): string => slugify(category);

export const tagToSlug = (tag: string): string => slugify(tag);

export const getCategoryCounts = (posts: BlogListItem[]): Array<{ name: string; slug: string; count: number }> => {
  const counts = new Map<string, number>();

  posts.forEach((post) => {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, slug: categoryToSlug(name), count }))
    .sort((a, b) => b.count - a.count);
};

export const getTagCounts = (posts: BlogListItem[]): Array<{ name: string; slug: string; count: number }> => {
  const counts = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, slug: tagToSlug(name), count }))
    .sort((a, b) => b.count - a.count);
};

export const filterByCategorySlug = (posts: BlogListItem[], categorySlug: string): BlogListItem[] =>
  posts.filter((post) => categoryToSlug(post.category) === categorySlug);

export const filterByTagSlug = (posts: BlogListItem[], tagSlug: string): BlogListItem[] =>
  posts.filter((post) => post.tags.some((tag) => tagToSlug(tag) === tagSlug));
