"use client";
import { useState } from "react";
const TRACK = "https://track.vcommission.com/click?campaign_id=10175&pub_id=133499";
function link(url: string, sub: string) { return `${TRACK}&sub1=${sub}&url=${encodeURIComponent(url)}`; }
const OFFERS = [
  { code: "NEESH10", badge: "SITEWIDE EXTRA", title: "Extra 10% OFF on All Extrait de Parfum", desc: "Valid on 50ml and 100ml luxury bottles including Glaze and Milky Way.", url: "https://neeshperfumes.com/collections/bestsellers", sub: "neesh10" },
  { code: "LUXE20", badge: "BOTTLE BUNDLE", title: "Flat 20% OFF on Luxury Gift Boxes & Combos", desc: "Applies when purchasing signature duo boxes or layering sets.", url: "https://neeshperfumes.com/collections/gift-sets", sub: "luxe20" },
  { code: "DISCOVERY", badge: "TEST FIRST", title: "Flat ₹300 OFF on Scent Discovery Sets", desc: "Sample 5 mini sprays with full credit toward your future full bottle.", url: "https://neeshperfumes.com/collections/discovery-sets", sub: "discovery" },
  { code: "FREESHIP", badge: "INSURED TRANSIT", title: "Free Nationwide Insured Delivery Above ₹999", desc: "Shock-resistant luxury box packaging shipped free above ₹999.", url: "https://neeshperfumes.com", sub: "freeship" },
];
const CONCERNS = ["Viral Gourmand & Sweet", "Royal Oud & Oriental", "Fresh Aquatic & Citrus", "Artisanal Concentrated Attars"];
const PRODUCTS = [
  { concern: "Viral Gourmand & Sweet", name: "Neesh Glaze Extrait De Parfum (50ml / 100ml)", specs: "Candied Fruits, Vanilla → Caramel, Marshmallow → Amber, Musk (12H+ Sillage)", price: "₹2,499", mrp: "₹3,499", url: "https://neeshperfumes.com/products/glaze-extrait-de-parfum", sub: "glaze_extrait" },
  { concern: "Viral Gourmand & Sweet", name: "Neesh Milky Way Extrait De Parfum (50ml)", specs: "Warm Milk, Coconut → Tonka Bean, Almond → Benzoin, Sandalwood", price: "₹2,299", mrp: "₹3,199", url: "https://neeshperfumes.com/products/milky-way-extrait-de-parfum", sub: "milky_way" },
  { concern: "Royal Oud & Oriental", name: "Neesh Haute Tobacco & Amber Extrait De Parfum (100ml)", specs: "Spiced Cinnamon, Honey → Blonde Tobacco, Cacao → Vanilla, Smoky Oud", price: "₹3,299", mrp: "₹4,499", url: "https://neeshperfumes.com/products/tobacco-vanilla", sub: "tobacco_amber" },
  { concern: "Artisanal Concentrated Attars", name: "Neesh Royal Rose & White Oudh Pure Attar (12ml)", specs: "100% Pure Perfume Oil • Zero Alcohol • 24-Hour Fabric Staying Power", price: "₹1,499", mrp: "₹2,199", url: "https://neeshperfumes.com/products/royal-rose-attar", sub: "royal_rose_attar" },
];
const CONCENTRATIONS = [
  { id: "edp", label: "Eau de Parfum (15–18%)", headline: "Standard EDP — fades in 2–3 hours in Indian heat", points: ["15%–18% perfume oil concentration", "Evaporates fast in high heat and humidity", "Reapplication needed through the day", "Fine for mild climates and short wear"] },
  { id: "extrait", label: "Extrait de Parfum (25–30%)", headline: "Neesh Extrait — 12H+ projection, built for India", points: ["25%–30% pure perfume oil concentration", "Survives heat and humidity without collapse", "Sillage and projection last 12+ hours", "Richer amber, musk and vanilla base accords"] },
];
export default function NeeshPerfumesClient() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [concentration, setConcentration] = useState(CONCENTRATIONS[1]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-rose-950 to-amber-800 text-white p-8">
        <h1 className="text-3xl font-bold">Neesh Perfumes</h1>
        <p className="mt-2 text-sm font-medium text-white">Haute Parfumerie • Handcrafted Extrait de Parfum with Unrivaled Sillage</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Genuine Extrait Formulation (25%–30% Pure Oil, 12H+ Longevity) • Free Insured Delivery Above ₹999</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Extrait vs. EDP Concentration &amp; Projection Guide</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CONCENTRATIONS.map((c) => (
            <button key={c.id} type="button" onClick={() => setConcentration(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${concentration.id === c.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">{concentration.headline}</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-ink-soft">
            {concentration.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
        </div>
        <p className="mt-3 text-xs text-ink-soft">Testing first? The Discovery Set (flat ₹300 off with DISCOVERY) lets you sample the flagship five scents with full credit toward your first full bottle — no blind buys.</p>
        <a href={link("https://neeshperfumes.com/collections/discovery-sets", "concentration_guide")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Discovery Sets</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Neesh</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Haute Fragrance &amp; Scent Profile Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Shop on Neesh</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the difference between Eau de Parfum and Extrait de Parfum?</summary><p className="mt-2 text-sm text-ink-soft">Standard EDP carries 15%–18% perfume oil; Neesh Extrait packs 25%–30%. That is why Extrait survives Indian heat and humidity with 12H+ sillage instead of fading in 2–3 hours.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How long do Neesh scents last on clothing?</summary><p className="mt-2 text-sm text-ink-soft">On fabric, Neesh Extrait and pure attars hold 12–24 hours. Mist pulse points and a light spray on clothing (from 30cm away) for the strongest, longest-lasting projection.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I apply NEESH10?</summary><p className="mt-2 text-sm text-ink-soft">Add your chosen bottles or discovery set to the cart on neeshperfumes.com, enter NEESH10 at checkout for an extra 10% off — no minimum order value, stackable with sale prices.</p></details>
      </section>
    </div>
  );
}
