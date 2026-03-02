const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const REDIRECTS_PATH = path.join(ROOT_DIR, "public", "_redirects");
const HTACCESS_PATH = path.join(ROOT_DIR, "public", ".htaccess");

const redirects = fs.readFileSync(REDIRECTS_PATH, "utf8");
const htaccess = fs.readFileSync(HTACCESS_PATH, "utf8");

const requiredRedirectRules = [
  "https://www.experiencedoha.com/blogs https://experiencedoha.com/blog 301!",
  "https://www.experiencedoha.com/blogs/:slug/ https://experiencedoha.com/blog/:slug 301!",
  "https://www.experiencedoha.com/tours/:slug/ https://experiencedoha.com/tour/:slug 301!",
  "https://www.experiencedoha.com/listings/:slug/ https://experiencedoha.com/listing/:slug 301!",
  "https://www.experiencedoha.com/privacy/ https://experiencedoha.com/privacy-policy 301!",
  "https://www.experiencedoha.com/terms/ https://experiencedoha.com/terms-of-service 301!",
  "https://www.experiencedoha.com/cookies/ https://experiencedoha.com/cookie-policy 301!",
  "https://www.experiencedoha.com/budget/ https://experiencedoha.com/budget-planner 301!",
  "https://www.experiencedoha.com/video/ https://experiencedoha.com/blog 301!",
  "https://www.experiencedoha.com/videos/ https://experiencedoha.com/blog 301!",
  "https://www.experiencedoha.com/photos/ https://experiencedoha.com/gallery 301!",
  "https://www.experiencedoha.com/*/ https://experiencedoha.com/:splat 301!",
  "https://www.experiencedoha.com/* https://experiencedoha.com/:splat 301!",
  "/* /index.html 200",
];

const requiredHtaccessRules = [
  "RewriteRule ^blogs/?$ https://experiencedoha.com/blog [R=301,L]",
  "RewriteRule ^blogs/([^/]+)/?$ https://experiencedoha.com/blog/$1 [R=301,L]",
  "RewriteRule ^tours/([^/]+)/?$ https://experiencedoha.com/tour/$1 [R=301,L]",
  "RewriteRule ^listings/([^/]+)/?$ https://experiencedoha.com/listing/$1 [R=301,L]",
  "RewriteRule ^privacy/?$ https://experiencedoha.com/privacy-policy [R=301,L]",
  "RewriteRule ^terms/?$ https://experiencedoha.com/terms-of-service [R=301,L]",
  "RewriteRule ^cookies/?$ https://experiencedoha.com/cookie-policy [R=301,L]",
  "RewriteRule ^budget/?$ https://experiencedoha.com/budget-planner [R=301,L]",
  "RewriteRule ^video/?$ https://experiencedoha.com/blog [R=301,L]",
  "RewriteRule ^videos/?$ https://experiencedoha.com/blog [R=301,L]",
  "RewriteRule ^photos/?$ https://experiencedoha.com/gallery [R=301,L]",
  "RewriteRule ^(.+)/$ https://experiencedoha.com/$1 [R=301,L]",
  "RewriteRule ^(.+)/$ /$1 [R=301,L]",
  "RewriteRule . /index.html [L]",
];

const missing = [];

for (const rule of requiredRedirectRules) {
  if (!redirects.includes(rule)) {
    missing.push(`public/_redirects missing: ${rule}`);
  }
}

for (const rule of requiredHtaccessRules) {
  if (!htaccess.includes(rule)) {
    missing.push(`public/.htaccess missing: ${rule}`);
  }
}

if (missing.length > 0) {
  console.error("Trailing-slash parity check failed:");
  for (const line of missing) {
    console.error(`- ${line}`);
  }
  process.exit(1);
}

console.log("Trailing-slash parity check passed.");
