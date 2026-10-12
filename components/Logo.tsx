import { BRAND, MARK_PATH, MARK_RADIUS } from "@/lib/brand";

type Tone = "light" | "reversed";

/** The Durza "D" tile. Orange tile with a white D, or white tile with an orange D on reversed. */
export function LogoMark({
  size = 36,
  tone = "light",
  className = "",
}: {
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  const reversed = tone === "reversed";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect
        width="512"
        height="512"
        rx={MARK_RADIUS}
        fill={reversed ? BRAND.white : BRAND.orange}
      />
      <path
        d={MARK_PATH}
        fill={reversed ? BRAND.orange : BRAND.white}
        fillRule="evenodd"
      />
    </svg>
  );
}

/**
 * Mark + "Durza" wordmark, with the "Coupon & Deals" descriptor underneath
 * when `tagline` is set. Parent should provide the accessible name (e.g. the
 * link's aria-label); the visible text is also exposed to screen readers.
 */
export default function Logo({
  size = 36,
  tone = "light",
  tagline = false,
  className = "",
  markClassName = "",
}: {
  size?: number;
  tone?: Tone;
  /** Show "Coupon & Deals" under the name. Pair with `hidden sm:block` via taglineClassName if space is tight. */
  tagline?: boolean;
  className?: string;
  markClassName?: string;
}) {
  const reversed = tone === "reversed";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} tone={tone} className={`shrink-0 ${markClassName}`} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-sans text-[21px] font-bold tracking-[-0.03em] sm:text-[23px] ${
            reversed ? "text-white" : "text-ink"
          }`}
        >
          {BRAND.name}
        </span>
        {tagline && (
          <span
            className={`mt-1 hidden font-sans text-[11.5px] font-medium sm:block ${
              reversed ? "text-white/90" : "text-durza-deep"
            }`}
          >
            {BRAND.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
