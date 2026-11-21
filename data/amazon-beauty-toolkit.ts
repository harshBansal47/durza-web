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
                  p("cleanser-cetaphil-gentle-125", "Gentle Skin Hydrating Face Wash (118ml)", "Cetaphil", "Soap-free daily wash that suits most skin types and removes makeup residue gently.", "Beginner Pick", "cleanser-cetaphil-gentle-125", { image: "https://m.media-amazon.com/images/I/61Ti2uv6V3L._SY355_.jpg", amazonUrl: "https://link.amazon/B0jm7pKCZ", priceLabel: "₹399", mrpLabel: "₹459", discountLabel: "Approx. 13% off" }),
                  p("cleanser-neutrogena-hydroboost-200", "Hydro Boost Water Gel Cleanser (200ml)", "Neutrogena", "Hyaluronic gel cleanser that cleans without leaving skin tight.", "Editor Pick", "B01M0620XK", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/41dPWyWDMhL._SY355_.jpg", amazonUrl: "https://link.amazon/B02pVDmwh", priceLabel: "₹599", mrpLabel: "₹699", discountLabel: "Approx. 14% off" }),
                  p("cleanser-minimalist-sa-100", "Anti-Acne Salicylic Acid 2% Face Wash (50ml)", "Minimalist", "Gentle BHA wash for oily, breakout-prone skin; hugely popular with teens.", "Bestseller", "cleanser-minimalist-sa-100", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61e31R15BDL._SX425_.jpg", amazonUrl: "https://link.amazon/B06RldsNS", priceLabel: "₹299", mrpLabel: "₹299", discountLabel: "Check deal" }),
                  p("cleanser-cerave-hydrating-236", "Hydrating Cleanser For Normal To Dry Skin (236ml)", "CeraVe", "Ceramide + hyaluronic non-foaming cleanser; a skincare-community favourite.", "Premium Pick", "B07C5R51Q9", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51KdWVitdeL._SX466_.jpg", amazonUrl: "https://link.amazon/B084u9pgQ", priceLabel: "₹1,350", mrpLabel: "₹1,600", discountLabel: "Approx. 16% off" }),
            p("cleanser-lrp-toleriane-hydrating", "Toleriane Hydrating Gentle Cleanser (200ml)", "La Roche-Posay", "Dermatologist-favourite cleanser for sensitive or dry skin.", "Premium Pick", "cleanser-lrp-toleriane-hydrating", { amazonUrl: "https://www.amazon.in/s?k=La+Roche-Posay+Toleriane+Hydrating+Gentle+Cleanser+%28200ml%29", priceLabel: "₹1,700", mrpLabel: "₹2,000", discountLabel: "Approx. 15% off" }),
                  p("cleanser-lakme-blush-glow-strawberry-100", "Blush & Glow Strawberry Refreshing Gel Face Wash (100g)", "Lakmé", "Cute, fruity, very affordable first face wash for teens.", "Budget Pick", "cleanser-lakme-blush-glow-strawberry-100", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/81IwZoYcg-L._SX425_.jpg", amazonUrl: "https://link.amazon/B06Ldzgeo", priceLabel: "₹175", mrpLabel: "₹215", discountLabel: "Approx. 19% off" }),
    ],
  },
  {
    slug: "moisturizer",
    title: "Moisturizer",
    stepLabel: "Step 2: Moisturize",
    shortIntro: "Hydrate and prep your skin for smooth makeup application.",
    products: [
      p("ed-tinted-moisturiser", "Tinted Moisturiser (Caramel Glint, 50ml)", "RENEE", "Light coverage with moisture for a quick, natural-looking base.", "Everyday Pick", "amazon-beauty-everyday-renee-tinted-moisturiser", { image: "/collections/amazon-beauty-toolkit/products/renee-tinted-moisturiser.webp", amazonUrl: "https://link.amazon/B08sYF4R6", priceLabel: "Check price" }),
                  p("moisturizer-neutrogena-hydroboost-50", "Hydro Boost Hyaluronic Acid Water Gel Moisturizer (50g)", "Neutrogena", "Light, non-sticky gel hydration that sits well under makeup.", "Bestseller", "B00BQFTQW6", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51YTdG8RPSL._SY355_.jpg", amazonUrl: "https://link.amazon/B0e00S4ys", priceLabel: "₹850", mrpLabel: "₹1,050", discountLabel: "Approx. 19% off" }),
                  p("moisturizer-cetaphil-cream-80", "Moisturising Cream (100g)", "Cetaphil", "Rich, fragrance-free cream for dry skin; a reliable barrier basic.", "Beginner Pick", "moisturizer-cetaphil-cream-80", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/615fFn0PrZL._SY355_.jpg", amazonUrl: "https://link.amazon/B08Fb83hL", priceLabel: "₹450", mrpLabel: "₹550", discountLabel: "Approx. 18% off" }),
                  p("moisturizer-plum-greentea-50", "Green Tea Oil-Free Face Moisturizer (50ml)", "Plum", "Oil-free gel-cream for oily/combination skin in humid weather.", "Budget Pick", "moisturizer-plum-greentea-50", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/41wT-0qMdgL._SY355_.jpg", amazonUrl: "https://link.amazon/B08FUoXrv", priceLabel: "₹470", mrpLabel: "₹575", discountLabel: "Approx. 18% off" }),
                  p("moisturizer-minimalist-b5-50", "Vitamin B5 10% Oil-Free Moisturizer (50g)", "Minimalist", "Simple barrier-hydrating moisturizer with a big Gen Z following.", "Editor Pick", "moisturizer-minimalist-b5-50", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51g9c5DjXpL._SY355_.jpg", amazonUrl: "https://link.amazon/B0itQ4be7", priceLabel: "₹329", mrpLabel: "₹399", discountLabel: "Approx. 18% off" }),
                  p("moisturizer-clinique-moisture-surge-30", "Moisture Surge 100H Auto-Replenishing Hydrator (15ml)", "Clinique", "Premium gel-cream for plump, glassy skin before makeup.", "Premium Pick", "moisturizer-clinique-moisture-surge-30", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51yHrnL38IL._SL1500_.jpg", amazonUrl: "https://link.amazon/B0i4AZEAM", priceLabel: "₹1,950", mrpLabel: "₹2,400", discountLabel: "Approx. 19% off" }),
    ],
  },
  {
    slug: "sunscreen",
    title: "Sunscreen",
    stepLabel: "Step 3: Protect",
    shortIntro: "Daily SPF to protect skin from sun and tanning.",
    products: [
                  p("sunscreen-lakme-sun-expert-50", "Sunscreen for Bright Skin SPF 50 PA++++ (50ml)", "Lakmé", "Affordable matte sunscreen that is easy to find everywhere.", "Budget Pick", "sunscreen-lakme-sun-expert-50", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51cPBPhnzKL._SY355_.jpg", amazonUrl: "https://link.amazon/B0d1EYEBt", priceLabel: "₹299", mrpLabel: "₹399", discountLabel: "Approx. 25% off" }),
                  p("sunscreen-minimalist-spf50-50", "Sunscreen SPF 50 PA++++ (50g)", "Minimalist", "Lightweight daily SPF with a strong following among Indian skincare fans.", "Bestseller", "sunscreen-minimalist-spf50-50", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51liYV8g2DL._SX425_.jpg", amazonUrl: "https://link.amazon/B00rEuHGJ", priceLabel: "₹399", mrpLabel: "₹499", discountLabel: "Approx. 20% off" }),
                  p("sunscreen-neutrogena-ultrasheer-spf50", "Ultra Sheer Sunscreen SPF 50+ (30g)", "Neutrogena", "Non-greasy, dry-touch finish that works under makeup.", "Bestseller", "sunscreen-neutrogena-ultrasheer-spf50", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/41XT6-ALAjL._SX425_.jpg", amazonUrl: "https://link.amazon/B07Edm0pk", priceLabel: "₹675", mrpLabel: "₹780", discountLabel: "Approx. 13% off" }),
                  p("sunscreen-la-shield-fisico-spf50", "Fisico SPF 50+ PA++++ Mineral Sunscreen (50g)", "La Shield", "Mineral sunscreen often picked for sensitive skin.", "Editor Pick", "sunscreen-la-shield-fisico-spf50", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51T8VbpY5HL._SY355_.jpg", amazonUrl: "https://link.amazon/B0bqbwyUN", priceLabel: "₹630", mrpLabel: "₹790", discountLabel: "Approx. 20% off" }),
                  p("sunscreen-boj-relief-sun-50", "Relief Sun Rice + Probiotics SPF 50+ PA++++ (50ml)", "Beauty of Joseon", "The viral K-beauty sunscreen with a light, creamy feel and no heavy white cast.", "Trending", "sunscreen-boj-relief-sun-50", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61BePu9JrUL._SX466_.jpg", amazonUrl: "https://link.amazon/B0cq4gqfV", priceLabel: "₹1,259", mrpLabel: "₹1,688", discountLabel: "Approx. 25% off" }),
                  p("sunscreen-aqualogica-glow-dewy-50", "Glow+ Dewy Gel Sunscreen SPF 50+ PA++++ (50g)", "Aqualogica", "Dewy-finish SPF that is very popular with young Indian shoppers.", "Trending", "sunscreen-aqualogica-glow-dewy-50", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51X8rKp7m+L._SY355_.jpg", amazonUrl: "https://link.amazon/B0iydoOsh", priceLabel: "₹349", mrpLabel: "₹399", discountLabel: "Approx. 13% off" }),
    ],
  },
  {
    slug: "primer",
    title: "Primer",
    stepLabel: "Step 4: Prime",
    shortIntro: "Create a smooth base so makeup lasts longer.",
    products: [
                  p("primer-maybelline-baby-skin-22", "Baby Skin Instant Pore Eraser Primer (22ml)", "Maybelline", "Pore-blurring primer that gives a smooth, matte base.", "Bestseller", "primer-maybelline-baby-skin-22", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51cbrB--HUL._SY355_.jpg", amazonUrl: "https://link.amazon/B07NGJp40", priceLabel: "₹499", mrpLabel: "₹649", discountLabel: "Approx. 23% off" }),
                  p("primer-lakme-absolute-blur-30", "Absolute Blur Perfect Matte Face Primer (30ml)", "Lakmé", "Easy drugstore primer that smooths and helps makeup last.", "Beginner Pick", "primer-lakme-absolute-blur-30", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/41cfnEcVZSL._SY355_.jpg", amazonUrl: "https://link.amazon/B080JURsn", priceLabel: "₹750", mrpLabel: "₹850", discountLabel: "Approx. 12% off" }),
                  p("primer-swiss-beauty-pore-blur", "Oil Control Face Primer", "Swiss Beauty", "Budget primer to even out the base before foundation.", "Budget Pick", "primer-swiss-beauty-pore-blur", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51WwGU774-L._SY355_.jpg", amazonUrl: "https://link.amazon/B01JgkkPR", priceLabel: "₹399", mrpLabel: "₹549", discountLabel: "Approx. 27% off" }),
                  p("primer-elf-power-grip", "Power Grip Primer (0.811 Fl Oz)", "e.l.f.", "Viral gripping primer that helps makeup stay put.", "Trending", "primer-elf-power-grip", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61FfGNgMGsL._SY355_.jpg", amazonUrl: "https://link.amazon/B09azDh1os", priceLabel: "₹1,050", mrpLabel: "₹1,299", discountLabel: "Approx. 19% off" }),
                  p("primer-smashbox-photo-finish-30", "Photo Finish Primer Minimize Pores", "Smashbox", "Premium primer loved for a smooth, photo-ready base.", "Premium Pick", "primer-smashbox-photo-finish-30", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61WBf+D0fhL._SY355_.jpg", amazonUrl: "https://link.amazon/B0aRIGV6v", priceLabel: "₹3,200", mrpLabel: "₹3,800", discountLabel: "Approx. 16% off" }),
                  p("primer-nyx-pore-filler", "Pore Filler Targeted Primer Stick", "NYX Professional Makeup", "Mid-range pore-filling primer for oily or textured skin.", "Editor Pick", "primer-nyx-pore-filler", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61HbexjJM7L._SY355_.jpg", amazonUrl: "https://link.amazon/B06EIy2co", priceLabel: "₹1,250", mrpLabel: "₹1,450", discountLabel: "Approx. 14% off" }),
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
                  p("foundation-loreal-infallible-fresh-wear-30", "Infaillible 32H Fresh Wear Foundation (145 Rose Beige, 30ml)", "L'Oréal Paris", "Long-wearing, breathable foundation in a wide shade range.", "Long Wear", "foundation-loreal-infallible-fresh-wear-30", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/519Oignmd4L._SY355_.jpg", amazonUrl: "https://link.amazon/B0egCKbyR", priceLabel: "₹1,099", mrpLabel: "₹1,399", discountLabel: "Approx. 21% off" }),
                  p("foundation-huda-fauxfilter-35", "FauxFilter Luminous Matte Foundation (150G Crème Brulée, 35ml)", "Huda Beauty", "Premium full-coverage foundation with a soft-matte glow.", "Premium Pick", "foundation-huda-fauxfilter-35", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51caGCC1KBL._SY355_.jpg", amazonUrl: "https://link.amazon/B04DJTni8", priceLabel: "₹3,300", mrpLabel: "₹3,950", discountLabel: "Approx. 16% off" }),
                  p("foundation-loreal-tinted-serum-30", "Infallible 24H Tinted Serum Foundation (6-7 Tan, 30ml)", "L'Oréal Paris", "Skin-tint style serum foundation for the 'tint instead of foundation' look.", "Trending", "foundation-loreal-tinted-serum-30", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/518XdOpgb1L._SX425_.jpg", amazonUrl: "https://link.amazon/B0iOCj655", priceLabel: "₹999", mrpLabel: "₹1,299", discountLabel: "Approx. 23% off" }),
                  p("foundation-house-of-makeup-skin-tint", "Skin Tint with SPF 25+++", "House Of Makeup", "Viral Indian skin tint for a light, natural base.", "Trending", "foundation-house-of-makeup-skin-tint", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61KtaECJ72L._AC_CR0%2C0%2C0%2C0_SX480_SY360_.jpg", amazonUrl: "https://link.amazon/B0gDOUUha", priceLabel: "₹799", mrpLabel: "₹999", discountLabel: "Approx. 20% off" }),
    ],
  },
  {
    slug: "concealer",
    title: "Concealer",
    stepLabel: "Step 6: Conceal",
    shortIntro: "Cover spots, dark circles, and brighten where needed.",
    products: [
      p("ed-concealer", "Fit Me Concealer (36 Golden Caramel)", "Maybelline", "Easy spot coverage for under-eyes and blemishes in a quick routine.", "Everyday Pick", "amazon-beauty-everyday-maybelline-fit-me-concealer", { image: "/collections/amazon-beauty-toolkit/products/maybelline-fit-me-concealer.webp", amazonUrl: "https://link.amazon/B04zfnp8V", priceLabel: "Check price" }),
                  p("concealer-maybelline-age-rewind-6", "Instant Age Rewind Concealer (Medium, 6g)", "Maybelline", "Cult drugstore concealer for dark circles.", "Bestseller", "concealer-maybelline-age-rewind-6", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61aB2gC868L._SY355_.jpg", amazonUrl: "https://link.amazon/B0b78dfaH", priceLabel: "₹649", mrpLabel: "₹799", discountLabel: "Approx. 19% off" }),
                  p("concealer-swiss-beauty-liquid", "Perfect Liquid Lightweight Concealer (Medium Beige, 6g)", "Swiss Beauty", "Very affordable liquid concealer for spots and under-eyes.", "Budget Pick", "concealer-swiss-beauty-liquid", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51XwTvwzT7L._SY355_.jpg", amazonUrl: "https://link.amazon/B021tbvXY", priceLabel: "₹229", mrpLabel: "₹299", discountLabel: "Approx. 23% off" }),
                  p("concealer-la-girl-pro-conceal-8", "HD Pro Conceal Multipurpose Concealer (Natural, 8g)", "L.A. Girl", "High-coverage, long-wear concealer.", "Long Wear", "concealer-la-girl-pro-conceal-8", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61dqmGWBWzL._SY355_.jpg", amazonUrl: "https://link.amazon/B0bX4Khn4", priceLabel: "₹695", mrpLabel: "₹795", discountLabel: "Approx. 13% off" }),
                  p("concealer-nars-radiant-creamy-6", "Radiant Creamy Concealer (Custard)", "NARS", "Iconic premium concealer with a creamy, brightening finish.", "Premium Pick", "concealer-nars-radiant-creamy-6", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/41fvriwTS-L._SX450_.jpg", amazonUrl: "https://link.amazon/B061aI5yz", priceLabel: "₹2,800", mrpLabel: "₹3,200", discountLabel: "Approx. 12% off" }),
                  p("concealer-kay-beauty-liquid", "HD Liquid Natural Concealer", "Kay Beauty", "Indian celebrity brand with a wide shade range.", "Editor Pick", "concealer-kay-beauty-liquid", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61K98P7WPxL._SX425_.jpg", amazonUrl: "https://link.amazon/B07c9vyiJ", priceLabel: "₹799", mrpLabel: "₹999", discountLabel: "Approx. 20% off" }),
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
                  p("compact-maybelline-fit-me-matte", "Fit Me Matte + Poreless Compact Powder (128 Warm Nude)", "Maybelline", "Drugstore compact for oil control through the day.", "Bestseller", "compact-maybelline-fit-me-matte", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/61FDV10Re5L._SX425_.jpg", amazonUrl: "https://link.amazon/B08sbaKEu", priceLabel: "₹230", mrpLabel: "₹299", discountLabel: "Approx. 23% off" }),
                  p("compact-lakme-9to5-primer-matte-9", "9 to 5 Primer with Matte Powder Foundation Compact (Ivory Cream, 9g)", "Lakmé", "Compact that doubles as a light base; good for beginners.", "Beginner Pick", "compact-lakme-9to5-primer-matte-9", { image: "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/51hXR0jG8IL._SY355_.jpg", amazonUrl: "https://link.amazon/B02A4cgF7", priceLabel: "₹500", mrpLabel: "₹600", discountLabel: "Approx. 17% off" }),
            p("compact-huda-easy-bake-20", "Easy Bake Loose Baking & Setting Powder (20g)", "Huda Beauty", "Premium loose powder for baking and setting.", "Premium Pick", "compact-huda-easy-bake-20", { amazonUrl: "https://www.amazon.in/s?k=Huda+Beauty+Easy+Bake+Loose+Baking+%26+Setting+Powder+%2820g%29", priceLabel: "₹3,250", mrpLabel: "₹3,800", discountLabel: "Approx. 14% off" }),
            p("compact-swiss-beauty-loose-10", "Ultra Fine Loose Powder (10g)", "Swiss Beauty", "Budget loose powder to set the base.", "Budget Pick", "compact-swiss-beauty-loose-10", { amazonUrl: "https://www.amazon.in/s?k=Swiss+Beauty+Ultra+Fine+Loose+Powder+%2810g%29", priceLabel: "₹349", mrpLabel: "₹449", discountLabel: "Approx. 22% off" }),
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
            p("blush-pixi-on-the-glow-19", "On-the-Glow Blush (19g)", "Pixi", "Hyped blush stick for a fresh flush; easy for beginners.", "Trending", "blush-pixi-on-the-glow-19", { amazonUrl: "https://www.amazon.in/s?k=Pixi+On-the-Glow+Blush+%2819g%29", priceLabel: "₹1,650", mrpLabel: "₹1,950", discountLabel: "Approx. 15% off" }),
    ],
  },
  {
    slug: "highlighter",
    title: "Highlighter",
    stepLabel: "Step 9: Glow",
    shortIntro: "Add glow to high points for a fresh look.",
    products: [
      p("pg-strobing", "Master Strobing Liquid Illuminating Highlighter (Light/Iridescent)", "Maybelline", "Liquid highlighter adds a photo-ready glow to cheekbones and high points.", "Glam Pick", "amazon-beauty-party-maybelline-strobing-highlighter", { image: "/collections/amazon-beauty-toolkit/products/maybelline-master-strobing-highlighter.webp", amazonUrl: "https://link.amazon/B0g6sbzyN", priceLabel: "₹155", mrpLabel: "₹217", discountLabel: "29% off" }),
            p("highlighter-swiss-beauty-baked-6", "Baked Highlighter (6g)", "Swiss Beauty", "Budget baked highlighter for a soft glow.", "Budget Pick", "highlighter-swiss-beauty-baked-6", { amazonUrl: "https://www.amazon.in/s?k=Swiss+Beauty+Baked+Highlighter+%286g%29", priceLabel: "₹299", mrpLabel: "₹399", discountLabel: "Approx. 25% off" }),
            p("highlighter-mars-glowzilla-7", "Glowzilla Highlighter (7g)", "MARS", "Affordable glow with a trendy Indian brand.", "Budget Pick", "highlighter-mars-glowzilla-7", { amazonUrl: "https://www.amazon.in/s?k=MARS+Glowzilla+Highlighter+%287g%29", priceLabel: "₹329", mrpLabel: "₹399", discountLabel: "Approx. 18% off" }),
            p("highlighter-rare-beauty-luminizer-15", "Positive Light Liquid Luminizer (15ml)", "Rare Beauty", "Hyped celebrity-brand liquid highlighter.", "Premium Pick", "highlighter-rare-beauty-luminizer-15", { amazonUrl: "https://www.amazon.in/s?k=Rare+Beauty+Positive+Light+Liquid+Luminizer+%2815ml%29", priceLabel: "₹2,700", mrpLabel: "₹3,200", discountLabel: "Approx. 16% off" }),
            p("highlighter-lakme-absolute-liquid-25", "Absolute Liquid Highlighter (25ml)", "Lakmé", "Easy liquid glow at a mid price.", "Editor Pick", "highlighter-lakme-absolute-liquid-25", { amazonUrl: "https://www.amazon.in/s?k=Lakm%C3%A9+Absolute+Liquid+Highlighter+%2825ml%29", priceLabel: "₹650", mrpLabel: "₹750", discountLabel: "Approx. 13% off" }),
            p("highlighter-elf-halo-glow-wand", "Halo Glow Highlight Beauty Wand", "e.l.f.", "Viral liquid highlighter wand with a soft, blendable glow.", "Trending", "highlighter-elf-halo-glow-wand", { amazonUrl: "https://www.amazon.in/s?k=e.l.f.+Halo+Glow+Highlight+Beauty+Wand", priceLabel: "₹1,050", mrpLabel: "₹1,299", discountLabel: "Approx. 19% off" }),
    ],
  },
  {
    slug: "contour-bronzer",
    title: "Contour & Bronzer",
    stepLabel: "Step 10: Sculpt",
    shortIntro: "Add warmth and definition for a sculpted look.",
    products: [
            p("contour-swiss-beauty-stick-6", "Contour Stick (6g)", "Swiss Beauty", "Easy cream contour stick for beginners.", "Beginner Pick", "contour-swiss-beauty-stick-6", { amazonUrl: "https://www.amazon.in/s?k=Swiss+Beauty+Contour+Stick+%286g%29", priceLabel: "₹299", mrpLabel: "₹399", discountLabel: "Approx. 25% off" }),
            p("contour-mars-stick-7", "Contour Stick (7g)", "MARS", "Budget contour stick that blends easily.", "Budget Pick", "contour-mars-stick-7", { amazonUrl: "https://www.amazon.in/s?k=MARS+Contour+Stick+%287g%29", priceLabel: "₹249", mrpLabel: "₹349", discountLabel: "Approx. 29% off" }),
            p("contour-huda-tantour-11", "Tantour Contour & Bronzer Cream (11ml)", "Huda Beauty", "Premium cream bronzer/contour.", "Premium Pick", "contour-huda-tantour-11", { amazonUrl: "https://www.amazon.in/s?k=Huda+Beauty+Tantour+Contour+%26+Bronzer+Cream+%2811ml%29", priceLabel: "₹2,900", mrpLabel: "₹3,400", discountLabel: "Approx. 15% off" }),
            p("contour-benefit-hoola-8", "Hoola Matte Bronzer (8g)", "Benefit", "Cult matte bronzer for a natural sun-kissed look.", "Premium Pick", "contour-benefit-hoola-8", { amazonUrl: "https://www.amazon.in/s?k=Benefit+Hoola+Matte+Bronzer+%288g%29", priceLabel: "₹3,200", mrpLabel: "₹3,700", discountLabel: "Approx. 14% off" }),
            p("contour-revolution-bronzer-reloaded-15", "Bronzer Reloaded (15g)", "Makeup Revolution", "Mid-range powder bronzer with good colour payoff.", "Editor Pick", "contour-revolution-bronzer-reloaded-15", { amazonUrl: "https://www.amazon.in/s?k=Makeup+Revolution+Bronzer+Reloaded+%2815g%29", priceLabel: "₹550", mrpLabel: "₹695", discountLabel: "Approx. 21% off" }),
            p("contour-elf-putty-bronzer-10", "Putty Bronzer (10g)", "e.l.f.", "Creamy bronzer that blends into skin.", "Trending", "contour-elf-putty-bronzer-10", { amazonUrl: "https://www.amazon.in/s?k=e.l.f.+Putty+Bronzer+%2810g%29", priceLabel: "₹850", mrpLabel: "₹1,050", discountLabel: "Approx. 19% off" }),
    ],
  },
  {
    slug: "eyebrow",
    title: "Eyebrow",
    stepLabel: "Step 11: Brows",
    shortIntro: "Frame your face with defined, natural-looking brows.",
    products: [
      p("st-brow", "Waterproof Eyebrow Pencil with Brush (02 Dark Brown, 1.5g)", "Swiss Beauty", "Smudge-proof eyebrow definer pencil with brush for quick, tidy brows.", "Starter Pick", "amazon-beauty-starter-swiss-beauty-brow-pencil", { image: "/collections/amazon-beauty-toolkit/products/swiss-beauty-brow-pencil.webp", amazonUrl: "https://link.amazon/B0dZ5dtQi", priceLabel: "Check price" }),
            p("eyebrow-sugar-arch-arrival", "Arch Arrival Brow Definer Triangular Pencil", "Sugar Cosmetics", "Precise triangular tip for natural-looking brows.", "Beginner Pick", "eyebrow-sugar-arch-arrival", { amazonUrl: "https://www.amazon.in/s?k=Sugar+Cosmetics+Arch+Arrival+Brow+Definer+Triangular+Pencil", priceLabel: "₹399", mrpLabel: "₹499", discountLabel: "Approx. 20% off" }),
            p("eyebrow-maybelline-define-blend", "Define & Blend Brow Pencil", "Maybelline", "Pencil with a spoolie for soft, filled-in brows.", "Bestseller", "eyebrow-maybelline-define-blend", { amazonUrl: "https://www.amazon.in/s?k=Maybelline+Define+%26+Blend+Brow+Pencil", priceLabel: "₹499", mrpLabel: "₹599", discountLabel: "Approx. 17% off" }),
            p("eyebrow-benefit-gimme-brow-3", "Gimme Brow+ Volumizing Brow Gel (3g)", "Benefit", "Viral fibre brow gel for fluffy brows.", "Premium Pick", "eyebrow-benefit-gimme-brow-3", { amazonUrl: "https://www.amazon.in/s?k=Benefit+Gimme+Brow%2B+Volumizing+Brow+Gel+%283g%29", priceLabel: "₹2,700", mrpLabel: "₹3,100", discountLabel: "Approx. 13% off" }),
            p("eyebrow-elf-brow-lift", "Brow Lift", "e.l.f.", "Brow-shaping product for a lifted, brushed-up look.", "Trending", "eyebrow-elf-brow-lift", { amazonUrl: "https://www.amazon.in/s?k=e.l.f.+Brow+Lift", priceLabel: "₹850", mrpLabel: "₹1,050", discountLabel: "Approx. 19% off" }),
            p("eyebrow-abh-brow-wiz", "Brow Wiz Ultra-Slim Pencil", "Anastasia Beverly Hills", "Precision brow pencil loved by makeup artists.", "Premium Pick", "eyebrow-abh-brow-wiz", { amazonUrl: "https://www.amazon.in/s?k=Anastasia+Beverly+Hills+Brow+Wiz+Ultra-Slim+Pencil", priceLabel: "₹2,400", mrpLabel: "₹2,800", discountLabel: "Approx. 14% off" }),
    ],
  },
  {
    slug: "eyeshadow",
    title: "Eyeshadow",
    stepLabel: "Step 12: Eyeshadow",
    shortIntro: "Add depth and color to your eyes.",
    products: [
            p("eyeshadow-swiss-beauty-ultimate-9", "Ultimate Eyeshadow Palette (9 shades)", "Swiss Beauty", "Pigmented 9-shade palette at a very low price.", "Budget Pick", "eyeshadow-swiss-beauty-ultimate-9", { amazonUrl: "https://www.amazon.in/s?k=Swiss+Beauty+Ultimate+Eyeshadow+Palette+%289+shades%29", priceLabel: "₹246", mrpLabel: "₹269", discountLabel: "Approx. 9% off" }),
            p("eyeshadow-mars-dance-of-joy-12", "12 Shades Dance of Joy Eyeshadow Palette (14g)", "MARS", "Colourful 12-shade palette for playful looks.", "Trending", "eyeshadow-mars-dance-of-joy-12", { amazonUrl: "https://www.amazon.in/s?k=MARS+12+Shades+Dance+of+Joy+Eyeshadow+Palette+%2814g%29", priceLabel: "₹349", mrpLabel: "₹499", discountLabel: "Approx. 30% off" }),
            p("eyeshadow-maybelline-nudes", "The Nudes Eyeshadow Palette", "Maybelline", "Everyday neutral shades that suit most Indian skin tones.", "Beginner Pick", "eyeshadow-maybelline-nudes", { amazonUrl: "https://www.amazon.in/s?k=Maybelline+The+Nudes+Eyeshadow+Palette", priceLabel: "₹799", mrpLabel: "₹999", discountLabel: "Approx. 20% off" }),
            p("eyeshadow-huda-nude-obsessions", "Nude Obsessions Eyeshadow Palette", "Huda Beauty", "Premium neutral palette with matte and shimmer shades.", "Premium Pick", "eyeshadow-huda-nude-obsessions", { amazonUrl: "https://www.amazon.in/s?k=Huda+Beauty+Nude+Obsessions+Eyeshadow+Palette", priceLabel: "₹2,900", mrpLabel: "₹3,400", discountLabel: "Approx. 15% off" }),
            p("eyeshadow-loreal-la-petite-7", "La Petite Palette Eyeshadow", "L'Oréal Paris", "Compact, travel-friendly palette.", "Editor Pick", "eyeshadow-loreal-la-petite-7", { amazonUrl: "https://www.amazon.in/s?k=L%27Or%C3%A9al+Paris+La+Petite+Palette+Eyeshadow", priceLabel: "₹899", mrpLabel: "₹1,099", discountLabel: "Approx. 18% off" }),
            p("eyeshadow-sugar-blend-the-rules-12", "Blend The Rules Eyeshadow Palette (12 shades)", "Sugar Cosmetics", "Popular Indian brand palette with wearable shades.", "Editor Pick", "eyeshadow-sugar-blend-the-rules-12", { amazonUrl: "https://www.amazon.in/s?k=Sugar+Cosmetics+Blend+The+Rules+Eyeshadow+Palette+%2812+shades%29", priceLabel: "₹799", mrpLabel: "₹999", discountLabel: "Approx. 20% off" }),
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
            p("mascara-loreal-lash-paradise", "Voluminous Lash Paradise Mascara", "L'Oréal Paris", "Hyped volume mascara for fluttery lashes.", "Trending", "mascara-loreal-lash-paradise", { amazonUrl: "https://www.amazon.in/s?k=L%27Or%C3%A9al+Paris+Voluminous+Lash+Paradise+Mascara", priceLabel: "₹899", mrpLabel: "₹1,099", discountLabel: "Approx. 18% off" }),
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
            p("lipbalm-nivea-original-48", "Original Care Lip Balm (4.8g)", "Nivea", "Classic budget lip balm for daily hydration.", "Budget Pick", "lipbalm-nivea-original-48", { amazonUrl: "https://www.amazon.in/s?k=Nivea+Original+Care+Lip+Balm+%284.8g%29", priceLabel: "₹199", mrpLabel: "₹249", discountLabel: "Approx. 20% off" }),
            p("lipbalm-laneige-sleeping-mask-20", "Lip Sleeping Mask (20g)", "Laneige", "Viral overnight lip mask for soft lips.", "Trending", "lipbalm-laneige-sleeping-mask-20", { amazonUrl: "https://www.amazon.in/s?k=Laneige+Lip+Sleeping+Mask+%2820g%29", priceLabel: "₹1,350", mrpLabel: "₹1,600", discountLabel: "Approx. 16% off" }),
            p("lipbalm-burts-bees-beeswax", "Beeswax Lip Balm (4.25g)", "Burt's Bees", "Well-known balm with a natural-feel formula.", "Editor Pick", "lipbalm-burts-bees-beeswax", { amazonUrl: "https://www.amazon.in/s?k=Burt%27s+Bees+Beeswax+Lip+Balm+%284.25g%29", priceLabel: "₹399", mrpLabel: "₹499", discountLabel: "Approx. 20% off" }),
            p("lipbalm-body-shop-born-lippy", "Born Lippy Strawberry Lip Balm", "The Body Shop", "Fruity balm that suits young shoppers.", "Beginner Pick", "lipbalm-body-shop-born-lippy", { amazonUrl: "https://www.amazon.in/s?k=The+Body+Shop+Born+Lippy+Strawberry+Lip+Balm", priceLabel: "₹495", mrpLabel: "₹595", discountLabel: "Approx. 17% off" }),
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
            p("lipstick-mars-creamy-matte-32", "Creamy Matte Lipstick (3.2g)", "MARS", "Affordable bold shades that suit Indian skin tones.", "Budget Pick", "lipstick-mars-creamy-matte-32", { amazonUrl: "https://www.amazon.in/s?k=MARS+Creamy+Matte+Lipstick+%283.2g%29", priceLabel: "₹199", mrpLabel: "₹299", discountLabel: "Approx. 33% off" }),
            p("lipstick-maybelline-lifter-gloss", "Lifter Gloss", "Maybelline", "Plumping gloss that is a global social-media favourite.", "Trending", "lipstick-maybelline-lifter-gloss", { amazonUrl: "https://www.amazon.in/s?k=Maybelline+Lifter+Gloss", priceLabel: "₹699", mrpLabel: "₹849", discountLabel: "Approx. 18% off" }),
            p("lipstick-mac-matte-velvet-teddy", "Matte Lipstick (Velvet Teddy, 3g)", "M.A.C", "Iconic premium nude lipstick.", "Premium Pick", "lipstick-mac-matte-velvet-teddy", { amazonUrl: "https://www.amazon.in/s?k=M.A.C+Matte+Lipstick+%28Velvet+Teddy%2C+3g%29", priceLabel: "₹2,150", mrpLabel: "₹2,450", discountLabel: "Approx. 12% off" }),
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
            p("spray-urban-decay-all-nighter-118", "All Nighter Long-Lasting Setting Spray (118ml)", "Urban Decay", "Premium setting spray for long events.", "Premium Pick", "spray-urban-decay-all-nighter-118", { amazonUrl: "https://www.amazon.in/s?k=Urban+Decay+All+Nighter+Long-Lasting+Setting+Spray+%28118ml%29", priceLabel: "₹3,200", mrpLabel: "₹3,800", discountLabel: "Approx. 16% off" }),
            p("spray-mac-fix-plus-100", "Fix+ Setting Spray (100ml)", "M.A.C", "Fine-mist refresher and setter.", "Premium Pick", "spray-mac-fix-plus-100", { amazonUrl: "https://www.amazon.in/s?k=M.A.C+Fix%2B+Setting+Spray+%28100ml%29", priceLabel: "₹2,400", mrpLabel: "₹2,800", discountLabel: "Approx. 14% off" }),
            p("spray-nyx-matte-finish-60", "Matte Finish Setting Spray (60ml)", "NYX Professional Makeup", "Mid-range oil-control setting spray.", "Editor Pick", "spray-nyx-matte-finish-60", { amazonUrl: "https://www.amazon.in/s?k=NYX+Professional+Makeup+Matte+Finish+Setting+Spray+%2860ml%29", priceLabel: "₹1,050", mrpLabel: "₹1,300", discountLabel: "Approx. 19% off" }),
            p("spray-swiss-beauty-fixer", "Makeup Fixer Setting Spray", "Swiss Beauty", "Budget fixing spray for everyday makeup.", "Budget Pick", "spray-swiss-beauty-fixer", { amazonUrl: "https://www.amazon.in/s?k=Swiss+Beauty+Makeup+Fixer+Setting+Spray", priceLabel: "₹299", mrpLabel: "₹399", discountLabel: "Approx. 25% off" }),
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
            p("tools-real-techniques-miracle-sponge", "Miracle Complexion Sponge", "Real Techniques", "Hyped sponge for a smooth, airbrushed base.", "Trending", "tools-real-techniques-miracle-sponge", { amazonUrl: "https://www.amazon.in/s?k=Real+Techniques+Miracle+Complexion+Sponge", priceLabel: "₹749", mrpLabel: "₹899", discountLabel: "Approx. 17% off" }),
            p("tools-vega-brush-set", "Makeup Brush Set (face & eye essentials)", "Vega", "Starter brushes for foundation, blush and eyes.", "Beginner Pick", "tools-vega-brush-set", { amazonUrl: "https://www.amazon.in/s?k=Vega+Makeup+Brush+Set+%28face+%26+eye+essentials%29", priceLabel: "₹499", mrpLabel: "₹899", discountLabel: "Approx. 44% off" }),
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