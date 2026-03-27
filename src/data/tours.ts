export interface TourStop {
  time: string;
  title: string;
  description: string;
  duration: string;
}

export interface TourReview {
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  country: string;
}

export interface Tour {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  mapImage: string;
  rating: number;
  reviewCount: number;
  duration: string;
  groupSize: string;
  language: string;
  category: string;
  pricePerPerson: number;
  currency: string;
  viatorUrl: string;
  overview: string;
  highlights: string[];
  itinerary: TourStop[];
  inclusions: string[];
  exclusions: string[];
  reviews: TourReview[];
}

export const tours: Tour[] = [
  {
    slug: 'private-desert-safari',
    title: 'Private Desert Safari: Dune Bashing, Camel Ride & Inland Sea',
    subtitle: 'Experience Qatar\'s most thrilling desert adventure with a private guide',
    heroImage: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=2670&auto=format&fit=crop',
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 1247,
    duration: '6 hours',
    groupSize: 'Up to 6 people',
    language: 'English, Arabic',
    category: 'Adventure',
    pricePerPerson: 85,
    currency: 'USD',
    viatorUrl: 'https://www.viator.com/tours/Doha/Private-Desert-Safari-Dune-Bashing-Camel-Ride-Sand-Boarding-Inland-Sea-Visit/d4453-41683P18?medium=link&pid=P00290081&mcid=42383',
    overview: 'Embark on an unforgettable journey into the heart of Qatar\'s golden desert. This private 6-hour safari takes you from the towering dunes of the Sealine Desert to the breathtaking shores of the Inland Sea (Khor Al Adaid), a UNESCO-recognized natural reserve where the desert meets the sea.\n\nYour experienced driver-guide will navigate the towering sand dunes in a powerful 4x4 Land Cruiser, delivering an adrenaline-pumping dune bashing experience. Along the way, stop for camel rides across pristine sands, try your hand at sandboarding down steep dunes, and capture stunning photographs of the ever-shifting landscape.\n\nThe tour culminates at the magnificent Inland Sea, where turquoise waters lap against golden shores in one of the most surreal natural settings on Earth. It\'s a once-in-a-lifetime experience that showcases Qatar\'s raw, untamed beauty.',
    highlights: [
      'Private 4x4 dune bashing with an expert driver',
      'Camel riding across golden desert sands',
      'Sandboarding on towering dunes',
      'Visit the UNESCO-recognized Inland Sea (Khor Al Adaid)',
      'Professional photography opportunities at sunset',
      'Refreshments and snacks provided',
      'Hotel pickup and drop-off included',
    ],
    itinerary: [
      { time: '14:00', title: 'Hotel Pickup', description: 'Your private driver collects you from your hotel in a comfortable, air-conditioned Toyota Land Cruiser.', duration: '30 min' },
      { time: '14:30', title: 'Drive to Sealine Desert', description: 'Journey south through the outskirts of Doha toward the vast Sealine Desert. Your guide shares fascinating facts about Qatar\'s geography and Bedouin heritage.', duration: '45 min' },
      { time: '15:15', title: 'Dune Bashing Adventure', description: 'Hold on tight as your expert driver navigates the towering sand dunes at thrilling speeds. Feel the rush of adrenaline as the Land Cruiser climbs, dips, and slides across the golden terrain.', duration: '45 min' },
      { time: '16:00', title: 'Camel Ride & Sandboarding', description: 'Take a break from the 4x4 and experience the desert like a true Bedouin. Ride a gentle camel across the sands, then strap on a board and slide down the steepest dunes.', duration: '45 min' },
      { time: '16:45', title: 'Inland Sea (Khor Al Adaid)', description: 'Arrive at the stunning Inland Sea, where the desert meets the ocean. Explore the shoreline, wade in the shallow waters, and take in one of nature\'s most spectacular meeting points.', duration: '60 min' },
      { time: '17:45', title: 'Sunset & Return', description: 'Watch the sun dip below the dunes as you begin the journey back. Arrive at your hotel by approximately 20:00.', duration: '2 hrs' },
    ],
    inclusions: [
      'Private 4x4 Toyota Land Cruiser',
      'Licensed English/Arabic speaking driver-guide',
      'Hotel pickup and drop-off (Doha area)',
      'Dune bashing experience',
      'Camel ride (15-20 minutes)',
      'Sandboarding equipment',
      'Bottled water and light snacks',
      'Professional photos (digital)',
    ],
    exclusions: [
      'Meals and additional drinks',
      'Gratuities (optional)',
      'Personal expenses',
      'Travel insurance',
      'Pickup from locations outside central Doha (surcharge applies)',
    ],
    reviews: [
      { name: 'James M.', avatar: 'JM', rating: 5, date: 'January 2026', comment: 'Absolutely incredible experience! Our driver Mohammed was fantastic — skilled at dune bashing and incredibly knowledgeable about the desert. The Inland Sea was breathtaking. A must-do in Qatar.', country: 'United Kingdom' },
      { name: 'Sarah L.', avatar: 'SL', rating: 5, date: 'December 2025', comment: 'Best tour we\'ve ever done! The private experience made it so special. Sandboarding was a blast and the camel ride at sunset was magical. Highly recommend!', country: 'Australia' },
      { name: 'Ahmed K.', avatar: 'AK', rating: 4, date: 'November 2025', comment: 'Great tour overall. The dune bashing was thrilling and the Inland Sea is truly a wonder. Only minor note: bring sunscreen and a hat — it gets hot even in winter!', country: 'UAE' },
      { name: 'Maria G.', avatar: 'MG', rating: 5, date: 'October 2025', comment: 'We did this with our two kids (8 and 12) and they LOVED it. The driver was very careful and adjusted the intensity for the children. The photos he took for us were amazing.', country: 'Spain' },
      { name: 'Chen W.', avatar: 'CW', rating: 5, date: 'September 2025', comment: 'Worth every penny. The Inland Sea is one of the most beautiful places I\'ve ever seen. Make sure to book the afternoon slot for the sunset views!', country: 'Singapore' },
    ],
  },
  {
    slug: 'doha-city-tour',
    title: 'Doha City Tour: Culture, Heritage & Modern Marvels',
    subtitle: 'Explore the best of Doha in a guided half-day experience',
    heroImage: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=2574&auto=format&fit=crop',
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 892,
    duration: '5 hours',
    groupSize: 'Up to 8 people',
    language: 'English, Arabic',
    category: 'Culture',
    pricePerPerson: 65,
    currency: 'USD',
    viatorUrl: 'https://www.viator.com/Doha/d4453-ttd?pid=P00290081&mcid=42383',
    overview: 'Discover the captivating blend of ancient tradition and futuristic vision that defines Qatar\'s capital city. This comprehensive half-day tour takes you through Doha\'s most iconic landmarks, from the atmospheric lanes of Souq Waqif to the gleaming towers of West Bay.\n\nVisit the world-renowned Museum of Islamic Art, designed by I.M. Pei, and stroll along the picturesque Corniche. Explore the vibrant Katara Cultural Village and marvel at The Pearl-Qatar\'s luxury marina. Your expert guide brings each location to life with fascinating stories of Qatar\'s rapid transformation from a pearl-diving village to one of the world\'s wealthiest nations.',
    highlights: [
      'Museum of Islamic Art (exterior and park)',
      'Souq Waqif walking tour with local guide',
      'Doha Corniche promenade',
      'Katara Cultural Village',
      'The Pearl-Qatar marina district',
      'West Bay skyline views',
      'Local tea and snack tasting',
    ],
    itinerary: [
      { time: '08:00', title: 'Hotel Pickup', description: 'Comfortable pickup from your Doha hotel.', duration: '15 min' },
      { time: '08:15', title: 'Museum of Islamic Art', description: 'Begin at the iconic MIA, exploring the stunning architecture and waterfront park designed by I.M. Pei.', duration: '45 min' },
      { time: '09:00', title: 'Souq Waqif', description: 'Wander through the atmospheric lanes of this restored traditional market. Discover spice stalls, falcon shops, and art galleries.', duration: '60 min' },
      { time: '10:00', title: 'Doha Corniche', description: 'Stroll along the iconic 7km waterfront promenade with panoramic views of the West Bay skyline.', duration: '30 min' },
      { time: '10:30', title: 'Katara Cultural Village', description: 'Explore this cultural hub featuring art galleries, amphitheaters, and beautiful Islamic architecture.', duration: '45 min' },
      { time: '11:15', title: 'The Pearl-Qatar', description: 'Visit the luxurious man-made island with its marina, boutiques, and Mediterranean-inspired architecture.', duration: '45 min' },
      { time: '12:00', title: 'Return to Hotel', description: 'Comfortable drop-off at your hotel with lasting memories of Doha.', duration: '15 min' },
    ],
    inclusions: [
      'Air-conditioned vehicle',
      'Professional English-speaking guide',
      'Hotel pickup and drop-off',
      'Bottled water',
      'Local tea and snack tasting at Souq Waqif',
    ],
    exclusions: [
      'Museum entrance fees (if applicable)',
      'Meals and additional drinks',
      'Gratuities (optional)',
      'Personal shopping expenses',
    ],
    reviews: [
      { name: 'Emma T.', avatar: 'ET', rating: 5, date: 'February 2026', comment: 'Our guide was phenomenal! So knowledgeable about Doha\'s history and culture. The Souq Waqif was a highlight — we spent extra time there exploring.', country: 'Canada' },
      { name: 'Ravi P.', avatar: 'RP', rating: 4, date: 'January 2026', comment: 'Good overview of the city. I wish we had more time at the Museum of Islamic Art, but overall a well-organized tour.', country: 'India' },
      { name: 'Lisa H.', avatar: 'LH', rating: 5, date: 'December 2025', comment: 'Perfect for a layover! We only had one day in Doha and this tour covered all the major sights. Highly recommended.', country: 'Germany' },
    ],
  },
];

export const getTourBySlug = (slug: string): Tour | undefined => {
  return tours.find(t => t.slug === slug);
};
