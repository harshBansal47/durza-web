"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, Gamepad2, Laptop, Briefcase, Sparkles } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import type { CouponPublic } from "@/lib/types";

interface Props {
  offers: CouponPublic[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

type Line = "gaming" | "creative" | "business" | "student";

const MATCHES: Record<Line, { headline: string; spec: string; cadence: string; note: string }> = {
  gaming: {
    headline: "ROG Strix G15 / TUF Gaming A15 — gaming without compromise",
    spec: "Ryzen 7 7845HS · RTX 4060 / 4070 · 16 GB RAM (upgradeable to 64 GB) · 1 TB SSD · 165Hz QHD · ₹99,990 – ₹1,80,000",
    cadence: "ROG Strix G15 / G16 / Scar series · ₹1,10,000 – ₹2,40,000",
    note: "ROG is the finish and clock-speed choice; TUF is the GPU-for-money option. Both deliver Pantone-validated 165Hz panels and advanced DLSS support on RTX 40-series chips.",
  },
  creative: {
    headline: "Zenbook OLED S 13 — a colorist's laptop with a business-card appearance",
    spec: "Intel Core Ultra 7 · OLED 3K Pantone-validated · 16 GB RAM · 1 TB SSD · 1.39 kg · 15.5 mm · ₹1,10,000 – ₹1,60,000",
    cadence: "Zenbook OLED / Zenbook 14 Flip · ₹95,000 – ₹1,50,000",
    note: "100% DCI-P3 colour, factory-calibrated OLED at 3K resolution — the laptop India's photographers, colourists and editors have been waiting for at this price.",
  },
  business: {
    headline: "Zenbook Business Pro / ExpertBook series — fleet-ready",
    spec: "Core i5/i7 vPro · 8–16 GB RAM · 512 GB SSD · 14–16\" IPS · fingerprint-optional · ₹85,000 – ₹1,50,000",
    cadence: "ExpertBook B9 / B540 · ₹70,000 – ₹1,30,000",
    note: "MIL-STD durability, 14-hour battery, quiet (<35 dB) operation and vPro manageability for fleet MDM — the ASUS answer to ThinkPad in the Indian enterprise.",
  },
  student: {
    headline: "Vivobook 15 / 16 — the student everyday",
    spec: "Ryzen 5 / Core i5 · 8 GB RAM · 256/512 GB SSD · 15.6\" FHD · ₹38,000 – ₹58,000",
    cadence: "Vivobook Go / 14 / 15 · ₹32,000 – ₹55,000",
    note: "ASUS Vivobook delivers the most-affordable route into a full-size laptop — AMD Ryzen 5 with decent battery (6–7 hr), a usable keyboard and the ASUS service network aboard.",
  },
};

const ORDER: Line[] = ["student", "gaming", "creative", "business"];
const LABEL: Record<Line, string> = { student: "Student", gaming: "Gaming", creative: "Creative", business: "Business" };
const CASE_ICONS = { student: Laptop, gaming: Gamepad2, creative: Sparkles, business: Briefcase };

export default function AsusClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Line>("gaming");
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "asus.com";
  const match = MATCHES[active];
  const ActiveIcon = CASE_ICONS[active];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="ASUS"
        heading="ASUS India — ROG meets Zenbook."
        subtitle="ROG Strix, TUF Gaming, Zenbook OLED and Vivobook — ASUS's Indian range roadmapped for gaming, creatives and business fleets. Use-case matcher, honest trade-offs."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/asus?src=store-page"
        ctaLabel="Shop ASUS.com India"
        perks={[
          { label: "Gaming", value: "ROG Strix · TUF" },
          { label: "Creative", value: "Zenbook OLED 3K" },
          { label: "Student", value: "Vivobook range" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section aria-labelledby="asus-matcher-heading" className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">ASUS matcher</p>
        <h2 id="asus-matcher-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">Which ASUS line in 2026 — honest match</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {ORDER.map((id) => {
            const Icon = CASE_ICONS[id];
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                aria-pressed={isActive}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  isActive ? "border-inkblue bg-ink text-white" : "border-ledger-line bg-white text-ink hover:border-inkblue"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
                {LABEL[id]}
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-serif text-xl font-bold text-ink">{match.headline}</h3>
          <p className="mt-3 text-sm leading-7 text-ink-soft"><strong className="text-ink">Spec to expect:</strong> {match.spec}</p>
          <p className="mt-2 text-sm leading-7 text-ink-soft"><strong className="text-ink">Price range:</strong> {match.cadence}</p>
          <p className="mt-3 border-l-2 border-inkblue/40 pl-3 text-[13px] leading-6 text-ink-soft">{match.note}</p>
          <a
            href="/go/asus?src=store-page"
            rel="nofollow sponsored noopener"
            target="_blank"
            className="mt-4 inline-flex items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-inkblue"
          >
            See this on ASUS India
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">ASUS India in short</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-sm leading-7 text-ink-soft">
          {[
            "ROG series is Pantone-validated for colour accuracy — the standard pick for India's game-racing crowd",
            "Zenbook OLED line is India's most affordable 3K 120Hz OLED laptop under ₹1,50,000",
            "Military-durable TUF Gaming passes MIL-STD 810H — tested for drops, dust, vibration and thermal shock",
            "ASUS India service network covers 500+ service centres across 200+ cities, including tier-II",
          ].map((line) => <li key={line} className="flex items-start gap-2"><span className="mt-1 text-inkblue">•</span>{line}</li>)}
        </ul>
      </section>

      <FaqSection eyebrow="ASUS India FAQs" items={faqs} />
    </div>
  );
}
