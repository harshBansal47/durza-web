"use client";

import { useEffect, useRef, useState } from "react";
import VerifiedListingsTable from "@/components/editorial/VerifiedListingsTable";
import VerifiedResearchPanel from "@/components/editorial/VerifiedResearchPanel";
import Image from "next/image";
import { ArrowUpRight, BadgeCheck, Check, Copy, Cpu, Lock, ShieldCheck, Zap } from "lucide-react";
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
  offerInfo: string;
  accent: "blue" | "orange" | "cyan";
};

// Coupon codes below are sourced from Acer's Admitad program feed/mappings
// (see couponza-web/lib/affiliate.ts ADMITAD_ACER_CAMPAIGNS and the Acer deals guide).
const PRODUCTS: Product[] = [
  {
    id: "predator",
    image: "/images/acer/predator.webp",
    alt: "Acer Predator Helios 300 gaming laptop with high-refresh display",
    headline: "Dominate the Competition: Predator Helios 300",
    points: [
      "15.6-inch FHD IPS display with a staggering 360Hz refresh rate.",
      "Up to 3ms response time for ultra-smooth, tear-free gameplay.",
      "100% sRGB coverage for vibrant, accurate visuals.",
      "Powered by high-performance processors and PCIe Gen 4 SSDs for instant load times.",
    ],
    ctaLabel: "Buy at Best Price",
    couponCode: "AD233KGL",
    offerInfo: "₹3,000 off gaming laptops",
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
    couponCode: "AD233KGL",
    offerInfo: "₹3,000 off gaming laptops",
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
    couponCode: "AD232KL",
    offerInfo: "₹2,000 off non-gaming laptops",
    accent: "cyan",
  },
];

const TABLET_COUPON = {
  code: "TABLET500",
  offerInfo: "₹500 off tablets",
};

const TRUST_BADGES = [
  { icon: BadgeCheck, label: "Official Acer programme" },
  { icon: Lock, label: "100% Secure Checkout" },
  { icon: ShieldCheck, label: "Exclusive Coupon Codes" },
  { icon: Cpu, label: "Latest 2026 Models" },
];

function accentStyles(accent: Product["accent"]) {
  switch (accent) {
    case "blue":
      return {
        card: "hover:border-blue-200",
        badge: "text-blue-700 border-blue-200 bg-blue-50",
        cta: "bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] hover:bg-blue-700 hover:shadow-[0_16px_34px_rgba(37,99,235,0.32)]",
        ctaCopied: "bg-emerald-600 text-white shadow-[0_10px_24px_rgba(5,150,105,0.28)]",
        code: "text-blue-700",
        check: "text-blue-600",
      };
    case "orange":
      return {
        card: "hover:border-orange-200",
        badge: "text-orange-700 border-orange-200 bg-orange-50",
        cta: "bg-orange-500 text-white shadow-[0_10px_24px_rgba(234,88,12,0.22)] hover:bg-orange-600 hover:shadow-[0_16px_34px_rgba(234,88,12,0.32)]",
        ctaCopied: "bg-emerald-600 text-white shadow-[0_10px_24px_rgba(5,150,105,0.28)]",
        code: "text-orange-700",
        check: "text-orange-600",
      };
    case "cyan":
    default:
      return {
        card: "hover:border-cyan-200",
        badge: "text-cyan-700 border-cyan-200 bg-cyan-50",
        cta: "bg-cyan-600 text-white shadow-[0_10px_24px_rgba(8,145,178,0.22)] hover:bg-cyan-700 hover:shadow-[0_16px_34px_rgba(8,145,178,0.32)]",
        ctaCopied: "bg-emerald-600 text-white shadow-[0_10px_24px_rgba(5,150,105,0.28)]",
        code: "text-cyan-700",
        check: "text-cyan-600",
      };
  }
}

function maskCode(code: string): string {
  if (code.length <= 2) return code;
  return `${code.slice(0, 2)}${"•".repeat(code.length - 2)}`;
}

export default function AcerStorePageClient({ forcedStoreHref }: Props) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const copiedTimeoutRef = useRef<number | null>(null);
  const redirectTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) window.clearTimeout(copiedTimeoutRef.current);
      if (redirectTimeoutRef.current) window.clearTimeout(redirectTimeoutRef.current);
    };
  }, []);

  const outHref = (src: string) => storeGoHref("acer", src, forcedStoreHref ?? undefined);
  const officialStoreHref = outHref("official-store");

  const copyAndRedirect = async (code: string, src: string) => {
    // Open a blank tab synchronously on user click to avoid popup blockers,
    // then navigate it to the CPS/tracked link after the copy feedback delay.
    const popup = window.open("", "_blank", "noopener,noreferrer");
    const href = outHref(src);

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
    if (copiedTimeoutRef.current) window.clearTimeout(copiedTimeoutRef.current);
    copiedTimeoutRef.current = window.setTimeout(() => setCopiedCode(null), 2500);

    if (redirectTimeoutRef.current) window.clearTimeout(redirectTimeoutRef.current);
    redirectTimeoutRef.current = window.setTimeout(() => {
      try {
        if (popup && !popup.closed) {
          popup.location.href = href;
        } else {
          window.open(href, "_blank", "noopener,noreferrer");
        }
      } catch {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#f8fafc_100%)] text-ink">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            <Zap aria-hidden="true" className="h-4 w-4" />
            Acer Exclusive Partner Deals
          </p>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Unlock Elite Performance: Acer&apos;s Latest Lineup with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
              Exclusive Discounts
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-ink-soft sm:text-lg">
            From the world&apos;s fastest 360Hz gaming displays to AI-powered ultrabooks. Use our
            Admitad coupon codes where available — check the store page for current terms.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#deals"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-blue-600 px-8 text-base font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_18px_40px_rgba(37,99,235,0.38)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              See Current Deals &amp; Codes
            </a>
            <a
              href={officialStoreHref}
              target="_blank"
              rel={GO_REL}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-ledger-line bg-white px-8 text-base font-bold text-ink shadow-[var(--shadow-hairline)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[var(--shadow-raised)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Visit Official Store
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2 rounded-xl border border-ledger-line bg-white px-3 py-3 text-left text-xs font-medium text-ink shadow-[var(--shadow-hairline)] sm:text-sm"
              >
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <VerifiedResearchPanel kind="acer" />
        <VerifiedListingsTable store="acer" />
      </div>

      {/* Urgency */}
      <div className="sticky top-0 z-40 border-y border-amber-200 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 text-center text-sm font-semibold text-amber-950 sm:px-6 sm:text-base">
          ⚡ Limited-Time Offer: These exclusive coupon codes are valid for a short period.
          Don&apos;t miss out!
        </div>
      </div>

      {/* Products */}
      <section id="deals" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 text-center sm:mb-12">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Curated Offers</p>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Curated Acer picks and current codes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink-soft">
            Handpicked laptops for gamers, creators, and professionals — unlock an exclusive
            coupon at checkout to maximize your savings.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            const styles = accentStyles(product.accent);
            const copied = copiedCode === product.couponCode;
            return (
              <article
                key={product.id}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-ledger-line bg-white shadow-[var(--shadow-hairline)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-raised)] ${styles.card}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span
                    className={`mb-4 inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${styles.badge}`}
                  >
                    Exclusive Deal
                  </span>
                  <h3 className="font-sans text-2xl font-bold leading-tight text-ink">
                    {product.headline}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-soft">
                    {product.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <Check
                          aria-hidden="true"
                          className={`mt-1 h-4 w-4 shrink-0 ${styles.check}`}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                      <p className="mb-2 text-sm font-semibold text-ink sm:text-base">{product.offerInfo}</p>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Coupon Code
                      </p>
                      <div className="rounded-lg border border-ledger-line bg-white px-3 py-3">
                        <code className={`font-mono text-base font-bold tracking-[0.18em] sm:text-lg ${styles.code}`}>
                          {maskCode(product.couponCode)}
                        </code>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyAndRedirect(product.couponCode, `coupon-${product.id}`)}
                        className={`mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                          copied
                            ? styles.ctaCopied
                            : `${styles.cta} hover:-translate-y-0.5`
                        }`}
                        aria-label={`Copy coupon code for ${product.headline}`}
                      >
                        {copied ? (
                          <>
                            <Check aria-hidden="true" className="h-4 w-4" />
                            <span>Copied! Redirecting...</span>
                          </>
                        ) : (
                          <>
                            <Copy aria-hidden="true" className="h-4 w-4" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Tablet coupon */}
        <div className="mt-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-ledger-line bg-white p-6 shadow-[var(--shadow-hairline)] sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex-1">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Tablet Offer</p>
                <h3 className="mt-2 font-sans text-2xl font-bold text-ink">{TABLET_COUPON.offerInfo}</h3>
                <p className="mt-1 text-sm text-ink-soft">Save on Acer tablets with this exclusive coupon.</p>
              </div>
              <a
                href={officialStoreHref}
                target="_blank"
                rel={GO_REL}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ledger-line bg-white px-5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[var(--shadow-raised)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Check Acer Store
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <p className="mb-2 text-sm font-semibold text-ink sm:text-base">{TABLET_COUPON.offerInfo}</p>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Coupon Code
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex-1 rounded-lg border border-ledger-line bg-white px-3 py-3">
                  <code className="font-mono text-base font-bold tracking-[0.18em] text-violet sm:text-lg">
                    {maskCode(TABLET_COUPON.code)}
                  </code>
                </div>
                <button
                  type="button"
                  onClick={() => copyAndRedirect(TABLET_COUPON.code, "coupon-tablet")}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:min-w-[180px] ${
                    copiedCode === TABLET_COUPON.code
                      ? "bg-emerald-600 text-white shadow-[0_10px_24px_rgba(5,150,105,0.28)]"
                      : "bg-violet text-white shadow-[0_10px_24px_rgba(124,58,237,0.22)] hover:-translate-y-0.5 hover:bg-violet/90 hover:shadow-[0_16px_34px_rgba(124,58,237,0.32)]"
                  }`}
                  aria-label="Copy tablet coupon code"
                >
                  {copiedCode === TABLET_COUPON.code ? (
                    <>
                      <Check aria-hidden="true" className="h-4 w-4" />
                      <span>Copied! Redirecting...</span>
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" className="h-4 w-4" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Official store CTA */}
        <div className="mt-12 rounded-2xl border border-ledger-line bg-white p-6 text-center shadow-[var(--shadow-hairline)] sm:p-10">
          <h3 className="font-sans text-2xl font-extrabold text-ink sm:text-3xl">Ready to shop at Acer?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink-soft">
            Browse the latest laptops, desktops, monitors, and tablets directly on Acer&apos;s official store.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href={officialStoreHref}
              target="_blank"
              rel={GO_REL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-7 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_18px_40px_rgba(37,99,235,0.38)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Visit Official Acer Store
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer disclosure (page-level) */}
      <footer className="border-t border-ledger-line bg-white/70">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-sm leading-7 text-ink-soft">
            Disclaimer: The coupon codes and offers listed can not guarantee availability or pricing. All offers are subject to change and may be limited in quantity. Please verify the details on the official Acer store before making a purchase.
          </p>
        </div>
      </footer>
    </div>
  );
}
