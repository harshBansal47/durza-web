import type { ReactElement } from "react";
import Image from "next/image";
import { storeLogoUrl } from "@/lib/storeLogos";

/**
 * Generated cover art for buying guides. One outline-icon palette, four
 * variants chosen from the guide's own title/summary (real data), so every
 * cover is consistent without any stock photography.
 */
export type GuideCoverVariant = "cart" | "card" | "shirt" | "generic";

export function guideCoverVariant(title: string, summary: string): GuideCoverVariant {
  const probe = `${title} ${summary}`.toLowerCase();
  if (/(amazon|flipkart|myntra|meesho|ajio|nykaa|cart|shopping|store)/.test(probe)) {
    if (/(card|credit|bank|emi|payment)/.test(probe)) return "card";
    if (/(shirt|fashion|apparel|wear|clothing)/.test(probe)) return "shirt";
    return "cart";
  }
  if (/(card|credit|bank|emi|payment)/.test(probe)) return "card";
  if (/(shirt|fashion|apparel|wear|clothing)/.test(probe)) return "shirt";
  return "generic";
}

/**
 * Stores a guide is about, read from its own title and summary, in the order
 * they first appear. Only stores we hold a logo for are listed — an unknown
 * name simply yields no logo rather than a guess. Capped so the cover stays
 * uncluttered.
 */
const STORE_MENTIONS: [slug: string, pattern: RegExp][] = [
  ["amazon-in", /\bamazon(\.in| india)?\b/],
  ["flipkart", /\bflipkart\b/],
  ["myntra", /\bmyntra\b/],
  ["meesho", /\bmeesho\b/],
  ["ajio", /\bajio\b/],
  ["nykaa", /\bnykaa\b/],
  ["croma", /\bcroma\b/],
  ["reliance-digital", /\breliance digital\b/],
  ["bigbasket", /\bbig ?basket\b/],
  ["firstcry", /\bfirst ?cry\b/],
  ["lenskart", /\blenskart\b/],
  ["makemytrip", /\bmake ?my ?trip\b/],
  ["ixigo", /\bixigo\b/],
  ["swiggy", /\bswiggy\b/],
  ["zomato", /\bzomato\b/],
];

export function guideStoreMentions(title: string, summary: string, max = 3): string[] {
  const probe = `${title} ${summary}`.toLowerCase();
  return STORE_MENTIONS.flatMap(([slug, pattern]) => {
    const at = probe.search(pattern);
    return at === -1 ? [] : [{ slug, at }];
  })
    .sort((a, b) => a.at - b.at)
    .slice(0, max)
    .map((m) => m.slug);
}

export function GuideCover({
  variant,
  storeSlugs = [],
  size = "card",
  className = "",
}: {
  variant: GuideCoverVariant;
  /** Slugs of stores to show as logos beside the topic icon. */
  storeSlugs?: string[];
  /** `card` for listings, `hero` for the top of a guide. */
  size?: "card" | "hero";
  className?: string;
}) {
  const hero = size === "hero";
  const logos = storeSlugs.flatMap((slug) => {
    const src = storeLogoUrl({ slug });
    return src ? [{ slug, src }] : [];
  });
  const palette = {
    cart: { bg: "bg-accent-faint", ink: "text-accent" },
    card: { bg: "bg-accent-faint", ink: "text-durza-deep" },
    shirt: { bg: "bg-accent-faint", ink: "text-accent" },
    generic: { bg: "bg-paper-alt", ink: "text-ink-soft" },
  }[variant];

  const glyph: Record<GuideCoverVariant, ReactElement> = {
    cart: (
      <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </g>
    ),
    card: (
      <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
      </g>
    ),
    shirt: (
      <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </g>
    ),
    generic: (
      <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </g>
    ),
  };

  return (
    <div
      aria-hidden="true"
      className={`relative flex w-full items-center justify-center gap-4 overflow-hidden ${
        hero ? "aspect-[2/1] rounded-2xl sm:aspect-[21/9]" : "aspect-[16/9] rounded-xl"
      } ${palette.bg} ${palette.ink} ${className}`}
    >
      {/* Faint dot grid fading toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <span
        className={`relative flex shrink-0 items-center justify-center rounded-full bg-white/70 ${
          hero ? "h-24 w-24" : "h-16 w-16"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className={hero ? "h-12 w-12" : "h-8 w-8"}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {glyph[variant]}
        </svg>
      </span>
      {logos.length > 0 && (
        <span className="relative flex -space-x-3">
          {logos.map(({ slug, src }) => (
            <Image
              key={slug}
              src={src}
              alt=""
              width={hero ? 64 : 48}
              height={hero ? 64 : 48}
              className={`${hero ? "h-16 w-16" : "h-12 w-12"} rounded-full border-2 border-white bg-white object-contain`}
            />
          ))}
        </span>
      )}
    </div>
  );
}
