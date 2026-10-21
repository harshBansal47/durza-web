/**
 * The site's absolute origin. Everything that produces a URL a crawler, an
 * inbox or a social card will follow derives from this, so when it is wrong,
 * canonicals, sitemaps and OG tags are all wrong together.
 *
 * In production it is mandatory: a build that falls back to localhost would
 * ship broken canonicals to Google. That's a build failure, not a warning.
 * Locally we still allow the localhost default so `next dev` needs no setup.
 */
export const SITE_URL: string = (() => {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url) return url.replace(/\/+$/, "");
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is required for production builds — set it to the public https:// origin (no trailing slash needed).",
    );
  }
  return "http://localhost:3000";
})();

/**
 * The site-wide title and description. The homepage uses them verbatim; every
 * other page's title runs through the layout's "%s — Durza" template, so both
 * sites import these rather than keeping two copies that can drift.
 */
export const BRAND_NAME = "Durza";
export const BRAND_SHORT_NAME = "Durza";
export const BRAND_TITLE_SUFFIX = "Durza Coupons";

export const SITE_TITLE = "Durza Coupons – Coupons, Promo Codes & Best Online Deals in India";
export const SITE_DESCRIPTION =
  "Discover online deals, coupon codes, shopping offers and product comparisons on Durza. Find useful ways to save before you buy.";
