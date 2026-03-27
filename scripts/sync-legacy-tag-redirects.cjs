const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const LEGACY_TAG_MAP_PATH = path.join(ROOT_DIR, "src", "data", "articles", "legacy-tag-to-topic.json");
const NETLIFY_REDIRECTS_PATH = path.join(ROOT_DIR, "public", "_redirects");
const HTACCESS_PATH = path.join(ROOT_DIR, "public", ".htaccess");

const BLOCK_START = "# BEGIN LEGACY TAG REDIRECTS";
const BLOCK_END = "# END LEGACY TAG REDIRECTS";

const replaceManagedBlock = (content, block, anchorPattern) => {
  const blockRegex = new RegExp(`${BLOCK_START}[\\s\\S]*?${BLOCK_END}`, "m");
  if (blockRegex.test(content)) {
    return content.replace(blockRegex, block);
  }

  const anchorMatch = content.match(anchorPattern);
  if (!anchorMatch) {
    return `${content.trimEnd()}\n\n${block}\n`;
  }

  const index = anchorMatch.index ?? content.length;
  return `${content.slice(0, index)}${block}\n${content.slice(index)}`;
};

const buildNetlifyBlock = (legacyTagMap) => {
  const lines = [BLOCK_START];
  for (const [tagSlug, topicSlug] of Object.entries(legacyTagMap).sort((a, b) => a[0].localeCompare(b[0]))) {
    lines.push(`https://www.experiencedoha.com/blog/tag/${tagSlug} https://experiencedoha.com/blog/topic/${topicSlug} 301!`);
    lines.push(`https://www.experiencedoha.com/blog/tag/${tagSlug}/ https://experiencedoha.com/blog/topic/${topicSlug} 301!`);
    lines.push(`/blog/tag/${tagSlug} /blog/topic/${topicSlug} 301`);
    lines.push(`/blog/tag/${tagSlug}/ /blog/topic/${topicSlug} 301`);
  }
  lines.push(BLOCK_END);
  return `${lines.join("\n")}\n\n`;
};

const buildHtaccessBlock = (legacyTagMap) => {
  const lines = [BLOCK_START, "  # Legacy tag redirects on www host"];
  for (const [tagSlug, topicSlug] of Object.entries(legacyTagMap).sort((a, b) => a[0].localeCompare(b[0]))) {
    lines.push("  RewriteCond %{HTTP_HOST} ^www\\.experiencedoha\\.com$ [NC]");
    lines.push(`  RewriteRule ^blog/tag/${tagSlug}/?$ https://experiencedoha.com/blog/topic/${topicSlug} [R=301,L]`);
  }

  lines.push("");
  lines.push("  # Legacy tag redirects on apex host");
  for (const [tagSlug, topicSlug] of Object.entries(legacyTagMap).sort((a, b) => a[0].localeCompare(b[0]))) {
    lines.push(`  RewriteRule ^blog/tag/${tagSlug}/?$ /blog/topic/${topicSlug} [R=301,L]`);
  }
  lines.push(BLOCK_END);
  return `${lines.join("\n")}\n\n`;
};

const main = () => {
  const legacyTagMap = JSON.parse(fs.readFileSync(LEGACY_TAG_MAP_PATH, "utf8"));

  const redirectsContent = fs.readFileSync(NETLIFY_REDIRECTS_PATH, "utf8");
  const redirectsBlock = buildNetlifyBlock(legacyTagMap);
  const redirectsUpdated = replaceManagedBlock(
    redirectsContent,
    redirectsBlock,
    /https:\/\/www\.experiencedoha\.com\/\*\/\s+https:\/\/experiencedoha\.com\/:splat\s+301!/m,
  );
  fs.writeFileSync(NETLIFY_REDIRECTS_PATH, redirectsUpdated, "utf8");

  const htaccessContent = fs.readFileSync(HTACCESS_PATH, "utf8");
  const htaccessBlock = buildHtaccessBlock(legacyTagMap);
  const htaccessUpdated = replaceManagedBlock(
    htaccessContent,
    htaccessBlock,
    /# Canonical non-root trailing slash normalization on www/m,
  );
  fs.writeFileSync(HTACCESS_PATH, htaccessUpdated, "utf8");

  console.log(`Synced legacy tag redirects for ${Object.keys(legacyTagMap).length} tag slugs.`);
};

main();
