import type { Store } from "./types";

const DISPLAY_OVERRIDES: Record<string, string> = {
  "buyindusvalley-in-ecommerce-cps-india": "Indus Valley",
  "indus-valley": "Indus Valley",
  "dot-and-key": "Dot & Key",
  "aldo-shoes": "ALDO",
  "aldo-new": "ALDO",
  "bath-and-body-works": "Bath & Body Works",
  "amantelingerie-in-ecommerce-cps-india": "Amanté",
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
};

function titleCaseFromSlug(slug: string): string {
  return slug
    .replace(/-many-geos$/i, "")
    .replace(/-(com|in|co-in|store|online|tel)-.*$/i, "")
    .replace(/-com-ecommerce-cps-india$/i, "")
    .split("-")
    .filter(Boolean)
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function cleanRawName(name: string): string {
  let n = name.trim();
  n = n.replace(/\s*-many-geos$/i, "");
  n = n.replace(/\.?in$/i, (m) => (name.includes(".") ? "" : m));
  n = n.replace(/\.(com|co\.in|store|online|tel)$/i, "");
  n = n.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return n;
}

export function formatStoreDisplayName(store: Pick<Store, "slug" | "name"> | { slug: string; name: string }): string {
  const bySlug = DISPLAY_OVERRIDES[store.slug];
  if (bySlug) return bySlug;

  const name = store.name || "";
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

  // Strip raw feed suffixes for display
  if (/many-geos/i.test(name)) return cleanRawName(name).replace(/\s*many geos/i, "").trim() || titleCaseFromSlug(store.slug);
  if (/\.(com|co\.in|store|online|in)$/i.test(name)) {
    const cleaned = cleanRawName(name);
    // special domain-like names
    if (/^buyindusvalley$/i.test(cleaned.replace(/\s+/g, ""))) return "Indus Valley";
    if (/^dotandkey$/i.test(cleaned.replace(/\s+/g, ""))) return "Dot & Key";
    return cleaned || titleCaseFromSlug(store.slug);
  }

  return name || titleCaseFromSlug(store.slug);
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
