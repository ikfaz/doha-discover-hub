import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { categoryToSlug, getBlogList, getCategoryCounts } from '@/lib/blog';

const Index = () => {
  const posts = useMemo(() => getBlogList(), []);
  const featuredBlogs = useMemo(() => posts.slice(0, 4), [posts]);
  const categories = useMemo(() => getCategoryCounts(posts), [posts]);

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Experience Doha',
      url: 'https://experiencedoha.com/',
      description:
        'Your guide to exploring Doha, Qatar. Discover attractions, expat tips, layover guides, and local insights.',
      inLanguage: 'en-US',
      publisher: {
        '@type': 'Organization',
        name: 'Experience Doha',
        url: 'https://experiencedoha.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://experiencedoha.com/logo.png',
        },
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://experiencedoha.com/blog?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      sameAs: [
        'https://www.facebook.com/Experiencedohaqatar',
        'https://www.instagram.com/experiencedoha',
        'https://twitter.com/experiencedoha',
      ],
    }),
    [],
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Experience Doha - Ultimate Guide to Qatar Travel & Living"
        description="Plan your Doha trip or move with confidence. Practical guides on visa rules, cost of living, layovers, and local experiences in Qatar."
        jsonLd={structuredData}
      />
      <NavBar />

      <section className="bg-secondary text-secondary-foreground py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Experience Doha: Your Guide to Qatar
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-secondary-foreground/80">
            Expert guides on attractions, food, culture, layovers, and expat life in Qatar&apos;s capital
          </p>
        </div>
      </section>

      <section className="featured-blogs py-16">
        <div className="content-container">
          <h2 className="text-3xl font-bold font-heading mb-8 text-qatar-maroon">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                imageUrl={blog.imageUrl}
                category={blog.category}
                date={blog.date}
                slug={blog.slug}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/blog"
              className="text-qatar-maroon font-medium hover:text-qatar-gold transition-colors inline-flex items-center"
            >
              View All Articles
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="content-container">
          <h2 className="text-3xl font-bold font-heading mb-6 text-qatar-maroon">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/blog/category/${categoryToSlug(cat.name)}`}
                className="px-5 py-2.5 rounded-full border border-qatar-maroon/20 text-qatar-maroon font-medium hover:bg-qatar-maroon hover:text-white transition-colors"
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16" id="newsletter">
        <div className="content-container">
          <Newsletter />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
