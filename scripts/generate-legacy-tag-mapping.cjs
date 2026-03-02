const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const BLOG_META_PATH = path.join(ROOT_DIR, "src", "data", "articles", "blog-meta.ts");
const ARTICLE_PRIMARY_HUB_PATH = path.join(ROOT_DIR, "src", "data", "articles", "article-primary-hub.json");
const OUTPUT_PATH = path.join(ROOT_DIR, "src", "data", "articles", "legacy-tag-to-topic.json");

const slugify = (value) =>
  String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const parseBlogMeta = () => {
  const source = fs.readFileSync(BLOG_META_PATH, "utf8");
  const blockRegex = /'([^']+)':\s*\{([\s\S]*?)\n\s*\},/g;
  const posts = [];

  for (const match of source.matchAll(blockRegex)) {
    const slug = match[1];
    if (slug === "default") {
      continue;
    }

    const body = match[2];
    const isoDateMatch = body.match(/isoDate:\s*'([^']+)'/);
    const tagsMatch = body.match(/tags:\s*\[([\s\S]*?)\]/);
    const tags = [];

    if (tagsMatch) {
      for (const tagMatch of tagsMatch[1].matchAll(/'((?:\\'|[^'])*)'/g)) {
        tags.push(tagMatch[1].replace(/\\'/g, "'"));
      }
    }

    posts.push({
      slug,
      isoDate: isoDateMatch ? isoDateMatch[1] : "",
      tags,
    });
  }

  return posts;
};

const toTimestamp = (isoDate) => {
  const timestamp = Date.parse(isoDate || "");
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const main = () => {
  const posts = parseBlogMeta();
  const primaryHubMap = JSON.parse(fs.readFileSync(ARTICLE_PRIMARY_HUB_PATH, "utf8"));
  const candidatesByTagSlug = new Map();

  for (const post of posts) {
    const topicSlug = primaryHubMap[post.slug];
    if (!topicSlug) {
      continue;
    }

    for (const tag of post.tags) {
      const tagSlug = slugify(tag);
      if (!tagSlug) {
        continue;
      }

      if (!candidatesByTagSlug.has(tagSlug)) {
        candidatesByTagSlug.set(tagSlug, []);
      }

      candidatesByTagSlug.get(tagSlug).push({
        topicSlug,
        isoDate: post.isoDate,
      });
    }
  }

  const output = {};
  let collisionCount = 0;

  for (const [tagSlug, candidates] of [...candidatesByTagSlug.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const counts = new Map();
    const latestByTopic = new Map();

    for (const candidate of candidates) {
      counts.set(candidate.topicSlug, (counts.get(candidate.topicSlug) || 0) + 1);
      const currentLatest = latestByTopic.get(candidate.topicSlug);
      if (!currentLatest || toTimestamp(candidate.isoDate) > toTimestamp(currentLatest)) {
        latestByTopic.set(candidate.topicSlug, candidate.isoDate);
      }
    }

    const rankedTopics = [...counts.keys()].sort((left, right) => {
      const countDelta = (counts.get(right) || 0) - (counts.get(left) || 0);
      if (countDelta !== 0) {
        return countDelta;
      }

      const dateDelta = toTimestamp(latestByTopic.get(right)) - toTimestamp(latestByTopic.get(left));
      if (dateDelta !== 0) {
        return dateDelta;
      }

      return left.localeCompare(right);
    });

    if (rankedTopics.length > 1) {
      collisionCount += 1;
    }

    output[tagSlug] = rankedTopics[0];
  }

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Generated legacy tag mapping with ${Object.keys(output).length} tag slugs.`);
  console.log(`Collisions resolved by majority/tie-break: ${collisionCount}`);
};

main();
