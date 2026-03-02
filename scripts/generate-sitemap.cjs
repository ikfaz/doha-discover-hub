const fs = require("fs");
const path = require("path");

const SITE_URL = "https://experiencedoha.com";
const ROOT_DIR = path.resolve(__dirname, "..");
const BLOG_META_PATH = path.join(ROOT_DIR, "src", "data", "articles", "blog-meta.ts");
const TOURS_PATH = path.join(ROOT_DIR, "src", "data", "tours.ts");
const SITEMAP_PATH = path.join(ROOT_DIR, "public", "sitemap.xml");
const MIN_POSTS_TO_INDEX_CATEGORY = 2;
const MIN_POSTS_TO_INDEX_TAG = 2;

const MOJIBAKE_PATTERN = /[\u00C2\u00C3\u00D8\u00D9]|Ã¢/;

const fixMojibake = (value) => {
  if (!value || !MOJIBAKE_PATTERN.test(value)) {
    return value;
  }

  try {
    const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0) & 0xff);
    const decoded = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    return decoded.includes("\uFFFD") ? value : decoded;
  } catch {
    return value;
  }
};

const slugify = (value) =>
  fixMojibake(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

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
    const categoryMatch = body.match(/category:\s*'([^']+)'/);
    const tagsMatch = body.match(/tags:\s*\[([\s\S]*?)\]/);

    const tags = [];
    if (tagsMatch) {
      for (const tagMatch of tagsMatch[1].matchAll(/'((?:\\'|[^'])*)'/g)) {
        tags.push(tagMatch[1].replace(/\\'/g, "'"));
      }
    }

    items.push({
      slug,
      isoDate: isoDateMatch ? isoDateMatch[1] : null,
      isoModifiedDate: isoModifiedDateMatch ? isoModifiedDateMatch[1] : null,
      category: categoryMatch ? categoryMatch[1] : null,
      tags,
    });
  }

  return items;
};

const parseTourSlugs = () => {
  const source = fs.readFileSync(TOURS_PATH, "utf8");
  return [...source.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
};

const toTimestamp = (isoDate) => {
  const timestamp = Date.parse(isoDate);
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const formatDate = (isoDate) => (isoDate ? isoDate.slice(0, 10) : "2026-03-02");

const main = () => {
  const posts = parseBlogMeta();
  const tourSlugs = parseTourSlugs();

  const datedPosts = posts.filter((post) => post.isoDate);
  const getLastmod = (post) => post.isoModifiedDate || post.isoDate;
  const latestPostDate = datedPosts
    .map((post) => getLastmod(post))
    .sort((a, b) => toTimestamp(b) - toTimestamp(a))[0] || "2026-03-02";

  const categoryLastmod = new Map();
  const categoryPostCounts = new Map();
  const tagLastmod = new Map();
  const tagPostCounts = new Map();

  for (const post of datedPosts) {
    if (post.category) {
      const key = slugify(post.category);
      categoryPostCounts.set(key, (categoryPostCounts.get(key) || 0) + 1);
      const current = categoryLastmod.get(key);
      const postLastmod = getLastmod(post);
      if (!current || toTimestamp(postLastmod) > toTimestamp(current)) {
        categoryLastmod.set(key, postLastmod);
      }
    }

    for (const tag of post.tags) {
      const key = slugify(tag);
      tagPostCounts.set(key, (tagPostCounts.get(key) || 0) + 1);
      const current = tagLastmod.get(key);
      const postLastmod = getLastmod(post);
      if (!current || toTimestamp(postLastmod) > toTimestamp(current)) {
        tagLastmod.set(key, postLastmod);
      }
    }
  }

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

  let includedCategoryCount = 0;
  for (const [slug, lastmod] of [...categoryLastmod.entries()].sort((a, b) =>
    a[0].localeCompare(b[0]),
  )) {
    if ((categoryPostCounts.get(slug) || 0) < MIN_POSTS_TO_INDEX_CATEGORY) {
      continue;
    }
    includedCategoryCount += 1;
    addUrl({
      loc: `/blog/category/${slug}`,
      lastmod,
      changefreq: "weekly",
      priority: "0.7",
    });
  }

  let includedTagCount = 0;
  for (const [slug, lastmod] of [...tagLastmod.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    if ((tagPostCounts.get(slug) || 0) < MIN_POSTS_TO_INDEX_TAG) {
      continue;
    }
    includedTagCount += 1;
    addUrl({
      loc: `/blog/tag/${slug}`,
      lastmod,
      changefreq: "weekly",
      priority: "0.6",
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
    ...urls.map(
      ({ loc, lastmod, changefreq, priority }) =>
        `  <url>\n    <loc>${escapeXml(`${SITE_URL}${loc}`)}</loc>\n    <lastmod>${formatDate(
          lastmod,
        )}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");

  fs.writeFileSync(SITEMAP_PATH, xml, "utf8");
  console.log(`Generated sitemap with ${urls.length} URLs.`);
  console.log(
    `Categories included: ${includedCategoryCount} (min posts: ${MIN_POSTS_TO_INDEX_CATEGORY})`,
  );
  console.log(`Tags included: ${includedTagCount} (min posts: ${MIN_POSTS_TO_INDEX_TAG})`);
  console.log(`Blog posts included: ${datedPosts.length}`);
};

main();
