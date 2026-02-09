import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}

const BASE_URL = 'https://experiencedoha.com';

export const SEOHead = ({
  title = 'Experience Doha - Ultimate Guide to Qatar Travel & Attractions 2026',
  description = 'Discover the best things to do in Doha, Qatar. Expert guides on attractions, culture, food, layovers, and experiences. Plan your perfect Qatar visit.',
  image = 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=2670&auto=format&fit=crop',
  type = 'website',
  publishedTime,
  author = 'ExperienceDoha.com',
}: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}${location.pathname}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ExperienceDoha.com" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@experiencedoha" />
    </Helmet>
  );
};

export default SEOHead;
