import { storeGoHref } from "@/lib/go";

export type ProductTag = "Bestseller" | "Trending" | "Budget Pick" | "Editor’s Pick" | "New Favorite" | "Value Pick" | "Glam Pick";

export interface BeautyProduct {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string; // placeholder by default; replace with /collections/amazon-beauty-toolkit/products/...
  tag: ProductTag;
  /** Display price label. Use actual INR (e.g. "₹299") when known, else placeholder text. */
  priceLabel: string;
  /** Optional MRP label (e.g. "₹499"). */
  mrpLabel?: string;
  /** Discount/offer label shown on card (e.g. "20% off" or "Check offers"). */
  discountLabel: string;
  amazonUrl: string;
}

export interface BeautyShopCategory {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  coverImage: string;
  coverAlt: string;
  theme: {
    gradient: string;
    accent: string;
    soft: string;
    ink: string;
  };
  products: BeautyProduct[];
}

const PLACEHOLDER_IMAGE = "/collections/amazon-beauty-toolkit/product-placeholder.svg";

function p(
  id: string,
  name: string,
  brand: string,
  description: string,
  tag: ProductTag,
  src: string,
  opts?: { priceLabel?: string; mrpLabel?: string; discountLabel?: string; image?: string },
): BeautyProduct {
  return {
    id,
    name,
    brand,
    description,
    image: opts?.image ?? PLACEHOLDER_IMAGE,
    tag,
    priceLabel: opts?.priceLabel ?? "Check price on Amazon",
    ...(opts?.mrpLabel ? { mrpLabel: opts.mrpLabel } : {}),
    discountLabel: opts?.discountLabel ?? "View live offer",
    amazonUrl: storeGoHref("amazon-in", src),
  };
}

export const BEAUTY_SHOP_CATEGORIES: BeautyShopCategory[] = [
  {
    slug: "college-daily",
    title: "College & Daily",
    eyebrow: "Quick, fresh, fuss-free",
    description: "Easy everyday picks for classes, commutes, and casual plans—simple to use and easy to carry.",
    coverImage: "/collections/amazon-beauty-toolkit/stage-eyes-lips.webp",
    coverAlt: "Everyday eye and lip makeup essentials for a fresh daily look",
    theme: {
      gradient: "from-[#2B211D] via-[#6B4A3A]/70 to-[#D9BFA8]/30",
      accent: "#F3D9C6",
      soft: "rgba(243,217,198,0.18)",
      ink: "#FFF8F1",
    },
    products: [
      p("cd-kajal", "Eyeconic Kajal", "Lakmé", "Smudge-resistant definition for everyday eyes.", "Bestseller", "amazon-beauty-cat-college-kajal"),
      p("cd-lip-balm", "Baby Lips Lip Balm", "Maybelline", "Soft tint and comfort for dry lips on the go.", "Trending", "amazon-beauty-cat-college-lipbalm"),
      p("cd-compact", "Oil Control Compact Powder", "Blue Heaven", "Quick shine touch-ups between classes.", "Budget Pick", "amazon-beauty-cat-college-compact"),
      p("cd-mascara", "Fabulash Volumizing Mascara", "MARS", "Instant wide-awake lashes in one step.", "Value Pick", "amazon-beauty-cat-college-mascara"),
      p("cd-brow", "Eyebrow Pencil with Spoolie", "Swiss Beauty", "Neat brows that frame your face in minutes.", "Budget Pick", "amazon-beauty-cat-college-brow"),
      p("cd-bb", "BB Cream (Natural Finish)", "Garnier", "Light, easy base for an even daily look.", "Editor’s Pick", "amazon-beauty-cat-college-bb"),
    ],
  },
  {
    slug: "office-ready",
    title: "Office Ready",
    eyebrow: "Polished, comfortable, long-wear",
    description: "Clean basics that look professional and stay comfortable through commutes, meetings, and long days.",
    coverImage: "/collections/amazon-beauty-toolkit/stage-base.webp",
    coverAlt: "Polished base makeup essentials for an office-ready look",
    theme: {
      gradient: "from-[#1E2430] via-[#4A5568]/70 to-[#C7D2E0]/25",
      accent: "#DCE7F5",
      soft: "rgba(220,231,245,0.16)",
      ink: "#F8FBFF",
    },
    products: [
      p("or-primer", "Absolute Blur Perfect Makeup Primer", "Lakmé", "Smooth base that helps makeup sit neatly.", "Bestseller", "amazon-beauty-cat-office-primer"),
      p("or-foundation", "Fit Me Matte + Poreless Foundation", "Maybelline", "Breathable, even-looking base for daily wear.", "Bestseller", "amazon-beauty-cat-office-foundation"),
      p("or-compact", "Fit Me 12H Oil Control Compact", "Maybelline", "Handy T-zone touch-ups through the day.", "Trending", "amazon-beauty-cat-office-compact"),
      p("or-lip", "SuperStay Vinyl/Matte Ink Lip Color", "Maybelline", "Comfortable color that can last a busy day.", "Editor’s Pick", "amazon-beauty-cat-office-lip"),
      p("or-liner", "Colossal Bold Liner & Kajal", "Maybelline", "Clean definition for polished everyday eyes.", "Trending", "amazon-beauty-cat-office-liner"),
      p("or-fixer", "Natural Makeup Fixer (Aloe & Vit E)", "Swiss Beauty", "Refreshing mist to help set your look.", "Value Pick", "amazon-beauty-cat-office-fixer"),
    ],
  },
  {
    slug: "party-glam",
    title: "Party Glam",
    eyebrow: "Bold, luminous, photo-ready",
    description: "Statement eyes, glow, and long-lasting color for birthdays, dinners, and nights out.",
    coverImage: "/collections/amazon-beauty-toolkit/stage-sculpt.webp",
    coverAlt: "Glam makeup products for party looks with glow and bold color",
    theme: {
      gradient: "from-[#2A1020] via-[#7A2E4D]/65 to-[#F0B7C8]/25",
      accent: "#FFD7E3",
      soft: "rgba(255,215,227,0.16)",
      ink: "#FFF6F9",
    },
    products: [
      p("pg-palette", "Fantasy 15-Shade Eyeshadow Palette", "MARS", "Mattes and shimmers for quick party eyes.", "Bestseller", "amazon-beauty-cat-party-palette"),
      p("pg-highlighter", "Master Chrome Metallic Highlighter", "Maybelline", "High-impact glow for cheekbones and corners.", "Trending", "amazon-beauty-cat-party-highlighter"),
      p("pg-liner", "Colossal Bold Liner & Kajal", "Maybelline", "Sharp definition for dramatic eye looks.", "Glam Pick", "amazon-beauty-cat-party-liner"),
      p("pg-mascara", "Lash Sensational Sky High Mascara", "Maybelline", "Length and lift for standout lashes.", "Bestseller", "amazon-beauty-cat-party-mascara"),
      p("pg-lip", "SuperStay Matte Ink Liquid Lipstick", "Maybelline", "Bold, long-wear lip color for nights out.", "Editor’s Pick", "amazon-beauty-cat-party-lip"),
      p("pg-fixer", "Makeup Fixer Spray", "Insight", "Helps lock your glam in place longer.", "Budget Pick", "amazon-beauty-cat-party-fixer"),
    ],
  },
  {
    slug: "wedding-festive",
    title: "Wedding & Festive",
    eyebrow: "Radiant, long-lasting, celebration-ready",
    description: "Long-wear base, rich color, and glow that holds up through functions, photos, and celebrations.",
    coverImage: "/collections/amazon-beauty-toolkit/hero-vanity.webp",
    coverAlt: "Festive and bridal-inspired makeup vanity with luxurious beauty products",
    theme: {
      gradient: "from-[#2A1E12] via-[#7A5A2E]/60 to-[#E8D3A8]/25",
      accent: "#F6E6BF",
      soft: "rgba(246,230,191,0.16)",
      ink: "#FFFBF2",
    },
    products: [
      p("wf-foundation", "Double Wear Stay-in-Place Makeup", "Estée Lauder", "Long-wear base for events and functions.", "Editor’s Pick", "amazon-beauty-cat-wedding-foundation"),
      p("wf-powder", "Easy Bake Loose Baking Powder", "Huda Beauty", "Helps set base and concealer for extended wear.", "Trending", "amazon-beauty-cat-wedding-powder"),
      p("wf-lip", "MACximal Silky Matte Lipstick", "MAC", "Classic statement lip for festive looks.", "Bestseller", "amazon-beauty-cat-wedding-lip"),
      p("wf-highlighter", "Mineralize Skinfinish Highlighter", "MAC", "Soft luxe sheen for photos and celebrations.", "Glam Pick", "amazon-beauty-cat-wedding-highlighter"),
      p("wf-liner", "Quick Dry Liquid Eyeliner", "Kay Beauty", "Precise definition for elegant eye looks.", "Editor’s Pick", "amazon-beauty-cat-wedding-liner"),
      p("wf-fixer", "Natural Makeup Fixer (Aloe & Vit E)", "Swiss Beauty", "Finishing mist to help makeup look set.", "Value Pick", "amazon-beauty-cat-wedding-fixer"),
    ],
  },
  {
    slug: "budget-beauty",
    title: "Budget Beauty",
    eyebrow: "Smart finds, happy prices",
    description: "Affordable everyday picks and pocket-friendly upgrades—great for building your kit without overspending.",
    coverImage: "/collections/amazon-beauty-toolkit/stage-tools.webp",
    coverAlt: "Affordable makeup tools and essentials arranged on a vanity",
    theme: {
      gradient: "from-[#10241B] via-[#2E6B52]/60 to-[#BFE6D2]/25",
      accent: "#DFF7EA",
      soft: "rgba(223,247,234,0.16)",
      ink: "#F3FFF9",
    },
    products: [
      p("bb-kajal", "Eyeconic Kajal", "Lakmé", "Dependable everyday kajal at a friendly price.", "Bestseller", "amazon-beauty-cat-budget-kajal"),
      p("bb-mascara", "Fabulash Volumizing Mascara", "MARS", "Easy lash lift for daily and party looks.", "Budget Pick", "amazon-beauty-cat-budget-mascara"),
      p("bb-compact", "Oil Control Compact Powder", "Blue Heaven", "Simple shine control for beginners.", "Budget Pick", "amazon-beauty-cat-budget-compact"),
      p("bb-brow", "Eyebrow Pencil with Spoolie", "Swiss Beauty", "Quick brow shaping for a polished look.", "Value Pick", "amazon-beauty-cat-budget-brow"),
      p("bb-lip", "Non-Transfer Matte Liquid Lipstick", "Insight", "Affordable long-wear lip color options.", "Trending", "amazon-beauty-cat-budget-lip"),
      p("bb-fixer", "Makeup Fixer Spray", "Insight", "Budget-friendly finishing spray for longer wear.", "Value Pick", "amazon-beauty-cat-budget-fixer"),
    ],
  },
  {
    slug: "everyday-essentials",
    title: "Everyday Essentials",
    eyebrow: "Your simple makeup bag",
    description: "Practical basics for a natural everyday look—easy to use, easy to mix, and beginner-friendly.",
    coverImage: "/collections/amazon-beauty-toolkit/stage-prep.webp",
    coverAlt: "Simple everyday makeup essentials for a natural look",
    theme: {
      gradient: "from-[#2A231C] via-[#6A5846]/60 to-[#E6D7C6]/25",
      accent: "#F1E3D3",
      soft: "rgba(241,227,211,0.16)",
      ink: "#FFFAF4",
    },
    products: [
      p("ee-kajal", "Eyeconic Kajal", "Lakmé", "Defines eyes quickly for a fresh, awake look.", "Bestseller", "amazon-beauty-cat-essentials-kajal"),
      p("ee-lip", "Lifter Gloss / Everyday Lip Color", "Maybelline", "Comfortable color or shine in one step.", "Trending", "amazon-beauty-cat-essentials-lip"),
      p("ee-compact", "Fit Me 12H Oil Control Compact", "Maybelline", "Sets light base and controls daily shine.", "Bestseller", "amazon-beauty-cat-essentials-compact"),
      p("ee-mascara", "Lash Sensational Sky High Mascara", "Maybelline", "Opens up the eyes without heavy makeup.", "Editor’s Pick", "amazon-beauty-cat-essentials-mascara"),
      p("ee-blush", "Crème Blusher (Soft Rose / Peach)", "Insight", "Healthy flush for a natural everyday glow.", "Value Pick", "amazon-beauty-cat-essentials-blush"),
      p("ee-remover", "Micellar Cleansing Water", "Garnier", "Gentle makeup removal to end the day right.", "Trending", "amazon-beauty-cat-essentials-remover"),
    ],
  },
];

export function getBeautyCategoryBySlug(slug: string): BeautyShopCategory | undefined {
  return BEAUTY_SHOP_CATEGORIES.find((c) => c.slug === slug);
}

export const ALL_BEAUTY_PRODUCTS = BEAUTY_SHOP_CATEGORIES.flatMap((c) => c.products);

/** Back-compat export: some pages/components may import FAQs; keep minimal helpful FAQs. */
export const BEAUTY_FAQS = [
  {
    question: "How do I choose the right shade for my skin tone?",
    answer:
      "Check undertone (warm, cool, neutral, or olive) and swatch base products on your jawline in natural daylight. When in doubt, compare swatches/reviews and shade guides on Amazon.in before buying.",
  },
  {
    question: "What makeup works better in Indian heat and humidity?",
    answer:
      "Use lightweight layers, a gripping primer, compact/loose powder on oily areas, smudge-resistant eye products, and a setting spray. Touch up instead of layering heavily, and always check product details on Amazon.in.",
  },
  {
    question: "Are prices and offers final on this page?",
    answer:
      "No. Prices, MRP, discounts, availability, shades, and sellers can change on Amazon.in. Use the product button to check the latest live details on Amazon.",
  },
];

/** Back-compat placeholder for older imports; not used by the new storefront layout. */
export const AMAZON_BEAUTY_STAGES: never[] = [];
export const BEAUTY_CHAPTERS = AMAZON_BEAUTY_STAGES;
