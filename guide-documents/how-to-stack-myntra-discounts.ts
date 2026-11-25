import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "how-to-stack-myntra-discounts",
  url: "https://durza.in/guides/how-to-stack-myntra-discounts",
  title: "How to Stack Myntra Discounts: Coupons, Bank Offers & Insider Tips (2026)",
  description:
    "A practical, order-of-operations guide to combining Myntra coupons, bank-card discounts, rewards and exchange offers — with a worked example and a stacking table.",
  researchReviewedDate: null,
  evidenceBadges: [],
  audience: {
    bestFor: [
      "Shoppers who buy from Myntra a few times a year and want a repeatable method rather than a list of codes that may have expired.",
    ],
    skipIf: [],
  },
  byline: {
    author: "Durza Editorial",
    role: "Senior software engineer · 8+ years in technology",
    published: "18 Oct 2026",
    updated: "14 Nov 2026",
    factsChecked: "19 Oct 2026",
    bio: "Harsh builds and audits data-driven products. On Durza he reviews the research method, the comparison logic and the numbers behind each recommendation — so a verdict is something you can check, not just something you are told.",
    methodHref: "/methodology",
  },
  quickAnswer: {
    question: "The short answer",
    answer:
      "You can reliably stack a sale price, one coupon code, a bank instant discount and rewards. The order that matters is sale price first, then the best single code, then the bank offer at payment, then rewards on the final amount.",
    jumpHref: "#how-myntras-discount-layers-work",
    jumpLabel: "How Myntra's discount layers work",
  },
  ctas: [],
  methodNote:
    "The stacking order reflects how Myntra applies each discount in practice: listed price, then code, then payment-page bank offer, then post-purchase rewards. The worked example is illustrative arithmetic, not a live offer.",
  scenarios: null,
  skuTable: {
    headers: ["Offer type", "Typical benefit", "How to claim it", "Common catch"],
    rows: [
      ["Bank instant discount", "5-15% off, capped", "Select the bank at the payment page", "Minimum spend; may exclude sale items"],
      ["No-cost EMI", "Split a large order interest-free", "Choose EMI at checkout", "Processing or convenience fee may apply"],
      ["Wallet cashback", "Flat or percentage cashback", "Pay with the wallet", "Cashback credited after delivery"],
      ["Rewards card", "Points or cashback on the final amount", "Pay with a rewards card", "Reward rate varies by card tier"],
    ],
  },
  checkoutSteps: [
    "Start with the sale price. Browse the clearance, end-of-season and festive sale pages so the base price is already reduced before you add anything else.",
    "Add to cart and check whether the item is already covered by an automatic deal. Some listings show the discounted price without needing a code.",
    "Apply exactly one promo code. Choose the code with the best effective saving for your cart value, not the one with the largest advertised percentage.",
    "Proceed to payment and look for the bank offer block. Select your card network or bank if an instant discount is available, and make sure you meet the minimum spend.",
    "Pay with a rewards card or a cashback card to earn on the final amount. The instant discount is already reflected, so you are earning on the reduced total.",
    "If you are buying a big-ticket item, check for no-cost EMI and any exchange offer before you finalise the payment method.",
  ],
  checkoutNote: null,
  verifiedFacts: null,
  verificationParagraph: null,
  verificationNotes: null,
  exploreLinks: [
    { href: "/stores/myntra", label: "Myntra coupons & offers" },
    { href: "/categories/fashion", label: "Fashion deals" },
  ],
  faqs: [
    {
      question: "Can I use two Myntra coupon codes together?",
      answer:
        "No. Myntra allows one promo code per order. Pick the code that gives the best saving on your final cart value, then rely on bank offers and rewards for the rest.",
    },
    {
      question: "Do bank offers work on items already on sale?",
      answer:
        "Often, but not always. Some bank instant discounts exclude already-discounted or clearance items. Check the offer's terms on the payment page before you commit.",
    },
    {
      question: "Is a higher discount percentage always better?",
      answer:
        "No. A 40% code on a Rs 2,000 item saves Rs 800, while a Rs 1,000 off code on a Rs 6,000 item saves more. Compare the final payable amount, not the headline percentage.",
    },
    {
      question: "When is the best time to buy on Myntra?",
      answer:
        "The end-of-season sales and the big festive sales usually have the deepest markdowns. App-only prices and early access can add a little more, so compare the app and the website.",
    },
    {
      question: "Do rewards points count if I use a bank instant discount?",
      answer:
        "Yes. The instant discount reduces the amount you pay, and your rewards card then earns points or cashback on that reduced amount. You are not losing rewards by using the bank offer.",
    },
  ],
  editorialNote:
    "Prices and product features can change. Check the provider’s current terms before purchasing. Recommendations are editorial; paid placements are labeled.",
  sources: [],
};
