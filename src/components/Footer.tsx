import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined;
    if (!endpoint) {
      toast({
        title: 'Newsletter unavailable',
        description: 'Set VITE_NEWSLETTER_ENDPOINT to enable subscriptions.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });

      if (!response.ok) {
        throw new Error(`Subscription failed: ${response.status}`);
      }

      setEmail('');
      toast({ title: 'Subscribed', description: 'You have been added to the newsletter.' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Subscription failed',
        description: 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h4 className="text-sm font-semibold mt-5 mb-2">Topic Hubs</h4>
            <ul className="space-y-2">
              <li><Link to="/blog/topic/visa" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">Visa and Residency</Link></li>
              <li><Link to="/blog/topic/housing" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">Housing and Rent</Link></li>
              <li><Link to="/blog/topic/metro" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">Metro and Transit</Link></li>
              <li><Link to="/blog/topic/airport" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">Airport and Layovers</Link></li>
              <li><Link to="/blog/topic/jobs" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">Jobs and Salaries</Link></li>
              <li><Link to="/blog/topic/cost-of-living" className="text-sm text-secondary-foreground/80 hover:text-sand-gold transition-colors">Cost of Living</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">{t('footer.newsletter')}</h3>
            <p className="mb-4 text-sm text-secondary-foreground/80">{t('footer.newsletterDesc')}</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
                className="w-full bg-white/10 border-sand-gold/30 text-white placeholder:text-white/60"
                required
                aria-label={t('footer.emailPlaceholder')}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sand-gold text-charcoal hover:bg-sand-gold/90 font-medium"
              >
                {isSubmitting ? 'Submitting...' : t('footer.subscribe')}
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
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-foreground/60">&copy; {new Date().getFullYear()} ExperienceDoha.com. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
