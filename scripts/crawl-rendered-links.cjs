const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DEFAULT_DIST_DIR = path.join(ROOT_DIR, "dist");
const DEFAULT_SITEMAP_PATH = path.join(ROOT_DIR, "public", "sitemap.xml");
const DEFAULT_SITE_URL = "https://experiencedoha.com";
const DEFAULT_JSON_REPORT_PATH = path.join(ROOT_DIR, "reports", "link-crawl-report.json");
const WWW_PROBE_TIMEOUT_MS = 15000;
const LIVE_FETCH_TIMEOUT_MS = 15000;
const MAX_REDIRECT_HOPS = 8;

const GENERIC_ANCHOR_TEXT = new Set(["read more", "learn more", "click here", "here", "more"]);
const INTERNAL_LITERAL_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mdx", ".html"]);

const parseArgs = () => {
  const parsed = {
    distDir: DEFAULT_DIST_DIR,
    siteUrl: DEFAULT_SITE_URL,
    sitemapPath: DEFAULT_SITEMAP_PATH,
    strict: false,
    live: false,
    jsonPath: DEFAULT_JSON_REPORT_PATH,
  };

  const argv = process.argv.slice(2);
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--strict") {
      parsed.strict = true;
      continue;
    }
    if (arg === "--live") {
      parsed.live = true;
      continue;
    }
    if (arg === "--dist") {
      const next = argv[index + 1];
      if (!next) {
        throw new Error("--dist requires a value");
      }
      parsed.distDir = path.resolve(ROOT_DIR, next);
      index += 1;
      continue;
    }
    if (arg === "--site") {
      const next = argv[index + 1];
      if (!next) {
        throw new Error("--site requires a value");
      }
      parsed.siteUrl = next;
      index += 1;
      continue;
    }
    if (arg === "--sitemap") {
      const next = argv[index + 1];
      if (!next) {
        throw new Error("--sitemap requires a value");
      }
      parsed.sitemapPath = path.resolve(ROOT_DIR, next);
      index += 1;
      continue;
    }
    if (arg === "--json") {
      const next = argv[index + 1];
      if (!next) {
        throw new Error("--json requires a value");
      }
      parsed.jsonPath = path.resolve(ROOT_DIR, next);
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return parsed;
};

const normalizePathname = (value) => {
  const input = String(value || "").trim();
  if (!input || input === ".") {
    return "/";
  }

  const withLeadingSlash = input.startsWith("/") ? input : `/${input}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");
  if (collapsed === "/") {
    return "/";
  }

  const withoutTrailingSlash = collapsed.replace(/\/+$/, "");
  return withoutTrailingSlash || "/";
};

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const walkFiles = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const stack = [dirPath];
  const files = [];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolutePath);
      } else if (entry.isFile()) {
        files.push(absolutePath);
      }
    }
  }

  return files;
};

const buildRenderedRouteMap = (distDir) => {
  const routeToFile = new Map();
  const files = walkFiles(distDir).filter((filePath) => path.basename(filePath) === "index.html");

  for (const filePath of files) {
    const relative = path.relative(distDir, filePath).replace(/\\/g, "/");
    let route = "/";
    if (relative !== "index.html" && relative.endsWith("/index.html")) {
      route = normalizePathname(relative.slice(0, -"/index.html".length));
    }
    routeToFile.set(route, filePath);
  }

  return routeToFile;
};

const readSitemapPaths = (sitemapPath, canonicalHost) => {
  const paths = new Set();
  if (!fs.existsSync(sitemapPath)) {
    return paths;
  }

  const xml = fs.readFileSync(sitemapPath, "utf8");
  const locRegex = /<loc>([^<]+)<\/loc>/gi;

  for (const match of xml.matchAll(locRegex)) {
    const rawLoc = (match[1] || "").trim();
    if (!rawLoc) {
      continue;
    }

    try {
      const url = new URL(rawLoc);
      if (url.hostname === canonicalHost || url.hostname === `www.${canonicalHost}`) {
        paths.add(normalizePathname(url.pathname));
      }
    } catch {
      if (rawLoc.startsWith("/")) {
        paths.add(normalizePathname(rawLoc));
      }
    }
  }

  return paths;
};

const decodeHtmlEntities = (value) =>
  String(value || "")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCharCode(Number(decimal)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

const stripHtmlTags = (value) => decodeHtmlEntities(String(value || "").replace(/<[^>]*>/g, " "));

const normalizeAnchorText = (value) => stripHtmlTags(value).replace(/\s+/g, " ").trim();

const readPageMetadata = (html) => {
  let canonicalHref = null;
  let robotsContent = null;

  const linkTagRegex = /<link\b[^>]*>/gi;
  for (const match of html.matchAll(linkTagRegex)) {
    const tag = match[0];
    const relMatch = tag.match(/\brel\s*=\s*(?:"([^"]+)"|'([^']+)')/i);
    const hrefMatch = tag.match(/\bhref\s*=\s*(?:"([^"]+)"|'([^']+)')/i);
    const relValue = relMatch ? (relMatch[1] || relMatch[2] || "").toLowerCase() : "";
    if (relValue === "canonical" && hrefMatch) {
      canonicalHref = hrefMatch[1] || hrefMatch[2] || null;
      break;
    }
  }

  const metaTagRegex = /<meta\b[^>]*>/gi;
  for (const match of html.matchAll(metaTagRegex)) {
    const tag = match[0];
    const nameMatch = tag.match(/\bname\s*=\s*(?:"([^"]+)"|'([^']+)')/i);
    const contentMatch = tag.match(/\bcontent\s*=\s*(?:"([^"]+)"|'([^']+)')/i);
    const nameValue = nameMatch ? (nameMatch[1] || nameMatch[2] || "").toLowerCase() : "";
    if (nameValue === "robots" && contentMatch) {
      robotsContent = contentMatch[1] || contentMatch[2] || null;
      break;
    }
  }

  return { canonicalHref, robotsContent };
};

const extractAnchorLinks = (html) => {
  const anchors = [];
  const anchorRegex = /<a\b[^>]*href\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>([\s\S]*?)<\/a>/gi;

  for (const match of html.matchAll(anchorRegex)) {
    const href = (match[1] || match[2] || "").trim();
    const anchorText = normalizeAnchorText(match[3] || "");
    anchors.push({ href, anchorText });
  }

  return anchors;
};

const extractInternalLiteralLinks = (srcDir) => {
  const findings = [];
  const files = walkFiles(srcDir).filter((filePath) => INTERNAL_LITERAL_EXTENSIONS.has(path.extname(filePath)));
  const attrRegex = /\b(?:to|href)\s*=\s*(?:"([^"]+)"|'([^']+)'|`([^`]+)`)/g;

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf8");
    for (const match of content.matchAll(attrRegex)) {
      const rawValue = (match[1] || match[2] || match[3] || "").trim();
      if (!rawValue.startsWith("/")) {
        continue;
      }

      const pathOnly = rawValue.split("#")[0].split("?")[0];
      findings.push({
        file: filePath,
        literal: rawValue,
        normalizedPath: normalizePathname(pathOnly),
      });
    }
  }

  return findings;
};

const routePathToRegex = (routePath) => {
  if (!routePath || routePath === "*") {
    return null;
  }

  const normalized = normalizePathname(routePath);
  const escaped = normalized
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\\:([A-Za-z0-9_]+)/g, "[^/]+")
    .replace(/\\\*/g, ".*");
  return new RegExp(`^${escaped}$`, "i");
};

const extractRouterPatterns = (appFilePath) => {
  const patterns = [];
  if (!fs.existsSync(appFilePath)) {
    return patterns;
  }

  const content = fs.readFileSync(appFilePath, "utf8");
  const routePathRegex = /<Route\b[^>]*\bpath\s*=\s*(?:"([^"]+)"|'([^']+)')[^>]*>/g;

  for (const match of content.matchAll(routePathRegex)) {
    const rawPath = (match[1] || match[2] || "").trim();
    const regex = routePathToRegex(rawPath);
    if (!regex) {
      continue;
    }
    patterns.push({
      routePath: rawPath,
      regex,
    });
  }

  return patterns;
};

const stripSiteWww = (hostname) => (hostname.startsWith("www.") ? hostname.slice(4) : hostname);

const buildRedirectPatterns = (redirectsPath, canonicalHost) => {
  if (!fs.existsSync(redirectsPath)) {
    return [];
  }

  const lines = fs.readFileSync(redirectsPath, "utf8").split(/\r?\n/);
  const patterns = [];

  const toPathPattern = (source) => {
    const trimmed = source.trim();
    if (!trimmed) {
      return null;
    }
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      try {
        const url = new URL(trimmed);
        const normalizedHost = stripSiteWww(url.hostname);
        if (normalizedHost !== stripSiteWww(canonicalHost)) {
          return null;
        }
        return url.pathname;
      } catch {
        return null;
      }
    }
    if (!trimmed.startsWith("/")) {
      return null;
    }
    return trimmed;
  };

  const wildcardToRegex = (pattern) => {
    const escaped = pattern
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\\:([A-Za-z0-9_]+)/g, "[^/]+")
      .replace(/\\\*/g, ".*");
    return new RegExp(`^${escaped}$`, "i");
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const parts = line.split(/\s+/);
    if (parts.length < 3) {
      continue;
    }

    const source = parts[0];
    const statusToken = parts[2];
    if (!statusToken.includes("301")) {
      continue;
    }

    const pathPattern = toPathPattern(source);
    if (!pathPattern || pathPattern === "/*") {
      continue;
    }

    patterns.push({
      source: source.trim(),
      pathPattern,
      regex: wildcardToRegex(pathPattern),
    });
  }

  return patterns;
};

const classifyHref = ({ href, sourcePath, siteUrl, canonicalHost, internalHosts }) => {
  const rawHref = String(href || "").trim();
  if (!rawHref) {
    return { ignored: true, reason: "empty" };
  }
  if (rawHref.startsWith("#")) {
    return { ignored: true, reason: "fragment-only" };
  }
  if (/^(mailto:|tel:|javascript:|data:)/i.test(rawHref)) {
    return { ignored: true, reason: "unsupported-protocol" };
  }

  let resolvedUrl;
  try {
    const baseUrl = new URL(siteUrl);
    const sourceUrl = new URL(`${baseUrl.origin}${sourcePath}`);
    resolvedUrl = new URL(rawHref, sourceUrl);
  } catch {
    return { ignored: true, reason: "invalid-url" };
  }

  const normalizedHost = stripSiteWww(resolvedUrl.hostname);
  const canonicalBaseHost = stripSiteWww(canonicalHost);
  if (!internalHosts.has(resolvedUrl.hostname) && normalizedHost !== canonicalBaseHost) {
    return { ignored: true, reason: "external" };
  }

  const normalizedPath = normalizePathname(resolvedUrl.pathname);
  const hostIsVariant = resolvedUrl.hostname !== canonicalHost;
  const hadQueryOrHash = Boolean(resolvedUrl.search || resolvedUrl.hash);
  return {
    ignored: false,
    rawHref,
    resolvedHref: resolvedUrl.toString(),
    normalizedPath,
    hostIsVariant,
    hadQueryOrHash,
    rawPathname: resolvedUrl.pathname,
  };
};

const isGenericAnchor = (anchorText) => {
  const normalized = anchorText.replace(/\s+/g, " ").trim().toLowerCase();
  if (!normalized) {
    return true;
  }
  return GENERIC_ANCHOR_TEXT.has(normalized);
};

const createFinding = (type, payload) => ({ type, ...payload });

const addSourceStat = (sourceStats, sourcePath, key) => {
  if (!sourceStats[sourcePath]) {
    sourceStats[sourcePath] = {
      outboundInternalLinks: 0,
      broken_internal: 0,
      non_canonical_path: 0,
      redirect_prone: 0,
      weak_anchor_text: 0,
    };
  }
  if (key === "outboundInternalLinks") {
    sourceStats[sourcePath].outboundInternalLinks += 1;
  } else {
    sourceStats[sourcePath][key] += 1;
  }
};

const fetchWithRedirectChain = async (url, timeoutMs) => {
  const chain = [];
  let currentUrl = url;

  for (let hop = 0; hop < MAX_REDIRECT_HOPS; hop += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(currentUrl, {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const location = response.headers.get("location");
      chain.push({
        url: currentUrl,
        status: response.status,
        location: location || null,
      });

      const isRedirect = [301, 302, 303, 307, 308].includes(response.status) && location;
      if (!isRedirect) {
        return { finalUrl: currentUrl, finalStatus: response.status, chain, error: null };
      }
      currentUrl = new URL(location, currentUrl).toString();
    } catch (error) {
      clearTimeout(timeout);
      return {
        finalUrl: currentUrl,
        finalStatus: null,
        chain,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  return {
    finalUrl: currentUrl,
    finalStatus: null,
    chain,
    error: "max_redirect_hops_exceeded",
  };
};

const main = async () => {
  const args = parseArgs();
  const siteUrl = new URL(args.siteUrl);
  const canonicalHost = siteUrl.hostname;
  const internalHosts = new Set([canonicalHost, `www.${stripSiteWww(canonicalHost)}`]);

  if (!fs.existsSync(args.distDir)) {
    throw new Error(`Dist directory not found: ${args.distDir}. Run npm run build first.`);
  }

  const renderedRoutes = buildRenderedRouteMap(args.distDir);
  const sitemapPaths = readSitemapPaths(args.sitemapPath, canonicalHost);
  const redirectPatterns = buildRedirectPatterns(path.join(ROOT_DIR, "public", "_redirects"), canonicalHost);

  const queue = [];
  const seenQueued = new Set();
  const visitedPages = new Set();
  const pageMeta = {};
  const sourceStats = {};
  const linksBySourcePage = {};
  const discoveredInternalDestinations = new Set();

  const seedPaths = ["/", ...sitemapPaths];
  for (const seed of seedPaths) {
    const normalizedSeed = normalizePathname(seed);
    if (!seenQueued.has(normalizedSeed)) {
      queue.push(normalizedSeed);
      seenQueued.add(normalizedSeed);
    }
  }

  const findings = {
    broken_internal: [],
    non_canonical_path: [],
    redirect_prone: [],
    weak_anchor_text: [],
    orphan_rendered_page: [],
    rendered_not_in_sitemap: [],
    sitemap_not_rendered: [],
    literal_link_unresolved: [],
    live_status_mismatch: [],
    unexpected_redirect: [],
  };

  while (queue.length > 0) {
    const current = queue.shift();
    if (visitedPages.has(current)) {
      continue;
    }
    visitedPages.add(current);

    const currentFile = renderedRoutes.get(current);
    if (!currentFile) {
      continue;
    }

    const html = fs.readFileSync(currentFile, "utf8");
    const metadata = readPageMetadata(html);
    pageMeta[current] = metadata;

    const anchors = extractAnchorLinks(html);
    linksBySourcePage[current] = [];

    for (const anchor of anchors) {
      const classified = classifyHref({
        href: anchor.href,
        sourcePath: current,
        siteUrl: siteUrl.toString(),
        canonicalHost,
        internalHosts,
      });

      if (classified.ignored) {
        continue;
      }

      const destinationPath = classified.normalizedPath;
      discoveredInternalDestinations.add(destinationPath);
      addSourceStat(sourceStats, current, "outboundInternalLinks");

      const linkRecord = {
        sourcePath: current,
        href: classified.rawHref,
        resolvedHref: classified.resolvedHref,
        destinationPath,
        anchorText: anchor.anchorText,
      };
      linksBySourcePage[current].push(linkRecord);

      if (!renderedRoutes.has(destinationPath)) {
        findings.broken_internal.push(
          createFinding("broken_internal", {
            sourcePath: current,
            href: classified.rawHref,
            destinationPath,
            anchorText: anchor.anchorText,
          }),
        );
        addSourceStat(sourceStats, current, "broken_internal");
      }

      const matchedRedirectPattern = redirectPatterns.find(
        (entry) =>
          entry.regex.test(destinationPath) ||
          (destinationPath !== "/" && entry.regex.test(`${destinationPath}/`)),
      );
      const hasNonCanonicalShape =
        classified.hostIsVariant ||
        classified.rawPathname !== destinationPath ||
        /\/index\.html$/i.test(classified.rawHref) ||
        classified.hadQueryOrHash ||
        Boolean(matchedRedirectPattern);

      if (hasNonCanonicalShape) {
        findings.non_canonical_path.push(
          createFinding("non_canonical_path", {
            sourcePath: current,
            href: classified.rawHref,
            destinationPath,
            anchorText: anchor.anchorText,
            reason: matchedRedirectPattern ? `matches_redirect_source:${matchedRedirectPattern.source}` : "path_or_host_variant",
          }),
        );
        addSourceStat(sourceStats, current, "non_canonical_path");
      }

      if (matchedRedirectPattern) {
        findings.redirect_prone.push(
          createFinding("redirect_prone", {
            sourcePath: current,
            href: classified.rawHref,
            destinationPath,
            anchorText: anchor.anchorText,
            redirectSourcePattern: matchedRedirectPattern.source,
          }),
        );
        addSourceStat(sourceStats, current, "redirect_prone");
      }

      if (isGenericAnchor(anchor.anchorText)) {
        findings.weak_anchor_text.push(
          createFinding("weak_anchor_text", {
            sourcePath: current,
            href: classified.rawHref,
            destinationPath,
            anchorText: anchor.anchorText || "",
          }),
        );
        addSourceStat(sourceStats, current, "weak_anchor_text");
      }

      if (!seenQueued.has(destinationPath) && renderedRoutes.has(destinationPath)) {
        queue.push(destinationPath);
        seenQueued.add(destinationPath);
      }
    }
  }

  for (const renderedPath of renderedRoutes.keys()) {
    if (!visitedPages.has(renderedPath)) {
      findings.orphan_rendered_page.push(
        createFinding("orphan_rendered_page", {
          routePath: renderedPath,
          canonicalHref: pageMeta[renderedPath]?.canonicalHref || null,
          robotsContent: pageMeta[renderedPath]?.robotsContent || null,
        }),
      );
    }
  }

  for (const renderedPath of renderedRoutes.keys()) {
    if (!sitemapPaths.has(renderedPath)) {
      findings.rendered_not_in_sitemap.push(
        createFinding("rendered_not_in_sitemap", {
          routePath: renderedPath,
          canonicalHref: pageMeta[renderedPath]?.canonicalHref || null,
          robotsContent: pageMeta[renderedPath]?.robotsContent || null,
        }),
      );
    }
  }

  for (const sitemapPath of sitemapPaths) {
    if (!renderedRoutes.has(sitemapPath)) {
      findings.sitemap_not_rendered.push(
        createFinding("sitemap_not_rendered", {
          routePath: sitemapPath,
        }),
      );
    }
  }

  const literalLinks = extractInternalLiteralLinks(path.join(ROOT_DIR, "src"));
  const renderedPathSet = new Set(renderedRoutes.keys());
  const canonicalPathSet = new Set([...renderedPathSet, ...sitemapPaths]);
  const routerPatterns = extractRouterPatterns(path.join(ROOT_DIR, "src", "App.tsx"));

  for (const literal of literalLinks) {
    const matchesRouter = routerPatterns.some((entry) => entry.regex.test(literal.normalizedPath));
    if (!canonicalPathSet.has(literal.normalizedPath) && !matchesRouter) {
      findings.literal_link_unresolved.push(
        createFinding("literal_link_unresolved", {
          file: literal.file,
          literal: literal.literal,
          normalizedPath: literal.normalizedPath,
        }),
      );
    }
  }

  if (args.live) {
    const liveTargets = [...discoveredInternalDestinations].sort((a, b) => a.localeCompare(b));
    for (const routePath of liveTargets) {
      const probeUrl = `${siteUrl.origin}${routePath}`;
      const result = await fetchWithRedirectChain(probeUrl, LIVE_FETCH_TIMEOUT_MS);
      if (result.error || (typeof result.finalStatus === "number" && result.finalStatus >= 400)) {
        findings.live_status_mismatch.push(
          createFinding("live_status_mismatch", {
            routePath,
            probeUrl,
            finalStatus: result.finalStatus,
            error: result.error,
            chain: result.chain,
          }),
        );
        continue;
      }

      if (result.chain.length > 1) {
        const finalUrl = new URL(result.finalUrl);
        const finalPath = normalizePathname(finalUrl.pathname);
        if (finalUrl.hostname !== canonicalHost || finalPath !== routePath) {
          findings.unexpected_redirect.push(
            createFinding("unexpected_redirect", {
              routePath,
              probeUrl,
              finalUrl: result.finalUrl,
              chain: result.chain,
            }),
          );
        }
      }
    }

    const probeHost = stripSiteWww(canonicalHost);
    const wwwProbe = `https://www.${probeHost}/blog`;
    const wwwResult = await fetchWithRedirectChain(wwwProbe, WWW_PROBE_TIMEOUT_MS);
    const wwwExpected = `${siteUrl.origin}/blog`;
    if (wwwResult.error) {
      findings.live_status_mismatch.push(
        createFinding("live_status_mismatch", {
          routePath: "/blog",
          probeUrl: wwwProbe,
          finalStatus: wwwResult.finalStatus,
          error: wwwResult.error,
          chain: wwwResult.chain,
        }),
      );
    } else {
      const finalProbe = `${new URL(wwwResult.finalUrl).origin}${normalizePathname(new URL(wwwResult.finalUrl).pathname)}`;
      if (finalProbe !== wwwExpected) {
        findings.unexpected_redirect.push(
          createFinding("unexpected_redirect", {
            routePath: "/blog",
            probeUrl: wwwProbe,
            finalUrl: wwwResult.finalUrl,
            chain: wwwResult.chain,
            expectedFinalUrl: wwwExpected,
          }),
        );
      }
    }
  }

  const summary = {
    rendered_pages_total: renderedRoutes.size,
    sitemap_paths_total: sitemapPaths.size,
    pages_crawled: visitedPages.size,
    unique_internal_destinations: discoveredInternalDestinations.size,
    outbound_internal_links_checked: Object.values(sourceStats).reduce(
      (total, item) => total + (item.outboundInternalLinks || 0),
      0,
    ),
    broken_internal: findings.broken_internal.length,
    non_canonical_path: findings.non_canonical_path.length,
    redirect_prone: findings.redirect_prone.length,
    weak_anchor_text: findings.weak_anchor_text.length,
    orphan_rendered_page: findings.orphan_rendered_page.length,
    rendered_not_in_sitemap: findings.rendered_not_in_sitemap.length,
    sitemap_not_rendered: findings.sitemap_not_rendered.length,
    literal_link_unresolved: findings.literal_link_unresolved.length,
    live_status_mismatch: findings.live_status_mismatch.length,
    unexpected_redirect: findings.unexpected_redirect.length,
  };

  const report = {
    generatedAt: new Date().toISOString(),
    options: {
      distDir: args.distDir,
      sitemapPath: args.sitemapPath,
      siteUrl: siteUrl.toString(),
      strict: args.strict,
      live: args.live,
      jsonPath: args.jsonPath,
    },
    summary,
    findings,
    by_source_page: sourceStats,
    page_metadata: pageMeta,
    links_by_source_page: linksBySourcePage,
  };

  ensureDir(path.dirname(args.jsonPath));
  fs.writeFileSync(args.jsonPath, JSON.stringify(report, null, 2), "utf8");

  console.log("Internal Link Crawl Summary");
  console.log(`- Rendered pages total: ${summary.rendered_pages_total}`);
  console.log(`- Sitemap paths total: ${summary.sitemap_paths_total}`);
  console.log(`- Pages crawled: ${summary.pages_crawled}`);
  console.log(`- Internal links checked: ${summary.outbound_internal_links_checked}`);
  console.log(`- Broken internal links: ${summary.broken_internal}`);
  console.log(`- Redirect-prone links: ${summary.redirect_prone}`);
  console.log(`- Non-canonical links: ${summary.non_canonical_path}`);
  console.log(`- Weak anchor-text links: ${summary.weak_anchor_text}`);
  console.log(`- Orphan rendered pages: ${summary.orphan_rendered_page}`);
  console.log(`- Rendered pages not in sitemap: ${summary.rendered_not_in_sitemap}`);
  console.log(`- Sitemap paths without rendered page: ${summary.sitemap_not_rendered}`);
  console.log(`- Literal unresolved links (src scan): ${summary.literal_link_unresolved}`);
  if (args.live) {
    console.log(`- Live status mismatches: ${summary.live_status_mismatch}`);
    console.log(`- Unexpected redirects: ${summary.unexpected_redirect}`);
  }
  console.log(`- JSON report: ${args.jsonPath}`);

  if (args.strict && (summary.broken_internal > 0 || summary.weak_anchor_text > 0)) {
    console.error("Strict mode failed: broken_internal or weak_anchor_text findings detected.");
    process.exit(1);
  }
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
