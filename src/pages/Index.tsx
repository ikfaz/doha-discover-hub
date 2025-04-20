import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import { Diamond, Crown, Trophy } from 'lucide-react';

const Index = () => {
  const featuredBlogs = [
    {
      id: '1',
      title: 'Top 10 Must-Visit Attractions in Doha',
      excerpt: 'Discover the most spectacular sights and experiences in Qatar\'s vibrant capital city.',
      imageUrl: 'https://images.unsplash.com/photo-1593412323862-ff34100754c4?q=80&w=800&auto=format&fit=crop',
      category: 'Attractions',
      date: 'April 15, 2025',
      slug: 'top-attractions-doha',
    },
    {
      id: '2',
      title: 'Best Local Restaurants for Authentic Qatari Cuisine',
      excerpt: 'Taste the traditional flavors of Qatar at these local favorite dining spots.',
      imageUrl: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop',
      category: 'Food',
      date: 'April 10, 2025',
      slug: 'authentic-qatari-cuisine',
    },
    {
      id: '3',
      title: 'Upcoming Cultural Events in Doha This Summer',
      excerpt: 'Mark your calendar for these exciting cultural festivals and events.',
      imageUrl: 'https://images.unsplash.com/photo-1590238816987-368dde4d893d?q=80&w=800&auto=format&fit=crop',
      category: 'Events',
      date: 'April 5, 2025',
      slug: 'summer-cultural-events',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
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
