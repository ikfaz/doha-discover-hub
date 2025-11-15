import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Mail } from 'lucide-react';

const Advertise = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="content-container text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Advertise with Experience Doha
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Reach thousands of travelers and expats looking for the best experiences in Doha. Partner with us to showcase your business to our engaged audience.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="mailto:advertise@experiencedoha.com">
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </a>
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/30">
          <div className="content-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <p className="text-muted-foreground">Monthly Visitors</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground">Newsletter Subscribers</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <p className="text-muted-foreground">Qatar-Based Audience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Advertising Options */}
        <section className="content-container">
          <h2 className="section-title">Advertising Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Featured Listing</CardTitle>
                <CardDescription>Get your business featured on our homepage</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Premium placement on homepage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Full listing page with photos and details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>SEO optimization for your business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Monthly analytics report</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <p className="text-3xl font-bold text-primary">Starting at $499/month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sponsored Content</CardTitle>
                <CardDescription>Share your story through our blog</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Professionally written article</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Featured in our newsletter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Social media promotion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Permanent backlink to your website</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <p className="text-3xl font-bold text-primary">Starting at $799/article</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Banner Advertising</CardTitle>
                <CardDescription>Display ads across our site</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Multiple ad placements available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Responsive design for all devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Click-through tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Flexible duration options</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <p className="text-3xl font-bold text-primary">Starting at $299/month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Newsletter Sponsorship</CardTitle>
                <CardDescription>Reach our engaged subscribers directly</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Dedicated email to 10K+ subscribers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Custom message and creative</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>Open rate and click tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                    <span>One-time or recurring options</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <p className="text-3xl font-bold text-primary">$599/send</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground py-16 mt-16">
          <div className="content-container text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to discuss how we can help promote your business to Doha's most engaged audience.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="mailto:advertise@experiencedoha.com">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Advertise;
