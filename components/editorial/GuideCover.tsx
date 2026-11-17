import type { ReactElement } from "react";
import Image from "next/image";
import { storeLogoUrl } from "@/lib/storeLogos";

/**
 * Generated cover art for buying guides. One outline-icon palette, now with
 * distinct category accents so the three homepage guides read as three
 * different topics at a glance instead of near-identical thumbnails.
 */
export type GuideCoverVariant = "cart" | "card" | "shirt" | "generic";

export function guideCoverVariant(title: string, summary: string): GuideCoverVariant {
  const probe = `${title} ${summary}`.toLowerCase();
  if (/(card|credit|bank|emi|payment)/.test(probe)) return "card";
  if (/(shirt|fashion|apparel|wear|clothing)/.test(probe)) return "shirt";
  if (/(amazon|flipkart|myntra|meesho|ajio|nykaa|cart|shopping|store)/.test(probe)) return "cart";
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

const VARIANTS: Record<
  GuideCoverVariant,
  {
    label: string;
    background: string;
    glyphColor: string;
    chip: string;
  }
> = {
  cart: {
    label: "E-COMMERCE",
    background:
      "bg-[radial-gradient(ellipse_at_top_left,#ffedd5,transparent_60%),radial-gradient(ellipse_at_bottom_right,#fdba74,transparent_55%),linear-gradient(135deg,#fff7ed,#ffedd5)]",
    glyphColor: "text-orange-600",
    chip: "bg-orange-200/80 text-orange-900",
  },
  card: {
    label: "CREDIT CARDS",
    background:
      "bg-[radial-gradient(ellipse_at_top_left,#e0e7ff,transparent_60%),radial-gradient(ellipse_at_bottom_right,#c7d2fe,transparent_55%),linear-gradient(135deg,#eef2ff,#e0e7ff)]",
    glyphColor: "text-indigo-700",
    chip: "bg-indigo-200/80 text-indigo-900",
  },
  shirt: {
    label: "FASHION",
    background:
      "bg-[radial-gradient(ellipse_at_top_left,#d1fae5,transparent_60%),radial-gradient(ellipse_at_bottom_right,#a7f3d0,transparent_55%),linear-gradient(135deg,#ecfdf5,#d1fae5)]",
    glyphColor: "text-emerald-700",
    chip: "bg-emerald-200/80 text-emerald-900",
  },
  generic: {
    label: "BUYING GUIDE",
    background:
      "bg-[radial-gradient(ellipse_at_top_left,#e2e8f0,transparent_60%),radial-gradient(ellipse_at_bottom_right,#cbd5e1,transparent_55%),linear-gradient(135deg,#f8fafc,#e2e8f0)]",
    glyphColor: "text-slate-600",
    chip: "bg-slate-200/80 text-slate-800",
  },
};

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
  const palette = VARIANTS[variant];

  const glyph: Record<GuideCoverVariant, ReactElement> = {
    cart: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1.4" />
        <circle cx="19.5" cy="21" r="1.4" />
        <path d="M1.5 1.5h4.2l2.7 13.2a2 2 0 0 0 2 1.6h9.4a2 2 0 0 0 2-1.6L23 6.2H6.2" />
      </g>
    ),
    card: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2.4" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
      </g>
    ),
    shirt: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2l.6 3.5a1 1 0 0 0 1 .8H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.1a1 1 0 0 0 1-.8l.6-3.5a2 2 0 0 0-1.3-2.2z" />
      </g>
    ),
    generic: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      className={`relative flex w-full items-center gap-4 overflow-hidden border border-black/5 p-5 ${palette.background} ${
        hero ? "aspect-[2/1] rounded-2xl sm:aspect-[21/9]" : "aspect-[16/9] rounded-xl"
      } ${className}`}
    >
      {/* Dot texture fading toward edges */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.16) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage: "radial-gradient(ellipse at 30% 30%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 30% 30%, black 30%, transparent 70%)",
        }}
      />
      <span className={`relative inline-flex ${hero ? "h-24 w-24" : "h-16 w-16 sm:h-20 sm:w-20"} shrink-0 items-center justify-center rounded-2xl bg-white/85 shadow-sm ${palette.glyphColor}`}>
        <svg viewBox="0 0 24 24" className={hero ? "h-12 w-12" : "h-8 w-8 sm:h-10 sm:w-10"} fill="none" xmlns="http://www.w3.org/2000/svg">
          {glyph[variant]}
        </svg>
      </span>
      <span className="relative flex min-w-0 flex-col items-start gap-2">
        <span className={`inline-flex items-center rounded-full ${palette.chip} px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]`}>
          {palette.label}
        </span>
        {logos.length > 0 && (
          <span className="flex -space-x-2.5">
            {logos.map(({ slug, src }) => (
              <Image
                key={slug}
                src={src}
                alt=""
                width={hero ? 64 : 48}
                height={hero ? 64 : 48}
                className={`${hero ? "h-14 w-14" : "h-11 w-11 sm:h-12 sm:w-12"} rounded-full border-2 border-white bg-white object-contain shadow-sm`}
              />
            ))}
          </span>
        )}
      </span>
    </div>
  );
}
