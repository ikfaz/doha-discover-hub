import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Minus, Plus, Users, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import RatingSystem from '@/components/RatingSystem';
import type { Tour } from '@/data/tours';

interface TourBookingSidebarProps {
  tour: Tour;
}

const TourBookingSidebar: React.FC<TourBookingSidebarProps> = ({ tour }) => {
  const [date, setDate] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const totalPersons = adults + children;
  const childDiscount = 0.5;
  const totalPrice = useMemo(() => {
    return (adults * tour.pricePerPerson) + (children * tour.pricePerPerson * childDiscount);
  }, [adults, children, tour.pricePerPerson]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border p-6 space-y-6">
      {/* Price header */}
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-secondary">${tour.pricePerPerson}</span>
          <span className="text-muted-foreground text-sm">/ person</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <RatingSystem rating={tour.rating} readOnly size="sm" />
          <span className="text-sm text-muted-foreground">{tour.rating} ({tour.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Date picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Select Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-12",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="me-2 h-4 w-4" aria-hidden="true" />
              {date ? format(date, "PPP") : "Choose a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < new Date()}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Person counter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Users className="h-4 w-4" aria-hidden="true" /> Travelers
        </label>
        
        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Adults</p>
            <p className="text-xs text-muted-foreground">Age 13+</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
              disabled={adults <= 1}
              aria-label="Decrease adults"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center font-medium text-sm">{adults}</span>
            <button
              onClick={() => setAdults(Math.min(10, adults + 1))}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
              disabled={adults >= 10}
              aria-label="Increase adults"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Children</p>
            <p className="text-xs text-muted-foreground">Age 3–12 (50% off)</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setChildren(Math.max(0, children - 1))}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
              disabled={children <= 0}
              aria-label="Decrease children"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center font-medium text-sm">{children}</span>
            <button
              onClick={() => setChildren(Math.min(6, children + 1))}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
              disabled={children >= 6}
              aria-label="Increase children"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{adults} Adult{adults !== 1 ? 's' : ''} × ${tour.pricePerPerson}</span>
          <span className="font-medium">${adults * tour.pricePerPerson}</span>
        </div>
        {children > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{children} Child{children !== 1 ? 'ren' : ''} × ${(tour.pricePerPerson * childDiscount).toFixed(0)}</span>
            <span className="font-medium">${(children * tour.pricePerPerson * childDiscount).toFixed(0)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
          <span>Total</span>
          <span className="text-secondary">${totalPrice.toFixed(0)}</span>
        </div>
      </div>

      {/* Book button */}
      <a
        href={tour.viatorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-sand-gold hover:bg-sand-gold/90 text-charcoal font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02] shadow-lg"
      >
        Book Now <ArrowRight className="w-5 h-5" aria-hidden="true" />
      </a>
      <p className="text-xs text-center text-muted-foreground">Free cancellation up to 24 hours before</p>
    </div>
  );
};

export default TourBookingSidebar;
