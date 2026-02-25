

# Page Speed Optimization Plan (Phase 2)

## Current Performance Profile

| Metric | Value | Target |
|---|---|---|
| First Contentful Paint | 4,144ms | < 1,800ms |
| DOM Content Loaded | 3,983ms | < 2,500ms |
| Full Page Load | 4,237ms | < 3,000ms |
| Total JS Scripts | 55 | Reduce |

## Bottlenecks Identified

### 1. BlogCard eagerly pre-loads ALL images (HIGH IMPACT)

`BlogCard.tsx` creates a `new Image()` in `useEffect` for every card, defeating the `loading="lazy"` attribute on the actual `<img>` tag. The homepage renders 35 blog cards, so 35 images are fetched immediately on mount regardless of viewport position.

**Fix**: Remove the `useEffect` image pre-loader entirely. Use the native `<img>` with `loading="lazy"` and an `onError` fallback directly. This alone should eliminate dozens of unnecessary network requests on initial load.

### 2. lucide-react barrel import: 160KB, 1,060ms (HIGH IMPACT)

`lucide-react` is the single largest and slowest resource at 160KB taking over 1 second to load. It is imported across 34 files. In dev mode, Vite loads the full barrel; in production the tree-shaking helps, but we can improve dev performance and ensure optimal production bundles by using deep imports (e.g., `lucide-react/dist/esm/icons/menu`). However, this is non-standard for lucide-react. The more practical fix: ensure the Vite dependency pre-bundling is optimized, and for production, the existing tree-shaking + manual chunks should handle it.

Actually, the 160KB is the dev pre-bundle. In production with tree-shaking and our manual chunks config, only used icons ship. The real issue is dev mode. We can add `lucide-react` to `optimizeDeps.include` to speed up dev cold starts, but the bigger wins are elsewhere.

### 3. ViatorBanner iframe loads immediately above the fold (HIGH IMPACT)

The `ViatorBanner` component renders an iframe that loads the Viator widget script immediately. This is placed right after the hero on the homepage (line 487-491 of Index.tsx). It has a 400px min-height and loads a third-party script synchronously inside the iframe. This blocks visual rendering and adds to DOM Content Loaded time.

**Fix**: Lazy-load the ViatorBanner using `IntersectionObserver` so it only loads when scrolled into view, or defer its rendering with `requestIdleCallback`.

### 4. i18n loaded synchronously before app renders (MEDIUM IMPACT)

`src/main.tsx` imports `./i18n` synchronously, which loads `i18next`, `react-i18next`, and `i18next-browser-languagedetector` plus both language JSON files before the app can render.

**Fix**: Dynamically import i18n initialization so it doesn't block the initial render. Use `i18next-http-backend` for lazy-loading translations, or at minimum wrap the i18n import in a dynamic import.

### 5. Google Fonts render-blocking (LOW-MEDIUM IMPACT)

The Google Fonts `<link>` in `index.html` is render-blocking (124ms). It can be converted to a preload + swap pattern.

**Fix**: Change the font `<link>` to use `media="print" onload="this.media='all'"` pattern for non-blocking font loading, or add `<link rel="preload">` for the font CSS.

## Changes

### File 1: `src/components/BlogCard.tsx` -- Remove eager image pre-loading

Remove the entire `useEffect` that creates `new Image()` objects. Replace with a simple `onError` handler on the `<img>` tag itself. Remove the `isLoading` state and spinner overlay. This eliminates 35 parallel image fetches on homepage mount.

Before: Each BlogCard spawns a `new Image()` in useEffect, fetching the image even if it's off-screen.
After: The `<img>` tag handles everything natively with `loading="lazy"` and `onError` fallback.

### File 2: `src/pages/Index.tsx` -- Lazy-load ViatorBanner

Wrap the ViatorBanner in a component that uses `IntersectionObserver` to only render when the user scrolls near it. This prevents the iframe and its third-party script from loading during initial page render.

### File 3: `index.html` -- Non-blocking font loading

Convert the Google Fonts `<link>` from render-blocking to non-blocking using the `media="print"` swap trick:
```
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?...">
<link href="https://fonts.googleapis.com/css2?..." rel="stylesheet" media="print" onload="this.media='all'">
```

### File 4: `src/main.tsx` -- Async i18n initialization

Dynamically import the i18n module so the app shell can render before translations are fully loaded. Wrap the render in an async IIFE that awaits the i18n import.

## Expected Impact

| Change | Estimated FCP Improvement |
|---|---|
| Remove BlogCard image pre-loading | -500-1000ms (eliminates 35 eager fetches) |
| Lazy-load ViatorBanner iframe | -300-500ms (defers third-party script) |
| Non-blocking font loading | -100-200ms |
| Async i18n initialization | -100-200ms |
| **Total estimated** | **~1,000-1,900ms faster FCP** |

## Files to Edit

1. `src/components/BlogCard.tsx` -- Remove useEffect image pre-loader, use native lazy loading
2. `src/pages/Index.tsx` -- Lazy-load ViatorBanner with IntersectionObserver
3. `index.html` -- Non-blocking Google Fonts loading
4. `src/main.tsx` -- Async i18n initialization

