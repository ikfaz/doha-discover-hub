

# 301 Redirect Implementation Plan

## Context

This is a Vite-based SPA deployed on Apache (evidenced by `.htaccess`). There are two layers where redirects should be handled:

1. **Server-side (`.htaccess`)** -- For SEO crawlers and direct URL visits, real HTTP 301 responses before the SPA loads
2. **Client-side (React Router)** -- For in-app navigation to old paths

Since there are no known old URLs that have changed (the blog slugs in `blog-data.ts` are the current canonical slugs, and the sitemap matches the routes in `App.tsx`), we need to set up a **redirect infrastructure** and populate it with common patterns that would cause 404s.

## Common 404 Patterns to Redirect

Based on the sitemap slugs and typical URL variations users/search engines might try:

| Old/Broken Path | Redirect To | Reason |
|---|---|---|
| `/blogs` | `/blog` | Common plural typo |
| `/blogs/:slug` | `/blog/:slug` | Same with slug |
| `/tours/:slug` | `/tour/:slug` | Plural vs singular |
| `/listings/:slug` | `/listing/:slug` | Plural vs singular |
| `/privacy` | `/privacy-policy` | Common shorthand |
| `/terms` | `/terms-of-service` | Common shorthand |
| `/cookies` | `/cookie-policy` | Common shorthand |
| `/budget` | `/budget-planner` | Common shorthand |
| `/video` | `/videos` | Singular vs plural |
| `/photos` | `/gallery` | Alternative name |

## Changes

### File 1: `public/.htaccess` -- Add Apache 301 redirects

Add `RewriteRule` directives **before** the catch-all React Router rule to issue real HTTP 301 responses for known old/broken patterns. This is critical for SEO because Google respects server-level 301s and transfers link equity.

Redirects to add:
- `/blogs` to `/blog` (exact match and with trailing slug)
- `/tours/` to `/tour/` (with slug passthrough)
- `/listings/` to `/listing/` (with slug passthrough)
- `/privacy` to `/privacy-policy`
- `/terms` to `/terms-of-service`
- `/cookies` to `/cookie-policy`
- `/budget` to `/budget-planner`
- `/video` to `/videos`
- `/photos` to `/gallery`

### File 2: `src/App.tsx` -- Add React Router `Navigate` redirects

Add `<Route>` entries with `<Navigate to="..." replace />` for the same patterns. This handles cases where the SPA is already loaded and a user navigates to an old path client-side. The `replace` prop ensures the old URL is replaced in browser history (equivalent to a redirect, not a new history entry).

### File 3: `src/pages/NotFound.tsx` -- Add smart suggestions

Enhance the 404 page to suggest similar pages based on the attempted URL path. This helps users who land on a truly non-existent page find what they were looking for. Add a simple pattern-matching function that suggests related pages.

## Files to Edit

1. **`public/.htaccess`** -- Add 301 redirect rules before the catch-all
2. **`src/App.tsx`** -- Add `Navigate` redirect routes for client-side handling
3. **`src/pages/NotFound.tsx`** -- Add smart page suggestions based on the attempted path

