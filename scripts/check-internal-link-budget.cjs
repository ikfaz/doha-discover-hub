const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const BLOG_META_PATH = path.join(ROOT_DIR, "src", "data", "articles", "blog-meta.ts");
const TOPIC_HUBS_PATH = path.join(ROOT_DIR, "src", "data", "articles", "topic-hubs.json");
const ARTICLE_PRIMARY_HUB_PATH = path.join(ROOT_DIR, "src", "data", "articles", "article-primary-hub.json");

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
    const categoryMatch = body.match(/category:\s*'([^']+)'/);
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
      category: categoryMatch ? categoryMatch[1] : "",
      tags,
    });
  }

  return posts;
};

const parseTopicHubs = () => {
  const raw = fs.readFileSync(TOPIC_HUBS_PATH, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .filter((item) => item && typeof item.slug === "string")
    .map((item) => ({
      slug: String(item.slug).trim(),
      postSlugs: Array.isArray(item.postSlugs) ? [...new Set(item.postSlugs.map((slug) => String(slug).trim()))] : [],
    }));
};

const parsePrimaryHubMap = () => {
  const raw = fs.readFileSync(ARTICLE_PRIMARY_HUB_PATH, "utf8");
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {};
  }
  return parsed;
};

const toTimestamp = (isoDate) => {
  const timestamp = Date.parse(isoDate || "");
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const byRecencyThenSlug = (left, right) => {
  const timestampDelta = toTimestamp(right.isoDate) - toTimestamp(left.isoDate);
  if (timestampDelta !== 0) {
    return timestampDelta;
  }
  return left.slug.localeCompare(right.slug);
};

const countTagOverlap = (leftTags, rightTags) => {
  if (!Array.isArray(leftTags) || !Array.isArray(rightTags) || leftTags.length === 0 || rightTags.length === 0) {
    return 0;
  }

  const rightSet = new Set(rightTags);
  let overlap = 0;
  for (const tag of leftTags) {
    if (rightSet.has(tag)) {
      overlap += 1;
    }
  }
  return overlap;
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
      score += 5 * countTagOverlap(currentPost.tags, candidate.tags);
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

const main = () => {
  const posts = parseBlogMeta();
  const topicHubs = parseTopicHubs();
  const primaryHubBySlug = parsePrimaryHubMap();
  const errors = [];

  const postSlugs = new Set(posts.map((post) => post.slug));
  const primaryHubEntries = Object.entries(primaryHubBySlug);
  const allowedHubSlugs = new Set(topicHubs.map((hub) => hub.slug));
  const hubMembership = new Map(topicHubs.map((hub) => [hub.slug, new Set(hub.postSlugs)]));

  if (primaryHubEntries.length !== postSlugs.size) {
    errors.push(`Primary hub map size mismatch: expected ${postSlugs.size}, got ${primaryHubEntries.length}.`);
  }

  for (const slug of postSlugs) {
    if (!Object.prototype.hasOwnProperty.call(primaryHubBySlug, slug)) {
      errors.push(`Missing primary hub mapping for slug: ${slug}`);
    }
  }

  for (const [slug, hubSlug] of primaryHubEntries) {
    if (!postSlugs.has(slug)) {
      errors.push(`Primary hub mapping references unknown slug: ${slug}`);
      continue;
    }

    if (!allowedHubSlugs.has(hubSlug)) {
      errors.push(`Primary hub mapping for ${slug} uses unknown hub slug: ${hubSlug}`);
      continue;
    }

    const hubPosts = hubMembership.get(hubSlug);
    if (!hubPosts || !hubPosts.has(slug)) {
      errors.push(`Slug ${slug} maps to hub ${hubSlug} but is missing from that hub postSlugs list.`);
    }
  }

  for (const post of posts) {
    const siblings = getSiblingPostsForArticle(post, posts, primaryHubBySlug, 3);
    if (siblings.length < 1) {
      errors.push(`No sibling post resolved for slug: ${post.slug}`);
    }
  }

  if (errors.length > 0) {
    console.error("Internal link budget check failed.");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Internal link budget check passed for ${posts.length} posts.`);
};

main();
