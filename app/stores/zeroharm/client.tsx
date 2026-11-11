"use client";
import { useState } from "react";
const TRACK = "https://track.vcommission.com/click?campaign_id=10514&pub_id=133499";
function link(url: string, sub: string) { return `${TRACK}&sub1=${sub}&url=${encodeURIComponent(url)}`; }
const OFFERS = [
  { code: "ZERO15", badge: "SITEWIDE EXTRA", title: "Extra 15% OFF on All Nano-Nutraceuticals", desc: "Valid on Plant B12, Vegan Omega-3, Narie PCOS and Liver Detox.", url: "https://www.zeroharm.in/collections/all-products", sub: "zero15" },
  { code: "NANO25", badge: "COURSE SAVER", title: "Flat 25% OFF on 90-Day Wellness Courses", desc: "Maximum savings on 3-bottle clinical regimens with sustained results.", url: "https://www.zeroharm.in/collections/combos", sub: "nano25" },
  { code: "PREPAID5", badge: "INSTANT UPI", title: "Extra 5% Instant OFF on Prepaid Checkout", desc: "Instant payment gateway markdown on UPI and Cards.", url: "https://www.zeroharm.in", sub: "prepaid5" },
  { code: "FREESHIP", badge: "DELIVERY PERK", title: "Free Nationwide Shipping Above ₹499", desc: "Zero delivery charges across India on orders above ₹499.", url: "https://www.zeroharm.in", sub: "freeship" },
];
const CONCERNS = ["Essential Plant Vitamins (B12 & D3)", "Women's Hormone & PCOS (Narie)", "Liver, Gut & Sugar Care", "Stamina & Sleep Recovery"];
const PRODUCTS = [
  { concern: "Essential Plant Vitamins (B12 & D3)", name: "ZeroHarm Whole Food Plant-Based Vitamin B12 (60 Tablets)", specs: "Methylcobalamin from Spirulina & Chlorella • Nano-Formulated", price: "₹599", mrp: "₹799", url: "https://www.zeroharm.in/products/plant-based-vitamin-b12", sub: "plant_b12" },
  { concern: "Essential Plant Vitamins (B12 & D3)", name: "ZeroHarm Vegan Vitamin D3 + K2 (Lichen Sourced)", specs: "60 Tablets • Plant Lichen D3 + Menaquinone-7 • Bone Density", price: "₹649", mrp: "₹899", url: "https://www.zeroharm.in/products/vitamin-d3-k2", sub: "vegan_d3_k2" },
  { concern: "Women's Hormone & PCOS (Narie)", name: "ZeroHarm Narie Hormone Balance & PCOS Care Tablets", specs: "60 Tablets • Shatavari, Chasteberry, Ashoka & Gokshura", price: "₹749", mrp: "₹999", url: "https://www.zeroharm.in/products/narie-hormone-balance", sub: "narie_pcos" },
  { concern: "Liver, Gut & Sugar Care", name: "ZeroHarm Holistic Liver Detox with Milk Thistle & Dandelion", specs: "60 Tablets • 80% Silymarin Nano-Extract • Flushes Toxins", price: "₹699", mrp: "₹949", url: "https://www.zeroharm.in/products/liver-detox", sub: "liver_detox" },
  { concern: "Stamina & Sleep Recovery", name: "ZeroHarm Back To Teens Natural Stamina & Testosterone Booster", specs: "60 Tablets • Safed Musli, Ashwagandha & Shilajit Nano-Extract", price: "₹849", mrp: "₹1,199", url: "https://www.zeroharm.in/products/back-to-teens", sub: "back_to_teens" },
];
const TECH = [
  { id: "standard", label: "Standard Supplements", points: ["High-heat chemical extraction destroys phytonutrients", "Harsh stomach acid blocks up to 80% of absorption", "Large 1000mg tablets just to compensate for loss", "Bulk dosage increases side-effect risk"] },
  { id: "nano", label: "ZeroHarm Nano-Tech", points: ["Water-based extraction preserves live phytonutrients", "Microscopic lipid spheres bypass stomach acid entirely", "Absorbed directly in the small intestine for 5–10× uptake", "Smaller clean dosages with zero heavy metals or synthetics"] },
];
export default function ZeroHarmClient() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [tech, setTech] = useState(TECH[1]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-violet-950 to-purple-800 text-white p-8">
        <h1 className="text-3xl font-bold">ZeroHarm Sciences</h1>
        <p className="mt-2 text-sm font-medium text-white">Precision Plant Nutraceuticals • Nano-Formulated for 5x Higher Absorption</p>
        <p className="mt-1 text-xs font-semibold text-white/90">100% Plant-Based • Patent-Pending Nano-Encapsulation • Zero Heavy Metals • Free Delivery Above ₹499</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Why Nano-Encapsulation Beats Standard Tablets</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {TECH.map((t) => (
            <button key={t.id} type="button" onClick={() => setTech(t)} className={`rounded-full px-4 py-2 text-sm font-medium ${tech.id === t.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{t.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <ul className="list-disc pl-5 text-sm text-ink-soft">
            {tech.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
        </div>
        <a href={link("https://www.zeroharm.in/collections/all-products", "nano_explainer")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Nano-Formulated Nutrition</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on ZeroHarm</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Nano-Nutrition &amp; Clinical Concern Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on ZeroHarm</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does ZeroHarm extract Vitamin B12 purely from plants?</summary><p className="mt-2 text-sm text-ink-soft">ZeroHarm derives methylcobalamin from Spirulina and Chlorella through gentle water extraction, then nano-encapsulates it for direct intestinal absorption — no animal derivatives, no synthetic B12.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Why do smaller nano dosages work faster than bulky 1000mg pills?</summary><p className="mt-2 text-sm text-ink-soft">Bioavailability, not milligram weight, drives results. Nano lipid spheres carry plant actives past stomach acid into the small intestine, so your body absorbs far more per tablet than from an unabsorbed bulk dose.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can I stack NANO25 with prepaid UPI discounts?</summary><p className="mt-2 text-sm text-ink-soft">Yes. Apply NANO25 for flat 25% off 90-day combo courses, then pay via UPI or card for an extra 5% instant deduction on the discounted balance.</p></details>
      </section>
    </div>
  );
}
