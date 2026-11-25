import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "how-to-save-on-amazon-india",
  url: "https://durza.in/guides/how-to-save-on-amazon-india",
  title: "How to Save on Amazon India: Coupons, Bank Offers & Exchange Deals",
  description:
    "Amazon India rarely uses public text promo codes. The real savings live in product-page clip coupons, payment-page bank slabs and exchange offers — and the order you apply them changes the final payable amount.",
  researchReviewedDate: "24 Nov 2026",
  evidenceBadges: [],
  audience: {
    bestFor: [
      "Shoppers buying electronics, appliances or household staples who want one repeatable checkout order.",
      "Cardholders choosing between a core-bank 10% slab, Amazon Pay ICICI cashback and no-cost EMI.",
    ],
    skipIf: [
      "Buyers hunting for third-party “secret codes” — Amazon mostly uses clip checkboxes and bank slabs.",
      "Single-item buyers under ₹499 without Prime: ₹40–₹100 shipping can erase a small coupon saving.",
    ],
  },
  byline: {
    author: "Harsh Bansal",
    role: "Senior software engineer · 8+ years in technology",
    published: "18 Oct 2026",
    updated: "24 Nov 2026",
    factsChecked: "24 Nov 2026",
    bio: "Harsh builds and audits data-driven products. On Durza he reviews the research method, the comparison logic and the numbers behind each recommendation — so a verdict is something you can check, not just something you are told.",
    methodHref: "/methodology",
  },
  quickAnswer: {
    question: "What is the exact stacking order on Amazon India?",
    answer:
      "Deal price → product clip coupon → exchange (only after checking the post-exchange total still clears the bank offer's minimum spend) → bank instant discount at payment, or Amazon Pay ICICI cashback if no instant slab is active. Verify the separate discount lines before clicking Pay.",
    jumpHref: "#worked-maths",
    jumpLabel: "See the worked maths",
  },
  ctas: [
    { href: "/go/amazon-in?src=guide-amazon-save-verdict", label: "Check live deals on Amazon India" },
    { href: "/bank-offers", label: "Compare live bank slabs" },
  ],
  methodNote: null,
  scenarios: null,
  skuTable: null,
  checkoutSteps: null,
  checkoutNote: null,
  verifiedFacts: null,
  verificationParagraph:
    "A 25 Nov 2026 evidence pass confirmed Amazon's plan pages and checkout mechanics, but the only supplied bank-offer terms page documenting an SBI 10% slab lists a validity window of 10–14 June 2023. That campaign is historical and is not presented here as a live offer. Both scenarios are illustrative arithmetic built to show the order of operations — not live product quotes. We have not verified today's bank slab on your specific SKU or pincode. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: null,
  exploreLinks: [
    { href: "/categories/finance", label: "Finance & Cards deals and card guides" },
    { href: "/bank-offers", label: "Credit Card & Bank Instant Discount Offers India" },
    {
      href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india",
      label: "Instant Bank Discount vs No-Cost EMI: hidden GST & fees",
    },
    {
      href: "/compare/amazon-vs-flipkart-electronics-2026",
      label: "Amazon India vs Flipkart: returns, OBD & bank offers",
    },
    { href: "/reviews/amazon-prime-india-review-2026", label: "Amazon Prime India review: ₹399 vs ₹1,499" },
    { href: "/guides/amazon-finance-card-smarts-buying-guide", label: "Amazon finance & card smarts" },
    { href: "/stores/amazon-in", label: "Amazon India coupons & deals" },
    { href: "/stores/flipkart", label: "Flipkart coupons & store hub" },
  ],
  faqs: [
    {
      question: "Do Amazon clip coupons and bank offers combine?",
      answer:
        "Often, yes — the clip coupon reduces the item price at cart level and the bank instant discount applies at payment. But the bank slab has a minimum net transaction value, so a large exchange credit can push the cart below that threshold and void the bank offer. Read the payment summary with each option selected.",
    },
    {
      question: "Is the exchange offer worth it?",
      answer:
        "Only if the exchange credit beats what you would get by selling the old device yourself, and only if applying it does not disqualify a larger bank discount. Compare the final payable amount with and without exchange on the payment page.",
    },
    {
      question: "When is the best time to shop on Amazon India?",
      answer:
        "The Great Indian Festival and Prime Day typically carry the deepest bank slabs and exchange bonuses, but prices are often inflated before the sale. Track the price for a few weeks and compare against Flipkart before paying. Our Black Friday vs regular sales comparison explains the pattern.",
    },
    {
      question: "Does no-cost EMI really cost nothing?",
      answer:
        "Not necessarily. Banks may charge GST on the discounted interest component and a processing fee, and choosing EMI can make you ineligible for a flat instant discount. In our illustrative scenario, a full-card swipe with a ₹3,000 instant discount worked out cheaper than a no-cost EMI that kept the discount off the table.",
    },
    {
      question: "How do I know if a bank offer applied?",
      answer:
        "The payment page must show a separate discount line before you click Pay. If the line is missing after you select a card or EMI, the offer has not applied — do not assume it will be adjusted later.",
    },
  ],
  editorialNote:
    "First published 18 Oct 2026. Research reviewed 24 Nov 2026. Bank slabs, exchange values and coupon eligibility change constantly — the payment summary is the only source of truth for what you actually pay. We do not fabricate codes or claim a discount we have not seen accepted at checkout.",
  sources: [],
};
