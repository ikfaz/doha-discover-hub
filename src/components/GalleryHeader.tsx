
import React from 'react';
import { BookText } from 'lucide-react';

const GalleryHeader = () => {
  return (
    <section
      className="bg-qatar-maroon text-white py-12 md:py-16"
      style={{
        backgroundImage: "linear-gradient(rgba(139,13,54,0.92),rgba(212,175,55,0.45)), url('https://images.unsplash.com/photo-1519648023493-d82b5f8d7fd7?auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-qatar-gold/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <BookText className="w-8 h-8 text-qatar-gold" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 drop-shadow-lg">Explore Doha</h1>
        <p className="text-xl max-w-3xl mx-auto drop-shadow">
          Discover the beauty, culture, and modern marvels of Qatar's vibrant capital through our curated collection of photographs
        </p>
      </div>
    </section>
  );
};

export default GalleryHeader;
