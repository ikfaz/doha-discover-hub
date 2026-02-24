import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';

import alcoholGuideImage from '@/assets/alcohol-guide-doha.jpg';
import bankAccountQatarImage from '@/assets/bank-account-qatar-guide.jpg';
import cornicheSunsetImage from '@/assets/corniche-sunset-dhow.jpg';
import costOfLivingImage from '@/assets/cost-of-living-doha-2025.jpg';
import desertSafariImage from '@/assets/desert-safari-inland-sea.jpg';
import dohaLayoverImage from '@/assets/doha-layover-experience.jpg';
import dohaMetro2025Image from '@/assets/doha-metro-2025-guide.jpg';
import dohaSafetyImage from '@/assets/doha-safety-guide.jpg';
import dohaTransformingImage from '@/assets/doha-transforming-middle-east.jpg';
import drivingDohaImage from '@/assets/driving-doha-2025-guide.jpg';
import expatSalariesDohaImage from '@/assets/expat-salaries-doha-2025.jpg';
import groceryShoppingDohaImage from '@/assets/grocery-shopping-doha-guide.jpg';
import gymsFitnessDohaImage from '@/assets/gyms-fitness-doha-guide.jpg';
import hamadAirportGuideImage from '@/assets/hamad-airport-guide.jpg';
import hiringMaidNannyImage from '@/assets/hiring-maid-nanny-qatar-guide.jpg';
import housingRentDohaImage from '@/assets/housing-rent-doha-2025.jpg';
import internationalSchoolsImage from '@/assets/international-schools-qatar-guide.jpg';
import jobMarketQatarImage from '@/assets/job-market-qatar-2025.jpg';
import lgbtqQatarImage from '@/assets/lgbtq-experiences-qatar-guide.jpg';
import mobilePlansQatarImage from '@/assets/mobile-plans-qatar-guide.jpg';
import museumsImage from '@/assets/mia-nmoq-museums.jpg';
import petImportQatarImage from '@/assets/pet-import-qatar-guide.jpg';
import prostitutionLawsImage from '@/assets/prostitution-laws-legal-guide.jpg';
import qatarAirwaysStopoverImage from '@/assets/qatar-airways-stopover.jpg';
import qatarLaborLawReformsImage from '@/assets/qatar-labor-law-reforms-2025.jpg';
import qatarTaxGuideImage from '@/assets/qatar-tax-guide-2025.jpg';
import qatarVisaRulesImage from '@/assets/qatar-visa-rules-2025.jpg';
import qatarWorkVisaGuideImage from '@/assets/qatar-work-visa-guide-2025.jpg';
import qatariDishesImage from '@/assets/qatari-dishes-guide.jpg';
import remoteWorkCafesImage from '@/assets/remote-work-cafes-doha-guide.jpg';
import souqWaqifNightImage from '@/assets/souq-waqif-night.jpg';
import westBayAlWaabImage from '@/assets/west-bay-al-waab-comparison.jpg';
import womenDrivingImage from '@/assets/women-driving-qatar.jpg';
import womenSafetyDressCodeImage from '@/assets/women-safety-dress-code-doha.jpg';
import endOfServiceGratuityImage from '@/assets/end-of-service-gratuity-qatar-2025.jpg';

const Index = () => {
  const featuredBlogs = [
    {
      id: '30',
      title: 'The Ultimate Arabian Adventure: Desert Safari and Inland Sea',
      excerpt: 'Experience the thrill of dune bashing and the serenity of Khor Al Adaid - your complete guide to Qatar\'s quintessential desert safari adventure.',
      imageUrl: desertSafariImage,
      category: 'Attractions',
      date: 'May 9, 2026',
      slug: 'desert-safari-inland-sea-khor-al-adaid',
    },
    {
      id: '61',
      title: 'The Final Payout: End-of-Service Benefits and Gratuity Calculations in Qatar',
      excerpt: 'Complete guide to end-of-service gratuity (EOSG) in Qatar. Eligibility, calculation formula, resignation vs termination scenarios, and financial planning tips for expats.',
      imageUrl: endOfServiceGratuityImage,
      category: 'Expat-Tips',
      date: 'June 10, 2026',
      slug: 'end-of-service-gratuity-qatar-2025',
    },
    {
      id: '60',
      title: 'A New Era of Mobility: Labor Laws and the Sponsorship (Kafala) System Reforms in Qatar',
      excerpt: 'Complete guide to Qatar labor law reforms 2026. NOC abolition, Kafala system changes, minimum wage, worker mobility, and enhanced protections for expats.',
      imageUrl: qatarLaborLawReformsImage,
      category: 'Expat-Tips',
      date: 'June 9, 2026',
      slug: 'qatar-labor-law-reforms-2025',
    },
    {
      id: '59',
      title: 'The Golden Ticket: Work Visa and Residence Permit (RP) Application Process in Qatar',
      excerpt: 'Complete guide to Qatar work visa and RP process 2026. Step-by-step requirements, documentation, attestation, medical exam, biometrics, and QID card issuance.',
      imageUrl: qatarWorkVisaGuideImage,
      category: 'Expat-Tips',
      date: 'June 8, 2026',
      slug: 'qatar-work-visa-guide-2025',
    },
    {
      id: '58',
      title: 'The Tax-Free Promise: Taxation in Qatar – Income Tax, Property Tax, and the VAT Outlook',
      excerpt: 'Complete guide to Qatar tax system 2026. 0% personal income tax, corporate tax, property tax, rental income, and VAT outlook for expats in Doha.',
      imageUrl: qatarTaxGuideImage,
      category: 'Expat-Tips',
      date: 'June 7, 2026',
      slug: 'qatar-tax-guide-2025',
    },
    {
      id: '57',
      title: 'The Compensation Landscape: Average and Typical Salaries for Various Expat Roles in Doha',
      excerpt: 'Comprehensive guide to expat salaries in Qatar 2026. Salary ranges by sector, total compensation packages, allowances, and negotiation strategies for Doha.',
      imageUrl: expatSalariesDohaImage,
      category: 'Expat-Tips',
      date: 'June 6, 2026',
      slug: 'expat-salaries-doha-2025',
    },
    {
      id: '56',
      title: 'The Gateway to Opportunity: Job Market and Employment for Foreigners in Qatar',
      excerpt: 'Explore Qatar job market 2026 for expats. Key hiring sectors, employment trends, labor reforms, visa sponsorship process, and career opportunities in Doha.',
      imageUrl: jobMarketQatarImage,
      category: 'Expat-Tips',
      date: 'June 5, 2026',
      slug: 'job-market-qatar-2025',
      tags: ['Qatar jobs', 'expat employment', 'work visa Qatar', 'Qatar job market', 'career opportunities'],
    },
    {
      id: '55',
      title: "The Real Estate Landscape: Housing and Rent Prices in Doha's Current Market",
      excerpt: 'Navigate Doha housing market 2026. Rent prices in The Pearl, West Bay, Lusail, affordability strategies, contract structures, and expat housing options in Qatar.',
      imageUrl: housingRentDohaImage,
      category: 'Expat-Tips',
      date: 'June 4, 2026',
      slug: 'housing-rent-doha-2025',
      tags: ['housing Doha', 'rent prices Qatar', 'The Pearl Qatar', 'Lusail City', 'expat housing'],
    },
    {
      id: '54',
      title: 'The Price of Paradise: Cost of Living in Doha and a Comparison to Dubai and Riyadh',
      excerpt: 'Compare cost of living in Doha vs Dubai and Riyadh. Housing costs, groceries, transportation, education fees, and strategies for managing expenses in Qatar 2026.',
      imageUrl: costOfLivingImage,
      category: 'Expat-Tips',
      date: 'June 3, 2026',
      slug: 'cost-of-living-doha-dubai-riyadh',
      tags: ['cost of living Doha', 'Doha vs Dubai', 'Qatar housing costs', 'expat budget Qatar', 'living expenses Qatar'],
    },
    {
      id: '53',
      title: 'Alcohol Rules in Qatar 2026: QDC, Licenses, and Complete Legal Guide',
      excerpt: 'Understand Qatar alcohol laws 2026. Learn about QDC permits, where to buy alcohol legally, hotel bar rules, consumption restrictions, and penalties in Doha.',
      imageUrl: alcoholGuideImage,
      category: 'Expat-Tips',
      date: 'June 2, 2026',
      slug: 'alcohol-guide-doha',
      tags: ['alcohol rules Qatar', 'QDC Qatar', 'alcohol license Doha', 'legal drinking Qatar', 'alcohol permit'],
    },
    {
      id: '52',
      title: 'Best Cafes for Remote Work in Doha Qatar 2026: Digital Nomad Guide',
      excerpt: 'Find best cafes for remote work in Doha 2026. WiFi speeds, power outlets, atmosphere, and productivity-friendly spots for digital workers in Qatar.',
      imageUrl: remoteWorkCafesImage,
      category: 'Expat-Tips',
      date: 'June 1, 2026',
      slug: 'remote-work-cafes-doha-guide',
      tags: ['remote work cafes Doha', 'coworking Doha', 'WiFi cafes Qatar', 'digital nomads', 'laptop-friendly cafes'],
    },
    {
      id: '51',
      title: 'Gyms and Fitness Trends in Doha Qatar 2026: Complete Guide',
      excerpt: 'Discover best gyms in Doha 2026, membership costs, fitness trends, and workout options for expats in Qatar. Compare facilities from budget to luxury.',
      imageUrl: gymsFitnessDohaImage,
      category: 'Expat-Tips',
      date: 'May 31, 2026',
      slug: 'gyms-fitness-doha-guide',
      tags: ['gyms Doha Qatar', 'fitness centers Qatar', 'gym membership', 'best gyms Qatar', 'fitness trends'],
    },
    {
      id: '50',
      title: 'Hiring Maids and Nannies in Doha Qatar 2026: Complete Legal Guide',
      excerpt: 'Hire domestic help legally in Qatar with this 2026 guide. Learn visa sponsorship, salaries, contracts, rights, and where to find maids and nannies in Doha.',
      imageUrl: hiringMaidNannyImage,
      category: 'Expat-Tips',
      date: 'May 30, 2026',
      slug: 'hiring-maid-nanny-qatar-guide',
      tags: ['hiring maid Qatar', 'nanny Doha', 'domestic worker visa', 'housemaid salary', 'sponsorship'],
    },
    {
      id: '49',
      title: 'Pet Import Rules and Veterinary Care in Qatar 2026: Complete Guide',
      excerpt: 'Import your pet to Qatar with this 2026 guide. Learn requirements, quarantine rules, costs, documentation, and find best veterinary clinics in Doha for expats.',
      imageUrl: petImportQatarImage,
      category: 'Expat-Tips',
      date: 'May 29, 2026',
      slug: 'pet-import-qatar-guide',
      tags: ['pet import Qatar', 'bringing pets to Doha', 'veterinary clinics', 'animal permit', 'pet relocation'],
    },
    {
      id: '48',
      title: 'Doha Metro 2026: New Lines, Expansions, and Complete Network Guide',
      excerpt: 'Complete guide to Doha Metro 2026 including new line expansions, stations, fares, operating hours, and travel tips for commuters in Qatar.',
      imageUrl: dohaMetro2025Image,
      category: 'Expat-Tips',
      date: 'May 28, 2026',
      slug: 'doha-metro-2025-guide',
      tags: ['Doha Metro', 'public transport', 'Qatar Rail', 'commuting', 'metro fares'],
    },
    {
      id: '47',
      title: 'Grocery Shopping Hacks in Doha 2026: Carrefour vs Lulu Complete Guide',
      excerpt: 'Master grocery shopping in Doha with Carrefour vs Lulu comparison. Find best prices, product selection, delivery options, and money-saving hacks for expats in Qatar.',
      imageUrl: groceryShoppingDohaImage,
      category: 'Expat-Tips',
      date: 'May 27, 2026',
      slug: 'grocery-shopping-doha-guide',
      tags: ['grocery shopping', 'Carrefour', 'Lulu Hypermarket', 'money saving', 'expat life'],
    },
    {
      id: '46',
      title: 'Best Mobile and Data Plans in Qatar 2026: Ooredoo vs Vodafone Complete Guide',
      excerpt: 'Compare Ooredoo vs Vodafone Qatar 2026. Find best mobile plans, data packages, prices, coverage, and which telecom provider suits expats in Doha.',
      imageUrl: mobilePlansQatarImage,
      category: 'Expat-Tips',
      date: 'May 26, 2026',
      slug: 'mobile-plans-qatar-guide',
      tags: ['mobile plans', 'Ooredoo', 'Vodafone', 'telecom Qatar', 'data packages'],
    },
    {
      id: '45',
      title: 'Opening a Bank Account in Qatar: QNB vs International Banks Guide',
      excerpt: 'Compare QNB vs international banks in Qatar. Learn account requirements, fees, services, and which bank is best for expats opening accounts in Doha 2026.',
      imageUrl: bankAccountQatarImage,
      category: 'Expat-Tips',
      date: 'May 25, 2026',
      slug: 'bank-account-qatar-guide',
      tags: ['Qatar banking', 'QNB', 'expat finance', 'international banks', 'account opening'],
    },
    {
      id: '44',
      title: 'LGBTQ+ Experiences in Qatar: What Expats Need to Know 2026',
      excerpt: 'Honest guide to LGBTQ+ experiences in Qatar. Understand legal realities, safety considerations, expat community experiences, and practical advice for living in Doha.',
      imageUrl: lgbtqQatarImage,
      category: 'Expat-Tips',
      date: 'May 24, 2026',
      slug: 'lgbtq-experiences-qatar-2025',
      tags: ['LGBTQ Qatar', 'expat life', 'safety guide', 'legal information', 'diversity'],
    },
    {
      id: '43',
      title: 'Driving in Doha 2026: Traffic Updates, Rules, and Survival Guide',
      excerpt: 'Essential guide to driving in Doha 2026. Traffic patterns, road rules, license requirements, fines, and navigation tips for new drivers in Qatar.',
      imageUrl: drivingDohaImage,
      category: 'Expat-Tips',
      date: 'May 23, 2026',
      slug: 'driving-doha-2025-guide',
      tags: ['driving Doha', 'Qatar license', 'traffic rules', 'road safety', 'expat driving'],
    },
    {
      id: '42',
      title: 'Renting in Doha: West Bay vs Al Waab Comparison Guide 2026',
      excerpt: 'Compare renting in West Bay vs Al Waab in Doha. Detailed analysis of prices, amenities, lifestyle, schools, and commutes to help expats choose the right neighborhood.',
      imageUrl: westBayAlWaabImage,
      category: 'Expat-Tips',
      date: 'May 22, 2026',
      slug: 'renting-doha-west-bay-al-waab-2025',
      tags: ['Doha neighborhoods', 'West Bay', 'Al Waab', 'rental guide', 'expat housing'],
    },
    {
      id: '41',
      title: 'New Qatar Visa Rules for Expats 2026: Complete Immigration Guide',
      excerpt: 'Updated Qatar visa rules 2026 for expats. Learn about work permits, residency requirements, family sponsorship, golden visas, and new immigration policies.',
      imageUrl: qatarVisaRulesImage,
      category: 'Expat-Tips',
      date: 'May 20, 2026',
      slug: 'qatar-visa-rules-expats-2025',
      tags: ['Qatar visa', 'work permit', 'residency', 'golden visa', 'immigration'],
    },
    {
      id: '40',
      title: 'International Schools in Qatar 2026: Waitlists, Fees, and Application Guide',
      excerpt: 'Complete guide to international schools in Qatar 2026. Compare fees from QAR 30,000-120,000/year, understand waitlist situations, and learn application strategies.',
      imageUrl: internationalSchoolsImage,
      category: 'Expat-Tips',
      date: 'May 19, 2026',
      slug: 'international-schools-qatar-2025',
      tags: ['international schools', 'school fees', 'education Qatar', 'British schools', 'American schools'],
    },
    {
      id: '39',
      title: "Women's Safety and Dress Code in Doha, Qatar: Complete 2026 Guide",
      excerpt: "Essential guide to women's safety in Doha and Qatar dress code requirements. Learn what to wear, cultural expectations, and safety tips for female expats and tourists.",
      imageUrl: womenSafetyDressCodeImage,
      category: 'Expat-Tips',
      date: 'May 18, 2026',
      slug: 'women-safety-dress-code-doha-qatar',
      tags: ['women safety', 'dress code', 'female expat', 'cultural norms', 'modest dress'],
    },
    {
      id: '38',
      title: 'Cost of Living in Doha (2026 Update): Rent, Food & Hidden Costs',
      excerpt: 'Updated for Winter 2025/2026. Real cost of living in Doha including rent inflation, grocery prices, hidden costs, and monthly budget comparison for singles and families.',
      imageUrl: costOfLivingImage,
      category: 'Expat-Tips',
      date: 'May 17, 2026',
      slug: 'cost-of-living-doha-2025',
      tags: ['cost of living', 'rent prices', 'expat budget', 'Qatar inflation', 'monthly expenses'],
    },
    {
      id: '37',
      title: "Doha: The City That's Changing the Middle East",
      excerpt: "Discover how Doha is transforming the Middle East through innovation, culture, economic strength, and global influence. A complete guide to Qatar's visionary capital.",
      imageUrl: dohaTransformingImage,
      category: 'Culture',
      date: 'May 16, 2026',
      slug: 'doha-changing-middle-east',
    },
    {
      id: '36',
      title: "Hamad International Airport: The Ultimate Guide to Qatar's Award-Winning Aviation Hub",
      excerpt: 'Complete guide to Hamad International Airport - facilities, lounges, shopping, dining, transport, and everything you need to know about this world-class airport.',
      imageUrl: hamadAirportGuideImage,
      category: 'Expat-Tips',
      date: 'May 15, 2026',
      slug: 'hamad-international-airport-guide',
    },
    {
      id: '35',
      title: 'Qatari Dishes You Must Try in Doha: A Complete Culinary Guide',
      excerpt: 'Discover authentic Qatari cuisine from Machboos to Luqaimat. Complete guide to traditional dishes, best restaurants, and cultural food experiences in Doha.',
      imageUrl: qatariDishesImage,
      category: 'Food',
      date: 'May 14, 2026',
      slug: 'qatari-dishes-doha-culinary-guide',
    },
    {
      id: '34',
      title: 'Can Women Drive in Qatar? (2026 Guide for Tourists, Expats & Families)',
      excerpt: 'Everything you need to know about driving laws for women in Qatar. Complete guide covering licenses, safety, cultural attitudes, and practical tips.',
      imageUrl: womenDrivingImage,
      category: 'Expat-Tips',
      date: 'May 13, 2026',
      slug: 'women-driving-qatar-guide',
    },
    {
      id: '33',
      title: 'How Safe Is Doha, Qatar? (2026 Full Safety Guide for Tourists & Expats)',
      excerpt: 'Complete safety guide covering crime rates, local laws, nightlife safety, scams, and travel tips. Everything tourists and expats need to know about safety in Doha.',
      imageUrl: dohaSafetyImage,
      category: 'Expat-Tips',
      date: 'May 12, 2026',
      slug: 'doha-safety-guide-tourists-expats',
    },
    {
      id: '32',
      title: 'Prostitution in Doha, Qatar: Is It Legal? (2026 Complete Guide)',
      excerpt: 'Everything tourists and expats need to know about prostitution laws, penalties, safety, and scams in Qatar. A comprehensive legal guide for visitors.',
      imageUrl: prostitutionLawsImage,
      category: 'Expat-Tips',
      date: 'May 11, 2026',
      slug: 'prostitution-laws-doha-qatar-guide',
    },
    {
      id: '31',
      title: 'Is Drinking Alcohol Allowed in Doha, Qatar? (2026 Full Guide)',
      excerpt: 'Your ultimate tourist-friendly guide to alcohol rules, prices, licensed venues, and nightlife in Doha. Everything you need to know about drinking legally in Qatar.',
      imageUrl: alcoholGuideImage,
      category: 'Expat-Tips',
      date: 'May 10, 2026',
      slug: 'alcohol-allowed-doha-qatar-guide',
    },
    {
      id: '30',
      title: 'The Ultimate Arabian Adventure: Desert Safari and Inland Sea',
      excerpt: "Experience the thrill of dune bashing and the serenity of Khor Al Adaid - your complete guide to Qatar's quintessential desert safari adventure.",
      imageUrl: desertSafariImage,
      category: 'Attractions',
      date: 'May 9, 2026',
      slug: 'desert-safari-inland-sea-khor-al-adaid',
    },
    {
      id: '29',
      title: 'A Tale of Two Museums: MIA + NMoQ Combo Guide',
      excerpt: "Discover Qatar's cultural treasures with our guide to visiting the Museum of Islamic Art and National Museum of Qatar using the Discover One Pass.",
      imageUrl: museumsImage,
      category: 'Culture',
      date: 'May 8, 2026',
      slug: 'mia-nmoq-museum-combo-guide',
    },
    {
      id: '28',
      title: 'The Heart of Doha After Dark: Souq Waqif Night Experiences',
      excerpt: 'Discover Souq Waqif at night - from authentic Qatari dining and shisha cafés to mastering the art of haggling in the ancient market alleyways.',
      imageUrl: souqWaqifNightImage,
      category: 'Culture',
      date: 'May 7, 2026',
      slug: 'souq-waqif-night-experiences-haggling',
    },
    {
      id: '27',
      title: 'The Ultimate 24-48 Hour Layover in Doha: A Complete Guide',
      excerpt: 'Transform your Doha layover into a mini-vacation with our detailed 24-hour dash and 48-hour exploration itineraries, from cultural highlights to desert adventures.',
      imageUrl: dohaLayoverImage,
      category: 'Expat-Tips',
      date: 'May 6, 2026',
      slug: 'ultimate-doha-layover-24-48-hours',
    },
    {
      id: '26',
      title: 'Qatar Airways Stopover Packages: Two Holidays in One',
      excerpt: 'Discover how to turn your layover into a free mini-vacation with Qatar Airways stopover packages and exclusive lounge access benefits.',
      imageUrl: qatarAirwaysStopoverImage,
      category: 'Expat-Tips',
      date: 'May 5, 2026',
      slug: 'qatar-airways-stopover-packages-lounge',
    },
    {
      id: '23',
      title: 'The Golden Hour in Doha: Corniche Sunset and Dhow Cruise',
      excerpt: "Experience the magic of Doha's Corniche at sunset, followed by a traditional dhow cruise - the perfect romantic evening in Qatar.",
      imageUrl: cornicheSunsetImage,
      category: 'Attractions',
      date: 'May 4, 2026',
      slug: 'corniche-sunset-dhow-cruise-guide',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Experience Doha',
    url: 'https://www.experiencedoha.com/',
    description:
      'Your ultimate guide to exploring Doha, Qatar. Discover top attractions, cultural insights, expat tips, and hidden gems in Qatar\'s vibrant capital.',
    keywords: [
      'Doha',
      'Qatar',
      'Things to do in Doha',
      'Expat guide Doha',
      'Qatar travel guide',
      'Doha attractions',
      'Qatar culture',
      'Living in Doha',
    ],
    author: {
      '@type': 'Organization',
      name: 'Experience Doha',
      url: 'https://www.experiencedoha.com/',
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    publisher: {
      '@type': 'Organization',
      name: 'Experience Doha',
      url: 'https://www.experiencedoha.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.experiencedoha.com/logo.png',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.experiencedoha.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://www.facebook.com/experiencedoha',
      'https://www.instagram.com/experiencedoha',
      'https://twitter.com/experiencedoha',
    ],
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Experience Doha - Ultimate Guide to Qatar Travel & Living"
        description="The ultimate guide to living in and visiting Doha, Qatar. Updated for 2026 with visa rules, cost of living, and stopover tips."
      />
      <NavBar />

      {/* Hero Section */}
      <section className="hero-section bg-qatar-maroon text-white py-20">
        <div className="content-container">
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6">
            Discover Doha
          </h1>
          <p className="text-xl max-w-3xl mb-8">
            Your ultimate guide to exploring Qatar's vibrant capital. Discover
            top attractions, cultural insights, expat tips, and hidden gems in
            Doha.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/blog"
              className="bg-qatar-gold text-qatar-maroon font-bold py-3 px-8 rounded-md hover:bg-qatar-gold/90 transition-colors"
            >
              Explore the Blog
            </Link>
            <a
              href="https://www.viator.com/tours/Doha/Private-Desert-Safari-Dune-Bashing-Camel-Ride-Sand-Boarding-Inland-Sea-Visit/d4453-41683P18?medium=link&pid=P00290081&mcid=42383"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-qatar-maroon font-bold py-3 px-8 rounded-md hover:bg-white/90 transition-colors"
            >
              Book Desert Safari
            </a>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="featured-blogs py-16">
        <div className="content-container">
          <h2 className="text-3xl font-bold font-heading mb-8 text-qatar-maroon">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                imageUrl={blog.imageUrl}
                category={blog.category}
                date={blog.date}
                slug={blog.slug}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/blog"
              className="text-qatar-maroon font-medium hover:text-qatar-gold transition-colors inline-flex items-center"
          >
              View All Articles
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
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="content-container">
          <Newsletter />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
