import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Facebook, Twitter, Share2 } from 'lucide-react';
import BlogCard from '@/components/BlogCard';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Mock blog post data
  // In a real app, you would fetch the specific post based on the slug
  const post = {
    id: '1',
    title: 'Top 10 Must-Visit Attractions in Doha',
    date: 'April 15, 2025',
    author: 'Experience Doha Team',
    readTime: '8 min read',
    category: 'Attractions',
    imageUrl: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?q=80&w=2668&auto=format&fit=crop',
    content: `
      <p>Doha, the capital city of Qatar, has transformed itself into a vibrant metropolis that seamlessly blends traditional Arabian heritage with futuristic architecture and world-class amenities. From cultural landmarks to modern marvels, here are the top 10 attractions you shouldn't miss when visiting Doha.</p>
      
      <h2>1. Museum of Islamic Art</h2>
      <p>Designed by the renowned architect I.M. Pei, the Museum of Islamic Art is a stunning geometric marvel that houses one of the world's most complete collections of Islamic artifacts. Located on its own island off the Corniche, the museum showcases 14 centuries of Islamic art from three continents.</p>
      
      <h2>2. Souq Waqif</h2>
      <p>This traditional marketplace has been a trading hub for centuries. Today's Souq Waqif has been carefully restored to preserve its authentic character while offering visitors a glimpse into traditional commerce and culture. Explore the maze-like alleys filled with spices, textiles, handicrafts, and local restaurants serving authentic Qatari cuisine.</p>
      
      <h2>3. The Pearl-Qatar</h2>
      <p>This artificial island spanning nearly four million square meters is a luxurious residential and retail destination. With its Mediterranean-style marinas, upscale shopping, and fine dining options, The Pearl is often referred to as the "Arabian Riviera."</p>
      
      <h2>4. Katara Cultural Village</h2>
      <p>Katara serves as Qatar's hub for arts, culture, and heritage. The village features an impressive open amphitheater, art galleries, performance venues, and international restaurants. Its architecture reflects traditional Qatari building styles, creating a harmonious blend of past and present.</p>
      
      <h2>5. National Museum of Qatar</h2>
      <p>Designed by Jean Nouvel to resemble a desert rose crystal, this architectural masterpiece tells the story of Qatar's past, present, and future. Through innovative exhibits and immersive experiences, visitors can explore the country's natural history, cultural heritage, and rapid development.</p>
      
      <h2>6. Aspire Park</h2>
      <p>As the largest park in Doha, Aspire Park offers a welcome green escape from the urban landscape. The park features walking tracks, sports facilities, and a large lake. The iconic Torch Doha hotel stands adjacent to the park, providing a striking backdrop.</p>
      
      <h2>7. Villaggio Mall</h2>
      <p>This Italian-themed shopping center is one of Doha's most popular retail destinations. Complete with an indoor canal, gondola rides, and a sky-painted ceiling, Villaggio Mall offers a unique shopping experience with a mix of luxury brands and entertainment options.</p>
      
      <h2>8. Doha Corniche</h2>
      <p>This seven-kilometer waterfront promenade stretches along Doha Bay, offering spectacular views of the city skyline. The Corniche is perfect for walking, jogging, or simply enjoying the sea breeze. Traditional wooden dhow boats line the harbor, adding to the picturesque scene.</p>
      
      <h2>9. State Grand Mosque (Imam Muhammad ibn Abd al-Wahhab Mosque)</h2>
      <p>This impressive mosque can accommodate over 30,000 worshippers and serves as Qatar's national mosque. Its architecture combines traditional elements with modern design, featuring multiple domes and minarets. Non-Muslim visitors can take guided tours to learn about Islamic culture and traditions.</p>
      
      <h2>10. Msheireb Downtown Doha</h2>
      <p>This sustainable urban regeneration project has transformed the historic commercial heart of Doha into a vibrant, walkable neighborhood. Featuring cutting-edge architecture that respects Qatari heritage, Msheireb offers museums, restaurants, shops, and public spaces in an environmentally friendly setting.</p>
      
      <p>Whether you're interested in art, culture, shopping, or architecture, Doha offers a diverse range of attractions that cater to all interests. Plan your visit to include these must-see destinations for a comprehensive experience of Qatar's capital city.</p>
    `,
  };
  
  // Mock related posts
  const relatedPosts = [
    {
      id: '2',
      title: 'Best Local Restaurants for Authentic Qatari Cuisine',
      excerpt: 'Taste the traditional flavors of Qatar at these local favorite dining spots.',
      imageUrl: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop',
      category: 'Food',
      date: 'April 10, 2025',
      slug: 'authentic-qatari-cuisine',
    },
    {
      id: '3',
      title: 'Upcoming Cultural Events in Doha This Summer',
      excerpt: 'Mark your calendar for these exciting cultural festivals and events.',
      imageUrl: 'https://images.unsplash.com/photo-1590238816987-368dde4d893d?q=80&w=800&auto=format&fit=crop',
      category: 'Events',
      date: 'April 5, 2025',
      slug: 'summer-cultural-events',
    },
    {
      id: '4',
      title: 'A Day at the Museum of Islamic Art',
      excerpt: 'Explore one of Doha\'s most iconic architectural landmarks and its world-class collections.',
      imageUrl: 'https://images.unsplash.com/photo-1590846280273-473a6401f8d0?q=80&w=800&auto=format&fit=crop',
      category: 'Attractions',
      date: 'April 2, 2025',
      slug: 'museum-islamic-art',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Blog Header */}
        <section className="relative">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${post.imageUrl})`,
              filter: "brightness(0.4)",
            }}
          ></div>
          <div className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 text-white text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-qatar-gold text-qatar-maroon hover:bg-qatar-gold/90">
              {post.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
              <div>
                By {post.author}
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Content */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Share Buttons */}
            <div className="flex justify-center mb-10">
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Tweet
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Copy Link
                </Button>
              </div>
            </div>
            
            {/* Article Content */}
            <article className="prose prose-lg max-w-none prose-headings:text-qatar-maroon prose-headings:font-heading prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-700 prose-p:mb-6">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-700 font-medium">Tags:</span>
                <Link to="/blog/category/attractions" className="text-qatar-maroon hover:text-qatar-gold transition-colors">
                  #Attractions
                </Link>
                <Link to="/blog/category/doha" className="text-qatar-maroon hover:text-qatar-gold transition-colors">
                  #Doha
                </Link>
                <Link to="/blog/category/travel" className="text-qatar-maroon hover:text-qatar-gold transition-colors">
                  #Travel
                </Link>
                <Link to="/blog/category/qatar" className="text-qatar-maroon hover:text-qatar-gold transition-colors">
                  #Qatar
                </Link>
              </div>
            </div>
            
            {/* Author Box */}
            <div className="mt-10 bg-gray-50 rounded-lg p-6">
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop" 
                  alt="Author" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold text-lg">Experience Doha Team</h3>
                  <p className="text-gray-600 text-sm">
                    Passionate about showcasing the best of Qatar to visitors and residents alike.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Posts */}
        <section className="bg-gray-50 py-16">
          <div className="content-container">
            <h2 className="section-title mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(post => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
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

export default BlogPost;
