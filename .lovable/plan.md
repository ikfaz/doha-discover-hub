

# Optimize Image Alt Text for Accessibility & SEO

## Audit Results

| Location | Current Alt | Issue | Fix |
|---|---|---|---|
| **Gallery.tsx lightbox** | `"Gallery"` | Generic, non-descriptive. Loses the photo's actual alt text when opened in lightbox. | Store selected photo object (not just URL), use `photo.alt` + `photo.caption` |
| **BlogCard.tsx** | `{title}` (article title) | Acceptable but could be more descriptive for image context | Change to `{title} - article thumbnail` |
| **NavBar.tsx logo** | `alt=""` with `aria-hidden="true"` | Correct pattern for decorative logo next to text. No change needed. | Keep as is |
| **Videos.tsx thumbnails** | `{video.title}` | Good for video thumbnails. | Keep as is |
| **Blog.tsx featured** | `` `${featuredPost.title} - Featured guide...` `` | Already optimized. | Keep as is |
| **BlogPost.tsx hero** | `` `${post.title} - ${post.category} guide...` `` | Already optimized. | Keep as is |
| **TourDetail.tsx hero** | `` `${tour.title} – ${tour.category} tour...` `` | Already optimized. | Keep as is |
| **TourDetail.tsx map** | `` `Route map showing ${tour.itinerary.length} stops...` `` | Already optimized. | Keep as is |
| **About.tsx** | `"Experience Doha team exploring Qatar's attractions..."` | Already optimized. | Keep as is |
| **PhotoGallery.tsx** | `{photo.alt}` | Passes through from data. Fine. | Keep as is |

## Changes

### 1. Gallery.tsx -- Fix lightbox alt text (the main issue)

Currently `selectedImage` stores only a URL string, so the lightbox renders `alt="Gallery"`. Change state to store the full photo object so we can use `photo.alt` in the lightbox.

- Change `selectedImage` from `string | null` to `{ url: string; alt: string; caption?: string } | null`
- Update `setSelectedImage` calls to pass the photo object
- Use `selectedImage.alt` in the lightbox `<img>`

### 2. BlogCard.tsx -- Slightly improve alt text

Change `alt={title}` to `alt={`${title} - ${category} guide image`}` to add image context beyond just repeating the heading text (better for screen readers and image search).

## Files to Edit

1. `src/pages/Gallery.tsx` -- Fix lightbox to use descriptive alt text from photo data
2. `src/components/BlogCard.tsx` -- Enhance alt with category context

