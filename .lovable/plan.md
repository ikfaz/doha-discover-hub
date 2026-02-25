

# Broken Links Audit

## Problem

15 blog posts listed on the Blog page (`Blog.tsx`) link to slugs that **do not exist** in the article data (`blog-data.ts`). When clicked, they silently fall back to the `default` article (Top 10 Attractions), showing wrong content with no error indication.

## Broken Slugs (15 total)

These slugs appear in `Blog.tsx` listing but have no matching entry in `blog-data.ts`:

```text
1.  top-attractions-doha          (id: 1)
2.  authentic-qatari-cuisine      (id: 2)
3.  summer-cultural-events        (id: 3)
4.  museum-islamic-art            (id: 4)
5.  doha-shopping-guide           (id: 5)
6.  qatar-expat-guide             (id: 6)
7.  arabic-coffee-culture         (id: 7)
8.  desert-adventures             (id: 8)
9.  doha-architecture             (id: 9)
10. family-activities             (id: 10)
11. weekend-getaways              (id: 11)
12. qatari-crafts                 (id: 12)
13. doha-beaches                  (id: 113)
14. ramadan-guide                 (id: 114)
15. sustainable-tourism           (id: 115)
```

These are the older "seed" articles (IDs 1-12 and 113-115). They have listing cards with titles, excerpts, and images in `Blog.tsx`, but no actual article content was ever created for them in `blog-data.ts`.

## Root Cause

`Blog.tsx` maintains its own separate `allPosts` array with 50+ entries. `blog-data.ts` contains only ~42 article data objects. The 15 older posts were never migrated or written. The `BlogPost.tsx` renderer silently falls back to `blogPosts['default']` when a slug is missing, masking the problem.

## Plan

### Option A: Remove broken listings (quick fix)
Remove the 15 broken slug entries from the `allPosts` array in `Blog.tsx` so users never see cards that lead to wrong content. This is the fastest fix.

### Option B: Create stub articles (comprehensive fix)
Add 15 new article entries to `blog-data.ts` with proper content for each topic. This preserves the blog's breadth but requires writing ~15 articles.

### Recommended: Option A now, Option B later
1. **Remove the 15 broken entries** from `Blog.tsx`'s `allPosts` array (and their unused image imports)
2. **Update the `default` fallback** in `BlogPost.tsx` to redirect to `/blog` or show a 404 instead of silently showing wrong content
3. **Remove the duplicate ID conflicts** — `Blog.tsx` has two entries with `id: '11'` and two with `id: '12'`

### Files to edit
- `src/pages/Blog.tsx` — Remove 15 broken post entries and their image imports
- `src/pages/BlogPost.tsx` — Add proper handling when slug is not found (redirect to 404 or blog listing)

