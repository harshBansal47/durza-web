/**
 * Sitemap audit: fetch the index and every child shard, report URL counts,
 * find duplicate submissions, and verify each URL is a live, self-canonical,
 * indexable page.
 *
 *   node scripts/audit-sitemaps.mjs [origin]
 *
 * Defaults to https://durza.in. Exits non-zero when a URL is not HTTP 200,
 * has no self-referencing canonical, is `noindex`, or when the same URL is
 * submitted more than once.
 */

const ORIGIN = (process.argv[2] || process.env.SITE_URL || "https://durza.in").replace(/\/+$/, "");
const CONCURRENCY = 6;

function locs(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => m[1].trim());
}

async function get(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "DurzaSitemapAudit/1.0 (+https://durza.in)" },
    signal: AbortSignal.timeout(30000),
  });
  return { status: response.status, body: await response.text() };
}

function key(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname.toLowerCase()}${parsed.pathname.replace(/\/+$/, "") || "/"}`;
  } catch {
    return url.replace(/\/+$/, "");
  }
}

function checkPage(html, url) {
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1]
    ?? html.match(/<link[^>]*href="([^"]+)"[^>]*rel="canonical"/i)?.[1]
    ?? null;
  const robots = html.match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/i)?.[1] ?? null;
  const problems = [];
  if (!canonical) problems.push("no canonical");
  else if (key(canonical) !== key(url)) problems.push(`canonical mismatch (${canonical})`);
  if (robots && /noindex/i.test(robots)) problems.push(`noindex (${robots})`);
  return problems;
}

async function pooled(items, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor++;
        results[index] = await worker(items[index], index);
      }
    }),
  );
  return results;
}

const index = await get(`${ORIGIN}/sitemap.xml`);
if (index.status !== 200) {
  console.error(`sitemap index returned HTTP ${index.status}`);
  process.exit(1);
}
const shards = locs(index.body);
console.log(`index: ${shards.length} shards`);

const shardResults = await pooled(shards, async (url) => {
  const res = await get(url);
  return { url, status: res.status, urls: res.status === 200 ? locs(res.body) : [] };
});

const owners = new Map();
const duplicates = [];
for (const shard of shardResults) {
  console.log(`  ${shard.status} ${shard.url.replace(ORIGIN, "")}: ${shard.urls.length} URLs`);
  for (const url of shard.urls) {
    const k = key(url);
    if (owners.has(k)) duplicates.push({ url, first: owners.get(k), again: shard.url });
    else owners.set(k, shard.url);
  }
}

const unique = [...owners.keys()];
console.log(`total submissions: ${shardResults.reduce((n, s) => n + s.urls.length, 0)}`);
console.log(`unique URLs:       ${unique.length}`);
console.log(`duplicates:        ${duplicates.length}`);
for (const duplicate of duplicates) {
  console.log(`  DUP ${duplicate.url} (${duplicate.first} and ${duplicate.again})`);
}

// Recover original URLs from keys by keeping the first submitted URL per key.
const firstUrls = new Map();
for (const shard of shardResults) {
  for (const url of shard.urls) {
    const k = key(url);
    if (!firstUrls.has(k)) firstUrls.set(k, url);
  }
}

const pageResults = await pooled([...firstUrls.values()], async (url) => {
  try {
    const res = await get(url);
    const problems = [];
    if (res.status !== 200) problems.push(`HTTP ${res.status}`);
    else problems.push(...checkPage(res.body, url));
    return { url, problems };
  } catch (error) {
    return { url, problems: [String(error)] };
  }
});

const badPages = pageResults.filter((r) => r.problems.length);
console.log(`verified pages:    ${pageResults.length}`);
console.log(`bad pages:         ${badPages.length}`);
for (const page of badPages) console.log(`  BAD ${page.url}: ${page.problems.join("; ")}`);

if (duplicates.length || badPages.length) process.exit(1);
console.log("OK: every URL is a unique, HTTP 200, self-canonical, indexable page.");
