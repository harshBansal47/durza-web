"use client";

import { useState } from "react";
import { BadgeCheck, Diamond, type LucideIcon } from "lucide-react";
import type { ActivityItem } from "@/components/home/ActivityTicker";

const KIND: Record<ActivityItem["kind"], { Icon: LucideIcon; tone: string }> = {
  verified: { Icon: BadgeCheck, tone: "ok" },
  deal: { Icon: Diamond, tone: "tag" },
  percent: { Icon: Diamond, tone: "tag" },
};

/**
 * "VERIFY DESK" tape. Lines come from rows already on the page (confirmations,
 * newest deals) — nothing is invented. Pauses on hover/focus and via an explicit
 * button (WCAG 2.2.2); the duplicated half is hidden from assistive tech.
 */
export default function VerifyDeskTicker({ items }: { items: ActivityItem[] }) {
  const [paused, setPaused] = useState(false);
  if (items.length === 0) return null;
  const loop = [...items, ...items];
  return (
    <div className="hx-ticker no-print hx-rise" data-paused={paused} style={{ ["--hx-tick-dur" as string]: `${Math.max(items.length * 6, 36)}s` }}>
      <span className="hx-ticker-label">
        <span className="hx-pulse" aria-hidden="true" />
        VERIFY DESK
      </span>
      <div className="hx-ticker-view" role="marquee" aria-label="Recent verification activity">
        <div className="hx-ticker-track">
          {loop.map((item, i) => {
            const { Icon, tone } = KIND[item.kind];
            return (
              <span key={i} className="hx-tick" aria-hidden={i >= items.length} {...(i >= items.length ? { inert: true } : {})}>
                <Icon className={tone} aria-hidden="true" size={13} strokeWidth={2.4} />
                {item.text}
              </span>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="hx-ticker-pause"
        aria-pressed={paused}
        aria-label={paused ? "Play verification ticker" : "Pause verification ticker"}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
