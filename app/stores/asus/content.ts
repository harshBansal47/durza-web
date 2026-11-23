import type { FaqItem } from "@/components/store/FaqSection";

export type AsusMatchId = "gaming" | "creative" | "coding" | "travel";

export const ASUS_MATCHER_ORDER: AsusMatchId[] = ["gaming", "creative", "coding", "travel"];

export const ASUS_MATCHES: Record<
  AsusMatchId,
  {
    label: string;
    headline: string;
    checklist: string[];
    spec: string;
    budget: string;
  }
> = {
  gaming: {
    label: "Gaming & AAA",
    headline: "ROG & TUF — smoother play for esports and AAA titles",
    checklist: [
      "Dedicated NVIDIA GeForce RTX graphics (GPU power/TGP matters as much as the model name)",
      "144Hz+ display for smoother motion (higher refresh helps most in fast-paced games)",
      "Capable cooling and enough ports for peripherals, monitors, and headsets",
    ],
    spec: "16GB–32GB RAM · RTX-class GPU matched to your games and resolution target",
    budget: "₹70,000–₹2,50,000+ typical (configuration-dependent, last checked 20 Nov 2026)",
  },
  creative: {
    label: "Creative & OLED",
    headline: "Zenbook & ProArt — color-accurate screens for creators",
    checklist: [
      "OLED/high-quality panel with good color coverage for photo, video, and design work",
      "Modern Intel Core / Ryzen processor (NPU/AI features can help in supported apps)",
      "Fast SSD and enough RAM for large files, timelines, and multitasking",
    ],
    spec: "16GB–32GB RAM · Integrated or discrete graphics based on editing/3D workload",
    budget: "₹80,000–₹2,20,000+ typical (configuration-dependent, last checked 20 Nov 2026)",
  },
  coding: {
    label: "Coding & Study",
    headline: "Vivobook & Zenbook — reliable performance for code and classes",
    checklist: [
      "16GB memory and 512GB+ SSD for smooth IDEs, browsers, and multitasking",
      "Comfortable keyboard and a crisp display for long study/coding sessions",
      "Efficient modern CPU for battery-friendly everyday productivity",
    ],
    spec: "16GB RAM · 512GB+ SSD · Integrated graphics (or entry RTX for light CUDA/creation)",
    budget: "₹45,000–₹1,10,000 typical (configuration-dependent, last checked 20 Nov 2026)",
  },
  travel: {
    label: "Ultra-Light Travel",
    headline: "Zenbook ultraportables — light to carry, ready for work anywhere",
    checklist: [
      "Lightweight chassis (around ~1–1.3 kg on many models) for easy carry",
      "Long battery life and fast charging support for on-the-go work",
      "Bright display and practical ports/USB-C connectivity for travel setups",
    ],
    spec: "16GB RAM · Efficient CPU with integrated graphics for productivity on the move",
    budget: "₹75,000–₹1,80,000 typical (configuration-dependent, last checked 20 Nov 2026)",
  },
};

export const ASUS_LINEUP = [
  {
    slug: "rog-strix-zephyrus",
    title: "ROG Strix & Zephyrus",
    badge: "Gaming Performance",
    outcome: "Play competitive titles smoothly and handle demanding AAA games (config-dependent).",
    copy: "Performance-focused ROG laptops with high-refresh displays and RTX-class graphics options. Check exact GPU power (TGP), display, and cooling on the SKU you choose.",
    image: "/stores/asus-lineup/rog-strix-zephyrus.jpg",
    alt: "ASUS ROG gaming laptop lineup (replace with official ASUS product image)",
  },
  {
    slug: "zenbook-oled-duo",
    title: "Zenbook OLED & Duo",
    badge: "Portable Premium",
    outcome: "Work and create on a bright, color-rich screen while staying light on the move.",
    copy: "Premium ultraportables with OLED display options and modern processors. Great for travel, meetings, and creator-friendly viewing (specs vary by model).",
    image: "/stores/asus-lineup/zenbook-oled-duo.jpg",
    alt: "ASUS Zenbook OLED laptop lineup (replace with official ASUS product image)",
  },
  {
    slug: "tuf-gaming",
    title: "TUF Gaming A15 & F16",
    badge: "Value Gaming",
    outcome: "Get strong 1080p gaming and everyday speed without flagship pricing.",
    copy: "Durable, value-oriented gaming laptops with high-refresh screens and RTX-class GPU options on many configurations. Verify exact CPU/GPU/RAM/storage for each model.",
    image: "/stores/asus-lineup/tuf-gaming.jpg",
    alt: "ASUS TUF Gaming laptop lineup (replace with official ASUS product image)",
  },
  {
    slug: "vivobook-s-pro-oled",
    title: "Vivobook S & Pro OLED",
    badge: "Study & Everyday",
    outcome: "Code, study, and multitask comfortably with a crisp display and responsive keyboard.",
    copy: "Balanced laptops for students and everyday creators. Look for 16GB RAM and 512GB+ SSD configs for smoother long-term use.",
    image: "/stores/asus-lineup/vivobook-s-pro-oled.jpg",
    alt: "ASUS Vivobook laptop lineup (replace with official ASUS product image)",
  },
  {
    slug: "rog-ally-x",
    title: "ROG Ally X",
    badge: "Handheld PC Gaming",
    outcome: "Play PC games on the go with a portable handheld form factor.",
    copy: "A handheld gaming PC for portable play and couch/commute sessions. Check game compatibility, storage, and battery expectations for your use.",
    image: "/stores/asus-lineup/rog-ally-x.jpg",
    alt: "ASUS ROG Ally X handheld (replace with official ASUS product image)",
  },
  {
    slug: "proart-studio-monitors",
    title: "ProArt Laptops & Displays",
    badge: "Creator Tools",
    outcome: "Edit, grade, and design with color-focused hardware built for creative workflows.",
    copy: "ProArt devices and displays aimed at creators who care about color accuracy and workflow tools. Confirm panel specs and calibration details per model.",
    image: "/stores/asus-lineup/proart-studio-monitors.jpg",
    alt: "ASUS ProArt creator hardware (replace with official ASUS product image)",
  },
] as const;

export const ASUS_COMPARISONS = [
  {
    id: "rog-strix-g16",
    name: "ROG Strix G16",
    bestFor: "High-performance AAA gaming & esports",
    keySpec: "HX-class Intel/Ryzen CPUs · high-refresh display · RTX-class graphics (config varies)",
    budget: "₹1,30,000–₹3,00,000+ typical",
  },
  {
    id: "tuf-gaming-a15",
    name: "TUF Gaming A15 / F15",
    bestFor: "Value-focused gaming and durable everyday performance",
    keySpec: "Ryzen/Intel H-series options · 15.6\" high-refresh displays · RTX 3050+ class on many configs",
    budget: "₹70,000–₹1,40,000 typical",
  },
  {
    id: "zenbook-14-oled",
    name: "Zenbook 14 OLED",
    bestFor: "Portable work, travel, and creator-friendly OLED viewing",
    keySpec: "Modern Core Ultra/Ryzen options · OLED display · lightweight premium designs",
    budget: "₹80,000–₹1,80,000 typical",
  },
  {
    id: "vivobook-s15-oled",
    name: "Vivobook S 15 OLED",
    bestFor: "Coding, study, and everyday productivity/creation",
    keySpec: "Core/Ryzen options · OLED/IPS variants · comfortable keyboards for long sessions",
    budget: "₹55,000–₹1,20,000 typical",
  },
] as const;

export const ASUS_FAQS: FaqItem[] = [
  {
    question: "Which ASUS laptop family is right for me?",
    answer:
      "Pick ROG/Zephyrus for maxed-out AAA gaming, TUF for durable high-FPS value, Zenbook for premium OLED portability, Vivobook for coding and study, ROG Ally X for handheld play, and ProArt for color-critical creative work. Use the matcher and check the exact configuration on ASUS India for your needs.",
  },
  {
    question: "Are Zenbook OLED displays good for creators and developers?",
    answer:
      "Yes — ASUS Lumina OLED panels deliver vivid contrast and excellent color for media, design and long coding sessions. Check the specific model’s resolution, refresh rate and color coverage on the ASUS India listing to match your workflow.",
  },
  {
    question: "What advantages do I get buying from the official ASUS India eShop?",
    answer:
      "The ASUS eShop offers official configurations with options like extended warranty/LADP upgrades, instant bank cashback and No-Cost EMI on eligible cards, plus student and eligible employer pricing programs where available — see live terms at checkout.",
  },
  {
    question: "How do ROG and TUF Gaming differ?",
    answer:
      "ROG targets flagship performance and premium features (Nebula displays, advanced cooling), while TUF focuses on durable, great-value high-FPS gaming with MIL-STD-810H-tested chassis on select models. Compare the exact GPU TGP, screen and price for the SKU you choose.",
  },
  {
    question: "What specs should I prioritize for coding or study?",
    answer:
      "Aim for 16GB RAM, a fast 512GB+ SSD, a comfortable ErgoSense keyboard and a crisp OLED/IPS display. Vivobook S and Pro OLED models are tuned for developers and students — confirm the exact CPU, memory and ports on ASUS India.",
  },
  {
    question: "Where can I find current ASUS India prices, offers and stock?",
    answer:
      "Live prices, bank offers, EMI options, configurations and availability are shown on the official ASUS India store. Use “Configure & Check Live Price” to view the latest options and checkout terms for your chosen model.",
  },
];
