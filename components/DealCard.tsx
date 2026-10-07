import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  formatDate,
  formatDiscount,
  formatMoney,
  formatRelativeTime,
  successRateLabel,
  totalReports,
} from "@/lib/format";
import type { CouponPublic, Store } from "@/lib/types";
import { CardImpressions } from "./CardImpressions";
import { CardSaveButton } from "./CardSaveButton";

export default function DealCard({
  coupon,
  store,
  position,
  price,
}: {
  coupon: CouponPublic;
  store?: Store;
  position: number;
  price?: { current: number; original: number | null; currency: string };
}) {
  const rate = successRateLabel(coupon);
  const reports = totalReports(coupon);

  return (
    <div className="ticket-wrap h-full">
      <CardImpressions
        couponId={coupon.id}
        merchantId={coupon.store_id}
        pageType="deals"
        position={position}
      />
      <article className="ticket deal-ticket flex h-full flex-col overflow-hidden rounded-[20px] border border-dashed border-ledger-line bg-warm-paper">
        <div className="flex items-center justify-between gap-3 border-b border-dashed border-ledger-line px-4 py-4">
          <Link
            href={store ? `/stores/${store.slug}` : `/coupons/${coupon.slug}`}
            className="flex min-w-0 items-center gap-2 text-sm font-semibold text-ink hover:underline"
          >
            {store?.logo_url ? (
              <Image
                src={store.logo_url}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-full border border-ledger-line bg-paper object-contain"
              />
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ledger-line bg-paper font-mono text-xs text-ink">
                {(store?.name ?? "D").charAt(0).toUpperCase()}
              </span>
            )}
            <span className="truncate">{store?.name ?? "Deal"}</span>
          </Link>
          <CardSaveButton couponId={coupon.id} />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-2 min-h-[3rem] font-serif text-lg font-bold leading-snug text-ink">
              <Link href={`/coupons/${coupon.slug}`} className="hover:underline">
                {coupon.title}
              </Link>
            </h2>
            <span className="shrink-0 rounded-sm bg-vermilion px-2 py-1 font-mono text-xs font-bold text-white">
              {formatDiscount(coupon, store?.currency ?? "USD")}
            </span>
          </div>

          {price && (
            <p className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-xl font-bold text-ink">
                {formatMoney(price.current, price.currency)}
              </span>
              {price.original != null && price.original > price.current && (
                <span className="font-mono text-sm text-ink-soft line-through">
                  {formatMoney(price.original, price.currency)}
                </span>
              )}
            </p>
          )}

          <div className="flex min-h-7 flex-wrap items-center gap-2" role="group" aria-label="Deal verification">
            {coupon.last_verified_at && (
              <span className="stamp text-ink-soft">
                Checked {formatRelativeTime(coupon.last_verified_at)}
              </span>
            )}
            {rate && reports > 0 && (
              <span
                className="stamp text-verified"
                title={`Worked for ${coupon.success_count} of ${reports} people who tried it`}
              >
                {rate} Success
              </span>
            )}
          </div>

          {coupon.expires_at && (
            <p className="text-xs text-ink-soft">
              Expires {formatDate(coupon.expires_at)}
            </p>
          )}

          <div className="mt-auto pt-1">
            <Link
              href={api.goUrl(coupon.id, "deals")}
              className="btn btn-cta w-full"
            >
              Get Deal
            </Link>
            <p className="mt-2 text-center text-[11px] leading-snug text-ink-soft">
              {store?.commission_disclosure || "We may earn a commission if you shop through this link."}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
