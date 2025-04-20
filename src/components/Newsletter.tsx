
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
    }, 1000);
  };

  return (
    <div className="bg-qatar-maroon bg-qatar-pattern text-white py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with Doha's Latest</h2>
        <p className="text-lg mb-8 text-white/80">
          Subscribe to our newsletter for updates on events, new attractions, and insider tips for experiencing Doha.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow bg-white/10 border-qatar-gold text-white placeholder:text-white/70"
            required
          />
          <Button 
            type="submit"
            className="bg-qatar-gold hover:bg-qatar-gold/90 text-qatar-maroon font-bold"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
