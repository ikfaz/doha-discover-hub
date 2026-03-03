import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { buildCanonicalUrl } from '@/lib/canonical-url';

interface SEOHeadProps {
  title?: string;
  description?: string;
  author?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://experiencedoha.com';

export const SEOHead = ({
  title = 'Experience Doha - Qatar Travel & Attractions Guide 2026',
  description = 'Your go-to Doha guide: attractions, layover tips, expat advice, food, and culture. Plan your perfect Qatar trip with 60+ expert articles.',
  author = 'ExperienceDoha.com',
  noindex = false,
}: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = buildCanonicalUrl(BASE_URL, location.pathname, location.search);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEOHead;
