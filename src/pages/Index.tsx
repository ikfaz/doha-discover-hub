import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { blogPosts } from '@/data/articles/blog-data';

const Index = () => {
  const featuredBlogs = Object.values(blogPosts)
    .sort((a, b) => new Date(b.isoDate || b.date).getTime() - new Date(a.isoDate || a.date).getTime())
    .slice(0, 4);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Experience Doha',
    url: 'https://www.experiencedoha.com/',
    description:
      'Your ultimate guide to exploring Doha, Qatar. Discover top attractions, cultural insights, expat tips, and hidden gems in Qatar\'s vibrant capital.',
    keywords: [
      'Doha',
      'Qatar',
      'Things to do in Doha',
      'Expat guide Doha',
      'Qatar travel guide',
      'Doha attractions',
      'Qatar culture',
      'Living in Doha',
    ],
    author: {
      '@type': 'Organization',
      name: 'Experience Doha',
      url: 'https://www.experiencedoha.com/',
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    publisher: {
      '@type': 'Organization',
      name: 'Experience Doha',
      url: 'https://www.experiencedoha.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.experiencedoha.com/logo.png',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.experiencedoha.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://www.facebook.com/experiencedoha',
      'https://www.instagram.com/experiencedoha',
      'https://twitter.com/experiencedoha',
    ],
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Experience Doha - Ultimate Guide to Qatar Travel & Living"
        description="Plan your Doha trip or move with confidence. 2026 guides on visa rules, cost of living, layovers, salaries, and hidden gems in Qatar."
      />
      <NavBar />

      {/* Hero H1 Section */}
      <section className="bg-secondary text-secondary-foreground py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Experience Doha: Your Guide to Qatar
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-secondary-foreground/80">
            Expert guides on attractions, food, culture, layovers, and expat life in Qatar's capital
          </p>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="featured-blogs py-16">
        <div className="content-container">
          <h2 className="text-3xl font-bold font-heading mb-8 text-qatar-maroon">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBlogs.slice(0, 4).map((blog) => (
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-12">
        <div className="content-container">
          <h2 className="text-3xl font-bold font-heading mb-6 text-qatar-maroon">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {['Attractions', 'Food', 'Culture', 'Events', 'Lifestyle', 'Expat-Tips'].map(cat => (
              <Link
                key={cat}
                to={`/blog/category/${cat.toLowerCase()}`}
                className="px-5 py-2.5 rounded-full border border-qatar-maroon/20 text-qatar-maroon font-medium hover:bg-qatar-maroon hover:text-white transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="content-container">
          <Newsletter />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
