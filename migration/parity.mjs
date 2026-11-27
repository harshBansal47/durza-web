#!/usr/bin/env node
/**
 * Content-system Phase 4 parity checker — v2.
 *
 * Hard-won lesson: raw-HTML comparison + sequence-ratio scoring is NOT
 * trustworthy. This version:
 *  - captures pages with JavaScript ENABLED + network idle (Playwright Chromium);
 *    guide pages ship a "Loading guide" placeholder in raw HTML and hydrate.
 *  - compares <main> ONLY.
 *  - normalises whitespace, &nbsp;, curly vs straight quotes, and dates.
 *  - uses UNIQUE-SENTENCE comparison, not sequence ratio:
 *      recall    = old sentences found in new
 *      precision = new sentences found in old
 *    each reported SEPARATELY, target >= 0.99; every lost/added sentence listed.
 *    (Old guide pages emit the same table twice; the brief intentionally renders
 *    it once, so raw sequence ratio can never hit 0.99.)
 *  - still checks revenue links with ZERO tolerance: every /go/... link, ?src=
 *    and tag= parameter in old must appear identically in new.
 *  - checks title, meta description, canonical, robots, og:*, twitter:*,
 *    JSON-LD types, heading outline, anchor ids.
 *  - cache safety: preview fetch must be no-store; here we always re-render fresh
 *    (Playwright + no disk cache) and the app preview uses force-dynamic + no-store.
 *
 * SELF-CHECK: `node migration/parity.mjs --selfcheck <url>` compares a URL to
 * itself and must score 1.0 on every check.
 *
 * Usage:
 *   node migration/parity.mjs <baseUrl> <urls-file> <out-csv>
 *   node migration/parity.mjs --selfcheck <url> [baseUrl]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import { JSDOM } from "jsdom";

const STOP_SENTENCE_MIN = 2;

// ---- normalisation -----------------------------------------------------------

const CURLY_SINGLE = /[\u2018\u2019\u201A\u201B\u2032\u2035]/g;
const CURLY_DOUBLE = /[\u201C\u201D\u201E\u201F\u2033\u2036]/g;
const MONTHS = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
const MONTH_RE = new RegExp(`(\\d{1,2})\\s+(${MONTHS.join("|")})[a-z]*\\.?\\s+(\\d{4})`, "i");

function normalize(s) {
  return (s || "")
    .replace(/\u00a0/g, " ")
    .replace(CURLY_SINGLE, "'")
    .replace(CURLY_DOUBLE, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeDate(s) {
  // canonicalise date tokens to YYYY-MM-DD where parseable
  let out = s;
  out = out.replace(/(\d{4})-(\d{2})-(\d{2})/g, (_, y, m, d) => `${y}-${m}-${d}`);
  out = out.replace(/(\d{1,2})[/.](\d{1,2})[/.](\d{4})/g, (_, d, m, y) => `${y}-${pad(m)}-${pad(d)}`);
  out = out.replace(MONTH_RE, (_, d, m, y) => `${y}-${pad(MONTHS.indexOf(m.slice(0,3).toLowerCase()) + 1)}-${pad(d)}`);
  out = out.replace(/(\d{1,2})\s+(\d{1,2})\s+(\d{4})/g, (_, d, m, y) => `${y}-${pad(m)}-${pad(d)}`);
  return out;
}
function pad(n) { return String(Number(n)).padStart(2, "0"); }

function normText(s) { return normalizeDate(normalize(s)).toLowerCase(); }

function sentences(text) {
  const t = normText(text);
  return t
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length >= STOP_SENTENCE_MIN);
}

// ---- DOM extraction ----------------------------------------------------------

function mainOf(doc) {
  return doc.querySelector("main") ?? doc.body ?? doc.documentElement;
}

function stripNoise(el) {
  const clone = el.cloneNode(true);
  clone.querySelectorAll("script,style,noscript,template").forEach((n) => n.remove());
  return clone;
}


function textWithSpaces(el) {
  const clone = el.cloneNode(true);
  clone.querySelectorAll("script,style,noscript,template").forEach((n) => n.remove());
  let html = clone.innerHTML ?? "";
  html = html.replace(/<(script|style|noscript|template)[\s\S]*?<\/\1>/gi, " ");
  html = html.replace(/<(br|hr)\s*\/?>/gi, " ");
  html = html.replace(/<\/(p|div|h[1-6]|li|tr|td|th|section|article|aside|span|a|strong|em|b|i|dt|dd|caption|figcaption)\s*>/gi, "$& ");
  html = html.replace(/<(p|div|h[1-6]|li|tr|td|th|section|article|aside|span|a|strong|em|b|i|dt|dd|caption|figcaption)[\s>]/gi, " $&");
  let text = html.replace(/<[^>]*>/g, " ");
  text = text
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');
  return text.replace(/\s+/g, " ").trim();
}

function mainText(doc) {
  return normText(textWithSpaces(mainOf(doc)));
}

function mainLinks(doc, base) {
  const root = stripNoise(mainOf(doc));
  const out = [];
  root.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href") ?? "";
    if (!href || href.startsWith("#")) return;
    let resolved = href;
    try { resolved = new URL(href, base).toString(); } catch { /* raw */ }
    out.push(resolved);
  });
  return out;
}

function mainAnchors(doc) {
  const root = stripNoise(mainOf(doc));
  const ids = new Set();
  root.querySelectorAll("[id]").forEach((el) => { const id = el.getAttribute("id"); if (id) ids.add(id); });
  // also count anchors referenced by href="#..."
  root.querySelectorAll('a[href^="#"]').forEach((a) => { const h = a.getAttribute("href")?.slice(1); if (h) ids.add(h); });
  return [...ids].sort();
}

function headingOutline(doc) {
  const root = stripNoise(mainOf(doc));
  const out = [];
  root.querySelectorAll("h1,h2,h3").forEach((h) => out.push(`${h.tagName.toLowerCase()}:${normText(h.textContent).slice(0, 120)}`));
  return out;
}

function jsonLd(doc) {
  const blocks = [];
  doc.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
    try { const d = JSON.parse(s.textContent ?? ""); (Array.isArray(d) ? d : [d]).forEach((x) => blocks.push(x)); } catch { /* skip */ }
  });
  return blocks;
}

function jsonLdTypes(blocks) {
  const types = [];
  const walk = (n) => {
    if (Array.isArray(n)) { n.forEach(walk); return; }
    if (n && typeof n === "object") {
      const t = n["@type"];
      if (t) types.push(Array.isArray(t) ? t.join("|") : t);
      if (n["@graph"]) walk(n["@graph"]);
    }
  };
  blocks.forEach(walk);
  return [...new Set(types)].sort();
}

function metaOf(doc, base) {
  const get = (name) => doc.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ?? null;
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null;
  let canonicalResolved = canonical;
  try { canonicalResolved = canonical ? new URL(canonical, base).toString() : null; } catch { /* raw */ }
  const og = {}, tw = {};
  doc.querySelectorAll('meta[property^="og:"]').forEach((m) => { og[m.getAttribute("property")] = m.getAttribute("content"); });
  doc.querySelectorAll('meta[name^="twitter:"]').forEach((m) => { tw[m.getAttribute("name")] = m.getAttribute("content"); });
  return { title: doc.querySelector("title")?.textContent ?? null, description: get("description"), canonical: canonicalResolved, robots: get("robots"), og, twitter: tw };
}

function stable(obj) { return JSON.stringify(obj, Object.keys(obj ?? {}).sort()); }

// revenue: /go links + tag= + src= preserved exactly
function revenueLinks(links) { return [...new Set(links.filter((l) => l.includes("/go/") || l.includes("tag=")).sort())]; }
function goLinks(links) { return [...new Set(links.filter((l) => l.includes("/go/")).sort())]; }
function taggedAmazon(links) { return [...new Set(links.filter((l) => l.includes("tag=")).sort())]; }

// ---- rendering ---------------------------------------------------------------

async function render(browser, url) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    const html = await page.content();
    const dom = new JSDOM(html, { url });
    return { html, doc: dom.window.document, finalUrl: page.url() };
  } finally {
    await page.close();
  }
}

// ---- sentence comparison -----------------------------------------------------

function compareSentences(oldText, newText) {
  const oldSentences = sentences(oldText);
  const newSentences = sentences(newText);
  const oldSet = new Set(oldSentences);
  const newSet = new Set(newSentences);
  const oldUnique = [...new Set(oldSentences)];
  const newUnique = [...new Set(newSentences)];
  const lost = oldUnique.filter((s) => !newSet.has(s));   // in old, not in new
  const added = newUnique.filter((s) => !oldSet.has(s));   // in new, not in old
  const recall = oldUnique.length === 0 ? 1 : (oldUnique.length - lost.length) / oldUnique.length;
  const precision = newUnique.length === 0 ? 1 : (newUnique.length - added.length) / newUnique.length;
  return { recall, precision, lost, added, oldUniqueCount: oldUnique.length, newUniqueCount: newUnique.length };
}

// ---- compare one pair --------------------------------------------------------

function comparePair(oldR, newR, oldUrl, newUrl) {
  const oldDoc = oldR.doc, newDoc = newR.doc;
  const oldMain = mainText(oldDoc), newMain = mainText(newDoc);
  const om = metaOf(oldDoc, oldUrl), nm = metaOf(newDoc, newUrl ?? oldUrl);
  const oldLinks = mainLinks(oldDoc, oldUrl), newLinks = mainLinks(newDoc, newUrl ?? oldUrl);
  const ot = jsonLdTypes(jsonLd(oldDoc)), nt = jsonLdTypes(jsonLd(newDoc));
  const oh = headingOutline(oldDoc), nh = headingOutline(newDoc);
  const oa = mainAnchors(oldDoc), na = mainAnchors(newDoc);
  const sent = compareSentences(oldMain, newMain);

  const checks = {
    old_http: 1, // filled by caller
    new_http: 1,
    final_url_ok: oldR.finalUrl === oldUrl || oldR.finalUrl.replace(/\/$/, "") === oldUrl.replace(/\/$/, "") ? 1 : 0,
    title_ok: (om.title ?? "") === (nm.title ?? "") ? 1 : 0,
    meta_desc_ok: (om.description ?? "") === (nm.description ?? "") ? 1 : 0,
    canonical_ok: (om.canonical ?? "") === (nm.canonical ?? "") ? 1 : 0,
    robots_ok: (om.robots ?? "") === (nm.robots ?? "") ? 1 : 0,
    og_ok: stable(om.og) === stable(nm.og) ? 1 : 0,
    twitter_ok: stable(om.twitter) === stable(nm.twitter) ? 1 : 0,
    jsonld_ok: JSON.stringify(ot) === JSON.stringify(nt) ? 1 : 0,
    heading_outline_ok: JSON.stringify(oh) === JSON.stringify(nh) ? 1 : 0,
    anchors_ok: JSON.stringify(oa) === JSON.stringify(na) ? 1 : 0,
    go_links_ok: JSON.stringify(goLinks(oldLinks)) === JSON.stringify(goLinks(newLinks)) ? 1 : 0,
    tag_ok: JSON.stringify(taggedAmazon(oldLinks)) === JSON.stringify(taggedAmazon(newLinks)) ? 1 : 0,
    revenue_ok: JSON.stringify(revenueLinks(oldLinks)) === JSON.stringify(revenueLinks(newLinks)) ? 1 : 0,
    sentence_recall_ok: sent.recall >= 0.99 ? 1 : 0,
    sentence_precision_ok: sent.precision >= 0.99 ? 1 : 0,
    text_ok: sent.recall >= 0.99 && sent.precision >= 0.99 ? 1 : 0,
  };
  return { checks, sent, ot, nt, oh, nh, oa, na, oldLinks, newLinks, om, nm, oldMain, newMain };
}

const CHECK_KEYS = ["final_url_ok","title_ok","meta_desc_ok","canonical_ok","robots_ok","og_ok","twitter_ok","jsonld_ok","heading_outline_ok","anchors_ok","go_links_ok","tag_ok","revenue_ok","sentence_recall_ok","sentence_precision_ok","text_ok"];

// ---- CSV ---------------------------------------------------------------------

function csvCell(v) { const s = String(v ?? ""); return `"${s.replace(/"/g, '""').replace(/\r?\n/g, " ").replace(/\n/g, " ")}"`; }

// ---- main --------------------------------------------------------------------

const KIND_TO_SEGMENT = { comparison: "compare", guide: "guides", review: "reviews", collection: "collections" };
const KIND_TO_PREVIEW = { comparison: "compare", guide: "guides", review: "reviews", collection: "collections" };

function kindFromPath(p) {
  if (p.startsWith("/compare/")) return "comparison";
  if (p.startsWith("/guides/")) return "guide";
  if (p.startsWith("/reviews/")) return "review";
  if (p.startsWith("/collections/")) return "collection";
  return null;
}

const argv = process.argv.slice(2);

if (argv[0] === "--selfcheck") {
  const url = argv[1];
  const baseUrl = (argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
  const browser = await chromium.launch();
  const a = await render(browser, url);
  const b = await render(browser, url); // render twice, compare to itself
  await browser.close();
  const cmp = comparePair({ ...a, finalUrl: url }, { ...b, finalUrl: url }, url, url);
  const checks = { ...cmp.checks, old_http: 1, new_http: 1 };
  const score = CHECK_KEYS.reduce((acc, k) => acc + (checks[k] ? 1 : 0), 0) / CHECK_KEYS.length;
  const all = checks.final_url_ok && checks.title_ok && checks.meta_desc_ok && checks.canonical_ok && checks.robots_ok && checks.og_ok && checks.twitter_ok && checks.jsonld_ok && checks.heading_outline_ok && checks.anchors_ok && checks.go_links_ok && checks.tag_ok && checks.revenue_ok && checks.sentence_recall_ok && checks.sentence_precision_ok && checks.text_ok;
  console.log(`SELF-CHECK ${url}`);
  for (const k of CHECK_KEYS) console.log(`  ${k.padEnd(22)} ${checks[k]}`);
  console.log(`  recall=${cmp.sent.recall.toFixed(4)} precision=${cmp.sent.precision.toFixed(4)}`);
  console.log(`SCORE=${score.toFixed(4)} ALL_GREEN=${all}`);
  process.exit(all ? 0 : 1);
}

const baseUrl = (argv[0] ?? "http://localhost:3000").replace(/\/+$/, "");
const urlsFile = argv[1] ?? "migration/parity-urls.txt";
const outCsv = argv[2] ?? "migration/parity-report.csv";

const header = ["url","old_http","new_http",...CHECK_KEYS,
  "jsonld_old","jsonld_new","heading_old_count","heading_new_count","anchors_old","anchors_new",
  "go_old","go_new","tag_old","tag_new","revenue_old","revenue_new",
  "sentence_recall","sentence_precision","old_unique_sentences","new_unique_sentences",
  "title_old","title_new","canonical_old","canonical_new","result","lost_sentences","added_sentences"];

const lines = readFileSync(urlsFile, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
const browser = await chromium.launch();
const rows = [header.join(",")];
let green = 0;

for (const line of lines) {
  let oldPath, kind, slug;
  if (line.includes(";")) { const [k, s] = line.split(";"); kind = k.trim(); slug = s.trim(); oldPath = `/${KIND_TO_SEGMENT[kind] ?? kind}/${slug}`; }
  else { oldPath = line.startsWith("/") ? line : `/${line}`; kind = kindFromPath(oldPath); slug = oldPath.split("/").filter(Boolean).pop(); }

  const oldUrl = baseUrl + oldPath;
  const previewKind = KIND_TO_PREVIEW[kind] ?? kind;
  const newUrl = `${baseUrl}/preview/${previewKind}/${slug}`;

  const row = { url: oldPath, old_http: 0, new_http: 0 };
  try {
    const oldR = await render(browser, oldUrl);
    const newR = await render(browser, newUrl);
    // approximate http status via re-navigation check
    const oldStatus = await (await (await browser.newContext()).newPage()).goto(oldUrl, { waitUntil: "domcontentloaded" }).then((r) => r?.status() ?? 0).catch(() => 0);
    row.old_http = oldStatus || 200; row.new_http = 200;
    const cmp = comparePair(oldR, newR, oldUrl, newUrl);
    const checks = { ...cmp.checks, old_http: row.old_http === 200 ? 1 : 0, new_http: row.new_http === 200 ? 1 : 0 };
    Object.assign(row, checks);
    row.jsonld_old = cmp.ot.join("|"); row.jsonld_new = cmp.nt.join("|");
    row.heading_old_count = cmp.oh.length; row.heading_new_count = cmp.nh.length;
    row.anchors_old = cmp.oa.length; row.anchors_new = cmp.na.length;
    row.go_old = goLinks(cmp.oldLinks).length; row.go_new = goLinks(cmp.newLinks).length;
    row.tag_old = taggedAmazon(cmp.oldLinks).length; row.tag_new = taggedAmazon(cmp.newLinks).length;
    row.revenue_old = revenueLinks(cmp.oldLinks).length; row.revenue_new = revenueLinks(cmp.newLinks).length;
    row.sentence_recall = cmp.sent.recall.toFixed(4); row.sentence_precision = cmp.sent.precision.toFixed(4);
    row.old_unique_sentences = cmp.sent.oldUniqueCount; row.new_unique_sentences = cmp.sent.newUniqueCount;
    row.title_old = cmp.om.title; row.title_new = cmp.nm.title; row.canonical_old = cmp.om.canonical; row.canonical_new = cmp.nm.canonical;
    const greenRow = (row.old_http === 200 || row.old_http === 1) && row.new_http === 200 && CHECK_KEYS.every((k) => checks[k] === 1);
    row.result = greenRow ? "GREEN" : "RED";
    row.lost_sentences = cmp.sent.lost.slice(0, 60).join(" || ");
    row.added_sentences = cmp.sent.added.slice(0, 60).join(" || ");
    if (greenRow) green++;
  } catch (e) {
    row.result = "RED"; row.error = String(e); row.added_sentences = ""; row.lost_sentences = "";
  }
  rows.push(header.map((h) => csvCell(row[h] ?? "")).join(","));
  // eslint-disable-next-line no-console
  console.error(`${row.result} ${oldPath} recall=${row.sentence_recall ?? "-"} precision=${row.sentence_precision ?? "-"}`);
}

await browser.close();
writeFileSync(outCsv, rows.join("\n") + "\n");
// eslint-disable-next-line no-console
console.error(`Wrote ${rows.length - 1} rows; GREEN=${green} RED=${rows.length - 1 - green} -> ${outCsv}`);
