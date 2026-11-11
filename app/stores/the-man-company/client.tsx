"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("the-man-company", url, sub);
const OFFERS = [
  { code: "TMC15", badge: "SITEWIDE EXTRA", title: "Extra 15% OFF on All Grooming & Perfumes", desc: "Valid across Almond & Thyme beard oils, Blanc EDP and charcoal washes.", url: "https://www.themancompany.com/collections/best-sellers", sub: "tmc15" },
  { code: "BEARD20", badge: "GROWTH SAVER", title: "Flat 20% OFF on Complete Beard Kits", desc: "Applies when purchasing Derma Roller + Beard Growth Oil combos.", url: "https://www.themancompany.com/collections/beard-care", sub: "beard20" },
  { code: "PREPAID5", badge: "INSTANT UPI", title: "Extra 5% Instant OFF on Prepaid Orders", desc: "Instant payment gateway deduction on UPI and Cards.", url: "https://www.themancompany.com", sub: "prepaid5" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Nationwide Shipping Above ₹499", desc: "Doorstep shipping fee waived on all orders above ₹499.", url: "https://www.themancompany.com", sub: "freeship" },
];
const CONCERNS = ["Beard Growth & Care", "Long-Lasting Fragrances (EDP)", "Charcoal Skin Detox", "Hair Styling & Hold"];
const PRODUCTS = [
  { concern: "Beard Growth & Care", name: "Beard Growth Oil with Almond & Thyme (50ml)", specs: "100% Natural Essential Oils • Non-Greasy • Daily Softening", price: "₹349", mrp: "₹499", url: "https://www.themancompany.com/products/beard-growth-oil-almond-thyme-50ml", sub: "beard_growth_oil" },
  { concern: "Beard Growth & Care", name: "Beard Growth Pro Kit (Derma Roller + Growth Oil + Wash)", specs: "0.5mm Titanium Micro-Needle Roller + 50ml Oil + 100ml Cleanser", price: "₹899", mrp: "₹1,499", url: "https://www.themancompany.com/products/beard-growth-kit", sub: "beard_growth_kit" },
  { concern: "Long-Lasting Fragrances (EDP)", name: "Blanc Eau De Parfum for Men (100ml)", specs: "Lemon, Birch → Lavender, Apple → Patchouli, Oakmoss (8H+)", price: "₹849", mrp: "₹1,299", url: "https://www.themancompany.com/products/eau-de-parfum-blanc-for-men", sub: "blanc_edp" },
  { concern: "Charcoal Skin Detox", name: "Activated Charcoal Face Wash & Scrub Combo", specs: "100ml Cleanser + 100g Scrub with Ylang Ylang & Clove", price: "₹499", mrp: "₹699", url: "https://www.themancompany.com/products/charcoal-face-wash", sub: "charcoal_combo" },
  { concern: "Hair Styling & Hold", name: "Brawn Strong Hold Matte Clay Hair Wax (100g)", specs: "Zero Petroleum Wax • Bentonite Clay Base • Ultra-Matte Finish", price: "₹399", mrp: "₹549", url: "https://www.themancompany.com/products/brawn-hair-wax", sub: "hair_wax" },
];
const STEPS = [
  { title: "Step 1 — Micro-needle 2x a week", detail: "Roll the 0.5mm titanium Derma Roller over patchy areas twice weekly to boost blood circulation and collagen production around dormant follicles." },
  { title: "Step 2 — Feed follicles daily", detail: "Apply Almond & Thyme Growth Oil every evening to nourish active hair follicles and soften coarse beard hair." },
  { title: "Step 3 — Bundle and stack", detail: "Buy the Derma Roller + Growth Oil + Wash as a kit and apply code BEARD20 for flat 20% off, plus free shipping above ₹499." },
];
export default function TheManCompanyClient() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-stone-900 to-stone-700 text-white p-8">
        <h1 className="text-3xl font-bold">The Man Company</h1>
        <p className="mt-2 text-sm font-medium text-white">Gentleman In You • Premium Beard Growth, Charcoal Detox &amp; Long-Lasting Scents</p>
        <p className="mt-1 text-xs font-semibold text-white/90">100% Toxin-Free • Natural Essential Oils • SLS &amp; Paraben Free • Free Delivery Above ₹499</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">The 2-Step Patchy Beard Solution Decoder</h2>
        <ol className="mt-4 space-y-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
              <span className="text-sm"><span className="font-semibold text-ink">{s.title}: </span><span className="text-ink-soft">{s.detail}</span></span>
            </li>
          ))}
        </ol>
        <a href={link("https://www.themancompany.com/products/beard-growth-kit", "beard_decoder")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop the Beard Growth Pro Kit</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on The Man Company</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Men&apos;s Grooming Routine &amp; Scent Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CONCERNS.map((c) => (
            <button key={c} type="button" onClick={() => setConcern(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${concern === c ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <div key={p.name} className="rounded-2xl border border-ledger-line bg-white p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{p.specs}</p>
              <div className="mt-2 flex items-baseline gap-2"><span className="text-lg font-bold text-ink">{p.price}</span><span className="text-sm text-ink-soft line-through">{p.mrp}</span></div>
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on The Man Company</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How long does The Man Company Beard Growth Oil take to show results?</summary><p className="mt-2 text-sm text-ink-soft">Most users report softer, thicker-looking growth in 4–8 weeks of nightly use with the Derma Roller twice a week. Results vary by genetics and consistency — combine oil with the roller for best outcomes.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the difference between gas deodorants and Blanc EDP?</summary><p className="mt-2 text-sm text-ink-soft">Deodorants only mask sweat odour for hours. Blanc Eau de Parfum is an 8H+ fragrance with lemon, birch, lavender and patchouli notes layered for office and gym wear — it projects without overpowering.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the minimum order for free shipping?</summary><p className="mt-2 text-sm text-ink-soft">Free doorstep delivery across India on all orders of ₹499 or more — the Beard Growth Oil alone is enough to qualify.</p></details>
      </section>
    </div>
  );
}
