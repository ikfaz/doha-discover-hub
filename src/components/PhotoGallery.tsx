
import React from 'react';
import { Card } from '@/components/ui/card';

interface Photo {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  category?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  title: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, title }) => {
  return (
    <div className="w-full">
      {title && <h2 className="section-title mb-8">{title}</h2>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden group rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {photo.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 flex items-end transition-opacity duration-300">
                  <div className="p-4 text-white">
                    <p className="text-sm md:text-base font-medium">{photo.caption}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
