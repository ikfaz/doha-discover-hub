const fs = require("fs");
const path = require("path");

const SITE_URL = "https://experiencedoha.com";
const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const DIST_ROBOTS_PATH = path.join(DIST_DIR, "robots.txt");
const DIST_SITEMAP_PATH = path.join(DIST_DIR, "sitemap.xml");
const DIST_IMAGE_SITEMAP_PATH = path.join(DIST_DIR, "sitemap-images.xml");
const DIST_SITEMAP_INDEX_PATH = path.join(DIST_DIR, "sitemap-index.xml");
const DIST_LLMS_PATH = path.join(DIST_DIR, "llms.txt");
const DIST_REDIRECTS_PATH = path.join(DIST_DIR, "_redirects");
const PUBLIC_REDIRECTS_PATH = path.join(ROOT_DIR, "public", "_redirects");

const errors = [];
const warnings = [];

const ensureFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing required file: ${path.relative(ROOT_DIR, filePath)}`);
    return false;
  }
  return true;
};

const collectHtmlFiles = (dir, found = []) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const nextPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(nextPath, found);
      continue;
    }
    if (entry.isFile() && nextPath.endsWith(".html")) {
      found.push(nextPath);
    }
  }
  return found;
};

const assert = (condition, message) => {
  if (!condition) {
    errors.push(message);
  }
};

const parseRobotsSitemaps = (robotsContent) => {
  const lines = robotsContent.split(/\r?\n/);
  return lines
    .map((line) => line.trim())
    .filter((line) => /^Sitemap:/i.test(line))
    .map((line) => line.replace(/^Sitemap:\s*/i, "").trim())
    .filter(Boolean);
};

const hasHeadTag = (html, regex) => regex.test(html);

const extractTagContent = (html, regex) => {
  const match = html.match(regex);
  return match ? String(match[1] || "").trim() : "";
};

const checkHtmlHeadTags = (filePath, html) => {
  const relativePath = path.relative(DIST_DIR, filePath);
  const checks = [
    {
      label: "canonical",
      regex: /<link\s+rel=["']canonical["'][^>]*href=["']https:\/\/experiencedoha\.com[^"']*["'][^>]*>/i,
    },
    {
      label: "robots",
      regex: /<meta\s+name=["']robots["'][^>]*content=["'](?:index,\s*follow|noindex,\s*follow)["'][^>]*>/i,
    },
    { label: "og:title", regex: /<meta\s+property=["']og:title["'][^>]*content=["'][^"']+["'][^>]*>/i },
    {
      label: "og:description",
      regex: /<meta\s+property=["']og:description["'][^>]*content=["'][^"']+["'][^>]*>/i,
    },
    {
      label: "og:image",
      regex: /<meta\s+property=["']og:image["'][^>]*content=["']https:\/\/experiencedoha\.com[^"']*["'][^>]*>/i,
    },
    {
      label: "twitter:card",
      regex: /<meta\s+name=["']twitter:card["'][^>]*content=["']summary_large_image["'][^>]*>/i,
    },
    {
      label: "twitter:title",
      regex: /<meta\s+name=["']twitter:title["'][^>]*content=["'][^"']+["'][^>]*>/i,
    },
    {
      label: "twitter:description",
      regex: /<meta\s+name=["']twitter:description["'][^>]*content=["'][^"']+["'][^>]*>/i,
    },
    {
      label: "twitter:image",
      regex: /<meta\s+name=["']twitter:image["'][^>]*content=["']https:\/\/experiencedoha\.com[^"']*["'][^>]*>/i,
    },
  ];

  for (const check of checks) {
    assert(hasHeadTag(html, check.regex), `Missing ${check.label} tag in ${relativePath}`);
  }
};

const collectPageSignals = (filePath, html) => {
  const relativePath = path.relative(DIST_DIR, filePath);
  const title = extractTagContent(html, /<title>([\s\S]*?)<\/title>/i);
  const description = extractTagContent(
    html,
    /<meta\s+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  );
  const robots = extractTagContent(
    html,
    /<meta\s+name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  ).toLowerCase();
  const htmlWithoutNoscript = html.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  const h1Count = (htmlWithoutNoscript.match(/<h1\b/gi) || []).length;

  return {
    relativePath,
    title,
    description,
    robots,
    h1Count,
  };
};

const findDuplicates = (pages, key) => {
  const grouped = new Map();
  for (const page of pages) {
    const value = String(page[key] || "").trim();
    if (!value) {
      continue;
    }
    const normalized = value.toLowerCase();
    if (!grouped.has(normalized)) {
      grouped.set(normalized, { value, pages: [] });
    }
    grouped.get(normalized).pages.push(page.relativePath);
  }

  return [...grouped.values()].filter((entry) => entry.pages.length > 1);
};

const checkRedirectHygieneRules = () => {
  const redirectsPath = fs.existsSync(DIST_REDIRECTS_PATH) ? DIST_REDIRECTS_PATH : PUBLIC_REDIRECTS_PATH;
  assert(fs.existsSync(redirectsPath), "Missing redirect configuration file for hygiene checks (_redirects).");
  if (!fs.existsSync(redirectsPath)) {
    return;
  }

  const redirects = fs.readFileSync(redirectsPath, "utf8");
  assert(
    /(^|\r?\n)\s*\/index\.html\s+\/\s+301!?(\s|$)/i.test(redirects),
    "Missing redirect hygiene rule: /index.html -> / (301)",
  );
  assert(
    /(^|\r?\n)\s*\/:splat\/index\.html\s+\/:splat\s+301!?(\s|$)/i.test(redirects),
    "Missing redirect hygiene rule: /:splat/index.html -> /:splat (301)",
  );
  assert(
    /(^|\r?\n)\s*\/blog\/tag\/\*\s+\/blog\s+301!?(\s|$)/i.test(redirects),
    "Missing redirect hygiene rule: /blog/tag/* -> /blog (301)",
  );
};

const checkArticleJsonLd = () => {
  const blogDir = path.join(DIST_DIR, "blog");
  if (!fs.existsSync(blogDir)) {
    errors.push("dist/blog directory is missing; prerendered article pages were not generated.");
    return;
  }

  const articleHtmlFiles = collectHtmlFiles(blogDir).filter((filePath) =>
    /[/\\\\]blog[/\\\\][^/\\\\]+[/\\\\]index\.html$/i.test(filePath),
  );
  if (articleHtmlFiles.length === 0) {
    errors.push("No prerendered article HTML files found in dist/blog.");
    return;
  }

  const sampleFile = articleHtmlFiles[0];
  const html = fs.readFileSync(sampleFile, "utf8");
  const relativePath = path.relative(DIST_DIR, sampleFile);

  assert(/"@type":"Article"/.test(html), `Article JSON-LD is missing in ${relativePath}`);
  assert(
    /"mainEntityOfPage":"https:\/\/experiencedoha\.com\/blog\//.test(html),
    `Article JSON-LD mainEntityOfPage is not absolute in ${relativePath}`,
  );
  assert(
    /"image":"https:\/\/experiencedoha\.com\//.test(html),
    `Article JSON-LD image is missing or not absolute in ${relativePath}`,
  );
  assert(
    /"publisher":\{"@type":"Organization","name":"Experience Doha","url":"https:\/\/experiencedoha\.com","logo":\{"@type":"ImageObject","url":"https:\/\/experiencedoha\.com\/logo\.png"\}\}/.test(
      html,
    ),
    `Article JSON-LD publisher is not normalized in ${relativePath}`,
  );
};

const main = () => {
  const requiredFilesPresent =
    ensureFile(DIST_ROBOTS_PATH) &&
    ensureFile(DIST_SITEMAP_PATH) &&
    ensureFile(DIST_IMAGE_SITEMAP_PATH) &&
    ensureFile(DIST_LLMS_PATH);
  if (!requiredFilesPresent) {
    console.error("SEO integrity check failed.");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  const robotsContent = fs.readFileSync(DIST_ROBOTS_PATH, "utf8");
  const sitemapXml = fs.readFileSync(DIST_SITEMAP_PATH, "utf8");
  const imageSitemapXml = fs.readFileSync(DIST_IMAGE_SITEMAP_PATH, "utf8");
  const llmsTxt = fs.readFileSync(DIST_LLMS_PATH, "utf8");

  assert(llmsTxt.includes("https://experiencedoha.com"), "dist/llms.txt is missing canonical site URL.");
  assert(
    llmsTxt.includes("https://experiencedoha.com/sitemap.xml"),
    "dist/llms.txt is missing sitemap URL reference.",
  );

  const sitemapLines = parseRobotsSitemaps(robotsContent);
  assert(sitemapLines.length > 0, "dist/robots.txt has no Sitemap lines.");

  const hasIndexLine = sitemapLines.includes(`${SITE_URL}/sitemap-index.xml`);
  if (hasIndexLine) {
    assert(
      fs.existsSync(DIST_SITEMAP_INDEX_PATH),
      "robots references sitemap-index.xml but dist/sitemap-index.xml is missing.",
    );
  } else {
    assert(
      sitemapLines.includes(`${SITE_URL}/sitemap.xml`),
      "robots is missing Sitemap: https://experiencedoha.com/sitemap.xml",
    );
    assert(
      sitemapLines.includes(`${SITE_URL}/sitemap-images.xml`),
      "robots is missing Sitemap: https://experiencedoha.com/sitemap-images.xml",
    );
  }

  assert(
    /<loc>https:\/\/experiencedoha\.com\/blog\/[^<]+<\/loc>/.test(sitemapXml),
    "dist/sitemap.xml does not include indexable blog post URLs.",
  );
  assert(
    !/https:\/\/experiencedoha\.com\/blog\/topic\//.test(sitemapXml),
    "dist/sitemap.xml contains /blog/topic/ routes that should remain noindex and excluded.",
  );
  assert(
    !/https:\/\/experiencedoha\.com\/blog\/category\//.test(sitemapXml),
    "dist/sitemap.xml contains /blog/category/ routes that should remain noindex and excluded.",
  );

  assert(
    /<image:loc>https:\/\/experiencedoha\.com\/assets\/[^<]+<\/image:loc>/.test(imageSitemapXml),
    "dist/sitemap-images.xml does not contain valid absolute image entries.",
  );

  const htmlFiles = collectHtmlFiles(DIST_DIR);
  assert(htmlFiles.length > 0, "No HTML files found in dist for head tag verification.");

  const pageSignals = [];
  for (const filePath of htmlFiles) {
    const html = fs.readFileSync(filePath, "utf8");
    checkHtmlHeadTags(filePath, html);
    pageSignals.push(collectPageSignals(filePath, html));
  }

  const indexablePages = pageSignals.filter((page) => /\bindex\s*,\s*follow\b/i.test(page.robots));
  assert(indexablePages.length > 0, "No indexable prerendered pages found for duplicate/H1 checks.");

  const duplicateTitles = findDuplicates(indexablePages, "title");
  for (const duplicate of duplicateTitles) {
    errors.push(`Duplicate <title> across indexable pages: "${duplicate.value}" -> ${duplicate.pages.join(", ")}`);
  }

  const duplicateDescriptions = findDuplicates(indexablePages, "description");
  for (const duplicate of duplicateDescriptions) {
    errors.push(
      `Duplicate meta description across indexable pages: "${duplicate.value}" -> ${duplicate.pages.join(", ")}`,
    );
  }

  for (const page of indexablePages) {
    assert(page.h1Count === 1, `Indexable page must contain exactly one <h1>: ${page.relativePath} (found ${page.h1Count})`);
  }

  const homeHtmlPath = path.join(DIST_DIR, "index.html");
  if (fs.existsSync(homeHtmlPath)) {
    const homeHtml = fs.readFileSync(homeHtmlPath, "utf8");
    if (!/https:\/\/experiencedoha\.com\/og-default-1200x630\.jpg/.test(homeHtml)) {
      warnings.push("Homepage does not reference og-default-1200x630.jpg.");
    }
  }

  checkRedirectHygieneRules();
  checkArticleJsonLd();

  if (errors.length > 0) {
    console.error("SEO integrity check failed.");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("SEO integrity check passed.");
  console.log(`- HTML files checked: ${htmlFiles.length}`);
  console.log(`- Indexable pages checked: ${indexablePages.length}`);
  console.log(`- Sitemap lines in robots: ${sitemapLines.length}`);
  if (warnings.length > 0) {
    console.warn(`Warnings: ${warnings.length}`);
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
  }
};

main();
