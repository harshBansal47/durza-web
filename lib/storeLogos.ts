/**
 * Store identity: self-hosted icons and an accent colour for store pages.
 *
 * Curated icons under /public/stores are served from Durza. For new stores,
 * use Google's favicon cache with the store's website URL so the frontend does
 * not need a per-brand code change. Stores without a website keep their
 * monogram (storeInitials in lib/catalog).
 *
 * STORE_ACCENTS was sampled from each store's own icon (its most frequent
 * sufficiently saturated colour). It is used for decorative tints only —
 * never for text, status colours, or anything a reader must be able to read.
 */

export const LOCAL_STORE_LOGOS: Record<string, string> = {
  ajio: "/stores/ajio.png",
  "amazon-in": "/stores/amazon-in.png",
  bigbasket: "/stores/bigbasket.png",
  croma: "/stores/croma.png",
  firstcry: "/stores/firstcry.png",
  flipkart: "/stores/flipkart.png",
  ixigo: "/stores/ixigo.png",
  lenskart: "/stores/lenskart.png",
  makemytrip: "/stores/makemytrip.png",
  meesho: "/stores/meesho.png",
  myntra: "/stores/myntra.png",
  nykaa: "/stores/nykaa.png",
  "reliance-digital": "/stores/reliance-digital.png",
  swiggy: "/stores/swiggy.png",
  zomato: "/stores/zomato.png",
};

export const STORE_ACCENTS: Record<string, string> = {
  ajio: "#2e4153",
  "amazon-in": "#d9b475",
  bigbasket: "#a5cd38",
  croma: "#45a8a2",
  firstcry: "#d754aa",
  flipkart: "#fee70c",
  ixigo: "#ec5b24",
  lenskart: "#000042",
  makemytrip: "#e01e26",
  meesho: "#580a46",
  myntra: "#f41bb3",
  nykaa: "#ff98c9",
  "reliance-digital": "#db2728",
  swiggy: "#ff5200",
  zomato: "#cc202e",
};

const WEBSITE_HOST_PREFIXES = ["www", "store", "shop", "m", "mobile"];

function faviconDomain(hostname: string): string {
  const labels = hostname.toLowerCase().split(".");
  while (labels.length > 2 && WEBSITE_HOST_PREFIXES.includes(labels[0])) labels.shift();
  return labels.join(".");
}

/**
 * Prefer the backend logo, then a curated local asset, then the website's
 * cached favicon. Null means no usable website URL is available; use initials.
 */
export function storeLogoUrl(
  store: {
    slug?: string | null;
    logo_url?: string | null;
    website_url?: string | null;
  } | null | undefined,
): string | null {
  if (!store) return null;
  if (store.logo_url) return store.logo_url;
  if (store.slug && LOCAL_STORE_LOGOS[store.slug]) return LOCAL_STORE_LOGOS[store.slug];
  if (store.website_url) {
    try {
      const website = new URL(store.website_url);
      if (website.protocol !== "https:" && website.protocol !== "http:") return null;
      const favicon = new URL("https://www.google.com/s2/favicons");
      favicon.searchParams.set("domain", faviconDomain(website.hostname));
      favicon.searchParams.set("sz", "128");
      return favicon.toString();
    } catch {
      return null;
    }
  }
  return null;
}

/** Decorative accent for a store page, or null for stores with no icon. */
export function storeAccent(slug?: string | null): string | null {
  if (!slug) return null;
  return STORE_ACCENTS[slug] ?? null;
}
