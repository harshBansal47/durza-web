import { ArrowUpRight } from "lucide-react";
import { GO_REL } from "@/lib/go";

/**
 * A tracked CTA that sends a click to a specific Admitad-connected program.
 *
 * Route: /out?program=<external campaign id>&ulp=<url>&src=guide_cta&content_ref=<placement tag>
 * The server validates the ulp against the program's own domain, records the
 * click (network, placement, content_ref) then 302s with the network sub-ID
 * replaced by this click's reference. No Admitad API round-trip; fast and
 * free per click.
 *
 * The rel marks the link as sponsored exactly like every other affiliate link
 * on the site — the merchant earns a commission, Durza too.
 */
export interface GuideOutButtonProps {
  /** Admitad campaign id — see data/admitad-programs.ts. */
  program: string;
  /** Absolute destination on the program's own domain. */
  ulp: string;
  /** Placement tag recorded as content_ref, e.g. "lenovo_guide_hero". */
  contentRef: string;
  /** Short CTA text, e.g. "Shop Lenovo laptops ↗". */
  label: string;
  /** Optional one-line justification shown under the button (kept honest — no invented savings). */
  note?: string;
}

export default function GuideAffiliateOutButton({ program, ulp, contentRef, label, note }: GuideOutButtonProps) {
  const href = `/out?program=${encodeURIComponent(program)}&ulp=${encodeURIComponent(ulp)}&src=guide_cta&content_ref=${encodeURIComponent(contentRef)}`;
  return (
    <div className="my-8 not-prose">
      <a
        href={href}
        target="_blank"
        rel={GO_REL}
        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        {label}
        <ArrowUpRight aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
      </a>
      {note && <p className="mt-2 text-xs leading-5 text-ink-soft">{note}</p>}
    </div>
  );
}

/** Plain <img> banner for in-guide placements with /out click tracking and a Sponsored tag. */
export function GuideAffiliateOutBanner({
  program,
  ulp,
  contentRef,
  imageUrl,
  width,
  height,
  alt,
}: {
  program: string;
  ulp: string;
  contentRef: string;
  imageUrl: string;
  width: number;
  height: number;
  alt: string;
}) {
  const href = `/out?program=${encodeURIComponent(program)}&ulp=${encodeURIComponent(ulp)}&src=guide_banner&content_ref=${encodeURIComponent(contentRef)}`;
  return (
    <figure className="my-10 not-prose flex flex-col items-center">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-widest text-ink-soft">Sponsored</p>
      <a
        href={href}
        target="_blank"
        rel={GO_REL}
        className="mt-1 block max-w-full overflow-hidden rounded-lg border border-ledger-line transition-shadow hover:shadow-md"
      >
        {/* Plain <img>: the CDN is the network's own; sizing taken from the creative itself */}
        <img
          src={imageUrl}
          alt={`Advertisement — ${alt}`}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="h-auto w-auto max-w-full"
        />
      </a>
    </figure>
  );
}
