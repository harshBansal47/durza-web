"use client";

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
                <td className="py-2">₹{d.price}</td>
                <td className="py-2 font-semibold">₹{(d.price / d.pack).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="https://www.firstcry.com/diapers?tag=durza" target="_blank" rel="noopener sponsored" className="inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
        Buy Bulk Pack on FirstCry
      </a>
    </div>
  );
}
