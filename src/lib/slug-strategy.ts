const YEAR_TOKEN_REGEX = /\b(20\d{2})\b/g;

const extractYear = (value: string): number | null => {
  const matches = [...value.matchAll(YEAR_TOKEN_REGEX)].map((match) => Number(match[1]));
  if (matches.length === 0) {
    return null;
  }

  // Pick the newest year token when multiple appear.
  return Math.max(...matches);
};

export const getSlugYear = (slug: string): number | null => extractYear(slug);

export const getTitleYear = (title: string): number | null => extractYear(title);

export const hasHistoricalYearSlug = (slug: string, title: string): boolean => {
  const slugYear = getSlugYear(slug);
  const titleYear = getTitleYear(title);
  if (!slugYear || !titleYear) {
    return false;
  }

  return slugYear < titleYear;
};

export const getHistoricalSlugCanonicalNote = (slug: string, title: string): string | null => {
  if (!hasHistoricalYearSlug(slug, title)) {
    return null;
  }

  const slugYear = getSlugYear(slug);
  const titleYear = getTitleYear(title);
  if (!slugYear || !titleYear) {
    return null;
  }

  return `This URL keeps its original ${slugYear} slug for link stability. Content is updated for ${titleYear}.`;
};
