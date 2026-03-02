import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { getCategoryArchiveIntro } from '@/lib/archive-intros';
import { categoryToSlug, filterByCategorySlug, getBlogList, getCategoryCounts } from '@/lib/blog';

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();
  const categorySlug = category ?? '';

  const posts = useMemo(() => getBlogList(), []);
  const categories = useMemo(() => getCategoryCounts(posts), [posts]);
  const currentCategory = categories.find((item) => item.slug === categorySlug);
  const categoryPosts = useMemo(() => filterByCategorySlug(posts, categorySlug), [posts, categorySlug]);

  const title = currentCategory ? `${currentCategory.name} in Doha` : 'Category';
  const description = currentCategory
    ? getCategoryArchiveIntro(currentCategory.name, currentCategory.count, categoryPosts)
    : 'Browse blog posts by topic.';

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${title} - Experience Doha Blog`}
        description={description}
        noindex={!currentCategory || currentCategory.count <= 1}
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
