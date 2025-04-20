
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Video {
  id: string;
  title: string;
  description: string;
}

interface YouTubeVideoGridProps {
  videos: Video[];
  columns?: number;
}

const YouTubeVideoGrid: React.FC<YouTubeVideoGridProps> = ({ videos, columns = 2 }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-bold text-qatar-maroon line-clamp-2">{video.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default YouTubeVideoGrid;
