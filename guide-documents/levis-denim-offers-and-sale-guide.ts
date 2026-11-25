import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "levis-denim-offers-and-sale-guide",
  url: "https://durza.in/guides/levis-denim-offers-and-sale-guide",
  title: "Levi's India — 501 vs 511 Sizing, Shrink & Sale Math (2026)",
  description:
    "Levi's India fit families, waist-inches sizing, the live cart-tier offers — and a clear note on the shrink and price claims we could not verify.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official India catalogue", "Observed cart tiers", "No wash tests"],
  audience: {
    bestFor: [
      "Indian shoppers choosing between Levi's 501 Original Straight, 511 Slim, 512 Slim Tapered and the relaxed fits, who want a decision they can check on the official site.",
      "Buyers comparing the brand site's tiered cart offers with the final payable amount on a marketplace before paying.",
    ],
    skipIf: [
      "Anyone relying on the 2–3% shrink figure or the ₹2,699/₹3,049 price slabs printed in older Durza copy — we could not verify either.",
      "Shoppers after Levi's Vintage Clothing or selvedge runs; those are not part of the mainstream India catalogue we checked.",
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
    question: "Which Levi's fit should I buy, and do the old sale prices and shrink numbers still hold?",
    answer:
      "The official India store lists 501 Original Straight, 511 Slim and 512 Slim Tapered as separate fit families — choose by waist in inches and how much thigh room you want, not by the M/L/XL on a sale sticker. On 26 Nov 2026 the site showed cart tiers of 10% off at ₹3,299 and 15% off at ₹4,699, plus an 'Extra 10% Off on New Arrivals' banner. The LEVIS1000 code, the ₹2,699/₹3,049 slabs and the 2–3% shrink percentage in earlier Durza copy were NOT verified — treat them as unconfirmed and read the live checkout panel.",
    jumpHref: "#scenarios",
    jumpLabel: "See the fit matrix",
  },
  ctas: [
    {
      href: "/go/levis?src=guide&sub=guide_levis-denim-offers-and-sale-guide",
      label: "Check live Levi's India offers",
      primary: true,
    },
    { href: "/go/amazon-in?src=guide-levis", label: "Compare Levi's prices on Amazon India" },
    { href: "https://www.levi.in", label: "Open the official Levi's India store" },
  ],
  methodNote:
    "We read the official Levi's India catalogue navigation, fit-family listing, cart-tier banners and blog index on 26 Nov 2026. We did not purchase, measure or wash-test any pair. Fit descriptions below are our reading of the cut names on the site; shrink percentages, MRP slabs and the LEVIS1000 code from older copy remain unverified.",
  scenarios: [
    {
      heading: "501 Original Straight — the straight-leg reference",
      body: "Listed by Levi's India under Jeans by Style as '501 Original Straight Fit' and under Straight in the fit filter. Our editorial read: a straight leg from knee to hem with more thigh room than the 511. If you are between fits and want one pair that works with both a tee and a tucked shirt, start here. The old guide's 'button-fly at ₹2,699' claim is not verified on the live catalogue — check the exact SKU page.",
      icon: null,
    },
    {
      heading: "511 Slim and 512 Slim Tapered — two different slim cuts",
      body: "Both appear as separate styles in the official India navigation. The 511 is the slim fit; the 512 is the slim tapered fit, so the 512 narrows more below the knee. If your calves or ankles dislike a tight hem, the 511 is the safer slim. If you want a cleaner line over sneakers, the 512 is the one to try — but try both in your true waist before choosing.",
      icon: null,
    },
    {
      heading: "Relaxed options: 555, 568, 578 and 550",
      body: "The site also lists 555 Relaxed, 568 Loose, 578 Baggy and 550 Relaxed, plus 505 Straight and 541 Athletic Tapered. This matters in India because a 'slim' label from a global size chart often reads differently on an Indian build. We have not measured the rise or thigh on any of these — use the on-site size guide and the fit filter rather than trusting a generic size label.",
      icon: null,
    },
    {
      heading: "Shrink and care — what we can honestly say",
      body: "The official blog index includes 'From Wash To Wear: How To Make Your Favorite Denim Last Longer' and 'Levi's Jeans: Find Your Perfect Fit'. We did not open those articles, and we did not wash-test denim. Anyone quoting an exact first-wash shrink percentage without the label's fabric composition and a measured test is guessing. Buy your true waist, follow the care label on the pair you receive, and do not pre-wash on the assumption that 'cotton always shrinks 3%'.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Official fit family", "Cut as listed on levi.in", "Our editorial read — who it suits", "Verification status (26 Nov 2026)"],
    rows: [
      [
        "501 Original Straight",
        "Straight fit filter; 501 Original Straight Fit style",
        "Straight leg with more thigh room; the default first pair",
        "Fit family verified on the official navigation; price and shrink not verified",
      ],
      [
        "511 Slim",
        "Slim fit filter; 511 Slim Fit style",
        "Slim through the leg without the aggressive taper of the 512",
        "Fit family verified; no live price verified",
      ],
      [
        "512 Slim Tapered",
        "Slim fit filter; 512 Slim Tapered style",
        "Narrower below the knee; check ankle comfort before buying",
        "Fit family verified; no live price verified",
      ],
      [
        "555 / 550 Relaxed, 568 Loose, 578 Baggy",
        "Relaxed / Loose / Baggy fit filters",
        "Extra room through thigh and seat; useful if slim cuts ride up",
        "Fit families verified on the official navigation",
      ],
      [
        "505 Straight, 541 Athletic Tapered, 513 Slim Straight",
        "Listed as separate styles",
        "Alternative straight and athletic-taper options worth trying on",
        "Style names verified; measurements not verified",
      ],
    ],
  },
  checkoutSteps: [
    "Pick the fit family first, then the size. Use the waist-inches guidance on the official size guide — do not convert an M/L/XL from a sale sticker into a waist number.",
    "Add the pair to cart and read the tier bar. On 26 Nov 2026 the site showed 10% off at ₹3,299 and 15% off at ₹4,699; these are observed banners, not a promise that the same tiers will be there next week.",
    "Note the 'Extra 10% Off on New Arrivals' banner separately from the cart tiers. We did not verify whether they stack — the payment summary is the only source of truth.",
    "Do not rely on the LEVIS1000 code from older Durza copy. We found no official confirmation that it is live; check the code box rather than assuming it works.",
    "Compare the final payable amount on Amazon India using the tracked link above. Marketplace seller and return terms can differ from the brand site.",
    "Keep tags and packaging until you have worn the pair indoors and confirmed the fit — returns are much easier before the first wash.",
  ],
  checkoutNote:
    "Cart tiers and banners are dated snapshots from 26 Nov 2026. No fixed price, MRP, code or shrink percentage is asserted on this page because we could not verify them against an official product page.",
  verifiedFacts: {
    kicker: "Levi's India · checked 26 Nov 2026 · checked 26 Nov 2026",
    title: "What the official site actually shows",
    facts: [
      {
        label: "The fit families are real and separate.",
        detail:
          "The official India navigation lists 501 Original Straight Fit, 511 Slim Fit, 512 Slim Tapered, 513 Slim Straight, 505 Straight Fit and 541 Athletic Tapered, alongside relaxed, loose and baggy options. Earlier copy that reduced the range to a two-fit story was too narrow.",
        href: "https://www.levi.in/",
      },
      {
        label: "Cart tiers were visible at ₹3,299 and ₹4,699.",
        detail:
          "The site's bag panel showed 'Add items worth ₹3,299 more to unlock 10% Off' and a 15% Off tier at ₹4,699 on 26 Nov 2026. We recorded the tiers as displayed; we did not complete a purchase to test them.",
        href: "https://www.levi.in/",
      },
      {
        label: "Levi's publishes its own fit and denim-care articles.",
        detail:
          "The blog index carries 'Levi's Jeans: Find Your Perfect Fit', 'From Wash To Wear: How To Make Your Favorite Denim Last Longer' and 'Tapered Jeans For Him: For Every Style'. We did not open the articles, so no shrink number is quoted from them here.",
        href: "https://www.levi.in/",
      },
      {
        label: "The LEVIS1000 code is unverified.",
        detail:
          "Older Durza copy described a flat ₹1,000 member code. We found no official page confirming it on 26 Nov 2026, so this guide does not claim it is live.",
        href: null,
      },
      {
        label: "The 2–3% shrink and ₹2,699/₹3,049 price claims are unverified.",
        detail:
          "Neither a first-wash shrink percentage nor the specific MRP-to-sale slabs from the previous draft could be confirmed on an official product page. They are removed rather than repeated.",
        href: null,
      },
    ],
    note: "Official site content was read from the live homepage on 26 Nov 2026. We did not buy, fit, measure or wash any product, and we make no claim about exact shrink, fabric composition or price.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked the official Levi's India site on 26 Nov 2026 for fit families, cart-tier banners and the presence of fit and care articles. We did not purchase, measure, fit or wash-test any denim. Every price slab, code and shrink percentage carried over from earlier Durza copy is explicitly unverified here. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Fit names such as straight, slim and tapered are Levi's labels; how they feel on your body still needs a try-on or a home try-on with tags intact.",
    "Waist in inches is a more reliable starting point than letter sizes when a site's chart is available.",
    "Shrink depends on fibre content, weave, wash temperature and drying method — a single universal percentage is not a usable buying rule.",
    "Cart-tier banners can change by sale period; the amount shown at the payment step is the amount that matters.",
    "A marketplace listing may use the same fit name but a different seller, return window and price — compare final payable amounts, not badges.",
  ],
  exploreLinks: [
    { href: "/stores/levis", label: "Levi's store hub" },
    { href: "/stores/the-bear-house", label: "The Bear House store hub" },
    { href: "/guides/the-bear-house-linen-chinos-oxford-guide", label: "The Bear House linen & chinos guide" },
    { href: "/stores/ajio-com-ecommerce-cps-india", label: "Ajio store hub" },
    { href: "/stores/amazon-in", label: "Amazon India store hub" },
    { href: "/guides", label: "All Durza buying guides" },
  ],
  faqs: [
    {
      question: "501 or 511 — which cut should I choose?",
      answer:
        "Both are listed as distinct fit families on the official India site. The 501 Original Straight keeps a straight leg and more thigh room; the 511 Slim follows the leg more closely. If you are unsure, try the 501 first. The exact measurements are not published on the pages we checked, so use the on-site size guide rather than a generic chart.",
    },
    {
      question: "Do Levi's 501s shrink in the wash?",
      answer:
        "We cannot give an honest percentage. We did not wash-test any pair and could not verify the 2–3% figure in older Durza copy. Shrink depends on the fabric composition and care method printed on your pair. Buy your true waist, follow that care label and keep tags on until the fit is confirmed.",
    },
    {
      question: "Is the LEVIS1000 code still working?",
      answer:
        "We could not verify it on 26 Nov 2026, so this guide does not claim it is live. Check the code box in your cart; if a code is accepted there, it is real for your order. A code printed in an old article is not evidence.",
    },
    {
      question: "Are the ₹2,699 and ₹3,049 sale prices accurate?",
      answer:
        "Not on this page. Those figures came from earlier Durza copy and we could not confirm them against an official product page. What we did see on 26 Nov 2026 were cart tiers of 10% off at ₹3,299 and 15% off at ₹4,699 — also a snapshot, not a guarantee.",
    },
    {
      question: "Did Durza test these jeans?",
      answer:
        "No. We read the official catalogue on 26 Nov 2026, did not purchase or fit any pair, and make no claims about fabric, shrink or durability.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Fit comparisons are our editorial reading of Levi's own fit labels; prices, codes and shrink figures from older copy are flagged as unverified rather than silently repeated. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Official Levi's India store — fit families and cart tiers",
      href: "https://www.levi.in/",
      checkedAt: "26 Nov 2026",
    },
  ],
};
