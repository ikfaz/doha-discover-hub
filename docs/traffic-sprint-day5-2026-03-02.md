# Day 5 SEO Snippet + FAQ Schema Sprint (2026-03-02)

## Scope
- Improve click-through-oriented title/description snippets on high-intent pages.
- Add/expand FAQ structured data where content supports it.
- Strengthen structured data on dynamic collection pages (`/blog/category/*`, `/blog/tag/*`).

## Changes Applied
- Homepage (`src/pages/Index.tsx`)
  - Added FAQ section and `FAQPage` JSON-LD.
  - Improved title/description copy for clearer 2026 intent targeting.

- Blog index (`src/pages/Blog.tsx`)
  - Moved JSON-LD generation to `SEOHead` input (removed manual script injection).
  - Added `FAQPage` JSON-LD and visible FAQ section.
  - Updated title/description for stronger snippet relevance.

- Budget planner (`src/pages/BudgetPlanner.tsx`)
  - Added visible FAQ section.
  - Added `WebApplication` + `FAQPage` JSON-LD.
  - Updated title/description for clearer user intent and value.

- Tour detail (`src/pages/TourDetail.tsx`)
  - Added dynamic FAQ section and `FAQPage` JSON-LD based on active tour.
  - Updated title/description templates with price and social-proof context.

- About / Contact / Gallery (`src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/pages/Gallery.tsx`)
  - Upgraded title/description snippets for clarity and CTR.

- Blog category and tag pages (`src/pages/BlogCategory.tsx`, `src/pages/BlogTag.tsx`)
  - Reworked snippet copy to be intent-based and less generic.
  - Added `CollectionPage` + `ItemList` JSON-LD to describe page purpose and listed articles.

- Blog post pages (`src/pages/BlogPost.tsx`)
  - Improved SEO title template to include brand and year context when missing in headline.
  - Added description normalization/trimming for cleaner snippets.
  - Added extra `Article` properties (`articleSection`, `keywords`, `wordCount`).
  - Added automatic `FAQPage` JSON-LD extraction when article content includes FAQ blocks.

## Validation
- `npm run build` completed successfully.
- Chunk split improvements from Day 4 remain effective (no >500 kB warning).
- Existing non-blocking warnings remain:
  - optional `vite-plugin-image-optimizer` dependencies not installed: `sharp`, `svgo`

## Constraints Kept
- Google Analytics was not modified.
- Previously removed video section remains removed.
