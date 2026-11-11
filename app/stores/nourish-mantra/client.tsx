"use client";
import { useState } from "react";
const TRACK = "https://track.vcommission.com/click?campaign_id=12144&pub_id=133499";
function link(url: string, sub: string) { return `${TRACK}&sub1=${sub}&url=${encodeURIComponent(url)}`; }
const OFFERS = [
  { code: "MANTRA15", badge: "SITEWIDE EXTRA", title: "Flat 15% OFF on Clean Skincare & Serums", desc: "Valid on Urban Rani Youth Serum, Cosmic Sutra Eye Gel and cleansers.", url: "https://nourishmantra.in/collections/all-products", sub: "mantra15" },
  { code: "GLOW20", badge: "REGIMEN SAVER", title: "Flat 20% OFF on Orders Above ₹1,499", desc: "Applies across skincare duos, anti-aging kits and hair regimens.", url: "https://nourishmantra.in/collections/combos", sub: "glow20" },
  { code: "EXTRA5", badge: "PREPAID COMBO", title: "Extra 5% Instant OFF on UPI / Cards", desc: "Instant payment gateway deduction on all prepaid checkouts.", url: "https://nourishmantra.in", sub: "extra5" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Nationwide Shipping Above ₹499", desc: "Doorstep fee waived across all PIN codes above ₹499.", url: "https://nourishmantra.in", sub: "freeship" },
];
const CONCERNS = ["Glow & Anti-Aging Serums", "Late-Night Under-Eye Care", "Scalp Health & Hair Density", "Vedic Body Polishing"];
const PRODUCTS = [
  { concern: "Glow & Anti-Aging Serums", name: "Urban Rani Youth Serum (Anti-Aging Face Elixir)", specs: "30ml Dropper • Fortunella Fruit, Niacinamide & Okra Extracts", price: "₹1,299", mrp: "₹1,999", url: "https://nourishmantra.in/products/urban-rani-youth-serum", sub: "urban_rani_serum" },
  { concern: "Glow & Anti-Aging Serums", name: "Glow Hobo 10% Vitamin C + Marine Algae Serum", specs: "30ml Glow Shield • Fades Dark Spots & Hyperpigmentation", price: "₹799", mrp: "₹1,199", url: "https://nourishmantra.in/products/vitamin-c-serum", sub: "vitamin_c_serum" },
  { concern: "Late-Night Under-Eye Care", name: "Cosmic Sutra Eye Contour Gel with Peptides", specs: "15g Tube + Metal Roller • Caffeine, Peptides & Ashwagandha", price: "₹649", mrp: "₹899", url: "https://nourishmantra.in/products/cosmic-sutra-eye-contour-gel", sub: "eye_contour_gel" },
  { concern: "Scalp Health & Hair Density", name: "Advanced Hair Growth Serum with Redensyl & Anagain", specs: "50ml Water-Based Tonic • Stimulates Dormant Hair Follicles", price: "₹999", mrp: "₹1,499", url: "https://nourishmantra.in/products/hair-growth-serum", sub: "hair_growth_serum" },
  { concern: "Vedic Body Polishing", name: "Kashmiri Lavender & Walnut Gentle Body Scrub", specs: "150g Tub • Natural Crushed Walnut Beads & Pure Lavender", price: "₹499", mrp: "₹699", url: "https://nourishmantra.in/products/lavender-body-scrub", sub: "body_scrub" },
];
const CONFIDENCE = [
  { title: "Vedic Modernity", detail: "Traditional herbs like Ashwagandha and Gotu Kola fused with clinical actives — Peptides and Niacinamide — in one formula." },
  { title: "Clean Guarantee", detail: "Zero parabens, phthalates, synthetic sulphates, or animal derivatives. PETA-certified cruelty-free and 100% vegan; plastic-neutral packaging." },
  { title: "Stacking Formula", detail: "Catalog discount + GLOW20 (flat 20% off above ₹1,499) + 5% instant UPI deduction = maximum savings on clean beauty." },
];
export default function NourishMantraClient() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-700 text-white p-8">
        <h1 className="text-3xl font-bold">Nourish Mantra</h1>
        <p className="mt-2 text-sm font-medium text-white">Modern Clean Skincare Rooted in Vedic Wisdom • 100% Vegan &amp; Plastic Neutral</p>
        <p className="mt-1 text-xs font-semibold text-white/90">PETA-Certified Cruelty-Free • No Parabens, Sulphates or Phthalates • Free Delivery Above ₹499</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Clean Formulation Confidence Card</h2>
        <p className="mt-1 text-sm text-ink-soft">Why Nourish Mantra formulas convert — and how to stack the discounts.</p>
        <ol className="mt-4 space-y-3">
          {CONFIDENCE.map((item, i) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
              <span className="text-sm"><span className="font-semibold text-ink">{item.title}: </span><span className="text-ink-soft">{item.detail}</span></span>
            </li>
          ))}
        </ol>
        <a href={link("https://nourishmantra.in/collections/combos", "confidence_card")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Build My Clean Routine</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Nourish Mantra</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Vedic Activism &amp; Clean Concern Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Nourish Mantra</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does the Nourish Mantra Urban Rani Youth Serum work?</summary><p className="mt-2 text-sm text-ink-soft">Urban Rani Youth Serum blends modern actives like Niacinamide with traditional botanical extracts like Fortunella fruit and Okra. It works as an intensive cellular hydrator and pollution shield, reducing fine lines and evening skin texture without clogging pores.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can MANTRA15 or GLOW20 be combined with prepaid UPI discounts?</summary><p className="mt-2 text-sm text-ink-soft">Yes. First enter coupon code MANTRA15 or GLOW20 on nourishmantra.in during checkout. When you proceed to the payment gateway and choose UPI or prepaid cards, an extra 5% instant discount is calculated on the remaining balance.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the minimum order threshold for free delivery on Nourish Mantra?</summary><p className="mt-2 text-sm text-ink-soft">Nourish Mantra provides free doorstep delivery across India on all orders of ₹499 or more. A single under-eye gel or serum immediately unlocks free shipping.</p></details>
      </section>
    </div>
  );
}
