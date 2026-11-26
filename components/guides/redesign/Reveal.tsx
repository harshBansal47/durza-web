"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** One-shot fade/rise as a section enters. Reduced-motion CSS opts out. */
export default function Reveal({ children, index = 0 }: { children: ReactNode; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="gd-reveal"
      data-visible={visible}
      style={{ transitionDelay: visible ? `${Math.min(index, 6) * 70}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
