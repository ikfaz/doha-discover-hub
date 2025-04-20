import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Youtube } from 'lucide-react';

const Videos = () => {
  const [currentCategory, setCurrentCategory] = useState('all');
  
  // Updated video data with more specific details
  const allVideos = [
    {
      id: 'NJaD4HZOGG0',
      title: 'Exploring Doha\'s Cultural Districts',
      description: 'Join me as I explore the rich cultural heritage and modern attractions in Doha\'s most vibrant neighborhoods.',
      videoId: 'NJaD4HZOGG0',
      category: 'attractions',
      date: 'April 15, 2025',
    },
    {
      id: 'AbcXYZ123',
      title: 'Best Street Food in Doha',
      description: 'Discover the most delicious street food options in Qatar\'s capital city.',
      videoId: 'AbcXYZ123',
      category: 'food',
      date: 'April 10, 2025',
    },
    {
      id: 'NJaD4HZOGG0',
      title: 'Inside the National Museum of Qatar',
      description: 'A tour of the architectural marvel that is the National Museum of Qatar.',
      videoId: 'NJaD4HZOGG0',
      category: 'attractions',
      date: 'April 5, 2025',
    },
    {
      id: 'NJaD4HZOGG0',
      title: 'Qatar National Day Celebrations',
      description: 'Experience the festivities and celebrations of Qatar National Day in Doha.',
      videoId: 'NJaD4HZOGG0',
      category: 'events',
      date: 'April 2, 2025',
    },
    {
      id: 'NJaD4HZOGG0',
      title: 'Shopping at Souq Waqif',
      description: 'Traditional shopping experience at Doha\'s historic Souq Waqif.',
      videoId: 'NJaD4HZOGG0',
      category: 'lifestyle',
      date: 'March 28, 2025',
    },
    {
      id: 'NJaD4HZOGG0',
      title: 'Tips for Moving to Qatar',
      description: 'Essential information for expatriates planning to move to Doha.',
      videoId: 'NJaD4HZOGG0',
      category: 'expat-tips',
      date: 'March 25, 2025',
    },
  ];

  // Filter videos based on category
  const videos = currentCategory === 'all' 
    ? allVideos 
    : allVideos.filter(video => video.category === currentCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Header */}
      <section className="bg-qatar-maroon text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Experience Doha Videos</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore Qatar's capital through our video guides and travel vlogs
          </p>
          <div className="mt-8">
            <Button 
              className="bg-qatar-gold hover:bg-qatar-gold/90 text-qatar-maroon font-bold"
              onClick={() => window.open('https://www.youtube.com/channel/UC-wTo4Yzj8H4KHid3QoFWGA', '_blank')}
            >
              <Youtube className="mr-2 h-5 w-5" />
              Subscribe to Our Channel
            </Button>
          </div>
        </div>
      </section>
      
      {/* Video Gallery */}
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
                All Videos
              </TabsTrigger>
              <TabsTrigger 
                value="attractions" 
                onClick={() => setCurrentCategory('attractions')}
                className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
              >
                Attractions
              </TabsTrigger>
              <TabsTrigger 
                value="food" 
                onClick={() => setCurrentCategory('food')}
                className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
              >
                Food & Dining
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                onClick={() => setCurrentCategory('events')}
                className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
              >
                Events
              </TabsTrigger>
              <TabsTrigger 
                value="lifestyle" 
                onClick={() => setCurrentCategory('lifestyle')}
                className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
              >
                Lifestyle
              </TabsTrigger>
              <TabsTrigger 
                value="expat-tips" 
                onClick={() => setCurrentCategory('expat-tips')}
                className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
              >
                Expat Tips
              </TabsTrigger>
            </TabsList>
            
            {/* Videos Grid */}
            <TabsContent value={currentCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map(video => (
                  <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative pb-[56.25%] h-0">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-qatar-maroon">{video.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{video.date}</span>
                        <span className="capitalize">{video.category.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {videos.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No videos in this category yet</h3>
                  <p className="text-gray-500">Check back soon for new content</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Featured Playlist */}
      <section className="bg-gray-50 py-16">
        <div className="content-container">
          <h2 className="section-title">Featured Playlist: Doha's Hidden Gems</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/videoseries?list=PLyoutKkLobJaYLeqnVk8sXbwVtm0kzZ0d&channel=UC-wTo4Yzj8H4KHid3QoFWGA"
                  title="Doha's Hidden Gems Playlist"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Discover Doha's Hidden Gems</h3>
                <p className="text-gray-600 mb-6">
                  This special playlist showcases lesser-known locations and experiences in Doha 
                  that even long-term residents might have missed. From hidden cafes to 
                  secluded beaches, discover the side of Doha that tourists rarely see.
                </p>
                <Button 
                  className="w-full bg-qatar-maroon hover:bg-qatar-maroon/90 text-white"
                  onClick={() => window.open('https://www.youtube.com/channel/UC-wTo4Yzj8H4KHid3QoFWGA/playlists', '_blank')}
                >
                  Watch Playlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="content-container">
          <Newsletter />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Videos;
