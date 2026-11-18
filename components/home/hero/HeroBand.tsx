"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, ShieldCheck, TimerOff } from "lucide-react";
import PendingLink from "@/components/ui/PendingLink";
import type { HeroStore } from "@/lib/home-hero";
import { formatStoreDisplayName } from "@/lib/store-display";
import StoreMark from "./StoreMark";
import { usePrefersReducedMotion } from "./hooks";

/**
 * Counts up from 0 once the band scrolls into view. The server (and no-JS)
 * render is the final number; reduced-motion users get it with no animation.
 * All state updates happen in observer/animation callbacks, and both the
 * observer and the frame request are cancelled on unmount.
 */
function CountUp({ value, reduced }: { value: number; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || value <= 0 || typeof IntersectionObserver === "undefined") return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / 1400);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, reduced]);

  return (
    <div ref={ref} className="hx-num">
      {shown.toLocaleString("en-IN")}
    </div>
  );
}

export default function HeroBand({
  popular,
  moreStores,
  stats,
}: {
  popular: HeroStore[];
  moreStores: number;
  stats: { coupons: number; stores: number; categories: number };
}) {
  const reduced = usePrefersReducedMotion();
  const showCounts = stats.coupons >= 5000;
  const items = showCounts
    ? [
        { label: "Active coupons", value: stats.coupons, live: true },
        { label: "Stores tracked", value: stats.stores, live: false },
        { label: "Categories", value: stats.categories, live: false },
      ].filter((s) => s.value > 0)
    : [];

  return (
    <div className="hx-band hx-rise" style={{ ["--i" as string]: 4 }}>
      <ul className="hx-trustcol" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        <li className="hx-trust">
          <ShieldCheck aria-hidden="true" size={15} strokeWidth={2.4} />
          Sourced from official pages
        </li>
        <li className="hx-trust amber">
          <CalendarCheck aria-hidden="true" size={15} strokeWidth={2.4} />
          Check date on every offer
        </li>
        <li className="hx-trust blue">
          <TimerOff aria-hidden="true" size={15} strokeWidth={2.4} />
          No fake countdown timers
        </li>
      </ul>

      {popular.length > 0 && (
        <>
          <div className="hx-vline" aria-hidden="true" />
          <div>
            <div className="hx-pop-label">Popular stores</div>
            <div className="hx-poprow">
              {popular.map((store) => (
                <PendingLink key={store.id} href={`/stores/${store.slug}`} className="hx-popchip">
                  <StoreMark store={store} size={20} />
                  {formatStoreDisplayName({ slug: store.slug, name: store.name })}
                </PendingLink>
              ))}
              {moreStores > 0 && (
                <PendingLink href="/stores" className="hx-popchip more">
                  + {moreStores.toLocaleString("en-IN")} more
                </PendingLink>
              )}
            </div>
          </div>
        </>
      )}

      {items.length > 0 && (
        <>
          <div className="hx-vline" aria-hidden="true" />
          <dl className="hx-statcol" style={{ margin: 0 }}>
            {items.map((s) => (
              <div key={s.label}>
                <dd style={{ margin: 0 }}>
                  <CountUp value={s.value} reduced={reduced} />
                </dd>
                <dt className="hx-lbl">
                  {s.label}
                  {s.live && (
                    <>
                      {" "}
                      <b>· live</b>
                    </>
                  )}
                </dt>
              </div>
            ))}
          </dl>
        </>
      )}
    </div>
  );
}
