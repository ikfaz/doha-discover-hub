import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookText } from 'lucide-react';

const GalleryHeader = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-secondary text-secondary-foreground py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-sand-gold/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <BookText className="w-8 h-8 text-sand-gold" aria-hidden="true" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">{t('gallery.title')}</h1>
        <p className="text-xl max-w-3xl mx-auto text-secondary-foreground/80">{t('gallery.subtitle')}</p>
      </div>
    </section>
  );
};

export default GalleryHeader;
