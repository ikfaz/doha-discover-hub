import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import { Diamond, Crown, Trophy } from 'lucide-react';
import desertSafariImage from '@/assets/desert-safari-inland-sea.jpg';
import museumsImage from '@/assets/mia-nmoq-museums.jpg';
import souqWaqifImage from '@/assets/souq-waqif-night.jpg';
import layoverImage from '@/assets/doha-layover-experience.jpg';
import qatarAirwaysImage from '@/assets/qatar-airways-stopover.jpg';
import cornicheSunsetImage from '@/assets/corniche-sunset-dhow.jpg';
import alcoholGuideImage from '@/assets/alcohol-guide-doha.jpg';
import prostitutionLawsImage from '@/assets/prostitution-laws-legal-guide.jpg';

const Index = () => {
  const featuredBlogs = [
    {
      id: '32',
      title: 'Prostitution in Doha, Qatar: Is It Legal? (2025 Complete Guide)',
      excerpt: 'Everything tourists and expats need to know about prostitution laws, penalties, safety, and scams in Qatar. A comprehensive legal guide for visitors.',
      imageUrl: prostitutionLawsImage,
      category: 'Expat-Tips',
      date: 'May 11, 2025',
      slug: 'prostitution-laws-doha-qatar-guide',
    },
    {
      id: '31',
      title: 'Is Drinking Alcohol Allowed in Doha, Qatar? (2025 Full Guide)',
      excerpt: 'Your ultimate tourist-friendly guide to alcohol rules, prices, licensed venues, and nightlife in Doha. Everything you need to know about drinking legally in Qatar.',
      imageUrl: alcoholGuideImage,
      category: 'Expat-Tips',
      date: 'May 10, 2025',
      slug: 'alcohol-allowed-doha-qatar-guide',
    },
    {
      id: '30',
      title: 'The Ultimate Arabian Adventure: Desert Safari and Inland Sea',
      excerpt: 'Experience the thrill of dune bashing and the serenity of Khor Al Adaid - your complete guide to Qatar\'s quintessential desert safari adventure.',
      imageUrl: desertSafariImage,
      category: 'Attractions',
      date: 'May 9, 2025',
      slug: 'desert-safari-inland-sea-khor-al-adaid',
    },
    {
      id: '29',
      title: 'A Tale of Two Museums: MIA + NMoQ Combo Guide',
      excerpt: 'Discover Qatar\'s cultural treasures with our guide to visiting the Museum of Islamic Art and National Museum of Qatar using the Discover One Pass.',
      imageUrl: museumsImage,
      category: 'Culture',
      date: 'May 8, 2025',
      slug: 'mia-nmoq-museum-combo-guide',
    },
    {
      id: '28',
      title: 'The Heart of Doha After Dark: Souq Waqif Night Experiences',
      excerpt: 'Discover Souq Waqif at night - from authentic Qatari dining and shisha cafés to mastering the art of haggling in the ancient market alleyways.',
      imageUrl: souqWaqifImage,
      category: 'Culture',
      date: 'May 7, 2025',
      slug: 'souq-waqif-night-experiences-haggling',
    },
    {
      id: '27',
      title: 'The Ultimate 24-48 Hour Layover in Doha: A Complete Guide',
      excerpt: 'Transform your Doha layover into a mini-vacation with our detailed 24-hour dash and 48-hour exploration itineraries, from cultural highlights to desert adventures.',
      imageUrl: layoverImage,
      category: 'Expat-Tips',
      date: 'May 6, 2025',
      slug: 'ultimate-doha-layover-24-48-hours',
    },
    {
      id: '26',
      title: 'Qatar Airways Stopover Packages: Two Holidays in One',
      excerpt: 'Discover how to turn your layover into a free mini-vacation with Qatar Airways stopover packages and exclusive lounge access benefits.',
      imageUrl: qatarAirwaysImage,
      category: 'Expat-Tips',
      date: 'May 5, 2025',
      slug: 'qatar-airways-stopover-packages-lounge',
    },
    {
      id: '23',
      title: 'The Golden Hour in Doha: Corniche Sunset and Dhow Cruise',
      excerpt: 'Experience the magic of Doha\'s Corniche at sunset, followed by a traditional dhow cruise - the perfect romantic evening in Qatar.',
      imageUrl: cornicheSunsetImage,
      category: 'Attractions',
      date: 'May 4, 2025',
      slug: 'corniche-sunset-dhow-cruise-guide',
    },
  ];

  // Structured Data for SEO
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ExperienceDoha.com",
      "url": "https://experiencedoha.com",
      "description": "Comprehensive guide to Doha attractions, culture, dining, and travel experiences in Qatar",
      "publisher": {
        "@type": "Organization",
        "name": "ExperienceDoha.com"
      }
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main>
          <section className="relative h-[90vh] bg-qatar-maroon text-white overflow-hidden">
            <div className="absolute inset-0">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105" 
                role="img"
                aria-label="Panoramic view of Doha skyline and corniche"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop')",
                  filter: "brightness(0.5)",
                }}
              ></div>
            </div>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
