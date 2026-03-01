
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Privacy Policy - Experience Doha"
        description="Learn how Experience Doha collects, uses, and protects your personal information."
      />
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-qatar-maroon mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">Last updated: March 1, 2026</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">1. Introduction</h2>
          <p>Experience Doha ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">2. Information We Collect</h2>
          <p>We collect information that you voluntarily provide to us when you:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>Subscribe to our newsletter</li>
            <li>Contact us through our contact form</li>
            <li>Comment on our blog posts</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>Send you our newsletter</li>
            <li>Respond to your inquiries</li>
            <li>Improve our website and services</li>
            <li>Send you updates about Doha events and activities</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">5. Cookies</h2>
          <p>We use cookies to improve your browsing experience. You can choose to disable cookies through your browser settings.</p>
          
          <h2 className="text-2xl font-semibold text-qatar-maroon mt-8 mb-4">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-2">Email: privacy@experiencedoha.com</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
