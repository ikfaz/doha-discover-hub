const fs = require("fs");
const path = require("path");

const SITE_URL = "https://experiencedoha.com";
const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const DIST_INDEX_PATH = path.join(DIST_DIR, "index.html");
const BLOG_META_PATH = path.join(ROOT_DIR, "src", "data", "articles", "blog-meta.ts");
const TOURS_PATH = path.join(ROOT_DIR, "src", "data", "tours.ts");

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=2670&auto=format&fit=crop";

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

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const stripHtml = (value) => String(value ?? "").replace(/<[^>]*>/g, "").trim();
const YEAR_TOKEN_REGEX = /\b(20\d{2})\b/g;

const extractYear = (value) => {
  const matches = [...String(value ?? "").matchAll(YEAR_TOKEN_REGEX)].map((match) => Number(match[1]));
  if (matches.length === 0) {
    return null;
  }
  return Math.max(...matches);
};

const getHistoricalSlugCanonicalNote = (slug, title) => {
  const slugYear = extractYear(slug);
  const titleYear = extractYear(title);
  if (!slugYear || !titleYear || slugYear >= titleYear) {
    return null;
  }

  return `This URL keeps its original ${slugYear} slug for link stability. Content is updated for ${titleYear}.`;
};

const toJsonLdAuthor = (name) => {
  const normalized = String(name || "Experience Doha Team").trim() || "Experience Doha Team";
  const organizationAuthorPatterns = [/\bteam\b/i, /experiencedoha/i, /experience doha/i, /\.com$/i];
  const isOrganization = organizationAuthorPatterns.some((pattern) => pattern.test(normalized));
  return {
    "@type": isOrganization ? "Organization" : "Person",
    name: normalized,
  };
};

const getValue = (body, key) => {
  const match = body.match(new RegExp(`${key}:\\s*'((?:\\\\'|[^'])*)'`));
  if (!match) {
    return "";
  }
  return fixMojibake(match[1].replace(/\\'/g, "'").replace(/\\n/g, "\n"));
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
    const tagsMatch = body.match(/tags:\s*\[([\s\S]*?)\]/);
    const tags = [];

    if (tagsMatch) {
      for (const tagMatch of tagsMatch[1].matchAll(/'((?:\\'|[^'])*)'/g)) {
        tags.push(fixMojibake(tagMatch[1].replace(/\\'/g, "'")));
      }
    }

    items.push({
      slug,
      title: getValue(body, "title"),
      description: getValue(body, "metaDescription") || getValue(body, "excerpt"),
      excerpt: getValue(body, "excerpt"),
      category: getValue(body, "category"),
      author: getValue(body, "author") || "Experience Doha Team",
      isoDate: isoDateMatch ? isoDateMatch[1] : "",
      isoModifiedDate: isoModifiedDateMatch ? isoModifiedDateMatch[1] : "",
      tags,
    });
  }

  return items.sort((a, b) => Date.parse(b.isoDate || "1970-01-01") - Date.parse(a.isoDate || "1970-01-01"));
};

const parseTours = () => {
  const source = fs.readFileSync(TOURS_PATH, "utf8");
  const sectionMatch = source.match(/export const tours:\s*Tour\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  if (!sectionMatch) {
    return [];
  }

  const section = sectionMatch[1];
  const blockRegex = /\{\s*slug:\s*'([^']+)'([\s\S]*?)\n\s*\},/g;
  const items = [];

  for (const match of section.matchAll(blockRegex)) {
    const slug = match[1];
    const body = match[2];
    items.push({
      slug,
      title: getValue(body, "title"),
      subtitle: getValue(body, "subtitle"),
      overview: getValue(body, "overview"),
    });
  }

  return items;
};

const upsertTag = (html, regex, replacement, fallback) => {
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace("</head>", `${fallback}\n</head>`);
};

const upsertMeta = (html, attr, key, content) => {
  const escaped = escapeHtml(content);
  const regex = new RegExp(`<meta\\s+${attr}=["']${key}["'][^>]*>`, "i");
  return upsertTag(
    html,
    regex,
    `<meta ${attr}="${key}" content="${escaped}" />`,
    `<meta ${attr}="${key}" content="${escaped}" />`,
  );
};

const upsertLinkRel = (html, rel, href) => {
  const escaped = escapeHtml(href);
  const regex = new RegExp(`<link\\s+rel=["']${rel}["'][^>]*>`, "i");
  return upsertTag(html, regex, `<link rel="${rel}" href="${escaped}" />`, `<link rel="${rel}" href="${escaped}" />`);
};

const withSeo = (templateHtml, page) => {
  const canonicalUrl = `${SITE_URL}${page.path}`;
  let html = templateHtml;

  html = upsertTag(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(page.title)}</title>`,
    `<title>${escapeHtml(page.title)}</title>`,
  );

  html = upsertMeta(html, "name", "description", page.description);
  html = upsertMeta(html, "name", "robots", page.noindex ? "noindex, nofollow" : "index, follow");
  html = upsertMeta(html, "property", "og:type", page.type || "website");
  html = upsertMeta(html, "property", "og:url", canonicalUrl);
  html = upsertMeta(html, "property", "og:title", page.title);
  html = upsertMeta(html, "property", "og:description", page.description);
  html = upsertMeta(html, "property", "og:image", page.image || DEFAULT_IMAGE);
  if (page.publishedTime) {
    html = upsertMeta(html, "property", "article:published_time", page.publishedTime);
  }
  if (page.modifiedTime) {
    html = upsertMeta(html, "property", "article:modified_time", page.modifiedTime);
  }
  html = upsertMeta(html, "name", "twitter:card", "summary_large_image");
  html = upsertMeta(html, "name", "twitter:url", canonicalUrl);
  html = upsertMeta(html, "name", "twitter:title", page.title);
  html = upsertMeta(html, "name", "twitter:description", page.description);
  html = upsertMeta(html, "name", "twitter:image", page.image || DEFAULT_IMAGE);
  html = upsertLinkRel(html, "canonical", canonicalUrl);

  const staticBody = page.bodyHtml || "";
  html = html.replace('<div id="root"></div>', `<div id="root">${staticBody}</div>`);

  if (page.jsonLd) {
    const entries = Array.isArray(page.jsonLd) ? page.jsonLd : [page.jsonLd];
    const scripts = entries
      .map((entry) => `<script type="application/ld+json">${JSON.stringify(entry)}</script>`)
      .join("\n");
    html = html.replace("</head>", `${scripts}\n</head>`);
  }

  return html;
};

const writeRoute = (html, routePath) => {
  if (routePath === "/") {
    fs.writeFileSync(DIST_INDEX_PATH, html, "utf8");
    return;
  }

  const relative = routePath.replace(/^\/+/, "");
  const targetDir = path.join(DIST_DIR, relative);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf8");
};

const buildPages = (blogPosts, tours) => {
  const pages = [
    {
      path: "/",
      title: "Experience Doha - Ultimate Guide to Qatar Travel & Attractions 2026",
      description:
        "Discover the best things to do in Doha, Qatar. Expert guides on attractions, culture, food, layovers, and experiences.",
      bodyHtml:
        '<main><h1>Experience Doha</h1><p>Guides for attractions, layovers, expat life, and local experiences in Qatar.</p><p><a href="/blog">Read the latest blog posts</a></p></main>',
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Experience Doha",
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    },
    {
      path: "/blog",
      title: "Experience Doha Blog - Qatar Travel Guide & Expat Tips",
      description:
        "Browse expert Doha guides, layover itineraries, expat tips, visa updates, and local insights.",
      bodyHtml:
        '<main><h1>Experience Doha Blog</h1><p>Explore practical guides and updates for travel and life in Qatar.</p></main>',
    },
    {
      path: "/about",
      title: "About Experience Doha",
      description: "Learn about Experience Doha and our mission to provide practical Qatar travel and expat guidance.",
      bodyHtml: '<main><h1>About Experience Doha</h1><p>Trusted local guidance for visitors and expats in Doha.</p></main>',
    },
    {
      path: "/gallery",
      title: "Doha Photo Gallery - Experience Doha",
      description: "View Doha photos featuring cityscapes, landmarks, culture, and local experiences.",
      bodyHtml: '<main><h1>Doha Gallery</h1><p>A visual collection of Doha landmarks, culture, and city life.</p></main>',
    },
    {
      path: "/contact",
      title: "Contact Us - Experience Doha",
      description: "Contact Experience Doha for travel questions, suggestions, and collaboration inquiries.",
      bodyHtml: '<main><h1>Contact Experience Doha</h1><p>Get in touch for travel support and partnerships.</p></main>',
    },
    {
      path: "/budget-planner",
      title: "Doha Expat Budget Planner - Calculate Living Costs in Qatar",
      description: "Estimate monthly living costs in Doha for singles and families with our free planner.",
      bodyHtml:
        '<main><h1>Doha Expat Budget Planner</h1><p>Estimate rent, groceries, transport, and other monthly costs in Qatar.</p></main>',
    },
  ];

  const categoryMap = new Map();
  const tagMap = new Map();

  for (const post of blogPosts) {
    if (post.category) {
      const categorySlug = slugify(post.category);
      if (!categoryMap.has(categorySlug)) {
        categoryMap.set(categorySlug, { name: post.category, posts: [] });
      }
      categoryMap.get(categorySlug).posts.push(post);
    }

    for (const tag of post.tags) {
      const tagSlug = slugify(tag);
      if (!tagMap.has(tagSlug)) {
        tagMap.set(tagSlug, { name: tag, posts: [] });
      }
      tagMap.get(tagSlug).posts.push(post);
    }
  }

  for (const post of blogPosts) {
    const description = stripHtml(post.description || post.excerpt || "");
    const slugNote = getHistoricalSlugCanonicalNote(post.slug, post.title);
    const articleBody = [
      "<main><article>",
      `<h1>${escapeHtml(post.title)}</h1>`,
      `<p>${escapeHtml(description)}</p>`,
      slugNote ? `<p><strong>Canonical URL note:</strong> ${escapeHtml(slugNote)}</p>` : "",
      `<p>Category: <a href="/blog/category/${slugify(post.category)}">${escapeHtml(post.category)}</a></p>`,
      `<p><a href="/blog">Back to Blog</a></p>`,
      "</article></main>",
    ].join("");

    pages.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Doha Guide`,
      description,
      type: "article",
      publishedTime: post.isoDate || undefined,
      modifiedTime: post.isoModifiedDate || post.isoDate || undefined,
      bodyHtml: articleBody,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        datePublished: post.isoDate || undefined,
        dateModified: post.isoModifiedDate || post.isoDate || undefined,
        author: toJsonLdAuthor(post.author || "Experience Doha Team"),
        publisher: {
          "@type": "Organization",
          name: "Experience Doha",
          url: SITE_URL,
        },
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        description,
      },
    });
  }

  for (const [slug, info] of [...categoryMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const links = info.posts
      .slice(0, 15)
      .map((post) => `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></li>`)
      .join("");
    pages.push({
      path: `/blog/category/${slug}`,
      title: `${info.name} in Doha - Experience Doha Blog`,
      description: `Browse ${info.posts.length} article(s) in ${info.name}.`,
      noindex: info.posts.length <= 1,
      bodyHtml: `<main><h1>${escapeHtml(info.name)}</h1><ul>${links}</ul><p><a href="/blog">View all posts</a></p></main>`,
    });
  }

  for (const [slug, info] of [...tagMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const links = info.posts
      .slice(0, 15)
      .map((post) => `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></li>`)
      .join("");
    pages.push({
      path: `/blog/tag/${slug}`,
      title: `Posts tagged: ${info.name} - Experience Doha Blog`,
      description: `Browse ${info.posts.length} article(s) tagged with "${info.name}".`,
      noindex: info.posts.length <= 1,
      bodyHtml: `<main><h1>${escapeHtml(info.name)}</h1><ul>${links}</ul><p><a href="/blog">View all posts</a></p></main>`,
    });
  }

  for (const tour of tours) {
    const overview = stripHtml(tour.overview).split(/\s+/).slice(0, 55).join(" ");
    pages.push({
      path: `/tour/${tour.slug}`,
      title: `${tour.title} | Experience Doha`,
      description: tour.subtitle || overview,
      bodyHtml: `<main><h1>${escapeHtml(tour.title)}</h1><p>${escapeHtml(tour.subtitle || "")}</p><p>${escapeHtml(
        overview,
      )}</p></main>`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: tour.title,
        description: tour.subtitle || overview,
        url: `${SITE_URL}/tour/${tour.slug}`,
      },
    });
  }

  return pages;
};

const main = () => {
  if (!fs.existsSync(DIST_INDEX_PATH)) {
    throw new Error("dist/index.html not found. Run build before prerender.");
  }

  const template = fs.readFileSync(DIST_INDEX_PATH, "utf8");
  const blogPosts = parseBlogMeta();
  const tours = parseTours();
  const pages = buildPages(blogPosts, tours);

  for (const page of pages) {
    const html = withSeo(template, page);
    writeRoute(html, page.path);
  }

  console.log(`Prerendered ${pages.length} routes.`);
};

main();
