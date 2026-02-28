import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingSystemProps {
  rating: number;
  maxRating?: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

const RatingSystem: React.FC<RatingSystemProps> = ({
  rating,
  maxRating = 5,
  onRatingChange,
  readOnly = false,
  size = 'md',
  className,
  showText = false,
  textClassName,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(null);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(index);
    }
  };

  const starSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
  };

  const currentRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex" onMouseLeave={handleMouseLeave}>
        {[...Array(maxRating)].map((_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= Math.round(currentRating);
          
          return (
            <button
              key={i}
              type="button"
              className={cn(
                "focus:outline-none transition-transform",
                readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
              )}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              disabled={readOnly}
              aria-label={`Rate ${starValue} out of ${maxRating}`}
            >
              <Star
                className={cn(
                  starSize[size],
                  "transition-colors duration-200",
                  isFilled
                    ? "fill-current text-sand-gold"
                    : "fill-current text-gray-200"
                )}
              />
            </button>
          );
        })}
      </div>
      {showText && (
        <span className={cn("ml-2 text-sm font-medium text-gray-700", textClassName)}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingSystem;