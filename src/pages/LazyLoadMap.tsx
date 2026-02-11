import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'

interface LazyLoadMapProps {
  location: string
  placeholderImg: string
}

const LazyLoadMap: React.FC<LazyLoadMapProps> = ({ location, placeholderImg }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoadMap = () => {
    setIsLoaded(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleLoadMap()
    }
  }

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-gray-100">
      {isLoaded ? (
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title={`Map of ${location}`}
        />
      ) : (
        <div
          className="relative w-full h-full cursor-pointer group"
          onClick={handleLoadMap}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={`View interactive map of ${location}`}
        >
          <Image
            src={placeholderImg}
            alt={`Map preview of ${location}`}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
            <Button className="bg-white text-black hover:bg-gray-100 shadow-lg font-semibold">
              <MapPin className="mr-2 h-4 w-4" />
              View Interactive Map
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LazyLoadMap