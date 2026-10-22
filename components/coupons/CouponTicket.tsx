import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink, Tag } from "lucide-react";
import { api } from "@/lib/api";
import { storeInitials } from "@/lib/catalog";
import { daysUntil, formatDate, formatDiscount } from "@/lib/format";
import { requirementLabels, sourceLine } from "@/lib/requirements";
import { storeLogoUrl } from "@/lib/storeLogos";
import { maskCode } from "@/lib/codes";
import { successRateLabel, totalReports } from "@/lib/format";
import type { ImpressionPageType } from "@/lib/analytics";
import type { CouponPublic } from "@/lib/types";
import { CardImpressions } from "@/components/CardImpressions";
import { CardSaveButton } from "@/components/CardSaveButton";
import CodeRevealButton from "@/components/CodeRevealButton";

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
        className={`ticket deal-ticket flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl border bg-paper-raised shadow-[var(--shadow-hairline)] transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[var(--shadow-raised)] ${
          expired ? "border-ledger-line opacity-70" : "border-ledger-line"
        }`}
      >
        {/* Logo tile (top-left) and save (top-right) */}
        <div className="flex items-start justify-between gap-3 px-4 pt-4">
          <Link
            href={store ? `/stores/${store.slug}` : href}
            className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
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
            <Link href={href} className="after:absolute after:inset-0 hover:text-accent">
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
                  className="font-medium text-inkblue underline-offset-2 hover:underline"
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

        {/* Perforation between the information area and the action area. */}
        <div className="mt-auto px-4 pt-4">
          <div aria-hidden="true" className="border-t border-dashed border-ledger-line" />
        </div>

        {/* Action area */}
        <div className="px-4 pb-4 pt-3">
          {coupon.code ? (
            <div className="flex flex-col gap-2">
              <code className="break-anywhere rounded-lg border border-dashed border-ink/30 bg-paper px-3 py-2 font-mono text-sm font-medium text-ink">
                {maskCode(coupon.code) ?? coupon.code}
              </code>
              <CodeRevealButton
                code={coupon.code}
                url={api.goUrl(coupon.id, "coupon-page")}
                label="Reveal code"
                showCode={false}
                className="w-full justify-center"
              />
            </div>
          ) : (
            <p className="text-sm text-ink-soft">
              {requirement ?? "The offer applies at checkout"}
            </p>
          )}

          {extra.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer list-none text-xs font-medium text-inkblue underline-offset-2 hover:underline">
                +{extra.length} more {extra.length === 1 ? "code" : "codes"}
              </summary>
              <ul className="mt-2 divide-y divide-ledger-line border-t border-ledger-line">
                {extra.map((other) => (
                  <li key={other.id}>
                    <Link
                      href={`/coupons/${other.slug}`}
                      className="flex min-h-11 items-center justify-between gap-3 py-2 transition-colors hover:text-accent"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm text-ink">
                        {other.title}
                      </span>
                      <span className="shrink-0 rounded-md border border-dashed border-ledger-line bg-paper-alt px-2 py-0.5 font-mono text-xs text-ink-soft">
                        {maskCode(other.code) ?? "No code"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </article>
    </div>
  );
}
