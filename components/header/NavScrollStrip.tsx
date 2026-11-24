"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Horizontal chip strip with chevrons and edge fades that appear only when the
 * content actually overflows. Never wraps into another row.
 */
export default function NavScrollStrip({
  children,
  tone = "white",
  className = "",
}: {
  children: ReactNode;
  tone?: "white" | "cream";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ overflowing: false, left: false, right: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const overflowing = el.scrollWidth > el.clientWidth + 1;
    setState({
      overflowing,
      left: overflowing && el.scrollLeft > 1,
      right: overflowing && el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    });
  }, []);

  useLayoutEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [update]);

  const scroll = (direction: -1 | 1) =>
    ref.current?.scrollBy({ left: direction * 240, behavior: "smooth" });

  const fadeClass = tone === "cream" ? "from-accent-faint" : "from-white";

  return (
    <div className={`relative min-w-0 flex-1 ${className}`}>
      {state.overflowing && state.left ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r ${fadeClass} to-transparent`}
        />
      ) : null}
      {state.overflowing && state.right ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l ${fadeClass} to-transparent`}
        />
      ) : null}

      <div
        ref={ref}
        className="scrollbar-hide flex h-full flex-nowrap items-center gap-1 overflow-x-auto px-6"
      >
        {children}
      </div>

      {state.overflowing && state.left ? (
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Scroll navigation left"
          className="absolute left-0 top-1/2 z-20 flex h-7 w-6 -translate-y-1/2 items-center justify-center rounded-r-md border border-ledger-line bg-white text-ink-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}
      {state.overflowing && state.right ? (
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Scroll navigation right"
          className="absolute right-0 top-1/2 z-20 flex h-7 w-6 -translate-y-1/2 items-center justify-center rounded-l-md border border-ledger-line bg-white text-ink-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
