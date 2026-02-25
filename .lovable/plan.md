

# Optimize Title Tags: Under 60 Characters with Primary Keyword

## Problem

Many article titles and page titles exceed 60 characters, causing Google to truncate them in search results. Truncated titles lose click-through appeal and dilute keyword impact. Additionally, some titles use creative/editorial phrasing (e.g., "The Final Payout:", "The Golden Ticket:") that buries the primary keyword deep into the title.

The `BlogPost.tsx` template appends ` - Experience Doha` (18 characters) to every article title, further pushing many titles well beyond 60 characters.

## Scope

### 1. Shorten the BlogPost suffix

**File: `src/pages/BlogPost.tsx`**

Change the title template from `${post.title} - Experience Doha` to `${post.title} | ExperienceDoha` (saves 3 chars) or remove the suffix entirely for articles that already approach 60 characters. The simplest universal fix: shorten to `${post.title} | Doha Guide`.

### 2. Optimize static page titles

**File: various page files**

| Page | Current Title (chars) | Optimized Title |
|------|-----------------------|-----------------|
| Index.tsx | `Experience Doha - Ultimate Guide to Qatar Travel & Living` (59) | OK - keep as is |
| Blog.tsx | `Experience Doha Blog - Qatar Travel Guide & Expat Tips` (56) | OK - keep as is |
| About.tsx | `About Experience Doha - Your Qatar Travel Guide` (49) | OK - keep as is |
| Videos.tsx | `Doha Travel Videos - Experience Doha` (38) | OK - keep as is |
| Gallery.tsx | `Doha Photo Gallery - Experience Doha` (38) | OK - keep as is |
| Contact.tsx | `Contact Us - Experience Doha` (29) | OK - keep as is |
| BudgetPlanner.tsx | Need to check | Check and optimize if needed |
| SEOHead default | `Experience Doha - Ultimate Guide to Qatar Travel & Attractions 2026` (68) | `Experience Doha - Qatar Travel & Attractions Guide 2026` (56) |

### 3. Optimize all blog article titles in `blog-data.ts`

Each title must work within the formula: `[title] | Doha Guide` where `| Doha Guide` = 13 characters, leaving ~47 characters for the article title. Below are all titles that exceed the limit with their replacements:

| Slug | Current Title (chars) | New Title (under ~47 chars) |
|------|-----------------------|---------------------------|
| `end-of-service-gratuity-qatar-2025` | "The Final Payout: End-of-Service Benefits and Gratuity Calculations in Qatar" (77) | "End-of-Service Gratuity in Qatar 2025" (38) |
| `qatar-labor-law-reforms-2025` | "A New Era of Mobility: Labor Laws and the Sponsorship (Kafala) System Reforms in Qatar" (87) | "Qatar Kafala & Labor Law Reforms 2025" (38) |
| `qatar-work-visa-guide-2025` | "The Golden Ticket: Work Visa and Residence Permit (RP) Application Process in Qatar" (84) | "Qatar Work Visa & RP Guide 2025" (32) |
| `qatar-tax-guide-2025` | "The Tax-Free Promise: Taxation in Qatar – Income Tax, Property Tax, and the VAT Outlook" (89) | "Qatar Tax Guide 2025: Is It Tax-Free?" (38) |
| `expat-salaries-doha-2025` | "The Compensation Landscape: Average and Typical Salaries for Various Expat Roles in Doha" (90) | "Expat Salaries in Doha 2025: By Role" (37) |
| `job-market-qatar-2025` | "The Gateway to Opportunity: Job Market and Employment for Foreigners in Qatar" (78) | "Qatar Job Market for Foreigners 2025" (37) |
| `housing-rent-doha-2025` | "The Real Estate Landscape: Housing and Rent Prices in Doha's Current Market" (76) | "Housing & Rent Prices in Doha 2025" (35) |
| `cost-of-living-doha-dubai-riyadh` | "The Price of Paradise: Cost of Living in Doha and a Comparison to Dubai and Riyadh" (84) | "Cost of Living: Doha vs Dubai vs Riyadh" (40) |
| `alcohol-guide-doha` | "Alcohol Rules in Qatar 2026: QDC, Licenses, and Complete Legal Guide" (69) | "Alcohol Rules in Qatar 2026: Full Guide" (40) |
| `remote-work-cafes-doha-guide` | "Best Cafes for Remote Work in Doha Qatar 2025: Digital Nomad Guide" (67) | "Best Remote Work Cafes in Doha 2025" (36) |
| `gyms-fitness-doha-guide` | "Gyms and Fitness Trends in Doha Qatar 2025: Complete Guide" (59) | "Gyms & Fitness in Doha 2025: Full Guide" (40) |
| `hiring-maid-nanny-qatar-guide` | "Hiring Maids and Nannies in Doha Qatar 2026: Complete Legal Guide" (65) | "Hiring a Maid or Nanny in Qatar 2026" (37) |
| `pet-import-qatar-guide` | "Pet Import Rules and Veterinary Care in Qatar 2025: Complete Guide" (66) | "Pet Import Rules in Qatar 2025: Guide" (38) |
| `doha-metro-2025-guide` | "Doha Metro 2025: New Lines, Expansions, and Complete Network Guide" (67) | "Doha Metro Guide 2025: Map & Fares" (35) |
| `grocery-shopping-doha-guide` | "Grocery Shopping Hacks in Doha 2026: Carrefour vs Lulu Complete Guide" (70) | "Grocery Shopping Doha: Carrefour vs Lulu" (41) |
| `mobile-plans-qatar-guide` | "Best Mobile and Data Plans in Qatar 2025: Ooredoo vs Vodafone Complete Guide" (77) | "Ooredoo vs Vodafone Qatar 2025: Plans" (38) |
| `bank-account-qatar-guide` | "Opening a Bank Account in Qatar: QNB vs International Banks Guide" (66) | "Open a Bank Account in Qatar: Guide" (36) |
| `lgbtq-experiences-qatar-2025` | "LGBTQ+ Experiences in Qatar: What Expats Need to Know 2026" (59) | "LGBTQ+ in Qatar: What Expats Must Know" (39) |
| `driving-doha-2025-guide` | "Driving in Doha 2025: Traffic Updates, Rules, and Survival Guide" (65) | "Driving in Doha 2025: Rules & Tips" (35) |
| `renting-doha-west-bay-al-waab-2025` | "Renting in Doha: West Bay vs Al Waab Comparison Guide 2025" (59) | "West Bay vs Al Waab: Renting in Doha" (37) |
| `qatar-visa-rules-expats-2025` | "New Qatar Visa Rules for Expats 2026: Complete Immigration Guide" (64) | "Qatar Visa Rules for Expats 2026" (33) |
| `international-schools-qatar-2025` | "International Schools in Qatar 2026: Waitlists, Fees, and Application Guide" (76) | "International Schools Qatar 2026: Fees" (39) |
| `women-safety-dress-code-doha-qatar` | Title needs checking | "Women's Safety & Dress Code in Doha" (36) |
| `cost-of-living-doha-2025` | Title needs checking | "Cost of Living in Doha 2025: Budget" (36) |
| `doha-changing-middle-east` | "Doha: The City That's Changing the Middle East" (47) | OK - keep as is |
| `hamad-international-airport-guide` | "Hamad International Airport: The Ultimate Guide to Qatar's Award-Winning Aviation Hub" (86) | "Hamad Airport Guide: Lounges & Tips" (36) |
| `qatari-dishes-doha-culinary-guide` | "Qatari Dishes You Must Try in Doha: A Complete Culinary Guide" (62) | "Qatari Dishes to Try in Doha: Guide" (36) |
| `women-driving-qatar-guide` | "Can Women Drive in Qatar? (2025 Guide for Tourists, Expats & Families)" (71) | "Can Women Drive in Qatar? 2025 Guide" (37) |
| `doha-safety-guide` | Title needs checking | "Is Doha Safe? Safety Guide for Tourists" (40) |
| `prostitution-laws-doha-qatar-guide` | "Prostitution in Doha, Qatar: Is It Legal? (2026 Complete Guide)" (63) | "Is Prostitution Legal in Qatar? 2026" (37) |
| `alcohol-allowed-doha-qatar-guide` | "Is Drinking Alcohol Allowed in Doha, Qatar? (2026 Full Guide)" (62) | "Alcohol in Doha Qatar: Is It Allowed?" (37) |
| `desert-safari-inland-sea-khor-al-adaid` | "The Ultimate Arabian Adventure: Desert Safari and the Majestic Inland Sea (Khor Al Adaid)" (91) | "Desert Safari & Inland Sea Qatar Guide" (39) |
| `mia-nmoq-museum-combo-guide` | "A Tale of Two Museums: Unlocking Qatar's Past and Present with the MIA + NMoQ Combo" (85) | "MIA & NMoQ Museum Combo Guide Doha" (35) |
| `souq-waqif-night-experiences-haggling` | "The Heart of Doha After Dark: Souq Waqif Night Experiences and the Art of Haggling" (83) | "Souq Waqif at Night: Shopping & Haggling" (41) |
| `ultimate-doha-layover-24-48-hours` | Title needs checking | "Doha Layover Guide: 24 & 48 Hour Plans" (39) |
| `qatar-airways-stopover-packages-lounge` | Title needs checking | "Qatar Airways Stopover & Lounge Guide" (38) |
| `corniche-sunset-dhow-cruise` | Title needs checking | "Doha Corniche Sunset & Dhow Cruise" (35) |
| `pearl-qatar-luxury-shopping-dining` | "The Jewel of Doha: A Guide to Luxury Shopping and Fine Dining at The Pearl-Qatar" (81) | "Pearl Qatar: Shopping & Dining Guide" (37) |
| `katara-cultural-village-events-2025` | "A Year of Culture: Katara Cultural Village Events Calendar 2025" (64) | "Katara Cultural Village Events 2025" (36) |
| `doha-global-mediation-hub-congo-peace` | "Beyond the Horizon: Doha as a Global Mediation Hub and the Significance of the Congo Peace Talks" (97) | "Doha as a Global Mediation Hub" (31) |
| `fifa-u17-world-cup-qatar-2025` | "The Stars of Tomorrow: A Guide to the FIFA U-17 World Cup Qatar 2025™ Matches and Tickets" (91) | "FIFA U-17 World Cup Qatar 2025 Guide" (37) |
| `five-best-things-doha-layover` | "The Five Best Things to Do on a Layover in Doha" (49) | OK - keep as is |
| `9-hour-stopover-qatar-worth-it` | "9-Hour Stopover in Qatar: Is It Worth Exploring?" (50) | OK - keep as is |
| `discover-qatar-stopover-guide` | "Stopover in Qatar: Discover Qatar - Why Visit" (47) | OK - keep as is |
| `things-to-do-doha-layover` | "10 Unmissable Things To Do In Doha On A Layover (2026)" (55) | OK - keep (55+13=68, trim to) "10 Things To Do in Doha on a Layover" (37) |
| `hamad-airport-transfers-guide` | "Transfers at Hamad International Airport: Complete Guide" (57) | "Hamad Airport Transfers: Complete Guide" (40) |
| `perfect-doha-layover` | Title needs checking | Keep or trim if needed |
| `qatar-stopover-program` | Title needs checking | Keep or trim if needed |
| `healthcare-insurance-qatar-guide` | Title needs checking | Keep or trim if needed |

### 4. Files to edit

1. **`src/components/SEOHead.tsx`** -- Shorten default title to under 60 chars
2. **`src/pages/BlogPost.tsx`** -- Change suffix from ` - Experience Doha` to ` | Doha Guide`
3. **`src/data/articles/blog-data.ts`** -- Update ~35 article titles to be under 47 characters (so total with suffix stays under 60)

### Technical notes

- The `title` field in blog-data.ts is used both as the `<title>` tag (via SEOHead) and as the visible `<h1>` on the article page. Shorter titles work well for both contexts.
- Primary keywords are front-loaded in each title (e.g., "Doha Metro Guide" instead of "The Complete Network Guide to Doha Metro").
- Year qualifiers (2025/2026) are retained where relevant for freshness signals.
- Question-format titles (e.g., "Can Women Drive in Qatar?") are preserved as they target featured snippets.

