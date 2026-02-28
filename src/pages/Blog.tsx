import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { blogPosts } from '@/data/articles/blog-data';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const allPosts = Object.values(blogPosts).sort((a, b) => 
    new Date(b.isoDate || b.date).getTime() - new Date(a.isoDate || a.date).getTime()
  );

  const filteredPosts = allPosts.filter(post => 
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    post.excerpt
  );

  const featuredPost = allPosts.find(post => post.id === '30') || allPosts[0];

  const categories = [
    { name: 'Attractions', count: allPosts.filter(post => post.category === 'Attractions').length },
    { name: 'Food', count: allPosts.filter(post => post.category === 'Food').length },
    { name: 'Culture', count: allPosts.filter(post => post.category === 'Culture').length },
    { name: 'Events', count: allPosts.filter(post => post.category === 'Events').length },
    { name: 'Lifestyle', count: allPosts.filter(post => post.category === 'Lifestyle').length },
    { name: 'Adventures', count: allPosts.filter(post => post.category === 'Adventures').length },
    { name: 'Architecture', count: allPosts.filter(post => post.category === 'Architecture').length },
    { name: 'Family', count: allPosts.filter(post => post.category === 'Family').length },
    { name: 'Travel', count: allPosts.filter(post => post.category === 'Travel').length },
    { name: 'Eco-Tourism', count: allPosts.filter(post => post.category === 'Eco-Tourism').length },
    { name: 'Expat-Tips', count: allPosts.filter(post => post.category === 'Expat-Tips').length },
  ];

  // Structured Data for SEO
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Experience Doha Blog",
      "description": "Insights, guides, and stories about life and travel in Qatar's capital",
      "url": "https://experiencedoha.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "ExperienceDoha.com"
      },
      "blogPost": allPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.imageUrl,
        "datePublished": post.date,
        "description": post.excerpt,
        "url": `https://experiencedoha.com/blog/${post.id}`
      }))
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Experience Doha Blog - Qatar Travel Guide & Expat Tips"
        description="Browse 60+ expert guides on Doha — from layover itineraries and expat tips to visa rules and hidden restaurants. Updated weekly."
      />
      <NavBar />
      
      <main>
          <section className="bg-qatar-maroon text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Experience Doha Blog - Qatar Travel Guide</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Expert insights, guides, and stories about life and travel in Qatar's vibrant capital
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 border-qatar-maroon/30 focus:border-qatar-maroon focus:ring-qatar-maroon"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Search className="h-5 w-5 text-qatar-maroon" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map(post => (
                  <BlogCard key={post.id} {...post} slug={post.id} excerpt={post.excerpt || ''} />
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No posts found</h3>
                  <p className="text-gray-500">Try adjusting your search query</p>
                </div>
              )}
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.name} className="flex justify-between items-center">
                      <Link 
                        to={`/blog/category/${category.name.toLowerCase()}`}
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
              
              <Card className="shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Featured Post</h3>
                </div>
                {isLoading ? (
                  <div className="px-6 pb-6 space-y-4">
                    <Skeleton className="w-full h-40" />
                    <Skeleton className="w-3/4 h-4" />
                    <Skeleton className="w-full h-16" />
                    <Skeleton className="w-1/4 h-4" />
                  </div>
                ) : (
                  <CardContent className="pt-0 space-y-4">
                    <div className="aspect-video relative overflow-hidden rounded-md">
                      <img 
                        src={featuredPost.imageUrl} 
                        alt={`${featuredPost.title} - Featured guide for Doha, Qatar`}
                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <Badge className="bg-qatar-gold/10 text-qatar-gold hover:bg-qatar-gold/20">
                      {featuredPost.category}
                    </Badge>
                    <h4 className="font-bold text-lg text-qatar-maroon">{featuredPost.title}</h4>
                    <p className="text-sm text-gray-600">
                      {featuredPost.excerpt}
                    </p>
                    <Link 
                      to={`/blog/${featuredPost.id}`} 
                      className="text-qatar-maroon font-medium hover:text-qatar-gold transition-colors inline-flex items-center"
                    >
                      Read More
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
                  </CardContent>
                )}
              </Card>
              
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Follow Us</h3>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-qatar-maroon text-qatar-maroon hover:bg-qatar-maroon/10"
                    onClick={() => window.open('https://www.youtube.com/@ExperienceDoha', '_blank', 'noopener,noreferrer')}
                  >
                    YouTube
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-qatar-maroon text-qatar-maroon hover:bg-qatar-maroon/10"
                    onClick={() => window.open('https://instagram.com', '_blank', 'noopener,noreferrer')}
                  >
                    Instagram
                  </Button>
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
