import type { Store } from "./types";

const DISPLAY_OVERRIDES: Record<string, string> = {
  "buyindusvalley-in-ecommerce-cps-india": "Indus Valley",
  "indus-valley": "Indus Valley",
  "dot-and-key": "Dot & Key",
  "aldo-shoes": "ALDO",
  "aldo-new": "ALDO",
  "bath-and-body-works": "Bath & Body Works",
  "amantelingerie-in-ecommerce-cps-india": "Amanté",
  "amantelingerie-in-cps-india": "Amanté",
  "ajio-com-ecommerce-cps-india": "AJIO",
  "beast-life": "BeastLife",
  "beastlife-in-ecommerce-cps-india": "BeastLife",
  "boldfit": "Boldfit",
  "boldfit-com-ecommerce-cps-india": "Boldfit",
  "brillare": "Brillare",
  "brillare-co-in-ecommerce-cps-india": "Brillare",
  "boult": "Boult",
  "goboult-co-in-ecommerce-cps-india": "Boult",
  "alpino": "Alpino",
  "alpino-store-ecommerce-cps-india": "Alpino",
  "fitspire": "Fitspire",
  "fitspire-online-ecommerce-cps-india": "Fitspire",
  "gritzo": "Gritzo",
  "gritzo-com-ecommerce-cps-india": "Gritzo",
  "dotandkey-com": "Dot & Key",
  "buyindusvalley-in": "Indus Valley",
  "igp": "IGP",
  "igp-com": "IGP",
  "iba-cosmetics": "Iba Cosmetics",
  "invideo": "InVideo",
  "italiarail-many-geos": "ItaliaRail",
  "italojewerly": "Italo Jewelry",
  "lavie-world": "Lavie World",
  "lenovo": "Lenovo",
  "lenskart": "Lenskart",
  "moglix": "Moglix",
  "nilkamalfurniture": "Nilkamal Furniture",
  "healthkart": "HealthKart",
  "hkvitals": "HK Vitals",
  "havells": "Havells",
  "guvi": "GUVI",
  "kama-ayurveda": "Kama Ayurveda",
  "the-man-company": "The Man Company",
  "adguard-many-geos": "AdGuard",
  "baccabucci-com-ecommerce-cps-india": "Bacca Bucci",
  "blabliblulife-com-ecommerce-cps-india": "Blabliblu Life",
  "muscleblaze-com-ecommerce-cps-india": "MuscleBlaze",
  "nuawoman-com-ecommerce-cps-india": "Nua",
  "pepperfry-com-ecommerce-cps-india": "Pepperfry",
  "perforacare-com-ecommerce-cps-india": "Perfora",
  "perfora-care": "Perfora",
  "rforrabbit-com-ecommerce-cps-india": "R for Rabbit",
  "r-for-rabbit": "R for Rabbit",
  "sanskrutihomes-in-ecommerce-cps-india": "Sanskruti Homes",
  "sanskruti-homes": "Sanskruti Homes",
  "shoptupperware-in-ecommerce-cps-india": "Tupperware India",
  "shop-tupperware": "Tupperware India",
  "skullcandy-in-ecommerce-cps-india": "Skullcandy India",
  "store-jeenasikho-com-ecommerce-cps-india": "Jeena Sikho",
  "tatacliq-com-ecommerce-cps-india": "Tata CLiQ",
};

function stripFeedSuffixes(value: string): string {
  return value
    .replace(/\s*-?\s*many[- ]geos$/i, "")
    .replace(/[- ]+(com|co\.in|in)[- ]+ecommerce[- ]+cps[- ]+india$/i, "")
    .replace(/[- ]+ecommerce[- ]+cps[- ]+india$/i, "")
    .replace(/[- ]+in[- ]+cps[- ]+india$/i, "")
    .replace(/[- ]+cps[- ]+india$/i, "")
    .replace(/[- ]+utility[- ]+cpa[- ]+worldwide$/i, "")
    .replace(/[- ]+many[- ]+geos$/i, "")
    .replace(/\.(com|co\.in|store|online|in)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCaseFromSlug(slug: string): string {
  const cleaned = stripFeedSuffixes(slug.replace(/-/g, " "));
  if (!cleaned) return slug;
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((w) => {
      if (/^[a-z]{2,3}$/i.test(w)) return w.toUpperCase();
      if (/^[A-Z0-9]+$/.test(w) && w.length <= 5) return w;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

export function formatStoreDisplayName(store: Pick<Store, "slug" | "name"> | { slug: string; name: string }): string {
  const bySlug = DISPLAY_OVERRIDES[store.slug];
  if (bySlug) return bySlug;

  const name = (store.name || "").trim();
  const lower = name.toLowerCase();
  if (lower === "buyindusvalley.in" || lower.includes("buyindusvalley")) return "Indus Valley";
  if (lower === "dotandkey.com" || lower === "dotandkey") return "Dot & Key";
  if (lower === "aldo new" || lower === "aldo") return "ALDO";
  if (lower === "bath & body works" || lower === "bath & bodyworks" || lower.includes("bath & body")) return "Bath & Body Works";
  if (lower.startsWith("amantelingerie")) return "Amanté";
  if (lower === "ajio.com" || lower === "ajio") return "AJIO";
  if (lower.startsWith("beastlife")) return "BeastLife";
  if (lower.startsWith("boldfit")) return "Boldfit";
  if (lower.startsWith("brillare")) return "Brillare";
  if (lower.startsWith("goboult")) return "Boult";

  if (/many-geos|ecommerce-cps-india|cps-india|\.(com|co\.in|store|online)$/i.test(name)) {
    const cleaned = stripFeedSuffixes(name);
    if (/^buyindusvalley$/i.test(cleaned.replace(/\s+/g, ""))) return "Indus Valley";
    if (/^dotandkey$/i.test(cleaned.replace(/\s+/g, ""))) return "Dot & Key";
    if (cleaned) {
      // Preserve known short brand casings if they survived cleaning
      if (/^ajio$/i.test(cleaned)) return "AJIO";
      if (/^igp$/i.test(cleaned)) return "IGP";
      if (/^guvi$/i.test(cleaned)) return "GUVI";
      return cleaned;
    }
  }

  if (name) return name;
  return titleCaseFromSlug(store.slug);
}

export function storeSortKey(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .toLowerCase();
}

export function storeBucketLetter(displayName: string): string {
  const key = storeSortKey(displayName);
  const ch = key[0]?.toUpperCase() ?? "#";
  return /[A-Z]/.test(ch) ? ch : "#";
}
