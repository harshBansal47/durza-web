import type { ReactElement } from "react";

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

export function GuideCover({
  variant,
  className = "",
}: {
  variant: GuideCoverVariant;
  className?: string;
}) {
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
      className={`relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl ${palette.bg} ${palette.ink} ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        {glyph[variant]}
      </svg>
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
    </div>
  );
}
