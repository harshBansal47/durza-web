export type CollectionCategory =
  | "Work & Tech"
  | "Beauty & Grooming"
  | "Fitness & Nutrition"
  | "Fashion & Accessories"
  | "Gifting & Lifestyle"
  | "Home & Appliances";

export interface CollectionPick {
  name: string;
  storeBadge: string;
  tier: "Essential First Buy" | "Sweet-Spot Upgrade" | "Optional Add-On" | "Performance Fix" | "Old-Laptop Revival" | "Long-Term Comfort" | "Daily Non-Negotiable" | "Oil & Mark Control" | "Weekly Scalp Reset" | "Midday Refresh" | "Ammonia-Free Color" | "Foundation Gear" | "Compact Strength" | "Zero-Roll Movement" | "Clean Recovery" | "Strength Booster" | "Hostess & Housewarming" | "Bridal & Festive Icon" | "Anniversary & Birthday" | "Luxury Gift for Him" | "Milestone Fashion Gift" | "Primary Coding Machine" | "Eye-Comfort Screen" | "50-Hour Study Battery" | "Pocket Commute Audio" | "Skill & Placement Edge" | "Instant Authority" | "All-Day Comfort" | "Signature Carry" | "Pain-Free Footwork" | "Smart-Casual Friday" | "Tarnish-Free Finish" | "High-Rise Essential" | "Bill Saver" | "Space Multiplier" | "Wall-Mounting Independence" | "Weatherproof Seating" | "Heart, Eye & Joint Support" | "Micronutrient Insurance" | "Morning Gut & Immunity" | "Natural Stamina" | "5-Minute Desk Breakfast";
  why: string;
  skipIf?: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
  /** Editor-supplied offer type label (when available). */
  offerType?: string;
}

export interface CollectionEntry {
  slug: string;
  category: CollectionCategory;
  title: string;
  seoTitle: string;
  metaDescription: string;
  heroImage: string;
  summary: string;
  updatedLabel: string;
  itemCountLabel: string;
  kitSummary: string;
  keywords: string[];
  picks: CollectionPick[];
  faqs: { question: string; answer: string }[];
  relatedCollections: string[];
  relatedGuides: { href: string; label: string }[];
  relatedCompares: { href: string; label: string }[];
  relatedStores: { href: string; label: string }[];
}

export const COLLECTION_CATEGORIES: CollectionCategory[] = [
  "Work & Tech",
  "Beauty & Grooming",
  "Fitness & Nutrition",
  "Fashion & Accessories",
  "Gifting & Lifestyle",
  "Home & Appliances",
];

/**
 * Normalise legacy `https://link.amazon/<ASIN>` placeholders into tagged
 * Amazon Associates product links. No new products or prices are invented —
 * only the destination of an existing pick is corrected.
 */
function U(url: string): string {
  const match = /^https?:\/\/link\.amazon\/([A-Za-z0-9]+)\/?$/.exec(url.trim());
  if (!match) return url;
  return `https://www.amazon.in/dp/${match[1]}?tag=durza02-21&ascsubtag=collection_kit`;
}

export const COLLECTIONS: CollectionEntry[] = [
  {
    slug: "amazon-home-office-essentials-collection",
    category: "Work & Tech",
    title: "The No-Nonsense Work-From-Home Desk Kit (2026): Ergonomics, Video Calls & Storage Upgrades",
    seoTitle: "Best Work From Home Desk Setup Essentials in India (2026) | Durza Collections",
    metaDescription:
      "Build a practical Indian WFH desk kit: fix neck strain, grainy calls, and slow laptops with vetted ergonomic, video, and storage upgrades—no hardcoded prices.",
    heroImage:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Five high-impact WFH upgrades for Indian homes—better posture, clearer calls, and a faster laptop without wasting money on gimmicks.",
    updatedLabel: "Updated Nov 2026",
    itemCountLabel: "5 Vetted Picks",
    kitSummary:
      "Built for Indian WFH setups where neck strain, dim-room video calls, and sluggish 8GB laptops are the real problems. Buy the core comfort fix first (laptop stand or chair), then upgrade calls and performance based on what your current setup lacks.",
    keywords: [
      "work from home desk setup India",
      "best laptop stand and webcam India",
      "upgrade slow laptop RAM SSD India",
    ],
    picks: [
      {
        name: "Adjustable Aluminum Laptop Stand",
        storeBadge: "Amazon India",
        tier: "Essential First Buy",
        why: "Raises your laptop screen to eye level to ease neck strain by late afternoon and opens airflow underneath so thin laptops run cooler in Indian summers.",
        skipIf: "You already use an external monitor as your primary screen.",
        ctaLabel: "Check Live Price on Amazon India",
        ctaHref: "/go/amazon-in?src=collection-wfh",
        external: true,
      },
      {
        name: "1080p Full-HD Clip-On Webcam",
        storeBadge: "Amazon India",
        tier: "Sweet-Spot Upgrade",
        why: "A dedicated 1080p glass-lens webcam with dual mics makes you look and sound clearer on client calls than muddy built-in 720p laptop cameras, even in imperfect room lighting.",
        skipIf: "Your laptop already has a sharp webcam and your mic audio is consistently clear.",
        ctaLabel: "Check Live Price on Amazon India",
        ctaHref: "/go/amazon-in?src=collection-wfh",
        external: true,
      },
      {
        name: "Crucial 8GB DDR4 3200MHz Laptop Memory (SODIMM)",
        storeBadge: "Amazon India",
        tier: "Performance Fix",
        why: "If Chrome with many tabs plus Teams freezes your 8GB Windows 11 laptop, adding a matching DDR4 SODIMM can unlock dual-channel memory and smoother multitasking.",
        skipIf: "Open Task Manager → Performance → Memory first: skip if your laptop isn’t DDR4 or has no empty slot.",
        ctaLabel: "Check Live Price on Amazon India",
        ctaHref: U("https://link.amazon/B01jCjHAv"),
        external: true,
      },
      {
        name: "Crucial BX500 500GB 2.5\" SATA SSD",
        storeBadge: "Amazon India",
        tier: "Old-Laptop Revival",
        why: "Swapping a slow hard drive for a SATA SSD can turn an older desktop or compatible laptop into a much faster boot-and-load machine for everyday work.",
        skipIf: "Your system already runs on an NVMe/SATA SSD or doesn’t support a 2.5\" SATA drive bay.",
        ctaLabel: "Check Live Price on Amazon India",
        ctaHref: U("https://link.amazon/B0irTZ1MT"),
        external: true,
      },
      {
        name: "Nilkamal Ergonomic Mesh Office Chair",
        storeBadge: "Nilkamal Furniture",
        tier: "Long-Term Comfort",
        why: "A breathable mesh chair with lumbar support is a practical upgrade over dining chairs for long remote-work days, especially during non-AC afternoons in many Indian homes.",
        skipIf: "You already have a supportive ergonomic chair that fits your desk height.",
        ctaLabel: "Check Live Price on Nilkamal Furniture",
        ctaHref: "/go/nilkamalfurniture?src=collection-wfh",
        external: true,
      },
    ],
    faqs: [
      {
        question: "What should I buy first for a WFH desk setup in India?",
        answer:
          "Start with ergonomics: a laptop stand or a supportive chair. Fixing screen height and posture usually delivers the biggest daily comfort gain before you spend on accessories or upgrades.",
      },
      {
        question: "Will adding RAM or an SSD speed up any laptop?",
        answer:
          "Not always. RAM upgrades help if your system is memory-limited and has a compatible free slot; SSD upgrades help most when replacing a hard drive. Check your laptop’s memory type, slots, and storage interface before ordering.",
      },
      {
        question: "Do I need a separate webcam for work calls?",
        answer:
          "If your built-in camera is grainy or struggles in low light, a 1080p clip-on webcam can improve clarity quickly. If your current camera and microphone already look and sound good, you can skip it.",
      },
    ],
    relatedCollections: ["indian-college-student-and-coder-backpack-essentials", "high-rise-indian-apartment-utility-and-diy-kit"],
    relatedGuides: [
      { href: "/guides/best-acer-laptop-deals-promo-codes", label: "Acer Laptop Deals & Buying Guide" },
      { href: "/guides/lenovo-laptop-offers-india-2026", label: "Lenovo Laptop Offers in India (2026)" },
    ],
    relatedCompares: [
      { href: "/compare/best-laptop-deals-india-amazon-vs-flipkart-2026", label: "Best Laptop Deals: Amazon vs Flipkart (2026)" },
      { href: "/compare/official-brand-store-vs-amazon-flipkart-laptops-india", label: "Official Brand Store vs Amazon & Flipkart for Laptops" },
    ],
    relatedStores: [
      { href: "/stores/amazon-in", label: "Amazon India" },
      { href: "/stores/nilkamalfurniture", label: "Nilkamal Furniture" },
      { href: "/stores/lenovo", label: "Lenovo India" },
    ],
  },
  {
    slug: "indian-monsoon-humidity-skincare-haircare-kit",
    category: "Beauty & Grooming",
    title: "The Indian Humidity & Hard-Water Survival Kit: Non-Greasy SPF, Frizz Control & Scalp Care",
    seoTitle: "Best Skincare & Haircare for Indian Humidity and Hard Water (2026) | Durza Collections",
    metaDescription:
      "A lightweight 5-step routine for humid Indian weather and hard water: non-greasy SPF, oil-control actives, scalp reset, soothing mist, and gentle hair colour options.",
    heroImage:
      "/guides/indian-monsoon-humidity-skincare-haircare-kit.webp",
    summary:
      "A 5-piece routine built for 80% humidity and hard-water buildup—light textures, scalp clarity, and practical actives without heavy, melting layers.",
    updatedLabel: "Updated Nov 2026",
    itemCountLabel: "5 Vetted Picks",
    kitSummary:
      "Designed for Indian humidity and high-TDS water where heavy creams feel greasy and mineral buildup can leave hair flat. Start with daily SPF and a gentle scalp reset, then add actives or colour only as your skin and hair tolerate them.",
    keywords: [
      "best skincare for humid weather India",
      "hard water hair fall shampoo India",
      "no white cast gel sunscreen India",
    ],
    picks: [
      {
        name: "Dot & Key Watermelon Hyaluronic Cooling Sunscreen SPF 50+",
        storeBadge: "Dot & Key (Official Store)",
        tier: "Daily Non-Negotiable",
        why: "A water-light gel texture that absorbs quickly and is designed to feel comfortable in humid commutes, helping daily SPF use feel less sticky.",
        skipIf: "You already use a broad-spectrum sunscreen you’ll apply consistently every morning.",
        ctaLabel: "Check Live Price on Dot & Key",
        ctaHref: "/go/dot-and-key?src=col-humidity",
        external: true,
      },
      {
        name: "Minimalist 10% Niacinamide + Zinc Face Serum",
        storeBadge: "Amazon India",
        tier: "Oil & Mark Control",
        why: "Niacinamide can help balance excess midday oil and support fading the look of post-acne marks without using harsh exfoliating acids.",
        skipIf: "Your skin is irritated or you’re already using multiple new actives—introduce slowly and patch test first.",
        ctaLabel: "Check Live Price on Amazon India",
        ctaHref: "/go/amazon-in?src=col-humidity",
        external: true,
      },
      {
        name: "WOW Skin Science Apple Cider Vinegar Shampoo",
        storeBadge: "Amazon India",
        tier: "Weekly Scalp Reset",
        why: "Works as a clarifying reset for sweat, styling residue, and hard-water buildup when used occasionally alongside a gentler conditioner routine.",
        skipIf: "Your scalp and hair are very dry—clarifying too often can feel stripping.",
        ctaLabel: "Check Live Price on Amazon India",
        ctaHref: "/go/amazon-in?src=col-humidity",
        external: true,
      },
      {
        name: "Kama Ayurveda Pure Kannauj Rosewater Mist",
        storeBadge: "Kama Ayurveda (Official Store)",
        tier: "Midday Refresh",
        why: "A simple, alcohol-free rosewater mist can feel calming and refreshing after heat or AC exposure when you want a light reset without heavy layers.",
        skipIf: "You prefer to keep your routine minimal and don’t enjoy facial mists.",
        ctaLabel: "Check Live Price on Kama Ayurveda",
        ctaHref: "/go/kama-ayurveda?src=col-humidity",
        external: true,
      },
      {
        name: "Indus Valley Damage-Free Gel Hair Colour / Botanical Henna",
        storeBadge: "Indus Valley (Official Store)",
        tier: "Ammonia-Free Color",
        why: "A gentler, ammonia-free colour option for grey coverage; choose the specific formula that matches your sensitivity needs and always follow the brand’s instructions.",
        skipIf: "You need a specific salon-grade shade result or have known sensitivities—patch test and review ingredient details before use.",
        ctaLabel: "Check Live Price on Indus Valley",
        ctaHref: "/go/indus-valley?src=col-humidity",
        external: true,
      },
    ],
    faqs: [
      {
        question: "What skincare texture works best in Indian humidity?",
        answer:
          "Lightweight, fast-absorbing textures like gel sunscreens and simple serums are often easier to wear consistently in humid weather than heavy creams that can feel greasy.",
      },
      {
        question: "How often should I use a clarifying shampoo for hard water?",
        answer:
          "Many people do well using a clarifying shampoo as a weekly or occasional reset wash, paired with a moisturizing conditioner. Frequency depends on scalp oiliness, buildup, and dryness.",
      },
      {
        question: "Can I start niacinamide and other actives at the same time?",
        answer:
          "It’s safer to introduce one new active at a time and patch test first. Start slowly, especially if your skin barrier is sensitive, and consult a dermatologist for persistent concerns.",
      },
    ],
    relatedCollections: ["daily-longevity-and-desk-worker-wellness-stack"],
    relatedGuides: [
      { href: "/guides/indian-skincare-actives-haircare-guide", label: "Skincare Actives & Sulfate-Free Shampoos Guide" },
      { href: "/guides/dot-and-key-skin-active-guide", label: "Dot & Key Skin Actives Guide" },
    ],
    relatedCompares: [
      { href: "/compare/kama-ayurveda-vs-forest-essentials-vs-indus-valley", label: "Kama Ayurveda vs Forest Essentials vs Indus Valley" },
    ],
    relatedStores: [
      { href: "/stores/dot-and-key", label: "Dot & Key" },
      { href: "/stores/kama-ayurveda", label: "Kama Ayurveda" },
      { href: "/stores/indus-valley", label: "Indus Valley" },
      { href: "/stores/amazon-in", label: "Amazon India" },
    ],
  },
  {
    slug: "beginner-home-gym-and-clean-nutrition-starter-kit",
    category: "Fitness & Nutrition",
    title: "The Apartment Home-Gym & Clean Protein Starter Kit: Zero-Clutter Gear & Lab-Tested Nutrition",
    seoTitle: "Apartment Home Gym & Clean Nutrition Starter Kit in India (2026) | Durza Collections",
    metaDescription:
      "A compact 5-piece home workout and nutrition starter kit for Indian apartments: space-saving gear, comfortable activewear, and batch-verified supplements.",
    heroImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Space-saving workout essentials and practical nutrition picks that fit a small Indian apartment—focused on consistency, comfort, and verified products.",
    updatedLabel: "Updated Nov 2026",
    itemCountLabel: "5 Vetted Picks",
    kitSummary:
      "Built for apartment training where space is limited and supplement trust matters. Start with a mat and resistance setup you’ll actually use, add comfortable movement wear, then choose nutrition only if it fits your goals and diet.",
    keywords: [
      "home workout equipment kit India",
      "lab tested whey protein India",
      "best yoga mat and resistance bands India",
    ],
    picks: [
      {
        name: "Boldfit 6mm TPE Anti-Slip Yoga & Exercise Mat",
        storeBadge: "Boldfit (Official Store)",
        tier: "Foundation Gear",
        why: "A firm, easy-to-roll mat gives stable footing for bodyweight workouts, stretching, and floor exercises in tight living-room spaces.",
        skipIf: "You already have a non-slip mat with enough cushioning for your joints and flooring.",
        ctaLabel: "Check Live Price on Boldfit",
        ctaHref: "/go/boldfit?src=col-gym",
        external: true,
      },
      {
        name: "Boldfit Heavy-Duty Resistance Band Tube Set",
        storeBadge: "Boldfit (Official Store)",
        tier: "Compact Strength",
        why: "Stackable tube resistance lets you train push, pull, and accessory movements at home without bulky machines or fixed racks.",
        skipIf: "You prefer free weights and already have adjustable dumbbells or access to a gym.",
        ctaLabel: "Check Live Price on Boldfit",
        ctaHref: "/go/boldfit?src=col-gym",
        external: true,
      },
      {
        name: "BlissClub Ultimate 4-Pocket Leggings",
        storeBadge: "BlissClub (Official Store)",
        tier: "Zero-Roll Movement",
        why: "Comfortable, secure-fit activewear with practical pockets can make daily movement easier to stick with, especially for home workouts and walks.",
        skipIf: "You already own comfortable workout bottoms that stay put during movement.",
        ctaLabel: "Check Live Price on BlissClub",
        ctaHref: "/go/bliss-club?src=col-gym",
        external: true,
      },
      {
        name: "BeastLife Lab-Tested Super Whey Protein",
        storeBadge: "BeastLife (Official Store)",
        tier: "Clean Recovery",
        why: "A direct-from-brand whey option that emphasizes batch-level testing can be a practical way to support protein intake when your diet falls short.",
        skipIf: "You meet your protein needs through food or have dietary/medical reasons to avoid whey—check labels and consult a professional if needed.",
        ctaLabel: "Check Live Price on BeastLife",
        ctaHref: "/go/beast-life?src=col-gym",
        external: true,
      },
      {
        name: "MuscleBlaze CreAMP Micronized Creatine (Starter Pouch)",
        storeBadge: "Amazon India",
        tier: "Strength Booster",
        why: "Creatine monohydrate is a well-studied supplement for strength training progress; a starter pouch is a simple way to assess tolerance and routine fit.",
        skipIf: "You don’t do resistance training or have a medical condition—check suitability with a healthcare professional.",
        ctaLabel: "Check Live Price on Amazon India",
        ctaHref: U("https://link.amazon/B0iU3vLmN"),
        external: true,
      },
    ],
    faqs: [
      {
        question: "Do I need supplements to start a home gym routine?",
        answer:
          "No. Consistent training, sleep, and adequate daily protein from food matter most. Supplements are optional add-ons if they fit your goals, budget, and health needs.",
      },
      {
        question: "Are resistance bands enough for beginners?",
        answer:
          "Yes, bands can support full-body strength training at home when used progressively. They’re especially useful in apartments where space and noise are constraints.",
      },
      {
        question: "How should I choose protein or creatine products in India?",
        answer:
          "Prefer reputable brands, clear ingredient labels, and batch/testing transparency where available. Check serving sizes, allergens, and consult a professional if you have medical conditions.",
      },
    ],
    relatedCollections: ["daily-longevity-and-desk-worker-wellness-stack"],
    relatedGuides: [],
    relatedCompares: [
      { href: "/compare/kapiva-vs-hkvitals-vs-healthkart-supplements-india", label: "Kapiva vs HK Vitals vs HealthKart Supplements" },
    ],
    relatedStores: [
      { href: "/stores/boldfit", label: "Boldfit" },
      { href: "/stores/blissclub", label: "BlissClub" },
      { href: "/stores/beast-life", label: "BeastLife" },
      { href: "/stores/amazon-in", label: "Amazon India" },
    ],
  },
  {
    slug: "wedding-and-festive-luxury-gifting-edit-india",
    category: "Gifting & Lifestyle",
    title: "Effortless Luxury Gifting for Indian Weddings, Anniversaries & Festive Hosting",
    seoTitle: "Luxury Wedding, Anniversary & Festive Gift Ideas in India (2026) | Durza Collections",
    metaDescription:
      "Curated luxury gift ideas for Indian weddings, anniversaries, and festive hosting—presentation-ready picks across fragrance, skincare, jewelry, grooming, and accessories.",
    heroImage:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Presentation-ready gifts people actually keep and use—from hostess candles to keepsake skincare, jewelry, grooming hampers, and signature accessories.",
    updatedLabel: "Updated Nov 2026",
    itemCountLabel: "5 Vetted Picks",
    kitSummary:
      "Curated for Indian weddings, anniversaries, Rakhi, and festive hosting where packaging and usefulness both matter. Pick one hero gift first based on the recipient’s taste, then add a smaller complement only if it fits the occasion and budget tier.",
    keywords: [
      "luxury gift hampers India",
      "wedding return gifts and hostess gifts India",
      "best perfume and skincare gift sets India",
    ],
    picks: [
      {
        name: "Bath & Body Works Signature 3-Wick Candle & Spa Trio",
        storeBadge: "Bath & Body Works (Official Store)",
        tier: "Hostess & Housewarming",
        why: "Fragrance-led home and body sets feel instantly giftable and are easy to use, making them a reliable choice for hosts and housewarmings.",
        skipIf: "The recipient is sensitive to fragrances or prefers unscented home products.",
        ctaLabel: "Check Live Price on Bath & Body Works",
        ctaHref: "/go/bath-body-works?src=col-gifting",
        external: true,
      },
      {
        name: "Kama Ayurveda Gold-Embossed Kumkumadi Gift Box",
        storeBadge: "Kama Ayurveda (Official Store)",
        tier: "Bridal & Festive Icon",
        why: "A classic Ayurvedic skincare gift box with premium presentation works well for bridal, festive, and family gifting when you want something thoughtful and traditional.",
        skipIf: "The recipient prefers clinical/minimal skincare or has known ingredient sensitivities—check product details.",
        ctaLabel: "Check Live Price on Kama Ayurveda",
        ctaHref: "/go/kama-ayurveda?src=col-gifting",
        external: true,
      },
      {
        name: "Palmonas 18K Waterproof Gold-Vermeil Jewelry Set",
        storeBadge: "Palmonas (Official Store)",
        tier: "Anniversary & Birthday",
        why: "Everyday-wear jewelry in gift-ready packaging is a versatile milestone gift that balances style with practicality for regular use.",
        skipIf: "You’re unsure of the recipient’s metal/finish preference—choose simpler designs or confirm taste first.",
        ctaLabel: "Check Live Price on Palmonas",
        ctaHref: "/go/palmonas?src=col-gifting",
        external: true,
      },
      {
        name: "The Man Company Signature EDP & Grooming Hamper",
        storeBadge: "The Man Company (Official Store)",
        tier: "Luxury Gift for Him",
        why: "A fragrance-and-grooming hamper offers a complete, ready-to-gift experience that suits birthdays, anniversaries, and festive occasions.",
        skipIf: "The recipient is particular about fragrance notes or grooming products—check variants and preferences.",
        ctaLabel: "Check Live Price on The Man Company",
        ctaHref: "/go/the-man-company?src=col-gifting",
        external: true,
      },
      {
        name: "Charles & Keith Sculpted Saddle Bag or Cardholder",
        storeBadge: "Charles & Keith (Official Store)",
        tier: "Milestone Fashion Gift",
        why: "A structured accessory from an official boutique makes a polished milestone gift with strong everyday utility and premium presentation.",
        skipIf: "You’re unsure about size/color preferences—small leather goods like cardholders are safer picks.",
        ctaLabel: "Check Live Price on Charles & Keith",
        ctaHref: "/go/charles-keith?src=col-gifting",
        external: true,
      },
    ],
    faqs: [
      {
        question: "What makes a good luxury gift for Indian weddings or festive hosting?",
        answer:
          "Presentation-ready gifts that are useful beyond the occasion—like fragrance sets, keepsake skincare boxes, jewelry, grooming hampers, or classic accessories—tend to feel more thoughtful.",
      },
      {
        question: "How do I choose a safe gift when I don’t know the recipient’s exact taste?",
        answer:
          "Pick versatile options (neutral accessories, cardholders, or popular home fragrance sets) and avoid highly personal shades or strong fragrance assumptions unless you know their preferences.",
      },
      {
        question: "Should I buy gift sets from official brand stores?",
        answer:
          "Official stores are often a good choice for authentic products, current gift packaging, and clear return/support policies—always verify delivery timelines for occasion dates.",
      },
    ],
    relatedCollections: ["boardroom-to-dinner-capsule-wardrobe-india"],
    relatedGuides: [],
    relatedCompares: [
      { href: "/compare/myntra-vs-ajio-vs-brand-stores-fashion-india", label: "Myntra vs Ajio vs Brand Stores for Fashion" },
      { href: "/compare/kama-ayurveda-vs-forest-essentials-vs-indus-valley", label: "Kama Ayurveda vs Forest Essentials vs Indus Valley" },
    ],
    relatedStores: [
      { href: "/stores/bath-and-body-works", label: "Bath & Body Works" },
      { href: "/stores/kama-ayurveda", label: "Kama Ayurveda" },
      { href: "/stores/palmonas", label: "Palmonas" },
      { href: "/stores/the-man-company", label: "The Man Company" },
      { href: "/stores/charles-keith", label: "Charles & Keith" },
      { href: "/stores/victorias-secret", label: "Victoria's Secret" },
    ],
  },
  {
    slug: "indian-college-student-and-coder-backpack-essentials",
    category: "Work & Tech",
    title: "The College & First-Job Tech Backpack: Coding Laptops, ANC Audio & Smart Perks",
    seoTitle: "Best College & Coder Backpack Tech Essentials in India (2026) | Durza Collections",
    metaDescription:
      "A practical student and junior-developer tech kit for India: student-priced laptops, long-battery audio, pocket TWS, and skill-building picks for classes and placements.",
    heroImage:
      "/guides/indian-college-student-and-coder-backpack-essentials.webp",
    summary:
      "A durable, carry-friendly tech stack for lectures, hostel Wi-Fi, coding, and placements—prioritizing battery life, comfort, and smart student perks.",
    updatedLabel: "Updated Nov 2026",
    itemCountLabel: "5 Vetted Picks",
    kitSummary:
      "Built for B.Tech/BBA students and junior developers juggling classes, coding, and commutes. Prioritize a reliable laptop first, add long-battery audio for focus, then layer in portable earbuds and skill-building only if they fit your routine.",
    keywords: [
      "best student laptop deals India 2026",
      "coding laptop under 60000 India",
      "best headphones for college students India",
    ],
    picks: [
      {
        name: "Lenovo IdeaPad Slim 5 / LOQ (SheerID Student Store)",
        storeBadge: "Lenovo India (Official Store)",
        tier: "Primary Coding Machine",
        why: "Buying through Lenovo’s official student flow can unlock education pricing on configurable laptops suited for coding, projects, and everyday campus work.",
        skipIf: "You already have a capable laptop with enough RAM/SSD for your coursework and tools.",
        ctaLabel: "Check Live Price on Lenovo India",
        ctaHref: "/go/lenovo-india?src=col-student",
        external: true,
      },
      {
        name: "ASUS Vivobook S / OLED Series",
        storeBadge: "ASUS (Official Store)",
        tier: "Eye-Comfort Screen",
        why: "OLED Vivobook options can offer sharp visuals and comfortable viewing for long coding, reading, and documentation sessions when configured well.",
        skipIf: "You prioritize battery longevity over display vibrancy or already have a good external monitor setup.",
        ctaLabel: "Check Live Price on ASUS",
        ctaHref: "/go/asus?src=col-student",
        external: true,
      },
      {
        name: "Sony WH-CH520 Wireless Multipoint Headphones",
        storeBadge: "Amazon India",
        tier: "50-Hour Study Battery",
        why: "Lightweight on-ear headphones with long battery life and multipoint convenience are practical for lectures, study sessions, and switching between devices.",
        skipIf: "You need strong active noise cancellation or prefer in-ear earbuds for all-day use.",
        ctaLabel: "Check Live Price on Amazon India",
        ctaHref: U("https://link.amazon/B0fLYREmW"),
        external: true,
      },
      {
        name: "Boult Quad-Mic ENC & Low-Latency TWS Earbuds",
        storeBadge: "Boult (Official Store)",
        tier: "Pocket Commute Audio",
        why: "Compact TWS earbuds are handy for commutes and quick calls, with ENC and low-latency modes useful for noisy campuses and casual gaming breaks.",
        skipIf: "You already own reliable earbuds with clear mic quality and comfortable fit.",
        ctaLabel: "Check Live Price on Boult",
        ctaHref: "/go/boult?src=col-student",
        external: true,
      },
      {
        name: "GUVI Vernacular & Full-Stack Placement Tracks",
        storeBadge: "GUVI (Official Store)",
        tier: "Skill & Placement Edge",
        why: "Structured coding tracks and practice can complement college learning, especially if you prefer vernacular explanations and guided placement-focused paths.",
        skipIf: "You already follow a consistent learning roadmap that’s working for your goals.",
        ctaLabel: "Check Live Price on GUVI",
        ctaHref: "/go/guvi?src=col-student",
        external: true,
      },
    ],
    faqs: [
      {
        question: "What specs matter most for a student coding laptop in India?",
        answer:
          "Prioritize enough RAM and fast SSD storage for multitasking and dev tools, a comfortable keyboard/screen for long sessions, and reliable battery/thermals for campus use. Choose based on your coursework and budget.",
      },
      {
        question: "Is it better to buy laptops from official brand stores or marketplaces?",
        answer:
          "Official stores can offer student pricing, custom configurations, and clearer warranty/support options, while marketplaces may have different bank offers. Compare final payable value and service terms before buying.",
      },
      {
        question: "Do I need both headphones and TWS earbuds?",
        answer:
          "Not necessarily. Headphones are great for long study sessions and battery life, while TWS earbuds are more portable for commutes. Pick the one you’ll use most and add the other later if needed.",
      },
    ],
    relatedCollections: ["amazon-home-office-essentials-collection"],
    relatedGuides: [
      { href: "/guides/lenovo-laptop-offers-india-2026", label: "Lenovo Laptop Offers in India (2026)" },
      { href: "/guides/best-acer-laptop-deals-promo-codes", label: "Acer Laptop Deals & Buying Guide" },
    ],
    relatedCompares: [
      { href: "/compare/official-brand-store-vs-amazon-flipkart-laptops-india", label: "Official Brand Store vs Amazon & Flipkart for Laptops" },
      { href: "/compare/best-laptop-deals-india-amazon-vs-flipkart-2026", label: "Best Laptop Deals: Amazon vs Flipkart (2026)" },
    ],
    relatedStores: [
      { href: "/stores/lenovo", label: "Lenovo India" },
      { href: "/stores/asus", label: "ASUS" },
      { href: "/stores/boult", label: "Boult" },
      { href: "/stores/guvi", label: "GUVI" },
      { href: "/stores/amazon-in", label: "Amazon India" },
    ],
  },
  {
    slug: "boardroom-to-dinner-capsule-wardrobe-india",
    category: "Fashion & Accessories",
    title: "The 6-Piece Boardroom-to-Dinner Capsule Wardrobe: Tailored Layers, Heels & Loafers",
    seoTitle: "Boardroom-to-Dinner Capsule Wardrobe for Indian Professionals (2026) | Durza Collections",
    metaDescription:
      "A versatile 6-piece capsule wardrobe for Indian commutes and office-to-dinner plans: tailored layers, comfort-first footwear, a structured bag, and everyday jewelry.",
    heroImage:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Six mix-and-match pieces for Indian workdays and evenings—breathable tailoring, commute-friendly footwear, and polished accessories that do double duty.",
    updatedLabel: "Updated Nov 2026",
    itemCountLabel: "6 Vetted Picks",
    kitSummary:
      "Designed for Indian metro commutes where outfits need to handle heat, AC offices, and evening plans. Build around one tailored layer and one versatile bottom first, then add comfort-first footwear and a structured bag before finishing accessories.",
    keywords: [
      "workwear capsule wardrobe India",
      "comfortable office heels and loafers India",
      "quiet luxury handbags India",
    ],
    picks: [
      {
        name: "Vero Moda Single-Breasted Structured Blazer",
        storeBadge: "Vero Moda (Official Store)",
        tier: "Instant Authority",
        why: "A lightweight structured blazer can sharpen simple basics for meetings while still working as an easy layer for dinner plans.",
        skipIf: "Your workplace is very casual or you prefer softer layers—choose based on dress code and comfort.",
        ctaLabel: "Check Live Price on Vero Moda",
        ctaHref: "/go/vero-moda?src=col-wardrobe",
        external: true,
      },
      {
        name: "Vero Moda Pleated Wide-Leg Trousers",
        storeBadge: "Vero Moda (Official Store)",
        tier: "All-Day Comfort",
        why: "A fluid, tailored trouser silhouette offers comfort during commutes and pairs easily with both formal footwear and clean sneakers.",
        skipIf: "You prefer fitted cuts or need a specific uniform silhouette for work.",
        ctaLabel: "Check Live Price on Vero Moda",
        ctaHref: "/go/vero-moda?src=col-wardrobe",
        external: true,
      },
      {
        name: "Charles & Keith Gabine / Structured Crossbody Bag",
        storeBadge: "Charles & Keith (Official Store)",
        tier: "Signature Carry",
        why: "A structured crossbody or shoulder bag adds polish and keeps daily essentials organized from office hours to evening plans.",
        skipIf: "You carry a laptop or larger items daily—consider a tote and add a compact bag later.",
        ctaLabel: "Check Live Price on Charles & Keith",
        ctaHref: "/go/charles-keith?src=col-wardrobe",
        external: true,
      },
      {
        name: "ALDO Pillow Walk™ Boardroom Loafers or Slingbacks",
        storeBadge: "ALDO (Official Store)",
        tier: "Pain-Free Footwork",
        why: "Cushioned, office-ready footwear helps you stay comfortable through commutes and meetings without sacrificing a polished look.",
        skipIf: "You already have well-fitting work shoes that stay comfortable for full days.",
        ctaLabel: "Check Live Price on ALDO",
        ctaHref: "/go/aldo-new?src=col-wardrobe",
        external: true,
      },
      {
        name: "Adidas Samba / Stan Smith Clean Court Classics",
        storeBadge: "Adidas (Official Store)",
        tier: "Smart-Casual Friday",
        why: "Clean court sneakers pair well with tailored trousers and casual outfits, making them a versatile option for smart-casual days and weekends.",
        skipIf: "Your office requires formal footwear every day or you need sport-specific shoes.",
        ctaLabel: "Check Live Price on Adidas",
        ctaHref: "/go/adidas?src=col-wardrobe",
        external: true,
      },
      {
        name: "Palmonas Daily-Wear 18K Gold Hoops & Delicate Chain",
        storeBadge: "Palmonas (Official Store)",
        tier: "Tarnish-Free Finish",
        why: "Simple, everyday jewelry adds a refined finish to work and dinner outfits without needing frequent swaps.",
        skipIf: "You prefer statement jewelry or have specific metal sensitivities—check product details.",
        ctaLabel: "Check Live Price on Palmonas",
        ctaHref: "/go/palmonas?src=col-wardrobe",
        external: true,
      },
    ],
    faqs: [
      {
        question: "How many pieces do I need for a practical office capsule wardrobe?",
        answer:
          "A small set of mix-and-match basics—tailored layers, versatile bottoms, comfortable work shoes, and a structured bag—can cover most weekdays and evening plans without overbuying.",
      },
      {
        question: "What footwear works best for Indian office commutes?",
        answer:
          "Comfort-first options with good cushioning (like supportive loafers, slingbacks, or clean court sneakers where dress codes allow) help with long commutes and full workdays.",
      },
      {
        question: "How do I keep a capsule wardrobe suitable for both office and dinner?",
        answer:
          "Choose neutral, well-fitted pieces and elevate them with one polished layer, structured accessories, or simple jewelry so the outfit transitions easily after work.",
      },
    ],
    relatedCollections: ["wedding-and-festive-luxury-gifting-edit-india"],
    relatedGuides: [],
    relatedCompares: [
      { href: "/compare/myntra-vs-ajio-vs-brand-stores-fashion-india", label: "Myntra vs Ajio vs Brand Stores for Fashion" },
      { href: "/compare/adidas-vs-nike-vs-asics-running-shoes-india", label: "Adidas vs Nike vs ASICS Running Shoes" },
    ],
    relatedStores: [
      { href: "/stores/vero-moda", label: "Vero Moda" },
      { href: "/stores/charles-keith", label: "Charles & Keith" },
      { href: "/stores/aldo-shoes", label: "ALDO" },
      { href: "/stores/adidas", label: "Adidas" },
      { href: "/stores/palmonas", label: "Palmonas" },
    ],
  },
  {
    slug: "high-rise-indian-apartment-utility-and-diy-kit",
    category: "Home & Appliances",
    title: "The New-Flat & High-Rise Apartment Setup Kit: Water Heaters, Power Tools & Storage",
    seoTitle: "New Flat & High-Rise Apartment Essentials in India (2026) | Durza Collections",
    metaDescription:
      "Practical first-week essentials for Indian flats and high-rises: pressure-rated water heating, efficient fans, space-saving storage, and DIY tools for setup tasks.",
    heroImage:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A practical move-in kit for Indian apartments—pressure-safe utilities, bill-saving fans, space-multiplying furniture, and DIY basics for week-one fixes.",
    updatedLabel: "Updated Nov 2026",
    itemCountLabel: "5 Vetted Picks",
    kitSummary:
      "Made for new flats in Indian high-rises where water pressure, storage space, and basic installation needs show up fast. Sort critical utilities first (geyser/fans), add storage that fits your layout, then pick DIY and balcony basics based on what your flat actually needs.",
    keywords: [
      "new flat essentials checklist India",
      "8 bar pressure geyser for high rise India",
      "home DIY drill kit India",
    ],
    picks: [
      {
        name: "Havells 8-Bar Pressure Storage Water Heater (15L–25L)",
        storeBadge: "Havells (Official Store)",
        tier: "High-Rise Essential",
        why: "A pressure-rated storage geyser is a safer fit for many multi-story buildings, helping handle high inlet pressure when correctly sized and installed.",
        skipIf: "Your building has low pressure or you need an instant heater—confirm capacity, pressure rating, and installation requirements first.",
        ctaLabel: "Check Live Price on Havells",
        ctaHref: "/go/havells?src=col-home",
        external: true,
      },
      {
        name: "Havells BEE 5-Star BLDC Ceiling Fans",
        storeBadge: "Havells (Official Store)",
        tier: "Bill Saver",
        why: "BLDC fans can use significantly less power than older induction fans, making them a practical upgrade for multi-room apartments during long summer use.",
        skipIf: "Your existing fans are efficient and in good condition, or your rental doesn’t allow replacements.",
        ctaLabel: "Check Live Price on Havells",
        ctaHref: "/go/havells?src=col-home",
        external: true,
      },
      {
        name: "Nilkamal Hydraulic Storage Bed & Study Desk",
        storeBadge: "Nilkamal Furniture",
        tier: "Space Multiplier",
        why: "Hydraulic storage beds and compact desks help reclaim floor space in urban bedrooms while keeping daily essentials organized.",
        skipIf: "You already have adequate storage or need custom-sized furniture for a specific layout.",
        ctaLabel: "Check Live Price on Nilkamal Furniture",
        ctaHref: "/go/nilkamalfurniture?src=col-home",
        external: true,
      },
      {
        name: "Moglix Home DIY 13mm Impact Drill & Tool Kit",
        storeBadge: "Moglix (Official Store)",
        tier: "Wall-Mounting Independence",
        why: "A basic impact drill kit with masonry bits and wall plugs makes common move-in tasks—curtains, shelves, hooks—much easier to handle.",
        skipIf: "Your society restricts drilling or you only need one-time installation—consider professional help instead.",
        ctaLabel: "Check Live Price on Moglix",
        ctaHref: "/go/moglix?src=col-home",
        external: true,
      },
      {
        name: "Boldfit / Nilkamal Balcony & Utility Organizers",
        storeBadge: "Official Brand Stores",
        tier: "Weatherproof Seating",
        why: "Durable balcony seating and ventilated utility organizers can make small outdoor/entry spaces more usable in monsoon and summer conditions.",
        skipIf: "You don’t have balcony/utility space or your building provides fixed fittings.",
        ctaLabel: "Check Live Price on Nilkamal Furniture",
        ctaHref: "/go/nilkamalfurniture?src=col-home",
        external: true,
      },
    ],
    faqs: [
      {
        question: "Why does water pressure rating matter for geysers in high-rise apartments?",
        answer:
          "Many high-rise buildings have higher inlet pressure. Choosing a geyser with an appropriate pressure rating (and proper installation) helps reduce risk of damage and improves long-term reliability.",
      },
      {
        question: "Are BLDC ceiling fans worth it for a new flat?",
        answer:
          "They can be, especially if you run fans for long hours in multiple rooms. Check airflow, warranty, and installation compatibility along with energy efficiency.",
      },
      {
        question: "What should I buy first when setting up a new apartment?",
        answer:
          "Prioritize essentials that affect daily comfort and safety—water heating, ventilation/cooling, and basic storage—before adding DIY tools or decor items.",
      },
    ],
    relatedCollections: ["amazon-home-office-essentials-collection"],
    relatedGuides: [],
    relatedCompares: [
      { href: "/compare/havells-vs-ao-smith-vs-crompton-water-heaters-india", label: "Havells vs AO Smith vs Crompton Water Heaters" },
    ],
    relatedStores: [
      { href: "/stores/havells", label: "Havells" },
      { href: "/stores/nilkamalfurniture", label: "Nilkamal Furniture" },
      { href: "/stores/moglix", label: "Moglix" },
      { href: "/stores/amazon-in", label: "Amazon India" },
    ],
  },
  {
    slug: "daily-longevity-and-desk-worker-wellness-stack",
    category: "Fitness & Nutrition",
    title: "The Desk-Worker Daily Wellness Stack: Joint Mobility, Eye/Skin Support & Clean Energy",
    seoTitle: "Daily Wellness Stack for Desk Workers in India (2026) | Durza Collections",
    metaDescription:
      "A simple, sustainable wellness stack for Indian desk workers: omega-3, multivitamins, morning juices, mineral support, and a quick high-protein breakfast option.",
    heroImage:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A simple daily routine for 9+ hour desk days—focused on consistency, verified basics, and practical nutrition rather than complicated supplement stacks.",
    updatedLabel: "Updated Nov 2026",
    itemCountLabel: "5 Vetted Picks",
    kitSummary:
      "Built for desk workers dealing with long screen hours, limited sunlight, and rushed mornings. Keep it simple: cover daily nutrition basics first, add one morning routine habit you can sustain, and avoid stacking too many new supplements at once.",
    keywords: [
      "best multivitamin and omega 3 India",
      "supplements for IT professionals India",
      "daily Ayurvedic immunity routine",
    ],
    picks: [
      {
        name: "HK Vitals Triple-Strength Omega-3 Fish Oil",
        storeBadge: "HK Vitals (Official Store)",
        tier: "Heart, Eye & Joint Support",
        why: "A concentrated omega-3 supplement can be a convenient way to support intake when dietary sources are inconsistent, especially for desk-heavy routines.",
        skipIf: "You already consume enough omega-3-rich foods or have medical conditions/allergies—consult a healthcare professional.",
        ctaLabel: "Check Live Price on HK Vitals",
        ctaHref: "/go/hkvitals?src=col-wellness",
        external: true,
      },
      {
        name: "HK Vitals Gender-Specific Daily Multivitamin (Men / Women / 50+)",
        storeBadge: "HK Vitals (Official Store)",
        tier: "Micronutrient Insurance",
        why: "A daily multivitamin can help cover common micronutrient gaps, but it works best as a supplement to—not a replacement for—a balanced diet.",
        skipIf: "You’re already taking similar supplements or prescribed vitamins—avoid overlap without professional guidance.",
        ctaLabel: "Check Live Price on HK Vitals",
        ctaHref: "/go/hkvitals?src=col-wellness",
        external: true,
      },
      {
        name: "Kapiva Cold-Pressed Thar Aloe Vera & Wild Amla Juice",
        storeBadge: "Kapiva (Official Store)",
        tier: "Morning Gut & Immunity",
        why: "A simple morning juice routine can be an easy habit for hydration and fruit/plant intake, as long as you choose unsweetened options and use it consistently.",
        skipIf: "You have digestive sensitivities or medical conditions—check ingredients and consult a professional if needed.",
        ctaLabel: "Check Live Price on Kapiva",
        ctaHref: "/go/kapiva?src=col-wellness",
        external: true,
      },
      {
        name: "Kapiva NABL-Tested Himalayan Shilajit Resin",
        storeBadge: "Kapiva (Official Store)",
        tier: "Natural Stamina",
        why: "A batch-tested mineral resin option for those exploring traditional wellness supplements; start cautiously and prioritize verified sourcing and label clarity.",
        skipIf: "You’re pregnant, have medical conditions, or take medications—seek medical advice before use.",
        ctaLabel: "Check Live Price on Kapiva",
        ctaHref: "/go/kapiva?src=col-wellness",
        external: true,
      },
      {
        name: "Yoga Bar High-Protein Dark Chocolate Oats",
        storeBadge: "Amazon India",
        tier: "5-Minute Desk Breakfast",
        why: "A quick, high-protein breakfast option can help avoid skipped meals on busy workdays and make it easier to stay consistent with nutrition.",
        skipIf: "You prefer freshly cooked breakfasts or have ingredient/allergen concerns—check the label.",
        ctaLabel: "Check Live Price on Amazon India",
        ctaHref: U("https://link.amazon/B05uwpEeL"),
        external: true,
      },
    ],
    faqs: [
      {
        question: "Do desk workers need a multivitamin or omega-3 supplement?",
        answer:
          "Not everyone does. Diet, sunlight exposure, and lab results matter. Supplements can help fill gaps, but it’s best to choose them based on actual needs and professional guidance when possible.",
      },
      {
        question: "Is it safe to take multiple supplements together?",
        answer:
          "Avoid starting many new supplements at once. Check for overlapping ingredients and interactions, and consult a healthcare professional—especially if you have conditions or take medications.",
      },
      {
        question: "What’s the simplest wellness habit for a busy desk routine?",
        answer:
          "Start with one sustainable habit: a consistent breakfast, regular movement breaks, hydration, or sleep routine. Supplements should support—not replace—those basics.",
      },
    ],
    relatedCollections: ["beginner-home-gym-and-clean-nutrition-starter-kit"],
    relatedGuides: [],
    relatedCompares: [
      { href: "/compare/kapiva-vs-hkvitals-vs-healthkart-supplements-india", label: "Kapiva vs HK Vitals vs HealthKart Supplements" },
    ],
    relatedStores: [
      { href: "/stores/hkvitals", label: "HK Vitals" },
      { href: "/stores/kapiva", label: "Kapiva" },
      { href: "/stores/healthkart", label: "HealthKart" },
      { href: "/stores/amazon-in", label: "Amazon India" },
    ],
  },
  {
    slug: "complete-amazon-makeup-toolkit",
    category: "Beauty & Grooming",
    title: "Complete Makeup Toolkit on Amazon India",
    seoTitle: "Complete Makeup Toolkit on Amazon India | Durza",
    metaDescription:
      "Build your complete makeup kit step by step—from cleanser to mascara. Browse curated picks across budget to premium, with price, MRP, discount, and Amazon.in links.",
    heroImage: "/collections/amazon-beauty-toolkit/hero-vanity.webp",
    summary:
      "A step-by-step makeup toolkit organized by routine categories—from cleanser and SPF to foundation, lips, mascara, and tools—with curated Amazon.in picks.",
    updatedLabel: "Updated Nov 2026",
    itemCountLabel: "18 Steps · 100+ Picks",
    kitSummary:
      "Shop the complete routine in one place: follow makeup steps in order, compare budget to premium picks, and check price, MRP, discount, and live details on Amazon.in before buying.",
    keywords: [
      "complete makeup kit Amazon India",
      "makeup toolkit step by step",
      "makeup routine essentials India",
      "foundation concealer mascara Amazon India",
      "beginner makeup kit India",
    ],
    picks: [
      {
        name: "Prep & Base Routine",
        storeBadge: "Amazon India",
        tier: "Essential First Buy",
        why: "Start with cleanser, moisturizer, SPF, primer, foundation, concealer, and powder for a solid base.",
        skipIf: "You already have your base routine sorted.",
        ctaLabel: "Explore Base Steps",
        ctaHref: "/collections/complete-amazon-makeup-toolkit#cleanser",
        external: false,
      },
      {
        name: "Eyes, Lips & Glow",
        storeBadge: "Amazon India",
        tier: "Daily Non-Negotiable",
        why: "Build your look with blush, highlighter, brows, eyeshadow, liner, mascara, and lip picks.",
        skipIf: "You only need one specific refill.",
        ctaLabel: "Browse Color Steps",
        ctaHref: "/collections/complete-amazon-makeup-toolkit#blush",
        external: false,
      },
      {
        name: "Lock In & Tools",
        storeBadge: "Amazon India",
        tier: "Sweet-Spot Upgrade",
        why: "Finish with setting spray and tools that make application easier and longer lasting.",
        skipIf: "You already own setting and tool essentials.",
        ctaLabel: "View Final Steps",
        ctaHref: "/collections/complete-amazon-makeup-toolkit#setting-spray",
        external: false,
      },
    ],
    faqs: [
      {
        question: "How is the makeup toolkit organized?",
        answer:
          "Products are organized by routine steps—from cleanser and moisturizer to mascara and tools—so you can build a complete kit in order.",
      },
      {
        question: "Are prices and discounts live?",
        answer:
          "Prices, MRP, and discount labels shown on Durza are indicative and may change. Always check the latest price, offer, and availability on Amazon.in before buying.",
      },
      {
        question: "Do all products have images and verified links?",
        answer:
          "Existing verified picks keep their images and affiliate links. New slots being added may use placeholders until verified product images and links are provided.",
      },
    ],
    relatedCollections: ["indian-monsoon-humidity-skincare-haircare-kit", "wedding-and-festive-luxury-gifting-edit-india"],
    relatedGuides: [],
    relatedCompares: [],
    relatedStores: [
      { href: "/stores/amazon-in", label: "Amazon India" },
    ],
  },
];

export function getCollectionBySlug(slug: string): CollectionEntry | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
