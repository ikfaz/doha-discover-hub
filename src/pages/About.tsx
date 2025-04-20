
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { Mail, Youtube } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-qatar-maroon text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">About Experience Doha</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your comprehensive guide to Qatar's vibrant capital city
          </p>
        </div>
      </section>
      
      {/* About Content */}
      <section className="py-16">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our Story</h2>
              <p className="text-gray-700 mb-6">
                Experience Doha was founded with a passion for sharing the beauty, culture, and 
                excitement of Qatar's capital city with the world. As both a travel enthusiast 
                and a long-term Doha resident, I created this platform to bridge the gap between 
                tourist information and authentic local experiences.
              </p>
              <p className="text-gray-700 mb-6">
                What started as a personal blog documenting my adventures around Doha has grown 
                into a comprehensive resource for both tourists planning their visits and expats 
                making Doha their home. Through my YouTube channel and detailed articles, I aim 
                to showcase the perfect blend of traditional heritage and ultramodern development 
                that makes Doha such a fascinating destination.
              </p>
              <p className="text-gray-700 mb-6">
                Whether you're interested in cultural attractions, culinary experiences, shopping 
                adventures, or local events, Experience Doha is your trusted companion for navigating 
                this dynamic city.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <Button className="bg-qatar-maroon hover:bg-qatar-maroon/90 text-white">
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube Channel
                </Button>
                <Button variant="outline" className="border-qatar-maroon text-qatar-maroon hover:bg-qatar-maroon/10">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=2574&auto=format&fit=crop" 
                alt="About Experience Doha" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-qatar-gold rounded-lg -z-10"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-qatar-maroon rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="bg-gray-50 py-16">
        <div className="content-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="section-title mx-auto">Our Mission</h2>
            <p className="text-gray-700 text-lg mb-8">
              To provide authentic, insightful, and practical information about Doha that inspires 
              visitors to explore beyond the tourist attractions and experience the city like a local.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-qatar-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-qatar-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Authentic Content</h3>
              <p className="text-gray-600">
                We share genuine experiences and honest reviews to help you make informed decisions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-qatar-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-qatar-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Cultural Bridge</h3>
              <p className="text-gray-600">
                We aim to connect visitors with Qatari culture, traditions, and local perspectives.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-qatar-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-qatar-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Community Focus</h3>
              <p className="text-gray-600">
                We build a community of travelers and expats sharing their love for Doha.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="content-container">
          <Newsletter />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
