"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Check,
  Copy,
  Cpu,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GO_REL, storeGoHref } from "@/lib/go";

interface Props {
  forcedStoreHref?: string | null;
}

type Product = {
  id: string;
  image: string;
  alt: string;
  headline: string;
  points: string[];
  ctaLabel: string;
  couponCode: string;
  accent: "blue" | "orange" | "cyan";
};

const PRODUCTS: Product[] = [
  {
    id: "predator",
    image: "/images/acer/predator.jpg",
    alt: "Acer Predator Helios 300 gaming laptop with high-refresh display",
    headline: "Dominate the Competition: Predator Helios 300",
    points: [
      "15.6-inch FHD IPS display with a staggering 360Hz refresh rate.",
      "Up to 3ms response time for ultra-smooth, tear-free gameplay.",
      "100% sRGB coverage for vibrant, accurate visuals.",
      "Powered by high-performance processors and PCIe Gen 4 SSDs for instant load times.",
    ],
    ctaLabel: "Buy at Best Price",
    couponCode: "PREDATOR10",
    accent: "blue",
  },
  {
    id: "nitro",
    image: "/images/acer/nitro.jpg",
    alt: "Acer Nitro gaming laptop powered by NVIDIA GeForce RTX graphics",
    headline: "Power-Packed Deals on Nitro Gaming Laptops",
    points: [
      "Features 100% sRGB displays with refresh rates up to 165Hz.",
      "Equipped with the latest NVIDIA GeForce RTX 50 Series GPUs.",
      "Dual-fan cooling technology for stable performance during intense sessions.",
      "Powerful Intel Core H-series processors.",
    ],
    ctaLabel: "Claim Deal Now",
    couponCode: "NITRO20",
    accent: "orange",
  },
  {
    id: "swift",
    image: "/images/acer/swift.jpg",
    alt: "Acer Swift Go 14 AI ultrabook with OLED display",
    headline: "Sleek. Stylish. Powered by AI.",
    points: [
      "Powered by Intel Core Ultra processors with dedicated AI acceleration.",
      "Go from morning to night with up to 26 hours of battery life.",
      "Lightweight design (1.3kg) with a stunning OLED display for vibrant visuals on the go.",
    ],
    ctaLabel: "Upgrade Your Workflow",
    couponCode: "SWIFT5",
    accent: "cyan",
  },
];

const TRUST_BADGES = [
  { icon: BadgeCheck, label: "Verified Official Partner" },
  { icon: Lock, label: "100% Secure Checkout" },
  { icon: ShieldCheck, label: "Exclusive Coupon Codes" },
  { icon: Cpu, label: "Latest 2026 Models" },
];

function accentStyles(accent: Product["accent"]) {
  switch (accent) {
    case "blue":
      return {
        ring: "hover:ring-blue-500/40",
        glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]",
        cta: "bg-blue-600 hover:bg-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_16px_40px_rgba(59,130,246,0.45)]",
        badge: "text-blue-300 border-blue-500/30 bg-blue-500/10",
        code: "text-blue-200",
      };
    case "orange":
      return {
        ring: "hover:ring-orange-500/40",
        glow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
        cta: "bg-orange-500 hover:bg-orange-400 text-black shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_16px_40px_rgba(251,146,60,0.45)]",
        badge: "text-orange-300 border-orange-500/30 bg-orange-500/10",
        code: "text-orange-200",
      };
    case "cyan":
    default:
      return {
        ring: "hover:ring-cyan-400/40",
        glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]",
        cta: "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_10px_30px_rgba(34,211,238,0.25)] hover:shadow-[0_16px_40px_rgba(34,211,238,0.4)]",
        badge: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
        code: "text-cyan-200",
      };
  }
}

export default function AcerStorePageClient({ forcedStoreHref }: Props) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const outHref = (src: string) => storeGoHref("acer", src, forcedStoreHref ?? undefined);

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(textarea);
      }
    }
    setCopiedCode(code);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07090d] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute top-[30rem] -left-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute top-[60rem] -right-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-10 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            <Zap aria-hidden="true" className="h-4 w-4" />
            Acer Exclusive Partner Deals
          </p>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Unlock Elite Performance: Acer&apos;s Latest Lineup with{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Exclusive Discounts
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
            From the world&apos;s fastest 360Hz gaming displays to AI-powered ultrabooks. Use our
            verified Admitad coupon codes for the best prices online.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#deals"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-blue-600 px-8 text-base font-bold text-white shadow-[0_12px_35px_rgba(37,99,235,0.45)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_18px_45px_rgba(59,130,246,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              See Current Deals &amp; Codes
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-left text-xs font-medium text-zinc-200 sm:text-sm"
              >
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency */}
      <div className="sticky top-0 z-40 border-y border-orange-400/30 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 shadow-[0_8px_30px_rgba(249,115,22,0.25)]">
        <div className="mx-auto max-w-7xl px-4 py-3 text-center text-sm font-bold text-black sm:px-6 sm:text-base">
          ⚡ Limited-Time Offer: These exclusive Admitad coupon codes are valid for a short period.
          Don&apos;t miss out!
        </div>
      </div>

      {/* Products */}
      <section id="deals" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Curated Acer Picks &amp; Verified Codes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
            Handpicked laptops for gamers, creators, and professionals — each with an exclusive
            coupon to maximize your savings.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            const styles = accentStyles(product.accent);
            const copied = copiedCode === product.couponCode;
            return (
              <article
                key={product.id}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 ring-1 ring-transparent backdrop-blur-sm transition duration-300 hover:-translate-y-1 ${styles.ring} ${styles.glow}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span
                    className={`mb-4 inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${styles.badge}`}
                  >
                    Exclusive Deal
                  </span>
                  <h3 className="font-sans text-2xl font-bold leading-tight text-white">
                    {product.headline}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
                    {product.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <Check
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-emerald-400"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <a
                      href={outHref(`${product.id}-cta`)}
                      target="_blank"
                      rel={GO_REL}
                      className={`inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 text-sm font-bold transition duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${styles.cta}`}
                    >
                      {product.ctaLabel}
                    </a>

                    <div className="mt-4 rounded-xl border border-dashed border-white/20 bg-black/30 p-3">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                        Coupon Code
                      </p>
                      <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-zinc-950/80 px-3 py-2.5">
                        <code className={`font-mono text-sm font-bold tracking-wider sm:text-base ${styles.code}`}>
                          {product.couponCode}
                        </code>
                        <button
                          type="button"
                          onClick={() => copyCode(product.couponCode)}
                          className={`inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                            copied
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-white/10 text-zinc-100 hover:bg-white/20"
                          }`}
                          aria-label={`Copy coupon code ${product.couponCode}`}
                        >
                          {copied ? (
                            <>
                              <Check aria-hidden="true" className="h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy aria-hidden="true" className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Footer disclosure (page-level) */}
      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-sm leading-7 text-zinc-400">
            As an affiliate, we may earn a commission from qualifying purchases at no extra cost to you.
          </p>
        </div>
      </footer>
    </div>
  );
}
