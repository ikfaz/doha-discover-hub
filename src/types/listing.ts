export type ListingCategory = 'hotel' | 'restaurant' | 'activity' | 'attraction' | 'neighborhood';

export interface Listing {
  id: string;
  slug: string;
  name: string;
  category: ListingCategory;
  neighborhood: string;
  price: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  badges: string[];
  location: {
    address: string;
    mapUrl: string;
  };
  insiderTips: string[];
  affiliateLinks: {
    booking?: string;
    getyourguide?: string;
    viator?: string;
  };
  petPolicy: 'Yes' | 'No' | 'Service animals only';
  dressCode?: string;
  bestTime?: string;
  featured?: boolean;
}

export interface Review {
  id: string;
  listingId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
