import React from 'react';
import type { TourStop } from '@/data/tours';

interface TourItineraryTimelineProps {
  stops: TourStop[];
}

const TourItineraryTimeline: React.FC<TourItineraryTimelineProps> = ({ stops }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute start-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-sand-gold via-sand-gold/60 to-sand-gold/20" aria-hidden="true" />

      <div className="space-y-8">
        {stops.map((stop, index) => (
          <div key={index} className="relative flex gap-6 group">
            {/* Timeline node */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-white border-[3px] border-sand-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <span className="text-xs font-bold text-charcoal">{index + 1}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-bold bg-sand-gold/20 text-charcoal px-2.5 py-1 rounded-full">
                    {stop.time}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stop.duration}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-secondary mb-1 font-heading">{stop.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{stop.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourItineraryTimeline;
