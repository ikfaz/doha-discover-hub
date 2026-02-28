import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  keywords?: string;
}

const BASE_URL = 'https://experiencedoha.com';

export const SEOHead = ({
  title = 'Experience Doha - Qatar Travel & Attractions Guide 2026',
  description = 'Your go-to Doha guide: attractions, layover tips, expat advice, food, and culture. Plan your perfect Qatar trip with 60+ expert articles.',
  image = 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=2670&auto=format&fit=crop',
  type = 'website',
  publishedTime,
  author = 'ExperienceDoha.com',
  jsonLd,
  noindex = false,
  keywords,
}: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}${location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ExperienceDoha.com" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@experiencedoha" />

      {jsonLd && (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
