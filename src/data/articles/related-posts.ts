import type { RelatedPost } from './types';
import qatariCuisineImage from '@/assets/qatari-cuisine.jpg';
import culturalEventsImage from '@/assets/cultural-events.jpg';
import miaMuseumImage from '@/assets/mia-museum.jpg';

export const relatedPosts: RelatedPost[] = [
  {
    id: '35',
    title: 'Qatari Dishes You Must Try in Doha: A Complete Culinary Guide',
    excerpt: 'Discover authentic Qatari cuisine from Machboos to Luqaimat. Complete guide to traditional dishes, best restaurants, and cultural food experiences in Doha.',
    imageUrl: qatariCuisineImage,
    category: 'Food',
    date: 'May 14, 2025',
    slug: 'qatari-dishes-doha-culinary-guide',
  },
  {
    id: '37',
    title: "Doha: The City That's Changing the Middle East",
    excerpt: "Discover how Doha is transforming the Middle East through innovation, culture, economic strength, and global influence.",
    imageUrl: culturalEventsImage,
    category: 'Culture',
    date: 'May 16, 2025',
    slug: 'doha-changing-middle-east',
  },
  {
    id: '30',
    title: 'The Ultimate Arabian Adventure: Desert Safari and Inland Sea',
    excerpt: 'Experience the thrill of dune bashing and the serenity of Khor Al Adaid - your complete guide to Qatar\'s quintessential desert safari adventure.',
    imageUrl: miaMuseumImage,
    category: 'Attractions',
    date: 'May 9, 2025',
    slug: 'desert-safari-inland-sea-khor-al-adaid',
  },
];

