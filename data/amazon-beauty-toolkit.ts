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
  /** Optional actual product image path (e.g. /collections/amazon-beauty-toolkit/products/...). */
  image?: string;
}

export interface BeautyCategory {
  id: string;
  title: string;
  /** Short educational explanation of what this product/category does. */
  whatItIs: string;
  /** Occasion/use-case guidance in one crisp line. */
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
  accent: "ivory" | "rose" | "champagne" | "cocoa";
  categories: BeautyCategory[];
}

function pick(
  tier: BudgetTier,
  brand: string,
  name: string,
  whyPick: string,
  amazonSearchQuery: string,
  src: string,
  image?: string,
): BeautyTierPick {
  return {
    tier,
    brand,
    name,
    whyPick,
    amazonSearchQuery,
    affiliateUrl: storeGoHref("amazon-in", src),
    ...(image ? { image } : {}),
  };
}

export const BEAUTY_CHAPTERS: BeautyChapter[] = [
  {
    id: "face-prep-base",
    step: "Chapter I",
    title: "The Perfect Base",
    subtitle: "Prep, perfect, and set",
    intro:
      "Great makeup begins before color. These are the quiet essentials that help skin look smoother, base wear better, and everything feel more intentional.",
    image: "/collections/amazon-beauty-toolkit/stage-prep.webp",
    imageAlt: "Editorial beauty prep products and glow essentials arranged on a warm vanity",
    accent: "ivory",
    categories: [
      {
        id: "hydrating-toner-mist",
        title: "Hydrating Toner / Mist",
        whatItIs: "A lightweight liquid step that refreshes and rebalances skin after cleansing.",
        oneLineFact: "Helps foundation glide more smoothly and keeps skin comfortable before office mornings or winter events.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "A calmer canvas, before the first drop of makeup.",
        tiers: [
          pick("Everyday Value", "Plum", "Plum Bulgarian Valley Rose Water Toner", "Light daily hydration reset", "Plum Bulgarian Valley Rose Water Toner", "amazon-beauty-toner-everyday"),
          pick("Mid-Range Cult", "Klairs", "Klairs Supple Preparation Unscented Toner", "Cushiony prep for sensitive skin", "Klairs Supple Preparation Unscented Toner", "amazon-beauty-toner-mid"),
          pick("Luxe Splurge", "Clinique", "Clinique Clarifying Lotion", "Polished exfoliating-toner step", "Clinique Clarifying Lotion", "amazon-beauty-toner-luxe"),
        ],
      },
      {
        id: "pore-blurring-primer",
        title: "Pore-Blurring & Gripping Primer",
        whatItIs: "Creates a smoother surface and helps makeup hold on longer.",
        oneLineFact: "Useful for humid commutes and long events when you want base makeup to stay fresher for longer.",
        occasionTag: "Humidity-Proof",
        editorialHeadline: "The invisible layer that changes everything.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight 3-in-1 Long Lasting Pore Minimizer Primer", "Budget blur-and-grip base", "Insight 3 in 1 Long Lasting Pore Minimizer Primer", "amazon-beauty-primer-everyday"),
          pick("Mid-Range Cult", "Lakmé", "Lakmé Absolute Blur Perfect Makeup Primer", "Smooth, selfie-ready base", "Lakme Absolute Blur Perfect Makeup Primer", "amazon-beauty-primer-mid"),
          pick("Luxe Splurge", "Smashbox", "Smashbox Photo Finish Smooth & Blur Primer", "Pro-level pore-blurring finish", "Smashbox Photo Finish Smooth and Blur Primer", "amazon-beauty-primer-luxe"),
        ],
      },
      {
        id: "strobe-cream",
        title: "Strobe Cream",
        whatItIs: "A glow-enhancing cream that adds soft radiance under or over base products.",
        oneLineFact: "Beautiful on bare-skin days or mixed into base for a luminous festive finish.",
        occasionTag: "Wedding & Party Glam",
        editorialHeadline: "Light, caught softly on the skin.",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Real Make-Up Base Highlighting Primer", "Affordable glow-boosting base", "Swiss Beauty Real Make Up Base Highlighting Primer", "amazon-beauty-strobe-everyday"),
          pick("Mid-Range Cult", "Lakmé", "Lakmé Lumi Cream (Moisturizer + Highlighter)", "Dewy glow for Indian skin tones", "Lakme Lumi Cream Moisturizer Highlighter", "amazon-beauty-strobe-mid"),
          pick("Luxe Splurge", "MAC", "MAC Strobe Cream (Pinklite / Peachlite)", "Iconic lit-from-within radiance", "MAC Strobe Cream Pinklite Peachlite", "amazon-beauty-strobe-luxe"),
        ],
      },
      {
        id: "liquid-foundation",
        title: "Liquid Foundation",
        whatItIs: "Evens out skin tone and creates a uniform base for the rest of your makeup.",
        oneLineFact: "Choose breathable finishes for daily wear and longer-wear coverage for celebrations and outdoor events.",
        occasionTag: "Wedding & Party Glam",
        editorialHeadline: "Coverage, but make it feel like you.",
        tiers: [
          pick("Everyday Value", "MARS", "MARS High Coverage Liquid Foundation", "Budget-friendly high coverage", "MARS High Coverage Liquid Foundation", "amazon-beauty-foundation-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Fit Me Matte + Poreless Foundation", "Everyday matte cult favorite", "Maybelline Fit Me Matte Poreless Foundation", "amazon-beauty-foundation-mid"),
          pick("Luxe Splurge", "Estée Lauder", "Estée Lauder Double Wear Stay-in-Place Makeup", "Long-wear event-ready base", "Estee Lauder Double Wear Stay in Place Makeup", "amazon-beauty-foundation-luxe"),
        ],
      },
      {
        id: "corrector-concealer-palette",
        title: "Color Corrector & Concealer",
        whatItIs: "Targets specific concerns like dark circles, redness, or pigmentation before blending into the base.",
        oneLineFact: "A small step that can make tired eyes and uneven tone look more rested in minutes.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "A little precision where it matters most.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Pro Concealer Palette (6-Shade Wheel)", "All-in-one correct-and-conceal wheel", "Insight Pro Concealer Palette 6 Shade", "amazon-beauty-concealer-everyday"),
          pick("Mid-Range Cult", "L.A. Girl", "L.A. Girl HD Pro Conceal (Orange + Skin Shades)", "Targeted correction staples", "L.A. Girl HD Pro Conceal Orange Corrector", "amazon-beauty-concealer-mid"),
          pick("Luxe Splurge", "MAC", "MAC Studio Fix Conceal and Correct Palette", "Pro palette for custom correction", "MAC Studio Fix Conceal and Correct Palette", "amazon-beauty-concealer-luxe"),
        ],
      },
      {
        id: "compact-face-powder",
        title: "Compact / Face Powder",
        whatItIs: "Sets base makeup and helps reduce shine in areas that get oily through the day.",
        oneLineFact: "A practical touch-up essential for meetings, commutes, and warm-weather days.",
        occasionTag: "Humidity-Proof",
        editorialHeadline: "Soft-focus, on standby.",
        tiers: [
          pick("Everyday Value", "Blue Heaven", "Blue Heaven Oil Control Compact Powder", "Easy shine control on a budget", "Blue Heaven Oil Control Compact Powder", "amazon-beauty-compact-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Fit Me 12H Oil Control Compact", "Reliable everyday matte touch-up", "Maybelline Fit Me 12H Oil Control Compact", "amazon-beauty-compact-mid"),
          pick("Luxe Splurge", "MAC", "MAC Studio Fix Powder Plus Foundation", "Buildable powder-foundation finish", "MAC Studio Fix Powder Plus Foundation", "amazon-beauty-compact-luxe"),
        ],
      },
      {
        id: "translucent-setting-powder",
        title: "Translucent Setting Powder",
        whatItIs: "A finely milled powder that locks makeup in place and helps reduce creasing.",
        oneLineFact: "Especially helpful under eyes and in the T-zone for long wear and flash photography.",
        occasionTag: "Wedding & Party Glam",
        editorialHeadline: "Set the look. Keep the ease.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight HD Banana Loose Setting Powder", "Budget baking and brightening", "Insight HD Banana Loose Setting Powder", "amazon-beauty-loosepowder-everyday"),
          pick("Mid-Range Cult", "Kay Beauty", "Kay Beauty HD Loose Setting Powder", "Smooth HD set for events", "Kay Beauty HD Loose Setting Powder", "amazon-beauty-loosepowder-mid"),
          pick("Luxe Splurge", "Huda Beauty", "Huda Beauty Easy Bake Loose Baking Powder", "Long-wear bake for glam looks", "Huda Beauty Easy Bake Loose Baking Powder", "amazon-beauty-loosepowder-luxe"),
        ],
      },
    ],
  },
  {
    id: "sculpt-glow",
    step: "Chapter II",
    title: "Sculpt & Glow",
    subtitle: "Dimension, warmth, and light",
    intro:
      "Once the base is set, bring the face back to life. Soft color, gentle structure, and light in the right places can transform a look without overcomplicating it.",
    image: "/collections/amazon-beauty-toolkit/stage-sculpt.webp",
    imageAlt: "Blush, bronzer, contour, and highlighter arranged in a warm editorial flatlay",
    accent: "rose",
    categories: [
      {
        id: "contour-bronzer",
        title: "Contour / Bronzer",
        whatItIs: "Adds warmth and shadow to define features and bring dimension back after base makeup.",
        oneLineFact: "Great for portraits, evenings out, and any look that needs a little more structure.",
        occasionTag: "Wedding & Party Glam",
        editorialHeadline: "Shape, softly.",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Cream & Powder Contour Palette", "Beginner-friendly sculpting duo", "Swiss Beauty Cream and Powder Contour Palette", "amazon-beauty-contour-everyday"),
          pick("Mid-Range Cult", "Sugar", "Sugar Contour De Force Mini Bronzer", "Compact bronzer for quick definition", "Sugar Contour De Force Mini Bronzer", "amazon-beauty-contour-mid"),
          pick("Luxe Splurge", "Benefit", "Benefit Hoola Matte Bronzer", "Iconic soft-matte bronze sculpt", "Benefit Hoola Matte Bronzer", "amazon-beauty-contour-luxe"),
        ],
      },
      {
        id: "blush",
        title: "Blush (Liquid & Powder)",
        whatItIs: "Adds healthy color to the cheeks for a fresh, awake look.",
        oneLineFact: "Creams melt beautifully into quick everyday routines; powders are easy to build for festive looks.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "A flush that feels alive.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Crème Blusher (Soft Rose / Peach)", "Easy cream flush for beginners", "Insight Creme Blusher Soft Rose Peach", "amazon-beauty-blush-everyday"),
          pick("Mid-Range Cult", "Kay Beauty", "Kay Beauty Matte / Crème Blush", "Buildable everyday-to-glam color", "Kay Beauty Matte Creme Blush", "amazon-beauty-blush-mid"),
          pick("Luxe Splurge", "Rare Beauty", "Rare Beauty Soft Pinch Liquid Blush", "High-impact long-wear glow flush", "Rare Beauty Soft Pinch Liquid Blush", "amazon-beauty-blush-luxe"),
        ],
      },
      {
        id: "highlighter",
        title: "Highlighter",
        whatItIs: "Reflects light on high points of the face to add dimension and glow.",
        oneLineFact: "A little on cheekbones or brow bones can instantly lift a party or celebration look.",
        occasionTag: "Wedding & Party Glam",
        editorialHeadline: "Glow, placed with intention.",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Brick Highlighter", "Affordable multi-tone glow", "Swiss Beauty Brick Highlighter", "amazon-beauty-highlighter-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Master Chrome Metallic Highlighter", "Bold reflective glow payoff", "Maybelline Master Chrome Metallic Highlighter", "amazon-beauty-highlighter-mid"),
          pick("Luxe Splurge", "MAC", "MAC Mineralize Skinfinish (Soft & Gentle)", "Soft luxe sheen for events", "MAC Mineralize Skinfinish Soft and Gentle", "amazon-beauty-highlighter-luxe"),
        ],
      },
    ],
  },
  {
    id: "eyes-brows",
    step: "Chapter III",
    title: "Eyes That Speak",
    subtitle: "Definition, depth, and expression",
    intro:
      "From barely-there definition to full evening drama, eyes and brows frame expression. The right tools make even simple looks feel considered.",
    image: "/collections/amazon-beauty-toolkit/stage-eyes-lips.webp",
    imageAlt: "Eyeshadow, mascara, liner, and lip products styled in an editorial beauty composition",
    accent: "champagne",
    categories: [
      {
        id: "eyebrow-pencil-definer",
        title: "Eyebrow Pencil / Definer",
        whatItIs: "Fills and shapes brows to frame the face and balance your features.",
        oneLineFact: "One of the fastest ways to look polished—even on minimal-makeup days.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "The frame makes the picture.",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Eyebrow Pencil with Spoolie", "Quick daily brow shaping", "Swiss Beauty Eyebrow Pencil with Spoolie", "amazon-beauty-brow-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Define & Blend Brow Pencil", "Natural define-and-blend finish", "Maybelline Define and Blend Brow Pencil", "amazon-beauty-brow-mid"),
          pick("Luxe Splurge", "Benefit", "Benefit Precisely, My Brow Pencil", "Hair-like precision strokes", "Benefit Precisely My Brow Pencil", "amazon-beauty-brow-luxe"),
        ],
      },
      {
        id: "eyeshadow-palette",
        title: "Eyeshadow Palette (Nudes + Shimmers)",
        whatItIs: "A mix of matte and shimmer shades to add depth, dimension, and mood to the eyes.",
        oneLineFact: "Neutral mattes work for everyday definition; shimmers can turn the same look into evening glam.",
        occasionTag: "Wedding & Party Glam",
        editorialHeadline: "A wardrobe for your eyes.",
        tiers: [
          pick("Everyday Value", "MARS", "MARS Fantasy 15-Shade Eyeshadow Palette", "Versatile budget nude-shimmer mix", "MARS Fantasy 15 Shade Eyeshadow Palette", "amazon-beauty-eyeshadow-everyday"),
          pick("Mid-Range Cult", "Makeup Revolution", "Makeup Revolution Reloaded Velvet Rose Palette", "Romantic everyday-to-evening tones", "Makeup Revolution Reloaded Velvet Rose Palette", "amazon-beauty-eyeshadow-mid"),
          pick("Luxe Splurge", "Huda Beauty", "Huda Beauty Nude Obsessions Eyeshadow Palette", "Compact luxe texture and pigment", "Huda Beauty Nude Obsessions Eyeshadow Palette", "amazon-beauty-eyeshadow-luxe"),
        ],
      },
      {
        id: "waterproof-eyeliner-kajal",
        title: "Waterproof Eyeliner & Kajal",
        whatItIs: "Defines the lash line and eye shape for sharper, more expressive eyes.",
        oneLineFact: "Smudge-resistant formulas are especially useful for humidity, long days, and celebration looks.",
        occasionTag: "Humidity-Proof",
        editorialHeadline: "Definition that holds its ground.",
        tiers: [
          pick("Everyday Value", "Lakmé", "Lakmé Eyeconic Kajal", "Everyday smudge-resistant staple", "Lakme Eyeconic Kajal", "amazon-beauty-liner-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Colossal Bold Liner & Kajal", "Bold definition for day-to-night", "Maybelline Colossal Bold Liner and Kajal", "amazon-beauty-liner-mid"),
          pick("Luxe Splurge", "Kay Beauty", "Kay Beauty Quick Dry Liquid Eyeliner", "Precise quick-dry winged liner", "Kay Beauty Quick Dry Liquid Eyeliner", "amazon-beauty-liner-luxe"),
        ],
      },
      {
        id: "volumizing-mascara",
        title: "Volumizing & Lengthening Mascara",
        whatItIs: "Coats lashes to make them look darker, longer, and more lifted.",
        oneLineFact: "A quick, high-impact step for looking awake on calls, classes, and everyday outings.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "Eyes, instantly awake.",
        tiers: [
          pick("Everyday Value", "MARS", "MARS Fabulash Volumizing Mascara", "Quick volume on a budget", "MARS Fabulash Volumizing Mascara", "amazon-beauty-mascara-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Lash Sensational Sky High Mascara", "Length and lift cult favorite", "Maybelline Lash Sensational Sky High Mascara", "amazon-beauty-mascara-mid"),
          pick("Luxe Splurge", "L'Oréal", "L'Oréal Paris Lash Paradise Mascara", "Full, plush lash drama", "L'Oreal Paris Lash Paradise Mascara", "amazon-beauty-mascara-luxe"),
        ],
      },
    ],
  },
  {
    id: "lips-finish-tools",
    step: "Chapter IV",
    title: "The Final Signature",
    subtitle: "Lips, lock, and the tools that make it effortless",
    intro:
      "The finishing touches are where a look becomes yours—color on the lips, a setting mist that holds, and tools that make application feel seamless.",
    image: "/collections/amazon-beauty-toolkit/stage-tools.webp",
    imageAlt: "Makeup brushes, setting spray, and finishing beauty essentials on a vanity",
    accent: "cocoa",
    categories: [
      {
        id: "lip-liner",
        title: "Lip Liner",
        whatItIs: "Defines the lip edge and helps lipstick apply more neatly and last with less feathering.",
        oneLineFact: "Useful for crisp color, subtle reshaping, and longer-lasting lip looks at dinners and events.",
        occasionTag: "Wedding & Party Glam",
        editorialHeadline: "A line that brings it all together.",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Bold Matt Lip Liner Set", "Affordable shaping and base color", "Swiss Beauty Bold Matt Lip Liner Set", "amazon-beauty-lipliner-everyday"),
          pick("Mid-Range Cult", "Kay Beauty", "Kay Beauty Matte Action Lip Liner", "Smooth everyday-to-glam lining", "Kay Beauty Matte Action Lip Liner", "amazon-beauty-lipliner-mid"),
          pick("Luxe Splurge", "MAC", "MAC Lip Pencil (Spice / Whirl / Soar)", "Iconic precise lip definition", "MAC Lip Pencil Spice Whirl Soar", "amazon-beauty-lipliner-luxe"),
        ],
      },
      {
        id: "bullet-liquid-lipstick",
        title: "Bullet & Liquid Lipstick",
        whatItIs: "Delivers rich lip color in finishes ranging from comfortable satin to long-wear matte.",
        oneLineFact: "Choose comfort for daily wear and longer-wear formulas for meals, celebrations, and long nights out.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "Color, with character.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Non-Transfer Matte Liquid Lipstick", "Budget long-wear matte color", "Insight Non Transfer Matte Liquid Lipstick", "amazon-beauty-lipstick-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline SuperStay Vinyl Ink / Matte Ink", "Long-lasting day-to-night payoff", "Maybelline SuperStay Vinyl Ink Matte Ink Lipstick", "amazon-beauty-lipstick-mid"),
          pick("Luxe Splurge", "MAC", "MAC MACximal Silky Matte Lipstick", "Classic luxe matte bullet finish", "MAC MACximal Silky Matte Lipstick", "amazon-beauty-lipstick-luxe"),
        ],
      },
      {
        id: "lip-gloss-oil",
        title: "Hydrating Lip Gloss & Lip Oil",
        whatItIs: "Adds shine and comfort, making lips look fuller and feel more cushioned.",
        oneLineFact: "Easy to wear alone for effortless outings or layered over lipstick for a softer, glossier finish.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "Shine, without the effort.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Plumping Lip Gloss", "Glossy shine on a budget", "Insight Plumping Lip Gloss", "amazon-beauty-lipgloss-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Lifter Gloss with Hyaluronic Acid", "Cushiony hydrating shine", "Maybelline Lifter Gloss Hyaluronic Acid", "amazon-beauty-lipgloss-mid"),
          pick("Luxe Splurge", "Clinique", "Clinique Pop Plush Creamy Lip Gloss", "Comfortable plush luxe gloss", "Clinique Pop Plush Creamy Lip Gloss", "amazon-beauty-lipgloss-luxe"),
        ],
      },
      {
        id: "makeup-fixer-setting-spray",
        title: "Makeup Fixer / Setting Spray",
        whatItIs: "Helps meld layers together and extend the wear of your finished makeup look.",
        oneLineFact: "A smart final step for humidity, long days, and events where you want makeup to stay put.",
        occasionTag: "Humidity-Proof",
        editorialHeadline: "Hold the look. Keep the feeling.",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Makeup Fixer Spray", "Budget-friendly makeup lock-in", "Insight Makeup Fixer Spray", "amazon-beauty-fixer-everyday"),
          pick("Mid-Range Cult", "Swiss Beauty", "Swiss Beauty Natural Makeup Fixer (Aloe & Vit E)", "Refreshing everyday setting mist", "Swiss Beauty Natural Makeup Fixer Aloe Vitamin E", "amazon-beauty-fixer-mid"),
          pick("Luxe Splurge", "MAC", "MAC Prep + Prime Fix+", "Hydrating prep-and-set icon", "MAC Prep and Prime Fix Plus", "amazon-beauty-fixer-luxe"),
        ],
      },
      {
        id: "beauty-blender-brush-kit",
        title: "Beauty Blender & Brush Kit",
        whatItIs: "Tools that help blend base, blush, and powders more evenly for a smoother finish.",
        oneLineFact: "Good tools can make affordable products look more polished with less effort.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "The artistry is in the tools.",
        tiers: [
          pick("Everyday Value", "MARS", "MARS Artist's Arsenal 6-Piece Brush & Sponge Set", "Starter toolkit for daily basics", "MARS Artist's Arsenal 6 Piece Brush and Sponge Set", "amazon-beauty-tools-everyday"),
          pick("Mid-Range Cult", "PAC", "PAC Cosmetics Studio Brush & Sponge Set", "Reliable mid-range application kit", "PAC Cosmetics Studio Brush and Sponge Set", "amazon-beauty-tools-mid"),
          pick("Luxe Splurge", "Real Techniques", "Real Techniques Everyday Essentials Brush + Sponge Kit", "Soft, easy-to-use pro-favorite tools", "Real Techniques Everyday Essentials Brush and Sponge Kit", "amazon-beauty-tools-luxe"),
        ],
      },
      {
        id: "micellar-cleansing-water",
        title: "Micellar Cleansing Water",
        whatItIs: "A gentle cleanser that helps lift makeup and daily buildup without harsh rubbing.",
        oneLineFact: "An easy, skin-kind way to remove makeup at the end of long days and events.",
        occasionTag: "5-Min Everyday",
        editorialHeadline: "The most beautiful ending: clean, comfortable skin.",
        tiers: [
          pick("Everyday Value", "Garnier", "Garnier Micellar Cleansing Water (Pink Cap)", "Gentle everyday makeup removal", "Garnier Micellar Cleansing Water Pink Cap", "amazon-beauty-remover-everyday"),
          pick("Mid-Range Cult", "Bioderma", "Bioderma Sensibio H2O Micellar Water", "Sensitive-skin cult cleanser", "Bioderma Sensibio H2O Micellar Water", "amazon-beauty-remover-mid"),
          pick("Luxe Splurge", "Clinique", "Clinique Take The Day Off Cleansing Balm", "Luxurious melt-away makeup remover", "Clinique Take The Day Off Cleansing Balm", "amazon-beauty-remover-luxe"),
        ],
      },
    ],
  },
];

/** Backwards-compatible export name used by the page for JSON-LD/item counts. */
export const AMAZON_BEAUTY_STAGES = BEAUTY_CHAPTERS;

export const BEAUTY_FAQS = [
  {
    question: "What’s the difference between primer and strobe cream?",
    answer:
      "Primer is mainly for smoothing, grip, and longer wear (for example, blurring pores or helping makeup stay put). Strobe cream is for glow—it adds a soft, luminous sheen. You can use strobe cream for radiance and primer where you need makeup to hold better.",
  },
  {
    question: "What does concealer do, and when should I use it?",
    answer:
      "Concealer helps cover or brighten targeted areas like under-eye darkness, redness, or small marks. Use a small amount where needed and blend well—often after foundation, or before depending on your routine and coverage preference.",
  },
  {
    question: "Loose powder vs compact powder: which one should I choose?",
    answer:
      "Loose setting powder is great for locking makeup and reducing creasing for longer wear or events. Compact powder is convenient for quick, on-the-go shine control. Many people use loose powder at home and keep a compact in their bag.",
  },
  {
    question: "How do I choose makeup for Indian humidity?",
    answer:
      "Use lightweight layers, a grip-focused primer where needed, and set areas that get oily. Smudge-resistant eye products and setting spray can help, but comfort, shade match, and how the product feels on your skin matter most—always check details on Amazon before buying.",
  },
];
