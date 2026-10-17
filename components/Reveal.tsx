"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Motion system (§33): one restrained entrance. Sections fade-and-rise once
 * when scrolled into view; above-the-fold content renders visible with no
 * observer delay. Disabled entirely under prefers-reduced-motion via CSS.
 *
 * Hydration: the server and the first client render must produce identical
 * markup, so the component starts in the "idle" state with no reveal class.
 * Only after mount do we measure the element — and only then hide it, if it
 * is below the fold — before the IntersectionObserver reveals it.
 */
type RevealState = "idle" | "hidden" | "visible";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (el.getBoundingClientRect().top < viewportHeight * 0.92) return; // already in view
    setState("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const revealClass =
    state === "hidden" ? "reveal" : state === "visible" ? "reveal is-visible" : "";

  return (
    <div ref={ref} className={`${revealClass} ${className}`}>
      {children}
    </div>
  );
}
