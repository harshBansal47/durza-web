"use client";

import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("firstcry", url, sub);

import { useState } from "react";

const DIAPERS = [
  { brand: "Pampers", pack: 34, price: 449 },
  { brand: "Pampers", pack: 68, price: 849 },
  { brand: "MamyPoko", pack: 32, price: 399 },
  { brand: "MamyPoko", pack: 76, price: 899 },
  { brand: "Huggies", pack: 30, price: 379 },
  { brand: "Huggies", pack: 66, price: 799 },
];

export default function DiaperCostTrackerPage() {
  const [size, setSize] = useState("M");
  const sorted = [...DIAPERS].sort((a, b) => a.price / a.pack - b.price / b.pack);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-ink">Diaper Cost-Per-Pant Tracker</h1>
      <div className="flex gap-2">
        {["S", "M", "L", "XL"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSize(s)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${size === s ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}
          >
            Size {s}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ledger-line text-left">
              <th className="py-2">Brand</th>
              <th className="py-2">Pack</th>
              <th className="py-2">Price</th>
              <th className="py-2">Cost/Pant</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((d, i) => (
              <tr key={i} className="border-b border-ledger-line">
                <td className="py-2">{d.brand}</td>
                <td className="py-2">{d.pack}</td>
                <td className="py-2">{d.price}</td>
                <td className="py-2 font-semibold">{(d.price / d.pack).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href={link("https://www.firstcry.com/diapers", "diaper_tracker")} target="_blank" rel="nofollow sponsored noopener" className="inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
        Buy Bulk Pack on FirstCry
      </a>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How is cost-per-pant calculated?</summary><p className="mt-2 text-sm text-ink-soft">Pack price divided by pant count — larger packs almost always win per pant despite the higher upfront cost.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Which diaper size fits my baby?</summary><p className="mt-2 text-sm text-ink-soft">S suits under 7kg, M fits 6–11kg, L fits 9–14kg and XL fits 12–17kg; always confirm the weight table on the pack before bulk buying.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Why do XL packs show better value?</summary><p className="mt-2 text-sm text-ink-soft">Fixed manufacturing cost spreads over more pants, and FirstCry bulk-pack discounts compound the saving.</p></details>
      </section>
    </div>
  );
}
