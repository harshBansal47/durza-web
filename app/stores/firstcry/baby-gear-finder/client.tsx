"use client";

import { useState } from "react";

const GEAR = [
  { name: "R for Rabbit Pocket Stroller", type: "Stroller", weight: "6.5 kg", fold: "One-hand", rating: "4.3" },
  { name: "LuvLap Sunshine Stroller", type: "Stroller", weight: "7.2 kg", fold: "Two-hand", rating: "4.1" },
  { name: "Chicco KeyFit 30 Car Seat", type: "Car Seat", weight: "4.1 kg", fold: "N/A", rating: "4.6" },
  { name: "Graco SnugRide 35", type: "Car Seat", weight: "3.4 kg", fold: "N/A", rating: "4.4" },
];

export default function BabyGearFinderPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? GEAR : GEAR.filter((g) => g.type === filter);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-ink">Baby Gear Fit & Safety Matrix</h1>
      <div className="flex gap-2">
        {["All", "Stroller", "Car Seat"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${filter === f ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ledger-line text-left">
              <th className="py-2">Product</th>
              <th className="py-2">Type</th>
              <th className="py-2">Weight</th>
              <th className="py-2">Fold</th>
              <th className="py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g, i) => (
              <tr key={i} className="border-b border-ledger-line">
                <td className="py-2">{g.name}</td>
                <td className="py-2">{g.type}</td>
                <td className="py-2">{g.weight}</td>
                <td className="py-2">{g.fold}</td>
                <td className="py-2">★ {g.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What matters most in a stroller for Indian roads?</summary><p className="mt-2 text-sm text-ink-soft">Ground clearance over 4 inches, lockable 360° swivel wheels, a one-hand fold and weight under 7kg, plus a 5-point harness.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Is the Chicco KeyFit 30 compatible with Indian car seat belts?</summary><p className="mt-2 text-sm text-ink-soft">Yes — it installs with standard 3-point seat belts found in most Indian cars; verify belt-path routing in your car handbook first.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Should I buy a car seat or stroller first?</summary><p className="mt-2 text-sm text-ink-soft">Buy the car seat before the first trip home from the hospital; a stroller can wait until the baby outgrows the carrier around 6 months.</p></details>
      </section>
    </div>
  );
}
