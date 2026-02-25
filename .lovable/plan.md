

# Page Speed Optimization Plan

## Performance Profile Results

| Metric | Current | Target |
|---|---|---|
| First Contentful Paint | 3.8s | < 1.8s |
| DOM Content Loaded | 3.7s | < 2.5s |
| Full Page Load | 3.9s | < 3.0s |
| Total JS Resources | 53 scripts, 616KB | Reduce by ~30% |

## Bottlenecks Identified

### 1. Duplicate Google Fonts loading (HIGH IMPACT)
Google Fonts are loaded **twice**: once via `<link>` in `index.html` (line 31) and again via `@import` in `src/index.css` (line 1). This causes a redundant render-blocking network request. The CSS `@import` is the worse offender because it blocks rendering until the stylesheet is fully parsed.

**Fix**: Remove the `@import` from `index.css`. The `<link>` in `index.html` already handles it and already has `preconnect` hints.

### 2. Index.tsx eagerly imports 35+ images (HIGH IMPACT)
The homepage statically imports 35 local image files at the top of `Index.tsx`. Even though `Index` is lazy-loaded, once it loads, all 35 images are bundled into its chunk or resolved immediately. Most are below the fold.

**Fix**: Only the first 3-6 featured blog images need eager loading. The rest should use dynamic imports or, more practically, the blog card images already have `loading="lazy"` on the `<img>` tag, so the browser handles deferral. However, the static `import` statements force Vite to include all 35 images in the module graph. Convert the `featuredBlogs` array image references to use the image paths directly and leverage Vite's `new URL()` pattern or simply keep the imports but ensure BlogCard's `loading="lazy"` is doing its job. Since these are local assets (not URLs), the imports are necessary for Vite to process them, but we can split the page to only render visible cards initially.

Actually, the real fix here is simpler: the static imports just create URL references -- they don't embed the image data. The browser still fetches them on demand. Since BlogCard already has `loading="lazy"`, this is already optimized. No change needed here.

### 3. GetYourGuide widget script loads on every page (MEDIUM IMPACT)
`index.html` line 47 loads `widget.getyourguide.com/dist/pa.umd.production.min.js` with `async defer` on **every page**, even pages that don't use it. This adds an unnecessary network request and JS parsing cost.

**Fix**: Move the GYG script loading into the `GetYourGuideWidget` component itself, so it only loads when that component mounts. Or, since `GetYourGuideWidget` doesn't appear to be used on any current page (it's imported nowhere in routes), remove the script from `index.html` entirely and keep it only in the component.

### 4. Google Analytics script is render-blocking pattern (LOW-MEDIUM IMPACT)
The inline `<script>` on lines 38-43 in `index.html` runs synchronously. While the gtag.js itself is `async`, the inline config script executes during HTML parsing.

**Fix**: Add `defer` or wrap the inline script with a `requestIdleCallback` to avoid blocking the main thread during initial parse. Alternatively, move it to the bottom of `<body>`.

### 5. Vite build not configured for chunk splitting (MEDIUM IMPACT)
`vite.config.ts` has no `build.rollupOptions.output.manualChunks` configuration. This means vendor libraries (react, react-router, recharts, lucide-react at 156KB, i18next, etc.) are all bundled into fewer, larger chunks instead of being split for better caching.

**Fix**: Add manual chunks configuration to separate vendor libraries from application code, enabling better browser caching when app code changes.

### 6. No font-display strategy in HTML link (LOW IMPACT)
The Google Fonts URL in `index.html` already includes `&display=swap` which is correct. No change needed.

## Changes

### File 1: `src/index.css` -- Remove duplicate font import
Remove line 1 (`@import url(...)`) since fonts are already loaded via `<link>` in `index.html`.

### File 2: `index.html` -- Remove unused GYG script, optimize GA
- Remove the GetYourGuide analytics script tag (line 47) since no page currently renders the GYG widget inline
- Move the Google Analytics inline config script to just before `</body>` to avoid head-of-document blocking

### File 3: `vite.config.ts` -- Add chunk splitting
Add `build.rollupOptions.output.manualChunks` to split:
- `react-vendor`: react, react-dom
- `router`: react-router-dom
- `ui-vendor`: radix-ui packages, lucide-react
- `charts`: recharts
- `i18n`: i18next, react-i18next

This improves caching -- when app code changes, vendor chunks remain cached.

### File 4: `src/components/GetYourGuideWidget.tsx` -- Self-contained script loading
Move the GYG script loading into the component's `useEffect` so it only loads when the widget is actually rendered on a page.

## Expected Impact

| Change | Estimated FCP Improvement |
|---|---|
| Remove duplicate font @import | -200-400ms |
| Remove unused GYG script from head | -100-200ms |
| Move GA inline script to body end | -50-100ms |
| Vite chunk splitting | Better caching, -100ms on repeat visits |
| **Total estimated** | **~400-700ms faster FCP** |

## Files to Edit

1. `src/index.css` -- Remove duplicate `@import` for Google Fonts
2. `index.html` -- Remove GYG script from head, move GA config to body
3. `vite.config.ts` -- Add manual chunks for vendor splitting
4. `src/components/GetYourGuideWidget.tsx` -- Self-load the GYG script on mount

