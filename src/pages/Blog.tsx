import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock blog post data
  const allPosts = [
    {
      id: '1',
      title: 'Top 10 Must-Visit Attractions in Doha',
      excerpt: 'Discover the most spectacular sights and experiences in Qatar\'s vibrant capital city.',
      imageUrl: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?q=80&w=2668&auto=format&fit=crop',
      category: 'Attractions',
      date: 'April 15, 2025',
      slug: 'top-attractions-doha',
    },
    {
      id: '2',
      title: 'Best Local Restaurants for Authentic Qatari Cuisine',
      excerpt: 'Taste the traditional flavors of Qatar at these local favorite dining spots.',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop',
      category: 'Food',
      date: 'April 10, 2025',
      slug: 'authentic-qatari-cuisine',
    },
    {
      id: '3',
      title: 'Upcoming Cultural Events in Doha This Summer',
      excerpt: 'Mark your calendar for these exciting cultural festivals and events.',
      imageUrl: 'https://images.unsplash.com/photo-1526285759704-71d51dd482ab?q=80&w=2670&auto=format&fit=crop',
      category: 'Events',
      date: 'April 5, 2025',
      slug: 'summer-cultural-events',
    },
    {
      id: '4',
      title: 'A Day at the Museum of Islamic Art',
      excerpt: 'Explore one of Doha\'s most iconic architectural landmarks and its world-class collections.',
      imageUrl: 'https://images.unsplash.com/photo-1558227108-af6eec1a0bb4?q=80&w=2574&auto=format&fit=crop',
      category: 'Attractions',
      date: 'April 2, 2025',
      slug: 'museum-islamic-art',
    },
    {
      id: '5',
      title: 'Shopping Guide: From Traditional Souqs to Luxury Malls',
      excerpt: 'Navigate Doha\'s diverse shopping scene with this comprehensive guide.',
      imageUrl: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2576&auto=format&fit=crop',
      category: 'Lifestyle',
      date: 'March 28, 2025',
      slug: 'doha-shopping-guide',
    },
    {
      id: '6',
      title: 'Essential Tips for Expats Moving to Qatar',
      excerpt: 'Everything you need to know about settling into life in Doha as an expatriate.',
      imageUrl: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=2670&auto=format&fit=crop',
      category: 'Expat-Tips',
      date: 'March 25, 2025',
      slug: 'qatar-expat-guide',
    },
    {
      id: '7',
      title: 'The Art of Arabic Coffee: A Cultural Experience',
      excerpt: 'Learn about the traditions and rituals behind Qatar\'s coffee culture.',
      imageUrl: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=2574&auto=format&fit=crop',
      category: 'Culture',
      date: 'March 20, 2025',
      slug: 'arabic-coffee-culture',
    },
    {
      id: '8',
      title: 'Desert Adventures: Exploring the Inland Sea',
      excerpt: 'Experience the thrill of dune bashing and the serenity of Qatar\'s desert landscape.',
      imageUrl: 'https://images.unsplash.com/photo-1609924206923-4f36e22c94e4?q=80&w=2574&auto=format&fit=crop',
      category: 'Adventures',
      date: 'March 15, 2025',
      slug: 'desert-adventures',
    },
    {
      id: '9',
      title: 'Modern Architecture in Doha: A Visual Journey',
      excerpt: 'Discover the stunning architectural marvels that define Doha\'s skyline.',
      imageUrl: 'https://images.unsplash.com/photo-1577278689329-1914b6814d58?q=80&w=2670&auto=format&fit=crop',
      category: 'Architecture',
      date: 'March 10, 2025',
      slug: 'doha-architecture',
    },
    {
      id: '10',
      title: 'Family-Friendly Activities in Doha',
      excerpt: 'The best entertainment options and activities for families with children.',
      imageUrl: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2576&auto=format&fit=crop',
      category: 'Family',
      date: 'March 5, 2025',
      slug: 'family-activities',
    },
    {
      id: '11',
      title: 'Weekend Getaways Near Doha',
      excerpt: 'Explore nearby destinations perfect for short breaks from the city.',
      imageUrl: 'https://images.unsplash.com/photo-1592568787542-43e11a310fed?q=80&w=2574&auto=format&fit=crop',
      category: 'Travel',
      date: 'March 1, 2025',
      slug: 'weekend-getaways',
    },
    {
      id: '12',
      title: 'Traditional Qatari Crafts and Where to Find Them',
      excerpt: 'A guide to local artisans and traditional handicrafts in Qatar.',
      imageUrl: 'https://images.unsplash.com/photo-1603864331039-7bbe48682bbd?q=80&w=2574&auto=format&fit=crop',
      category: 'Culture',
      date: 'February 25, 2025',
      slug: 'qatari-crafts',
    },
    {
      id: '13',
      title: 'Best Beaches in and Around Doha',
      excerpt: 'Discover the finest coastal spots for swimming, sunbathing, and water sports.',
      imageUrl: 'https://images.unsplash.com/photo-1519885277449-12e839432506?q=80&w=2574&auto=format&fit=crop',
      category: 'Lifestyle',
      date: 'February 20, 2025',
      slug: 'doha-beaches',
    },
    {
      id: '14',
      title: 'Ramadan in Qatar: A Visitor\'s Guide',
      excerpt: 'Everything you need to know about experiencing Ramadan in Doha.',
      imageUrl: 'https://images.unsplash.com/photo-1551109359-8263cb477fde?q=80&w=2574&auto=format&fit=crop',
      category: 'Culture',
      date: 'February 15, 2025',
      slug: 'ramadan-guide',
    },
    {
      id: '15',
      title: 'Sustainable Tourism in Qatar',
      excerpt: 'How to experience Doha while minimizing your environmental impact.',
      imageUrl: 'https://images.unsplash.com/photo-1548794397-ebc0aa4a3275?q=80&w=2574&auto=format&fit=crop',
      category: 'Eco-Tourism',
      date: 'February 10, 2025',
      slug: 'sustainable-tourism',
    },
  ];

  // Filter posts based on search query
  const filteredPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update categories list based on new posts
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

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Header */}
      <section className="bg-qatar-maroon text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">The Experience Doha Blog</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Insights, guides, and stories about life and travel in Qatar's capital
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="content-container">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Blog Posts */}
            <div className="lg:w-2/3">
              {/* Search Bar */}
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
              
              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map(post => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No posts found</h3>
                  <p className="text-gray-500">Try adjusting your search query</p>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
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
              
              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Featured Post</h3>
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1592568787542-43e11a310fed?q=80&w=2574&auto=format&fit=crop" 
                    alt="Featured Post" 
                    className="rounded-md object-cover w-full h-40"
                  />
                  <h4 className="font-bold">Desert Adventure: Experiencing the Inland Sea</h4>
                  <p className="text-sm text-gray-600">
                    Journey to Qatar's spectacular natural wonder for an unforgettable desert experience.
                  </p>
                  <Link 
                    to="/blog/desert-adventure" 
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
                </div>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Follow Us</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1 border-qatar-maroon text-qatar-maroon hover:bg-qatar-maroon/10">
                    YouTube
                  </Button>
                  <Button variant="outline" className="flex-1 border-qatar-maroon text-qatar-maroon hover:bg-qatar-maroon/10">
                    Instagram
                  </Button>
                </div>
              </div>
            </div>
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

export default Blog;
