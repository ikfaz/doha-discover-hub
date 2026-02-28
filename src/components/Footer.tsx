import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { blogPosts } from '@/data/articles/blog-data';

const Footer = () => {
  const { t } = useTranslation();

  const latestNews = Object.entries(blogPosts)
    .map(([slug, post]) => ({ ...post, slug }))
    .sort((a, b) => new Date(b.isoDate || b.date).getTime() - new Date(a.isoDate || a.date).getTime())
    .slice(0, 3);

  return (
    <footer className="bg-secondary text-secondary-foreground pt-12 pb-6" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
            <h3 className="text-xl font-bold mb-4">Social Media</h3>
            <div className="flex flex-col space-y-3">
              <a href="https://www.facebook.com/Experiencedohaqatar" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">
                <Facebook size={18} /> <span>Facebook</span>
              </a>
              <a href="https://www.instagram.com/experiencedoha" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">
                <Instagram size={18} /> <span>Instagram</span>
              </a>
              <a href="https://twitter.com/experiencedoha" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">
                <Twitter size={18} /> <span>Twitter</span>
              </a>
              <a href="https://www.youtube.com/@ExperienceDoha" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">
                <Youtube size={18} /> <span>YouTube</span>
              </a>
              <a href="mailto:info@experiencedoha.com" className="flex items-center space-x-2 text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">
                <Mail size={18} /> <span>Email</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Latest News</h3>
            <ul className="space-y-4">
              {latestNews.map((post) => (
                <li key={post.id}>
                  <Link to={`/blog/${post.slug}`} className="group block">
                    <h4 className="text-sm font-medium text-secondary-foreground/90 group-hover:text-sand-gold transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <span className="text-xs text-secondary-foreground/60">{post.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link to="/privacy-policy" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('footer.privacyPolicy')}</Link>
              <Link to="/terms-of-service" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('footer.termsOfService')}</Link>
              <Link to="/cookie-policy" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">{t('footer.cookiePolicy')}</Link>
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
