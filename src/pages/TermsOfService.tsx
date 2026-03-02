
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Terms of Service - Experience Doha"
        description="Read the terms and conditions for using Experience Doha website and services."
        noindex
      />
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-qatar-maroon mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">Last updated: March 1, 2026</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using Experience Doha, you accept and agree to be bound by these Terms of Service and our Privacy Policy.</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">2. User Responsibilities</h2>
          <p>When using our website, you agree to:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>Provide accurate information</li>
            <li>Use the service for lawful purposes only</li>
            <li>Respect intellectual property rights</li>
            <li>Not misuse or attempt to harm our services</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">3. Content</h2>
          <p>All content on Experience Doha is protected by copyright and other intellectual property rights. Users may not reproduce, distribute, or create derivative works without our express permission.</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">4. Disclaimer</h2>
          <p>Our content is provided "as is" without warranties of any kind. We do not guarantee the accuracy or completeness of any information on our website.</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">5. Contact</h2>
          <p>For questions about these Terms of Service, please contact us at:</p>
          <p className="mt-2">Email: legal@experiencedoha.com</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
