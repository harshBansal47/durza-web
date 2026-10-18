import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { storeInitials } from "@/lib/catalog";
import {
  formatDate,
  formatDiscount,
  formatMoney,
  successRateLabel,
  totalReports,
} from "@/lib/format";
import { sourceLine } from "@/lib/requirements";
import { storeLogoUrl } from "@/lib/storeLogos";
import type { CouponPublic, Store } from "@/lib/types";
import { CardImpressions } from "./CardImpressions";
import { CardSaveButton } from "./CardSaveButton";

/**
 * The store fields a deal card renders. A full `Store` is assignable; the
 * slim shape exists so client components (the "load more" pager) can pass
 * stores without shipping every column.
 */
export type DealCardStore = Pick<Store, "id" | "name" | "slug" | "logo_url" | "currency">;

export default function DealCard({
  coupon,
  store,
  position,
  price,
}: {
  coupon: CouponPublic;
  store?: DealCardStore;
  position: number;
  price?: { current: number; original: number | null; currency: string };
}) {
  const rate = successRateLabel(coupon);
  const reports = totalReports(coupon);
  const source = sourceLine(coupon);
  const logo = storeLogoUrl(store);

  return (
    <div className="ticket-wrap h-full">
      <CardImpressions
        couponId={coupon.id}
        merchantId={coupon.store_id}
        pageType="deals"
        position={position}
      />
      <article className="ticket deal-ticket flex h-full flex-col overflow-hidden rounded-xl border border-ledger-line bg-paper-raised md:rounded-[20px]">
        <div className="flex items-center justify-between gap-3 border-b border-ledger-line px-4 py-4">
          <Link
            href={store ? `/stores/${store.slug}` : `/coupons/${coupon.slug}`}
            className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink hover:text-accent"
          >
            {logo ? (
              <Image
                src={logo}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-full border border-ledger-line bg-paper object-contain"
              />
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ledger-line bg-paper font-mono text-xs text-ink">
                {storeInitials(store?.name)}
              </span>
            )}
            <span className="truncate">{store?.name ?? "Deal"}</span>
          </Link>
          <CardSaveButton couponId={coupon.id} />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-2 min-h-[3rem] font-sans text-lg font-medium leading-snug text-ink">
              <Link href={`/coupons/${coupon.slug}`} className="hover:text-accent">
                {coupon.title}
              </Link>
            </h2>
            <span className="shrink-0 rounded-full bg-accent-faint px-2.5 py-1 font-mono text-xs font-medium text-accent">
              {formatDiscount(coupon, store?.currency ?? "INR")}
            </span>
          </div>

          {price && (
            <p className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-xl font-medium text-ink">
                {formatMoney(price.current, price.currency)}
              </span>
              {price.original != null && price.original > price.current && (
                <span className="font-mono text-sm text-ink-soft line-through">
                  {formatMoney(price.original, price.currency)}
                </span>
              )}
            </p>
          )}

          <div className="flex min-h-7 flex-wrap items-center gap-2" role="group" aria-label="Deal status">
            {source?.checkedDate && (
              <span className="stamp text-ink-soft" title={source.url ? `${source.text} — ${source.url}` : source.text}>
                Checked {source.checkedDate}
              </span>
            )}
            {rate && reports > 0 && (
              <span
                className="stamp text-verified"
                title={`Worked for ${coupon.success_count} of ${reports} people who tried it`}
              >
                {rate} worked
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
              rel="sponsored nofollow noopener"
              className="btn btn-cta w-full"
            >
              Get Deal
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
