const fs = require("fs");
const path = require("path");

const SITE_URL = "https://experiencedoha.com";
const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const DIST_INDEX_PATH = path.join(DIST_DIR, "index.html");
const BLOG_META_PATH = path.join(ROOT_DIR, "src", "data", "articles", "blog-meta.ts");
const TOURS_PATH = path.join(ROOT_DIR, "src", "data", "tours.ts");
const TOPIC_HUBS_PATH = path.join(ROOT_DIR, "src", "data", "articles", "topic-hubs.json");
const ARTICLE_PRIMARY_HUB_PATH = path.join(ROOT_DIR, "src", "data", "articles", "article-primary-hub.json");
const DIST_ASSETS_DIR = path.join(DIST_DIR, "assets");

const DEFAULT_IMAGE = `${SITE_URL}/og-default.jpg`;

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

const CATEGORY_EDITORIAL_INTROS = {
  attractions:
    "Editorial picks for museums, souqs, waterfront walks, and signature Doha sights that are worth your time.",
  culture:
    "Context-rich guides to Qatari traditions, etiquette, and cultural landmarks for visitors and new residents.",
  events: "Curated event coverage with practical planning details, timing context, and what to prioritize first.",
  "expat-tips":
    "Practical expat guidance on visas, housing, salaries, and daily life decisions in Doha and wider Qatar.",
  food: "Local food coverage focused on where to start, what to order, and how to understand the Doha dining scene.",
  lifestyle:
    "Lifestyle coverage on neighborhoods, routines, and high-value ways to navigate day-to-day life in Doha.",
};

const getArticleLabel = (count) => `${count} article${count === 1 ? "" : "s"}`;

const buildCategoryArchiveIntro = (categoryName, posts) => {
  if (!categoryName) {
    return "Explore Doha blog topics with practical, editorially reviewed guides for planning and daily life.";
  }

  const count = posts.length;
  const slug = slugify(categoryName);
  const baseIntro =
    CATEGORY_EDITORIAL_INTROS[slug] ||
    `Editorial guides on ${categoryName} with practical context for traveling, living, and planning in Doha.`;
  const leadTitle = posts[0] ? posts[0].title : "";
  const leadSentence = leadTitle ? ` Start with "${leadTitle}" for a quick entry point.` : "";

  return `${baseIntro} This archive currently includes ${getArticleLabel(count)}.${leadSentence}`;
};

const getValue = (body, key) => {
  const match = body.match(new RegExp(`${key}:\\s*'((?:\\\\'|[^'])*)'`));
  if (!match) {
    return "";
  }
  return fixMojibake(match[1].replace(/\\'/g, "'").replace(/\\n/g, "\n"));
};

const parseBlogImageImportMap = (source) => {
  const map = new Map();
  const importRegex = /import\s+([A-Za-z0-9_$]+)\s+from\s+['"]@\/assets\/([^'"]+?)(?:\?url)?['"];?/g;

  for (const match of source.matchAll(importRegex)) {
    const importVar = match[1];
    const sourceAssetPath = match[2];
    map.set(importVar, path.basename(sourceAssetPath));
  }

  return map;
};

const buildDistAssetUrlMap = () => {
  const map = new Map();
  if (!fs.existsSync(DIST_ASSETS_DIR)) {
    return map;
  }

  const files = fs.readdirSync(DIST_ASSETS_DIR, { withFileTypes: true });
  for (const file of files) {
    if (!file.isFile()) {
      continue;
    }

    const distFile = file.name;
    const extension = path.extname(distFile).toLowerCase();
    if (!extension) {
      continue;
    }

    const stem = distFile.slice(0, -extension.length);
    const unhashedStem = stem.replace(/-[a-z0-9]{6,}$/i, "");
    const sourceFileName = `${unhashedStem}${extension}`;
    map.set(sourceFileName, `${SITE_URL}/assets/${distFile}`);
  }

  return map;
};

const parseBlogMeta = () => {
  const source = fs.readFileSync(BLOG_META_PATH, "utf8");
  const imageImportMap = parseBlogImageImportMap(source);
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
    const imageRefMatch = body.match(/imageUrl:\s*([A-Za-z0-9_$]+)/);
    const imageImportVar = imageRefMatch ? imageRefMatch[1] : "";
    const imageFileName = imageImportVar ? imageImportMap.get(imageImportVar) || "" : "";

    items.push({
      slug,
      title: getValue(body, "title"),
      description: getValue(body, "metaDescription") || getValue(body, "excerpt"),
      excerpt: getValue(body, "excerpt"),
      category: getValue(body, "category"),
      author: getValue(body, "author") || "Experience Doha Team",
      isoDate: isoDateMatch ? isoDateMatch[1] : "",
      isoModifiedDate: isoModifiedDateMatch ? isoModifiedDateMatch[1] : "",
      imageFileName,
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

const parseTopicHubs = () => {
  const raw = fs.readFileSync(TOPIC_HUBS_PATH, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .filter((item) => item && typeof item.slug === "string" && typeof item.title === "string")
    .map((item) => ({
      slug: String(item.slug).trim(),
      name: String(item.name || item.title).trim(),
      title: String(item.title).trim(),
      metaDescription: String(item.metaDescription || item.intro || "").trim(),
      intro: String(item.intro || item.metaDescription || "").trim(),
      postSlugs: Array.isArray(item.postSlugs) ? [...new Set(item.postSlugs.map((slug) => String(slug).trim()))] : [],
    }));
};

const parsePrimaryHubMap = () => {
  const raw = fs.readFileSync(ARTICLE_PRIMARY_HUB_PATH, "utf8");
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {};
  }

  const map = {};
  for (const [slug, hubSlug] of Object.entries(parsed)) {
    if (typeof slug !== "string" || typeof hubSlug !== "string") {
      continue;
    }
    map[slug.trim()] = hubSlug.trim();
  }
  return map;
};

const toTimestamp = (post) => {
  const candidate = post.isoDate || "";
  const timestamp = Date.parse(candidate);
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const byRecencyThenSlug = (left, right) => {
  const timestampDelta = toTimestamp(right) - toTimestamp(left);
  if (timestampDelta !== 0) {
    return timestampDelta;
  }
  return left.slug.localeCompare(right.slug);
};

const getSiblingPostsForArticle = (currentPost, allPosts, primaryHubBySlug, limit = 3) => {
  const currentPrimaryHub = primaryHubBySlug[currentPost.slug];
  const scored = allPosts
    .filter((candidate) => candidate.slug !== currentPost.slug)
    .map((candidate) => {
      let score = 0;
      if (currentPrimaryHub && primaryHubBySlug[candidate.slug] === currentPrimaryHub) {
        score += 100;
      }
      if (candidate.category === currentPost.category) {
        score += 30;
      }

      return { post: candidate, score };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return byRecencyThenSlug(left.post, right.post);
    });

  const ranked = scored.filter((item) => item.score > 0).map((item) => item.post).slice(0, limit);
  if (ranked.length > 0) {
    return ranked;
  }

  if (currentPrimaryHub) {
    const sameHubFallback = allPosts
      .filter((candidate) => candidate.slug !== currentPost.slug && primaryHubBySlug[candidate.slug] === currentPrimaryHub)
      .sort(byRecencyThenSlug)
      .slice(0, limit);
    if (sameHubFallback.length > 0) {
      return sameHubFallback;
    }
  }

  return allPosts.filter((candidate) => candidate.slug !== currentPost.slug).sort(byRecencyThenSlug).slice(0, limit);
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

const upsertMetaMany = (html, attr, key, values) => {
  const nonEmptyValues = values.filter((value) => value && String(value).trim());
  if (nonEmptyValues.length === 0) {
    return html;
  }

  const regex = new RegExp(`<meta\\s+${attr}=["']${key}["'][^>]*>\\s*`, "gi");
  const withoutExisting = html.replace(regex, "");
  const tags = nonEmptyValues.map((value) => `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`).join("\n");
  return withoutExisting.replace("</head>", `${tags}\n</head>`);
};

const upsertLinkRel = (html, rel, href) => {
  const escaped = escapeHtml(href);
  const regex = new RegExp(`<link\\s+rel=["']${rel}["'][^>]*>`, "i");
  return upsertTag(html, regex, `<link rel="${rel}" href="${escaped}" />`, `<link rel="${rel}" href="${escaped}" />`);
};

const withSeo = (templateHtml, page) => {
  const canonicalUrl = `${SITE_URL}${page.path}`;
  const primaryImage = page.image || DEFAULT_IMAGE;
  const fallbackImage =
    page.fallbackImage && page.fallbackImage !== primaryImage ? page.fallbackImage : undefined;
  const ogImages = fallbackImage ? [primaryImage, fallbackImage] : [primaryImage];
  const twitterImage = fallbackImage || primaryImage;
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
  html = upsertMetaMany(html, "property", "og:image", ogImages);
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
  html = upsertMeta(html, "name", "twitter:image", twitterImage);
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

const buildBranchRouteSet = (pages) => {
  const branches = new Set();

  for (const page of pages) {
    const segments = page.path.split("/").filter(Boolean);
    for (let i = 1; i < segments.length; i += 1) {
      branches.add(`/${segments.slice(0, i).join("/")}`);
    }
  }

  return branches;
};

const writeRoute = (html, routePath, branchRoutes) => {
  if (routePath === "/") {
    fs.writeFileSync(DIST_INDEX_PATH, html, "utf8");
    return;
  }

  const relative = routePath.replace(/^\/+/, "");
  const shouldWriteLeafFile = !branchRoutes.has(routePath);

  if (shouldWriteLeafFile) {
    const targetPath = path.join(DIST_DIR, relative);
    const targetParent = path.dirname(targetPath);
    fs.mkdirSync(targetParent, { recursive: true });
    fs.writeFileSync(targetPath, html, "utf8");
    return;
  }

  const targetDir = path.join(DIST_DIR, relative);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf8");
};

const buildPages = (blogPosts, tours, topicHubs, primaryHubBySlug, distAssetUrlMap) => {
  const latestPosts = blogPosts.slice(0, 5);
  const latestLinks = latestPosts
    .map((post) => `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></li>`)
    .join("");

  const pages = [
    {
      path: "/",
      title: "Experience Doha - Ultimate Guide to Qatar Travel & Attractions 2026",
      description:
        "Discover the best things to do in Doha, Qatar. Expert guides on attractions, culture, food, layovers, and experiences.",
      bodyHtml: `<main><h1>Experience Doha</h1><p>Guides for attractions, layovers, expat life, and local experiences in Qatar.</p><h2>Latest Articles</h2><ul>${latestLinks}</ul><p><a href="/blog">Read all blog posts</a></p></main>`,
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
  const topicHubBySlug = new Map(topicHubs.map((hub) => [hub.slug, hub]));

  for (const post of blogPosts) {
    if (post.category) {
      const categorySlug = slugify(post.category);
      if (!categoryMap.has(categorySlug)) {
        categoryMap.set(categorySlug, { name: post.category, posts: [] });
      }
      categoryMap.get(categorySlug).posts.push(post);
    }
  }

  for (const post of blogPosts) {
    const description = stripHtml(post.description || post.excerpt || "");
    const resolvedPostImage = post.imageFileName ? distAssetUrlMap.get(post.imageFileName) : undefined;
    const postImage = resolvedPostImage || DEFAULT_IMAGE;
    const isSvgImage = path.extname(post.imageFileName || "").toLowerCase() === ".svg";
    const fallbackImage = isSvgImage && resolvedPostImage ? DEFAULT_IMAGE : undefined;
    const slugNote = getHistoricalSlugCanonicalNote(post.slug, post.title);
    const parentHubSlug = primaryHubBySlug[post.slug];
    const parentHub = parentHubSlug ? topicHubBySlug.get(parentHubSlug) : null;
    const siblingPosts = getSiblingPostsForArticle(post, blogPosts, primaryHubBySlug, 3);
    const siblingLinks = siblingPosts
      .map((item) => `<li><a href="/blog/${item.slug}">${escapeHtml(item.title)}</a></li>`)
      .join("");
    const articleBody = [
      "<main><article>",
      `<h1>${escapeHtml(post.title)}</h1>`,
      `<p>${escapeHtml(description)}</p>`,
      slugNote ? `<p><strong>Canonical URL note:</strong> ${escapeHtml(slugNote)}</p>` : "",
      `<p>Category: <a href="/blog/category/${slugify(post.category)}">${escapeHtml(post.category)}</a></p>`,
      parentHub
        ? `<p>Topic hub: <a href="/blog/topic/${escapeHtml(parentHub.slug)}">${escapeHtml(parentHub.name)}</a></p>`
        : "",
      siblingLinks ? `<h2>Related Articles</h2><ul>${siblingLinks}</ul>` : "",
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
      image: postImage,
      fallbackImage,
      bodyHtml: articleBody,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        image: postImage,
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
    const categoryIntro = buildCategoryArchiveIntro(info.name, info.posts);
    const links = info.posts
      .slice(0, 15)
      .map((post) => `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></li>`)
      .join("");
    pages.push({
      path: `/blog/category/${slug}`,
      title: `${info.name} in Doha - Experience Doha Blog`,
      description: categoryIntro,
      noindex: info.posts.length <= 1,
      bodyHtml: `<main><h1>${escapeHtml(info.name)}</h1><p>${escapeHtml(
        categoryIntro,
      )}</p><ul>${links}</ul><p><a href="/blog">View all posts</a></p></main>`,
    });
  }

  const postsBySlug = new Map(blogPosts.map((post) => [post.slug, post]));
  for (const hub of [...topicHubs].sort((a, b) => a.slug.localeCompare(b.slug))) {
    const hubPosts = hub.postSlugs.map((slug) => postsBySlug.get(slug)).filter(Boolean);
    const links = hubPosts
      .slice(0, 15)
      .map((post) => `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></li>`)
      .join("");

    pages.push({
      path: `/blog/topic/${hub.slug}`,
      title: `${hub.title} - Experience Doha Blog`,
      description: hub.metaDescription || hub.intro,
      noindex: hubPosts.length <= 1,
      bodyHtml: `<main><h1>${escapeHtml(hub.title)}</h1><p>${escapeHtml(hub.intro)}</p><ul>${links}</ul><p><a href="/blog">View all posts</a></p></main>`,
      jsonLd:
        hubPosts.length > 0
          ? {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: hub.title,
              description: hub.metaDescription || hub.intro,
              url: `${SITE_URL}/blog/topic/${hub.slug}`,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: hubPosts.map((post, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: `${SITE_URL}/blog/${post.slug}`,
                  name: post.title,
                })),
              },
            }
          : undefined,
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
  const topicHubs = parseTopicHubs();
  const primaryHubBySlug = parsePrimaryHubMap();
  const distAssetUrlMap = buildDistAssetUrlMap();
  const pages = buildPages(blogPosts, tours, topicHubs, primaryHubBySlug, distAssetUrlMap);
  const branchRoutes = buildBranchRouteSet(pages);

  for (const page of pages) {
    const html = withSeo(template, page);
    writeRoute(html, page.path, branchRoutes);
  }

  console.log(`Prerendered ${pages.length} routes.`);
};

main();
