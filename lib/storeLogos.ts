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
  "2ndnumber-tel-virtual-sms": "/store-logos/2ndnumber-tel-virtual-sms.webp",
  "acer": "/store-logos/acer.webp",
  "adguard-many-geos": "/store-logos/adguard-many-geos.webp",
  "adidas": "/store-logos/adidas.webp",
  "ageasy": "/store-logos/ageasy.webp",
  "air-india": "/store-logos/air-india.webp",
  "ajio": "/store-logos/ajio.webp",
  "ajio-com-ecommerce-cps-india": "/store-logos/ajio-com-ecommerce-cps-india.webp",
  "aldo-new": "/store-logos/aldo-new.webp",
  "alpino": "/store-logos/alpino.webp",
  "alpino-store-ecommerce-cps-india": "/store-logos/alpino-store-ecommerce-cps-india.webp",
  "amantelingerie-in-cps-india": "/store-logos/amantelingerie-in-cps-india.webp",
  "amazon-in": "/store-logos/amazon-in.webp",
  "asus": "/store-logos/asus.webp",
  "baccabucci-com-ecommerce-cps-india": "/store-logos/baccabucci-com-ecommerce-cps-india.webp",
  "bath-body-works": "/store-logos/bath-body-works.webp",
  "beast-life": "/store-logos/beast-life.webp",
  "beastlife-in-ecommerce-cps-india": "/store-logos/beastlife-in-ecommerce-cps-india.webp",
  "bewakoof": "/store-logos/bewakoof.webp",
  "bigbasket": "/store-logos/bigbasket.webp",
  "blabliblulife-com-ecommerce-cps-india": "/store-logos/blabliblulife-com-ecommerce-cps-india.webp",
  "bliss-club": "/store-logos/bliss-club.webp",
  "boggbag-com-ecommerce-cps-united-states": "/store-logos/boggbag-com-ecommerce-cps-united-states.webp",
  "boldfit": "/store-logos/boldfit.webp",
  "boldfit-com-ecommerce-cps-india": "/store-logos/boldfit-com-ecommerce-cps-india.webp",
  "boult": "/store-logos/boult.webp",
  "brillare": "/store-logos/brillare.webp",
  "brillare-co-in-ecommerce-cps-india": "/store-logos/brillare-co-in-ecommerce-cps-india.webp",
  "buyindusvalley-in-ecommerce-cps-india": "/store-logos/buyindusvalley-in-ecommerce-cps-india.webp",
  "bytepe": "/store-logos/bytepe.webp",
  "charles-keith": "/store-logos/charles-keith.webp",
  "croma": "/store-logos/croma.webp",
  "ctrl8": "/store-logos/ctrl8.webp",
  "cumin-co": "/store-logos/cumin-co.webp",
  "digihaat": "/store-logos/digihaat.webp",
  "dot-and-key": "/store-logos/dot-and-key.webp",
  "dotandkey-com-ecommerce-cps-india": "/store-logos/dotandkey-com-ecommerce-cps-india.webp",
  "emami-zanducare": "/store-logos/emami-zanducare.webp",
  "firstcry": "/store-logos/firstcry.webp",
  "firstcry-com-ecommerce-cps-india": "/store-logos/firstcry-com-ecommerce-cps-india.webp",
  "fitspire": "/store-logos/fitspire.webp",
  "fitspire-online-ecommerce-cps-india": "/store-logos/fitspire-online-ecommerce-cps-india.webp",
  "fiverr-many-geo-s": "/store-logos/fiverr-many-geo-s.webp",
  "flipkart": "/store-logos/flipkart.webp",
  "fuelone": "/store-logos/fuelone.webp",
  "fuelone-in-ecommerce-cps-india": "/store-logos/fuelone-in-ecommerce-cps-india.webp",
  "glasseslit": "/store-logos/glasseslit.webp",
  "goboult-co-in-ecommerce-cps-india": "/store-logos/goboult-co-in-ecommerce-cps-india.webp",
  "gritzo": "/store-logos/gritzo.webp",
  "gritzo-com-ecommerce-cps-india": "/store-logos/gritzo-com-ecommerce-cps-india.webp",
  "guvi": "/store-logos/guvi.webp",
  "guvi-in-cps-india": "/store-logos/guvi-in-cps-india.webp",
  "hacoo": "/store-logos/hacoo.webp",
  "havells": "/store-logos/havells.webp",
  "havells-com-ecommerce-cps-india": "/store-logos/havells-com-ecommerce-cps-india.webp",
  "healthkart": "/store-logos/healthkart.webp",
  "healthkart-com-ecommerce-cps-india": "/store-logos/healthkart-com-ecommerce-cps-india.webp",
  "hirafragrance": "/store-logos/hirafragrance.webp",
  "hirafragrances-com-ecommerce-cps-india": "/store-logos/hirafragrances-com-ecommerce-cps-india.webp",
  "hkvitals": "/store-logos/hkvitals.webp",
  "hkvitals-com-ecommerce-cps-india": "/store-logos/hkvitals-com-ecommerce-cps-india.webp",
  "hok-makeup": "/store-logos/hok-makeup.webp",
  "homecentre-web-app": "/store-logos/homecentre-web-app.webp",
  "iba-cosmetics": "/store-logos/iba-cosmetics.webp",
  "ibacosmetics-com-ecommerce-cps-india": "/store-logos/ibacosmetics-com-ecommerce-cps-india.webp",
  "igp": "/store-logos/igp.webp",
  "igp-com-ecommerce-cps-india": "/store-logos/igp-com-ecommerce-cps-india.webp",
  "indus-valley": "/store-logos/indus-valley.webp",
  "invideo": "/store-logos/invideo.webp",
  "italiarail-many-geos": "/store-logos/italiarail-many-geos.webp",
  "italojewerly": "/store-logos/italojewerly.webp",
  "ixigo": "/store-logos/ixigo.webp",
  "kama-ayurveda": "/store-logos/kama-ayurveda.webp",
  "kamaayurveda-com-ecommerce-cps-india": "/store-logos/kamaayurveda-com-ecommerce-cps-india.webp",
  "kapiva": "/store-logos/kapiva.webp",
  "kapiva-in-ecommerce-cps-india": "/store-logos/kapiva-in-ecommerce-cps-india.webp",
  "lavie-world": "/store-logos/lavie-world.webp",
  "lavieworld-com-ecommerce-cps-india": "/store-logos/lavieworld-com-ecommerce-cps-india.webp",
  "lenovo-india": "/store-logos/lenovo-india.webp",
  "lenskart": "/store-logos/lenskart.webp",
  "levi-in-ecommerce-cps-india": "/store-logos/levi-in-ecommerce-cps-india.webp",
  "levis": "/store-logos/levis.webp",
  "life-changing-astro": "/store-logos/life-changing-astro.webp",
  "lifechangingastro-com-ecommerce-cps-india": "/store-logos/lifechangingastro-com-ecommerce-cps-india.webp",
  "makemytrip": "/store-logos/makemytrip.webp",
  "meesho": "/store-logos/meesho.webp",
  "milton": "/store-logos/milton.webp",
  "milton-in": "/store-logos/milton-in.webp",
  "milton-in-ecommerce-cps-india": "/store-logos/milton-in-ecommerce-cps-india.webp",
  "moglix": "/store-logos/moglix.webp",
  "moglix-com-ecommerce-cps-india": "/store-logos/moglix-com-ecommerce-cps-india.webp",
  "movavi": "/store-logos/movavi.webp",
  "muscleblaze-com-ecommerce-cps-india": "/store-logos/muscleblaze-com-ecommerce-cps-india.webp",
  "mymuse": "/store-logos/mymuse.webp",
  "mymuse-in-ecommerce-cps-india": "/store-logos/mymuse-in-ecommerce-cps-india.webp",
  "myntra": "/store-logos/myntra.webp",
  "neesh-perfumes": "/store-logos/neesh-perfumes.webp",
  "neeshperfumes-com-ecommerce-cps-india": "/store-logos/neeshperfumes-com-ecommerce-cps-india.webp",
  "netwall": "/store-logos/netwall.webp",
  "nilkamalfurniture": "/store-logos/nilkamalfurniture.webp",
  "nilkamalfurniture-com-ecommerce-cps-india": "/store-logos/nilkamalfurniture-com-ecommerce-cps-india.webp",
  "nordpass": "/store-logos/nordpass.webp",
  "nordpass-com-utility-cps-worldwide-488": "/store-logos/nordpass-com-utility-cps-worldwide-488.webp",
  "notta-ai": "/store-logos/notta-ai.webp",
  "nourish-mantra": "/store-logos/nourish-mantra.webp",
  "nourishmantra-in-ecommerce-cps-india": "/store-logos/nourishmantra-in-ecommerce-cps-india.webp",
  "nuawoman-com-ecommerce-cps-india": "/store-logos/nuawoman-com-ecommerce-cps-india.webp",
  "nykaa": "/store-logos/nykaa.webp",
  "palmonas": "/store-logos/palmonas.webp",
  "pepperfry-com-cps-india": "/store-logos/pepperfry-com-cps-india.webp",
  "pepperfry-com-ecommerce-cps-india": "/store-logos/pepperfry-com-ecommerce-cps-india.webp",
  "perforacare-com-ecommerce-cps-india": "/store-logos/perforacare-com-ecommerce-cps-india.webp",
  "prohoster": "/store-logos/prohoster.webp",
  "purevpn-com-utility-cpa-worldwide": "/store-logos/purevpn-com-utility-cpa-worldwide.webp",
  "redmagic": "/store-logos/redmagic.webp",
  "reliance-digital": "/store-logos/reliance-digital.webp",
  "rforrabbit-com-ecommerce-cps-india": "/store-logos/rforrabbit-com-ecommerce-cps-india.webp",
  "salty": "/store-logos/salty.webp",
  "salty-co-in-ecommerce-cps-india": "/store-logos/salty-co-in-ecommerce-cps-india.webp",
  "sanskrutihomes-in-ecommerce-cps-india": "/store-logos/sanskrutihomes-in-ecommerce-cps-india.webp",
  "shoptupperware-in-ecommerce-cps-india": "/store-logos/shoptupperware-in-ecommerce-cps-india.webp",
  "sirona": "/store-logos/sirona.webp",
  "skullcandy-in-ecommerce-cps-india": "/store-logos/skullcandy-in-ecommerce-cps-india.webp",
  "store-jeenasikho-com-ecommerce-cps-india": "/store-logos/store-jeenasikho-com-ecommerce-cps-india.webp",
  "tatacliq-com-ecommerce-cps-india": "/store-logos/tatacliq-com-ecommerce-cps-india.webp",
  "tenxyou-com-ecommerce-cps-india": "/store-logos/tenxyou-com-ecommerce-cps-india.webp",
  "the-bear-house": "/store-logos/the-bear-house.webp",
  "the-man-company": "/store-logos/the-man-company.webp",
  "the-natural-wash": "/store-logos/the-natural-wash.webp",
  "thebearhouse-com-ecommerce-cps-india": "/store-logos/thebearhouse-com-ecommerce-cps-india.webp",
  "themancompany-com-ecommerce-cps-india": "/store-logos/themancompany-com-ecommerce-cps-india.webp",
  "thenaturalwash-com-ecommerce-cps-india": "/store-logos/thenaturalwash-com-ecommerce-cps-india.webp",
  "thesirona-com-ecommerce-cps-india": "/store-logos/thesirona-com-ecommerce-cps-india.webp",
  "thordata": "/store-logos/thordata.webp",
  "truebasics": "/store-logos/truebasics.webp",
  "truebasics-com-ecommerce-cps-india": "/store-logos/truebasics-com-ecommerce-cps-india.webp",
  "turbovpn": "/store-logos/turbovpn.webp",
  "veromoda": "/store-logos/veromoda.webp",
  "victorias-secret": "/store-logos/victorias-secret.webp",
  "wonderchef": "/store-logos/wonderchef.webp",
  "wonderchef-com-ecommerce-cps-india": "/store-logos/wonderchef-com-ecommerce-cps-india.webp",
  "wondershare": "/store-logos/wondershare.webp",
  "zeroharm": "/store-logos/zeroharm.webp",
  "zeroharm-in-ecommerce-cps-india": "/store-logos/zeroharm-in-ecommerce-cps-india.webp",
  "zoff-foods": "/store-logos/zoff-foods.webp",
  "zofffoods-com-ecommerce-cps-india": "/store-logos/zofffoods-com-ecommerce-cps-india.webp",
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
  "palmonas": "/store-logos/palmonas.webp",
  "firstcry": "/store-logos/firstcry.webp",
  "milton-in": "/store-logos/milton-in.webp",
  "adidas": "/store-logos/adidas.webp",
  "bewakoof": "/store-logos/bewakoof.webp",
  "acer": "/store-logos/acer.webp",
  "asus": "/store-logos/asus.webp",
  "lenovo-india": "/store-logos/lenovo-india.webp",
  "victorias-secret": "/store-logos/victorias-secret.webp",
  "salty": "/store-logos/salty.webp",
  "veromoda": "/store-logos/veromoda.webp",
  "vero-moda": "/store-logos/vero-moda.webp",
  "aldo-new": "/store-logos/aldo-new.webp",
  "aldo-shoes": "/store-logos/aldo-shoes.webp",
  "digihaat": "/store-logos/digihaat.webp",
  "charles-keith": "/store-logos/charles-keith.webp",
  "charles-and-keith": "/store-logos/charles-and-keith.webp",
  "bliss-club": "/store-logos/bliss-club.webp",
  "blissclub": "/store-logos/blissclub.webp",
  "bath-body-works": "/store-logos/bath-body-works.webp",
  "bath-and-body-works": "/store-logos/bath-and-body-works.webp",
};

/** The admitad icon for a slug, when one exists in public/stores/. */
export function admitadLogoForSlug(slug?: string | null): string | null {
  if (!slug) return null;
  return ADMITAD_PROGRAM_LOGOS[slug] ?? null;
}

/** Actual brand logos for stores whose API/route slug differs or needs an override. */
const BRAND_LOGO_OVERRIDES: Record<string, string> = {
  "2ndnumber-tel-virtual-sms": "/store-logos/2ndnumber-tel-virtual-sms.webp",
  "movavi": "/store-logos/movavi.webp",
  "ajio": "/store-logos/ajio.webp",
  "ajio-com-ecommerce-cps-india": "/store-logos/ajio-com-ecommerce-cps-india.webp",
  // Prefer real brand marks over affiliate-network/campaign artwork.
  "veromoda": "/store-logos/veromoda.webp",
  "vero-moda": "/store-logos/vero-moda.webp",
  "aldo-new": "/store-logos/aldo-new.webp",
  "aldo-shoes": "/store-logos/aldo-shoes.webp",
  "charles-keith": "/store-logos/charles-keith.webp",
  "charles-and-keith": "/store-logos/charles-and-keith.webp",
  "bath-body-works": "/store-logos/bath-body-works.webp",
  "bath-and-body-works": "/store-logos/bath-and-body-works.webp",
  "bliss-club": "/store-logos/bliss-club.webp",
  "blissclub": "/store-logos/blissclub.webp",
  "victorias-secret": "/store-logos/victorias-secret.webp",
  "palmonas": "/store-logos/palmonas.webp",
  "digihaat": "/store-logos/digihaat.webp",
  "asus": "/store-logos/asus.webp",
  "adidas": "/store-logos/adidas.webp",
  "salty": "/store-logos/salty.webp",
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
  if (slug && LOCAL_STORE_LOGOS[slug] && !isCpsIndiaImage(LOCAL_STORE_LOGOS[slug])) {
    return LOCAL_STORE_LOGOS[slug];
  }
  if (slug && BRAND_LOGO_OVERRIDES[slug]) return BRAND_LOGO_OVERRIDES[slug];
  if (slug && ADMITAD_PROGRAM_LOGOS[slug]) return ADMITAD_PROGRAM_LOGOS[slug];
  if (store.logo_url && !isCpsIndiaImage(store.logo_url)) return sameOriginLogo(store.logo_url);
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
