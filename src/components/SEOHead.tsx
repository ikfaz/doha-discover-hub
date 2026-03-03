import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { buildCanonicalUrl } from '@/lib/canonical-url';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  author?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://experiencedoha.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;
const DEFAULT_OG_IMAGE_TYPE = 'image/jpeg';

const toAbsoluteUrl = (value?: string): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith('/')) {
    return `${BASE_URL}${trimmed}`;
  }

  return `${BASE_URL}/${trimmed.replace(/^\.?\//, '')}`;
};

const getOgImageType = (url: string): string | undefined => {
  if (/\.jpe?g($|\?)/i.test(url)) {
    return 'image/jpeg';
  }
  if (/\.png($|\?)/i.test(url)) {
    return 'image/png';
  }
  if (/\.webp($|\?)/i.test(url)) {
    return 'image/webp';
  }
  if (/\.svg($|\?)/i.test(url)) {
    return 'image/svg+xml';
  }
  return undefined;
};

export const SEOHead = ({
  title = 'Experience Doha - Qatar Travel & Attractions Guide 2026',
  description = 'Your go-to Doha guide: attractions, layover tips, expat advice, food, and culture. Plan your perfect Qatar trip with 60+ expert articles.',
  image,
  type = 'website',
  author = 'ExperienceDoha.com',
  noindex = false,
}: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = buildCanonicalUrl(BASE_URL, location.pathname, location.search);
  const ogImage = toAbsoluteUrl(image) || DEFAULT_OG_IMAGE;
  const ogImageType = getOgImageType(ogImage) || DEFAULT_OG_IMAGE_TYPE;
  const isDefaultOgImage = ogImage === DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content={ogImageType} />
      {isDefaultOgImage ? <meta property="og:image:width" content="1200" /> : null}
      {isDefaultOgImage ? <meta property="og:image:height" content="630" /> : null}
      <meta property="og:site_name" content="ExperienceDoha.com" />
    </Helmet>
  );
};

export default SEOHead;
