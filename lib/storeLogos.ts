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
  "ajio": "public/store-logos/ajio.webp",
  "ajio-com-ecommerce-cps-india": "public/store-logos/ajio-com-ecommerce-cps-india.webp",
  "alpino": "public/store-logos/alpino.webp",
  "amazon-in": "public/store-logos/amazon-in.webp",
  "beast-life": "public/store-logos/beast-life.webp",
  "bigbasket": "public/store-logos/bigbasket.webp",
  "boldfit": "public/store-logos/boldfit.webp",
  "boult": "public/store-logos/boult.webp",
  "brillare": "public/store-logos/brillare.webp",
  "bytepe": "public/store-logos/bytepe.webp",
  "croma": "public/store-logos/croma.webp",
  "dot-and-key": "public/store-logos/dot-and-key.webp",
  "firstcry": "public/store-logos/firstcry.webp",
  "fitspire": "public/store-logos/fitspire.webp",
  "flipkart": "public/store-logos/flipkart.webp",
  "fuelone": "public/store-logos/fuelone.webp",
  "gritzo": "public/store-logos/gritzo.webp",
  "guvi": "public/store-logos/guvi.webp",
  "havells": "public/store-logos/havells.webp",
  "healthkart": "public/store-logos/healthkart.webp",
  "hirafragrance": "public/store-logos/hirafragrance.webp",
  "hkvitals": "public/store-logos/hkvitals.webp",
  "iba-cosmetics": "public/store-logos/iba-cosmetics.webp",
  "igp": "public/store-logos/igp.webp",
  "indus-valley": "public/store-logos/indus-valley.webp",
  "kama-ayurveda": "public/store-logos/kama-ayurveda.webp",
  "kapiva": "public/store-logos/kapiva.webp",
  "lavie-world": "public/store-logos/lavie-world.webp",
  "lenskart": "public/store-logos/lenskart.webp",
  "levis": "public/store-logos/levis.webp",
  "life-changing-astro": "public/store-logos/life-changing-astro.webp",
  "meesho": "public/store-logos/meesho.webp",
  "milton": "public/store-logos/milton.webp",
  "milton-in": "public/store-logos/milton-in.webp",
  "moglix": "public/store-logos/moglix.webp",
  "mymuse": "public/store-logos/mymuse.webp",
  "myntra": "public/store-logos/myntra.webp",
  "neesh-perfumes": "public/store-logos/neesh-perfumes.webp",
  "nilkamalfurniture": "public/store-logos/nilkamalfurniture.webp",
  "nordpass": "public/store-logos/nordpass.webp",
  "nourish-mantra": "public/store-logos/nourish-mantra.webp",
  "reliance-digital": "public/store-logos/reliance-digital.webp",
  "salty": "public/store-logos/salty.webp",
  "salty-co-in-ecommerce-cps-india": "public/store-logos/salty-co-in-ecommerce-cps-india.webp",
  "sirona": "public/store-logos/sirona.webp",
  "the-bear-house": "public/store-logos/the-bear-house.webp",
  "the-man-company": "public/store-logos/the-man-company.webp",
  "the-natural-wash": "public/store-logos/the-natural-wash.webp",
  "truebasics": "public/store-logos/truebasics.webp",
  "wonderchef": "public/store-logos/wonderchef.webp",
  "zoff-foods": "public/store-logos/zoff-foods.webp",
};

export const STORE_ACCENTS: Record<string, string> = {
  "ajio": "#2f4254",
  "ajio-com-ecommerce-cps-india": "#314455",
  "alpino": "#01773d",
  "amantelingerie-in-cps-india": "#ed1c24",
  "amazon-in": "#d9b475",
  "baccabucci-com-ecommerce-cps-india": "#8a6349",
  "beast-life": "#000019",
  "bigbasket": "#a6ce39",
  "blabliblulife-com-ecommerce-cps-india": "#4d65a0",
  "boggbag-com-ecommerce-cps-united-states": "#9f3244",
  "boldfit": "#5e5e2f",
  "boult": "#16151a",
  "brillare": "#373435",
  "bytepe": "#202020",
  "croma": "#45a8a2",
  "dot-and-key": "#5c5c5c",
  "firstcry": "#d754aa",
  "fitspire": "#b29b61",
  "flipkart": "#ffe70d",
  "fuelone": "#43251a",
  "gritzo": "#272b60",
  "guvi": "#01d358",
  "havells": "#ee1c25",
  "healthkart": "#00bfbf",
  "hirafragrance": "#3b6168",
  "hkvitals": "#6a6a6a",
  "iba-cosmetics": "#f20096",
  "igp": "#ff3c5d",
  "indus-valley": "#72a03b",
  "kama-ayurveda": "#ad3132",
  "kapiva": "#22815d",
  "lavie-world": "#ca348b",
  "lenskart": "#000042",
  "levis": "#c41321",
  "life-changing-astro": "#4c5d8e",
  "meesho": "#590b47",
  "milton": "#e31e24",
  "milton-in": "#000000",
  "moglix": "#e4313b",
  "muscleblaze-com-ecommerce-cps-india": "#976c4d",
  "mymuse": "#ffd870",
  "myntra": "#f41bb3",
  "neesh-perfumes": "#e8c25d",
  "nilkamalfurniture": "#00afef",
  "nordpass": "#00cfb6",
  "nourish-mantra": "#000002",
  "nuawoman-com-ecommerce-cps-india": "#c88561",
  "pepperfry-com-ecommerce-cps-india": "#df5c0d",
  "perforacare-com-ecommerce-cps-india": "#dcb34f",
  "purevpn-com-utility-cpa-worldwide": "#251d4e",
  "reliance-digital": "#db2728",
  "rforrabbit-com-ecommerce-cps-india": "#5b402c",
  "salty": "#d1c2f0",
  "salty-co-in-ecommerce-cps-india": "#d1c2f0",
  "sanskrutihomes-in-ecommerce-cps-india": "#ca9866",
  "shoptupperware-in-ecommerce-cps-india": "#383d72",
  "sirona": "#e90044",
  "skullcandy-in-ecommerce-cps-india": "#151419",
  "store-jeenasikho-com-ecommerce-cps-india": "#afad60",
  "tatacliq-com-ecommerce-cps-india": "#e1089d",
  "tenxyou-com-ecommerce-cps-india": "#7d5442",
  "the-bear-house": "#ee4840",
  "the-man-company": "#000000",
  "the-natural-wash": "#121212",
  "truebasics": "#f79d4d",
  "wonderchef": "#be2c3f",
  "zeroharm": "#4a4653",
  "zoff-foods": "#f1be7f",
};

/**
 * Admitad-connected program icons fetched from the network (verified-active
 * programs only — see backend `affiliate_campaigns`). Kept separate from
 * LOCAL_STORE_LOGOS so the "all locally-mapped icons are /stores/{slug}.png"
 * contract stays true.
 */
export const ADMITAD_PROGRAM_LOGOS: Record<string, string> = {
  "palmonas": "public/store-logos/palmonas.webp",
  "firstcry": "public/store-logos/firstcry.webp",
  "milton-in": "public/store-logos/milton-in.webp",
  "adidas": "public/store-logos/adidas.webp",
  "bewakoof": "public/store-logos/bewakoof.webp",
  "acer": "public/store-logos/acer.webp",
  "asus": "public/store-logos/asus.webp",
  "lenovo-india": "public/store-logos/lenovo-india.webp",
  "victorias-secret": "public/store-logos/victorias-secret.webp",
  "salty": "public/store-logos/salty.webp",
  "veromoda": "public/store-logos/veromoda.webp",
  "vero-moda": "public/store-logos/vero-moda.webp",
  "aldo-new": "public/store-logos/aldo-new.webp",
  "aldo-shoes": "public/store-logos/aldo-shoes.webp",
  "digihaat": "public/store-logos/digihaat.webp",
  "charles-keith": "public/store-logos/charles-keith.webp",
  "charles-and-keith": "public/store-logos/charles-and-keith.webp",
  "bliss-club": "public/store-logos/bliss-club.webp",
  "blissclub": "public/store-logos/blissclub.webp",
  "bath-body-works": "public/store-logos/bath-body-works.webp",
  "bath-and-body-works": "public/store-logos/bath-and-body-works.webp",
};

/** The admitad icon for a slug, when one exists in public/stores/. */
export function admitadLogoForSlug(slug?: string | null): string | null {
  if (!slug) return null;
  return ADMITAD_PROGRAM_LOGOS[slug] ?? null;
}

/** Actual brand logos for stores whose API/route slug differs or needs an override. */
const BRAND_LOGO_OVERRIDES: Record<string, string> = {
  "2ndnumber-tel-virtual-sms": "public/store-logos/2ndnumber-tel-virtual-sms.webp",
  "movavi": "public/store-logos/movavi.webp",
  "ajio": "public/store-logos/ajio.webp",
  "ajio-com-ecommerce-cps-india": "public/store-logos/ajio-com-ecommerce-cps-india.webp",
  // Prefer real brand marks over affiliate-network/campaign artwork.
  "veromoda": "public/store-logos/veromoda.webp",
  "vero-moda": "public/store-logos/vero-moda.webp",
  "aldo-new": "public/store-logos/aldo-new.webp",
  "aldo-shoes": "public/store-logos/aldo-shoes.webp",
  "charles-keith": "public/store-logos/charles-keith.webp",
  "charles-and-keith": "public/store-logos/charles-and-keith.webp",
  "bath-body-works": "public/store-logos/bath-body-works.webp",
  "bath-and-body-works": "public/store-logos/bath-and-body-works.webp",
  "bliss-club": "public/store-logos/bliss-club.webp",
  "blissclub": "public/store-logos/blissclub.webp",
  "victorias-secret": "public/store-logos/victorias-secret.webp",
  "palmonas": "public/store-logos/palmonas.webp",
  "digihaat": "public/store-logos/digihaat.webp",
  "asus": "public/store-logos/asus.webp",
  "adidas": "public/store-logos/adidas.webp",
  "salty": "public/store-logos/salty.webp",
};

function isCpsIndiaImage(path?: string | null): boolean {
  return Boolean(path && /ecommerce-cps-india/i.test(path));
}

const WEBSITE_HOST_PREFIXES = ["www", "store", "shop", "m", "mobile"];

function faviconDomain(hostname: string): string {
  const labels = hostname.toLowerCase().split(".");
  while (labels.length > 2 && WEBSITE_HOST_PREFIXES.includes(labels[0])) labels.shift();
  return labels.join(".");
}

/**
 * A same-site absolute logo URL would make the image optimizer crawl the
 * site's own public URL back — downgrade to root-relative so it serves from
 * the public folder directly.
 */
function sameOriginLogo(raw: string): string {
  return raw.replace(/^https?:\/\/(?:www\.)?durza\.in\//, "/");
}

/**
 * Prefer the backend logo (unless it's a generic affiliate-network CPS image),
 * then a real brand/admitad/local override, then the website's cached favicon.
 * Images named with "ecommerce-cps-india" are never treated as store logos.
 */
export function storeLogoUrl(
  store: {
    slug?: string | null;
    logo_url?: string | null;
    website_url?: string | null;
  } | null | undefined,
): string | null {
  if (!store) return null;
  const slug = store.slug ?? null;
  if (store.logo_url && !isCpsIndiaImage(store.logo_url)) return sameOriginLogo(store.logo_url);
  if (slug && BRAND_LOGO_OVERRIDES[slug]) return BRAND_LOGO_OVERRIDES[slug];
  if (slug && ADMITAD_PROGRAM_LOGOS[slug]) return ADMITAD_PROGRAM_LOGOS[slug];
  if (slug && LOCAL_STORE_LOGOS[slug] && !isCpsIndiaImage(LOCAL_STORE_LOGOS[slug])) {
    return LOCAL_STORE_LOGOS[slug];
  }
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
