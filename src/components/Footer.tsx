import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const { t } = useTranslation();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription submitted');
  };

  return (
    <footer className="bg-secondary text-secondary-foreground pt-12 pb-6" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Experience Doha</h3>
            <p className="mb-4 text-sm text-secondary-foreground/80">{t('footer.description')}</p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/about" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/blog" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('nav.blog')}</Link></li>
              <li><Link to="/videos" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('nav.videos')}</Link></li>
              <li><Link to="/gallery" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('nav.gallery')}</Link></li>
              <li><Link to="/contact" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">{t('footer.categories')}</h3>
            <ul className="space-y-2">
              <li><Link to="/blog/category/attractions" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('home.attractions')}</Link></li>
              <li><Link to="/blog/category/food" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('home.foodDining')}</Link></li>
              <li><Link to="/blog/category/culture" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('footer.culturalExperiences')}</Link></li>
              <li><Link to="/blog/category/events" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('footer.localEvents')}</Link></li>
              <li><Link to="/blog/category/expat-tips" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('footer.expatTips')}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">{t('footer.newsletter')}</h3>
            <p className="mb-4 text-sm text-secondary-foreground/80">{t('footer.newsletterDesc')}</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input 
                type="email" 
                placeholder={t('footer.emailPlaceholder')}
                className="w-full bg-white/10 border-sand-gold/30 text-white placeholder:text-white/60"
                required
                aria-label={t('footer.emailPlaceholder')}
              />
              <Button type="submit" className="w-full bg-sand-gold text-charcoal hover:bg-sand-gold/90 font-medium">
                {t('footer.subscribe')}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link to="/privacy-policy" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('footer.privacyPolicy')}</Link>
              <Link to="/terms-of-service" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('footer.termsOfService')}</Link>
              <Link to="/cookie-policy" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('footer.cookiePolicy')}</Link>
            </div>
            
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="https://www.facebook.com/Experiencedohaqatar" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-sand-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/experiencedoha" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-sand-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} aria-hidden="true" />
              </a>
              <a href="https://twitter.com/experiencedoha" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-sand-gold transition-colors" aria-label="Twitter">
                <Twitter size={20} aria-hidden="true" />
              </a>
              <a href="https://www.youtube.com/@ExperienceDoha" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-sand-gold transition-colors" aria-label="YouTube">
                <Youtube size={20} aria-hidden="true" />
              </a>
              <a href="mailto:info@experiencedoha.com" className="text-secondary-foreground/80 hover:text-sand-gold transition-colors" aria-label="Email">
                <Mail size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-foreground/60">© {new Date().getFullYear()} ExperienceDoha.com. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
