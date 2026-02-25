

# Keyword Research & Optimization for All Blog Articles

## Current State

Each article in `blog-data.ts` has a `tags` array (typically 5 items) that renders as visual badges at the bottom of articles. However, these tags are **not** output as `<meta name="keywords">` in the HTML head, meaning they serve only as UI labels, not SEO signals.

The existing tags are often branded or generic (e.g., "Expat-Tips", "Doha", "Travel Tips") rather than targeting specific search queries people actually type into Google. This is a missed opportunity for both on-page SEO and content discoverability.

## Plan

### Step 1: Add `<meta name="keywords">` to SEOHead

**File: `src/components/SEOHead.tsx`**

Add an optional `keywords` prop and render `<meta name="keywords" content={keywords} />` in the Helmet output. While Google deprioritizes the keywords meta tag, Bing, Yandex, and other crawlers still use it. More importantly, having keyword-rich tags improves internal categorization.

### Step 2: Pass tags as keywords from BlogPost.tsx

**File: `src/pages/BlogPost.tsx`**

Pass `post.tags.join(', ')` as the `keywords` prop to `SEOHead`.

### Step 3: Replace all article tags with researched, high-intent keywords

**File: `src/data/articles/blog-data.ts`**

Replace each article's `tags` array with 6-8 keyword phrases targeting high-volume, low-competition long-tail search terms relevant to each article's topic. The keywords are selected based on:

- **Search intent alignment** (what users actually search for)
- **Long-tail specificity** (e.g., "cost of living Doha 2025" instead of just "Doha")
- **Question-based queries** (e.g., "can women drive in Qatar")
- **Comparison queries** (e.g., "Ooredoo vs Vodafone Qatar")
- **Location + topic combinations** (e.g., "best gyms in Doha")

Here are the optimized tags for each article:

| Slug | Current Tags | New SEO-Optimized Tags |
|------|-------------|----------------------|
| `end-of-service-gratuity-qatar-2025` | EOSG Qatar, gratuity calculation, end of service, labor benefits, expat compensation | end of service gratuity Qatar, EOSG calculation formula, Qatar severance pay, gratuity resignation vs termination, Qatar labor law benefits 2025, how to calculate EOSG Qatar |
| `qatar-labor-law-reforms-2025` | Qatar labor law, Kafala reform, NOC abolished, worker rights, job mobility Qatar | Qatar Kafala system abolished, NOC removal Qatar 2025, Qatar minimum wage, worker rights Qatar, job change without NOC Qatar, Qatar labor reform update |
| `qatar-work-visa-guide-2025` | Qatar visa, work permit, residence permit, QID card, visa requirements | Qatar work visa application, residence permit Qatar process, QID card requirements, how to get work visa Qatar, employer sponsorship Qatar, Qatar RP renewal |
| `qatar-tax-guide-2025` | Qatar tax, tax-free income, VAT Qatar, property tax, income tax Qatar | is Qatar tax free, Qatar income tax expats, VAT in Qatar 2025, property tax Doha, Qatar corporate tax rate, tax free salary Qatar |
| `expat-salaries-doha-2025` | Qatar salaries, expat compensation, salary negotiation, tax-free income, housing allowance | average salary Doha expats, Qatar salary guide 2025, expat pay package Qatar, salary negotiation tips Qatar, housing allowance Doha, engineer salary Qatar |
| `job-market-qatar-2025` | Qatar jobs, expat employment, work visa Qatar, Qatar job market, career opportunities | jobs in Qatar for foreigners, Qatar hiring 2025, best sectors to work Qatar, how to find job Doha, Qatar Vision 2030 jobs, LinkedIn Qatar job search |
| `housing-rent-doha-2025` | housing Doha, rent prices Qatar, The Pearl Qatar, Lusail City, expat housing | rent prices Doha 2025, cheapest areas to rent Doha, Pearl Qatar rent, Lusail apartment prices, furnished vs unfurnished Qatar, expat housing Doha guide |
| `cost-of-living-doha-dubai-riyadh` | cost of living, Doha vs Dubai, Middle East comparison, expat budget, Gulf cities | cost of living Doha vs Dubai, Doha vs Riyadh expenses, cheapest Gulf city for expats, monthly expenses Doha 2025, grocery prices Qatar vs UAE, rent comparison Gulf cities |
| `alcohol-guide-doha` | Alcohol Laws, Nightlife, Legal Guide, Hotel Bars, Doha | can you drink alcohol in Qatar, QDC permit Doha, alcohol prices Qatar, hotel bars Doha, nightlife Doha 2025, drinking laws Qatar tourists, best bars Doha |
| `remote-work-cafes-doha-guide` | Remote Work, Cafes Doha, Digital Nomad, Coworking, Freelancing | best cafes for working Doha, coworking spaces Qatar, digital nomad Doha, wifi cafes Doha, remote work Qatar, freelancer cafes Doha 2025 |
| `gyms-fitness-doha-guide` | Gyms Doha, Fitness, CrossFit Qatar, Ladies Gym, Wellness | best gyms in Doha, gym membership prices Qatar, ladies only gym Doha, CrossFit Doha, fitness centers Qatar 2025, personal trainer Doha cost |
| `hiring-maid-nanny-qatar-guide` | Domestic Workers, Hiring Maid Qatar, Nanny Doha, Legal Guide, Housekeeping | hiring maid Qatar legal process, nanny cost Doha, domestic worker visa Qatar, housemaid salary Qatar 2025, nanny agency Doha, maid sponsorship Qatar |
| `pet-import-qatar-guide` | Pet Import Qatar, Veterinary Care, Animal Welfare, Pet Relocation, Dog Owners | how to bring pets to Qatar, pet import rules Qatar, vet clinics Doha, pet quarantine Qatar, dog friendly places Doha, pet relocation Qatar cost |
| `doha-metro-2025-guide` | Metro Doha, Public Transport, Red Line, Gold Line, Green Line | Doha metro map 2025, metro ticket price Qatar, Doha metro stations, metro to airport Doha, public transport Qatar guide, metro card Doha |
| `grocery-shopping-doha-guide` | Grocery Shopping, Carrefour Qatar, Lulu Hypermarket, Online Delivery, Food Budget | Carrefour vs Lulu Doha, grocery prices Qatar, cheapest supermarket Doha, online grocery delivery Qatar, food budget Doha expat, where to buy groceries Doha |
| `mobile-plans-qatar-guide` | Mobile Plans, Ooredoo, Vodafone Qatar, SIM Card, Internet | Ooredoo vs Vodafone Qatar, best SIM card Qatar tourist, cheapest data plan Qatar, mobile internet Qatar, prepaid SIM Doha, 5G coverage Qatar |
| `bank-account-qatar-guide` | Banking Qatar, QNB, International Banks, Expat Banking, Financial Services | how to open bank account Qatar, best bank for expats Qatar, QNB vs HSBC Qatar, bank account requirements Qatar, online banking Doha, salary account Qatar |
| `lgbtq-experiences-qatar-2025` | LGBTQ Qatar, Safety Guide, Expat Life, Cultural Awareness, Mental Health | is Qatar safe for LGBTQ, LGBTQ laws Qatar, gay rights Qatar 2025, LGBTQ expat Qatar, mental health support Doha, Qatar LGBTQ travel advice |
| `driving-doha-2025-guide` | Driving Doha, Traffic, License, Road Rules, Parking | driving license Qatar process, traffic rules Qatar, driving test Doha, road fines Qatar, parking Doha tips, international driving permit Qatar |
| `renting-doha-west-bay-al-waab-2025` | Renting Doha, West Bay, Al Waab, Apartment Guide, Neighborhood Comparison | West Bay vs Al Waab Doha, best neighborhoods Doha rent, apartment prices West Bay, family areas Doha, where to live Doha expats |
| `qatar-visa-rules-expats-2025` | Visa Rules, Family Visa, Exit Permit, Immigration, Residency | Qatar visa rules 2025, family visa Qatar, dependent visa Qatar, exit permit abolished Qatar, Qatar immigration update, visa on arrival Qatar |
| `international-schools-qatar-2025` | International Schools, Education, School Fees, Curriculum, Enrollment | best international schools Qatar, school fees Doha 2025, British schools Qatar, IB schools Doha, school admission Qatar, education cost Qatar expats |
| `women-safety-dress-code-doha-qatar` | Women Safety, Dress Code, Cultural Tips, Female Travelers, Qatar | is Doha safe for women, dress code Qatar women, what to wear in Qatar, female travel Qatar tips, women rights Qatar, modest clothing Doha |
| `cost-of-living-doha-2025` | Cost of Living, Budget, Rent Prices, Expat Budget, Qatar Finance | cost of living Doha 2025, monthly budget Qatar, rent prices Doha, is Qatar expensive, expat budget Doha, utility bills Qatar |
| `doha-changing-middle-east` | Doha Development, Vision 2030, Middle East, Innovation, Smart City | Qatar Vision 2030, Doha smart city, Qatar economic diversification, Lusail development, mega projects Qatar, future of Doha |
| `hamad-international-airport-guide` | Hamad Airport, HIA, Airport Guide, Transit, Lounges | Hamad International Airport guide, HIA lounges, best airport in world, transit hotel Doha airport, duty free Doha airport, sleep pods HIA |
| `qatari-dishes-doha-culinary-guide` | Qatari Food, Traditional Cuisine, Restaurants, Machboos, Doha Dining | traditional Qatari food, Machboos recipe, best Qatari restaurants Doha, Souq Waqif food, Luqaimat dessert, Karak tea Doha, what to eat in Qatar |
| `women-driving-qatar-guide` | Women Driving, Qatar Laws, Female Expats, Road Safety, Equality | can women drive in Qatar, women driving laws Qatar, female driving Qatar, car rental women Qatar, driving license women Doha |
| `doha-safety-guide` | Safety Guide, Crime Rates, Travel Tips, Tourist Safety, Doha | is Doha safe for tourists, Qatar crime rate, safety tips Qatar, solo travel Doha, safest cities Middle East, emergency numbers Qatar |
| `prostitution-laws-doha-qatar-guide` | Legal Guide, Safety, Laws, Tourist Advice, Qatar | is prostitution legal Qatar, escort laws Doha, Qatar criminal law, tourist safety Qatar legal, online scams Qatar |
| `desert-safari-inland-sea-khor-al-adaid` | Desert Safari, Dune Bashing, Inland Sea, Adventure, Camel Ride | desert safari Qatar price, Khor Al Adaid tour, dune bashing Doha, overnight desert camp Qatar, camel ride Qatar, sandboarding Doha, inland sea Qatar |
| `souq-waqif-night-shopping-guide` | Culture, Shopping, Food, Souq Waqif, Nightlife | Souq Waqif Doha guide, shopping Souq Waqif, haggling tips Qatar, Souq Waqif at night, spice market Doha, falcon souq Qatar |
| `ultimate-doha-layover-24-48-hours` | Expat-Tips, Layover, Itinerary, Travel, Attractions | Doha layover itinerary, 24 hours in Doha, 48 hour stopover Qatar, what to do Doha transit, Qatar Airways stopover, layover guide Doha |
| `qatar-airways-stopover-packages-lounge` | Stopover Program, Qatar Airways, Lounge Access, Hotel Deals, Value Travel | Qatar Airways stopover package, Discover Qatar hotel deal, Al Mourjan lounge review, stopover Doha $14, HIA lounge access, Qatar Airways transit hotel |
| `corniche-sunset-dhow-cruise` | Corniche, Sunset, Dhow Cruise, Photography, Romantic Activities | Doha Corniche walk, dhow cruise Doha, sunset Doha, best photo spots Doha, romantic things to do Doha, boat tour Qatar |
| `pearl-qatar-luxury-shopping-dining` | The Pearl, Luxury Shopping, Fine Dining, Porto Arabia, Lifestyle | Pearl Qatar restaurants, Porto Arabia shopping, Qanat Quartier Doha, luxury dining Doha, Pearl Island Qatar, things to do Pearl Qatar |
| `katara-cultural-village-events-2025` | Cultural Events, Katara, Art, Festival, Heritage | Katara Cultural Village events, Doha festivals 2025, Katara beach, art exhibitions Doha, Dhow Festival Qatar, cultural events Qatar |
| `mia-nmoq-museums-guide` | Museums, MIA, NMoQ, Art, Architecture | Museum of Islamic Art Doha, National Museum Qatar, MIA tickets, NMoQ opening hours, best museums Doha, Qatar museums guide |
| `five-best-doha-layover-activities` | Layover Activities, Top 5, Doha Highlights, Quick Visits, Airport | best things to do Doha layover, top Doha attractions, quick Doha visit, layover activities Hamad Airport, must see Doha |
| `9-hour-stopover-doha` | 9 Hours, Stopover, Time Management, Layover Planning, Risk Assessment | 9 hour layover Doha, should I leave airport Doha, short stopover Qatar, Doha transit tips, airport to city Doha time |
| `discover-qatar-stopover-guide` | Discover Qatar, Tourism, Cultural Attractions, Safety, Family Travel | Discover Qatar program, why visit Qatar, Qatar tourist visa, Qatar family holiday, is Qatar worth visiting, Qatar tourism guide |
| `24-hours-doha-qatar-airways` | 24 Hours, Full Day Itinerary, Qatar Airways, Complete Guide, Doha | one day in Doha itinerary, 24 hours Doha guide, Qatar Airways city tour, best day trip Doha, Doha in a day |
| `doha-layover-time-guide` | Layover, Time Guide, Airport, Transit, Planning | Doha layover what to do, how long layover Doha, 4 hour layover Doha, 6 hour layover Qatar, transit time Hamad Airport |
| `healthcare-insurance-qatar-guide` | *(need to check)* | health insurance Qatar expats, best hospitals Doha, Qatar healthcare system, medical insurance Qatar cost, Hamad Medical Corporation, private clinics Doha |
| `10-unmissable-things-doha` | *(need to check)* | top 10 things to do Doha, must see Doha attractions, bucket list Qatar, best experiences Doha, Doha tourist guide 2025 |
| `hamad-airport-transfers-guide` | *(need to check)* | Hamad Airport to city transfer, taxi Doha airport, metro from airport Doha, Uber Doha airport, airport transfer Qatar cost |
| `qatar-stopover-program` | *(need to check)* | Qatar stopover package, free hotel Qatar transit, Discover Qatar stopover, Qatar Airways layover deal |
| `perfect-doha-layover` | *(need to check)* | perfect Doha layover plan, best layover itinerary Doha, what to do during layover Qatar |
| `default` | *(need to check)* | things to do in Doha, top attractions Qatar, Doha travel guide, best places to visit Doha |

### Files to Edit

1. **`src/components/SEOHead.tsx`** -- Add `keywords` prop and `<meta name="keywords">` tag
2. **`src/pages/BlogPost.tsx`** -- Pass `post.tags.join(', ')` as `keywords` to SEOHead
3. **`src/data/articles/blog-data.ts`** -- Update all ~42 article `tags` arrays with SEO-optimized keywords

### Technical Notes

- Tags serve dual purpose: visual UI badges on article pages AND meta keywords in HTML head
- Long-tail keywords target "low competition" by combining location + topic + year (e.g., "gym membership prices Qatar 2025")
- Question-based keywords (e.g., "can women drive in Qatar", "is Qatar tax free") target featured snippet opportunities
- Comparison keywords (e.g., "Ooredoo vs Vodafone", "Carrefour vs Lulu") target high-intent commercial queries

