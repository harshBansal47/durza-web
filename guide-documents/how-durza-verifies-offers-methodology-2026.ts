import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "how-durza-verifies-offers-methodology-2026",
  url: "https://durza.in/guides/how-durza-verifies-offers-methodology-2026",
  title: "How Durza Verifies Offers (2026): Methodology and Limits",
  description:
    "How Durza approaches offer verification: crawl and parse signals, click-through checks, manual review, and clear limits. What 'verified' means, what it does not mean, and how to check before paying.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Methodology guide", "No live offer claims"],
  audience: {
    bestFor: [
      "Readers who want to understand how Durza checks offers and what verification can and cannot guarantee.",
      "Partners, contributors, or shoppers evaluating whether to trust a Durza offer label.",
    ],
    skipIf: [
      "You need a guarantee that any specific offer will work for your account/cart — always verify in checkout.",
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
    question: "What does 'verified' mean at Durza?",
    answer:
      "A verified offer has passed Durza's available checks at the time of review, such as source parsing, click-through/routing checks, and eligibility review where possible. It does not guarantee the offer will work for every user, cart, card, location, or time. Always confirm the final offer in the official checkout before paying.",
    jumpHref: "#checklist",
    jumpLabel: "See verification limits",
  },
  ctas: [],
  methodNote:
    "This page describes Durza's verification approach at a high level. It does not publish internal secrets, private thresholds, or guarantees. Specific offers can change after review; checkout is the final source of truth.",
  scenarios: [
    {
      heading: "Before clicking: check the label context",
      body: "Look for the offer's checked date, eligibility notes, and any caveats. A code or deal without clear eligibility context should be treated as unverified until you confirm it.",
      icon: null,
    },
    {
      heading: "At checkout: confirm the actual benefit",
      body: "The merchant checkout is the source of truth. Confirm the discount/cashback applies to your exact cart, account, card, and location before paying.",
      icon: null,
    },
    {
      heading: "When something fails: treat it as stale",
      body: "If an offer does not apply, it may be expired, targeted, out of stock, or ineligible. Do not force a purchase based on an old listing; re-check the current terms.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Step", "What Durza tries to do", "What it does not guarantee"],
    rows: [
      ["Source/crawl", "Collect offer signals from merchant/storefront sources", "That the source is complete, current, or unchanged after capture"],
      ["Parse/normalize", "Extract offer details like code, discount, eligibility and expiry where available", "That every eligibility rule or exclusion was captured correctly"],
      ["Click-through/routing check", "Confirm the offer route resolves and the destination is reachable", "That the offer applies to your account, cart, or payment method"],
      ["Manual/editorial review", "Review unclear or high-impact claims before publishing", "That a human can catch every merchant-side change or edge case"],
      ["Recheck/de-list", "Update or remove offers when evidence shows they are stale or invalid", "Real-time removal the moment a merchant changes an offer"],
    ],
  },
  checkoutSteps: [
    "Check the offer's date, eligibility notes, and source/context on Durza.",
    "Open the official merchant page through the offer link and confirm the exact product/cart.",
    "Apply the code or check the offer in checkout and confirm the final payable amount.",
    "Review shipping, fees, taxes, return/refund and card/wallet eligibility before paying.",
    "If the offer does not apply, do not count the saving; treat the listing as stale or ineligible.",
  ],
  checkoutNote:
    "Durza verification reduces risk but does not replace checkout verification. The merchant's final checkout screen and current terms control eligibility.",
  verifiedFacts: null,
  verificationParagraph:
    "This methodology page was reviewed on 26 Nov 2026. It describes Durza's general verification approach and limits. It intentionally avoids invented performance metrics. For any specific offer, confirm the current merchant terms and checkout result before purchasing.",
  verificationNotes: [
    "No specific offer, coupon code, or discount is claimed as active on this page.",
    "Verification is time-bound: merchant offers can change after review.",
    "Checkout eligibility can vary by account, cart, location, device, card, wallet, or merchant rules.",
  ],
  exploreLinks: [
    { href: "/guides", label: "All Durza guides" },
    { href: "/stores", label: "Browse stores" },
  ],
  faqs: [
    {
      question: "Does Durza verify every offer?",
      answer:
        "Durza aims to review offers before publishing or labeling them, but verification coverage and depth can vary by source, offer type, and available evidence. Treat verification as a confidence signal, not a guarantee, and always confirm in checkout.",
    },
    {
      question: "Why can a verified offer still fail?",
      answer:
        "Merchant offers can expire, become targeted, exclude certain products/carts/cards, run out of stock, or change after review. Checkout is the final authority for whether an offer applies to you.",
    },
    {
      question: "What should I do if an offer doesn't work?",
      answer:
        "Do not complete the purchase assuming the discount will apply later. Check the offer terms, eligibility, and cart details. If it still fails, treat it as ineligible or stale and look for a currently applicable alternative.",
    },
  ],
  editorialNote:
    "Methodology reviewed 26 Nov 2026. This page describes process and limits, not a live offer guarantee. Durza may earn a commission through tracked links at no extra cost to you.",
  sources: [],
};
