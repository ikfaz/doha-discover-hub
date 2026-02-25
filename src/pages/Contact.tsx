import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, Globe, MapPin, Instagram, Youtube, Facebook, Twitter } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast({ title: t('contact.messageSent'), description: t('contact.messageDesc') });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Contact Us - Experience Doha"
        description="Have a question about Doha or Qatar? Reach out for travel tips, partnership inquiries, or content suggestions. We reply fast."
      />
      <NavBar />
      
      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">{t('contact.title')}</h1>
          <p className="text-xl max-w-3xl mx-auto text-secondary-foreground/80">{t('contact.subtitle')}</p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-secondary">{t('contact.sendMessage')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">{t('contact.yourName')}</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">{t('contact.emailAddress')}</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">{t('contact.subject')}</label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">{t('contact.message')}</label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full" />
                </div>
                <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={isSubmitting}>
                  {isSubmitting ? t('contact.sending') : t('contact.send')}
                </Button>
              </form>
            </div>
            
            <div>
              <div className="bg-secondary text-secondary-foreground rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">{t('contact.contactInfo')}</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 me-3 mt-1 text-sand-gold" aria-hidden="true" />
                    <div>
                      <p className="font-medium">{t('contact.email')}</p>
                      <a href="mailto:info@experiencedoha.com" className="text-secondary-foreground/80 hover:text-white">info@experiencedoha.com</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 me-3 mt-1 text-sand-gold" aria-hidden="true" />
                    <div>
                      <p className="font-medium">{t('contact.website')}</p>
                      <a href="https://experiencedoha.com" className="text-secondary-foreground/80 hover:text-white">www.experiencedoha.com</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 me-3 mt-1 text-sand-gold" aria-hidden="true" />
                    <div>
                      <p className="font-medium">{t('contact.location')}</p>
                      <p className="text-secondary-foreground/80">{t('contact.dohaQatar')}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="font-medium mb-4">{t('contact.followUs')}</p>
                  <div className="flex space-x-4">
                    {[
                      { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
                      { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
                      { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
                      { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
                    ].map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors" aria-label={s.label}>
                        <s.icon className="w-5 h-5 text-sand-gold" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-secondary">{t('contact.collaboration')}</h2>
                <p className="text-muted-foreground mb-6">{t('contact.collaborationDesc')}</p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                  <Mail className="me-2 h-4 w-4" aria-hidden="true" />
                  {t('contact.contactCollaboration')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-8">
        <div className="content-container">
          <div className="rounded-lg overflow-hidden shadow-md h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115013.57441260627!2d51.4499391!3d25.2823224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x1cfa88cf812b4032!2sDoha%2C%20Qatar!5e0!3m2!1sen!2s!4v1619433610781!5m2!1sen!2s" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" sandbox="allow-scripts allow-same-origin allow-popups"
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
