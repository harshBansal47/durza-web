"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Slim strip above the header. Every message is a true statement
 * about how the site works; there are no fake countdowns here and no
 * claims of community confirmation while the vote counts are still zero.
 * The second copy of the list is aria-hidden so screen readers hear each
 * message once, and a pause control satisfies WCAG 2.2.2 for the animation.
 */
const MESSAGES = [
  "Every offer shows its source and last-checked date",
  "Deals from the stores you already shop at",
  "Expired coupons removed regularly",
  "Shopper votes update each offer's success rate",
];

export default function PromoStrip() {
  const [paused, setPaused] = useState(false);
  const loop = [...MESSAGES, ...MESSAGES];
  return (
    <div className="dark-surface bg-ink relative overflow-hidden text-white no-print">
      <div className="relative mx-auto flex max-w-6xl items-center gap-3 px-4 py-1.5 sm:px-6">
        <span className="hidden shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium sm:inline">
          Sourced from official store pages
        </span>
        <div className="marquee relative min-w-0 flex-1 overflow-hidden" aria-label="Site announcements" role="marquee">
          <div
            className="marquee-track gap-10 whitespace-nowrap text-xs font-medium"
            style={{ animationDuration: "40s", animationPlayState: paused ? "paused" : undefined }}
          >
            {loop.map((m, i) => (
              <span key={i} className="mr-10 inline-flex items-center gap-2" aria-hidden={i >= MESSAGES.length}>
                <span aria-hidden="true" className="text-accent-soft">★</span>
                {m}
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          className="shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium transition-colors hover:bg-white/20"
        >
          {paused ? "Play" : "Pause"}
          <span className="sr-only">{paused ? " announcements" : " announcement ticker"}</span>
        </button>
        <Link href="/how-it-works" className="shrink-0 text-xs font-medium text-white underline-offset-2 hover:underline">
          How it works
        </Link>
      </div>
    </div>
  );
}
