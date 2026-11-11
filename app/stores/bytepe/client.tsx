"use client";

import { useState } from "react";

const TRACK = "https://track.vcommission.com/click?campaign_id=13363&pub_id=133499";
function link(url: string, subId: string) {
  return `${TRACK}&sub1=${subId}&url=${encodeURIComponent(url)}`;
}

const OFFERS = [
  { code: "FIRSTBILL", badge: "WELCOME CASHBACK", title: "Flat ₹50 Cashback on First Electricity or Gas Bill", desc: "Valid on first utility bill payment of ₹500 or more via BBPS.", url: "https://bytepe.com/bill-payment", sub: "firstbill" },
  { code: "RECHARGE10", badge: "DAILY SAVER", title: "Up to 5% Instant Discount on Mobile & DTH Recharges", desc: "Applies across Airtel, Jio, and Vi prepaid plans.", url: "https://bytepe.com/recharge", sub: "recharge10" },
  { code: "FASTAG25", badge: "TRAVEL REWARD", title: "Flat ₹25 Cashback on National Fastag Recharges", desc: "Instant wallet credit on NHAI Fastag top-ups of ₹1,000 or more.", url: "https://bytepe.com/fastag", sub: "fastag25" },
  { code: "VOUCHER5", badge: "DIGITAL CARDS", title: "Flat 2% to 8% OFF on Top Brand Vouchers", desc: "Instant e-gift card codes for Amazon, Flipkart, Swiggy, and Zomato.", url: "https://bytepe.com", sub: "voucher5" },
];

const CONCERNS = ["Utility & Electricity Bills", "Mobile & Fastag Recharges", "Brand Gift Cards & Vouchers", "Merchant QR & Soundbox"];

const PRODUCTS = [
  { concern: "Utility & Electricity Bills", name: "State Electricity Board (BBPS) Bill Payment", specs: "70+ State Power Boards across India", price: "Up to ₹50 Cashback", url: "https://bytepe.com/electricity", sub: "electricity_bill" },
  { concern: "Utility & Electricity Bills", name: "Piped Gas (PNG) & Water Bill Clearance", specs: "IGL, MGL, Adani Gas & Municipal Water Boards", price: "Flat ₹30 on orders > ₹800", url: "https://bytepe.com/gas-water", sub: "gas_water_bill" },
  { concern: "Mobile & Fastag Recharges", name: "Jio / Airtel / Vi Unlimited Prepaid Recharge", specs: "28-Day, 84-Day & Annual 5G Data Packs", price: "3% - 5% Instant Discount", url: "https://bytepe.com/mobile-recharge", sub: "mobile_recharge" },
  { concern: "Mobile & Fastag Recharges", name: "NETC National Fastag Instant Top-Up", specs: "Instant toll tag activation", price: "Flat ₹25 with code FASTAG25", url: "https://bytepe.com/fastag", sub: "fastag_recharge" },
  { concern: "Brand Gift Cards & Vouchers", name: "Instant E-Gift Cards (Amazon, Flipkart, Swiggy)", specs: "Instant digital code delivery", price: "Save 2% to 6%", url: "https://bytepe.com", sub: "gift_cards" },
  { concern: "Merchant QR & Soundbox", name: "BytePe Smart All-in-One UPI QR & Audio Soundbox", specs: "Instant audio payment notification", price: "Special merchant fee waiver", url: "https://bytepe.com", sub: "merchant_soundbox" },
];

export default function BytePeStorePage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-8">
        <h1 className="text-3xl font-bold">BytePe</h1>
        <p className="mt-2 text-sm font-medium text-white">Seamless Digital Payments, Instant Bill Cashback & Smart Merchant Payouts</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Smart Payments Hack: Pay BBPS bills with zero convenience fees + Get Flat ₹50 with FIRSTBILL + Extra wallet rewards.</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Platform Fee Transparency Calculator</h2>
        <div className="mt-4 space-y-2 text-sm text-ink-soft">
          <p>Other payment apps charge ₹2 to ₹5 platform fee per mobile recharge.</p>
          <p>BytePe Charges: ₹0 Platform Fee + Gives up to 5% instant cashback with code RECHARGE10.</p>
          <p>Net Saving Highlight: Save ₹150–₹300/year just by eliminating convenience fees on everyday utility bills.</p>
        </div>
        <a href={link("https://bytepe.com", "fee_calculator")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
          Calculate My Bill Savings on BytePe
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Activate on BytePe
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Payment Service & Cashback Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CONCERNS.map((c) => (
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
              <p className="mt-1 text-xs text-ink-soft">{p.price}</p>
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
                Pay & Earn Cashback on BytePe
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Does BytePe charge convenience fees on mobile and electricity bill payments?</summary>
          <p className="mt-2 text-sm text-ink-soft">Unlike many major wallet and UPI apps that levy a ₹2 to ₹5 platform or convenience fee, BytePe processes standard BBPS utility bill payments and mobile recharges with zero platform fee.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How does the FIRSTBILL cashback code work?</summary>
          <p className="mt-2 text-sm text-ink-soft">Create your BytePe account, choose your state electricity or piped gas provider under the BBPS section, enter a bill amount of ₹500 or more, and apply code FIRSTBILL. Your cashback is credited to your BytePe wallet immediately upon bank settlement.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How fast do brand digital gift vouchers get delivered?</summary>
          <p className="mt-2 text-sm text-ink-soft">Gift vouchers purchased on BytePe are delivered instantly via SMS and email within seconds of transaction confirmation, ready to redeem on Amazon, Flipkart, or food delivery apps.</p>
        </details>
      </section>
    </div>
  );
}
