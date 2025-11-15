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
  
  // Blog post data based on slug
  const blogPosts: Record<string, any> = {
    'qatar-stopover-program-guide': {
      id: '11',
      title: 'Complete Doha Layover Guide: Qatar Stopover Program Explained',
      date: 'April 20, 2025',
      author: 'Experience Doha Team',
      readTime: '12 min read',
      category: 'Expat-Tips',
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2668&auto=format&fit=crop',
      content: `
        <p>Qatar Airways has positioned itself as more than just an airline—it's become a gateway to experiencing one of the Middle East's most dynamic destinations through its innovative Stopover Program. This initiative transforms what would otherwise be a tedious layover into an opportunity for genuine exploration, offering travelers remarkably affordable packages that include accommodation, tours, and experiences in Doha.</p>
        
        <h2 id="what-is-the-program">What Is the Qatar Stopover Program?</h2>
        <p>The Qatar Stopover Program allows passengers flying with Qatar Airways to extend their layover for one to four nights at significantly reduced rates. Hotels that typically command hundreds of dollars per night become accessible at prices starting from just $14 per person per night for three-star properties, scaling up to around $50 for five-star luxury accommodations. This pricing structure makes the program one of the most competitive stopover offerings in the aviation industry, rivaling similar programs from Singapore Airlines and Turkish Airlines.</p>
        
        <h2 id="eligibility">Eligibility Requirements</h2>
        <p>Eligibility for the program is straightforward but specific. Travelers must be flying internationally on Qatar Airways with a connecting flight through Hamad International Airport. The stopover must be booked as part of an existing Qatar Airways itinerary, and the minimum connection time between flights should be at least 12 hours. Importantly, passengers need to ensure they have the appropriate visa arrangements, though Qatar has made this considerably easier by offering visa-free entry to citizens of over 80 countries and streamlined visa-on-arrival processes for many others.</p>
        
        <h2 id="how-to-book">How to Book Your Stopover</h2>
        <p>Booking the stopover requires planning ahead, ideally at the time of purchasing your flights. The process can be completed through Qatar Airways' website by selecting the "Add Stopover" option during the booking flow, or by contacting Qatar Airways directly. Travel agents familiar with the program can also facilitate bookings, often with additional insights about the best properties and packages available. The earlier you book, the better selection of hotels you'll have, particularly during peak travel seasons or major events in Qatar.</p>
        
        <h2 id="accommodation">Accommodation Options</h2>
        <p>The accommodation options span the full spectrum of hospitality. Budget-conscious travelers can select from comfortable three-star hotels that provide clean, modern rooms with essential amenities. Mid-range options include four-star properties with additional features like swimming pools, multiple dining venues, and central locations. For those seeking luxury, five-star hotels from renowned chains like Marriott, Ritz-Carlton, and Mandarin Oriental participate in the program, offering world-class service at a fraction of their standard rates.</p>
        
        <h2 id="perks">Additional Perks and Benefits</h2>
        <p>Beyond accommodation, the program often includes additional perks that enhance the value proposition. Some packages bundle airport transfers, ensuring seamless transportation between Hamad International Airport and your hotel. Others incorporate breakfast, city tours, or museum entry tickets. During major sporting events or cultural festivals, special packages emerge that include tickets to these attractions, providing experiences that would otherwise require significant planning and expense.</p>
        
        <h2 id="logistics">Logistics and Execution</h2>
        <p>The practical execution of a stopover requires attention to logistics. Upon landing at Hamad International Airport, travelers proceed through immigration using the dedicated stopover lanes where available. Luggage is typically checked through to the final destination, though this should be confirmed at check-in. Hotel transfers, when included, meet passengers in the arrivals hall with clear signage. The process is designed to minimize friction, allowing travelers to maximize their limited time in Doha.</p>
        
        <h2 id="value">What Makes It Valuable</h2>
        <p>What makes the program particularly valuable is the quality of experiences it enables. Qatar has invested billions in cultural infrastructure, from the iconic Museum of Islamic Art to the desert landscapes accessible just outside the city. A single night in Doha can include visits to Souq Waqif's atmospheric alleys, a dhow cruise along the Corniche, or a thrilling desert safari complete with dune bashing and traditional Bedouin hospitality. The stopover transforms a journey's interruption into a journey's highlight.</p>
        
        <h2 id="best-practices">Best Practices for Success</h2>
        <p>Successful utilization of the Qatar Stopover Program involves several considerations. Researching hotel locations relative to attractions helps maximize time efficiency. Understanding prayer times and cultural norms ensures respectful navigation of local customs. Booking popular restaurants and experiences in advance prevents disappointment, particularly during peak seasons. Finally, allowing buffer time for airport procedures ensures stress-free continuation of your journey.</p>
        
        <h2 id="value-comparison">Comparing Value Propositions</h2>
        <p>When compared to paying for accommodation and experiences independently, the stopover program's value becomes apparent. A night in a five-star Doha hotel at standard rates could easily exceed $300, while the stopover program offers similar properties at a fraction of the cost. When factored in with potential tours, meals, and transfers, savings can reach hundreds of dollars, effectively making the stopover a nearly cost-free addition to your journey.</p>
        
        <h2 id="travel-planning">Strategic Travel Planning</h2>
        <p>From a strategic travel planning perspective, the program offers unique advantages. Long-haul travelers can break up exhausting journeys with a comfortable stay, arriving at their final destination more refreshed. Business travelers can use the stopover to explore potential opportunities in Qatar's growing economy. Families can turn a connection into an educational adventure for children, exposing them to a different culture and geography.</p>
        
        <h2 id="conclusion">Conclusion</h2>
        <p>The Qatar Stopover Program represents a sophisticated approach to transit hospitality, one that recognizes passengers as potential tourists rather than mere connections. For travelers willing to extend their journey by even a single night, it offers remarkable value and memorable experiences. Whether you're seeking luxury relaxation, cultural immersion, or adventurous exploration, the program provides the framework and affordability to make your layover in Doha truly worthwhile.</p>
      `,
      tableOfContents: [
        { title: 'What Is the Qatar Stopover Program?', id: 'what-is-the-program' },
        { title: 'Eligibility Requirements', id: 'eligibility' },
        { title: 'How to Book Your Stopover', id: 'how-to-book' },
        { title: 'Accommodation Options', id: 'accommodation' },
        { title: 'Additional Perks and Benefits', id: 'perks' },
        { title: 'Logistics and Execution', id: 'logistics' },
        { title: 'What Makes It Valuable', id: 'value' },
        { title: 'Best Practices for Success', id: 'best-practices' },
        { title: 'Comparing Value Propositions', id: 'value-comparison' },
        { title: 'Strategic Travel Planning', id: 'travel-planning' },
        { title: 'Conclusion', id: 'conclusion' }
      ],
      tags: ['Travel Tips', 'Qatar Airways', 'Stopover', 'Doha', 'Travel Planning']
    },
    'default': {
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
        <p>One of the world's most ambitious sustainable urban regeneration projects, Msheireb Downtown Doha represents a new vision for urban living. The area combines contemporary architecture with traditional Qatari design principles, creating a walkable district that honors the past while embracing the future.</p>
        
        <p>Whether you're a first-time visitor or a long-time resident, these attractions showcase the best of what Doha has to offer. Each destination tells a part of Qatar's story, from its ancient trading heritage to its modern ambitions. Plan your visit to include these highlights, and you'll leave with a deeper appreciation for this remarkable city.</p>
      `,
      tags: ['Attractions', 'Museums', 'Culture', 'Shopping', 'Architecture']
    }
  };
  
  const post = blogPosts[slug || 'default'] || blogPosts['default'];
  
  const relatedPosts = [
    {
      id: '2',
      title: 'Best Local Restaurants for Authentic Qatari Cuisine',
      excerpt: 'Taste the traditional flavors of Qatar at these local favorite dining spots.',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
      category: 'Food',
      date: 'April 10, 2025',
      slug: 'authentic-qatari-cuisine',
    },
    {
      id: '3',
      title: 'Upcoming Cultural Events in Doha This Summer',
      excerpt: 'Mark your calendar for these exciting cultural festivals and events.',
      imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop',
      category: 'Events',
      date: 'April 5, 2025',
      slug: 'summer-cultural-events',
    },
    {
      id: '4',
      title: 'A Day at the Museum of Islamic Art',
      excerpt: 'Explore one of Doha\'s most iconic architectural landmarks and its world-class collections.',
      imageUrl: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&auto=format&fit=crop',
      category: 'Attractions',
      date: 'April 2, 2025',
      slug: 'museum-islamic-art',
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 content-container pb-8">
            <Badge className="mb-4 bg-qatar-gold text-qatar-maroon hover:bg-qatar-gold">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="content-container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Table of Contents */}
              {post.tableOfContents && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-qatar-maroon">
                  <h3 className="text-lg font-bold mb-4 text-qatar-maroon">Table of Contents</h3>
                  <nav className="space-y-2">
                    {post.tableOfContents.map((item: { title: string; id: string }) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-gray-900 hover:text-qatar-gold transition-colors py-1 hover:translate-x-1 transform duration-200 font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        → {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Share Buttons */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b">
                <span className="text-sm font-medium text-gray-600">Share this article:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`, '_blank')}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyLink}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-sm font-medium text-gray-600 mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Author Box */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-xl mb-2">About the Author</h3>
                <p className="text-gray-600">
                  The Experience Doha Team consists of local experts and passionate travelers dedicated to bringing you the most authentic and up-to-date information about Qatar's vibrant capital.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter Signup */}
              <div className="sticky top-8">
                <div className="bg-qatar-maroon text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                  <p className="text-sm mb-4 text-white/90">
                    Get the latest articles and travel tips delivered to your inbox.
                  </p>
                  <Link to="/#newsletter">
                    <Button className="w-full bg-qatar-gold text-qatar-maroon hover:bg-qatar-gold/90">
                      Subscribe Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-gray-50 py-16">
          <div className="content-container">
            <h2 className="section-title">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} {...relatedPost} />
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
