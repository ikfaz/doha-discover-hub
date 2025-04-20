import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription submitted');
  };

  return (
    <footer className="bg-qatar-maroon text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Experience Doha</h3>
            <p className="mb-4 text-sm">
              Your ultimate guide to exploring the vibrant culture, modern attractions, 
              and hidden gems of Doha, Qatar.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-qatar-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm hover:text-qatar-gold transition-colors">About</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-qatar-gold transition-colors">Blog</Link></li>
              <li><Link to="/videos" className="text-sm hover:text-qatar-gold transition-colors">Videos</Link></li>
              <li><Link to="/gallery" className="text-sm hover:text-qatar-gold transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-qatar-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/blog/category/attractions" className="text-sm hover:text-qatar-gold transition-colors">Attractions</Link></li>
              <li><Link to="/blog/category/food" className="text-sm hover:text-qatar-gold transition-colors">Food & Dining</Link></li>
              <li><Link to="/blog/category/culture" className="text-sm hover:text-qatar-gold transition-colors">Cultural Experiences</Link></li>
              <li><Link to="/blog/category/events" className="text-sm hover:text-qatar-gold transition-colors">Local Events</Link></li>
              <li><Link to="/blog/category/expat-tips" className="text-sm hover:text-qatar-gold transition-colors">Expat Tips</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4 text-sm">
              Subscribe to get updates about Doha events and new content.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-white/10 border-qatar-gold text-white placeholder:text-white/70"
                required
              />
              <Button type="submit" className="w-full bg-qatar-gold text-qatar-maroon hover:bg-qatar-sand">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Legal Links and Social Media */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link to="/privacy-policy" className="text-sm hover:text-qatar-gold transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-sm hover:text-qatar-gold transition-colors">Terms of Service</Link>
              <Link to="/cookie-policy" className="text-sm hover:text-qatar-gold transition-colors">Cookie Policy</Link>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-qatar-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-qatar-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-qatar-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-qatar-gold transition-colors">
                <Youtube size={20} />
              </a>
              <a href="mailto:info@experiencedoha.com" className="hover:text-qatar-gold transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
