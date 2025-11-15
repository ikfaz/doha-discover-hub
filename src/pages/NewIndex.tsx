import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ListingCard from '@/components/ListingCard';
import CategoryCard from '@/components/CategoryCard';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import { Hotel, UtensilsCrossed, Mountain, MapPin, FileText } from 'lucide-react';
import { listings } from '@/data/listings';

const NewIndex = () => {
  const featuredListings = listings.filter(l => l.featured).slice(0, 6);

  const categories = [
    {
      title: 'Hotels',
      description: 'Luxury stays and boutique accommodations',
      icon: Hotel,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
      link: '/listings?category=hotel'
    },
    {
      title: 'Restaurants',
      description: 'Fine dining and local favorites',
      icon: UtensilsCrossed,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
      link: '/listings?category=restaurant'
    },
    {
      title: 'Activities',
      description: 'Adventures and unique experiences',
      icon: Mountain,
      image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&auto=format&fit=crop',
      link: '/listings?category=activity'
    },
    {
      title: 'Neighborhoods',
      description: 'Explore Doha\'s districts',
      icon: MapPin,
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop',
      link: '/listings?category=neighborhood'
    },
    {
      title: 'Visa Guide',
      description: 'Travel requirements and tips',
      icon: FileText,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop',
      link: '/blog/category/visa'
    }
  ];

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
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero */}
      <section className="relative min-h-[90vh] bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&auto=format&fit=crop"
            alt="Doha skyline"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
              Discover Doha, <span className="text-secondary">Live the Experience</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl">
              Your ultimate guide to Qatar's most stunning attractions, finest dining, and unforgettable experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="text-lg" asChild>
                <Link to="/listings">Explore Doha</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg border-2 border-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/contact">Get Free 3-Day Itinerary PDF</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="content-container">
        <h2 className="section-title">Featured Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {featuredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted/30 py-16">
        <div className="content-container">
          <h2 className="section-title">Top Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="content-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Latest Articles</h2>
          <Link to="/blog" className="text-primary font-medium hover:text-secondary transition-colors">
            View All Articles
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBlogs.map(blog => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/30">
        <div className="content-container max-w-5xl">
          <Newsletter />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NewIndex;
