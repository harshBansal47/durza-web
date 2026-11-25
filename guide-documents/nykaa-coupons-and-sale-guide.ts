import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "nykaa-coupons-and-sale-guide",
  url: "https://durza.in/guides/nykaa-coupons-and-sale-guide",
  title: "Nykaa Coupons & Pink Friday — A Revealed-Price Ledger (2026)",
  description:
    "Nykaa's real levers are the price slab, the bank panel and rewards — not search-engine coupon codes. Here is a dated ledger of what the store actually showed, and why a revealed price is not a payable one.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Store-direct price reveal", "Dated checkout snapshot", "No code claims", "Original reveal arithmetic"],
  audience: {
    bestFor: [
      "Beauty shoppers building a stock-up basket around a sale slab rather than chasing a coupon code.",
      "Buyers who want to compare a 'Pink Friday Sale Price' label against the price on the same page today.",
    ],
    skipIf: [
      "Anyone expecting a verified list of working coupon codes — our 26 Nov 2026 check found no public category codes we could confirm on Nykaa's own pages.",
      "Shoppers who want a guaranteed lowest price. Sale labels, bank offers and reward rules change, and revealed prices are not payable until the sale opens.",
      "People buying sunscreen or actives purely on a discount — check formulation and expiry before the price.",
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
    question: "Are there working NYKAA coupon codes, and are the Pink Friday revealed prices real?",
    answer:
      "We could not verify any public coupon code on Nykaa's own pages on 26 Nov 2026. What we could verify are 'Pink Friday Sale Price' labels on an official Nykaa price-reveal page: the L'Oréal Telescopic mascara showed ₹1,099 regular and ₹824 as a revealed sale price (25% off), and Maybelline Lifter Gloss showed ₹799 regular, ₹719 current and ₹559 revealed (30% off regular, about 22% below current). Those are reveals, not payable prices. Nykaa's footer states free shipping on orders of ₹299 and above and a 15-day return policy; any bank percentage or cap must be read from the live checkout panel.",
    jumpHref: "#scenarios",
    jumpLabel: "See the reveal ledger",
  },
  ctas: [
    {
      href: "/go/nykaa?src=guide&sub=guide_nykaa-coupons-and-sale-guide",
      label: "Check live Nykaa prices and offers",
      primary: true,
    },
    {
      href: "https://www.nykaa.com/price-reveal-new-drops-pink-summer-sale-2026/c/100798",
      label: "Read Nykaa's own price-reveal page",
    },
    {
      href: "https://www.nykaa.com/sp/offers-native/offers?utm_source=Desktop_web_footer",
      label: "Open Nykaa's Offer Zone",
    },
  ],
  methodNote:
    "On 26 Nov 2026 we read Nykaa's storefront, its official price-reveal category page and the policies stated in its footer. The discount percentages in the reveal ledger are our arithmetic on those published figures. We did not sign in, apply a coupon, place a test order or verify any bank-card term.",
  scenarios: [
    {
      heading: "What a 'Pink Friday Sale Price' label actually means",
      body: "On the official price-reveal page checked 26 Nov 2026, L'Oréal Paris Telescopic Extensionist Waterproof Mascara showed 'Price ₹1099' and a 'Pink Friday Sale Price ₹824, 25% Off'. The page also said 'Last Updated: November 25, 2026'. This is a published reveal of an intended sale price, not evidence that ₹824 was payable on 26 Nov 2026. Verify the amount on the product page when the sale is live.",
      icon: "cap",
    },
    {
      heading: "Reveal versus current price: the Lifter Gloss example",
      body: "Nykaa's page showed Maybelline Lifter Gloss at regular ₹799, discounted ₹719 (10% off) and a revealed Pink Friday price of ₹559 (30% off regular). By our arithmetic ₹559 is ₹160 below the ₹719 current price, or about 22.3% lower. The extra saving against current price is smaller than the 30% headline because the headline is measured against MRP.",
      icon: "laptop",
    },
    {
      heading: "Stock-up logic beats code hunting",
      body: "The same reveal page carried ₹1,099 → ₹824 on masks, ₹799 → ₹559 on lip gloss, ₹9600 → ₹7680 on a Versace fragrance, ₹1200 → ₹1080 on a Q+A moisturiser and ₹429 → ₹275 on a Maybelline BB skin tint. Low-expiry-risk repeats (makeup remover, fragrance, cleansers) are easier to stock up on than yearly reformulations such as sunscreen or actives.",
      icon: "gamepad",
    },
    {
      heading: "Where the bank lever sits",
      body: "Older Durza copy said 'typically 10% off, capped' on HDFC/ICICI/Kotak cards and that Nykaa Prive cashback does not apply to sale items. We could not verify any of those percentages, caps or stacking rules from an official Nykaa page on 26 Nov 2026. Check the bank-offer panel in your own cart: it is card-specific, account-specific and date-specific.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["SKU on Nykaa's reveal page", "Regular / current (as shown)", "Revealed Pink Friday price", "Our arithmetic"],
    rows: [
      [
        "L'Oréal Paris Telescopic Extensionist Waterproof Mascara",
        "₹1,099 regular",
        "₹824 (25% off shown)",
        "₹275 below regular; exactly 25.02% by our calculation on the published figures.",
      ],
      [
        "Maybelline New York Lifter Gloss",
        "₹799 regular / ₹719 current (10% off)",
        "₹559 (30% off shown)",
        "₹240 below regular, ₹160 below current; about 22.3% below the ₹719 current price.",
      ],
      [
        "Versace Crystal Emerald Pour Femme Eau De Parfum",
        "₹9,600 regular / ₹9,120 current (5% off)",
        "₹7,680 (20% off shown)",
        "₹1,440 below current; the current price is already discounted, so read both lines.",
      ],
      [
        "Q+A Hyaluronic Acid Daily Moisturiser",
        "₹1,200",
        "₹1,080 (10% off shown)",
        "₹120 below the listed price; a small reveal, not a stock-up trigger on its own.",
      ],
      [
        "Maybelline New York Fit Me Glow BB Skin Tint SPF 50",
        "₹429 regular / ₹365 current (15% off)",
        "₹275 (36% off shown)",
        "₹90 below current; check the shade and expiry date before buying a skin tint on reveal.",
      ],
    ],
  },
  checkoutSteps: [
    "Open the product page, not the reveal category page. The reveal is a label; the product page is where a payable price appears when the offer goes live.",
    "Record both the regular price and the current price before the sale. A 30% reveal against MRP can be a much smaller cut against the current selling price.",
    "Apply any code only if the checkout panel accepts it. Durza verified no public code on 26 Nov 2026, so treat code lists elsewhere as leads, not terms.",
    "Check the bank-offer panel with the exact card you intend to use. We verified no rate, cap or exclusion, so do not assume 10% or any other figure.",
    "Confirm the free-shipping floor and return window in the footer before paying: Nykaa states free shipping on orders of ₹299 and above and a 15-day return policy on the page we checked.",
    "Screenshot the final payable amount after all reductions. Bank offers are applied at payment and are not guaranteed to be applied retroactively.",
  ],
  checkoutNote:
    "All figures are snapshots from the official Nykaa price-reveal page checked 26 Nov 2026, which said it was last updated 25 Nov 2026. Revealed prices are not live payable prices, and no coupon or bank-card term was verified on this recheck.",
  verifiedFacts: {
    kicker: "Nykaa · checked 26 Nov 2026",
    title: "What the store's own pages said",
    facts: [
      {
        label: "Pink Friday sale prices are displayed as reveals.",
        detail:
          "Nykaa's price-reveal category page showed 'Pink Friday Sale Price' alongside regular and current prices for multiple SKUs, and a footer note 'Last Updated: November 25, 2026'. It did not state a sale window.",
        href: "https://www.nykaa.com/price-reveal-new-drops-pink-summer-sale-2026/c/100798",
      },
      {
        label: "Free shipping starts at ₹299; returns are stated as 15 days.",
        detail:
          "The footer of the checked Nykaa page carried both statements. These are site-level policies as displayed on 26 Nov 2026, not guarantee of a specific order's eligibility.",
        href: "https://www.nykaa.com/",
      },
      {
        label: "An Offer Zone exists on the site.",
        detail:
          "Nykaa's own footer links to an Offer Zone page. We did not find a public coupon code listed there that we could confirm as applicable to a general beauty cart.",
        href: "https://www.nykaa.com/sp/offers-native/offers?utm_source=Desktop_web_footer",
      },
      {
        label: "The old '10% bank offer, capped' claim is unverified.",
        detail:
          "Earlier Durza copy asserted bank instant discounts of typically 10% on HDFC/ICICI/Kotak and that Prive cashback does not work on sale items. No official page readable on 26 Nov 2026 confirmed the rate, the cap or the stacking rule, so we do not repeat them as fact.",
        href: null,
      },
      {
        label: "Strike-through prices are reference points, not a price history.",
        detail:
          "The reveal page shows both regular and current prices for the same SKU — for example ₹799/₹719 on Lifter Gloss. Any saving must be measured against the number you could actually pay before the sale, not the larger of the two.",
        href: "https://www.nykaa.com/price-reveal-new-drops-pink-summer-sale-2026/c/100798",
      },
    ],
    note: "We did not sign in, apply a code or buy anything. All arithmetic is Durza's on figures published by Nykaa on the dated page.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked Nykaa's storefront, its official price-reveal category page and the policy statements in its footer on 26 Nov 2026. The reveal figures are store-published and our percentage calculations are original; they are not live quotes. We could not verify any coupon code, bank-card discount percentage, cap or reward-stacking rule from an official Nykaa page on this date, and we did not sign in or place a test order. Treat the checkout panel as the only authority for what you will pay. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "A revealed sale price is not a payable price; confirm it on the product page when the sale goes live.",
    "Percentage-off headlines on this page are measured against regular price, not the current discounted price.",
    "Free shipping at ₹299 and a 15-day return window are statements from the site footer on 26 Nov 2026 and can change.",
    "No bank offer, card exclusion or Nykaa Prive stacking rule was verified in this recheck.",
    "Stock up on low-expiry-risk items; avoid buying a sunscreen or active solely because its reveal looks large.",
  ],
  exploreLinks: [
    { href: "/stores/nykaa", label: "Nykaa store hub" },
    { href: "/guides/dot-and-key-skin-active-guide", label: "Dot & Key actives and patch testing guide" },
    { href: "/guides/sale-calendar-india-eors-pink-friday-2026", label: "India sale calendar: confirmed vs expected" },
    { href: "/guides/how-durza-verifies-offers-methodology-2026", label: "How Durza verifies offers" },
  ],
  faqs: [
    {
      question: "Which NYKAA coupon code actually works?",
      answer:
        "We cannot confirm one. Our 26 Nov 2026 audit found no public category code we could verify on Nykaa's own pages. Earlier Durza copy said codes were thin and that bank cards and sale slabs were the real lever; that directional claim still matches what the site showed, but no specific code is verified here.",
    },
    {
      question: "Is the Pink Friday sale live?",
      answer:
        "Nykaa's official price-reveal page showed 'Pink Friday Sale Price' labels but no dates when checked on 26 Nov 2026. Third-party sites disagree on the start date. Durza publishes expected dates only as expectations — check the live Nykaa site.",
    },
    {
      question: "How much will I really save on the Lifter Gloss reveal?",
      answer:
        "The page showed ₹799 regular, ₹719 current and a ₹559 revealed Pink Friday price. That is ₹240 below regular (30%) but ₹160 below current, about 22.3% by our arithmetic. The bigger headline is measured against MRP, which is not what you would pay today.",
    },
    {
      question: "Does Nykaa Prive cashback work on sale items?",
      answer:
        "We could not verify that rule on 26 Nov 2026. Older Durza copy said cashback redeems mainly on non-sale items; treat that as an unverified legacy claim and check the rewards panel in your own account.",
    },
    {
      question: "What is the free-shipping threshold?",
      answer:
        "The site footer we checked states free shipping on orders of ₹299 and above. This is a dated snapshot, not a guarantee for every order or sale period.",
    },
    {
      question: "Did Durza test the checkout?",
      answer:
        "No. We read public pages on 26 Nov 2026, did not sign in, apply codes or place an order, and did not verify any bank-card term.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Original contribution: a dated reveal ledger that separates regular price, current price and revealed sale price, with Durza's own arithmetic showing how much of a headline discount is genuinely incremental. No code or bank term is claimed as verified. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Nykaa official price-reveal page (Pink Friday labels)",
      href: "https://www.nykaa.com/price-reveal-new-drops-pink-summer-sale-2026/c/100798",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Nykaa storefront — footer shipping and returns policy",
      href: "https://www.nykaa.com/",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Nykaa Offer Zone",
      href: "https://www.nykaa.com/sp/offers-native/offers?utm_source=Desktop_web_footer",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Nykaa terms and conditions",
      href: "https://www.nykaa.com/terms-conditions/lp",
      checkedAt: "26 Nov 2026",
    },
  ],
};
