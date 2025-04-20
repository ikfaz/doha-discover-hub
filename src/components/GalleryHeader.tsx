
import React from 'react';
import { BookText } from 'lucide-react';

const GalleryHeader = () => {
  return (
    <section className="bg-qatar-maroon text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-qatar-gold/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <BookText className="w-8 h-8 text-qatar-gold" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Explore Doha</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Discover the beauty, culture, and modern marvels of Qatar's vibrant capital through our curated collection of photographs
        </p>
      </div>
    </section>
  );
};

export default GalleryHeader;
