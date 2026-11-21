import { storeGoHref } from "@/lib/go";

export type ProductTag = string;

export interface BeautyProduct {
  id: string;
  name: string;
  brand: string;
  /** One-line reason this product was picked. */
  description: string;
  image: string;
  tag: ProductTag;
  /** Display price label. Use actual INR (e.g. "₹299") when known, else "Check price". */
  priceLabel: string;
  /** Optional MRP label (e.g. "₹499"). */
  mrpLabel?: string;
  /** Discount/offer label shown on card (e.g. "20% off"). Omit when no live price. */
  discountLabel?: string;
  amazonUrl: string;
}

export interface BeautyShopCategory {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  coverImage: string;
  coverAlt: string;
  /** Optional banner/date label shown in UI (e.g. Trending section). */
  updatedLabel?: string;
  theme: {
    gradient: string;
    accent: string;
    soft: string;
    ink: string;
  };
  products: BeautyProduct[];
}

export const BEAUTY_PICK_CHECKED_LABEL = "Picks checked Nov 2026";
export const BEAUTY_TRENDING_DATE_LABEL = "Trending · Nov 2026";

const PLACEHOLDER_IMAGE = "/collections/amazon-beauty-toolkit/product-placeholder.svg";

function p(
  id: string,
  name: string,
  brand: string,
  description: string,
  tag: ProductTag,
  src: string,
  opts?: {
    priceLabel?: string;
    mrpLabel?: string;
    discountLabel?: string;
    image?: string;
    amazonUrl?: string;
  },
): BeautyProduct {
  const priceLabel = opts?.priceLabel ?? "Check price";
  const hasLivePrice = priceLabel !== "Check price" && priceLabel !== "Check price on Amazon";
  return {
    id,
    name,
    brand,
    description,
    image: opts?.image ?? PLACEHOLDER_IMAGE,
    tag,
    priceLabel: priceLabel === "Check price on Amazon" ? "Check price" : priceLabel,
    ...(opts?.mrpLabel ? { mrpLabel: opts.mrpLabel } : {}),
    ...(hasLivePrice && opts?.discountLabel ? { discountLabel: opts.discountLabel } : {}),
    amazonUrl: opts?.amazonUrl ?? storeGoHref("amazon-in", src),
  };
}

export const BEAUTY_SHOP_CATEGORIES: BeautyShopCategory[] = [
  {
    slug: "trending-now",
    title: "Trending Now",
    eyebrow: "What’s getting buzz",
    description: "Fresh, buzz-worthy picks people are reaching for right now—updated monthly from trending beauty finds.",
    coverImage: "/collections/amazon-beauty-toolkit/stage-eyes-lips.webp",
    coverAlt: "Trending beauty and makeup products",
    updatedLabel: BEAUTY_TRENDING_DATE_LABEL,
    theme: {
      gradient: "from-[#2A1024] via-[#7A245A]/65 to-[#F3A6C8]/25",
      accent: "#FFD1E6",
      soft: "rgba(255,209,230,0.18)",
      ink: "#FFF7FB",
    },
    products: [
      p("tr-lip-oil","Dear Darling Oil Tint (06 Pink Oil, 4.2ml)","Etude","Glossy tint-oil finish that gives lips color with a comfortable, juicy look.","Trending · Nov 2026","amazon-beauty-trending-etude-dear-darling-oil-tint",{
        image:"/collections/amazon-beauty-toolkit/products/etude-dear-darling-oil-tint.webp",
        amazonUrl:"https://link.amazon/B019J3PvV",
        priceLabel:"₹600",
        mrpLabel:"₹750",
        discountLabel:"20% off",
      }),
      p("tr-liquid-blush","Liquid Blush","MARS","Blendable liquid blush for a quick, natural flush that’s easy to build.","Trending · Nov 2026","amazon-beauty-trending-mars-liquid-blush",{
        image:"/collections/amazon-beauty-toolkit/products/mars-liquid-blush.webp",
        amazonUrl:"https://www.amazon.in/dp/B0D9HJXYX9",
      }),
      p("tr-blush-wand","Silk Cushion Liquid Blush Wand","Typsy Beauty","Cushion applicator makes blush placement quick for on-the-go touch-ups.","Trending · Nov 2026","amazon-beauty-trending-typsy-blush-wand",{
        image:"/collections/amazon-beauty-toolkit/products/typsy-silk-cushion-blush.webp",
        amazonUrl:"https://www.amazon.in/dp/B0CM3PR7L6",
      }),
      p("tr-lip-cheek-tint","Blush & Juicy Lip & Cheek Tint (Berry Juice, 9ml)","Blue Heaven","One product for lips and cheeks when you want a fast, coordinated look.","Trending · Nov 2026","amazon-beauty-trending-blue-heaven-lip-cheek-tint",{
        image:"/collections/amazon-beauty-toolkit/products/blue-heaven-blush-juicy-tint.webp",
        amazonUrl:"https://link.amazon/B087X0B5L",
      }),
      p("tr-jelly-tint","Summer Slush Jelly Tint","RENEE","Jelly texture gives a fresh, dewy tint for lips and cheeks.","Trending · Nov 2026","amazon-beauty-trending-renee-summer-slush-jelly-tint",{
        image:"/collections/amazon-beauty-toolkit/products/renee-summer-slush-jelly-tint.webp",
        amazonUrl:"https://www.amazon.in/dp/B09X7BWM97",
      }),
      p("tr-sky-tubes","Lash Sensational Sky High Tubes Tubing Mascara (Very Black)","Maybelline","Tubing formula gives length and lift, and removes easily with warm water.","Trending · Nov 2026","amazon-beauty-trending-maybelline-sky-tubes",{
        image:"https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/81D9tOFnxGL._SX679_.jpg",
        amazonUrl:"https://link.amazon/B0bxgK7zv",
        priceLabel:"₹850",
      }),
    ],
  },
  {
    slug: "5-minute-everyday",
    title: "5-Minute Everyday",
    eyebrow: "Quick, skin-first routine",
    description: "A simple, skin-first routine for college, office, and everyday plans—easy steps in application order.",
    coverImage: "/collections/amazon-beauty-toolkit/stage-base.webp",
    coverAlt: "Everyday makeup base and essentials for a quick routine",
    theme: {
      gradient: "from-[#2B211D] via-[#6B4A3A]/70 to-[#D9BFA8]/30",
      accent: "#F3D9C6",
      soft: "rgba(243,217,198,0.18)",
      ink: "#FFF8F1",
    },
    products: [
      p("ed-tinted-moisturiser","Tinted Moisturiser","RENEE","Light coverage with moisture for a quick, natural-looking base.","Everyday Pick","amazon-beauty-everyday-renee-tinted-moisturiser"),
      p("ed-concealer","Fit Me Concealer","Maybelline","Easy spot coverage for under-eyes and blemishes in a quick routine.","Everyday Pick","amazon-beauty-everyday-maybelline-fit-me-concealer"),
      p("ed-lip-cheek","9to5 Weightless Mousse Lip and Cheek Tint","Lakmé","Mousse texture works on lips and cheeks for a fast, coordinated look.","Everyday Pick","amazon-beauty-everyday-lakme-9to5-mousse-tint"),
      p("ed-kajal","NaturStudio All-Day-Wear Kohl Kajal (Black Brilliance)","Plum","Gel kajal designed for comfortable, long-wear everyday definition.","Everyday Pick","amazon-beauty-everyday-plum-naturstudio-kajal"),
      p("ed-mascara","Lash Sensational Sky High Mascara","Maybelline","Lengthening brush gives lifted lashes without a heavy routine.","Bestseller","amazon-beauty-everyday-maybelline-sky-high-mascara",{
        image:"/collections/amazon-beauty-toolkit/products/maybelline-sky-high-mascara.webp",
        amazonUrl:"https://link.amazon/B06HGrdAW",
        priceLabel:"₹497",
        mrpLabel:"₹646",
        discountLabel:"23% off",
      }),
      p("ed-lip-balm","Lip Smooth Color Bloom Lip Balm","Maybelline","Soft color and comfort for dry lips when you want a low-effort finish.","Everyday Pick","amazon-beauty-everyday-maybelline-color-bloom"),
    ],
  },
  {
    slug: "party-glam",
    title: "Party Glam",
    eyebrow: "Bold, photo-ready picks",
    description: "High-impact picks for nights out and celebrations—bold color, shine, and long-wear finishes.",
    coverImage: "/collections/amazon-beauty-toolkit/stage-sculpt.webp",
    coverAlt: "Party glam makeup look with bold eyes and lips",
    theme: {
      gradient: "from-[#1A1029] via-[#4C1D95]/55 to-[#F472B6]/25",
      accent: "#F5D0FE",
      soft: "rgba(245,208,254,0.18)",
      ink: "#FAF5FF",
    },
    products: [
      p("pg-vinyl-ink","SuperStay Vinyl Ink Liquid Lipstick (Witty)","Maybelline","Glossy vinyl finish with long wear for bold party lips.","Glam Pick","amazon-beauty-party-maybelline-vinyl-ink",{
        image:"https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51o4QV3Sf7L._SL1500_.jpg",
        amazonUrl:"https://link.amazon/B0b58xWQW",
        priceLabel:"₹466",
        mrpLabel:"₹559",
        discountLabel:"17% off",
      }),
      p("pg-pen-liner","Ink Black Liquid Pen Eyeliner","MARS","Pen tip helps create sharp wings and defined party eye looks.","Glam Pick","amazon-beauty-party-mars-ink-black-liner"),
      p("pg-felt-liner","Felt Tip Pen Eyeliner","Swiss Beauty","Felt tip gives control for quick, clean eyeliner on busy getting-ready days.","Glam Pick","amazon-beauty-party-swiss-beauty-felt-liner"),
      p("pg-kohl","Dark Spell Kohl Kajal","Sotrue","Matte kohl for intense eye definition that suits evening looks.","Glam Pick","amazon-beauty-party-sotrue-dark-spell-kohl"),
      p("pg-waterproof-mascara","Lash Sensational Sky High Waterproof Mascara (Very Black)","Maybelline","Waterproof length and lift for lashes that hold through long events.","Bestseller","amazon-beauty-party-maybelline-sky-high-waterproof",{
        image:"/collections/amazon-beauty-toolkit/products/maybelline-sky-high-waterproof-mascara.webp",
        amazonUrl:"https://link.amazon/B06HGrdAW",
        priceLabel:"₹497",
        mrpLabel:"₹646",
        discountLabel:"23% off",
      }),
      p("pg-strobing","Face Studio Master Strobing Liquid Illuminating Highlighter","Maybelline","Liquid highlighter adds a photo-ready glow to cheekbones and high points.","Glam Pick","amazon-beauty-party-maybelline-strobing-highlighter"),
    ],
  },
  {
    slug: "wedding-festive",
    title: "Wedding & Festive",
    eyebrow: "Long-wear celebration picks",
    description: "Long-wear, photo-friendly picks for weddings and festive celebrations—built for heat, hugs, and hours.",
    coverImage: "/collections/amazon-beauty-toolkit/stage-prep.webp",
    coverAlt: "Wedding and festive makeup essentials",
    theme: {
      gradient: "from-[#3B1D1D] via-[#7C2D12]/55 to-[#FDE68A]/30",
      accent: "#FDE68A",
      soft: "rgba(253,230,138,0.18)",
      ink: "#FFFBEB",
    },
    products: [
      p("wf-kohl","Kohl of Fame Kajal","MARS","Retractable waterproof kajal for defined eyes through long festive events.","Wedding Pick","amazon-beauty-wedding-mars-kohl-of-fame"),
      p("wf-bold-liner","Colossal Bold Liner (Black)","Maybelline","Bold, smudge-resistant liner for sharp festive eye definition.","Wedding Pick","amazon-beauty-wedding-maybelline-colossal-bold-liner"),
      p("wf-mascara","Colossal Waterproof Mascara (Black)","Maybelline","Waterproof volume that holds up through long wedding days and celebrations.","Bestseller","amazon-beauty-wedding-maybelline-colossal-waterproof-mascara"),
      p("wf-foundation","Fit Me Matte + Poreless Liquid Foundation (310 Sun Beige, 18ml)","Maybelline","Matte, buildable base that helps control shine in warm, humid weather.","Wedding Pick","amazon-beauty-wedding-maybelline-fit-me-foundation",{
        image:"https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51g-y9z75CL._SL1500_.jpg",
        amazonUrl:"https://link.amazon/B0aWYSW77",
        priceLabel:"₹155",
        mrpLabel:"₹217",
        discountLabel:"29% off",
      }),
      p("wf-compact","Weightless Stay Matte Finish Compact Powder (Natural Almond 06, 9g)","FACES CANADA","Matte compact for quick touch-ups to keep shine in check during events.","Wedding Pick","amazon-beauty-wedding-faces-canada-compact",{
        image:"/collections/amazon-beauty-toolkit/products/faces-canada-compact.webp",
        amazonUrl:"https://link.amazon/B07ULHHRJ",
        priceLabel:"Check price",
      }),
      p("wf-liquid-lip","Forever Matte Liquid Lip Colour","Lakmé","Transfer-focused matte lip color for long festive wear with minimal touch-ups.","Wedding Pick","amazon-beauty-wedding-lakme-forever-matte-liquid-lip"),
    ],
  },
  {
    slug: "starter-basics",
    title: "Starter Basics",
    eyebrow: "Start here",
    description: "The simple basics many beginners start with—easy picks before you build a bigger kit.",
    coverImage: "/collections/amazon-beauty-toolkit/hero-vanity.webp",
    coverAlt: "Starter makeup basics for beginners",
    theme: {
      gradient: "from-[#1F2937] via-[#4B5563]/60 to-[#D1D5DB]/25",
      accent: "#E5E7EB",
      soft: "rgba(229,231,235,0.16)",
      ink: "#F9FAFB",
    },
    products: [
      p("st-kajal","Eyeconic Black Kajal (0.35g, Combo Pack of 2)","Lakmé","Smudge-resistant everyday kajal—an easy first step for defining eyes.","Starter Pick","amazon-beauty-starter-lakme-eyeconic-kajal",{
        image:"/collections/amazon-beauty-toolkit/products/lakme-eyeconic-kajal.webp",
        amazonUrl:"https://link.amazon/A07IQZnqD",
        priceLabel:"₹228",
        mrpLabel:"₹319",
        discountLabel:"29% off",
      }),
      p("st-lip-balm","Baby Lips Lip Balm - Cherry Kiss (4g, Buy 1 Get 1)","Maybelline","Soft tint and lip comfort—simple enough for a first everyday lip pick.","Starter Pick","amazon-beauty-starter-maybelline-baby-lips",{
        image:"/collections/amazon-beauty-toolkit/products/maybelline-baby-lips.webp",
        amazonUrl:"https://link.amazon/B0f3JqZ2b",
        priceLabel:"₹189",
        mrpLabel:"₹227",
        discountLabel:"17% off",
      }),
      p("st-compact","Weightless Stay Matte Finish Compact Powder (Natural Almond 06, 9g)","FACES CANADA","Easy matte touch-up compact for controlling shine through the day.","Starter Pick","amazon-beauty-starter-faces-canada-compact",{
        image:"/collections/amazon-beauty-toolkit/products/faces-canada-compact.webp",
        amazonUrl:"https://link.amazon/B07ULHHRJ",
        priceLabel:"Check price",
      }),
      p("st-mascara","Fabulash Volumizing Mascara (12ml, Waterproof)","MARS","Affordable waterproof mascara for adding quick volume to everyday lashes.","Starter Pick","amazon-beauty-starter-mars-fabulash-mascara",{
        image:"https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/5163nAs6jYL._SL1500_.jpg",
        amazonUrl:"https://link.amazon/B0aypELnF",
        priceLabel:"₹209",
        mrpLabel:"₹251",
        discountLabel:"17% off",
      }),
      p("st-brow","Eyebrow Pencil with Spoolie Brush (Dark Brown)","Swiss Beauty","Simple brow pencil with spoolie to fill and tidy brows in one step.","Starter Pick","amazon-beauty-starter-swiss-beauty-brow-pencil",{
        image:"https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51G7S8pfSbL._SL1500_.jpg",
        amazonUrl:"https://link.amazon/B0d5UxmDX",
        priceLabel:"Check price",
      }),
      p("st-bb","Skin Naturals BB Cream - Bright Complete Vitamin C (30g)","Garnier","Light base with a natural finish—easy for beginners who want minimal coverage.","Starter Pick","amazon-beauty-starter-garnier-bb-cream",{
        image:"https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51bzbC89lmL._SL1000_.jpg",
        amazonUrl:"https://link.amazon/B0c0xwHhq",
        priceLabel:"₹206",
      }),
    ],
  },
  {
    slug: "tools-touch-ups",
    title: "Tools & Touch-Ups",
    eyebrow: "Keep it fresh all day",
    description: "The fixers, tools, and touch-up helpers that keep your makeup looking fresh through the day.",
    coverImage: "/collections/amazon-beauty-toolkit/stage-tools.webp",
    coverAlt: "Makeup tools and touch-up essentials",
    theme: {
      gradient: "from-[#1C1917] via-[#57534E]/60 to-[#D6D3D1]/25",
      accent: "#E7E5E4",
      soft: "rgba(231,229,228,0.16)",
      ink: "#FAFAF9",
    },
    products: [
      p("tt-fixer-faces","Ultime Pro Makeup Fixer","FACES CANADA","Setting spray to help makeup stay put through heat and humidity.","Tool Pick","amazon-beauty-tools-faces-canada-makeup-fixer"),
      p("tt-fixer-renee","Bollywood Filter Blurring Setting Spray","RENEE","Blurring setting spray for a smoother finish and longer-lasting makeup.","Tool Pick","amazon-beauty-tools-renee-bollywood-filter-setting-spray"),
      p("tt-sponge","Makeup Sponge","Generic","Damp sponge helps blend base products evenly for a natural finish.","Tool Pick","amazon-beauty-tools-makeup-sponge"),
      p("tt-brush","Blush and Powder Brush","Generic","Soft brush for blending blush or powder without harsh lines.","Tool Pick","amazon-beauty-tools-blush-powder-brush"),
      p("tt-blotting","Blotting Papers","Generic","Quick oil control without adding extra layers of powder.","Tool Pick","amazon-beauty-tools-blotting-papers"),
      p("tt-curler","Eyelash Curler","Generic","Lifts lashes before mascara for a more open, awake look.","Tool Pick","amazon-beauty-tools-eyelash-curler"),
    ],
  },
];

export const ALL_BEAUTY_PRODUCTS = BEAUTY_SHOP_CATEGORIES.flatMap((c) => c.products);

export function getBeautyCategoryBySlug(slug: string): BeautyShopCategory | undefined {
  return BEAUTY_SHOP_CATEGORIES.find((c) => c.slug === slug);
}

export const BEAUTY_BUDGET_FILTERS = [
  { label: "Under ₹300", max: 300 },
  { label: "Under ₹500", max: 500 },
  { label: "Under ₹1,000", max: 1000 },
] as const;

export function parsePriceValue(priceLabel: string): number | null {
  if (!priceLabel || priceLabel === "Check price") return null;
  const m = priceLabel.match(/₹\s*([0-9,]+(?:\.[0-9]+)?)/);
  if (!m) return null;
  return Number(m[1].replace(/,/g, ""));
}

export const BEAUTY_FAQS = [
  {
    question: "How are the categories organized?",
    answer:
      "The page is organized by how people actually shop: Trending Now, 5-Minute Everyday, Party Glam, Wedding & Festive, Starter Basics, and Tools & Touch-Ups. Budget is available as a price filter across categories.",
  },
  {
    question: "Are prices and discounts live?",
    answer:
      "Prices, MRP, and discount labels are indicative and can change. Always check the latest price, offer, and availability on Amazon.in before buying.",
  },
  {
    question: "Why do some products show Check price?",
    answer:
      "When we don’t have a reliable live price to show, we display Check price so you can confirm the current price directly on Amazon.in.",
  },
  {
    question: "How often is Trending Now updated?",
    answer:
      "The Trending Now section is intended to be refreshed monthly using current beauty trends and best-seller signals. Check the date label on the section for the last update.",
  },
] as const;
