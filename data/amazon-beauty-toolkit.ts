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
}

export interface BeautyCategory {
  id: string;
  title: string;
  oneLineFact: string;
  occasionTag: OccasionTag;
  tiers: [BeautyTierPick, BeautyTierPick, BeautyTierPick];
}

export interface BeautyStage {
  id: string;
  step: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  categories: BeautyCategory[];
}

function pick(
  tier: BudgetTier,
  brand: string,
  name: string,
  whyPick: string,
  amazonSearchQuery: string,
  src: string,
): BeautyTierPick {
  return {
    tier,
    brand,
    name,
    whyPick,
    amazonSearchQuery,
    affiliateUrl: storeGoHref("amazon-in", src),
  };
}

export const AMAZON_BEAUTY_STAGES: BeautyStage[] = [
  {
    id: "prep-glow",
    step: "1",
    title: "Prep & Glow",
    description: "Prep skin so makeup sits smoothly, lasts longer, and looks fresh instead of patchy.",
    image: "/collections/amazon-beauty-toolkit/stage-prep.webp",
    imageAlt: "Hydrating skincare toner, serum, and glow-prep products on a vanity",
    categories: [
      {
        id: "hydrating-toner-mist",
        title: "Hydrating Toner / Mist",
        oneLineFact: "Rebalances skin after cleansing so foundation glides on smoothly without clinging to dry patches—ideal before office mornings or winter events.",
        occasionTag: "5-Min Everyday",
        tiers: [
          pick("Everyday Value", "Plum", "Plum Bulgarian Valley Rose Water Toner", "Light daily hydration reset", "Plum Bulgarian Valley Rose Water Toner", "amazon-beauty-toner-everyday"),
          pick("Mid-Range Cult", "Klairs", "Klairs Supple Preparation Unscented Toner", "Cushiony prep for sensitive skin", "Klairs Supple Preparation Unscented Toner", "amazon-beauty-toner-mid"),
          pick("Luxe Splurge", "Clinique", "Clinique Clarifying Lotion", "Polished exfoliating-toner step", "Clinique Clarifying Lotion", "amazon-beauty-toner-luxe"),
        ],
      },
      {
        id: "pore-blurring-primer",
        title: "Pore-Blurring & Gripping Primer",
        oneLineFact: "Creates a smooth barrier between skin and base makeup so foundation grips better and looks fresher through humid commutes or long weddings.",
        occasionTag: "Humidity-Proof",
        tiers: [
          pick("Everyday Value", "Insight", "Insight 3-in-1 Long Lasting Pore Minimizer Primer", "Budget blur-and-grip base", "Insight 3 in 1 Long Lasting Pore Minimizer Primer", "amazon-beauty-primer-everyday"),
          pick("Mid-Range Cult", "Lakmé", "Lakmé Absolute Blur Perfect Makeup Primer", "Smooth, selfie-ready base", "Lakme Absolute Blur Perfect Makeup Primer", "amazon-beauty-primer-mid"),
          pick("Luxe Splurge", "Smashbox", "Smashbox Photo Finish Smooth & Blur Primer", "Pro-level pore-blurring finish", "Smashbox Photo Finish Smooth and Blur Primer", "amazon-beauty-primer-luxe"),
        ],
      },
      {
        id: "strobe-cream",
        title: "Strobe Cream (Lit-From-Within Glow)",
        oneLineFact: "Adds a soft pearly sheen under foundation or on bare skin for a healthy glow on college days or festive nights.",
        occasionTag: "Wedding & Party Glam",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Real Make-Up Base Highlighting Primer", "Affordable glow-boosting base", "Swiss Beauty Real Make Up Base Highlighting Primer", "amazon-beauty-strobe-everyday"),
          pick("Mid-Range Cult", "Lakmé", "Lakmé Lumi Cream (Moisturizer + Highlighter)", "Dewy glow for Indian skin tones", "Lakme Lumi Cream Moisturizer Highlighter", "amazon-beauty-strobe-mid"),
          pick("Luxe Splurge", "MAC", "MAC Strobe Cream (Pinklite / Peachlite)", "Iconic lit-from-within radiance", "MAC Strobe Cream Pinklite Peachlite", "amazon-beauty-strobe-luxe"),
        ],
      },
    ],
  },
  {
    id: "flawless-base",
    step: "2",
    title: "Flawless Base",
    description: "Even out tone, conceal concerns, and set your base for the finish and wear time you need.",
    image: "/collections/amazon-beauty-toolkit/stage-base.webp",
    imageAlt: "Foundation, concealer, and face powder products arranged as a base makeup flatlay",
    categories: [
      {
        id: "liquid-foundation",
        title: "Liquid Foundation",
        oneLineFact: "Evens redness and skin tone—choose breathable matte finishes for office wear and longer-wear coverage for outdoor weddings.",
        occasionTag: "Wedding & Party Glam",
        tiers: [
          pick("Everyday Value", "MARS", "MARS High Coverage Liquid Foundation", "Budget-friendly high coverage", "MARS High Coverage Liquid Foundation", "amazon-beauty-foundation-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Fit Me Matte + Poreless Foundation", "Everyday matte cult favorite", "Maybelline Fit Me Matte Poreless Foundation", "amazon-beauty-foundation-mid"),
          pick("Luxe Splurge", "Estée Lauder", "Estée Lauder Double Wear Stay-in-Place Makeup", "Long-wear event-ready base", "Estee Lauder Double Wear Stay in Place Makeup", "amazon-beauty-foundation-luxe"),
        ],
      },
      {
        id: "corrector-concealer-palette",
        title: "Color Corrector & Concealer Palette",
        oneLineFact: "Neutralizes dark circles and pigmentation before concealer brightens—especially helpful after late nights or long event days.",
        occasionTag: "5-Min Everyday",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Pro Concealer Palette (6-Shade Wheel)", "All-in-one correct-and-conceal wheel", "Insight Pro Concealer Palette 6 Shade", "amazon-beauty-concealer-everyday"),
          pick("Mid-Range Cult", "L.A. Girl", "L.A. Girl HD Pro Conceal (Orange + Skin Shades)", "Targeted correction staples", "L.A. Girl HD Pro Conceal Orange Corrector", "amazon-beauty-concealer-mid"),
          pick("Luxe Splurge", "MAC", "MAC Studio Fix Conceal and Correct Palette", "Pro palette for custom correction", "MAC Studio Fix Conceal and Correct Palette", "amazon-beauty-concealer-luxe"),
        ],
      },
      {
        id: "compact-face-powder",
        title: "Compact / Face Powder",
        oneLineFact: "Absorbs midday T-zone shine in seconds, making it a handbag essential for quick touch-ups before meetings or dates.",
        occasionTag: "Humidity-Proof",
        tiers: [
          pick("Everyday Value", "Blue Heaven", "Blue Heaven Oil Control Compact Powder", "Easy shine control on a budget", "Blue Heaven Oil Control Compact Powder", "amazon-beauty-compact-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Fit Me 12H Oil Control Compact", "Reliable everyday matte touch-up", "Maybelline Fit Me 12H Oil Control Compact", "amazon-beauty-compact-mid"),
          pick("Luxe Splurge", "MAC", "MAC Studio Fix Powder Plus Foundation", "Buildable powder-foundation finish", "MAC Studio Fix Powder Plus Foundation", "amazon-beauty-compact-luxe"),
        ],
      },
      {
        id: "translucent-setting-powder",
        title: "Translucent Setting Powder",
        oneLineFact: "Locks concealer and base in place to reduce creasing and shine during flash photos or humid evenings.",
        occasionTag: "Wedding & Party Glam",
        tiers: [
          pick("Everyday Value", "Insight", "Insight HD Banana Loose Setting Powder", "Budget baking and brightening", "Insight HD Banana Loose Setting Powder", "amazon-beauty-loosepowder-everyday"),
          pick("Mid-Range Cult", "Kay Beauty", "Kay Beauty HD Loose Setting Powder", "Smooth HD set for events", "Kay Beauty HD Loose Setting Powder", "amazon-beauty-loosepowder-mid"),
          pick("Luxe Splurge", "Huda Beauty", "Huda Beauty Easy Bake Loose Baking Powder", "Long-wear bake for glam looks", "Huda Beauty Easy Bake Loose Baking Powder", "amazon-beauty-loosepowder-luxe"),
        ],
      },
    ],
  },
  {
    id: "sculpt-flush-glow",
    step: "3",
    title: "Sculpt & Flush",
    description: "Bring back dimension, warmth, and glow after base makeup for a balanced, lifted look.",
    image: "/collections/amazon-beauty-toolkit/stage-sculpt.webp",
    imageAlt: "Blush, bronzer, contour, and highlighter makeup palette flatlay",
    categories: [
      {
        id: "contour-bronzer",
        title: "Contour / Bronzer",
        oneLineFact: "Adds soft shadows and warmth to define cheekbones and jawline—great for portraits and evening events after base makeup.",
        occasionTag: "Wedding & Party Glam",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Cream & Powder Contour Palette", "Beginner-friendly sculpting duo", "Swiss Beauty Cream and Powder Contour Palette", "amazon-beauty-contour-everyday"),
          pick("Mid-Range Cult", "Sugar", "Sugar Contour De Force Mini Bronzer", "Compact bronzer for quick definition", "Sugar Contour De Force Mini Bronzer", "amazon-beauty-contour-mid"),
          pick("Luxe Splurge", "Benefit", "Benefit Hoola Matte Bronzer", "Iconic soft-matte bronze sculpt", "Benefit Hoola Matte Bronzer", "amazon-beauty-contour-luxe"),
        ],
      },
      {
        id: "blush",
        title: "Blush (Liquid & Powder)",
        oneLineFact: "Adds healthy warmth to cheeks—creams melt into skin for quick everyday looks, while powders hold up well for festive nights.",
        occasionTag: "5-Min Everyday",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Crème Blusher (Soft Rose / Peach)", "Easy cream flush for beginners", "Insight Creme Blusher Soft Rose Peach", "amazon-beauty-blush-everyday"),
          pick("Mid-Range Cult", "Kay Beauty", "Kay Beauty Matte / Crème Blush", "Buildable everyday-to-glam color", "Kay Beauty Matte Creme Blush", "amazon-beauty-blush-mid"),
          pick("Luxe Splurge", "Rare Beauty", "Rare Beauty Soft Pinch Liquid Blush", "High-impact long-wear glow flush", "Rare Beauty Soft Pinch Liquid Blush", "amazon-beauty-blush-luxe"),
        ],
      },
      {
        id: "highlighter",
        title: "Highlighter",
        oneLineFact: "Catches light on cheekbones and brow bones for an instant festive lift at parties, sangeets, and dinner dates.",
        occasionTag: "Wedding & Party Glam",
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
    step: "4",
    title: "Eyes & Brows",
    description: "Frame the eyes and brows for definition that works for quick routines or full glam.",
    image: "/collections/amazon-beauty-toolkit/stage-eyes-lips.webp",
    imageAlt: "Eyeshadow palette, mascara, eyeliner, and lip products on a warm vanity setup",
    categories: [
      {
        id: "eyebrow-pencil-definer",
        title: "Eyebrow Pencil / Definer",
        oneLineFact: "Fills sparse brow gaps and frames the face quickly—even on days when you skip eyeshadow and heavy base makeup.",
        occasionTag: "5-Min Everyday",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Eyebrow Pencil with Spoolie", "Quick daily brow shaping", "Swiss Beauty Eyebrow Pencil with Spoolie", "amazon-beauty-brow-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Define & Blend Brow Pencil", "Natural define-and-blend finish", "Maybelline Define and Blend Brow Pencil", "amazon-beauty-brow-mid"),
          pick("Luxe Splurge", "Benefit", "Benefit Precisely, My Brow Pencil", "Hair-like precision strokes", "Benefit Precisely My Brow Pencil", "amazon-beauty-brow-luxe"),
        ],
      },
      {
        id: "eyeshadow-palette",
        title: "Eyeshadow Palette (Nudes + Shimmers)",
        oneLineFact: "Combines matte transition shades for everyday definition with shimmer tones for easy one-swipe wedding or party glam.",
        occasionTag: "Wedding & Party Glam",
        tiers: [
          pick("Everyday Value", "MARS", "MARS Fantasy 15-Shade Eyeshadow Palette", "Versatile budget nude-shimmer mix", "MARS Fantasy 15 Shade Eyeshadow Palette", "amazon-beauty-eyeshadow-everyday"),
          pick("Mid-Range Cult", "Makeup Revolution", "Makeup Revolution Reloaded Velvet Rose Palette", "Romantic everyday-to-evening tones", "Makeup Revolution Reloaded Velvet Rose Palette", "amazon-beauty-eyeshadow-mid"),
          pick("Luxe Splurge", "Huda Beauty", "Huda Beauty Nude Obsessions Eyeshadow Palette", "Compact luxe texture and pigment", "Huda Beauty Nude Obsessions Eyeshadow Palette", "amazon-beauty-eyeshadow-luxe"),
        ],
      },
      {
        id: "waterproof-eyeliner-kajal",
        title: "Waterproof Eyeliner & Kajal",
        oneLineFact: "Defines the lash line—smudge-resistant kajal suits everyday ethnic looks, while winged liner elevates evening party makeup.",
        occasionTag: "Humidity-Proof",
        tiers: [
          pick("Everyday Value", "Lakmé", "Lakmé Eyeconic Kajal", "Everyday smudge-resistant staple", "Lakme Eyeconic Kajal", "amazon-beauty-liner-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Colossal Bold Liner & Kajal", "Bold definition for day-to-night", "Maybelline Colossal Bold Liner and Kajal", "amazon-beauty-liner-mid"),
          pick("Luxe Splurge", "Kay Beauty", "Kay Beauty Quick Dry Liquid Eyeliner", "Precise quick-dry winged liner", "Kay Beauty Quick Dry Liquid Eyeliner", "amazon-beauty-liner-luxe"),
        ],
      },
      {
        id: "volumizing-mascara",
        title: "Volumizing & Lengthening Mascara",
        oneLineFact: "Lifts and separates lashes so eyes look more awake in seconds—perfect for no-makeup calls and morning lectures.",
        occasionTag: "5-Min Everyday",
        tiers: [
          pick("Everyday Value", "MARS", "MARS Fabulash Volumizing Mascara", "Quick volume on a budget", "MARS Fabulash Volumizing Mascara", "amazon-beauty-mascara-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Lash Sensational Sky High Mascara", "Length and lift cult favorite", "Maybelline Lash Sensational Sky High Mascara", "amazon-beauty-mascara-mid"),
          pick("Luxe Splurge", "L'Oréal", "L'Oréal Paris Lash Paradise Mascara", "Full, plush lash drama", "L'Oreal Paris Lash Paradise Mascara", "amazon-beauty-mascara-luxe"),
        ],
      },
    ],
  },
  {
    id: "lips",
    step: "5",
    title: "Lips",
    description: "Shape, color, and finish lips to match everything from desk days to wedding nights.",
    image: "/collections/amazon-beauty-toolkit/stage-eyes-lips.webp",
    imageAlt: "Lipsticks, lip liner, and lip gloss arranged for a makeup look",
    categories: [
      {
        id: "lip-liner",
        title: "Lip Liner",
        oneLineFact: "Defines lip edges to reduce feathering and helps lipstick look cleaner and fuller for dinners and weddings.",
        occasionTag: "Wedding & Party Glam",
        tiers: [
          pick("Everyday Value", "Swiss Beauty", "Swiss Beauty Bold Matt Lip Liner Set", "Affordable shaping and base color", "Swiss Beauty Bold Matt Lip Liner Set", "amazon-beauty-lipliner-everyday"),
          pick("Mid-Range Cult", "Kay Beauty", "Kay Beauty Matte Action Lip Liner", "Smooth everyday-to-glam lining", "Kay Beauty Matte Action Lip Liner", "amazon-beauty-lipliner-mid"),
          pick("Luxe Splurge", "MAC", "MAC Lip Pencil (Spice / Whirl / Soar)", "Iconic precise lip definition", "MAC Lip Pencil Spice Whirl Soar", "amazon-beauty-lipliner-luxe"),
        ],
      },
      {
        id: "bullet-liquid-lipstick",
        title: "Bullet & Liquid Lipstick",
        oneLineFact: "Delivers rich color—choose comfortable bullets for daily wear and transfer-resistant liquids for long events and meals.",
        occasionTag: "5-Min Everyday",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Non-Transfer Matte Liquid Lipstick", "Budget long-wear matte color", "Insight Non Transfer Matte Liquid Lipstick", "amazon-beauty-lipstick-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline SuperStay Vinyl Ink / Matte Ink", "Long-lasting day-to-night payoff", "Maybelline SuperStay Vinyl Ink Matte Ink Lipstick", "amazon-beauty-lipstick-mid"),
          pick("Luxe Splurge", "MAC", "MAC MACximal Silky Matte Lipstick", "Classic luxe matte bullet finish", "MAC MACximal Silky Matte Lipstick", "amazon-beauty-lipstick-luxe"),
        ],
      },
      {
        id: "lip-gloss-oil",
        title: "Hydrating Lip Gloss & Lip Oil",
        oneLineFact: "Adds shine and comfort to dry lips—wear alone for effortless outings or layer over matte lipstick for a night-out finish.",
        occasionTag: "5-Min Everyday",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Plumping Lip Gloss", "Glossy shine on a budget", "Insight Plumping Lip Gloss", "amazon-beauty-lipgloss-everyday"),
          pick("Mid-Range Cult", "Maybelline", "Maybelline Lifter Gloss with Hyaluronic Acid", "Cushiony hydrating shine", "Maybelline Lifter Gloss Hyaluronic Acid", "amazon-beauty-lipgloss-mid"),
          pick("Luxe Splurge", "Clinique", "Clinique Pop Plush Creamy Lip Gloss", "Comfortable plush luxe gloss", "Clinique Pop Plush Creamy Lip Gloss", "amazon-beauty-lipgloss-luxe"),
        ],
      },
    ],
  },
  {
    id: "lock-tools",
    step: "6",
    title: "Lock & Tools",
    description: "Set your look, apply products smoothly, and remove everything gently at the end of the day.",
    image: "/collections/amazon-beauty-toolkit/stage-tools.webp",
    imageAlt: "Makeup brushes, beauty sponge, setting spray, and cleansing products on a vanity",
    categories: [
      {
        id: "makeup-fixer-setting-spray",
        title: "Makeup Fixer / Setting Spray",
        oneLineFact: "Melts powder layers together and helps makeup hold up against sweat, humidity, and long wear.",
        occasionTag: "Humidity-Proof",
        tiers: [
          pick("Everyday Value", "Insight", "Insight Makeup Fixer Spray", "Budget-friendly makeup lock-in", "Insight Makeup Fixer Spray", "amazon-beauty-fixer-everyday"),
          pick("Mid-Range Cult", "Swiss Beauty", "Swiss Beauty Natural Makeup Fixer (Aloe & Vit E)", "Refreshing everyday setting mist", "Swiss Beauty Natural Makeup Fixer Aloe Vitamin E", "amazon-beauty-fixer-mid"),
          pick("Luxe Splurge", "MAC", "MAC Prep + Prime Fix+", "Hydrating prep-and-set icon", "MAC Prep and Prime Fix Plus", "amazon-beauty-fixer-luxe"),
        ],
      },
      {
        id: "beauty-blender-brush-kit",
        title: "Beauty Blender & Brush Kit",
        oneLineFact: "Sponges and brushes blend base and powders seamlessly, helping makeup look smoother and more polished with less effort.",
        occasionTag: "5-Min Everyday",
        tiers: [
          pick("Everyday Value", "MARS", "MARS Artist's Arsenal 6-Piece Brush & Sponge Set", "Starter toolkit for daily basics", "MARS Artist's Arsenal 6 Piece Brush and Sponge Set", "amazon-beauty-tools-everyday"),
          pick("Mid-Range Cult", "PAC", "PAC Cosmetics Studio Brush & Sponge Set", "Reliable mid-range application kit", "PAC Cosmetics Studio Brush and Sponge Set", "amazon-beauty-tools-mid"),
          pick("Luxe Splurge", "Real Techniques", "Real Techniques Everyday Essentials Brush + Sponge Kit", "Soft, easy-to-use pro-favorite tools", "Real Techniques Everyday Essentials Brush and Sponge Kit", "amazon-beauty-tools-luxe"),
        ],
      },
      {
        id: "micellar-cleansing-water",
        title: "Micellar Cleansing Water",
        oneLineFact: "Gently dissolves makeup and daily grime without harsh rubbing, making end-of-day removal easier on skin and lashes.",
        occasionTag: "5-Min Everyday",
        tiers: [
          pick("Everyday Value", "Garnier", "Garnier Micellar Cleansing Water (Pink Cap)", "Gentle everyday makeup removal", "Garnier Micellar Cleansing Water Pink Cap", "amazon-beauty-remover-everyday"),
          pick("Mid-Range Cult", "Bioderma", "Bioderma Sensibio H2O Micellar Water", "Sensitive-skin cult cleanser", "Bioderma Sensibio H2O Micellar Water", "amazon-beauty-remover-mid"),
          pick("Luxe Splurge", "Clinique", "Clinique Take The Day Off Cleansing Balm", "Luxurious melt-away makeup remover", "Clinique Take The Day Off Cleansing Balm", "amazon-beauty-remover-luxe"),
        ],
      },
    ],
  },
];

export const BEAUTY_FAQS = [
  {
    question: "What’s the difference between primer and strobe cream?",
    answer:
      "Primer is mainly for smoothing, grip, and longer wear (for example, blurring pores or controlling shine). Strobe cream is for glow—it adds a soft, luminous sheen. You can use strobe cream under or mixed with base for radiance, and primer where you need makeup to hold better.",
  },
  {
    question: "Loose powder vs compact powder: which one should I choose?",
    answer:
      "Loose setting powder is great for locking concealer, baking, and reducing creasing for longer wear or events. Compact powder is more convenient for on-the-go touch-ups and quick shine control. Many people use loose powder at home and keep a compact in their bag.",
  },
  {
    question: "How do I choose makeup finishes for Indian humidity?",
    answer:
      "Look for lightweight, grip-focused prep (like a good primer), thin layers, and setting products (powder and/or setting spray) in areas that get oily. Smudge-resistant eye products and comfortable long-wear lip formulas can also help, but always prioritize what feels comfortable on your skin.",
  },
];
