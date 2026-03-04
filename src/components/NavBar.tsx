import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, Book, Mail, Image, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/about', label: t('nav.about'), icon: null },
    { to: '/blog', label: t('nav.blog'), icon: Book },
    { to: '/gallery', label: t('nav.gallery'), icon: Image },
    { to: '/budget-planner', label: t('nav.budgetPlanner'), icon: Calculator },
    { to: '/contact', label: t('nav.contact'), icon: Mail },
  ];

  return (
    <nav className="glass sticky top-0 z-50 transition-all duration-300" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group" aria-label="Experience Doha - Home">
              <img src="/logo.png" alt="" className="h-14 w-14 transition-transform group-hover:scale-105" aria-hidden="true" />
              <span className="text-charcoal font-semibold text-xl select-none tracking-tight">
                Experience<span className="text-sand-gold">Doha</span>.com
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-1">
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
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="text-charcoal"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass border-t border-sand-gold/20 animate-fade-in" role="menu">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                role="menuitem"
                className="block px-4 py-3 rounded-lg text-base font-medium text-charcoal/80 hover:text-charcoal hover:bg-sand-gold/10 transition-colors text-left"
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
