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
  "ajio": "/stores/ajio.png",
  "ajio-com-ecommerce-cps-india": "/stores/ajio.png",
  "alpino": "/stores/alpino.png",
  "amazon-in": "/stores/amazon-in.png",
  "beast-life": "/stores/beast-life.png",
  "bigbasket": "/stores/bigbasket.png",
  "boldfit": "/stores/boldfit.png",
  "boult": "/stores/boult.png",
  "brillare": "/stores/brillare.png",
  "bytepe": "/stores/bytepe.png",
  "croma": "/stores/croma.png",
  "dot-and-key": "/stores/dot-and-key.png",
  "firstcry": "/stores/firstcry.png",
  "fitspire": "/stores/fitspire.png",
  "flipkart": "/stores/flipkart.png",
  "fuelone": "/stores/fuelone.png",
  "gritzo": "/stores/gritzo.png",
  "guvi": "/stores/guvi.png",
  "havells": "/stores/havells.png",
  "healthkart": "/stores/healthkart.png",
  "hirafragrance": "/stores/hirafragrance.png",
  "hkvitals": "/stores/hkvitals.png",
  "iba-cosmetics": "/stores/iba-cosmetics.png",
  "igp": "/stores/igp.png",
  "indus-valley": "/stores/indus-valley.png",
  "ixigo": "/stores/ixigo.png",
  "kama-ayurveda": "/stores/kama-ayurveda.png",
  "kapiva": "/stores/kapiva.png",
  "lavie-world": "/stores/lavie-world.png",
  "lenskart": "/stores/lenskart.png",
  "levis": "/stores/levis.png",
  "life-changing-astro": "/stores/life-changing-astro.png",
  "makemytrip": "/stores/makemytrip.png",
  "meesho": "/stores/meesho.png",
  "milton": "/stores/milton.png",
  "milton-in": "/stores/milton-in.png",
  "moglix": "/stores/moglix.png",
  "mymuse": "/stores/mymuse.png",
  "myntra": "/stores/myntra.png",
  "neesh-perfumes": "/stores/neesh-perfumes.png",
  "nilkamalfurniture": "/stores/nilkamalfurniture.png",
  "nordpass": "/stores/nordpass.png",
  "nourish-mantra": "/stores/nourish-mantra.png",
  "reliance-digital": "/stores/reliance-digital.png",
  "salty": "/stores/salty.png",
  "salty-co-in-ecommerce-cps-india": "/stores/salty.png",
  "sirona": "/stores/sirona.png",
  "the-bear-house": "/stores/the-bear-house.png",
  "the-man-company": "/stores/the-man-company.png",
  "the-natural-wash": "/stores/the-natural-wash.png",
  "truebasics": "/stores/truebasics.png",
  "wonderchef": "/stores/wonderchef.png",
  "zoff-foods": "/stores/zoff-foods.png",
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
  "ixigo": "#ec5b24",
  "kama-ayurveda": "#ad3132",
  "kapiva": "#22815d",
  "lavie-world": "#ca348b",
  "lenskart": "#000042",
  "levis": "#c41321",
  "life-changing-astro": "#4c5d8e",
  "makemytrip": "#e01e26",
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
  "palmonas": "/stores/palmonas.webp",
  "firstcry": "/stores/firstcry.jpg",
  "milton-in": "/stores/milton-in.webp",
  "adidas": "/stores/adidas.webp",
  "bewakoof": "/stores/bewakoof.webp",
  "acer": "/stores/acer.png",
  "asus": "/stores/asus.svg",
  "lenovo-india": "/stores/lenovo-india.png",
  "victorias-secret": "/stores/victorias-secret.webp",
  "salty": "/stores/salty.png",
  "veromoda": "/stores/veromoda.webp",
  "vero-moda": "/stores/veromoda.webp",
  "aldo-new": "/stores/aldo-new.webp",
  "aldo-shoes": "/stores/aldo-new.webp",
  "digihaat": "/stores/digihaat.webp",
  "charles-keith": "/stores/charles-keith.webp",
  "charles-and-keith": "/stores/charles-keith.webp",
  "bliss-club": "/stores/bliss-club.webp",
  "blissclub": "/stores/bliss-club.webp",
  "bath-body-works": "/stores/bath-body-works.webp",
  "bath-and-body-works": "/stores/bath-body-works.webp",
};

/** The admitad icon for a slug, when one exists in public/stores/. */
export function admitadLogoForSlug(slug?: string | null): string | null {
  if (!slug) return null;
  return ADMITAD_PROGRAM_LOGOS[slug] ?? null;
}

/** Actual brand logos for stores whose API/route slug differs or needs an override. */
const BRAND_LOGO_OVERRIDES: Record<string, string> = {
  "2ndnumber-tel-virtual-sms": "/stores/2ndnumber-tel-virtual-sms.webp",
  "movavi": "/stores/movavi.webp",
  "ajio": "/stores/ajio.png",
  "ajio-com-ecommerce-cps-india": "/stores/ajio.png",
  // Prefer real brand marks over affiliate-network/campaign artwork.
  "veromoda": "/stores/veromoda.webp",
  "vero-moda": "/stores/veromoda.webp",
  "aldo-new": "/stores/aldo-new.webp",
  "aldo-shoes": "/stores/aldo-new.webp",
  "charles-keith": "/stores/charles-keith.webp",
  "charles-and-keith": "/stores/charles-keith.webp",
  "bath-body-works": "/stores/bath-body-works.webp",
  "bath-and-body-works": "/stores/bath-body-works.webp",
  "bliss-club": "/stores/bliss-club.webp",
  "blissclub": "/stores/bliss-club.webp",
  "victorias-secret": "/stores/victorias-secret.webp",
  "palmonas": "/stores/palmonas.webp",
  "digihaat": "/stores/digihaat.webp",
  "asus": "/stores/asus.svg",
  "adidas": "/stores/adidas.webp",
  "salty": "/stores/salty.png",
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
