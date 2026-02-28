import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, Book, Video, Mail, Image, Calculator, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.svg';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
    <nav className="glass sticky top-0 z-50 transition-all duration-300" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between h-20 items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group" aria-label="Experience Doha - Home">
              <img src={logo} alt="" className="h-14 w-14 transition-transform group-hover:scale-105" aria-hidden="true" />
              <span className="text-charcoal font-semibold text-xl select-none tracking-tight">
                Experience<span className="text-sand-gold">Doha</span>.com
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className={`hidden md:flex md:items-center md:gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-charcoal/80 hover:text-charcoal hover:bg-sand-gold/10 transition-all duration-200"
              >
                {link.icon && <link.icon className="h-4 w-4" aria-hidden="true" />}
                <span>{link.label}</span>
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-charcoal/80 hover:text-charcoal hover:bg-sand-gold/10 transition-all duration-200 border border-sand-gold/30 ms-2"
              aria-label={isRTL ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span>{isRTL ? 'EN' : 'عربي'}</span>
            </button>
          </div>
          
          {/* Mobile: language + menu */}
          <div className={`md:hidden flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-charcoal/80 hover:bg-sand-gold/10 transition-colors"
              aria-label={isRTL ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="h-5 w-5" aria-hidden="true" />
            </button>
            <Button 
              variant="ghost" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="text-charcoal"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-sand-gold/20 animate-fade-in" role="menu">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                role="menuitem"
                className={`block px-4 py-3 rounded-lg text-base font-medium text-charcoal/80 hover:text-charcoal hover:bg-sand-gold/10 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
