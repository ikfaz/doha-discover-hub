const fs = require("fs");
const path = require("path");

const SITE_URL = "https://experiencedoha.com";
const IMAGE_NAMESPACE = "http://www.google.com/schemas/sitemap-image/1.1";

const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const DIST_ASSETS_DIR = path.join(DIST_DIR, "assets");
const DIST_SITEMAP_PATH = path.join(DIST_DIR, "sitemap.xml");
const DIST_IMAGE_SITEMAP_PATH = path.join(DIST_DIR, "sitemap-images.xml");

const BLOG_META_PATH = path.join(ROOT_DIR, "src", "data", "articles", "blog-meta.ts");
const TOURS_PATH = path.join(ROOT_DIR, "src", "data", "tours.ts");
const GALLERY_PAGE_PATH = path.join(ROOT_DIR, "src", "pages", "Gallery.tsx");

const escapeXml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const ensureAbsoluteUrl = (value) => {
  const text = String(value || "").trim();
  if (!text) {
    return null;
  }
  if (/^https?:\/\//i.test(text)) {
    return text;
  }
  return null;
};

const collectDistAssets = () => {
  if (!fs.existsSync(DIST_ASSETS_DIR)) {
    throw new Error("dist/assets not found. Run npm run build first.");
  }

  return fs.readdirSync(DIST_ASSETS_DIR).sort((a, b) => a.localeCompare(b));
};

const toDistAssetUrl = (sourceName, distAssets) => {
  const extension = path.extname(sourceName);
  const baseName = sourceName.slice(0, extension.length * -1);
  const prefix = `${baseName}-`;

  const matchedFile = distAssets.find(
    (fileName) => fileName.startsWith(prefix) && fileName.endsWith(extension),
  );
  if (!matchedFile) {
    return null;
  }
  return `${SITE_URL}/assets/${matchedFile}`;
};

const parseAssetImports = (source) => {
  const map = new Map();
  const importRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"]@\/assets\/([^'"]+)['"];?/g;
  for (const match of source.matchAll(importRegex)) {
    map.set(match[1], match[2]);
  }
  return map;
};

const parseBlogImageMap = (distAssets, warnings) => {
  const source = fs.readFileSync(BLOG_META_PATH, "utf8");
  const importMap = parseAssetImports(source);
  const pageImages = new Map();
  const blockRegex = /'([^']+)':\s*\{([\s\S]*?)\n\s*\},/g;

  for (const match of source.matchAll(blockRegex)) {
    const slug = match[1];
    if (slug === "default") {
      continue;
    }

    const body = match[2];
    const imageVarMatch = body.match(/imageUrl:\s*([A-Za-z0-9_]+)/);
    if (!imageVarMatch) {
      continue;
    }

    const imageVar = imageVarMatch[1];
    const sourceName = importMap.get(imageVar);
    if (!sourceName) {
      warnings.push(`Blog image import not found for slug "${slug}" (variable: ${imageVar})`);
      continue;
    }

    const imageUrl = toDistAssetUrl(sourceName, distAssets);
    if (!imageUrl) {
      warnings.push(`Blog image not resolved in dist/assets for slug "${slug}" (source: ${sourceName})`);
      continue;
    }

    pageImages.set(`${SITE_URL}/blog/${slug}`, [imageUrl]);
  }

  return pageImages;
};

const parseTourImageMap = () => {
  const source = fs.readFileSync(TOURS_PATH, "utf8");
  const pageImages = new Map();

  const tourBlockRegex = /\{\s*slug:\s*'([^']+)'([\s\S]*?)\n\s*\},/g;
  for (const match of source.matchAll(tourBlockRegex)) {
    const slug = match[1];
    const body = match[2];
    const heroMatch = body.match(/heroImage:\s*'([^']+)'/);
    const mapMatch = body.match(/mapImage:\s*'([^']+)'/);

    const images = [];
    const heroImage = heroMatch ? ensureAbsoluteUrl(heroMatch[1]) : null;
    const mapImage = mapMatch ? ensureAbsoluteUrl(mapMatch[1]) : null;
    if (heroImage) {
      images.push(heroImage);
    }
    if (mapImage) {
      images.push(mapImage);
    }

    if (images.length > 0) {
      pageImages.set(`${SITE_URL}/tour/${slug}`, [...new Set(images)]);
    }
  }

  return pageImages;
};

const parseGalleryImageMap = (distAssets, warnings) => {
  const source = fs.readFileSync(GALLERY_PAGE_PATH, "utf8");
  const importMap = parseAssetImports(source);
  const images = [];
  const galleryUrlVarRegex = /url:\s*([A-Za-z0-9_]+)\s*,/g;

  for (const match of source.matchAll(galleryUrlVarRegex)) {
    const imageVar = match[1];
    const sourceName = importMap.get(imageVar);
    if (!sourceName) {
      continue;
    }

    const imageUrl = toDistAssetUrl(sourceName, distAssets);
    if (!imageUrl) {
      warnings.push(`Gallery image not resolved in dist/assets (source: ${sourceName})`);
      continue;
    }
    images.push(imageUrl);
  }

  return new Map([[`${SITE_URL}/gallery`, [...new Set(images)]]]);
};

const mergeImageMaps = (maps) => {
  const merged = new Map();
  for (const map of maps) {
    for (const [loc, images] of map.entries()) {
      if (!merged.has(loc)) {
        merged.set(loc, new Set());
      }
      const set = merged.get(loc);
      for (const image of images) {
        set.add(image);
      }
    }
  }

  const normalized = new Map();
  for (const [loc, set] of merged.entries()) {
    normalized.set(loc, [...set].sort((a, b) => a.localeCompare(b)));
  }
  return normalized;
};

const ensureImageNamespace = (xml) =>
  xml.replace(/<urlset\b([^>]*)>/, (full, attrs) => {
    if (/xmlns:image=/.test(full)) {
      return full;
    }
    return `<urlset${attrs} xmlns:image="${IMAGE_NAMESPACE}">`;
  });

const enrichMainSitemap = (xml, pageImageMap) => {
  const withNamespace = ensureImageNamespace(xml);
  return withNamespace.replace(/<url>[\s\S]*?<\/url>/g, (urlNode) => {
    const locMatch = urlNode.match(/<loc>([\s\S]*?)<\/loc>/);
    if (!locMatch) {
      return urlNode;
    }

    const loc = locMatch[1].trim();
    const images = pageImageMap.get(loc) || [];

    const cleanedNode = urlNode.replace(/\s*<image:image>[\s\S]*?<\/image:image>/g, "");
    if (images.length === 0) {
      return cleanedNode;
    }

    const imageNodes = images
      .map(
        (image) =>
          `\n    <image:image>\n      <image:loc>${escapeXml(image)}</image:loc>\n    </image:image>`,
      )
      .join("");

    return cleanedNode.replace("</url>", `${imageNodes}\n  </url>`);
  });
};

const buildImageSitemapXml = (pageImageMap) => {
  const entries = [...pageImageMap.entries()]
    .filter(([, images]) => images.length > 0)
    .sort((a, b) => a[0].localeCompare(b[0]));

  const xmlEntries = entries.map(([loc, images]) => {
    const imageNodes = images
      .map(
        (image) =>
          `    <image:image>\n      <image:loc>${escapeXml(image)}</image:loc>\n    </image:image>`,
      )
      .join("\n");

    return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n${imageNodes}\n  </url>`;
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="${IMAGE_NAMESPACE}">`,
    ...xmlEntries,
    "</urlset>",
    "",
  ].join("\n");
};

const main = () => {
  if (!fs.existsSync(DIST_SITEMAP_PATH)) {
    throw new Error("dist/sitemap.xml not found. Run npm run build first.");
  }

  const warnings = [];
  const distAssets = collectDistAssets();
  const blogImageMap = parseBlogImageMap(distAssets, warnings);
  const tourImageMap = parseTourImageMap();
  const galleryImageMap = parseGalleryImageMap(distAssets, warnings);
  const pageImageMap = mergeImageMaps([blogImageMap, tourImageMap, galleryImageMap]);

  const currentMainSitemap = fs.readFileSync(DIST_SITEMAP_PATH, "utf8");
  const enrichedMainSitemap = enrichMainSitemap(currentMainSitemap, pageImageMap);
  fs.writeFileSync(DIST_SITEMAP_PATH, enrichedMainSitemap, "utf8");

  const imageSitemapXml = buildImageSitemapXml(pageImageMap);
  fs.writeFileSync(DIST_IMAGE_SITEMAP_PATH, imageSitemapXml, "utf8");

  const imageCount = [...pageImageMap.values()].reduce((total, images) => total + images.length, 0);
  console.log(`Enriched dist/sitemap.xml with image entries.`);
  console.log(`Generated dist/sitemap-images.xml with ${pageImageMap.size} URLs and ${imageCount} images.`);
  if (warnings.length > 0) {
    console.warn(`Image sitemap warnings (${warnings.length}):`);
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
  }
};

main();
