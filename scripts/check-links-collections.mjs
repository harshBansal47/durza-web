import { chromium } from 'playwright';
import fs from 'node:fs';
const base = 'http://localhost:3000';
const dir = 'migration/content/collection';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const allHrefs = new Set();
for (const f of files) {
  const doc = JSON.parse(fs.readFileSync(dir + '/' + f, 'utf8'));
  await page.goto(base + '/collections/' + doc.slug, { waitUntil: 'networkidle' });
  let clicks = 0;
  while (true) {
    const btn = page.getByRole('button', { name: /Show \d+ more/i }).first();
    if (await btn.count() === 0) break;
    try { await btn.click({ timeout: 2000 }); clicks++; await page.waitForTimeout(200); } catch { break; }
    if (clicks > 200) break;
  }
  await page.waitForTimeout(500);
  const html = await page.evaluate(() => document.querySelector('main')?.innerHTML || '');
  const re = /href="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) allHrefs.add(m[1]);
}
await browser.close();
const links = [...allHrefs].filter(h => /\/go\/|\/coupons\/|amazon\.in\/dp|http/.test(h));
const results = { total: links.length, ok: 0, fail: 0, byStatus: {} };
const failures = [];
for (const l of links) {
  const url = l.startsWith('http') ? l : base + l;
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000) });
    results.byStatus[res.status] = (results.byStatus[res.status] || 0) + 1;
    if (res.status >= 200 && res.status < 400) results.ok++; else { results.fail++; failures.push({ url, status: res.status }); }
  } catch (e) {
    results.fail++;
    results.byStatus['ERR'] = (results.byStatus['ERR'] || 0) + 1;
    failures.push({ url, status: 'ERR', err: String(e).slice(0, 80) });
  }
}
console.log(JSON.stringify(results, null, 2));
console.log('FAILURES:', failures.length);
fs.writeFileSync('migration/link-check-baseline.json', JSON.stringify({ results, failures }, null, 2));
