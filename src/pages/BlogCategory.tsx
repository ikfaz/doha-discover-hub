import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { categoryToSlug, filterByCategorySlug, getCategoryCounts, loadBlogList } from '@/lib/blog';
import type { BlogListItem } from '@/lib/blog';

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();
  const categorySlug = category ?? '';

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

  const categories = useMemo(() => getCategoryCounts(posts), [posts]);
  const currentCategory = categories.find((item) => item.slug === categorySlug);
  const categoryPosts = useMemo(() => filterByCategorySlug(posts, categorySlug), [posts, categorySlug]);

  const title = currentCategory ? `${currentCategory.name} in Doha` : 'Category';
  const seoTitle = currentCategory
    ? `${currentCategory.name} Guides in Doha 2026 | Experience Doha Blog`
    : 'Doha Blog Categories | Experience Doha';
  const description = currentCategory
    ? `Read ${currentCategory.count} practical ${currentCategory.name.toLowerCase()} guide(s) for Doha expats and visitors, including costs, planning tips, and local advice.`
    : 'Browse blog posts by topic.';
  const categoryUrl = currentCategory ? `https://experiencedoha.com/blog/category/${categorySlug}` : null;

  const categoryJsonLd = useMemo(() => {
    if (!currentCategory || !categoryUrl) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${currentCategory.name} Guides for Doha`,
      description,
      url: categoryUrl,
    };
  }, [currentCategory, categoryUrl, description]);

  const itemListJsonLd = useMemo(() => {
    if (!currentCategory || !categoryUrl) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: categoryPosts.length,
      itemListElement: categoryPosts.slice(0, 12).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: `https://experiencedoha.com/blog/${post.slug}`,
      })),
    };
  }, [currentCategory, categoryUrl, categoryPosts]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={seoTitle}
        description={description}
        noindex={!currentCategory}
        jsonLd={[categoryJsonLd, itemListJsonLd].filter(Boolean)}
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
          {categoryPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          ) : isLoadingPosts ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading posts...</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-4">No posts in this category yet</h3>
              <p className="text-gray-500 mb-8">Try another topic from the blog.</p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.slice(0, 8).map((item) => (
                  <Link
                    key={item.slug}
                    to={`/blog/category/${categoryToSlug(item.name)}`}
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

export default BlogCategory;
