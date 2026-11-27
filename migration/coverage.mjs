#!/usr/bin/env node
/**
 * Content-system Phase 2/4: extraction coverage test (independent of rendering).
 *
 * For every page, every NORMALISED SENTENCE and every HREF in the old page's
 * rendered <main> (JavaScript enabled + network idle) must exist in the
 * extracted JSON document. Fails the page on any miss. Goal: 100% per page.
 *
 * Usage:
 *   node migration/coverage.mjs <baseUrl> <urls-file> <json-dir> <out-csv>
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { JSDOM } from "jsdom";

const KIND_TO_SEGMENT = { comparison: "compare", guide: "guides", review: "reviews", collection: "collections" };

const CURLY_SINGLE = /[\u2018\u2019\u201A\u201B\u2032\u2035]/g;
const CURLY_DOUBLE = /[\u201C\u201D\u201E\u201F\u2033\u2036]/g;
function normalize(s) { return (s || "").replace(/\u00a0/g, " ").replace(CURLY_SINGLE, "'").replace(CURLY_DOUBLE, '"').replace(/\s+/g, " ").trim().toLowerCase(); }
function sentences(text) { return normalize(text).split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter((x) => x.length >= 2); }

function kindFromPath(p) {
  if (p.startsWith("/compare/")) return "comparison";
  if (p.startsWith("/guides/")) return "guide";
  if (p.startsWith("/reviews/")) return "review";
  if (p.startsWith("/collections/")) return "collection";
  return null;
}

// collect every string + href present in a JSON content document
function jsonStringsAndHrefs(doc) {
  const strings = new Set();
  const hrefs = new Set();
  const push = (v) => { if (typeof v === "string") { strings.add(normalize(v)); for (const s of sentences(v)) strings.add(s); } };
  const walk = (node, key) => {
    if (Array.isArray(node)) { node.forEach((n) => walk(n, key)); return; }
    if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) {
        if (typeof v === "string") {
          push(v);
          if (/href|url|src|link/i.test(k) || k === "href") { hrefs.add(v); }
        } else { walk(v, k); }
      }
      return;
    }
    push(node);
  };
  walk(doc, "");
  return { strings, hrefs };
}

function csvCell(v) { const s = String(v ?? ""); return `"${s.replace(/"/g, '""').replace(/\r?\n/g, " ").replace(/\n/g, " ")}"`; }

const baseUrl = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
const urlsFile = process.argv[3] ?? "migration/parity-urls.txt";
const jsonDir = process.argv[4] ?? "migration/content";
const outCsv = process.argv[5] ?? "migration/coverage-report.csv";

function findJson(kind, slug) {
  const p = join(jsonDir, kind, `${slug}.json`);
  try { return JSON.parse(readFileSync(p, "utf8")); } catch { return null; }
}

const lines = readFileSync(urlsFile, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
const browser = await chromium.launch();
const header = ["url","kind","has_json","main_sentences","sentences_in_json","sentence_coverage","main_hrefs","hrefs_in_json","href_coverage","result","missing_sentences","missing_hrefs"];
const rows = [header.join(",")];
let green = 0;

for (const line of lines) {
  let oldPath, kind, slug;
  if (line.includes(";")) { const [k, s] = line.split(";"); kind = k.trim(); slug = s.trim(); oldPath = `/${KIND_TO_SEGMENT[kind] ?? kind}/${slug}`; }
  else { oldPath = line.startsWith("/") ? line : `/${line}`; kind = kindFromPath(oldPath); slug = oldPath.split("/").filter(Boolean).pop(); }

  const row = { url: oldPath, kind, result: "RED" };
  try {
    const page = await browser.newPage();
    await page.goto(baseUrl + oldPath, { waitUntil: "networkidle", timeout: 60000 });
    const html = await page.content();
    await page.close();
    const doc = new JSDOM(html, { url: baseUrl + oldPath }).window.document;
    const main = doc.querySelector("main") ?? doc.body;

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

    const oldSentences = [...new Set(sentences(textWithSpaces(main)))];
    const oldHrefs = [...new Set([...main.querySelectorAll("a[href]")].map((a) => a.getAttribute("href") ?? "").filter((h) => h && !h.startsWith("#")))];

    const json = findJson(kind, slug);
    row.has_json = json ? 1 : 0;
    const { strings, hrefs } = json ? jsonStringsAndHrefs(json) : { strings: new Set(), hrefs: new Set() };
    const hrefList = json ? [...hrefs] : [];

    const missingSentences = oldSentences.filter((s) => !strings.has(s) && ![...strings].some((x) => x.includes(s)));
    const missingHrefs = oldHrefs.filter((h) => !hrefs.has(h) && !hrefList.some((x) => h.includes(x) || x.includes(h)));

    row.main_sentences = oldSentences.length;
    row.sentences_in_json = oldSentences.length - missingSentences.length;
    row.sentence_coverage = oldSentences.length === 0 ? "1.0000" : ((oldSentences.length - missingSentences.length) / oldSentences.length).toFixed(4);
    row.main_hrefs = oldHrefs.length;
    row.hrefs_in_json = oldHrefs.length - missingHrefs.length;
    row.href_coverage = oldHrefs.length === 0 ? "1.0000" : ((oldHrefs.length - missingHrefs.length) / oldHrefs.length).toFixed(4);
    row.missing_sentences = missingSentences.slice(0, 60).join(" || ");
    row.missing_hrefs = missingHrefs.slice(0, 60).join(" || ");
    const ok = json && Number(row.sentence_coverage) >= 0.99 && Number(row.href_coverage) >= 0.99;
    row.result = ok ? "GREEN" : "RED";
    if (ok) green++;
  } catch (e) { row.result = "RED"; row.missing_sentences = String(e); }
  rows.push(header.map((h) => csvCell(row[h] ?? "")).join(","));
  // eslint-disable-next-line no-console
  console.error(`${row.result} ${oldPath} sentence=${row.sentence_coverage} href=${row.href_coverage}`);
}

await browser.close();
writeFileSync(outCsv, rows.join("\n") + "\n");
// eslint-disable-next-line no-console
console.error(`Wrote ${rows.length - 1} rows; GREEN=${green} RED=${rows.length - 1 - green} -> ${outCsv}`);
