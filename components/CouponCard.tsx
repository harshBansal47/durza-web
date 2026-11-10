import type { ImpressionPageType } from "@/lib/analytics";
import Image from "next/image";
import Link from "next/link";
import { storeInitials } from "@/lib/catalog";
import { storeLogoUrl } from "@/lib/storeLogos";
import {
  daysUntil,
  expiryLabel,
  formatDiscountHeading,
  formatMoney,
  successRateLabel,
  totalReports,
} from "@/lib/format";
import { maskCode } from "@/lib/codes";
import { cardRequirementLine, sourceLine } from "@/lib/requirements";
import type { CouponPublic } from "@/lib/types";
import { CardSaveButton } from "./CardSaveButton";
import { CardImpressions } from "./CardImpressions";
import { expiryTone } from "@/lib/persuasion";

export type CouponCardVariant = "coupon" | "price-drop" | "free-shipping" | "expiring-soon" | "featured";

export interface CouponCardStore {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
  website_url?: string | null;
  currency?: string | null;
}

interface CouponCardProps {
  coupon: CouponPublic;
  store?: CouponCardStore;
  variant?: CouponCardVariant;
  layout?: "grid" | "store";
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
      className="relative z-10 flex min-w-0 items-center gap-2 text-xs font-medium text-ink-soft transition-colors hover:text-ink"
    >
      {logo ? (
        <Image src={logo} alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-lg border border-ledger-line bg-white object-contain" />
      ) : (
        <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ledger-line bg-paper font-mono text-xs font-medium text-ink-soft">
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
  layout = "grid",
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
  const featured = resolved === "featured";
  const storeLayout = layout === "store";
  const source = sourceLine(coupon);
  const requirement = cardRequirementLine(coupon);
  const productImage = typeof (coupon.restrictions as any)?.image_url === "string" ? (coupon.restrictions as any).image_url : null;
  const r = (coupon.restrictions as any) ?? {};
  const dealPrice = typeof r.deal_price === "string" ? r.deal_price : null;
  const originalMrp = typeof r.original_mrp === "string" ? r.original_mrp : null;
  const savings = typeof r.savings === "string" ? r.savings : null;
  const rating = typeof r.rating === "string" ? r.rating : null;
  const reviewsCount = typeof r.reviews_count === "string" ? r.reviews_count : null;
  const ctaText = typeof r.cta_text === "string" ? r.cta_text : null;
  const discountHeading =
    resolved === "price-drop"
      ? "Price ↓"
      : resolved === "free-shipping"
        ? "Free ship"
        : formatDiscountHeading(coupon, currency);

  const restrictionBadge = typeof (coupon.restrictions as any)?.badge === "string" ? (coupon.restrictions as any).badge : null;
  const inferredBadge =
    badge ??
    restrictionBadge ??
    (/prime/i.test(coupon.title) ? "Prime" :
     /credit card|emi|cashback|upi|pay/i.test(coupon.title) ? "Finance" :
     /echo|fire tv|kindle|router|mouse|earbud|speaker|tv|laptop|phone/i.test(coupon.title) ? "Electronics" :
     /chair|bed sheet|towel|cookware|cleaner|battery|cable|chopper|bulb/i.test(coupon.title) ? "Home & Kitchen" :
     /subscription|audible|unlimited|prime/i.test(coupon.title) ? "Subscription" :
     /sneaker|boot|running|loafer|sandal|formal|backpack/i.test(coupon.title) ? "Footwear & Bags" : null);

  const priceMatch = (coupon.title + " " + (coupon.description ?? "")).match(/(?:Flat\s*)?₹\s*([\d,]+)/i);
  const mrpMatch = (coupon.title + " " + (coupon.description ?? "")).match(/MRP\s*₹?\s*([\d,]+)/i);
  const extractedDealPrice = priceMatch ? priceMatch[1] : null;
  const mrpPrice = mrpMatch && mrpMatch[1] !== extractedDealPrice ? mrpMatch[1] : null;

  return (
    <div className={`ticket-wrap h-full ${storeLayout ? "sm:col-span-2" : ""} ${expired ? "opacity-70" : ""} ${className}`}>
      <CardImpressions couponId={coupon.id} merchantId={coupon.store_id} pageType={pageType} position={position} />
      <article
        className={`ticket flex h-full flex-col overflow-hidden border bg-paper-raised shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
          storeLayout ? "rounded-2xl sm:flex-row" : "rounded-xl"
        } ${
          resolved === "expiring-soon" && !expired ? "border-rust/40" : "border-ledger-line"
        } ${featured ? "ring-1 ring-accent-soft" : ""}`}
      >
        {/* Discount is the visual hero */}
        <div
          className={`flex items-start justify-between gap-3 px-4 pt-2 ${
            storeLayout
              ? "sm:w-48 sm:shrink-0 sm:flex-col sm:gap-4 sm:border-r sm:border-ledger-line sm:bg-paper-alt sm:p-4"
              : ""
          }`}
        >
          <div className="min-w-0 flex-1">
            {discountHeading && (
              <p
                className={`savings-figure ${
                  storeLayout
                    ? "line-clamp-2 text-lg sm:text-2xl"
                    : `truncate ${featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`
                } font-extrabold`}
                title={discountHeading}
              >
                {featured ? (
                  <span className="marker">{discountHeading}</span>
                ) : (
                  discountHeading
                )}
              </p>
            )}
            <div className="mt-0">
              {store ? <StoreLine store={store} /> : null}
            </div>
          </div>
          <div className={storeLayout ? "sm:self-end" : ""}>
            <CardSaveButton couponId={coupon.id} />
          </div>
        </div>

        <div
          className={`flex flex-1 flex-col gap-1.5 px-4 pb-2 pt-1.5 ${
            storeLayout ? "gap-3 pb-4 pt-3 sm:justify-center sm:px-6 sm:py-5" : ""
          }`}
        >
          {productImage && (
            <div className="mb-2 overflow-hidden rounded-lg">
              <Image src={productImage} alt={coupon.title} width={400} height={200} className="h-32 w-full object-contain bg-paper" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="line-clamp-2 min-h-[2.25rem] font-sans text-[15px] font-semibold leading-[1.125rem] text-ink" title={coupon.title}>
              <Link href={href} className="after:absolute after:inset-0 hover:text-accent">
                {coupon.title}
              </Link>
            </h3>
            {dealPrice && (
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-ink">{dealPrice}</span>
                {originalMrp && <span className="text-sm text-ink-soft line-through">{originalMrp}</span>}
                {savings && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">{savings}</span>}
              </div>
            )}
            {coupon.description && (
              <p className="mt-1 line-clamp-2 text-xs leading-4 text-ink-soft">
                {coupon.description}
              </p>
            )}
            {rating && (
              <p className="mt-1 text-xs text-ink-soft">★ {rating} {reviewsCount ? `(${reviewsCount} reviews)` : ""}</p>
            )}
          </div>

          <div className="relative z-10 flex min-h-5 flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-soft">
            {inferredBadge && (
              <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">
                {inferredBadge}
              </span>
            )}
            {!expired && reports > 0 && (
              <span
                className="font-mono text-[11px] text-ink-soft"
                aria-label={`${rate ? `${rate} worked, ` : ""}${reports} shopper ${reports === 1 ? "report" : "reports"}`}
              >
                {rate ? `${rate} worked · ` : ""}
                {reports} {reports === 1 ? "report" : "reports"}
              </span>
            )}
            {expired && <span className="stamp text-ink-soft">Expired</span>}
            {source && (source.checkedDate || source.url || source.text) && (
              <>
                {source.checkedDate ? (
                  <span
                    className={
                      storeLayout
                        ? "inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-medium text-green-800"
                        : "font-mono text-[11px] text-ink-soft"
                    }
                    title={source.text}
                  >
                    {storeLayout ? "✓ " : ""}Checked {source.checkedDate}
                  </span>
                ) : (
                  <span className="truncate">{source.text}</span>
                )}
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="shrink-0 font-mono text-[11px] font-medium text-durza-deep underline-offset-2 hover:underline"
                  >
                    View source
                  </a>
                )}
              </>
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
            <div className="@container/coupon-card-code min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-soft">
                {coupon.code ? (
                  <>
                    <span className="text-ink-soft">Code</span>
                    <code className="break-anywhere rounded-md border border-dashed border-ink/30 bg-paper px-2 py-1 font-mono text-xs font-medium text-ink">
                      {maskCode(coupon.code) ?? coupon.code}
                    </code>
                    <span className="basis-full text-[11px] text-ink-soft @min-[300px]/coupon-card-code:basis-auto">
                      Tap View code to reveal
                    </span>
                  </>
                ) : requirement ? (
                  requirement
                ) : (
                  "No code needed — the offer applies at checkout"
                )}
              </div>
            </div>
          )}

          <div className="mt-auto flex min-h-5 flex-wrap items-center justify-between gap-2 text-xs text-ink-soft">
            <div>
              {!hideExpiry && expiryLabel(coupon.expires_at) && (
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                    expiryTone(coupon.expires_at) === "warning"
                      ? "bg-rust-soft text-rust"
                      : "bg-paper-alt text-ink-soft"
                  }`}
                >
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
            className={`btn relative z-10 w-full justify-center ${expired ? "pointer-events-none border border-ledger-line bg-transparent text-ink-soft" : "btn-cta"}`}
          >
            {ctaLabel ?? ctaText ?? (expired ? "No longer valid" : coupon.code ? "View code" :
              /free trial|trial/i.test(coupon.title) ? "Start Free Trial" :
              /credit card|emi|cashback|upi|pay/i.test(coupon.title) ? "Activate Offer" :
              "Buy on Amazon")}
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
    <div className={`grid items-stretch gap-3 ${className}`}>
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
