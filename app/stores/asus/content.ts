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
    headline: "ROG & TUF — high-refresh power for AAA and esports",
    checklist: [
      "NVIDIA GeForce RTX 40/50-series GPU with the right TGP for sustained performance",
      "144Hz–240Hz display (Nebula/OLED options on flagship ROG models)",
      "Advanced cooling (tri-fan, liquid metal on select configs) and a 90Wh-class battery",
    ],
    spec: "Recommended: 16GB–32GB DDR5 RAM · RTX 4060–5090 class GPU (match TGP/VRAM to your titles)",
    budget: "Check live pricing and configurations on ASUS India",
  },
  creative: {
    label: "Creative & OLED",
    headline: "Zenbook & ProArt — color-true canvases for creators",
    checklist: [
      "Lumina/OLED panel with 3K resolution, high refresh and color-accurate coverage",
      "Intel Core Ultra or Ryzen AI CPU with NPU acceleration for creative workflows",
      "Discrete RTX graphics and fast SSD storage for video, 3D and large asset libraries",
    ],
    spec: "Recommended: 16GB–32GB RAM · Intel Arc / RTX discrete GPU for demanding timelines & 3D",
    budget: "Check live pricing and configurations on ASUS India",
  },
  coding: {
    label: "Coding & Study",
    headline: "Vivobook S & Pro — fast, focused machines for code and class",
    checklist: [
      "16GB LPDDR5/LPDDR5X memory and a 512GB–1TB SSD for smooth multitasking",
      "Color-accurate OLED or crisp IPS display with ErgoSense keyboard comfort",
      "Modern Core/Ryzen processor with all-day efficiency for dev tools and study apps",
    ],
    spec: "Recommended: 16GB RAM · Integrated or RTX 3050/4050-class GPU for light creation & CUDA tasks",
    budget: "Check live pricing and configurations on ASUS India",
  },
  travel: {
    label: "Ultra-Light Travel",
    headline: "Zenbook ultraportables — premium power that travels light",
    checklist: [
      "Sub-1.2kg Ceraluminum™ chassis with durable, premium build quality",
      "Long-lasting battery with fast charging for work on the move",
      "Bright OLED display, full I/O or USB4, and a responsive precision touchpad",
    ],
    spec: "Recommended: 16GB LPDDR5X RAM · Integrated Intel Arc / Radeon graphics for productivity anywhere",
    budget: "Check live pricing and configurations on ASUS India",
  },
};

export const ASUS_LINEUP = [
  {
    slug: "rog-strix-zephyrus",
    title: "ROG Strix & Zephyrus",
    badge: "Flagship Gaming",
    copy: "NVIDIA RTX 40/50-series GPUs, Nebula OLED 240Hz displays, and tri-fan liquid metal cooling built for maxed-out frame rates.",
    image: "/stores/asus-lineup/rog-strix-zephyrus.jpg",
    alt: "High-performance ASUS ROG gaming laptop",
  },
  {
    slug: "zenbook-oled-duo",
    title: "Zenbook OLED & Duo",
    badge: "Executive Ultrabook",
    copy: "Sub-1.2kg Ceraluminum™ chassis, 3K 120Hz Lumina OLED screens, and all-day Intel Core Ultra / Ryzen AI battery life.",
    image: "/stores/asus-lineup/zenbook-oled-duo.jpg",
    alt: "Sleek ASUS Zenbook ultrabook on a desk",
  },
  {
    slug: "tuf-gaming",
    title: "TUF Gaming A15 & F15",
    badge: "High-FPS Value",
    copy: "MIL-STD-810H military-grade durability paired with high-TGP RTX graphics and 90Wh batteries for marathon sessions.",
    image: "/stores/asus-lineup/tuf-gaming.jpg",
    alt: "ASUS TUF Gaming laptop ready for play",
  },
  {
    slug: "vivobook-s-pro-oled",
    title: "Vivobook S & Pro OLED",
    badge: "Coding & Study",
    copy: "16GB LPDDR5X RAM, color-accurate OLED panels, and ergonomic ErgoSense keyboards tailored for developers and students.",
    image: "/stores/asus-lineup/vivobook-s-pro-oled.jpg",
    alt: "ASUS Vivobook laptop for coding and study",
  },
  {
    slug: "rog-ally-x",
    title: "ROG Ally X Handheld",
    badge: "Portable Console",
    copy: "AMD Ryzen Z1 Extreme power, 80Wh battery, and 120Hz FreeSync display—play full AAA PC libraries anywhere.",
    image: "/stores/asus-lineup/rog-ally-x.jpg",
    alt: "ASUS ROG Ally handheld gaming device",
  },
  {
    slug: "proart-studio-monitors",
    title: "ProArt Studio & Monitors",
    badge: "3D & Color Grading",
    copy: "Calman-verified Delta E < 1 displays, ASUS Dial rotary controls, and workstation GPUs for DaVinci Resolve & CAD.",
    image: "/stores/asus-lineup/proart-studio-monitors.jpg",
    alt: "ASUS ProArt monitor for color-accurate creative work",
  },
] as const;

export const ASUS_COMPARISONS = [
  {
    id: "rog-strix-g16",
    name: "ROG Strix G16",
    bestFor: "Flagship AAA gaming & esports",
    keySpec: "Intel Core HX / Ryzen HX · up to RTX 40/50-series, high-refresh Nebula display",
    budget: "Check live pricing and configurations on ASUS India",
  },
  {
    id: "tuf-gaming-a15",
    name: "TUF Gaming A15 / F15",
    bestFor: "High-FPS value & durability",
    keySpec: "Ryzen/Intel H-series · RTX 3050–4060 class, MIL-STD-810H chassis",
    budget: "Check live pricing and configurations on ASUS India",
  },
  {
    id: "zenbook-14-oled",
    name: "Zenbook 14 OLED",
    bestFor: "Executive work & creative mobility",
    keySpec: "Intel Core Ultra / Ryzen AI · 3K 120Hz Lumina OLED, sub-1.2kg Ceraluminum™",
    budget: "Check live pricing and configurations on ASUS India",
  },
  {
    id: "vivobook-s15-oled",
    name: "Vivobook S 15 OLED",
    bestFor: "Coding, study & everyday creation",
    keySpec: "Core/Ryzen processors · 16GB RAM, color-accurate OLED, ErgoSense keyboard",
    budget: "Check live pricing and configurations on ASUS India",
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
      "The ASUS eShop offers official configurations with options like extended warranty/LADP upgrades, instant bank cashback and No-Cost EMI on eligible cards, plus student and pro-verified pricing programs where available — see live terms at checkout.",
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
