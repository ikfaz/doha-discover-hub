import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, Book, Video, Mail, Image, Calculator, Globe, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.svg';
import MobileMenu from './MobileMenu';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const isRTL = i18n.language === 'ar';

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/about', label: t('nav.about'), icon: null },
    { to: '/blog', label: t('nav.blog'), icon: Book },
    { to: '/videos', label: t('nav.videos'), icon: Video },
    { to: '/gallery', label: t('nav.gallery'), icon: Image },
    { to: '/budget-planner', label: t('nav.budgetPlanner'), icon: Calculator },
    { to: '/contact', label: t('nav.contact'), icon: Mail },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group" aria-label="Experience Doha - Home">
              <img src={logo} alt="" className="h-10 w-10 md:h-12 md:w-12 transition-transform group-hover:scale-105" aria-hidden="true" />
              <span className={`font-semibold text-xl select-none tracking-tight ${isScrolled ? 'text-charcoal' : 'text-white'}`}>
                Experience<span className="text-sand-gold">Doha</span>.com
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className={`hidden lg:flex lg:items-center lg:gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isScrolled 
                    ? 'text-charcoal/80 hover:text-charcoal hover:bg-sand-gold/10' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.icon && <link.icon className="h-4 w-4" aria-hidden="true" />}
                <span>{link.label}</span>
              </Link>
            ))}
            
            <div className="h-6 w-px bg-gray-300/50 mx-2"></div>

            {/* Search Icon */}
            <button 
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-charcoal/80 hover:bg-sand-gold/10' 
                  : 'text-white/90 hover:bg-white/10'
              }`}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ms-2 ${
                isScrolled
                  ? 'text-charcoal/80 hover:text-charcoal hover:bg-sand-gold/10 border-sand-gold/30'
                  : 'text-white/90 hover:text-white hover:bg-white/10 border-white/30'
              }`}
              aria-label={isRTL ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span>{isRTL ? 'EN' : 'عربي'}</span>
            </button>

            {/* Plan Your Trip Button */}
            <Button 
              className={`ml-2 font-semibold ${
                isScrolled 
                  ? 'bg-sand-gold hover:bg-sand-gold/90 text-white' 
                  : 'bg-white text-charcoal hover:bg-white/90'
              }`}
            >
              Plan Your Trip
            </Button>
          </div>
          
          {/* Mobile: language + menu */}
          <div className={`lg:hidden flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled 
                  ? 'text-charcoal/80 hover:bg-sand-gold/10' 
                  : 'text-white/90 hover:bg-white/10'
              }`}
              aria-label={isRTL ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="h-5 w-5" aria-hidden="true" />
            </button>
            <Button 
              variant="ghost" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className={isScrolled ? 'text-charcoal' : 'text-white hover:bg-white/10 hover:text-white'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navLinks={navLinks} 
        isRTL={isRTL} 
      />
    </nav>
  );
};

export default NavBar;
