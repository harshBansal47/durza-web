import { chromium } from 'playwright';
import fs from 'node:fs';
const base = 'http://localhost:3000';
const dir = 'migration/content/collection';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

function normalize(s) { return s.replace(/\s+/g, ' ').trim(); }

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

for (const f of files) {
  const doc = JSON.parse(fs.readFileSync(dir + '/' + f, 'utf8'));
  const slug = doc.slug;
  await page.goto(base + '/collections/' + slug, { waitUntil: 'networkidle' });
  let clicks = 0;
  while (true) {
    const btn = page.getByRole('button', { name: /Show \d+ more/i }).first();
    if (await btn.count() === 0) break;
    try { await btn.click({ timeout: 2000 }); clicks++; await page.waitForTimeout(200); } catch { break; }
    if (clicks > 100) break;
  }
  await page.waitForTimeout(500);
  const html = await page.evaluate(() => document.querySelector('main')?.innerHTML || document.body.innerHTML);
  const text = await page.evaluate(() => document.querySelector('main')?.innerText || '');

  const hrefRegex = /href="([^"]+)"/g;
  const hrefs = new Set();
  let m;
  while ((m = hrefRegex.exec(html)) !== null) hrefs.add(m[1]);
  const productHrefs = [...hrefs].filter(h => /\/go\/|\/coupons\/|amazon\.in\/dp|http/.test(h));

  const jsonNorm = normalize(JSON.stringify(doc));

  let missingHrefs = 0;
  const missingHrefList = [];
  for (const h of productHrefs) {
    if (!jsonNorm.includes(h)) { missingHrefs++; if (missingHrefList.length < 10) missingHrefList.push(h); }
  }

  const sentences = text.split(/(?<=[.!?])\s+/).map(normalize).filter(s => s.length >= 30);
  const uniqueSentences = [...new Set(sentences)];
  let missingSent = 0;
  const missingSentList = [];
  for (const s of uniqueSentences) {
    if (!jsonNorm.includes(s)) { missingSent++; if (missingSentList.length < 5) missingSentList.push(s); }
  }

  console.log(`\n=== ${slug} ===`);
  console.log(`clicks=${clicks} productHrefs=${productHrefs.length} missingHrefs=${missingHrefs}`);
  console.log(`sentences=${uniqueSentences.length} missingSentences=${missingSent}`);
  if (missingHrefList.length) console.log('  missing hrefs (sample):', missingHrefList);
  if (missingSentList.length) console.log('  missing sentences (sample):', missingSentList);
}

await browser.close();
