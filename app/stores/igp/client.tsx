"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("igp", url, sub);
const OFFERS = [
  { code: "IGP10", badge: "SITEWIDE EXTRA", title: "Flat 10% OFF on All Gifts & Hampers", desc: "Valid on personalized gifts, gourmet hampers, plants, and fresh floral bouquets.", url: "https://www.igp.com", sub: "igp10" },
  { code: "CAKE15", badge: "CELEBRATION DEAL", title: "Flat 15% OFF on Fresh Bakery Cakes & Combos", desc: "Applies across designer cakes, photo cakes, and flowers + cake combos.", url: "https://www.igp.com/cakes", sub: "cake15" },
  { code: "PHOTO20", badge: "PERSONALIZED SPECIAL", title: "Up to 20% OFF on Custom Keepsakes", desc: "Instant markdown on personalized LED lamps, 3D crystals, caricature frames.", url: "https://www.igp.com/personalized-gifts", sub: "photo20" },
  { code: "FREESHIP", badge: "STANDARD DELIVERY", title: "Free Standard Delivery on Non-Perishable Gifts", desc: "Zero standard shipping fees on curated gifts and decor.", url: "https://www.igp.com", sub: "freeship" },
];
const CONCERNS = ["Personalized Keepsakes", "Fresh Flowers & Midnight Cakes", "Gourmet Hampers & Chocolates", "Lucky Plants & Home Decor"];
const PRODUCTS = [
  { concern: "Personalized Keepsakes", name: "Personalized Rotating Crystal LED Lamp", specs: "Custom Photo Engraving with LED Base", price: "₹995", mrp: "₹1,499", url: "https://www.igp.com", sub: "crystal_led_lamp" },
  { concern: "Personalized Keepsakes", name: "Customized Wooden Wall Caricature Photo Frame", specs: "High-Density MDF Wooden Cutout", price: "₹645", mrp: "₹899", url: "https://www.igp.com", sub: "wooden_caricature" },
  { concern: "Fresh Flowers & Midnight Cakes", name: "Classic Dutch Truffle Chocolate Cake (500g)", specs: "100% Eggless Bakery Fresh Cake", price: "₹599", mrp: "₹799", url: "https://www.igp.com", sub: "chocolate_cake" },
  { concern: "Fresh Flowers & Midnight Cakes", name: "Velvet Red Roses & Ferrero Rocher Bouquet", specs: "10 Fresh Red Roses + 4 Ferrero Rocher", price: "₹899", mrp: "₹1,249", url: "https://www.igp.com", sub: "roses_ferrero_combo" },
  { concern: "Gourmet Hampers & Chocolates", name: "Artisanal Dry Fruits & Belgian Chocolate Festive Box", specs: "Roasted Almonds, Cashews + Pralines", price: "₹1,199", mrp: "₹1,699", url: "https://www.igp.com", sub: "gourmet_hamper" },
  { concern: "Lucky Plants & Home Decor", name: "2-Layer Lucky Bamboo Plant in Self-Watering Glass Pot", specs: "Air-Purifying Indoor Plant", price: "₹499", mrp: "₹699", url: "https://www.igp.com", sub: "lucky_bamboo" },
];
export default function IgpPage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [slot, setSlot] = useState("midnight");
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-pink-600 to-rose-400 text-white p-8">
        <h1 className="text-3xl font-bold">IGP.com</h1>
        <p className="mt-2 text-sm font-medium text-white">India&apos;s Largest Online Gifting Destination • Delivered with Emotion</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Same-Day Delivery & Midnight Slot Availability across 400+ Cities • Free Delivery on Standard Gifts</p>
      </section>
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Delivery Slot & Timing Advisor</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setSlot("midnight")} className={`rounded-full px-4 py-2 text-sm font-medium ${slot === "midnight" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Tonight at 12:00 AM</button>
          <button type="button" onClick={() => setSlot("sameday")} className={`rounded-full px-4 py-2 text-sm font-medium ${slot === "sameday" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Today in 2-3 Hours</button>
          <button type="button" onClick={() => setSlot("custom")} className={`rounded-full px-4 py-2 text-sm font-medium ${slot === "custom" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>In 2 to 4 Days</button>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          {slot === "midnight" && "Recommended: Fresh Cakes & Floral Bouquets with Midnight Slot guidance."}
          {slot === "sameday" && "Recommended: Express local dispatch items available today."}
          {slot === "custom" && "Recommended: Personalized Photo Crystals & Caricatures."}
        </p>
        <a href={link("https://www.igp.com", "delivery_advisor")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Check Delivery Slots on IGP</a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on IGP</a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-ink">Occasion & Gift Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Send Gift via IGP</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does Midnight Delivery work on IGP.com?</summary><p className="mt-2 text-sm text-ink-soft">Select the Midnight Delivery slot during checkout; the surprise arrives between 11:00 PM and 11:59 PM across 400+ cities.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can coupon code IGP10 be applied to personalized gifts?</summary><p className="mt-2 text-sm text-ink-soft">Yes, IGP10 provides an additional 10% discount on custom photo frames, LED lamps, and hampers with no minimum.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What happens if the recipient is not available?</summary><p className="mt-2 text-sm text-ink-soft">For perishables, delivery agents coordinate via phone; standard products ship with courier partners and SMS tracking.</p></details>
      </section>
    </div>
  );
}
