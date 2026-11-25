import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "boult-audio-earbuds-anc-codes-guide",
  url: "https://durza.in/guides/boult-audio-earbuds-anc-codes-guide",
  title: "Boult Audio Buying Guide (2026): How to Check Deals, Specs and Warranty",
  description:
    "A practical guide to buying Boult headphones and earbuds in India: check the exact model, confirm ANC/ENC claims, compare final price, and verify warranty/return terms before paying. Checked 26 Nov 2026.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official store checked", "No promo codes claimed without checkout proof"],
  audience: {
    bestFor: [
      "Shoppers comparing Boult earbuds, neckbands or headphones and want to verify specs before buying.",
      "Buyers who want to check whether a Boult discount is real after delivery, warranty and return terms are considered.",
    ],
    skipIf: [
      "You need lab-tested audio measurements or independent ANC benchmarks — this guide uses official product-page and policy checks, not hands-on testing.",
      "You want a guaranteed working coupon code; Durza does not publish a code as active unless it is verified at checkout.",
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
    question: "How should you evaluate a Boult Audio deal?",
    answer:
      "Start with the exact model name on GoBoult's official product page, not just the discount banner. Confirm whether the product claims ANC or ENC, check the current price/MRP on the page, and read warranty, replacement and shipping terms before paying. If a coupon code is shown elsewhere, treat it as unverified until the checkout accepts it.",
    jumpHref: "#checklist",
    jumpLabel: "See the buying checklist",
  },
  ctas: [
    {
      href: "/go/boult?src=guide&sub=guide_boult-audio-earbuds-anc-codes-guide",
      label: "Check Boult official store",
      primary: true,
    },
    { href: "/stores/boult", label: "Boult store hub on Durza" },
  ],
  methodNote:
    "We checked GoBoult's official product and terms pages on 26 Nov 2026. We did not test audio quality, ANC performance, battery life, or mic quality. Prices, promotions and stock change on the merchant side; the checkout page is the source of truth.",
  scenarios: [
    {
      heading: "Commute / calls: check mic and noise claims carefully",
      body: "Look for the exact wording on the product page: ANC, ENC, Zen Mode ENC, or mic noise reduction are not the same thing. If calls matter, check mic specs, return window and real user reviews before relying on a marketing claim.",
      icon: null,
    },
    {
      heading: "Workout / travel: check fit, battery and ingress rating",
      body: "Confirm battery claims, charging port, water/sweat resistance rating, and fit style for the exact model. A listing image or series name is not enough to confirm the right variant.",
      icon: null,
    },
    {
      heading: "Deal hunting: compare final payable, not just MRP",
      body: "Boult pages often show MRP and a discounted price. Compare the final payable amount on the official store and other authorised sellers, and factor in shipping, replacement terms and warranty support.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["What to check", "Why it matters", "Where to verify"],
    rows: [
      ["Exact model name", "Boult models have similar names; specs vary by model", "Official GoBoult product page"],
      ["ANC vs ENC wording", "Active noise cancellation and environmental noise cancellation are different claims", "Product specs/FAQ on the exact model page"],
      ["Price, MRP, taxes", "Large MRP drops are common; final payable is what matters", "Product page and checkout"],
      ["Battery and charging", "Playback claims can vary by mode (ANC on/off, volume)", "Official spec sheet on product page"],
      ["Warranty and replacement", "Replacement/refund eligibility depends on policy conditions", "GoBoult terms and warranty pages"],
      ["Coupon/offer", "Codes may be expired, SKU-specific or minimum-cart dependent", "Checkout page before payment"],
    ],
  },
  checkoutSteps: [
    "Open the exact GoBoult product page for the model you want and confirm the specs, not just the collection banner.",
    "Check the price shown on the product page, including taxes and any extra-offer label, then confirm the final amount in cart.",
    "If you have a coupon code from any source, test it in checkout; if the cart does not accept it, do not count the saving.",
    "Read replacement, warranty and shipping terms before paying, especially for time-sensitive gifts or travel purchases.",
    "Save the order confirmation, invoice and warranty/registration details after purchase.",
  ],
  checkoutNote:
    "Durza does not claim a Boult coupon code is active unless it has been verified in checkout. Offer codes and prices can change without notice.",
  verifiedFacts: {
    kicker: "Official page checks · checked 26 Nov 2026",
    title: "What we could verify from GoBoult pages",
    facts: [
      {
        label: "Anchor listing showed a dated price and MRP",
        detail:
          "On 26 Nov 2026, GoBoult's Anchor product page showed ₹2,399 with extra offer / ₹2,499, MRP ₹9,999, marked 75% off and inclusive of taxes. Treat this as a dated listing snapshot, not a live guarantee.",
        href: "https://goboult.co.in/products/probass-anchor-over-ear-bluetooth-headphone-with-mic",
      },
      {
        label: "Anchor page contained mixed noise-cancellation wording",
        detail:
          "The same Anchor page marketed ANC and a dedicated ANC switch, while the specifications section listed \"Zen™ Mode Environmental Noise Cancellation\". Verify the exact claim on the model page before buying for ANC specifically.",
        href: "https://goboult.co.in/products/probass-anchor-over-ear-bluetooth-headphone-with-mic",
      },
      {
        label: "Replacement policy has conditions and a 72-hour window",
        detail:
          "GoBoult's terms page states replacement can be provided if informed within 72 hours of receipt under listed conditions (wrong/damaged product, documentary evidence), and says products purchased from the website are not eligible for a refund. Read the full terms for current conditions.",
        href: "https://goboult.co.in/pages/terms-and-conditions",
      },
    ],
    note: "These are dated official-page observations, not product tests or purchase experiences.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked GoBoult's official Anchor product page and Terms and Conditions page on 26 Nov 2026. We did not buy, test, or compare audio performance for Boult products. Promotional pricing, coupon eligibility, stock, and policy details can change; confirm the final checkout and current policy pages before purchasing.",
  verificationNotes: [
    "No Boult coupon code is claimed as active in this guide.",
    "ANC/ENC/performance claims should be verified on the exact model page; marketing and spec blocks can differ.",
    "Large MRP discounts should be compared against final payable price and return/warranty terms, not treated as a guaranteed saving.",
  ],
  exploreLinks: [
    { href: "/stores/boult", label: "Boult store hub on Durza" },
    { href: "/guides/how-durza-verifies-offers-methodology-2026", label: "How Durza verifies offers" },
    { href: "/guides/amazon-flipkart-sale-dates-2026", label: "Amazon & Flipkart sale dates 2026" },
  ],
  faqs: [
    {
      question: "Does Durza have a working Boult coupon code?",
      answer:
        "Not in this guide. We do not list a Boult code as active unless it has been verified in checkout. If you find a code elsewhere, test it in the cart and only count the saving if the checkout accepts it for your exact model.",
    },
    {
      question: "Is ANC the same as ENC on Boult products?",
      answer:
        "No. ANC (active noise cancellation) and ENC (environmental noise cancellation, usually for calls) are different claims. Check the exact model's product page carefully because marketing text and spec sections can use different wording.",
    },
    {
      question: "Should I buy Boult from the official site or a marketplace?",
      answer:
        "Compare the final payable price, delivery date, seller authenticity, warranty support and replacement/return terms. The official site can be useful for direct policy clarity, while marketplaces may have different pricing or delivery options. Check the exact model and seller before paying.",
    },
  ],
  editorialNote:
    "Checked 26 Nov 2026 against official GoBoult pages. Prices, promotions, specs and policies can change. Durza may earn a commission through tracked links at no extra cost to you.",
  sources: [
    {
      label: "GoBoult Anchor product page",
      href: "https://goboult.co.in/products/probass-anchor-over-ear-bluetooth-headphone-with-mic",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "GoBoult Terms and Conditions",
      href: "https://goboult.co.in/pages/terms-and-conditions",
      checkedAt: "26 Nov 2026",
    },
  ],
};
