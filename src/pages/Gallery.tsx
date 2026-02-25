
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import GalleryHeader from '@/components/GalleryHeader';
import GalleryTabs from '@/components/GalleryTabs';
import galleryMia from '@/assets/gallery-mia.jpg';
import gallerySkyline from '@/assets/gallery-skyline.jpg';
import gallerySouq from '@/assets/gallery-souq.jpg';
import galleryDesertSafari from '@/assets/gallery-desert-safari.jpg';
import galleryWestBay from '@/assets/gallery-west-bay.jpg';
import galleryKatara from '@/assets/gallery-katara.jpg';
import galleryFood from '@/assets/gallery-qatari-food.jpg';
import galleryFestival from '@/assets/gallery-festival.jpg';
import galleryDesertLandscape from '@/assets/gallery-desert-landscape.jpg';
import galleryPearl from '@/assets/gallery-pearl.jpg';
import galleryShopping from '@/assets/gallery-shopping.jpg';
import galleryNmoq from '@/assets/gallery-nmoq.jpg';
import galleryCoffee from '@/assets/gallery-coffee.jpg';
import galleryCorniche from '@/assets/gallery-corniche.jpg';
import galleryDhow from '@/assets/gallery-dhow.jpg';

const Gallery = () => {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Gallery data with categorized photos
  const allPhotos = [
    {
      id: '1',
      url: galleryMia,
      alt: 'Museum of Islamic Art at sunset',
      caption: 'The iconic Museum of Islamic Art designed by I.M. Pei',
      category: 'landmarks',
    },
    {
      id: '2',
      url: gallerySkyline,
      alt: 'Doha Skyline at night',
      caption: 'Doha\'s magnificent skyline illuminated at night',
      category: 'cityscapes',
    },
    {
      id: '3',
      url: gallerySouq,
      alt: 'Souq Waqif traditional market',
      caption: 'The bustling traditional market of Souq Waqif',
      category: 'culture',
    },
    {
      id: '4',
      url: galleryDesertSafari,
      alt: 'Desert Safari adventure in Qatar',
      caption: 'Adventure in the dunes during a desert safari',
      category: 'experiences',
    },
    {
      id: '5',
      url: galleryWestBay,
      alt: 'West Bay modern architecture',
      caption: 'Modern architectural marvels in West Bay district',
      category: 'cityscapes',
    },
    {
      id: '6',
      url: galleryKatara,
      alt: 'Katara Cultural Village amphitheater',
      caption: 'The beautiful Katara Cultural Village',
      category: 'culture',
    },
    {
      id: '7',
      url: galleryFood,
      alt: 'Traditional Qatari cuisine spread',
      caption: 'Delicious traditional Qatari cuisine',
      category: 'food',
    },
    {
      id: '8',
      url: galleryFestival,
      alt: 'Cultural festival with traditional dancers',
      caption: 'Celebration of culture at a local festival',
      category: 'culture',
    },
    {
      id: '9',
      url: galleryDesertLandscape,
      alt: 'Qatar desert landscape at sunset',
      caption: 'The stunning desert landscape outside Doha',
      category: 'experiences',
    },
    {
      id: '10',
      url: galleryPearl,
      alt: 'The Pearl Qatar luxury marina',
      caption: 'Luxury living at The Pearl-Qatar',
      category: 'landmarks',
    },
    {
      id: '11',
      url: galleryShopping,
      alt: 'Luxury shopping mall interior',
      caption: 'World-class shopping experience in Doha',
      category: 'experiences',
    },
    {
      id: '12',
      url: galleryNmoq,
      alt: 'National Museum of Qatar architecture',
      caption: 'The stunning National Museum of Qatar',
      category: 'landmarks',
    },
    {
      id: '13',
      url: galleryCoffee,
      alt: 'Traditional Arabic coffee service with dates',
      caption: 'Arabic coffee service with dates - a symbol of Qatari hospitality',
      category: 'culture',
    },
    {
      id: '14',
      url: galleryCorniche,
      alt: 'Doha Corniche waterfront promenade',
      caption: 'The beautiful Corniche waterfront with modern skyline',
      category: 'cityscapes',
    },
    {
      id: '15',
      url: galleryDhow,
      alt: 'Traditional dhow boats in Doha harbor',
      caption: 'Traditional wooden dhow boats with West Bay skyline',
      category: 'experiences',
    },
  ];

  // Filter photos based on category
  const photos = currentCategory === 'all' 
    ? allPhotos 
    : allPhotos.filter(photo => photo.category === currentCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Doha Photo Gallery - Experience Doha"
        description="Stunning Doha photos: skyline views, Souq Waqif nights, desert sunsets, and cultural landmarks. Free to browse and share."
      />
      <NavBar />
      <GalleryHeader />
      
      {/* Gallery */}
      <section className="py-16">
        <div className="content-container">
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-10">
            <GalleryTabs 
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />
            
            {/* Photo Grid */}
            <TabsContent value={currentCategory} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div 
                    key={photo.id} 
                    className="relative group overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => setSelectedImage(photo.url)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 p-4 text-white">
                        <p className="text-sm font-medium">{photo.caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {photos.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No photos in this category yet</h3>
                  <p className="text-gray-500">Check back soon for new content</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Image Lightbox */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
            <img
              src={selectedImage}
              alt="Gallery"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </DialogContent>
        </Dialog>
      )}
      
      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="content-container">
          <Newsletter />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Gallery;

