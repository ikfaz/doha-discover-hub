const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const SITEMAP_PATH = path.join(ROOT_DIR, "public", "sitemap.xml");
const DIST_DIR = path.join(ROOT_DIR, "dist");

const SITE_URL = "https://experiencedoha.com";

const errors = [];

const ensureFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing required file: ${path.relative(ROOT_DIR, filePath)}`);
    return false;
  }
  return true;
};

const normalizeRoutePath = (urlValue) => {
  try {
    const parsed = new URL(urlValue);
    if (parsed.origin !== SITE_URL) {
      return null;
    }
    const routePath = parsed.pathname.replace(/\/+$/, "") || "/";
    return routePath;
  } catch {
    return null;
  }
};

const routeToDistHtmlPath = (routePath) => {
  if (routePath === "/") {
    return path.join(DIST_DIR, "index.html");
  }
  const relative = routePath.replace(/^\/+/, "");
  return path.join(DIST_DIR, relative, "index.html");
};

const main = () => {
  if (!ensureFile(SITEMAP_PATH) || !fs.existsSync(DIST_DIR)) {
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  const sitemapXml = fs.readFileSync(SITEMAP_PATH, "utf8");
  const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  if (locMatches.length === 0) {
    console.error("Prerender coverage check failed.");
    console.error("- No <loc> entries found in public/sitemap.xml");
    process.exit(1);
  }

  const routePaths = [...new Set(locMatches.map((match) => normalizeRoutePath(match[1])).filter(Boolean))];
  for (const routePath of routePaths) {
    const htmlPath = routeToDistHtmlPath(routePath);
    if (!fs.existsSync(htmlPath)) {
      errors.push(`Missing prerendered HTML for route ${routePath} (${path.relative(ROOT_DIR, htmlPath)})`);
    }
  }

  if (errors.length > 0) {
    console.error("Prerender coverage check failed.");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Prerender coverage check passed.");
  console.log(`- Routes checked from sitemap: ${routePaths.length}`);
};

main();
