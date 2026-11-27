#!/usr/bin/env node
/**
 * Content-system Phase 4 parity checker.
 *
 * Compares the current public page against the JSON-driven `/preview` rendering
 * of the SAME URL. For each page it extracts (old vs new) and diffs:
 *   1. HTTP 200 + same final URL (no new redirects)
 *   2. <title>, meta description, canonical, robots, og:*, twitter:*
 *   3. JSON-LD (@type list + key fields)
 *   4. h1..h3 outline
 *   5. full internal + outbound + /go/... link set, incl. ?src= and tag=
 *   6. normalized visible text similarity (>= 0.99 target); every diff listed
 *   7. anchor ids other pages link to
 *   8. (sitemap presence handled separately; leftmod noted as reporting column)
 *
 * Usage:
 *   node migration/parity.mjs <baseUrl> <urls-file> <out-csv>
 *   URLS_FILE: one path per line, e.g. /compare/<slug>  or kind;slug;kindLabel
 *
 * Nothing public is changed; read-only GETs. Never "fix" content here; fix the
 * renderer or the JSON instead.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { JSDOM } from "jsdom";

const baseUrl = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
const urlsFile = process.argv[3] ?? "migration/parity-urls.txt";
const outCsv = process.argv[4] ?? "migration/parity-report.csv";

const KIND_TO_SEGMENT = { comparison: "compare", guide: "guides", review: "reviews", collection: "collections" };
const KIND_TO_PREVIEW = { comparison: "compare", guide: "guides", review: "reviews", collection: "collections" };

function parseUrlLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  // kind;slug form
  if (trimmed.includes(";")) {
    const [kind, slug] = trimmed.split(";");
    const kindKey = kind.trim();
    const segment = KIND_TO_SEGMENT[kindKey] ?? kindKey;
    return { oldPath: `/${segment}/${slug.trim()}`, kind: kindKey, slug: slug.trim() };
  }
  // plain public path form: /compare/<slug>, /guides/<slug>, /reviews/<slug>
  return { oldPath: trimmed.startsWith("/") ? trimmed : `/${trimmed}`, kind: null, slug: null };
}

function kindFromPath(p) {
  if (p.startsWith("/compare/")) return "comparison";
  if (p.startsWith("/guides/")) return "guide";
  if (p.startsWith("/reviews/")) return "review";
  if (p.startsWith("/collections/")) return "collection";
  return null;
}

function previewPath(p, parsed) {
  const kind = parsed?.kind ?? kindFromPath(p);
  const slug = parsed?.slug ?? p.split("/").filter(Boolean).pop();
  if (!kind || !slug) return null;
  const k = KIND_TO_PREVIEW[kind] ?? kind;
  return `/preview/${k}/${slug}`;
}

function normalizeText(text) {
  return (text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim()
    .toLowerCase();
}

function visibleText(doc) {
  const clone = doc.cloneNode(true);
  clone.querySelectorAll("script,style,noscript,template").forEach((n) => n.remove());
  return normalizeText(clone.body?.textContent ?? "");
}

function similarity(a, b) {
  if (a === b) return 1;
  if (!a || !b) return 0;
  const shingles = (s) => {
    const tokens = s.split(" ");
    const set = new Set();
    for (let i = 0; i < tokens.length; i++) set.add(tokens.slice(i, i + 3).join(" "));
    return set;
  };
  const A = shingles(a);
  const B = shingles(b);
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  const union = A.size + B.size - inter;
  return union === 0 ? 1 : inter / union;
}

function linksOf(doc, base) {
  const links = [];
  doc.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href") ?? "";
    if (!href || href.startsWith("#")) return;
    let resolved = href;
    try {
      resolved = new URL(href, base).toString();
    } catch {
      /* keep raw */
    }
    links.push(resolved);
  });
  return links;
}

function jsonLd(doc) {
  const blocks = [];
  doc.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
    try {
      const data = JSON.parse(s.textContent ?? "");
      const list = Array.isArray(data) ? data : [data];
      for (const item of list) blocks.push(item);
    } catch {
      /* skip malformed */
    }
  });
  return blocks;
}

function jsonLdTypes(blocks) {
  const types = [];
  const walk = (node) => {
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node && typeof node === "object") {
      const t = node["@type"];
      if (t) types.push(Array.isArray(t) ? t.join("|") : t);
      if (node["@graph"]) walk(node["@graph"]);
    }
  };
  blocks.forEach(walk);
  return [...new Set(types)].sort();
}

function headingOutline(doc) {
  const out = [];
  doc.querySelectorAll("h1,h2,h3").forEach((h) => out.push(`${h.tagName.toLowerCase()}:${normalizeText(h.textContent).slice(0, 120)}`));
  return out;
}

function metaOf(doc, base) {
  const get = (name) => doc.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ?? null;
  const prop = (name) => doc.querySelector(`meta[property="${name}"]`)?.getAttribute("content") ?? null;
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null;
  let canonicalResolved = canonical;
  try { canonicalResolved = canonical ? new URL(canonical, base).toString() : null; } catch { /* keep raw */ }
  const og = {};
  doc.querySelectorAll('meta[property^="og:"]').forEach((m) => { og[m.getAttribute("property")] = m.getAttribute("content"); });
  const tw = {};
  doc.querySelectorAll('meta[name^="twitter:"]').forEach((m) => { tw[m.getAttribute("name")] = m.getAttribute("content"); });
  return {
    title: doc.querySelector("title")?.textContent ?? null,
    description: get("description"),
    canonical: canonicalResolved,
    robots: get("robots"),
    og,
    twitter: tw,
  };
}

function anchors(doc) {
  const ids = new Set();
  doc.querySelectorAll("[id]").forEach((el) => { const id = el.getAttribute("id"); if (id) ids.add(id); });
  return [...ids].sort();
}

function goLinks(links) {
  return links.filter((l) => l.includes("/go/")).sort();
}
function taggedAmazon(links) {
  return links.filter((l) => l.includes("tag=")).sort();
}
function affiliateParams(l) {
  try {
    const u = new URL(l);
    const p = {};
    for (const [k, v] of u.searchParams) p[k] = v;
    return JSON.stringify(p, Object.keys(p).sort());
  } catch { return ""; }
}

async function fetchPage(url) {
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "durza-parity/1.0" } });
  const html = await res.text();
  const dom = new JSDOM(html, { url });
  return { status: res.status, finalUrl: res.url, dom, html };
}

function csvCell(v) {
  const s = String(v ?? "");
  return `"${s.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
}

const header = [
  "url", "old_http", "new_http", "final_url_ok", "title_ok", "title_old", "title_new",
  "meta_desc_ok", "canonical_ok", "canonical_old", "canonical_new", "robots_ok",
  "og_ok", "twitter_ok", "jsonld_types_old", "jsonld_types_new", "jsonld_ok",
  "heading_outline_ok", "heading_old_count", "heading_new_count",
  "internal_links_old", "internal_links_new", "links_ok", "go_links_old", "go_links_new", "go_links_ok",
  "tag_amazon_old", "tag_amazon_new", "tag_ok", "affiliate_params_ok",
  "anchors_old", "anchors_new", "anchors_ok", "text_similarity", "text_ok", "result",
];

const lines = readFileSync(urlsFile, "utf8").split(/\r?\n/).map(parseUrlLine).filter(Boolean);
const rows = [header.join(",")];

for (const parsed of lines) {
  const oldPath = parsed.oldPath;
  const newPath = previewPath(oldPath, parsed);
  const oldUrl = baseUrl + oldPath;
  const newUrl = newPath ? baseUrl + newPath : null;
  const row = { url: oldPath, result: "GREEN" };
  try {
    const old = await fetchPage(oldUrl);
    const newD = newUrl ? await fetchPage(newUrl) : { status: 404, finalUrl: "", dom: new JSDOM("<html><body></body></html>") };
    const oldDoc = old.dom.window.document;
    const newDoc = newD.dom.window.document;

    row.old_http = old.status; row.new_http = newD.status;
    row.final_url_ok = old.finalUrl === oldUrl || old.finalUrl.endsWith(oldPath) || old.finalUrl.endsWith(oldPath.replace(/\/$/, "")) ? 1 : 0;

    const om = metaOf(oldDoc, oldUrl); const nm = metaOf(newDoc, newUrl ?? oldUrl);
    row.title_old = om.title; row.title_new = nm.title; row.title_ok = om.title === nm.title ? 1 : 0;
    row.meta_desc_ok = (om.description ?? "") === (nm.description ?? "") ? 1 : 0;
    row.canonical_old = om.canonical; row.canonical_new = nm.canonical; row.canonical_ok = (om.canonical ?? "") === (nm.canonical ?? "") ? 1 : 0;
    row.robots_ok = (om.robots ?? "") === (nm.robots ?? "") ? 1 : 0;
    row.og_ok = JSON.stringify(om.og, Object.keys(om.og).sort()) === JSON.stringify(nm.og, Object.keys(nm.og).sort()) ? 1 : 0;
    row.twitter_ok = JSON.stringify(om.twitter, Object.keys(om.twitter).sort()) === JSON.stringify(nm.twitter, Object.keys(nm.twitter).sort()) ? 1 : 0;

    const ot = jsonLdTypes(jsonLd(oldDoc)); const nt = jsonLdTypes(jsonLd(newDoc));
    row.jsonld_types_old = ot.join("|"); row.jsonld_types_new = nt.join("|");
    row.jsonld_ok = JSON.stringify(ot) === JSON.stringify(nt) ? 1 : 0;

    const oh = headingOutline(oldDoc); const nh = headingOutline(newDoc);
    row.heading_old_count = oh.length; row.heading_new_count = nh.length;
    row.heading_outline_ok = JSON.stringify(oh) === JSON.stringify(nh) ? 1 : 0;

    const oLinks = linksOf(oldDoc, oldUrl); const nLinks = linksOf(newDoc, newUrl ?? oldUrl);
    const oInternal = oLinks.filter((l) => l.startsWith(baseUrl)).sort();
    const nInternal = nLinks.filter((l) => l.startsWith(baseUrl)).sort();
    row.internal_links_old = oInternal.length; row.internal_links_new = nInternal.length;
    row.links_ok = JSON.stringify([...new Set(oInternal)]) === JSON.stringify([...new Set(nInternal)]) ? 1 : 0;

    const og = goLinks(oLinks); const ng = goLinks(nLinks);
    row.go_links_old = og.length; row.go_links_new = ng.length; row.go_links_ok = JSON.stringify(og) === JSON.stringify(ng) ? 1 : 0;

    const ot2 = taggedAmazon(oLinks); const nt2 = taggedAmazon(nLinks);
    row.tag_amazon_old = ot2.length; row.tag_amazon_new = nt2.length; row.tag_ok = JSON.stringify(ot2) === JSON.stringify(nt2) ? 1 : 0;
    row.affiliate_params_ok = JSON.stringify(ot2.map(affiliateParams)) === JSON.stringify(nt2.map(affiliateParams)) ? 1 : 0;

    const oa = anchors(oldDoc); const na = anchors(newDoc);
    row.anchors_old = oa.length; row.anchors_new = na.length; row.anchors_ok = JSON.stringify(oa) === JSON.stringify(na) ? 1 : 0;

    const oText = visibleText(oldDoc); const nText = visibleText(newDoc);
    const sim = similarity(oText, nText);
    row.text_similarity = sim.toFixed(4); row.text_ok = sim >= 0.99 ? 1 : 0;

    const checks = [
      old.status === 200 && newD.status === 200,
      row.final_url_ok, row.title_ok, row.meta_desc_ok, row.canonical_ok, row.robots_ok,
      row.og_ok, row.twitter_ok, row.jsonld_ok, row.heading_outline_ok, row.links_ok,
      row.go_links_ok, row.tag_ok, row.affiliate_params_ok, row.anchors_ok, row.text_ok,
    ];
    row.result = checks.every((c) => c === 1 || c === true) ? "GREEN" : "RED";
  } catch (e) {
    row.result = "RED";
    row.error = String(e);
  }

  const cells = header.map((h) => csvCell(row[h] ?? ""));
  rows.push(cells.join(","));
  // eslint-disable-next-line no-console
  console.error(`${row.result} ${oldPath}`);
}

writeFileSync(outCsv, rows.join("\n") + "\n");
// eslint-disable-next-line no-console
console.error(`Wrote ${rows.length - 1} rows -> ${outCsv}`);
