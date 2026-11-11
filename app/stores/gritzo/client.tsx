"use client";

import { useState } from "react";

import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("gritzo", url, sub);

const OFFERS = [
  { code: "SUPER10", badge: "SITEWIDE EXTRA", title: "Extra 10% OFF on All SuperMilk Tubs", desc: "Valid on all age-specific personalized jars and trial packs.", url: "https://gritzo.com", sub: "super10" },
  { code: "GROWTH20", badge: "BULK SAVER", title: "Flat 20% OFF on 2 kg Value Jars", desc: "Best value for restocking monthly routines.", url: "https://gritzo.com", sub: "growth20" },
  { code: "HEALTHYBOX", badge: "COMBO DEAL", title: "Extra ₹200 OFF on Nutrition Combos", desc: "Applies when bundling SuperMilk with Vitamin Gummies.", url: "https://gritzo.com", sub: "healthybox" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Doorstep Shipping Above ₹499", desc: "Free delivery on orders above ₹499.", url: "https://gritzo.com", sub: "freeship" },
];

const STAGES = ["Early Years (4–7 Years)", "Growing Kids (8–12 Years)", "Teen Boys (13+ Years)", "Teen Girls (13+ Years)"];

const PRODUCTS = [
  { stage: "Early Years (4–7 Years)", name: "SuperMilk Height+ for Young Kids (4–7y)", specs: "400g Jar • Natural Chocolate", price: "₹649", mrp: "₹799", url: "https://gritzo.com", sub: "supermilk_4_7y" },
  { stage: "Growing Kids (8–12 Years)", name: "SuperMilk Height+ for Active Kids (8–12y)", specs: "1 kg Value Pack • Double Chocolate", price: "₹1,499", mrp: "₹1,899", url: "https://gritzo.com", sub: "supermilk_8_12y" },
  { stage: "Teen Boys (13+ Years)", name: "SuperMilk Genius & Athletic Recovery for Teen Boys", specs: "1 kg Jar • High Performance", price: "₹1,699", mrp: "₹2,199", url: "https://gritzo.com", sub: "teen_boys_supermilk" },
  { stage: "Teen Girls (13+ Years)", name: "SuperMilk Growth & Hormonal Balance for Teen Girls", specs: "1 kg Jar • Cocoa Flavor", price: "₹1,699", mrp: "₹2,199", url: "https://gritzo.com", sub: "teen_girls_supermilk" },
  { stage: "Growing Kids (8–12 Years)", name: "Gritzo Daily Immune & Multivitamin Gummies", specs: "30 Fruit Pectin Gummies", price: "₹399", mrp: "₹499", url: "https://gritzo.com", sub: "kids_gummies" },
];

export default function GritzoStorePage() {
  const [stage, setStage] = useState(STAGES[0]);
  const filtered = PRODUCTS.filter((p) => p.stage === stage);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-400 text-white p-8">
        <h1 className="text-3xl font-bold">Gritzo</h1>
        <p className="mt-2 text-sm font-medium text-white">Personalized SuperMilk for Kids & Teens • 100% Clean Nutrition</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Verified Offers: Up to 23% Off + Extra 10% with SUPER10 + Free Delivery Above ₹499</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Redeem on Gritzo
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Age & Gender SuperMilk Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStage(s)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${stage === s ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <div key={p.name} className="rounded-2xl border border-ledger-line bg-white p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{p.specs}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold text-ink">{p.price}</span>
                <span className="text-sm text-ink-soft line-through">{p.mrp}</span>
              </div>
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
                Get Deal on Gritzo
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How is Gritzo SuperMilk different from traditional malt drinks?</summary>
          <p className="mt-2 text-sm text-ink-soft">Traditional malt drinks contain up to 50%–70% refined sugar and minimal protein. Gritzo SuperMilk contains zero refined sugar, zero preservatives, and provides 6g to 13g of clean, natural milk/whey protein per serving calibrated for specific age groups.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How do I get free shipping on Gritzo orders?</summary>
          <p className="mt-2 text-sm text-ink-soft">Gritzo provides free doorstep shipping on all orders totaling ₹499 or more across India. A single 400g tub or 1kg jar easily meets this threshold.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Can coupon code SUPER10 be applied to 1kg and 2kg value packs?</summary>
          <p className="mt-2 text-sm text-ink-soft">Yes. Code SUPER10 provides an additional 10% discount on top of already-discounted 1kg and 2kg bulk economy jars.</p>
        </details>
      </section>
    </div>
  );
}
