import React from 'react';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrintableItinerary = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="my-8 p-6 bg-gray-50 border border-gray-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Take this Itinerary with You</h3>
        <p className="text-sm text-gray-600">Save this 7-day guide as a PDF or print it for your trip.</p>
      </div>
      <Button onClick={handlePrint} className="bg-qatar-maroon hover:bg-qatar-maroon/90 text-white gap-2">
        <Printer className="w-4 h-4" />
        Print / Save PDF
      </Button>
    </div>
  );
};

export default PrintableItinerary;