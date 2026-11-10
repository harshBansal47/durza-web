"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FirstCryStorePage() {
  const [mode, setMode] = useState<"all" | "club">("all");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white">
        <div className="relative z-10 px-6 py-12">
          <h1 className="text-3xl font-bold">FirstCry Coupons & Offers</h1>
          <p className="mt-2 text-sm opacity-90">Verified deals on baby products, gear, and more.</p>
          <div className="mt-4 flex gap-3">
            <Link href="https://track.vcommission.com/click?campaign_id=10081&pub_id=133499&sub1=store_hub&url=https://www.firstcry.com" target="_blank" rel="nofollow sponsored noopener" className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
              Go to store
            </Link>
          </div>
        </div>
      </section>

      {/* Utility bar */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/stores/firstcry/club-calculator" className="rounded-2xl border border-ledger-line bg-white p-4 hover:border-inkblue">
          <h3 className="font-semibold text-ink">🧮 Club Break-Even Calculator</h3>
          <p className="mt-1 text-sm text-ink-soft">Check if FirstCry Club is worth it.</p>
        </Link>
        <Link href="/stores/firstcry/diaper-cost-tracker" className="rounded-2xl border border-ledger-line bg-white p-4 hover:border-inkblue">
          <h3 className="font-semibold text-ink">👶 Diaper Cost Tracker</h3>
          <p className="mt-1 text-sm text-ink-soft">Compare cost-per-pant across brands.</p>
        </Link>
      </div>

      {/* Audience toggle */}
      <div className="flex gap-2">
        {(["all", "club"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === m ? "bg-accent text-white" : "bg-gray-100 text-ink-soft hover:bg-gray-200"
            }`}
          >
            {m === "all" ? "All Offers" : "Club Members Only"}
          </button>
        ))}
      </div>

      {/* Placeholder deals */}
      <div className="rounded-2xl border border-ledger-line bg-white p-6 text-center text-ink-soft">
        <p>FirstCry deals will appear here. Add coupons via the admin panel.</p>
      </div>

      {/* SEO editorial */}
      <section className="prose max-w-none">
        <h2>FirstCry Coupons & Offers</h2>
        <p>Find verified FirstCry discount codes, Club member savings, and baby gear deals. Each offer is checked against the store's source pages.</p>
      </section>
    </div>
  );
}
