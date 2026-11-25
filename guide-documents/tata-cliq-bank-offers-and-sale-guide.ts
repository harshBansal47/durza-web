import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "tata-cliq-bank-offers-and-sale-guide",
  url: "https://durza.in/guides/tata-cliq-bank-offers-and-sale-guide",
  title: "Tata CLiQ Bank Offers & NeuCoins — A Cap Matrix That Says What Is Verified (2026)",
  description:
    "NeuCoins have a published rupee value and validity; most bank percentages and caps do not. Here is a matrix that separates the two, plus a calculator for the part you can actually compute.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Tata-group published reward rules", "Dated press release", "Original NeuCoins calculator", "Bank caps unverified"],
  audience: {
    bestFor: [
      "Shoppers with a Tata Neu-linked card or account who want to know the rupee value of NeuCoins before paying.",
      "Buyers comparing a CLiQ Fashion basket against CLiQ Luxe, where offer slabs and payment routes can differ.",
    ],
    skipIf: [
      "Anyone who wants a guaranteed bank discount percentage or cap — we could not verify one from an official Tata CLiQ page on 26 Nov 2026.",
      "Shoppers who assume NeuCoins are cash. They are rewards with validity rules and brand acceptance limits.",
      "Buyers who will pay with whatever card is in their pocket and ignore the checkout offer panel.",
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
    question: "What is a Tata NeuCoin worth, and how much will a Tata CLiQ bank offer actually save?",
    answer:
      "Tata-group pages we checked state 1 NeuCoin = ₹1 in savings and a validity of 365 days from issuance. That is the verified part. The bank part is not verified: older Durza copy quoted 10–15% instant discounts capped around ₹1,500–₹2,000 on rotating Kotak, HDFC, SBI, ICICI and Axis cards, plus codes TCFKOTAK, RBLTCF, BOBVISATCF and NEW400. None of those rates, caps or codes was confirmed on an official Tata CLiQ page on 26 Nov 2026. Use the cap matrix below as a checklist, then read your own checkout panel.",
    jumpHref: "#scenarios",
    jumpLabel: "See the cap matrix and calculator",
  },
  ctas: [
    {
      href: "/go/tatacliq-com-ecommerce-cps-india?src=guide&sub=guide_tata-cliq-bank-offers-and-sale-guide",
      label: "Check live Tata CLiQ offers",
      primary: true,
    },
    {
      href: "https://www.tataneu.com/creditcard/",
      label: "Read Tata Neu card terms",
    },
    {
      href: "https://www.tanishq.co.in/tata-neu.html",
      label: "Tata-group NeuCoins FAQ (value and validity)",
    },
  ],
  methodNote:
    "On 26 Nov 2026 we checked Tata-group pages that publish NeuCoin value and validity, the Tata Neu card page, an official press release carrying 2026 sale dates and Tata CLiQ's storefront. We did not sign in, hold a Tata Neu card, apply a code or place a test order. The calculator is our own arithmetic using the published ₹1-per-coin value and an earn rate you must supply from your own card terms.",
  scenarios: [
    {
      heading: "Cap matrix: verified versus unverified",
      body: "VERIFIED — NeuCoin value: 1 NeuCoin = ₹1 savings, stated by Tata-group pages including Tanishq's Tata Neu FAQ and neu.in. VERIFIED — validity: NeuCoins remain valid for 365 days from issuance (Tanishq FAQ). VERIFIED — acceptance: redeemable across participating Tata brands including Tata CLiQ, Croma, BigBasket, 1mg and Westside. UNVERIFIED — bank instant-discount percentage, minimum spend, maximum cap and excluded payment modes on CLiQ Fashion or Luxe. UNVERIFIED — codes TCFKOTAK, RBLTCF, BOBVISATCF, NEW400 and 'first-order stacks with bank' claims from older Durza copy. UNVERIFIED — any NeuCoin earn rate for a specific card on a specific CLiQ slab. Read the checkout panel and your card's own terms for those.",
      icon: "laptop",
    },
    {
      heading: "Neu-points calculator you can actually use",
      body: "Formula: coins earned = eligible cart value × your card's earn rate (as a decimal). Rupee value = coins × ₹1. Example A, purely illustrative at 1%: ₹8,000 cart → 80 coins → ₹80 value. Example B at 5%: ₹8,000 → 400 coins → ₹400 value. We are NOT asserting that any card earns 1% or 5% on CLiQ — supply the rate from your own Tata Neu card terms. Then subtract the value from the final payable only if the checkout actually lets you redeem the coins on that SKU.",
      icon: "cap",
    },
    {
      heading: "Why the bank discount is often the bigger lever",
      body: "If a bank offer of 10% up to a ₹1,500 cap were live (unverified — do not assume it), a ₹12,000 cart would get ₹1,200, while a 1% NeuCoin earn would be worth ₹120. On a ₹20,000 cart the hypothetical 10% would be capped at ₹1,500 while a 1% earn would be ₹200. The cap is the number that matters, and it must be read from the offer terms in your cart, not from a guide.",
      icon: "gamepad",
    },
    {
      heading: "Fashion versus Luxe are different slabs",
      body: "Older Durza copy said Luxe carries premium brands with Luxe-exclusive bank offers that do not cross over to standard CLiQ. We could not verify that exclusivity from an official page on 26 Nov 2026. Treat it as a reason to check both carts separately, not as a stated rule.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Benefit line", "What is verified (26 Nov 2026)", "What remains unverified", "Source to check yourself"],
    rows: [
      [
        "NeuCoin rupee value",
        "1 NeuCoin = ₹1 savings, stated on Tata-group pages",
        "Whether a specific checkout lets you redeem every coin on every SKU",
        "https://www.tanishq.co.in/tata-neu.html",
      ],
      [
        "NeuCoin validity",
        "365 days from issuance, stated in the Tata-group FAQ",
        "Any change to expiry after the date you read this guide",
        "https://www.tanishq.co.in/tata-neu.html",
      ],
      [
        "NeuCoin earn rate on CLiQ",
        "Nothing verified by Durza on 26 Nov 2026",
        "The rate, cap and eligible categories for your specific card",
        "Your Tata Neu card terms and the app",
      ],
      [
        "Bank instant discount on CLiQ Fashion",
        "Nothing verified by Durza on 26 Nov 2026",
        "Percentage, floor, cap, card list, exclusions, dates",
        "Checkout bank-offer panel",
      ],
      [
        "Bank instant discount on CLiQ Luxe",
        "Nothing verified by Durza on 26 Nov 2026",
        "Whether Luxe offers differ from or overlap standard CLiQ",
        "Checkout bank-offer panel on the Luxe cart",
      ],
      [
        "Codes TCFKOTAK / RBLTCF / BOBVISATCF / NEW400",
        "Nothing verified by Durza on 26 Nov 2026",
        "Whether any code is live, applicable or stackable",
        "Checkout coupon panel",
      ],
    ],
  },
  checkoutSteps: [
    "Sign in with the Tata Neu identity you actually use, and let the rewards balance load before you apply anything.",
    "Build the cart on the correct surface — standard CLiQ or CLiQ Luxe — because offer panels can differ.",
    "Read the bank-offer panel with your intended card selected. Record the percentage, minimum spend, cap and excluded payment modes; do not rely on a remembered rate.",
    "Apply any code shown in the panel and verify the discount line changes before you proceed.",
    "Run the NeuCoins calculator with your own card's earn rate, then confirm whether redemption is available on this cart and whether it stacks with the bank discount.",
    "Screenshot the final payable amount. If the bank discount is applied post-payment rather than at checkout, record that distinction — it changes your cash-flow planning.",
  ],
  checkoutNote:
    "This guide deliberately does not quote a bank percentage or cap. Older Durza copy contained such figures, but none was verified from an official Tata CLiQ page on 26 Nov 2026. The checkout panel and your card terms are authoritative.",
  verifiedFacts: {
    kicker: "Tata CLiQ & Neu · checked 26 Nov 2026",
    title: "Verified reward facts and the gaps around them",
    facts: [
      {
        label: "1 NeuCoin = ₹1 savings, according to Tata-group pages.",
        detail:
          "Tanishq's Tata Neu FAQ and the Tata Neu site both state the one-rupee value. This is a published reward value, not a cash-out guarantee.",
        href: "https://www.tanishq.co.in/tata-neu.html",
      },
      {
        label: "NeuCoins are stated to be valid for 365 days.",
        detail:
          "The Tanishq FAQ says NeuCoins remain valid for 365 days from issuance. Durza did not verify the expiry rule for a specific card issuance after that date.",
        href: "https://www.tanishq.co.in/tata-neu.html",
      },
      {
        label: "Tata CLiQ is a participating redemption brand.",
        detail:
          "The same FAQ lists Tata CLiQ alongside Tata 1mg, BigBasket, Croma, Westside and others as participating brands for NeuCoin redemption.",
        href: "https://www.tanishq.co.in/tata-neu.html",
      },
      {
        label: "Tata CLiQ published 2026 sale dates through a press release.",
        detail:
          "The Big CLiQ Sale was announced for 14–31 May 2026 across Tata CLiQ Fashion, Luxury and Palette. This establishes that CLiQ does publish dated sale windows; it says nothing about bank-offer caps.",
        href: "https://www.businesswireindia.com/every-cliq-is-more-rewarding-at-the-big-cliq-sale-on-tata-cliq-tata-cliq-luxury-and-tata-cliq-palette-90045.html",
      },
      {
        label: "The bank figures in older Durza copy failed verification.",
        detail:
          "The prior guide stated 10–15% instant discounts capped around ₹1,500–₹2,000 and named rotating banks and codes. No official page we could read on 26 Nov 2026 confirmed any of those numbers, so this guide does not carry them forward as fact.",
        href: null,
      },
    ],
    note: "We did not sign in to Tata CLiQ, hold a Tata Neu card or place a test order. The calculator is arithmetic on a published coin value with a user-supplied earn rate.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "On 26 Nov 2026 we checked Tata-group pages publishing NeuCoin value and validity, the Tata Neu card page, an official press release with 2026 sale dates and Tata CLiQ's storefront. The one-rupee coin value and 365-day validity are store-group published facts; the calculator is our arithmetic. We could not verify any bank-card percentage, cap, code or stacking rule from an official Tata CLiQ page on this date and we did not place a test order. Where verification failed, this guide says so rather than repeating legacy numbers. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "NeuCoins are rewards worth ₹1 each per Tata-group pages, not cash and not a guaranteed discount on every SKU.",
    "Validity is stated as 365 days from issuance; check the app for the expiry of your own coins.",
    "No bank percentage, minimum spend or cap was verified — the checkout panel decides.",
    "Do not assume first-order offers stack with bank offers; check the cart.",
    "CLiQ Fashion and CLiQ Luxe can have different offer sets; compare the final payable, not the headline.",
  ],
  exploreLinks: [
    { href: "/stores/tatacliq-com-ecommerce-cps-india", label: "Tata CLiQ store hub" },
    { href: "/guides/sale-calendar-india-eors-pink-friday-2026", label: "India sale calendar 2026" },
    { href: "/guides/best-credit-cards-for-electronics-india", label: "Credit cards for electronics in India" },
    { href: "/guides/how-durza-verifies-offers-methodology-2026", label: "How Durza verifies offers" },
  ],
  faqs: [
    {
      question: "Which bank gives the deepest Tata CLiQ discount?",
      answer:
        "We cannot say. Older Durza copy named Kotak and HDFC first, with SBI and ICICI trailing and Axis on big days, but no official page we could read on 26 Nov 2026 confirmed a ranking, a percentage or a cap. Select your card in the checkout panel and read the live offer.",
    },
    {
      question: "What is a NeuCoin worth?",
      answer:
        "Tata-group pages state 1 NeuCoin = ₹1 in savings and 365-day validity from issuance. Whether you can redeem them on a specific CLiQ SKU is a checkout-level question.",
    },
    {
      question: "Do TCFKOTAK, RBLTCF, BOBVISATCF or NEW400 work?",
      answer:
        "Unverified. Those codes appeared in an older Durza audit entry, but we found no official confirmation on 26 Nov 2026. Do not build a purchase around them.",
    },
    {
      question: "How do I calculate the value of my NeuCoins?",
      answer:
        "Multiply your eligible cart value by your card's stated earn rate to get coins, then multiply by ₹1. For example at 1% on ₹8,000 you get 80 coins worth ₹80; at 5% you get 400 coins worth ₹400. Those rates are illustrations only — get the real rate from your card terms.",
    },
    {
      question: "Do bank offers apply retroactively?",
      answer:
        "We did not verify a rule either way. The safe practice is to confirm the discount line before paying and keep a screenshot of the final payable amount.",
    },
    {
      question: "Did Durza place a test order or sign in?",
      answer:
        "No. We checked public pages on 26 Nov 2026 only. All reward figures quoted are from published Tata-group pages; all bank figures from older copy are explicitly left unverified.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Original contribution: a bank cap matrix that explicitly separates verified reward rules from unverified bank terms, plus a NeuCoins calculator using the published ₹1 coin value. No bank percentage or code is asserted. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Tata-group NeuCoins FAQ (value and 365-day validity)",
      href: "https://www.tanishq.co.in/tata-neu.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Tata Neu home — rewards platform",
      href: "https://www.tataneu.com/",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Tata Neu HDFC Bank credit card page",
      href: "https://www.tataneu.com/creditcard/",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Tata CLiQ Big CLiQ Sale 2026 press release",
      href: "https://www.businesswireindia.com/every-cliq-is-more-rewarding-at-the-big-cliq-sale-on-tata-cliq-tata-cliq-luxury-and-tata-cliq-palette-90045.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Tata CLiQ storefront",
      href: "https://www.tatacliq.com",
      checkedAt: "26 Nov 2026",
    },
  ],
};
