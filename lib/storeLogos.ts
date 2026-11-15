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
  "ajio-com-ecommerce-cps-india": "/stores/ajio-com-ecommerce-cps-india.png",
  "alpino": "/stores/alpino.png",
  "amazon-in": "/stores/amazon-in.png",
  "beast-life": "/stores/beast-life.png",
  "brillare": "/stores/brillare.png",
  "bytepe": "/stores/bytepe.png",
  "dot-and-key": "/stores/dot-and-key.png",
  "firstcry": "/stores/firstcry.png",
  "gritzo": "/stores/gritzo.png",
  "havells": "/stores/havells.png",
  "healthkart": "/stores/healthkart.png",
  "hirafragrance": "/stores/hirafragrance.png",
  "hkvitals": "/stores/hkvitals.png",
  "iba-cosmetics": "/stores/iba-cosmetics.png",
  "igp": "/stores/igp.png",
  "kama-ayurveda": "/stores/kama-ayurveda.png",
  "kapiva": "/stores/kapiva.png",
  "lavie-world": "/stores/lavie-world.png",
  "levis": "/stores/levis.png",
  "milton": "/stores/milton.png",
  "moglix": "/stores/moglix.png",
  "mymuse": "/stores/mymuse.png",
  "myntra": "/stores/myntra.png",
  "neesh-perfumes": "/stores/neesh-perfumes.png",
  "nilkamalfurniture": "/stores/nilkamalfurniture.png",
  "nordpass": "/stores/nordpass.png",
  "nourish-mantra": "/stores/nourish-mantra.png",
  "reliance-digital": "/stores/reliance-digital.png",
  "sirona": "/stores/sirona.png",
  "swiggy": "/stores/swiggy.png",
  "tatacliq-com-ecommerce-cps-india": "/stores/tatacliq-com-ecommerce-cps-india.png",
  "the-bear-house": "/stores/the-bear-house.png",
  "the-man-company": "/stores/the-man-company.png",
  "the-natural-wash": "/stores/the-natural-wash.png",
  "truebasics": "/stores/truebasics.png",
  "wonderchef": "/stores/wonderchef.png",
  "zomato": "/stores/zomato.png",
};

export const STORE_ACCENTS: Record<string, string> = {
  "ajio-com-ecommerce-cps-india": "#314455",
  "alpino": "#01773d",
  "amazon-in": "#d9b475",
  "beast-life": "#000019",
  "brillare": "#373435",
  "bytepe": "#202020",
  "dot-and-key": "#5c5c5c",
  "firstcry": "#d754aa",
  "gritzo": "#272b60",
  "havells": "#ee1c25",
  "healthkart": "#00bfbf",
  "hirafragrance": "#3b6168",
  "hkvitals": "#6a6a6a",
  "iba-cosmetics": "#f20096",
  "igp": "#ff3c5d",
  "kama-ayurveda": "#ad3132",
  "kapiva": "#22815d",
  "lavie-world": "#ca348b",
  "levis": "#c41321",
  "milton": "#e31e24",
  "moglix": "#e4313b",
  "mymuse": "#ffd870",
  "myntra": "#f41bb3",
  "neesh-perfumes": "#e8c25d",
  "nilkamalfurniture": "#00afef",
  "nordpass": "#00cfb6",
  "nourish-mantra": "#000002",
  "reliance-digital": "#db2728",
  "sirona": "#e90044",
  "swiggy": "#ff5200",
  "tatacliq-com-ecommerce-cps-india": "#e1089d",
  "the-bear-house": "#ee4840",
  "the-man-company": "#000000",
  "the-natural-wash": "#121212",
  "truebasics": "#f79d4d",
  "wonderchef": "#be2c3f",
  "zomato": "#cc202e",
};

/**
 * Admitad-connected program icons fetched from the network (verified-active
 * programs only — see backend `affiliate_campaigns`). Kept separate from
 * LOCAL_STORE_LOGOS so the "all locally-mapped icons are /stores/{slug}.png"
 * contract stays true.
 */
export const ADMITAD_PROGRAM_LOGOS: Record<string, string> = {
  "palmonas": "/stores/palmonas.webp",
  "firstcry": "/stores/firstcry.jpg",
  "milton-in": "/stores/milton-in.webp",
  "adidas": "/stores/adidas.webp",
  "bewakoof": "/stores/bewakoof.webp",
  "acer": "/stores/acer.png",
  "asus": "/stores/asus.webp",
  "lenovo-india": "/stores/lenovo-india.png",
  "victorias-secret": "/stores/victorias-secret.webp",
  "salty": "/stores/salty.webp",
  "veromoda": "/stores/veromoda.webp",
  "aldo-new": "/stores/aldo-new.webp",
  "digihaat": "/stores/digihaat.webp",
  "charles-keith": "/stores/charles-keith.webp",
  "bliss-club": "/stores/bliss-club.webp",
  "bath-body-works": "/stores/bath-body-works.webp",
};

/** The admitad icon for a slug, when one exists in public/stores/. */
export function admitadLogoForSlug(slug?: string | null): string | null {
  if (!slug) return null;
  return ADMITAD_PROGRAM_LOGOS[slug] ?? null;
}

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
