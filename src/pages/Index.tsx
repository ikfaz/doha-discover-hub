import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { categoryToSlug, getCategoryCounts, loadBlogList } from '@/lib/blog';
import type { BlogListItem } from '@/lib/blog';

const Index = () => {
  const [posts, setPosts] = useState<BlogListItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      const loadedPosts = await loadBlogList();
      if (!cancelled) {
        setPosts(loadedPosts);
      }
    };

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredBlogs = useMemo(() => posts.slice(0, 4), [posts]);
  const categories = useMemo(() => getCategoryCounts(posts), [posts]);
  const faqItems = useMemo(
    () => [
      {
        question: 'What are the best things to do in Doha for first-time visitors?',
        answer:
          'Start with Souq Waqif, the Museum of Islamic Art, Katara Cultural Village, a Corniche sunset, and a desert safari for a complete first trip.',
      },
      {
        question: 'Is 24 to 48 hours enough for a Doha layover?',
        answer:
          'Yes. With a clear itinerary, you can cover major highlights, local food, and either a city tour or short desert experience.',
      },
      {
        question: 'How expensive is Doha for expats and travelers in 2026?',
        answer:
          'Costs vary by housing and lifestyle. Our budget planner and cost guides help estimate rent, transport, food, and family expenses.',
      },
      {
        question: 'Do I need a visa to visit or move to Qatar?',
        answer:
          'Visa requirements depend on nationality and trip purpose. Check official rules, then use our visa and relocation guides for practical next steps.',
      },
    ],
    [],
  );

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Experience Doha',
      url: 'https://experiencedoha.com/',
      description:
        'Doha travel and expat guides with practical costs, visa help, and layover itineraries.',
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
  const faqJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }),
    [faqItems],
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Doha Travel Guide 2026: Things To Do, Costs, Visa Tips | Experience Doha"
        description="Planning Doha in 2026? Explore top attractions, realistic living costs, visa guidance, and layover itineraries from local experts."
        jsonLd={[structuredData, faqJsonLd]}
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

      <section className="py-12 bg-muted/20">
        <div className="content-container">
          <h2 className="text-3xl font-bold font-heading mb-6 text-qatar-maroon">Doha Travel FAQs</h2>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <article key={faq.question} className="rounded-lg border bg-background p-5">
                <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </article>
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
