"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, LayoutGrid, Store, Ticket } from "lucide-react";
import { formatDate } from "@/lib/format";

function useCountUp(
  target: number,
  enabled: boolean,
  elRef: React.RefObject<HTMLSpanElement | null>,
) {
  const reduce =
    typeof window !== "undefined" &&
    (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  const [value, setValue] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!enabled) return;
    const el = elRef.current;
    if (!el) return;
    if (reduce || target === 0) {
      return;
    }
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const duration = 900;
      const tick = () => {
        const t = Math.min(Math.max((performance.now() - start) / duration, 0), 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === "undefined") {
      run();
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, enabled, reduce, elRef]);

  return value;
}

export default function StatBand({
  coupons,
  stores,
  categories,
  lastCheckedAt,
}: {
  coupons: number;
  stores: number;
  categories: number;
  lastCheckedAt: string | null;
}) {
  const couponRef = useRef<HTMLSpanElement>(null);
  const storeRef = useRef<HTMLSpanElement>(null);
  const catRef = useRef<HTMLSpanElement>(null);
  const couponVal = useCountUp(coupons, true, couponRef);
  const storeVal = useCountUp(stores, true, storeRef);
  const catVal = useCountUp(categories, true, catRef);

  const items: { icon: React.ReactNode; value: string; label: string }[] = [
    {
      icon: <Ticket className="h-5 w-5" strokeWidth={1.75} />,
      value: couponVal.toLocaleString("en-IN"),
      label: "Active coupons",
    },
    {
      icon: <Store className="h-5 w-5" strokeWidth={1.75} />,
      value: storeVal.toLocaleString("en-IN"),
      label: "Stores tracked",
    },
    {
      icon: <LayoutGrid className="h-5 w-5" strokeWidth={1.75} />,
      value: catVal.toLocaleString("en-IN"),
      label: "Categories",
    },
    {
      icon: <CalendarDays className="h-5 w-5" strokeWidth={1.75} />,
      value: lastCheckedAt ? formatDate(lastCheckedAt) : "—",
      label: "Last checked",
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.label}
          className="flex items-center gap-3 rounded-2xl border border-ledger-line bg-paper-raised p-4 shadow-[var(--shadow-hairline)]"
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-faint text-accent"
          >
            {item.icon}
          </span>
          <div className="min-w-0">
            <dd
              ref={i === 0 ? couponRef : i === 1 ? storeRef : i === 2 ? catRef : undefined}
              className="font-mono text-xl font-medium tracking-tight text-ink"
            >
              {item.value}
            </dd>
            <dt className="truncate text-[11px] text-ink-soft">{item.label}</dt>
          </div>
        </div>
      ))}
    </dl>
  );
}
