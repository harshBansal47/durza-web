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
  opts?: { priceLabel?: string; mrpLabel?: string; discountLabel?: string; image?: string; amazonUrl?: string },
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
    amazonUrl: opts?.amazonUrl ?? storeGoHref("amazon-in", src),
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
      p(
        "cd-kajal",
        "Eyeconic Black Kajal (0.35g, Combo Pack of 2)",
        "Lakmé",
        "Matte, waterproof & smudge-proof twist-up kajal for everyday eyes.",
        "Bestseller",
        "amazon-beauty-cat-college-kajal",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61as79PTNHL._SY355_PIbundle-2,TopRight,0,0_AA355SH20_.jpg",
          amazonUrl: "https://link.amazon/A07IQZnqD",
          priceLabel: "₹228",
          mrpLabel: "₹319",
          discountLabel: "29% off",
        },
      ),
      p(
        "cd-lip-balm",
        "Baby Lips Lip Balm - Cherry Kiss (4g, Buy 1 Get 1)",
        "Maybelline",
        "Soft tint and comfort for dry lips on the go.",
        "Trending",
        "amazon-beauty-cat-college-lipbalm",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/819j6pT42CL._SY550_.jpg",
          amazonUrl: "https://link.amazon/B0f3JqZ2b",
          priceLabel: "₹189",
          mrpLabel: "₹227",
          discountLabel: "17% off",
        },
      ),
      p(
        "cd-compact",
        "Weightless Stay Matte Finish Compact Powder (Natural Almond 06, 9g)",
        "FACES CANADA",
        "SPF 20 matte compact for quick, non-oily shine touch-ups.",
        "Budget Pick",
        "amazon-beauty-cat-college-compact",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61NarR+SUNL._SX425_.jpg",
          amazonUrl: "https://link.amazon/B07ULHHRJ",
          priceLabel: "Check price on Amazon",
          discountLabel: "View live offer",
        },
      ),
      p(
        "cd-mascara",
        "Fabulash Volumizing Mascara (12ml, Waterproof)",
        "MARS",
        "Intense jet-black volume with up to 18 hours stay.",
        "Value Pick",
        "amazon-beauty-cat-college-mascara",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61Ys8pmoRWL._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B06G8grxx",
          priceLabel: "₹209",
          discountLabel: "View live offer",
        },
      ),
      p(
        "cd-brow",
        "Waterproof Eyebrow Pencil with Brush (Black, 1.5g, Pack of 2)",
        "Swiss Beauty",
        "Smudge-proof brow definition with a handy spoolie brush.",
        "Budget Pick",
        "amazon-beauty-cat-college-brow",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51hv1ur+t6L._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B0ifwBa4X",
          priceLabel: "Check price on Amazon",
          discountLabel: "View live offer",
        },
      ),
      p(
        "cd-bb",
        "Skin Naturals BB Cream - Bright Complete Vitamin C (30g)",
        "Garnier",
        "Moisturising, brightening BB cream for an easy everyday base.",
        "Editor’s Pick",
        "amazon-beauty-cat-college-bb",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/41pgitM1A8L._SL1000_.jpg",
          amazonUrl: "https://link.amazon/B0c0xwHhq",
          priceLabel: "₹206",
          discountLabel: "View live offer",
        },
      ),
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
      p(
        "or-primer",
        "Absolute Blur Perfect Matte Face Primer (30ml)",
        "Lakmé",
        "Pore-blurring, smooth makeup base for long-lasting wear.",
        "Bestseller",
        "amazon-beauty-cat-office-primer",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/41cfnEcVZSL._SL1200_.jpg",
          amazonUrl: "https://link.amazon/B07JLJVeS",
          priceLabel: "₹355",
          mrpLabel: "₹408",
          discountLabel: "13% off",
        },
      ),
      p(
        "or-foundation",
        "Fit Me Matte + Poreless Liquid Foundation (310 Sun Beige, 18ml)",
        "Maybelline",
        "Matte, blendable full-coverage base for normal to oily skin.",
        "Bestseller",
        "amazon-beauty-cat-office-foundation",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/41-CQJJY7oL._SX425_.jpg",
          amazonUrl: "https://link.amazon/B0fkdPwzE",
          priceLabel: "₹155",
          mrpLabel: "₹217",
          discountLabel: "29% off",
        },
      ),
      p(
        "or-compact",
        "Fit Me Matte + Poreless Compact Powder (128 Warm Nude)",
        "Maybelline",
        "Matte, poreless-looking finish for handy shine touch-ups.",
        "Trending",
        "amazon-beauty-cat-office-compact",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61FDV10Re5L._SY355_.jpg",
          amazonUrl: "https://link.amazon/B0bTPQB10",
          priceLabel: "₹157",
          mrpLabel: "₹204",
          discountLabel: "23% off",
        },
      ),
      p(
        "or-lip",
        "SuperStay Vinyl Ink Liquid Lipstick (Witty)",
        "Maybelline",
        "Comfortable, long-lasting vinyl ink color for a polished look.",
        "Editor’s Pick",
        "amazon-beauty-cat-office-lip",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51NXnC05rkL._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B05ijfhWi",
          priceLabel: "₹466",
          mrpLabel: "₹536",
          discountLabel: "13% off",
        },
      ),
      p(
        "or-liner",
        "Eye Drama Kajal (Super Black, 0.35g)",
        "Elle 18",
        "Smudge-proof, waterproof kajal for clean everyday eye definition.",
        "Trending",
        "amazon-beauty-cat-office-liner",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/514CrUMHSzL._SL1000_.jpg",
          amazonUrl: "https://link.amazon/B05ZEDTtK",
          priceLabel: "Check price on Amazon",
          discountLabel: "View live offer",
        },
      ),
      p(
        "or-fixer",
        "Long Lasting Makeup Fixer (60ml)",
        "Blue Heaven",
        "Lightweight, quick-dry matte setting spray with Aloe Vera & Vitamins E, B5.",
        "Value Pick",
        "amazon-beauty-cat-office-fixer",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61ThkDlrIlL._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B0bZxS5ym",
          priceLabel: "₹136",
          discountLabel: "View live offer",
        },
      ),
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
      p(
        "pg-palette",
        "Ultimate Eyeshadow Palette Kit-3 (SB-706, Shade-03 Multicolor)",
        "Swiss Beauty",
        "Versatile multicolor shades for quick party and glam eye looks.",
        "Bestseller",
        "amazon-beauty-cat-party-palette",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61Tty-l7HuL._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B08JjiwoD",
          priceLabel: "₹280",
          discountLabel: "View live offer",
        },
      ),
      p(
        "pg-highlighter",
        "Face Studio Master Chrome Metallic Highlighter (Molten Gold)",
        "Maybelline",
        "High-impact molten metallic glow for party-ready cheekbones.",
        "Trending",
        "amazon-beauty-cat-party-highlighter",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61vBHXzf2GL._SX425_.jpg",
          amazonUrl: "https://link.amazon/B0b3iQwfa",
          priceLabel: "₹485",
          mrpLabel: "₹606",
          discountLabel: "20% off",
        },
      ),
      p(
        "pg-liner",
        "New York Kajal (Black, Matte Finish)",
        "Maybelline",
        "Bold matte black kajal for sharp, dramatic eye definition.",
        "Glam Pick",
        "amazon-beauty-cat-party-liner",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61b2tDBxhlL._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B0eLpKC2I",
          priceLabel: "₹199",
          mrpLabel: "₹259",
          discountLabel: "23% off",
        },
      ),
      p(
        "pg-mascara",
        "Lash Sensational Sky High Waterproof Mascara (Very Black)",
        "Maybelline",
        "Length, lift, and waterproof wear for standout party lashes.",
        "Bestseller",
        "amazon-beauty-cat-party-mascara",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/512zBYEenoL._SL1200_.jpg",
          amazonUrl: "https://link.amazon/B06HGrdAW",
          priceLabel: "₹497",
          mrpLabel: "₹646",
          discountLabel: "23% off",
        },
      ),
      p(
        "pg-lip",
        "SuperStay Teddy Tint Lip and Cheek Color (Cool Grunge)",
        "Maybelline",
        "Soft-matte tint for lips and cheeks with a playful party vibe.",
        "Editor’s Pick",
        "amazon-beauty-cat-party-lip",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/5116f8z0omL._SL1080_.jpg",
          amazonUrl: "https://link.amazon/B0hyfbIXt",
          priceLabel: "₹690",
          mrpLabel: "₹793",
          discountLabel: "13% off",
        },
      ),
      p(
        "pg-fixer",
        "Long Lasting Misty Finish Makeup Fixer Spray (70ml)",
        "Swiss Beauty",
        "Lightweight, quick-dry setting spray with Aloe Vera & Vitamin E.",
        "Budget Pick",
        "amazon-beauty-cat-party-fixer",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61yLwQTM2SS._SY450_.jpg",
          amazonUrl: "https://link.amazon/B094ZWfDq",
          priceLabel: "₹216",
          discountLabel: "View live offer",
        },
      ),
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
      p(
        "wf-foundation",
        "Super Stay Lumi Matte Liquid Foundation (115)",
        "Maybelline",
        "Luminous matte, long-wear base for events and festive functions.",
        "Editor’s Pick",
        "amazon-beauty-cat-wedding-foundation",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/41a8cZW+w3L._SX425_.jpg",
          amazonUrl: "https://link.amazon/B0b7DI8Rt",
          priceLabel: "₹453.75",
          mrpLabel: "₹522",
          discountLabel: "13% off",
        },
      ),
      p(
        "wf-powder",
        "Banana Loose Powder (40g)",
        "Insight",
        "Lightweight, oil-absorbing setting powder for long-lasting festive wear.",
        "Trending",
        "amazon-beauty-cat-wedding-powder",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51FxEUVydiL._SL1200_.jpg",
          amazonUrl: "https://link.amazon/B04HNce0U",
          priceLabel: "₹205",
          mrpLabel: "₹266",
          discountLabel: "23% off",
        },
      ),
      p(
        "wf-lip",
        "Creamy Matte Long Lasting Lipstick (17-Sultry Samba)",
        "MARS",
        "Creamy, lightweight matte lip color for a festive statement look.",
        "Bestseller",
        "amazon-beauty-cat-wedding-lip",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71a7j+nsWML._SX425_.jpg",
          amazonUrl: "https://link.amazon/B07X849Wc",
          priceLabel: "₹193",
          discountLabel: "View live offer",
        },
      ),
      p(
        "wf-highlighter",
        "Highlighter for Face & Body (Cosmic Power, 3.5g)",
        "Insight",
        "Creamy, blendable shimmer glow for photos and celebrations.",
        "Glam Pick",
        "amazon-beauty-cat-wedding-highlighter",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71NWKT7FbDL._SX425_.jpg",
          amazonUrl: "https://link.amazon/B084Nxmq9",
          priceLabel: "₹114",
          mrpLabel: "₹148",
          discountLabel: "23% off",
        },
      ),
      p(
        "wf-liner",
        "Tattoo Liquid Eye Liner 48H Dip In (Black)",
        "Maybelline",
        "Precise, long-wear dip-in liquid liner for elegant, defined festive eye looks.",
        "Editor’s Pick",
        "amazon-beauty-cat-wedding-liner",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/413okdPeGxL._SX425_.jpg",
          amazonUrl: "https://link.amazon/B0eJZZic1",
          priceLabel: "₹499",
          mrpLabel: "₹699",
          discountLabel: "29% off",
        },
      ),
      p(
        "wf-fixer",
        "Long Lasting Misty Finish Professional Makeup Fixer Spray (70ml)",
        "Swiss Beauty",
        "Lightweight, quick-dry setting spray with Aloe Vera & Vitamin E for long-lasting makeup.",
        "Value Pick",
        "amazon-beauty-cat-wedding-fixer",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61yLwQTM2SS._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B0cQlZQRK",
          priceLabel: "₹216",
          mrpLabel: "₹281",
          discountLabel: "23% off",
        },
      ),
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
      p(
        "bb-kajal",
        "Eyeconic Black Kajal (0.35g, Combo Pack of 2)",
        "Lakmé",
        "Matte, waterproof & smudge-proof twist-up kajal for everyday eyes.",
        "Bestseller",
        "amazon-beauty-cat-budget-kajal",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61as79PTNHL._SY355_PIbundle-2,TopRight,0,0_AA355SH20_.jpg",
          amazonUrl: "https://link.amazon/A07IQZnqD",
          priceLabel: "₹228",
          mrpLabel: "₹274",
          discountLabel: "17% off",
        },
      ),
      p(
        "bb-mascara",
        "Fabulash Volumizing Mascara (12ml, Waterproof)",
        "MARS",
        "Intense jet-black volume with easy lash lift for daily and party looks.",
        "Budget Pick",
        "amazon-beauty-cat-budget-mascara",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61Ys8pmoRWL._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B06G8grxx",
          priceLabel: "₹209",
          mrpLabel: "₹293",
          discountLabel: "29% off",
        },
      ),
      p(
        "bb-compact",
        "Weightless Stay Matte Finish Compact Powder (Natural Almond 06, 9g)",
        "FACES CANADA",
        "SPF 20 matte compact for easy, non-oily shine control.",
        "Budget Pick",
        "amazon-beauty-cat-budget-compact",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61NarR+SUNL._SX425_.jpg",
          amazonUrl: "https://link.amazon/B07ULHHRJ",
          priceLabel: "Check price on Amazon",
          discountLabel: "View live offer",
        },
      ),
      p(
        "bb-brow",
        "Waterproof Eyebrow Pencil with Brush (Black, 1.5g, Pack of 2)",
        "Swiss Beauty",
        "Smudge-proof brow definition with a handy spoolie brush.",
        "Value Pick",
        "amazon-beauty-cat-budget-brow",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51hv1ur+t6L._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B0ifwBa4X",
          priceLabel: "Check price on Amazon",
          discountLabel: "View live offer",
        },
      ),
      p(
        "bb-lip",
        "Popstar Non-Drying Liquid Mousse Lipstick (21-Pop Off, 6.0ml)",
        "MARS",
        "Lightweight, non-sticky matte mousse lipstick with long-lasting wear.",
        "Trending",
        "amazon-beauty-cat-budget-lip",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71vSn0qzCKL._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B03fqpfng",
          priceLabel: "₹239",
          mrpLabel: "₹287",
          discountLabel: "17% off",
        },
      ),
      p(
        "bb-fixer",
        "Makeup Fixer for Long Lasting Makeup (75ml)",
        "Insight",
        "Hydrating, non-greasy makeup fixer with Aloe Vera for a natural glow.",
        "Value Pick",
        "amazon-beauty-cat-budget-fixer",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61ksMmS9VQL._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B09UtxvrB",
          priceLabel: "Check price on Amazon",
          discountLabel: "View live offer",
        },
      ),
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
      p(
        "ee-kajal",
        "Eyeconic Black Kajal (0.35g, Combo Pack of 2)",
        "Lakmé",
        "Matte, waterproof & smudge-proof twist-up kajal for everyday eyes.",
        "Bestseller",
        "amazon-beauty-cat-essentials-kajal",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61as79PTNHL._SY355_PIbundle-2,TopRight,0,0_AA355SH20_.jpg",
          amazonUrl: "https://link.amazon/A07IQZnqD",
          priceLabel: "₹228",
          discountLabel: "View live offer",
        },
      ),
      p(
        "ee-lip",
        "Lifter Gloss (Petal)",
        "Maybelline",
        "Hydrating glossy lip color for a comfortable everyday shine.",
        "Trending",
        "amazon-beauty-cat-essentials-lip",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/712q5Jf9xuL._SX425_.jpg",
          amazonUrl: "https://link.amazon/B0hupw3Jm",
          priceLabel: "₹479.40",
          discountLabel: "View live offer",
        },
      ),
      p(
        "ee-compact",
        "Fit Me Matte + Poreless Compact Powder (128 Warm Nude)",
        "Maybelline",
        "Matte, poreless-looking finish for everyday shine control.",
        "Bestseller",
        "amazon-beauty-cat-essentials-compact",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61FDV10Re5L._SY355_.jpg",
          amazonUrl: "https://link.amazon/B0bTPQB10",
          priceLabel: "₹157",
          discountLabel: "View live offer",
        },
      ),
      p(
        "ee-mascara",
        "Lash Sensational Sky Tubes Tubing Mascara (Very Black)",
        "Maybelline",
        "Tubing mascara for length and lift with an easy, lightweight feel.",
        "Editor’s Pick",
        "amazon-beauty-cat-essentials-mascara",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61dOMEjhdbL._SL1500_.jpg",
          amazonUrl: "https://link.amazon/B0eIAjuOZ",
          priceLabel: "₹850",
          mrpLabel: "₹977",
          discountLabel: "13% off",
        },
      ),
      p(
        "ee-blush",
        "Blusher (Dusty Rose, 3.5g)",
        "Insight",
        "Blendable, highly pigmented blush for a natural dewy everyday flush.",
        "Value Pick",
        "amazon-beauty-cat-essentials-blush",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/41mmTpAFY+L._SY450_.jpg",
          amazonUrl: "https://link.amazon/B0c8XFWt7",
          priceLabel: "Check price on Amazon",
          discountLabel: "View live offer",
        },
      ),
      p(
        "ee-remover",
        "Micellar Cleansing Water (Hydrating & Soothing, 400ml)",
        "Garnier",
        "Gentle micellar water for easy everyday makeup removal.",
        "Trending",
        "amazon-beauty-cat-essentials-remover",
        {
          image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/41kD6+n9KqL._SL1100_.jpg",
          amazonUrl: "https://link.amazon/B0g14jIO6",
          priceLabel: "₹307.45",
          mrpLabel: "₹354",
          discountLabel: "13% off",
        },
      ),
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
