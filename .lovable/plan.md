

# Optimize Meta Descriptions: Compelling, Under 160 Characters

## Current State

All blog articles already have a `metaDescription` field, and `BlogPost.tsx` correctly prioritizes it via `post.metaDescription || post.excerpt || post.content.substring(0, 155)`. However, there are two areas to improve:

1. **Static page descriptions** are generic and lack click-driving language (e.g., "Learn about Experience Doha, your comprehensive guide to Qatar's vibrant capital city.")
2. **Some blog `metaDescription` values** exceed 160 characters or could be more compelling with action verbs, numbers, and benefit-driven copy

## What Changes

### 1. Static Page Descriptions (7 pages)

| Page | Current Description | New Description (under 160 chars) |
|------|---|---|
| **Index.tsx** | "The ultimate guide to living in and visiting Doha, Qatar. Updated for 2026 with visa rules, cost of living, and stopover tips." (127) | "Plan your Doha trip or move with confidence. 2026 guides on visa rules, cost of living, layovers, salaries, and hidden gems in Qatar." (134) |
| **About.tsx** | "Learn about Experience Doha, your comprehensive guide to Qatar's vibrant capital city." (86) | "Meet the team behind Experience Doha — expat-tested guides, honest tips, and insider knowledge for tourists and residents in Qatar." (130) |
| **Blog.tsx** | "Expert insights, guides, and stories about life and travel in Qatar's vibrant capital. Tips for expats, tourists, and anyone curious about Doha." (145) | "Browse 60+ expert guides on Doha — from layover itineraries and expat tips to visa rules and hidden restaurants. Updated weekly." (127) |
| **Gallery.tsx** | "Browse stunning photos of Doha's skyline, landmarks, culture, and attractions. Visual inspiration for your Qatar trip." (119) | "Stunning Doha photos: skyline views, Souq Waqif nights, desert sunsets, and cultural landmarks. Free to browse and share." (122) |
| **Videos.tsx** | "Watch videos about Doha attractions, culture, food, and travel experiences. Visual guides to help you explore Qatar's capital." (124) | "Watch Doha travel videos — attraction tours, food reviews, cultural events, and insider tips. Your visual guide to Qatar." (120) |
| **Contact.tsx** | "Get in touch with Experience Doha. Questions about Qatar travel, suggestions, or partnerships." (93) | "Have a question about Doha or Qatar? Reach out for travel tips, partnership inquiries, or content suggestions. We reply fast." (124) |
| **BudgetPlanner.tsx** | "Plan your monthly expenses in Doha with our interactive budget planner. Calculate costs for singles or families, convert currencies, and estimate savings potential." (163 -- over limit!) | "Free Doha budget calculator: estimate rent, groceries, transport, and school fees. Plan monthly costs for singles or families in Qatar." (141) |

### 2. SEOHead Default Description

The default in `SEOHead.tsx` is already 148 chars and decent, but could be more action-oriented:
- Current: "Discover the best things to do in Doha, Qatar. Expert guides on attractions, culture, food, layovers, and experiences. Plan your perfect Qatar visit." (150)
- New: "Your go-to Doha guide: attractions, layover tips, expat advice, food, and culture. Plan your perfect Qatar trip with 60+ expert articles." (139)

### 3. Blog Article `metaDescription` Audit

All existing blog metaDescriptions are already well-crafted and under 160 characters. No changes needed for blog-data.ts.

## Files to Edit

1. `src/components/SEOHead.tsx` -- Update default description
2. `src/pages/Index.tsx` -- Update description
3. `src/pages/About.tsx` -- Update description
4. `src/pages/Blog.tsx` -- Update description
5. `src/pages/Gallery.tsx` -- Update description
6. `src/pages/Videos.tsx` -- Update description
7. `src/pages/Contact.tsx` -- Update description
8. `src/pages/BudgetPlanner.tsx` -- Update description (currently over 160 chars)

## Technical Notes

- The `description` prop flows through `SEOHead` into both `<meta name="description">` and `<meta property="og:description">`, so a single edit covers both.
- Blog articles are unaffected since they already have dedicated `metaDescription` fields under 160 chars.
- Each new description includes a primary keyword, a benefit or number, and action-oriented language to maximize CTR.

