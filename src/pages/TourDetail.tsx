import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, Users, Globe, MapPin, Star, ChevronLeft, Check, X, Share2 } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import TourBookingSidebar from '@/components/TourBookingSidebar';
import TourItineraryTimeline from '@/components/TourItineraryTimeline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTourBySlug } from '@/data/tours';

const BASE_URL = 'https://experiencedoha.com';

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const tour = getTourBySlug(slug || '');

  // Convert USD price to QAR (1 USD approx 3.64 QAR)
  const priceQAR = tour ? Math.round(tour.pricePerPerson * 3.64) : 0;

  const jsonLd = useMemo(() => {
    if (!tour) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: tour.title,
      description: tour.overview.split('\n\n')[0],
      image: tour.heroImage,
      url: `${BASE_URL}/tour/${tour.slug}`,
      touristType: tour.category,
      offers: {
        '@type': 'Offer',
        price: priceQAR,
        priceCurrency: 'QAR',
        availability: 'https://schema.org/InStock',
        url: tour.viatorUrl,
        validFrom: '2026-01-01',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: tour.rating,
        reviewCount: tour.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
      provider: {
        '@type': 'Organization',
        name: 'Experience Doha',
        url: BASE_URL,
      },
      itinerary: {
        '@type': 'ItemList',
        numberOfItems: tour.itinerary.length,
        itemListElement: tour.itinerary.map((stop, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: stop.title,
          description: stop.description,
        })),
      },
      review: tour.reviews.slice(0, 3).map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.name },
        reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
        reviewBody: r.comment,
        datePublished: r.date,
      })),
    };
  }, [tour, priceQAR]);

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-secondary mb-4 font-heading">Tour Not Found</h1>
            <p className="text-muted-foreground mb-6">The tour you're looking for doesn't exist.</p>
            <Link to="/" className="inline-flex items-center bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/90 transition-colors">
              {t('common.backToHome')}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Append &fm=webp to Unsplash URLs for WebP format
  const toWebP = (url: string) => {
    if (url.includes('unsplash.com')) {
      return url.includes('&fm=') ? url : `${url}&fm=webp`;
    }
    return url;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <SEOHead
        title={`${tour.title} - Book from ${priceQAR} QAR | Experience Doha`}
        description={`${tour.subtitle}. ${tour.duration} tour with ${tour.rating}-star rating from ${tour.reviewCount} reviews. Book now from ${priceQAR} QAR per person.`}
        image={toWebP(tour.heroImage)}
        jsonLd={jsonLd}
      />
      <NavBar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={toWebP(tour.heroImage)}
            alt={`${tour.title} - ${tour.category} tour in Doha, Qatar`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />

          <div className="absolute top-6 start-6 z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white bg-charcoal/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Back to Tours
            </Link>
          </div>

          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            className="absolute top-6 end-6 z-10 text-white/90 hover:text-white bg-charcoal/30 backdrop-blur-sm p-3 rounded-full transition-colors"
            aria-label="Share tour"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <div className="absolute bottom-0 start-0 end-0 p-6 md:p-12 z-10">
            <div className="max-w-4xl">
              <span className="inline-block bg-sand-gold text-charcoal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                {tour.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white font-heading leading-tight mb-3">
                {tour.title}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">{tour.subtitle}</p>

              <div className="flex flex-wrap gap-3 mt-4">
                {[
                  { icon: Clock, text: tour.duration },
                  { icon: Users, text: tour.groupSize },
                  { icon: Globe, text: tour.language },
                ].map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
                    <item.icon className="w-3.5 h-3.5" aria-hidden="true" />
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content + Sidebar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 min-w-0">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start bg-muted/50 rounded-xl p-1 h-auto flex-wrap">
                  <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-5 py-2.5 text-sm font-medium">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-5 py-2.5 text-sm font-medium">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-5 py-2.5 text-sm font-medium">Inclusions</TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-5 py-2.5 text-sm font-medium">Reviews ({tour.reviewCount})</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-8 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">About This Tour</h2>
                    {tour.overview.split('\n\n').map((p, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-4 font-heading">Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tour.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <Check className="w-5 h-5 text-sand-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-sm text-foreground">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-4 font-heading flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-sand-gold" aria-hidden="true" />
                      Tour Route
                    </h3>
                    <div className="relative rounded-2xl overflow-hidden shadow-md h-[300px]">
                      <img
                        src={toWebP(tour.mapImage)}
                        alt={`Route map showing ${tour.itinerary.length} stops for ${tour.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-charcoal/10" />
                      <div className="absolute bottom-4 start-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                        <p className="text-sm font-medium text-charcoal flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-sand-gold" aria-hidden="true" />
                          {tour.itinerary.length} stops - {tour.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="itinerary" className="mt-8">
                  <h2 className="text-2xl font-bold text-secondary mb-6 font-heading">Your Day, Step by Step</h2>
                  <TourItineraryTimeline stops={tour.itinerary} />
                </TabsContent>

                <TabsContent value="inclusions" className="mt-8 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">What's Included</h2>
                    <div className="space-y-2">
                      {tour.inclusions.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                          <span className="text-sm text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">What's Not Included</h2>
                    <div className="space-y-2">
                      {tour.exclusions.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-red-50">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0" aria-hidden="true" />
                          <span className="text-sm text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-secondary text-secondary-foreground rounded-2xl p-5 text-center min-w-[100px]">
                      <div className="text-3xl font-bold">{tour.rating}</div>
                      <div className="flex justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'text-sand-gold fill-sand-gold' : 'text-gray-400'}`} aria-hidden="true" />
                        ))}
                      </div>
                      <div className="text-xs mt-1 text-secondary-foreground/70">{tour.reviewCount} reviews</div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-secondary font-heading">Guest Reviews</h2>
                      <p className="text-muted-foreground text-sm">Verified traveler experiences</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {tour.reviews.map((review, i) => (
                      <div key={i} className="bg-white border border-border rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-sand-gold/20 flex items-center justify-center text-sm font-bold text-charcoal">
                            {review.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.country} - {review.date}</p>
                          </div>
                          <div className="ms-auto flex">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'text-sand-gold fill-sand-gold' : 'text-gray-200'}`} aria-hidden="true" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <aside className="lg:w-[380px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <TourBookingSidebar tour={tour} />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TourDetail;
