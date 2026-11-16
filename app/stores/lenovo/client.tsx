"use client";

import { useState } from "react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import { ArrowUpRight, Laptop, Briefcase, Gamepad2, BookOpenCheck, ChevronDown } from "lucide-react";
import type { CouponPublic } from "@/lib/types";

interface Props {
  offers: CouponPublic[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

type Case = "student" | "developer" | "business" | "gaming";

const MATCHES: Record<Case, { headline: string; spec: string; cadence: string; note: string }> = {
  student: {
    headline: "IdeaPad Slim series — the everyday warrior",
    spec: "Ryzen 5 / Core i5 · 8 GB RAM · 512 GB SSD · 14–16\" IPS · up to 13 hr claimed battery",
    cadence: "₹45,000 – ₹68,000 on lenovo.com",
    note: "For students who need a laptop that survives lectures, all-nighters and the occasional droplet of chai — not a machine to game on.",
  },
  developer: {
    headline: "ThinkPad X1 Carbon or X1 Yoga — the engineer's choice",
    spec: "Core i7 · 16 GB RAM · 1 TB SSD · 2.8K OLED · 14\" · 1.12 kg · 9.5 hr battery · optional fingerprint + Intel vPro",
    cadence: "₹1,30,000 – ₹2,10,000 on lenovo.com",
    note: "Linux-first firmware support, spill-resistant keyboard, military spec 810H durability, replaceable SSD, vPro manageability — the developer laptop India's top tech teams actually write code on.",
  },
  business: {
    headline: "ThinkPad E-series or L-series — team scale, boardroom polish",
    spec: "Core i5/i7 · 8–16 GB RAM · 256–512 GB SSD · 14–16\" IPS · fingerprint-optional · 3-year warranty standard",
    cadence: "₹65,000 – ₹1,20,000 on lenovo.com",
    note: "Designed for fleet deployment at scale — standardised images, Lenovo Vantage MDM, spill resistance for the Indian office, and service level agreements that ship before the laptops arrive.",
  },
  gaming: {
    headline: "Legion 5 Pro or Legion Slim 5i — the Indian gamer's workhorse",
    spec: "Ryzen 7 / Core i7 · RTX 4060/4070/4080 · 16 GB (upgradeable) RAM · 1 TB SSD · 165Hz QHD panel · up to 16\" form factor",
    cadence: "₹1,10,000 – ₹2,40,000 on lenovo.com",
    note: "NVIDIA RTX graphics with 140W TGP, advanced cooling, and a 165Hz panel you'll actually appreciate. The Indian gamer's most-recommended Legion series, bar none.",
  },
};

const ORDER: Case[] = ["student", "developer", "business", "gaming"];
const LABEL: Record<Case, string> = { student: "Student", developer: "Developer", business: "Team / business", gaming: "Gaming" };

const CASE_ICONS = { student: BookOpenCheck, developer: Laptop, business: Briefcase, gaming: Gamepad2 };

export default function LenovoClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Case>("student");
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "lenovo.com";
  const match = MATCHES[active];
  const ActiveIcon = CASE_ICONS[active];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="Lenovo"
        heading="Lenovo India — deck. Pay."
        subtitle="Legion, ThinkPad, Yoga & IdeaPad — the Lenovo lineup that runs India, from college farmes to boardrooms. Use-case matcher, live offers, honest trade-offs."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/lenovo-india?src=store-page"
        ctaLabel="Shop Lenovo.com India"
        perks={[
          { label: "Gaming", value: "Legion series" },
          { label: "Business", value: "ThinkPad X1 / E-series" },
          { label: "Student", value: "IdeaPad & Yoga series" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section aria-labelledby="lenovo-matcher-heading" className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Lenovo matcher</p>
        <h2 id="lenovo-matcher-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">Which Lenovo should you buy in 2026?</h2>
        <p className="mt-2 text-sm text-ink-soft">Pick the profile that matches your use case — we'll show the spec, expected lenovo.com price range and what to watch for.</p>
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
                  isActive
                    ? "border-inkblue bg-ink text-white"
                    : "border-ledger-line bg-white text-ink hover:border-inkblue"
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
          <p className="mt-3 text-sm leading-7 text-ink-soft">
            <strong className="text-ink">Spec to expect:</strong> {match.spec}
          </p>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            <strong className="text-ink">Price range:</strong> {match.cadence}
          </p>
          <p className="mt-3 border-l-2 border-inkblue/40 pl-3 text-[13px] leading-6 text-ink-soft">{match.note}</p>
          <a
            href="/go/lenovo-india?src=store-page"
            rel="nofollow sponsored noopener"
            target="_blank"
            className="mt-4 inline-flex items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-inkblue"
          >
            See this on Lenovo India
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Lenovo India, in short</p>
        <h2 className="mt-1 font-serif text-xl font-bold text-ink">Why Lenovo dominates the Indian B2B laptop market</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "Military-spec durability (US MIL-STD 810H) — ThinkPads are designed for drops, spills and 50-hour weeks",
            "In-house Intel vPro on X1 Carbon and ThinkPad P1 series for IT management and remote patching",
            "LenovoVantage — unified MDM for fleet deployments with 1000+ devices",
            "Service presence: 200+ service centres across India, on-site PremiumCare for select plans",
            "Linux-friendly firmware support — the only major OEM shipping pre-installed Ubuntu models in India",
            "Accidental damage plans, theft cover, accidental breakage — all configurable at purchase",
          ].map((line) => (
            <li key={line} className="flex items-start gap-2 text-sm leading-6 text-ink-soft">
              <span className="mt-1 text-inkblue">•</span>
              {line}
            </li>
          ))}
        </ul>
      </section>

      <FaqSection eyebrow="Lenovo India FAQs" items={faqs} />
    </div>
  );
}
