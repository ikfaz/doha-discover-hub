
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Youtube, ExternalLink } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';

const Videos = () => {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [apiKey, setApiKey] = useState('');
  const [loadedVideos, setLoadedVideos] = useState<string[]>([]);
  const { toast } = useToast();
  const { data: videos = [], isLoading, isError } = useYoutubeVideos();

  const filteredVideos = currentCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === currentCategory);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      localStorage.setItem('youtube_api_key', apiKey);
      window.location.reload(); // Reload to use the new API key
      toast({
        title: "API Key Saved",
        description: "Your YouTube API key has been saved.",
      });
    }
  };

  const handleVideoClick = (videoId: string) => {
    if (!loadedVideos.includes(videoId)) {
      setLoadedVideos(prev => [...prev, videoId]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Doha Travel Videos - Experience Doha"
        description="Watch videos about Doha attractions, culture, food, and travel experiences. Visual guides to help you explore Qatar's capital."
      />
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
      
      {/* API Key Input */}
      {!localStorage.getItem('youtube_api_key') && (
        <section className="bg-qatar-pearl py-8">
          <div className="max-w-xl mx-auto px-4">
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-qatar-maroon">Enter YouTube API Key</h3>
              <p className="text-sm text-gray-600 mb-4">
                To automatically fetch videos from your channel, please enter your YouTube Data API key.
                You can get one from the Google Cloud Console.
              </p>
              <div className="flex gap-4">
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your YouTube API key"
                  className="flex-1"
                />
                <Button type="submit">Save Key</Button>
              </div>
            </form>
          </div>
        </section>
      )}
      
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
              {isLoading ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700">Loading videos...</h3>
                </div>
              ) : isError ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700">Error loading videos</h3>
                  <p className="text-gray-500">Please check your API key and try again</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVideos.map(video => (
                    <div key={video.videoId} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative pb-[56.25%] h-0">
                        {loadedVideos.includes(video.videoId) ? (
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          ></iframe>
                        ) : (
                          <div 
                            className="absolute top-0 left-0 w-full h-full bg-black cursor-pointer group"
                            onClick={() => handleVideoClick(video.videoId)}
                          >
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-qatar-maroon/80 p-3 rounded-full group-hover:scale-110 transition-transform">
                                <Youtube className="h-10 w-10 text-white" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-qatar-maroon">{video.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>{video.date}</span>
                          <span className="capitalize">{video.category.replace('-', ' ')}</span>
                        </div>
                        <div className="mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Watch on YouTube
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {!isLoading && !isError && filteredVideos.length === 0 && (
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
                  loading="lazy"
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
