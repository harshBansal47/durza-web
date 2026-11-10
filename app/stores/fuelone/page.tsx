"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = ["Protein", "Creatine", "PreWorkout", "Multivitamin"];

const PRODUCTS = [
  { category: "Protein", name: "Fuel One Whey Max Powder (1 kg, Rich Chocolate)", price: "₹2,799", mrp: "₹3,399", discount: "18% OFF", image: "https://img2.hkrtcdn.com/47181/bnr_4718051_o.jpg" },
  { category: "Protein", name: "Fuel One Whey Protein Powder (1 kg, Fudge Chocolate)", price: "₹2,299", mrp: "₹2,999", discount: "23% OFF", image: "https://img10.hkrtcdn.com/47181/bnr_4718039_o.jpg" },
  { category: "Creatine", name: "Fuel One Creatine Monohydrate (100 g, Unflavoured)", price: "₹499", mrp: "₹649", discount: "23% OFF", image: "https://img2.hkrtcdn.com/47181/bnr_4718051_o.jpg" },
  { category: "PreWorkout", name: "Fuel One Dead-Lift Pre-Workout (100 g, Deadly Fruit)", price: "₹399", mrp: "₹549", discount: "27% OFF", image: "https://img10.hkrtcdn.com/47181/bnr_4718039_o.jpg" },
  { category: "Multivitamin", name: "Fuel One Daily Multivitamin (30 Tablets, Unflavoured)", price: "₹359", mrp: "₹399", discount: "10% OFF", image: "https://img2.hkrtcdn.com/47181/bnr_4718051_o.jpg" },
];

export default function FuelOneStorePage() {
  const [active, setActive] = useState(CATEGORIES[0]);
  const filtered = PRODUCTS.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl">
        <Image src="/stores/fuelone.webp" alt="Fuel One" fill className="object-cover" priority />
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 bg-black/40 px-6 py-16 text-center text-white">
          <h1 className="text-3xl font-bold">Fuel One</h1>
          <div className="flex gap-3">
            <button type="button" className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
              Share
            </button>
            <Link href="/stores/fuelone-in-ecommerce-cps-india/go" className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white">
              Go to store
            </Link>
          </div>
        </div>
      </section>

      {/* Category badges */}
      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === cat ? "bg-accent text-white" : "bg-gray-100 text-ink-soft hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.name} className="overflow-hidden rounded-2xl border border-ledger-line bg-white shadow-sm">
            <Image src={p.image} alt={p.name} width={400} height={200} className="h-40 w-full object-contain bg-paper" />
            <div className="p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold text-ink">{p.price}</span>
                <span className="text-sm text-ink-soft line-through">{p.mrp}</span>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">{p.discount}</span>
              </div>
              <Link href="/stores/fuelone-in-ecommerce-cps-india/go" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
                Buy now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
