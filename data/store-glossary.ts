/**
 * Static registry: store slug → anchor of its interactive widget on
 * `/stores/[slug]#<anchorId>`, so guide deep-links point precisely at the
 * calculator, matcher, decoder, or advisor widget on each custom store page.
 *
 * Anchor ids are matched 1:1 with the markup in `app/stores/*\/client.tsx`
 * (each interactive section carries its own `id`). Adding a new custom store
 * page means adding its entry here as well — the guide is the source of
 * truth for "which anchor does this brand have".
 */

export const STORE_TOOL_ANCHORS = {
  "ajio-com-ecommerce-cps-india": "brand-guidance",
  "alpino": "protein-decoder",
  "beast-life": "tool",
  "boldfit": "tool",
  "boult": "tool",
  "brillare": "tool",
  "bytepe": "tool",
  "dot-and-key": "tool",
  "fitspire": "tool",
  "fuelone": "tool",
  "gritzo": "tool",
  "guvi": "tool",
  "havells": "tool",
  "healthkart": "buy-safely",
  "hirafragrance": "tool",
  "hkvitals": "tool",
  "iba-cosmetics": "tool",
  "igp": "tool",
  "indus-valley": "tool",
  "kama-ayurveda": "tool",
  "kapiva": "tool",
  "lenskart": "brand-guidance",
  "levis": "tool",
  "life-changing-astro": "tool",
  "moglix": "gst-net-cost",
  "milton": "tool",
  "mymuse": "tool",
  "myntra": "brand-guidance",
  "neesh-perfumes": "tool",
  "nilkamalfurniture": "tool",
  "nordpass": "tool",
  "nourish-mantra": "tool",
  "nykaa": "brand-guidance",
  "sirona": "cup-size-finder",
  "tatacliq-com-ecommerce-cps-india": "brand-guidance",
  "the-bear-house": "tool",
  "the-man-company": "tool",
  "the-natural-wash": "tool",
  "truebasics": "tool",
  "wonderchef": "tool",
  "zeroharm": "tool",
  "zoff-foods": "tool",
} as const;

export type StoreSlug = keyof typeof STORE_TOOL_ANCHORS;

/**
 * Some brands publish their calculator as a dedicated route rather than an
 * anchor on the store hub. Prefer those routes so guide CTAs never point at a
 * fragment that does not exist.
 */
const STORE_TOOL_HREFS: Record<string, string> = {
  havells: "/stores/havells/bldc-calculator",
  kapiva: "/stores/kapiva#kapiva-matcher",
  hkvitals: "/stores/hkvitals#hkvitals-matcher",
  healthkart: "/stores/healthkart#healthkart-matcher",
  "dot-and-key": "/stores/dot-and-key#dotkey-matcher",
};

/** Returns a dedicated tool route, `/stores/<slug>#<anchor>`, or `#tool` fallback. */
export function toolHref(slug: string): string {
  if (STORE_TOOL_HREFS[slug]) return STORE_TOOL_HREFS[slug];
  const anchor = (STORE_TOOL_ANCHORS as Record<string, string>)[slug];
  return anchor ? `/stores/${slug}#${anchor}` : `/stores/${slug}#tool`;
}
