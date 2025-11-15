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
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const allPosts = [
    {
      id: '18',
      title: '9-Hour Stopover in Qatar: Is It Worth Exploring?',
      excerpt: 'A detailed analysis of whether you should leave the airport during a 9-hour layover - weighing benefits, risks, and practical considerations.',
      imageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&auto=format&fit=crop',
      category: 'Expat-Tips',
      date: 'April 27, 2025',
      slug: '9-hour-stopover-qatar-worth-it',
    },
    {
      id: '17',
      title: 'Stopover in Qatar: Discover Qatar - Why Visit',
      excerpt: 'Explore what makes Qatar a world-class destination beyond just a transit point - from cultural attractions to safety, dining, and natural landscapes.',
      imageUrl: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=800&auto=format&fit=crop',
      category: 'Culture',
      date: 'April 26, 2025',
      slug: 'discover-qatar-stopover-guide',
    },
    {
      id: '16',
      title: '24 Hours in Doha: Complete Qatar Airways Itinerary',
      excerpt: 'Make the most of a full day in Doha with this detailed 24-hour itinerary - from sunrise on the Corniche to evening dhow cruises.',
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
      category: 'Attractions',
      date: 'April 25, 2025',
      slug: '24-hours-doha-qatar-airways',
    },
    {
      id: '15',
      title: 'Layover in Doha Guide: What to Do in 2–12 Hours',
      excerpt: 'Detailed breakdown of what you can realistically accomplish during layovers of different lengths - from 2 hours to a full day in Doha.',
      imageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&auto=format&fit=crop',
      category: 'Expat-Tips',
      date: 'April 24, 2025',
      slug: 'doha-layover-time-guide',
    },
    {
      id: '14',
      title: 'How to Spend the Perfect Layover in Doha, Qatar',
      excerpt: 'Master the art of the Doha layover with expert tips on timing, transportation, attractions, and making every hour count during your stopover.',
      imageUrl: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=800&auto=format&fit=crop',
      category: 'Expat-Tips',
      date: 'April 23, 2025',
      slug: 'perfect-layover-doha-guide',
    },
    {
      id: '13',
      title: '10 Unmissable Things To Do In Doha On A Layover (2025)',
      excerpt: 'Make the most of your Doha layover with these incredible experiences - from museums and souqs to desert safaris and cultural villages.',
      imageUrl: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=800&auto=format&fit=crop',
      category: 'Attractions',
      date: 'April 22, 2025',
      slug: 'things-to-do-doha-layover',
    },
    {
      id: '12',
      title: 'Transfers at Hamad International Airport: Complete Guide',
      excerpt: 'Navigate one of the world\'s finest airports with ease. From security to shopping, everything you need to know about connecting through Doha.',
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop',
      category: 'Expat-Tips',
      date: 'April 21, 2025',
      slug: 'hamad-airport-transfers-guide',
    },
    {
      id: '11',
      title: 'Complete Doha Layover Guide: Qatar Stopover Program Explained',
      excerpt: 'Transform your layover into an adventure with Qatar Airways\' amazing stopover program. Hotels from $14/night, visa-free entry, and world-class experiences await.',
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop',
      category: 'Expat-Tips',
      date: 'April 20, 2025',
      slug: 'qatar-stopover-program-guide',
    },
    {
      id: '1',
      title: 'Top 10 Must-Visit Attractions in Doha',
      excerpt: 'Discover the most spectacular sights and experiences in Qatar\'s vibrant capital city.',
      imageUrl: 'https://images.unsplash.com/photo-1510382291698-79dd5a410d6e?w=800&auto=format&fit=crop',
      category: 'Attractions',
      date: 'April 15, 2025',
      slug: 'top-attractions-doha',
    },
    {
      id: '2',
      title: 'Best Local Restaurants for Authentic Qatari Cuisine',
      excerpt: 'Taste the traditional flavors of Qatar at these local favorite dining spots.',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
      category: 'Food',
      date: 'April 10, 2025',
      slug: 'authentic-qatari-cuisine',
    },
    {
      id: '3',
      title: 'Upcoming Cultural Events in Doha This Summer',
      excerpt: 'Mark your calendar for these exciting cultural festivals and events.',
      imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop',
      category: 'Events',
      date: 'April 5, 2025',
      slug: 'summer-cultural-events',
    },
    {
      id: '4',
      title: 'A Day at the Museum of Islamic Art',
      excerpt: 'Explore one of Doha\'s most iconic architectural landmarks and its world-class collections.',
      imageUrl: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&auto=format&fit=crop',
      category: 'Attractions',
      date: 'April 2, 2025',
      slug: 'museum-islamic-art',
    },
    {
      id: '5',
      title: 'Shopping Guide: From Traditional Souqs to Luxury Malls',
      excerpt: 'Navigate Doha\'s diverse shopping scene with this comprehensive guide.',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop',
      category: 'Lifestyle',
      date: 'March 28, 2025',
      slug: 'doha-shopping-guide',
    },
    {
      id: '6',
      title: 'Essential Tips for Expats Moving to Qatar',
      excerpt: 'Everything you need to know about settling into life in Doha as an expatriate.',
      imageUrl: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&auto=format&fit=crop',
      category: 'Expat-Tips',
      date: 'March 25, 2025',
      slug: 'qatar-expat-guide',
    },
    {
      id: '7',
      title: 'The Art of Arabic Coffee: A Cultural Experience',
      excerpt: 'Learn about the traditions and rituals behind Qatar\'s coffee culture.',
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop',
      category: 'Culture',
      date: 'March 20, 2025',
      slug: 'arabic-coffee-culture',
    },
    {
      id: '8',
      title: 'Desert Adventures: Exploring the Inland Sea',
      excerpt: 'Experience the thrill of dune bashing and the serenity of Qatar\'s desert landscape.',
      imageUrl: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=800&auto=format&fit=crop',
      category: 'Adventures',
      date: 'March 15, 2025',
      slug: 'desert-adventures',
    },
    {
      id: '9',
      title: 'Modern Architecture in Doha: A Visual Journey',
      excerpt: 'Discover the stunning architectural marvels that define Doha\'s skyline.',
      imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&auto=format&fit=crop',
      category: 'Architecture',
      date: 'March 10, 2025',
      slug: 'doha-architecture',
    },
    {
      id: '10',
      title: 'Family-Friendly Activities in Doha',
      excerpt: 'The best entertainment options and activities for families with children.',
      imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop',
      category: 'Family',
      date: 'March 5, 2025',
      slug: 'family-activities',
    },
    {
      id: '11',
      title: 'Weekend Getaways Near Doha',
      excerpt: 'Explore nearby destinations perfect for short breaks from the city.',
      imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format&fit=crop',
      category: 'Travel',
      date: 'March 1, 2025',
      slug: 'weekend-getaways',
    },
    {
      id: '12',
      title: 'Traditional Qatari Crafts and Where to Find Them',
      excerpt: 'A guide to local artisans and traditional handicrafts in Qatar.',
      imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop',
      category: 'Culture',
      date: 'February 25, 2025',
      slug: 'qatari-crafts',
    },
    {
      id: '13',
      title: 'Best Beaches in and Around Doha',
      excerpt: 'Discover the finest coastal spots for swimming, sunbathing, and water sports.',
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop',
      category: 'Lifestyle',
      date: 'February 20, 2025',
      slug: 'doha-beaches',
    },
    {
      id: '14',
      title: 'Ramadan in Qatar: A Visitor\'s Guide',
      excerpt: 'Everything you need to know about experiencing Ramadan in Doha.',
      imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop',
      category: 'Culture',
      date: 'February 15, 2025',
      slug: 'ramadan-guide',
    },
    {
      id: '15',
      title: 'Sustainable Tourism in Qatar',
      excerpt: 'How to experience Doha while minimizing your environmental impact.',
      imageUrl: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=800&auto=format&fit=crop',
      category: 'Eco-Tourism',
      date: 'February 10, 2025',
      slug: 'sustainable-tourism',
    },
  ];

  const filteredPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = allPosts.find(post => post.id === '8') || {
    id: '8',
    title: 'Desert Adventures: Exploring the Inland Sea',
    excerpt: 'Journey to Qatar\'s spectacular natural wonder for an unforgettable desert experience.',
    imageUrl: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=800&auto=format&fit=crop',
    category: 'Adventures',
    date: 'March 15, 2025',
    slug: 'desert-adventures',
  };

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
      
      <section className="bg-qatar-maroon text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">The Experience Doha Blog</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Insights, guides, and stories about life and travel in Qatar's capital
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="content-container">
          <div className="flex flex-col lg:flex-row gap-12">
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
                        alt={featuredPost.title} 
                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
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
                      to={`/blog/${featuredPost.slug}`} 
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
                    onClick={() => window.open('https://www.youtube.com/@ExperienceDoha', '_blank')}
                  >
                    YouTube
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-qatar-maroon text-qatar-maroon hover:bg-qatar-maroon/10"
                    onClick={() => window.open('https://instagram.com', '_blank')}
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
      
      <Footer />
    </div>
  );
};

export default Blog;
