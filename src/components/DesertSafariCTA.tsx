import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info } from 'lucide-react';

const DesertSafariCTA = () => {
  return (
    <div className="my-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200 shadow-lg">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-heading">
            Book a Desert Safari
          </h3>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Experience the thrill of dune bashing and the serenity of the Inland Sea. Book your private desert safari today and create unforgettable memories in Qatar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              className="bg-qatar-maroon hover:bg-qatar-maroon/90 text-white font-bold py-6 px-8 text-lg shadow-md transition-transform hover:scale-105"
              onClick={() => window.open('https://www.viator.com/tours/Doha/Private-Desert-Safari-Dune-Bashing-Camel-Ride-Sand-Boarding-Inland-Sea-Visit/d4453-41683P18?pid=P00290081&mcid=42383', '_blank', 'noopener,noreferrer')}
            >
              Check Availability <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-4 flex items-start gap-2 justify-center md:justify-start text-xs text-gray-500">
            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Affiliate Disclaimer:</strong> We may earn a small commission if you book through our links, at no extra cost to you. This helps support our blog.
            </p>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-xl overflow-hidden shadow-md relative group">
          <img 
            src="https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=800&auto=format&fit=crop" 
            alt="Toyota Land Cruiser dune bashing in Qatar desert" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-3 left-3 text-white font-bold text-sm bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
            From $85 / person
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesertSafariCTA;