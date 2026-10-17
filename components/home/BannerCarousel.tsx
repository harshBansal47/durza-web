"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import type { Ad } from "@/lib/types";

// Edit brand colors here. They are applied as inline styles, so global CSS
// or Tailwind token problems can't override them.
const PALETTE = {
  dark: "#16130F",
  darkSoft: "#2B2519",
  gold: "#F5B335",
  goldLight: "#FFD27A",
  white: "#FFFFFF",
  onDarkBody: "#E9E5DB", // solid light color (no alpha), always readable on dark
  onGoldHeading: "#14110A",
  onGoldBody: "#2B2208", // solid dark color, always readable on gold
};

interface Banner {
  title: string;
  body: string;
  cta: string;
  href: string;
  glyph: string;
  background: string;
  heading: string;
  text: string;
  glyphColor: string;
  deco: string;
  buttonBg: string;
  buttonText: string;
}

const BANNERS: Banner[] = [
  {
    title: "Codes straight from the source",
    body: "Every offer links to the store page it was read from, with the date we last checked it.",
    cta: "Browse coupons",
    href: "/coupons",
    glyph: "✓",
    background: `linear-gradient(135deg, ${PALETTE.darkSoft} 0%, ${PALETTE.dark} 65%)`,
    heading: PALETTE.white,
    text: PALETTE.onDarkBody,
    glyphColor: "rgba(255,255,255,0.14)",
    deco: "rgba(255,255,255,0.07)",
    buttonBg: PALETTE.white,
    buttonText: PALETTE.dark,
  },
  {
    title: "Today's deals, checked at the source",
    body: "Expiry dates come from the stores' own terms — not pressure timers. Expired offers are removed.",
    cta: "See today's deals",
    href: "/deals",
    glyph: "%",
    background: `linear-gradient(135deg, ${PALETTE.goldLight} 0%, ${PALETTE.gold} 70%)`,
    heading: PALETTE.onGoldHeading,
    text: PALETTE.onGoldBody,
    glyphColor: "rgba(20,17,10,0.13)",
    deco: "rgba(20,17,10,0.08)",
    buttonBg: PALETTE.dark,
    buttonText: PALETTE.white,
  },
  {
    title: "Follow a price, skip the refresh",
    body: "Track a product and we email you when the price drops or its store gets a new tracked offer.",
    cta: "Create a free account",
    href: "/account/register",
    glyph: "↓",
    background: `linear-gradient(135deg, ${PALETTE.dark} 0%, ${PALETTE.darkSoft} 100%)`,
    heading: PALETTE.white,
    text: PALETTE.onDarkBody,
    glyphColor: "rgba(245,179,53,0.22)",
    deco: "rgba(245,179,53,0.12)",
    buttonBg: PALETTE.gold,
    buttonText: PALETTE.dark,
  },
];

const SLIDE_HEIGHT = "min-h-[240px] sm:min-h-[300px]";

export default function BannerCarousel({ sponsored }: { sponsored?: Ad | null }) {
  const total = BANNERS.length + (sponsored ? 1 : 0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const next = (i + total) % total;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    },
    [total]
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => setActive(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false) return;
    const t = setInterval(() => goTo(active + 1), 6500);
    return () => clearInterval(t);
  }, [active, paused, goTo]);

  const arrowStyle = {
    backgroundColor: PALETTE.white,
    color: PALETTE.dark,
    border: "1px solid rgba(20,17,10,0.2)",
  } as const;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-[20px] shadow-md"
        style={{ boxShadow: "0 0 0 1px rgba(20,17,10,0.12), 0 4px 14px rgba(20,17,10,0.1)" }}
      >
        {BANNERS.map((b, i) => (
          <div
            key={b.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            className={`${SLIDE_HEIGHT} relative flex min-w-full snap-center items-center overflow-hidden px-6 py-9 sm:px-12 sm:py-12`}
            style={{ background: b.background }}
          >
            {/* decorative shapes */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full"
              style={{ backgroundColor: b.deco }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 right-1/3 h-40 w-40 rounded-full"
              style={{ backgroundColor: b.deco }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-sans text-[9rem] font-semibold leading-none sm:right-10 sm:text-[13rem]"
              style={{ color: b.glyphColor }}
            >
              {b.glyph}
            </span>

            <div className="relative max-w-lg">
              <h2
                className="text-balance font-sans text-2xl font-semibold leading-tight tracking-tight sm:text-4xl"
                style={{ color: b.heading }}
              >
                {b.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: b.text }}>
                {b.body}
              </p>
              <Link
                href={b.href}
                className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm outline-none transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundColor: b.buttonBg, color: b.buttonText }}
              >
                {b.cta}
              </Link>
            </div>
          </div>
        ))}

        {sponsored && (
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`${total} of ${total}, ${sponsored.label}`}
            className={`${SLIDE_HEIGHT} relative min-w-full snap-center overflow-hidden`}
            style={{ backgroundColor: PALETTE.dark }}
          >
            <a
              href={api.adGoUrl(sponsored.id, "ad-header")}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="absolute inset-0 block outline-none focus-visible:ring-2 focus-visible:ring-inset"
            >
              <Image
                src={sponsored.image_url}
                alt={sponsored.alt_text ?? sponsored.advertiser ?? ""}
                fill
                unoptimized
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-20"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }}
              />
              <span
                className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur"
                style={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  color: PALETTE.white,
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.2)",
                }}
              >
                {sponsored.label}
                {sponsored.advertiser ? (
                  <span className="font-normal" style={{ color: PALETTE.onDarkBody }}>
                    {" "}
                    · {sponsored.advertiser}
                  </span>
                ) : null}
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        )}
      </div>

      {/* controls */}
      <div className="mt-4 flex items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Previous slide"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg leading-none shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={arrowStyle}
        >
          ‹
        </button>
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active}
            className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              i === active ? "w-8" : "w-2.5"
            }`}
            style={{
              backgroundColor: i === active ? PALETTE.dark : "rgba(20,17,10,0.25)",
            }}
          />
        ))}
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Next slide"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg leading-none shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={arrowStyle}
        >
          ›
        </button>
      </div>
    </section>
  );
}