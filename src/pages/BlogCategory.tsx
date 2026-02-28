
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { blogPosts } from '@/data/articles/blog-data';

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
    lifestyle: {
      title: 'Lifestyle in Doha',
      description: 'Discover luxury shopping, wellness, and modern living in Qatar.',
    },
  };
  
  const currentCategory = category && categoryInfo[category.toLowerCase()] ? categoryInfo[category.toLowerCase()] : { 
    title: category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category', 
    description: `Blog posts in ${category || 'this'} category` 
  };
  
  // Filter posts based on category
  const posts = Object.values(blogPosts).filter(post => 
    category ? post.category.toLowerCase() === category.toLowerCase() : true
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${currentCategory.title} - Experience Doha Blog`}
        description={currentCategory.description}
      />
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
                  slug={post.id}
                  category={post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  excerpt={post.excerpt || post.content.substring(0, 150)}
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
