

# SEO Audit: Article Content & Structure

## Current Issues Found

### 1. Missing `metaDescription` on ~40 of 42 articles
Only 2 articles (`qatar-visa-rules-expats-2025` and `cost-of-living-doha-2025`) have a `metaDescription`. The remaining ~40 articles pass `undefined` to the `SEOHead` component, which means Google sees the generic fallback: *"Discover the best things to do in Doha, Qatar..."* -- the same description for every article. This is a critical SEO problem; duplicate meta descriptions across dozens of pages will hurt rankings.

### 2. Missing `excerpt` on all 42 articles
No articles have an `excerpt` field. The JSON-LD structured data falls back to `post.content.substring(0, 160).replace(/<[^>]*>/g, '')`, which strips HTML but may cut mid-word or include formatting artifacts. The `SEOHead` description also falls through to the default when both `metaDescription` and `excerpt` are undefined.

### 3. Image `alt` text is generic
The hero image alt text uses a template: `${post.title} - ${post.category} guide for Doha, Qatar`. This is acceptable but could be more descriptive per article.

### 4. Duplicate JSON-LD injection
The `SEOHead` component injects JSON-LD via its `jsonLd` prop, but `BlogPost.tsx` also manually creates a second `<script type="application/ld+json">` via `useEffect` (lines 231-262). This results in duplicate structured data -- one from Helmet and one from DOM manipulation. The `useEffect` version should be the only one (since `SEOHead` is not passed `jsonLd` for articles), but the approach is fragile.

### 5. `datePublished` format is human-readable, not ISO 8601
Dates like `"June 10, 2026"` are used in JSON-LD's `datePublished`. Google expects ISO 8601 format (`2026-06-10`). This may cause Google to ignore the date or display it incorrectly in search results.

### 6. Missing `dateModified` in structured data
Google recommends both `datePublished` and `dateModified` for article schema. Currently only `datePublished` is present.

### 7. No `description` in Open Graph when meta is missing
When `metaDescription` and `excerpt` are both undefined, the OG description defaults to the site-wide generic text, making social media shares for articles look identical.

---

## Plan

### Step 1: Add `metaDescription` and `excerpt` to all ~42 articles
Add unique, keyword-rich `metaDescription` (max 160 chars) and `excerpt` (2-3 sentence summary) to every article in `blog-data.ts`. The metaDescription will be crafted for search intent; the excerpt for social sharing and JSON-LD.

### Step 2: Add `isoDate` field to ArticleData type
Add an `isoDate: string` field (e.g., `"2026-06-10"`) to the `ArticleData` interface and populate it for all articles. This will be used in JSON-LD `datePublished` and OG `article:published_time`.

### Step 3: Fix JSON-LD in BlogPost.tsx
- Remove the manual `useEffect` DOM injection
- Pass a properly structured `jsonLd` object to `SEOHead` instead, using `isoDate` for dates
- Add `dateModified` (can default to `isoDate` initially)

### Step 4: Fix SEOHead fallback chain
Update `BlogPost.tsx` to always pass a description: `post.metaDescription || post.excerpt || post.content.substring(0, 155).replace(/<[^>]*>/g, '')`. This ensures no article ever uses the site-wide default.

### Step 5: Add `keywords` meta tag support (optional)
While Google doesn't use `<meta name="keywords">`, having keyword-rich tags in the article data already exists (`tags` field). These could be added as a meta tag for other search engines.

---

## Impact
- Every article gets a unique, search-optimized meta description visible in Google results
- JSON-LD structured data uses proper ISO dates, improving rich snippet eligibility
- Social media shares show article-specific descriptions instead of generic site text
- No duplicate structured data injection

