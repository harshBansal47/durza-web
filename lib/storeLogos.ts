/**
 * Store logo resolution.
 *
 * `scripts/sync-store-logos.mjs` downloads every store's favicon into
 * public/store-logos/<domain>.webp and regenerates `store-domains.generated.ts`.
 * The frontend resolves a logo from the store's website (or the generated slug
 * map), so adding a store no longer needs a code change.
 */

import { STORE_DOMAINS } from "@/lib/store-domains.generated";

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

const WEBSITE_HOST_PREFIXES = ["www", "store", "shop", "m", "mobile"];

function faviconDomain(hostname: string): string {
  const labels = hostname.toLowerCase().split(".").filter(Boolean);
  while (labels.length > 2 && WEBSITE_HOST_PREFIXES.includes(labels[0])) labels.shift();
  return labels.join(".");
}

function isCpsIndiaImage(path?: string | null): boolean {
  return Boolean(path && /ecommerce-cps-india/i.test(path));
}

function sameOriginLogo(raw: string): string {
  return raw.replace(/^https?:\/\/(?:www\.)?durza\.in\//, "/");
}

function domainForStore(store: {
  slug?: string | null;
  website_url?: string | null;
}): string | null {
  if (store.website_url) {
    try {
      const website = new URL(store.website_url);
      if (website.protocol === "https:" || website.protocol === "http:") {
        return faviconDomain(website.hostname);
      }
    } catch {
      // Fall through to the generated slug map.
    }
  }
  return store.slug ? STORE_DOMAINS[store.slug] ?? null : null;
}

/** Local WebP path for a store logo, or null when no logo is known. */
export function storeLogoUrl(
  store: {
    slug?: string | null;
    logo_url?: string | null;
    website_url?: string | null;
  } | null | undefined,
): string | null {
  if (!store) return null;
  const domain = domainForStore(store);
  if (domain) return `/store-logos/${domain}.webp`;
  if (store.logo_url && !isCpsIndiaImage(store.logo_url)) return sameOriginLogo(store.logo_url);
  return null;
}

/** Backward-compatible helper for store pages that ask by slug. */
export function admitadLogoForSlug(slug?: string | null): string | null {
  if (!slug) return null;
  const domain = STORE_DOMAINS[slug];
  return domain ? `/store-logos/${domain}.webp` : null;
}

/** Decorative accent for a store page, or null for stores with no icon. */
export function storeAccent(slug?: string | null): string | null {
  if (!slug) return null;
  return STORE_ACCENTS[slug] ?? null;
}
