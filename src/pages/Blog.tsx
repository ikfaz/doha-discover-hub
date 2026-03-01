import React, { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { categoryToSlug, getBlogList, getCategoryCounts, getTagCounts, tagToSlug } from '@/lib/blog';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const posts = useMemo(() => getBlogList(), []);
  const categories = useMemo(() => getCategoryCounts(posts), [posts]);
  const popularTags = useMemo(() => getTagCounts(posts).slice(0, 12), [posts]);

  const query = searchParams.get('q')?.trim() ?? '';
  const queryLower = query.toLowerCase();

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        if (!queryLower) {
          return true;
        }

        return (
          post.title.toLowerCase().includes(queryLower) ||
          post.excerpt.toLowerCase().includes(queryLower) ||
          post.category.toLowerCase().includes(queryLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(queryLower))
        );
      }),
    [posts, queryLower],
  );

  const featuredPost = posts[0];

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Experience Doha Blog',
      description: 'Insights, guides, and stories about life and travel in Qatar',
      url: 'https://experiencedoha.com/blog',
      publisher: {
        '@type': 'Organization',
        name: 'ExperienceDoha.com',
      },
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        image: post.imageUrl,
        datePublished: post.isoDate ?? post.date,
        description: post.excerpt,
        url: `https://experiencedoha.com/blog/${post.slug}`,
      })),
    });

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [posts]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Experience Doha Blog - Qatar Travel Guide & Expat Tips"
        description="Browse expert Doha guides, layover itineraries, expat tips, visa updates, and local insights. Search by topic, category, or tag."
        noindex={Boolean(query)}
      />
      <NavBar />

      <main>
        <section className="bg-qatar-maroon text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Experience Doha Blog</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Expert guides and practical insights for traveling, living, and exploring in Qatar
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="content-container">
            <div className="flex flex-col-reverse lg:flex-row gap-12">
              <div className="lg:w-2/3">
                <div className="mb-8">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search blog posts..."
                      value={query}
                      onChange={(e) => {
                        const next = e.target.value.trimStart();
                        if (next) {
                          setSearchParams({ q: next }, { replace: true });
                        } else {
                          setSearchParams({}, { replace: true });
                        }
                      }}
                      className="pr-10 border-qatar-maroon/30 focus:border-qatar-maroon focus:ring-qatar-maroon"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Search className="h-5 w-5 text-qatar-maroon" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} {...post} />
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No posts found</h3>
                    <p className="text-gray-500">Try a different keyword.</p>
                  </div>
                )}
              </div>

              <div className="lg:w-1/3 space-y-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.slug} className="flex justify-between items-center">
                        <Link
                          to={`/blog/category/${categoryToSlug(category.name)}`}
                          className="text-gray-700 hover:text-qatar-maroon transition-colors"
                        >
                          {category.name}
                        </Link>
                        <Badge variant="outline" className="bg-qatar-maroon/10">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {featuredPost && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Featured Post</h3>
                    <Link to={`/blog/${featuredPost.slug}`} className="block space-y-4">
                      <div className="aspect-video relative overflow-hidden rounded-md">
                        <img
                          src={featuredPost.imageUrl}
                          alt={`${featuredPost.title} - Featured guide for Doha, Qatar`}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                      <Badge className="bg-qatar-gold/10 text-qatar-gold hover:bg-qatar-gold/20">
                        {featuredPost.category}
                      </Badge>
                      <h4 className="font-bold text-lg text-qatar-maroon">{featuredPost.title}</h4>
                      <p className="text-sm text-gray-600">{featuredPost.excerpt}</p>
                    </Link>
                  </div>
                )}

                <div className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Link key={tag.slug} to={`/blog/tag/${tagToSlug(tag.name)}`}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/70">
                          {tag.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="content-container">
            <Newsletter />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
