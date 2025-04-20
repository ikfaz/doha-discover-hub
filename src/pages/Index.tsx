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
      imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&auto=format&fit=crop',
      category: 'Attractions',
      date: 'April 15, 2025',
      slug: 'top-attractions-doha',
    },
    {
      id: '2',
      title: 'Best Local Restaurants for Authentic Qatari Cuisine',
      excerpt: 'Taste the traditional flavors of Qatar at these local favorite dining spots.',
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop',
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
      title: 'Luxury Shopping Guide: Doha\'s Best Malls',
      excerpt: 'Explore the finest shopping destinations in Qatar\'s modern metropolis.',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop',
      category: 'Lifestyle',
      date: 'April 18, 2025',
      slug: 'luxury-shopping-guide',
    },
    {
      id: '5',
      title: 'Desert Adventures: Exploring Qatar\'s Dunes',
      excerpt: 'Experience thrilling desert safaris and traditional Bedouin hospitality.',
      imageUrl: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=800&auto=format&fit=crop',
      category: 'Adventure',
      date: 'April 12, 2025',
      slug: 'desert-adventures',
    },
    {
      id: '6',
      title: 'Modern Art Scene in Doha',
      excerpt: 'Discover contemporary art galleries and installations across the city.',
      imageUrl: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&auto=format&fit=crop',
      category: 'Culture',
      date: 'April 8, 2025',
      slug: 'modern-art-scene',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <section
        className="relative h-[90vh] bg-qatar-maroon text-white overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,13,54,0.85),rgba(212,175,55,0.52)), url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-qatar-maroon/80"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 animate-fade-in">
              ExperienceDoha.com
              <span className="text-qatar-gold block mt-2">Discover Doha,</span>
              <span className="text-qatar-gold block">Live the Experience</span>
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-fixed opacity-10"></div>
        <div className="content-container relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl border border-qatar-gold/30 animate-fade-in">
              <Diamond className="w-12 h-12 text-qatar-gold mb-4" />
              <h3 className="text-2xl font-bold text-qatar-maroon mb-2">Premium Experiences</h3>
              <p className="text-gray-700">
                Discover the finest attractions and hidden gems of Qatar's capital.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl border border-qatar-gold/30 animate-fade-in">
              <Crown className="w-12 h-12 text-qatar-gold mb-4" />
              <h3 className="text-2xl font-bold text-qatar-maroon mb-2">Cultural Excellence</h3>
              <p className="text-gray-700">
                Immerse yourself in the rich heritage and modern culture of Qatar.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl border border-qatar-gold/30 animate-fade-in">
              <Trophy className="w-12 h-12 text-qatar-gold mb-4" />
              <h3 className="text-2xl font-bold text-qatar-maroon mb-2">Curated Content</h3>
              <p className="text-gray-700">
                Expert recommendations and insider tips for your Doha journey.
              </p>
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
