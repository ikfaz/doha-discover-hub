import { Listing } from '@/types/listing';

export const listings: Listing[] = [
  {
    id: '1',
    slug: 'the-pearl-qatar-marriott',
    name: 'The Pearl Qatar Marriott',
    category: 'hotel',
    neighborhood: 'The Pearl',
    price: '$$$$',
    rating: 4.9,
    reviewCount: 342,
    description: 'Experience luxury at its finest at The Pearl Qatar Marriott, nestled in the heart of The Pearl-Qatar. This stunning waterfront hotel offers panoramic views of the Arabian Gulf, world-class dining, and impeccable service. Perfect for business travelers and families alike, the hotel features spacious rooms with modern amenities, a rooftop infinity pool, spa facilities, and direct access to upscale shopping and dining. Pet-friendly accommodations available.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&auto=format&fit=crop'
    ],
    badges: ['Luxury', 'Pet-Friendly', 'Free WiFi', 'Infinity Pool'],
    location: {
      address: 'The Pearl-Qatar, Doha',
      mapUrl: 'https://maps.google.com/?q=The+Pearl+Qatar+Marriott'
    },
    insiderTips: [
      'Request a room on higher floors for stunning marina views',
      'Book spa treatments in advance during peak season',
      'Ask about the complimentary shuttle service to major attractions'
    ],
    affiliateLinks: {
      booking: 'https://booking.com/hotel/qa/marriott-pearl'
    },
    petPolicy: 'Yes',
    dressCode: 'Smart casual for restaurants',
    bestTime: 'October to April for outdoor pool enjoyment',
    featured: true
  },
  {
    id: '2',
    slug: 'al-mourjan-restaurant',
    name: 'Al Mourjan Restaurant',
    category: 'restaurant',
    neighborhood: 'Souq Waqif',
    price: '$$$',
    rating: 4.8,
    reviewCount: 521,
    description: 'Discover authentic Qatari cuisine in an elegant waterfront setting at Al Mourjan Restaurant. This award-winning establishment showcases traditional Middle Eastern flavors with a modern twist. Savor fresh seafood, premium meats, and aromatic spices while enjoying breathtaking views of the Doha skyline. The restaurant features both indoor air-conditioned seating and outdoor terraces, perfect for romantic dinners or family gatherings.',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1200&auto=format&fit=crop'
    ],
    badges: ['Halal', 'Waterfront', 'Fine Dining', 'Pet-Friendly Terrace'],
    location: {
      address: 'Corniche Road, Near Museum of Islamic Art, Doha',
      mapUrl: 'https://maps.google.com/?q=Al+Mourjan+Restaurant+Doha'
    },
    insiderTips: [
      'Reserve a terrace table at sunset for the best views',
      'Try the mixed grill platter - it\'s their signature dish',
      'Valet parking available, arrive 15 minutes early on weekends'
    ],
    affiliateLinks: {
      getyourguide: 'https://getyourguide.com/al-mourjan'
    },
    petPolicy: 'Yes',
    dressCode: 'Smart casual required',
    bestTime: 'Evening for sunset views, cooler outdoor seating',
    featured: true
  },
  {
    id: '3',
    slug: 'desert-safari-qatar',
    name: 'Desert Safari Qatar',
    category: 'activity',
    neighborhood: 'Sealine Beach',
    price: '$$$',
    rating: 4.7,
    reviewCount: 1089,
    description: 'Embark on an unforgettable adventure through the stunning sand dunes of Qatar\'s desert landscape. This thrilling desert safari includes dune bashing in 4x4 vehicles, camel rides, sandboarding, and a traditional Bedouin-style camp experience. Watch the sunset over golden dunes, enjoy authentic Arabic coffee and dates, and feast on a delicious BBQ dinner under the stars. Perfect for families and adventure seekers.',
    images: [
      'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200&auto=format&fit=crop'
    ],
    badges: ['Adventure', 'Family-Friendly', 'Sunset Views', 'Dinner Included'],
    location: {
      address: 'Sealine Beach Resort Area, South of Doha',
      mapUrl: 'https://maps.google.com/?q=Sealine+Beach+Qatar'
    },
    insiderTips: [
      'Bring sunscreen and sunglasses - the desert sun is intense',
      'Wear comfortable closed-toe shoes for sandboarding',
      'Book the evening tour for cooler temperatures and sunset views'
    ],
    affiliateLinks: {
      viator: 'https://viator.com/desert-safari-qatar',
      getyourguide: 'https://getyourguide.com/desert-safari-qatar'
    },
    petPolicy: 'No',
    dressCode: 'Casual, comfortable clothing and closed shoes',
    bestTime: 'October to March for cooler weather',
    featured: true
  },
  {
    id: '4',
    slug: 'museum-of-islamic-art',
    name: 'Museum of Islamic Art',
    category: 'attraction',
    neighborhood: 'Corniche',
    price: '$',
    rating: 4.9,
    reviewCount: 2341,
    description: 'Immerse yourself in 1,400 years of Islamic heritage at this architectural masterpiece designed by I.M. Pei. The Museum of Islamic Art houses one of the world\'s most complete collections of Islamic artifacts, spanning three continents. Explore stunning galleries featuring ceramics, textiles, metalwork, and manuscripts. The building itself is a work of art, with its geometric design and stunning waterfront location offering panoramic views of Doha\'s skyline.',
    images: [
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565552645632-d725f8bfc19d?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572177811994-34e7d155b353?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&auto=format&fit=crop'
    ],
    badges: ['Free Entry', 'Cultural', 'Family-Friendly', 'Air Conditioned'],
    location: {
      address: 'Museum Park Street, off the Corniche, Doha',
      mapUrl: 'https://maps.google.com/?q=Museum+of+Islamic+Art+Doha'
    },
    insiderTips: [
      'Visit on Saturday mornings for fewer crowds',
      'Don\'t miss the stunning atrium - perfect for photos',
      'Enjoy lunch at IDAM restaurant by Alain Ducasse inside the museum'
    ],
    affiliateLinks: {},
    petPolicy: 'Service animals only',
    dressCode: 'Modest dress recommended (shoulders and knees covered)',
    bestTime: 'Weekday mornings for peaceful exploration',
    featured: true
  },
  {
    id: '5',
    slug: 'souq-waqif',
    name: 'Souq Waqif',
    category: 'neighborhood',
    neighborhood: 'Old Doha',
    price: '$',
    rating: 4.8,
    reviewCount: 3127,
    description: 'Step back in time at Doha\'s most iconic traditional marketplace. Souq Waqif is a vibrant maze of alleyways filled with spice vendors, textile shops, traditional handicrafts, and authentic restaurants. Experience the sights, sounds, and aromas of old Arabia while shopping for souvenirs, sampling local cuisine, or simply soaking in the atmosphere. The souq comes alive in the evenings with live entertainment and bustling cafes.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&auto=format&fit=crop'
    ],
    badges: ['Free Entry', 'Shopping', 'Cultural', 'Evening Entertainment'],
    location: {
      address: 'Al Souq, Doha',
      mapUrl: 'https://maps.google.com/?q=Souq+Waqif+Doha'
    },
    insiderTips: [
      'Visit after 4 PM when shops open and temperatures cool',
      'Bargaining is expected - start at 50% of asking price',
      'Try traditional karak tea at one of the small cafes'
    ],
    affiliateLinks: {
      getyourguide: 'https://getyourguide.com/souq-waqif-tour'
    },
    petPolicy: 'Yes',
    bestTime: 'Evening (5-10 PM) for atmosphere and cooler weather',
    featured: true
  },
  {
    id: '6',
    slug: 'katara-cultural-village',
    name: 'Katara Cultural Village',
    category: 'attraction',
    neighborhood: 'West Bay',
    price: '$',
    rating: 4.7,
    reviewCount: 1856,
    description: 'Explore Qatar\'s premier cultural destination, featuring stunning architecture, art galleries, theaters, and a beautiful public beach. Katara Cultural Village hosts international festivals, concerts, and exhibitions year-round. Stroll through the amphitheater, admire the iconic Katara Mosque with its blue-tiled exterior, browse art galleries, and dine at world-class restaurants. The beachfront promenade offers water sports and family-friendly activities.',
    images: [
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=1200&auto=format&fit=crop'
    ],
    badges: ['Free Entry', 'Cultural', 'Beach', 'Family-Friendly'],
    location: {
      address: 'Katara Cultural Village, West Bay, Doha',
      mapUrl: 'https://maps.google.com/?q=Katara+Cultural+Village+Doha'
    },
    insiderTips: [
      'Check the events calendar for festivals and performances',
      'Visit the pigeon towers for unique photo opportunities',
      'Park near Beach 1 for easiest access to main attractions'
    ],
    affiliateLinks: {},
    petPolicy: 'Yes',
    dressCode: 'Modest beachwear, cover-ups required when leaving beach',
    bestTime: 'Late afternoon to evening, especially on weekends',
    featured: true
  },
  // Additional 24 listings to reach 30+
  {
    id: '7',
    slug: 'w-doha-hotel',
    name: 'W Doha Hotel & Residences',
    category: 'hotel',
    neighborhood: 'West Bay',
    price: '$$$$',
    rating: 4.8,
    reviewCount: 412,
    description: 'A bold and innovative luxury hotel in the heart of West Bay, offering stunning city and sea views. Features modern rooms with cutting-edge design, rooftop pool, multiple dining venues, and vibrant nightlife. Popular with business travelers and luxury seekers.',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop'
    ],
    badges: ['Luxury', 'Rooftop Pool', 'Nightlife'],
    location: { address: 'West Bay, Doha', mapUrl: 'https://maps.google.com/?q=W+Doha' },
    insiderTips: ['Book WET pool access in advance', 'Try Crystal at MARKET for brunch'],
    affiliateLinks: { booking: 'https://booking.com/hotel/qa/w-doha' },
    petPolicy: 'No',
    dressCode: 'Smart casual',
    bestTime: 'Year-round for indoor luxury'
  },
  {
    id: '8',
    slug: 'banana-island-resort',
    name: 'Banana Island Resort Doha by Anantara',
    category: 'hotel',
    neighborhood: 'Banana Island',
    price: '$$$$',
    rating: 4.9,
    reviewCount: 289,
    description: 'An exclusive island resort just 20 minutes by ferry from Doha. Offers pristine beaches, water sports, multiple pools, spa, and exceptional dining. Perfect for a luxurious escape without leaving Qatar.',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&auto=format&fit=crop'
    ],
    badges: ['Luxury', 'Private Island', 'Beach', 'Spa'],
    location: { address: 'Banana Island, Doha', mapUrl: 'https://maps.google.com/?q=Banana+Island+Doha' },
    insiderTips: ['Ferry departs from Al Shamal Gate', 'Book water villa for best experience'],
    affiliateLinks: { booking: 'https://booking.com/hotel/qa/banana-island' },
    petPolicy: 'No',
    bestTime: 'October to May for beach activities',
    featured: true
  },
  {
    id: '9',
    slug: 'jiwan-restaurant',
    name: 'Jiwan Restaurant',
    category: 'restaurant',
    neighborhood: 'Katara',
    price: '$$$',
    rating: 4.7,
    reviewCount: 387,
    description: 'Helmed by celebrity chef Alain Ducasse, Jiwan offers contemporary Arabic cuisine with stunning sea views. The menu celebrates local ingredients with French techniques, creating unique fusion dishes.',
    images: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1200&auto=format&fit=crop'
    ],
    badges: ['Fine Dining', 'Halal', 'Sea View'],
    location: { address: 'Katara Cultural Village, Doha', mapUrl: 'https://maps.google.com/?q=Jiwan+Restaurant+Doha' },
    insiderTips: ['Reserve terrace seating for sunset', 'Try the tasting menu'],
    affiliateLinks: {},
    petPolicy: 'No',
    dressCode: 'Smart casual to formal',
    bestTime: 'Dinner for romantic ambiance'
  },
  {
    id: '10',
    slug: 'market-by-jean-georges',
    name: 'MARKET by Jean-Georges',
    category: 'restaurant',
    neighborhood: 'West Bay',
    price: '$$$',
    rating: 4.6,
    reviewCount: 456,
    description: 'An upscale all-day dining restaurant by renowned chef Jean-Georges Vongerichten. Features international cuisine with Asian influences, fresh ingredients, and an elegant atmosphere.',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&auto=format&fit=crop'
    ],
    badges: ['Fine Dining', 'International', 'Brunch'],
    location: { address: 'W Doha Hotel, West Bay', mapUrl: 'https://maps.google.com/?q=MARKET+Jean+Georges+Doha' },
    insiderTips: ['Friday brunch is legendary', 'Try the black truffle pizza'],
    affiliateLinks: {},
    petPolicy: 'No',
    dressCode: 'Smart casual',
    bestTime: 'Friday for brunch'
  },
  {
    id: '11',
    slug: 'inland-sea-khor-al-adaid',
    name: 'Inland Sea (Khor Al Adaid)',
    category: 'activity',
    neighborhood: 'Southern Qatar',
    price: '$$',
    rating: 4.8,
    reviewCount: 742,
    description: 'A UNESCO-recognized natural reserve where the desert meets the sea. Accessible only by 4x4 through dramatic sand dunes. Perfect for camping, swimming, and experiencing Qatar\'s unique natural beauty.',
    images: [
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&auto=format&fit=crop'
    ],
    badges: ['Nature', 'Adventure', 'UNESCO Site', 'Swimming'],
    location: { address: 'Southern Qatar, near Saudi border', mapUrl: 'https://maps.google.com/?q=Khor+Al+Adaid+Qatar' },
    insiderTips: ['4x4 vehicle required', 'Bring plenty of water', 'Best at low tide'],
    affiliateLinks: { viator: 'https://viator.com/inland-sea-qatar' },
    petPolicy: 'Yes',
    bestTime: 'November to February'
  },
  {
    id: '12',
    slug: 'dhow-cruise',
    name: 'Traditional Dhow Cruise',
    category: 'activity',
    neighborhood: 'Corniche',
    price: '$$',
    rating: 4.5,
    reviewCount: 623,
    description: 'Experience Doha from the water aboard a traditional wooden dhow. Cruise along the Corniche, enjoy stunning skyline views, and savor Arabic coffee and dates. Sunset and dinner cruises available.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop'
    ],
    badges: ['Scenic', 'Traditional', 'Family-Friendly', 'Sunset Views'],
    location: { address: 'Corniche, near MIA Park', mapUrl: 'https://maps.google.com/?q=Doha+Dhow+Cruise' },
    insiderTips: ['Book sunset cruise for best photos', 'Bring a light jacket for wind'],
    affiliateLinks: { getyourguide: 'https://getyourguide.com/dhow-cruise-doha' },
    petPolicy: 'No',
    bestTime: 'Evening for cooler temperatures'
  },
  {
    id: '13',
    slug: 'national-museum-qatar',
    name: 'National Museum of Qatar',
    category: 'attraction',
    neighborhood: 'Corniche',
    price: '$$',
    rating: 4.7,
    reviewCount: 1234,
    description: 'Designed by Jean Nouvel to resemble a desert rose, this architectural marvel tells the story of Qatar from geological beginnings to modern day. Interactive exhibits, artifacts, and immersive galleries.',
    images: [
      'https://images.unsplash.com/photo-1565552645632-d725f8bfc19d?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1200&auto=format&fit=crop'
    ],
    badges: ['Cultural', 'Modern Architecture', 'Interactive', 'Family-Friendly'],
    location: { address: 'Museum Park Street, Doha', mapUrl: 'https://maps.google.com/?q=National+Museum+Qatar' },
    insiderTips: ['Allow 2-3 hours for full visit', 'Download the audio guide app'],
    affiliateLinks: {},
    petPolicy: 'Service animals only',
    dressCode: 'Modest dress recommended',
    bestTime: 'Weekday mornings'
  },
  {
    id: '14',
    slug: 'the-pearl-qatar',
    name: 'The Pearl-Qatar',
    category: 'neighborhood',
    neighborhood: 'The Pearl',
    price: '$$$',
    rating: 4.6,
    reviewCount: 2145,
    description: 'Qatar\'s premier luxury destination featuring Mediterranean-style marinas, upscale boutiques, fine dining, and waterfront living. Stroll the boardwalk, shop international brands, and enjoy the cosmopolitan atmosphere.',
    images: [
      'https://images.unsplash.com/photo-1556883088-1d7b6dfffde6?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=1200&auto=format&fit=crop'
    ],
    badges: ['Shopping', 'Luxury', 'Dining', 'Marina'],
    location: { address: 'The Pearl-Qatar, Doha', mapUrl: 'https://maps.google.com/?q=The+Pearl+Qatar' },
    insiderTips: ['Visit Qanat Quartier for Venetian vibes', 'Parking can be challenging on weekends'],
    affiliateLinks: {},
    petPolicy: 'Yes',
    bestTime: 'Evening for dining and strolling'
  },
  {
    id: '15',
    slug: 'msheireb-downtown',
    name: 'Msheireb Downtown Doha',
    category: 'neighborhood',
    neighborhood: 'Downtown',
    price: '$$',
    rating: 4.5,
    reviewCount: 987,
    description: 'A sustainable smart city project blending traditional Qatari architecture with modern urban planning. Features museums, shops, restaurants, and shaded walkways. Perfect example of Qatar\'s vision for the future.',
    images: [
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=1200&auto=format&fit=crop'
    ],
    badges: ['Sustainable', 'Cultural', 'Shopping', 'Museums'],
    location: { address: 'Msheireb, Downtown Doha', mapUrl: 'https://maps.google.com/?q=Msheireb+Downtown+Doha' },
    insiderTips: ['Visit the four heritage houses', 'Great for walking - all climate controlled'],
    affiliateLinks: {},
    petPolicy: 'Yes',
    bestTime: 'Anytime - fully air conditioned walkways'
  },
  {
    id: '16',
    slug: 'aspire-park',
    name: 'Aspire Park',
    category: 'attraction',
    neighborhood: 'Aspire Zone',
    price: '$',
    rating: 4.6,
    reviewCount: 1567,
    description: 'Doha\'s largest park featuring 88 hectares of green space, walking paths, playgrounds, and a stunning lake. Perfect for picnics, jogging, cycling, and family outings. The iconic Torch Tower provides a dramatic backdrop.',
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&auto=format&fit=crop'
    ],
    badges: ['Free Entry', 'Family-Friendly', 'Outdoor', 'Pet-Friendly'],
    location: { address: 'Aspire Zone, Doha', mapUrl: 'https://maps.google.com/?q=Aspire+Park+Doha' },
    insiderTips: ['Rent bikes at the entrance', 'Bring picnic supplies', 'Visit early morning for jogging'],
    affiliateLinks: {},
    petPolicy: 'Yes',
    bestTime: 'October to April, early morning or evening',
    featured: false
  },
  {
    id: '17',
    slug: 'villaggio-mall',
    name: 'Villaggio Mall',
    category: 'attraction',
    neighborhood: 'Aspire Zone',
    price: '$$',
    rating: 4.4,
    reviewCount: 2234,
    description: 'A Venice-themed shopping mall featuring an indoor canal with gondola rides, international brands, dining options, and entertainment. The painted sky ceiling creates a unique shopping atmosphere.',
    images: [
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop'
    ],
    badges: ['Shopping', 'Family-Friendly', 'Indoor', 'Entertainment'],
    location: { address: 'Al Waab Street, Doha', mapUrl: 'https://maps.google.com/?q=Villaggio+Mall+Doha' },
    insiderTips: ['Take a gondola ride for kids', 'Visit Gondolania theme park inside'],
    affiliateLinks: {},
    petPolicy: 'Service animals only',
    bestTime: 'Anytime - fully air conditioned'
  },
  {
    id: '18',
    slug: 'falcon-souq',
    name: 'Falcon Souq',
    category: 'attraction',
    neighborhood: 'Souq Waqif',
    price: '$',
    rating: 4.7,
    reviewCount: 892,
    description: 'Experience Qatar\'s deep connection with falconry at this specialized market. See majestic falcons up close, learn about this ancient sport, and browse traditional hunting equipment. A unique cultural experience.',
    images: [
      'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552083974-186346191183?w=1200&auto=format&fit=crop'
    ],
    badges: ['Free Entry', 'Cultural', 'Unique Experience', 'Photo Opportunity'],
    location: { address: 'Souq Waqif, Doha', mapUrl: 'https://maps.google.com/?q=Falcon+Souq+Doha' },
    insiderTips: ['Visit in late afternoon', 'Photography allowed but ask permission first'],
    affiliateLinks: {},
    petPolicy: 'No',
    bestTime: 'October to April during falconry season'
  },
  {
    id: '19',
    slug: 'education-city-mosque',
    name: 'Education City Mosque',
    category: 'attraction',
    neighborhood: 'Education City',
    price: '$',
    rating: 4.8,
    reviewCount: 456,
    description: 'A stunning modern mosque with innovative architecture representing Islamic heritage through contemporary design. Features five pillars symbolizing the five pillars of Islam. Open for guided tours.',
    images: [
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1200&auto=format&fit=crop'
    ],
    badges: ['Free Entry', 'Cultural', 'Modern Architecture', 'Guided Tours'],
    location: { address: 'Education City, Doha', mapUrl: 'https://maps.google.com/?q=Education+City+Mosque' },
    insiderTips: ['Modest dress required', 'Free guided tours available', 'Best photos at sunset'],
    affiliateLinks: {},
    petPolicy: 'No',
    dressCode: 'Modest dress required (provided at entrance)',
    bestTime: 'Morning for tours'
  },
  {
    id: '20',
    slug: 'mathaf-arab-museum',
    name: 'Mathaf: Arab Museum of Modern Art',
    category: 'attraction',
    neighborhood: 'Education City',
    price: '$',
    rating: 4.5,
    reviewCount: 678,
    description: 'The first museum in the Arab world dedicated to modern and contemporary Arab art. Features rotating exhibitions showcasing works from the 19th century to present day.',
    images: [
      'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=1200&auto=format&fit=crop'
    ],
    badges: ['Free Entry', 'Art', 'Cultural', 'Educational'],
    location: { address: 'Education City, Doha', mapUrl: 'https://maps.google.com/?q=Mathaf+Doha' },
    insiderTips: ['Check exhibition schedule online', 'Free guided tours on weekends'],
    affiliateLinks: {},
    petPolicy: 'Service animals only',
    bestTime: 'Weekday afternoons'
  },
  {
    id: '21',
    slug: 'lusail-boulevard',
    name: 'Lusail Boulevard',
    category: 'neighborhood',
    neighborhood: 'Lusail',
    price: '$$',
    rating: 4.6,
    reviewCount: 1123,
    description: 'A futuristic waterfront destination featuring modern architecture, luxury shopping, fine dining, and entertainment. Part of Qatar\'s ambitious Lusail City development.',
    images: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&auto=format&fit=crop'
    ],
    badges: ['Modern', 'Shopping', 'Dining', 'Waterfront'],
    location: { address: 'Lusail City, North of Doha', mapUrl: 'https://maps.google.com/?q=Lusail+Boulevard' },
    insiderTips: ['Visit Place Vendôme Mall nearby', 'Great for evening strolls'],
    affiliateLinks: {},
    petPolicy: 'Yes',
    bestTime: 'Evening for atmosphere and cooler weather'
  },
  {
    id: '22',
    slug: 'al-zubarah-fort',
    name: 'Al Zubarah Fort',
    category: 'attraction',
    neighborhood: 'Northern Qatar',
    price: '$',
    rating: 4.4,
    reviewCount: 234,
    description: 'A UNESCO World Heritage Site and well-preserved example of an 18th-19th century fortified town. Explore the archaeological site and learn about Qatar\'s pearling and trading history.',
    images: [
      'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop'
    ],
    badges: ['UNESCO Site', 'Historical', 'Free Entry', 'Cultural'],
    location: { address: 'Al Zubarah, Northern Qatar', mapUrl: 'https://maps.google.com/?q=Al+Zubarah+Fort' },
    insiderTips: ['1.5 hour drive from Doha', 'Bring water - limited facilities', 'Combine with Barzan Towers visit'],
    affiliateLinks: {},
    petPolicy: 'Yes',
    bestTime: 'November to March for cooler weather'
  },
  {
    id: '23',
    slug: 'aqua-park-qatar',
    name: 'Aqua Park Qatar',
    category: 'activity',
    neighborhood: 'West Bay',
    price: '$$',
    rating: 4.3,
    reviewCount: 1456,
    description: 'Qatar\'s premier water park featuring thrilling slides, wave pools, lazy river, and family-friendly attractions. Perfect for cooling off during hot summer months.',
    images: [
      'https://images.unsplash.com/photo-1575484782882-c89fef0de6d8?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561353502-6b8c885b6c16?w=1200&auto=format&fit=crop'
    ],
    badges: ['Family-Friendly', 'Water Park', 'Summer Activity', 'Kids'],
    location: { address: 'West Bay, Doha', mapUrl: 'https://maps.google.com/?q=Aqua+Park+Qatar' },
    insiderTips: ['Arrive early to avoid crowds', 'Lockers available for rent', 'Bring reef-safe sunscreen'],
    affiliateLinks: { getyourguide: 'https://getyourguide.com/aqua-park-qatar' },
    petPolicy: 'No',
    bestTime: 'Summer months, weekdays less crowded'
  },
  {
    id: '24',
    slug: 'corniche-promenade',
    name: 'Doha Corniche',
    category: 'attraction',
    neighborhood: 'Corniche',
    price: '$',
    rating: 4.7,
    reviewCount: 3456,
    description: 'A stunning 7km waterfront promenade offering panoramic views of Doha\'s skyline and traditional dhows. Perfect for jogging, cycling, or leisurely strolls. Many parks and cafes along the route.',
    images: [
      'https://images.unsplash.com/photo-1514995669114-6081e934b693?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&auto=format&fit=crop'
    ],
    badges: ['Free Entry', 'Scenic', 'Jogging', 'Family-Friendly'],
    location: { address: 'Corniche, Doha', mapUrl: 'https://maps.google.com/?q=Doha+Corniche' },
    insiderTips: ['Best at sunset for photos', 'Bike rentals available', 'Multiple entry points along route'],
    affiliateLinks: {},
    petPolicy: 'Yes',
    bestTime: 'Early morning or evening',
    featured: false
  },
  {
    id: '25',
    slug: 'oryx-stables',
    name: 'Oryx Stables & Wildlife',
    category: 'activity',
    neighborhood: 'Shahaniya',
    price: '$$',
    rating: 4.5,
    reviewCount: 389,
    description: 'Interact with Qatar\'s national animal, the Arabian Oryx, and other wildlife. Horseback riding, camel rides, and guided tours available. Educational experience for all ages.',
    images: [
      'https://images.unsplash.com/photo-1516799839134-c90fb9e70807?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&auto=format&fit=crop'
    ],
    badges: ['Wildlife', 'Family-Friendly', 'Educational', 'Horseback Riding'],
    location: { address: 'Shahaniya, West of Doha', mapUrl: 'https://maps.google.com/?q=Oryx+Stables+Qatar' },
    insiderTips: ['Book riding sessions in advance', '45 minutes from Doha', 'Bring camera for oryx photos'],
    affiliateLinks: { viator: 'https://viator.com/oryx-qatar' },
    petPolicy: 'No',
    bestTime: 'October to April, early morning'
  },
  {
    id: '26',
    slug: 'purple-island',
    name: 'Purple Island (Al Khor Island)',
    category: 'attraction',
    neighborhood: 'Al Khor',
    price: '$',
    rating: 4.6,
    reviewCount: 567,
    description: 'A nature reserve famous for its mangrove forests and purple flowering plants. Walk the boardwalk, spot wildlife, and enjoy kayaking through the mangroves. Great for nature lovers.',
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop'
    ],
    badges: ['Nature', 'Free Entry', 'Kayaking', 'Bird Watching'],
    location: { address: 'Al Khor, Northern Qatar', mapUrl: 'https://maps.google.com/?q=Purple+Island+Qatar' },
    insiderTips: ['Bring binoculars for bird watching', 'Kayak rentals available nearby', 'Visit during flowering season'],
    affiliateLinks: {},
    petPolicy: 'Yes',
    bestTime: 'November to March'
  },
  {
    id: '27',
    slug: 'place-vendome',
    name: 'Place Vendôme',
    category: 'attraction',
    neighborhood: 'Lusail',
    price: '$$',
    rating: 4.5,
    reviewCount: 1890,
    description: 'A French-themed luxury mall featuring high-end boutiques, fine dining, and stunning architecture. The ice rink and canal add to the European ambiance.',
    images: [
      'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=1200&auto=format&fit=crop'
    ],
    badges: ['Shopping', 'Luxury', 'Dining', 'Ice Skating'],
    location: { address: 'Lusail City, Doha', mapUrl: 'https://maps.google.com/?q=Place+Vendome+Mall+Doha' },
    insiderTips: ['Try ice skating rink', 'Many dining options on upper floor', 'Valet parking available'],
    affiliateLinks: {},
    petPolicy: 'Service animals only',
    bestTime: 'Anytime - fully air conditioned'
  },
  {
    id: '28',
    slug: 'fire-station-artist-residence',
    name: 'Fire Station Artist in Residence',
    category: 'attraction',
    neighborhood: 'Mathaf',
    price: '$',
    rating: 4.4,
    reviewCount: 234,
    description: 'A contemporary arts center housed in a former fire station. Features exhibitions, workshops, artist studios, and a creative community space. Free entry to most exhibitions.',
    images: [
      'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=1200&auto=format&fit=crop'
    ],
    badges: ['Free Entry', 'Art', 'Cultural', 'Workshops'],
    location: { address: 'Mathaf Area, Doha', mapUrl: 'https://maps.google.com/?q=Fire+Station+Doha' },
    insiderTips: ['Check workshop schedule online', 'Great cafe on site', 'Photography exhibitions often featured'],
    affiliateLinks: {},
    petPolicy: 'Service animals only',
    bestTime: 'Weekends for workshops'
  },
  {
    id: '29',
    slug: 'al-jassasiya-carvings',
    name: 'Al Jassasiya Rock Carvings',
    category: 'attraction',
    neighborhood: 'Northeast Coast',
    price: '$',
    rating: 4.3,
    reviewCount: 189,
    description: 'Ancient petroglyphs carved into limestone rocks, featuring boat motifs, cup marks, and mysterious symbols. A fascinating glimpse into Qatar\'s prehistoric past.',
    images: [
      'https://images.unsplash.com/photo-1579083615853-2c86e2fde3c5?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&auto=format&fit=crop'
    ],
    badges: ['Historical', 'Free Entry', 'Archaeological', 'Unique'],
    location: { address: 'Al Jassasiya, Northeast Qatar', mapUrl: 'https://maps.google.com/?q=Al+Jassasiya+Qatar' },
    insiderTips: ['1 hour drive from Doha', 'Best light for photos in early morning', 'Combine with Purple Island visit'],
    affiliateLinks: {},
    petPolicy: 'Yes',
    bestTime: 'October to March'
  },
  {
    id: '30',
    slug: 'al-wakra-souq',
    name: 'Al Wakra Souq',
    category: 'neighborhood',
    neighborhood: 'Al Wakra',
    price: '$',
    rating: 4.5,
    reviewCount: 678,
    description: 'A beautifully restored traditional market in the charming coastal town of Al Wakra. Features traditional architecture, handicraft shops, cafes, and a scenic harbor.',
    images: [
      'https://images.unsplash.com/photo-1555881480-3fd6ed2ba6de?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533423984711-09703f4c3d8b?w=1200&auto=format&fit=crop'
    ],
    badges: ['Free Entry', 'Traditional', 'Coastal', 'Dining'],
    location: { address: 'Al Wakra, South of Doha', mapUrl: 'https://maps.google.com/?q=Al+Wakra+Souq' },
    insiderTips: ['Less touristy than Souq Waqif', 'Great seafood restaurants', 'Visit harbor for traditional boats'],
    affiliateLinks: {},
    petPolicy: 'Yes',
    bestTime: 'Evening for atmosphere'
  }
];
