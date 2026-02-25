

# Google Crawlability Audit

## Critical Issues Found

### 1. Sitemap contains 15 broken blog URLs (HIGH)
The `public/sitemap.xml` still lists all 15 "seed" slugs that were removed from `Blog.tsx` in the broken links fix (`top-attractions-doha`, `authentic-qatari-cuisine`, `summer-cultural-events`, etc. -- lines 378-466). When Googlebot follows these URLs, it gets redirected to `/blog`, wasting crawl budget and generating soft 404 signals. Google Search Console will flag these as errors.

### 2. Legal pages conflict between robots.txt and sitemap (MEDIUM)
`robots.txt` blocks `/cookie-policy`, `/terms-of-service`, and `/privacy-policy` with `Disallow`, but `sitemap.xml` includes them (lines 474-492). This sends contradictory signals to Google. The sitemap says "index this" while robots.txt says "don't crawl this."

### 3. Organization logo URL will 404 in production (MEDIUM)
The JSON-LD in `index.html` references `https://experiencedoha.com/src/assets/logo.png`. Vite bundles assets with hashed filenames, so this path does not resolve in production. Google will flag a broken logo in Search Console's structured data report.

### 4. SPA rendering -- no prerendering or SSR (LOW-MEDIUM)
The site is a client-side React SPA. Google can render JavaScript, but it is slower (days vs hours for static HTML) and less reliable. The `<noscript>` fallback in `index.html` provides minimal content but no article text. This means the initial crawl of every page sees only the shell until Google's rendering queue processes it.

This is a known tradeoff of SPAs and not a blocker, but it does slow indexing of new content.

### 5. Missing tour pages from sitemap (LOW)
Only 2 tour pages are in the sitemap. If more tours are added later, they will not be discovered unless the sitemap is updated. Currently this matches the 2 tours in `tours.ts`, so it is correct today.

---

## Plan

### Step 1: Remove 15 broken blog URLs from sitemap.xml
Delete the `<url>` entries for all 15 non-existent slugs (lines 378-466 in `public/sitemap.xml`). These are the same slugs removed from `Blog.tsx` earlier: `top-attractions-doha`, `authentic-qatari-cuisine`, `summer-cultural-events`, `museum-islamic-art`, `doha-shopping-guide`, `qatar-expat-guide`, `arabic-coffee-culture`, `desert-adventures`, `doha-architecture`, `family-activities`, `weekend-getaways`, `qatari-crafts`, `doha-beaches`, `ramadan-guide`, `sustainable-tourism`.

### Step 2: Remove legal pages from sitemap OR remove them from robots.txt Disallow
Pick one consistent signal. Since these pages have `noindex` via `SEOHead` and are low-value for SEO, the best approach is to **remove them from the sitemap** (lines 474-492) and keep the `robots.txt` Disallow. This saves crawl budget and avoids contradictions.

### Step 3: Fix the Organization logo URL
Move `logo.png` to the `public/` directory (e.g., `public/logo.png`) so it is served at a stable URL (`https://experiencedoha.com/logo.png`). Update the JSON-LD in `index.html` to reference this new path.

### Step 4: Add `<link rel="canonical">` to index.html as a static fallback
Add `<link rel="canonical" href="https://experiencedoha.com/" />` in the `<head>` of `index.html`. Helmet will override it on client-side navigation, but this ensures crawlers that don't execute JS see a canonical on the initial HTML response.

### Files to edit
- `public/sitemap.xml` -- Remove 15 broken blog URLs and 3 legal page URLs
- `public/robots.txt` -- No changes needed (already correct)
- `index.html` -- Fix logo URL in JSON-LD, add static canonical link
- `public/logo.png` -- Copy logo asset to public directory for stable URL

