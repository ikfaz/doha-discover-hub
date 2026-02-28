import fs from 'fs';
import path from 'path';

// Mock assets for Node.js environment to avoid errors with image imports
const extensions = ['.jpg', '.jpeg', '.png', '.svg', '.gif', '.webp'];
extensions.forEach(ext => {
  // @ts-ignore
  if (typeof require !== 'undefined' && require.extensions) {
     // @ts-ignore
    require.extensions[ext] = () => null;
  }
});

// Import data
// Note: Run this script with ts-node and tsconfig-paths to resolve aliases
// npx ts-node -r tsconfig-paths/register generateSitemap.ts
import { blogPosts } from './src/data/articles/blog-data';

const BASE_URL = 'https://experiencedoha.com';

interface SitemapRoute {
  url: string;
  lastmod?: string;
  changefreq: string;
  priority: string;
}

const staticRoutes: SitemapRoute[] = [
  { url: '', changefreq: 'daily', priority: '1.0' },
  { url: '/about', changefreq: 'monthly', priority: '0.8' },
  { url: '/blog', changefreq: 'daily', priority: '0.9' },
  { url: '/videos', changefreq: 'weekly', priority: '0.8' },
  { url: '/gallery', changefreq: 'weekly', priority: '0.8' },
  { url: '/contact', changefreq: 'monthly', priority: '0.7' },
  { url: '/budget-planner', changefreq: 'monthly', priority: '0.8' },
  { url: '/privacy-policy', changefreq: 'yearly', priority: '0.5' },
  { url: '/terms-of-service', changefreq: 'yearly', priority: '0.5' },
  { url: '/cookie-policy', changefreq: 'yearly', priority: '0.5' },
];

const categories = ['attractions', 'food', 'culture', 'events', 'lifestyle', 'expat-tips'];

const generateSitemap = () => {
  const routes: SitemapRoute[] = [...staticRoutes];

  // Add Categories
  categories.forEach(cat => {
    routes.push({
      url: `/blog/category/${cat}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });

  // Add Blog Posts
  Object.values(blogPosts).forEach(post => {
    // Ensure we have a valid date for lastmod
    let lastmod = post.isoDate;
    if (!lastmod && post.date) {
      const date = new Date(post.date);
      if (!isNaN(date.getTime())) {
        lastmod = date.toISOString().split('T')[0];
      }
    }
    
    routes.push({
      url: `/blog/${post.slug}`,
      lastmod,
      changefreq: 'monthly',
      priority: '0.7'
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(route => {
    return `  <url>
    <loc>${BASE_URL}${route.url}</loc>${route.lastmod ? `\n    <lastmod>${route.lastmod}</lastmod>` : ''}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log(`Sitemap generated with ${routes.length} URLs at public/sitemap.xml`);
};

generateSitemap();