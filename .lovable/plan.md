

# BlogPost.tsx Refactor Plan

## Problem
`BlogPost.tsx` is ~10,000 lines containing ~30+ article data objects inline plus rendering logic, all in one file. This hurts build performance (no code splitting for article content), developer experience, and maintainability.

## Architecture

```text
src/
├── pages/
│   └── BlogPost.tsx          ← Lean renderer (~200 lines)
├── data/
│   └── articles/
│       ├── index.ts           ← Re-exports all articles as Record<slug, ArticleData>
│       ├── types.ts           ← ArticleData interface
│       ├── related-posts.ts   ← Related posts array
│       ├── end-of-service-gratuity-qatar-2025.ts
│       ├── qatar-labor-law-reforms-2025.ts
│       ├── qatar-work-visa-guide-2025.ts
│       ├── qatar-tax-guide-2025.ts
│       ├── expat-salaries-doha-2025.ts
│       ├── job-market-qatar-2025.ts
│       ├── housing-rent-doha-2025.ts
│       ├── cost-of-living-doha-dubai-riyadh.ts
│       ├── alcohol-guide-doha.ts
│       ├── remote-work-cafes-doha-guide.ts
│       ├── gyms-fitness-doha-guide.ts
│       ├── hiring-maid-nanny-qatar-guide.ts
│       ├── pet-import-qatar-guide.ts
│       ├── doha-metro-2025-guide.ts
│       ├── grocery-shopping-doha-guide.ts
│       ├── mobile-plans-qatar-guide.ts
│       ├── bank-account-qatar-guide.ts
│       ├── lgbtq-experiences-qatar-2025.ts
│       ├── driving-doha-2025-guide.ts
│       ├── renting-doha-west-bay-al-waab-2025.ts
│       ├── qatar-visa-rules-expats-2025.ts
│       ├── international-schools-qatar-2025.ts
│       ├── women-safety-dress-code-doha-qatar.ts
│       ├── cost-of-living-doha-2025.ts
│       ├── doha-changing-middle-east.ts
│       └── ... (remaining ~30 articles, one file each)
```

## Detailed Steps

### 1. Create `src/data/articles/types.ts`
Define an `ArticleData` interface with fields: `id`, `title`, `date`, `author`, `readTime`, `category`, `imageUrl`, `tags`, `content`, `excerpt?`, `metaDescription?`, `tableOfContents?`. Also define a `RelatedPost` type.

### 2. Create one file per article (~30 files)
Each file in `src/data/articles/` exports a single `ArticleData` object. The file imports its own image asset and contains only its data. Example:

```ts
// src/data/articles/end-of-service-gratuity-qatar-2025.ts
import { ArticleData } from './types';
import endOfServiceGratuityImage from '@/assets/end-of-service-gratuity-qatar-2025.jpg';

export const article: ArticleData = {
  id: '61',
  title: 'The Final Payout: ...',
  // ... all fields
};
```

### 3. Create `src/data/articles/index.ts`
Imports all individual article files and re-exports them as a single `Record<string, ArticleData>` map keyed by slug.

### 4. Create `src/data/articles/related-posts.ts`
Extracts the `relatedPosts` array currently hardcoded in `BlogPost.tsx`.

### 5. Rewrite `BlogPost.tsx` as a lean renderer (~200 lines)
- Import `blogPosts` from `@/data/articles`
- Import `relatedPosts` from `@/data/articles/related-posts`
- Keep the slug-based conditional rendering for interactive components (the `slug === 'x' ? ...` blocks around lines 9520-9880) since those inject React components inline with content
- Remove all article data objects and image imports
- Keep: SEO head, hero, table of contents, share buttons, content rendering, sidebar, Viator banner, related articles, newsletter, footer

### 6. Slug-based component injection
The current pattern splits HTML content at specific `<h2>` tags to inject interactive components (calculators, comparison tools). This logic stays in `BlogPost.tsx` as it's rendering logic, not data. A helper map `slugComponents: Record<string, { splitAt: string, component: ReactNode }>` can clean up the if/else chain.

## Impact
- Each article file: ~50-500 lines (manageable)
- `BlogPost.tsx`: drops from ~10,000 to ~300 lines
- No behavioral changes -- purely structural refactor
- Image imports are distributed to their respective article files, reducing the import block
- Future articles are added by creating a single new file and adding one import to `index.ts`

