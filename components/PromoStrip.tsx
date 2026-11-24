"use client";

import { useState } from "react";

/**
 * Slim strip above the header. Every line is a short, plain-language promise
 * about how Durza works — readable at a glance, no fake urgency, no fine print.
 * The second copy of the list is aria-hidden so screen readers hear each line
 * once, and a pause control satisfies WCAG 2.2.2 for the animation.
 */
const MESSAGES = [
  "Every offer states its type",
  "Last-checked date shown when known",
  "No fabricated codes or discounts"
];

export default function PromoStrip() {
  const [paused, setPaused] = useState(false);
  const loop = [...MESSAGES, ...MESSAGES];
  return (
    <div className="border-b border-ledger-line bg-paper-raised text-ink no-print">
      <div className="relative mx-auto flex max-w-6xl items-center gap-3 px-4 py-1.5 sm:px-6">
        <span className="hidden shrink-0 rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent sm:inline">
          Clear offers, always free
        </span>
        {/* Phones get one static line: a scrolling ticker cuts words off at the edge. */}
        <p className="min-w-0 flex-1 truncate text-xs font-semibold sm:hidden">Every offer states its type</p>
        <div className="marquee relative hidden min-w-0 flex-1 overflow-hidden sm:block" aria-label="Site announcements" role="marquee">
          <div
            className="marquee-track gap-8 whitespace-nowrap text-xs font-semibold text-ink"
            style={{ animationDuration: "30s", animationPlayState: paused ? "paused" : undefined }}
          >
            {loop.map((m, i) => (
              <span key={i} className="mr-8 inline-flex items-center gap-2" aria-hidden={i >= MESSAGES.length}>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {m}
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          className="hidden shrink-0 rounded-full bg-ink/[0.06] px-2.5 py-0.5 text-[11px] font-semibold text-ink transition-colors hover:bg-ink/[0.1] sm:inline-block"
        >
          {paused ? "Play" : "Pause"}
          <span className="sr-only">{paused ? " announcements" : " announcement ticker"}</span>
        </button>
      </div>
    </div>
  );
}
