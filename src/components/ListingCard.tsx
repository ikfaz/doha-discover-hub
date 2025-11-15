import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Listing } from '@/types/listing';
import { Badge } from '@/components/ui/badge';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <Link to={`/listing/${listing.slug}`} className="group">
      <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={listing.images[0]} 
            alt={listing.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {listing.badges.slice(0, 2).map((badge, index) => (
              <Badge key={index} className="bg-secondary text-secondary-foreground">
                {badge}
              </Badge>
            ))}
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="text-sm font-semibold">{listing.rating}</span>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {listing.name}
            </h3>
            <span className="price-indicator text-lg ml-2 whitespace-nowrap">{listing.price}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">{listing.neighborhood}</span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {listing.description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground capitalize">{listing.category}</span>
            <span className="text-muted-foreground">{listing.reviewCount} reviews</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
