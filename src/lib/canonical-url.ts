const TRACKING_QUERY_PARAM_NAMES = new Set([
  "gclid",
  "fbclid",
  "msclkid",
  "dclid",
  "twclid",
  "srsltid",
]);

const CONTENT_QUERY_ALLOWLIST_BY_PATH: Record<string, readonly string[]> = {
  // Intentionally empty for now; add explicit content params per path when needed.
};

const getContentParamAllowlist = (pathname: string) =>
  new Set((CONTENT_QUERY_ALLOWLIST_BY_PATH[pathname] ?? []).map((key) => key.toLowerCase()));

const isTrackingQueryParam = (key: string) => {
  const lowerKey = key.toLowerCase();
  return lowerKey.startsWith("utm_") || TRACKING_QUERY_PARAM_NAMES.has(lowerKey);
};

export const normalizeCanonicalPath = (pathname: string) => {
  const collapsed = pathname.replace(/\/{2,}/g, "/");
  if (collapsed === "/" || collapsed === "") {
    return "/";
  }
  return collapsed.replace(/\/+$/, "");
};

const normalizeCanonicalSearch = (pathname: string, search: string) => {
  if (!search) {
    return "";
  }

  const rawSearch = search.startsWith("?") ? search.slice(1) : search;
  if (!rawSearch) {
    return "";
  }

  const params = new URLSearchParams(rawSearch);
  const allowlist = getContentParamAllowlist(pathname);
  const kept = new Map<string, string[]>();

  for (const [key, value] of params.entries()) {
    const lowerKey = key.toLowerCase();

    if (isTrackingQueryParam(lowerKey)) {
      continue;
    }

    // Drop unknown params by default; keep only explicit content params.
    if (!allowlist.has(lowerKey)) {
      continue;
    }

    const values = kept.get(lowerKey) ?? [];
    values.push(value);
    kept.set(lowerKey, values);
  }

  const canonicalParams = new URLSearchParams();
  const sortedKeys = [...kept.keys()].sort((a, b) => a.localeCompare(b));

  for (const key of sortedKeys) {
    const sortedValues = [...(kept.get(key) ?? [])].sort((a, b) => a.localeCompare(b));
    for (const value of sortedValues) {
      canonicalParams.append(key, value);
    }
  }

  const normalized = canonicalParams.toString();
  return normalized ? `?${normalized}` : "";
};

export const buildCanonicalUrl = (baseUrl: string, pathname: string, search: string) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const canonicalPath = normalizeCanonicalPath(pathname);
  const canonicalSearch = normalizeCanonicalSearch(canonicalPath, search);
  return `${normalizedBase}${canonicalPath}${canonicalSearch}`;
};
