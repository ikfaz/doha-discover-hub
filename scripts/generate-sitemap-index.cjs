const fs = require("fs");
const path = require("path");

const SITE_URL = "https://experiencedoha.com";
const INDEX_ACTIVATION_URL_THRESHOLD = 10000;

const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const DIST_SITEMAP_PATH = path.join(DIST_DIR, "sitemap.xml");
const DIST_IMAGE_SITEMAP_PATH = path.join(DIST_DIR, "sitemap-images.xml");
const DIST_SITEMAP_INDEX_PATH = path.join(DIST_DIR, "sitemap-index.xml");
const DIST_ROBOTS_PATH = path.join(DIST_DIR, "robots.txt");

const escapeXml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toIsoDate = (mtimeMs) => {
  const date = new Date(mtimeMs);
  return Number.isFinite(date.getTime()) ? date.toISOString().slice(0, 10) : null;
};

const countSitemapUrls = (xml) => {
  const matches = xml.match(/<url>/g);
  return matches ? matches.length : 0;
};

const buildSitemapIndexXml = (entries) => {
  const sitemapEntries = entries
    .map((entry) => {
      const lastmodXml = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "";
      return `  <sitemap>\n    <loc>${escapeXml(entry.loc)}</loc>${lastmodXml}\n  </sitemap>`;
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    sitemapEntries,
    "</sitemapindex>",
    "",
  ].join("\n");
};

const updateRobotsSitemapLines = (robotsContent, sitemapUrls) => {
  const lines = robotsContent.split(/\r?\n/);
  const filteredLines = lines.filter((line) => !/^\s*Sitemap:/i.test(line));
  if (filteredLines.length > 0 && filteredLines[filteredLines.length - 1].trim() !== "") {
    filteredLines.push("");
  }
  for (const sitemapUrl of sitemapUrls) {
    filteredLines.push(`Sitemap: ${sitemapUrl}`);
  }
  return `${filteredLines.join("\n").replace(/\n+$/, "\n")}`;
};

const main = () => {
  if (!fs.existsSync(DIST_SITEMAP_PATH)) {
    throw new Error("dist/sitemap.xml not found. Run npm run build first.");
  }

  const childSitemapEntries = [];
  const childCandidates = [
    { filePath: DIST_SITEMAP_PATH, publicPath: "/sitemap.xml" },
    { filePath: DIST_IMAGE_SITEMAP_PATH, publicPath: "/sitemap-images.xml" },
  ];

  for (const candidate of childCandidates) {
    if (!fs.existsSync(candidate.filePath)) {
      if (candidate.filePath === DIST_IMAGE_SITEMAP_PATH) {
        console.warn("sitemap-images.xml not found in dist. Index will include only available child sitemaps.");
        continue;
      }
      throw new Error(`Required child sitemap missing: ${candidate.filePath}`);
    }

    const stat = fs.statSync(candidate.filePath);
    childSitemapEntries.push({
      loc: `${SITE_URL}${candidate.publicPath}`,
      lastmod: toIsoDate(stat.mtimeMs),
    });
  }

  const uniqueEntries = [...new Map(childSitemapEntries.map((entry) => [entry.loc, entry])).values()];

  const sitemapXml = fs.readFileSync(DIST_SITEMAP_PATH, "utf8");
  const canonicalUrlCount = countSitemapUrls(sitemapXml);
  const isActive = canonicalUrlCount >= INDEX_ACTIVATION_URL_THRESHOLD;

  const sitemapIndexXml = buildSitemapIndexXml(uniqueEntries);
  fs.writeFileSync(DIST_SITEMAP_INDEX_PATH, sitemapIndexXml, "utf8");

  if (!fs.existsSync(DIST_ROBOTS_PATH)) {
    throw new Error("dist/robots.txt not found. Ensure static assets are copied during build.");
  }

  const robotsContent = fs.readFileSync(DIST_ROBOTS_PATH, "utf8");
  const sitemapUrls = isActive
    ? [`${SITE_URL}/sitemap-index.xml`]
    : uniqueEntries.map((entry) => entry.loc);
  const updatedRobots = updateRobotsSitemapLines(robotsContent, sitemapUrls);
  fs.writeFileSync(DIST_ROBOTS_PATH, updatedRobots, "utf8");

  console.log(`Generated sitemap index: dist/sitemap-index.xml`);
  console.log(`Canonical URL count: ${canonicalUrlCount}`);
  console.log(`Activation threshold: ${INDEX_ACTIVATION_URL_THRESHOLD}`);
  console.log(`Sitemap index active: ${isActive}`);
};

main();
