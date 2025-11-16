import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import desertSafariImage from '@/assets/desert-safari-inland-sea.jpg';
import museumsImage from '@/assets/mia-nmoq-museums.jpg';
import souqWaqifImage from '@/assets/souq-waqif-night.jpg';
import layoverImage from '@/assets/doha-layover-experience.jpg';
import qatarAirwaysImage from '@/assets/qatar-airways-stopover.jpg';
import mediationImage from '@/assets/doha-mediation-hub.jpg';
import fifaImage from '@/assets/fifa-u17-world-cup.jpg';
import cornicheImage from '@/assets/corniche-sunset-dhow.jpg';
import pearlImage from '@/assets/pearl-qatar-luxury.jpg';
import kataraImage from '@/assets/katara-cultural-village.jpg';
import airportInteriorImage from '@/assets/hamad-airport-interior.jpg';
import fiveBestImage from '@/assets/five-best-layover.jpg';
import nineHourImage from '@/assets/9-hour-stopover.jpg';
import discoverImage from '@/assets/discover-qatar.jpg';
import twentyFourHoursImage from '@/assets/24-hours-itinerary.jpg';
import timeGuideImage from '@/assets/layover-time-guide.jpg';
import perfectLayoverImage from '@/assets/perfect-layover.jpg';
import unmissableImage from '@/assets/10-unmissable-things.jpg';
import transfersImage from '@/assets/hamad-airport-transfers.jpg';
import stopoverProgramImage from '@/assets/stopover-program.jpg';
import topAttractionsImage from '@/assets/top-10-attractions.jpg';
import cuisineImage from '@/assets/qatari-cuisine.jpg';
import eventsImage from '@/assets/cultural-events.jpg';
import miaImage from '@/assets/mia-museum.jpg';
import shoppingImage from '@/assets/shopping-guide.jpg';
import expatImage from '@/assets/expat-tips.jpg';
import arabicCoffeeImage from '@/assets/arabic-coffee-culture.jpg';
import architectureImage from '@/assets/doha-architecture.jpg';
import familyImage from '@/assets/family-friendly.jpg';
import weekendImage from '@/assets/weekend-getaways.jpg';
import alcoholGuideImage from '@/assets/alcohol-guide-doha.jpg';
import prostitutionLawsImage from '@/assets/prostitution-laws-legal-guide.jpg';
import dohaSafetyImage from '@/assets/doha-safety-guide.jpg';
import womenDrivingImage from '@/assets/women-driving-qatar.jpg';
import qatariDishesImage from '@/assets/qatari-dishes-guide.jpg';
import hamadAirportGuideImage from '@/assets/hamad-airport-guide.jpg';
import dohaTransformingImage from '@/assets/doha-transforming-middle-east.jpg';
import costOfLivingImage from '@/assets/cost-of-living-doha-2025.jpg';
import womenSafetyDressCodeImage from '@/assets/women-safety-dress-code-doha.jpg';
import internationalSchoolsImage from '@/assets/international-schools-qatar-guide.jpg';
import qatarVisaRulesImage from '@/assets/qatar-visa-rules-2025.jpg';
import westBayAlWaabImage from '@/assets/west-bay-al-waab-comparison.jpg';
import drivingDohaImage from '@/assets/driving-doha-2025-guide.jpg';
import lgbtqQatarImage from '@/assets/lgbtq-experiences-qatar-guide.jpg';
import bankAccountQatarImage from '@/assets/bank-account-qatar-guide.jpg';
import mobilePlansQatarImage from '@/assets/mobile-plans-qatar-guide.jpg';
import groceryShoppingDohaImage from '@/assets/grocery-shopping-doha-guide.jpg';
import dohaMetro2025Image from '@/assets/doha-metro-2025-guide.jpg';
import petImportQatarImage from '@/assets/pet-import-qatar-guide.jpg';
import hiringMaidNannyImage from '@/assets/hiring-maid-nanny-qatar-guide.jpg';
import gymsFitnessDohaImage from '@/assets/gyms-fitness-doha-guide.jpg';
import remoteWorkCafesImage from '@/assets/remote-work-cafes-doha-guide.jpg';
import housingRentDohaImage from '@/assets/housing-rent-doha-2025.jpg';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const allPosts = [
    {
      id: '55',
      title: "The Real Estate Landscape: Housing and Rent Prices in Doha's Current Market",
      excerpt: 'Navigate Doha housing market 2025. Rent prices in The Pearl, West Bay, Lusail, affordability strategies, contract structures, and expat housing options in Qatar.',
      imageUrl: housingRentDohaImage,
      category: 'Expat-Tips',
      date: 'June 4, 2025',
      slug: 'housing-rent-doha-2025',
      tags: ['housing Doha', 'rent prices Qatar', 'The Pearl Qatar', 'Lusail City', 'expat housing'],
    },
    {
      id: '54',
      title: 'The Price of Paradise: Cost of Living in Doha and a Comparison to Dubai and Riyadh',
      excerpt: 'Compare cost of living in Doha vs Dubai and Riyadh. Housing costs, groceries, transportation, education fees, and strategies for managing expenses in Qatar 2025.',
      imageUrl: costOfLivingImage,
      category: 'Expat-Tips',
      date: 'June 3, 2025',
      slug: 'cost-of-living-doha-dubai-riyadh',
      tags: ['cost of living Doha', 'Doha vs Dubai', 'Qatar housing costs', 'expat budget Qatar', 'living expenses Qatar'],
    },
    {
      id: '53',
      title: 'Alcohol Rules in Qatar 2025: QDC, Licenses, and Complete Legal Guide',
      excerpt: 'Understand Qatar alcohol laws 2025. Learn about QDC permits, where to buy alcohol legally, hotel bar rules, consumption restrictions, and penalties in Doha.',
      imageUrl: alcoholGuideImage,
      category: 'Expat-Tips',
      date: 'June 2, 2025',
      slug: 'alcohol-guide-doha',
      tags: ['alcohol rules Qatar', 'QDC Qatar', 'alcohol license Doha', 'legal drinking Qatar', 'alcohol permit'],
    },
    {
      id: '52',
      title: 'Best Cafes for Remote Work in Doha Qatar 2025: Digital Nomad Guide',
      excerpt: 'Find best cafes for remote work in Doha 2025. WiFi speeds, power outlets, atmosphere, and productivity-friendly spots for digital workers in Qatar.',
      imageUrl: remoteWorkCafesImage,
      category: 'Expat-Tips',
      date: 'June 1, 2025',
      slug: 'remote-work-cafes-doha-guide',
      tags: ['remote work cafes Doha', 'coworking Doha', 'WiFi cafes Qatar', 'digital nomads', 'laptop-friendly cafes'],
    },
    {
      id: '51',
      title: 'Gyms and Fitness Trends in Doha Qatar 2025: Complete Guide',
      excerpt: 'Discover best gyms in Doha 2025, membership costs, fitness trends, and workout options for expats in Qatar. Compare facilities from budget to luxury.',
      imageUrl: gymsFitnessDohaImage,
      category: 'Expat-Tips',
      date: 'May 31, 2025',
      slug: 'gyms-fitness-doha-guide',
      tags: ['gyms Doha Qatar', 'fitness centers Qatar', 'gym membership', 'best gyms Qatar', 'fitness trends'],
    },
    {
      id: '50',
      title: 'Hiring Maids and Nannies in Doha Qatar 2025: Complete Legal Guide',
      excerpt: 'Hire domestic help legally in Qatar with this 2025 guide. Learn visa sponsorship, salaries, contracts, rights, and where to find maids and nannies in Doha.',
      imageUrl: hiringMaidNannyImage,
      category: 'Expat-Tips',
      date: 'May 30, 2025',
      slug: 'hiring-maid-nanny-qatar-guide',
      tags: ['hiring maid Qatar', 'nanny Doha', 'domestic worker visa', 'housemaid salary', 'sponsorship'],
    },
    {
      id: '49',
      title: 'Pet Import Rules and Veterinary Care in Qatar 2025: Complete Guide',
      excerpt: 'Import your pet to Qatar with this 2025 guide. Learn requirements, quarantine rules, costs, documentation, and find best veterinary clinics in Doha for expats.',
      imageUrl: petImportQatarImage,
      category: 'Expat-Tips',
      date: 'May 29, 2025',
      slug: 'pet-import-qatar-guide',
      tags: ['pet import Qatar', 'bringing pets to Doha', 'veterinary clinics', 'animal permit', 'pet relocation'],
    },
    {
      id: '48',
      title: 'Doha Metro 2025: New Lines, Expansions, and Complete Network Guide',
      excerpt: 'Complete guide to Doha Metro 2025 including new line expansions, stations, fares, operating hours, and travel tips for commuters in Qatar.',
      imageUrl: dohaMetro2025Image,
      category: 'Expat-Tips',
      date: 'May 28, 2025',
      slug: 'doha-metro-2025-guide',
      tags: ['Doha Metro', 'public transport', 'Qatar Rail', 'commuting', 'metro fares'],
    },
    {
      id: '47',
      title: 'Grocery Shopping Hacks in Doha 2025: Carrefour vs Lulu Complete Guide',
      excerpt: 'Master grocery shopping in Doha with Carrefour vs Lulu comparison. Find best prices, product selection, delivery options, and money-saving hacks for expats in Qatar.',
      imageUrl: groceryShoppingDohaImage,
      category: 'Expat-Tips',
      date: 'May 27, 2025',
      slug: 'grocery-shopping-doha-guide',
      tags: ['grocery shopping', 'Carrefour', 'Lulu Hypermarket', 'money saving', 'expat life'],
    },
    {
      id: '46',
      title: 'Best Mobile and Data Plans in Qatar 2025: Ooredoo vs Vodafone Complete Guide',
      excerpt: 'Compare Ooredoo vs Vodafone Qatar 2025. Find best mobile plans, data packages, prices, coverage, and which telecom provider suits expats in Doha.',
      imageUrl: mobilePlansQatarImage,
      category: 'Expat-Tips',
      date: 'May 26, 2025',
      slug: 'mobile-plans-qatar-guide',
      tags: ['mobile plans', 'Ooredoo', 'Vodafone', 'telecom Qatar', 'data packages'],
    },
    {
      id: '45',
      title: 'Opening a Bank Account in Qatar: QNB vs International Banks Guide',
      excerpt: 'Compare QNB vs international banks in Qatar. Learn account requirements, fees, services, and which bank is best for expats opening accounts in Doha 2025.',
      imageUrl: bankAccountQatarImage,
      category: 'Expat-Tips',
      date: 'May 25, 2025',
      slug: 'bank-account-qatar-guide',
      tags: ['Qatar banking', 'QNB', 'expat finance', 'international banks', 'account opening'],
    },
    {
      id: '44',
      title: 'LGBTQ+ Experiences in Qatar: What Expats Need to Know 2025',
      excerpt: 'Honest guide to LGBTQ+ experiences in Qatar. Understand legal realities, safety considerations, expat community experiences, and practical advice for living in Doha.',
      imageUrl: lgbtqQatarImage,
      category: 'Expat-Tips',
      date: 'May 24, 2025',
      slug: 'lgbtq-experiences-qatar-2025',
      tags: ['LGBTQ Qatar', 'expat life', 'safety guide', 'legal information', 'diversity'],
    },
    {
      id: '43',
      title: 'Driving in Doha 2025: Traffic Updates, Rules, and Survival Guide',
      excerpt: 'Essential guide to driving in Doha 2025. Traffic patterns, road rules, license requirements, fines, and navigation tips for new drivers in Qatar.',
      imageUrl: drivingDohaImage,
      category: 'Expat-Tips',
      date: 'May 23, 2025',
      slug: 'driving-doha-2025-guide',
      tags: ['driving Doha', 'Qatar license', 'traffic rules', 'road safety', 'expat driving'],
    },
    {
      id: '42',
      title: 'Renting in Doha: West Bay vs Al Waab Comparison Guide 2025',
      excerpt: 'Compare renting in West Bay vs Al Waab in Doha. Detailed analysis of prices, amenities, lifestyle, schools, and commutes to help expats choose the right neighborhood.',
      imageUrl: westBayAlWaabImage,
      category: 'Expat-Tips',
      date: 'May 22, 2025',
      slug: 'renting-doha-west-bay-al-waab-2025',
      tags: ['Doha neighborhoods', 'West Bay', 'Al Waab', 'rental guide', 'expat housing'],
    },
    {
      id: '41',
      title: 'New Qatar Visa Rules for Expats 2025: Complete Immigration Guide',
      excerpt: 'Updated Qatar visa rules 2025 for expats. Learn about work permits, residency requirements, family sponsorship, golden visas, and new immigration policies.',
      imageUrl: qatarVisaRulesImage,
      category: 'Expat-Tips',
      date: 'May 20, 2025',
      slug: 'qatar-visa-rules-expats-2025',
      tags: ['Qatar visa', 'work permit', 'residency', 'golden visa', 'immigration'],
    },
    {
      id: '40',
      title: 'International Schools in Qatar 2025: Waitlists, Fees, and Application Guide',
      excerpt: 'Complete guide to international schools in Qatar 2025. Compare fees from QAR 30,000-120,000/year, understand waitlist situations, and learn application strategies.',
      imageUrl: internationalSchoolsImage,
      category: 'Expat-Tips',
      date: 'May 19, 2025',
      slug: 'international-schools-qatar-2025',
      tags: ['international schools', 'school fees', 'education Qatar', 'British schools', 'American schools'],
    },
    {
      id: '39',
      title: 'Women\'s Safety and Dress Code in Doha, Qatar: Complete 2025 Guide',
      excerpt: 'Essential guide to women\'s safety in Doha and Qatar dress code requirements. Learn what to wear, cultural expectations, and safety tips for female expats and tourists.',
      imageUrl: womenSafetyDressCodeImage,
      category: 'Expat-Tips',
      date: 'May 18, 2025',
      slug: 'women-safety-dress-code-doha-qatar',
      tags: ['women safety', 'dress code', 'female expat', 'cultural norms', 'modest dress'],
    },
    {
      id: '38',
      title: 'Cost of Living in Doha 2025: Rent Inflation and Monthly Expenses Guide',
      excerpt: 'Discover the real cost of living in Doha 2025, including rent inflation rates, apartment prices, grocery costs, and monthly budget breakdowns for singles and families.',
      imageUrl: costOfLivingImage,
      category: 'Expat-Tips',
      date: 'May 17, 2025',
      slug: 'cost-of-living-doha-2025',
      tags: ['cost of living', 'rent prices', 'expat budget', 'Qatar inflation', 'monthly expenses'],
    },
    {
      id: '37',
      title: 'Doha: The City That\'s Changing the Middle East',
      excerpt: 'Discover how Doha is transforming the Middle East through innovation, culture, economic strength, and global influence. A complete guide to Qatar\'s visionary capital.',
      imageUrl: dohaTransformingImage,
      category: 'Culture',
      date: 'May 16, 2025',
      slug: 'doha-changing-middle-east',
    },
    {
      id: '36',
      title: 'Hamad International Airport: The Ultimate Guide to Qatar\'s Award-Winning Aviation Hub',
      excerpt: 'Complete guide to Hamad International Airport - facilities, lounges, shopping, dining, transport, and everything you need to know about this world-class airport.',
      imageUrl: hamadAirportGuideImage,
      category: 'Expat-Tips',
      date: 'May 15, 2025',
      slug: 'hamad-international-airport-guide',
    },
    {
      id: '35',
      title: 'Qatari Dishes You Must Try in Doha: A Complete Culinary Guide',
      excerpt: 'Discover authentic Qatari cuisine from Machboos to Luqaimat. Complete guide to traditional dishes, best restaurants, and cultural food experiences in Doha.',
      imageUrl: qatariDishesImage,
      category: 'Food',
      date: 'May 14, 2025',
      slug: 'qatari-dishes-doha-culinary-guide',
    },
    {
      id: '34',
      title: 'Can Women Drive in Qatar? (2025 Guide for Tourists, Expats & Families)',
      excerpt: 'Everything you need to know about driving laws for women in Qatar. Complete guide covering licenses, safety, cultural attitudes, and practical tips.',
      imageUrl: womenDrivingImage,
      category: 'Expat-Tips',
      date: 'May 13, 2025',
      slug: 'women-driving-qatar-guide',
    },
    {
      id: '33',
      title: 'How Safe Is Doha, Qatar? (2025 Full Safety Guide for Tourists & Expats)',
      excerpt: 'Complete safety guide covering crime rates, local laws, nightlife safety, scams, and travel tips. Everything tourists and expats need to know about safety in Doha.',
      imageUrl: dohaSafetyImage,
      category: 'Expat-Tips',
      date: 'May 12, 2025',
      slug: 'doha-safety-guide-tourists-expats',
    },
    {
      id: '32',
      title: 'Prostitution in Doha, Qatar: Is It Legal? (2025 Complete Guide)',
      excerpt: 'Everything tourists and expats need to know about prostitution laws, penalties, safety, and scams in Qatar. A comprehensive legal guide for visitors.',
      imageUrl: prostitutionLawsImage,
      category: 'Expat-Tips',
      date: 'May 11, 2025',
      slug: 'prostitution-laws-doha-qatar-guide',
    },
    {
      id: '31',
      title: 'Is Drinking Alcohol Allowed in Doha, Qatar? (2025 Full Guide)',
      excerpt: 'Your ultimate tourist-friendly guide to alcohol rules, prices, licensed venues, and nightlife in Doha. Everything you need to know about drinking legally in Qatar.',
      imageUrl: alcoholGuideImage,
      category: 'Expat-Tips',
      date: 'May 10, 2025',
      slug: 'alcohol-allowed-doha-qatar-guide',
    },
    {
      id: '30',
      title: 'The Ultimate Arabian Adventure: Desert Safari and Inland Sea',
      excerpt: 'Experience the thrill of dune bashing and the serenity of Khor Al Adaid - your complete guide to Qatar\'s quintessential desert safari adventure.',
      imageUrl: desertSafariImage,
      category: 'Attractions',
      date: 'May 9, 2025',
      slug: 'desert-safari-inland-sea-khor-al-adaid',
    },
    {
      id: '29',
      title: 'A Tale of Two Museums: MIA + NMoQ Combo Guide',
      excerpt: 'Discover Qatar\'s cultural treasures with our guide to visiting the Museum of Islamic Art and National Museum of Qatar using the Discover One Pass.',
      imageUrl: museumsImage,
      category: 'Culture',
      date: 'May 8, 2025',
      slug: 'mia-nmoq-museum-combo-guide',
    },
    {
      id: '28',
      title: 'The Heart of Doha After Dark: Souq Waqif Night Experiences',
      excerpt: 'Discover Souq Waqif at night - from authentic Qatari dining and shisha cafés to mastering the art of haggling in the ancient market alleyways.',
      imageUrl: souqWaqifImage,
      category: 'Culture',
      date: 'May 7, 2025',
      slug: 'souq-waqif-night-experiences-haggling',
    },
    {
      id: '27',
      title: 'The Ultimate 24-48 Hour Layover in Doha: A Complete Guide',
      excerpt: 'Transform your Doha layover into a mini-vacation with our detailed 24-hour dash and 48-hour exploration itineraries, from cultural highlights to desert adventures.',
      imageUrl: layoverImage,
      category: 'Expat-Tips',
      date: 'May 6, 2025',
      slug: 'ultimate-doha-layover-24-48-hours',
    },
    {
      id: '26',
      title: 'Two Holidays in One: Qatar Airways Stopover Packages Guide',
      excerpt: 'Everything you need to know about Qatar Airways stopover packages - from $14/night hotels to premium lounge access at Hamad International Airport.',
      imageUrl: qatarAirwaysImage,
      category: 'Expat-Tips',
      date: 'May 5, 2025',
      slug: 'qatar-airways-stopover-packages-lounge',
    },
    {
      id: '25',
      title: 'Beyond the Horizon: Doha as a Global Mediation Hub',
      excerpt: 'Discover how Doha became a center for international diplomacy and peace negotiations, from the Congo peace talks to global conflict resolution.',
      imageUrl: mediationImage,
      category: 'Culture',
      date: 'May 4, 2025',
      slug: 'doha-global-mediation-hub-congo-peace',
    },
    {
      id: '24',
      title: 'The Stars of Tomorrow: FIFA U-17 World Cup Qatar 2025™ Guide',
      excerpt: 'Complete guide to attending the FIFA U-17 World Cup in Qatar - matches, tickets, fan zones, and witnessing future football legends in action.',
      imageUrl: fifaImage,
      category: 'Events',
      date: 'May 3, 2025',
      slug: 'fifa-u17-world-cup-qatar-2025',
    },
    {
      id: '23',
      title: 'The Golden Hour in Doha: Corniche Sunset Walks and Dhow Cruises',
      excerpt: 'Experience the magic of Doha\'s waterfront at sunset - from peaceful Corniche walks with skyline views to romantic dhow cruise adventures.',
      imageUrl: cornicheImage,
      category: 'Attractions',
      date: 'May 2, 2025',
      slug: 'corniche-sunset-dhow-cruise-guide',
    },
    {
      id: '22',
      title: 'The Jewel of Doha: Luxury Shopping and Dining at The Pearl-Qatar',
      excerpt: 'Discover The Pearl-Qatar - from Porto Arabia\'s luxury brands to Qanat Quartier\'s Venetian charm, your guide to high-end shopping and fine dining.',
      imageUrl: pearlImage,
      category: 'Lifestyle',
      date: 'May 1, 2025',
      slug: 'pearl-qatar-luxury-shopping-dining',
    },
    {
      id: '21',
      title: 'A Year of Culture: Katara Cultural Village Events Calendar 2025',
      excerpt: 'Your complete guide to festivals, exhibitions, and performances at Katara Cultural Village throughout 2025 - from dhow festivals to jazz concerts.',
      imageUrl: kataraImage,
      category: 'Events',
      date: 'April 30, 2025',
      slug: 'katara-cultural-village-events-2025',
    },
    {
      id: '20',
      title: 'Ten Ways to Enjoy a Layover at Doha Airport',
      excerpt: 'Discover how to make the most of your time at Hamad International Airport - from The Orchard garden to spa treatments, art installations, and more.',
      imageUrl: airportInteriorImage,
      category: 'Expat-Tips',
      date: 'April 29, 2025',
      slug: 'doha-airport-layover-activities',
    },
    {
      id: '19',
      title: 'The Five Best Things to Do on a Layover in Doha',
      excerpt: 'Top 5 must-do experiences during your Doha layover - Museum of Islamic Art, Souq Waqif, Corniche, desert safaris, and Katara Cultural Village.',
      imageUrl: fiveBestImage,
      category: 'Attractions',
      date: 'April 28, 2025',
      slug: 'five-best-things-doha-layover',
    },
    {
      id: '18',
      title: '9-Hour Stopover in Qatar: Is It Worth Exploring?',
      excerpt: 'A detailed analysis of whether you should leave the airport during a 9-hour layover - weighing benefits, risks, and practical considerations.',
      imageUrl: nineHourImage,
      category: 'Expat-Tips',
      date: 'April 27, 2025',
      slug: '9-hour-stopover-qatar-worth-it',
    },
    {
      id: '17',
      title: 'Stopover in Qatar: Discover Qatar - Why Visit',
      excerpt: 'Explore what makes Qatar a world-class destination beyond just a transit point - from cultural attractions to safety, dining, and natural landscapes.',
      imageUrl: discoverImage,
      category: 'Culture',
      date: 'April 26, 2025',
      slug: 'discover-qatar-stopover-guide',
    },
    {
      id: '16',
      title: '24 Hours in Doha: Complete Qatar Airways Itinerary',
      excerpt: 'Make the most of a full day in Doha with this detailed 24-hour itinerary - from sunrise on the Corniche to evening dhow cruises.',
      imageUrl: twentyFourHoursImage,
      category: 'Attractions',
      date: 'April 25, 2025',
      slug: '24-hours-doha-qatar-airways',
    },
    {
      id: '15',
      title: 'Layover in Doha Guide: What to Do in 2–12 Hours',
      excerpt: 'Detailed breakdown of what you can realistically accomplish during layovers of different lengths - from 2 hours to a full day in Doha.',
      imageUrl: timeGuideImage,
      category: 'Expat-Tips',
      date: 'April 24, 2025',
      slug: 'doha-layover-time-guide',
    },
    {
      id: '14',
      title: 'How to Spend the Perfect Layover in Doha, Qatar',
      excerpt: 'Master the art of the Doha layover with expert tips on timing, transportation, attractions, and making every hour count during your stopover.',
      imageUrl: perfectLayoverImage,
      category: 'Expat-Tips',
      date: 'April 23, 2025',
      slug: 'perfect-layover-doha-guide',
    },
    {
      id: '13',
      title: '10 Unmissable Things To Do In Doha On A Layover (2025)',
      excerpt: 'Make the most of your Doha layover with these incredible experiences - from museums and souqs to desert safaris and cultural villages.',
      imageUrl: unmissableImage,
      category: 'Attractions',
      date: 'April 22, 2025',
      slug: 'things-to-do-doha-layover',
    },
    {
      id: '12',
      title: 'Transfers at Hamad International Airport: Complete Guide',
      excerpt: 'Navigate one of the world\'s finest airports with ease. From security to shopping, everything you need to know about connecting through Doha.',
      imageUrl: transfersImage,
      category: 'Expat-Tips',
      date: 'April 21, 2025',
      slug: 'hamad-airport-transfers-guide',
    },
    {
      id: '11',
      title: 'Complete Doha Layover Guide: Qatar Stopover Program Explained',
      excerpt: 'Transform your layover into an adventure with Qatar Airways\' amazing stopover program. Hotels from $14/night, visa-free entry, and world-class experiences await.',
      imageUrl: stopoverProgramImage,
      category: 'Expat-Tips',
      date: 'April 20, 2025',
      slug: 'qatar-stopover-program-guide',
    },
    {
      id: '1',
      title: 'Top 10 Must-Visit Attractions in Doha',
      excerpt: 'Discover the most spectacular sights and experiences in Qatar\'s vibrant capital city.',
      imageUrl: topAttractionsImage,
      category: 'Attractions',
      date: 'April 15, 2025',
      slug: 'top-attractions-doha',
    },
    {
      id: '2',
      title: 'Best Local Restaurants for Authentic Qatari Cuisine',
      excerpt: 'Taste the traditional flavors of Qatar at these local favorite dining spots.',
      imageUrl: cuisineImage,
      category: 'Food',
      date: 'April 10, 2025',
      slug: 'authentic-qatari-cuisine',
    },
    {
      id: '3',
      title: 'Upcoming Cultural Events in Doha This Summer',
      excerpt: 'Mark your calendar for these exciting cultural festivals and events.',
      imageUrl: eventsImage,
      category: 'Events',
      date: 'April 5, 2025',
      slug: 'summer-cultural-events',
    },
    {
      id: '4',
      title: 'A Day at the Museum of Islamic Art',
      excerpt: 'Explore one of Doha\'s most iconic architectural landmarks and its world-class collections.',
      imageUrl: miaImage,
      category: 'Attractions',
      date: 'April 2, 2025',
      slug: 'museum-islamic-art',
    },
    {
      id: '5',
      title: 'Shopping Guide: From Traditional Souqs to Luxury Malls',
      excerpt: 'Navigate Doha\'s diverse shopping scene with this comprehensive guide.',
      imageUrl: shoppingImage,
      category: 'Lifestyle',
      date: 'March 28, 2025',
      slug: 'doha-shopping-guide',
    },
    {
      id: '6',
      title: 'Essential Tips for Expats Moving to Qatar',
      excerpt: 'Everything you need to know about settling into life in Doha as an expatriate.',
      imageUrl: expatImage,
      category: 'Expat-Tips',
      date: 'March 25, 2025',
      slug: 'qatar-expat-guide',
    },
    {
      id: '7',
      title: 'The Art of Arabic Coffee: A Cultural Experience',
      excerpt: 'Learn about the traditions and rituals behind Qatar\'s coffee culture.',
      imageUrl: arabicCoffeeImage,
      category: 'Culture',
      date: 'March 20, 2025',
      slug: 'arabic-coffee-culture',
    },
    {
      id: '8',
      title: 'Desert Adventures: Exploring the Inland Sea',
      excerpt: 'Experience the thrill of dune bashing and the serenity of Qatar\'s desert landscape.',
      imageUrl: desertSafariImage,
      category: 'Adventures',
      date: 'March 15, 2025',
      slug: 'desert-adventures',
    },
    {
      id: '9',
      title: 'Modern Architecture in Doha: A Visual Journey',
      excerpt: 'Discover the stunning architectural marvels that define Doha\'s skyline.',
      imageUrl: architectureImage,
      category: 'Architecture',
      date: 'March 10, 2025',
      slug: 'doha-architecture',
    },
    {
      id: '10',
      title: 'Family-Friendly Activities in Doha',
      excerpt: 'The best entertainment options and activities for families with children.',
      imageUrl: familyImage,
      category: 'Family',
      date: 'March 5, 2025',
      slug: 'family-activities',
    },
    {
      id: '11',
      title: 'Weekend Getaways Near Doha',
      excerpt: 'Explore nearby destinations perfect for short breaks from the city.',
      imageUrl: weekendImage,
      category: 'Travel',
      date: 'March 1, 2025',
      slug: 'weekend-getaways',
    },
    {
      id: '12',
      title: 'Traditional Qatari Crafts and Where to Find Them',
      excerpt: 'A guide to local artisans and traditional handicrafts in Qatar.',
      imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop',
      category: 'Culture',
      date: 'February 25, 2025',
      slug: 'qatari-crafts',
    },
    {
      id: '13',
      title: 'Best Beaches in and Around Doha',
      excerpt: 'Discover the finest coastal spots for swimming, sunbathing, and water sports.',
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&auto=format&fit=crop',
      category: 'Lifestyle',
      date: 'February 20, 2025',
      slug: 'doha-beaches',
    },
    {
      id: '14',
      title: 'Ramadan in Qatar: A Visitor\'s Guide',
      excerpt: 'Everything you need to know about experiencing Ramadan in Doha.',
      imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop',
      category: 'Culture',
      date: 'February 15, 2025',
      slug: 'ramadan-guide',
    },
    {
      id: '15',
      title: 'Sustainable Tourism in Qatar',
      excerpt: 'How to experience Doha while minimizing your environmental impact.',
      imageUrl: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=800&auto=format&fit=crop',
      category: 'Eco-Tourism',
      date: 'February 10, 2025',
      slug: 'sustainable-tourism',
    },
  ];

  const filteredPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = allPosts.find(post => post.id === '8') || {
    id: '8',
    title: 'Desert Adventures: Exploring the Inland Sea',
    excerpt: 'Journey to Qatar\'s spectacular natural wonder for an unforgettable desert experience.',
    imageUrl: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=800&auto=format&fit=crop',
    category: 'Adventures',
    date: 'March 15, 2025',
    slug: 'desert-adventures',
  };

  const categories = [
    { name: 'Attractions', count: allPosts.filter(post => post.category === 'Attractions').length },
    { name: 'Food', count: allPosts.filter(post => post.category === 'Food').length },
    { name: 'Culture', count: allPosts.filter(post => post.category === 'Culture').length },
    { name: 'Events', count: allPosts.filter(post => post.category === 'Events').length },
    { name: 'Lifestyle', count: allPosts.filter(post => post.category === 'Lifestyle').length },
    { name: 'Adventures', count: allPosts.filter(post => post.category === 'Adventures').length },
    { name: 'Architecture', count: allPosts.filter(post => post.category === 'Architecture').length },
    { name: 'Family', count: allPosts.filter(post => post.category === 'Family').length },
    { name: 'Travel', count: allPosts.filter(post => post.category === 'Travel').length },
    { name: 'Eco-Tourism', count: allPosts.filter(post => post.category === 'Eco-Tourism').length },
    { name: 'Expat-Tips', count: allPosts.filter(post => post.category === 'Expat-Tips').length },
  ];

  // Structured Data for SEO
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Experience Doha Blog",
      "description": "Insights, guides, and stories about life and travel in Qatar's capital",
      "url": "https://experiencedoha.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "ExperienceDoha.com"
      },
      "blogPost": allPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.imageUrl,
        "datePublished": post.date,
        "description": post.excerpt,
        "url": `https://experiencedoha.com/blog/${post.slug}`
      }))
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main>
          <section className="bg-qatar-maroon text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Experience Doha Blog - Qatar Travel Guide</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Expert insights, guides, and stories about life and travel in Qatar's vibrant capital
              </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="content-container">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="mb-8">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 border-qatar-maroon/30 focus:border-qatar-maroon focus:ring-qatar-maroon"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Search className="h-5 w-5 text-qatar-maroon" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map(post => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No posts found</h3>
                  <p className="text-gray-500">Try adjusting your search query</p>
                </div>
              )}
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.name} className="flex justify-between items-center">
                      <Link 
                        to={`/blog/category/${category.name.toLowerCase()}`}
                        className="text-gray-700 hover:text-qatar-maroon transition-colors"
                      >
                        {category.name}
                      </Link>
                      <Badge variant="outline" className="bg-qatar-maroon/10">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card className="shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Featured Post</h3>
                </div>
                {isLoading ? (
                  <div className="px-6 pb-6 space-y-4">
                    <Skeleton className="w-full h-40" />
                    <Skeleton className="w-3/4 h-4" />
                    <Skeleton className="w-full h-16" />
                    <Skeleton className="w-1/4 h-4" />
                  </div>
                ) : (
                  <CardContent className="pt-0 space-y-4">
                    <div className="aspect-video relative overflow-hidden rounded-md">
                      <img 
                        src={featuredPost.imageUrl} 
                        alt={`${featuredPost.title} - Featured guide for Doha, Qatar`}
                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <Badge className="bg-qatar-gold/10 text-qatar-gold hover:bg-qatar-gold/20">
                      {featuredPost.category}
                    </Badge>
                    <h4 className="font-bold text-lg text-qatar-maroon">{featuredPost.title}</h4>
                    <p className="text-sm text-gray-600">
                      {featuredPost.excerpt}
                    </p>
                    <Link 
                      to={`/blog/${featuredPost.slug}`} 
                      className="text-qatar-maroon font-medium hover:text-qatar-gold transition-colors inline-flex items-center"
                    >
                      Read More
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </Link>
                  </CardContent>
                )}
              </Card>
              
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-qatar-maroon">Follow Us</h3>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-qatar-maroon text-qatar-maroon hover:bg-qatar-maroon/10"
                    onClick={() => window.open('https://www.youtube.com/@ExperienceDoha', '_blank')}
                  >
                    YouTube
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-qatar-maroon text-qatar-maroon hover:bg-qatar-maroon/10"
                    onClick={() => window.open('https://instagram.com', '_blank')}
                  >
                    Instagram
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 py-16">
        <div className="content-container">
          <Newsletter />
        </div>
      </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
