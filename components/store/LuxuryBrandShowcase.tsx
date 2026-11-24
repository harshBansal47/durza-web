"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { LuxurySlot } from "@/lib/luxury-images";

// Local fallback placeholder — refined, not loud. Keeps sans-brand pages
// coherent before art direction ships real product shots.
function Placeholder({ collection }: { collection: string }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#EFEAE2_0%,#FAF9F6_55%,#E8E2D4_100%)] p-6 text-center"
    >
      <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">
        Curated Edit
      </span>
      <span className="mt-2 font-serif text-xl italic leading-snug text-slate-700">
        {collection}
      </span>
      <span className="mt-3 max-w-[16ch] text-[10px] uppercase tracking-widest text-slate-400">
        Imagery arriving
      </span>
    </span>
  );
}

interface LuxuryBrandShowcaseProps {
  storeSlug: string;
  storeName: string;
  collectionHref?: string;
  slots: LuxurySlot[];
  /** Optional eyebrow message rendered above the grid (e.g. "The 2026 edit"). */
  eyebrow?: string;
  /** Optional descriptor shown under eyebrow (e.g. "Hand-picked for Autumn/Winter."). */
  lead?: string;
}

/**
 * Editorial lookbook grid — Tier 1 prestige surface. No coupon language,
 * no discount badges, no "verified" claims. Every CTA links to the official
 * store collection page via the affiliate router (`/go/{store}?from=luxury`),
 * carrying the Durza sub-ID automatically.
 */
export default function LuxuryBrandShowcase({
  storeSlug,
  storeName,
  collectionHref,
  slots,
  eyebrow = "The 2026 Edit",
  lead = "Twelve considered picks across the collection — silk meets city.",
}: LuxuryBrandShowcaseProps) {
  const base = collectionHref ?? `/go/${storeSlug}?src=luxury`;

  return (
    <section aria-labelledby="lux-showcase-heading" className="mt-10 bg-[#FAF9F6] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-500">
              {eyebrow}
            </p>
            <h2 id="lux-showcase-heading" className="mt-3 max-w-2xl font-serif text-3xl font-light leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Inside {storeName}<br /><span className="italic text-slate-700">the edit.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-600">{lead}</p>
          </div>
          <a
            href={base}
            rel="nofollow sponsored noopener noreferrer"
            target="_blank"
            className="inline-flex shrink-0 items-center gap-2 self-start border border-slate-900 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.24em] text-slate-900 transition-colors hover:bg-slate-900 hover:text-white md:self-end"
          >
            Shop official collection
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </header>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {slots.map((slot) => (
            <li key={slot.collection} className="group min-h-0">
              <article className="flex h-full flex-col overflow-hidden border border-stone-200 bg-white transition-shadow hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                  {slot.image ? (
                    <Image
                      src={slot.image}
                      alt={slot.alt ?? slot.collection}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <Placeholder collection={slot.collection} />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  {slot.kicker && (
                    <p className="font-serif text-[10px] italic text-slate-400">{slot.kicker}</p>
                  )}
                  <h3 className="font-serif text-lg leading-snug text-slate-900">{slot.collection}</h3>
                  <p className="text-[13px] leading-6 text-slate-600">{slot.styling}</p>
                  <a
                    href={base}
                    rel="nofollow sponsored noopener noreferrer"
                    target="_blank"
                    className="mt-auto inline-flex items-center gap-1.5 border border-slate-900 px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
                  >
                    Explore collection on official store
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-8 border-t border-slate-200 pt-6 text-[11px] leading-6 text-slate-500">
          Every &quot;Explore&quot; / collection link routes through Durza&apos;s affiliate attribution for {storeName}. No coupon boxes, no discount badges, no chasing timers — this page keeps the language of the store honest and quiet. Prices, stock and availability live on {storeName}&apos;s official site.
        </p>
      </div>
    </section>
  );
}
