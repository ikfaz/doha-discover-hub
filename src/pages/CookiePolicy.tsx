
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Cookie Policy - Experience Doha"
        description="Learn about the cookies we use on Experience Doha and how to manage your preferences."
        noindex
      />
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-qatar-maroon mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">Last updated: March 1, 2026</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">1. What Are Cookies?</h2>
          <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and understand how visitors use our site.</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">2. Types of Cookies We Use</h2>
          <ul className="list-disc ml-6 mb-6">
            <li>Essential cookies: Required for basic site functionality</li>
            <li>Analytics cookies: Help us understand how visitors use our site</li>
            <li>Preference cookies: Remember your settings and preferences</li>
            <li>Marketing cookies: Used for personalized advertisements</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">3. Managing Cookies</h2>
          <p>You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your user experience.</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">4. Updates to This Policy</h2>
          <p>We may update this Cookie Policy periodically. Please check back regularly to stay informed about our use of cookies.</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">5. Contact Us</h2>
          <p>If you have questions about our Cookie Policy, please contact us at:</p>
          <p className="mt-2">Email: privacy@experiencedoha.com</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
