# SEO Audit Recovery Checklist (No-JS Safe)

## Deployment command requirement
- Use `npm run build` for production builds.
- Do not use `vite build` directly, because postbuild SEO steps (prerender, sitemap images/index, prerender coverage, seo check) will be skipped.

## Pre-deploy baseline capture
- Export affected URL lists from your SEO audit tool for:
  - duplicate title
  - duplicate meta description
  - missing H1
  - large JS/CSS pages
- Save before/after counts for comparison.

## Local verification commands
```bash
npm run build
npm run links:crawl:strict
npm run seo:check
```

## Post-deploy verification
- Validate:
  - `/index.html` redirects to `/` with `301`.
  - `/blog/index.html` redirects to `/blog` with `301`.
  - unknown `/blog/tag/*` redirects to `/blog` with `301`.
  - `/llms.txt` is reachable.
- Re-run site audit:
  - Start from sitemap
  - Crawl depth 100+ pages
  - JS rendering disabled
