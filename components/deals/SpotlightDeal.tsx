import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import { api } from "@/lib/api";
import { CardImpressions } from "@/components/CardImpressions";
import type { DealCardStore } from "@/components/DealCard";
import { storeInitials } from "@/lib/catalog";
import { formatDiscount } from "@/lib/format";
import { sourceLine } from "@/lib/requirements";
import { storeLogoUrl } from "@/lib/storeLogos";
import type { CouponPublic } from "@/lib/types";

/**
 * The phone-only spotlight at the top of the feed: one deal, picked in
 * page.tsx as the steepest discount the current list can back. Desktop keeps
 * its plain grid, so the card hides itself at md+ — and the grid's copy of
 * the same coupon hides below md instead (hideOnMobileIds), so the deal is
 * never shown twice in one viewport.
 */
export default function SpotlightDeal({
  coupon,
  store,
  position,
}: {
  coupon: CouponPublic;
  store?: DealCardStore;
  /** Position of the deal in the whole filtered list, for impressions. */
  position: number;
}) {
  const logo = storeLogoUrl(store);
  const source = sourceLine(coupon);
  const discount = formatDiscount(coupon, store?.currency ?? "INR");
  // "Deal" alone says nothing in 3xl type; a code is the actionable thing to
  // show when the offer carries one, and otherwise the title carries it.
  const figure = discount !== "Deal" ? discount : coupon.code;

  return (
    <article className="mb-3 rounded-2xl border border-accent-soft/40 bg-gradient-to-br from-accent-faint to-paper-raised p-5 shadow-sm md:hidden">
      <CardImpressions
        couponId={coupon.id}
        merchantId={coupon.store_id}
        pageType="deals"
        position={position}
      />
      <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent">
        <Flame aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
        Best deal today
      </p>

      <div className="flex items-center gap-2 text-sm font-medium text-ink">
        {logo ? (
          <Image
            src={logo}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 rounded-full border border-ledger-line bg-paper object-contain"
          />
        ) : (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ledger-line bg-paper font-mono text-[10px] text-ink">
            {storeInitials(store?.name)}
          </span>
        )}
        <span className="truncate">{store?.name ?? "Deal"}</span>
      </div>

      <h2 className="mt-3 line-clamp-2 font-sans text-base font-medium leading-snug text-ink">
        <Link href={`/coupons/${coupon.slug}`} className="hover:text-accent">
          {coupon.title}
        </Link>
      </h2>

      {figure ? (
        <p className="savings-figure mt-3 text-3xl font-extrabold text-ink">{figure}</p>
      ) : null}

      {source?.checkedDate ? (
        <p className="mt-2 text-xs text-ink-soft">Checked {source.checkedDate}</p>
      ) : null}

      <Link
        href={api.goUrl(coupon.id, "spotlight")}
        rel="sponsored nofollow noopener"
        className="btn btn-cta mt-4 w-full"
      >
        Get Deal
      </Link>
    </article>
  );
}
