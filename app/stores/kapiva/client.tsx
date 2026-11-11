"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("kapiva", url, sub);
const OFFERS = [
  { code: "KAPIVA10", badge: "SITEWIDE EXTRA", title: "Extra 10% OFF on All Ayurvedic Juices & Resin", desc: "Valid on Shilajit, Dia Free Juice, and herbal wellness combos.", url: "https://kapiva.in", sub: "kapiva10" },
  { code: "STAMINA15", badge: "POWER VALUE", title: "Flat 15% OFF on Shilajit & Stamina Combos", desc: "Applies when bundling Shilajit with Ashwagandha or Safed Musli.", url: "https://kapiva.in", sub: "stamina15" },
  { code: "EXTRA5", badge: "PREPAID COMBO", title: "Extra 5% Instant OFF on UPI / Cards", desc: "Instant payment gateway deduction on prepaid orders.", url: "https://kapiva.in", sub: "extra5" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Nationwide Shipping Above ₹499", desc: "Standard delivery fee waived above ₹499.", url: "https://kapiva.in", sub: "freeship" },
];
const CONCERNS = ["Vitality & Shilajit Resin", "Blood Sugar & Metabolic Care", "Daily Detox & Skin Juices", "Weight Care & Digestion"];
const PRODUCTS = [
  { concern: "Vitality & Shilajit Resin", name: "Kapiva Pure Himalayan Shilajit Resin (20g)", specs: ">60% Fulvic Acid • Lab Certified", price: "₹1,099", mrp: "₹1,499", url: "https://kapiva.in", sub: "shilajit_resin" },
  { concern: "Vitality & Shilajit Resin", name: "Kapiva Shilajit Gold Resin with 24K Gold (20g)", specs: "Swarna Bhasma, Gokshura, Ashwagandha", price: "₹1,499", mrp: "₹1,999", url: "https://kapiva.in", sub: "shilajit_gold" },
  { concern: "Blood Sugar & Metabolic Care", name: "Kapiva Dia Free Juice (1 Litre)", specs: "Karela, Jamun, Amla, Gudmar & Methi", price: "₹549", mrp: "₹649", url: "https://kapiva.in", sub: "dia_free_juice" },
  { concern: "Daily Detox & Skin Juices", name: "Kapiva Skin Foods Glow Mix (30 Sachets)", specs: "Plant-Based Glutathione Booster", price: "₹899", mrp: "₹1,199", url: "https://kapiva.in", sub: "glow_mix" },
  { concern: "Weight Care & Digestion", name: "Kapiva Get Slim Juice (1 Litre)", specs: "San Beej, Erandmool, Daruharidra & Amla", price: "₹549", mrp: "₹649", url: "https://kapiva.in", sub: "get_slim_juice" },
];
export default function KapivaPage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-lime-600 to-green-500 text-white p-8">
        <h1 className="text-3xl font-bold">Kapiva Ayurveda</h1>
        <p className="mt-2 text-sm font-medium text-white">Modern Ayurveda for Everyday Living • Clinically Validated Herbal Nutrition</p>
        <p className="mt-1 text-xs font-semibold text-white/90">NABL Lab Tested • Heavy Metal Certified Safe • Free Delivery Above ₹499</p>
      </section>
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Cost-Per-Day Habit Calculator</h2>
        <p className="mt-2 text-sm text-ink-soft">Kapiva Himalayan Shilajit (20g @ ₹1,099) gives 60 servings = Just ~₹18/day for pure cellular energy & endurance.</p>
        <p className="mt-2 text-sm text-ink-soft">Combine 1 Shilajit Resin (₹1,099) + 1 Dia Free Juice (₹549) = ₹1,648. Unlock Free Shipping + Flat 15% with STAMINA15 + 5% UPI savings.</p>
        <a href={link("https://kapiva.in", "health_routine")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Start My Health Routine</a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Kapiva</a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-ink">Health Goal & Herbal Nutrition Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Kapiva</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I verify the purity of Kapiva Shilajit Resin?</summary><p className="mt-2 text-sm text-ink-soft">Every jar comes with a batch-specific NABL lab test certificate verifying {">"}60% Fulvic Acid and heavy metal levels below FSSAI limits.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How should Kapiva juices be consumed for best results?</summary><p className="mt-2 text-sm text-ink-soft">Mix 30ml of juice in room-temperature water and consume twice daily on an empty stomach, 30 minutes before breakfast and dinner.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the minimum order for free shipping on Kapiva?</summary><p className="mt-2 text-sm text-ink-soft">Free doorstep delivery across India on all orders of ₹499 or more.</p></details>
      </section>
    </div>
  );
}
