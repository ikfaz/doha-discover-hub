import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { filterByTagSlug, getTagCounts, loadBlogList, tagToSlug } from '@/lib/blog';
import type { BlogListItem } from '@/lib/blog';

const BlogTag = () => {
  const { tag } = useParams<{ tag: string }>();
  const tagSlug = tag ?? '';

  const [posts, setPosts] = useState<BlogListItem[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      const loadedPosts = await loadBlogList();
      if (!cancelled) {
        setPosts(loadedPosts);
        setIsLoadingPosts(false);
      }
    };

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  const tags = useMemo(() => getTagCounts(posts), [posts]);
  const currentTag = tags.find((item) => item.slug === tagSlug);
  const taggedPosts = useMemo(() => filterByTagSlug(posts, tagSlug), [posts, tagSlug]);

  const title = currentTag ? `${currentTag.name} Guides in Doha` : 'Tag';
  const seoTitle = currentTag
    ? `${currentTag.name} Doha Guides 2026 | Experience Doha Blog`
    : 'Doha Blog Tags | Experience Doha';
  const description = currentTag
    ? `Explore ${currentTag.count} Doha guide(s) tagged "${currentTag.name}" with practical travel, relocation, and expat planning advice.`
    : 'Browse blog posts by tag.';
  const tagUrl = currentTag ? `https://experiencedoha.com/blog/tag/${tagSlug}` : null;

  const tagJsonLd = useMemo(() => {
    if (!currentTag || !tagUrl) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${currentTag.name} guides for Doha`,
      description,
      url: tagUrl,
    };
  }, [currentTag, tagUrl, description]);

  const itemListJsonLd = useMemo(() => {
    if (!currentTag || !tagUrl) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: taggedPosts.length,
      itemListElement: taggedPosts.slice(0, 12).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: `https://experiencedoha.com/blog/${post.slug}`,
      })),
    };
  }, [currentTag, tagUrl, taggedPosts]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={seoTitle}
        description={description}
        noindex={!currentTag}
        jsonLd={[tagJsonLd, itemListJsonLd].filter(Boolean)}
      />
      <NavBar />

      <section className="bg-qatar-maroon text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">{title}</h1>
          <p className="text-xl max-w-3xl mx-auto">{description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="content-container">
          {taggedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {taggedPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          ) : isLoadingPosts ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading posts...</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-4">No posts with this tag yet</h3>
              <p className="text-gray-500 mb-8">Try another tag from the list below.</p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {tags.slice(0, 20).map((item) => (
                  <Link
                    key={item.slug}
                    to={`/blog/tag/${tagToSlug(item.name)}`}
                    className="px-4 py-2 rounded-full border border-qatar-maroon/20 text-qatar-maroon hover:bg-qatar-maroon hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <Link to="/blog" className="inline-block bg-qatar-maroon hover:bg-qatar-maroon/90 text-white px-6 py-3 rounded-md">
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

export default BlogTag;
