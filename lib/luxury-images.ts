/**
 * Tier 1 image slots — kept centralised so page layouts and `<LuxuryBrandShowcase>`
 * share the same source of truth. Each entry is a ready-to-paste SlotImage descriptor.
 *
 * Replace the `image` URLs with your own product/campaign images when ready.
 * Leaving a slot empty (`image: null`) is intentional — the component renders a
 * refined neutral placeholder card with collection name + styling note so the
 * page still ships without photos.
 *
 * Collection key map:
 *   bags, fragrance, jewelry, shoes, apparel, home-care
 */

export type LuxurySlot = {
  /** Collection name shown as the editorial label on the card. */
  collection: string;
  /** Short styling / craftsmanship note — 1-2 sentences, magazine tone. */
  styling: string;
  /** Full image URL, or null to render the fallback placeholder. */
  image: string | null;
  /** Alt text used when image is set. */
  alt?: string;
  /** Public fashion house name for the brand line (italicised, e.g. "Charles & Keith"). */
  kicker?: string;
  /** Official store collection path appended to go via `/go/{store}?from=luxury-{collection_slug}` */
  collectionSlug?: string;
};

export const LUXURY_SLOT_DEFAULTS: Record<string, Partial<LuxurySlot>> = {
  charlesAndKeith: {},
  victoriasSecret: {},
  aldoShoes: {},
  veroModa: {},
  bathAndBodyWorks: {},
  palmonas: {},
};

/** Placeholdative collection set for Charles & Keith. Replace `image` strings with real campaign art. */
export const CHARLES_AND_KEITH_SLOTS: LuxurySlot[] = [
  {
    collection: "Structured Top-Handle & Crossbody",
    styling: "Architectural silhouettes in smooth calfskin leather — the wrap-tie handles move with you without losing their shape; a breakfast-to-dinner bag that stays polished.",
    image: null,
    alt: "Charles & Keith structured top-handle handbag",
  },
  {
    collection: "Signature Sculpt Heels",
    styling: "Cubic heel with a pointed-toe last, matte leather upper and softly padded footbed — the heel that flatters silk and survives a late monsoon commute.",
    image: null,
    alt: "Charles & Keith sculpt pumps",
  },
  {
    collection: "Timeless Totes",
    styling: "Full-grain leather totes in deep olive and oxblood — the bags that carry a laptop, linen blazer and groceries without ever looking like they carry something.",
    image: null,
    alt: "Charles & Keith leather tote",
  },
  {
    collection: "Evening Clutch & Minaudière",
    styling: "Structured minaudière and quilted clutch styles — evening pieces that sit quietly beside a minimal watch and never compete.",
    image: null,
    alt: "Charles & Keith evening clutch",
  },
  {
    collection: "Everyday Leather Slides & Mules",
    styling: "Directionally floor-grazing mules in thrown-through leather — engineered for the five minutes from door to desk, not the escape hill-call.",
    image: null,
    alt: "Charles & Keith mules",
  },
  {
    collection: "Fine Grain Pencil Slingbacks",
    styling: "Woven-leather pencil slingbacks with a low, walkable 2cm heel — office-perfect polish, bar-recall vibe.",
    image: null,
    alt: "Charles & Keith pencil slingbacks",
  },
];

export const VICTORIAS_SECRET_SLOTS: LuxurySlot[] = [
  {
    collection: "Fine Fragrance Mists",
    styling: "A veil of warmth — amber, florals and soft musk that lingers from first light to late evening, chosen by those who like their presence remembered, never announced.",
    image: "/stores/victorias-secret/fine-fragrance-mists.jpg",
    alt: "Golden fine fragrance mist bottle in warm, luxurious light",
  },
  {
    collection: "Signature Fragrance — Eau de Parfum",
    styling: "Sculpted glass, ambered depth and a sillage that feels intimate — the kind of fragrance worn as a quiet signature, not a statement.",
    image: "/stores/victorias-secret/signature-eau-de-parfum.jpg",
    alt: "Luxury sculpted glass eau de parfum bottle",
  },
  {
    collection: "Body & Hand Lotions",
    styling: "Silken, slow-absorbing care in the house’s most loved scents — a small daily ritual that leaves skin luminous and evenings softly perfumed.",
    image: "/stores/victorias-secret/body-hand-lotions.jpg",
    alt: "Minimalist luxury body cream and skincare jar",
  },
  {
    collection: "Silk Satin Lingerie",
    styling: "Ruby, noir and midnight satin with delicate lace — pieces cut to feel like a private indulgence, confident, refined and unmistakably feminine.",
    image: "/stores/victorias-secret/silk-satin-lingerie.jpg",
    alt: "Deep ruby silk and lace lingerie flatlay",
  },
  {
    collection: "Signature Sleepwear",
    styling: "Fluid slips and soft lounge silhouettes in the house palette — the kind of comfort you gift to someone special, or keep for yourself.",
    image: "/stores/victorias-secret/signature-sleepwear.jpg",
    alt: "Elegant silk slip sleepwear in soft light",
  },
  {
    collection: "Angels & Bombshell Collections",
    styling: "The icons — blush florals, petal-soft sweetness and timeless allure, a heritage line for those who collect moments as much as scents.",
    image: "/stores/victorias-secret/angels-bombshell.jpg",
    alt: "Blush rose luxury perfume with petals, Bombshell aesthetic",
  },
];

export const ALDO_SHOES_SLOTS: LuxurySlot[] = [
  {
    kicker: "Resort Edit",
    collection: "Accessory: Butter-Soft Leather Sandals",
    styling:
      "Butter-soft leather straps with hand-finished edges and Pillow Walk™ comfort lasts — airy, fold-flat ease in EU sizes made for sunlit getaways.",
    image: "/stores/aldo-shoes/butter-soft-leather-sandals.jpg",
    alt: "Butter-soft leather sandals in warm neutral tones",
  },
  {
    kicker: "Boardroom Staple",
    collection: "Work & Boardroom Loafers",
    styling:
      "Sleek grained leather with brushed hardware and Pillow Walk™ comfort lasts — a polished, slip-on silhouette in EU sizing that carries you from desk to dinner.",
    image: "/stores/aldo-shoes/boardroom-loafers.jpg",
    alt: "Polished leather loafers for work and boardroom wear",
  },
  {
    kicker: "After-Dark Signature",
    collection: "Evening Heels & Pumps",
    styling:
      "Sculpted profiles in patent and suede with brushed hardware accents and Pillow Walk™ comfort lasts — poised height, EU sizing, and all-evening ease.",
    image: "/stores/aldo-shoes/evening-heels-pumps.jpg",
    alt: "Elegant evening heels and pumps",
  },
  {
    kicker: "Gallery Carry",
    collection: "Structured Top-Handle Bags",
    styling:
      "Crisp, architectural lines in croc-embossed leather with brushed hardware — a structured top-handle that holds its form from gallery afternoons to evening plans.",
    image: "/stores/aldo-shoes/structured-top-handle-bags.jpg",
    alt: "Structured top-handle handbag with refined silhouette",
  },
  {
    kicker: "Off-Duty Leather",
    collection: "Trainers & Casual Sneakers",
    styling:
      "Clean leather uppers, subtle brushed hardware details and Pillow Walk™ comfort lasts — refined off-duty ease in EU sizing for the everyday stride.",
    image: "/stores/aldo-shoes/trainers-casual-sneakers.jpg",
    alt: "Casual trainers and lifestyle sneakers",
  },
  {
    kicker: "Winter Capsule",
    collection: "Suede Ankle Boots",
    styling:
      "Genuine suede with an almond toe, brushed hardware and Pillow Walk™ comfort lasts — a stacked-heel boot in EU sizing for composed winter layering.",
    image: "/stores/aldo-shoes/suede-ankle-boots.jpg",
    alt: "Suede ankle boots with stacked heel",
  },
];

export const VERO_MODA_SLOTS: LuxurySlot[] = [
  {
    collection: "The Work Capsule",
    styling: "Crepe blazers, satinette blouses and wide-leg trousers in Belgian charcoal, bone and mulberry — Monday-to-Monday settle, India-air-conditioned-friendly.",
    image: null,
    alt: "Vero Moda work capsule",
  },
  {
    collection: "Evening Wear & Silk Dresses",
    styling: "Liquid satin and crepe dresses with architectural draping — the occasion edit that survives the Diwali sangeet and the afterparty.",
    image: null,
    alt: "Vero Moda evening silk",
  },
  {
    collection: "Summer & Resort",
    styling: "Linen-cotton separates in marigold, sand and forest green — breezy, breathable, and hotel-pool-worthy without trying.",
    image: null,
    alt: "Vero Moda summer resort",
  },
  {
    collection: "Everyday Denim",
    styling: "Straight-leg and mom-fit denim in classic mid-wash and deep indigo — the weekend essential that pairs with everything Indian day-markets stock.",
    image: null,
    alt: "Vero Moda denim",
  },
  {
    collection: "Tailoring & Oversized Suiting",
    styling: "Oversized single- and double-breasted suiting with peak lapels — the Copenhagen-to-Kolkata silhouette that edits itself to Indian boardrooms.",
    image: null,
    alt: "Vero Moda tailoring",
  },
  {
    collection: "Fragrance & Beauty Accessories",
    styling: "Tinted balms, silk scrunchies and cosmetic pouches — the finishing touches Eurobrand women buy on the way to the checkout.",
    image: null,
    alt: "Vero Moda beauty accessories",
  },
];

export const BATH_AND_BODY_WORKS_SLOTS: LuxurySlot[] = [
  {
    kicker: "Floral & Musk",
    collection: "Aromatherapy Fine Fragrance Mists",
    styling:
      "Japanese Cherry Blossom and twilight florals wrapped in soft musk — a fine mist veil that lingers from morning rituals to evening plans.",
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
    alt: "Bath & Body Works aromatherapy fine fragrance mist",
  },
  {
    kicker: "45-Hr Burn · Gourmand",
    collection: "Signature 3-Wick Candles",
    styling:
      "Soy-blend 3-wick candles with a warm, gourmand glow — rich throw and an inviting ambience that fills the room for unhurried evenings.",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    alt: "Bath & Body Works signature 3-wick candle",
  },
  {
    kicker: "24-Hr Shea Moisture",
    collection: "Body Lotions & Butters",
    styling:
      "Cushioning shea body creams and lotions that melt in fast — plush hydration and a soft scent trail for comfortable, cared-for skin.",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    alt: "Bath & Body Works body lotion and shea butter cream",
  },
  {
    kicker: "Foaming Botanical",
    collection: "PocketBac Hand Soaps & Sanitisers",
    styling:
      "Gentle foaming hand soaps and PocketBac essentials in bright botanical notes — everyday freshness that feels clean, light and uplifting.",
    image:
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
    alt: "Bath & Body Works foaming hand soaps and PocketBac sanitisers",
  },
  {
    kicker: "Shower-to-Dawn",
    collection: "Gentle Foaming Body Wash",
    styling:
      "Silky foaming body wash that layers beautifully — a sensorial cleanse that carries from a refreshing shower to an all-day soft scent.",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
    alt: "Bath & Body Works gentle foaming body wash",
  },
  {
    kicker: "Curated Gift Box",
    collection: "Home & Dorm Gift Sets",
    styling:
      "Ready-to-gift fragrance sets and festive hampers — thoughtfully paired mists, creams and candles for effortless, memorable gifting.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    alt: "Bath & Body Works home and dorm gift set",
  },
];

export const PALMONAS_SLOTS: LuxurySlot[] = [
  {
    collection: "Everyday 18k Gold-Plated Chains",
    styling: "Slim Singapore, paperclip and cable chains in 18k gold-plated brass — waterproof, sweat-tested, three shades from discreet ankle to weekend link.",
    image: null,
    alt: "Palmonas gold plated chain",
  },
  {
    collection: "Lab-Grown Diamond Accents",
    styling: "Lab-created diamond solitaires set in white-gold plated sterling — the sparkle of heirlooms without the GIA paperwork.",
    image: null,
    alt: "Palmonas lab grown diamond",
  },
  {
    collection: "Stackable Bracelets & Bangles",
    styling: "Paperclip and herringbone bracelets — stack of two, stack of seven, or the single sculptural cuff — looks intentional either way.",
    image: null,
    alt: "Palmonas stackable bracelet",
  },
  {
    collection: "Daily-Wear Studs & Hoops",
    styling: "Micro-studs and huggie hoops with lab-grown diamonds — the paperweight-to-boardroom-neutral earring set, priced for daily wear.",
    image: null,
    alt: "Palmonas daily wear studs",
  },
  {
    collection: "Charm & Pendant Edits",
    styling: "Star, snake, fig-leaf and eye pendants — every charm is a conversation, every pendant travels from desk to dinner without sliding.",
    image: null,
    alt: "Palmonas charm pendant",
  },
  {
    collection: "Couples & Gift Sets",
    styling: "Interlocking initial necklaces, duo rings and curated gift boxes — anniversary, birthday, Valentine — with silk-box presentation and handwritten card option.",
    image: null,
    alt: "Palmonas couples set",
  },
];
