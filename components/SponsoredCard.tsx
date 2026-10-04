import Image from "next/image";
import { api } from "@/lib/api";
import type { Ad } from "@/lib/types";

/**
 * A paid placement. Rules this component enforces:
 *  - the disclosure label is always visible on the banner itself (not only in
 *    markup for assistive tech), and comes from the ad so it can never be blank;
 *  - the link goes through the tracked /go redirect and is marked
 *    rel="sponsored nofollow noopener noreferrer";
 *  - it is visually a banner, never styled like a ranked coupon.
 */
export default function SponsoredCard({
  ad,
  src,
  className = "",
  aspect = "aspect-[3/1]",
}: {
  ad: Ad;
  /** Which surface this is on, e.g. "ad-header". Becomes ?src= on the redirect. */
  src: string;
  className?: string;
  /** Tailwind aspect class; banners differ per slot. */
  aspect?: string;
}) {
  const who = ad.advertiser ? `${ad.label}: ${ad.advertiser}` : ad.label;
  return (
    <aside aria-label={who} className={className}>
      <a
        href={api.adGoUrl(ad.id, src)}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className={`group relative block overflow-hidden rounded-[22px] border border-ledger-line bg-ledger-line/60 shadow-[var(--shadow-raised)] transition-shadow hover:shadow-[var(--shadow-overlay)] ${aspect}`}
      >
        {/* Ad images come from arbitrary advertiser hosts, so they are not run through the optimizer. */}
        <Image
          src={ad.image_url}
          alt={ad.alt_text ?? ad.advertiser ?? ""}
          fill
          unoptimized
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/75 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur">
          {ad.label}
          {ad.advertiser ? <span className="font-normal opacity-80"> · {ad.advertiser}</span> : null}
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </aside>
  );
}
