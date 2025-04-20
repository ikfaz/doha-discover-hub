import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import FeaturedVideo from '@/components/FeaturedVideo';
import BlogCard from '@/components/BlogCard';
import PhotoGallery from '@/components/PhotoGallery';
import Newsletter from '@/components/Newsletter';
import { Diamond, Crown, Trophy } from 'lucide-react';
import YouTubeVideoGrid from '@/components/YouTubeVideoGrid';

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

  const recentVideos = [
    {
      id: 'NJaD4HZOGG0',
      title: 'Exploring Doha\'s Cultural Districts',
      description: 'Join me as I explore the rich cultural heritage and modern attractions in Doha\'s most vibrant neighborhoods.',
    },
    {
      id: 'NJaD4HZOGG0',
      title: 'Best Street Food in Doha',
      description: 'Discover the most delicious street food options in Qatar\'s capital city.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[90vh] bg-qatar-maroon text-white overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=2670&auto=format&fit=crop')",
              filter: "brightness(0.5)",
            }}
          ></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 animate-fade-in">
              Experience the
              <span className="text-qatar-gold block mt-2">Magic of Doha</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-up max-w-2xl">
              Your premium guide to exploring Qatar's most stunning attractions, finest dining, and cultural experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-qatar-gold hover:bg-qatar-gold/90 text-qatar-maroon font-bold text-lg px-8 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                <Link to="/blog">Explore Doha</Link>
              </Button>
              <Button className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all duration-300">
                <Link to="/videos">Watch Videos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2965')] bg-cover bg-fixed opacity-5"></div>
        <div className="content-container relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-qatar-gold/20">
              <Diamond className="w-12 h-12 text-qatar-gold mb-4" />
              <h3 className="text-2xl font-bold text-qatar-maroon mb-2">Premium Experiences</h3>
              <p className="text-gray-600">Discover the finest attractions and hidden gems of Qatar's capital.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-qatar-gold/20">
              <Crown className="w-12 h-12 text-qatar-gold mb-4" />
              <h3 className="text-2xl font-bold text-qatar-maroon mb-2">Cultural Excellence</h3>
              <p className="text-gray-600">Immerse yourself in the rich heritage and modern culture of Qatar.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-qatar-gold/20">
              <Trophy className="w-12 h-12 text-qatar-gold mb-4" />
              <h3 className="text-2xl font-bold text-qatar-maroon mb-2">Curated Content</h3>
              <p className="text-gray-600">Expert recommendations and insider tips for your Doha journey.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Video Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="content-container">
          <h2 className="section-title">Latest Videos</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <FeaturedVideo 
                  videoId="NJaD4HZOGG0" 
                  title="Exploring Doha's Cultural Districts" 
                  description="Join me as I explore the rich cultural heritage and modern attractions in Doha's most vibrant neighborhoods."
                />
              </div>
            </div>
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl p-8 border border-qatar-gold/10">
              <h3 className="text-2xl font-bold mb-4 text-qatar-maroon">About My Channel</h3>
              <p className="text-gray-600 mb-6">
                Welcome to Experience Doha! I create premium videos and articles exploring the best of 
                Qatar's capital city. From historic sites to modern marvels, local cuisine to 
                cultural experiences - I'll be your guide to this fascinating destination.
              </p>
              <Button 
                className="w-full bg-qatar-maroon hover:bg-qatar-maroon/90 text-white rounded-full py-6"
                onClick={() => window.open('https://www.youtube.com/channel/UC-wTo4Yzj8H4KHid3QoFWGA', '_blank')}
              >
                Subscribe on YouTube
              </Button>
            </div>
          </div>

          {/* More Recent Videos */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-qatar-maroon">More Recent Videos</h3>
            <YouTubeVideoGrid videos={recentVideos} />
          </div>
        </div>
      </section>
      
      {/* Featured Blog Posts with Enhanced Design */}
      <section className="py-16 bg-qatar-pearl">
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
      
      {/* Enhanced Photo Gallery */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
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
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <PhotoGallery photos={galleryPhotos} title="" />
          </div>
        </div>
      </section>
      
      {/* Newsletter Section with Enhanced Design */}
      <section className="py-16 bg-qatar-pearl">
        <div className="content-container max-w-5xl">
          <Newsletter />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
