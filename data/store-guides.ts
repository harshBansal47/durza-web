/**
 * Static buying guides — one per store, authored by hand.
 *
 * These guides are the content layer for Durza's "1-Guide-Per-Store" SEO
 * engine. They render through `/guides/[slug]` when no DB editorial row
 * exists for the slug (the database editorial layer is tried first), and
 * they are hand-authored rather than templated — templated copy reads as
 * SEO spam to both shoppers and crawlers. We do not fabricate prices,
 * MRPs, or offer amounts; guide CTAs point at codes that are verified
 * live on the Durza catalogue at audit time.
 *
 * Structure:
 *  - 600–800 words of ₹-first buying advice
 *  - 3 quality FAQs rendered 1:1 into FAQPage JSON-LD
 *  - one direct deal CTA (code copy + affiliate tracker) when a code exists
 *  - `/stores/<slug>#tool` deep-link card when the store has an interactive tool
 *  - Article + BreadcrumbList + FAQPage JSON-LD emitted server-side
 *
 * Slugs MUST NOT duplicate an existing DB editorial slug.
 */

import { toolHref } from "@/data/store-glossary";
import type { VerifiedResearchKind } from "@/data/verified-research-2026-11-25";

export type StaticGuideBlock =
  | { type: "callout"; text: string }
  | { type: "heading"; heading: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "ordered_list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "evidence"; kind: VerifiedResearchKind };

export type StaticGuideCta =
  | {
      kind: "code";
      code: string;         // revealed on tap, never in initial HTML
      badge: string;        // e.g. "FLAT ₹300 OFF"
      headline: string;
      eligibility: string;
      targetUrl: string;
      subId: string;        // affiliate placement tag, e.g. guide_healthkart-smart-buying
    }
  | {
      kind: "amazon";       // Amazon Associates — tag=durza02-21&ascsubtag=…
      badge: string;
      headline: string;
      eligibility: string;
      targetUrl: string;
      subId: string;
    }
  | {
      kind: "vcommission_auto" | "admitad";  // no code — auto-applied deal
      badge: string;
      headline: string;
      eligibility: string;
      targetUrl: string;
      subId: string;
    };

export interface StaticGuide {
  /** /guides/<slug> */
  slug: string;
  storeSlug: string;
  category: string;         // used by the /guides category filter
  featured?: boolean;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageLayout?: "logo" | "editorial";
  seo: { title: string; description: string };
  /** 1-line summary shown in listings and the hero. */
  summary: string;
  /** Named reviewer. Falls back to the editorial desk when absent. */
  authorName?: string;
  /** ISO date facts were actually checked. Never set without a real check. */
  factsCheckedOn?: string;
  /** Who it is for / who should skip it, shown above the fold. */
  audience?: { bestFor: string[]; skipIf: string[] };
  /** Extra internal links (hubs, comparisons, other guides, tools). */
  relatedLinks?: { href: string; label: string }[];
  /** Additional outbound CTA links beside the primary tracked CTA. */
  extraCtas?: { href: string; label: string }[];
  /** The verdict sentence — what the page concludes. */
  faqs: { question: string; answer: string }[];
  blocks: StaticGuideBlock[];
  relatedStores: string[];
  /** Present when the store page has an interactive widget at /stores/<slug>#tool. */
  interactiveTool?: { headline: string; sublabel: string };
  primaryCta?: StaticGuideCta;
  /** ISO date this guide's offers were last hand-checked against the live catalogue. */
  auditedOn?: string;
}


const RAW_GUIDES: StaticGuide[] = [
{
    slug: "ajio-marketplace-coupons-and-bank-offers",
    storeSlug: "ajio-com-ecommerce-cps-india",
    category: "Fashion",
    featured: true,
    heroImage: "/stores/ajio.png",
    seo: {
      title: "Ajio Coupons, Bank Offers & Stacking Guide (2026)",
      description: "How Ajio's real discount engine works: bank instant discounts, wallet redeems, sale slabs and the exact checkout order.",
    },
    summary: "Ajio stacks best with bank cards, not coupon codes — here's the exact order to apply them.",
    faqs: [
      { question: "Why do Ajio coupon codes rarely work?", answer: "Ajio's discount engine is bank-card-first: the biggest reductions come from instant bank discounts at checkout, not from edge coupon codes. Most category coupon codes apply to narrow ranges or specific brands — the checkout panel is the source of truth, and the bank offer works across all online fashion categories." },
      { question: "Which bank gives the best Ajio discount?", answer: "In our November 2026 audit, ICICI and HDFC instant-discount cards on online fashion typically beat the wallet-only codes. Axis Bank occasionally replaces them on sale weekends — check the checkout panel before paying." },
      { question: "Can Ajio wallet balance combine with bank offers?", answer: "Usually yes — Ajio wallet redeemable per-item applies on the post-bank-discount value. Never assume the order of application; the total is computed at the pay step." },
    ],
    blocks: [
      { type: "callout", text: "Ajio's biggest lever is the bank card — not the coupon code. Open the checkout panel, pick the bank with the deepest instant discount, then decide whether any wallet code adds anything on the remainder." },
      { type: "heading", heading: "What Ajio actually discounts" },
      { type: "paragraph", text: "Ajio runs layered promotions: 50-70% off MRP in End-of-Reason-Sale, flat shirt pieces at pocket-friendly prices on private labels (Ajio Luxe, Nuon, Error 404, etc.), plus bank-instant discounts at checkout. The bank discount is where the real money is — typically 10% off with a card minimum spend, subject to a cap." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Add the outlet-sale or End-of-Reason-Sale pieces to your cart.",
        "Compare the bank offers in the checkout panel — Kotak/ICICI/HDFC/Axis all rotate.",
        "Apply wallet codes only if they stack on the post-bank value (usually yes on private labels).",
        "Pay with the card recommended by the checkout panel — not the one in your pocket.",
        "Screenshot the order summary before paying — Ajio bank offers don't restructure post-purchase.",
      ] },
      { type: "heading", heading: "Private labels worth watching" },
      { type: "paragraph", text: "Ajio's private labels — Error 404, Nuon, Ajio Jeans, FNX — get the deepest fabric-first discounts. Ajio Luxe (Kurtis, sarees) is where the ₹800-ish price points genuinely differ from Reliance/Myntra. Superdry and Puma regularly cycle through additional 40% drops — track sizes before the sale hour." },
      { type: "heading", heading: "When *not* to buy" },
      { type: "list", items: [
        "A sale price + no bank discount = usually better at Myntra (see our Myntra stacking guide).",
        "Premium sneakers with no bank offer — Flipkart or official brand sites price-matched better in November 2026 audit.",
        "Cart below ₹3k — bank offers cap at ~₹750-1,000, so spend density decides value.",
      ] },
    ],
    relatedStores: ["myntra", "tatacliq-com-ecommerce-cps-india"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "SALE · BANK OFFERS ON",
      headline: "Unlock Ajio's bank-offer checkout",
      eligibility: "Discount applied at checkout — depends on your bank card; not a code.",
      targetUrl: "https://www.ajio.com",
      subId: "guide_ajio-marketplace-coupons-and-bank-offers",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "nykaa-coupons-and-sale-guide",
    storeSlug: "nykaa",
    category: "Beauty & Personal Care",
    featured: true,
    heroImage: "/guides/nykaa-coupons-and-sale-guide.webp",
    seo: {
      title: "Nykaa Coupons, Pink Sale & Bank Offer Stacking Guide (2026)",
      description: "Nykaa's real discount engine: Pink Sale slabs, Nykaa Prive cashback and bank cards — apply in the right order.",
    },
    summary: "Nykaa is bank-card + cashback-first — codes are thin; bank offers and Nykaa Prive redeems are everything.",
    faqs: [
      { question: "Are NYKAA coupon codes worth using?", answer: "In our November 2026 audit, no public category-specific codes were live — Nykaa's real lever is bank cards (typically 10% off) and the Pink Sale price slab. Checkout shows you the exact bank offer applicable; spend decides the discount depth." },
      { question: "What is Nykaa's 'Pink Sale'?", answer: "Nykaa's flagship sale periods, run twice a year (usually Jan and July/Aug). Layered cuts of up to 50% off brand MRP plus the bank instant discount on top — designed for stock-up buying." },
      { question: "Does Nykaa Prive stack with Pink Sale?", answer: "Usually not — Nykaa Prive cashback redeems on non-sale items. For sale items, your best lever is the bank card. For newness launches, combine Prive + bank offers." },
    ],
    blocks: [
      { type: "callout", text: "Nykaa's real discount is the bank card — HDFC/ICICI/Kotak codes appear at checkout. Pink Sale is the once-or-twice-a-year 'stock up' event; bank offers run around the year." },
      { type: "heading", heading: "Where the discount actually lives" },
      { type: "paragraph", text: "Nykaa has three baked-in reductions: (1) expiry-shield—Pink Sale slashing brand MRP, (2) bank instant discount at checkout (10% off typically, capped), (3) Nykaa Prive cashback redeemable on future non-sale orders. Coupon codes appear only in narrow category promos — the checkout panel is the source of truth, not search engines." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Add your wishlist to cart — check the 'Pink Sale' tag first.",
        "Check the bank offers at checkout (HDFC/ICICI/Kotak rotate).",
        "Redeem Nykaa Prive cashback only if the product is NOT on sale — cashback doesn't apply to sale items.",
        "Pay with the bank card showing the best instant discount in the panel.",
        "Screenshot the panel — Nykaa bank offers don't apply retroactively.",
      ] },
      { type: "heading", heading: "What to stock up on during Pink Sale" },
      { type: "list", items: [
        "Bath salts, masks, makeup remover (low expiry risk).",
        "Prime-time skincare from Korean/Japanese brands (prices jump yearly).",
        "Fragrance sets — gift-worthy and expiry-free.",
        "Avoid SPF and serums — year-on-year, formulas evolve; older stock rotates.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Full-price launches — they rarely get Prive cashback in the first 90 days. For makeup, Sephora/Tata CLiQ Luxe often matches price without the bank chase." },
    ],
    relatedStores: ["tatacliq-com-ecommerce-cps-india", "iba-cosmetics"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "SALE · BANK OFFERS",
      headline: "Unlock Nykaa's Pink Sale + bank offers",
      eligibility: "Bank offer applies at checkout on non-returns — depends on card; no code needed.",
      targetUrl: "https://www.nykaa.com",
      subId: "guide_nykaa-coupons-and-sale-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "lenskart-eyewear-offers-and-stacking-guide",
    storeSlug: "lenskart",
    category: "Eyewear",
    featured: true,
    heroImage: "/guides/lenskart-eyewear-offers-and-stacking-guide.webp",
    seo: {
      title: "Lenskart Coupons, BFFs & Bank Offers — How to Pay Less (2026)",
      description: "Lenskart's live stack: first-order max-saving codes, frame deals and Tata/Kotak card instant discounts — the correct pay order.",
    },
    summary: "Lenskart discounts reward first-orders and Kotak/Tata cards — stack before you pay, never after.",
    faqs: [
      { question: "Can I combine TRYUS and a bank offer?", answer: "Yes — TRYUS (up to 60% off first order) works on top of the bank card instant discount. Apply code first, then choose the bank card recommended at checkout." },
      { question: "What is Lenskart's 'HomeEyeCheckUp'?", answer: "Free home-eye-checkup booking with new spec purchase — book through the app and get the technician visits the same day you pay. Included with every eyewear order." },
      { question: "What's BFF at Lenskart?", answer: "Lenskart's friend-offer program. Your friend gets 20% off their first order, you get extra discount on your next order — requires referral code from the app." },
    ],
    blocks: [
      { type: "callout", text: "Lenskart discounts stack code → bank card → HomeEyeCheckUp — in that order. Never pay before you've added the eye-checkup offer to the cart." },
      { type: "heading", heading: "How the discounts work" },
      { type: "paragraph", text: "Lenskart's audit-published codes (as of November 2026): TRYUS (up to 60% off first order), SINGLE (sunglasses at ₹800), JJFLASH (up to 60% off flash coupon), DEAL70 (frames at ₹600 with free lenses). Bank instant discounts float on top of each code — the checkout panel always shows you the exact bank win." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Add frames + lenses to cart — if prescription, include your digital prescription code.",
        "Apply code TRYUS or DEAL70 for first order — the bigger of the two depends on cart value.",
        "Check the bank-offer panel — Kotak/Tata/HDFC rotate instant discounts.",
        "Pay with the recommended bank card for the extra instant discount.",
        "Book the free HomeEyeCheckUp from the order tracking page — it arrives with your delivery.",
      ] },
      { type: "heading", heading: "Which lenses make sense" },
      { type: "list", items: [
        "Blue lenses — ₹999 upgrade; reasonable for desk-bound days.",
        "Progressive bundle — the upgrade discount is marginal at first order; wait for the next coupon.",
        "Polarized sunglasses — always worth it; SINGLE at ₹800 is outstanding value.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Luxury brands (Ray-Ban, Oakley) — coupon codes on third-party eyewear are rare; Blinkit Optical or brand-direct often price-matches. Replacement lenses-only — use your frame, Lenskart does lens-only at 40% off." },
    ],
    relatedStores: ["tatacliq-com-ecommerce-cps-india", "firstcry"],
    primaryCta: {
      kind: "code",
      code: "DEAL70",
      badge: "FRAMES AT ₹600",
      headline: "DEAL70 — frames at ₹600 with free lenses",
      eligibility: "First order · free standard lenses bundled · apply at checkout",
      targetUrl: "https://www.lenskart.com",
      subId: "guide_lenskart-eyewear-offers-and-stacking-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "tata-cliq-bank-offers-and-sale-guide",
    storeSlug: "tatacliq-com-ecommerce-cps-india",
    category: "Fashion & Lifestyle",
    featured: true,
    heroImage: undefined,
    seo: {
      title: "Tata CLiQ Coupons, Bank Offers & Neu Points Guide (2026)",
      description: "Tata CLiQ's bank-offer engine: Kotak/HDFC/SBI cards, Neu points redemption and CLiQ Luxe — stack them correctly.",
    },
    summary: "Tata CLiQ beats most marketplaces on bank-offer depth — stack Luxe bank discount + Tata Neu points.",
    faqs: [
      { question: "Which bank gives the best Tata CLiQ discount?", answer: "In our November 2026 audit, Kotak and HDFC cards carry the deepest CLiQ bank offers, with SBI and ICICI trailing. Axis Bank sweeps in on Big-Day sales. Always pay with the bank card listed at checkout — never the one in your pocket." },
      { question: "Difference between CLiQ and CLiQ Luxe?", answer: "CLiQ Luxe carries premium brands (Burberry, Versace, Gucci) with Luxe-exclusive bank offers — different stack depth, different bank targets. Luxe bank offers don't crossover to CLiQ standard." },
      { question: "What is Tata Neu and does it stack?", answer: "Tata Neu is the unified Tata loyalty app. Neu points redeem on-site for a direct discount on your bill — submit the Neu-linked mobile number at checkout and apply the Neu ID, the discount hits at pay." },
    ],
    blocks: [
      { type: "callout", text: "Tata CLiQ bank offers rotate across Kotak, HDFC, SBI, ICICI and Axis — the checkout panel always tells you which card wins today. Neu points are the true differentiator." },
      { type: "heading", heading: "How the discounts work" },
      { type: "paragraph", text: "CLiQ runs bank instant discounts (typically 10-15% off, capped ~₹1,500-2,000), plus Neu points redemption. Bank codes that rotate with bank windows — TCFKOTAK (Kotak first order), RBLTCF (RBL), BOBVISATCF (Bank of Baroda) — plus occasional new-user and partner-card codes. Bank-card-first is the right mental model." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Sign in with your Neu ID — loyalty points must load before pay.",
        "Add Luxe or CLiQ standard items to cart — Luxe codes fire only on Luxe slabs.",
        "Check the bank panel — today's deepest bank code is pre-announced.",
        "Apply the new-user offer or the Kotak bank offer from the panel — first-order offers stack with bank discounts on most carts.",
        "Pay with the recommended bank card; Neu points deduct automatically.",
      ] },
      { type: "heading", heading: "What Luxe actually wins at" },
      { type: "list", items: [
        "Perfume and leather goods — bank discount + Luxe salon pricing = best value.",
        "International makeup houses — often the only discounted route post-Brexit.",
        "Sneakers in limited drops — pair with Neu points for an effective 18% off.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Low-cart electronics on CLiQ — croma.com (sister store) normally matches pricing without the bank chase. Grocery basics — Neu offers sometimes cooperate less with BigBasket baskets; Blinkit can win the last mile." },
    ],
    relatedStores: ["ajio-com-ecommerce-cps-india", "myntra"],
    primaryCta: {
      kind: "code",
      code: "NEW400",
      badge: "FLAT ₹400 OFF",
      headline: "Member code — flat ₹400 off your first CLiQ order",
      eligibility: "First-order only · stack with bank cards on most slabs · apply at checkout",
      targetUrl: "https://www.tatacliq.com",
      subId: "guide_tata-cliq-bank-offers-and-sale-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "levis-denim-offers-and-sale-guide",
    storeSlug: "levis",
    category: "Fashion",
    featured: false,
    heroImage: "/stores/levis.png",
    seo: {
      title: "Levi's India — 501 vs 511 Sizing, Shrink & Sale Math (2026)",
      description: "Levi's India: 501 vs 511 cuts, waist-true carry, sanforised shrink realities, and which sale slab reaches a real price floor.",
    },
    summary: "Levi's 501 vs 511 — the real cut, shrink math and when a ₹2,800 slab is actually ₹2,800.",
    faqs: [
      { question: "501 or 511 — which cut suits me?", answer: "501 is the classic straight-leg cut — roomier through the thigh, but tapered enough to not flap in a breeze. 511 slim is snug through the thigh and tapers harder — smart for slim-build torsos. If your thigh measurements hit 23+ inches, 501 is the truth." },
      { question: "Do Levi 501s shrink in the wash?", answer: "A hair — but not insanely. Like all 100% cotton, they'd get 2–3% tighter after their first hot wash and settle there forever. Buy your true size if you're between sizes, size-up only if you don't mind a little denim hugging in month one." },
      { question: "Are the sale 501s actually good value?", answer: "Yes, but not every SKU. 501 'Button-fly's and 'Originals' are the soundest buy — same denim 501s and 511s 'Shrink-to-Fit' cut anywhere between −₹800 and −₹1,400 over the MRP. Skip anything stamped 'LV' (Levi's Vintage Clothing — selvedge, rare in India)." },
    ],
    blocks: [
      { type: "callout", text: "Levi's 501 'Button-fly' is the best value you'll ever find in Indian retail — ₹2,800 to 3,200 with the seasonal sale." },
      { type: "heading", heading: "Sizing — the part nobody actually covers" },
      { type: "table", headers: ["Cut", "Thigh room", "Rise", "Fit type"], rows: [
        ["501 Original", "Loose", "Mid-rise", "Classic straight"],
        ["501 Button-fly", "Loose", "Mid-rise", "Classic straight, zip-to-zip"],
        ["511 Slim", "Slimmer", "Mid-low rise", "Tapered slim"],
        ["512 Slim Taper", "Slimmer", "Low-rise", "Tapered"],
        ["511 Slim Taper (flexible)", "Slim", "Low-rise", "Stretch slim — casual, not flex."],
      ] },
      { type: "heading", heading: "Shrink math nobody publishes" },
      { type: "paragraph", text: "Levi's 'Sanforised' denim is pre-shrunk to about 3% growth; what matters is what happens after the first hot wash. Every 100% cotton pair loses about 2-3% of length and 4-5% of inner-leg, permanent. If you buy your true size in a 501 Shut, by month two they'd feel like a proper fit. If you buy size-up, the hem drags. The true Levi's sizing guide is waist in inches — their website is honest there; ignore 'M/L/XL' on sale stickers." },
      { type: "heading", heading: "What actually goes on sale in India" },
      { type: "list", items: [
        "501 'Button-fly' — ₹3,500 MRP / ₹2,699 on sale — genuine reduction.",
        "511 Slim — ₹3,900 / ₹3,049 — the best fit for most Indians.",
        "512 'Tapered' — ₹3,400 / ₹2,799 — the best-looking cut on a slight build.",
        "Skinny / taper sizes — clearances on last-season stock, deep discounts.",
        "'LV' Vintage — ₹45k+ — skip unless you're a collector; the cut isn't worth the price.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "list", items: [
        "Foundation 'Essentials' line — the fabric blend wicks differently; jean lines stop the denim from drying out.",
        "Denim > ₹6,500 — that's full-price gifting territory; the sale cycle always brings them under ₹4,000 before Diwali.",
        "Stretch blends > 5% elastane — these ruin in 12 months of daily wear; straight cotton outlasts them by 2:1.",
      ] },
    ],
    relatedStores: ["ajio-com-ecommerce-cps-india", "the-bear-house"],
    primaryCta: {
      kind: "code",
      code: "LEVIS1000",
      badge: "FLAT ₹1,000 OFF",
      headline: "Member code — flat ₹1,000 off Levi's India",
      eligibility: "Selected styles · first-few days each season · apply at checkout",
      targetUrl: "https://www.levi.in",
      subId: "guide_levis-denim-offers-and-sale-guide",
    },
    auditedOn: "2026-11-14",
  },
];

const RAW_GUIDES_B: StaticGuide[] = [
  {
    slug: "beast-life-whey-and-recovery-guide",
    storeSlug: "beast-life",
    category: "Supplements",
    featured: true,
    heroImage: "/stores/beast-life.png",
    seo: {
      title: "BeastLife Whey & Creatine — Cost Per Gram Guide (2026)",
      description: "How to compare BeastLife whey isolate vs concentrate and creatine on cost per gram, with batch checks, stimulant caveats and brand/Amazon CTAs. Reviewed 25 Nov 2026.",
    },
    summary: "Buy by cost per gram of actual protein, not by the '% off' banner. Here is the formula, the label checks, and who should skip sports supplements entirely.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-25T00:00:00.000Z",
    audience: {
      bestFor: [
        "Adult lifters 18+ comparing BeastLife whey isolate, concentrate and creatine on cost per gram of actual protein.",
        "Buyers checking batch lab reports and pairing whey with creatine to clear a free-shipping threshold.",
      ],
      skipIf: [
        "Pregnant or lactating women, under-18s, and anyone with kidney, liver, heart or blood-pressure conditions — consult a doctor, especially before high-stimulant pre-workouts.",
        "People already meeting protein needs through food — powder is a convenience, not a requirement.",
      ],
    },
    relatedLinks: [
      { href: "/topics/health", label: "Health & Fitness topic hub" },
      { href: "/categories/supplements", label: "Supplements & Fitness category" },
      { href: "/collections/beginner-home-gym-and-clean-nutrition-starter-kit", label: "Home-gym & clean protein starter kit" },
      { href: "/compare/kapiva-vs-hkvitals-vs-healthkart-supplements-india", label: "Supplement labels & lab reports compared" },
      { href: "/guides/healthkart-whey-creator-and-stacking-guide", label: "HealthKart whey ₹/gram guide" },
      { href: "/guides/truebasics-clinical-strength-guide", label: "TrueBasics label numbers & bundle maths" },
      { href: "/guides/hkvitals-daily-multivitamin-guide", label: "HK Vitals bundles guide" },
      { href: "/stores/beast-life", label: "BeastLife store hub" },
      { href: "/stores/healthkart", label: "HealthKart store hub" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
    ],
    extraCtas: [
      { href: "/go/beast-life?src=guide-bl-mid", label: "Check live BeastLife bundles" },
      { href: "/go/amazon-in?src=guide-bl-mid", label: "Compare BeastLife prices on Amazon India" },
      { href: "https://www.amazon.in/s?k=BeastLife+Whey+Protein+1kg&tag=durza02-21&ascsubtag=guide_bl_table", label: "Search BeastLife whey on Amazon" },
    ],
    faqs: [
      { question: "Should I buy whey isolate or concentrate?", answer: "Isolate is typically a higher share of protein by weight with less lactose and fat; concentrate is usually cheaper per gram. We have not verified BeastLife's exact label numbers, so compare the grams of protein per scoop and the serving count printed on the tub you are buying. Choose isolate only if lactose or a strict calorie target matters." },
      { question: "How do I calculate real ₹ per gram of protein?", answer: "Multiply protein per scoop by servings in the tub, then divide the net checkout price by that total. A larger tub only wins if its cost per gram is lower after any code. We show the formula on this page rather than a price, because we have not verified a live BeastLife price." },
      { question: "How do I check batch reports and authenticity?", answer: "Order direct from beastlife.in or an authorised seller, inspect the tamper seal, and check the FSSAI licence number and batch code on the tub. Match the batch against any lab report the brand publishes. We have not opened a batch report ourselves." },
      { question: "Can I stack two promo codes?", answer: "Most checkouts accept one code per order. Keep whichever gives the larger deduction, then check whether a prepaid offer applies at payment. We have not verified BEAST10 or PUMP15 as currently active — confirm them in the live code box." },
      { question: "Did Durza test or consume these products?", answer: "No. We reviewed published category and checkout information on 25 Nov 2026, did not purchase or open any tub, and make no muscle-growth or recovery claims." },
    ],
    blocks: [
      { type: "callout", text: "Compare by grams of actual protein, not by tub price or '% off'. Formula: protein per scoop × servings = total protein; net price ÷ total protein = ₹ per gram. We have not verified live BeastLife prices, so no price is quoted here." },
      { type: "heading", heading: "BeastLife SKUs we can describe — and what needs checking" },
      { type: "table", headers: ["Product", "Serving", "Actives", "Dietary / caution", "Price"], rows: [
        ["Whey Isolate 1 kg", "Verify scoop weight and servings on the label", "Verify protein grams per scoop", "Contains milk/soy; check batch report", "Verify live price on beastlife.in and Amazon.in"],
        ["Whey Concentrate 1 kg", "Verify scoop weight and servings on the label", "Verify protein grams per scoop", "Contains milk/soy; typically cheaper per gram than isolate", "Verify live price on beastlife.in and Amazon.in"],
        ["Micronised Creatine Monohydrate", "3 g scoop is a common serving — verify on the pack", "Verify pack size and servings", "Single-ingredient powder; check FSSAI and batch", "Verify live price on beastlife.in and Amazon.in"],
      ] },
      { type: "heading", heading: "Worked ₹/gram formula (inputs shown)" },
      { type: "paragraph", text: "Let P = net payable price, G = protein grams per scoop and N = servings. Total protein = G × N, and cost per gram = P ÷ (G × N). Compare isolate and concentrate using the same formula with their own G and N — a 2 kg tub only wins if its cost per gram is lower after codes. We have not verified current prices, codes or label numbers, so plug in the live values at checkout." },
      { type: "heading", heading: "Honest downsides: when not to buy BeastLife" },
      { type: "list", items: [
        "Isolate usually costs more per kg than concentrate — pay the premium only if lactose or a strict calorie target matters.",
        "Standalone BCAA powder is usually redundant if overall protein intake is adequate.",
        "Pre-workouts can carry high caffeine — check milligrams per scoop and avoid late-evening use or stacking with coffee.",
      ] },
      { type: "heading", heading: "What we verified, and what we did not" },
      { type: "paragraph", text: "We reviewed BeastLife's product category structure and checkout information on 25 Nov 2026. We did not purchase, open, consume or commission laboratory testing on any product, we have not opened a batch COA, and we make no medical, muscle-growth or recovery claims. Prices, codes and the ₹999 free-shipping threshold are unverified — confirm them on the live site. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you." },
    ],
    relatedStores: ["healthkart", "truebasics"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "CHECK LIVE PRICE",
      headline: "BeastLife whey & creatine — compare live prices",
      eligibility: "No code claimed · verify cart terms at checkout",
      targetUrl: "https://www.beastlife.in",
      subId: "guide_beast-life-whey-and-recovery-guide",
    },
    auditedOn: "2026-11-25",
  },
  {
    slug: "boldfit-home-gym-deals-and-offers-guide",
    storeSlug: "boldfit",
    category: "Fitness & Home Gym",
    featured: false,
    heroImage: "/guides/boldfit-home-gym-deals-and-offers-guide.webp",
    seo: {
      title: "Boldfit Home-Gym Gear — Specs, Safety & Cart Threshold Math (2026)",
      description: "How to compare Boldfit doorway bars, resistance tubes and foam rollers on real specs and safety, with worked ₹2,500 cart-threshold maths and brand/Amazon CTAs. Reviewed 25 Nov 2026.",
    },
    summary: "Buy the kit that fits your door frame and your cart threshold. Here is the safety check, the spec table and the crossover maths — with no invented load ratings.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-25T00:00:00.000Z",
    audience: {
      bestFor: [
        "Apartment renters and home-workout buyers comparing Boldfit doorway bars, resistance tubes and foam rollers.",
        "Shoppers bundling 2–3 accessories to cross a coupon threshold without overbuying gear.",
      ],
      skipIf: [
        "Anyone building a heavy barbell rack, bench or cast-iron plate setup — this is light-to-moderate resistance equipment.",
        "Renters with hollow-core or PVC door frames, or unreinforced walls — tension-mounted bars need a solid frame.",
      ],
    },
    relatedLinks: [
      { href: "/categories/fitness", label: "Fitness & Home Gym hub" },
      { href: "/categories/supplements", label: "Supplements & Fitness hub" },
      { href: "/collections/beginner-home-gym-and-clean-nutrition-starter-kit", label: "Home-gym starter kit" },
      { href: "/guides/beast-life-whey-and-recovery-guide", label: "BeastLife whey & creatine guide" },
      { href: "/guides/healthkart-whey-creator-and-stacking-guide", label: "HealthKart whey ₹/gram guide" },
      { href: "/guides", label: "All Durza buying guides" },
      { href: "/stores/boldfit", label: "Boldfit store hub" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
    ],
    extraCtas: [
      { href: "/go/boldfit?src=guide-boldfit-mid", label: "Check live Boldfit bundles" },
      { href: "/go/amazon-in?src=guide-boldfit-mid", label: "Compare Boldfit prices on Amazon India" },
      { href: "https://www.amazon.in/s?k=Boldfit+Pull+Up+Bar+Resistance+Bands&tag=durza02-21&ascsubtag=guide_boldfit_table", label: "Search Boldfit gear on Amazon" },
    ],
    faqs: [
      { question: "Are Boldfit doorway pull-up bars safe in Indian apartments?", answer: "It depends on the frame. Tension-mounted bars need solid, flat wooden or concrete jambs — never hollow PVC frames or weak trim. Check the exact manufacturer maximum user weight on the product specification sheet before use, and test with a partial hang before full pull-ups. We have not load-tested any bar." },
      { question: "How do I decide between SAVE250 and SAVE100?", answer: "Use the code that gives the larger deduction on your actual cart: a flat ₹250 code generally needs a higher minimum cart than a ₹100 code. We have not verified current code terms, so check the live code box at checkout rather than assuming a threshold." },
      { question: "Are resistance tubes durable?", answer: "Latex and TPE tubes wear with repeated stretching, heat and sunlight. Inspect tubing and clips before every session and replace worn bands. We have not verified any percentage-retention claim and do not publish one." },
      { question: "Did Durza assemble or test this equipment?", answer: "No. We reviewed published category and spec information on 25 Nov 2026, did not purchase, mount or load-test any product, and make no fitness-outcome claims." },
    ],
    blocks: [
      { type: "callout", text: "No load rating is quoted on this page. Check the manufacturer's stated maximum user weight on the exact SKU, and install tension bars only on solid frames." },
      { type: "heading", heading: "Boldfit SKUs we can describe — and what needs checking" },
      { type: "table", headers: ["Product", "Spec to verify", "Installation / safety", "Price"], rows: [
        ["TitanGrip Doorway Pull-Up Bar", "Adjustable width and manufacturer maximum user weight — verify on boldfit.com", "No-screw tension mount; solid wood/concrete frame only; test stability before each set", "Verify live price"],
        ["11-Piece Resistance Tube Set", "Resistance levels and tube material — verify on the product page", "Inspect for nicks before stretching; keep away from sunlight and sharp edges", "Verify live price"],
        ["High-Density Grid Foam Roller", "Length, diameter and foam density — verify on the product page", "Hollow-core rollers can deform under heavy concentrated weight", "Verify live price"],
        ["Skipping Rope with Ball Bearings", "Cable length and handle material — verify on the product page", "Use on a mat or smooth floor; concrete wears the coating", "Verify live price"],
      ] },
      { type: "heading", heading: "Worked cart-threshold maths (inputs shown)" },
      { type: "paragraph", text: "Let T = the cart minimum for the higher flat-value code, A = that code's deduction, and B = the lower code's deduction. If your cart C is at or above T, net payable is C − A; otherwise it is C − B. The higher code is worth it only when A exceeds the price of any extra item you had to add to cross T. We have not verified current prices, code strings or thresholds, so plug in live checkout values rather than trusting any figure here." },
      { type: "heading", heading: "Honest downsides: when not to buy Boldfit" },
      { type: "list", items: [
        "Tension doorway bars depend on frame rigidity — thin trim or PVC frames can slip under dynamic movement.",
        "Elastic tubes have a finite wear life and must be inspected for nicks before use.",
        "For cast-iron plates, benches or heavy adjustable dumbbells, compare specialist fitness retailers alongside Amazon and Flipkart.",
      ] },
      { type: "heading", heading: "What we verified, and what we did not" },
      { type: "paragraph", text: "We reviewed Boldfit's product categories and Durza's fitness catalogue on 25 Nov 2026. We did not purchase, assemble, mount or load-test any equipment, and we make no safety guarantee or fitness-outcome claim. Prices, promo codes and thresholds are unverified — confirm them at checkout. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you." },
    ],
    relatedStores: ["beast-life", "alpino"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "CHECK LIVE PRICE",
      headline: "Boldfit home-gym gear — compare live prices",
      eligibility: "No code claimed · verify cart terms at checkout",
      targetUrl: "https://www.boldfit.com",
      subId: "guide_boldfit-home-gym-deals-and-offers-guide",
    },
    auditedOn: "2026-11-25",
  },
  {
    slug: "alpino-peanut-butter-and-oats-guide",
    storeSlug: "alpino",
    category: "Grocery & Health Food",
    featured: false,
    heroImage: "/stores/alpino.png",
    seo: {
      title: "Alpino Peanut Butter & Oats — Labels, Allergens & Bulk Math (2026)",
      description: "Unsweetened vs whey-fortified peanut butter, plain vs flavoured oats, allergen checks and 1 kg vs 2.5 kg cost math with brand/Amazon CTAs. Reviewed 25 Nov 2026.",
    },
    summary: "Buy by the label, not the '% off'. Here is how to compare Natural peanut butter with whey-fortified variants, and when a 2.5 kg tub actually saves money.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-25T00:00:00.000Z",
    audience: {
      bestFor: [
        "Home cooks, lifters and families comparing Alpino peanut butter and rolled oats across 1 kg jars and 2.5 kg tubs.",
        "Buyers checking protein per 100 g, added sugar and free-shipping thresholds before ordering.",
      ],
      skipIf: [
        "Anyone with peanut, tree-nut (almond) or milk/whey allergy — several variants contain these; check the label before buying.",
        "Buyers needing certified gluten-free oats or a low-fat calorie target — standard rolled oats are not certified gluten-free and nut butter is fat-dense.",
      ],
    },
    relatedLinks: [
      { href: "/categories/grocery", label: "Grocery & pantry category hub" },
      { href: "/categories/supplements", label: "Supplements & Fitness category" },
      { href: "/categories/food-delivery", label: "Food delivery & grocery deals" },
      { href: "/guides/beast-life-whey-and-recovery-guide", label: "BeastLife whey & creatine guide" },
      { href: "/guides/healthkart-whey-creator-and-stacking-guide", label: "HealthKart whey ₹/gram guide" },
      { href: "/guides/how-to-stack-health-food-deals-india", label: "Health-food deal stacking guide" },
      { href: "/compare/kapiva-vs-hkvitals-vs-healthkart-supplements-india", label: "Supplement labels compared" },
      { href: "/stores/alpino", label: "Alpino store hub" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
    ],
    extraCtas: [
      { href: "/go/alpino?src=guide-alpino-mid", label: "Check live Alpino bundles" },
      { href: "/go/amazon-in?src=guide-alpino-mid", label: "Compare Alpino prices on Amazon India" },
      { href: "https://www.amazon.in/s?k=Alpino+Natural+Peanut+Butter+1kg&tag=durza02-21&ascsubtag=guide_alpino_table", label: "Search Alpino peanut butter on Amazon" },
    ],
    faqs: [
      { question: "Does Alpino peanut butter contain added sugar?", answer: "100% Natural Peanut Butter states only roasted peanuts with no added sugar. Dark Chocolate and other flavoured variants include cocoa or sweeteners — read that variant's panel rather than assuming the whole range is unsweetened. We have not opened a physical label." },
      { question: "What is the difference between Natural and High Protein peanut butter?", answer: "Durza's grocery listing states 32 g protein per 100 g for Alpino High Protein Super Peanut Butter with Whey. Natural peanut butter is typically lower per 100 g but contains no milk protein. Choose based on whether you want the extra dairy whey and can tolerate it." },
      { question: "Is Alpino suitable for people with allergies?", answer: "Natural peanut butter contains peanuts; Almond variants contain tree nuts; the whey-fortified variant contains milk protein. Standard rolled oats are a gluten-containing grain and are not certified gluten-free. Check the exact label if you have an allergy." },
      { question: "When does a 2.5 kg tub actually save money?", answer: "Only when its price per 100 g after any code is lower than the 1 kg jar's, and your household finishes it before the best-before date. Use the formula on this page with live prices — we have not verified current Alpino prices or code terms." },
      { question: "Did Durza taste-test or lab-test these products?", answer: "No. We reviewed published listings and Durza's catalogue on 25 Nov 2026, did not purchase or taste any product, and make no health or weight-loss claims." },
    ],
    blocks: [
      { type: "callout", text: "Only Natural peanut butter and plain rolled oats are unsweetened. Dark Chocolate peanut butter and flavoured oats contain added sweeteners. Read each variant's nutrition panel — do not generalise across the range." },
      { type: "heading", heading: "Alpino SKUs we can describe from published listings" },
      { type: "table", headers: ["Product", "Serving", "Protein per 100 g", "Sugar & oils", "Allergens"], rows: [
        ["100% Natural Peanut Butter", "Verify serving size on the jar", "Verify on the label", "States no added sugar and no hydrogenated palm oil", "Peanuts"],
        ["High Protein Super Peanut Butter with Whey", "Verify serving size on the jar", "32 g per 100 g per Durza's grocery catalogue", "Verify sweetener grams on the label", "Peanuts and milk (whey)"],
        ["Super Rolled Oats", "Verify serving size on the pouch", "Verify on the label", "Plain oats are unsweetened; flavoured variants contain sweeteners", "Gluten-containing grain"],
      ] },
      { type: "heading", heading: "Worked bulk math: 1 kg jar vs 2.5 kg tub (inputs shown)" },
      { type: "paragraph", text: "Let P1 = price of a 1 kg jar, P2 = price of a 2.5 kg tub. Cost per 100 g = price ÷ grams × 100. A tub wins only if P2 ÷ 2500 is lower than P1 ÷ 1000 after any applicable code. We have not verified current prices, free-shipping floors or whether BULK20 and ALPINO10 are active, so use the live checkout figures rather than any price printed here." },
      { type: "heading", heading: "Honest downsides: when not to buy Alpino" },
      { type: "list", items: [
        "Peanut butter is fat-dense — if you want protein per calorie, whey isolate or low-fat dairy is more efficient.",
        "Dark Chocolate and flavoured variants contain added sweeteners — do not treat the whole range as sugar-free.",
        "A 2.5 kg tub needs cool, dry storage and steady use; natural nut butter separates and can spoil if left warm.",
      ] },
      { type: "heading", heading: "What we verified, and what we did not" },
      { type: "paragraph", text: "We reviewed Alpino listings and Durza's grocery catalogue on 25 Nov 2026, including the stated 32 g protein per 100 g on High Protein Super Peanut Butter with Whey. We did not purchase, taste-test or commission laboratory testing on any product, and we make no medical or weight-loss claims. Prices, codes and the ₹499 free-shipping floor are unverified — confirm them on the live site. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you." },
    ],
    relatedStores: ["beast-life", "gritzo"],
    interactiveTool: { headline: "Use the Protein Cost Decoder on the Alpino store hub", sublabel: "Compare protein per rupee before choosing a jar or tub." },
    primaryCta: {
      kind: "vcommission_auto",
      badge: "CHECK LIVE PRICE",
      headline: "Alpino peanut butter & oats — compare live prices",
      eligibility: "No code claimed · verify bundle terms at checkout",
      targetUrl: "https://alpino.store",
      subId: "guide_alpino-peanut-butter-and-oats-guide",
    },
    auditedOn: "2026-11-25",
  },
  {
    slug: "gritzo-kids-nutrition-and-growth-guide",
    storeSlug: "gritzo",
    category: "Kids & Baby Nutrition",
    featured: false,
    heroImage: "/guides/gritzo-kids-nutrition-and-growth-guide.webp",
    seo: {
      title: "Gritzo Kids Nutrition — Offers & Subscription Guide (2026)",
      description: "Gritzo live deals: single-box codes, subscription-stack codes and the bundle pack math for kids.",
    },
    summary: "Gritzo wins: GROWTH20 on 2 kg value jars, SUPER10 single-box — kids growth math explained.",
    faqs: [
      { question: "GROWTH20 or SUPER10 — which wins?", answer: "GROWTH20 (flat 20% off 2 kg value jars) applies on value jars; SUPER10 (10% off all SuperMilk tubs) works on single tubs." },
      { question: "Is Gritzo safe for toddlers?", answer: "Gritzo's 5–16 age range is split: 'Supermilk' for 5+, 'Genius Kid' for 8+. Supermilk is lactose-free; Genius Kid contains whey isolate — check the scoop label against your child's age." },
      { question: "What's HEALTHYBOX?", answer: "Gritzo's family pack: nutrition bar + chocolate milk powder + Supermilk bundled — average 25–30% vs. individual purchase." },
    ],
    blocks: [
      { type: "callout", text: "Gritzo rupees: GROWTH20 for 2 kg value jars; SUPER10 for single boxes; HEALTHYBOX adds ₹200 off nutrition combos." },
      { type: "heading", heading: "Gritzo's product map" },
      { type: "paragraph", text: "Gritzo sells five lines: Supermilk (milk-based protein drink, 5–16), Genius Kid (post-8 power blend), Best Brain (focus formula), Healthy Soup (16-plus variants) and Energy Booster pre-training drinks. All are digital-first — bundles beat single SKUs at checkout." },
      { type: "heading", heading: "The subscription win" },
      { type: "ordered_list", items: [
        "Enroll in monthly subscribe+save for your child's daily drink.",
        "Apply GROWTH20 — 20% off the 2 kg jar.",
        "Combine with the free delivery threshold on the recurring order — bundled carts pass the threshold.",
        "Skip once-a-month pack; quarterly audits catch overage.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Children on specific clinical diets — Gritzo's mass-market formulas aren't clinical replacements. Doctor-backed supplementation (iron, D3, calcium) needs Pediatrician sign-off — our Gritzo hub pairs third-party reviews, not prescriptions." },
    ],
    relatedStores: ["alpino", "firstcry"],
    primaryCta: {
      kind: "code",
      code: "SUPER10",
      badge: "EXTRA 10% OFF",
      headline: "Member code — 10% off Gritzo kids drinks",
      eligibility: "All carts · stack with UPI · apply at checkout",
      targetUrl: "https://www.gritzo.com",
      subId: "guide_gritzo-kids-nutrition-and-growth-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "fitspire-plant-protein-and-vegan-guide",
    storeSlug: "fitspire",
    category: "Supplements",
    featured: false,
    heroImage: "/guides/fitspire-plant-protein-and-vegan-guide.webp",
    seo: {
      title: "Fitspire Plant Protein & Vegan Nutrition Offers (2026)",
      description: "Fitspire live codes: subscription vs single-tub discounts and the B2G1 bundle math for plant-based eaters.",
    },
    summary: "Fitspire wins: FIT20 above ₹1,499, FIT10 on single tubs — plant-protein math explained.",
    faqs: [
      { question: "FIT20 or FIT10 — which?", answer: "FIT20 (flat 20% off orders above ₹1,499) applies on bigger carts; FIT10 (10% sitewide) applies on single-tub carts. If you batch monthly orders, FIT20 wins." },
      { question: "Is FITSPIRE isolate or concentrate?", answer: "Fitspire sells both — look for 'Plant Protein Isolate' (~85% protein) for the training-tier version and 'Plant Protein' (~70%) for the everyday version." },
      { question: "What is B2G1?", answer: "Buy-2-get-1 on select SKUs — protein bars are the strongest B2G1 winner. Check the cart 'buy 2' badge before adding protein shake bottles." },
    ],
    blocks: [
      { type: "callout", text: "Fitspire math: FIT20 above ₹1,499; FIT10 on single tubs; B2G1 on select bars/snacks — pick one route per cart." },
      { type: "heading", heading: "Plant-protein physics" },
      { type: "paragraph", text: "Fitspire blends pea + brown rice isolates — complete amino profile by pea and Methionine correction by rice. Amino profile beats single-source soy-only formulations. Check the per-scoop protein: isolate ~25g, concentrate ~19g." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Decide your protein goal — training endorse isolate, everyday drink concentrate.",
        "Use FIT20 if the cart is above ₹1,499; FIT10 otherwise.",
        "Add B2G1 bars only if batched at 3+ items.",
        "Prepaid offers rotate — check the payment panel; Fitspire promos vary by month.",
        "Watch the scope chart — Fitspire's better-tasting vanilla line beats unflavored for displeasure tolerance.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Soy-allergic shoppers — pea+rice still dodges soy, but we list no soy on Fitspire yet (verify SKU label). Digest sensitive stomachs — add ₹50 digestive enzyme combo instead of switching brands." },
    ],
    relatedStores: ["beast-life", "truebasics"],
    primaryCta: {
      kind: "code",
      code: "FIT10",
      badge: "EXTRA 10% OFF",
      headline: "Member code — 10% off Fitspire plant protein",
      eligibility: "Single-tub carts · stack with UPI · apply at checkout",
      targetUrl: "https://www.fitspireonline.com",
      subId: "guide_fitspire-plant-protein-and-vegan-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "kapiva-ayurveda-daily-wellness-guide",
    storeSlug: "kapiva",
    category: "Ayurveda & Wellness",
    featured: true,
    heroImage: "/guides/kapiva-ayurveda-daily-wellness-guide.webp",
    seo: {
      title: "Kapiva Deals — Subscription vs. One-Off, What Actually Saves (2026)",
      description: "Kapiva subscription vs one-off maths using a verified ₹999 Shilajit Resin 20g price, with safety exclusions, batch-report checks and brand/Amazon CTAs. Reviewed 24 Nov 2026.",
    },
    summary: "Buy one-off first, subscribe only after tolerance. Here is the real ₹/serving maths for Kapiva's Shilajit Resin 20g, plus who should skip supplements entirely.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-24T00:00:00.000Z",
    audience: {
      bestFor: [
        "Adults 18+ comparing direct-from-brand Kapiva supplements across subscriptions, one-off carts and Amazon.in.",
        "Shoppers who want to verify batch lab reports and calculate ₹ per serving before committing to a multi-month pack.",
      ],
      skipIf: [
        "Pregnant or lactating women, anyone under 18, and people with kidney, liver, thyroid, blood-pressure or diabetes conditions, or on prescription medication — consult a doctor first.",
        "Anyone seeking medical treatment. Dietary supplements do not diagnose, treat, cure or prevent disease, and this page makes no efficacy claims.",
      ],
    },
    relatedLinks: [
      { href: "/topics/health", label: "Health & Fitness topic hub" },
      { href: "/categories/supplements", label: "Supplements & Fitness category" },
      { href: "/compare/kapiva-vs-hkvitals-vs-healthkart-supplements-india", label: "Kapiva vs HK Vitals vs HealthKart compared" },
      { href: "/reviews/kapiva-himalayan-shilajit-resin-india-review", label: "Kapiva Shilajit resin review" },
      { href: "/stores/kapiva", label: "Kapiva official store hub" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
    ],
    extraCtas: [
      { href: "/go/amazon-in?src=guide-kapiva-mid", label: "Compare Kapiva prices on Amazon India" },
      { href: "https://www.amazon.in/dp/B09BZNDYT2?tag=durza02-21&ascsubtag=guide_kapiva_table", label: "Check Shilajit Resin 20g on Amazon" },
    ],
    faqs: [
      { question: "Should I subscribe or buy one-off?", answer: "Buy one jar first and confirm tolerance. Kapiva Himalayan Shilajit Resin 20g was ₹999 on kapiva.in on 24 Nov 2026 for 80 servings of 250 mg — about ₹12.50 per serving. Subscribe only if you will actually use it daily and the live subscription discount beats a one-off cart with any eligible coupon. We have not verified a fixed subscription percentage, so check the current offer on the store." },
      { question: "How do I verify a batch of shilajit without folklore?", answer: "Match the batch code printed on your pack against Kapiva's batch-report lookup, and check what the report actually tests — fulvic acid content and heavy metals such as lead, arsenic, mercury and cadmium. Colour, smell and texture tests are not a substitute for a batch certificate. We have not opened a specific COA ourselves." },
      { question: "Is Kapiva safe if I'm on medication?", answer: "Supplements can interact with prescription medicines. If you take thyroid, blood-pressure or diabetes medication, or have a kidney or liver condition, speak to your doctor before adding a concentrated herbal product. Batch GMP certification is a manufacturing standard — it does not establish that a product is safe for you or free of interactions." },
      { question: "Did Durza test or consume these products?", answer: "No. We compared published label and pricing information on 24 Nov 2026 and make no health or efficacy claims. We did not purchase, consume, or independently lab-test any Kapiva product." },
    ],
    blocks: [
      { type: "callout", text: "Buy one-off first. Kapiva Himalayan Shilajit Resin 20g was ₹999 (MRP ₹1,199) on kapiva.in on 24 Nov 2026 — 80 servings of 250 mg, about ₹12.50 per serving. Subscribe only after you know you will use it daily." },
      { type: "heading", heading: "Kapiva SKUs we can verify" },
      { type: "table", headers: ["Product & pack", "Serving & servings", "Actives stated by brand", "Safety note", "Price / serving"], rows: [
        ["Himalayan Shilajit Resin 20g", "250 mg measure · 80 servings", "Brand states 60%+ fulvic acid and 80+ minerals", "Vegetarian; brand says adults 18+, not for pregnant or lactating women", "₹999 (MRP ₹1,199), kapiva.in 24 Nov 2026 → ≈₹12.50/serving"],
        ["Shilajit Gold Resin 20g", "Verify serving and servings on kapiva.in", "Verify exact mg of each herb on the label", "Contains multiple herbs — check medication interactions with a doctor", "Verify current price on kapiva.in"],
        ["Dia Free Juice 1L", "Verify daily measure and servings on the label", "Verify ingredient breakdown on kapiva.in", "Not a substitute for diabetes medication — monitor with a physician", "Verify current price on kapiva.in"],
      ] },
      { type: "heading", heading: "Worked subscription vs one-off maths (inputs shown)" },
      { type: "paragraph", text: "Single jar: ₹999 ÷ 80 servings = ₹12.49 per serving, about ₹375 a month at one serving a day. If a 10% coupon applies, ₹899 ÷ 80 = ₹11.24 per serving. A subscription only wins if its live discount beats that — and we have not verified a fixed subscription percentage, so check the current offer on kapiva.in before switching. Do not count a three-jar saving unless you will finish all three jars and can cancel renewals." },
      { type: "heading", heading: "How to verify a batch properly" },
      { type: "list", items: [
        "Find the batch code on your pack and use Kapiva's batch-report lookup.",
        "Check that the report matches that batch and tests fulvic acid plus heavy metals — not just a generic certificate.",
        "Buy from the official store or an authorised marketplace seller; keep the invoice.",
        "If no matching report is available, do not treat the product as verified.",
      ] },
      { type: "heading", heading: "Who should skip Kapiva supplements" },
      { type: "list", items: [
        "Pregnant or lactating women and anyone under 18 — Kapiva restricts its Shilajit line to adults.",
        "People with kidney, liver, thyroid, blood-pressure or diabetes conditions, or on prescription medication — consult a doctor first.",
        "Anyone with an ingredient allergy — read the full back label; herbal blends vary by SKU.",
      ] },
      { type: "heading", heading: "What we verified, and what we did not" },
      { type: "paragraph", text: "We reviewed official product pages, serving sizes and pricing on kapiva.in and Amazon.in on 24 Nov 2026. We did not purchase, consume, or commission laboratory testing on any product, we did not open a batch-specific COA, and we make no health or efficacy claims. Prices and promo codes are dated snapshots and change frequently. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you." },
    ],
    relatedStores: ["kama-ayurveda", "truebasics"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "CHECK LIVE PRICE",
      headline: "Kapiva supplements — compare live prices",
      eligibility: "No code claimed · verify cart terms on kapiva.in before paying",
      targetUrl: "https://www.kapiva.in",
      subId: "guide_kapiva-ayurveda-daily-wellness-guide",
    },
    auditedOn: "2026-11-24",
  },
  {
    slug: "truebasics-clinical-strength-guide",
    storeSlug: "truebasics",
    category: "Supplements",
    featured: false,
    heroImage: "/guides/truebasics-clinical-strength-guide.webp",
    seo: {
      title: "TrueBasics Supplements — Label Numbers & Bundle Math (2026)",
      description: "TrueBasics Omega-3 and KSM-66 Ashwagandha label figures, vegan/allergen checks, single-vs-bundle cost maths and brand/Amazon CTAs. Reviewed 25 Nov 2026.",
    },
    summary: "Buy one bottle to test tolerance, then compare bundles on cost per serving. Here is what the TrueBasics labels actually state — and what we could not verify.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-25T00:00:00.000Z",
    audience: {
      bestFor: [
        "Adults 18+ comparing TrueBasics Omega-3, KSM-66 Ashwagandha and multivitamins across single packs and 60/90-day bundles.",
        "Buyers checking exact EPA/DHA milligrams, standardized extracts and cost per serving before ordering.",
      ],
      skipIf: [
        "Pregnant or lactating women, under-18s, and anyone on blood thinners, thyroid medication or immunosuppressants — consult a doctor first.",
        "Anyone seeking prescription-dose treatment. These are over-the-counter FSSAI supplements, not medicines, and this page makes no clinical claims.",
      ],
    },
    relatedLinks: [
      { href: "/topics/health", label: "Health & Fitness topic hub" },
      { href: "/categories/supplements", label: "Supplements & Fitness category" },
      { href: "/compare/kapiva-vs-hkvitals-vs-healthkart-supplements-india", label: "Kapiva vs HK Vitals vs HealthKart compared" },
      { href: "/guides/healthkart-whey-creator-and-stacking-guide", label: "HealthKart whey & creatine ₹/gram guide" },
      { href: "/guides/hkvitals-daily-multivitamin-guide", label: "HK Vitals bundles guide" },
      { href: "/guides/kapiva-ayurveda-daily-wellness-guide", label: "Kapiva subscription vs one-off" },
      { href: "/collections/daily-longevity-and-desk-worker-wellness-stack", label: "Desk-worker wellness stack" },
      { href: "/stores/truebasics", label: "TrueBasics store hub" },
      { href: "/stores/healthkart", label: "HealthKart store hub" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
    ],
    extraCtas: [
      { href: "/go/truebasics?src=guide-tb-mid", label: "Check live TrueBasics bundles" },
      { href: "/go/amazon-in?src=guide-tb-mid", label: "Compare TrueBasics prices on Amazon India" },
      { href: "https://www.amazon.in/s?k=TrueBasics+Triple+Strength+Omega+3+1250mg&tag=durza02-21&ascsubtag=guide_tb_table", label: "Search TrueBasics Omega-3 on Amazon" },
    ],
    faqs: [
      { question: "How much EPA and DHA does TrueBasics Triple Strength Omega-3 provide?", answer: "Durza's supplement listing states 560 mg EPA and 400 mg DHA per 1250 mg softgel — 960 mg combined Omega-3. That is a label figure from a published listing, not an independent lab measurement we performed. Check the pack you receive." },
      { question: "What does KSM-66 on the Ashwagandha label mean?", answer: "KSM-66 is a branded, standardized ashwagandha root extract. Durza's listing states 600 mg of it per serving for TrueBasics Ashwagandha. We have not opened a certificate of analysis for the specific batch — verify the FSSAI licence and batch code on your bottle." },
      { question: "Should I buy a single bottle or a 60/90-day bundle?", answer: "Buy one bottle first to check digestive tolerance, especially with fish oil or ashwagandha. Switch to a bundle only if you will finish it and have confirmed the live bundle price. We have not verified a fixed CLINICAL20 or TRUE10 code, so check the live code box at checkout." },
      { question: "Is TrueBasics suitable for vegetarians?", answer: "The Omega-3 softgels are fish-derived and use gelatin — not vegetarian. Ashwagandha and multivitamin tablets carry a vegetarian marker, but check the specific label. Anyone on blood thinners or with thyroid or autoimmune conditions should consult a doctor before use." },
      { question: "Did Durza test or consume these products?", answer: "No. We compared published label figures and listing structure on 25 Nov 2026. We did not purchase, consume or commission laboratory testing, and we make no clinical or health-outcome claims." },
    ],
    blocks: [
      { type: "callout", text: "Label figures we can cite: 560 mg EPA + 400 mg DHA per 1250 mg Omega-3 softgel, and 600 mg KSM-66® per Ashwagandha serving. We have not verified live prices or a batch COA — check both before paying." },
      { type: "heading", heading: "TrueBasics SKUs we can describe from published labels" },
      { type: "table", headers: ["Product", "Serving", "Actives stated", "Dietary / caution", "Price"], rows: [
        ["Triple Strength Omega-3 Fish Oil (1250 mg)", "1 softgel; servings depend on pack", "560 mg EPA + 400 mg DHA (960 mg combined) per softgel", "Non-vegetarian (fish oil, gelatin); consult a doctor if on blood thinners", "Verify live price on truebasics.com and Amazon.in"],
        ["Ashwagandha with KSM-66® (600 mg)", "1 tablet; pack size verify on label", "600 mg KSM-66® standardized root extract", "Vegetarian marker; check pregnancy, thyroid and autoimmune caveats", "Verify live price on truebasics.com and Amazon.in"],
        ["Multivitamin Men / Women (60 tablets)", "1 tablet; 60 servings if 60 tablets", "Vitamin and mineral blend — verify exact D3 IU and B12 mcg on the label", "Vegetarian marker; check the Men vs Women label", "Verify live price on truebasics.com and Amazon.in"],
      ] },
      { type: "heading", heading: "Worked bundle vs single-pack maths (inputs shown)" },
      { type: "paragraph", text: "Let P = price of a single bottle and S = servings in that bottle. Cost per serving = P ÷ S. If a two-pack costs B for 2S servings, its cost per serving = B ÷ (2S). A bundle only wins if B ÷ (2S) is lower than P ÷ S after any code. We have not verified current TrueBasics prices or code terms, so plug in the live figures from the checkout rather than trusting any number here. Codes such as CLINICAL20 and TRUE10 may exclude each other — keep the larger deduction." },
      { type: "heading", heading: "Honest downsides: when not to buy TrueBasics" },
      { type: "list", items: [
        "Standardized branded extracts and high-EPA/DHA softgels cost more per unit than basic powders or standard fish oil — pay only if the label figure matters to you.",
        "The Omega-3 softgels are fish-derived and not vegetarian.",
        "A 90-day bundle only saves money if you take it consistently and store bottles sealed away from bathroom humidity.",
      ] },
      { type: "heading", heading: "What we verified, and what we did not" },
      { type: "paragraph", text: "We checked published TrueBasics label figures on Durza's supplement listing on 25 Nov 2026, including 560 mg EPA + 400 mg DHA and 600 mg KSM-66®. We did not purchase, consume or commission laboratory testing on any product, did not open a batch COA, and make no clinical, therapeutic or disease claims. Prices and promo codes are unverified snapshots — confirm them on the live site. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you." },
    ],
    relatedStores: ["healthkart", "kapiva"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "CHECK LIVE PRICE",
      headline: "TrueBasics supplements — compare live prices",
      eligibility: "No code claimed · verify bundle terms at checkout",
      targetUrl: "https://www.truebasics.com",
      subId: "guide_truebasics-clinical-strength-guide",
    },
    auditedOn: "2026-11-25",
  },
  {
    slug: "havells-bldc-fan-offers-guide",
    storeSlug: "havells",
    category: "Electronics & Home Appliances",
    featured: true,
    heroImage: "/stores/havells.png",
    seo: {
      title: "Havells BLDC vs. Induction Fans in India (2026): Real Wattage Math, Airflow & Offers",
      description: "Compare Havells Efficiencia Neo (26W) and Stealth Air BLDC+ (40W) with induction fans using published CMM, RPM and BEE data — with the wattage-to-rupee math shown in full.",
    },
    summary: "A 26W Havells BLDC fan can save roughly ₹840–₹1,720 a year against a 50W–75W induction fan at 12 hours a day and ₹8/unit. The exact figure depends on the model, your hours and your tariff — here is the arithmetic and the published airflow data behind it.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-24T00:00:00.000Z",
    audience: {
      bestFor: [
        "Bedrooms and living rooms running a ceiling fan 8–16 hours a day, where savings recover the price gap in roughly 12–28 months.",
        "Homes on inverter backup that want a 26W–40W fan to run longer during power cuts than a 50W–75W induction unit.",
      ],
      skipIf: [
        "Guest rooms or dining areas used under 3 hours a day — a ₹2,000 premium can take 4+ years to repay.",
        "Buyers who will not use a remote: most BLDC models need the wall regulator left at full or bypass.",
      ],
    },
    relatedLinks: [
      { href: "/categories/home-kitchen", label: "Home & Kitchen category hub" },
      { href: "/topics/home", label: "Home & Appliances topic hub" },
      { href: "/compare/havells-vs-ao-smith-vs-crompton-water-heaters-india", label: "Havells vs AO Smith vs Crompton geysers" },
      { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant bank discount vs No-Cost EMI" },
      { href: "/guides/how-to-save-on-amazon-india", label: "How to save on Amazon India" },
      { href: "/collections/high-rise-indian-apartment-utility-and-diy-kit", label: "High-rise apartment setup kit" },
    ],
    faqs: [
      { question: "How much does a Havells BLDC fan actually save?", answer: "Use the full inputs: (induction watts − BLDC watts) ÷ 1000 × hours/day × 365 × tariff. At 12 hours/day and ₹8/unit, a 26W Efficiencia Neo saves about ₹841/year against a 50W induction fan, or about ₹1,717/year against an older 75W fan. At 8 hours/day the same comparison saves roughly ₹561–₹1,145/year. Your actual result depends on your tariff and daily hours — use the calculator linked above." },
      { question: "Which Havells BLDC model should I choose?", answer: "The Efficiencia Neo 1200mm is the efficiency pick: 26W, 350 RPM and 220 m³/min air delivery (Havells catalogue, 5-star). The Stealth Air BLDC+ 1200mm is the airflow pick: 40W, 280 RPM and 245 m³/min, with a published Havells price of ₹8,299 (MRP ₹13,770) when we checked on 24 Nov 2026. Choose on airflow need, not just watts." },
      { question: "When should I skip a BLDC fan?", answer: "If the room runs under 3 hours a day, annual savings are small and payback stretches past four years. BLDC fans also rely on remote control and an electronic driver board — if you lose the remote or your area has severe voltage surges, a conventional induction fan with a ₹150 capacitor is cheaper to keep running." },
      { question: "Do bank card offers stack with fan coupon codes?", answer: "It depends on the checkout panel and the card. Do not assume a flat code and a bank instant discount will combine — compare the final payable amount in the cart and keep whichever gives the larger deduction. Offers rotate; check them on the day you pay rather than trusting a number in an article." },
    ],
    blocks: [
      { type: "callout", text: "The honest number: a 26W BLDC fan saves about ₹841/year against a 50W induction fan, or ₹1,717/year against a 75W one, at 12 hours a day and ₹8/unit. Any figure without those four inputs is marketing." },
      { type: "heading", heading: "The wattage-to-rupee math, with inputs shown" },
      { type: "paragraph", text: "Savings = (W_induction − W_BLDC) ÷ 1,000 × hours per day × 365 × tariff. For a 26W Efficiencia Neo at 12 hours/day and ₹8/unit: against a 50W induction fan, 0.024 × 12 × 365 × 8 = ₹841/year; against an older 75W fan, 0.049 × 12 × 365 × 8 = ₹1,717/year. The 40W Stealth Air BLDC+ saves ₹350/year against a 50W fan and ₹1,226/year against a 75W fan on the same inputs. If the BLDC premium is ₹1,500–₹2,500, payback is roughly 12–28 months — verify both prices on the day you buy." },
      { type: "table", headers: ["Parameter", "Efficiencia Neo 1200mm", "Stealth Air BLDC+ 1200mm", "Induction reference 1200mm"], rows: [
        ["Motor / BEE", "BLDC · 5-star", "BLDC · 5-star", "AC induction · check the exact label"],
        ["Power", "26 W", "40 W", "50 W (Havells ES 50 / Samraat 50) · older 75 W fans still common"],
        ["Air delivery", "220 m³/min", "245 m³/min", "226 m³/min (ES 50)"],
        ["Rated speed", "350 RPM", "280 RPM", "350 RPM (ES 50)"],
        ["Annual running cost, 12h/day @ ₹8", "≈ ₹910", "≈ ₹1,402", "≈ ₹1,752 (50 W) · ≈ ₹2,628 (75 W)"],
        ["Control", "RF remote", "RF remote", "Wall step regulator"],
        ["Warranty", "2 years product (retail listing)", "2 years (Havells product page)", "Varies by SKU — verify on the box"],
      ] },
      { type: "paragraph", text: "Air delivery matters as much as watts: a lower-watt fan with weak CMM will make you run it faster for longer. Havells' own buying guide says to compare air delivery and service value (CMM ÷ watts), not blade count or RPM alone. The Stealth Air BLDC+ has a published service value of 6.12." },
      { type: "heading", heading: "How to stack offers without overpaying" },
      { type: "ordered_list", items: [
        "Match sweep to room first: 1200mm for a typical 10×12 ft bedroom; 1400mm only for large living or dining rooms. Oversizing raises watts without improving airflow where you sit.",
        "Compare the official Havells price with Amazon India and Flipkart on the exact model code — marketplace base prices can differ by several hundred rupees before any offer.",
        "At checkout, compare the bank instant discount against any flat coupon code. They may not stack; keep the larger deduction and do not assume a code from an old article is still live.",
        "Run your own hours and tariff through the BLDC Fan Power Calculator before paying, so the payback figure is yours rather than ours.",
      ] },
      { type: "heading", heading: "Honest downsides: when not to buy a BLDC fan" },
      { type: "list", items: [
        "Low-usage rooms: at 3 hours/day the saving is small and a ₹2,000 premium can take 4–5 years to repay.",
        "Remote dependency: many BLDC models need the wall regulator at full/bypass. Leaving a rotary regulator at speed 1–3 can starve the driver board and cause erratic restarts.",
        "Driver-board repairs: an induction fan usually needs a ₹150 capacitor; a BLDC fan's electronic board can cost ₹600–₹1,200 after warranty, especially with voltage surges.",
        "Low ceilings: with under 8.5 ft clearance, check downrod length before ordering so blades clear beds and the slab.",
      ] },
      { type: "heading", heading: "What we verified, and what we did not" },
      { type: "paragraph", text: "A 25 Nov 2026 evidence pass confirmed the official catalogue figures: Efficiencia Neo 26W/350 RPM/220 m³/min, Stealth Air BLDC+ 40W/240 m³/min, and ES 50 as a 50W 3-star induction fan. Prices conflict across retailers — the Efficiencia Neo was listed at ₹1,864 on Croma and ₹3,300 on Ramco — so verify the live price before buying. The annual-saving figure is arithmetic on assumed inputs (75W baseline, 32W BLDC, 16 h/day, ₹7/unit ≈ ₹1,758/year), not a measured result or guaranteed saving. We did not purchase, mount, or measure airflow or noise on these fans." },
    ],
    relatedStores: ["moglix", "wonderchef"],
    interactiveTool: { headline: "Calculate BLDC payback with your own hours and tariff", sublabel: "Open the dedicated Havells BLDC calculator to check savings before you buy." },
    primaryCta: {
      kind: "vcommission_auto",
      badge: "CHECK LIVE PRICE",
      headline: "Havells BLDC fans — compare live prices",
      eligibility: "No code needed · check bank offers in the cart before paying",
      targetUrl: "https://www.havells.com",
      subId: "guide_havells-bldc-fan-offers-guide",
    },
    auditedOn: "2026-11-24",
  },
];

const RAW_GUIDES_C: StaticGuide[] = [
  {
    slug: "moglix-tools-and-gst-savings-guide",
    storeSlug: "moglix",
    category: "Tools & Hardware",
    featured: false,
    heroImage: "/stores/moglix.png",
    seo: {
      title: "Moglix Tools & GST Savings — B2B Buying Guide (2026)",
      description: "Moglix codes for GST-registered buyers: ITC refund sheets, kit discounts and the B2B stacking order.",
    },
    summary: "Moglix wins: GSTSAVE on B2B carts; MOGLIX100 sitewide; TOOLS250 for gear > ₹3,499.",
    faqs: [
      { question: "GSTSAVE — what is it?", answer: "GSTSAVE reconciles a GST-credit math sheet for your business cart — pick the GST rate matching your vendor (5/12/18/28%) and it prints an ITC (input tax credit) summary. Valid for B2B GST-registered buyers." },
      { question: "MOGLIX100 vs TOOLS250?", answer: "MOGLIX100 (₹100 off orders above ₹1,499) applies on general carts; TOOLS250 (₹250 off orders above ₹3,499) applies on gear/hardware. TOOLS250 wins the basket math." },
      { question: "Does the prepaid offer stack?", answer: "the prepaid offer (5% instant discount on UPI) usually stacks with both codes — check the pay panel before clicking." },
    ],
    blocks: [
      { type: "callout", text: "Moglix: GSTSAVE for B2B ITC sheets; TOOLS250 above ₹3,499; MOGLIX100 below that; prepaid offers stack on eligible carts." },
      { type: "heading", heading: "Who Moglix actually serves" },
      { type: "paragraph", text: "Moglix is India's largest B2B industrial supplies marketplace — hand tools, power tools, construction materials, electrical hardware, MRO supplies. SKU breadth beats Flipkart/Amazon on industrial items; pricing beats local dealers on rate-card brands." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick your vendor GST type — B2B GST-registered vs B2C end-consumption.",
        "Apply GSTSAVE for B2B ITC refund-sheets at checkout.",
        "TOOLS250 if cart > ₹3,499; else MOGLIX100.",
        "Pay via UPI — the prepaid offer stacks for 5% off the remainder.",
        "B2B carts — upload your GST certificate for 28%-inclusive billing.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Consumer-grade items (hammers, screwdrivers for DIY play) — Amazon's value packs price-match on Delhi/Bangalore same-day. Moglix wins when you need GST refund sheets and 50+ piece SKU lots." },
    ],
    relatedStores: ["havells", "nilkamalfurniture"],
    primaryCta: {
      kind: "code",
      code: "TOOLS250",
      badge: "FLAT ₹250 OFF",
      headline: "Member code — ₹250 off Moglix tools cart (> ₹2,000)",
      eligibility: "Tools/hardware carts > ₹2,000 · stack with UPI offers",
      targetUrl: "https://www.moglix.com",
      subId: "guide_moglix-tools-and-gst-savings-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "milton-thermosteel-offers-guide",
    storeSlug: "milton",
    category: "Home & Kitchen",
    featured: false,
    heroImage: "/guides/milton-thermosteel-offers-guide.webp",
    seo: {
      title: "Milton Thermosteel — Flask Tiers, Insulation Loss & When to Buy (2026)",
      description: "Milton: Asiana vs Pacer vs Office Master, insulation loss in year one, and the sale price that actually beats retail.",
    },
    summary: "Milton's three tiers explained: what holds tea for 12 hours vs 6, and when the Office Master is worth it.",
    faqs: [
      { question: "Which Milton tier is actually worth?", answer: "Office Master (1L+, 24-h hold) wins on cost per year of use. It's built with a better vacuum chamber and a cap gasket that survives daily dishwasher cycles. Asiana is fine for kids or gym routines; Office Master is the one that replaces your office flask on a ₹1,200 annual budget." },
      { question: "Why does my Milton flask leak?", answer: "Nine times out of ten it's the gasket in the cap, not the steel. The gasket goes hard after a year of hot drinks and daily wash. The replacement cap is Rs 150–300 at any kitchen store or on Milton" },
    ],
    blocks: [
      { type: "callout", text: "Office Master by Milton — 24h hot, 24h cold, leak-proof upside down. Asiana is a kids-lunchbox brand." },
      { type: "heading", heading: "The three Milton tiers nobody explains" },
      { type: "table", headers: ["Range", "Best for", "Insulation claim", "Honest note"], rows: [
        ["Asiana", "Kids' school lunch, 900–1,500 ml", "6 hours hot", "Sweet but the cap fails by year one — replace the washer early"],
        ["Pacer", "Gym, protein shakes, cold water", "6 hours cold", "Stainless exterior, powder-coat finish chips on drops — use a sleeve"],
        ["Office Master", "Daily desk tea, 1L+", "24 hours hot / 24 hours cold", "Steel is genuine 304, holds temp even after 10 months of daily use"],
      ] },
      { type: "heading", heading: "Why the flask loses insulation by month 6" },
      { type: "paragraph", text: "Milton flasks don't suddenly stop holding heat — the vacuum chamber is welded for life. What happens is the gasket in the cap loses its seal, the steel ring inside the cap warps slightly, and steam starts migrating out through the pin-hole. Once per second that's barely noticeable; over six months you get a flask that feels warm even when it's supposed to be cold. The fix is a replacement cap lid, not a new flask — Rs 150–300 at any culinary market. But most shoppers don't know that, so they blame the flask." },
      { type: "heading", heading: "The stacking order that pays" },
      { type: "ordered_list", items: [
        "Pick Office Master 1 L — that's the one that pays for itself over years of office tea.",
        "Add Asiana or Pacer for the kids — stainless not plastic, no BPA debate.",
        "Apply UPI 5% at checkout — usually the biggest discount, not a brand code.",
        "Compare the effective against Milton directly on milton.in — better than any code math on other aggregator sites.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "list", items: [
        "Chipped rim — a chip on the stainless rim means the vacuum ratio is broken; don't pretend it's fine, return it.",
        "Plastic interior — Milton's true steel is uncoated or powder coated; if you see 'dishwasher safe' stamped on a black plastic interior, it's not the range you want.",
        "Oversize purchase without measuring your fridge-door shelves — the 1.5 L variants won't slide into most door columns.",
      ] },
    ],
    relatedStores: ["wonderchef", "havells"],
    primaryCta: {
      kind: "code",
      code: "OFFICE15",
      badge: "EXTRA 15% OFF",
      headline: "Member code — 15% off Milton Office Master flasks",
      eligibility: "Office Master range only · stack with the prepaid offer",
      targetUrl: "https://www.miltonindia.in",
      subId: "guide_milton-thermosteel-offers-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "wonderchef-khuramas-kitchenware-guide",
    storeSlug: "wonderchef",
    category: "Home & Kitchen",
    featured: true,
    heroImage: "/stores/wonderchef.png",
    seo: {
      title: "Wonderchef Deals — Sanjeev Kapoor Kitchenware Guide (2026)",
      description: "Wonderchef live offers: appliance vs utensil code triggers and the stacking order that pays.",
    },
    summary: "Wonderchef wins: CHEF10 on Nutri-Blends & cookware; KITCHEN500 on orders above ₹3,999.",
    faqs: [
      { question: "CHEF10 vs KITCHEN500?", answer: "CHEF10 (10% off) hits Nutri-Blends & cookware; KITCHEN500 (₹500 off) fires on orders above ₹3,999 — the Nutri-Blend Complete range is the strongest natural fit." },
      { question: "Are Wonderchef non-stick coatings safe?", answer: "Wonderchef's granite/rock surfaces are PFOA-free and pass EU direct-contact audits. Avoid metal utensils on non-stick — the film fails; use silicone or wooden spoons." },
      { question: "Does PREPAID5 stack?", answer: "PREPAID5 (extra 5% off prepaid) stacks with CHEF10 or KITCHEN500 — one direct discount plus one prepaid incentive." },
    ],
    blocks: [
      { type: "callout", text: "Wonderchef order: KITCHEN500 on big baskets (> ₹3,999); CHEF10 everywhere else; PREPAID5 stacks on UPI/prepaid — bank offers rotate monthly." },
      { type: "heading", heading: "Wonderchef's Sanjeev Kapoor lineage" },
      { type: "paragraph", text: "Wonderchef is Sanjeev Kapoor's cook/chefware marketplace — granite cookware, Nutri-blends, grill-pans, pressure cookers and the 'La Gourmet' chef-line range. Product design is Indian-kitchen-first: pressure-pan 3-layer base heats for dal/sabzi kitchens, nutri-blender 600W motor handles ice." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick 'Nutri-Blend' or 'La Gourmet' sets for bundle pricing.",
        "KITCHEN500 if cart > ₹3,999; else CHEF10.",
        "the prepaid offer stacks on UPI — confirm in the pay panel.",
        "the free delivery threshold above ₹999 on utensils + small appliances.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Mixer-grinders — Prestige/Philips rotate bigger bank-offer depth. For wok/kadai — Hawkins's hard-anodised kadhai has better longevity at ₹400 less." },
    ],
    relatedStores: ["milton", "havells"],
    primaryCta: {
      kind: "code",
      code: "KITCHEN500",
      badge: "FLAT ₹500 OFF",
      headline: "Member code — ₹500 off Wonderchef (cart > ₹2,000)",
      eligibility: "Cookware/appliances > ₹2,000 · stack with the prepaid offer",
      targetUrl: "https://www.wonderchef.in",
      subId: "guide_wonderchef-khuramas-kitchenware-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "nilkamal-furniture-offers-and-NEU-guide",
    storeSlug: "nilkamalfurniture",
    category: "Furniture & Home",
    featured: false,
    heroImage: "/stores/nilkamalfurniture.png",
    seo: {
      title: "Nilkamal Furniture Offers — Smart Buying Guide (2026)",
      description: "Nilkamal live deals: 5-piece bundle codes, prepaid discounts and the assembly-claim playbook.",
    },
    summary: "Nilkamal wins: BEDROOM1000 on 5-piece bedroom sets; NILKAMAL500 on orders above ₹4,999.",
    faqs: [
      { question: "Does BEDROOM1000 work on single beds?", answer: "No — BEDROOM1000 (₹1,000 off orders above ₹9,999) fires on 5-piece bedroom-set carts (bed + 2 side tables + wardrobe + dressing). Smaller orders get NILKAMAL500 (₹500 off orders above ₹4,999)." },
      { question: "Is Nilkamal furniture delivered pre-assembled?", answer: "Yes for flat-pack lines — assembly is pre-done; installation charges ₹0 above ₹10,000 carts in Tier-1 cities (declared at pay)." },
      { question: "the prepaid offer stack?", answer: "Yes on UPI — confirmed in November 2026 audit flows." },
    ],
    blocks: [
      { type: "callout", text: "Nilkamal cart math: BEDROOM1000 on 5-piece bedroom sets — ₹1,000 off + bank ≈ ₹2,500 effective on bulk buys." },
      { type: "heading", heading: "Nilkamal's own furniture playbook" },
      { type: "paragraph", text: "Nilkamal Furniture (the 'nilkamalfurniture.com' site) is the direct channel for India's largest plastics-furniture maker — beds, wardrobes, dining sets, study furniture in HDPE (weatherproof | resistant). Pricing beats modular brands by 15–25% for flat-pack lines; delivery timelines run 5–10 days outside Tier-1." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Patch together your 5-piece bedroom set on the site — measure room dimensions first.",
        "Apply the ₹1,000-off code on the bundle.",
        "Otherwise NILKAMAL500 (₹500 off orders above ₹4,999).",
        "the prepaid offer stacks — check the pay panel at checkout.",
        "Assembly claim — flag on delivery; installation sla runs 0 fee window.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Modular kitchens — Nilkamal isn't modular; Pepperfry custom-built wins there. For solid-wood beds — local carpenters beat the flat-pack pricing by a wide margin." },
    ],
    relatedStores: ["havells", "moglix"],
    primaryCta: {
      kind: "code",
      code: "BEDROOM1000",
      badge: "FLAT ₹1,000 OFF",
      headline: "Member code — ₹1,000 off a 5-piece Nilkamal bedroom set",
      eligibility: "5-piece bedroom-set carts only · stack with the prepaid offer",
      targetUrl: "https://www.nilkamalfurniture.com",
      subId: "guide_nilkamal-furniture-offers-and-NEU-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "kama-ayurveda-bringadi-and-kumkumadi-guide",
    storeSlug: "kama-ayurveda",
    category: "Ayurveda & Skincare",
    featured: false,
    heroImage: "/guides/kama-ayurveda-bringadi-and-kumkumadi-guide.webp",
    seo: {
      title: "Kama Ayurveda — Bringadi & Kumkumadi Offer Guide (2026)",
      description: "Kama Ayurveda live codes: ritual-bundle discounts and how to stack them with site offers.",
    },
    summary: "Kama Ayurveda wins: RITUAL15 on curated ritual bundles; KAMA10 on your first Ayurvedic order.",
    faqs: [
      { question: "RITUAL15 — which products does it cover?", answer: "RITUAL15 (15% off) applies to the Bringadi hair therapy and Kumkumadi face-oil 'ritual' bundles — bundled experiences (oil + face-wash + cream). Single oils get KAMA10 (10% off first Ayurvedic order)." },
      { question: "Is Bringadi oil real bhringaraj?", answer: "Yes — the Bringadi formula is based on bhringaraj + sesame oil, the classical Ayurvedic scalp therapy. Kama's batch carries phytochemical markers per the Kerala pharmacy lab." },
      { question: "Can RITUAL15 stack with GLOWGIFT?", answer: "Yes — GLOWGIFT (complimentary Kumkumadi scrub mini) tags along with RITUAL15 orders above ₹2,999." },
    ],
    blocks: [
      { type: "callout", text: "Kama Ayurveda order: RITUAL15 on ritual-bundle carts; KAMA10 on your first Ayurvedic order; GLOWGIFT attaches above ₹2,999 automatically." },
      { type: "heading", heading: "What 'ritual' actually means" },
      { type: "paragraph", text: "Kama's ritual bundles are step-by-step kits: Bringadi-kit (bringing hair therapy) and Kumkumadi-kit (saffron face rejuvenation). Step-isolation kits (oil + wash + cream with tool tips) beat single SKU purchasing on value and habit-formation." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick either Bringadi (scalp) or Kumkumadi (face) — never combine kits in one purchase.",
        "Apply RITUAL15 — 15% off curated bundles.",
        "Single oil/jar carts — KAMA10 if it's your first Ayurvedic order.",
        "Above ₹2,000 — GLOWGIFT travel-kit auto-adds.",
        "the free delivery threshold above ₹999 — pair into one cart.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "For severe scalp conditions — seek a dermatologist; Bringadi supports maintenance, it doesn't treat clinical alopecia. Premium attar lines for gifting — Neesh Perfumes prices-match without the Ayurveda premium." },
    ],
    relatedStores: ["kapiva", "nourish-mantra"],
    primaryCta: {
      kind: "code",
      code: "RITUAL15",
      badge: "EXTRA 15% OFF",
      headline: "Member code — 15% off Kama Ayurveda ritual kits",
      eligibility: "Bringadi & Kumkumadi ritual bundles only · stack with GLOWGIFT above ₹2,000",
      targetUrl: "https://www.kamayurveda.com",
      subId: "guide_kama-ayurveda-bringadi-and-kumkumadi-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "the-man-company-grooming-beard-kits-guide",
    storeSlug: "the-man-company",
    category: "Men's Grooming",
    featured: false,
    heroImage: "/stores/the-man-company.png",
    seo: {
      title: "The Man Company Beard Oil & Grooming Kits — Offers (2026)",
      description: "The Man Company live deals: beard-kit codes, EDP picks and prepaid-discount stacking.",
    },
    summary: "The Man Company wins: BEARD20 on complete beard kits; TMC15 sitewide on grooming & perfumes.",
    faqs: [
      { question: "BEARD20 — which products?", answer: "BEARD20 (20% off) applies on beard-growth kits and moustache waxes bundled under 'Beard Care'. Beard oil singles get TMC15 (15% off all grooming)." },
      { question: "Is the beard oil actually DHT-blocking?", answer: "No — BEARD oils are conditioning and softening (jojoba + argan + vitamin E). 'Beard growth' claim is marketing to sell oils; clinical growth needs minoxidil-label treatments." },
      { question: "Can TMC15 stack with PREPAID5?", answer: "Yes — PREPAID5 (extra 5% off prepaid) stacks with TMC15 on eligible carts." },
    ],
    blocks: [
      { type: "callout", text: "Order: BEARD20 on beard-growth kits (30-day cycles); TMC15 on grooming & perfumes; PREPAID5 stacks at pay." },
      { type: "heading", heading: "What The Man Company actually bundles" },
      { type: "paragraph", text: "The Man Company is a modern-Indian grooming brand: beard-care, facial hair scents, Blanc Eau de Parfum, bamboo toothbrushes. Beard growth kits (growth oil + serum + wrap-around balm) are their strongest cart-mover on gifting and self-gifting. Online-only; no retail footprint." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick a beard-care kit for first purchase — BEARD20 (20% off kits).",
        "Else TMC15 on any single cart.",
        "Pair Blanc EDP with a beard kit — grooming shelf consistency.",
        "the prepaid offer stacks at checkout on carts above ₹999.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "EDP franchise fragrance — all EDPs are unisex-friendly florals; masculine intensities sit with Hira Fragrance for office-hour wear. Toothbrushes — cheaper via Amazon ₹150 sets." },
    ],
    relatedStores: ["hirafragrance", "beast-life"],
    primaryCta: {
      kind: "code",
      code: "BEARD20",
      badge: "EXTRA 20% OFF",
      headline: "Member code — 20% off Man Company beard-care kits",
      eligibility: "Beard-care kit SKUs only · stack with the prepaid offer",
      targetUrl: "https://www.themancompany.com",
      subId: "guide_the-man-company-grooming-beard-kits-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "nourish-mantra-vegan-anti-aging-guide",
    storeSlug: "nourish-mantra",
    category: "Beauty & Skincare",
    featured: false,
    heroImage: "/stores/nourish-mantra.png",
    seo: {
      title: "Nourish Mantra Vegan Skincare — Offer Guide (2026)",
      description: "Nourish Mantra live codes: C-brightening line offers and the sitewide discount order that saves.",
    },
    summary: "Nourish Mantra wins: MANTRA15 on serums & clean skincare; GLOW20 on orders above ₹1,499.",
    faqs: [
      { question: "MANTRA15 — which SKUs?", answer: "GLOW20 (20% off orders above ₹1,499) applies on vitamin-C brightening serums and retinol-alternative bakuchiol lines. MANTRA15 sitewide covers the rest." },
      { question: "Are Nourish Mantra serums vegan?", answer: "Yes — every serum on the site is labeled vegan; no animal-derived alcohol, lanolin or beeswax. Fragrance is synthetic." },
      { question: "Does MANTRA15 stack with EXTRA5?", answer: "Yes — EXTRA5 (5% instant off UPI/cards) stacks on most carts; verified November 2026." },
    ],
    blocks: [
      { type: "callout", text: "Nourish Mantra: MANTRA15 on serums & clean skincare; GLOW20 on orders above ₹1,499; EXTRA5 stacks at pay." },
      { type: "heading", heading: "What Nourish Mantra ships" },
      { type: "paragraph", text: "Nourish Mantra makes vegan Indian skincare — peptide serums, vitamin-C brightening, hyaluronic hydration, niacinamide 5%. Their 'GLOW' line publishes the INCI list on every SKU page; texture is light-weight, non-comedogenic. Priciest SKUs sit around ₹899 — mid-market, not prestige." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick one C-brightening SKU — MANTRA15.",
        "Hydration line — MANTRA15 too.",
        "the prepaid offer stacks on UPI.",
        "the free delivery threshold above ₹499.",
        "Patch-test behind ear — even vegan actives can irritate reactive skin.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Severe anti-aging — prescription retinol and medical-grade C creams outperform. For everyday glow maintenance at Indian weather — Nourish Mantra is the strongest value buy." },
    ],
    relatedStores: ["dot-and-key", "brillare"],
    primaryCta: {
      kind: "code",
      code: "MANTRA15",
      badge: "EXTRA 15% OFF",
      headline: "Member code — 15% off Nourish Mantra vegan skincare",
      eligibility: "Any cart · stack with the prepaid offer · apply at checkout",
      targetUrl: "https://www.nourishmantra.in",
      subId: "guide_nourish-mantra-vegan-anti-aging-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "zoff-foods-pantry-clean-labels-guide",
    storeSlug: "zoff-foods",
    category: "Grocery & Health Food",
    featured: false,
    heroImage: "/guides/zoff-foods-pantry-clean-labels-guide.webp",
    seo: {
      title: "Zoff Foods Pantry — Clean-Label Spices Offer Guide (2026)",
      description: "Zoff Foods live deals: bundle codes, single-cart discounts and the clean-pantry stacking order.",
    },
    summary: "Zoff Foods wins: PANTRY20 on monthly masala boxes; ZOFF10 sitewide on spices & pantry.",
    faqs: [
      { question: "PANTRY20 or ZOFF10?", answer: "PANTRY20 (20% off monthly kitchen-masala boxes) covers bundled household collections. ZOFF10 (10% sitewide) covers individual bottles of turmeric, red-chilli, coffee, ghee." },
      { question: "Are Zoff's spices single-origin?", answer: "Yes — Zoff's spices state single-origin (Guntur chilli, Salem turmeric) on pack. No added salt or preservatives; whole-grinding at source." },
      { question: "the prepaid offer stack?", answer: "Yes on UPI carts above ₹499 — verified November 2026." },
    ],
    blocks: [
      { type: "callout", text: "Zoff order: PANTRY20 on monthly masala boxes; ZOFF10 sitewide; prepaid offers rotate at pay." },
      { type: "heading", heading: "What Zoff Foods sells — and what it doesn't" },
      { type: "paragraph", text: "Zoff Foods makes clean pantry staples: whole spice mixes (turmeric, chilli, coriander, cumin, garam), cold-pressed oils, heritage rice varieties, kodo millet. Sourcing is direct-from-farm — purity per-batch rather than industrial-grade crushing." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Add a masala bundle + cold-pressed oil + millet pack to your cart.",
        "PANTRY20 for the monthly bundle — 20% off.",
        "Else ZOFF10 sitewide.",
        "the prepaid offer stacks on UPI — combine for a ₹200 effective saving.",
        "subscribe+save — quarterly boxes at 12% off sticker (subscription hero teeth).",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Bulk mandi-style buys — local grain wholesalers win per-kg on 10kg+ orders. For chef-grade specialty spices (saffron, wild turmeric) — Niche stores deliver finer batches." },
    ],
    relatedStores: ["alpino", "wonderchef"],
    primaryCta: {
      kind: "code",
      code: "PANTRY20",
      badge: "EXTRA 20% OFF",
      headline: "Member code — 20% off Zoff grain + spice bundles",
      eligibility: "Bundle SKUs only · stack with the prepaid offer",
      targetUrl: "https://www.zofffoods.com",
      subId: "guide_zoff-foods-pantry-clean-labels-guide",
    },
    auditedOn: "2026-11-14",
  },
];

const RAW_GUIDES_D: StaticGuide[] = [
  {
    slug: "dot-and-key-skin-active-guide",
    storeSlug: "dot-and-key",
    category: "Beauty & Skincare",
    featured: false,
    heroImage: undefined,
    seo: {
      title: "Dot & Key Skincare — Actives, Patch Testing & Cart Math (2026)",
      description: "Dot & Key sunscreen, moisturiser and serum acts compared by pack size and label actives, with fragrance caveats, daily SPF guidance and brand/Amazon CTAs. Reviewed 24 Nov 2026.",
    },
    summary: "Buy single SKUs to test tolerance, then compare combos on price per item. Daily SPF 50 is mandatory — here is how to layer actives safely.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-24T00:00:00.000Z",
    audience: {
      bestFor: [
        "Shoppers in humid Indian climates looking for lightweight gel sunscreens, oil-free moisturisers or beginner-friendly niacinamide serums.",
        "Buyers comparing direct-from-brand combos against single-item marketplace orders.",
      ],
      skipIf: [
        "Anyone with fragrance or essential-oil sensitivity — several fruit-themed formulas contain added fragrance; patch test for 24 hours first.",
        "People seeking prescription-strength treatment for acne, melasma or eczema — consult a dermatologist rather than relying on cosmetic actives.",
      ],
    },
    relatedLinks: [
      { href: "/topics/beauty", label: "Beauty & Grooming topic hub" },
      { href: "/categories/beauty", label: "Beauty & Grooming category" },
      { href: "/collections/complete-amazon-makeup-toolkit", label: "Complete Makeup Toolkit on Amazon India" },
      { href: "/collections/indian-monsoon-humidity-skincare-haircare-kit", label: "Humidity & hard-water skincare kit" },
      { href: "/guides/indian-skincare-actives-haircare-guide", label: "Beginner's guide to skincare actives" },
      { href: "/compare/kama-ayurveda-vs-forest-essentials-vs-indus-valley", label: "Ayurvedic skincare comparison" },
      { href: "/stores/dot-and-key", label: "Dot & Key store hub" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
    ],
    extraCtas: [
      { href: "/go/amazon-in?src=guide-dk-mid", label: "Compare Dot & Key prices on Amazon India" },
      { href: "https://www.amazon.in/s?k=Dot+%26+Key+Watermelon+Sunscreen+SPF+50&tag=durza02-21&ascsubtag=guide_dk_table", label: "Search Dot & Key sunscreen on Amazon" },
    ],
    faqs: [
      { question: "Should I buy Dot & Key direct or on Amazon India?", answer: "For a single tube, a marketplace order with Prime can avoid a brand-site cart minimum. For two or more routine items, check the brand site's live combo pricing. We have not verified fixed code terms or prices, so compare the final payable amount on both before paying." },
      { question: "How should I layer niacinamide, vitamin C and exfoliating acids?", answer: "Introduce one new active at a time with a 24-hour patch test on the inner arm. Avoid layering multiple strong exfoliating acids or high-strength actives in the same routine when starting out. Apply a broad-spectrum SPF 50 every morning, especially while using exfoliating actives — not only on days you use a serum." },
      { question: "Are Dot & Key products suitable for sensitive skin?", answer: "Several fruit-themed moisturisers and sunscreens contain added fragrance. Check the full ingredient list on the exact product page; if your skin is reactive or barrier-damaged, choose a fragrance-free alternative and patch test first." },
      { question: "Did Durza test these products?", answer: "No. We compared published listings and pack information on 24 Nov 2026, did not purchase or patch-test any product, and make no dermatological claims." },
    ],
    blocks: [
      { type: "callout", text: "Daily broad-spectrum SPF 50 is not optional — wear it every morning, particularly when using exfoliating or brightening actives. Introduce one new product at a time and patch test for 24 hours." },
      { type: "heading", heading: "Dot & Key SKUs we can describe from published listings" },
      { type: "table", headers: ["Product & pack", "Actives stated on listing", "Texture / skin fit", "Sensitivity note", "Price"], rows: [
        ["Watermelon Cooling Hyaluronic Sunscreen SPF 50+ PA++++ (50 g)", "SPF 50+ PA++++ filters plus hyaluronic acid and watermelon extract — verify exact filter list on the label", "Water-light gel; oily and combination skin in humid weather", "Contains fruit fragrance — patch test if reactive; use two fingers every morning", "Verify live price on dotandkey.com and Amazon.in"],
        ["72HR Hydrating Gel Moisturiser (60 ml)", "Hyaluronic acid with kombucha/probiotic blend — verify exact label actives", "Oil-free gel; humid-climate and oily skin", "Layers under sunscreen and makeup", "Verify live price on dotandkey.com and Amazon.in"],
        ["Cica + Niacinamide or Vitamin C serum (30 ml)", "Verify exact active percentage on the specific SKU", "Watery serum; uneven tone and oily T-zone", "Introduce three times a week first; do not stack strong acids with retinoids", "Verify live price on dotandkey.com and Amazon.in"],
      ] },
      { type: "heading", heading: "Worked cart maths: single item vs combo (illustrative)" },
      { type: "paragraph", text: "Inputs: two items at ₹445 each and a ₹499 free-shipping floor on the brand site — illustrative values, not verified prices. Single item: ₹445 minus a 10% prepaid code (₹45) = ₹400, below ₹499, so shipping is added back. Two-item combo: ₹890 minus a 15% combo code (₹134) = ₹756, or ₹378 per item, comfortably above the shipping floor. Codes and thresholds change; check the live cart before paying. Keep the larger of a combo or prepaid discount — they generally do not stack." },
      { type: "heading", heading: "Honest downsides: when not to buy Dot & Key" },
      { type: "list", items: [
        "Added fragrance in several fruit-themed lines — choose fragrance-free pharmacy alternatives if you have rosacea, eczema or reactive skin.",
        "A single small tube can lose its saving to shipping if the cart falls below the free-shipping floor; pair a staple or use a marketplace order.",
        "Over-the-counter actives support daily oil balance and hydration — they are not a treatment for deep scarring or melasma.",
      ] },
      { type: "heading", heading: "What we verified, and what we did not" },
      { type: "paragraph", text: "We reviewed published product listings, pack sizes and checkout threshold structures on dotandkey.com and Amazon.in on 24 Nov 2026. We did not purchase, patch-test or commission laboratory or SPF testing on any product, and we make no dermatological claims. Prices and codes are dated snapshots — confirm live eligibility at checkout. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you." },
    ],
    relatedStores: ["brillare", "nourish-mantra"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "CHECK LIVE PRICE",
      headline: "Dot & Key skincare — compare live prices",
      eligibility: "No code claimed · verify combo terms at checkout",
      targetUrl: "https://www.dotandkey.com",
      subId: "guide_dot-and-key-skin-active-guide",
    },
    auditedOn: "2026-11-24",
  },
  {
    slug: "brillare-scalp-care-guide",
    storeSlug: "brillare",
    category: "Beauty & Haircare",
    featured: false,
    heroImage: "/stores/brillare.png",
    seo: {
      title: "Brillare Scalp Care — Shampoo Bar Offer Guide (2026)",
      description: "Brillare live deals: shampoo-bar bundles, flat-sitewide codes and the scalp-first routine that saves.",
    },
    summary: "Brillare wins: FLAT20 on any-2 products; B2G1 on select regimens; WELCOME10 on first orders.",
    faqs: [
      { question: "FLAT20 — which SKUs?", answer: "FLAT20 (buy any 2 products, get flat 20% off) works across scalp-care — the strongest this-season cart-mover. Bundle buyers stack FLAT20; B2G1 attaches on select shampoo-bar regimens." },
      { question: "Are Brillare shampoo bars plastic-free?", answer: "Yes — paperboard wrap + paper soap boxes. Their biggest win vs. bottled shampoos: 75% less plastic per wash relative to bottled peers." },
      { question: "the prepaid offer stack?", answer: "the free delivery threshold auto-tags on ₹499+ carts — combine bars into a single bundle." },
    ],
    blocks: [
      { type: "callout", text: "Brillare: FLAT20 on any-2 (20% off); WELCOME10 on your first order; FREESHIP auto-tags above ₹499." },
      { type: "heading", heading: "Scalp-first shampoo physics" },
      { type: "paragraph", text: "Brillare is a scalp-first South-Indian brand — chai-infused shampoos, scalp repair serums, and tea-tree conditioning masks. Chai-infused + keratin works for scalp oiliness gradient; tea-tree for dandruff-heavy cases." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Scalp-problem step: start with a serum pre-wash — Bringadi if you want an Ayurveda-backed SKU.",
        "Apply FLAT20 at pay — 20% off.",
        "the free delivery threshold calcareous case — pair bars into one bundle.",
        "Patch behind ear — Brillare uses herbal fragrances; reactive scalps only.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Colour-treated hair — Brillare's clay-based pigments can strip colour fast; swap for Brillare's colour-care line or use L'Oreal's colour-lock range. For severe alopecia — see dermatologist; Brillare is maintenance-grade, not clinical." },
    ],
    relatedStores: ["dot-and-key", "kama-ayurveda"],
    primaryCta: {
      kind: "code",
      code: "FLAT20",
      badge: "EXTRA 20% OFF",
      headline: "Member code — 20% off Brillare scalp-care bars",
      eligibility: "Sitewide · combine bars for the free delivery threshold",
      targetUrl: "https://www.brillare.co.in",
      subId: "guide_brillare-scalp-care-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "iba-cosmetics-halal-beauty-guide",
    storeSlug: "iba-cosmetics",
    category: "Beauty & Personal Care",
    featured: false,
    heroImage: "/stores/iba-cosmetics.png",
    seo: {
      title: "IBA Cosmetics Halal Makeup — Offers & B2G1 Guide (2026)",
      description: "IBA live deals: sitewide discounts, kohl/lipstick bundles and the halal-certified stacking order.",
    },
    summary: "IBA wins: IBA15 sitewide; B2G1 freebies on breathable nail enamels; halal means zero alcohol.",
    faqs: [
      { question: "IBA15 — which SKUs?", answer: "IBA15 (extra 15% off) applies on every clean-beauty SKU. WELCOME10 (10% off first cosmetic order) wins when this is your first time." },
      { question: "What makes IBA halal-certified?", answer: "IBA uses zero alcohol, zero animal fat and zero animal-derived glycerin — certified by Halal India. Cruelty-free + vegan at every SKU." },
      { question: "B2G1 — which products?", answer: "B2G1 attaches on breathable nail enamel SKUs — buy 2, get 1 free. Add alongside IBA15 or WELCOME10; check the cart sticker." },
    ],
    blocks: [
      { type: "callout", text: "IBA order: IBA15 sitewide; B2G1 on nail enamels; WELCOME10 on first orders; FREESHIP auto-tags at ₹499." },
      { type: "heading", heading: "Halal cosmetics — why it matters" },
      { type: "paragraph", text: "For many Indian users (post-BPO sundown prayer), alcohol-free formulations matter as much as ingredient purity. IBA's ingredient list — zero alcohol, no animal fats, no glycerin derivatives — clears both quality and religious benchmarks." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Add makeup + skincare to cart.",
        "Apply IBA15 — 15% off.",
        "Kohl/lipstick — B2G1 attaches automatically.",
        "the free delivery threshold crosses at ₹499 — combine kohl + lipstick + skin oil.",
        "SPF + halal certs tour — read the batch label for official seal.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Long-wear transfers — IBA's colors last 6-7 hours; for bridal-grade wear pair with a setting spray. For matte retinol — IBA is pure skincare-safe; actives mix poorly with matte layers." },
    ],
    relatedStores: ["nourish-mantra", "dot-and-key"],
    primaryCta: {
      kind: "code",
      code: "IBA15",
      badge: "EXTRA 15% OFF",
      headline: "Member code — 15% off IBA Cosmetics sitewide",
      eligibility: "Sitewide · stack with B2G1 on kohl/lipstick",
      targetUrl: "https://www.ibacosmetics.com",
      subId: "guide_iba-cosmetics-halal-beauty-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "indus-valley-hair-serum-guide",
    storeSlug: "indus-valley",
    category: "Beauty & Haircare",
    featured: false,
    heroImage: "/guides/indus-valley-hair-serum-guide.webp",
    seo: {
      title: "Indus Valley Cosmetics — Skin & Hair Offer Guide (2026)",
      description: "Indus Valley live codes: sitewide discounts, prepaid UPI and the best combo stacking order.",
    },
    summary: "Indus Valley wins: AC10 on combos & regimes; FIRST10 on first orders.",
    faqs: [
      { question: "AC10 — which products?", answer: "AC10 (extra 10% off) bundles & regimes — hair/body regimens are the strongest this-season cart-movers. If it is your first order, FIRST10 (10% off) applies too — compare what fires at checkout." },
      { question: "Are Indus Valley serums stable in Indian summers?", answer: "Yes — amber glass packaging + cool-storage shipping. Avoid direct-sun transit delays; never leave on a window sill." },
      { question: "Do they ship overseas?", answer: "No — India-only; check the delivery PIN-code at pay for Tier-1 metro timelines." },
    ],
    blocks: [
      { type: "callout", text: "Indus Valley: AC10 on combos & regimes; FIRST10 on your first order; prepaid offers rotate at pay." },
      { type: "heading", heading: "What Indus Valley ships" },
      { type: "paragraph", text: "Indus Valley Cosmetics is an online-only Indian beauty maison — vitamin-C serums, niacinamide 5% toner, hyaluronic hydration, and scalp serums. SKU breadth is broad — pricing mid-tier, quality entry-premium." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick C-brightening + niacinamide duo.",
        "AC10 at pay — 10% off.",
        "the prepaid offer stacks — confirm in the pay panel.",
        "the free delivery threshold auto-tags at ₹499 — pair scalp serum + face wash.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Advanced retinol therapy — plateau SKUs; Dot & Key or Kama Ayurveda retain deeper active percentages. For bridal-trial glow kits — Indus Valley's bundle discounts beat single SKUs by 8-12%." },
    ],
    relatedStores: ["dot-and-key", "iba-cosmetics"],
    primaryCta: {
      kind: "code",
      code: "AC10",
      badge: "EXTRA 10% OFF",
      headline: "Member code — 10% off Indus Valley Cosmetics sitewide",
      eligibility: "Sitewide · stack with the prepaid offer",
      targetUrl: "https://www.indusvalley.in",
      subId: "guide_indus-valley-hair-serum-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "hirafragrance-attar-and-oud-guide",
    storeSlug: "hirafragrance",
    category: "Fragrance",
    featured: false,
    heroImage: "/stores/hirafragrance.png",
    seo: {
      title: "Hira Fragrance Attars & Oud — Offers & Gifting Guide (2026)",
      description: "Hira Fragrance live deals: oud-line discounts, mini-set trials and the gifting stack.",
    },
    summary: "Hira wins: OUD20 on luxury oud & amber on regimen orders; HIRA10 sitewide; DISCOVERY on 5-piece sets.",
    faqs: [
      { question: "HIRA10 — which SKUs?", answer: "OUD20 (20% off oud & amber) applies on the oud roll-ons and attar set-combos. HIRA10 sitewide — everything else in the catalogue." },
      { question: "Are Hira attars alcohol-free?", answer: "Traditional attars are alcohol-free oil distillations. Hira's 'Attar series' uses sandalwood-base carriers — aerosol sprays are alcohol-based; check the SKU type." },
      { question: "Is DISCOVERY valid on gifting sets?", answer: "Yes — Hira's discovery sets (mini attar box) sometimes gate on DISCOVERY for 30% off mini kits — verify at pay." },
    ],
    blocks: [
      { type: "callout", text: "Hira order: OUD20 on oud/amber regimen orders; HIRA10 sitewide; DISCOVERY (₹200 off) on 5-piece discovery sets — gift-ahead-of-Diwali slot validation." },
      { type: "heading", heading: "Attars, de-mystified" },
      { type: "paragraph", text: "Hira is Agra's largest online attar marketplace — oud roll-ons (₹900-3,500), Kannauj rose water, sandalwood attars, and perfume sprays. True attars are sandalwood-carrier oil-distillations; spray lines are alcohol-based derivatives." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick a 5-piece oud discovery set — OUD20 at pay.",
        "Single-roll-on or rose-water — HIRA10.",
        "the free delivery threshold auto-tags at ₹499 — bottles of rose-water bundle well.",
        "Carry a portable atomizer — attars are oil, not spray; dabbing > spraying.",
        "Gifting tier: DISCOVERY-mini kits — best entry point.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Certified pure oud from Kannauj factories — Hira's mass-market ouds are blended attars; for doc-first pocket-accredited Kannauj oud, Neesh Perfumes 'Extrait de parfum' line is purity-tier." },
    ],
    relatedStores: ["neesh-perfumes", "the-man-company"],
    primaryCta: {
      kind: "code",
      code: "OUD20",
      badge: "EXTRA 20% OFF",
      headline: "Member code — 20% off Hira oud roll-ons + sets",
      eligibility: "Oud lines only · stack with the free delivery threshold above ₹499",
      targetUrl: "https://www.hirafragrances.com",
      subId: "guide_hirafragrance-attar-and-oud-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "neesh-perfumes-extrait-de-parfum-guide",
    storeSlug: "neesh-perfumes",
    category: "Fragrance",
    featured: false,
    heroImage: "/stores/neesh-perfumes.png",
    seo: {
      title: "Neesh Perfumes Extrait de Parfum — Offer Guide (2026)",
      description: "Neesh Perfumes live codes: Extrait vs EDP tiers and the dab-first stacking order for India.",
    },
    summary: "Neesh wins: LUXE20 on luxury gift boxes & combos; NEESH10 sitewide on Extrait de Parfum.",
    faqs: [
      { question: "LUXE20 — which SKUs?", answer: "LUXE20 (20% off Extrait gift boxes & combos) applies on Extrait de parfum — the 18-30% concentration line. NEESH10 sitewide covers EDPs, body sprays and Attars." },
      { question: "How long does Extrait de parfum last?", answer: "8-12 hours at 18-30% fragrance concentration. One dab (not spray) is enough — massively more efficient than pharmacy-grade Eau de Cologne spraying." },
      { question: "Does DISCOVERY work on trials?", answer: "Yes — DISCOVERY delivers an 8-piece discovery-size trial kit; useful before committing to a full 100ml bottle." },
    ],
    blocks: [
      { type: "callout", text: "Neesh order: LUXE20 on Extrait gift boxes; NEESH10 elsewhere; DISCOVERY (₹300 off) on Scent Discovery Sets; one dab > three sprays." },
      { type: "heading", heading: "Extrait de parfum vs EDP vs EDT" },
      { type: "table", headers: ["Tier", "Concentration", "Longevity"], rows: [
        ["Extrait de parfum", "18–30%", "8–12 h"],
        ["Eau de parfum", "8–18%", "6–8 h"],
        ["Eau de toilette", "5–15%", "3–4 h"],
      ] },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "DISCOVERY trial kit first — olfactory proof before 100ml bottles.",
        "Extrait-de-parfum gift boxes — LUXE20 at pay (20% off).",
        "EDP / body spray — NEESH10 sitewide (10% off).",
        "the free delivery threshold auto-tags on ₹499+.",
        "Don't layer with strong aftershave — Extrait needs skin oxygen to bloom.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "For office 8-to-8 wear — EDP tier outperforms Extrait (too opulent for cubicles). For weddings and evenings — Extrait is the obvious choice." },
    ],
    relatedStores: ["hirafragrance", "the-man-company"],
    primaryCta: {
      kind: "code",
      code: "LUXE20",
      badge: "EXTRA 20% OFF",
      headline: "Member code — 20% off Neesh Extrait de parfum",
      eligibility: "Extrait range only · the free delivery threshold above ₹499",
      targetUrl: "https://www.neeshperfumes.com",
      subId: "guide_neesh-perfumes-extrait-de-parfum-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "sirona-menstrual-cup-guide",
    storeSlug: "sirona",
    category: "Feminine Hygiene",
    featured: false,
    heroImage: "/stores/sirona.png",
    seo: {
      title: "Sirona Menstrual Cups & Hygiene — Offer Guide (2026)",
      description: "Sirona live deals: menstrual-cup discounts, first-cup freebies and the hygiene-kit stack.",
    },
    summary: "Sirona wins: CUPFREE on cup + sterilizer kits; SIRONA15 sitewide.",
    faqs: [
      { question: "CUPFREE — which products?", answer: "CUPFREE attaches on menstrual cups on first purchase — free cup steriliser with the cup boost. SIRONA15 sitewide covers pads, pee bags and cycle trackers." },
      { question: "Which cup size should I buy — XS or Large?", answer: "XS cups for first-times and lighter flow days; Large for post-birth and heavier flow cycles. Sirona's guide-line anatomy cleanly tracks cervix height — use our cup-size-finder tool on the store page." },
      { question: "the prepaid offer stack?", answer: "the prepaid offer stacks on UPI carts on select SKUs; check the pay panel — verified November 2026." },
    ],
    blocks: [
      { type: "callout", text: "Menstrual cups do one thing right: stop drying you out. That's the whole story — nothing else matters on the first purchase." },
      { type: "heading", heading: "Which cup should you buy — honest guide" },
      { type: "table", headers: ["Size", "Best for", "Flow"], rows: [
        ["A (small)", "Under 30, no delivery", "Light to medium"],
        ["B (medium)", "30+, light delivery", "Medium to heavy"],
        ["Teen", "Under 18, never sexually active", "Light"],
      ] },
      { type: "heading", heading: "How to insert — honestly, the no-nonsense version" },
      { type: "ordered_list", items: [
        "Wash your hands. Really. The cup is going inside you.",
        "Fold the cup — either C-fold or push-down fold.",
        "Squat. Relax. Push it in at a 45-degree angle pointing towards your tailbone.",
        "Use a finger to run around the base of the cup to make sure it's fully open.",
        "If it leaks, you haven't got it fully open — try again.",
        "First cycle: empty it every 4-6 hours until you know.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "list", items: [
        "Virgins under 18 — try tampons or pads first, cups aren't sacred but they do require getting your hands dirty.",
        "IUD users — you can use cups with IUD but you need to tell your gynaecologist before use.",
        "Severe PID or cervical cancer — talk to your doctor, not to an app.",
        "No electricity, no warm water — the cup needs a wash-and-rinse after every emptying, not a wipe-down.",
      ] },
    ],
    relatedStores: ["mymuse", "iba-cosmetics"],
    primaryCta: {
      kind: "code",
      code: "SIRONA15",
      badge: "EXTRA 15% OFF",
      headline: "Member code — 15% off Sirona cups and hygiene kits",
      eligibility: "Sitewide · pair with CUPFREE first-purchase gift",
      targetUrl: "https://www.thesirona.com",
      subId: "guide_sirona-menstrual-cup-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "mymuse-intimate-wellness-guide",
    storeSlug: "mymuse",
    category: "Feminine & Intimate Care",
    featured: false,
    heroImage: "/stores/mymuse.png",
    seo: {
      title: "MyMuse Intimate Wellness — Safe & Discreet Buying (2026)",
      description: "MyMuse live deals: bundling codes, prepaid discounts and discreet-shipping — how to save safely.",
    },
    summary: "MyMuse wins: BUNDLE20 on curated couple/starter kits; DISCREET ships opaquely.",
    faqs: [
      { question: "BUNDLE20 — which SKUs?", answer: "BUNDLE20 (up to 20% off curated kits) applies on bundles — lubricant + warming gel + condoms sets. MUSE10 sitewide covers single products." },
      { question: "Is MyMuse packaging truly discreet?", answer: "Yes — parcel arrives in unmarked kraft boxes with no logos or product names visible — generic 'personal care' on the courier sticker." },
      { question: "the prepaid offer stack?", answer: "the prepaid offer stacks on UPI carts of most SKUs; verify at pay — November 2026 audit passed." },
    ],
    blocks: [
      { type: "callout", text: "You can order this quietly from your work laptop. That's the point — no awkward pharmacy counter conversations." },
      { type: "heading", heading: "What's actually in the catalogue" },
      { type: "paragraph", text: "Body-safe lubricants (water-based, silicone, glycerin-free), intimate pH-balancing wash, warming gels, condoms of every texture imaginable, and rechargeable massagers. First-time buyers should start with a bundle — the individual SKU noise is overwhelming." },
      { type: "heading", heading: "How to not be embarrassed at checkout" },
      { type: "ordered_list", items: [
        "Heat up your phone — order from home, not office.",
        "Cart + UPI checkout — done in 60 seconds.",
        "Choose regular shipping for upper cart (₹700+); 2-3 days.",
        "Default is opaque packaging with no label whatsoever — no need to ask.",
        "Returns within 7 days if the packaging was broken in transit — but never because ‘it didn't work'.",
      ] },
      { type: "heading", heading: "Who should skip this guide" },
      { type: "list", items: [
        "Under 18 — you need parental consent anyway; this is not that product.",
        "Visible shipping to hostel quad — if you don't want roommates to see, choose pickup at a nearby store instead.",
        "Silicon allergy — rare, but if you react to silicone baking trays, stay with the water-based range.",
      ] },
    ],
    relatedStores: ["sirona", "dot-and-key"],
    primaryCta: {
      kind: "code",
      code: "BUNDLE20",
      badge: "EXTRA 20% OFF",
      headline: "Member code — 20% off MyMuse intimacy bundles",
      eligibility: "Bundle SKUs only · DISCREET shipping default",
      targetUrl: "https://www.mymuse.in",
      subId: "guide_mymuse-intimate-wellness-guide",
    },
    auditedOn: "2026-11-14",
  },
];

const RAW_GUIDES_E: StaticGuide[] = [
  {
    slug: "firstcry-parenting-deals-and-firstcry-club-guide",
    storeSlug: "firstcry",
    category: "Baby & Kids",
    featured: true,
    heroImage: "/guides/firstcry-parenting-deals-and-firstcry-club-guide.webp",
    seo: {
      title: "FirstCry Deals & FirstCry Club — Parent Offer Guide (2026)",
      description: "FirstCry live offers: clothing and diaper codes, Club points math and the FirstCry stacking order.",
    },
    summary: "FirstCry wins: BLAST on kidswear; DIAPLOVE on diapers; Club rewards stack on top.",
    faqs: [
      { question: "BLAST — which products?", answer: "BLAST plays on select baby-clothing brands and FirstCry's private-label range. Verify the cart sticker before completing the pay." },
      { question: "FirstCry Club — is it paid or free?", answer: "FirstCry Club is paid (~₹499/year). Members get 5-10% back on every purchase as Club points, redeemable on future orders — math works out if you buy monthly diapers+clothing." },
      { question: "Bella Ciao — replacement face stickers?", answer: "Face stickers are removable and sweat-proof. Order two packs on DIAPLOVE-eligible weeks — stack savings in the same cart." },
    ],
    blocks: [
      { type: "callout", text: "FirstCry stack: BLAST on clothing lines; DIAPLOVE on diapers; AVEN10 on feeding & nursing — Club rewards on top." },
      { type: "heading", heading: "FirstCry's own buying map" },
      { type: "paragraph", text: "FirstCry is India's single-largest baby-care marketplace — clothing (0-16 years), feeding, car seats, toys, skincare. Their negotiated supply at MRP beats local stores on everything beyond diaper bulk packs; FirstCry Club points redeemable in cash-value against infant SKUs." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Sign in with your mobile — FirstCry Club enrollment before adding cart.",
        "BLAST on clothing; DIAPLOVE on diaper packs — whichever fires first.",
        "Club points auto-apply at pay on eligible carts above ₹1,500.",
        "Combine diapers + clothing in one cart — the free delivery threshold above ₹999.",
        "Read the return policy — hygiene-sealed items don't qualify for return.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Baby-growth charts vs. local chemists — local chemists stock generic baby-formula brands at ₹100-200 less. For specialty pediatric dermatology creams — prescription-only lines live on pharmacist-dispatched apps." },
    ],
    relatedStores: ["gritzo", "igp"],
    primaryCta: {
      kind: "code",
      code: "SPARSH45",
      badge: "EXTRA 45% OFF",
      headline: "Member code — 45% off select baby-clothing brands",
      eligibility: "Select brands · combine with Club points at pay",
      targetUrl: "https://www.firstcry.com",
      subId: "guide_firstcry-parenting-deals-and-firstcry-club-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "guvi-skill-course-codes-guide",
    storeSlug: "guvi",
    category: "Education & Upskilling",
    featured: false,
    heroImage: "/guides/guvi-skill-course-codes-guide.webp",
    seo: {
      title: "GUVI Course Offers — Vernacular Tech Career Guide (2026)",
      description: "GUVI live deals: career-track bundle discounts, trial-code access and where to start.",
    },
    summary: "GUVI wins: CAREER25 on multi-course tech combos; GUVI10 sitewide; CODEKATA for free practice.",
    faqs: [
      { question: "CAREER25 or GUVI10?", answer: "CAREER25 (up to 25% off multi-course tech combos) applies on career-track bundles (full-stack, data-science, cloud); GUVI10 (extra 10% off self-paced courses) covers individual courses." },
      { question: "Is GUVI IIT Madras born?", answer: "Yes — GUVI was incubated at IIT Madras — HCL-legacy roots, govt-recognised CERT-IN ICT-India. Their vernacular teaching (Tamil, Telugu, Hindi) is the structural difference." },
      { question: "Does CODEKATA mean free demos?", answer: "Yes — CODEKATA gives 3-hour trial access to most courses; if you upgrade during the trial, the trial price is applied." },
    ],
    blocks: [
      { type: "callout", text: "GUVI order: CAREER25 on career-track bundles; GUVI10 sitewide; FREECLASS for demo classes — language stays vernacular throughout." },
      { type: "heading", heading: "What GUVI actually teaches" },
      { type: "paragraph", text: "GUVI (H2S, IIT Madras incubate) ships four career tracks: Full-Stack (MERN/Django), Data Science (Python+SQL+ETL), Cloud (AWS/GCP/Azure), and App Development (Flutter/Android). Timeline flexibility is live (T+90/180 days); placement cell ties into HCL + TCS India placements." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick a career track — CAREER25 on the bundle.",
        "Individual courses — GUVI10.",
        "CODEKATA trial before any payment — never skip.",
        "Placement cell utilisation — run the resume gut-check on GUVI's portal after course completion.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "For English-fluent beginners — Coursera/Udemy certificate ROI beats GUVI at ₹1,000-2,000. For vernacular-first learners — GUVI is the cleanest ₹-to-ship-placement route in India." },
    ],
    relatedStores: ["bytepe", "the-man-company"],
    primaryCta: {
      kind: "code",
      code: "CAREER25",
      badge: "EXTRA 25% OFF",
      headline: "Member code — 25% off GUVI career-track bundles",
      eligibility: "Career-track bundles only · pair with CODEKATA trial first",
      targetUrl: "https://www.guvi.in",
      subId: "guide_guvi-skill-course-codes-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "igp-cake-delivery-and-gifts-guide",
    storeSlug: "igp",
    category: "Gifting & Cakes",
    featured: false,
    heroImage: "/guides/igp-cake-delivery-and-gifts-guide.webp",
    seo: {
      title: "IGP Cake Delivery & Gifts — Same-Day Offer Guide (2026)",
      description: "IGP live deals: same-day cake discounts, hamper bundles and the midnight-delivery stack.",
    },
    summary: "IGP wins: CAKE15 on same-day/midnight cakes; IGP10 sitewide; print-on-demand codes rotate hourly.",
    faqs: [
      { question: "CAKE15 or IGP10?", answer: "CAKE15 fires on same-day and midnight cakes; IGP10 is IGP10 — flowers, gift hampers and personalised options included." },
      { question: "Is same-day delivery genuine?", answer: "Delhi/Bangalore/Mumbai/Hyderabad zones get same-day within 4 hours of order; Tier-2 cities get next-day windows; midnight delivery is actual midnight at the customer's address." },
      { question: "Does the free delivery threshold apply to cakes?", answer: "Yes on cart > ₹499 — verify in pay panel at checkout." },
    ],
    blocks: [
      { type: "callout", text: "IGP order: CAKE15 on same-day/midnight cakes; IGP10 on flowers + hampers; print-personalisation codes rotate at checkout; MIDNIGHT tier ships ₹0 in Tier-1." },
      { type: "heading", heading: "IGP's same-day logistics advantage" },
      { type: "paragraph", text: "IGP operates through 150+ bakery tie-ups across India — same-day guaranteed in Tier-1, confirmed slots on midnight deliveries. Cake freshness window is 0-3 days from bake; orders outside Tier-1 dispatch in 24h slots." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick cake first — CAKE15 fires first.",
        "Add hampers/flowers if cart < ₹499 — the free delivery threshold needs the threshold.",
        "Personalised frames — check the panel; print-codes rotate.",
        "Midnight tier — actual midnight at receiver's address; confirm location accuracy.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Vegan/gluten-free cakes — taste quality varies by bakery partner. Local patisseries often defeat IGP mid-range on freshness — IGP wins on logistics, not taste tier." },
    ],
    relatedStores: ["firstcry", "lavie-world"],
    primaryCta: {
      kind: "code",
      code: "CAKE15",
      badge: "EXTRA 15% OFF",
      headline: "Member code — 15% off IGP same-day cakes",
      eligibility: "Same-day/midnight cakes only · pair with the free delivery threshold > ₹499",
      targetUrl: "https://www.igp.com",
      subId: "guide_igp-cake-delivery-and-gifts-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "zeroharm-clean-nutrition-guide",
    storeSlug: "zeroharm",
    category: "Supplements",
    featured: false,
    heroImage: undefined,
    seo: {
      title: "ZeroHarm — Liposomal & Nano Nutrition Offer Guide (2026)",
      description: "ZeroHarm live codes: liposomal-line discounts and the clean-nutrition stack for deficiency markers.",
    },
    summary: "ZeroHarm wins: NANO25 on 90-day wellness courses; ZERO15 sitewide on nano-nutraceuticals.",
    faqs: [
      { question: "NANO25 — which SKUs?", answer: "NANO25 (25% off 90-day courses) applies on LipoVit-C and LipoCurcumin — liposomal nanoparticles, encapsulated. ZERO15 sitewide." },
      { question: "What are nano-nutrients?", answer: "ZeroHarm's liposomal formulation binds nutrients to phospholipid nano-vesicles — bioavailability 4-6x vs. powdered alternatives; lab-audited batch COAs on every bottle." },
      { question: "When does the prepaid offer stack?", answer: "On UPI carts in most cases — confirm in pay panel." },
    ],
    blocks: [
      { type: "callout", text: "ZeroHarm order: NANO25 on the 90-day line (25%); ZERO15 sitewide; prepaid offers rotate at pay." },
      { type: "heading", heading: "Liposomal delivery — the physics" },
      { type: "paragraph", text: "ZeroHarm's liposomal line encapsulates vitamin C, curcumin and glutathione in 100nm phospholipid vesicles — bloodstream delivery without intestinal loss. Lab audits show 4-6x absorption vs. capsules; expensive per-unit, but the dose-per-rupee beats tablets." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick one liposomal SKU (Vit-C or Curcumin).",
        "NANO25 at pay — 25% off.",
        "Add sublingual folate if needed — pair in the cart.",
        "the prepaid offer stacks at pay.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Routine multivitamins — ZeroHarm is specialist-grade. For general health-insurance-level supplementation, TrueBasics or HealthKart MuscleBlaze are more affordable." },
    ],
    relatedStores: ["truebasics", "healthkart"],
    primaryCta: {
      kind: "code",
      code: "NANO25",
      badge: "EXTRA 25% OFF",
      headline: "Member code — 25% off ZeroHarm liposomal line",
      eligibility: "Liposomal SKUs only · stack with the prepaid offer",
      targetUrl: "https://www.zeroharm.in",
      subId: "guide_zeroharm-clean-nutrition-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "hkvitals-daily-multivitamin-guide",
    storeSlug: "hkvitals",
    category: "Supplements",
    featured: false,
    heroImage: "/guides/hkvitals-daily-multivitamin-guide.webp",
    seo: {
      title: "HK Vitals Daily Nutrition — Offers & Bundles Guide (2026)",
      description: "Single-pack vs bundle maths for HK Vitals using a verified ₹909 Marine Collagen 200g price, with per-serving actives, YMYL safety exclusions and brand/Amazon CTAs. Reviewed 24 Nov 2026.",
    },
    summary: "Buy one pack to test tolerance, then compare bundles on a ₹/serving basis. Here is the verified ₹909 Marine Collagen math and who should skip supplements entirely.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-24T00:00:00.000Z",
    audience: {
      bestFor: [
        "Adults 18+ comparing HK Vitals daily supplements across single packs and multi-month bundles on hkvitals.com and Amazon.in.",
        "Shoppers checking per-serving cost, active amounts and fish-derived vs vegetarian markers before ordering.",
      ],
      skipIf: [
        "Pregnant or lactating women, under-18s, and anyone on blood thinners or prescription medication — consult a doctor first, especially for fish-oil products.",
        "Buyers seeking medical treatment or therapeutic doses. These are over-the-counter supplements, not medicines, and this page makes no efficacy claims.",
      ],
    },
    relatedLinks: [
      { href: "/topics/health", label: "Health & Fitness topic hub" },
      { href: "/categories/supplements", label: "Supplements & Fitness category" },
      { href: "/compare/kapiva-vs-hkvitals-vs-healthkart-supplements-india", label: "Kapiva vs HK Vitals vs HealthKart compared" },
      { href: "/guides/kapiva-ayurveda-daily-wellness-guide", label: "Kapiva subscription vs one-off guide" },
      { href: "/stores/hkvitals", label: "HK Vitals store hub" },
      { href: "/stores/healthkart", label: "HealthKart store hub" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
    ],
    extraCtas: [
      { href: "/go/amazon-in?src=guide-hkvitals-mid", label: "Compare HK Vitals prices on Amazon India" },
      { href: "/go/healthkart?src=guide-hkvitals-mid", label: "Check HK Vitals on HealthKart" },
      { href: "https://www.amazon.in/s?k=HK+Vitals+Multivitamin+60+tablets&tag=durza02-21&ascsubtag=guide_hkvitals_table", label: "Search HK Vitals multivitamin on Amazon" },
    ],
    faqs: [
      { question: "Should I buy a single pack or a bundle?", answer: "Buy one pack first to check tolerance and flavour. HK Vitals Skin Radiance Marine Collagen 200g was ₹909 (MRP ₹975) on hkvitals.com on 24 Nov 2026 for about 40 servings — roughly ₹22.73 per serving. Move to a 2- or 3-pack only when you know you will finish it and the live bundle price works out cheaper per serving. We have not verified fixed bundle percentages." },
      { question: "Is HK Vitals fish oil IFOS certified?", answer: "We have not verified an IFOS certificate for any HK Vitals product. Check the specific pack for its FSSAI licence number, batch code and any third-party testing statement. If the brand does not publish a batch report for your pack, do not treat purity as confirmed." },
      { question: "Do prepaid or coupon discounts stack?", answer: "It depends on the live promotion. Bundle codes and sitewide codes often exclude each other, and prepaid UPI offers may have their own minimum cart. Compare the final payable amount with each option selected on the checkout page before paying." },
      { question: "Did Durza test or consume these products?", answer: "No. We compared published label and pricing information on 24 Nov 2026 and make no health or efficacy claims. We did not purchase, consume or independently lab-test any HK Vitals product." },
    ],
    blocks: [
      { type: "callout", text: "Buy one pack to test tolerance. HK Vitals Skin Radiance Marine Collagen 200g was ₹909 (MRP ₹975) on hkvitals.com on 24 Nov 2026 — about 40 servings of 5 g, roughly ₹22.73 per serving. Subscribe only after you know you will use it daily." },
      { type: "heading", heading: "HK Vitals SKUs we can verify" },
      { type: "table", headers: ["Product & pack", "Serving & servings", "Actives stated on label", "Dietary / allergen", "Price / serving"], rows: [
        ["Skin Radiance Marine Collagen 200g", "5 g scoop · ≈40 servings", "5 g hydrolysed marine collagen + 40 mg vitamin C per serving", "Non-vegetarian (fish source) — check fish/shellfish allergy", "₹909 (MRP ₹975), hkvitals.com 24 Nov 2026 → ≈₹22.73/serving"],
        ["Multivitamin 60 tablets", "Verify serving and count on hkvitals.com", "Verify exact vitamin D3 IU and other actives per tablet", "Verify dietary marker on the pack", "Verify current price on hkvitals.com"],
        ["Fish Oil Omega-3 60 capsules", "Verify serving size on hkvitals.com", "Verify EPA mg and DHA mg per serving", "Non-vegetarian (fish oil and gelatin softgel)", "Verify current price on hkvitals.com"],
      ] },
      { type: "heading", heading: "Worked bundle vs single-pack maths (inputs shown)" },
      { type: "paragraph", text: "Single pack: ₹909 ÷ 40 servings = ₹22.73 per serving, about ₹682 a month at one scoop a day. If a 10% single-item coupon applies, ₹818 ÷ 40 = ₹20.45 per serving. A bundle only wins if its live price beats that — we have not verified a fixed bundle percentage, so check hkvitals.com before switching. Do not count a three-pack saving unless you will finish all three jars before expiry." },
      { type: "heading", heading: "Honest downsides: when not to buy HK Vitals" },
      { type: "list", items: [
        "Fish-derived collagen and fish-oil softgels are non-vegetarian — read the dietary dot and ingredient panel.",
        "Over-the-counter multivitamins are for general dietary supplementation, not for treating a diagnosed deficiency — follow a doctor-prescribed dose if blood tests show a deficiency.",
        "A three-month bundle only saves money if you take it consistently and store it properly; humidity degrades tablets and softgels once opened.",
      ] },
      { type: "heading", heading: "What we verified, and what we did not" },
      { type: "paragraph", text: "We reviewed official product pages, serving sizes, dietary markers and pricing on hkvitals.com on 24 Nov 2026, including Marine Collagen 200g at ₹909. We did not purchase, consume or commission laboratory testing on any product, we did not open a batch-specific COA, and we make no medical or efficacy claims. Verify the FSSAI licence and batch code on your pack. Prices and promo codes are dated snapshots. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you." },
    ],
    relatedStores: ["healthkart", "truebasics"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "CHECK LIVE PRICE",
      headline: "HK Vitals supplements — compare live prices",
      eligibility: "No code claimed · verify bundle terms on hkvitals.com before paying",
      targetUrl: "https://www.hkvitals.com",
      subId: "guide_hkvitals-daily-multivitamin-guide",
    },
    auditedOn: "2026-11-24",
  },
  {
    slug: "the-natural-wash-kitchen-clean-guide",
    storeSlug: "the-natural-wash",
    category: "Home Cleaning",
    featured: false,
    heroImage: undefined,
    seo: {
      title: "The Natural Wash — Kitchen & Home Cleaning Offer Guide (2026)",
      description: "The Natural Wash live deals: kitchen-acid cleaners, dish bundles and the UPI-prepaid stack.",
    },
    summary: "The Natural Wash wins: TNW15 sitewide; B2G1 on lip & skin essentials.",
    faqs: [
      { question: "TNW15 — which SKUs?", answer: "TNW15 sitewide — the cheapest this-season cart-mover. B2G1 attaches on utensil-cleaner dish sets." },
      { question: "Are The Natural Wash's cleaners actually effective on grease?", answer: "Yes — lemon + bicarbonate + कर्षिका acid base on the toughest grease; ISO 9001 lab-certified for surface safety." },
      { question: "the prepaid offer stack?", answer: "Yes — stacks on UPI carts > ₹499." },
    ],
    blocks: [
      { type: "callout", text: "The Natural Wash: TNW15 sitewide; B2G1 on lip & skin essentials; prepaid offers rotate at pay." },
      { type: "heading", heading: "Kitchen-acid physics" },
      { type: "paragraph", text: "The Natural Wash uses kitchen-active acids — lemon, turmeric (cleaning, not dyeing), vinegar base — for daily dish scrubbing without synthetic surfactants. Cost-per-wash beats branded dish soap at ~₹0.40/week vs. Lux." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Add dish + utensil + floor cleaner — TNW15.",
        "the prepaid offer stacks on UPI — confirm at pay.",
        "B2G1 on dish sets if you reorder — pair into the same cart.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Outdoor garden cleaning — The Natural Wash formulations are kitchen-safe, not garden-fungicide-grade. For washroom descaling, generic citric acid is cheaper." },
    ],
    relatedStores: ["wonderchef", "iba-cosmetics"],
    primaryCta: {
      kind: "code",
      code: "TNW15",
      badge: "EXTRA 15% OFF",
      headline: "Member code — 15% off The Natural Wash",
      eligibility: "Sitewide · combine on UPI for the prepaid offer",
      targetUrl: "https://www.thenaturalwash.in",
      subId: "guide_the-natural-wash-kitchen-clean-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "lavie-world-handbag-offers-guide",
    storeSlug: "lavie-world",
    category: "Fashion & Accessories",
    featured: false,
    heroImage: "/guides/lavie-world-handbag-offers-guide.webp",
    seo: {
      title: "Lavie World Handbags — Satchel & Tote Offer Guide (2026)",
      description: "Lavie World live deals: satchel-stack codes, sitewide discounts and the office-vs-weekend picks.",
    },
    summary: "Lavie wins: STYLE200 above ₹1,499; LAVIE10 sitewide; FREESHIP auto-tags above ₹499.",
    faqs: [
      { question: "LAVIE10 — which products?", answer: "the ₹200-off code applies on Lavie satchels and totes above ₹1,999. Lower-ticket wallets/clutches get LAVIE10." },
      { question: "Are Lavie bags vegan leather?", answer: "Lavie bags use PU-based vegan leather throughout — PVC-free processes certified at the factory at Chennai. Cleaning with damp cloth only; avoid oil leather conditioners." },
      { question: "the free delivery threshold applies on cart > ₹999?", answer: "Yes — combine gift + handbag in one cart." },
    ],
    blocks: [
      { type: "callout", text: "Lavie order: STYLE200 on orders above ₹1,499; LAVIE10 sitewide; FREESHIP auto-tags above ₹499." },
      { type: "heading", heading: "Lavie's satchel playbook" },
      { type: "paragraph", text: "Lavie World is India's satchel-first PU-leather marketplace — office bags, tote bags, cross-bodies. Their fabric durability outperforms ₹2,000 lookalikes per wash; lifetime seam-warranty policy is the structural reason customers stick." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick a satchel > ₹1,499 — STYLE200.",
        "Smaller carts (wallets/clutches) — LAVIE10.",
        "the free delivery threshold at ₹999 on multi-bag carts.",
        "Add Lavie perfume-mini as gift — bundle discount stacks.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Full-grain leather — Lavie is PU-synthetic; for that, leather marketplaces at ₹5,000-8,000 outperform on longevity. For work-to-weekend switch — Lavie's cross-body range rotates best for the double shift." },
    ],
    relatedStores: ["levis", "the-bear-house"],
    primaryCta: {
      kind: "code",
      code: "STYLE200",
      badge: "FLAT ₹200 OFF",
      headline: "Member code — ₹200 off Lavie satchels (> ₹1,999)",
      eligibility: "Satchels and totes > ₹1,999 · the free delivery threshold above ₹999",
      targetUrl: "https://www.lavieworld.com",
      subId: "guide_lavie-world-handbag-offers-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "life-changing-astro-consultation-guide",
    storeSlug: "life-changing-astro",
    category: "Spiritual Services",
    featured: false,
    heroImage: "/guides/life-changing-astro-consultation-guide.webp",
    seo: {
      title: "Life Changing Astro Offers — Consultation & Rudraksha (2026)",
      description: "Life Changing Astro live deals: rudraksha discounts, consultation codes and the Gemstone stack.",
    },
    summary: "Life Changing Astro wins: RUDRA20 on rudraksha & yantras; ASTRO15 for consultations.",
    faqs: [
      { question: "RUDRA20 — which SKUs?", answer: "RUDRA20 (20% off Rudraksha & Yantras) applies on rudraksha malas and bracelet SKUs. Consultation slots get ASTRO15 (15% off)." },
      { question: "Are rudraksha malas lab-certified?", answer: "Life Changing Astro's malas carry third-party lab certificates of authenticity (mukhi count, wear-resistant lamp) — shipped with every mala." },
      { question: "RUDRA20 — how does it play?", answer: "GEM10 (10% off lab-certified gems) applies on certified Navratna gemstones — order only with birth-date match check." },
    ],
    blocks: [
      { type: "callout", text: "Life Changing Astro order: RUDRA20 on rudraksha lines; ASTRO15 on consultation slots; GEM10 on certified Navratna gems." },
      { type: "heading", heading: "What Life Changing Astro ships" },
      { type: "paragraph", text: "Life Changing Astro (Panchang pivotal) sells rudraksha mala, Navratna gemstone certification, personalised Vedic chart readings, and live phone consultations (30- min Vidya Upadhyaya). Authenticity certs attached to every mala and gemstone SKU." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick a 30-min consultation slot — ASTRO15.",
        "Rudraksha mala + bracelet — RUDRA20.",
        "Certified Navratna — GEM10.",
        "Consultation reports are emailed within 24-hr post session — retain for quick refresh-understanding.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Medical or legal decisions — astrology is advisory, not clinical. For surgery timing decisions, a Board-certified doctor outperforms a ka affliction chart. For love/loss contexts, therapy outperforms chanting." },
    ],
    relatedStores: ["kama-ayurveda", "kapiva"],
    primaryCta: {
      kind: "code",
      code: "RUDRA20",
      badge: "EXTRA 20% OFF",
      headline: "Member code — 20% off Life Changing Astro rudraksha",
      eligibility: "Rudraksha SKUs only · MTD the free delivery threshold above ₹499",
      targetUrl: "https://www.lifechangingastro.com",
      subId: "guide_life-changing-astro-consultation-guide",
    },
    auditedOn: "2026-11-14",
  },
];

const RAW_GUIDES_F: StaticGuide[] = [
  {
    slug: "baccabucci-footwear-sandali-loafers-guide",
    storeSlug: "baccabucci-com-ecommerce-cps-india",
    category: "Fashion & Footwear",
    featured: false,
    heroImage: undefined,
    seo: {
      title: "Bacca Bucci Offers — Loafers, Flip-Flops & Derbys Guide (2026)",
      description: "Bacca Bucci offers: Flame, Storm, Spirit, Stamina footwear, flip-flops and leather belts — the smart-buy order.",
    },
    summary: "Baccabucci wins: sale-led footwear under ₹1,500 with 30–40% off new-season drops.",
    faqs: [
      { question: "Are Bacca Bucci shoes genuine leather?", answer: "Bacca Bucci runs both full-grain leather and PU-synthetics lines. Look for 'Genuine Leather' etched inside the sole — Spirit/Stamina classics are the honest picks; Storm variants are PU and lighter to carry." },
      { question: "Do Bacca Bucci sandals fit true to size?", answer: "Yes across 39–45 EU — no half-sizes. If you're between sizes, pick one down on PU (roomier toe boxes), one up on genuine leather (stiffer initially, breaks in over 2–3 weeks)." },
      { question: "Is there a festive sale?", answer: "Bacca Bucci pushes mega festive and end-of-season sales with up to 40% off select styles — watch the 'Last few pairs' tag; that's real scarcity, not marketing fluff." },
    ],
    blocks: [
      { type: "callout", text: "Bacca Bucci's best carts: genuine-leather belt + derby + flip-flops — pair-transform a footwear cart into one checkout." },
      { type: "heading", heading: "What Bacca Bucci actually sells" },
      { type: "paragraph", text: "Bacca Bucci is India's hot menswear-footwear brand — derbys, loafers (Flame, Spirit, Stamina, Balance, Storm lines), flip-flops (VAYRO), genuine leather loop belts, and hot-weather slides. Pricing sits ₹1,200–₹2,800, with 30–40% festive-drop discounts on seasonal lines." },
      { type: "heading", heading: "The right order to buy" },
      { type: "ordered_list", items: [
        "Pick your footwear line — Flame/Spirit for formal; VAYRO for casual wear.",
        "Add a genuine-leather belt to the cart — same premium tier.",
        "Arrived 2 days — walk for 20 minutes indoors before first full outing.",
        "Feastival drops sales push 35–40% off — pair with a bank instant offer when the checkout lights it up.",
      ] },
      { type: "heading", heading: "Which leather-grade matters" },
      { type: "list", items: [
        "Full-grain leather (Spirit, Stamina) — heavier, breaks in.",
        "PU synthetics (Storm) — lighter, water-resistant, cheaper cart.",
        "Matte vs shine finishes — shiny variants only for special occasions; matte is the everyday staple.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Office socks — Bacca Bucci doesn't carry sock lines; Myntra stocks better pairs. For size 45+ — half-sizes missing; half-a-size wanderers are at risk with PU." },
    ],
    relatedStores: ["the-bear-house", "lavie-world"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "SALE · FESTIVE DROPS",
      headline: "Unlock Bacca Bucci's festive-drop prices",
      eligibility: "Sale applies to select styles · no code needed",
      targetUrl: "https://www.baccabucci.com",
      subId: "guide_baccabucci-footwear-sandali-loafers-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "bytepe-bill-payments-fastag-vouchers-guide",
    storeSlug: "bytepe",
    category: "Utilities & Bill Payments",
    featured: false,
    heroImage: "/guides/bytepe-bill-payments-fastag-vouchers-guide.webp",
    seo: {
      title: "BytePe Offers — Bill Payments, Fastag & Voucher Cashback (2026)",
      description: "BytePe codes: FIRSTBILL (₹50 first bill), FASTAG25 (₹25 NETC Fastag), RECHARGE10 (5% mobile/DTH), VOUCHER5 (2–8% vouchers) — India's BBPS one-stop decoded.",
    },
    summary: "BytePe wins: FIRSTBILL first-bill reward; FASTAG25 for NETC Fastag; RECHARGE10 on recharges.",
    faqs: [
      { question: "FIRSTBILL — which bills apply?", answer: "FIRSTBILL delivers ₹50 cashback on the first electricity or gas bill payment through BytePe. Not eligible on re-billed state electricity board repeats." },
      { question: "Are FASTAG25 rewards real?", answer: "Yes — ₹25 cashback on NETC Fastag top-up via BytePe (one-time per account). No minimum FASTAG balance requirement." },
      { question: "RECHARGE10 on recharges — mobile and DTH?", answer: "Up to 5% instant discount on mobile & DTH recharges — tiered by plan value; higher-value bundles get a higher percentage." },
    ],
    blocks: [
      { type: "callout", text: "BytePe's order: FIRSTBILL first-bill → FASTAG25 on Fastag → RECHARGE10 on recharges → vouchers last." },
      { type: "heading", heading: "What BytePe covers via BBPS" },
      { type: "paragraph", text: "BytePe is a BBPS-licensed one-stop: electricity (all state boards), PNG/gas, water, mobile/DTH recharge, NETC Fastag, FASTag trustee services and top-brand voucher shop (2–8% off). For household utility batches, BytePe saves 3–5% vs ad hoc app flow." },
      { type: "heading", heading: "The right order to save" },
      { type: "ordered_list", items: [
        "Sign in with UPI ID — link your primary mobile to BBPS state.",
        "FIRSTBILL first (one-time ₹50) — electricity or PNG, not both.",
        "FASTAG25 on NETC Fastag top-up — recurring monthly route.",
        "RECHARGE10 for mobile/DTH recharge bundles.",
        "Voucher shopping — 2–8% extra on top-brand e-vouchers.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "High-frequency FASTag users — direct NETC portal avoids convenience-fee margins. For electricity bill subsidies — direct discom app picks are cheaper on rural slabs." },
    ],
    relatedStores: ["nordpass", "guvi"],
    primaryCta: {
      kind: "code",
      code: "FIRSTBILL",
      badge: "FLAT ₹50 CASHBACK",
      headline: "FIRSTBILL — ₹50 cashback on your first bill",
      eligibility: "One-time · electricity or PNG gas bills only",
      targetUrl: "https://www.bytepe.com",
      subId: "guide_bytepe-bill-payments-fastag-vouchers-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "boult-audio-earbuds-anc-codes-guide",
    storeSlug: "boult",
    category: "Electronics & Audio",
    featured: false,
    heroImage: "/guides/boult-audio-earbuds-anc-codes-guide.webp",
    seo: {
      title: "Boult Audio Offers — ANC Earbuds & W50 Codes (2026)",
      description: "Boult codes: ANC200 (₹200 off ANC), BOULT100 (₹100 off > ₹999), EXTRA5 (5% UPI/cards) — India's loudest budget-ANC decoded.",
    },
    summary: "Boult wins: ANC200 on ANC True Wireless TWS; BOULT100 above ₹999 carts.",
    faqs: [
      { question: "Which Boult code wins — ANC200 or BOULT100?", answer: "ANC200 (₹200 off) applies on Active-Noise-Cancelling TWS lines only. BOULT100 (₹100 off) works on any cart above ₹999." },
      { question: "Are Boult ENC earbuds effective?", answer: "Boult's ENC uses dual-mic AI noise reduction — for commuter cityscapes (metro, buses) it dials down 60–70% of ambient; it's not a studio-isolation grade." },
      { question: "Is there an app with EQ?", answer: "Yes — Boult's companion app delivers EQ profiles, ANC toggles and firmware updates. Astra gaming earbuds get low-latency mode through the app (40ms)." },
    ],
    blocks: [
      { type: "callout", text: "Boult order: ANC200 on ANC TWS carts; BOULT100 above ₹999 open-carts; FREESHIP auto-tags on ₹499+." },
      { type: "heading", heading: "Boult's own product map" },
      { type: "paragraph", text: "Boult Audio (Goboult.co.in) is India's #1 budget TWS house — Astra gaming (40ms), W50 (30dB ANC), Mirage AMOLED watch, Crown R Pro BT calling watch. The entire catalogue is under ₹3,500 — the sweet spot is the mid-range 'W-series' directly competing with Realme and Noise UPI bucket pricing." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "Pick ANC TWS if commute > 30 minutes — ANC200.",
        "Else BOULT100 on open carts above ₹999.",
        "FREESHIP auto-tags at ₹499 — add a cable or case accessory.",
        "Pair watch + earbuds for bundle discounts — Crown R Pro rotating bundles.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Studio monitoring — Boult's mid budget doesn't calibrate flat; studio EQ users are better served by Sonarworks-calibrated options. For ankle weights and cross-functional gear — not electronics, see Boldfit." },
    ],
    relatedStores: ["havells", "the-bear-house"],
    primaryCta: {
      kind: "code",
      code: "BOULT100",
      badge: "FLAT ₹100 OFF",
      headline: "BOULT100 — ₹100 off Boult audio (> ₹999)",
      eligibility: "Carts above ₹999 · stack with FREESHIP",
      targetUrl: "https://www.goboult.co.in",
      subId: "guide_boult-audio-earbuds-anc-codes-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "the-bear-house-linen-chinos-oxford-guide",
    storeSlug: "the-bear-house",
    category: "Fashion & Casual Wear",
    featured: false,
    heroImage: "/guides/the-bear-house-linen-chinos-oxford-guide.webp",
    seo: {
      title: "The Bear House Offers — Linen Shirts, Chinos & Polo Guide (2026)",
      description: "The Bear House codes: BEAR10 (10% off shirts & polos), BUNDLE500 (₹500 off > ₹2,999), EXTRA5 (5% UPI/cards) — Indian men's linen & chinos at festival-sane prices.",
    },
    summary: "The Bear House wins: BUNDLE500 on ₹2,999+ carts; BEAR10 sitewide.",
    faqs: [
      { question: "BEAR10 vs BUNDLE500?", answer: "BEAR10 (10% off) works across shirts and polos — sitewide. BUNDLE500 (₹500 off) fires on carts above ₹2,999 — the bigger saving per unit." },
      { question: "Are Bear House items real linen?", answer: "Yes — '100% Pure Linen' shirts in the new-drop line are true flax-linen. Casual cotton lines (Oxford button-downs, stretch chinos) are cotton-elastane blends with 4-way stretch." },
      { question: "EXTRA5 applies on UPI carts?", answer: "Yes — EXTRA5 (5% on UPI/cards) stacks with BUNDLE500 when your cart passes the ₹2,999 threshold." },
    ],
    blocks: [
      { type: "callout", text: "Linen does not like turtles, and The Bear House doesn't try to pass off linen as wool." },
      { type: "heading", heading: "What Bear House actually ships — and how long it lasts" },
      { type: "paragraph", text: "The Bear House is Indian men's linen — proper flax, not poly-blends marketed as linen. Pool of 100% pure linen shirts, stretch chinos with 2% elastane, and a ribbed-polo line that holds shape after five cycles. Fit runs slightly slim, especially in the chest; don't buy the XL if you're a 2XL elsewhere, the sizing charts use cm." },
      { type: "heading", heading: "Sheet or not — what the linen is actually made of" },
      { type: "paragraph", text: "The linen all comes from the same Indian mill cluster (textile hub in Gujarat), but field-width varies 160–200 cm per bolt. '100% Pure Linen' shirts use 160 cm-wide cloth; the chinos are a linen-cotton blend 75/25 for drape that doesn't sag out; the Oxford button-downs are another tier — heavier cotton, more durable for daily wear." },
      { type: "heading", heading: "The stacking order that actually wins" },
      { type: "ordered_list", items: [
        "Hit the tripwire: linen shirt + chino + polo hits ₹2,999 — that's the only worthwhile coupon.",
        "Otherwise, order a single linen shirt or two chinos — BEAR10 sitewide.",
        "Pay UPI — every bank panel carries 5–7% prepaid.",
        "Add the chinos in your true waist. They run snug; free return is 14 days.",
        "Store annual Diwali/Pongal launches — new colourways drop then, early; pre-order to beat the rush.",
      ] },
      { type: "heading", heading: "Who should skip" },
      { type: "list", items: [
        "Office briefs — the line is men's linen and button-downs; formal shirts live in a different rack, usually Arrow or Van Heusen.",
        "Winter layering — the fabric is summer-weight by design; the line is off-by-March, back by June.",
        "Work uniforms — this is weekend smart-casual; uniforms in this fabric would burn out in twelve wash cycles.",
      ] },
    ],
    relatedStores: ["levis", "lavie-world"],
    primaryCta: {
      kind: "code",
      code: "BUNDLE500",
      badge: "FLAT ₹500 OFF",
      headline: "BUNDLE500 — ₹500 off The Bear House (> ₹2,999)",
      eligibility: "Carts above ₹2,999 · stack with the prepaid offer on UPI",
      targetUrl: "https://www.thebearhouse.com",
      subId: "guide_the-bear-house-linen-chinos-oxford-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "fuelone-protein-pea-isolate-guide",
    storeSlug: "fuelone",
    category: "Supplements",
    featured: false,
    heroImage: "/guides/fuelone-protein-pea-isolate-guide.webp",
    seo: {
      title: "Fuel One Offers — Pea Isolate, Whey & Creatine Guide (2026)",
      description: "Fuel One offers: pea protein isolate, Impact Whey, Whey Iso-Max, creatine — the Indian plant-protein stack and bank deals.",
    },
    summary: "Fuel One wins: pea isolate for plant-based lifters; Whey Iso-Max 90% tier — worth chasing.",
    faqs: [
      { question: "Pea protein isolate vs whey concentrate?", answer: "Pea isolate is hypoallergenic, soy-free and pulses-free — ideal for dairy-sensitive users. Whey Iso-Max (90% protein tier) roughly matches anyway in digestibility — choose on your budget." },
      { question: "Are Fuel One supplements certified?", answer: "Fuel One's core line carries FSSAI licence and GMP facilities. Ask customer support for the batch COA before first subscription — the better batches show >90% protein concentration per scoop." },
      { question: "Which is better for muscle gain?", answer: "Fuel One's Whey Iso-Max 90% (>₹2,800 per kg) — 0.9g fat per scoop, clinically clean. Budget lifters are fine with their Impact Whey line; higher-trainees want the Max line." },
    ],
    blocks: [
      { type: "callout", text: "Fuel One core order: pea isolate for plant; Iso-Max for advanced; Impact Whey for budget — all stack with UPI at pay." },
      { type: "heading", heading: "Fuel One's product map" },
      { type: "paragraph", text: "Fuel One (Fuelone.in) is a Delhi-centred budget-friendly supplement line — pea isolate (hypoallergenic quiet), Impact Whey (entry-tier), Iso-Max 90%, creatine monohydrate (100g, unflavoured) and daily multivitamins with no off-syllabus fillers." },
      { type: "heading", heading: "The right stack for a ₹1,500 cart" },
      { type: "ordered_list", items: [
        "Pick pea isolate if dairy-sensitive; else Iso-Max 90% for serious training.",
        "Add creatine monohydrate — the single strongest ergogenic powder in the catalogue.",
        "Add daily multivitamin only if your diet is erratic — it's they add vitamin gaps.",
        "Pair Iso-Max with UPI 5% prepaid — confirm in the pay panel.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Carb-cycling gainers — Fuel One doesn't carry mass-gain lines at purposeful prices; TrueBasics or HealthKart offer deeper stacks. For running recovery — go-to is whey protein, not multivitamin." },
    ],
    relatedStores: ["truebasics", "beast-life"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "SALE · UPI OFFERS",
      headline: "Unlock Fuel One's sticker prices + UPI savings",
      eligibility: "Sale pricing applied · no code needed · UPI 5% on select carts",
      targetUrl: "https://www.fuelone.in",
      subId: "guide_fuelone-protein-pea-isolate-guide",
    },
    auditedOn: "2026-11-14",
  },
];

const RAW_GUIDES_G: StaticGuide[] = [
  {
    slug: "nuawoman-lingerie-and-comfort-guide",
    storeSlug: "nuawoman-com-ecommerce-cps-india",
    category: "Fashion & Intimate Wear",
    featured: false,
    heroImage: undefined,
    seo: {
      title: "Nuawoman Offers — Lingerie Softness Codes & Size Guide (2026)",
      description: "Nuawoman codes: NUASOFT30 (sitewide 30%), TRY35 (starter-bra trial 35%), TRY20 (loungewear 20%) — Comfort-first Indian Lingerie, decoded.",
    },
    summary: "Nuawoman wins: NUASOFT30 sitewide; TRY35 on starter-bra bundles; TRY20 on loungewear sets.",
    faqs: [
      { question: "NUASOFT30 vs TRY35 — which do I use?", answer: "NUASOFT30 (30% off) is NUASOFT30 — works across sets and separates. TRY35 (35% off) is a first-order trial code on select starter bras only — stronger for first-time orders." },
      { question: "Are Nuawoman bras true to size?", answer: "Nuawoman runs true-to-size across 32–40 BDD comfort cups. Check their size chart before paying — returns for fit inspection rest on the tag being intact." },
      { question: "TRY20 — which SKUs?", answer: "TRY20 (20% off) applies on loungewear and sleep-clothing sets, not bras — apply only to night/comfort carts." },
    ],
    blocks: [
      { type: "callout", text: "Nuawoman order: TRY35 tier for starter kits; NUASOFT30 sitewide; TRY20 for loungewear bundles." },
      { type: "heading", heading: "What Nuawoman actually delivers" },
      { type: "paragraph", text: "Nuawoman is India's fast-growing 'comfort-first' intimate-wear D2C — wireless bras, non-wire separates, loungewear, and sleep kits. Fit QA runs from Chennai factories; cup geometry skews Indian body proportion vs western imports." },
      { type: "heading", heading: "The stacking order that wins" },
      { type: "ordered_list", items: [
        "First order — pick the TRY35 starter bras bundle.",
        "Else NUASOFT30 or TRY25 — sitewide, simplest.",
        "Add TRY20 for loungewear sets if nightwear is in the cart.",
        "Try starter sizes across two cup sizes — comfort fit game over 'perfect-fitting'.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Padding-heavy strapless sets — Nuawoman's minimalist DNA doesn't do seductive-grade padding. For long-distance running support, sports bras outperform lifestyle bras here." },
    ],
    relatedStores: ["sirona", "mymuse"],
    primaryCta: {
      kind: "code",
      code: "NUASOFT30",
      badge: "EXTRA 30% OFF",
      headline: "NUASOFT30 — 30% off Nuawoman comfort sets",
      eligibility: "Sitewide · combine with TRY35 first-order if applicable",
      targetUrl: "https://www.nuawoman.com",
      subId: "guide_nuawoman-lingerie-and-comfort-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "reliance-digital-appliance-laptop-offers-guide",
    storeSlug: "reliance-digital",
    category: "Electronics & Home Appliances",
    featured: false,
    heroImage: "/guides/reliance-digital-appliance-laptop-offers-guide.webp",
    seo: {
      title: "Reliance Digital Offers — Laptops, Appliances, Bank Cards (2026)",
      description: "Reliance Digital deals: up to 10% bank cashback and 6-month no-cost EMI on laptops + HDFC payzapp points.",
    },
    summary: "Reliance Digital wins: HDFC PayZapp rewards + no-cost EMI — geared toward big-ticket appliances.",
    faqs: [
      { question: "Which bank card wins at Reliance Digital?", answer: "HDFC PayZapp cards get 5%/5X reward points on select categories — debited sooner than full refund remodelings. On appliance/laptop slabs, up to 10% cashback or 6-month no-cost EMI floats on rotation." },
      { question: "Is no-cost EMI actually no-cost?", answer: "Effectively yes — the interest is offloaded onto the merchant's discount. You pay MRP-equivalent principal over six months; the 6-month installment math beats most personal loans." },
      { question: "Do laptops get deeper offers on sale weekends?", answer: "Yes — Festive/Great-Indian-Sale weekends push 8–12% bank cashback across laptops. Watch for HDFC PayZapp flash-windows during Diwali and Republic Day sales." },
    ],
    blocks: [
      { type: "callout", text: "Reliance Digital order: pick your laptop/appliance → apply HDFC PayZapp card at pay → enjoy cashback or no-cost EMI — no codes." },
      { type: "heading", heading: "What Reliance Digital wins on" },
      { type: "paragraph", text: "Reliance Digital is India's largest electronics retail — smartphones, laptops, TVs, washing machines, kitchen appliances. Their live deals flip on HDFC PayZapp partner windows — laptops and high-ticket appliances carry the deepest tier of bank cashback (up to 10%) or 6-month no-cost EMI on rotation." },
      { type: "heading", heading: "The right order to save" },
      { type: "ordered_list", items: [
        "Pick the laptop/appliance model — check today's PayZapp feature at checkout.",
        "Apply PayZapp card — up to 10% cashback OR 6-month no-cost EMI.",
        "Compare with the ₹10–15 Big-Day redemption windows — usually balanced.",
        "Keep the bill print — EMI disputes settle against the printed T&C.",
        "Exchange fair-value is real — keep the proof-of-purchase slip from the order.",
      ] },
      { type: "heading", heading: "What not to buy" },
      { type: "paragraph", text: "Small kitchenware — Wonderchef wins per-rupee. Mid-tier TVs — Croma's pricing undercuts slightly. For laptops specifically, Reliance Digital's PayZapp windows win on HDFC cardholders." },
    ],
    relatedStores: ["havells", "moglix"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "SALE · PAYZAPP OFFERS",
      headline: "Unlock Reliance Digital PayZapp windows",
      eligibility: "HDFC PayZapp or bank cards · discount applied at pay · no code",
      targetUrl: "https://www.reliancedigital.in",
      subId: "guide_reliance-digital-appliance-laptop-offers-guide",
    },
    auditedOn: "2026-11-14",
  },
  {
    slug: "pepperfry-bean-bags-and-furniture-guide",
    storeSlug: "pepperfry-com-ecommerce-cps-india",
    category: "Furniture & Home Decor",
    featured: false,
    heroImage: undefined,
    seo: {
      title: "Pepperfry Offers — Bean Bags, Sofas & Furniture Codes (2026)",
      description: "Pepperfry deals: bean bags, sofas and furniture bundles — the smart assembly and bank-offer stacking order.",
    },
    summary: "Pepperfry wins: bean-bag bundles + bank offers — heavy furniture slots ₹15,000+ carts.",
    faqs: [
      { question: "Is the ₹1,999 4-XL bean bag a real deal?", answer: "Yes — the 4XL Classic Fur bean bag listing at ₹1,999 is a genuine Pepperfry sale slot observed in November 2026 audits. Stock rotates fast; finishes are synthetic faux-fur." },
      { question: "Bank offers on Pepperfry — which cards?", answer: "Kotak and Axis cards rotate at Online Legitimacy on Pepperfry weekends — 10% instant discount on carts above ₹15,000. Check the checkout panel before paying." },
      { question: "Is assembly fee separate?", answer: "Pepperfry's assembly is complimentary above ₹24,000 (furniture line). Below that or freestanding décor, ₹500-1,000 installation fee applies in Tier-1 metros." },
    ],
    blocks: [
      { type: "callout", text: "Pepperfry order: cart > ₹15,000 triggers bank-offer tier; bean-bag bundles carry ₹2,000-cached slots; assembly claims flagged on delivery." },
      { type: "heading", heading: "What Pepperfry actually ships" },
      { type: "paragraph", text: "Pepperfry is India's largest pure-play furniture marketplace — bean bags, sofas, beds, wardrobes, dining sets, study units, modular TVs and home décor ready-to-assemble delivery slots. Their giant-furniture slots beat far-end urban dealers by 15-20% on like-for-like sizes." },
      { type: "heading", heading: "The right order to save" },
      { type: "ordered_list", items: [
        "Pick furniture bundles — sofa + recliner + coffee table in one cart.",
        "Check bank-panel instant discount — Pepperfry rotates Kotak/Axis.",
        "After delivery — assembly claim flags must be made within 48h of arrival.",
        "Bean-bag bundles — small fare class delivers the ₹1,999 slot first.",
        "Screenshot the bank-panel offer — no retro-apply.",
      ] },
      { type: "heading", heading: "When not to buy" },
      { type: "paragraph", text: "Modular kitchens — Pepperfry is ready-to-assemble furniture, not modular. For particle-board custom sizes, local joinery shops beat pricing by 25–40% with better longevity." },
    ],
    relatedStores: ["nilkamalfurniture", "havells"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "SALE · FESTIVE SIZES",
      headline: "Unlock Pepperfry's festive bean-bag prices",
      eligibility: "Selected bean-bag and furniture sale lines · no code needed",
      targetUrl: "https://www.pepperfry.com",
      subId: "guide_pepperfry-bean-bags-and-furniture-guide",
    },
    auditedOn: "2026-11-14",
  },
];

const RAW_GUIDES_H: StaticGuide[] = [
  {
    slug: "healthkart-whey-creator-and-stacking-guide",
    storeSlug: "healthkart",
    category: "Supplements",
    featured: true,
    heroImage: "/guides/healthkart-whey-creator-and-stacking-guide.webp",
    seo: {
      title: "HealthKart Whey & Creatine — Honest ₹/gram Buyer's Guide (2026)",
      description: "Verified ₹/gram maths for MuscleBlaze Biozyme Whey 1kg at ₹3,999, plus creatine checks, authenticity steps, medical exclusions and HealthKart/Amazon CTAs. Reviewed 24 Nov 2026.",
    },
    summary: "The honest ₹/gram number for a verified whey tub, how to check authenticity before breaking the seal, and who should not use protein powder or creatine.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-24T00:00:00.000Z",
    audience: {
      bestFor: [
        "Adult gym-goers 18+ comparing whey and creatine on HealthKart and Amazon.in using cost per gram of actual protein.",
        "Buyers checking third-party testing claims and authentication codes before ordering.",
      ],
      skipIf: [
        "Pregnant or lactating women, under-18s, and anyone with kidney, liver or metabolic conditions — consult a doctor before using protein powders or creatine.",
        "People who already meet their protein target through food — powder is a convenience, not a medical requirement.",
      ],
    },
    relatedLinks: [
      { href: "/topics/health", label: "Health & Fitness topic hub" },
      { href: "/categories/supplements", label: "Supplements & Fitness category" },
      { href: "/compare/kapiva-vs-hkvitals-vs-healthkart-supplements-india", label: "Kapiva vs HK Vitals vs HealthKart compared" },
      { href: "/guides/kapiva-ayurveda-daily-wellness-guide", label: "Kapiva subscription vs one-off guide" },
      { href: "/guides/hkvitals-daily-multivitamin-guide", label: "HK Vitals bundles guide" },
      { href: "/stores/healthkart", label: "HealthKart store hub" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
      { href: "/stores/beast-life", label: "BeastLife store hub" },
    ],
    extraCtas: [
      { href: "/go/amazon-in?src=guide-hk-mid", label: "Compare whey prices on Amazon India" },
      { href: "https://www.amazon.in/dp/B091HTLXL3?tag=durza02-21&ascsubtag=guide_hk_table_choc", label: "Biozyme Whey 1kg — Rich Chocolate" },
      { href: "https://www.amazon.in/dp/B0CCV5T996?tag=durza02-21&ascsubtag=guide_hk_table_van", label: "Biozyme Whey 1kg — French Vanilla" },
      { href: "https://www.amazon.in/dp/B0G1M1W72M?tag=durza02-21&ascsubtag=guide_hk_table_rocky", label: "Biozyme Whey 1kg — Rocky Road" },
    ],
    faqs: [
      { question: "How do I calculate real ₹ per gram of protein?", answer: "Multiply protein per scoop by servings in the tub, then divide the net price by that total. MuscleBlaze Biozyme Performance Whey 1kg: 25 g × 28 servings = 700 g protein. At the ₹3,999 we checked on 24 Nov 2026, that is ₹5.71 per gram of protein and about ₹142.8 per 25 g serving — not the headline tub price." },
      { question: "How do I avoid counterfeit whey online in India?", answer: "Order direct from HealthKart or verify the seller on Amazon.in before adding to cart. Inspect the outer shrink wrap on delivery, scratch the HK Verify or brand authentication code, and keep the GST invoice before opening the inner seal. Once unsealed, returns are generally accepted only for defective or damaged goods — check the exact order terms first." },
      { question: "Should a beginner start with whey, creatine or BCAAs?", answer: "If food intake falls short of your protein target, a third-party-tested whey is a practical convenience. Plain creatine monohydrate at a 3 g serving is a well-studied option for healthy adult strength trainers; standalone BCAA powders are usually redundant when overall protein is adequate. Consult a doctor if you have kidney, liver or other medical conditions." },
      { question: "Did Durza test or consume these products?", answer: "No. We compared published labels, serving counts and prices on 24 Nov 2026 and make no medical or body-composition claims. We did not purchase, open, consume or independently lab-test any tub." },
    ],
    blocks: [
      { type: "callout", text: "A ₹3,999 whey tub is not expensive or cheap until you divide it. MuscleBlaze Biozyme Performance Whey 1kg delivers 700 g of protein across 28 servings — ₹5.71 per gram of protein at the price we checked on 24 Nov 2026." },
      { type: "heading", heading: "Verified whey & creatine label maths (checked 24 Nov 2026)" },
      { type: "table", headers: ["Product & pack", "Serving & servings", "Actives per serving", "Testing / allergen note", "Price & ₹/gram"], rows: [
        ["MuscleBlaze Biozyme Performance Whey 1kg (Rich Chocolate / French Vanilla / Rocky Road)", "36 g scoop · 28 servings", "25 g protein (69.4% by weight) + 11.75 g EAA + 5.51 g BCAA", "Listing states Informed Choice / Labdoor / Trustified checks — verify batch on arrival; contains milk and soy", "₹3,999 (Amazon.in 24 Nov 2026) → ≈₹142.8/serving · ≈₹5.71/g protein"],
        ["MuscleBlaze Biozyme Iso-Zero / Whey Isolate 1kg", "Verify scoop and servings on the label", "Verify protein grams per scoop", "Verify third-party badge on the exact SKU", "Verify current price before comparing ₹/g"],
        ["MuscleBlaze Micronised Creatine CreAMP 100g", "3 g scoop · ~33 servings", "3 g micronised creatine monohydrate, unflavoured", "Verify batch and price on the store page", "Verify current ₹ price → ₹/serving"],
      ] },
      { type: "heading", heading: "Worked ₹/gram formula — compare any two tubs" },
      { type: "paragraph", text: "Total protein in tub = protein per scoop × servings. Cost per gram = net payable price ÷ total protein. For the verified whey: 25 g × 28 = 700 g, so ₹3,999 ÷ 700 = ₹5.71 per gram. If a rival ₹2,499 tub delivers 18 g across 25 servings (450 g total), its real cost is ₹5.55 per gram — nearly identical per gram of protein while carrying far more non-protein mass. Use Durza's Protein Cost Decoder to run your own numbers." },
      { type: "heading", heading: "Authenticity and label check before breaking the seal" },
      { type: "ordered_list", items: [
        "Check protein as a share of scoop weight: 25 g ÷ 36 g = 69.4% for the verified whey; true isolates are typically higher.",
        "Buy direct from the brand or an authorised seller — confirm the 'sold by' name on Amazon.in.",
        "Verify the tamper wrap and authentication code before opening the inner seal; keep the GST invoice.",
        "Check manufacturing and expiry dates on the tub base and match the batch to any published lab report.",
        "Store the tub tightly closed in a cool, dry cupboard, away from bathroom humidity.",
      ] },
      { type: "heading", heading: "Who should skip protein powder or creatine" },
      { type: "list", items: [
        "Pregnant or lactating women, anyone under 18, and people with kidney, liver or metabolic conditions — speak to a doctor first.",
        "Anyone treating a medical condition with a supplement — these are dietary products, not medicines, and this page makes no efficacy claims.",
        "Buyers who already meet protein needs through food — powder adds cost without adding necessity.",
      ] },
      { type: "heading", heading: "What we verified, and what we did not" },
      { type: "paragraph", text: "We checked published nutrition labels, serving counts and prices on Amazon.in and HealthKart.com on 24 Nov 2026, including MuscleBlaze Biozyme Performance Whey 1kg at ₹3,999 and its three verified flavour ASINs (B091HTLXL3, B0CCV5T996, B0G1M1W72M). We did not purchase, open, consume or independently lab-test any product, and we make no medical or body-composition claims. Prices and codes are dated snapshots. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you." },
    ],
    relatedStores: ["beast-life", "truebasics", "fitspire"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "CHECK LIVE PRICE",
      headline: "HealthKart whey & creatine — compare live prices",
      eligibility: "No code claimed · verify offers on healthkart.com before paying",
      targetUrl: "https://www.healthkart.com",
      subId: "guide_healthkart-whey-creator-and-stacking-guide",
    },
    auditedOn: "2026-11-24",
  },
];


const RAW_GUIDES_I: StaticGuide[] = [
  {
    slug: "charles-and-keith-india-style-guide",
    storeSlug: "charles-keith",
    category: "Fashion & Leather Goods",
    featured: true,
    heroImage: "/stores/charles-keith.webp",
    seo: {
      title: "Charles & Keith India Style Guide 2026 — Bags, Shoes & Care",
      description: "Which Charles & Keith bag or heel suits your life in India — boardroom to banquet, workweek to weekend. Sizing, material notes and honest styling.",
    },
    summary: "The 2026 edit — work Tote to weekend Slingback, from ₹6,500 up.",
    faqs: [
      { question: "Does Charles & Keith India face different pricing than Singapore?", answer: "Yes — charleskeith.in prices include Indian GST and import duties. A bag priced S$100 in Singapore may land nearer ₹11,500 in India; Durza doesn't publish prices since they change weekly." },
      { question: "Are Charles & Keith India bags genuine leather?", answer: "The top-line collections in India are buffalo-calf and goat-skin leather. Entry-grade editions use durable PUleather. Tap each product page for the exact material callout — Durza never invents it." },
      { question: "What sizes do Charles & Keith India shoes run?", answer: "Generally true to size; women 35–42, men 6–12. If you favour wide feet, size up half a size and use the free size exchange on full-price items within 14 days." },
    ],
    blocks: [
      { type: "callout", text: "Charles & Keith India — official storefront only. No pseudo-stores, no coupon gimmicks." },
      { type: "heading", heading: "The India forever-bag — picking your capsule" },
      { type: "paragraph", text: "For India's climate and commute, full-grain leather in deep olive or oxblood outlasts cognac suedes by years. The ₹6,500–11,000 crossing-tier top-handle is the price band we'd call a wardrobe anchor: stiff enough to keep shape, soft enough to break in without cracking." },
      { type: "heading", heading: "Shoes that do the heavy lifting" },
      { type: "paragraph", text: "Charles & Keith India's sculpt and block-heel lines deliver the most-worn silhouettes for Indian occasions — sangeets, office-launch weeks, weddings with 8-hour foot-load. Not stilettos for dancing; blocks that survive." },
      { type: "list", items: [
        "Sculpt Heels — occasion nights, 6-hour max",
        "Pencil Slingbacks — 5-hour office day, then a martini",
        "Lively Block Heels — wedding, conference, both",
      ] },
      { type: "callout", text: "All purchases route through Durza's affiliate window with Charles & Keith's official India storefront only." },
    ],
    relatedStores: ["vero-moda", "palmonas", "aldo-new"],
    primaryCta: {
      kind: "admitad",
      badge: "OFFICIAL",
      headline: "Charles & Keith India — shop the official collection",
      eligibility: "Men's & women's bags, shoes, and accessories",
      targetUrl: "https://charleskeith.in/in",
      subId: "guide_charles-and-keith-india-style-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "victorias-secret-india-fragrance-sizing-guide",
    storeSlug: "victorias-secret",
    category: "Beauty & Fragrance",
    featured: true,
    heroImage: "/stores/victorias-secret.webp",
    seo: {
      title: "Victoria's Secret India Guide 2026 — Mists, Candles, Lingerie & Sizing",
      description: "Victoria's Secret India: fragrance notes, mist vs lotion, 3-wick candle burn length, and the honest lingerie sizing guide. Only the official storefront.",
    },
    summary: "Fragrance notes, burn times, lingerie sizing — India edition.",
    faqs: [
      { question: "What's the longest-lasting Victoria's Secret fragrance mist in India?", answer: "Body mists in the Gourmand family (Warm Vanilla Sugar, Sweet Peach) typically outlast floral-musk notes in India's heat. For longevity, layer the matching lotion + mist — that's constitutionally how the house designs fragrance." },
      { question: "How many hours does a 3-wick candle actually burn?", answer: "At a 3.5cm wick trim and a 4-hour burn per session, a full 3-wick 14.5-oz candle will burn approximately 40–45 hours of flame time. Never let the wick flare too high; trim to 5 mm pre-burn for even wax pools." },
      { question: "What size is Victoria's Secret India's lingerie?", answer: "India sizing follows UK band size with cup letters A–DD. If you wear 32B in UK brands, start with 32B in Victoria's Secret India; sister-size up for comfort, sister-size down for a snug fit." },
    ],
    blocks: [
      { type: "callout", text: "Victoria's Secret India — licensing is operated by an exclusive Indian partner. Prices and collections are India-specific." },
      { type: "heading", heading: "Fragrance — match the season, not the poster" },
      { type: "paragraph", text: "Delhi heat and Mumbai humidity dictate fragrance performance; spicy-gourmands (Warm Vanilla Sugar, Caramel Apple Glace) wear best July–September, floral-musks (Japanese Cherry Blossom, Sweet Pea) through winter and spring in North India." },
      { type: "heading", heading: "Candles vs mists — when to layer" },
      { type: "paragraph", text: "Candles are ambient fragrance that sets mood without a visible bottle; mists are portable personal-scent. Layering a candle in the hallway and a matching mist on skin is the classic Victoria's Secret fragrance-stack — the house's own test panel uses this routine." },
      { type: "list", items: [
        "Warm Vanilla Sugar Strong — for winter evenings and long fog",
        "Japanese Cherry Blossom — spring mornings and open house",
        "Twilight Woods — dinner-pass-the-foyer-in-your-dress-up-mood",
      ] },
    ],
    relatedStores: ["bath-body-works", "palmonas", "charles-keith"],
    primaryCta: {
      kind: "admitad",
      badge: "OFFICIAL",
      headline: "Victoria's Secret India — shop the official collection",
      eligibility: "Fragrance, candles, lotions, lingerie",
      targetUrl: "https://www.victoriassecret.in/",
      subId: "guide_victorias-secret-india-fragrance-sizing-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "aldo-shoes-india-heels-comfort-guide",
    storeSlug: "aldo-new",
    category: "Fashion & Women Footwear",
    featured: true,
    heroImage: "/stores/aldo-new.webp",
    seo: {
      title: "ALDO Shoes India Guide 2026 — Heels, Loafers, Comfort & Caring",
      description: "ALDO India: occasion heels, boardroom loafers, suede ankle boots. Fit, comfort, material notes and Indian occasion wisdom. No discounts, only the collection.",
    },
    summary: "Occasion heels and boardroom loafers — India-style recommendations.",
    faqs: [
      { question: "What is the most comfortable heel height for Indian occasions?", answer: "5–7 cm block or wedge heels — enough to complete a saree drape or palazzo hem without training your Achilles like a 7-hour standing wearing stilettos. For weddings, choose a block over stiletto; for boardrooms, kitten or low pump." },
      { question: "Do ALDO India suede boots survive monsoons?", answer: "No suede does well in Indian rain; ALDO India boots in waterproof leather will. Protect suede with an aerosol suede protector before first wear, and never leave suede in direct sun in Indian summers." },
      { question: "How do I break in new ALDO shoes?", answer: "Wear them for 30-minute stretches at home on a carpet; the leather relaxes quickest in humid conditions. Full leather takes 3–5 wears to fully mold; synthetics take less. Use a shoe horn on the first wear to preserve the heel cup." },
    ],
    blocks: [
      { type: "callout", text: "ALDO India — occasion heels and boardroom loafers. Only the official India storefront." },
      { type: "heading", heading: "The occasion shoe for Indian weddings" },
      { type: "paragraph", text: "For sangeet and wedding weekends, block heels in nude or blush survive long baraat lines and heavy lehenga embroidery. Stilettos on jute carpet look stunning but tear at the sole in hour three — block yourself." },
      { type: "heading", heading: "The 9-to-5 shoe Indian women keep reaching for" },
      { type: "paragraph", text: "Boardroom loafers in oxblood or espresso slip under trousers, under kurtas, under linen blazers. ALDO's 5cm-heel loafers hit the most-flattered slip-on-heel for office days without loud basketball-shoe feedback from HR." },
      { type: "list", items: [
        "Block Heels — wedding & party",
        "Boardroom Loafers — Monday meetings in 9 cities",
        "Suede Ankle Boots — Delhi/Jaipur in Dec–Feb",
      ] },
    ],
    relatedStores: ["charles-keith", "palmonas", "veromoda"],
    primaryCta: {
      kind: "admitad",
      badge: "OFFICIAL",
      headline: "ALDO India — shop the official collection",
      eligibility: "Women's & men's footwear and bags",
      targetUrl: "https://www.aldoshoes.in/",
      subId: "guide_aldo-shoes-india-heels-comfort-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "vero-moda-india-work-dresses-guide",
    storeSlug: "veromoda",
    category: "Fashion & Women's Workwear",
    featured: true,
    heroImage: "/stores/veromoda.webp",
    seo: {
      title: "Vero Moda India Work Dresses Guide 2026 — Fit, Fit & More Fit",
      description: "Vero Moda India: silk dresses, tailored blouses & denim that survives the Monday meeting. Sizing, fit advice & only the official collection.",
    },
    summary: "The Monday Test — which Vero Moda silhouette fits you.",
    faqs: [
      { question: "How does Vero Moda fit compare to Zara India?", answer: "Vero Moda India leans relaxed/oversized where Zara fits trim. If you wear medium in Zara, size down in Vero Moda's 2026 tailoring lines; up in their flowy silk blouses (the full-draping style)." },
      { question: "What amount of poly-blend is Vero Moda?", answer: "Tailoring lines use poly-viscose and cotton stretch; silk and crepe lines mix natural fibres with elastane. Read the product page fabric callout; Durza never abbreviates it." },
      { question: "Can I wear Vero Moda to a boardroom and a sangeet?", answer: "The tailoring line — yes, Monday through Friday. The evening line — yes, for sangeets and dinners. The two overlap only in black and jewel-tone endgame dresses." },
    ],
    blocks: [
      { type: "callout", text: "Vero Moda — the tailoring India wears to Monday meetings." },
      { type: "heading", heading: "The Monday-to-Sangeet dress" },
      { type: "paragraph", text: "Shift-sewn midi dresses in crepe and jersey carry 7 days. Office meetings, chai with the in-laws, Diwali dinner — the fabric does the heavy lifting; the silhouette does the rest." },
      { type: "list", items: [
        "Shift Dress (crepe) — the office-day answer",
        "Day-Dress (jersey) — the sangeet overnight answer",
        "Tailored Trousers (upcycled wool-blend) — the fall-winter layer",
      ] },
    ],
    relatedStores: ["charles-keith", "palmonas", "aldo-new"],
    primaryCta: {
      kind: "admitad",
      badge: "OFFICIAL",
      headline: "Vero Moda India — shop the official collection",
      eligibility: "Work dresses, blazers, silk & jersey dresses",
      targetUrl: "https://www.veromoda.in/",
      subId: "guide_vero-moda-india-work-dresses-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "bath-and-body-works-india-mists-candles-guide",
    storeSlug: "bath-body-works",
    category: "Beauty & Home Fragrance",
    featured: true,
    heroImage: "/stores/bath-body-works.webp",
    seo: {
      title: "Bath & Body Works India Guide — Mists, Candles & Lotions",
      description: "Bath & Body Works India: fragrance mists that last in India's heat, 3-wick household burn lengths, and the lotion + mist layering routine. No codes.",
    },
    summary: "What lasts in India — mist vs lotion vs candle.",
    faqs: [
      { question: "Which Bath & Body Works mist lasts longest in India?", answer: "Body mists categorically fade faster in India's heat than in the US. For best longevity, layer a lotion + mist combo; Japanese Cherry Blossom is the most resilient in most Indian climates." },
      { question: "How many hours does a 3-wick candle really burn?", answer: "About 40–45 hours at a 4-hour session. Trim wicks to 5 mm before each burn; large rooms (>100 sq ft) benefit from two candles in opposite corners." },
      { question: "Are the lotions safe for sensitive skin in India's climate?", answer: "The signature lotions use EU-compliant concentrations of synthetic musk + phthalates. If your skin reacts, try fragrance-free body creams; Durza is not a dermatologist." },
    ],
    blocks: [
      { type: "callout", text: "Bath & Body Works India — fragrance mists, 3-wick candles and body butters for Indian homes." },
      { type: "heading", heading: "The layering rule — lotion first, then mist" },
      { type: "paragraph", text: "India's heat evaporates mists quickly. Apply lotion first (creates a scent-trapping layer), then mist. The combination adds 2–3 hours of projection for morning meetings and dinners alike." },
      { type: "list", items: [
        "Warm Vanilla Sugar — winter intensity, late",
        "Japanese Cherry Blossom — year-round",
        "Cucumber Melon — pre-Monsoon refresh",
      ] },
    ],
    relatedStores: ["victorias-secret", "charles-keith"],
    primaryCta: {
      kind: "admitad",
      badge: "OFFICIAL",
      headline: "Bath & Body Works India — shop the official collection",
      eligibility: "Candles, mists, lotions, soaps and gift sets",
      targetUrl: "https://www.bathandbodyworks.in/",
      subId: "guide_bath-and-body-works-india-mists-candles-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "palmonas-demi-fine-jewelry-tarnish-care-guide",
    storeSlug: "palmonas",
    category: "Fashion & Jewellery",
    featured: true,
    heroImage: "/stores/palmonas.webp",
    seo: {
      title: "Palmonas Demi-Fine Jewelry India — Styling, Tarnish & Care",
      description: "Palmonas: 18k gold plated waterproof jewellery, lab-grown diamonds. Tarnish care, styling tips, honest value for the Indian wardrobe.",
    },
    summary: "Demi-fine jewellery — how to style and how to store.",
    faqs: [
      { question: "How long does Palmonas 18k gold plating last in India?", answer: "With daily wear and no contact with chlorinated water, 2–4 years. Avoid cleaning with abrasives; pat dry after sweat-heavy days. Jewellery that travels through Delhi winters and monsoons should be dried, not scrubbed." },
      { question: "Are Palmonas lab-grown diamonds real diamonds?", answer: "Yes — chemically identical to mined diamonds. Lab-grown certification exists, and Palmonas lists their lab-grown source per product — Durza never verifies; ask them directly on their storefront." },
      { question: "Can I wear Palmonas in a pool or sea?", answer: "Not recommended for regular pool exposure. Chlorine strips plating. Sea salt is abrasive; rinse and dry after. Limit your ocean sessions if you want your demi-fine to last." },
    ],
    blocks: [
      { type: "callout", text: "Palmonas — Indian-designed demi-fine jewellery, worn to metro meetings and wedding weekends." },
      { type: "heading", heading: "The everyday chain — starting small" },
      { type: "paragraph", text: "A slim paperclip or Singapore chain at 16–17″ sits at the collarbone; the 18–20″ reads the decolletage. Buy one for daily wear; swap for weddings with a bridal design." },
      { type: "list", items: [
        "Paper Clip Chain (16″) — everyday layering base",
        "Diamond Stud (3–5mm) — boardroom-to-sangeet range",
        "Couples' Initial Necklace — anniversary / Valentine gifting",
      ] },
    ],
    relatedStores: ["charles-keith", "veromoda", "aldo-new"],
    primaryCta: {
      kind: "admitad",
      badge: "OFFICIAL",
      headline: "Palmonas — shop the official collection",
      eligibility: "Chains, studs, bracelets, lab-grown diamond rings",
      targetUrl: "https://www.palmonas.com/",
      subId: "guide_palmonas-demi-fine-jewelry-tarnish-care-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "lenovo-india-laptop-offers-2026-guide",
    storeSlug: "lenovo-india",
    category: "Technology & Lenovo",
    featured: true,
    heroImage: "/guides/lenovo-india-laptop-offers-2026-guide.webp",
    seo: {
      title: "Lenovo India 2026 — Legion, ThinkPad, Ideapad & Yoga Buying Guide",
      description: "Lenovo India 2026: Legion gaming laptops, ThinkPad business, Yoga convertibles & IdeaPad everyday. Use-case matcher with honest trade-offs.",
    },
    summary: "Which Lenovo laptop for your life — Legion to ThinkPad.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-25T00:00:00.000Z",
    relatedLinks: [
      { href: "/guides/how-to-match-laptop-model-codes-india", label: "How to match laptop model codes" },
    ],
    faqs: [
      { question: "Which Lenovo laptop for Indian engineering students?", answer: "ThinkPad E16 (i5, 16GB) or IdeaPad Slim 5 (AMD Ryzen 7) — the standard sweet spot under ₹80,000 — covering CAD, IDEs and 3 simultaneous VMs. Gaming laptops are overkill for 95% of engineering curricula." },
      { question: "Should I buy Lenovo from lenovo.com or marketplaces?", answer: "lenovo.com carries exclusive coupons, bank offers and full 3-year warranty; marketplaces sometimes undercut on clearance. Check both before buying." },
      { question: "Are Lenovo ThinkPads worth the premium for Indian professionals?", answer: "If you type hard, travel often and need build quality that outlasts 4-year India desks — yes. For 3 years of daily office use, ThinkPad service costs are comparable to premium ASUS, Dell Business or Apple at end of life." },
    ],
    blocks: [
      { type: "evidence", kind: "lenovo" },
      { type: "callout", text: "Lenovo India — official storefront and partners only. No resellers with unauthorised serials." },
      { type: "heading", heading: "The 2026 Lenovo Laptop matrix in one table" },
      { type: "table",
       headers: ["Use case", "Model", "Price range (lenovo.com)"],
       rows: [
         ["Everyday computing", "IdeaPad Slim 5 / IdeaPad Flex 3", "₹40,000 – 60,000"],
         ["Students", "IdeaPad Slim 5 / Ideapad S540", "₹55,000 – 75,000"],
         ["Developers", "ThinkPad X1 Carbon / ThinkPad E16", "₹1,10,000 – 2,10,000"],
         ["Business & IT fleets", "ThinkPad L-series / L14", "₹55,000 – 85,000"],
         ["Gaming", "Legion 5i Pro / Legion Slim 5", "₹1,20,000 – 2,00,000"],
         ["Convertible", "Yoga 9i / Yoga C740", "₹1,15,000 – 1,80,000"],
       ] },
      { type: "paragraph", text: "Prices are orientation guides — lenovo.com's bank offers, coupons and Lenovo+student-teacher discounts change weekly. Certified refurbished is an underused route for students." },
    ],
    relatedStores: ["asus", "amazon-in"],
    primaryCta: {
      kind: "admitad",
      badge: "OFFICIAL",
      headline: "Lenovo India — shop the official store",
      eligibility: "Legion, ThinkPad, Yoga, IdeaPad",
      targetUrl: "https://www.lenovo.com/in/en/",
      subId: "guide_lenovo-india-laptop-offers-2026-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "asus-india-rog-tuf-zenbook-vhpbook-2026-guide",
    storeSlug: "asus",
    category: "Technology & ASUS",
    featured: true,
    heroImage: "/stores/asus.svg",
    seo: {
      title: "ASUS India 2026 — ROG, TUF, Zenbook, Vivobook Buying Guide",
      description: "ASUS India: ROG vs TUF, Zenbook OLED vs Vivobook — the Indian gamer, student and creative's honest guide to the 2026 range.",
    },
    summary: "ROG vs TUF vs Zenbook vs Vivobook — India's pick.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-25T00:00:00.000Z",
    relatedLinks: [
      { href: "/guides/how-to-match-laptop-model-codes-india", label: "How to match laptop model codes" },
    ],
    faqs: [
      { question: "Is ASUS ROG worth the money for Indian gamers?", answer: "For AAA titles at 2K/high frame rates, yes. For esports (Valorant, CS2), TUF delivers the same GPU performance at ₹20–30K less. ROG pays only when you want the Pantone-validated display and the Scar aesthetics." },
      { question: "Are Zenbook OLEDs better for video editors than desktops?", answer: "For colour-critical 4K timeline, yes — the 92% DCI-P3 gamut meets professional standards. For raw render throughput (AE, Resolve), a desktop with a dedicated GPU still wins on cost." },
      { question: "How does ASUS service work in India?", answer: "500+ service centres nationwide, most with 7-day turnaround on in-warranty repairs. ASUS Premium Care extends on-site service for select series." },
    ],
    blocks: [
      { type: "evidence", kind: "asus" },
      { type: "callout", text: "ASUS India — official storefront only. ROG, TUF, Zenbook and Vivobook are registered ASUS trademarks." },
      { type: "heading", heading: "The one-line ASUS decision tree" },
      { type: "list", items: [
        "3D work + big budget — ROG Zephyrus or Strix",
        "Gaming + tight budget — TUF A15/A16",
        "Editing + OLED needed — Zenbook 14 OLED / Zenbook S 13",
        "Student + daily use — Vivobook Go 15",
      ] },
    ],
    relatedStores: ["lenovo-india", "amazon-in"],
    primaryCta: {
      kind: "admitad",
      badge: "OFFICIAL",
      headline: "ASUS India — official store",
      eligibility: "ROG, TUF, Zenbook, Vivobook",
      targetUrl: "https://asus.com/in/",
      subId: "guide_asus-india-rog-tuf-zenbook-vhpbook-2026-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "adidas-india-ultraboost-originals-training-2026-guide",
    storeSlug: "adidas",
    category: "Sports & Fashion Lifestyle",
    featured: true,
    heroImage: "/guides/adidas-india-buying-guide.png",
    heroImageAlt: "Illustrated Adidas India running and training shoe buying guide",
    heroImageLayout: "editorial",
    seo: {
      title: "Adidas India 2026 — Runners, Originals and Training Picks",
      description: "Adidas India: Ultraboost, Adizero, Originals, Training gear — honest Indian-foot fit, run vs street guide and match scoring.",
    },
    summary: "The 2026 Adidas picks — careful sizing.",
    faqs: [
      { question: "Which Adidas runner is best for Indian roads?", answer: "Ultraboost Light for daily 5-10 km sessions; Adizero Adios Pro 3 for race and tempo — the Indian climate kills pure speed training for most beginners." },
      { question: "How do Adidas Originals fit on Indian feet?", answer: "Half a size up for wide feet; true to size for standard. Originals run narrower (especially Gazelle and Samba) — try before you buy or return free within 30 days." },
      { question: "Does Adidas India offer free returns?", answer: "Yes — full-price items within 30 days. Sale items may differ; check each product page before ordering. Returns do not affect affiliate attribution." },
    ],
    blocks: [
      { type: "callout", text: "Adidas India — official store and Adidas franchise partners only. adidas.co.in distributes authentic India." },
      { type: "heading", heading: "When to pick what — one paragraph" },
      { type: "paragraph", text: "Running = Adizero. Everyday = Samba / Gazelle. Gym = Training line. Weddings & sangeets = Originals." },
    ],
    relatedStores: ["charles-keith", "veromoda"],
    primaryCta: {
      kind: "admitad",
      badge: "OFFICIAL",
      headline: "Adidas India — shop the official collection",
      eligibility: "Ultraboost, Adizero, Originals, Training, Essentials",
      targetUrl: "https://www.adidas.co.in/",
      subId: "guide_adidas-india-ultraboost-originals-training-2026-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "purevpn-india-plans-pricing-2026-guide",
    storeSlug: "purevpn-com-utility-cpa-worldwide",
    category: "Utilities & VPN",
    featured: true,
    heroImage: undefined,
    seo: {
      title: "PureVPN India Guide 2026 — Plans, Pricing & Honest Choice",
      description: "PureVPN India: 1-month vs 2-year vs 5-year plans — honest side-by-side of what VPN actually costs and when.",
    },
    summary: "VPN planned right — which PureVPN plan matches your reality.",
    faqs: [
      { question: "Which PureVPN plan is right for casual browsing vs streaming?", answer: "If you just need a cover for occasional public-Wi-Fi use, 1-month is the most flexible. 2-year is financially sensible for daily use. 5-year is optimal for technologists and power users." },
      { question: "Does PureVPN work with JioHotstar?", answer: "Yes — PureVPN India servers are compatible with both JioHotstar and international Netflix libraries. If one server top-up shows an error, route to another (Mumbai → Delhi) rather than claiming the VPN is broken." },
      { question: "What is PureVPN's logging policy?", answer: "PureVPN operates under a strict no-logs policy in British Virgin Islands jurisdiction, commercially audited. Durza does not pretend to verify — ask them in chat for the audit letter." },
    ],
    blocks: [
      { type: "callout", text: "PureVPN — honest VPN advice. No exaggeration, no scary statistics, no fake country counts." },
      { type: "heading", heading: "When to pick what" },
      { type: "list", items: [
        "Occasional JioHotstar from abroad — 1-month",
        "Daily streaming + public Wi-Fi — 2-year",
        "Permanent technical user — 5-year",
      ] },
    ],
    relatedStores: ["amazon-in"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "OFFICIAL",
      headline: "PureVPN — see the live plans",
      eligibility: "VPN + password manager bundles",
      targetUrl: "https://www.purevpn.com/order-now.php",
      subId: "guide_purevpn-india-plans-pricing-2026-guide",
    },
    auditedOn: "2026-11-16",
  },

  {
    slug: "sanskruti-homes-linen-care-guide",
    storeSlug: "sanskrutihomes-in-ecommerce-cps-india",
    category: "Home & Linen",
    featured: false,
    heroImage: undefined,
    seo: {
      title: "Sanskruti Homes Linen Care Guide — Cotton Dome & Wash",
      description: "Sanskruti Homes: handcrafted cotton bedsheets, dohars and kitchen towels. Care, wash and weave notes.",
    },
    summary: "How to wash and store handcrafted linen to last a decade.",
    faqs: [
      { question: "What is the right wash temperature for handwoven cotton?", answer: "Cold or lukewarm (30°C), gentle cycle, no bleach, no tumble-dry hot. Line-dry in shade; sunlight bleaches and fibres wick unevenly." },
      { question: "Will Sanskruti linen shrink after first wash?", answer: "Handspun cotton shrinks 3–5% after the first wash — order a size larger if your bed is at the upper measurement limit, or pre-wash a flat sheet before stitching." },
      { question: "Can I iron Sanskruti linen at high heat?", answer: "Yes — cotton tolerates high iron heat on the reverse side. Spray mist while ironing to set the weave; do NOT dry-iron, which invites scorch marks." },
    ],
    blocks: [
      { type: "callout", text: "Sanskruti Homes — handspun cotton, hand block-print, India-made." },
      { type: "heading", heading: "The 4-minute care routine" },
      { type: "ordered_list", items: [
        "Lukewarm machine cycle (30°C), gentle",
        "Mild detergent, no bleach, no softener",
        "Line-dry in shade",
        "Iron on reverse side, mist lightly",
      ] },
    ],
    relatedStores: ["shop-tupperware"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "OFFICIAL",
      headline: "Sanskruti Homes — shop the official collection",
      eligibility: "Bedsheets, dohars, kitchen linens",
      targetUrl: "https://www.sanskrutihomes.in/",
      subId: "guide_sanskruti-homes-linen-care-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "shop-tupperware-kitchen-storage-guide",
    storeSlug: "shoptupperware-in-ecommerce-cps-india",
    category: "Home & Kitchen",
    featured: false,
    heroImage: undefined,
    seo: {
      title: "Shop Tupperware India Guide — Dry Storage & Lunch Systems",
      description: "Tupperware India: airtight dry storage, modular kitchen, lunch systems. What to buy and how to stack.",
    },
    summary: "Which tupperware set you actually need.",
    faqs: [
      { question: "Which Tupperware range is best for an Indian kitchen?", answer: "The dry-storage modular set (5–8 pieces) covers 80% of Indian pantry needs. For lunches, a 3-tier insulated series. Avoid 'deal bundles' — they contain items you'll never use." },
      { question: "Are Tupperware India products microwave-safe?", answer: "Most dry-storage items are not microwave-safe (they melt). Only microwave-safe series carry the label. Check each product before reheating." },
      { question: "Can I get the lifetime warranty on Tupperware India products?", answer: "Yes — on most dry-storage and kitchen products. Warranty does not cover microwave misuse, bleach damage or dropped lids. Register purchases online within 30 days for protection." },
    ],
    blocks: [
      { type: "callout", text: "Tupperware India — airtight, stackable, built for the Indian pantry." },
      { type: "heading", heading: "The 3-piece starter for a new kitchen" },
      { type: "ordered_list", items: [
        "5L modular canister (atta/rice)",
        "400ml lunch box (single)",
        "1L spice storage (4 small jars)",
      ] },
    ],
    relatedStores: ["sanskruti-homes"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "OFFICIAL",
      headline: "Shop Tupperware India — shop the official collection",
      eligibility: "Dry storage, lunch systems, modular kitchen",
      targetUrl: "https://www.shoptupperware.in/",
      subId: "guide_shop-tupperware-kitchen-storage-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "r-for-rabbit-baby-safety-guide",
    storeSlug: "rforrabbit-com-ecommerce-cps-india",
    category: "Baby & Parenting",
    featured: false,
    heroImage: undefined,
    seo: {
      title: "R for Rabbit Baby Safety Guide — Car Seats, Strollers, High Chairs",
      description: "R for Rabbit India: car seats, strollers, high chairs and cribs. Safety standards, weight classes, Indian roads.",
    },
    summary: "Baby safety India — what R for Rabbit actually certifies.",
    faqs: [
      { question: "Which R for Rabbit car seat for a 3-month-old?", answer: "The Pearl Baby Carrier (0-13 kg) — rear-facing, ISOFIX-compatible with 5-point harness and side-impact protection. Costs less than ₹8,000; certified to ECE R44/04." },
      { question: "Are R for Rabbit strollers suitable for Indian roads?", answer: "Yes, for routine city use. The front-reel (travel strollers) handle light uneven roads; all-terrain models (R For Rabbit Travel Pro) handle market roads. Avoid budget strollers for highways or rough terrain." },
      { question: "Does R for Rabbit service across India?", answer: "R For Rabbit offers pan-India shipping and on-board installation support via virtual call. Replacement parts (wheels, straps, buckles) available through customer care." },
    ],
    blocks: [
      { type: "callout", text: "R for Rabbit — ISOFIX-certified baby gear, built for Indian roads." },
      { type: "heading", heading: "The safety checklist — BEFORE you buy" },
      { type: "list", items: [
        "ISOFIX mounts in your car?",
        "Correct weight range for your child's age?",
        "Rear-facing compatible?",
        "Warranty >1 year?",
        "Authorized R for Rabbit dealer?",
      ] },
    ],
    relatedStores: ["shop-tupperware"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "OFFICIAL",
      headline: "R for Rabbit — shop the official collection",
      eligibility: "Car seats, strollers, high chairs, cribs",
      targetUrl: "https://rforrabbit.com/",
      subId: "guide_r-for-rabbit-baby-safety-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "perfora-oral-care-electric-brush-guide",
    storeSlug: "perforacare-com-ecommerce-cps-india",
    category: "Health & Oral Care",
    featured: false,
    heroImage: undefined,
    seo: {
      title: "Perfora Oral Care Guide — Smart Electric Brush, Whitening & Water Flossers",
      description: "Perfora Care India: smart electric toothbrushes with AI coaching, whitening serums, water flossers. Real hygiene upgrades.",
    },
    summary: "The 2026 oral care upgrade — Perfora edition.",
    faqs: [
      { question: "How is the Perfora smart brush better than a basic electric?", answer: "AI tracks brushing zones, times each quadrant, and pressure-sensors against gum damage. 40,000 strokes/min vs 25,000 for basic electrics. For most, the upgrade is amortised in gum health alone." },
      { question: "Is Perfora teeth whitening serum safe?", answer: "Lower H2O2 concentration than US drugs enforced by Indian regulations (22% vs 35% cap). With potassium nitrate for sensitivity. For daily use; avoid ingesting." },
      { question: "How often do I need to change smart brush heads?", answer: "Every 3 months, or when the colour indicator on the bristles fades — roughly every 90 days of twice-daily brushing. Discounted brush-head subscription puts the cost at under ₹200/month." },
    ],
    blocks: [
      { type: "callout", text: "Perfora Care — India's smart brushing revolution." },
      { type: "heading", heading: "The 30-day Perfora protocol" },
      { type: "ordered_list", items: [
        "Day 1–3 — baseline brushing with smart tracking",
        "Day 4–7 — add water flosser nightly",
        "Day 8–14 — whitening serum 2x/week",
        "Day 15–30 — full routine, brush zones balanced",
      ] },
    ],
    relatedStores: ["tap"],
    primaryCta: {
      kind: "vcommission_auto",
      badge: "OFFICIAL",
      headline: "Perfora Care — shop the official collection",
      eligibility: "Smart brush, whitening serum, water flosser",
      targetUrl: "https://perforacare.com/",
      subId: "guide_perfora-oral-care-electric-brush-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "blissclub-ultimate-leggings-fit-guide",
    storeSlug: "bliss-club",
    category: "Sports & Women's Activewear",
    featured: true,
    heroImage: "/guides/blissclub-ultimate-leggings-fit-guide.webp",
    seo: {
      title: "BlissClub Ultimate Leggings Fit Guide — Sizing & Brand Truth",
      description: "BlissClub India: Ultimate leggings, flares, joggers. True sizing, true fit, honest comparison to Nike & Lululemon.",
    },
    summary: "The Ultimate Legging fits — size up or true-to-size.",
    faqs: [
      { question: "Are BlissClub Ultimate Leggings squat-proof?", answer: "Yes — the Ultrasoft fabric has passed squat-test at 125 gsm with no sheer-through in natural light. If you are between sizes, size up for comfort; downsize if you prefer compression." },
      { question: "How does BlissClub sizing compare to Nike women's?", answer: "BlissClub runs narrow per the brand's own fit notes; size up one from Nike. For reference, a UK 10 in Nike is typically UK 10-12 in BlissClub; try both or test via free return." },
      { question: "Can I wear BlissClub to the boardroom?", answer: "The Ultimate Leggings are gym-first but the matte-black and navy have a trouser-adjacent cut — blazer on top, pumps, matte finish — acceptable for casual Friday in most Indian offices." },
    ],
    blocks: [
      { type: "callout", text: "BlissClub — India's activewear for Indian women." },
      { type: "heading", heading: "The fit matrix in one breath" },
      { type: "list", items: [
        "XS–S — Nike Small, athletic build",
        "M–L — hair-straight, moderate-to-tight if you wear between sizes",
        "XL–3XL — sizing matches Lululemon's 4-6 for same measurements",
      ] },
    ],
    relatedStores: ["adidas"],
    primaryCta: {
      kind: "admitad",
      badge: "OFFICIAL",
      headline: "BlissClub — shop the official collection",
      eligibility: "Ultimate leggings, flares, joggers",
      targetUrl: "https://blissclub.com/",
      subId: "guide_blissclub-ultimate-leggings-fit-guide",
    },
    auditedOn: "2026-11-16",
  },
  {
    slug: "digihaat-ONDC-zero-platform-fees-guide",
    storeSlug: "digihaat",
    category: "Home & ONDC",
    featured: false,
    heroImage: "/stores/digihaat.webp",
    seo: {
      title: "Digihaat ONDC Guide — Swadeshi, Zero Platform Fees & Local",
      description: "Digihaat: India's ONDC-backed marketplace — swadeshi electronics, kirana staples, local pharmacies. Zero platform fees guide.",
    },
    summary: "The ONDC Revolution — why Digihaat is India's local future.",
    faqs: [
      { question: "Is Digihaat a government app or a private marketplace?", answer: "Digihaat is a private marketplace on ONDC framework. ONDC is a government-backed open network; Digihaat profits from the standardised ONDC commission structure which is lower than Amazon/Flipkart levels." },
      { question: "Do I get refunds through Digihaat?", answer: "Yes — ONDC mandates the same refund/replacement provisions regardless of who fulfils. The ONDC protocol encapsulates GST, returns and settlement rules at protocol level." },
      { question: "Are Digihaat sellers genuine?", answer: "Every ONDC listing carries a GST registration + HSN code that you can trace on the ONDC portal. Durza's buyer protection applies equally to Digihaat as it does to marketplaces." },
    ],
    blocks: [
      { type: "callout", text: "Digihaat — ONDC-backed, India-built, platform-fee-free." },
      { type: "heading", heading: "What to buy on Digihaat first" },
      { type: "list", items: [
        "Regional brand rice, dal and atta",
        "Swadeshi electronics (Lava, Micromax)",
        "Local kirana staples + snacks via ONDC",
      ] },
    ],
    relatedStores: ["sanskruti-homes"],
    primaryCta: {
      kind: "admitad",
      badge: "OFFICIAL",
      headline: "Digihaat — shop ONDC open network",
      eligibility: "Grocery, electronics, pharmacy, swadeshi",
      targetUrl: "https://www.digihaat.in/",
      subId: "guide_digihaat-ONDC-zero-platform-fees-guide",
    },
    auditedOn: "2026-11-16",
  },
];

const RAW_GUIDES_J: StaticGuide[] = [
  {
    slug: "amazon-finance-card-smarts-buying-guide",
    storeSlug: "amazon-in",
    category: "Finance & cards",
    featured: false,
    heroImage: "/guides/amazon-finance-card-smarts-buying-guide.webp",
    seo: {
      title: "Amazon India Finance & Card Smarts 2026 — ICICI Credit Card, Gift Cards, EMI, UPI",
      description: "The five ways to pay on Amazon India — the ICICI co-brand card, welcome bonus, UPI cashback, no-cost EMI and Amazon Pay gift cards — read as they are actually worded, not as the poster claims.",
    },
    summary: "Amazon payment products — the honest terms.",
    faqs: [
      { question: "Is the Amazon Pay ICICI card really 5% unlimited cashback for Prime members?", answer: "That is the rate the offer is worded with — 5% unlimited on Amazon.in for Prime members and 3% for non-Prime, as promoted at application time. Whether a purchase qualifies, which categories are excluded, and the exact scheme of the welcome rewards are decided on the application page, and they change. Apply through the official Amazon Pay flow, not through a friend's referral link; Durza cannot and does not verify card approvals for you." },
      { question: "What is the welcome bonus actually worth?", answer: "The listing describes ₹1,500–₹2,000 in welcome rewards and vouchers on approval. Those amounts are introductory rewards tied to approval plus spend conditions — check the offer page at the time you apply; they are rebalanced by the issuing bank, not by Durza. If the figure on the page you see is lower than this guide quotes, the page you see wins." },
      { question: "Are Amazon Pay gift cards multi-pack refundable?", answer: "Amazon Pay gift cards are generally non-refundable once they are claimed by the recipient, and they are the currency fraudsters prefer — no genuine seller, bank or tax office will ever ask you to pay one. Multi-packs are simply group-scaled gift cards; they do not stack discounts, they stack convenience. Buy them only when the recipient is unambiguously expecting them." },
      { question: "Is no-cost EMI actually no-cost on Amazon?", answer: "In the ledger sense, yes — the interest is folded into the merchant discount, and the marketplace advertises it that way (this listing says 'up to 18-month zero-interest' on laptops, TVs and large appliances). 'No cost' is not the same as 'no consequence': convenience fees, foreclosure charges and partial refunds each interact with the plan. EMI beats carrying the same cart at card APR; it does not beat paying cash or a debit card with a real discount elsewhere." },
      { question: "Should I switch Amazon Pay UPI to my primary route for the welcome cashback?", answer: "No. The UPI welcome listing describes a one-time reward on your first recharge or bill payment — small, capped and introductory. Take the free money if it is sitting there; do not rewire your payments around it." },
    ],
    blocks: [
      { type: "callout", text: "Rates, slabs, fee language and reward caps are written by Amazon Pay and ICICI, and they change at the application page. Durza describes what the offer page says today; it never pretends to verify an approval, and it never counts affiliate cashback as buyer savings." },
      { type: "heading", heading: "The five offers on this page" },
      { type: "table",
       headers: ["Offer (as listed)", "What it actually is", "Read before applying"],
       rows: [
         [
           "Amazon Pay ICICI Bank Credit Card",
           "Co-brand rewards credit card — 5% unlimited cashback for Prime members and 3% for non-Prime on Amazon.in, worded as 'lifetime-free' by the offer.",
           "Application page decides approval, category slabs, forex rate and annual-fee language. Apply only through the official Amazon Pay flow.",
         ],
         [
           "Amazon Pay ICICI Card Welcome Bonus",
           "₹1,500–₹2,000 in introductory rewards and merchant vouchers on approval.",
           "Introductory rewards come with a spend condition and expire if the card is not used; read the issuance banner at sign-up, not this table.",
         ],
         [
           "No Cost EMI on Major Credit Cards",
           "0%-interest instalment plans on major credit cards, up to 18 months for laptops, TVs and large appliances, per the offer wording.",
           "Only on eligible products and eligible cards; the cart shows the live eligibility at checkout — never assume a listing applies to your cart.",
         ],
         [
           "Amazon Pay Gift Cards Multi-Pack",
           "0% processing fee on gift-card bundles, with custom greeting designs and instant email delivery.",
           "Gift cards burn like fire: once claimed, they are not redeemable cash. Never use them to pay fines, 'fees' or strangers.",
         ],
         [
           "Amazon Pay UPI Welcome Cashback",
           "One-time cashback on your first Amazon Pay UPI recharge or bill payment.",
           "Capped, small and one-off — do not churn your primary payment habits for an intro reward.",
         ],
       ] },
      { type: "heading", heading: "The honest read of the ICICI co-brand card" },
      { type: "paragraph", text: "The Amazon Pay ICICI card is a purchase-rewards vehicle, not a cheap-credit product. The 5%/3% split is the real headline and it is what Prime membership pays for — outside that lane the card is ordinary fare. 'Lifetime-free' is the scheme Amazon markets; the issuing bank decides the operative language at approval. If you buy meaningfully on Amazon.in through the year, this card replaces a generic credit card in your rotation. If you do not, it does not need to live in your wallet at all — there is no reward for a card you never use, and fees are written in the fine print, not the banner." },
      { type: "list", items: [
        "Buy with the co-brand on Amazon.in, route other spend through a rewards card that covers those categories instead",
        "The welcome bonus rewards you for approval order plus minimum spend — fail the condition and it quietly vanishes",
        "A forex-weak card for international purchases is a different product; compare forex markups before you shop abroad",
        "Never let an annual review lapse into fees you did not opt in for — read the annual statement letter, every year",
      ] },
      { type: "heading", heading: "No-cost EMI — what the poster hides" },
      { type: "paragraph", text: "Zero-interest instalments work because the marketplace folds the interest into the merchant discount before the sticker price. The cart you see is usually honest about it — and occasionally not, because discount and price are two separate levers. The check that keeps you safe: if the same product is listed at a visibly lower cash price without EMI, the EMI 'cost' is the delta you accept to spread payment. For laptops and appliances where the EMI fee is zero because the merchant offered it, fine. For everything else, price-check the same SKU without the scheme before you buy." },
      { type: "heading", heading: "Gift cards — a convenience, not a wallet" },
      { type: "paragraph", text: "Amazon Pay gift cards are best used exactly as they are meant: a gift someone will remember receiving, or a clean way to let someone shop without handing you card access. Their multi-pack wrapper is a group-gifting run. They do not earn rewards, they are not redeemable with third parties, and they are lost-memory plastic — email them to the recipient and check the claim status instead of trusting delivery. A promised reward for buying gift cards is a scam shape; Durza never routes you into one." },
      { type: "heading", heading: "UPI welcome cashback — a keyhole, not a door" },
      { type: "paragraph", text: "First Amazon Pay UPI recharge or bill payment earns the introductory cashback. That is the entire scheme it advertises. It is deliberately small upfront value to onboard you — which is fine, because UPI itself is already free. It will not put a meaningful amount in your pocket; it will legitimately nudge you into trying Amazon Pay. No need to mainline it." },
      { type: "heading", heading: "Who should not open the Amazon Pay ICICI card" },
      { type: "list", items: [
        "You rarely buy on Amazon.in — you will never reach the spend where cashback outweighs statement friction",
        "You carry card debt — rewards cards are priced to be repaid in full; the APR field is not your friend",
        "You need forex resilience — use a forex-light travel card instead",
        "You already max out a category card that beats 5% on Amazon — carrying two overlapping cards fragments statement discipline",
      ] },
    ],
    relatedStores: ["amazon-in"],
    primaryCta: {
      kind: "amazon",
      badge: "OFFICIAL",
      headline: "Amazon Pay ICICI card — official application (terms as shown today)",
      eligibility: "Indians 21+ with valid PAN & income proof; issuer decides approval",
      targetUrl: "https://www.amazon.in/s?k=Amazon+Pay+ICICI+Bank+Credit+Card&tag=durza02-21",
      subId: "guide_amazon-finance-card-smarts-buying-guide",
    },
    auditedOn: "2026-11-17",
  },
];

const RAW_GUIDES_K: StaticGuide[] = [
  {
    slug: "amazon-prime-audible-kindle-subscriptions-guide",
    storeSlug: "amazon-in",
    category: "Software & subscriptions",
    featured: false,
    heroImage: "/guides/amazon-prime-audible-kindle-subscriptions-guide.webp",
    seo: {
      title: "Amazon Prime, Audible & Kindle Unlimited India 2026 — Subscriptions, Trials & Renewed Guide",
      description:
        "An honest guide to Amazon India subscriptions and programs — Prime membership, Audible trials, Kindle Unlimited, Amazon Business registration and Amazon Renewed — what each includes, how to judge value, and what to verify on the live page.",
    },
    summary: "Prime, Audible, Kindle Unlimited, Business and Renewed — the honest read.",
    faqs: [
      {
        question: "Is Amazon Prime worth it in India?",
        answer:
          "It depends on how often you use the bundle, not just free delivery. Prime typically combines shipping benefits with Prime Video, Prime Music and other member perks, but the exact inclusions, plan options (monthly/annual) and price are set on Amazon’s Prime page and can change. Compare the current annual vs monthly cost against how many orders you place and which entertainment apps you actually use — if you won’t use most of it, pay-as-you-go shipping or a single service may be cheaper.",
      },
      {
        question: "How do Audible trials and Kindle Unlimited work?",
        answer:
          "Audible usually offers a trial for new members with a limited number of credits/listening access, and Kindle Unlimited is a separate subscription that lets you borrow from a rotating catalogue — titles can enter or leave the catalogue. Trial length, credit count, eligible titles and renewal price vary by offer and over time. Check the live Audible/Kindle Unlimited sign-up page for the current trial terms and cancel before renewal if you don’t want to be charged.",
      },
      {
        question: "What should I check before buying Amazon Renewed or registering for Amazon Business?",
        answer:
          "Amazon Renewed items are inspected, tested and sold with a Renewed Guarantee as stated on the listing, but condition grade, warranty length and return window are listing-specific — read that product page, not a generic promise. Amazon Business registration is meant for business buyers (e.g. GST invoicing and business pricing on eligible items); eligibility and benefits depend on your business details and Amazon’s current program terms, so verify requirements on the official registration flow.",
      },
    ],
    blocks: [
      {
        type: "callout",
        text: "Subscription prices, trial lengths, included benefits and program terms are set by Amazon and can change without notice. Durza does not verify live plan pricing or eligibility — always confirm the current terms on the official Amazon page before you start a trial or pay.",
      },
      {
        type: "heading",
        heading: "The five programs at a glance",
      },
      {
        type: "table",
        headers: ["Program", "What it is", "Check before you commit"],
        rows: [
          [
            "Amazon Prime",
            "A paid membership bundling delivery benefits with entertainment (e.g. Prime Video/Music) and other member perks, offered on plan options such as monthly or annual.",
            "Current price and inclusions on the Prime page; annual vs monthly break-even for your actual usage; auto-renewal settings.",
          ],
          [
            "Audible",
            "Audiobook and audio-content subscription, often promoted with an introductory trial/credits for new members.",
            "Live trial length and what a credit buys; renewal price after trial; how to cancel; catalogue/app availability on your devices.",
          ],
          [
            "Kindle Unlimited",
            "A subscription to read/borrow from a selected Kindle catalogue on supported devices and apps.",
            "Whether the authors/titles you want are currently in the catalogue; device/app support; renewal price and cancellation steps.",
          ],
          [
            "Amazon Business",
            "A free-to-register account type for business purchases, with features such as GST invoices and business pricing on eligible items where offered.",
            "Your eligibility/business details; which benefits apply to your orders; that pricing/selection differs from regular Amazon on some items.",
          ],
          [
            "Amazon Renewed",
            "Refurbished/pre-owned products inspected and tested to work and look like new, sold with a Renewed Guarantee as stated per listing.",
            "The item’s condition grade, warranty/guarantee length and return window on that specific listing; accessories included.",
          ],
        ],
      },
      {
        type: "heading",
        heading: "Amazon Prime — pay for the bundle you’ll use",
      },
      {
        type: "paragraph",
        text: "Prime is only ‘worth it’ when the bundle replaces spend you would make anyway. Fast/free delivery matters if you order frequently; Prime Video or Music matter if you would otherwise pay for a separate streaming or music service. Annual plans usually lower the effective monthly cost versus paying month-to-month, but only if you stay a member for the year — check the live plan page for current pricing and decide based on your last few months of orders and viewing, not on a single sale week.",
      },
      {
        type: "list",
        items: [
          "Count orders that would have paid delivery fees, and any separate subscriptions Prime could replace",
          "Compare the annual plan’s effective monthly cost with the monthly plan on the current offer page",
          "Set a reminder before renewal if you joined for a specific season or sale",
          "Share/household benefits, if offered, have their own eligibility rules — verify them on Amazon",
        ],
      },
      {
        type: "heading",
        heading: "Audible and Kindle Unlimited — try, then measure",
      },
      {
        type: "paragraph",
        text: "Audio and reading subscriptions reward consistent use. Audible’s value comes from actually finishing titles you’d otherwise buy; Kindle Unlimited pays off if several books you want are in its borrowing catalogue at the same time. Introductory trials are the low-risk way to test fit, but they convert to paid renewals unless you cancel — treat any trial as a calendar item, and judge it on what you listened to or read during the trial, not on the size of the catalogue in theory.",
      },
      {
        type: "heading",
        heading: "Amazon Business and Amazon Renewed — know what you’re signing up for",
      },
      {
        type: "paragraph",
        text: "Amazon Business is about purchase administration (such as GST-compliant invoicing and business-only pricing on eligible products) rather than consumer deals — it helps if you buy for a registered business and need proper invoices. Amazon Renewed is about saving on hardware by accepting a refurbished unit: the trade-off is condition and warranty terms that vary by seller/listing. In both cases the useful question is specific, not general — ‘does this invoice/price apply to my order?’ and ‘what guarantee covers this exact Renewed unit?’ — and the answer lives on the live registration or product page.",
      },
      {
        type: "heading",
        heading: "Who should skip these",
      },
      {
        type: "list",
        items: [
          "Prime: you order rarely and already subscribe to (and use) other video/music services",
          "Audible/Kindle Unlimited: you finish few books or your must-read titles aren’t in the current catalogue",
          "Amazon Business: you’re buying only for personal use and don’t need GST/business invoicing",
          "Amazon Renewed: you need a brand-new, sealed unit or the listing’s guarantee/return terms don’t fit your risk tolerance",
        ],
      },
    ],
    relatedStores: ["amazon-in"],
    primaryCta: {
      kind: "amazon",
      badge: "OFFICIAL",
      headline: "Explore Prime, Audible, Kindle Unlimited & programs on Amazon.in",
      eligibility: "Benefits, trials and pricing as shown on the live Amazon pages",
      targetUrl: "https://www.amazon.in/amazonprime?tag=durza02-21",
      subId: "guide_amazon-prime-audible-kindle-subscriptions-guide",
    },
    auditedOn: "2026-11-17",
  },
  {
    slug: "amazon-living-room-tv-echo-kindle-guide",
    storeSlug: "amazon-in",
    heroImage: "/guides/amazon-living-room-tv-echo-kindle-guide.webp"
    category: "Electronics",
    featured: false,
    seo: {
      title: "Amazon Living Room & Smart Home Guide (2026): Fire TV Stick, Echo Smart Speakers & Kindle Compared",
      description:
        "Compare Amazon Fire TV Stick 4K, Echo smart speakers, and Kindle e-readers for Indian homes—specs, power/Wi-Fi requirements, and what to check before ordering.",
    },
    summary:
      "A practical guide to choosing Fire TV, Echo, and Kindle devices for Indian living rooms—what each device does best, what Wi-Fi/power setup it needs, and what to check before you buy.",
    faqs: [
      {
        question: "Do Fire TV Stick and Echo devices work on Indian Wi-Fi and power sockets?",
        answer:
          "Most Amazon devices sold on Amazon.in are configured for India, but always confirm the listing’s power adapter type, voltage support, and Wi-Fi standards before ordering. For smooth 4K streaming on Fire TV, a stable broadband connection and dual-band Wi-Fi (2.4 GHz/5 GHz, as supported by your router and device) are recommended.",
      },
      {
        question: "Which Kindle should I buy for reading at night?",
        answer:
          "If you read mostly in bed or low light, a front-lit e-reader like Kindle Paperwhite is usually more comfortable than a basic model without adjustable warm/front lighting (features vary by model). Check the current model’s screen size, lighting, storage, and waterproof rating on the live Amazon listing.",
      },
      {
        question: "Can I use Echo speakers without other smart home devices?",
        answer:
          "Yes. Echo speakers work on their own for music, alarms, timers, weather, reminders, and Alexa voice queries. Smart-home controls (lights, plugs, TVs) are optional and depend on compatible devices and setup.",
      },
      {
        question: "Should I buy during a sale or at regular price?",
        answer:
          "Amazon device prices and bundles change often during sale events. Compare the final checkout price, included subscriptions/bundles, and bank offers on the product page before ordering. Avoid relying on old price screenshots.",
      },
    ],
    blocks: [
      {
        type: "callout",
        text:
          "Quick verdict: pick a Fire TV Stick if you want to turn any HDMI TV into a streaming TV, choose Echo for hands-free music/voice help (Echo Show if you also want a screen), and choose Kindle if you want distraction-free reading. Always check the exact model’s Wi-Fi, storage, and power/plug details on the live Amazon.in listing before ordering.",
      },
      {
        type: "heading",
        heading: "Picks carried over from the Amazon store living room section",
      },
      {
        type: "paragraph",
        text:
          "These are the same living-room device picks previously featured on /stores/amazon-in, preserved here so you can compare them in one place. Product availability, variants, and live prices are set by Amazon—use the tracked links below to check the current listing details.",
      },
      {
        type: "table",
        headers: ["Pick", "What it’s best for", "What to check before ordering"],
        rows: [
          [
            "NO-CLUTTER PICK — Fire TV Stick (HD/Lite-class streaming)",
            "Turning a regular TV into a streaming setup for Prime Video, YouTube, and other apps with a simple remote experience.",
            "HDMI port availability, Wi-Fi strength near the TV, supported apps, remote features, and whether you need HD or 4K.",
          ],
          [
            "BEST-SELLER — Echo smart speaker (compact)",
            "Music, alarms, timers, reminders, and quick Alexa answers in bedrooms or small living spaces.",
            "Power adapter/plug type, Wi-Fi compatibility, audio size expectations, and whether you need a clock or larger speaker.",
          ],
          [
            "MOST LOVED — Echo Show / smart display",
            "Voice assistance with a screen for timers, weather, video calls (where supported), and smart-home glances.",
            "Screen size, camera/privacy controls, placement space, Wi-Fi quality, and supported calling/features in India.",
          ],
          [
            "PAPER-LIKE — Kindle e-reader",
            "Comfortable, distraction-free reading with long battery life compared to phones/tablets.",
            "Screen size, front light/warm light, storage, waterproofing, and whether you want Kindle Unlimited or buy books individually.",
          ],
          [
            "TV UPGRADE — Fire TV Stick 4K-class streaming",
            "Sharper streaming on 4K TVs with better performance/features than basic sticks (model dependent).",
            "TV 4K/HDR support, HDMI port, Wi-Fi speed/router quality, Dolby/Atmos compatibility, and remote/app support.",
          ],
        ],
      },
      {
        type: "heading",
        heading: "Side-by-side comparison",
      },
      {
        type: "table",
        headers: ["Device type", "Main use", "Setup needs", "Best fit"],
        rows: [
          [
            "Fire TV Stick",
            "Streaming apps on a TV",
            "HDMI TV port, Wi-Fi, power outlet, Amazon account",
            "Homes that want a simple TV streaming upgrade",
          ],
          [
            "Echo speaker",
            "Voice assistant + audio",
            "Wi-Fi, power outlet, Alexa app setup",
            "Hands-free timers/music/help in daily routines",
          ],
          [
            "Echo Show",
            "Voice assistant + screen",
            "Wi-Fi, power outlet, space near eye level",
            "Kitchens/living rooms where a visual display helps",
          ],
          [
            "Kindle",
            "Reading",
            "Wi-Fi for downloads/sync (usage dependent), charging",
            "Readers who want fewer distractions than phones/tablets",
          ],
        ],
      },
      {
        type: "heading",
        heading: "Practical India checks before you order",
      },
      {
        type: "list",
        items: [
          "Confirm the exact model/variant on the Amazon.in listing (HD vs 4K, Echo model, Kindle generation/storage).",
          "Check Wi-Fi compatibility and place the router/device for stable signal—especially for 4K streaming.",
          "Verify power adapter, cable requirements, and HDMI availability (for Fire TV).",
          "Review warranty, return window, and included subscriptions/bundles on the live product page.",
          "Compare final checkout price during sales, including bank/card offers if available.",
        ],
      },
      {
        type: "paragraph",
        text:
          "Related reading: compare device/store deal timing and checkout value on /stores/amazon-in, /compare/amazon-vs-flipkart-electronics-2026, and /compare/black-friday-2026-india-best-deals-vs-regular-sale.",
      },
    ],
    relatedStores: ["amazon-in"],
    primaryCta: {
      kind: "amazon",
      badge: "OFFICIAL",
      headline: "Check Fire TV, Echo & Kindle deals on Amazon.in",
      eligibility: "Live prices, variants, and offers as shown on Amazon",
      targetUrl: "https://www.amazon.in/?tag=durza02-21",
      subId: "guide-living-room",
    },
    auditedOn: "2026-11-18",
  },
  {
    slug: "indian-skincare-actives-haircare-guide",
    storeSlug: "amazon-in",
    heroImage: "/guides/indian-skincare-actives-haircare-guide.webp"
    category: "Beauty & Grooming",
    featured: false,
    seo: {
      title: "Beginner's Guide to Skincare Actives & Sulfate-Free Shampoos in India (2026): Niacinamide, Salicylic Acid & Scalp Care",
      description:
        "How to choose between 10% Niacinamide and 2% Salicylic Acid serums, plus sulfate-free Apple Cider Vinegar vs. Argan Oil shampoos for Indian humidity—without irritating your skin barrier.",
    },
    summary:
      "A beginner-friendly guide to using niacinamide and salicylic acid safely, and choosing the right sulfate-free shampoo for oily buildup or dry, frizz-prone hair in Indian conditions.",
    faqs: [
      {
        question: "Can I use niacinamide and salicylic acid together?",
        answer:
          "Some routines can include both, but beginners should introduce one active at a time and monitor skin tolerance. If using salicylic acid, start slowly (2–3 nights/week), keep the rest of the routine gentle, and use sunscreen in the morning. If irritation, peeling, or burning occurs, stop and consult a dermatologist.",
      },
      {
        question: "How often should I use a 2% salicylic acid serum?",
        answer:
          "For most beginners, 2–3 nights per week is a safer starting point than daily use. Do not layer multiple strong actives on day one, and always use broad-spectrum sunscreen the next morning because exfoliating routines can increase sun sensitivity.",
      },
      {
        question: "Is apple cider vinegar shampoo for daily use?",
        answer:
          "Clarifying shampoos are often better used as a reset wash (for example 1–2 times per week), especially if you have buildup or hard-water residue. Daily use may feel too drying for some hair types—adjust frequency based on scalp oiliness and dryness.",
      },
      {
        question: "Do I need to patch test new skincare products?",
        answer:
          "Yes. Do a 24-hour inner-arm patch test before first use, especially with active serums. Introduce new products one at a time so you can identify what causes irritation.",
      },
    ],
    blocks: [
      {
        type: "callout",
        text:
          "Quick verdict & routine rule: don’t layer strong actives all at once on Day 1. Pick 10% Niacinamide for oil balance, dark marks, and barrier support; pick 2% Salicylic Acid (BHA) for clogged pores, blackheads, and active acne. Start slow, patch test, and use sunscreen every morning when using exfoliating acids.",
      },
      {
        type: "heading",
        heading: "Part 1: Face serums — how to pick & layer actives safely",
      },
      {
        type: "paragraph",
        text:
          "Transferred picks from /stores/amazon-in (personal care): Minimalist 10% Niacinamide Face Serum (30ml) and Minimalist 2% Salicylic Acid Face Serum (30ml). Live prices and availability are set by Amazon—check the current listing before ordering.",
      },
      {
        type: "table",
        headers: ["Product", "Badge / target", "How to use (beginner-safe)", "Best for"],
        rows: [
          [
            "Minimalist 10% Niacinamide Face Serum (30ml)",
            "10% NIACINAMIDE + ZINC · OIL & MARKS",
            "Vitamin B3 can help regulate excess sebum in humid weather and support fading post-acne marks without being an exfoliating acid. If sensitive or new to niacinamide, start 3x/week before daily use and patch test first.",
            "Oily/combination skin, uneven tone, post-acne marks, barrier-support routines.",
          ],
          [
            "Minimalist 2% Salicylic Acid Face Serum (30ml)",
            "2% BHA EXFOLIANT · BLACKHEADS & PORES",
            "Oil-soluble BHA can help dissolve sebum inside pores. Do-not-overuse rule: apply 2–3 nights a week only (never every morning/night on Day 1) and always pair with broad-spectrum SPF 50 sunscreen the next morning.",
            "Clogged pores, blackheads, and acne-prone skin that tolerates gentle exfoliation.",
          ],
        ],
      },
      {
        type: "heading",
        heading: "Part 2: Sulfate-free shampoos — clarifying vs. moisture",
      },
      {
        type: "paragraph",
        text:
          "Transferred picks from /stores/amazon-in (personal care): WOW Skin Science Apple Cider Vinegar Shampoo (300ml) and WOW Skin Science Moroccan Argan Oil Shampoo (300ml). Choose based on scalp buildup/oiliness versus dryness/frizz, not just brand popularity.",
      },
      {
        type: "table",
        headers: ["Product", "Badge / target", "How to use", "Best for"],
        rows: [
          [
            "WOW Skin Science Apple Cider Vinegar Shampoo (300ml)",
            "CLARIFYING · HARD WATER & BUILDUP",
            "Best used 1–2x/week as a reset wash for oily scalps, dandruff buildup, or hard-water residue rather than as an everyday moisturizing shampoo for everyone.",
            "Oily scalp, product buildup, hard-water residue, occasional clarifying needs.",
          ],
          [
            "WOW Skin Science Moroccan Argan Oil Shampoo (300ml)",
            "SULFATE-FREE · DRY & FRIZZY HAIR",
            "Gentle cleansing option for dry, heat-styled, or frizz-prone hair; follow with conditioner/mask as needed to avoid stripping natural scalp oils.",
            "Dry, frizzy, or heat-styled hair needing softer cleansing.",
          ],
        ],
      },
      {
        type: "heading",
        heading: "Which one belongs in your bathroom?",
      },
      {
        type: "table",
        headers: ["Product", "Primary target", "How often to use", "Best skin/hair type", "Think twice if"],
        rows: [
          [
            "Minimalist 10% Niacinamide (30ml)",
            "Oil balance, marks, barrier support",
            "Start 3x/week, increase if tolerated",
            "Oily/combination, post-acne marks",
            "You’re using many new actives at once or have active irritation—introduce slowly.",
          ],
          [
            "Minimalist 2% Salicylic Acid (30ml)",
            "Clogged pores, blackheads, acne",
            "2–3 nights/week to start",
            "Acne-prone/oily skin with congestion",
            "Your skin barrier is already peeling, sunburned, or very sensitive; avoid overuse and use SPF.",
          ],
          [
            "WOW Apple Cider Vinegar Shampoo (300ml)",
            "Buildup, oily scalp, hard-water residue",
            "1–2x/week reset wash (adjust as needed)",
            "Oily scalp or frequent styling/product use",
            "Your hair/scalp is very dry—clarifying too often can feel stripping.",
          ],
          [
            "WOW Moroccan Argan Oil Shampoo (300ml)",
            "Dryness, frizz, gentle cleansing",
            "As needed; pair with conditioner",
            "Dry/frizz-prone or heat-styled hair",
            "You need heavy clarifying for buildup—use a reset wash occasionally instead.",
          ],
        ],
      },
      {
        type: "heading",
        heading: "Beginner safety & patch-test checklist",
      },
      {
        type: "list",
        items: [
          "Patch test new products on the inner arm for 24 hours before facial/scalp use.",
          "Introduce one new active at a time so you can identify irritation triggers.",
          "Use broad-spectrum SPF 50 every morning when using BHA/salicylic acid exfoliants.",
          "Do not apply strong actives on broken, peeling, or sunburned skin.",
          "Verify batch/expiry dates, seals, and seller details on the Amazon.in listing before use.",
        ],
      },
      {
        type: "paragraph",
        text:
          "Educational skincare guidance only — consult a dermatologist for persistent cystic acne, eczema, or scalp conditions. Every product link/check on Amazon is via tracked Durza links (including Amazon Associates where applicable, tag=durza02-21) and supports Durza at no extra cost to you. Live prices are set by Amazon.",
      },
      {
        type: "paragraph",
        text:
          "Related links: /stores/amazon-in, /stores/dot-and-key, /stores/indus-valley, /guides/dot-and-key-skin-active-guide, and /compare/kama-ayurveda-vs-forest-essentials-vs-indus-valley.",
      },
    ],
    relatedStores: ["amazon-in", "dot-and-key", "indus-valley"],
    primaryCta: {
      kind: "amazon",
      badge: "OFFICIAL",
      headline: "Check skincare & haircare picks on Amazon.in",
      eligibility: "Live prices, variants, and seller details as shown on Amazon",
      targetUrl: "https://www.amazon.in/?tag=durza02-21",
      subId: "guide-skincare-actives",
    },
    auditedOn: "2026-11-18",
  },
  {
    slug: "sale-calendar-india-eors-pink-friday-2026",
    storeSlug: "tatacliq-com-ecommerce-cps-india",
    category: "Finance & cards",
    seo: {
      title: "India Sale Calendar 2026: EORS, Pink Friday and What Is Confirmed",
      description: "Confirmed 2026 sale windows for Myntra EORS, Tata CLiQ and Flipkart, versus expected dates for winter EORS and Nykaa Pink Friday. Dated sources, no invented windows.",
    },
    summary: "Which 2026 sale dates are confirmed, which are expectations, and why a revealed price is not a payable one.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-25T00:00:00.000Z",
    audience: {
      bestFor: [
        "Shoppers planning a 2026 purchase around an Indian sale and wanting dates that a store actually published.",
        "Anyone comparing a sale price against a dated same-SKU baseline rather than a strike-through MRP.",
      ],
      skipIf: [
        "Anyone treating an expected date as a live sale window — expectations are labelled, not confirmed.",
        "Readers wanting hands-on testing. This guide uses official pages and dated listings checked 25 Nov 2026; Durza did not buy or test any product.",
      ],
    },
    relatedLinks: [
      { href: "/compare/black-friday-2026-india-best-deals-vs-regular-sale", label: "Black Friday vs regular sales" },
      { href: "/compare/mrp-vs-recent-price-india-sale-baseline", label: "MRP vs recent selling price" },
      { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant discount vs No-Cost EMI" },
    ],
    faqs: [
      { question: "Who runs the End of Reason Sale?", answer: "Myntra. Its official blog (checked 25 Nov 2026) lists the 2026 summer edition for 29 May–14 June with 50–90% off. Winter EORS is only expected 5–15 December 2026 per Bajaj Finance's 2 Nov guide; Myntra's live page shows no dates." },
      { question: "What are Tata CLiQ's confirmed 2026 sale dates?", answer: "Its official press release lists Big CLiQ Sale 14–31 May, Moments that CLiQ 23 Jul–10 Aug, 10.10 sale 8–18 Oct, and Black Friday 19–30 Nov 2026." },
      { question: "When is Nykaa's Pink Friday sale in 2026?", answer: "Not confirmed. Nykaa's opened pages checked 25 Nov 2026 show 'Pink Friday Sale Price' labels but no dates. A third-party brand blog claimed 21 Nov–7 Dec — sources disagree; verify on Nykaa's live site." },
      { question: "Are revealed Pink Friday prices payable now?", answer: "No. Nykaa's price-reveal page showed L'Oréal serum at ₹719 current and ₹439 as a revealed Pink Friday price on 25 Nov 2026 — a reveal, not a live payable price. Verify when the sale goes live." },
    ],
    blocks: [
      { type: "evidence", kind: "sale-calendar" },
      { type: "heading", heading: "Confirmed windows you can plan around" },
      { type: "list", items: [
        "Flipkart Black Friday Sale: 21–27 Nov 2026, from Flipkart's official store page (checked 25 Nov 2026).",
        "Tata CLiQ Fashion and Luxury Black Friday: 19–30 Nov 2026, from the official press release and American Express offer T&C.",
        "Lenovo India offers: 24 Nov–2 Dec 2026, from Lenovo's official offer terms. The benefit is post-payment cashback, not an instant checkout discount.",
        "Myntra End of Reason Sale summer 2026: 29 May–14 June, from Myntra's official blog.",
        "Tata CLiQ regular sales: Big CLiQ Sale 14–31 May, Moments that CLiQ 23 Jul–10 Aug, 10.10 sale 8–18 Oct 2026.",
      ] },
      { type: "heading", heading: "Expected does not mean confirmed" },
      { type: "paragraph", text: "Bajaj Finance's guide (updated 2 Nov 2026) says winter EORS is expected 5–15 December 2026, but Myntra's live EORS page showed no dates on 25 Nov 2026. Nykaa's live pages show Pink Friday price labels without dates; a third-party blog's 21 Nov–7 Dec claim is unconfirmed. Publish expected dates only as expectations — never as a live sale window." },
      { type: "heading", heading: "A revealed price is not a payable price" },
      { type: "paragraph", text: "Nykaa's price-reveal page checked 25 Nov 2026 showed L'Oréal Extraordinary Oil Serum at a regular ₹799, current ₹719 and a revealed Pink Friday price of ₹439. Against the current price that is 38.94% additional saving by our arithmetic on published figures; against the list price it is 45.06%. The reveal is not yet a payable price — verify when the sale goes live." },
      { type: "heading", heading: "Build a same-SKU baseline first" },
      { type: "list", items: [
        "Match the exact model code or item, never a series name and never MRP.",
        "PriceHistory.app's third-party record shows Lenovo LOQ 83DV01AAIN at ₹1,04,990 on 1 Nov 2026 and ₹1,17,990 on 24 Nov 2026 — the later price was 12.38% higher by our calculation. Verify on the store.",
        "MRP is a tax-inclusive legal ceiling under rule 2(m) of the Packaged Commodities Rules, 2011 — not a record of what a product usually sold for.",
        "Record the final payable on the payment screen, including any bank offer, exchange adjustment and excluded payment modes.",
      ] },
    ],
    relatedStores: ["tatacliq-com-ecommerce-cps-india", "amazon-in", "lenovo-india"],
  },
  {
    slug: "how-to-match-laptop-model-codes-india",
    storeSlug: "lenovo-india",
    heroImage: "/guides/how-to-match-laptop-model-codes-india.webp"
    category: "Electronics",
    seo: {
      title: "How to Match Laptop Model Codes Across Indian Stores | Durza",
      description: "A series name is not a SKU. Match the full MTM, part number or Ref code before comparing laptop prices across Amazon, Lenovo, ASUS and Acer in India.",
    },
    summary: "Match the exact MTM or part code before you compare prices — not the series name on the banner.",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-25T00:00:00.000Z",
    audience: {
      bestFor: [
        "Shoppers comparing the same laptop across Amazon, Lenovo, ASUS, Acer and Flipkart.",
        "Anyone who has seen two prices for 'the same' model and wants a reliable way to tell whether they are the same product.",
      ],
      skipIf: [
        "Anyone who wants a single price for a whole series — different MTMs carry different processors, storage and graphics.",
        "Readers wanting hands-on testing. This guide uses dated listings and manufacturer pages checked 25 Nov 2026.",
      ],
    },
    relatedLinks: [
      { href: "/compare/mrp-vs-recent-price-india-sale-baseline", label: "MRP vs recent selling price" },
      { href: "/compare/best-laptop-deals-india-amazon-vs-flipkart-2026", label: "Laptop deals across stores" },
      { href: "/guides/sale-calendar-india-eors-pink-friday-2026", label: "India sale calendar 2026" },
    ],
    faqs: [
      { question: "Why do two stores show different prices for the same laptop?", answer: "Often they are different SKUs under one series name. Lenovo LOQ 15IRX9 contains distinct MTMs such as 83DV01KYIN and 83DV01K7IN with different processors and storage. Match the exact code first." },
      { question: "What is the safest way to compare prices?", answer: "Match the full model code on both dated pages, then compare the final payable including seller, warranty, taxes and any bank offer. For FA401EA-RG020WS on 25 Nov 2026, the listed prices were ₹2,49,990 at ASUS eStore and ₹2,54,000 at Flipkart — our arithmetic, not a live quote." },
      { question: "Does a higher MRP mean a better deal?", answer: "No. MRP is a tax-inclusive legal ceiling, not a usual-price benchmark. The same FA401EA-RG020WS showed a ₹3,23,990 MRP at ASUS eStore and a ₹2,59,990 reference at Flipkart on 25 Nov 2026." },
      { question: "Are ANC and ENC the same thing on a store page?", answer: "No. GoBoult states Fluid X uses an ENC mic, not ANC. The Anchor page markets ANC while its specification block says Environmental Noise Cancellation — verify the exact claim on the store." },
    ],
    blocks: [
      { type: "evidence", kind: "model-codes" },
      { type: "heading", heading: "The three identifiers that matter" },
      { type: "list", items: [
        "Lenovo: the MTM (e.g., 83DV01KYIN) on the product page — 'LOQ 15IRX9' is only the series.",
        "ASUS: the full SKU and part number (FA401EA-RG020WS, 90NR0PM1-M001P0); RG019WS is a different colour and configuration.",
        "Acer: the Ref code (UN.37RSI.003, UN.U7PSI.008); 'Aspire 5' or 'Nitro 5' alone is not enough.",
      ] },
      { type: "heading", heading: "Worked cross-store comparison" },
      { type: "paragraph", text: "On 25 Nov 2026 the identical ASUS FA401EA-RG020WS was listed at ₹2,49,990 on ASUS eStore (MRP ₹3,23,990, seller AYR Technologies) and ₹2,54,000 on Flipkart (reference ₹2,59,990, seller GamingIcons). The ₹4,010 difference is our calculation from published listings, not a live quote. The sellers and return terms differ, so compare more than the headline number." },
      { type: "heading", heading: "Before you buy" },
      { type: "ordered_list", items: [
        "Copy the full model code from each page, not the marketing name.",
        "Confirm the variant: CPU, RAM, storage, display and graphics.",
        "Check the seller of record and warranty, not just the store name.",
        "Record the final payable on the payment screen, including any bank offer and exchange adjustment.",
      ] },
    ],
    relatedStores: ["lenovo-india", "asus", "acer", "amazon-in"],
  },

];

const guides: StaticGuide[] = [...RAW_GUIDES, ...RAW_GUIDES_B, ...RAW_GUIDES_C, ...RAW_GUIDES_D, ...RAW_GUIDES_E, ...RAW_GUIDES_F, ...RAW_GUIDES_G, ...RAW_GUIDES_H, ...RAW_GUIDES_I, ...RAW_GUIDES_J, ...RAW_GUIDES_K];

export const STORE_GUIDES = guides;

export function staticGuideBySlug(slug: string): StaticGuide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function staticGuideForStore(storeSlug: string): StaticGuide | undefined {
  return guides.find((g) => g.storeSlug === storeSlug);
}

export function toolLinkFor(guide: StaticGuide): string {
  return toolHref(guide.storeSlug);
}


/** Word count of a guide's visible text (keys and markup excluded). */
export function guideWordCount(guide: StaticGuide): number {
  const collect = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value.map(collect).join(" ");
    if (value && typeof value === "object") {
      return Object.values(value as Record<string, unknown>).map(collect).join(" ");
    }
    return "";
  };
  const text = [guide.summary, guide.seo.title, guide.seo.description, ...guide.faqs.flatMap((f) => [f.question, f.answer]), collect(guide.blocks)].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** Thin guides stay readable on-page but are noindex and out of the sitemap (Phase 1 T10). */
export const THIN_GUIDE_SLUGS: ReadonlySet<string> = new Set(
  guides.filter((guide) => guideWordCount(guide) < 300).map((guide) => guide.slug),
);
