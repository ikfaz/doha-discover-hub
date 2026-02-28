import React from 'react';
import { Sparkles } from 'lucide-react';

interface ProTipProps {
  children: React.ReactNode;
  title?: string;
}

const ProTip = ({ children, title = "Pro Tip: Insider Secret" }: ProTipProps) => {
  return (
    <div className="my-8 relative overflow-hidden rounded-lg border-l-4 border-[#C5A059] bg-[#F9F5F0] p-6 shadow-sm">
      {/* Background Watermark */}
      <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none">
        <Sparkles size={80} color="#8A1538" />
      </div>
      
      <div className="relative z-10 flex items-start gap-4">
        {/* Icon Badge */}
        <div className="flex-shrink-0 mt-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8A1538] text-[#C5A059] shadow-sm">
            <Sparkles size={16} fill="currentColor" />
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="mb-2 font-['Playfair_Display'] text-lg font-bold text-[#8A1538]">
            {title}
          </h4>
          <div className="font-['Lato'] text-gray-700 leading-relaxed text-base">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProTip;