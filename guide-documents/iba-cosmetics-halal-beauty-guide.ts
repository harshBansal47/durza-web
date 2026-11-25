import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "iba-cosmetics-halal-beauty-guide",
  url: "https://durza.in/guides/iba-cosmetics-halal-beauty-guide",
  title: "IBA Cosmetics Buying Guide (2026): How to Check Halal, Ingredient and Offer Claims",
  description:
    "A cautious guide to buying IBA Cosmetics: verify halal/vegan/cruelty-free claims on the exact product, check ingredients, confirm final price, and review offer terms before paying. Checked 26 Nov 2026.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Editorial trust review", "No promo codes claimed without checkout verification"],
  audience: {
    bestFor: [
      "Shoppers considering IBA Cosmetics and want to verify certification, ingredient and offer claims before buying.",
      "Buyers who need to confirm final cart value and policy terms rather than relying on promo banners.",
    ],
    skipIf: [
      "You need medical/dermatological advice for skin conditions or allergies — consult a qualified professional.",
      "You want a guaranteed working coupon code; verify any code in checkout before paying.",
    ],
  },
  byline: {
    author: "Harsh Bansal",
    role: "Senior software engineer · 8+ years in technology",
    published: "14 Nov 2026",
    updated: "26 Nov 2026",
    factsChecked: "26 Nov 2026",
    bio: "Harsh builds and audits data-driven products. On Durza he reviews the research method, the comparison logic and the numbers behind each recommendation — so a verdict is something you can check, not just something you are told.",
    methodHref: "/methodology",
  },
  quickAnswer: {
    question: "How should you evaluate an IBA Cosmetics offer?",
    answer:
      "Verify the exact product on the official IBA site: check current certification/ingredient claims on the product label or page, confirm shade/variant, and review the final cart total. Test any promo code in checkout and read shipping/return terms before paying.",
    jumpHref: "#checklist",
    jumpLabel: "See the buying checklist",
  },
  ctas: [
    {
      href: "/go/iba-cosmetics?src=guide&sub=guide_iba-cosmetics-halal-beauty-guide",
      label: "Check IBA official store",
      primary: true,
    },
    { href: "/stores/iba-cosmetics", label: "IBA store hub on Durza" },
  ],
  methodNote:
    "This guide was editorially reviewed on 26 Nov 2026 to remove unverified promo-code, certification and ingredient certainty. We did not test products, verify certification documents, or confirm live checkout offers. Confirm current product claims and policies on the official IBA site before purchasing.",
  scenarios: [
    {
      heading: "Certification-sensitive purchase: verify the exact SKU",
      body: "If halal, vegan, cruelty-free, or ingredient restrictions matter to you, verify the current claim on the exact product page/label. Do not assume every SKU or batch has the same certification or formulation.",
      icon: null,
    },
    {
      heading: "Shade/variant buying: check return terms",
      body: "For makeup, confirm shade, size, finish and ingredient list before ordering. Check return/exchange eligibility for opened cosmetics on the official policy page.",
      icon: null,
    },
    {
      heading: "Offer checking: confirm cart behavior",
      body: "If you have a promo code or see a B2G1/banner offer, test it in the official cart. Only count the discount after checkout shows it for your selected products.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["What to check", "Why it matters", "Where to verify"],
    rows: [
      ["Exact product and variant", "Shade, size and formulation can differ", "Official product page"],
      ["Certification claims", "Halal/vegan/cruelty-free claims should be verified per SKU/current documentation", "Product page/label/official certification info"],
      ["Ingredient list", "Allergies and preferences depend on the actual formula", "Product label/page"],
      ["Final cart price", "Codes, bundles and shipping affect payable amount", "Checkout"],
      ["Return/exchange policy", "Cosmetics may have condition-specific returns", "Official policy page"],
      ["Promo code/offer", "Offers can be expired or SKU-specific", "Checkout"],
    ],
  },
  checkoutSteps: [
    "Open the exact IBA product page and confirm variant, ingredient list, and any certification claims you rely on.",
    "Check the current price and offer terms on the official site.",
    "Apply any promo code in checkout and confirm the final payable amount before paying.",
    "Review shipping and return/exchange terms, especially for cosmetics.",
    "Save order confirmation and product/offer details.",
  ],
  checkoutNote:
    "Durza does not claim IBA promo codes as active unless verified in checkout. Prior draft code and automatic-offer claims were removed due lack of verification.",
  verifiedFacts: null,
  verificationParagraph:
    "This page was editorially reviewed on 26 Nov 2026. We removed previously listed promo-code, B2G1, certification and ingredient claims that were not verified in this pass. We did not test products or verify certification documents. Confirm current product claims, certifications and checkout terms on the official IBA site before purchasing.",
  verificationNotes: [
    "No IBA coupon code or B2G1 offer is claimed as active in this guide.",
    "Certification and ingredient claims should be verified on the exact SKU and current official documentation/label.",
    "Cosmetics return eligibility can be condition-specific; check the current policy before ordering.",
  ],
  exploreLinks: [
    { href: "/stores/iba-cosmetics", label: "IBA store hub on Durza" },
    { href: "/guides/how-durza-verifies-offers-methodology-2026", label: "How Durza verifies offers" },
  ],
  faqs: [
    {
      question: "Does Durza have a working IBA Cosmetics coupon code?",
      answer:
        "Not in this guide. We do not list IBA codes or automatic offers as active unless verified in checkout. Test any code in the official cart for your selected products.",
    },
    {
      question: "Can I assume every IBA product is halal, vegan or cruelty-free?",
      answer:
        "Do not assume; verify the current claim on the exact product page, label, or official certification information you rely on. Product formulations and certifications can vary by SKU and over time.",
    },
    {
      question: "What should I check before buying IBA makeup online?",
      answer:
        "Check the exact shade/variant, ingredient list, current certification claims, final cart price, shipping, and return/exchange policy before paying.",
    },
  ],
  editorialNote:
    "Editorially reviewed 26 Nov 2026. Prior unverified promo, certification and ingredient claims were removed. Product details, prices and policies can change. Durza may earn a commission through tracked links at no extra cost to you.",
  sources: [],
};
