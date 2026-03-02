const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");
const BLOG_META_PATH = path.join(ROOT_DIR, "src", "data", "articles", "blog-meta.ts");
const TOPIC_HUBS_PATH = path.join(ROOT_DIR, "src", "data", "articles", "topic-hubs.json");
const ARTICLE_PRIMARY_HUB_PATH = path.join(ROOT_DIR, "src", "data", "articles", "article-primary-hub.json");
const LEGACY_TAG_MAP_PATH = path.join(ROOT_DIR, "src", "data", "articles", "legacy-tag-to-topic.json");
const NETLIFY_REDIRECTS_PATH = path.join(ROOT_DIR, "public", "_redirects");
const HTACCESS_PATH = path.join(ROOT_DIR, "public", ".htaccess");

const BLOCK_START = "# BEGIN LEGACY TAG REDIRECTS";
const BLOCK_END = "# END LEGACY TAG REDIRECTS";

const parseBlogSlugs = () => {
  const source = fs.readFileSync(BLOG_META_PATH, "utf8");
  const blockRegex = /'([^']+)':\s*\{([\s\S]*?)\n\s*\},/g;
  const slugs = [];
  for (const match of source.matchAll(blockRegex)) {
    const slug = match[1];
    if (slug !== "default") {
      slugs.push(slug);
    }
  }
  return slugs;
};

const collectFiles = (dir, fileList = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const nextPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(nextPath, fileList);
      continue;
    }
    if (entry.isFile() && (nextPath.endsWith(".tsx") || nextPath.endsWith(".ts"))) {
      fileList.push(nextPath);
    }
  }
  return fileList;
};

const main = () => {
  const errors = [];

  const uiFiles = collectFiles(path.join(SRC_DIR, "pages")).concat(collectFiles(path.join(SRC_DIR, "components")));
  const forbiddenPatterns = [/to=\{`\/blog\/tag\//, /to="\/blog\/tag\//, /href=\{`\/blog\/tag\//, /href="\/blog\/tag\//];
  for (const filePath of uiFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    if (forbiddenPatterns.some((pattern) => pattern.test(content))) {
      errors.push(`Found UI link to /blog/tag/ in ${path.relative(ROOT_DIR, filePath)}`);
    }
  }

  const topicHubs = JSON.parse(fs.readFileSync(TOPIC_HUBS_PATH, "utf8"));
  const allowedTopics = new Set(topicHubs.map((hub) => hub.slug));
  const postSlugs = new Set(parseBlogSlugs());
  const primaryHubMap = JSON.parse(fs.readFileSync(ARTICLE_PRIMARY_HUB_PATH, "utf8"));

  for (const slug of postSlugs) {
    if (!Object.prototype.hasOwnProperty.call(primaryHubMap, slug)) {
      errors.push(`Missing primary topic mapping for article: ${slug}`);
    }
  }

  for (const [slug, topic] of Object.entries(primaryHubMap)) {
    if (!postSlugs.has(slug)) {
      errors.push(`Primary topic map includes unknown article slug: ${slug}`);
    }
    if (!allowedTopics.has(topic)) {
      errors.push(`Primary topic map includes unknown topic slug for ${slug}: ${topic}`);
    }
  }

  const legacyMap = JSON.parse(fs.readFileSync(LEGACY_TAG_MAP_PATH, "utf8"));
  for (const [tagSlug, topicSlug] of Object.entries(legacyMap)) {
    if (!tagSlug || !/^[a-z0-9-]+$/.test(tagSlug)) {
      errors.push(`Invalid legacy tag slug format: ${tagSlug}`);
    }
    if (!allowedTopics.has(topicSlug)) {
      errors.push(`Legacy tag ${tagSlug} maps to unknown topic slug: ${topicSlug}`);
    }
  }

  const redirectsContent = fs.readFileSync(NETLIFY_REDIRECTS_PATH, "utf8");
  if (!redirectsContent.includes(BLOCK_START) || !redirectsContent.includes(BLOCK_END)) {
    errors.push("Missing legacy tag redirect managed block in public/_redirects");
  }

  const htaccessContent = fs.readFileSync(HTACCESS_PATH, "utf8");
  if (!htaccessContent.includes(BLOCK_START) || !htaccessContent.includes(BLOCK_END)) {
    errors.push("Missing legacy tag redirect managed block in public/.htaccess");
  }

  if (errors.length > 0) {
    console.error("Topic taxonomy check failed.");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Topic taxonomy check passed.");
};

main();
