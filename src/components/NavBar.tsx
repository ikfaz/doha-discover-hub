
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Book, Video, Mail, Image, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.svg';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <img src={logo} alt="Experience Doha Logo" className="h-16 w-16" />
              <span className="text-qatar-maroon font-semibold text-xl select-none">ExperienceDoha.com</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="flex items-center text-gray-700 hover:text-qatar-maroon transition-colors">
              <Home className="h-4 w-4 mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center text-gray-700 hover:text-qatar-maroon transition-colors">
              <span>About</span>
            </Link>
            <Link to="/blog" className="flex items-center text-gray-700 hover:text-qatar-maroon transition-colors">
              <Book className="h-4 w-4 mr-1" />
              <span>Blog</span>
            </Link>
            <Link to="/videos" className="flex items-center text-gray-700 hover:text-qatar-maroon transition-colors">
              <Video className="h-4 w-4 mr-1" />
              <span>Videos</span>
            </Link>
            <Link to="/gallery" className="flex items-center text-gray-700 hover:text-qatar-maroon transition-colors">
              <Image className="h-4 w-4 mr-1" />
              <span>Gallery</span>
            </Link>
            <Link to="/budget-planner" className="flex items-center text-gray-700 hover:text-qatar-maroon transition-colors">
              <Calculator className="h-4 w-4 mr-1" />
              <span>Budget Planner</span>
            </Link>
            <Link to="/contact" className="flex items-center text-gray-700 hover:text-qatar-maroon transition-colors">
              <Mail className="h-4 w-4 mr-1" />
              <span>Contact</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-qatar-maroon hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-qatar-maroon hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/blog" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-qatar-maroon hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/videos" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-qatar-maroon hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Videos
            </Link>
            <Link 
              to="/gallery" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-qatar-maroon hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              to="/budget-planner" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-qatar-maroon hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Budget Planner
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-qatar-maroon hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

