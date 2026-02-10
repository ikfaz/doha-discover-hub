import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LazyMapProps {
  latitude: number;
  longitude: number;
  placeName: string;
  className?: string;
}

const LazyMap: React.FC<LazyMapProps> = ({ latitude, longitude, placeName, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px', // Start loading when within 200px of viewport
  });

  useEffect(() => {
    if (inView) {
      setIsLoaded(true);
    }
  }, [inView]);

  // Note: Google Maps Embed API v1/place requires an API Key.
  // Ensure VITE_GOOGLE_MAPS_API_KEY is set in your .env file.
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || '';
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}`;

  const handleGetDirections = () => {
    // geo: URI scheme for native map apps
    window.location.href = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${encodeURIComponent(placeName)})`;
  };

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`} ref={ref}>
      <div className="relative w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200">
        {isLoaded ? (
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
            title={`Map showing location of ${placeName}`}
            className="w-full h-full"
          ></iframe>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
            <MapPin className="w-12 h-12 mb-3 opacity-20" />
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Loading Map...</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleGetDirections}
        >
          <Navigation className="w-4 h-4" />
          Get Directions
        </Button>
      </div>
    </div>
  );
};

export default LazyMap;