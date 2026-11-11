"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("havells", url, sub);
const OFFERS = [
  { code: "HAVELLS500", badge: "APPLIANCE SPECIAL", title: "Flat ₹500 OFF on Orders Above ₹4,999", desc: "Valid on BLDC ceiling fans, kitchen fryers, and storage geysers.", url: "https://www.havells.com/en/consumer.html", sub: "havells500" },
  { code: "SMART10", badge: "KITCHEN & GROOMING", title: "Extra 10% OFF on Small Domestic Appliances", desc: "Applies across air fryers, induction cooktops, sandwich makers, and grooming kits.", url: "https://www.havells.com/en/consumer/small-domestic-appliances.html", sub: "smart10" },
  { code: "BLDC300", badge: "POWER SAVER", title: "Flat ₹300 OFF on 5-Star BLDC Fans", desc: "Save electricity with 28W inverter BLDC motor fans.", url: "https://www.havells.com/en/consumer/fans.html", sub: "bldc300" },
  { code: "FREESHIP", badge: "ZERO FEE", title: "Free Nationwide Home Delivery", desc: "Zero shipping or transit insurance charges on official store shipments.", url: "https://www.havells.com", sub: "freeship" },
];
const CONCERNS = ["5-Star BLDC Fans (Power Savers)", "Water Heaters & Geysers", "Smart Kitchen & Air Fryers", "Personal Grooming"];
const PRODUCTS = [
  { concern: "5-Star BLDC Fans (Power Savers)", name: "Havells Stealth Air BLDC 1200mm Ceiling Fan", specs: "28W Inverter BLDC Motor • Remote Controlled", price: "₹3,899", mrp: "₹5,999", url: "https://www.havells.com/en/consumer/fans/ceiling-fans.html", sub: "stealth_bldc_fan" },
  { concern: "Water Heaters & Geysers", name: "Havells Adonia Spin 15-Litre Storage Water Heater", specs: "Feroglas Technology • Shock-Safe Plug", price: "₹8,499", mrp: "₹13,990", url: "https://www.havells.com/en/consumer/water-heaters.html", sub: "adonia_geyser" },
  { concern: "Smart Kitchen & Air Fryers", name: "Havells Prolife Grande 6.5L Digital Air Fryer", specs: "1700W Rapid Air Heat Tech • 10 Auto Presets", price: "₹5,499", mrp: "₹9,999", url: "https://www.havells.com/en/consumer/small-domestic-appliances/cooking/air-fryer.html", sub: "prolife_airfryer" },
  { concern: "Personal Grooming", name: "Havells All-in-1 Multi-Grooming Kit for Men", specs: "Titanium Coated Blades • 90 Mins Run Time", price: "₹1,499", mrp: "₹2,695", url: "https://www.havells.com/en/consumer/personal-grooming.html", sub: "grooming_kit" },
];
export default function HavellsPage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white p-8">
        <h1 className="text-3xl font-bold">Havells India</h1>
        <p className="mt-2 text-sm font-medium text-white">Havells • Making A Difference with Smart & Energy-Efficient Appliances</p>
        <p className="mt-1 text-xs font-semibold text-white/90">100% Genuine Manufacturer Warranty • Free Insured Home Delivery</p>
      </section>
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">BLDC Energy Savings Calculator</h2>
        <p className="mt-2 text-sm text-ink-soft">Replacing a standard 75W fan with a Havells 28W BLDC fan saves ~₹1,400 per fan on your annual electricity bill (paying for itself in under 3 years).</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Havells</a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-ink">Appliance Use-Case & Energy Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Havells</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does warranty registration work on the Havells official store?</summary><p className="mt-2 text-sm text-ink-soft">Every Havells product includes a 100% genuine manufacturer warranty; you can register it on their website using your invoice and serial number.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Is doorstep installation available?</summary><p className="mt-2 text-sm text-ink-soft">Yes, eligible products include doorstep installation as per Havells service terms.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How to apply HAVELLS500?</summary><p className="mt-2 text-sm text-ink-soft">Add products worth ₹4,999 or more and enter HAVELLS500 at checkout to get flat ₹500 off.</p></details>
      </section>
    </div>
  );
}
