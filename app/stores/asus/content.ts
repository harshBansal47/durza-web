import type { FaqItem } from "@/components/store/FaqSection";

export type AsusMatchId = "student" | "gaming" | "creative" | "business";

export const ASUS_MATCHER_ORDER: AsusMatchId[] = ["student", "gaming", "creative", "business"];

export const ASUS_MATCHES: Record<
  AsusMatchId,
  {
    label: string;
    badge: string;
    headline: string;
    spec: string;
    budget: string;
    tradeOff: string;
  }
> = {
  student: {
    label: "Student",
    badge: "Best for students",
    headline: "Vivobook 15 / 16 — an everyday study companion",
    spec: "Look for a current Ryzen 5 or Core i5-class CPU, 16GB RAM where possible, and a 512GB SSD. Integrated graphics are usually enough for study, coding and office work.",
    budget: "₹40,000–₹70,000",
    tradeOff:
      "A Vivobook can cover everyday study and coding without paying for a gaming GPU. The trade-off is that display quality, battery life and upgrade options vary by exact model number.",
  },
  gaming: {
    label: "Gaming",
    badge: "Best for gaming",
    headline: "ROG Strix or TUF Gaming — choose by GPU and budget",
    spec: "Compare the exact GPU, its power limit and VRAM, then check cooling, screen refresh rate and RAM. Do not compare laptops by GPU name alone.",
    budget: "₹70,000–₹2,00,000+",
    tradeOff:
      "ROG typically targets premium gaming features, while TUF gives shoppers more price points to compare. Both trade portability and battery life for gaming performance, and the exact configuration matters more than the family name.",
  },
  creative: {
    label: "Creative",
    badge: "Best for creators",
    headline: "Zenbook OLED — for a sharper, colour-focused screen",
    spec: "Compare the panel resolution, colour coverage and calibration for the specific SKU. For heavier video or 3D work, check whether that configuration has a discrete GPU and enough memory.",
    budget: "₹80,000–₹1,60,000",
    tradeOff:
      "An OLED option can be appealing for photo work and media, but not every Zenbook has the same panel or colour specification. OLED may also cost more than an IPS alternative, so match the screen to the work you actually do.",
  },
  business: {
    label: "Business",
    badge: "Best for work",
    headline: "ExpertBook or Zenbook — prioritise support and portability",
    spec: "Start with a current Core i5/Ryzen 5-class CPU, 16GB RAM and a 512GB SSD. Check ports, webcam, warranty terms and any IT-management features your organisation requires.",
    budget: "₹60,000–₹1,50,000",
    tradeOff:
      "Business-focused configurations can make day-to-day work and support requirements easier to compare. Features such as vPro, fingerprint readers and extended onsite service are configuration-specific, so confirm them before buying.",
  },
};

export const ASUS_COMPARISONS = [
  {
    id: "rog-strix-g15",
    name: "ROG Strix G15",
    bestFor: "Dedicated gaming performance",
    keySpec: "Dedicated GPU; compare exact GPU, power limit and VRAM by SKU",
    budget: "₹1,00,000+",
    description:
      "A gaming-laptop family to compare when a dedicated GPU and gaming-focused cooling matter; confirm the exact configuration and current availability.",
  },
  {
    id: "tuf-gaming-a15",
    name: "TUF Gaming A15",
    bestFor: "Gaming value",
    keySpec: "CPU and dedicated GPU vary by configuration",
    budget: "₹70,000–₹1,30,000",
    description:
      "A gaming-laptop family to compare across price points; check the exact GPU, display and upgrade options for the listed model.",
  },
  {
    id: "zenbook-oled-3k",
    name: "Zenbook OLED 3K",
    bestFor: "Screen-focused creative work",
    keySpec: "Panel and CPU vary by model; check GPU for demanding workloads",
    budget: "₹80,000–₹1,60,000",
    description:
      "A Zenbook OLED configuration to consider when display quality is a priority; confirm the exact panel and colour specifications on the product listing.",
  },
  {
    id: "vivobook-15",
    name: "Vivobook 15",
    bestFor: "Study and everyday productivity",
    keySpec: "Compare current Core i5/Ryzen 5-class CPUs; graphics vary by SKU",
    budget: "₹40,000–₹70,000",
    description:
      "A Vivobook family to compare for study and everyday productivity; check memory, storage, display and upgradeability for the exact SKU.",
  },
] as const;

export const ASUS_FAQS: FaqItem[] = [
  {
    question: "Which ASUS laptop is best for Indian gamers in 2026?",
    answer:
      "There is no single best pick for every game or budget. Compare current ROG and TUF listings by the exact GPU, GPU power limit, cooling, screen and total price; confirm the model is currently sold in India before deciding.",
  },
  {
    question: "Are Zenbook OLED displays worth the premium?",
    answer:
      "They can be worth comparing if you value contrast and a vivid display, especially for media and compatible creative work. Panel resolution, colour coverage and calibration vary by model, and OLED is not automatically the best value for coding or office tasks.",
  },
  {
    question: "Does ASUS India offer in-store service across tier-II and tier-III cities?",
    answer:
      "Service-centre coverage and available services vary by location. Check ASUS India's official service-centre locator for your PIN code and confirm warranty, repair and onsite-service terms before purchase; we do not claim a fixed city or centre count.",
  },
  {
    question: "What is the difference between ROG and TUF?",
    answer:
      "ROG and TUF are ASUS gaming families, but each includes different configurations and price points. Compare the exact GPU, screen, cooling, build, weight and warranty for the model numbers you are considering rather than assuming every ROG or TUF laptop has the same features.",
  },
  {
    question: "Is ASUS Vivobook good for coding and students?",
    answer:
      "A Vivobook can suit study, web development and everyday coding when the configuration has enough memory and storage. As a practical starting point, compare 16GB RAM and a 512GB SSD, and check the exact CPU, display, battery reviews and upgrade options for your course or tools.",
  },
  {
    question: "How do I claim an ASUS student discount in India?",
    answer:
      "Student offers depend on ASUS India's current campaigns and eligibility rules; do not assume a permanent discount is available. Check the official listing for the terms, required student verification, eligible models and whether the offer appears in the final checkout total.",
  },
  {
    question: "Are ASUS laptop prices and stock live on this page?",
    answer:
      "No. This page is a buying guide, not a live ASUS catalogue, and Durza currently has no ASUS product or coupon offers to display. The rupee ranges are planning budgets only; check ASUS India for current models, prices, stock and final checkout terms.",
  },
  {
    question: "Are all ASUS TUF laptops tested to MIL-STD-810H?",
    answer:
      "Do not assume that from the TUF name alone. Check the product specification for the exact model and configuration, and read the scope of any listed durability testing; a family name is not a substitute for a SKU-specific claim.",
  },
  {
    question: "What should I compare before buying an ASUS laptop online?",
    answer:
      "Compare the full model number and CPU/GPU configuration, RAM and upgrade limits, storage, screen, weight, warranty, seller and return terms. Check the final payable price at checkout because promotions, availability and delivery can change.",
  },
];
