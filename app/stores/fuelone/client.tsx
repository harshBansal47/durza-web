"use client";

import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";

import { useState } from "react";
import StoreHero from "@/components/StoreHero";
import Image from "next/image";
import Link from "next/link";

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function FuelOneStorePage({ products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [active, setActive] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === active);

  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <StoreHero
        name="Fuel One"
        subtitle="100% transparent sports nutrition — whey isolate, creatine & FSSAI-certified supplements"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/fuelone"
        perks={[
          { label: "Whey & Creatine", value: "Flat deals inside" },
          { label: "Authenticity", value: "FSSAI-certified" },
          { label: "Delivery", value: "Pan-India shipping" },
        ]}
      />

      {/* Category badges */}
      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((cat) => (
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
            <Image src={p.image ?? "/stores/fuelone.webp"} alt={p.name} width={400} height={200} className="h-40 w-full object-contain bg-paper" />
            <div className="p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              {p.variant && <p className="text-xs text-ink-soft">{p.variant}</p>}
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold text-ink">{p.price}</span>
                <span className="text-sm text-ink-soft line-through">{p.mrp}</span>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">{p.discount}</span>
              </div>
              <Link href="/go/fuelone" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
                Buy now
              </Link>
            </div>
          </div>
        ))}
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How are Fuel One prices on Durza verified?</summary><p className="mt-2 text-sm text-ink-soft">Prices and MRP reflect the official fuelone.in listing at the time of page update — supplement and creatine prices shift with promotions.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Are Fuel One supplements FSSAI certified?</summary><p className="mt-2 text-sm text-ink-soft">Yes. Fuel One sells FSSAI-licensed sports nutrition directly from its official warehouse with batch and best-before details on every pack.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Does Fuel One offer free delivery?</summary><p className="mt-2 text-sm text-ink-soft">Free delivery is available on eligible orders on the official site; the cart page at checkout shows the current threshold.</p></details>
      </section>
    </div>
  );
}
