"use client";

import { useState } from "react";

import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("guvi", url, sub);

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
}

export default function GuviStorePage({ offers, products }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [goal, setGoal] = useState("job");
  const [lang, setLang] = useState("English");
  const filtered = products.filter((p) => p.tab === concern);

  const recommended = products.find((p) => {
    if (goal === "job" && (concern === "Full Stack Web Development" || concern === "Data Science & AI")) return true;
    if (goal === "single" && concern.startsWith("Programming")) return true;
    return false;
  }) || filtered[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-8">
        <h1 className="text-3xl font-bold">GUVI Geek Networks</h1>
        <p className="mt-2 text-sm font-medium text-white">IIT Madras Incubated • HCL Group Company</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Empowering Indian Engineers: Learn Tech in Tamil, Hindi, Telugu & English with Verified Certifications & Extra 10% Off with GUVI10.</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Career Decision Snippet</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setGoal("job")} className={`rounded-full px-4 py-2 text-sm font-medium ${goal === "job" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Get My First Tech Job</button>
          <button type="button" onClick={() => setGoal("single")} className={`rounded-full px-4 py-2 text-sm font-medium ${goal === "single" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Learn a Single Language</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Tamil", "Hindi", "Telugu", "English"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${lang === l ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}
            >
              {l}
            </button>
          ))}
        </div>
        {recommended && (
          <div className="mt-4 rounded-xl border border-ledger-line bg-paper-alt p-4">
            <p className="font-semibold text-ink">Recommended: {recommended.name}</p>
            <p className="mt-1 text-sm text-ink-soft">{recommended.specs}</p>
            <a href={link(recommended.targetUrl, recommended.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
              Start Learning on GUVI
            </a>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Claim Deal on GUVI
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Vernacular Tech Career Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setConcern(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${concern === c ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <div key={p.name} className="rounded-2xl border border-ledger-line bg-white p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{p.specs}</p>
              <p className="mt-1 text-xs text-ink-soft">Languages: {(p.languages ?? []).join(", ")}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold text-ink">{p.price}</span>
                <span className="text-sm text-ink-soft line-through">{p.mrp}</span>
              </div>
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
                Start Learning on GUVI
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Are GUVI certifications recognized by tech companies and recruiters?</summary>
          <p className="mt-2 text-sm text-ink-soft">Yes. GUVI is an IIT Madras incubated company under the HCL Group. Their course certificates are recognized by top tech companies, and their Zen Class bootcamp has over 600 hiring partners including PayPal, Juspay, and Freshworks.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Can I learn complex programming in Hindi or Tamil on GUVI?</summary>
          <p className="mt-2 text-sm text-ink-soft">Yes. GUVI&apos;s primary innovation is vernacular teaching. You can learn Python, Java, Data Science, and Full Stack development in your native mother tongue without language barrier obstacles, while all coding syntax remains standard English.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How do I apply the GUVI10 promo code?</summary>
          <p className="mt-2 text-sm text-ink-soft">Select your desired self-paced course or bundle on guvi.in, proceed to the checkout payment page, and enter coupon code GUVI10 to receive an instant 10% deduction.</p>
        </details>
      </section>
    </div>
  );
}
