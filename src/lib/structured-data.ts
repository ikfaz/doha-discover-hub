export type JsonLdAuthor = {
  '@type': 'Person' | 'Organization';
  name: string;
};

const ORGANIZATION_AUTHOR_PATTERNS: RegExp[] = [
  /\bteam\b/i,
  /experiencedoha/i,
  /experience doha/i,
  /\.com$/i,
];

export const toJsonLdAuthor = (name?: string): JsonLdAuthor => {
  const normalized = (name ?? 'Experience Doha Team').trim() || 'Experience Doha Team';
  const isOrganization = ORGANIZATION_AUTHOR_PATTERNS.some((pattern) => pattern.test(normalized));

  return {
    '@type': isOrganization ? 'Organization' : 'Person',
    name: normalized,
  };
};
