import { Helmet } from 'react-helmet-async';

interface TravelGuideSchemaProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  url: string;
}

const TravelGuideSchema = ({
  title,
  description,
  author,
  datePublished,
  dateModified,
  imageUrl,
  url,
}: TravelGuideSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Experience Doha',
      logo: {
        '@type': 'ImageObject',
        url: 'https://experiencedoha.com/logo.png',
      },
    },
    description,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default TravelGuideSchema;