import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Users, Shirt, Star, Phone } from 'lucide-react';

interface HotelBar {
  id: number;
  name: string;
  hotel: string;
  area: string;
  priceRange: 'budget' | 'moderate' | 'expensive' | 'luxury';
  atmosphere: string[];
  dressCode: string;
  hours: string;
  phone?: string;
  cocktailPrice: string;
  beerPrice: string;
  winePrice: string;
  rating: number;
  highlights: string[];
  foodRequired: boolean;
}

const hotelBars: HotelBar[] = [
  {
    id: 1,
    name: 'Wahm Lounge',
    hotel: 'W Hotel Doha',
    area: 'West Bay',
    priceRange: 'luxury',
    atmosphere: ['Trendy', 'Nightclub', 'Young Crowd'],
    dressCode: 'Smart Casual - No shorts or flip-flops',
    hours: '7 PM - 3 AM (Thu-Sat)',
    phone: '+974 4453 5000',
    cocktailPrice: 'QAR 70-90',
    beerPrice: 'QAR 45-55',
    winePrice: 'QAR 60-120/glass',
    rating: 4.5,
    highlights: ['Live DJ', 'Dance floor', 'Rooftop terrace', 'Late night'],
    foodRequired: false,
  },
  {
    id: 2,
    name: 'The Marsa Malaz',
    hotel: 'The St. Regis Doha',
    area: 'West Bay',
    priceRange: 'luxury',
    atmosphere: ['Elegant', 'Sophisticated', 'Quiet'],
    dressCode: 'Smart Casual - Elegant attire preferred',
    hours: '6 PM - 2 AM Daily',
    phone: '+974 4446 0000',
    cocktailPrice: 'QAR 75-95',
    beerPrice: 'QAR 50-60',
    winePrice: 'QAR 70-150/glass',
    rating: 4.7,
    highlights: ['Premium cocktails', 'Marina views', 'Live music', 'Cigar lounge'],
    foodRequired: true,
  },
  {
    id: 3,
    name: 'The Forge',
    hotel: 'Four Seasons Doha',
    area: 'West Bay',
    priceRange: 'expensive',
    atmosphere: ['Casual', 'Sports Bar', 'Expat Favorite'],
    dressCode: 'Smart Casual - Relaxed',
    hours: '12 PM - 2 AM Daily',
    phone: '+974 4494 8888',
    cocktailPrice: 'QAR 60-80',
    beerPrice: 'QAR 40-50',
    winePrice: 'QAR 55-100/glass',
    rating: 4.3,
    highlights: ['Sports screens', 'British pub style', 'Pool tables', 'Outdoor seating'],
    foodRequired: true,
  },
  {
    id: 4,
    name: 'Koubba Rooftop Lounge',
    hotel: 'Marriott Marquis City Center',
    area: 'City Center',
    priceRange: 'expensive',
    atmosphere: ['Rooftop', 'Scenic Views', 'Relaxed'],
    dressCode: 'Smart Casual',
    hours: '5 PM - 1 AM (Sun-Thu), 5 PM - 2 AM (Fri-Sat)',
    phone: '+974 4419 2222',
    cocktailPrice: 'QAR 65-85',
    beerPrice: 'QAR 45-55',
    winePrice: 'QAR 60-110/glass',
    rating: 4.4,
    highlights: ['Skyline views', 'Shisha available', 'DJ nights', 'Outdoor terrace'],
    foodRequired: false,
  },
  {
    id: 5,
    name: 'Irish Harp',
    hotel: 'Sheraton Grand Doha',
    area: 'West Bay',
    priceRange: 'moderate',
    atmosphere: ['Traditional Pub', 'Casual', 'Family-Friendly'],
    dressCode: 'Casual - No strict dress code',
    hours: '12 PM - 1 AM Daily',
    phone: '+974 4485 4444',
    cocktailPrice: 'QAR 50-70',
    beerPrice: 'QAR 35-45',
    winePrice: 'QAR 45-90/glass',
    rating: 4.0,
    highlights: ['Traditional Irish pub', 'Pub quiz nights', 'Live sports', 'Affordable'],
    foodRequired: true,
  },
  {
    id: 6,
    name: 'The Cigar Bar',
    hotel: 'Ritz-Carlton Doha',
    area: 'West Bay',
    priceRange: 'luxury',
    atmosphere: ['Exclusive', 'Sophisticated', 'Intimate'],
    dressCode: 'Smart Casual to Formal',
    hours: '6 PM - 2 AM Daily',
    phone: '+974 4484 8000',
    cocktailPrice: 'QAR 80-110',
    beerPrice: 'QAR 55-65',
    winePrice: 'QAR 80-180/glass',
    rating: 4.6,
    highlights: ['Premium cigars', 'Rare whiskeys', 'Live piano', 'Private lounges'],
    foodRequired: true,
  },
  {
    id: 7,
    name: "Champions Sports Bar",
    hotel: 'Marriott Hotel Doha',
    area: 'West Bay',
    priceRange: 'moderate',
    atmosphere: ['Sports Bar', 'Lively', 'Social'],
    dressCode: 'Casual - Relaxed atmosphere',
    hours: '4 PM - 2 AM Daily',
    phone: '+974 4429 8888',
    cocktailPrice: 'QAR 55-75',
    beerPrice: 'QAR 40-50',
    winePrice: 'QAR 50-95/glass',
    rating: 4.1,
    highlights: ['Multiple screens', 'Pool tables', 'Happy hours', 'American food'],
    foodRequired: true,
  },
  {
    id: 8,
    name: 'Crystal Lounge',
    hotel: 'InterContinental Doha The City',
    area: 'West Bay',
    priceRange: 'expensive',
    atmosphere: ['Elegant', 'Lounge', 'Business Crowd'],
    dressCode: 'Smart Casual - Business attire welcome',
    hours: '6 PM - 1 AM (Sun-Thu), 6 PM - 2 AM (Fri-Sat)',
    phone: '+974 4484 4444',
    cocktailPrice: 'QAR 65-90',
    beerPrice: 'QAR 45-55',
    winePrice: 'QAR 60-120/glass',
    rating: 4.2,
    highlights: ['Live music', 'Crystal chandeliers', 'Premium cocktails', 'Networking venue'],
    foodRequired: false,
  },
  {
    id: 9,
    name: 'Riva Lounge',
    hotel: 'Kempinski Residences & Suites',
    area: 'West Bay',
    priceRange: 'expensive',
    atmosphere: ['Beachfront', 'Relaxed', 'Sunset Views'],
    dressCode: 'Beach Smart Casual',
    hours: '5 PM - 12 AM Daily',
    phone: '+974 4031 8888',
    cocktailPrice: 'QAR 60-85',
    beerPrice: 'QAR 45-55',
    winePrice: 'QAR 55-110/glass',
    rating: 4.3,
    highlights: ['Beach access', 'Sunset views', 'Relaxed vibe', 'Outdoor seating'],
    foodRequired: true,
  },
  {
    id: 10,
    name: 'Horizon Restaurant & Bar',
    hotel: 'Crowne Plaza West Bay',
    area: 'West Bay',
    priceRange: 'moderate',
    atmosphere: ['Panoramic Views', 'Dining', 'Romantic'],
    dressCode: 'Smart Casual',
    hours: '6 PM - 11 PM Daily',
    phone: '+974 4428 8888',
    cocktailPrice: 'QAR 50-70',
    beerPrice: 'QAR 35-45',
    winePrice: 'QAR 50-100/glass',
    rating: 4.0,
    highlights: ['City views', 'International cuisine', 'Wine selection', 'Romantic setting'],
    foodRequired: true,
  },
];

const HotelBarFinder = () => {
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [atmosphereFilter, setAtmosphereFilter] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);

  const filteredBars = hotelBars.filter(bar => {
    if (areaFilter !== 'all' && bar.area !== areaFilter) return false;
    if (priceFilter !== 'all' && bar.priceRange !== priceFilter) return false;
    if (atmosphereFilter !== 'all' && !bar.atmosphere.some(a => a.toLowerCase().includes(atmosphereFilter.toLowerCase()))) return false;
    return true;
  });

  const displayedBars = showAll ? filteredBars : filteredBars.slice(0, 4);

  const getPriceColor = (range: string) => {
    switch(range) {
      case 'budget': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'moderate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'expensive': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'luxury': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const resetFilters = () => {
    setAreaFilter('all');
    setPriceFilter('all');
    setAtmosphereFilter('all');
  };

  return (
    <Card className="w-full max-w-6xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          Hotel Bar Finder - Licensed Venues in Doha
        </CardTitle>
        <CardDescription>
          Find licensed hotel bars where you can enjoy alcohol without a QDC permit. Perfect for tourists and residents.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="area-filter">Area</Label>
            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger id="area-filter">
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="West Bay">West Bay</SelectItem>
                <SelectItem value="City Center">City Center</SelectItem>
                <SelectItem value="The Pearl">The Pearl</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price-filter">Price Range</Label>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger id="price-filter">
                <SelectValue placeholder="Select price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="expensive">Expensive</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="atmosphere-filter">Atmosphere</Label>
            <Select value={atmosphereFilter} onValueChange={setAtmosphereFilter}>
              <SelectTrigger id="atmosphere-filter">
                <SelectValue placeholder="Select vibe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Atmospheres</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="elegant">Elegant</SelectItem>
                <SelectItem value="sports">Sports Bar</SelectItem>
                <SelectItem value="rooftop">Rooftop</SelectItem>
                <SelectItem value="nightclub">Nightclub</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 flex items-end">
            <Button onClick={resetFilters} variant="outline" className="w-full">
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {displayedBars.length} of {filteredBars.length} venues
        </div>

        {/* Venue Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayedBars.map((bar) => (
            <Card key={bar.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{bar.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {bar.hotel}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{bar.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">{bar.area}</Badge>
                  <Badge className={getPriceColor(bar.priceRange)}>
                    {bar.priceRange.charAt(0).toUpperCase() + bar.priceRange.slice(1)}
                  </Badge>
                  {bar.foodRequired && (
                    <Badge variant="outline" className="text-xs">Food Required</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Atmosphere Tags */}
                <div className="flex flex-wrap gap-1">
                  {bar.atmosphere.map((atm, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {atm}
                    </Badge>
                  ))}
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Cocktail</div>
                      <div className="font-medium text-xs">{bar.cocktailPrice}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Beer</div>
                      <div className="font-medium text-xs">{bar.beerPrice}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Wine</div>
                      <div className="font-medium text-xs">{bar.winePrice}</div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-xs">{bar.hours}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shirt className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-xs">{bar.dressCode}</span>
                  </div>
                  {bar.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-xs">{bar.phone}</span>
                    </div>
                  )}
                </div>

                {/* Highlights */}
                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground mb-1">Highlights:</div>
                  <div className="flex flex-wrap gap-1">
                    {bar.highlights.map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More/Less Button */}
        {filteredBars.length > 4 && (
          <div className="flex justify-center pt-4">
            <Button 
              onClick={() => setShowAll(!showAll)} 
              variant="outline"
            >
              {showAll ? 'Show Less' : `Show ${filteredBars.length - 4} More Venues`}
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredBars.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No venues match your filters. Try adjusting your criteria.</p>
            <Button onClick={resetFilters} variant="outline" className="mt-4">
              Reset Filters
            </Button>
          </div>
        )}

        {/* Important Notes */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Important Information
          </h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• No QDC permit required at licensed hotel venues</li>
            <li>• Prices may vary and are subject to change</li>
            <li>• Operating hours may differ during Ramadan</li>
            <li>• Reservations recommended for popular venues</li>
            <li>• Valid ID required (minimum age 21)</li>
            <li>• Dress codes strictly enforced at most venues</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelBarFinder;