
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();
  
  // Category information
  const categoryInfo: Record<string, { title: string, description: string }> = {
    attractions: {
      title: 'Attractions in Doha',
      description: 'Discover the most spectacular sights and experiences in Qatar\'s vibrant capital city.',
    },
    food: {
      title: 'Food & Dining in Doha',
      description: 'Explore the culinary scene of Doha from traditional Qatari cuisine to international fine dining.',
    },
    culture: {
      title: 'Qatari Culture',
      description: 'Learn about the rich cultural heritage and traditions of Qatar.',
    },
    events: {
      title: 'Events in Doha',
      description: 'Stay updated with the latest events, festivals, and activities happening in and around Doha.',
    },
    'expat-tips': {
      title: 'Expat Tips',
      description: 'Helpful guides and tips for expatriates living in or moving to Qatar.',
    },
  };
  
  const currentCategory = category ? categoryInfo[category] : { 
    title: 'Category', 
    description: 'Blog posts in this category' 
  };
  
  // Mock blog post data
  const allPosts = [
    {
      id: '1',
      title: 'Top 10 Must-Visit Attractions in Doha',
      excerpt: 'Discover the most spectacular sights and experiences in Qatar\'s vibrant capital city.',
      imageUrl: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?q=80&w=2668&auto=format&fit=crop',
      category: 'attractions',
      date: 'April 15, 2025',
      slug: 'top-attractions-doha',
    },
    {
      id: '4',
      title: 'A Day at the Museum of Islamic Art',
      excerpt: 'Explore one of Doha\'s most iconic architectural landmarks and its world-class collections.',
      imageUrl: 'https://images.unsplash.com/photo-1558227108-af6eec1a0bb4?q=80&w=2574&auto=format&fit=crop',
      category: 'attractions',
      date: 'April 2, 2025',
      slug: 'museum-islamic-art',
    },
    {
      id: '2',
      title: 'Best Local Restaurants for Authentic Qatari Cuisine',
      excerpt: 'Taste the traditional flavors of Qatar at these local favorite dining spots.',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop',
      category: 'food',
      date: 'April 10, 2025',
      slug: 'authentic-qatari-cuisine',
    },
    {
      id: '3',
      title: 'Upcoming Cultural Events in Doha This Summer',
      excerpt: 'Mark your calendar for these exciting cultural festivals and events.',
      imageUrl: 'https://images.unsplash.com/photo-1526285759704-71d51dd482ab?q=80&w=2670&auto=format&fit=crop',
      category: 'events',
      date: 'April 5, 2025',
      slug: 'summer-cultural-events',
    },
    {
      id: '5',
      title: 'Shopping Guide: From Traditional Souqs to Luxury Malls',
      excerpt: 'Navigate Doha\'s diverse shopping scene with this comprehensive guide.',
      imageUrl: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2576&auto=format&fit=crop',
      category: 'lifestyle',
      date: 'March 28, 2025',
      slug: 'doha-shopping-guide',
    },
    {
      id: '6',
      title: 'Essential Tips for Expats Moving to Qatar',
      excerpt: 'Everything you need to know about settling into life in Doha as an expatriate.',
      imageUrl: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=2670&auto=format&fit=crop',
      category: 'expat-tips',
      date: 'March 25, 2025',
      slug: 'qatar-expat-guide',
    },
  ];
  
  // Filter posts based on category
  const posts = category 
    ? allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase())
    : allPosts;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Header */}
      <section className="bg-qatar-maroon text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            {currentCategory.title}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {currentCategory.description}
          </p>
        </div>
      </section>
      
      {/* Blog Posts */}
      <section className="py-16">
        <div className="content-container">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogCard 
                  key={post.id} 
                  {...post} 
                  category={post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-4">No posts in this category yet</h3>
              <p className="text-gray-500 mb-8">Check back soon for new content</p>
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

export default BlogCategory;
