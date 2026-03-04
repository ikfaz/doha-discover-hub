import type { ArticleData } from './types';
import endOfServiceGratuityImage from '@/assets/end-of-service-gratuity-qatar-2025.jpg';
import qatarLaborLawReformsImage from '@/assets/qatar-labor-law-reforms-2025.jpg';
import qatarWorkVisaGuideImage from '@/assets/qatar-work-visa-guide-2025.jpg';
import qatarTaxGuideImage from '@/assets/qatar-tax-guide-2025.jpg';
import expatSalariesDohaImage from '@/assets/expat-salaries-doha-2025.jpg';
import jobMarketQatarImage from '@/assets/job-market-qatar-2025.jpg';
import housingRentDohaImage from '@/assets/housing-rent-doha-2025.jpg';
import costOfLivingImage from '@/assets/cost-of-living-doha-2025.jpg';
import alcoholGuideImage from '@/assets/alcohol-guide-doha.jpg';
import remoteWorkCafesImage from '@/assets/remote-work-cafes-doha-guide.jpg';
import gymsFitnessDohaImage from '@/assets/gyms-fitness-doha-guide.jpg';
import hiringMaidNannyImage from '@/assets/hiring-maid-nanny-qatar-guide.jpg';
import petImportQatarImage from '@/assets/pet-import-qatar-guide.jpg';
import dohaMetro2025Image from '@/assets/doha-metro-2025-guide.jpg';
import groceryShoppingDohaImage from '@/assets/grocery-shopping-doha-guide.jpg';
import mobilePlansQatarImage from '@/assets/mobile-plans-qatar-guide.jpg';
import bankAccountQatarImage from '@/assets/bank-account-qatar-guide.jpg';
import lgbtqQatarImage from '@/assets/lgbtq-experiences-qatar-guide.jpg';
import drivingDohaImage from '@/assets/driving-doha-2025-guide.jpg';
import westBayAlWaabImage from '@/assets/west-bay-al-waab-comparison.jpg';
import qatarVisaRulesImage from '@/assets/qatar-visa-rules-2025.jpg';
import internationalSchoolsImage from '@/assets/international-schools-qatar-guide.jpg';
import womenSafetyDressCodeImage from '@/assets/women-safety-dress-code-doha.jpg';
import dohaTransformingImage from '@/assets/doha-transforming-middle-east.jpg';
import hamadAirportGuideImage from '@/assets/hamad-airport-guide.jpg';
import qatariDishesImage from '@/assets/qatari-dishes-guide.jpg';
import womenDrivingImage from '@/assets/women-driving-qatar.jpg';
import dohaSafetyImage from '@/assets/doha-safety-guide.jpg';
import prostitutionLawsImage from '@/assets/prostitution-laws-legal-guide.jpg';
import desertSafariImage from '@/assets/desert-safari-inland-sea.jpg';
import miaNmoqImage from '@/assets/mia-nmoq-museums.jpg';
import souqWaqifNightImage from '@/assets/souq-waqif-night.jpg';
import dohaLayoverImage from '@/assets/doha-layover-experience.jpg';
import qatarAirwaysStopoverImage from '@/assets/qatar-airways-stopover.jpg';
import dohaMediationImage from '@/assets/doha-mediation-hub.jpg';
import fifaU17Image from '@/assets/fifa-u17-world-cup.jpg';
import cornicheSunsetImage from '@/assets/corniche-sunset-dhow.jpg';
import pearlQatarImage from '@/assets/pearl-qatar-luxury.jpg';
import kataraImage from '@/assets/katara-cultural-village.jpg';
import hamadAirportInteriorImage from '@/assets/hamad-airport-interior.jpg';
import fiveBestLayoverImage from '@/assets/five-best-layover.jpg';
import nineHourStopoverImage from '@/assets/9-hour-stopover.jpg';
import discoverQatarImage from '@/assets/discover-qatar.jpg';
import twentyFourHoursImage from '@/assets/24-hours-itinerary.jpg';
import layoverTimeGuideImage from '@/assets/layover-time-guide.jpg';
import perfectLayoverImage from '@/assets/perfect-layover.jpg';
import unmissableThingsImage from '@/assets/10-unmissable-things.jpg';
import hamadAirportTransfersImage from '@/assets/hamad-airport-transfers.jpg';
import stopoverProgramImage from '@/assets/stopover-program.jpg';
import top10AttractionsImage from '@/assets/top-10-attractions.jpg';
import bestThingsToDoInDohaCoverImage from '@/assets/best-things-to-do-in-doha-cover.svg?url';
import dohaStopoverGuide1296CoverImage from '@/assets/doha-stopover-guide-12-96-hours-cover.svg?url';
import bestHotelsDohaNeighborhoodCoverImage from '@/assets/best-hotels-in-doha-by-neighborhood-cover.svg?url';
import bestTimeToVisitDohaWeatherCoverImage from '@/assets/best-time-to-visit-doha-weather-cover.svg?url&no-inline';

export type BlogMetaData = Omit<ArticleData, 'content' | 'tableOfContents'>;

export const blogMetaPosts: Record<string, BlogMetaData> = {
    'best-time-to-visit-doha-weather': {
      id: '65',
      title: 'Best Time to Visit Doha for Weather (Month-by-Month Guide)',
      date: 'March 4, 2026',
      isoDate: '2026-03-04',
      metaDescription: 'Plan the best time to visit Doha with practical month-by-month weather ranges, comfort guidance, and crowd tradeoffs. This guide covers winter peak season, shoulder months, and extreme summer heat so you can schedule beaches, desert trips, city walks, and indoor plans at the right time.',
      excerpt: 'The best time to visit Doha for weather is usually November through March. This guide breaks down every month with heat, humidity, crowd levels, and activity fit so you can pick dates that match your travel style.',
      author: 'Experience Doha Team',
      readTime: '14 min read',
      category: 'Attractions',
      imageUrl: bestTimeToVisitDohaWeatherCoverImage,
      tags: ['best time to visit doha', 'doha weather by month', 'qatar best time to visit', 'doha winter weather', 'doha summer humidity', 'doha in november', 'doha in february', 'doha in april', 'doha in october', 'doha heat index', 'doha desert safari best time', 'doha beach best months'],
    },

    'best-hotels-in-doha-by-neighborhood': {
      id: '64',
      title: 'Best Hotels in Doha by Neighborhood (2026 Guide)',
      date: 'March 4, 2026',
      isoDate: '2026-03-04',
      metaDescription: 'Find the best hotels in Doha by neighborhood with practical guidance on West Bay, Msheireb, Souq Waqif/Old Town, The Pearl-Qatar, and Lusail/Katara. Compare vibe, transit access, and realistic nightly ranges, then use a sample 3-day plan to reduce transfer time and booking mistakes. Includes live-check links for airport updates, events, and current rates.',
      excerpt: 'Choose where to stay in Doha based on transport, trip style, and realistic nightly ranges. This guide compares West Bay, Msheireb, Souq Waqif, The Pearl, and Lusail/Katara with practical hotel picks and planning shortcuts.',
      author: 'Experience Doha Team',
      readTime: '15 min read',
      category: 'Attractions',
      imageUrl: bestHotelsDohaNeighborhoodCoverImage,
      tags: ['best hotels in doha', 'where to stay in doha', 'west bay doha hotels', 'msheireb hotels', 'souq waqif hotels', 'old town doha hotels', 'pearl qatar hotels', 'lusail hotels', 'luxury hotels doha', 'family hotels doha', 'doha metro hotels', 'doha hotel price range'],
    },

    'doha-stopover-guide-12-96-hours': {
      id: '63',
      title: 'Doha Stopover Guide for 12-96 Hours',
      date: 'March 2, 2026',
      isoDate: '2026-03-02',
      metaDescription: 'Turn your Doha layover into a mini vacation with this practical stopover guide for 12-96 hours. Learn how to use Qatar\'s stopover hotel deals, choose the fastest airport transfer, and follow optimized itineraries for 12-24h, 24-48h, or 48-96h. Includes a comparison table, a 48-hour timeline, and a time-allocation pie chart, plus live-check reminders for flights, visas, and events.',
      excerpt: 'A Doha stopover can be shockingly efficient: most headline sights are 15-30 minutes from the airport, and the metro links straight into the city. Use this guide\'s ready-to-run itineraries for 12-24h, 24-48h, and 48-96h with transport moves, timing, and live-check reminders before you leave the terminal.',
      author: 'Experience Doha Team',
      readTime: '18 min read',
      category: 'Attractions',
      imageUrl: dohaStopoverGuide1296CoverImage,
      tags: ['doha stopover guide', 'doha layover itinerary', 'qatar stopover 12 96 hours', 'discover qatar stopover booking', 'qatar airways stopover hotel', 'hamad airport to city', 'doha metro from airport', '24 hours in doha', '48 hours in doha', 'souq waqif at night', 'museum of islamic art doha', 'national museum of qatar'],
    },

    'best-things-to-do-in-doha': {
      id: '62',
      title: 'Best Things to Do in Doha',
      date: 'March 2, 2026',
      isoDate: '2026-03-02',
      metaDescription: 'Discover the best things to do in Doha with a practical, traveler-first guide: iconic waterfront walks, must-see museums, Souq Waqif after dark, Katara\'s culture and beach time, The Pearl\'s marina vibes, and the Inland Sea desert escape. Includes visit durations, transport tips, and live-check reminders for visas, event dates, and airport updates.',
      excerpt: 'Doha is built for short, high-impact days with waterfront views, world-class museums, and markets that come alive after dark. This guide prioritizes attractions with the biggest payoff per hour, plus clear timing, transport, and live-check reminders.',
      author: 'Experience Doha Team',
      readTime: '16 min read',
      category: 'Attractions',
      imageUrl: bestThingsToDoInDohaCoverImage,
      tags: ['things to do in doha', 'best things to do in doha', 'doha itinerary', 'souq waqif', 'museum of islamic art doha', 'national museum of qatar', 'doha corniche', 'katara cultural village', 'the pearl qatar', 'old doha port mina district', 'doha metro', 'khor al adaid inland sea'],
    },

    'end-of-service-gratuity-qatar-2025': {
      id: '61',
      title: 'End-of-Service Gratuity in Qatar 2026',
      date: 'June 10, 2025',
      isoDate: '2025-06-10',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Calculate your end-of-service gratuity in Qatar. Complete 2026 guide to EOSG eligibility, calculation formula, and resignation vs termination payouts.',
      excerpt: 'Understand Qatar\'s End-of-Service Gratuity (EOSG) — eligibility criteria, the statutory calculation formula, and how resignation vs termination affects your payout.',
      author: 'Experience Doha Team',
      readTime: '18 min read',
      category: 'Expat-Tips',
      imageUrl: endOfServiceGratuityImage,
      tags: ['end of service gratuity Qatar', 'EOSG calculation formula', 'Qatar severance pay', 'gratuity resignation vs termination', 'Qatar labor law benefits 2026', 'how to calculate EOSG Qatar'],
    },

    'qatar-labor-law-reforms-2025': {
      id: '60',
      title: 'Qatar Kafala & Labor Law Reforms 2026',
      date: 'June 9, 2025',
      isoDate: '2025-06-09',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Qatar Kafala reforms 2026: new labor mobility rules, contract switching, exit permits abolished. Complete guide for expat workers in Doha.',
      excerpt: 'Explore Qatar\'s landmark labor law reforms including the abolition of the Kafala sponsorship system, new contract-switching rules, and enhanced worker protections.',
      author: 'Experience Doha Team',
      readTime: '16 min read',
      category: 'Expat-Tips',
      imageUrl: qatarLaborLawReformsImage,
      tags: ['Qatar Kafala system abolished', 'NOC removal Qatar 2026', 'Qatar minimum wage', 'worker rights Qatar', 'job change without NOC Qatar', 'Qatar labor reform update'],
    },

    'qatar-work-visa-guide-2025': {
      id: '59',
      title: 'Qatar Work Visa & RP Guide 2026',
      date: 'June 8, 2025',
      isoDate: '2025-06-08',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Step-by-step Qatar work visa and residence permit guide 2026. Requirements, processing times, medical tests, and RP renewal for expats.',
      excerpt: 'A complete walkthrough of Qatar\'s work visa and residence permit process — from job offer to RP issuance, including documents, medical exams, and renewal steps.',
      author: 'Experience Doha Team',
      readTime: '14 min read',
      category: 'Expat-Tips',
      imageUrl: qatarWorkVisaGuideImage,
      tags: ['Qatar work visa application', 'residence permit Qatar process', 'QID card requirements', 'how to get work visa Qatar', 'employer sponsorship Qatar', 'Qatar RP renewal'],
    },

    'qatar-tax-guide-2025': {
      id: '58',
      title: 'Qatar Tax Guide 2026: Is It Tax-Free?',
      date: 'June 7, 2025',
      isoDate: '2025-06-07',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Is Qatar really tax-free? 2026 guide to income tax, corporate tax, property tax, and the VAT outlook for expats and businesses in Doha.',
      excerpt: 'Discover Qatar\'s tax landscape — zero personal income tax, corporate tax rules, property taxation, and the latest on VAT implementation for residents and businesses.',
      author: 'Experience Doha Team',
      readTime: '12 min read',
      category: 'Expat-Tips',
      imageUrl: qatarTaxGuideImage,
      tags: ['is Qatar tax free', 'Qatar income tax expats', 'VAT in Qatar 2026', 'property tax Doha', 'Qatar corporate tax rate', 'tax free salary Qatar'],
    },

    'expat-salaries-doha-2025': {
      id: '57',
      title: 'Expat Salaries in Doha 2026: By Role',
      date: 'June 6, 2025',
      isoDate: '2025-06-06',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Average expat salaries in Doha 2026 by role: engineering, finance, healthcare, IT. Salary benchmarks, packages, and negotiation tips for Qatar.',
      excerpt: 'Comprehensive salary data for expat roles in Doha — benchmarks across industries, typical compensation packages, housing allowances, and negotiation strategies.',
      author: 'Experience Doha Team',
      readTime: '18 min read',
      category: 'Expat-Tips',
      imageUrl: expatSalariesDohaImage,
      tags: ['average salary Doha expats', 'Qatar salary guide 2026', 'expat pay package Qatar', 'salary negotiation tips Qatar', 'housing allowance Doha', 'engineer salary Qatar'],
    },

    'job-market-qatar-2025': {
      id: '56',
      title: 'Qatar Job Market for Foreigners 2026',
      date: 'June 5, 2025',
      isoDate: '2025-06-05',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Qatar job market 2026: top industries hiring, salary trends, job search strategies, and CV tips for foreigners seeking employment in Doha.',
      excerpt: 'Navigate Qatar\'s job market as a foreigner — discover top hiring industries, in-demand roles, effective job search strategies, and how to craft a winning CV.',
      author: 'Experience Doha Team',
      readTime: '15 min read',
      category: 'Expat-Tips',
      imageUrl: jobMarketQatarImage,
      tags: ['jobs in Qatar for foreigners', 'Qatar hiring 2026', 'best sectors to work Qatar', 'how to find job Doha', 'Qatar Vision 2030 jobs', 'LinkedIn Qatar job search'],
    },

    'housing-rent-doha-2025': {
      id: '55',
      title: 'Housing & Rent Prices in Doha 2026',
      date: 'June 4, 2025',
      isoDate: '2025-06-04',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Doha rent prices 2026: apartments and villas in West Bay, The Pearl, Al Sadd. Average rents, lease tips, and tenant rights in Qatar.',
      excerpt: 'A detailed look at Doha\'s rental market — average prices by neighborhood, lease negotiation tips, tenant rights, and what to expect when renting in Qatar.',
      author: 'Experience Doha Team',
      readTime: '16 min read',
      category: 'Expat-Tips',
      imageUrl: housingRentDohaImage,
      tags: ['rent prices Doha 2026', 'cheapest areas to rent Doha', 'Pearl Qatar rent', 'Lusail apartment prices', 'furnished vs unfurnished Qatar', 'expat housing Doha guide'],
    },

    'cost-of-living-doha-dubai-riyadh': {
      id: '54',
      title: 'Cost of Living: Doha vs Dubai vs Riyadh',
      date: 'June 3, 2025',
      isoDate: '2025-06-03',
      metaDescription: 'Doha vs Dubai vs Riyadh cost of living 2025: rent, groceries, transport, schools compared. Which Gulf city offers the best value for expats?',
      excerpt: 'Compare the cost of living in Doha, Dubai, and Riyadh — from rent and groceries to schooling and transport — to find which Gulf city suits your budget best.',
      author: 'Experience Doha Team',
      readTime: '14 min read',
      category: 'Expat-Tips',
      imageUrl: costOfLivingImage,
      tags: ['cost of living Doha vs Dubai', 'Doha vs Riyadh expenses', 'cheapest Gulf city for expats', 'monthly expenses Doha 2025', 'grocery prices Qatar vs UAE', 'rent comparison Gulf cities'],
    },

    'alcohol-guide-doha': {
      id: '53',
      title: 'Alcohol Rules in Qatar 2026: Full Guide',
      date: 'June 2, 2025',
      isoDate: '2025-06-02',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Qatar alcohol laws 2026: QDC permit guide, hotel bar rules, drinking age, prices, and penalties. Everything expats and tourists need to know.',
      excerpt: 'Complete guide to alcohol in Qatar — QDC liquor permits, legal hotel bars, drinking age, prices, Ramadan rules, and penalties for violations.',
      author: 'Experience Doha Team',
      readTime: '18 min read',
      category: 'Expat-Tips',
      imageUrl: alcoholGuideImage,
      tags: ['can you drink alcohol in Qatar', 'QDC permit Doha', 'alcohol prices Qatar', 'hotel bars Doha', 'nightlife Doha 2026', 'drinking laws Qatar tourists', 'best bars Doha'],
    },

    'remote-work-cafes-doha-guide': {
      id: '52',
      title: 'Best Remote Work Cafes in Doha 2026',
      date: 'June 1, 2025',
      isoDate: '2025-06-01',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Best remote work cafes in Doha 2026: WiFi speeds, power outlets, coffee prices. Top spots for freelancers and digital nomads in Qatar.',
      excerpt: 'Discover the best cafes for remote work in Doha — rated by WiFi speed, seating comfort, coffee quality, and noise level for productive work sessions.',
      author: 'Experience Doha Team',
      readTime: '16 min read',
      category: 'Expat-Tips',
      imageUrl: remoteWorkCafesImage,
      tags: ['best cafes for working Doha', 'coworking spaces Qatar', 'digital nomad Doha', 'wifi cafes Doha', 'remote work Qatar', 'freelancer cafes Doha 2026'],
    },

    'gyms-fitness-doha-guide': {
      id: '51',
      title: 'Gyms & Fitness in Doha 2026: Full Guide',
      date: 'May 31, 2025',
      isoDate: '2025-05-31',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Best gyms in Doha 2026: membership prices, ladies-only facilities, CrossFit, yoga, and outdoor fitness options across Qatar.',
      excerpt: 'Your complete guide to gyms and fitness in Doha — compare memberships, discover ladies-only gyms, CrossFit boxes, yoga studios, and outdoor fitness trends.',
      author: 'Experience Doha Team',
      readTime: '17 min read',
      category: 'Expat-Tips',
      imageUrl: gymsFitnessDohaImage,
      tags: ['best gyms in Doha', 'gym membership prices Qatar', 'ladies only gym Doha', 'CrossFit Doha', 'fitness centers Qatar 2026', 'personal trainer Doha cost'],
    },

    'hiring-maid-nanny-qatar-guide': {
      id: '50',
      title: 'Hiring a Maid or Nanny in Qatar 2026',
      date: 'May 30, 2025',
      isoDate: '2025-05-30',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Hiring a maid or nanny in Qatar 2026: legal requirements, visa costs, salary ranges, contracts, and agency vs direct hire comparison.',
      excerpt: 'Complete legal guide to hiring domestic workers in Qatar — from visa sponsorship and salary benchmarks to contracts, agencies, and your obligations as an employer.',
      author: 'Experience Doha Team',
      readTime: '19 min read',
      category: 'Expat-Tips',
      imageUrl: hiringMaidNannyImage,
      tags: ['hiring maid Qatar legal process', 'nanny cost Doha', 'domestic worker visa Qatar', 'housemaid salary Qatar 2026', 'nanny agency Doha', 'maid sponsorship Qatar'],
    },

    'pet-import-qatar-guide': {
      id: '49',
      title: 'Pet Import Rules in Qatar 2026: Guide',
      date: 'May 29, 2025',
      isoDate: '2025-05-29',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Pet import Qatar 2026: required vaccinations, WOAH health certificates, quarantine rules, and best veterinary clinics in Doha for cats and dogs.',
      excerpt: 'Everything you need to know about bringing pets to Qatar — import requirements, vaccination schedules, quarantine procedures, and top veterinary clinics in Doha.',
      author: 'Experience Doha Team',
      readTime: '18 min read',
      category: 'Expat-Tips',
      imageUrl: petImportQatarImage,
      tags: ['how to bring pets to Qatar', 'pet import rules Qatar', 'vet clinics Doha', 'pet quarantine Qatar', 'dog friendly places Doha', 'pet relocation Qatar cost'],
    },

    'doha-metro-2025-guide': {
      id: '48',
      title: 'Doha Metro Guide 2026: Map & Fares',
      date: 'May 28, 2025',
      isoDate: '2025-05-28',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Doha Metro guide 2026: new Lusail tram, Gold Line expansion, fares, stations, and travel card options. Complete network map and tips.',
      excerpt: 'Navigate Doha by metro — complete guide to routes, new line expansions, fare zones, travel cards, and tips for using Qatar\'s modern rail network.',
      author: 'Experience Doha Team',
      readTime: '16 min read',
      category: 'Expat-Tips',
      imageUrl: dohaMetro2025Image,
      tags: ['Doha metro map 2026', 'metro ticket price Qatar', 'Doha metro stations', 'metro to airport Doha', 'public transport Qatar guide', 'metro card Doha'],
    },

    'grocery-shopping-doha-guide': {
      id: '47',
      title: 'Grocery Shopping Doha: Carrefour vs Lulu',
      date: 'May 27, 2025',
      isoDate: '2025-05-27',
      metaDescription: 'Grocery shopping Doha 2026: Carrefour vs Lulu vs Al Meera price comparison, best delivery apps, and money-saving hacks for expats.',
      excerpt: 'Save money on groceries in Doha — compare prices at Carrefour, Lulu, and Al Meera, discover delivery apps, and learn shopping hacks for budget-savvy expats.',
      author: 'Experience Doha Team',
      readTime: '18 min read',
      category: 'Expat-Tips',
      imageUrl: groceryShoppingDohaImage,
      tags: ['Carrefour vs Lulu Doha', 'grocery prices Qatar', 'cheapest supermarket Doha', 'online grocery delivery Qatar', 'food budget Doha expat', 'where to buy groceries Doha'],
    },

    'mobile-plans-qatar-guide': {
      id: '46',
      title: 'Ooredoo vs Vodafone Qatar 2026: Plans',
      date: 'May 26, 2025',
      isoDate: '2025-05-26',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Ooredoo vs Vodafone Qatar 2026: best mobile plans, data packages, 5G coverage, tourist SIM cards, and roaming costs compared.',
      excerpt: 'Compare Ooredoo and Vodafone mobile plans in Qatar — data packages, 5G speeds, tourist SIM options, and which provider offers the best value for expats.',
      author: 'Experience Doha Team',
      readTime: '16 min read',
      category: 'Expat-Tips',
      imageUrl: mobilePlansQatarImage,
      tags: ['Ooredoo vs Vodafone Qatar', 'best SIM card Qatar tourist', 'cheapest data plan Qatar', 'mobile internet Qatar', 'prepaid SIM Doha', '5G coverage Qatar'],
    },

    'bank-account-qatar-guide': {
      id: '45',
      title: 'Open a Bank Account in Qatar: Guide',
      date: 'May 25, 2025',
      isoDate: '2025-05-25',
      metaDescription: 'Opening a bank account in Qatar 2025: QNB vs HSBC vs Standard Chartered. Required documents, fees, and best banks for expat salary accounts.',
      excerpt: 'Compare Qatar\'s top banks for expats — QNB, HSBC, and Standard Chartered. Learn the documents needed, account types, and which bank suits your needs.',
      author: 'Experience Doha Team',
      readTime: '15 min read',
      category: 'Expat-Tips',
      imageUrl: bankAccountQatarImage,
      tags: ['how to open bank account Qatar', 'best bank for expats Qatar', 'QNB vs HSBC Qatar', 'bank account requirements Qatar', 'online banking Doha', 'salary account Qatar'],
    },

    'lgbtq-experiences-qatar-2025': {
      id: '44',
      title: 'LGBTQ+ in Qatar: What Expats Must Know',
      date: 'May 24, 2025',
      isoDate: '2025-05-24',
      metaDescription: 'LGBTQ+ life in Qatar 2026: laws, safety tips, mental health resources, and what expats and travelers need to know before visiting Doha.',
      excerpt: 'A sensitive, practical guide to LGBTQ+ experiences in Qatar — covering local laws, safety advice, mental health resources, and community support for expats.',
      author: 'Experience Doha Team',
      readTime: '14 min read',
      category: 'Expat-Tips',
      imageUrl: lgbtqQatarImage,
      tags: ['is Qatar safe for LGBTQ', 'LGBTQ laws Qatar', 'gay rights Qatar 2025', 'LGBTQ expat Qatar', 'mental health support Doha', 'Qatar LGBTQ travel advice'],
    },

    'driving-doha-2025-guide': {
      id: '43',
      title: 'Driving in Doha 2026: Rules & Tips',
      date: 'May 23, 2025',
      isoDate: '2025-05-23',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Driving in Doha 2026: traffic rules, license conversion, speed cameras, parking tips, and road safety guide for expats and tourists.',
      excerpt: 'Survive Doha traffic — complete guide to driving rules, license conversion, speed cameras, fuel prices, parking, and road safety tips for Qatar.',
      author: 'Experience Doha Team',
      readTime: '16 min read',
      category: 'Expat-Tips',
      imageUrl: drivingDohaImage,
      tags: ['driving license Qatar process', 'traffic rules Qatar', 'driving test Doha', 'road fines Qatar', 'parking Doha tips', 'international driving permit Qatar'],
    },

    'renting-doha-west-bay-al-waab-2025': {
      id: '42',
      title: 'West Bay vs Al Waab: Renting in Doha',
      date: 'May 22, 2025',
      isoDate: '2025-05-22',
      metaDescription: 'West Bay vs Al Waab rent comparison 2025: apartment prices, lifestyle, schools, commute times. Which Doha neighborhood is right for you?',
      excerpt: 'Choosing between West Bay and Al Waab? Compare rent prices, lifestyle, proximity to schools, commute times, and amenities in Doha\'s top residential areas.',
      author: 'Experience Doha Team',
      readTime: '15 min read',
      category: 'Expat-Tips',
      imageUrl: westBayAlWaabImage,
      tags: ['West Bay vs Al Waab Doha', 'best neighborhoods Doha rent', 'apartment prices West Bay', 'family areas Doha', 'where to live Doha expats'],
    },

    'qatar-visa-rules-expats-2025': {
      id: '41',
      title: 'Qatar Visa Rules for Expats 2026',
      date: 'May 20, 2025',
      isoDate: '2025-05-20',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Qatar visa rules 2026: work permits, family sponsorship, golden visa, tourist visas. Complete immigration guide for expats moving to Doha.',
      excerpt: 'Navigate Qatar\'s updated visa system — work permits, family sponsorship, golden permanent residency, and tourist visa rules explained for expats and visitors.',
      author: 'Experience Doha Team',
      readTime: '18 min read',
      category: 'Expat-Tips',
      imageUrl: qatarVisaRulesImage,
      tags: ['Qatar visa rules 2026', 'family visa Qatar', 'dependent visa Qatar', 'exit permit abolished Qatar', 'Qatar immigration update', 'visa on arrival Qatar'],
    },

    'international-schools-qatar-2025': {
      id: '40',
      title: 'International Schools Qatar 2026: Fees',
      date: 'May 19, 2025',
      isoDate: '2025-05-19',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'International schools in Qatar 2026: fees, waitlists, curriculum options (IB, British, American), and application tips for expat families in Doha.',
      excerpt: 'Find the right school for your child in Qatar — compare fees, curricula (IB, British, American), waitlist strategies, and application timelines across Doha.',
      author: 'Experience Doha Team',
      readTime: '16 min read',
      category: 'Expat-Tips',
      imageUrl: internationalSchoolsImage,
      tags: ['best international schools Qatar', 'school fees Doha 2026', 'British schools Qatar', 'IB schools Doha', 'school admission Qatar', 'education cost Qatar expats'],
    },

    'women-safety-dress-code-doha-qatar': {
      id: '39',
      title: 'Women\'s Safety & Dress Code in Doha',
      date: 'May 18, 2025',
      isoDate: '2025-05-18',
      metaDescription: 'Women\'s safety in Doha 2026: dress code rules, cultural tips, solo travel advice, and practical safety guide for female tourists and expats in Qatar.',
      excerpt: 'A practical guide for women visiting or living in Doha — dress code expectations, cultural norms, solo travel tips, and why Qatar ranks among the safest countries.',
      author: 'Experience Doha Team',
      readTime: '14 min read',
      category: 'Expat-Tips',
      imageUrl: womenSafetyDressCodeImage,
      tags: ['is Doha safe for women', 'dress code Qatar women', 'what to wear in Qatar', 'female travel Qatar tips', 'women rights Qatar', 'modest clothing Doha'],
    },

    'cost-of-living-doha-2025': {
      id: '38',
      title: 'Cost of Living in Doha 2026: Budget Guide',
      date: 'May 17, 2025',
      isoDate: '2025-05-17',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Cost of living in Doha 2026: rent, groceries, transport, utilities, and hidden costs. Realistic monthly budget breakdown for expats in Qatar.',
      excerpt: 'A realistic breakdown of living costs in Doha — rent, food, transport, utilities, schooling, and hidden expenses that every expat should budget for in 2026.',
      author: 'Experience Doha Team',
      readTime: '12 min read',
      category: 'Expat-Tips',
      imageUrl: costOfLivingImage,
      tags: ['cost of living Doha 2026', 'monthly budget Qatar', 'rent prices Doha', 'is Qatar expensive', 'expat budget Doha', 'utility bills Qatar'],
    },

    'doha-changing-middle-east': {
      id: '37',
      title: 'Doha: The City That\'s Changing the Middle East',
      date: 'May 16, 2025',
      isoDate: '2025-05-16',
      metaDescription: 'How Doha is transforming the Middle East through Vision 2030, innovation hubs, cultural investments, and global diplomacy. Discover Qatar\'s ambitions.',
      excerpt: 'Explore how Doha is reshaping the Middle East — from Vision 2030 mega-projects and cultural institutions to diplomatic influence and smart city innovation.',
      author: 'Experience Doha Team',
      readTime: '16 min read',
      category: 'Culture',
      imageUrl: dohaTransformingImage,
    },

    'hamad-international-airport-guide': {
      id: '36',
      title: 'Hamad Airport Guide: Lounges & Tips',
      date: 'May 15, 2025',
      isoDate: '2025-05-15',
      metaDescription: 'Hamad International Airport guide: lounges, dining, duty-free shopping, transit hotel, metro access, and tips for layover travelers in Doha.',
      excerpt: 'Everything you need to know about Hamad International Airport — world-class lounges, dining options, duty-free shopping, sleeping facilities, and transit tips.',
      author: 'Experience Doha Team',
      readTime: '15 min read',
      category: 'Expat-Tips',
      imageUrl: hamadAirportGuideImage,
    },

    'qatari-dishes-doha-culinary-guide': {
      id: '35',
      title: 'Qatari Dishes to Try in Doha: Guide',
      date: 'May 14, 2025',
      isoDate: '2025-05-14',
      metaDescription: 'Must-try Qatari dishes in Doha: Machboos, Harees, Luqaimat, and Karak tea. Best traditional restaurants in Souq Waqif and Katara.',
      excerpt: 'Discover the best Qatari dishes — from Machboos and Harees to Luqaimat desserts. Where to eat authentic traditional food in Doha\'s top restaurants.',
      author: 'Experience Doha Team',
      readTime: '14 min read',
      category: 'Food',
      imageUrl: qatariDishesImage,
    },

    'women-driving-qatar-guide': {
      id: '34',
      title: 'Can Women Drive in Qatar? 2026 Guide',
      date: 'May 13, 2025',
      isoDate: '2025-05-13',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Can women drive in Qatar? Yes — complete 2026 guide for tourists and expats. License rules, rental cars, safety tips, and driving rights for women.',
      excerpt: 'Women can legally drive in Qatar with no restrictions. Learn about license requirements, car rental rules, safety, and practical driving tips for female expats.',
      author: 'Experience Doha Team',
      readTime: '12 min read',
      category: 'Expat-Tips',
      imageUrl: womenDrivingImage,
    },

    'doha-safety-guide-tourists-expats': {
      id: '33',
      title: 'Is Doha Safe? Safety Guide for Tourists',
      date: 'May 12, 2025',
      isoDate: '2025-05-12',
      metaDescription: 'Is Doha safe? 2025 safety guide: crime rates, night safety, transport, scams, and tips for solo female travelers, families, and tourists in Qatar.',
      excerpt: 'Doha ranks among the world\'s safest cities. Learn about crime rates, safety for women and families, nightlife security, and essential precautions for visitors.',
      author: 'Experience Doha Team',
      readTime: '13 min read',
      category: 'Expat-Tips',
      imageUrl: dohaSafetyImage,
    },

    'prostitution-laws-doha-qatar-guide': {
      id: '32',
      title: 'Is Prostitution Legal in Qatar? 2026',
      date: 'May 11, 2025',
      isoDate: '2025-05-11',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Is prostitution legal in Qatar? No — complete 2026 guide to laws, penalties, escort scams, and safety tips for tourists visiting Doha.',
      excerpt: 'Prostitution is strictly illegal in Qatar. Understand the laws, severe penalties, common online scams, and how to stay safe as a tourist in Doha.',
      author: 'Experience Doha Team',
      readTime: '11 min read',
      category: 'Expat-Tips',
      imageUrl: prostitutionLawsImage,
    },

    'alcohol-allowed-doha-qatar-guide': {
      id: '31',
      title: 'Alcohol in Doha Qatar: Is It Allowed?',
      date: 'May 10, 2025',
      isoDate: '2025-05-10',
      metaDescription: 'Is alcohol allowed in Doha? Yes, at licensed hotels. Complete 2026 guide to drinking laws, bar prices, nightlife, and penalties in Qatar.',
      excerpt: 'Alcohol is legal at licensed venues in Qatar. Learn where to drink, hotel bar prices, QDC permits, Ramadan rules, and penalties for public intoxication.',
      author: 'Experience Doha Team',
      readTime: '12 min read',
      category: 'Expat-Tips',
      imageUrl: alcoholGuideImage,
    },

    'desert-safari-inland-sea-khor-al-adaid': {
      id: '30',
      title: 'Desert Safari & Inland Sea Qatar Guide',
      date: 'May 9, 2025',
      isoDate: '2025-05-09',
      metaDescription: 'Qatar desert safari guide: dune bashing, camel rides, sandboarding, and Inland Sea (Khor Al Adaid). Book half-day, full-day, or overnight trips.',
      excerpt: 'Experience the ultimate Arabian desert adventure — dune bashing, camel riding, sandboarding, and the stunning UNESCO-recognized Inland Sea near Doha.',
      author: 'Experience Doha Team',
      readTime: '10 min read',
      category: 'Attractions',
      imageUrl: desertSafariImage,
    },

    'mia-nmoq-museum-combo-guide': {
      id: '29',
      title: 'MIA & NMoQ Museum Combo Guide Doha',
      date: 'May 11, 2025',
      isoDate: '2025-05-11',
      metaDescription: 'MIA and NMoQ museum combo guide: tickets, Discover One Pass, highlights, and how to visit both Doha museums in one cultural day trip.',
      excerpt: 'Visit Doha\'s two must-see museums in one day — the Museum of Islamic Art and National Museum of Qatar. Combo tickets, highlights, and planning tips.',
      author: 'Experience Doha Team',
      readTime: '12 min read',
      category: 'Culture',
      imageUrl: miaNmoqImage,
    },

    'souq-waqif-night-experiences-haggling': {
      id: '28',
      title: 'Souq Waqif at Night: Shopping & Haggling',
      date: 'May 13, 2025',
      isoDate: '2025-05-13',
      metaDescription: 'Souq Waqif at night: haggling tips, best restaurants, spice shopping, falcon souq, and cultural experiences in Doha\'s historic market after dark.',
      excerpt: 'Experience Souq Waqif after dark — master the art of haggling, explore spice alleys, dine at traditional restaurants, and soak in Doha\'s cultural heart.',
      author: 'Experience Doha Team',
      readTime: '9 min read',
      category: 'Culture',
      imageUrl: souqWaqifNightImage,
    },

    'ultimate-doha-layover-24-48-hours': {
      id: '27',
      title: 'Doha Layover Guide: 24 & 48 Hour Plans',
      date: 'May 6, 2025',
      isoDate: '2025-05-06',
      metaDescription: '24-48 hour Doha layover itinerary: MIA, Souq Waqif, The Pearl, desert safari, and Qatar Airways stopover program. Maximize your stopover.',
      excerpt: 'Plan the ultimate 24-48 hour Doha layover — hour-by-hour itineraries covering museums, markets, desert adventures, and the Qatar Airways stopover program.',
      author: 'Experience Doha Team',
      readTime: '12 min read',
      category: 'Expat-Tips',
      imageUrl: dohaLayoverImage,
    },

    'qatar-airways-stopover-packages-lounge': {
      id: '26',
      title: 'Qatar Airways Stopover & Lounge Guide',
      date: 'May 5, 2025',
      isoDate: '2025-05-05',
      metaDescription: 'Qatar Airways stopover packages from $14/night: hotel tiers, lounge access guide, Al Mourjan and Al Safwa reviews. Book your Doha mini-vacation.',
      excerpt: 'Turn your layover into a luxury mini-vacation — Qatar Airways stopover packages from $14/night, plus a guide to HIA\'s world-class Al Mourjan and Al Safwa lounges.',
      author: 'Experience Doha Team',
      readTime: '10 min read',
      category: 'Expat-Tips',
      imageUrl: qatarAirwaysStopoverImage,
    },

    'doha-global-mediation-hub-congo-peace': {
      id: '25',
      title: 'Doha as a Global Mediation Hub',
      date: 'May 4, 2025',
      isoDate: '2025-05-04',
      metaDescription: 'Doha as a global peace hub: Qatar\'s mediation strategy, Congo peace talks, Darfur agreement, and US-Taliban negotiations. How diplomacy shapes Qatar.',
      excerpt: 'How Doha became a global mediation hub — from the Congo peace framework to US-Taliban talks. Explore Qatar\'s diplomatic strategy and neutrality.',
      author: 'Experience Doha Team',
      readTime: '9 min read',
      category: 'Culture',
      imageUrl: dohaMediationImage,
    },

    'fifa-u17-world-cup-qatar-2025': {
      id: '24',
      title: 'FIFA U-17 World Cup Qatar 2026 Guide',
      date: 'May 3, 2025',
      isoDate: '2025-05-03',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'FIFA U-17 World Cup Qatar 2026: 48 teams, 104 matches, ticket prices, stadiums, and fan guide. How to attend youth football\'s biggest event.',
      excerpt: 'Everything about the FIFA U-17 World Cup Qatar 2025 — expanded 48-team format, ticket purchasing, stadium access, and fan experience in Doha.',
      author: 'Experience Doha Team',
      readTime: '8 min read',
      category: 'Events',
      imageUrl: fifaU17Image,
    },

    'corniche-sunset-dhow-cruise-guide': {
      id: '23',
      title: 'Doha Corniche Sunset & Dhow Cruise',
      date: 'May 2, 2025',
      isoDate: '2025-05-02',
      metaDescription: 'Doha Corniche sunset walk and dhow cruise guide: best routes, photography tips, dinner cruises, and booking options for an unforgettable evening.',
      excerpt: 'Experience Doha\'s golden hour — walk the iconic Corniche at sunset, then sail on a traditional dhow cruise with stunning skyline views and optional dinner.',
      author: 'Experience Doha Team',
      readTime: '8 min read',
      category: 'Attractions',
      imageUrl: cornicheSunsetImage,
    },

    'pearl-qatar-luxury-shopping-dining': {
      id: '22',
      title: 'Pearl Qatar: Shopping & Dining Guide',
      date: 'May 1, 2025',
      isoDate: '2025-05-01',
      metaDescription: 'The Pearl-Qatar guide: luxury shopping, fine dining, Porto Arabia, Qanat Quartier. Best restaurants, boutiques, and tips for visiting Doha\'s island.',
      excerpt: 'Explore The Pearl-Qatar — luxury shopping at Porto Arabia, canal-side dining in Qanat Quartier, and practical tips for visiting Doha\'s Arabian Riviera.',
      author: 'Experience Doha Team',
      readTime: '9 min read',
      category: 'Lifestyle',
      imageUrl: pearlQatarImage,
    },

    'katara-cultural-village-events-2025': {
      id: '21',
      title: 'Katara Cultural Village Events 2026',
      date: 'April 30, 2025',
      isoDate: '2025-04-30',
      modifiedDate: 'March 2, 2026',
      isoModifiedDate: '2026-03-02',
      metaDescription: 'Katara Cultural Village events 2026: Dhow Festival, Jazz Festival, art exhibitions, and year-round activities. Plan your cultural visit to Doha.',
      excerpt: 'Discover Katara Cultural Village\'s 2025 events calendar — from the Dhow Festival and Jazz Festival to year-round art exhibitions and performances in Doha.',
      author: 'Experience Doha Team',
      readTime: '10 min read',
      category: 'Events',
      imageUrl: kataraImage,
    },

    'doha-airport-layover-activities': {
      id: '20',
      title: 'Ten Ways to Enjoy a Layover at Doha Airport',
      date: 'Jan 15, 2025',
      isoDate: '2025-01-15',
      metaDescription: '10 things to do during a Doha airport layover: spa, shopping, art, dining, sleep pods, and the indoor tropical garden at Hamad International.',
      excerpt: 'Make the most of your Doha airport layover — top 10 activities inside Hamad International Airport including spa, shopping, art installations, and dining.',
      author: 'Experience Doha Team',
      readTime: '8 min read',
      category: 'Expat-Tips',
      imageUrl: hamadAirportInteriorImage,
    },

    'five-best-things-doha-layover': {
      id: '19',
      title: 'The Five Best Things to Do on a Layover in Doha',
      date: 'Jan 18, 2025',
      isoDate: '2025-01-18',
      metaDescription: 'Top 5 Doha layover activities: Museum of Islamic Art, Souq Waqif, Corniche walk, desert safari, and Katara Cultural Village. Quick guide.',
      excerpt: 'Five essential Doha layover experiences — from the Museum of Islamic Art and Souq Waqif to the Corniche, desert excursions, and Katara Cultural Village.',
      author: 'Experience Doha Team',
      readTime: '7 min read',
      category: 'Attractions',
      imageUrl: fiveBestLayoverImage,
    },

    '9-hour-stopover-qatar-worth-it': {
      id: '18',
      title: '9-Hour Stopover in Qatar: Is It Worth Exploring?',
      date: 'April 27, 2025',
      isoDate: '2025-04-27',
      metaDescription: '9-hour Qatar stopover: is it worth exploring Doha? Honest time breakdown, risk assessment, and best activities for short layovers.',
      excerpt: 'Should you leave the airport during a 9-hour Qatar stopover? An honest breakdown of time, logistics, risks, and the best activities for short layovers.',
      author: 'Experience Doha Team',
      readTime: '10 min read',
      category: 'Expat-Tips',
      imageUrl: nineHourStopoverImage,
    },

    'discover-qatar-stopover-guide': {
      id: '17',
      title: 'Stopover in Qatar: Discover Qatar - Why Visit',
      date: 'April 26, 2025',
      isoDate: '2025-04-26',
      metaDescription: 'Discover Qatar stopover guide: visa-free entry, cultural attractions, museums, desert safari, dining, and family-friendly experiences. Why visit Qatar.',
      excerpt: 'Discover why Qatar is worth more than a transit stop — visa-free entry, world-class museums, desert adventures, diverse dining, and unmatched safety.',
      author: 'Experience Doha Team',
      readTime: '11 min read',
      category: 'Culture',
      imageUrl: discoverQatarImage,
    },

    '24-hours-doha-qatar-airways': {
      id: '16',
      title: '24 Hours in Doha: Complete Qatar Airways Itinerary',
      date: 'April 25, 2025',
      isoDate: '2025-04-25',
      metaDescription: '24 hours in Doha itinerary: Corniche sunrise, MIA, Souq Waqif, desert safari, dhow cruise. Complete Qatar Airways-inspired day plan.',
      excerpt: 'Spend 24 hours in Doha like a pro — sunrise at the Corniche, museums, Souq Waqif, optional desert safari, and a magical dhow cruise at night.',
      author: 'Experience Doha Team',
      readTime: '12 min read',
      category: 'Attractions',
      imageUrl: twentyFourHoursImage,
    },

    'doha-layover-time-guide': {
      id: '15',
      title: 'Layover in Doha Guide: What to Do in 2–12 Hours',
      date: 'Feb 1, 2025',
      isoDate: '2025-02-01',
      metaDescription: 'Doha layover guide by duration: what to do in 2, 4, 6, 8, 10, or 12 hours. Best activities for every timeframe at Hamad Airport and in the city.',
      excerpt: 'Plan your Doha layover by available time — from 2-hour airport-only stops to 12-hour full-day explorations. The best activities for every timeframe.',
      author: 'Experience Doha Team',
      readTime: '9 min read',
      category: 'Expat-Tips',
      imageUrl: layoverTimeGuideImage,
    },

    'perfect-layover-doha-guide': {
      id: '14',
      title: 'How to Spend the Perfect Layover in Doha, Qatar',
      date: 'Feb 3, 2025',
      isoDate: '2025-02-03',
      metaDescription: 'Perfect Doha layover guide: preparation tips, timing your airport exit, must-see attractions, and how to pace your stopover for maximum enjoyment.',
      excerpt: 'Craft the perfect Doha layover — pre-arrival prep, optimal timing, the best attractions to prioritize, and pacing tips so you arrive refreshed.',
      author: 'Experience Doha Team',
      readTime: '8 min read',
      category: 'Expat-Tips',
      imageUrl: perfectLayoverImage,
    },

    'things-to-do-doha-layover': {
      id: '13',
      title: '10 Things To Do in Doha on a Layover',
      date: 'Feb 5, 2025',
      isoDate: '2025-02-05',
      metaDescription: '10 unmissable Doha layover activities 2026: Souq Waqif, MIA, desert safari, dhow cruise, The Pearl, and more. Make every hour count.',
      excerpt: 'Don\'t waste your Doha layover — 10 must-do activities from Souq Waqif and the Museum of Islamic Art to desert safaris and dhow cruises.',
      author: 'Experience Doha Team',
      readTime: '10 min read',
      category: 'Attractions',
      imageUrl: unmissableThingsImage,
    },

    'hamad-airport-transfers-guide': {
      id: '12',
      title: 'Hamad Airport Transfers: Complete Guide',
      date: 'Feb 8, 2025',
      isoDate: '2025-02-08',
      metaDescription: 'Hamad Airport transfer guide: taxi, Uber, metro, hotel shuttles, and car rental. How to get from HIA to Doha hotels quickly and affordably.',
      excerpt: 'All transfer options from Hamad International Airport — taxis, Uber, metro Red Line, hotel shuttles, and car rental. Prices and tips for every budget.',
      author: 'Experience Doha Team',
      readTime: '7 min read',
      category: 'Expat-Tips',
      imageUrl: hamadAirportTransfersImage,
    },

    'qatar-stopover-program-guide': {
      id: '11',
      title: 'Complete Doha Layover Guide: Qatar Stopover Program Explained',
      date: 'Feb 10, 2025',
      isoDate: '2025-02-10',
      metaDescription: 'Qatar stopover program explained: hotel packages from $14/night, eligibility, booking steps, and tips for maximizing your Doha layover.',
      excerpt: 'Everything about Qatar\'s stopover program — hotel packages from $14/night, eligibility criteria, booking process, and how to plan your perfect Doha layover.',
      author: 'Experience Doha Team',
      readTime: '9 min read',
      category: 'Expat-Tips',
      imageUrl: stopoverProgramImage,
    },

    'default': {
      id: '1',
      title: 'Top 10 Must-Visit Attractions in Doha',
      date: 'March 1, 2025',
      author: 'Experience Doha Team',
      readTime: '10 min read',
      category: 'Attractions',
      imageUrl: top10AttractionsImage,
    },
};

