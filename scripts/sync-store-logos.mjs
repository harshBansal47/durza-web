/**
 * Sync store logos into public/store-logos/<domain>.webp.
 *
 * Source of truth: the store catalogue API (slug + website_url). For every
 * store with a website we discover its favicon, normalize it to a 256px WebP
 * on white, and write a report. `lib/store-domains.generated.ts` is regenerated
 * so components can resolve a logo from a slug alone.
 *
 * Usage:
 *   node scripts/sync-store-logos.mjs            # refresh all logos
 *   node scripts/sync-store-logos.mjs --if-missing  # only fetch new domains
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const API_URL = process.env.LOGO_API_URL || "https://api.durza.in/api/v1";
const OUTPUT_DIR = path.resolve("public/store-logos");
const DOMAIN_MAP_PATH = path.resolve("lib/store-domains.generated.ts");
const SIZE = 256;
const TIMEOUT_MS = 10_000;
const CONCURRENCY = 6;
const REFRESH_ALL = !process.argv.includes("--if-missing");

const PREFIXES = ["www", "store", "shop", "m", "mobile"];

/** Store slugs whose API row has no website_url but whose brand domain is known. */
const DOMAIN_OVERRIDES = {
  "pepperfry-com-cps-india": "pepperfry.com",
};

function domainFromWebsite(websiteUrl) {
  try {
    const hostname = new URL(websiteUrl).hostname.toLowerCase();
    const labels = hostname.split(".").filter(Boolean);
    while (labels.length > 2 && PREFIXES.includes(labels[0])) labels.shift();
    return labels.join(".");
  } catch {
    return null;
  }
}

async function fetchWithTimeout(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; DurzaLogoBot/1.0)",
      ...(options.headers || {}),
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    redirect: "follow",
  });
}

async function downloadImage(url, referer) {
  const response = await fetchWithTimeout(url, referer ? { headers: { Referer: referer } } : {});
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/") && !contentType.includes("octet-stream")) {
    throw new Error("Invalid image content type");
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length > 5 * 1024 * 1024) throw new Error("Image exceeds 5MB");
  await sharp(buffer).metadata();
  return buffer;
}

async function discoverFavicon(domain) {
  const origin = `https://${domain}`;
  const candidates = [];

  // The site itself is the most authoritative source, but many brands block
  // bots. A failed/blocked fetch must not stop the fallback chain.
  try {
    const response = await fetchWithTimeout(origin);
    if (response.ok) {
      const html = await response.text();
      const linkPattern = /<link\b[^>]*>/gi;
      for (const tag of html.match(linkPattern) || []) {
        if (!/rel\s*=\s*["']?(icon|shortcut icon|apple-touch-icon|mask-icon)/i.test(tag)) continue;
        const hrefMatch = tag.match(/href\s*=\s*["']([^"']+)["']/i);
        if (hrefMatch) candidates.push(new URL(hrefMatch[1], response.url).href);
      }
      candidates.push(new URL("/favicon.ico", response.url).href);
      candidates.push(new URL("/favicon.png", response.url).href);
    }
  } catch {
    // Fall through to the standard and cached candidates below.
  }

  candidates.push(`${origin}/favicon.ico`);
  candidates.push(`${origin}/favicon.png`);
  candidates.push(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=256`);

  const unique = [...new Set(candidates)];
  for (const url of unique) {
    try {
      const buffer = await downloadImage(url);
      return { url, buffer };
    } catch {
      continue;
    }
  }
  throw new Error("No valid favicon found");
}

async function fetchStores() {
  const all = [];
  let skip = 0;
  const limit = 100;
  for (;;) {
    const url = `${API_URL}/stores?limit=${limit}&skip=${skip}`;
    const response = await fetchWithTimeout(url);
    if (!response.ok) throw new Error(`Store API HTTP ${response.status}`);
    const data = await response.json();
    const items = Array.isArray(data.items) ? data.items : [];
    all.push(...items);
    skip += items.length;
    if (items.length < limit || skip >= (data.total ?? skip)) break;
  }
  return all;
}

async function processStore(store) {
  const domain = DOMAIN_OVERRIDES[store.slug] ?? domainFromWebsite(store.website_url);
  const result = {
    merchant: store.name,
    slug: store.slug,
    domain,
    logoPath: null,
    source: null,
    status: "failed",
  };
  if (!domain) {
    result.error = "No usable website_url";
    return result;
  }

  const outputPath = path.join(OUTPUT_DIR, `${domain}.webp`);
  if (!REFRESH_ALL) {
    try {
      await fs.access(outputPath);
      result.status = "success";
      result.logoPath = outputPath;
      result.source = "cached";
      return result;
    } catch {
      // Missing logo — fetch it below.
    }
  }

  try {
    const { url, buffer } = await discoverFavicon(domain);
    await sharp(buffer)
      .resize(SIZE, SIZE, { fit: "contain", background: "#ffffff" })
      .webp({ quality: 90 })
      .toFile(outputPath);
    result.status = "success";
    result.logoPath = outputPath;
    result.source = url;
  } catch (error) {
    result.error = error instanceof Error ? error.message : "Unknown error";
  }
  return result;
}

async function pool(items, worker, concurrency) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return results;
}

async function writeDomainMap(stores, results) {
  const domains = new Map();
  for (const store of stores) {
    const domain = DOMAIN_OVERRIDES[store.slug] ?? domainFromWebsite(store.website_url);
    if (domain) domains.set(store.slug, domain);
  }
  for (const result of results) {
    if (result.slug && result.domain && result.status === "success") {
      domains.set(result.slug, result.domain);
    }
  }
  const entries = [...domains.entries()].sort(([a], [b]) => a.localeCompare(b));
  const body = entries.map(([slug, domain]) => `  ${JSON.stringify(slug)}: ${JSON.stringify(domain)},`).join("\n");
  await fs.writeFile(
    DOMAIN_MAP_PATH,
    `// Generated by scripts/sync-store-logos.mjs — do not edit by hand.\nexport const STORE_DOMAINS: Record<string, string> = {\n${body}\n};\n`,
    "utf8",
  );
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  let stores = [];
  try {
    stores = await fetchStores();
  } catch (error) {
    console.error(`Store API unavailable: ${error instanceof Error ? error.message : error}`);
    const reportPath = path.join(OUTPUT_DIR, "report.json");
    try {
      await fs.access(reportPath);
      console.log("Keeping the existing report and domain map.");
    } catch {
      await fs.writeFile(reportPath, JSON.stringify([], null, 2));
    }
    return;
  }

  const results = await pool(stores, processStore, CONCURRENCY);
  await fs.writeFile(path.join(OUTPUT_DIR, "report.json"), JSON.stringify(results, null, 2));
  await writeDomainMap(stores, results);

  const success = results.filter((result) => result.status === "success").length;
  console.log(`Logo sync complete: ${success}/${results.length} successful`);
  for (const result of results.filter((r) => r.status === "failed")) {
    console.warn(`  ${result.slug}: ${result.error || "failed"}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 0;
});
