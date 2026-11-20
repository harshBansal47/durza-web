import { storeGoHref } from "@/lib/go";

export type BudgetTier = "Everyday Value" | "Mid-Range Cult" | "Luxe Splurge";
export type OccasionTag = "5-Min Everyday" | "Humidity-Proof" | "Wedding & Party Glam";

export interface BeautyTierPick {
  name: string;
  brand: string;
  tier: BudgetTier;
  whyPick: string;
  amazonSearchQuery: string;
  affiliateUrl: string;
  /** Actual Amazon.in price in INR when available/verified; omit if unknown. */
  priceInr?: number;
  /** Optional actual product image path (e.g. /collections/amazon-beauty-toolkit/products/...). */
  image?: string;
}

export interface BeautyCategory {
  id: string;
  title: string;
  whatItIs: string;
  oneLineFact: string;
  occasionTag: OccasionTag;
  editorialHeadline: string;
  tiers: [BeautyTierPick, BeautyTierPick, BeautyTierPick];
}

export interface BeautyChapter {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  intro: string;
  image: string;
  imageAlt: string;
  accent: "ivory" | "rose" | "champagne" | "cocoa" | "noir";
  categories: BeautyCategory[];
}

export interface OccasionCollection {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  vibe: string;
  /** Product picks curated for this occasion (references by search intent + affiliate). */
  picks: Array<{
    name: string;
    brand: string;
    reason: string;
    amazonSearchQuery: string;
    affiliateUrl: string;
    priceInr?: number;
  }>;
}

export interface BudgetEdit {
  id: string;
  title: string;
  subtitle: string;
  note: string;
  picks: Array<{
    name: string;
    brand: string;
    reason: string;
    amazonSearchQuery: string;
    affiliateUrl: string;
    priceInr?: number;
  }>;
}

export interface MakeupBagItem {
  name: string;
  brand: string;
  role: string;
  amazonSearchQuery: string;
  affiliateUrl: string;
  priceInr?: number;
}

export interface BrandShowcase {
  name: string;
  tagline: string;
  focus: string;
  amazonSearchQuery: string;
  affiliateUrl: string;
}

function pick(
  tier: BudgetTier,
  brand: string,
  name: string,
  whyPick: string,
  amazonSearchQuery: string,
  src: string,
  priceInr?: number,
  image?: string,
): BeautyTierPick {
  return {
    tier,
    brand,
    name,
    whyPick,
    amazonSearchQuery,
    affiliateUrl: storeGoHref("amazon-in", src),
    ...(typeof priceInr === "number" ? { priceInr } : {}),
    ...(image ? { image } : {}),
  };
}

function simplePick(name: string, brand: string, reason: string, amazonSearchQuery: string, src: string, priceInr?: number) {
  return {
    name,
    brand,
    reason,
    amazonSearchQuery,
    affiliateUrl: storeGoHref("amazon-in", src),
    ...(typeof priceInr === "number" ? { priceInr } : {}),
  };
}

export const OCCASION_COLLECTIONS: OccasionCollection[] = [
  {
    id: "college-days",
    title: "College Days",
    description: "Quick, fuss-free picks for lectures, canteen runs, and last-minute plans—easy to carry and easy to love.",
    image: "/collections/amazon-beauty-toolkit/stage-eyes-lips.webp",
    imageAlt: "Easy everyday makeup essentials styled for a casual day out",
    vibe: "Fresh, fast, and budget-friendly",
    picks: [
      simplePick("Lakmé Eyeconic Kajal", "Lakmé", "Defines eyes in seconds for everyday classes.", "Lakme Eyeconic Kajal", "amazon-beauty-occ-college-kajal"),
      simplePick("Maybelline Baby Lips Lip Balm", "Maybelline", "Soft tint and comfort for dry lips on the go.", "Maybelline Baby Lips Lip Balm", "amazon-beauty-occ-college-lipbalm"),
      simplePick("Blue Heaven Oil Control Compact Powder", "Blue Heaven", "Quick touch-ups for shine between classes.", "Blue Heaven Oil Control Compact Powder", "amazon-beauty-occ-college-compact"),
      simplePick("MARS Fabulash Volumizing Mascara", "MARS", "Instant wide-awake lashes for low-effort looks.", "MARS Fabulash Volumizing Mascara", "amazon-beauty-occ-college-mascara"),
    ],
  },
  {
    id: "everyday-glow",
    title: "Everyday Glow",
    description: "A natural, skin-first routine for errands, brunch, and days when you want to look fresh without trying too hard.",
    image: "/collections/amazon-beauty-toolkit/stage-prep.webp",
    imageAlt: "Glowy skin-prep and natural makeup essentials on a vanity",
    vibe: "Soft, dewy, effortlessly polished",
    picks: [
      simplePick("Swiss Beauty Real Make-Up Base Highlighting Primer", "Swiss Beauty", "Adds a healthy glow under light base or on bare skin.", "Swiss Beauty Real Make Up Base Highlighting Primer", "amazon-beauty-occ-glow-strobe"),
      simplePick("Insight Crème Blusher (Soft Rose / Peach)", "Insight", "Creamy flush for a natural, fresh-faced look.", "Insight Creme Blusher Soft Rose Peach", "amazon-beauty-occ-glow-blush"),
      simplePick("Maybelline Lifter Gloss with Hyaluronic Acid", "Maybelline", "Comfortable shine for an easy everyday finish.", "Maybelline Lifter Gloss Hyaluronic Acid", "amazon-beauty-occ-glow-gloss"),
      simplePick("Swiss Beauty Eyebrow Pencil with Spoolie", "Swiss Beauty", "Neat brows that frame the face in minutes.", "Swiss Beauty Eyebrow Pencil with Spoolie", "amazon-beauty-occ-glow-brow"),
    ],
  },
  {
    id: "office-ready",
    title: "Office Ready",
    description: "Clean, long-wearing basics that look professional, feel comfortable, and survive commutes and meetings.",
    image: "/collections/amazon-beauty-toolkit/stage-base.webp",
    imageAlt: "Polished base makeup and office-friendly beauty products",
    vibe: "Neat, confident, low-maintenance",
    picks: [
      simplePick("Lakmé Absolute Blur Perfect Makeup Primer", "Lakmé", "Smooth base that helps makeup sit neatly through the day.", "Lakme Absolute Blur Perfect Makeup Primer", "amazon-beauty-occ-office-primer"),
      simplePick("Maybelline Fit Me Matte + Poreless Foundation", "Maybelline", "Even, breathable-looking base for daily wear.", "Maybelline Fit Me Matte Poreless Foundation", "amazon-beauty-occ-office-foundation"),
      simplePick("Maybelline Fit Me 12H Oil Control Compact", "Maybelline", "Handy touch-ups for T-zone shine at work.", "Maybelline Fit Me 12H Oil Control Compact", "amazon-beauty-occ-office-compact"),
      simplePick("Maybelline SuperStay Vinyl Ink / Matte Ink", "Maybelline", "Comfortable lip color that can last through a busy day.", "Maybelline SuperStay Vinyl Ink Matte Ink Lipstick", "amazon-beauty-occ-office-lip"),
    ],
  },
  {
    id: "party-glam",
    title: "Party Glam",
    description: "Bold eyes, glowing skin, and statement lips for birthdays, dinners, and nights out with friends.",
    image: "/collections/amazon-beauty-toolkit/stage-sculpt.webp",
    imageAlt: "Glam makeup products including highlighter, eyeshadow, and bold lip color",
    vibe: "Defined, luminous, photo-ready",
    picks: [
      simplePick("MARS Fantasy 15-Shade Eyeshadow Palette", "MARS", "Mattes and shimmers for quick party eye looks.", "MARS Fantasy 15 Shade Eyeshadow Palette", "amazon-beauty-occ-party-eyeshadow"),
      simplePick("Maybelline Master Chrome Metallic Highlighter", "Maybelline", "High-impact glow for cheekbones and inner corners.", "Maybelline Master Chrome Metallic Highlighter", "amazon-beauty-occ-party-highlighter"),
      simplePick("Maybelline Colossal Bold Liner & Kajal", "Maybelline", "Sharp definition for dramatic eyes.", "Maybelline Colossal Bold Liner and Kajal", "amazon-beauty-occ-party-liner"),
      simplePick("Insight Makeup Fixer Spray", "Insight", "Helps lock your look in place for longer.", "Insight Makeup Fixer Spray", "amazon-beauty-occ-party-fixer"),
    ],
  },
  {
    id: "wedding-festive",
    title: "Wedding & Festive",
    description: "Long-wear base, rich color, and glow that holds up through functions, photos, and celebrations.",
    image: "/collections/amazon-beauty-toolkit/hero-vanity.webp",
    imageAlt: "Festive and bridal-inspired makeup vanity with luxurious beauty products",
    vibe: "Radiant, long-lasting, celebration-ready",
    picks: [
      simplePick("Estée Lauder Double Wear Stay-in-Place Makeup", "Estée Lauder", "Long-wear base for events and long functions.", "Estee Lauder Double Wear Stay in Place Makeup", "amazon-beauty-occ-wedding-foundation"),
      simplePick("Huda Beauty Easy Bake Loose Baking Powder", "Huda Beauty", "Helps set base and concealer for extended wear.", "Huda Beauty Easy Bake Loose Baking Powder", "amazon-beauty-occ-wedding-powder"),
      simplePick("MAC MACximal Silky Matte Lipstick", "MAC", "Classic statement lip for festive looks.", "MAC MACximal Silky Matte Lipstick", "amazon-beauty-occ-wedding-lipstick"),
      simplePick("Swiss Beauty Natural Makeup Fixer (Aloe & Vit E)", "Swiss Beauty", "A finishing mist to help makeup look more set.", "Swiss Beauty Natural Makeup Fixer Aloe Vitamin E", "amazon-beauty-occ-wedding-fixer"),
    ],
  },
];

export const BUDGET_EDITS: BudgetEdit[] = [
  {
    id: "under-99",
    title: "Beauty Finds Under ₹99",
    subtitle: "Pocket-money friendly starters",
    note: "Prices on Amazon.in can change by seller, shade, and size. Check the live INR price on the product page.",
    picks: [
      simplePick("Elle 18 Color Pops Matte Lipstick (select shades)", "Elle 18", "Easy everyday lip color on a tiny budget.", "Elle 18 Color Pops Matte Lipstick", "amazon-beauty-budget-99-lipstick"),
      simplePick("Blue Heaven Kajal / Eyeliner (select variants)", "Blue Heaven", "Simple eye definition for daily use.", "Blue Heaven Kajal", "amazon-beauty-budget-99-kajal"),
      simplePick("Insight Nail Polish / Mini Makeup Picks (select)", "Insight", "Affordable add-ons to experiment with color.", "Insight Cosmetics makeup under 99", "amazon-beauty-budget-99-insight"),
    ],
  },
  {
    id: "under-299",
    title: "Makeup Under ₹299",
    subtitle: "Everyday essentials without overspending",
    note: "Great for building basics. Always confirm the current live price and variant on Amazon.in.",
    picks: [
      simplePick("Lakmé Eyeconic Kajal", "Lakmé", "A dependable everyday kajal for Indian routines.", "Lakme Eyeconic Kajal", "amazon-beauty-budget-299-kajal"),
      simplePick("Swiss Beauty Eyebrow Pencil with Spoolie", "Swiss Beauty", "Quick brow shaping for a polished look.", "Swiss Beauty Eyebrow Pencil with Spoolie", "amazon-beauty-budget-299-brow"),
      simplePick("Insight Makeup Fixer Spray", "Insight", "Budget-friendly finishing spray for longer wear.", "Insight Makeup Fixer Spray", "amazon-beauty-budget-299-fixer"),
      simplePick("MARS Fabulash Volumizing Mascara", "MARS", "Easy lash lift for daily and party looks.", "MARS Fabulash Volumizing Mascara", "amazon-beauty-budget-299-mascara"),
    ],
  },
  {
    id: "under-499",
    title: "Beauty Essentials Under ₹499",
    subtitle: "Smart upgrades for your daily kit",
    note: "A sweet spot for reliable basics. Check live prices, offers, and shades on Amazon.in.",
    picks: [
      simplePick("Maybelline Fit Me 12H Oil Control Compact", "Maybelline", "Popular compact for quick shine control.", "Maybelline Fit Me 12H Oil Control Compact", "amazon-beauty-budget-499-compact"),
      simplePick("Swiss Beauty Bold Matt Lip Liner Set", "Swiss Beauty", "Helps define lips and improve lipstick wear.", "Swiss Beauty Bold Matt Lip Liner Set", "amazon-beauty-budget-499-lipliner"),
      simplePick("MARS Fantasy Eyeshadow Palette (select)", "MARS", "Budget palettes for experimenting with eye looks.", "MARS Eyeshadow Palette", "amazon-beauty-budget-499-palette"),
      simplePick("Garnier Micellar Cleansing Water (select sizes)", "Garnier", "Gentle makeup removal to end the day right.", "Garnier Micellar Cleansing Water", "amazon-beauty-budget-499-micellar"),
    ],
  },
  {
    id: "under-999",
    title: "Build Your Makeup Bag Under ₹999",
    subtitle: "Mix-and-match basics (check live prices)",
    note: "You can often build a starter routine by combining affordable picks. Total depends on current Amazon.in prices and variants.",
    picks: [
      simplePick("Lakmé Eyeconic Kajal", "Lakmé", "Everyday eye definition.", "Lakme Eyeconic Kajal", "amazon-beauty-budget-999-kajal"),
      simplePick("Blue Heaven Oil Control Compact Powder", "Blue Heaven", "Quick shine control for beginners.", "Blue Heaven Oil Control Compact Powder", "amazon-beauty-budget-999-compact"),
      simplePick("Swiss Beauty Eyebrow Pencil with Spoolie", "Swiss Beauty", "Easy brow grooming.", "Swiss Beauty Eyebrow Pencil with Spoolie", "amazon-beauty-budget-999-brow"),
      simplePick("Insight Non-Transfer Matte Liquid Lipstick (select)", "Insight", "Affordable lip color option.", "Insight Non Transfer Matte Liquid Lipstick", "amazon-beauty-budget-999-lip"),
    ],
  },
  {
    id: "worth-splurge",
    title: "Worth the Splurge",
    subtitle: "Premium picks for special results",
    note: "Higher-priced picks can be worth it for finish, wear, or comfort—choose based on what matters most to you. Check live prices on Amazon.in.",
    picks: [
      simplePick("Estée Lauder Double Wear Stay-in-Place Makeup", "Estée Lauder", "Known for long-wear event base.", "Estee Lauder Double Wear Stay in Place Makeup", "amazon-beauty-budget-splurge-foundation"),
      simplePick("MAC Strobe Cream (Pinklite / Peachlite)", "MAC", "Iconic glow-enhancing base.", "MAC Strobe Cream Pinklite Peachlite", "amazon-beauty-budget-splurge-strobe"),
      simplePick("Benefit Hoola Matte Bronzer", "Benefit", "Classic soft-matte sculpting bronzer.", "Benefit Hoola Matte Bronzer", "amazon-beauty-budget-splurge-bronzer"),
      simplePick("Real Techniques Everyday Essentials Brush + Sponge Kit", "Real Techniques", "Tools that make application easier and smoother.", "Real Techniques Everyday Essentials Brush and Sponge Kit", "amazon-beauty-budget-splurge-tools"),
    ],
  },
];

export const EVERYDAY_MAKEUP_BAG: MakeupBagItem[] = [
  { name: "Kajal", brand: "Lakmé", role: "Defines eyes quickly for a fresh, awake look.", amazonSearchQuery: "Lakme Eyeconic Kajal", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-bag-kajal") },
  { name: "Lipstick or Lip Tint", brand: "Maybelline / Insight", role: "Adds color and polish in one step.", amazonSearchQuery: "Maybelline lipstick or Insight lip tint", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-bag-lip") },
  { name: "Compact Powder", brand: "Blue Heaven / Maybelline", role: "Controls shine and sets light base for daily wear.", amazonSearchQuery: "Maybelline Fit Me Compact or Blue Heaven Compact Powder", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-bag-compact") },
  { name: "Mascara", brand: "MARS / Maybelline", role: "Opens up the eyes without heavy makeup.", amazonSearchQuery: "MARS Fabulash Mascara or Maybelline Sky High Mascara", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-bag-mascara") },
  { name: "BB Cream", brand: "Garnier / Ponds", role: "Light, easy base for an even everyday look.", amazonSearchQuery: "Garnier BB Cream or Ponds BB Cream", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-bag-bbcream") },
  { name: "Blush", brand: "Insight / Swiss Beauty", role: "Brings healthy color to cheeks for a natural glow.", amazonSearchQuery: "Insight Creme Blusher or Swiss Beauty Blush", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-bag-blush") },
];

export const BRAND_SHOWCASE: BrandShowcase[] = [
  { name: "Maybelline", tagline: "Everyday icons, easy to love", focus: "Base, mascara, lips, and reliable daily staples.", amazonSearchQuery: "Maybelline makeup", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-brand-maybelline") },
  { name: "Lakmé", tagline: "A familiar name in Indian beauty", focus: "Kajal, lip colors, primers, and everyday essentials.", amazonSearchQuery: "Lakme makeup", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-brand-lakme") },
  { name: "Swiss Beauty", tagline: "Trend-forward and budget-smart", focus: "Primers, highlighters, brushes, and glam picks.", amazonSearchQuery: "Swiss Beauty makeup", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-brand-swissbeauty") },
  { name: "Insight Cosmetics", tagline: "Affordable tools and everyday makeup", focus: "Blush, fixer, palettes, and beginner-friendly basics.", amazonSearchQuery: "Insight Cosmetics makeup", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-brand-insight") },
  { name: "MARS", tagline: "Budget beauty with big variety", focus: "Eyeshadow palettes, mascaras, base, and brushes.", amazonSearchQuery: "MARS Cosmetics makeup", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-brand-mars") },
  { name: "Faces Canada", tagline: "Polished picks for daily wear", focus: "Lipsticks, compacts, and easy-to-wear makeup.", amazonSearchQuery: "Faces Canada makeup", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-brand-facescanada") },
  { name: "Kay Beauty", tagline: "Modern, wearable beauty edits", focus: "Blush, liners, lip liners, and setting powders.", amazonSearchQuery: "Kay Beauty makeup", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-brand-kaybeauty") },
  { name: "Sugar Cosmetics", tagline: "Bold color and confident finishes", focus: "Bronzers, lipsticks, and statement makeup.", amazonSearchQuery: "Sugar Cosmetics makeup", affiliateUrl: storeGoHref("amazon-in", "amazon-beauty-brand-sugar") },
];

export const BEAUTY_CHAPTERS: BeautyChapter[] = [
  {
    id: "perfect-base",
    step: "Edit 01",
    title: "The Perfect Base",
    subtitle: "Prep, perfect, and set",
    intro: "A smooth, comfortable base makes everything else easier—whether you want a natural everyday finish or long-wear glam.",
    image: "/collections/amazon-beauty-toolkit/stage-base.webp",
    imageAlt: "Foundation, concealer, and face powder products arranged as a base makeup flatlay",
    accent: "ivory",
    categories: [
      {
        id: "primer",
        title: "Pore-Blurring & Gripping Primer",
        whatItIs: "Primer creates a smoother base before foundation and helps makeup hold on better.",
        oneLineFact: "Helpful for humid weather, long commutes, and events where you want your base to stay fresh.",
        occasionTag: "Humidity-Proof",
        editorialHeadline: "The Perfect Base Starts Here.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight 3-in-1 Long Lasting Pore Minimizer Primer", "Budget blur-and-grip base", "Insight 3 in 1 Long Lasting Pore Minimizer Primer", "amazon-beauty-primer-everyday"),
          pick("Mid-Range Cult", "Lakmé", "Lakmé Absolute Blur Perfect Makeup Primer", "Smooth, selfie-ready base", "Lakme Absolute Blur Perfect Makeup Primer", "amazon-beauty-primer-mid"),
          pick("Luxe Splurge", "Smashbox", "Smashbox Photo Finish Smooth & Blur Primer", "Pro-level pore-blurring finish", "Smashbox Photo Finish Smooth and Blur Primer", "amazon-beauty-primer-luxe"),
        ],
      },
      {
        id: "foundation",
        title: "Liquid Foundation",
        whatItIs: "Foundation evens out skin tone and creates a uniform base for your look.",
        oneLineFact: "Pick lighter, breathable finishes for daily wear and longer-wear options for weddings or parties.",
        occasionTag: "Wedding & Party Glam",
        editorialHeadline: "Your skin, but smoother and more even.",
        tiers: [
          pick("Everyday Value", "MARS", "MARS High Coverage Liquid Foundation", "Budget-friendly coverage", "MARS High Coverage Liquid Foundation", "amazon-beauty-foundation-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Fit Me Matte + Poreless Foundation", "Everyday matte favorite", "Maybelline Fit Me Matte Poreless Foundation", "amazon-beauty-foundation-mid"),
          pick("Luxe Splurge", "Estée Lauder", "Estée Lauder Double Wear Stay-in-Place Makeup", "Long-wear event base", "Estee Lauder Double Wear Stay in Place Makeup", "amazon-beauty-foundation-luxe"),
        ],
      },
      {
        id: "concealer",
        title: "Color Corrector & Concealer",
        whatItIs: "Concealer helps cover dark circles and targeted imperfections for a more rested look.",
        oneLineFact: "A little goes a long way for late nights, busy mornings, and special occasions.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "Brighten where it matters.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Pro Concealer Palette (6-Shade Wheel)", "All-in-one correct-and-conceal wheel", "Insight Pro Concealer Palette 6 Shade", "amazon-beauty-concealer-everyday"),
          pick("Mid-Range Cult", "L.A. Girl", "L.A. Girl HD Pro Conceal (Orange + Skin Shades)", "Targeted correction staples", "L.A. Girl HD Pro Conceal Orange Corrector", "amazon-beauty-concealer-mid"),
          pick("Luxe Splurge", "MAC", "MAC Studio Fix Conceal and Correct Palette", "Pro palette for custom correction", "MAC Studio Fix Conceal and Correct Palette", "amazon-beauty-concealer-luxe"),
        ],
      },
      {
        id: "compact-setting",
        title: "Compact & Setting Powder",
        whatItIs: "Powder helps set makeup and reduce unwanted shine, especially in the T-zone.",
        oneLineFact: "Keep a compact for touch-ups; use loose powder for longer wear and crease control.",
        occasionTag: "Humidity-Proof",
        editorialHeadline: "Set it. Forget it. Touch up when you need.",
        tiers: [
          pick("Everyday Value", "Blue Heaven", "Blue Heaven Oil Control Compact Powder", "Easy shine control on a budget", "Blue Heaven Oil Control Compact Powder", "amazon-beauty-compact-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Fit Me 12H Oil Control Compact", "Reliable everyday matte touch-up", "Maybelline Fit Me 12H Oil Control Compact", "amazon-beauty-compact-mid"),
          pick("Luxe Splurge", "Huda Beauty", "Huda Beauty Easy Bake Loose Baking Powder", "Long-wear set for events", "Huda Beauty Easy Bake Loose Baking Powder", "amazon-beauty-loosepowder-luxe"),
        ],
      },
    ],
  },
  {
    id: "sculpt-glow",
    step: "Edit 02",
    title: "Sculpt & Glow",
    subtitle: "Warmth, color, and light",
    intro: "Add dimension back after base makeup with soft color and glow—subtle for daytime, radiant for celebrations.",
    image: "/collections/amazon-beauty-toolkit/stage-sculpt.webp",
    imageAlt: "Blush, bronzer, contour, and highlighter makeup palette flatlay",
    accent: "rose",
    categories: [
      {
        id: "contour-bronzer",
        title: "Contour / Bronzer",
        whatItIs: "Bronzer and contour add warmth and soft shadows to bring structure to the face.",
        oneLineFact: "Great for photos, evenings, and festive looks when you want more definition.",
        occasionTag: "Wedding & Party Glam",
        editorialHeadline: "A little definition goes a long way.",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Cream & Powder Contour Palette", "Beginner-friendly sculpting duo", "Swiss Beauty Cream and Powder Contour Palette", "amazon-beauty-contour-everyday"),
          pick("Mid-Range Cult", "Sugar", "Sugar Contour De Force Mini Bronzer", "Compact bronzer for quick definition", "Sugar Contour De Force Mini Bronzer", "amazon-beauty-contour-mid"),
          pick("Luxe Splurge", "Benefit", "Benefit Hoola Matte Bronzer", "Iconic soft-matte bronze sculpt", "Benefit Hoola Matte Bronzer", "amazon-beauty-contour-luxe"),
        ],
      },
      {
        id: "blush",
        title: "Blush (Liquid & Powder)",
        whatItIs: "Blush adds healthy color to the cheeks for a fresh, awake look.",
        oneLineFact: "Cream blush is great for quick everyday glow; powder blush is easy to build for parties.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "Instant freshness, no filter needed.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Crème Blusher (Soft Rose / Peach)", "Easy cream flush for beginners", "Insight Creme Blusher Soft Rose Peach", "amazon-beauty-blush-everyday"),
          pick("Mid-Range Cult", "Kay Beauty", "Kay Beauty Matte / Crème Blush", "Buildable everyday-to-glam color", "Kay Beauty Matte Creme Blush", "amazon-beauty-blush-mid"),
          pick("Luxe Splurge", "Rare Beauty", "Rare Beauty Soft Pinch Liquid Blush", "High-impact long-wear glow flush", "Rare Beauty Soft Pinch Liquid Blush", "amazon-beauty-blush-luxe"),
        ],
      },
      {
        id: "highlighter",
        title: "Highlighter",
        whatItIs: "Highlighter adds light and dimension to selected areas like cheekbones and brow bones.",
        oneLineFact: "Perfect for festive nights, weddings, and any time you want a luminous finish.",
        occasionTag: "Wedding & Party Glam",
        editorialHeadline: "Glow where the light hits.",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Brick Highlighter", "Affordable multi-tone glow", "Swiss Beauty Brick Highlighter", "amazon-beauty-highlighter-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Master Chrome Metallic Highlighter", "Bold reflective glow payoff", "Maybelline Master Chrome Metallic Highlighter", "amazon-beauty-highlighter-mid"),
          pick("Luxe Splurge", "MAC", "MAC Mineralize Skinfinish (Soft & Gentle)", "Soft luxe sheen for events", "MAC Mineralize Skinfinish Soft and Gentle", "amazon-beauty-highlighter-luxe"),
        ],
      },
    ],
  },
  {
    id: "eyes-speak",
    step: "Edit 03",
    title: "Eyes That Speak",
    subtitle: "Brows, lashes, and definition",
    intro: "Eyes and brows frame your face—small steps here can make you look polished in minutes or ready for full glam.",
    image: "/collections/amazon-beauty-toolkit/stage-eyes-lips.webp",
    imageAlt: "Eyeshadow palette, mascara, eyeliner, and lip products on a warm vanity setup",
    accent: "champagne",
    categories: [
      {
        id: "brows",
        title: "Eyebrow Pencil / Definer",
        whatItIs: "Brow pencils fill sparse areas and shape brows to frame your face.",
        oneLineFact: "One of the quickest ways to look put-together, even with minimal makeup.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "Brows: the easiest polish.",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Eyebrow Pencil with Spoolie", "Quick daily brow shaping", "Swiss Beauty Eyebrow Pencil with Spoolie", "amazon-beauty-brow-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Define & Blend Brow Pencil", "Natural define-and-blend finish", "Maybelline Define and Blend Brow Pencil", "amazon-beauty-brow-mid"),
          pick("Luxe Splurge", "Benefit", "Benefit Precisely, My Brow Pencil", "Hair-like precision strokes", "Benefit Precisely My Brow Pencil", "amazon-beauty-brow-luxe"),
        ],
      },
      {
        id: "eyeshadow",
        title: "Eyeshadow Palette (Nudes + Shimmers)",
        whatItIs: "Eyeshadow adds depth and color to the eyes using matte and shimmer shades.",
        oneLineFact: "Neutral mattes suit daily looks; shimmers are perfect for parties and festive nights.",
        occasionTag: "Wedding & Party Glam",
        editorialHeadline: "Your Eyes Deserve the Spotlight.",
        tiers: [
          pick("Everyday Value", "MARS", "MARS Fantasy 15-Shade Eyeshadow Palette", "Versatile budget nude-shimmer mix", "MARS Fantasy 15 Shade Eyeshadow Palette", "amazon-beauty-eyeshadow-everyday"),
          pick("Mid-Range Cult", "Makeup Revolution", "Makeup Revolution Reloaded Velvet Rose Palette", "Romantic everyday-to-evening tones", "Makeup Revolution Reloaded Velvet Rose Palette", "amazon-beauty-eyeshadow-mid"),
          pick("Luxe Splurge", "Huda Beauty", "Huda Beauty Nude Obsessions Eyeshadow Palette", "Compact luxe texture and pigment", "Huda Beauty Nude Obsessions Eyeshadow Palette", "amazon-beauty-eyeshadow-luxe"),
        ],
      },
      {
        id: "liner-kajal",
        title: "Waterproof Eyeliner & Kajal",
        whatItIs: "Eyeliner and kajal define the lash line and eye shape for more expressive eyes.",
        oneLineFact: "Smudge-resistant options are ideal for humidity, long days, and celebration looks.",
        occasionTag: "Humidity-Proof",
        editorialHeadline: "Define it. Own it.",
        tiers: [
          pick("Everyday Value", "Lakmé", "Lakmé Eyeconic Kajal", "Everyday smudge-resistant staple", "Lakme Eyeconic Kajal", "amazon-beauty-liner-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Colossal Bold Liner & Kajal", "Bold definition for day-to-night", "Maybelline Colossal Bold Liner and Kajal", "amazon-beauty-liner-mid"),
          pick("Luxe Splurge", "Kay Beauty", "Kay Beauty Quick Dry Liquid Eyeliner", "Precise quick-dry winged liner", "Kay Beauty Quick Dry Liquid Eyeliner", "amazon-beauty-liner-luxe"),
        ],
      },
      {
        id: "mascara",
        title: "Volumizing & Lengthening Mascara",
        whatItIs: "Mascara darkens and lifts lashes to make eyes look more open and awake.",
        oneLineFact: "A fast, high-impact step for college, office, or no-makeup makeup days.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "Lashes that do the talking.",
        tiers: [
          pick("Everyday Value", "MARS", "MARS Fabulash Volumizing Mascara", "Quick volume on a budget", "MARS Fabulash Volumizing Mascara", "amazon-beauty-mascara-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Lash Sensational Sky High Mascara", "Length and lift favorite", "Maybelline Lash Sensational Sky High Mascara", "amazon-beauty-mascara-mid"),
          pick("Luxe Splurge", "L'Oréal", "L'Oréal Paris Lash Paradise Mascara", "Full, plush lash drama", "L'Oreal Paris Lash Paradise Mascara", "amazon-beauty-mascara-luxe"),
        ],
      },
    ],
  },
  {
    id: "final-signature",
    step: "Edit 04",
    title: "The Final Signature",
    subtitle: "Lips, lock, and tools",
    intro: "Finish your look with color, set it for the day (or night), and use simple tools and removal for a smoother routine.",
    image: "/collections/amazon-beauty-toolkit/stage-tools.webp",
    imageAlt: "Makeup brushes, beauty sponge, setting spray, and cleansing products on a vanity",
    accent: "cocoa",
    categories: [
      {
        id: "lipstick",
        title: "Bullet & Liquid Lipstick",
        whatItIs: "Lipstick adds rich color and can change the mood of your look instantly.",
        oneLineFact: "Choose comfortable formulas for daily wear and longer-wear options for meals and events.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "A Little Glam Never Hurt.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Non-Transfer Matte Liquid Lipstick", "Budget long-wear matte color", "Insight Non Transfer Matte Liquid Lipstick", "amazon-beauty-lipstick-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline SuperStay Vinyl Ink / Matte Ink", "Long-lasting day-to-night payoff", "Maybelline SuperStay Vinyl Ink Matte Ink Lipstick", "amazon-beauty-lipstick-mid"),
          pick("Luxe Splurge", "MAC", "MAC MACximal Silky Matte Lipstick", "Classic luxe matte bullet finish", "MAC MACximal Silky Matte Lipstick", "amazon-beauty-lipstick-luxe"),
        ],
      },
      {
        id: "lip-gloss",
        title: "Hydrating Lip Gloss & Lip Oil",
        whatItIs: "Lip gloss and lip oils add shine and comfort for a softer, fuller-looking finish.",
        oneLineFact: "Easy for everyday looks, and great layered over lipstick for parties.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "Shine, the easy way.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Plumping Lip Gloss", "Glossy shine on a budget", "Insight Plumping Lip Gloss", "amazon-beauty-lipgloss-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Lifter Gloss with Hyaluronic Acid", "Cushiony hydrating shine", "Maybelline Lifter Gloss Hyaluronic Acid", "amazon-beauty-lipgloss-mid"),
          pick("Luxe Splurge", "Clinique", "Clinique Pop Plush Creamy Lip Gloss", "Comfortable plush luxe gloss", "Clinique Pop Plush Creamy Lip Gloss", "amazon-beauty-lipgloss-luxe"),
        ],
      },
      {
        id: "setting-spray",
        title: "Makeup Fixer / Setting Spray",
        whatItIs: "Setting spray helps makeup stay in place and can make layers look more blended.",
        oneLineFact: "Useful for humidity, long days, weddings, and dance-floor nights.",
        occasionTag: "Humidity-Proof",
        editorialHeadline: "Lock the look, keep the vibe.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Makeup Fixer Spray", "Budget-friendly makeup lock-in", "Insight Makeup Fixer Spray", "amazon-beauty-fixer-everyday"),
          pick("Mid-Range Cult", "Swiss Beauty", "Swiss Beauty Natural Makeup Fixer (Aloe & Vit E)", "Refreshing everyday setting mist", "Swiss Beauty Natural Makeup Fixer Aloe Vitamin E", "amazon-beauty-fixer-mid"),
          pick("Luxe Splurge", "MAC", "MAC Prep + Prime Fix+", "Hydrating prep-and-set icon", "MAC Prep and Prime Fix Plus", "amazon-beauty-fixer-luxe"),
        ],
      },
      {
        id: "tools-removal",
        title: "Brushes, Sponges & Makeup Removal",
        whatItIs: "Tools help blend makeup smoothly; gentle removal helps keep skin comfortable after wear.",
        oneLineFact: "Good tools and proper removal make every routine easier—beginner or pro.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "Blend well. Remove gently.",
        tiers: [
          pick("Everyday Value", "MARS", "MARS Artist's Arsenal 6-Piece Brush & Sponge Set", "Starter toolkit for daily basics", "MARS Artist's Arsenal 6 Piece Brush and Sponge Set", "amazon-beauty-tools-everyday"),
          pick("Mid-Range Cult", "Real Techniques", "Real Techniques Everyday Essentials Brush + Sponge Kit", "Easy-to-use application kit", "Real Techniques Everyday Essentials Brush and Sponge Kit", "amazon-beauty-tools-mid"),
          pick("Luxe Splurge", "Clinique", "Clinique Take The Day Off Cleansing Balm", "Luxurious melt-away makeup remover", "Clinique Take The Day Off Cleansing Balm", "amazon-beauty-remover-luxe"),
        ],
      },
    ],
  },
];

export const AMAZON_BEAUTY_STAGES = BEAUTY_CHAPTERS;

export const BEAUTY_FAQS = [
  {
    question: "What does primer do?",
    answer:
      "Primer creates a smoother base before foundation. It can help makeup apply more evenly and, depending on the formula, improve grip or reduce the look of pores.",
  },
  {
    question: "How do I cover dark circles with concealer?",
    answer:
      "Use a small amount on the areas that look dark, blend gently, and set lightly if needed. Some people prefer a peach/orange corrector under concealer for deeper shadows—choose what looks natural on your skin.",
  },
  {
    question: "Loose powder vs compact powder — what’s the difference?",
    answer:
      "Loose powder is great for setting makeup and reducing creasing for longer wear. Compact powder is easier to carry and useful for quick shine touch-ups during the day.",
  },
  {
    question: "What makeup works better in Indian heat and humidity?",
    answer:
      "Light layers, a grip-focused primer, smudge-resistant eye products, and a setting powder/spray on oily areas can help. Always check product details, shades, and ingredients on Amazon.in before buying.",
  },
];
