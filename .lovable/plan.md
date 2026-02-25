

# Mobile-First Optimization Plan

## Audit Summary

The site already has the critical `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` tag and uses Tailwind's responsive prefixes (`md:`, `lg:`) throughout. However, several concrete mobile issues exist that affect Google's mobile-first indexing.

## Issues Found

### 1. BlogPost hero title overflows on small screens
- **File**: `src/pages/BlogPost.tsx` line 289
- `text-4xl md:text-5xl` on long titles (some are 60+ characters) causes overflow on narrow screens
- **Fix**: Change to `text-2xl sm:text-3xl md:text-5xl` for the H1, and reduce hero height from fixed `h-[400px]` to `h-[280px] sm:h-[350px] md:h-[400px]`

### 2. Share buttons overflow horizontally on mobile
- **File**: `src/pages/BlogPost.tsx` lines 334-356
- Three buttons ("Facebook", "Twitter", "Copy Link") in a horizontal `flex` row with text labels overflow on screens < 375px
- **Fix**: Change to `flex flex-wrap gap-2` and hide button text labels on small screens (icon-only on mobile)

### 3. Blog page sidebar layout not mobile-optimized
- **File**: `src/pages/Blog.tsx` line 632
- The sidebar (categories, featured post, follow us) renders below the main content in a `lg:flex-row` layout. On mobile, categories appear after scrolling past all posts. Move sidebar categories above posts on mobile.
- **Fix**: Reorder with `flex-col-reverse lg:flex-row` so categories appear first on mobile, or use `order-first lg:order-last` on the sidebar

### 4. Footer grid collapses to single column without spacing control
- **File**: `src/components/Footer.tsx` line 19
- `grid-cols-1 md:grid-cols-4` jumps from 1 to 4 columns. On tablets (768-1024px), 4 columns are cramped.
- **Fix**: Change to `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`

### 5. BlogCard image container lacks `loading="lazy"`
- **File**: `src/components/BlogCard.tsx` line 73-78
- The homepage loads 35+ blog cards. Without native lazy loading, all images load immediately on mobile, hurting LCP and bandwidth.
- **Fix**: Add `loading="lazy"` to the `<img>` tag

### 6. Blog.tsx featured post image lacks `loading="lazy"`
- **File**: `src/pages/Blog.tsx` line 697
- Same issue for the sidebar featured post image
- **Fix**: Add `loading="lazy"`

### 7. BlogPost hero image should be eager (above the fold)
- **File**: `src/pages/BlogPost.tsx` line 279-283
- This is the LCP element. Add `fetchpriority="high"` to signal to the browser this is the most important image.
- **Fix**: Add `fetchpriority="high"` attribute

### 8. Touch targets on Table of Contents links are too small
- **File**: `src/pages/BlogPost.tsx` lines 317-328
- ToC links have `py-1` (4px vertical padding). Google requires 48px minimum touch targets.
- **Fix**: Change `py-1` to `py-2.5` for adequate mobile tap targets

### 9. Gallery lightbox not mobile-friendly
- **File**: `src/pages/Gallery.tsx`
- The lightbox uses `max-w-4xl` but no mobile-specific sizing. The image `max-h-[80vh]` is fine, but the dialog itself needs better mobile padding.
- No critical fix needed -- the Dialog component handles this adequately.

## Files to Edit

1. **`src/pages/BlogPost.tsx`** -- Responsive hero height, smaller H1 on mobile, wrap share buttons, larger ToC touch targets, add `fetchpriority="high"` to hero image
2. **`src/components/BlogCard.tsx`** -- Add `loading="lazy"` to images
3. **`src/pages/Blog.tsx`** -- Add `loading="lazy"` to featured post image, reorder sidebar on mobile
4. **`src/components/Footer.tsx`** -- Add `sm:grid-cols-2` breakpoint

## Technical Details

All changes use existing Tailwind responsive utilities. No new dependencies needed. The `fetchpriority` attribute is supported by all modern browsers and is a strong signal for Core Web Vitals LCP optimization.

