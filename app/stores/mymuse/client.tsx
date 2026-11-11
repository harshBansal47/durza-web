"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("mymuse", url, sub);
const OFFERS = [
  { code: "MUSE10", badge: "SITEWIDE EXTRA", title: "Extra 10% OFF on All Intimate Wellness & Kits", desc: "Valid across massage oils, water-based gels, massagers and couple boxes.", url: "https://mymuse.in/collections/bestsellers", sub: "muse10" },
  { code: "BUNDLE20", badge: "COUPLE SET SAVER", title: "Up to 20% OFF on Curated Couple & Starter Kits", desc: "Maximum savings when bundling essentials with massage oils and care.", url: "https://mymuse.in/collections/kits-combos", sub: "bundle20" },
  { code: "PREPAID5", badge: "INSTANT UPI", title: "Extra 5% Instant OFF on Prepaid Checkout", desc: "Discreet statement descriptor plus extra 5% off on UPI and Cards.", url: "https://mymuse.in", sub: "prepaid5" },
  { code: "DISCREET", badge: "PRIVACY PERK", title: "Free 100% Plain-Box Shipping Across India", desc: "Zero brand logos or product names on the box; neutral billing name.", url: "https://mymuse.in", sub: "discreet" },
];
const CONCERNS = ["Couple Kits & Gift Boxes", "Personal Massagers", "Water-Based Lubricants", "Massage Oils & Candles"];
const PRODUCTS = [
  { concern: "Couple Kits & Gift Boxes", name: "MyMuse Date Night Essentials Kit", specs: "Aromatherapy Massage Oil + Water-Based Glide + Satin Blindfold", price: "₹1,799", mrp: "₹2,499", url: "https://mymuse.in/collections/kits-combos", sub: "date_night_kit" },
  { concern: "Personal Massagers", name: "MyMuse Breeze / Pulse Waterproof Silicone Massager", specs: "Medical-Grade Soft Silicone • Whisper-Quiet (<40dB) • USB Rechargeable", price: "₹1,899", mrp: "₹2,699", url: "https://mymuse.in/collections/massagers", sub: "silicone_massager" },
  { concern: "Water-Based Lubricants", name: "MyMuse Glide Natural Water-Based Personal Lubricant (100ml)", specs: "pH-Balanced • Glycerin-Free, Paraben-Free • Condom-Safe • Non-Sticky", price: "₹499", mrp: "₹649", url: "https://mymuse.in/collections/lubricants", sub: "water_glide" },
  { concern: "Massage Oils & Candles", name: "MyMuse Sensual Body Massage Oil (Ylang Ylang & Sweet Almond)", specs: "100ml Cold-Pressed Botanical Oil • Non-Greasy Absorption", price: "₹699", mrp: "₹899", url: "https://mymuse.in/collections/massage-oils", sub: "massage_oil" },
];
const GUARANTEES = [
  { title: "Plain Brown Box", detail: "Neither the courier partner nor anyone at home can see the brand name or contents on the outer label." },
  { title: "Neutral Billing Name", detail: "Your UPI/card statement never displays explicit product details — the descriptor stays neutral." },
  { title: "Doctor-Approved Materials", detail: "100% phthalate-free medical silicone and pH-balanced water-based gels, paraben-free." },
];
export default function MyMuseClient() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-rose-950 to-pink-800 text-white p-8">
        <h1 className="text-3xl font-bold">MyMuse India</h1>
        <p className="mt-2 text-sm font-medium text-white">Modern Intimate Wellness • Doctor-Approved, Body-Safe &amp; 100% Discreet</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Free Express Delivery in Plain, Unbranded Packaging • FDA-Cleared Medical Silicone • Paraben &amp; Glycerin-Free</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">The 3-Point Privacy &amp; Safety Guarantee</h2>
        <ol className="mt-4 space-y-3">
          {GUARANTEES.map((g, i) => (
            <li key={g.title} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
              <span className="text-sm"><span className="font-semibold text-ink">{g.title}: </span><span className="text-ink-soft">{g.detail}</span></span>
            </li>
          ))}
        </ol>
        <a href={link("https://mymuse.in/collections/bestsellers", "privacy_guarantee")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Discreetly on MyMuse</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on MyMuse</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Intimate Wellness &amp; Comfort Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">View on MyMuse</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How discreet is the packaging upon delivery?</summary><p className="mt-2 text-sm text-ink-soft">Every order ships in a plain brown or grey box with no brand name, logo, or product description anywhere on the parcel. The courier invoice shows a neutral descriptor, and billing appears under a generic company name.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Is water-based Glide safe with latex condoms and silicone products?</summary><p className="mt-2 text-sm text-ink-soft">Yes. MyMuse Glide is water-based, pH-balanced, glycerin-free and paraben-free, making it safe with latex condoms and most silicone products. It washes off easily and does not stain.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does the 1-year warranty replacement work?</summary><p className="mt-2 text-sm text-ink-soft">MyMuse offers a 1-year replacement warranty on massagers and electronic products. Reach out to support with your order ID and a short video/photo of the defect, and a replacement ships after verification.</p></details>
      </section>
    </div>
  );
}
