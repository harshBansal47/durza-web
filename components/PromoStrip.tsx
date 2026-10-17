import Link from "next/link";

/**
 * Slim strip above the header. Every message is a true statement
 * about how the site works; there are no fake countdowns here and no
 * claims of community confirmation while the vote counts are still zero.
 */
const MESSAGES = [
  "Every offer shows its source and last-checked date",
  "Deals from the stores you already shop at",
  "Expired coupons removed regularly",
  "Shopper votes update each offer's success rate",
];

export default function PromoStrip() {
  const loop = [...MESSAGES, ...MESSAGES];
  return (
    <div className="bg-ink relative overflow-hidden text-white no-print">
      <div className="relative mx-auto flex max-w-6xl items-center gap-3 px-4 py-1.5 sm:px-6">
        <span className="hidden shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium sm:inline">
          Sourced from official store pages
        </span>
        <div className="marquee relative min-w-0 flex-1 overflow-hidden" aria-label="How Durza works" role="marquee">
          <div className="marquee-track gap-10 whitespace-nowrap text-xs font-medium" style={{ animationDuration: "40s" }}>
            {loop.map((m, i) => (
              <span key={i} className="mr-10 inline-flex items-center gap-2" aria-hidden={i >= MESSAGES.length}>
                <span aria-hidden="true" className="text-accent-soft">★</span>
                {m}
              </span>
            ))}
          </div>
        </div>
        <Link href="/trust" className="shrink-0 text-xs font-medium underline-offset-2 hover:underline">
          How it works
        </Link>
      </div>
    </div>
  );
}
