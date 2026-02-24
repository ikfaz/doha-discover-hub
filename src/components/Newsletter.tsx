import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast({ title: "Success!", description: "You've been subscribed to our newsletter." });
    }, 1000);
  };

  return (
    <div className="bg-secondary text-secondary-foreground py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('newsletter.title')}</h2>
        <p className="text-lg mb-8 text-secondary-foreground/80">{t('newsletter.subtitle')}</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow bg-white/10 border-sand-gold/30 text-white placeholder:text-white/60"
            required
            aria-label={t('newsletter.placeholder')}
          />
          <Button type="submit" className="bg-sand-gold hover:bg-sand-gold/90 text-charcoal font-bold" disabled={isLoading}>
            {isLoading ? '...' : t('newsletter.subscribe')}
          </Button>
        </form>
        <p className="text-sm text-secondary-foreground/60 mt-4">{t('newsletter.privacy')}</p>
      </div>
    </div>
  );
};

export default Newsletter;
