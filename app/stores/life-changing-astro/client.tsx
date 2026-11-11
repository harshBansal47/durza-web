"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("life-changing-astro", url, sub);
const CHECKLIST = [
  { title: "Lab Verification", detail: "Every gemstone includes an independent gemological lab certificate verifying natural origin — no glass-filled or synthetic stones." },
  { title: "X-Ray Tested Rudraksha", detail: "Internal seed chambers are X-ray verified to be intact and unglued — the key difference between real and fake beads." },
  { title: "Personalized Remedies", detail: "Consultations focus on practical lifestyle, mantra and planetary remedies — never fear-based upselling." },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
}

export default function LifeChangingAstroClient({ offers, products }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-purple-950 to-purple-700 text-white p-8">
        <h1 className="text-3xl font-bold">Life Changing Astro</h1>
        <p className="mt-2 text-sm font-medium text-white">Authentic Vedic Guidance, Lab-Certified Gemstones &amp; Energized Rudraksha</p>
        <p className="mt-1 text-xs font-semibold text-white/90">100% Natural Untreated Gemstones with ISO / Govt. Lab Certificate • Confidential 1-on-1 Consultations</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Authenticity &amp; Consultation Confidence Checklist</h2>
        <ol className="mt-4 space-y-3">
          {CHECKLIST.map((item, i) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
              <span className="text-sm"><span className="font-semibold text-ink">{item.title}: </span><span className="text-ink-soft">{item.detail}</span></span>
            </li>
          ))}
        </ol>
        <a href={link("https://lifechangingastro.com", "confidence_checklist")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Book a Verified Consultation</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Life Changing Astro</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Life Goal &amp; Vedic Remedy Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((c) => (
            <button key={c} type="button" onClick={() => setConcern(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${concern === c ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <div key={p.name} className="rounded-2xl border border-ledger-line bg-white p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{p.specs}</p>
              <div className="mt-2 flex items-baseline gap-2"><span className="text-lg font-bold text-ink">{p.price}</span><span className="text-sm text-ink-soft line-through">{p.mrp}</span></div>
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Remedy on Astro</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I verify a gemstone&apos;s lab certificate?</summary><p className="mt-2 text-sm text-ink-soft">Every gemstone ships with an independent ISO / Govt. lab certificate. Cross-check the certificate number and stone description on the lab&apos;s official website before wearing or gifting the stone.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I book a preferred astrologer and time slot?</summary><p className="mt-2 text-sm text-ink-soft">Choose the consultation product on the site, pick your preferred date and time including weekends, and confirm the slot online. A calendar invite with the meeting link follows your booking.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the difference between Nepali and Indonesian Rudraksha?</summary><p className="mt-2 text-sm text-ink-soft">Nepali Rudraksha beads grow in the Himalayas with intact internal chambers verified by X-ray; Indonesian beads are larger but hold a single central seed. Nepali beads are preferred for remedial use.</p></details>
      </section>
    </div>
  );
}
