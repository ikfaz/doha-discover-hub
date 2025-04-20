
import React from 'react';

interface Photo {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  title: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, title }) => {
  return (
    <div className="w-full">
      <h2 className="section-title">{title}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group overflow-hidden rounded-lg">
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {photo.caption && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-end transition-opacity duration-300">
                <div className="p-4 text-white">
                  <p>{photo.caption}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
