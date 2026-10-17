import type { ImpressionPageType } from "@/lib/analytics";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { storeInitials } from "@/lib/catalog";
import { storeLogoUrl } from "@/lib/storeLogos";
import { daysUntil, expiryLabel, formatDiscount, formatMoney, successRateLabel, totalReports } from "@/lib/format";
import { maskCode } from "@/lib/codes";
import { cardRequirementLine, sourceLine } from "@/lib/requirements";
import type { CouponPublic } from "@/lib/types";
import { CardSaveButton } from "./CardSaveButton";
import { CardImpressions } from "./CardImpressions";

export type CouponCardVariant = "coupon" | "price-drop" | "free-shipping" | "expiring-soon" | "featured";

export interface CouponCardStore {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
  currency?: string | null;
}

interface CouponCardProps {
  coupon: CouponPublic;
  store?: CouponCardStore;
  variant?: CouponCardVariant;
  price?: { previous: number; current: number; productName?: string; productSlug?: string; currency?: string };
  minOrderValue?: number;
  regions?: string[];
  badge?: string;
  ctaHref?: string;
  ctaLabel?: string;
  hideExpiry?: boolean;
  className?: string;
  /** 1-based position in its list (the backend rejects 0). */
  position?: number;
  /** Where this card is shown; only values the analytics backend accepts. */
  pageType?: ImpressionPageType;
  footnote?: { label: string; href: string };
}

function initials(name: string) {
  return storeInitials(name);
}

function StoreLine({ store }: { store: CouponCardStore }) {
  const logo = storeLogoUrl(store);
  return (
    <Link
      href={`/stores/${store.slug}`}
      className="relative z-10 flex min-w-0 items-center gap-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
    >
      {logo ? (
        <Image src={logo} alt="" width={22} height={22} className="h-[22px] w-[22px] rounded-full border border-ledger-line bg-white object-contain" />
      ) : (
        <span aria-hidden="true" className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-ledger-line bg-paper font-mono text-[9px] font-medium text-ink-soft">
          {initials(store.name)}
        </span>
      )}
      <span className="max-w-[18ch] truncate">{store.name}</span>
    </Link>
  );
}

/**
 * Hierarchy: DISCOUNT → store → title → code → trust signals → CTA.
 * Status is only rendered when real data backs it.
 */
export function CouponCard({
  coupon,
  store,
  variant = "coupon",
  price,
  minOrderValue,
  regions,
  badge,
  ctaHref,
  ctaLabel,
  hideExpiry = false,
  className = "",
  position = 1,
  pageType = "coupon_card",
  footnote,
}: CouponCardProps) {
  const currency = store?.currency ?? price?.currency ?? "INR";
  const daysLeft = daysUntil(coupon.expires_at);
  const expiringSoon = daysLeft !== null && daysLeft >= 0 && daysLeft <= 7;
  const expired = daysLeft !== null && daysLeft < 0;
  const resolved: CouponCardVariant = expired ? "expiring-soon" : expiringSoon ? "expiring-soon" : variant;

  const href = ctaHref ?? `/coupons/${coupon.slug}`;
  const rate = successRateLabel(coupon);
  const reports = totalReports(coupon);
  const trusted = rate !== null && reports >= 2;
  const featured = resolved === "featured";
  const source = sourceLine(coupon);
  const requirement = cardRequirementLine(coupon);

  return (
    <div className={`ticket-wrap h-full ${expired ? "opacity-70" : ""} ${className}`}>
      <CardImpressions couponId={coupon.id} merchantId={coupon.store_id} pageType={pageType} position={position} />
      <article
        className={`ticket flex h-full flex-col overflow-hidden rounded-[20px] border bg-paper-raised ${
          resolved === "expiring-soon" && !expired ? "border-rust/40" : "border-ledger-line"
        } ${featured ? "ring-1 ring-accent-soft" : ""}`}
      >
        {/* Discount is the visual hero */}
        <div className="flex items-start justify-between gap-3 px-4 pt-4">
          <div className="min-w-0">
            <p className={`savings-figure ${featured ? "text-[2rem]" : "text-[1.7rem]"}`}>
              {resolved === "price-drop" ? (
                "Price ↓"
              ) : resolved === "free-shipping" ? (
                "Free ship"
              ) : featured ? (
                <span className="marker">{formatDiscount(coupon, currency)}</span>
              ) : (
                formatDiscount(coupon, currency)
              )}
            </p>
            <div className="mt-1.5">
              {store ? <StoreLine store={store} /> : null}
            </div>
          </div>
          <CardSaveButton couponId={coupon.id} />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4 pt-3">
          <div className="min-w-0">
            <h3 className="font-sans text-[17px] font-medium leading-snug text-ink">
              <Link href={href} className="after:absolute after:inset-0 hover:text-accent">
                {coupon.title}
              </Link>
            </h3>
            {coupon.description && <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{coupon.description}</p>}
          </div>

          {/* Trust signals: only what the data supports */}
          <div className="flex flex-wrap items-center gap-1.5" aria-label="Deal status">
            {badge && (
              <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-white">
                {badge}
              </span>
            )}
            {trusted && !expired && (
              <span className="stamp text-verified" title={`Worked for ${coupon.success_count} of ${reports} people who tried it`}>
                <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2} />
                {rate} · {reports} reports
              </span>
            )}
            {expired && <span className="stamp text-ink-soft">Expired</span>}
            {/* Source provenance, not a shopper vote: when the store's page was
                last read. Expiry urgency already has its own single label at the
                bottom of the card. */}
            {!expired && source?.checkedDate && (
              <span
                className="font-mono text-[11px] text-ink-soft"
                title={source.url ? `${source.text} — ${source.url}` : source.text}
              >
                Checked {source.checkedDate}
              </span>
            )}
          </div>

          {resolved === "price-drop" && price && (
            <div className="rounded-xl border border-rust/20 bg-rust-soft p-3">
              {price.productName && <p className="text-sm font-medium text-ink">{price.productName}</p>}
              <p className="mt-1 flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-sm text-ink-soft line-through">{formatMoney(price.previous, currency)}</span>
                <span className="font-mono text-lg font-medium text-rust">{formatMoney(price.current, currency)}</span>
                {price.previous > 0 && (
                  <span className="rounded-full bg-rust px-2 py-0.5 font-mono text-xs font-medium text-white">
                    −{Math.round(((price.previous - price.current) / price.previous) * 100)}%
                  </span>
                )}
              </p>
            </div>
          )}

          {resolved === "free-shipping" && (
            <div className="rounded-xl border border-accent/20 bg-accent-faint p-3 text-sm text-ink-soft">
              <p className="font-medium text-accent">
                {minOrderValue ? `Free shipping over ${formatMoney(minOrderValue, currency)}` : "Free shipping"}
              </p>
              {regions && regions.length > 0 && <p className="mt-0.5">{regions.join(" · ")}</p>}
            </div>
          )}

          {resolved !== "price-drop" && resolved !== "free-shipping" && (
            <p className="text-sm text-ink-soft">
              {coupon.code ? (
                <>
                  Code{" "}
                  <code className="break-anywhere rounded-lg border border-dashed border-ink/30 bg-paper px-2 py-0.5 font-mono text-sm font-medium text-ink">
                    {maskCode(coupon.code) ?? coupon.code}
                  </code>{" "}
                  — tap &ldquo;Get code&rdquo; to reveal it
                </>
              ) : requirement ? (
                requirement
              ) : (
                "No code needed — the offer applies at checkout"
              )}
            </p>
          )}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 text-xs text-ink-soft">
            <div>
              {!hideExpiry && expiryLabel(coupon.expires_at) && (
                <span className={expiringSoon ? "font-medium text-rust" : undefined}>
                  {expiryLabel(coupon.expires_at)}
                </span>
              )}
            </div>
            {footnote && (
              <Link href={footnote.href} className="relative z-10 text-xs font-medium text-accent underline-offset-2 hover:underline">
                {footnote.label}
              </Link>
            )}
          </div>

          <Link
            href={href}
            aria-disabled={expired}
            className={`btn relative z-10 justify-center ${expired ? "pointer-events-none border border-ledger-line bg-transparent text-ink-soft" : "btn-cta"}`}
          >
            {ctaLabel ?? (expired ? "No longer valid" : coupon.code ? "Get code" : "Get deal")}
          </Link>
        </div>
      </article>
    </div>
  );
}

const DEFAULT_GRID = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

export function CouponCardGrid({
  coupons,
  stores = [],
  variant = "coupon",
  className = DEFAULT_GRID,
  price,
  pageType = "coupon_card",
  ...cardProps
}: {
  coupons: CouponPublic[];
  stores?: CouponCardStore[];
  variant?: CouponCardVariant;
  className?: string;
  price?: CouponCardProps["price"];
  pageType?: ImpressionPageType;
} & Omit<CouponCardProps, "coupon" | "store" | "variant" | "price" | "position" | "pageType">) {
  const storeById = new Map(stores.map((s) => [s.id, s]));
  if (coupons.length === 0) return null;
  return (
    <div className={`grid gap-4 ${className}`}>
      {coupons.map((coupon, i) => (
        <CouponCard
          key={coupon.id}
          coupon={coupon}
          store={storeById.get(coupon.store_id)}
          variant={variant}
          price={price}
          position={i + 1}
          pageType={pageType}
          {...cardProps}
        />
      ))}
    </div>
  );
}

export default CouponCard;
