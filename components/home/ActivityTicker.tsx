"use client";

import { useState } from "react";
import { BadgeCheck, Percent, Tag, type LucideIcon } from "lucide-react";

export interface ActivityItem {
  kind: "verified" | "deal" | "percent";
  text: string;
}

const KIND: Record<ActivityItem["kind"], { Icon: LucideIcon; tone: string }> = {
  verified: { Icon: BadgeCheck, tone: "text-verified" },
  percent: { Icon: Percent, tone: "text-accent" },
  deal: { Icon: Tag, tone: "text-accent" },
};

/**
 * The activity tape under the hero. Every line is built from rows already on
 * this page (confirmations, the steepest percentages, the newest deals) — the
 * tape never invents a "someone just saved ₹500" claim, because no such feed
 * exists here. The second copy of the list is aria-hidden so screen readers
 * hear each line once, and the pause control satisfies WCAG 2.2.2.
 */
export default function ActivityTicker({ items }: { items: ActivityItem[] }) {
  const [paused, setPaused] = useState(false);
  if (items.length === 0) return null;
  const loop = [...items, ...items];
  return (
    <div className="marquee no-print relative mt-8 flex items-center gap-3 overflow-hidden border-y border-ledger-line bg-accent-faint/60 py-2">
      <span className="hidden shrink-0 pl-3 text-[10px] font-medium uppercase tracking-[0.24em] text-ink-soft sm:inline">
        Recent activity
      </span>
      <div className="relative min-w-0 flex-1 overflow-hidden" aria-label="Recent activity on Durza" role="marquee">
        <div
          className="marquee-track gap-8 whitespace-nowrap pr-8 text-xs font-medium text-ink-soft"
          style={{
            animationDuration: `${Math.max(items.length * 5, 32)}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {loop.map((item, i) => {
            const { Icon, tone } = KIND[item.kind];
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2"
                aria-hidden={i >= items.length}
                {...(i >= items.length ? { inert: true } : {})}
              >
                <Icon aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 ${tone}`} strokeWidth={2} />
                {item.text}
              </span>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? "Play activity ticker" : "Pause activity ticker"}
        className="mr-2 shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium text-ink-soft transition-colors hover:bg-paper-raised hover:text-ink"
      >
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
