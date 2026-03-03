import React from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Mail, Youtube } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  const handleContactClick = () => {
    window.location.href = 'mailto:info@experiencedoha.com';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="About Experience Doha - Your Qatar Travel Guide"
        description="Meet the team behind Experience Doha — expat-tested guides, honest tips, and insider knowledge for tourists and residents in Qatar."
      />
      <NavBar />
      
      <main>
        <section className="bg-secondary text-secondary-foreground py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">{t('about.title')}</h1>
            <p className="text-xl max-w-3xl mx-auto text-secondary-foreground/80">{t('about.subtitle')}</p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="content-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-title">{t('about.ourStory')}</h2>
                <p className="text-muted-foreground mb-6">{t('about.storyP1')}</p>
                <p className="text-muted-foreground mb-6">{t('about.storyP2')}</p>
                <p className="text-muted-foreground mb-6">{t('about.storyP3')}</p>
                
                <div className="flex flex-wrap gap-4 mt-8">
                  <Button 
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    onClick={() => window.open('https://www.youtube.com/@ExperienceDoha', '_blank')}
                  >
                    <Youtube className="me-2 h-4 w-4" aria-hidden="true" />
                    {t('about.youtubeChannel')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-secondary text-secondary hover:bg-secondary/10"
                    onClick={handleContactClick}
                  >
                    <Mail className="me-2 h-4 w-4" aria-hidden="true" />
                    {t('about.contactMe')}
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=2574&auto=format&fit=crop" 
                  alt="Experience Doha team exploring Qatar's attractions and cultural sites" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -start-6 w-48 h-48 bg-primary rounded-lg -z-10"></div>
                <div className="absolute -top-6 -end-6 w-48 h-48 bg-secondary rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </section>
      
        <section className="bg-muted/50 py-16">
          <div className="content-container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="section-title mx-auto">{t('about.ourMission')}</h2>
              <p className="text-muted-foreground text-lg mb-8">{t('about.missionText')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { title: t('about.authenticContent'), desc: t('about.authenticDesc'), icon: '👍' },
                { title: t('about.culturalBridge'), desc: t('about.culturalDesc'), icon: '📖' },
                { title: t('about.communityFocus'), desc: t('about.communityDesc'), icon: '🌍' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-secondary">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      
        <section className="py-16">
          <div className="content-container">
            <Newsletter />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
