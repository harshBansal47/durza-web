"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Droplets, Gift, Layers } from "lucide-react";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import type { LuxurySlot } from "@/lib/luxury-images";

interface Props {
  storeUrl: string;
  faqs: FaqItem[];
  stats: TrustStatsProps;
  slots: LuxurySlot[];
}

const REL = "nofollow sponsored noopener noreferrer";
const STORE_HREF = "/go/palmonas?src=store-page";
const CARD_HREF = "/go/palmonas?src=luxury";
const CURATOR_HREF = "/go/palmonas?src=stack-curator";
const MOBILE_HREF = "/go/palmonas?src=mobile-sticky";

type MoodId = "office" | "gym" | "layered" | "gift";

const MOODS: { id: MoodId; label: string; tip: string; matches: number[] }[] = [
  {
    id: "office",
    label: "Everyday Office Minimal",
    tip: "Keep it refined: pair boardroom-minimal studs with a slim 18k chain and a single stacking cuff for polished, all-day ease.",
    matches: [3, 0, 2],
  },
  {
    id: "gym",
    label: "Waterproof Gym-to-Dinner",
    tip: "Choose sweat-proof staples: a waterproof PVD chain with lightweight studs that stay luminous from workouts to evening plans.",
    matches: [0, 3, 2],
  },
  {
    id: "layered",
    label: "Layered Neck-Mess Stack",
    tip: "Pair a 16-inch Singapore chain with an 18-inch signature pendant for effortless collarbone framing and a modern layered stack.",
    matches: [0, 4, 2],
  },
  {
    id: "gift",
    label: "Anniversary & Gift Box",
    tip: "Make it memorable: choose a curated gift box or couple set and add a lab-grown diamond accent for a timeless, celebration-ready surprise.",
    matches: [5, 1, 4],
  },
];

export default function PalmonasLuxuryPage({ storeUrl, faqs, stats, slots }: Props) {
  const [activeMood, setActiveMood] = useState<MoodId>("office");
  const domain = (() => {
    try {
      return new URL(storeUrl).hostname.replace(/^www\./, "");
    } catch {
      return "palmonas.com";
    }
  })();
  const mood = MOODS.find((m) => m.id === activeMood) ?? MOODS[0];
  const highlighted = new Set(mood.matches);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 sm:py-12 md:pb-12">
      {/* Hero — warm ivory / champagne-gold / espresso-charcoal */}
      <section className="overflow-hidden rounded-3xl border border-[#2a2622] bg-[#161412] shadow-sm">
        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <p className="font-serif text-[11px] font-medium uppercase tracking-[0.32em] text-[#C8A252]">
            Palmonas · 18K Demi-Fine Jewellery
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-light leading-[1.1] tracking-tight text-[#FAF7F2] sm:text-4xl md:text-5xl">
            Palmonas — The 18K Demi-Fine &amp; Waterproof Gold Edit
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-[#e8dfcf] sm:text-lg">
            Anti-tarnish 18k gold-vermeil chains, lab-grown diamond solitaires, and stackable cuffs crafted for Indian
            humidity—luxury that stays on from gym to dinner.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={STORE_HREF}
              rel={REL}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-[#C8A252] bg-[#C8A252] px-6 py-3 font-serif text-sm font-medium tracking-wide text-[#161412] transition hover:bg-[#d6b56e]"
            >
              Explore Official Palmonas Boutique →
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <span className="text-xs uppercase tracking-[0.2em] text-[#c9b07a]">{domain}</span>
          </div>
        </div>
      </section>

      {/* Official Store Privilege & Bundle Strip */}
      <section aria-labelledby="palmonas-privileges-heading" className="mt-8">
        <h2 id="palmonas-privileges-heading" className="sr-only">
          Official Store Privileges
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          <li className="flex gap-3 rounded-2xl border border-[#e8dcc6] bg-[#FBF8F1] p-5">
            <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-[#C8A252]" aria-hidden="true" strokeWidth={1.5} />
            <div>
              <p className="font-serif text-base font-medium text-[#161412]">Waterproof &amp; Sweat-Proof</p>
              <p className="mt-1 text-sm leading-6 text-[#4b4540]">
                18k gold PVD/vermeil finish engineered for Indian monsoon &amp; daily showers
              </p>
            </div>
          </li>
          <li className="flex gap-3 rounded-2xl border border-[#e8dcc6] bg-[#FBF8F1] p-5">
            <Layers className="mt-0.5 h-5 w-5 shrink-0 text-[#C8A252]" aria-hidden="true" strokeWidth={1.5} />
            <div>
              <p className="font-serif text-base font-medium text-[#161412]">Layering &amp; Stack Combos</p>
              <p className="mt-1 text-sm leading-6 text-[#4b4540]">
                Official site multi-piece tiers &amp; curated gift boxes save up to 25% on sets
              </p>
            </div>
          </li>
          <li className="flex gap-3 rounded-2xl border border-[#e8dcc6] bg-[#FBF8F1] p-5">
            <Gift className="mt-0.5 h-5 w-5 shrink-0 text-[#C8A252]" aria-hidden="true" strokeWidth={1.5} />
            <div>
              <p className="font-serif text-base font-medium text-[#161412]">Lifetime Plating Warranty</p>
              <p className="mt-1 text-sm leading-6 text-[#4b4540]">
                Direct authenticity &amp; official warranty coverage only via palmonas.com
              </p>
            </div>
          </li>
        </ul>
      </section>

      <TrustStats {...stats} />
      <AffiliateDisclosure />

      {/* Curate Your Gold Stack */}
      <section
        aria-labelledby="palmonas-curator-heading"
        className="mt-10 rounded-3xl border border-[#e8dcc6] bg-[#FBF8F1] p-5 sm:p-7"
      >
        <p className="font-serif text-[11px] font-medium uppercase tracking-[0.28em] text-[#8b6a2b]">
          Curate Your Gold Stack
        </p>
        <h2 id="palmonas-curator-heading" className="mt-2 font-serif text-2xl font-light tracking-tight text-[#161412]">
          Choose a mood, build your stack
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {MOODS.map((m) => {
            const active = m.id === activeMood;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMood(m.id)}
                aria-pressed={active}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                  active
                    ? "border-[#161412] bg-[#161412] text-[#FAF7F2]"
                    : "border-[#d8c9a8] bg-white text-[#161412] hover:border-[#161412]"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-2xl border border-[#e8dcc6] bg-white p-5">
          <p className="font-serif text-[15px] leading-7 text-[#3f3a35]">
            <span className="font-medium text-[#161412]">Layering recommendation:</span> {mood.tip}
          </p>
          <a
            href={CURATOR_HREF}
            rel={REL}
            target="_blank"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#161412] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF7F2] transition hover:bg-[#2a2622]"
          >
            Shop this stack on Palmonas
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      {/* Curated grid */}
      <section aria-labelledby="palmonas-edit-heading" className="mt-10 rounded-3xl bg-[#FBF8F1] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <header className="mb-10 md:mb-14">
            <p className="font-serif text-[11px] font-medium uppercase tracking-[0.32em] text-[#8b6a2b]">
              The 18K Demi-Fine Edit
            </p>
            <h2
              id="palmonas-edit-heading"
              className="mt-3 max-w-2xl font-serif text-3xl font-light leading-[1.1] tracking-tight text-[#161412] sm:text-4xl"
            >
              Waterproof gold, designed to stack
            </h2>
          </header>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {slots.map((slot, idx) => {
              const isMatch = highlighted.has(idx);
              return (
                <li key={slot.collection} className="min-h-0">
                  <article
                    className={`group flex h-full flex-col overflow-hidden border bg-white transition-all hover:shadow-[0_10px_40px_rgba(22,20,18,0.12)] ${
                      isMatch ? "border-[#C8A252] ring-1 ring-[#C8A252]/40" : "border-[#e8dcc6]"
                    }`}
                  >
                    <a
                      href={CARD_HREF}
                      rel={REL}
                      target="_blank"
                      className="relative block aspect-[4/5] w-full overflow-hidden bg-[#efe8da]"
                      aria-label={`Acquire ${slot.collection} on official Palmonas store`}
                    >
                      {slot.image ? (
                        <Image
                          src={slot.image}
                          alt={slot.alt ?? slot.collection}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center font-serif text-sm text-[#6b645c]">
                          {slot.collection}
                        </span>
                      )}
                      {slot.kicker && (
                        <span className="absolute left-4 top-4 border border-white/40 bg-[#161412]/75 px-3 py-1 font-serif text-[10px] uppercase tracking-[0.22em] text-[#f3e7c3] backdrop-blur-sm">
                          {slot.kicker}
                        </span>
                      )}
                    </a>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 className="font-serif text-lg leading-snug text-[#161412]">{slot.collection}</h3>
                      <p className="text-[13px] leading-6 text-[#4b4540]">{slot.styling}</p>
                      <a
                        href={CARD_HREF}
                        rel={REL}
                        target="_blank"
                        className="mt-auto inline-flex items-center gap-1.5 border border-[#161412] px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#161412] transition-colors hover:bg-[#161412] hover:text-[#FAF7F2]"
                      >
                        Acquire on Official Store →
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </a>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FaqSection eyebrow="Palmonas FAQs" items={faqs} />

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#2a2622] bg-[#161412]/92 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <span className="truncate font-serif text-sm text-[#FAF7F2]">Palmonas Official India Store</span>
          <a
            href={MOBILE_HREF}
            rel={REL}
            target="_blank"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#C8A252] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#161412]"
          >
            Shop 18K Edit →
          </a>
        </div>
      </div>
    </div>
  );
}
