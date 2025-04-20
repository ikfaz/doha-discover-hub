
import React from 'react';
import { Button } from '@/components/ui/button';
import { Youtube } from 'lucide-react';

interface FeaturedVideoProps {
  videoId: string;
  title: string;
  description: string;
}

const FeaturedVideo: React.FC<FeaturedVideoProps> = ({ videoId, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-up">
      <div className="relative pb-[56.25%] h-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-qatar-maroon">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex space-x-4">
          <Button className="bg-qatar-maroon hover:bg-qatar-maroon/90 text-white">
            Watch Now
          </Button>
          <Button 
            variant="outline" 
            className="border-qatar-maroon text-qatar-maroon hover:bg-qatar-maroon/10"
            onClick={() => window.open(`https://www.youtube.com/channel/YourChannelID`, '_blank')}
          >
            <Youtube className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVideo;
