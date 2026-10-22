import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink, Tag } from "lucide-react";
import { storeInitials } from "@/lib/catalog";
import { daysUntil, formatDate, formatDiscount, successRateLabel, totalReports } from "@/lib/format";
import { requirementLabels, sourceLine } from "@/lib/requirements";
import { storeLogoUrl } from "@/lib/storeLogos";
import { maskCode } from "@/lib/codes";
import type { ImpressionPageType } from "@/lib/analytics";
import type { CouponPublic } from "@/lib/types";
import { CardImpressions } from "@/components/CardImpressions";
import { CardSaveButton } from "@/components/CardSaveButton";
import TicketCodeAction from "@/components/coupons/TicketCodeAction";
import CouponTicketExtras from "@/components/coupons/CouponTicketExtras";

export interface CouponTicketStore {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
  currency?: string | null;
}

interface CouponTicketProps {
  coupon: CouponPublic;
  store?: CouponTicketStore;
  /** Same store, same offer type — collapsed behind a "+N more codes" expander. */
  extra?: CouponPublic[];
  position?: number;
  pageType?: ImpressionPageType;
  className?: string;
}

/** Height of the action area, so the side notches land on the perforation. */
const ACTION_HEIGHT = 124;

/**
 * A coupon rendered as a ticket: notched sides, a dashed perforation between
 * the information area and the action area, and the discount as the anchor.
 *
 * Everything printed here is backed by the API response. There is no urgency
 * theatre and no invented claim: the check date is the date the source was
 * read, the expiry chip only appears when the store states one, and the
 * success rate only appears when shoppers have actually voted.
 */
export default function CouponTicket({
  coupon,
  store,
  extra = [],
  position = 1,
  pageType = "coupon_card",
  className = "",
}: CouponTicketProps) {
  const logo = storeLogoUrl(store ?? null);
  const source = sourceLine(coupon);
  const reports = totalReports(coupon);
  const rate = successRateLabel(coupon);
  const daysLeft = daysUntil(coupon.expires_at);
  const expired = daysLeft !== null && daysLeft < 0;
  const requirement = requirementLabels(coupon)[0] ?? (coupon.code ? null : "No code needed");
  const href = `/coupons/${coupon.slug}`;

  return (
    <div className={`ticket-wrap h-full ${className}`}>
      <CardImpressions
        couponId={coupon.id}
        merchantId={coupon.store_id}
        pageType={pageType}
        position={position}
      />
      <article
        className="ticket deal-ticket flex h-full min-h-[380px] flex-col overflow-hidden rounded-xl border border-ledger-line bg-paper-raised shadow-[var(--shadow-hairline)] transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[var(--shadow-raised)]"
        // The mask that cuts the notches is positioned from the top of the
        // card; the perforation sits at a fixed distance from the bottom, so
        // the notches are pinned to the same line.
        style={{ "--notch-y": `calc(100% - ${ACTION_HEIGHT}px)` } as React.CSSProperties}
      >
        {/* Logo tile (top-left) and save (top-right) */}
        <div className="flex items-start justify-between gap-3 px-4 pt-4">
          <Link
            href={store ? `/stores/${store.slug}` : href}
            className="relative z-10 flex min-w-0 items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            {logo ? (
              <Image
                src={logo}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-lg border border-ledger-line bg-white object-contain"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ledger-line bg-paper font-mono text-xs font-medium text-ink-soft"
              >
                {storeInitials(store?.name ?? coupon.title)}
              </span>
            )}
            <span className="max-w-[16ch] truncate">{store?.name ?? "Offer"}</span>
          </Link>
          <CardSaveButton couponId={coupon.id} />
        </div>

        {/* Discount is the anchor; the title is the second thing read. */}
        <div className="px-4 pt-3">
          <p className="savings-figure text-3xl font-extrabold text-accent">
            {formatDiscount(coupon, store?.currency ?? "INR")}
          </p>
          <h3 className="mt-2 line-clamp-2 min-h-[2.6rem] font-sans text-[15px] font-medium leading-snug text-ink">
            <Link href={href} className="text-ink after:absolute after:inset-0 hover:text-accent">
              {coupon.title}
            </Link>
          </h3>
        </div>

        {/* One metadata row: source, check date, expiry, requirement. */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 pt-3 text-[11px] text-ink-soft">
          {source?.checkedDate && (
            <span className="inline-flex items-center gap-1">
              <ExternalLink aria-hidden="true" className="h-3 w-3" strokeWidth={2} />
              <span className="font-mono">Checked {source.checkedDate}</span>
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="relative z-10 inline-flex min-h-6 items-center px-1 font-medium text-durza-deep underline-offset-2 hover:underline"
                >
                  source
                </a>
              )}
            </span>
          )}
          {coupon.expires_at && (
            <span className="inline-flex items-center gap-1 rounded-full bg-paper-alt px-2 py-0.5 font-medium">
              <CalendarDays aria-hidden="true" className="h-3 w-3" strokeWidth={2} />
              {expired ? "Expired" : "Expires"} {formatDate(coupon.expires_at)}
            </span>
          )}
          {requirement && (
            <span className="inline-flex items-center gap-1">
              <Tag aria-hidden="true" className="h-3 w-3" strokeWidth={2} />
              {requirement}
            </span>
          )}
        </div>

        {/* Success rate only when shoppers have actually voted. */}
        <div className="px-4 pt-3">
          {rate !== null && reports > 0 ? (
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-24 overflow-hidden rounded-full bg-paper-alt"
                role="img"
                aria-label={`${rate} of ${reports} shoppers said it worked`}
              >
                <span
                  className="block h-full rounded-full bg-verified"
                  style={{ width: `${Math.round((coupon.success_rate ?? 0) * 100)}%` }}
                />
              </span>
              <span className="font-mono text-[11px] text-ink-soft">
                {rate} worked · {reports} reports
              </span>
            </div>
          ) : (
            <p className="text-[11px] text-ink-soft">Be the first to report</p>
          )}
        </div>

        {/* Extra codes from the same store and offer type. */}
        {extra.length > 0 && (
          <div className="relative z-10 px-4 pt-3">
            <CouponTicketExtras extra={extra} id={`ticket-extras-${coupon.id}`} />
          </div>
        )}

        {/* Perforation between the information area and the action area. */}
        <div className="mt-auto h-px w-full border-t border-dashed border-ledger-line" />

        {/* Action area */}
        <div
          className="relative z-10 flex shrink-0 flex-col justify-center gap-2 px-4 pb-4 pt-3"
          style={{ height: ACTION_HEIGHT }}
        >
          {coupon.code ? (
            <>
              <code className="break-anywhere rounded-lg border border-dashed border-ink/30 bg-paper px-3 py-2 font-mono text-sm font-medium text-ink">
                {maskCode(coupon.code) ?? coupon.code}
              </code>
              <TicketCodeAction
                coupon={coupon}
                storeName={store?.name ?? ""}
                src="coupon-card"
              />
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-ink-soft">
                {requirement ?? "The offer applies at checkout"}
              </p>
              <Link
                href={href}
                className="btn btn-primary w-full justify-center"
              >
                Get deal
              </Link>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
