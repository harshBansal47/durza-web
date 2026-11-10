import { parseHttpUrl } from "./url";

export interface CouponDealDetails {
  title: string | null;
  category: string | null;
  badge: string | null;
  discount: string | null;
  dealPrice: string | null;
  originalPrice: string | null;
  savings: string | null;
  rating: string | null;
  reviewCount: string | null;
  checkedDate: string | null;
  imageUrl: string | null;
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function getCouponDealDetails(
  restrictions: Record<string, unknown> | null,
): CouponDealDetails | null {
  if (!restrictions) return null;

  const image = parseHttpUrl(text(restrictions.image_url));
  const ratingText = text(restrictions.rating);
  const ratingValue = ratingText ? Number(ratingText) : Number.NaN;
  const rating =
    Number.isFinite(ratingValue) && ratingValue >= 0 && ratingValue <= 5
      ? ratingValue.toFixed(1)
      : null;
  const rawReviewCount = text(restrictions.reviews_count);
  const reviewCount =
    rawReviewCount && /^\d[\d,]*$/.test(rawReviewCount) &&
    Number.isSafeInteger(Number(rawReviewCount.replaceAll(",", ""))) &&
    Number(rawReviewCount.replaceAll(",", "")) > 0
      ? Number(rawReviewCount.replaceAll(",", "")).toLocaleString("en-IN")
      : null;

  const details: CouponDealDetails = {
    title: text(restrictions.product_title) ?? text(restrictions.title),
    category: text(restrictions.category),
    badge: text(restrictions.badge_tag),
    discount: text(restrictions.discount_tag),
    dealPrice: text(restrictions.deal_price),
    originalPrice: text(restrictions.original_mrp),
    savings: text(restrictions.savings),
    rating,
    reviewCount,
    checkedDate: text(restrictions.checked_date) ?? text(restrictions.checked_on),
    imageUrl: image?.protocol === "https:" ? image.toString() : null,
  };

  return Object.values(details).some(Boolean) ? details : null;
}
