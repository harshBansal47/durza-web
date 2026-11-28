#!/usr/bin/env node
/**
 * Content-system Phase 4 visual check (Step 6).
 *
 * Captures before/after screenshots at 390px and 1280px widths for every URL:
 *   old route vs JSON-driven /preview route, full-page, Playwright Chromium.
 *
 * Run after a fresh build + the staging API on :8000 + web on :3000.
 *
 *   npx playwright install chromium        # NOT --with-deps if sudo is unavailable
 *   node migration/screenshots.mjs <baseUrl> <urls-file> <out-dir>
 *
 * Output: <out-dir>/<n>/<kind>_<slug>/old-390.png, old-1280.png,
 *                                        new-390.png, new-1280.png
 *
 * kinds in scope: compare/guides/reviews. (collections out of scope this pass.)
 */

import { readFileSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const KIND_TO_SEGMENT = { comparison: "compare", guide: "guides", review: "reviews", collection: "collections" };
const KIND_TO_PREVIEW = { comparison: "compare", guide: "guides", review: "reviews", collection: "collections" };

function kindFromPath(p) {
  if (p.startsWith("/compare/")) return "comparison";
  if (p.startsWith("/guides/")) return "guide";
  if (p.startsWith("/reviews/")) return "review";
  return null;
}

const WIDTHS = [390, 1280];

const baseUrl = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
const urlsFile = process.argv[3] ?? "migration/parity-compare.txt";
const outDir = process.argv[4] ?? "migration/screenshots";

const lines = readFileSync(urlsFile, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
const browser = await chromium.launch();

let i = 0;
for (const line of lines) {
  let oldPath, kind, slug;
  if (line.includes(";")) { const [k, s] = line.split(";"); kind = k.trim(); slug = s.trim(); oldPath = `/${KIND_TO_SEGMENT[kind] ?? kind}/${slug}`; }
  else { oldPath = line.startsWith("/") ? line : `/${line}`; kind = kindFromPath(oldPath); slug = oldPath.split("/").filter(Boolean).pop(); }

  const oldUrl = baseUrl + oldPath;
  const newUrl = `${baseUrl}/preview/${KIND_TO_PREVIEW[kind] ?? kind}/${slug}`;
  const dir = `${outDir}/${String(++i).padStart(3, "0")}/${kind}_${slug}`;
  mkdirSync(dir, { recursive: true });

  for (const [label, url] of [["old", oldUrl], ["new", newUrl]]) {
    for (const width of WIDTHS) {
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
        await page.screenshot({ path: `${dir}/${label}-${width}.png`, fullPage: true });
      } catch (e) {
        console.error(`  ! ${label}-${width} ${url}: ${e}`);
      } finally {
        await page.close();
      }
    }
  }
  console.error(`shot ${oldPath} -> ${dir}`);
}

await browser.close();
console.error(`\nDone ${i} pages -> ${outDir}`);
