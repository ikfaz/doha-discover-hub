import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import ViatorBanner from '@/components/ViatorBanner';
import GetYourGuideWidget from '@/components/GetYourGuideWidget';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MapPin, Calendar, Camera, Coffee, Sun } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <SEOHead
        title="Experience Doha - The Ultimate Travel Guide to Qatar"
        description="Discover the magic of Doha. Your essential guide to attractions, culture, dining, and adventures in Qatar's vibrant capital."
      />
      <NavBar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=2574&auto=format&fit=crop"
              alt="Doha Skyline"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight leading-tight">
              {t('home.heroTitle')} <span className="text-sand-gold">{t('home.heroHighlight')}</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-100 max-w-2xl mx-auto">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button asChild size="lg" className="bg-sand-gold hover:bg-sand-gold/90 text-charcoal text-lg px-8 py-6 h-auto rounded-full shadow-lg transition-transform hover:scale-105 font-semibold">
                <Link to="/blog">{t('home.startExploring')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-charcoal text-lg px-8 py-6 h-auto rounded-full shadow-lg transition-transform hover:scale-105">
                <Link to="/videos">{t('home.watchGuides')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Categories */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4">{t('home.curatedExperiences')}</h2>
              <p className="text-muted-foreground">{t('home.curatedSubtitle')}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: MapPin, label: t('home.attractions'), link: '/blog/category/attractions', color: 'bg-blue-50 text-blue-600' },
                { icon: Coffee, label: t('home.foodDining'), link: '/blog/category/food', color: 'bg-orange-50 text-orange-600' },
                { icon: Calendar, label: t('home.events'), link: '/blog/category/events', color: 'bg-purple-50 text-purple-600' },
                { icon: Sun, label: t('home.desertSafari'), link: '/blog/category/adventures', color: 'bg-amber-50 text-amber-600' },
              ].map((item, idx) => (
                <Link key={idx} to={item.link} className="group">
                  <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
                      <div className={`p-4 rounded-full mb-4 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="w-8 h-8" aria-hidden="true" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.label}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-bold text-secondary mb-2">{t('home.trendingInDoha')}</h2>
                <p className="text-muted-foreground text-lg">{t('home.trendingSubtitle')}</p>
              </div>
              <Link to="/blog" className="hidden md:flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                {t('home.viewAllArticles')} <ArrowRight className="ms-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-auto md:h-[600px]">
              <div className="md:col-span-2 relative group overflow-hidden rounded-2xl shadow-xl h-[400px] md:h-full">
                <img src="https://images.unsplash.com/photo-1545063914-818571822393?q=80&w=2669&auto=format&fit=crop" alt="Souq Waqif" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 start-0 p-8 text-white">
                  <span className="bg-sand-gold text-charcoal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">{t('home.mustVisit')}</span>
                  <h3 className="text-3xl font-bold mb-2">{t('home.souqTitle')}</h3>
                  <p className="text-gray-200 mb-4 line-clamp-2">{t('home.souqDesc')}</p>
                  <Link to="/blog/souq-waqif-night-experiences-haggling" className="inline-flex items-center text-white font-semibold hover:underline">
                    {t('home.readGuide')} <ArrowRight className="ms-2 w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-8 h-full">
                <div className="relative group overflow-hidden rounded-2xl shadow-lg flex-1 min-h-[280px]">
                  <img src="https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=2670&auto=format&fit=crop" alt="Desert Safari" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 start-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{t('home.desertAdventures')}</h3>
                    <Link to="/blog/desert-safari-inland-sea-khor-al-adaid" className="text-sm text-gray-200 hover:text-white flex items-center">
                      {t('home.exploreDunes')} <ArrowRight className="ms-1 w-3 h-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl shadow-lg flex-1 min-h-[280px]">
                  <img src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=2574&auto=format&fit=crop" alt="The Pearl Qatar" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 start-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{t('home.luxuryPearl')}</h3>
                    <Link to="/blog/pearl-qatar-luxury-shopping-dining" className="text-sm text-gray-200 hover:text-white flex items-center">
                      {t('home.discoverIsland')} <ArrowRight className="ms-1 w-3 h-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Desert Safari Affiliate CTA */}
        <section className="py-20 bg-gradient-to-br from-accent via-muted to-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=2670&auto=format&fit=crop" alt="Desert Safari in Qatar" className="w-full h-[400px] object-cover" />
                  <div className="absolute top-4 start-4 bg-sand-gold text-charcoal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {t('home.mostPopularTour')}
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
                  {t('home.privateDesertSafari')} <span className="text-primary">{t('home.adventure')}</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t('home.desertSafariDesc')}</p>
                <ul className="space-y-3 text-foreground">
                  <li className="flex items-center gap-2"><Sun className="w-5 h-5 text-primary" aria-hidden="true" /> {t('home.privateDuneBashing')}</li>
                  <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" aria-hidden="true" /> {t('home.visitInlandSea')}</li>
                  <li className="flex items-center gap-2"><Camera className="w-5 h-5 text-primary" aria-hidden="true" /> {t('home.camelRides')}</li>
                </ul>
                <div className="pt-4">
                  <a
                    href="https://www.viator.com/tours/Doha/Private-Desert-Safari-Dune-Bashing-Camel-Ride-Sand-Boarding-Inland-Sea-Visit/d4453-41683P18?medium=link&pid=P00290081&mcid=42383"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg font-bold px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105"
                  >
                    {t('home.bookThisTour')} <ArrowRight className="ms-2 w-5 h-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Teaser */}
        <section className="py-20 bg-secondary text-secondary-foreground overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="w-96 h-96 bg-sand-gold rounded-full blur-3xl absolute -top-20 -left-20"></div>
            <div className="w-96 h-96 bg-blue-500 rounded-full blur-3xl absolute bottom-0 right-0"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-sand-gold">
                  <Camera className="w-4 h-4" aria-hidden="true" />
                  <span>{t('home.visualGuides')}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">{t('home.seeDoha')}</h2>
                <p className="text-lg text-gray-300">{t('home.videoDesc')}</p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild className="bg-sand-gold text-charcoal hover:bg-sand-gold/90 font-bold rounded-full px-8">
                    <Link to="/videos">{t('home.watchNow')}</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1565553642973-6af7d4a935d8?q=80&w=2574&auto=format&fit=crop" alt="Doha Video Preview" className="w-full h-auto" />
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/30 group cursor-pointer">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 transition-transform group-hover:scale-110">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-s-[18px] border-s-white border-b-[10px] border-b-transparent ms-1" aria-hidden="true"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Viator Banner */}
        <section className="bg-muted/50">
          <div className="max-w-4xl mx-auto px-4">
            <ViatorBanner />
          </div>
        </section>

        {/* GetYourGuide Widget */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Popular Tours & Activities in Doha</h2>
            <GetYourGuideWidget />
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <Newsletter />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
