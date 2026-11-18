"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, BadgeCheck, RotateCcw, Sparkles } from "lucide-react";
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

type Tab = "road" | "street" | "race" | "gym";

const REL = "nofollow sponsored noopener noreferrer";

const MATCHES: Record<
  Tab,
  { tab: string; headline: string; highlight: string; price: string; detail: string }
> = {
  road: {
    tab: "Road Running (Ultraboost 5 / Light)",
    headline: "Ultraboost 5 / Light — daily road cushion",
    highlight:
      "Continental™ Rubber wet-grip for Indian monsoon and asphalt roads, with responsive Boost energy return for smooth everyday miles.",
    price: "Check live price on adidas India",
    detail: "Built for humid, heat-heavy pavement runs where grip, rebound and comfort need to stay consistent.",
  },
  street: {
    tab: "Streetwear Icons (Samba / Gazelle)",
    headline: "Samba / Gazelle — terrace-born street icons",
    highlight:
      "Low-profile gum soles, suede T-toe heritage and café-to-concert versatility that pairs as easily with denim as with relaxed tailoring.",
    price: "Check live price on adidas India",
    detail: "Timeless Originals silhouettes for everyday rotation, from daytime plans to late-night sets.",
  },
  race: {
    tab: "Race Day & Tempo (Adizero)",
    headline: "Adizero — built for race day and tempo",
    highlight:
      "Lightstrike Pro foam and EnergyRods tuned for 10K and Half-Marathon PBs, delivering propulsive efficiency when pace matters most.",
    price: "Check live price on adidas India",
    detail: "A fast, snappy ride for structured workouts, tempo sessions and start-line efforts.",
  },
  gym: {
    tab: "Gym & Lifting (Dropset 3)",
    headline: "Dropset 3 — stable base for strength and HIIT",
    highlight:
      "Dual-density heel stability for confident squats and HIIT, keeping you planted through heavy sets and explosive transitions.",
    price: "Check live price on adidas India",
    detail: "Purpose-built gym support with a grounded platform for lifting, circuits and conditioning.",
  },
};

const ORDER: Tab[] = ["road", "street", "race", "gym"];

const LINEUP = [
  {
    title: "Adidas Originals: Samba, Gazelle & Spezial",
    badge: "Terrace Icon",
    image: "/stores/adidas/samba.jpg",
    price: "Check live price on adidas India",
    note: "Gum-soled heritage silhouettes with suede texture and everyday streetwear ease.",
  },
  {
    title: "Ultraboost 5 & Light",
    badge: "Daily Road Cushion",
    image: "/stores/adidas/ultraboost.jpg",
    price: "Check live price on adidas India",
    note: "Boost cushioning and Continental™ grip tuned for Indian heat, humidity and tarmac.",
  },
  {
    title: "Adizero Boston & Adios Pro",
    badge: "Marathon Speed",
    image: "/stores/adidas/adizero.jpg",
    price: "Check live price on adidas India",
    note: "Lightstrike Pro foam with EnergyRods for tempo sessions, 10Ks and marathon goals.",
  },
  {
    title: "Dropset & Gym Trainers",
    badge: "Strength & HIIT",
    image: "/stores/adidas/dropset.jpg",
    price: "Check live price on adidas India",
    note: "Dual-density stability for planted squats, heavy lifts and high-intensity circuits.",
  },
  {
    title: "Stan Smith & Superstar",
    badge: "Court Classics",
    image: "/stores/adidas/stansmith.jpg",
    price: "Check live price on adidas India",
    note: "Crisp court DNA in clean monochrome — timeless pairs that finish any off-duty fit.",
  },
  {
    title: "Team India Cricket & Originals Apparel",
    badge: "Official Kits",
    image: "/stores/adidas/apparel.jpg",
    price: "Check live price on adidas India",
    note: "Official kits and Originals layers built for match-day pride and everyday comfort.",
  },
];

export default function AdidasClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("road");
  const domain = (() => {
    try {
      return storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "adidas.co.in";
    } catch {
      return "adidas.co.in";
    }
  })();
  const match = MATCHES[active];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="Adidas"
        heading="Adidas India — from track to café terrace."
        subtitle="Ultraboost, Adizero, Originals & Training — the Adidas lineup built for Indian roads, gyms and streetwear. Careful matcher, honest advice."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/adidas?src=store-page"
        ctaLabel="Shop Adidas.co.in"
        perks={[
          { label: "Running", value: "Ultraboost 5 / Light" },
          { label: "Streetwear", value: "Samba & Gazelle" },
          { label: "Training", value: "Dropset 3" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      {/* Adidas Matcher */}
      <section
        aria-labelledby="adidas-matcher-heading"
        className="mt-10 rounded-2xl border border-[#1f1f1f] bg-[#0B0B0B] p-5 text-[#F5F5F5] sm:p-7"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#a3e635]">
          Adidas matcher
        </p>
        <h2 id="adidas-matcher-heading" className="mt-1 font-serif text-2xl font-extrabold text-white">
          Which Adidas fits your stride and style?
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {ORDER.map((id) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                aria-pressed={isActive}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-[#F5F5F5] bg-[#F5F5F5] text-[#0B0B0B]"
                    : "border-[#3a3a3a] bg-transparent text-[#d4d4d4] hover:border-[#F5F5F5] hover:text-white"
                }`}
              >
                {MATCHES[id].tab}
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-xl border border-[#2a2a2a] bg-[#141414] p-5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a3e635]">{match.price}</p>
          <h3 className="mt-1 font-serif text-xl font-bold text-white">{match.headline}</h3>
          <p className="mt-3 text-sm leading-7 text-[#d4d4d4]">
            <strong className="text-white">What to expect:</strong> {match.highlight}
          </p>
          <p className="mt-3 border-l-2 border-[#a3e635]/50 pl-3 text-[13px] leading-6 text-[#bdbdbd]">
            {match.detail}
          </p>
          <a
            href="/go/adidas?src=matcher"
            rel={REL}
            target="_blank"
            className="mt-5 inline-flex items-center gap-1 rounded-full bg-[#F5F5F5] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0B0B0B] transition-colors hover:bg-[#a3e635]"
          >
            Shop This Silhouette on Adidas.co.in →
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      {/* Signature Lineup */}
      <section aria-labelledby="adidas-lineup-heading" className="mt-10">
        <div className="mb-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
            Signature lineup
          </p>
          <h2 id="adidas-lineup-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
            Inside Adidas India — The Signature Lineup
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-soft">
            High-contrast icons across running, training, terrace classics and official kits — curated for the Indian
            shopper.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {LINEUP.map((item) => (
            <li key={item.title} className="min-h-0">
              <a
                href="/go/adidas?src=lineup"
                rel={REL}
                target="_blank"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#0B0B0B] text-[#F5F5F5] transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141414]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-[#3a3a3a] bg-[#0B0B0B]/80 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a3e635] backdrop-blur-sm">
                    {item.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d4d4d4]">
                    {item.price}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-white">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#bdbdbd]">{item.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#a3e635]">
                    Shop on Adidas.co.in <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Why Order Direct */}
      <section
        aria-labelledby="adidas-direct-heading"
        className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Direct advantage</p>
        <h2 id="adidas-direct-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Why Order Direct on Adidas.co.in
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          <li className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <BadgeCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-inkblue" strokeWidth={1.5} />
            <div>
              <p className="font-semibold text-ink">100% Guaranteed Authentic</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">
                Zero counterfeit risk on sought-after pairs like Samba and Ultraboost.
              </p>
            </div>
          </li>
          <li className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Sparkles aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-inkblue" strokeWidth={1.5} />
            <div>
              <p className="font-semibold text-ink">15% adiClub Welcome Privilege</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">
                Unlock a member welcome perk on your first online signup at adidas.co.in.
              </p>
            </div>
          </li>
          <li className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <RotateCcw aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-inkblue" strokeWidth={1.5} />
            <div>
              <p className="font-semibold text-ink">Free 30-Day Doorstep Size Exchange</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">
                Easy doorstep exchanges so you can lock in the right fit with confidence.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* India's favourite — by the numbers */}
      <section className="mt-8 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
          India&apos;s favourite — by the numbers
        </p>
        <ul className="mt-4 grid gap-3 text-sm leading-7 text-ink-soft sm:grid-cols-2">
          {[
            "India's #1 sports brand — trusted by the Indian cricket team and 70+ Indian athletes",
            "Online-first drops on adidas.co.in include select India colourways, extended UK sizes (6–12), and adiClub member perks not always available in mall stores.",
            "Free returns on full-price items within 30 days — the policy Indian shoppers appreciate most",
            "adidas.co.in often carries exclusive India colourways not found on Amazon or Flipkart",
          ].map((line) => (
            <li key={line} className="flex items-start gap-2">
              <span className="mt-1 text-inkblue">•</span>
              {line}
            </li>
          ))}
        </ul>
      </section>

      <FaqSection eyebrow="Adidas India FAQs" items={faqs} />

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1f1f1f] bg-[#0B0B0B]/95 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <span className="truncate text-sm font-medium text-[#F5F5F5]">Adidas Official India Store</span>
          <a
            href="/go/adidas?src=mobile-sticky"
            rel={REL}
            target="_blank"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#F5F5F5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0B0B0B]"
          >
            Explore Collection →
          </a>
        </div>
      </div>
    </div>
  );
}
