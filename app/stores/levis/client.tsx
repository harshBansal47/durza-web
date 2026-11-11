"use client";
import { useState } from "react";
const TRACK = "https://track.vcommission.com/click?campaign_id=11501&pub_id=133499";
function link(url: string, sub: string) { return `${TRACK}&sub1=${sub}&url=${encodeURIComponent(url)}`; }
const OFFERS = [
  { code: "LEVIS500", badge: "DENIM SAVER", title: "Flat ₹500 OFF on Orders Above ₹3,499", desc: "Valid across men's and women's jeans, trucker jackets and shirts.", url: "https://www.levi.in/men/clothing/jeans", sub: "levis500" },
  { code: "LEVIS1000", badge: "WARDROBE BUNDLE", title: "Flat ₹1,000 OFF on Cart Value Above ₹5,999", desc: "Best value on 2 pairs of jeans or denim plus a Trucker Jacket.", url: "https://www.levi.in/sale", sub: "levis1000" },
  { code: "WELCOME10", badge: "NEW MEMBER", title: "Extra 10% OFF on First Online Order", desc: "Applies on non-discounted core classics and new arrivals.", url: "https://www.levi.in/new-arrivals", sub: "welcome10" },
  { code: "FREESHIP", badge: "DELIVERY PERK", title: "Free Nationwide Shipping Above ₹999", desc: "Zero delivery charges across India on orders of ₹999 or more.", url: "https://www.levi.in", sub: "freeship" },
];
const CONCERNS = ["Men's Iconic Fits (501 / 511 / 512)", "Women's High-Rise & Straight", "Trucker Jackets & Shirts", "Essentials & Graphic Tees"];
const PRODUCTS = [
  { concern: "Men's Iconic Fits (501 / 511 / 512)", name: "Levi's 511™ Slim Fit Stretch Jeans", specs: "Below Waist • Slim Through Thigh & Leg • 99% Cotton, 1% Elastane", price: "₹2,599", mrp: "₹3,999", url: "https://www.levi.in", sub: "levis_511_slim" },
  { concern: "Men's Iconic Fits (501 / 511 / 512)", name: "Levi's 512™ Slim Taper Fit Jeans", specs: "Roomy Thigh, Tailored Narrow Ankle • Modern Athletic Cut", price: "₹2,799", mrp: "₹4,299", url: "https://www.levi.in-taper", sub: "levis_512_taper" },
  { concern: "Men's Iconic Fits (501 / 511 / 512)", name: "Levi's 501® Original Straight Button-Fly Jeans", specs: "100% Heavyweight Non-Stretch Cotton • Classic Straight Leg", price: "₹3,599", mrp: "₹4,999", url: "https://www.levi.in", sub: "levis_501_original" },
  { concern: "Women's High-Rise & Straight", name: "Levi's Women's 721 High-Rise Skinny / Ribcage Straight", specs: "10-Inch High Rise • Sculpting Stretch Fabric", price: "₹2,499", mrp: "₹3,899", url: "https://www.levi.in/women/clothing/jeans", sub: "womens_high_rise" },
  { concern: "Trucker Jackets & Shirts", name: "Levi's Original Trucker Jacket", specs: "Iconic Type III Design • Durable Denim • Regular Fit", price: "₹3,999", mrp: "₹5,499", url: "https://www.levi.in/men/clothing/jackets", sub: "trucker_jacket" },
  { concern: "Essentials & Graphic Tees", name: "Levi's Batwing Logo Pure Cotton Crewneck T-Shirt", specs: "180 GSM Combed Ring-Spun Cotton • Regular Fit", price: "₹999", mrp: "₹1,499", url: "https://www.levi.in", sub: "batwing_tee" },
];
const CARTS = [
  { id: "solo", label: "1 × 511™ Jeans (₹2,599)", total: "₹2,599", outcome: "No flat coupon unlocked — add the Batwing Tee to cross ₹3,499.", sub: "cart_solo", url: "https://www.levi.in" },
  { id: "plus_tee", label: "511™ Jeans + Batwing Tee", total: "₹3,598", outcome: "Unlocks LEVIS500 — effectively ₹499 for the ₹1,499 tee.", sub: "cart_plus_tee", url: "https://www.levi.in/sale" },
  { id: "bundle", label: "501® + Trucker Jacket (₹7,598)", total: "₹7,598", outcome: "Unlocks LEVIS1000 — flat ₹1,000 off the whole wardrobe.", sub: "cart_bundle", url: "https://www.levi.in/sale" },
];
export default function LevisClient() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [cart, setCart] = useState(CARTS[1]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-8">
        <h1 className="text-3xl font-bold">Levi&apos;s India</h1>
        <p className="mt-2 text-sm font-medium text-white">Original Jeans &amp; Authentic Apparel • Engineered Since 1873</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Free Express Delivery Above ₹999 • Hassle-Free 15-Day Size Exchange &amp; Return</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Fit-Number Decoder &amp; Smart Cart Threshold Hack</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-3 text-sm">
          <div className="rounded-xl bg-paper p-3"><p className="font-semibold text-ink">501® = Classic Straight</p><p className="mt-1 text-xs text-ink-soft">Button-fly, straight leg, 100% heavyweight cotton.</p></div>
          <div className="rounded-xl bg-paper p-3"><p className="font-semibold text-ink">511™ = Modern Slim</p><p className="mt-1 text-xs text-ink-soft">Slim through thigh and leg with light stretch.</p></div>
          <div className="rounded-xl bg-paper p-3"><p className="font-semibold text-ink">512™ = Slim Taper</p><p className="mt-1 text-xs text-ink-soft">Slim thigh with a tailored narrow ankle opening.</p></div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {CARTS.map((c) => (
            <button key={c.id} type="button" onClick={() => setCart(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${cart.id === c.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4">
          <p className="text-sm text-ink">Cart total: <span className="font-bold">{cart.total}</span></p>
          <p className="mt-1 text-sm text-ink-soft">{cart.outcome}</p>
        </div>
        <a href={link(cart.url, cart.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Apply Cart Hack on Levi.in</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Levi&apos;s</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Levi&apos;s Fit &amp; Category Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Shop on Levi.in</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the difference between the Levi&apos;s 511™ and 512™ fits?</summary><p className="mt-2 text-sm text-ink-soft">511™ is a slim fit through the thigh and leg. 512™ keeps the slim thigh but tapers the ankle opening — a slim-taper silhouette best paired with sneakers or Chelsea boots.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does the 15-day size exchange and return work?</summary><p className="mt-2 text-sm text-ink-soft">Unworn Levi&apos;s purchases can be exchanged or returned within 15 days of delivery. Start a request on levi.in with your invoice; reverse pickup and refund are handled by their courier partners.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can LEVIS1000 be applied on sale items?</summary><p className="mt-2 text-sm text-ink-soft">Yes, LEVIS1000 applies on cart value above ₹5,999 including sale items, and LEVIS500 kicks in above ₹3,499. Enter the code at the payment step before paying.</p></details>
      </section>
    </div>
  );
}
