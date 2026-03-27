const fs = require("fs");
const path = require("path");

const SITE_URL = "https://experiencedoha.com";
const ROOT_DIR = path.resolve(__dirname, "..");
const BLOG_META_PATH = path.join(ROOT_DIR, "src", "data", "articles", "blog-meta.ts");
const TOURS_PATH = path.join(ROOT_DIR, "src", "data", "tours.ts");
const SITEMAP_PATH = path.join(ROOT_DIR, "public", "sitemap.xml");

const escapeXml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toTimestamp = (value) => {
  const timestamp = Date.parse(String(value ?? ""));
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const formatDate = (value) => {
  const timestamp = Date.parse(String(value ?? ""));
  if (!Number.isFinite(timestamp)) {
    return null;
  }
  return new Date(timestamp).toISOString().slice(0, 10);
};

const parseBlogMeta = () => {
  const source = fs.readFileSync(BLOG_META_PATH, "utf8");
  const blockRegex = /'([^']+)':\s*\{([\s\S]*?)\n\s*\},/g;
  const items = [];

  for (const match of source.matchAll(blockRegex)) {
    const slug = match[1];
    if (slug === "default") {
      continue;
    }

    const body = match[2];
    const isoDateMatch = body.match(/isoDate:\s*'([^']+)'/);
    const isoModifiedDateMatch = body.match(/isoModifiedDate:\s*'([^']+)'/);

    items.push({
      slug,
      isoDate: isoDateMatch ? isoDateMatch[1] : null,
      isoModifiedDate: isoModifiedDateMatch ? isoModifiedDateMatch[1] : null,
    });
  }

  return items;
};

const parseTourSlugs = () => {
  const source = fs.readFileSync(TOURS_PATH, "utf8");
  return [...source.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
};

const main = () => {
  const posts = parseBlogMeta();
  const tourSlugs = parseTourSlugs();
  const datedPosts = posts.filter((post) => post.isoDate);
  const getLastmod = (post) => post.isoModifiedDate || post.isoDate;

  const latestPostDate =
    [...datedPosts]
      .map((post) => getLastmod(post))
      .filter(Boolean)
      .sort((a, b) => toTimestamp(b) - toTimestamp(a))[0] || null;

  const urls = [];
  const addUrl = ({ loc, lastmod, changefreq, priority }) => {
    urls.push({ loc, lastmod, changefreq, priority });
  };

  addUrl({ loc: "/", lastmod: latestPostDate, changefreq: "daily", priority: "1.0" });
  addUrl({ loc: "/blog", lastmod: latestPostDate, changefreq: "daily", priority: "0.9" });
  addUrl({ loc: "/gallery", lastmod: latestPostDate, changefreq: "weekly", priority: "0.7" });
  addUrl({ loc: "/about", lastmod: latestPostDate, changefreq: "monthly", priority: "0.6" });
  addUrl({ loc: "/contact", lastmod: latestPostDate, changefreq: "monthly", priority: "0.6" });
  addUrl({
    loc: "/budget-planner",
    lastmod: latestPostDate,
    changefreq: "monthly",
    priority: "0.7",
  });

  for (const slug of [...new Set(tourSlugs)].sort()) {
    addUrl({
      loc: `/tour/${slug}`,
      lastmod: latestPostDate,
      changefreq: "weekly",
      priority: "0.9",
    });
  }

  for (const post of [...datedPosts].sort((a, b) => toTimestamp(getLastmod(b)) - toTimestamp(getLastmod(a)))) {
    addUrl({
      loc: `/blog/${post.slug}`,
      lastmod: getLastmod(post),
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(({ loc, lastmod, changefreq, priority }) => {
      const normalizedLastmod = formatDate(lastmod);
      const lastmodXml = normalizedLastmod ? `\n    <lastmod>${normalizedLastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${escapeXml(`${SITE_URL}${loc}`)}</loc>${lastmodXml}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    }),
    "</urlset>",
    "",
  ].join("\n");

  fs.writeFileSync(SITEMAP_PATH, xml, "utf8");
  console.log(`Generated sitemap with ${urls.length} URLs.`);
  console.log(`Tour URLs included: ${[...new Set(tourSlugs)].length}`);
  console.log(`Blog post URLs included: ${datedPosts.length}`);
};

main();
