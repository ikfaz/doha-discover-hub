import React from 'react';
import { Button } from '@/components/ui/button';
import { useScrollPosition } from '@/hooks/useScrollPosition';

interface StickyBookingBarProps {
  price: string | number;
  currency?: string;
}

const StickyBookingBar: React.FC<StickyBookingBarProps> = ({ 
  price, 
  currency = 'QAR' 
}) => {
  // Trigger visibility after scrolling past hero section (approx 400px)
  const isVisible = useScrollPosition(400);

  const scrollToBooking = () => {
    const element = document.getElementById('booking-widget');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center justify-between transition-transform duration-300 ease-in-out lg:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 font-medium">From</span>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-gray-900">
            {currency} {price}
          </span>
          <span className="text-xs text-gray-500">/ person</span>
        </div>
      </div>
      
      <Button 
        onClick={scrollToBooking}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 h-auto shadow-md"
      >
        Check Availability
      </Button>
    </div>
  );
};

export default StickyBookingBar;