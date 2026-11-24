"use client";

import { useEffect, useState } from "react";

/** The old promo ticker, now one rotating message in the primary nav row. */
const MESSAGES = [
  "Every offer states its type",
  "Last-checked date shown when known",
  "No fabricated codes or discounts",
] as const;

export default function TrustRotator() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % MESSAGES.length), 5000);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion]);

  return (
    <div
      className="hidden shrink-0 items-center gap-2 text-xs text-ink-soft xl:flex"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-semibold text-accent">
        Clear offers, always free
      </span>
      <span
        key={index}
        className="max-w-[260px] truncate font-medium motion-safe:animate-[durza-fade-in_.5s_ease]"
      >
        {MESSAGES[index]}
      </span>
    </div>
  );
}
