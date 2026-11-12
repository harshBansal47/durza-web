"use client";

import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("firstcry", url, sub);

import { useState, useEffect } from "react";
import StoreHero from "@/components/StoreHero";
import { api } from "@/lib/api";
import type { CouponPublic } from "@/lib/types";
import Link from "next/link";

export default function FirstCryStorePage() {
  const [mode, setMode] = useState<"all" | "club">("all");
  const [coupons, setCoupons] = useState<CouponPublic[]>([]);
  useEffect(() => { api.listCoupons({ store_id: "3d447d84-9703-41b9-8f03-93e7f6c42a62", active_only: true, limit: 50 }).then((r) => setCoupons(r.items)).catch(() => {}); }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="FirstCry"
        subtitle="Verified deals on baby products, gear, and more."
        domain="firstcry.com"
        heroImageUrl="/stores/firstcry.png"
        offerCount={coupons.length || undefined}
        ctaHref={link("https://www.firstcry.com", "store_hub")}
        perks={[
          { label: "Club Savings", value: "Members-only deals" },
          { label: "Baby Gear", value: "Strollers & car seats" },
          { label: "Returns", value: "Easy 7-day returns" },
        ]}
      />

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

      {/* Deals */}
      <div className="grid gap-4 sm:grid-cols-2">
        {coupons.map((c) => (
          <div key={c.id} className="rounded-2xl border border-ledger-line bg-white p-4">
            <h3 className="font-semibold text-ink">{c.title}</h3>
            {c.code && <p className="mt-1 text-sm text-ink-soft">Code: {c.code}</p>}
            <Link href={`/coupons/${c.slug}`} className="mt-2 inline-block text-sm font-medium text-inkblue hover:underline">
              View deal →
            </Link>
          </div>
        ))}
      </div>

      {/* SEO editorial */}
      <section className="prose max-w-none">
        <h2>FirstCry Coupons & Offers</h2>
        <p>Find verified FirstCry discount codes, Club member savings, and baby gear deals. Each offer is checked against the store&apos;s source pages.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Are FirstCry coupons on Durza verified?</summary><p className="mt-2 text-sm text-ink-soft">Deals listed here are refreshed from firstcry.com campaign pages; codes apply at checkout on the official site.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does the FirstCry Club calculator estimate savings?</summary><p className="mt-2 text-sm text-ink-soft">It models member pricing plus coupon stacking against the ₹499 or ₹999 fee using your monthly spend — actual savings vary by category.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the return policy on baby gear?</summary><p className="mt-2 text-sm text-ink-soft">Most baby gear is returnable within 7 days of delivery in original condition; check the individual product page for eligibility.</p></details>
      </section>
    </div>
  );
}
