import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "how-to-save-on-amazon-india",
  url: "https://durza.in/guides/how-to-save-on-amazon-india",
  title: "How to Save on Amazon India (2026): A Practical Checkout Checklist",
  description:
    "A repeatable Amazon India savings checklist: compare deal price, check coupons, evaluate exchange, verify bank/card offers, and confirm the final checkout total before paying. Checked 26 Nov 2026.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Checkout checklist", "No live offer claimed"],
  audience: {
    bestFor: [
      "Shoppers who want a repeatable way to check Amazon India savings before buying.",
      "Buyers comparing coupons, exchange, and bank offers on the same order.",
    ],
    skipIf: [
      "You want guaranteed live coupon/bank offers; verify them on the product and checkout pages.",
      "You need price-history tooling inside this guide — use it as a checkout decision process.",
    ],
  },
  byline: {
    author: "Harsh Bansal",
    role: "Senior software engineer · 8+ years in technology",
    published: "18 Oct 2026",
    updated: "26 Nov 2026",
    factsChecked: "26 Nov 2026",
    bio: "Harsh builds and audits data-driven products. On Durza he reviews the research method, the comparison logic and the numbers behind each recommendation — so a verdict is something you can check, not just something you are told.",
    methodHref: "/methodology",
  },
  quickAnswer: {
    question: "What is the best order to check Amazon India savings?",
    answer:
      "Start with the exact product and seller, then check the deal price, apply any visible coupon, evaluate exchange value separately, and finally test bank/card offers in checkout. Only count savings that appear in the final payable amount. A discount is not real until checkout confirms it for your cart.",
    jumpHref: "#checklist",
    jumpLabel: "See the checkout checklist",
  },
  ctas: [
    { href: "/stores/amazon-in", label: "Amazon India store hub", primary: true },
    { href: "/guides/amazon-flipkart-sale-dates-2026", label: "Amazon & Flipkart sale dates 2026" },
  ],
  methodNote:
    "This guide is a verification process, not a live deal feed. We did not verify live coupons, exchange values, or bank-offer eligibility. Amazon prices, seller stock, and offer terms can change quickly; confirm the final checkout before paying.",
  scenarios: [
    {
      heading: "Regular purchase: check seller and final price",
      body: "Before chasing offers, confirm the exact product, variant, seller, delivery date and return policy. A low price from the wrong seller or variant is not a saving.",
      icon: null,
    },
    {
      heading: "Coupon + bank offer: verify stacking",
      body: "Some coupons apply automatically, others need clipping. Bank offers may have minimum spend, caps, eligible cards, or category exclusions. Test the full combination in checkout.",
      icon: null,
    },
    {
      heading: "Exchange: treat as a separate trade-off",
      body: "Exchange can reduce upfront cost, but it depends on device condition, eligibility, and pickup/verification. Compare the exchange-adjusted effective price against selling separately only if you have a realistic alternative value.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Saving lever", "What to check", "Common caveat"],
    rows: [
      ["Deal/listing price", "Exact variant, seller, delivery, return policy", "Price can change or vary by seller"],
      ["Coupon", "Whether it is clipped/applied and eligible for your cart", "May be account-, product-, or quantity-specific"],
      ["Exchange", "Eligible model, condition questions, pickup terms", "Final value can be reduced after inspection"],
      ["Bank/card offer", "Min spend, cap, eligible cards, instant/cashback timing", "May not stack or may apply only on certain payment modes"],
      ["No-cost EMI/fees", "Total payable amount, processing fees, interest terms", "Low monthly payment can hide higher total cost"],
    ],
  },
  checkoutSteps: [
    "Confirm the exact Amazon product, variant, seller, price, delivery date and return policy.",
    "Check for a coupon on the product page and confirm it is applied in cart.",
    "If using exchange, enter accurate device details and review the exchange terms before relying on the value.",
    "On the payment page, check eligible bank/card offers and confirm the discount type, cap and minimum spend.",
    "Confirm the final payable amount in checkout before paying; save the order/offer confirmation.",
  ],
  checkoutNote:
    "Durza does not claim Amazon coupons, exchange values, or bank offers as active unless verified in the relevant checkout flow. The final payment screen is the source of truth.",
  verifiedFacts: null,
  verificationParagraph:
    "This page was editorially reviewed on 26 Nov 2026. It provides a checkout verification process, not live offer claims. We did not verify live Amazon coupons, exchange values, or bank/card eligibility. Confirm the final product, seller, and checkout total on Amazon India before purchasing.",
  verificationNotes: [
    "No Amazon coupon, exchange value, or bank offer is claimed as active in this guide.",
    "Offer eligibility can vary by account, product, seller, card, and payment method.",
    "Check the total payable amount, not just the headline discount.",
  ],
  exploreLinks: [
    { href: "/stores/amazon-in", label: "Amazon India store hub" },
    { href: "/guides/amazon-flipkart-sale-dates-2026", label: "Amazon & Flipkart sale dates 2026" },
    { href: "/guides/how-durza-verifies-offers-methodology-2026", label: "How Durza verifies offers" },
  ],
  faqs: [
    {
      question: "Should I apply coupon or bank offer first on Amazon?",
      answer:
        "Check them in the order Amazon's checkout applies them, but evaluate the final payable total. Some offers stack, some don't, and some have caps or minimum spend. The final payment screen is what matters.",
    },
    {
      question: "Is Amazon exchange always worth it?",
      answer:
        "Not always. Exchange reduces upfront cost, but the value depends on condition, eligibility and inspection. Compare the exchange-adjusted price against your realistic alternative before deciding.",
    },
    {
      question: "Why did a bank offer not apply at checkout?",
      answer:
        "Common reasons include ineligible card, minimum spend not met, cap exhausted, wrong payment mode, excluded category/product, or offer expiry. Check the offer terms on the product/payment page and confirm in checkout.",
    },
  ],
  editorialNote:
    "Editorially reviewed 26 Nov 2026. This is a process guide; live prices and offers can change. Durza may earn a commission through tracked links at no extra cost to you.",
  sources: [],
};
