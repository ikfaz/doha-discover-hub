import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { getBlogList } from '@/lib/blog';
import { getTopicHubBySlug, getTopicHubPosts, getTopicHubs } from '@/lib/topic-hubs';

const BlogTopicHub = () => {
  const { topic } = useParams<{ topic: string }>();
  const topicSlug = topic ?? '';

  const posts = useMemo(() => getBlogList(), []);
  const allHubs = useMemo(() => getTopicHubs(), []);
  const currentHub = useMemo(() => getTopicHubBySlug(topicSlug), [topicSlug]);
  const hubPosts = useMemo(() => (currentHub ? getTopicHubPosts(posts, currentHub) : []), [posts, currentHub]);

  const title = currentHub ? currentHub.title : 'Topic Hub';
  const description = currentHub
    ? currentHub.metaDescription
    : 'Browse curated topic hubs for practical Doha and Qatar guidance.';
  const intro = currentHub
    ? currentHub.intro
    : 'Explore curated topic clusters to find related posts faster.';

  const topicJsonLd = useMemo(() => {
    if (!currentHub || hubPosts.length === 0) {
      return undefined;
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${currentHub.name} Topic Hub`,
      description: currentHub.metaDescription,
      url: `https://experiencedoha.com/blog/topic/${currentHub.slug}`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: hubPosts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://experiencedoha.com/blog/${post.slug}`,
          name: post.title,
        })),
      },
    };
  }, [currentHub, hubPosts]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${title} - Experience Doha Blog`}
        description={description}
        noindex={!currentHub || hubPosts.length <= 1}
        jsonLd={topicJsonLd}
      />
      <NavBar />

      <section className="bg-qatar-maroon text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">{title}</h1>
          <p className="text-xl max-w-3xl mx-auto">{intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="content-container">
          {hubPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hubPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-4">No posts in this topic hub yet</h3>
              <p className="text-gray-500 mb-8">Try another topic cluster from the list below.</p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {allHubs.map((hub) => (
                  <Link
                    key={hub.slug}
                    to={`/blog/topic/${hub.slug}`}
                    className="px-4 py-2 rounded-full border border-qatar-maroon/20 text-qatar-maroon hover:bg-qatar-maroon hover:text-white transition-colors"
                  >
                    {hub.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/blog"
                className="inline-block bg-qatar-maroon hover:bg-qatar-maroon/90 text-white px-6 py-3 rounded-md"
              >
                Back to All Posts
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="content-container">
          <Newsletter />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogTopicHub;
