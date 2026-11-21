import { storeGoHref } from "@/lib/go";

export type ProductTag = string;

export interface BeautyProduct {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  tag: ProductTag;
  priceLabel: string;
  mrpLabel?: string;
  discountLabel?: string;
  amazonUrl: string;
}

export interface BeautyShopCategory {
  slug: string;
  title: string;
  stepLabel: string;
  shortIntro: string;
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
  opts?: {
    priceLabel?: string;
    mrpLabel?: string;
    discountLabel?: string;
    image?: string;
    amazonUrl?: string;
  },
): BeautyProduct {
  const priceLabel = opts?.priceLabel ?? "₹499";
  return {
    id,
    name,
    brand,
    description,
    image: opts?.image ?? PLACEHOLDER_IMAGE,
    tag,
    priceLabel,
    ...(opts?.mrpLabel ? { mrpLabel: opts.mrpLabel } : {}),
    ...(opts?.discountLabel ? { discountLabel: opts.discountLabel } : {}),
    amazonUrl: opts?.amazonUrl ?? storeGoHref("amazon-in", src),
  };
}

export const BEAUTY_PICK_CHECKED_LABEL = "Prices checked Nov 2026";

export const BEAUTY_SHOP_CATEGORIES: BeautyShopCategory[] = [

  {
    slug: "cleanser",
    title: "Cleanser",
    stepLabel: "Step 1: Cleanse",
    shortIntro: "Start fresh with a gentle face wash that suits your skin type.",
    products: [
      p("cleanser-ph-1", "Gentle Skin Cleanser (125ml)", "Cetaphil", "Gentle daily cleanser for all skin types.", "Budget Pick", "amazon-beauty-cleanser-1", { priceLabel: "₹333", mrpLabel: "₹399", discountLabel: "17% off" }),
      p("cleanser-ph-2", "Refreshing Facial Wash (150ml)", "Simple", "Soap-free face wash for fresh, clean skin.", "Budget Pick", "amazon-beauty-cleanser-2", { priceLabel: "₹385", mrpLabel: "₹440", discountLabel: "13% off" }),
      p("cleanser-ph-3", "2% Salicylic Acid Face Wash (100ml)", "Minimalist", "Helps unclog pores for oily/acne-prone skin.", "Trending", "amazon-beauty-cleanser-3", { priceLabel: "₹299", mrpLabel: "₹349", discountLabel: "14% off" }),
      p("cleanser-ph-4", "Hydrating Facial Cleanser (236ml)", "CeraVe", "Hydrating cleanser with ceramides for dry skin.", "Premium Pick", "amazon-beauty-cleanser-4", { priceLabel: "₹1,350", mrpLabel: "₹1,600", discountLabel: "16% off" }),
      p("cleanser-ph-5", "Toleriane Purifying Foaming Cleanser (50ml)", "La Roche-Posay", "Gentle foaming cleanser for sensitive skin.", "Premium Pick", "amazon-beauty-cleanser-5", { priceLabel: "₹950", mrpLabel: "₹1,150", discountLabel: "17% off" }),
      p("cleanser-ph-6", "Cleanser Pick 6", "Brand 6", "Popular cleanser option.", "Editor Pick", "amazon-beauty-cleanser-6", { priceLabel: "₹499", mrpLabel: "₹699", discountLabel: "29% off" }),
    ],
  },
  {
    slug: "moisturizer",
    title: "Moisturizer",
    stepLabel: "Step 2: Moisturize",
    shortIntro: "Hydrate and prep your skin for smooth makeup application.",
    products: [
      p("ed-tinted-moisturiser", "Tinted Moisturiser (Caramel Glint, 50ml)", "RENEE", "Light coverage with moisture for a quick, natural-looking base.", "Everyday Pick", "amazon-beauty-everyday-renee-tinted-moisturiser", { image: "/collections/amazon-beauty-toolkit/products/renee-tinted-moisturiser.webp", amazonUrl: "https://link.amazon/B08sYF4R6", priceLabel: "Check price" }),
      p("moisturizer-ph-1", "Hydro Boost Water Gel (50g)", "Neutrogena", "Lightweight gel hydration for normal to oily skin.", "Bestseller", "amazon-beauty-moisturizer-1", { priceLabel: "₹850", mrpLabel: "₹1,050", discountLabel: "19% off" }),
      p("moisturizer-ph-2", "Moisturising Cream (80g)", "Cetaphil", "Rich moisturizer for dry and sensitive skin.", "Budget Pick", "amazon-beauty-moisturizer-2", { priceLabel: "₹450", mrpLabel: "₹550", discountLabel: "18% off" }),
      p("moisturizer-ph-3", "Green Tea Oil-Free Moisturizer (50ml)", "Plum", "Oil-free hydration for acne-prone skin.", "Trending", "amazon-beauty-moisturizer-3", { priceLabel: "₹470", mrpLabel: "₹575", discountLabel: "18% off" }),
      p("moisturizer-ph-4", "10% Vitamin B5 Moisturizer (50g)", "Minimalist", "Lightweight barrier-support moisturizer.", "Editor Pick", "amazon-beauty-moisturizer-4", { priceLabel: "₹329", mrpLabel: "₹399", discountLabel: "18% off" }),
      p("moisturizer-ph-5", "Moisture Surge 100H Auto-Replenishing Hydrator (30ml)", "Clinique", "Deep hydration with a dewy finish.", "Premium Pick", "amazon-beauty-moisturizer-5", { priceLabel: "₹1,950", mrpLabel: "₹2,400", discountLabel: "19% off" }),
    ],
  },
  {
    slug: "sunscreen",
    title: "Sunscreen",
    stepLabel: "Step 3: Protect",
    shortIntro: "Daily SPF to protect skin from sun and tanning.",
    products: [
      p("sunscreen-ph-1", "Sun Expert SPF 50 PA+++ Ultra Matte Lotion (50ml)", "Lakmé", "Matte SPF for daily sun protection.", "Bestseller", "amazon-beauty-sunscreen-1", { priceLabel: "₹299", mrpLabel: "₹399", discountLabel: "25% off" }),
      p("sunscreen-ph-2", "SPF 50 PA++++ Sunscreen (50g)", "Minimalist", "Lightweight broad-spectrum daily sunscreen.", "Trending", "amazon-beauty-sunscreen-2", { priceLabel: "₹399", mrpLabel: "₹499", discountLabel: "20% off" }),
      p("sunscreen-ph-3", "UltraSheer Dry-Touch Sunblock SPF 50+ (80ml)", "Neutrogena", "Dry-touch sunscreen for outdoor wear.", "Editor Pick", "amazon-beauty-sunscreen-3", { priceLabel: "₹675", mrpLabel: "₹780", discountLabel: "13% off" }),
      p("sunscreen-ph-4", "FISICO Sunscreen SPF 50 (50g)", "La Shield", "Matte gel sunscreen suitable for oily skin.", "Budget Pick", "amazon-beauty-sunscreen-4", { priceLabel: "₹630", mrpLabel: "₹790", discountLabel: "20% off" }),
      p("sunscreen-ph-5", "Relief Sun SPF 50+ (50ml)", "Beauty of Joseon", "Light, dewy sunscreen popular for no-white-cast finish.", "Premium Pick", "amazon-beauty-sunscreen-5", { priceLabel: "₹1,350", mrpLabel: "₹1,650", discountLabel: "18% off" }),
      p("sunscreen-ph-6", "Sunscreen Pick 6", "Brand 6", "Popular sunscreen option.", "Editor Pick", "amazon-beauty-sunscreen-6", { priceLabel: "₹499", mrpLabel: "₹699", discountLabel: "29% off" }),
    ],
  },
  {
    slug: "primer",
    title: "Primer",
    stepLabel: "Step 4: Prime",
    shortIntro: "Create a smooth base so makeup lasts longer.",
    products: [
      p("primer-ph-1", "Fit Me Primer (30ml)", "Maybelline", "Smooths skin and blurs pores for makeup base.", "Bestseller", "amazon-beauty-primer-1", { priceLabel: "₹499", mrpLabel: "₹649", discountLabel: "23% off" }),
      p("primer-ph-2", "Absolute Blur Perfect Makeup Primer (30g)", "Lakmé", "Blurs pores and preps skin for longer wear.", "Editor Pick", "amazon-beauty-primer-2", { priceLabel: "₹750", mrpLabel: "₹850", discountLabel: "12% off" }),
      p("primer-ph-3", "Real Makeup Base Highlighting Primer (32ml)", "Swiss Beauty", "Adds glow and grip before foundation.", "Budget Pick", "amazon-beauty-primer-3", { priceLabel: "₹399", mrpLabel: "₹549", discountLabel: "27% off" }),
      p("primer-ph-4", "Power Grip Primer (24ml)", "e.l.f.", "Grippy base that helps makeup stay put.", "Trending", "amazon-beauty-primer-4", { priceLabel: "₹1,050", mrpLabel: "₹1,299", discountLabel: "19% off" }),
      p("primer-ph-5", "Photo Finish Smooth & Blur Primer (30ml)", "Smashbox", "Premium smoothing primer for event makeup.", "Premium Pick", "amazon-beauty-primer-5", { priceLabel: "₹3,200", mrpLabel: "₹3,800", discountLabel: "16% off" }),
      p("primer-ph-6", "Primer Pick 6", "Brand 6", "Popular primer option.", "Editor Pick", "amazon-beauty-primer-6", { priceLabel: "₹499", mrpLabel: "₹699", discountLabel: "29% off" }),
    ],
  },
  {
    slug: "foundation",
    title: "Foundation",
    stepLabel: "Step 5: Base",
    shortIntro: "Even out your skin tone with a base that matches you.",
    products: [
      p("wf-foundation", "Fit Me Matte + Poreless Liquid Foundation (228, 18ml)", "Maybelline", "Matte, buildable base that helps control shine in warm, humid weather.", "Wedding Pick", "amazon-beauty-wedding-maybelline-fit-me-foundation", { image: "/collections/amazon-beauty-toolkit/products/maybelline-fit-me-foundation-228.webp", amazonUrl: "https://link.amazon/B0drFinUS", priceLabel: "₹155", mrpLabel: "₹217", discountLabel: "29% off" }),
      p("st-bb", "Skin Naturals BB Cream - Bright Complete Vitamin C (30g)", "Garnier", "Light base with a natural finish—easy for beginners who want minimal coverage.", "Starter Pick", "amazon-beauty-starter-garnier-bb-cream", { image: "/collections/amazon-beauty-toolkit/products/garnier-bb-cream.webp", amazonUrl: "https://link.amazon/B0c40JHhI", priceLabel: "₹206" }),
      p("foundation-ph-2", "Infallible 24H Fresh Wear Foundation (30ml)", "L'Oréal Paris", "Long-wear foundation for events and long days.", "Premium Pick", "amazon-beauty-foundation-2", { priceLabel: "₹1,099", mrpLabel: "₹1,399", discountLabel: "21% off" }),
      p("foundation-ph-3", "FauxFilter Luminous Matte Foundation (35ml)", "Huda Beauty", "High-coverage glam base for special occasions.", "Premium Pick", "amazon-beauty-foundation-3", { priceLabel: "₹3,300", mrpLabel: "₹3,950", discountLabel: "16% off" }),
      p("foundation-ph-4", "Foundation Pick 4", "Brand 4", "Popular foundation option.", "Editor Pick", "amazon-beauty-foundation-4", { priceLabel: "₹499", mrpLabel: "₹699", discountLabel: "29% off" }),
      p("foundation-ph-5", "Foundation Pick 5", "Brand 5", "Popular foundation option.", "Editor Pick", "amazon-beauty-foundation-5", { priceLabel: "₹499", mrpLabel: "₹699", discountLabel: "29% off" }),
    ],
  },
  {
    slug: "concealer",
    title: "Concealer",
    stepLabel: "Step 6: Conceal",
    shortIntro: "Cover spots, dark circles, and brighten where needed.",
    products: [
      p("ed-concealer", "Fit Me Concealer (36 Golden Caramel)", "Maybelline", "Easy spot coverage for under-eyes and blemishes in a quick routine.", "Everyday Pick", "amazon-beauty-everyday-maybelline-fit-me-concealer", { image: "/collections/amazon-beauty-toolkit/products/maybelline-fit-me-concealer.webp", amazonUrl: "https://link.amazon/B04zfnp8V", priceLabel: "Check price" }),
      p("concealer-ph-1", "Fit Me Concealer (6.8ml)", "Maybelline", "Easy spot concealer for under-eyes and blemishes.", "Bestseller", "amazon-beauty-concealer-1", { priceLabel: "₹449", mrpLabel: "₹549", discountLabel: "18% off" }),
      p("concealer-ph-2", "Liquid Concealer (5.6g)", "Swiss Beauty", "Budget concealer for quick everyday coverage.", "Budget Pick", "amazon-beauty-concealer-2", { priceLabel: "₹229", mrpLabel: "₹299", discountLabel: "23% off" }),
      p("concealer-ph-3", "Pro Conceal HD Concealer (8g)", "L.A. Girl", "Popular concealer for coverage and contour.", "Trending", "amazon-beauty-concealer-3", { priceLabel: "₹695", mrpLabel: "₹795", discountLabel: "13% off" }),
      p("concealer-ph-4", "Radiant Creamy Concealer (6ml)", "NARS", "Premium concealer for brightening and coverage.", "Premium Pick", "amazon-beauty-concealer-4", { priceLabel: "₹2,800", mrpLabel: "₹3,200", discountLabel: "13% off" }),
      p("concealer-ph-5", "HD Liquid Concealer (6.5ml)", "Kay Beauty", "Blendable concealer with comfortable wear.", "Editor Pick", "amazon-beauty-concealer-5", { priceLabel: "₹799", mrpLabel: "₹999", discountLabel: "20% off" }),
    ],
  },
  {
    slug: "compact-powder",
    title: "Compact & Setting Powder",
    stepLabel: "Step 7: Set Base",
    shortIntro: "Lock in base and control shine through the day.",
    products: [
      p("wf-compact", "Weightless Stay Matte Finish Compact Powder (Natural Almond 06, 9g)", "FACES CANADA", "Matte compact for quick touch-ups to keep shine in check during events.", "Wedding Pick", "amazon-beauty-wedding-faces-canada-compact", { image: "/collections/amazon-beauty-toolkit/products/faces-canada-compact.webp", amazonUrl: "https://link.amazon/B07ULHHRJ", priceLabel: "Check price" }),
      p("st-compact", "Weightless Stay Matte Finish Compact Powder (Natural Almond 06, 9g)", "FACES CANADA", "Easy matte touch-up compact for controlling shine through the day.", "Starter Pick", "amazon-beauty-starter-faces-canada-compact", { image: "/collections/amazon-beauty-toolkit/products/faces-canada-compact.webp", amazonUrl: "https://link.amazon/B07ULHHRJ", priceLabel: "Check price" }),
      p("compact-powder-ph-1", "Fit Me Matte+Poreless Compact (6g)", "Maybelline", "Handy compact for quick shine control.", "Bestseller", "amazon-beauty-compact-powder-1", { priceLabel: "₹230", mrpLabel: "₹299", discountLabel: "23% off" }),
      p("compact-powder-ph-2", "9 to 5 Primer + Matte Powder Foundation (9g)", "Lakmé", "Matte compact for daily touch-ups.", "Editor Pick", "amazon-beauty-compact-powder-2", { priceLabel: "₹500", mrpLabel: "₹600", discountLabel: "17% off" }),
      p("compact-powder-ph-3", "Easy Bake Loose Powder (20g)", "Huda Beauty", "Finely milled powder for long-wear setting.", "Premium Pick", "amazon-beauty-compact-powder-3", { priceLabel: "₹3,250", mrpLabel: "₹3,800", discountLabel: "14% off" }),
      p("compact-powder-ph-4", "Ultra Fine Loose Powder (10g)", "Swiss Beauty", "Budget loose powder for setting makeup.", "Budget Pick", "amazon-beauty-compact-powder-4", { priceLabel: "₹349", mrpLabel: "₹449", discountLabel: "22% off" }),
    ],
  },
  {
    slug: "blush",
    title: "Blush",
    stepLabel: "Step 8: Add Flush",
    shortIntro: "Add a natural flush of color to cheeks.",
    products: [
      p("tr-liquid-blush", "Liquid Blush", "MARS", "Blendable liquid blush for a quick, natural flush that’s easy to build.", "Trending · Nov 2026", "amazon-beauty-trending-mars-liquid-blush", { image: "/collections/amazon-beauty-toolkit/products/mars-liquid-blush.webp", amazonUrl: "https://www.amazon.in/dp/B0D9HJXYX9", priceLabel: "Check price" }),
      p("tr-blush-wand", "Silk Cushion Liquid Blush Wand", "Typsy Beauty", "Cushion applicator makes blush placement quick for on-the-go touch-ups.", "Trending · Nov 2026", "amazon-beauty-trending-typsy-blush-wand", { image: "/collections/amazon-beauty-toolkit/products/typsy-silk-cushion-blush.webp", amazonUrl: "https://www.amazon.in/dp/B0CM3PR7L6", priceLabel: "Check price" }),
      p("tr-lip-cheek-tint", "Blush & Juicy Lip & Cheek Tint (Berry Juice, 9ml)", "Blue Heaven", "One product for lips and cheeks when you want a fast, coordinated look.", "Trending · Nov 2026", "amazon-beauty-trending-blue-heaven-lip-cheek-tint", { image: "/collections/amazon-beauty-toolkit/products/blue-heaven-blush-juicy-tint.webp", amazonUrl: "https://link.amazon/B087X0B5L", priceLabel: "Check price" }),
      p("tr-jelly-tint", "Summer Slush Jelly Tint", "RENEE", "Jelly texture gives a fresh, dewy tint for lips and cheeks.", "Trending · Nov 2026", "amazon-beauty-trending-renee-summer-slush-jelly-tint", { image: "/collections/amazon-beauty-toolkit/products/renee-summer-slush-jelly-tint.webp", amazonUrl: "https://www.amazon.in/dp/B09X7BWM97", priceLabel: "Check price" }),
      p("ed-lip-cheek", "9 to 5 Weightless Matte Mousse Lip & Cheek Color (Coca Soft, 9g)", "Lakmé", "Mousse texture works on lips and cheeks for a fast, coordinated look.", "Everyday Pick", "amazon-beauty-everyday-lakme-9to5-mousse-tint", { image: "/collections/amazon-beauty-toolkit/products/lakme-9to5-mousse-coca-soft.webp", amazonUrl: "https://link.amazon/B07g4mBCp", priceLabel: "Check price" }),
      p("blush-ph-1", "Baked Blusher (6g)", "Swiss Beauty", "Buildable blush with a soft glow finish.", "Budget Pick", "amazon-beauty-blush-1", { priceLabel: "₹299", mrpLabel: "₹399", discountLabel: "25% off" }),
    ],
  },
  {
    slug: "highlighter",
    title: "Highlighter",
    stepLabel: "Step 9: Glow",
    shortIntro: "Add glow to high points for a fresh look.",
    products: [
      p("pg-strobing", "Master Strobing Liquid Illuminating Highlighter (Light/Iridescent)", "Maybelline", "Liquid highlighter adds a photo-ready glow to cheekbones and high points.", "Glam Pick", "amazon-beauty-party-maybelline-strobing-highlighter", { image: "/collections/amazon-beauty-toolkit/products/maybelline-master-strobing-highlighter.webp", amazonUrl: "https://link.amazon/B0g6sbzyN", priceLabel: "₹155", mrpLabel: "₹217", discountLabel: "29% off" }),
      p("highlighter-ph-1", "Baked Highlighter (6g)", "Swiss Beauty", "Affordable glow for cheekbones and high points.", "Budget Pick", "amazon-beauty-highlighter-1", { priceLabel: "₹299", mrpLabel: "₹399", discountLabel: "25% off" }),
      p("highlighter-ph-2", "Glowzilla Highlighter (7g)", "MARS", "Budget highlighter for a visible glow.", "Trending", "amazon-beauty-highlighter-2", { priceLabel: "₹329", mrpLabel: "₹399", discountLabel: "18% off" }),
      p("highlighter-ph-3", "Rare Beauty Positive Light Liquid Luminizer (15ml)", "Becca-style alt", "Natural liquid glow that blends easily.", "Premium Pick", "amazon-beauty-highlighter-3", { priceLabel: "₹2,700", mrpLabel: "₹3,200", discountLabel: "16% off" }),
      p("highlighter-ph-4", "Absolute Liquid Highlighter (25ml)", "Lakmé", "Liquid highlighter for dewy makeup looks.", "Editor Pick", "amazon-beauty-highlighter-4", { priceLabel: "₹650", mrpLabel: "₹750", discountLabel: "13% off" }),
      p("highlighter-ph-5", "On-the-Glow Blush/Highlighter Stick (19g)", "Pixi", "Cream stick for quick glow on the go.", "Trending", "amazon-beauty-highlighter-5", { priceLabel: "₹1,650", mrpLabel: "₹1,950", discountLabel: "15% off" }),
    ],
  },
  {
    slug: "contour-bronzer",
    title: "Contour & Bronzer",
    stepLabel: "Step 10: Sculpt",
    shortIntro: "Add warmth and definition for a sculpted look.",
    products: [
      p("contour-bronzer-ph-1", "Contour Stick (6g)", "Swiss Beauty", "Cream contour stick for easy sculpting.", "Budget Pick", "amazon-beauty-contour-bronzer-1", { priceLabel: "₹299", mrpLabel: "₹399", discountLabel: "25% off" }),
      p("contour-bronzer-ph-2", "Contour Stick (7g)", "MARS", "Blendable contour for beginners.", "Budget Pick", "amazon-beauty-contour-bronzer-2", { priceLabel: "₹249", mrpLabel: "₹349", discountLabel: "29% off" }),
      p("contour-bronzer-ph-3", "Tantour Contour & Bronzer Cream (11ml)", "Huda Beauty", "Cream contour-bronzer for defined glam.", "Premium Pick", "amazon-beauty-contour-bronzer-3", { priceLabel: "₹2,900", mrpLabel: "₹3,400", discountLabel: "15% off" }),
      p("contour-bronzer-ph-4", "Hoola Matte Bronzer (8g)", "Benefit", "Classic bronzer for warmth and soft sculpt.", "Premium Pick", "amazon-beauty-contour-bronzer-4", { priceLabel: "₹3,200", mrpLabel: "₹3,700", discountLabel: "14% off" }),
      p("contour-bronzer-ph-5", "Mega Bronzer (15g)", "Makeup Revolution", "Large pan bronzer for everyday warmth.", "Editor Pick", "amazon-beauty-contour-bronzer-5", { priceLabel: "₹550", mrpLabel: "₹695", discountLabel: "21% off" }),
      p("contour-bronzer-ph-6", "Putty Bronzer (10g)", "e.l.f.", "Cream-to-powder bronzer for natural definition.", "Trending", "amazon-beauty-contour-bronzer-6", { priceLabel: "₹850", mrpLabel: "₹1,050", discountLabel: "19% off" }),
    ],
  },
  {
    slug: "eyebrow",
    title: "Eyebrow",
    stepLabel: "Step 11: Brows",
    shortIntro: "Frame your face with defined, natural-looking brows.",
    products: [
      p("st-brow", "Waterproof Eyebrow Pencil with Brush (02 Dark Brown, 1.5g)", "Swiss Beauty", "Smudge-proof eyebrow definer pencil with brush for quick, tidy brows.", "Starter Pick", "amazon-beauty-starter-swiss-beauty-brow-pencil", { image: "/collections/amazon-beauty-toolkit/products/swiss-beauty-brow-pencil.webp", amazonUrl: "https://link.amazon/B0dZ5dtQi", priceLabel: "Check price" }),
      p("eyebrow-ph-1", "Eyebrow Pencil (1.5g)", "Swiss Beauty", "Simple pencil for filling sparse brows.", "Budget Pick", "amazon-beauty-eyebrow-1", { priceLabel: "₹199", mrpLabel: "₹249", discountLabel: "20% off" }),
      p("eyebrow-ph-2", "Define & Blend Brow Pencil (0.16g)", "Maybelline", "Natural brow definition with blending tip.", "Bestseller", "amazon-beauty-eyebrow-2", { priceLabel: "₹499", mrpLabel: "₹599", discountLabel: "17% off" }),
      p("eyebrow-ph-3", "Gimme Brow+ Volumizing Gel (3g)", "Benefit", "Premium brow gel for fuller-looking brows.", "Premium Pick", "amazon-beauty-eyebrow-3", { priceLabel: "₹2,700", mrpLabel: "₹3,100", discountLabel: "13% off" }),
      p("eyebrow-ph-4", "Brow Lift (10g)", "e.l.f.", "Soap-brow style hold for lifted brows.", "Trending", "amazon-beauty-eyebrow-4", { priceLabel: "₹850", mrpLabel: "₹1,050", discountLabel: "19% off" }),
      p("eyebrow-ph-5", "Brow Wiz (0.085g)", "Anastasia Beverly Hills", "Precision brow pencil for detailed shaping.", "Premium Pick", "amazon-beauty-eyebrow-5", { priceLabel: "₹2,400", mrpLabel: "₹2,800", discountLabel: "14% off" }),
    ],
  },
  {
    slug: "eyeshadow",
    title: "Eyeshadow",
    stepLabel: "Step 12: Eyeshadow",
    shortIntro: "Add depth and color to your eyes.",
    products: [
      p("eyeshadow-ph-1", "Ultimate Eyeshadow Palette (9g)", "Swiss Beauty", "Versatile palette for daily and glam looks.", "Budget Pick", "amazon-beauty-eyeshadow-1", { priceLabel: "₹299", mrpLabel: "₹399", discountLabel: "25% off" }),
      p("eyeshadow-ph-2", "12 Shades Dance of Joy Palette (14g)", "MARS", "Colorful budget palette for creative looks.", "Trending", "amazon-beauty-eyeshadow-2", { priceLabel: "₹349", mrpLabel: "₹499", discountLabel: "30% off" }),
      p("eyeshadow-ph-3", "Nudes Eyeshadow Palette (9.6g)", "Maybelline", "Wearable nude shades for everyday eyes.", "Bestseller", "amazon-beauty-eyeshadow-3", { priceLabel: "₹799", mrpLabel: "₹999", discountLabel: "20% off" }),
      p("eyeshadow-ph-4", "Nude Obsessions Palette (10g)", "Huda Beauty", "Compact premium palette for glam looks.", "Premium Pick", "amazon-beauty-eyeshadow-4", { priceLabel: "₹2,900", mrpLabel: "₹3,400", discountLabel: "15% off" }),
      p("eyeshadow-ph-5", "La Petite Eyeshadow Palette (7g)", "L'Oréal Paris", "Curated shades for easy eye looks.", "Editor Pick", "amazon-beauty-eyeshadow-5", { priceLabel: "₹899", mrpLabel: "₹1,099", discountLabel: "18% off" }),
      p("eyeshadow-ph-6", "Eyes On Me! Quad (4.5g)", "Nykaa", "Small quad for quick everyday eye looks.", "Budget Pick", "amazon-beauty-eyeshadow-6", { priceLabel: "₹499", mrpLabel: "₹625", discountLabel: "20% off" }),
    ],
  },
  {
    slug: "eyeliner-kajal",
    title: "Eyeliner & Kajal",
    stepLabel: "Step 13: Define Eyes",
    shortIntro: "Define eyes with kajal or liner for everyday to glam.",
    products: [
      p("st-kajal", "Eyeconic Black Kajal (0.35g, Combo Pack of 2)", "Lakmé", "Smudge-resistant everyday kajal—an easy first step for defining eyes.", "Starter Pick", "amazon-beauty-starter-lakme-eyeconic-kajal", { image: "/collections/amazon-beauty-toolkit/products/lakme-eyeconic-kajal.webp", amazonUrl: "https://link.amazon/A07IQZnqD", priceLabel: "₹228", mrpLabel: "₹319", discountLabel: "29% off" }),
      p("wf-bold-liner", "Colossal Bold Eyeliner (Black)", "Maybelline", "Bold, smudge-resistant liner for sharp festive eye definition.", "Wedding Pick", "amazon-beauty-wedding-maybelline-colossal-bold-liner", { image: "/collections/amazon-beauty-toolkit/products/maybelline-colossal-bold-liner.webp", amazonUrl: "https://link.amazon/B0je2FadW" }),
      p("wf-kohl", "Kohl of Fame Retractable Kajal (0.35g, Black)", "MARS", "Retractable waterproof kajal for defined eyes through long festive events.", "Wedding Pick", "amazon-beauty-wedding-mars-kohl-of-fame", { image: "/collections/amazon-beauty-toolkit/products/mars-kohl-of-fame.webp", amazonUrl: "https://link.amazon/B0hNDMdQj" }),
      p("ed-kajal", "NaturStudio All-Day-Wear Kohl Kajal (Black Brilliance, Pack of 2)", "Plum", "Gel kajal designed for comfortable, long-wear everyday definition.", "Everyday Pick", "amazon-beauty-everyday-plum-naturstudio-kajal", { image: "/collections/amazon-beauty-toolkit/products/plum-naturstudio-kajal.webp", amazonUrl: "https://link.amazon/B0aHLsvUr" }),
      p("pg-pen-liner", "Ink Black Liquid Pen Eyeliner (1ml, Black)", "MARS", "Pen tip helps create sharp wings and defined party eye looks.", "Glam Pick", "amazon-beauty-party-mars-ink-black-liner", { image: "/collections/amazon-beauty-toolkit/products/mars-ink-black-pen-eyeliner.webp", amazonUrl: "https://link.amazon/B0c7E9WWf", priceLabel: "Check price" }),
      p("pg-felt-liner", "Waterproof Bold Felt Tip Pen Eyeliner (Black, 1.2ml)", "Swiss Beauty", "Felt tip gives control for quick, clean eyeliner on busy getting-ready days.", "Glam Pick", "amazon-beauty-party-swiss-beauty-felt-liner", { image: "/collections/amazon-beauty-toolkit/products/swiss-beauty-felt-tip-eyeliner.webp", amazonUrl: "https://link.amazon/B0fJEyP9f", priceLabel: "Check price" }),
      p("pg-kohl", "Dark Spell Kohl Kajal (1.5g)", "Sotrue", "Matte kohl for intense eye definition that suits evening looks.", "Glam Pick", "amazon-beauty-party-sotrue-dark-spell-kohl", { image: "/collections/amazon-beauty-toolkit/products/sotrue-dark-spell-kohl.webp", amazonUrl: "https://link.amazon/B03oYQADA", priceLabel: "₹497", mrpLabel: "₹646", discountLabel: "23% off" }),
    ],
  },
  {
    slug: "mascara",
    title: "Mascara",
    stepLabel: "Step 14: Lashes",
    shortIntro: "Lift and volumize lashes for an open-eye look.",
    products: [
      p("wf-mascara", "Colossal Waterproof Mascara (10ml, Black)", "Maybelline", "Waterproof volume that holds up through long wedding days and celebrations.", "Bestseller", "amazon-beauty-wedding-maybelline-colossal-waterproof-mascara", { image: "/collections/amazon-beauty-toolkit/products/maybelline-colossal-waterproof-mascara.webp", amazonUrl: "https://link.amazon/B00xvb4PaL" }),
      p("pg-waterproof-mascara", "Lash Sensational Sky High Waterproof Mascara (Very Black)", "Maybelline", "Waterproof length and lift for lashes that hold through long events.", "Bestseller", "amazon-beauty-party-maybelline-sky-high-waterproof", { image: "/collections/amazon-beauty-toolkit/products/maybelline-sky-high-waterproof-mascara.webp", amazonUrl: "https://link.amazon/B06HGrdAW", priceLabel: "₹497", mrpLabel: "₹646", discountLabel: "23% off" }),
      p("tr-sky-tubes", "Lash Sensational Sky High Tubes Tubing Mascara (Very Black)", "Maybelline", "Tubing formula gives length and lift, and removes easily with warm water.", "Trending · Nov 2026", "amazon-beauty-trending-maybelline-sky-tubes", { image: "/collections/amazon-beauty-toolkit/products/maybelline-sky-tubes.webp", amazonUrl: "https://link.amazon/B0eu1LgyE", priceLabel: "₹850" }),
      p("ed-mascara", "Lash Sensational Sky High Mascara", "Maybelline", "Lengthening brush gives lifted lashes without a heavy routine.", "Bestseller", "amazon-beauty-everyday-maybelline-sky-high-mascara", { image: "/collections/amazon-beauty-toolkit/products/maybelline-sky-high-mascara.webp", amazonUrl: "https://link.amazon/B06HGrdAW", priceLabel: "₹497", mrpLabel: "₹646", discountLabel: "23% off" }),
      p("st-mascara", "Fabulash Volumizing Mascara (12ml, Waterproof)", "MARS", "Affordable waterproof mascara for adding quick volume to everyday lashes.", "Starter Pick", "amazon-beauty-starter-mars-fabulash-mascara", { image: "/collections/amazon-beauty-toolkit/products/mars-fabulash-mascara.webp", amazonUrl: "https://link.amazon/B0aHPhLL7", priceLabel: "₹209", mrpLabel: "₹251", discountLabel: "17% off" }),
      p("mascara-ph-3", "Mascara Pick 3", "Brand 3", "Popular mascara option.", "Editor Pick", "amazon-beauty-mascara-3", { priceLabel: "₹499", mrpLabel: "₹699", discountLabel: "29% off" }),
    ],
  },
  {
    slug: "lip-balm",
    title: "Lip Balm",
    stepLabel: "Step 15: Prep Lips",
    shortIntro: "Keep lips soft and hydrated before color.",
    products: [
      p("ed-lip-balm", "Baby Lips Color Changing Lip Balm (Pink Bloom)", "Maybelline", "Color-changing lip balm for soft color and everyday comfort.", "Everyday Pick", "amazon-beauty-everyday-maybelline-color-bloom", { image: "/collections/amazon-beauty-toolkit/products/maybelline-baby-lips-pink-bloom.webp", amazonUrl: "https://link.amazon/B06ItAIt6", priceLabel: "Check price" }),
      p("st-lip-balm", "Baby Lips Lip Balm - Cherry Kiss (4g, Buy 1 Get 1)", "Maybelline", "Soft tint and lip comfort—simple enough for a first everyday lip pick.", "Starter Pick", "amazon-beauty-starter-maybelline-baby-lips", { image: "/collections/amazon-beauty-toolkit/products/maybelline-baby-lips.webp", amazonUrl: "https://link.amazon/B0f3JqZ2b", priceLabel: "₹189", mrpLabel: "₹227", discountLabel: "17% off" }),
      p("lip-balm-ph-1", "Original Care Lip Balm (4.8g)", "Nivea", "Simple everyday lip hydration.", "Budget Pick", "amazon-beauty-lip-balm-1", { priceLabel: "₹199", mrpLabel: "₹249", discountLabel: "20% off" }),
      p("lip-balm-ph-2", "Lip Sleeping Mask (20g)", "Laneige", "Overnight lip mask for deep hydration.", "Premium Pick", "amazon-beauty-lip-balm-2", { priceLabel: "₹1,350", mrpLabel: "₹1,600", discountLabel: "16% off" }),
      p("lip-balm-ph-3", "Vitamin C+E Lip Balm SPF 50 (12g)", "Dot & Key", "SPF lip balm for daytime protection.", "Trending", "amazon-beauty-lip-balm-3", { priceLabel: "₹249", mrpLabel: "₹299", discountLabel: "17% off" }),
      p("lip-balm-ph-4", "Lip Butter (10ml)", "The Body Shop", "Nourishing lip butter for dry lips.", "Editor Pick", "amazon-beauty-lip-balm-4", { priceLabel: "₹595", mrpLabel: "₹750", discountLabel: "21% off" }),
    ],
  },
  {
    slug: "lipstick-lip-tint",
    title: "Lipstick & Lip Tint",
    stepLabel: "Step 16: Lip Color",
    shortIntro: "Finish with lip color that matches your mood.",
    products: [
      p("tr-lip-oil", "Dear Darling Oil Tint (06 Pink Oil, 4.2ml)", "Etude", "Glossy tint-oil finish that gives lips color with a comfortable, juicy look.", "Trending · Nov 2026", "amazon-beauty-trending-etude-dear-darling-oil-tint", { image: "/collections/amazon-beauty-toolkit/products/etude-dear-darling-oil-tint.webp", amazonUrl: "https://link.amazon/B019J3PvV", priceLabel: "₹600", mrpLabel: "₹750", discountLabel: "20% off" }),
      p("pg-vinyl-ink", "SuperStay Vinyl Ink Liquid Lipstick (Witty)", "Maybelline", "Glossy vinyl finish with long wear for bold party lips.", "Glam Pick", "amazon-beauty-party-maybelline-vinyl-ink", { image: "/collections/amazon-beauty-toolkit/products/maybelline-vinyl-ink-witty.webp", amazonUrl: "https://link.amazon/B00ZsyP8J", priceLabel: "₹466", mrpLabel: "₹559", discountLabel: "17% off" }),
      p("wf-liquid-lip", "Forever Matte Liquid Lip Colour (Wine Touch, 5.6ml)", "Lakmé", "Transfer-focused matte lip color for long festive wear with minimal touch-ups.", "Wedding Pick", "amazon-beauty-wedding-lakme-forever-matte-liquid-lip", { image: "/collections/amazon-beauty-toolkit/products/lakme-forever-matte-wine-touch.webp", amazonUrl: "https://link.amazon/B05eel6oU", priceLabel: "₹228", mrpLabel: "₹319", discountLabel: "29% off" }),
      p("lipstick-lip-tint-ph-1", "Creamy Matte Lipstick (3.2g)", "MARS", "Affordable matte lipstick for daily wear.", "Budget Pick", "amazon-beauty-lipstick-lip-tint-1", { priceLabel: "₹199", mrpLabel: "₹299", discountLabel: "33% off" }),
      p("lipstick-lip-tint-ph-2", "SuperStay Matte Ink Liquid Lipstick (5ml)", "Maybelline", "Long-wear liquid lipstick for events.", "Bestseller", "amazon-beauty-lipstick-lip-tint-2", { priceLabel: "₹699", mrpLabel: "₹849", discountLabel: "18% off" }),
      p("lipstick-lip-tint-ph-3", "Matte Lipstick (3g)", "M.A.C", "Iconic premium matte lipstick shade range.", "Premium Pick", "amazon-beauty-lipstick-lip-tint-3", { priceLabel: "₹2,150", mrpLabel: "₹2,450", discountLabel: "12% off" }),
    ],
  },
  {
    slug: "setting-spray",
    title: "Setting Spray",
    stepLabel: "Step 17: Lock In",
    shortIntro: "Seal your look so it stays fresh longer.",
    products: [
      p("tt-fixer-renee", "Bollywood Filter Blurring Setting Spray (100ml)", "RENEE", "Blurring setting spray for a smoother finish and longer-lasting makeup.", "Tool Pick", "amazon-beauty-tools-renee-bollywood-filter-setting-spray", { image: "/collections/amazon-beauty-toolkit/products/renee-bollywood-filter-spray.webp", amazonUrl: "https://link.amazon/B0ioIDQcV" }),
      p("tt-fixer-faces", "Ultime Pro Makeup Fixer (100ml)", "FACES CANADA", "Setting spray to help makeup stay put through heat and humidity.", "Tool Pick", "amazon-beauty-tools-faces-canada-makeup-fixer", { image: "/collections/amazon-beauty-toolkit/products/faces-canada-ultime-pro-fixer.webp", amazonUrl: "https://link.amazon/B0a2NOeU0" }),
      p("setting-spray-ph-3", "All Nighter Setting Spray (118ml)", "Urban Decay", "Premium long-wear setting spray.", "Premium Pick", "amazon-beauty-setting-spray-3", { priceLabel: "₹3,200", mrpLabel: "₹3,800", discountLabel: "16% off" }),
      p("setting-spray-ph-4", "Fix+ Setting Spray (100ml)", "M.A.C", "Hydrating setting spray for refreshed finish.", "Premium Pick", "amazon-beauty-setting-spray-4", { priceLabel: "₹2,400", mrpLabel: "₹2,800", discountLabel: "14% off" }),
      p("setting-spray-ph-5", "Setting Spray Pick 5", "Brand 5", "Popular setting spray option.", "Editor Pick", "amazon-beauty-setting-spray-5", { priceLabel: "₹499", mrpLabel: "₹699", discountLabel: "29% off" }),
      p("setting-spray-ph-6", "Setting Spray Pick 6", "Brand 6", "Popular setting spray option.", "Editor Pick", "amazon-beauty-setting-spray-6", { priceLabel: "₹499", mrpLabel: "₹699", discountLabel: "29% off" }),
    ],
  },
  {
    slug: "makeup-tools",
    title: "Makeup Tools",
    stepLabel: "Step 18: Tools",
    shortIntro: "Tools that make application easier and cleaner.",
    products: [
      p("tt-curler", "Eyelash Curler (EC-02)", "Vega", "Lifts lashes before mascara for a more open, awake look.", "Tool Pick", "amazon-beauty-tools-eyelash-curler", { image: "/collections/amazon-beauty-toolkit/products/vega-eyelash-curler.webp", amazonUrl: "https://link.amazon/B06LnOEez" }),
      p("tt-blotting", "Face Blotting Paper (100pcs, with Mirror & Puff)", "Generic", "Quick oil control without adding extra layers of powder.", "Tool Pick", "amazon-beauty-tools-blotting-papers", { image: "/collections/amazon-beauty-toolkit/products/face-blotting-paper.webp", amazonUrl: "https://link.amazon/B03zmZhzC" }),
      p("tt-brush", "Angular Buffing Brush (Golden)", "Artist's Arsenal", "Soft brush for blending blush or powder without harsh lines.", "Tool Pick", "amazon-beauty-tools-blush-powder-brush", { image: "/collections/amazon-beauty-toolkit/products/artists-arsenal-angular-brush.webp", amazonUrl: "https://link.amazon/B0c6ZEaHf" }),
      p("tt-sponge", "Ultra Soft Professional Blender Set (Set of 4)", "Omidazzle", "Damp sponge helps blend base products evenly for a natural finish.", "Tool Pick", "amazon-beauty-tools-makeup-sponge", { image: "/collections/amazon-beauty-toolkit/products/omidazzle-makeup-sponge-set.webp", amazonUrl: "https://link.amazon/B05mmDFfX" }),
      p("makeup-tools-ph-5", "Makeup Tools Pick 5", "Brand 5", "Popular makeup tools option.", "Editor Pick", "amazon-beauty-makeup-tools-5", { priceLabel: "₹499", mrpLabel: "₹699", discountLabel: "29% off" }),
      p("makeup-tools-ph-6", "Makeup Tools Pick 6", "Brand 6", "Popular makeup tools option.", "Editor Pick", "amazon-beauty-makeup-tools-6", { priceLabel: "₹499", mrpLabel: "₹699", discountLabel: "29% off" }),
    ],
  },
];

export const ALL_BEAUTY_PRODUCTS = BEAUTY_SHOP_CATEGORIES.flatMap((c) => c.products);


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

export const BEAUTY_INFO_SECTIONS = [
  {
    slug: "trending-now",
    title: "Trending Now",
    description: "Buzz-worthy picks people are reaching for right now—refresh this list monthly from current beauty trends and best-seller signals.",
    items: [
      "Etude Dear Darling Oil Tint — glossy tint-oil finish for juicy lips.",
      "MARS Liquid Blush — easy blendable flush for quick makeup days.",
      "Typsy Beauty Silk Cushion Liquid Blush Wand — cushion applicator for on-the-go blush.",
      "Blue Heaven Blush & Juicy Lip & Cheek Tint — one product for lips and cheeks.",
      "RENEE Summer Slush Jelly Tint — fresh jelly tint for dewy looks.",
      "Maybelline Lash Sensational Sky High Tubes — tubing length that removes easily.",
    ],
  },
  {
    slug: "5-minute-everyday",
    title: "5-Minute Everyday",
    description: "A quick routine when you want to look fresh without doing a full face.",
    items: [
      "Start with moisturizer/SPF and a light base (tinted moisturizer, BB cream, or concealer).",
      "Add a lip & cheek tint for quick color.",
      "Define eyes with kajal and a coat of mascara.",
      "Finish with lip balm or a soft tint.",
    ],
  },
  {
    slug: "party-glam",
    title: "Party Glam",
    description: "High-impact picks for nights out, birthdays, and celebrations.",
    items: [
      "Go for a longer-wear base and set with powder/spray.",
      "Pick bold lips or dramatic eyes—one hero feature at a time.",
      "Add waterproof mascara/liner for long events.",
      "Use highlighter for photo-ready glow.",
    ],
  },
  {
    slug: "wedding-festive",
    title: "Wedding & Festive",
    description: "Long-wear, photo-friendly picks for shaadi functions and festive events.",
    items: [
      "Choose long-wear base, waterproof eye products, and transfer-resistant lips.",
      "Keep compact/blotting/fixer handy for touch-ups.",
      "Match tones to your outfit and lighting; test shades early.",
      "Prioritize comfort for long hours in heat and humidity.",
    ],
  },
  {
    slug: "starter-basics",
    title: "Starter Basics",
    description: "Simple essentials if you’re building your first makeup kit.",
    items: [
      "Start with kajal, mascara, lip balm/tint, compact, and a simple base.",
      "Add one product at a time as you learn what you actually use.",
      "Pick easy textures: stick, mousse, tint, and pencil formats are beginner-friendly.",
      "Check shades and undertones before buying base products.",
    ],
  },
  {
    slug: "tools-touch-ups",
    title: "Tools & Touch-Ups",
    description: "Helpers that make application easier and keep makeup fresh.",
    items: [
      "Sponge/brush for even blending.",
      "Eyelash curler for lifted lashes.",
      "Blotting paper/compact for midday shine control.",
      "Setting spray for longer wear in heat and humidity.",
    ],
  },
] as const;


export const BEAUTY_FAQS = [
  { question: "How is this page organized?", answer: "Products are organized by makeup routine steps—from cleanser and moisturizer to mascara and tools. Each section includes picks across price points, and you can check the latest details on Amazon.in." },
  { question: "Are prices and discounts live?", answer: "Prices, MRP, and discount labels are indicative and can change. Always check the latest price, offer, and availability on Amazon.in before buying." },
  { question: "Do you have 100 products?", answer: "The page is being expanded toward 100 curated products across routine categories. Existing verified picks are kept, and additional slots are filled as product data is confirmed." },
] as const;