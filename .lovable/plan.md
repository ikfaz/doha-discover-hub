

# H1 & Heading Hierarchy Optimization

## Findings

After auditing all pages, here is the current state:

### Pages with exactly one H1 (correct)
- `About.tsx` -- H1 via translation key
- `Blog.tsx` -- H1 "Experience Doha Blog - Qatar Travel Guide"
- `BlogPost.tsx` -- H1 = post title
- `BlogCategory.tsx` -- H1 = category title
- `BudgetPlanner.tsx` -- H1 "Doha Expat Budget Planner"
- `Contact.tsx` -- H1 via translation key
- `Gallery.tsx` -- H1 via `GalleryHeader` component
- `Videos.tsx` -- H1 "Experience Doha Videos"
- `TourDetail.tsx` -- H1 = tour title (+ separate H1 for "Tour Not Found" state, which is fine since only one renders)
- `PrivacyPolicy.tsx` -- H1 "Privacy Policy"
- `TermsOfService.tsx` -- H1 "Terms of Service"
- `CookiePolicy.tsx` -- H1 "Cookie Policy"
- `NotFound.tsx` -- H1 "404"
- `Listing.tsx` -- H1 = listing title

### Pages MISSING an H1
- **`Index.tsx`** -- No H1 at all. The "Featured Articles" heading is an H2. The homepage has zero H1 tags, which is the most critical SEO issue.

### Heading hierarchy issues
- **`Index.tsx`** -- Only has an H2 for "Featured Articles" and whatever Newsletter renders (H2). No H1.
- **`Videos.tsx`** -- Uses H3 tags for video titles inside a grid. This is correct hierarchy (H1 > H2 "Featured Playlist" > H3 video cards).
- **`BlogPost.tsx`** -- Table of Contents heading uses H3 which is fine. The blog content itself uses H2/H3 from the CMS HTML, which is correct.

## Plan

### 1. Add H1 to Index.tsx (homepage)

Add a visually prominent but SEO-meaningful H1 above the featured articles section. The homepage is the most important page to have an H1.

**File: `src/pages/Index.tsx`**

Add an H1 hero section between NavBar and the Viator widget:

```html
<section className="bg-qatar-maroon text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
      Experience Doha: Your Guide to Qatar
    </h1>
    <p className="text-xl max-w-3xl mx-auto text-white/80">
      Expert guides on attractions, food, culture, layovers, and expat life in Qatar's capital
    </p>
  </div>
</section>
```

This matches the visual pattern used on Blog, About, Contact, and Videos pages.

### 2. No other changes needed

All other pages already have exactly one H1 and use proper H2-H6 hierarchy. The blog article content from `blog-data.ts` uses H2 for sections and H3 for subsections, which is the correct semantic structure under the H1 title.

## Files to Edit

1. **`src/pages/Index.tsx`** -- Add H1 hero section (the only page missing an H1)

## Technical Notes

- The H1 text "Experience Doha: Your Guide to Qatar" contains the site's primary keyword and matches the brand.
- The subtitle reuses language from the meta description for consistency.
- The visual style (maroon background, white text, centered) matches every other page header for design consistency.

