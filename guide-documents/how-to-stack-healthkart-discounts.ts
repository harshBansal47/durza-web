import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "how-to-stack-healthkart-discounts",
  url: "https://durza.in/guides/how-to-stack-healthkart-discounts",
  title: "How to Stack HealthKart Discounts: Coupons, Cashback & Pro Stacking (2026)",
  description:
    "A complete order-of-operations guide to combining HealthKart promo codes, HK Cash, UPI discounts and delivery savings — with a worked example.",
  researchReviewedDate: null,
  evidenceBadges: [],
  audience: {
    bestFor: ["Anyone buying protein, creatine or mass gainers from HealthKart regularly."],
    skipIf: [],
  },
  byline: {
    author: "Durza Editors",
    role: "Senior software engineer · 8+ years in technology",
    published: "13 Nov 2026",
    updated: "14 Nov 2026",
    factsChecked: "13 Nov 2026",
    bio: "Harsh builds and audits data-driven products. On Durza he reviews the research method, the comparison logic and the numbers behind each recommendation — so a verdict is something you can check, not just something you are told.",
    methodHref: "/methodology",
  },
  quickAnswer: {
    question: "The short answer",
    answer:
      "Stack in this order: sale price, one coupon (WHEY300 on 2kg/4kg tubs), UPI prepaid discount, then HK Cash. Never stack two codes.",
    jumpHref: "#how-healthkarts-discount-layers-work",
    jumpLabel: "How HealthKart's discount layers work",
  },
  ctas: [],
  methodNote:
    "Layer order reflects the live checkout flow observed by Durza editors on November 13, 2026; individual offers vary by campaign.",
  scenarios: null,
  skuTable: {
    headers: ["Category", "Best lever", "What to watch"],
    rows: [
      ["Whey protein", "the Whey tub code on 2kg/4kg tubs", "Not valid on smaller pack sizes"],
      ["Mass gainers", "the sitewide coupon + UPI discount", "Often excluded from protein-tub codes"],
      ["Creatine & pre-workout", "the sitewide coupon + UPI discount", "the sitewide coupon terms vary by campaign"],
      ["Third-party tested", "Ask HK Customer Care for certification", "Authenticity varies by seller — buy from HealthKart-fulfilled only"],
      ["Subscriptions", "Auto-ship discounts + HK Cash", "Cancel reminders before renewal"],
    ],
  },
  checkoutSteps: [
    "Pick a full-price or sale item — the original base price is what discounts are calculated against.",
    "Add the eligible tub to your cart — 2kg or 4kg for the Whey tub code.",
    "Apply the Whey tub code in the coupon box and confirm it landed.",
    "At payment, select UPI as the payment method for the extra prepaid discount.",
    "Review the final amount — savings are shown line by line before you pay.",
    "Check that HK Cash on eligible orders is being earned at the rate shown on the rewards page.",
  ],
  checkoutNote: null,
  verifiedFacts: null,
  verificationParagraph: null,
  verificationNotes: null,
  exploreLinks: null,
  faqs: null,
  editorialNote:
    "Prices and product features can change. Check the provider’s current terms before purchasing. Recommendations are editorial; paid placements are labeled.",
  sources: [],
};
