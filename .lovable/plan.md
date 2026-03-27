

# Fix Build Errors + Facebook Sharing Preview

## Problem 1: Build Errors (28 entries missing `tags`)

`BlogMetaData` inherits `tags: string[]` as required from `ArticleData`. Many blog-meta entries added before tags were required don't include it.

**Fix**: Make `tags` optional in `ArticleData` (`tags?: string[]`). Update all consumers that reference `post.tags` to default to `[]` (e.g., `post.tags || []`).

## Problem 2: Facebook OG Image Not Working

The `og:image` meta tag receives a Vite-processed asset path like `/assets/image-abc123.jpg` — a relative URL. Facebook's crawler needs an **absolute URL** (e.g., `https://experiencedoha.com/assets/image-abc123.jpg`).

**Fix**: In `SEOHead.tsx`, normalize the `image` prop to an absolute URL by prepending `BASE_URL` when the image starts with `/`.

## Files to Edit

1. **`src/data/articles/types.ts`** — Change `tags: string[]` to `tags?: string[]`
2. **`src/components/SEOHead.tsx`** — Prepend `BASE_URL` to relative image URLs before outputting `og:image` and `twitter:image`
3. **`src/pages/BlogPost.tsx`** — Use `post.tags || []` where tags are referenced

