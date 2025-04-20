import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import FeaturedVideo from '@/components/FeaturedVideo';
import BlogCard from '@/components/BlogCard';
import PhotoGallery from '@/components/PhotoGallery';
import Newsletter from '@/components/Newsletter';

const Index = () => {
  // Mock data
  const featuredBlogs = [
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
  ];

  const galleryPhotos = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1558227108-af6eec1a0bb4?q=80&w=2574&auto=format&fit=crop',
      alt: 'Museum of Islamic Art',
      caption: 'Museum of Islamic Art',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1577278689329-1914b6814d58?q=80&w=2670&auto=format&fit=crop',
      alt: 'Doha Skyline',
      caption: 'Doha Skyline at Night',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1603864331039-7bbe48682bbd?q=80&w=2574&auto=format&fit=crop',
      alt: 'Souq Waqif',
      caption: 'Traditional Souq Waqif',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1609924206923-4f36e22c94e4?q=80&w=2574&auto=format&fit=crop',
      alt: 'Desert Safari',
      caption: 'Desert Safari Experience',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative bg-qatar-maroon text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1578895101408-1a6986a3a449?q=80&w=2574&auto=format&fit=crop')",
              filter: "brightness(0.4)",
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 animate-fade-in">
              Discover the Magic of Doha
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-up">
              Your ultimate guide to exploring Qatar's vibrant capital city.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-qatar-gold hover:bg-qatar-gold/90 text-qatar-maroon font-bold text-lg px-8 py-6">
                <Link to="/blog">Explore Doha</Link>
              </Button>
              <Button className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold text-lg px-8 py-6">
                <Link to="/videos">Watch Videos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Video Section */}
      <section className="bg-gray-50 py-16">
        <div className="content-container">
          <h2 className="section-title">Latest Video</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FeaturedVideo 
                videoId="NJaD4HZOGG0" 
                title="Exploring Doha's Cultural Districts" 
                description="Join me as I explore the rich cultural heritage and modern attractions in Doha's most vibrant neighborhoods."
              />
            </div>
            <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-qatar-maroon">About My Channel</h3>
              <p className="text-gray-600 mb-6">
                Welcome to Experience Doha! I create videos and articles exploring the best of 
                Qatar's capital city. From historic sites to modern marvels, local cuisine to 
                cultural experiences - I'll be your guide to this fascinating destination.
              </p>
              <Button 
                className="w-full bg-qatar-maroon hover:bg-qatar-maroon/90 text-white"
                onClick={() => window.open('https://www.youtube.com/channel/UC-wTo4Yzj8H4KHid3QoFWGA', '_blank')}
              >
                Subscribe on YouTube
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Blog Posts */}
      <section className="py-16">
        <div className="content-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Latest Articles</h2>
            <Link 
              to="/blog" 
              className="text-qatar-maroon font-medium hover:text-qatar-gold transition-colors"
            >
              View All Articles
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Photo Gallery Preview */}
      <section className="bg-gray-50 py-16">
        <div className="content-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Photo Gallery</h2>
            <Link 
              to="/gallery" 
              className="text-qatar-maroon font-medium hover:text-qatar-gold transition-colors"
            >
              View Full Gallery
            </Link>
          </div>
          <PhotoGallery photos={galleryPhotos} title="" />
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="content-container">
          <Newsletter />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
