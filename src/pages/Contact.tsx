
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, Globe, MapPin, Instagram, Youtube, Facebook, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Contact Us - Experience Doha"
        description="Get in touch with Experience Doha. Questions about Qatar travel, suggestions, or partnerships - we'd love to hear from you."
      />
      <NavBar />
      
      {/* Header */}
      <section className="bg-qatar-maroon text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions or suggestions? We'd love to hear from you!
          </p>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-qatar-maroon">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-qatar-maroon/30 focus:border-qatar-maroon focus:ring-qatar-maroon"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-qatar-maroon/30 focus:border-qatar-maroon focus:ring-qatar-maroon"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border-qatar-maroon/30 focus:border-qatar-maroon focus:ring-qatar-maroon"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border-qatar-maroon/30 focus:border-qatar-maroon focus:ring-qatar-maroon"
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-qatar-maroon hover:bg-qatar-maroon/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <div className="bg-qatar-maroon text-white rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 mt-1 text-qatar-gold" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:info@experiencedoha.com" className="text-white/80 hover:text-white">
                        info@experiencedoha.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 mr-3 mt-1 text-qatar-gold" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a href="https://experiencedoha.com" className="text-white/80 hover:text-white">
                        www.experiencedoha.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 text-qatar-gold" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-white/80">Doha, Qatar</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="font-medium mb-4">Follow Us</p>
                  <div className="flex space-x-4">
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                      <Youtube className="w-5 h-5 text-qatar-gold" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                      <Instagram className="w-5 h-5 text-qatar-gold" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                      <Facebook className="w-5 h-5 text-qatar-gold" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                      <Twitter className="w-5 h-5 text-qatar-gold" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-qatar-maroon">Collaboration Opportunities</h2>
                <p className="text-gray-600 mb-6">
                  We're always open to collaborations with local businesses, tourism organizations, 
                  and content creators. If you're interested in working together, please reach out 
                  with your proposal.
                </p>
                <Button className="bg-qatar-gold hover:bg-qatar-gold/90 text-qatar-maroon font-medium">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact for Collaborations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map */}
      <section className="py-8">
        <div className="content-container">
          <div className="rounded-lg overflow-hidden shadow-md h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115013.57441260627!2d51.4499391!3d25.2823224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x1cfa88cf812b4032!2sDoha%2C%20Qatar!5e0!3m2!1sen!2s!4v1619433610781!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Map of Doha"
            ></iframe>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
