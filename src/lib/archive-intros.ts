import type { BlogListItem } from '@/lib/blog';
import { categoryToSlug } from '@/lib/blog';

const CATEGORY_EDITORIAL_INTROS: Record<string, string> = {
  attractions:
    'Editorial picks for museums, souqs, waterfront walks, and signature Doha sights that are worth your time.',
  culture:
    'Context-rich guides to Qatari traditions, etiquette, and cultural landmarks for visitors and new residents.',
  events:
    'Curated event coverage with practical planning details, timing context, and what to prioritize first.',
  'expat-tips':
    'Practical expat guidance on visas, housing, salaries, and daily life decisions in Doha and wider Qatar.',
  food: 'Local food coverage focused on where to start, what to order, and how to understand the Doha dining scene.',
  lifestyle:
    'Lifestyle coverage on neighborhoods, routines, and high-value ways to navigate day-to-day life in Doha.',
};

const getArticleLabel = (count: number): string => `${count} article${count === 1 ? '' : 's'}`;

const toCategoryList = (categories: string[]): string => {
  if (categories.length === 0) {
    return 'our Doha coverage';
  }
  if (categories.length === 1) {
    return categories[0];
  }
  if (categories.length === 2) {
    return `${categories[0]} and ${categories[1]}`;
  }
  return `${categories[0]}, ${categories[1]}, and ${categories[2]}`;
};

export const getCategoryArchiveIntro = (
  categoryName: string | undefined,
  postCount: number,
  posts: BlogListItem[],
): string => {
  if (!categoryName) {
    return 'Explore Doha blog topics with practical, editorially reviewed guides for planning and daily life.';
  }

  const slug = categoryToSlug(categoryName);
  const baseIntro =
    CATEGORY_EDITORIAL_INTROS[slug] ??
    `Editorial guides on ${categoryName} with practical context for traveling, living, and planning in Doha.`;
  const leadTitle = posts[0]?.title;
  const leadSentence = leadTitle ? ` Start with "${leadTitle}" for a quick entry point.` : '';

  return `${baseIntro} This archive currently includes ${getArticleLabel(postCount)}.${leadSentence}`;
};

export const getTagArchiveIntro = (
  tagName: string | undefined,
  postCount: number,
  posts: BlogListItem[],
): string => {
  if (!tagName) {
    return 'Browse topic tags to find specific Doha guides, comparisons, and local planning advice.';
  }

  const leadTitle = posts[0]?.title;
  const relatedCategories = Array.from(new Set(posts.map((post) => post.category))).slice(0, 3);
  const categoryContext = toCategoryList(relatedCategories);
  const leadSentence = leadTitle ? ` Start with "${leadTitle}".` : '';

  return `Focused coverage on ${tagName} in ${categoryContext}. This tag currently includes ${getArticleLabel(
    postCount,
  )}.${leadSentence}`;
};
