"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("truebasics", url, sub);
const OFFERS = [
  { code: "TRUE10", badge: "SITEWIDE EXTRA", title: "Extra 10% OFF on Clinical Supplements", desc: "Valid on Triple Strength Omega-3, KSM-66 and Multivitamins.", url: "https://www.truebasics.com", sub: "true10" },
  { code: "CLINICAL20", badge: "HEALTH REGIMEN", title: "Flat 20% OFF on 60-Day & 90-Day Regimen Bundles", desc: "Maximum savings on monthly heart, brain, joint and stress packs.", url: "https://www.truebasics.com", sub: "clinical20" },
  { code: "PREPAID5", badge: "INSTANT UPI", title: "Extra 5% Instant Discount on Prepaid Checkout", desc: "Instant payment gateway markdown on UPI and Card orders.", url: "https://www.truebasics.com", sub: "prepaid5" },
  { code: "FREESHIP", badge: "DELIVERY PERK", title: "Free Nationwide Shipping Above ₹499", desc: "Standard doorstep fee waived on all orders above ₹499.", url: "https://www.truebasics.com", sub: "freeship" },
];
const CONCERNS = ["Triple Strength Omega-3 (Heart & Brain)", "KSM-66® Ashwagandha (Stress & Vigor)", "Advanced Multivitamins", "Joint Mobility & Cartilage"];
const PRODUCTS = [
  { concern: "Triple Strength Omega-3 (Heart & Brain)", name: "TrueBasics Triple Strength Omega-3 Fish Oil (1250mg)", specs: "560mg EPA + 400mg DHA • Enteric Coated • Zero Fishy Burps", price: "₹899", mrp: "₹1,299", url: "https://www.truebasics.com", sub: "triple_omega3" },
  { concern: "KSM-66® Ashwagandha (Stress & Vigor)", name: "TrueBasics Ashwagandha with Patented KSM-66® (600mg)", specs: "Full-Spectrum Root Extract • Clinically Proven Cortisol Reduction", price: "₹699", mrp: "₹999", url: "https://www.truebasics.com", sub: "ashwagandha_ksm66" },
  { concern: "Advanced Multivitamins", name: "TrueBasics Multivit Men / Multivit Women (60 Tablets)", specs: "23 Vitamins & Minerals + Brain, Joint, Eye & Energy Blends", price: "₹799", mrp: "₹1,099", url: "https://www.truebasics.com", sub: "multivit_men" },
  { concern: "Joint Mobility & Cartilage", name: "TrueBasics Joint Ease with UC-II® Undenatured Collagen", specs: "UC-II® Collagen + Hyaluronic Acid + Curcumin C3 Complex®", price: "₹1,499", mrp: "₹2,199", url: "https://www.truebasics.com", sub: "joint_ease" },
];
const COMPARISONS = [
  { id: "ashwagandha", generic: { label: "Generic Ashwagandha", points: ["Unverified withanolide % — often <1.5%", "May contain toxic leaf material mixed with root", "Effectiveness varies batch to batch", "No clinical trials backing stress claims"] }, patented: { label: "KSM-66® (Full-Spectrum Root)", points: ["Highest concentration of withanolides (5%+)", "Root-only extract — zero leaf alkaloids", "22 published clinical trials on stress & sleep", "Same extract used in the studies, not a look-alike"] } },
  { id: "omega3", generic: { label: "Standard 1000mg Fish Oil", points: ["Only ~300mg active EPA+DHA per softgel", "~70% filler oil with low bioavailability", "Often skips enteric coating (fishy burps)", "Needs 3–4 softgels for the same EPA+DHA dose"] }, patented: { label: "TrueBasics Triple Strength", points: ["960mg active EPA+DHA per softgel", "3× concentration vs commercial fish oils", "Enteric coated — zero aftertaste or burps", "One softgel delivers a clinically relevant dose"] } },
];
export default function TrueBasicsClient() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [comparison, setComparison] = useState(COMPARISONS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-green-950 to-emerald-800 text-white p-8">
        <h1 className="text-3xl font-bold">TrueBasics</h1>
        <p className="mt-2 text-sm font-medium text-white">Clinically Proven Nutrition • Patented Ingredients &amp; Maximum Bioavailability</p>
        <p className="mt-1 text-xs font-semibold text-white/90">KSM-66® • Curcumin C3 Complex® • UC-II® Collagen • Free Delivery Above ₹499</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Patent vs. Generic Ingredient Transparency Matrix</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {COMPARISONS.map((c) => (
            <button key={c.id} type="button" onClick={() => setComparison(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${comparison.id === c.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c.id === "ashwagandha" ? "KSM-66® vs Generic" : "Triple Strength vs Standard"}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-ledger-line bg-paper p-4">
            <p className="text-sm font-semibold text-ink-soft">{comparison.generic.label}</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-ink-soft">{comparison.generic.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </div>
          <div className="rounded-xl border border-accent bg-green-50 p-4">
            <p className="text-sm font-bold text-ink">{comparison.patented.label}</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-ink-soft">{comparison.patented.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </div>
        </div>
        <a href={link("https://www.truebasics.com", "patent_matrix")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Clinical Formulations</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on TrueBasics</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Clinical Ingredient &amp; Health Goal Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on TrueBasics</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Why does enteric coating in TrueBasics Omega-3 prevent fishy burps?</summary><p className="mt-2 text-sm text-ink-soft">The enteric coat is pH-sensitive: it survives stomach acid and dissolves only in the small intestine, so the fish oil is absorbed where it acts — never releasing fishy odour in the stomach.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What makes KSM-66 clinically superior to raw root powders?</summary><p className="mt-2 text-sm text-ink-soft">KSM-66 is a root-only, full-spectrum extract standardized to 5% withanolides with 22 published human trials. Raw powders vary wildly in withanolide content and may include leaf alkaloids.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I qualify for free delivery?</summary><p className="mt-2 text-sm text-ink-soft">Free doorstep delivery across India on all orders of ₹499 or more — a single bottle of KSM-66 Ashwagandha already qualifies.</p></details>
      </section>
    </div>
  );
}
