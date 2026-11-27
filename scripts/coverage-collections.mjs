import { chromium } from 'playwright';
import fs from 'node:fs';
const base='http://localhost:3000';
const slugs=JSON.parse('[]');
const dir='migration/content/collection';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.json'));
const browser=await chromium.launch({headless:true});
const page=await browser.newPage();
for(const f of files){
  const doc=JSON.parse(fs.readFileSync(dir+'/'+f,'utf8'));
  const slug=doc.slug;
  await page.goto(base+'/collections/'+slug,{waitUntil:'networkidle'});
  const oldText=await page.evaluate(()=>document.querySelector('main')?.innerText||'');
  const jsonText=JSON.stringify(doc);
  // hrefs
  const oldHrefs=new Set((oldText.match(/https?:\/\/[^\s)]+/g)||[]));
  let missing=0;
  for(const h of oldHrefs){ if(!jsonText.includes(h)) missing++; }
  console.log(slug, 'oldHrefs=',oldHrefs.size, 'missingInJson=',missing);
}
await browser.close();
