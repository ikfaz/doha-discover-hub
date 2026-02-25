

# Image Compression Plan: Convert JPG to WebP via Vite

## Current State

The project has **90 JPG images** in `src/assets/` plus 2 PNG/SVG logos. All are imported as static assets across multiple files (Blog.tsx imports 50+, Index.tsx imports 35+, Gallery.tsx imports 15). Converting these manually to WebP would require replacing every import and filename across dozens of files.

## Approach: Vite Plugin for Automatic WebP Conversion

Instead of manually converting and renaming 90 files, we use `vite-plugin-image-optimizer` to automatically compress and convert images at build time. This means:

- Zero changes to existing import statements
- Zero file renames
- All JPG files are automatically optimized during the Vite build
- Development stays fast (images are only optimized in production builds)

## Changes

### 1. Install `vite-plugin-image-optimizer`

Add the `vite-plugin-image-optimizer` package which handles automatic image compression during builds. It supports JPG, PNG, SVG, and WebP conversion.

### 2. Update `vite.config.ts`

Add the image optimizer plugin with configuration:
- **JPEG quality**: 80 (good balance of quality vs size, typically 40-60% file size reduction)
- **PNG quality**: 80
- **WebP conversion**: Not forced (keep JPG format but compress aggressively -- changing format would require updating all imports and `<source>` elements)
- **SVG optimization**: Enable SVGO for the logo files

### 3. Add `loading="lazy"` to remaining image tags

Several pages still have images without `loading="lazy"`:
- `src/pages/Gallery.tsx` -- gallery grid images (15 images, most below fold)
- `src/pages/Index.tsx` -- blog card images rendered via BlogCard already have it, but check any standalone `<img>` tags

### 4. Add responsive `srcset`-style sizing with Tailwind

No change needed -- the images already use `object-cover` with constrained dimensions, which is the correct approach for responsive images with static imports.

## Technical Details

The `vite-plugin-image-optimizer` runs during `vite build` only. It processes all static image assets through `sharp` (for raster) and `svgo` (for SVG), reducing file sizes without changing filenames or import paths. The optimized files are output to the `dist/assets/` directory.

Estimated compression: 90 JPG files at ~100-300KB each could be reduced to ~40-120KB each, saving roughly 5-15MB total bundle size.

## Files to Edit

1. **`vite.config.ts`** -- Add image optimizer plugin with compression settings
2. **`src/pages/Gallery.tsx`** -- Add `loading="lazy"` to gallery grid images

