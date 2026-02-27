

# Improve Crawlability and Indexability

Google's two-step process -- crawling (discovering pages via links) and indexing (analyzing and storing content) -- can be improved on this site in several concrete ways.

## Current Gaps

1. **No breadcrumbs** -- Blog posts have no breadcrumb navigation or BreadcrumbList structured data. Google uses breadcrumbs to understand site hierarchy and displays them in search results.
2. **No internal link mesh** -- Blog post sidebar only has a "Subscribe" CTA. No related category links, no popular articles, no cross-linking between articles. Googlebot discovers pages by following links -- fewer links means fewer discovered pages.
3. **Tags are not linked** -- Blog post tags render as static `<Badge>` elements with no `<a>` links. Each tag should link to `/blog/category/{tag}` so Googlebot can discover category pages and related content.
4. **Table of Contents uses `preventDefault`** -- The ToC anchors call `e.preventDefault()` and use JS scrolling, which means Googlebot cannot follow these links to discover in-page content anchors. The `href` should work natively with JS as progressive enhancement.
5. **Related articles are static** -- All blog posts show the same 3 `relatedPosts`. They should show contextually relevant articles based on category/tags to create a richer internal link graph.

## Changes

### File 1: `src/pages/BlogPost.tsx` -- Add breadcrumbs + link tags + fix ToC

- Add visible breadcrumb navigation: Home > Blog > Category > Article Title
- Add BreadcrumbList JSON-LD structured data for Google rich results
- Make tag badges link to `/blog/category/{tag-slug}`
- Fix ToC anchor links to not prevent default (allow native navigation, enhance with smooth scroll)
- Show category-relevant related articles instead of static ones

### File 2: `src/pages/Blog.tsx` -- Add internal links to categories

- Add a category navigation section with links to all category pages, giving Googlebot paths to discover category listings

### File 3: `src/pages/Index.tsx` -- Add category links section

- Add a "Browse by Category" section with links to blog categories, creating more entry points for the crawler from the homepage

