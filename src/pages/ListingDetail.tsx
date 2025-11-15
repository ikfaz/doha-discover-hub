import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { listings } from '@/data/listings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ExternalLink, Lightbulb, DollarSign, Clock, ShirtIcon, PawPrint } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ListingDetail = () => {
  const { slug } = useParams();
  const listing = listings.find(l => l.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">Listing Not Found</h1>
            <Link to="/listings">
              <Button>Browse All Listings</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        {/* Image Gallery */}
        <section className="bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="relative h-[500px]">
              <img 
                src={listing.images[selectedImage]} 
                alt={listing.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2 p-2">
              {listing.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded overflow-hidden ${selectedImage === index ? 'ring-2 ring-secondary' : ''}`}
                >
                  <img src={image} alt={`${listing.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary">{badge}</Badge>
                  ))}
                </div>

                <h1 className="text-4xl font-heading font-bold mb-2">{listing.name}</h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-gold text-gold" />
                    <span className="font-semibold">{listing.rating}</span>
                    <span className="text-muted-foreground">({listing.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.neighborhood}</span>
                  </div>
                </div>

                <p className="text-lg mb-6">{listing.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-secondary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Price Range</h3>
                        <p className="text-2xl price-indicator">{listing.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <PawPrint className="w-5 h-5 text-secondary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Pet Policy</h3>
                        <p className="text-muted-foreground">{listing.petPolicy}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {listing.dressCode && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <ShirtIcon className="w-5 h-5 text-secondary mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Dress Code</h3>
                          <p className="text-muted-foreground">{listing.dressCode}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {listing.bestTime && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-secondary mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Best Time to Visit</h3>
                          <p className="text-muted-foreground">{listing.bestTime}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Location */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{listing.location.address}</p>
                  <a 
                    href={listing.location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    Open in Google Maps
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>

              {/* Insider Tips */}
              {listing.insiderTips.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-secondary" />
                      Insider Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {listing.insiderTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-secondary mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>Book This Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {listing.affiliateLinks.booking && (
                      <Button asChild className="w-full" size="lg">
                        <a href={listing.affiliateLinks.booking} target="_blank" rel="noopener noreferrer">
                          Book on Booking.com
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}
                    {listing.affiliateLinks.getyourguide && (
                      <Button asChild variant="outline" className="w-full" size="lg">
                        <a href={listing.affiliateLinks.getyourguide} target="_blank" rel="noopener noreferrer">
                          Book on GetYourGuide
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}
                    {listing.affiliateLinks.viator && (
                      <Button asChild variant="outline" className="w-full" size="lg">
                        <a href={listing.affiliateLinks.viator} target="_blank" rel="noopener noreferrer">
                          Book on Viator
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}
                    {!listing.affiliateLinks.booking && !listing.affiliateLinks.getyourguide && !listing.affiliateLinks.viator && (
                      <p className="text-center text-muted-foreground py-4">Direct booking not available</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ListingDetail;
