
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Gallery = () => {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Mock gallery data
  const allPhotos = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1558227108-af6eec1a0bb4?q=80&w=2574&auto=format&fit=crop',
      alt: 'Museum of Islamic Art',
      caption: 'The iconic Museum of Islamic Art designed by I.M. Pei',
      category: 'landmarks',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1577278689329-1914b6814d58?q=80&w=2670&auto=format&fit=crop',
      alt: 'Doha Skyline',
      caption: 'Doha\'s magnificent skyline illuminated at night',
      category: 'cityscapes',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1603864331039-7bbe48682bbd?q=80&w=2574&auto=format&fit=crop',
      alt: 'Souq Waqif',
      caption: 'The bustling traditional market of Souq Waqif',
      category: 'culture',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1609924206923-4f36e22c94e4?q=80&w=2574&auto=format&fit=crop',
      alt: 'Desert Safari',
      caption: 'Adventure in the dunes during a desert safari',
      category: 'experiences',
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1578895101408-1a6986a3a449?q=80&w=2574&auto=format&fit=crop',
      alt: 'West Bay Architecture',
      caption: 'Modern architectural marvels in West Bay district',
      category: 'cityscapes',
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?q=80&w=2668&auto=format&fit=crop',
      alt: 'Katara Cultural Village',
      caption: 'The beautiful Katara Cultural Village',
      category: 'culture',
    },
    {
      id: '7',
      url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop',
      alt: 'Traditional Qatari Food',
      caption: 'Delicious traditional Qatari cuisine',
      category: 'food',
    },
    {
      id: '8',
      url: 'https://images.unsplash.com/photo-1526285759704-71d51dd482ab?q=80&w=2670&auto=format&fit=crop',
      alt: 'Cultural Festival',
      caption: 'Celebration of culture at a local festival',
      category: 'events',
    },
    {
      id: '9',
      url: 'https://images.unsplash.com/photo-1592568787542-43e11a310fed?q=80&w=2574&auto=format&fit=crop',
      alt: 'Desert Landscape',
      caption: 'The stunning desert landscape outside Doha',
      category: 'experiences',
    },
    {
      id: '10',
      url: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=2574&auto=format&fit=crop',
      alt: 'The Pearl-Qatar',
      caption: 'Luxury living at The Pearl-Qatar',
      category: 'landmarks',
    },
    {
      id: '11',
      url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2576&auto=format&fit=crop',
      alt: 'Shopping Mall',
      caption: 'World-class shopping experience in Doha',
      category: 'lifestyle',
    },
    {
      id: '12',
      url: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=2670&auto=format&fit=crop',
      alt: 'National Museum of Qatar',
      caption: 'The stunning National Museum of Qatar',
      category: 'landmarks',
    },
  ];

  // Filter photos based on category
  const photos = currentCategory === 'all' 
    ? allPhotos 
    : allPhotos.filter(photo => photo.category === currentCategory);

  const handleOpenLightbox = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Header */}
      <section className="bg-qatar-maroon text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Photo Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore the beauty and diversity of Doha through our collection of photographs
          </p>
        </div>
      </section>
      
      {/* Gallery */}
      <section className="py-16">
        <div className="content-container">
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-10">
            <TabsList className="w-full justify-start mb-6 bg-qatar-sand/50">
              <TabsTrigger 
                value="all" 
                onClick={() => setCurrentCategory('all')}
                className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
              >
                All Photos
              </TabsTrigger>
              <TabsTrigger 
                value="landmarks" 
                onClick={() => setCurrentCategory('landmarks')}
                className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
              >
                Landmarks
              </TabsTrigger>
              <TabsTrigger 
                value="cityscapes" 
                onClick={() => setCurrentCategory('cityscapes')}
                className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
              >
                Cityscapes
              </TabsTrigger>
              <TabsTrigger 
                value="culture" 
                onClick={() => setCurrentCategory('culture')}
                className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
              >
                Culture
              </TabsTrigger>
              <TabsTrigger 
                value="experiences" 
                onClick={() => setCurrentCategory('experiences')}
                className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
              >
                Experiences
              </TabsTrigger>
              <TabsTrigger 
                value="food" 
                onClick={() => setCurrentCategory('food')}
                className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
              >
                Food
              </TabsTrigger>
            </TabsList>
            
            {/* Photo Grid */}
            <TabsContent value={currentCategory} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div 
                    key={photo.id} 
                    className="relative group overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => handleOpenLightbox(photo.url)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-end transition-opacity duration-300">
                      <div className="p-4 text-white">
                        <p>{photo.caption}</p>
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
