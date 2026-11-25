import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "havells-bldc-fan-offers-guide",
  url: "https://durza.in/guides/havells-bldc-fan-offers-guide",
  title: "Havells BLDC vs Induction Fans (2026): Wattage Math, Airflow and Offer Codes",
  description:
    "Two published Havells models — 26W Efficiencia Neo and 40W Stealth Air BLDC+ — compared on watts, CMM and annual rupees. All calculation inputs are shown; no savings figure is presented without them.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official catalogue specs", "Published offer codes", "Arithmetic shown", "No airflow or noise testing"],
  audience: {
    bestFor: [
      "Owners of 1200mm fans in bedrooms, living rooms and home offices that run 8–16 hours a day, where lower wattage can recover the price gap over a few years.",
      "Households on inverter or solar backup who want a 26W or 40W load instead of a 50W–75W induction fan during power cuts.",
      "Buyers who will use the supplied remote and can keep a wall regulator at full speed or bypass it.",
    ],
    skipIf: [
      "Guest rooms and dining areas used under three hours a day — at low hours the rupee saving is small and payback stretches well past four years.",
      "Buyers who want a conventional step-regulator fan with a cheap capacitor repair; a BLDC fan depends on an electronic driver board and a remote.",
      "Anyone expecting Durza to have measured airflow, wattage or noise. We read published figures; we did not test a fan.",
    ],
  },
  byline: {
    author: "Harsh Bansal",
    role: "Senior software engineer · 8+ years in technology",
    published: "24 Nov 2026",
    updated: "26 Nov 2026",
    factsChecked: "26 Nov 2026",
    bio: "Harsh builds and audits data-driven products. On Durza he reviews the research method, the comparison logic and the numbers behind each recommendation — so a verdict is something you can check, not just something you are told.",
    methodHref: "/methodology",
  },
  quickAnswer: {
    question: "Does a Havells BLDC fan actually save money, and how much?",
    answer:
      "Use the full formula: (baseline watts − BLDC watts) ÷ 1,000 × hours per day × 365 × tariff. At 12 hours a day and ₹8 per unit, a 26W Efficiencia Neo saves about ₹841/year against a 50W induction fan and about ₹1,717/year against an older 75W fan. The 40W Stealth Air BLDC+ saves about ₹350 and ₹1,226 respectively on the same inputs. Those are calculations on stated inputs, not measured savings; your hours and tariff will change them. Havells' own BLDC+ page currently advertises EXTRAOFF10 (up to 10% off selected BLDC fans) and EXTRA2 (2% off 300+ fans).",
    jumpHref: "#scenarios",
    jumpLabel: "See the wattage-to-rupee table",
  },
  ctas: [
    {
      href: "https://track.vcommission.com/click?campaign_id=13307&pub_id=133499&url=https%3A%2F%2Fwww.havells.com&p1=guide_havells-bldc-fan-offers-guide",
      label: "Check live Havells fan prices and codes",
      primary: true,
    },
    { href: "/stores/havells", label: "Havells store hub on Durza" },
    { href: "/guides/how-to-save-on-amazon-india", label: "How to compare marketplace prices" },
  ],
  methodNote:
    "We checked Havells' BLDC+ landing page, its April 2026 fan-buying guide, indexed official product listings for the Efficiencia Neo and Stealth Air BLDC+, and the official fans catalogue on 26 Nov 2026. Wattage, RPM and air delivery are Havells' published figures. The rupee figures below are our arithmetic on declared inputs; we did not buy, mount, measure or noise-test any fan.",
  scenarios: [
    {
      heading: "Scenario A — 26W Efficiencia Neo, 1200mm",
      body: "The indexed Havells product listing gives 26W, 350 RPM, 220 m³/min air delivery and a 2-year guarantee. Against a 50W induction fan at 12 h/day and ₹8/unit: (50 − 26) ÷ 1,000 × 12 × 365 × 8 = 0.024 × 35,040 = ₹840.96, about ₹841/year. Annual running cost of the fan itself: 0.026 × 4,380 × 8 = ₹910.08. This is the efficiency-first choice on published specs, but its 220 m³/min is lower than the Stealth Air's 245 m³/min.",
      icon: null,
    },
    {
      heading: "Scenario B — 40W Stealth Air BLDC+, 1200mm",
      body: "Havells' catalogue and product listings give 40W, 280 RPM and 245 m³/min; several official listings show a 5-star rating and 2-year warranty, while one voice-control variant is listed as 4-star. At 12 h/day and ₹8/unit: (50 − 40) ÷ 1,000 × 12 × 365 × 8 = ₹350.40/year against 50W, and (75 − 40) ÷ 1,000 × 12 × 365 × 8 = ₹1,226.40/year against 75W. Its own running cost is 0.040 × 4,380 × 8 = ₹1,401.60. Choose it when airflow matters more than the last few watts.",
      icon: null,
    },
    {
      heading: "Scenario C — the induction baseline you actually own",
      body: "The answer depends on the fan being replaced. Havells' own buying guide says BLDC fans typically run around 32W and conventional fans 50W or more. Many older Indian ceiling fans are 70–75W. A 26W fan only saves about ₹350/year against a 40W BLDC fan, so swapping one BLDC model for another is a much weaker financial case than replacing a 75W induction fan.",
      icon: null,
    },
    {
      heading: "Scenario D — low-use rooms",
      body: "At 3 hours/day and ₹8/unit, the 26W fan saves 0.024 × 1,095 × 8 = ₹210.24/year against 50W. If the price premium is ₹2,000 (an assumption, not a verified price), simple payback is 2,000 ÷ 210 ≈ 9.5 years, before replacing the remote or driver. For a guest room, the efficiency case does not close.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Model (1200mm unless noted)", "Published power", "Published air delivery", "Published speed", "What the figures mean here"],
    rows: [
      [
        "Efficiencia Neo BLDC",
        "26 W",
        "220 m³/min",
        "350 RPM",
        "Lowest stated wattage; choose when running cost dominates and 220 CMM is enough",
      ],
      [
        "Stealth Air BLDC+",
        "40 W",
        "245 m³/min",
        "280 RPM",
        "Higher stated airflow; lower RPM is not automatically weaker airflow — compare CMM",
      ],
      [
        "Stealth Air BLDC+ Voice variants",
        "40 W",
        "245 m³/min",
        "280 RPM",
        "Voice/remote variants on official listings; one page states 4-star, others 5-star — check the exact SKU",
      ],
      [
        "Conventional induction reference",
        "50 W or more (Havells guide); older fans commonly 75 W",
        "Check the exact model label",
        "Varies",
        "Your baseline watts must come from your own fan's label, not from an article",
      ],
    ],
  },
  checkoutSteps: [
    "Match sweep to room first. Havells' guide lists 1200mm for rooms around 3.6 m × 4 m, 900mm for roughly 3 m × 3 m rooms and 1400mm for larger halls. Bigger is not automatically better if you only sit in one part of the room.",
    "Check ceiling height and mounting: Havells' guide recommends flush mount for ceilings below about 2.43 m and downrod mount from roughly 2.74 m. Confirm downrod length before ordering for low ceilings.",
    "Compare air delivery (CMM), not blade count or RPM alone. The 40W Stealth Air moves 245 m³/min at 280 RPM; the 26W Efficiencia Neo moves 220 m³/min at 350 RPM.",
    "Read the current Havells BLDC+ page for live codes. On 26 Nov 2026 it showed EXTRAOFF10 (up to 10% off selected BLDC fans) and EXTRA2 (2% off 300+ fans), both marked limited time with T&C. We did not verify either code in a live cart; treat them as prompts to check, not guaranteed discounts.",
    "Do not compare codes and bank offers on their labels. Apply each in the cart, compare the final payable amount, and keep the larger deduction. Marketplace base prices can differ from Havells' site before any offer.",
    "Run your own hours and tariff through the formula before paying. Havells itself states its headline power-saving illustration assumes 16 hours a day and ₹7 per unit — a different assumption from the 12 h/day and ₹8/unit used in this guide.",
  ],
  checkoutNote:
    "Specs and offer banners are dated snapshots checked 26 Nov 2026; several official Havells product URLs were not directly fetchable and were read through indexed official search results. Prices seen across Havells SKUs and retailers conflicted, so no single 'current price' is asserted here. The cart is the only source of truth.",
  verifiedFacts: {
    kicker: "Havells · checked 26 Nov 2026 · checked 26 Nov 2026",
    title: "What Havells actually publishes",
    facts: [
      {
        label: "Efficiencia Neo: 26W, 350 RPM, 220 m³/min.",
        detail:
          "Indexed official Havells product listings give these figures for the 1200mm Efficiencia Neo BLDC and state a 2-year guarantee. We did not verify wattage at the socket.",
        href: "https://havells.com/fans/ceiling-fans/efficiencia-neo-bldc-fhcnf5sbnc48p-1.html",
      },
      {
        label: "Stealth Air BLDC+: 40W, 280 RPM, 245 m³/min.",
        detail:
          "The official fans catalogue and multiple Havells product pages agree on these figures. Star rating varies by variant page (4-star on one voice model, 5-star on others), so match the SKU.",
        href: "https://havells.com/media/wysiwyg/Brochure-and-pricelist/Consumer_Industrial_Fans/Catalogue_Havells_Consumer_Industrial_Fans.pdf",
      },
      {
        label: "Havells' own buying guide says compare CMM and wattage.",
        detail:
          "The guide describes BLDC fans as typically around 32W versus 50W or more for conventional fans, defines air delivery in cubic metres per minute, and gives sweep-size and mounting-height guidance. It does not publish a payback calculation.",
        href: "https://havells.com/blog/post/a-complete-bldc-fan-buying-guide.html",
      },
      {
        label: "Two live fan codes are advertised, with conditions.",
        detail:
          "The official BLDC+ landing page showed 'Up to 10% OFF on Selected BLDC Fans, Use Code: EXTRAOFF10' and '2% OFF on 300+ Fans, Use Code: EXTRA2', marked limited time and linked to T&C. We did not apply either code at checkout.",
        href: "https://havells.com/bldc-plus-fans",
      },
      {
        label: "Havells' savings footnote uses different inputs from ours.",
        detail:
          "The BLDC+ page states its power-saving calculation assumes 16 hours a day and ₹7 per unit. Any savings number must be read with its inputs; ours uses 12 h/day and ₹8/unit unless stated otherwise.",
        href: "https://havells.com/bldc-plus-fans",
      },
    ],
    note: "Official product URLs were rate-limited or returned 404 to direct fetch, so listings were read via indexed official results on 26 Nov 2026. No fan was purchased or tested.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We reviewed the official Havells BLDC+ landing page, fan-buying guide, fans catalogue and indexed product listings on 26 Nov 2026. Published wattage, RPM and air-delivery figures are attributed to Havells; all rupee savings are our own arithmetic on stated hours, years and tariff, and are not guaranteed. Offer codes are snapshot banners that may expire or exclude SKUs. Durza did not buy, mount or measure any fan, and earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Inputs used throughout: 365 days/year; tariff ₹8/unit except where another value is stated; 12 hours/day for the main comparison; premium figures are illustrative assumptions, not verified prices.",
    "Savings formula: (baseline W − BLDC W) ÷ 1,000 × hours/day × 365 × tariff. Running cost: W ÷ 1,000 × hours/day × 365 × tariff.",
    "At 12 h/day and ₹8/unit, annual running cost is about ₹910 for 26W, ₹1,402 for 40W, ₹1,752 for 50W and ₹2,628 for 75W.",
    "If the BLDC premium is ₹1,500–₹2,500 (assumed), payback against a 50W fan at 12 h/day is roughly 21–36 months; against a 75W fan, roughly 11–17 months. Verify the actual price difference on the day you buy.",
    "BLDC fans use an electronic driver and remote; induction fans typically use a capacitor. Repair cost, surge behaviour and remote availability are part of the ownership decision, not just annual electricity.",
    "A 5-star label is a regulated rating for the exact SKU; it is not a Durza measurement and cannot be transferred between variants.",
  ],
  exploreLinks: [
    { href: "/categories/home-kitchen", label: "Home & Kitchen category hub" },
    { href: "/topics/home", label: "Home & Appliances topic hub" },
    { href: "/compare/havells-vs-ao-smith-vs-crompton-water-heaters-india", label: "Havells vs AO Smith vs Crompton geysers" },
    { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant discount vs No-Cost EMI" },
    { href: "/collections/high-rise-indian-apartment-utility-and-diy-kit", label: "High-rise apartment setup kit" },
    { href: "/stores/havells", label: "Havells store hub" },
  ],
  faqs: [
    {
      question: "How much does a Havells BLDC fan actually save?",
      answer:
        "At 12 hours/day and ₹8/unit, a 26W fan saves 0.024 × 12 × 365 × 8 = ₹841/year against 50W and ₹1,717/year against 75W. A 40W fan saves ₹350 and ₹1,226 respectively. Change the hours or tariff and the answer changes — these are arithmetic on inputs, not a guaranteed saving.",
    },
    {
      question: "Which Havells model should I choose?",
      answer:
        "On published specs, the Efficiencia Neo is the low-power option (26W, 220 m³/min, 350 RPM) and the Stealth Air BLDC+ is the airflow option (40W, 245 m³/min, 280 RPM). Do not decide on watts alone: a fan with weaker air delivery can end up running longer at higher speed.",
    },
    {
      question: "Does a higher RPM mean more airflow?",
      answer:
        "Not by itself. Havells publishes both RPM and air delivery in m³/min for these models. The 280 RPM Stealth Air has a higher stated air delivery (245 m³/min) than the 350 RPM Efficiencia Neo (220 m³/min). Compare CMM for the room, not RPM in isolation.",
    },
    {
      question: "Are EXTRAOFF10 and EXTRA2 guaranteed to work?",
      answer:
        "No. They were banner offers on the official Havells BLDC+ page on 26 Nov 2026, marked 'up to' and limited time, with separate T&C. We did not apply them in a live cart. Check the cart and keep whichever deduction is larger; do not assume codes stack with bank offers.",
    },
    {
      question: "When should I skip a BLDC fan?",
      answer:
        "In rooms used under three hours a day, a ₹2,000 premium (illustrative) takes around nine years to repay against a 50W fan at ₹8/unit. If you will not use a remote, or your area has frequent severe surges, an induction fan may be the more practical choice.",
    },
    {
      question: "Did Durza measure wattage, airflow or noise?",
      answer:
        "No. We compared published Havells specifications and offer pages on 26 Nov 2026. All rupee figures are calculations with inputs shown; noise and real-world airflow were not tested.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Specifications and code banners are dated snapshots; product pages were partly read via indexed official results because direct fetch was rate-limited. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Havells BLDC+ fans landing page (codes and saving footnote)",
      href: "https://havells.com/bldc-plus-fans",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Havells BLDC fan buying guide (15 Apr 2026)",
      href: "https://havells.com/blog/post/a-complete-bldc-fan-buying-guide.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Havells fans catalogue PDF (wattage, RPM, CMM)",
      href: "https://havells.com/media/wysiwyg/Brochure-and-pricelist/Consumer_Industrial_Fans/Catalogue_Havells_Consumer_Industrial_Fans.pdf",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Efficiencia Neo BLDC official listing (indexed)",
      href: "https://havells.com/fans/ceiling-fans/efficiencia-neo-bldc-fhcnf5sbnc48p-1.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Stealth Air BLDC+ official listing (indexed)",
      href: "https://havells.com/fans/ceiling-fans/stealth-air-bldc-ceiling-fan-fhcbhe5pwt48p.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Havells fan coupon T&C",
      href: "https://havells.com/fan-coupon-offer-t-and-c",
      checkedAt: "26 Nov 2026",
    },
  ],
};
