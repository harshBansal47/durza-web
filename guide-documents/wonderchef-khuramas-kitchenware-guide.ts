import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "wonderchef-khuramas-kitchenware-guide",
  url: "https://durza.in/guides/wonderchef-khuramas-kitchenware-guide",
  title: "Wonderchef Offers 2026: Cart-Slab Math for Cookware and Nutri-Blends",
  description:
    "The official site's current percentage slabs are 5%, 10% and 15% at three cart thresholds. Here is exactly what a ₹3,299 Nutri-blend and a ₹7,500 basket do under those slabs — and which older codes we could not verify.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official store banners", "Cart-slab arithmetic shown", "Codes not verified", "No product testing"],
  audience: {
    bestFor: [
      "Buyers assembling a cookware or Nutri-blend basket and deciding whether to add an item to cross the next discount slab.",
      "Shoppers who want the warranty and non-stick care terms checked before paying, rather than a list of possibly expired codes.",
    ],
    skipIf: [
      "Anyone expecting CHEF10, KITCHEN500 or PREPAID5 to work — none of those codes was found on the official offers page on 26 Nov 2026.",
      "Buyers comparing mixer-grinder or hard-anodised kadhai prices across brands; this guide only covers what the official Wonderchef pages support.",
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
    question: "Which Wonderchef offer actually pays, and is it worth adding an item to cross a slab?",
    answer:
      "On 26 Nov 2026 the official store showed Black Friday slabs of 5% above ₹2,499, 10% above ₹3,999 and 15% above ₹7,499, plus free delivery above ₹799. A ₹3,299 Nutri-blend (an indexed official listing, verify the live price) draws 5% = ₹164.95; lifting the cart to ₹3,999 draws 10% = ₹399.90, an extra ₹234.95 of discount. Adding ₹1 from ₹7,499 to ₹7,500 moves the discount from ₹749.90 to ₹1,125 — but only when you were already buying at that level. CHEF10, KITCHEN500 and PREPAID5 were not found on the official offers page and are not claimed.",
    jumpHref: "#scenarios",
    jumpLabel: "See the slab calculations",
  },
  ctas: [
    {
      href: "https://track.vcommission.com/click?campaign_id=12979&pub_id=133499&url=https%3A%2F%2Fwww.wonderchef.in&p1=guide_wonderchef-khuramas-kitchenware-guide",
      label: "Check live Wonderchef slabs",
      primary: true,
    },
    { href: "/stores/wonderchef", label: "Wonderchef store hub on Durza" },
    { href: "/categories/home-kitchen", label: "Home & Kitchen category hub" },
  ],
  methodNote:
    "We read the official Wonderchef offers page and warranty-registration page and checked indexed official product listings on 26 Nov 2026. Percentage slabs are banner terms, not verified cart behaviour; we did not transact. The earlier CHEF10, KITCHEN500 and PREPAID5 codes were not found and are explicitly unverified. No coating, warranty claim or appliance performance was tested.",
  scenarios: [
    {
      heading: "Single Nutri-blend: ₹3,299 at 5%",
      body: "An indexed official offer listing showed the Wonderchef Nutriblend (White) at ₹3,299 against ₹5,000 MRP. Under the current 5%-above-₹2,499 slab, discount = 3,299 × 0.05 = ₹164.95, leaving about ₹3,134.05 before taxes and any delivery charge. The exact live price and variant must be confirmed in the cart; this is a worked illustration, not a quote.",
      icon: null,
    },
    {
      heading: "Add ₹700 of utensils to cross ₹3,999",
      body: "Cart = ₹3,299 + ₹700 = ₹3,999. Discount = ₹3,999 × 0.10 = ₹399.90, payable about ₹3,599.10. Incremental discount over the single item = ₹399.90 − ₹164.95 = ₹234.95. You spend ₹700 more and get ₹234.95 more discount: the extra items still cost about ₹465.05 net. Cross a slab only for things you needed.",
      icon: null,
    },
    {
      heading: "The ₹7,499 cliff",
      body: "At ₹7,499 the 10% slab gives ₹749.90 off, payable ₹6,749.10. At ₹7,500 the 15% slab gives ₹1,125 off, payable ₹6,375. Paying ₹1 more lowers the payable amount by ₹374.10 in this illustration. Slab jumps can be real, but they are only useful if the ₹1 item is one you actually want.",
      icon: null,
    },
    {
      heading: "Small utensils order",
      body: "Free delivery is advertised above ₹799. A ₹499 bowl pair plus a ₹399 katori pair totals ₹898, clearing that floor; below ₹799, check whether delivery costs more than the missing amount. The percentage slabs do not start until ₹2,499.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Cart value (illustrative input)", "Applicable banner slab", "Discount", "Payable before taxes/fees"],
    rows: [
      ["₹3,299 — one Nutriblend (indexed listing)", "5% above ₹2,499", "₹164.95", "≈ ₹3,134.05"],
      ["₹3,999 — Nutriblend + ₹700 utensils", "10% above ₹3,999", "₹399.90", "≈ ₹3,599.10"],
      ["₹7,499 — large cookware basket", "10% (15% needs above ₹7,499)", "₹749.90", "≈ ₹6,749.10"],
      ["₹7,500 — same basket + ₹1 item", "15% above ₹7,499", "₹1,125.00", "₹6,375.00"],
      ["₹898 — two small dinnerware sets", "No percentage slab; free delivery above ₹799", "₹0 slab discount", "₹898 + taxes"],
    ],
  },
  checkoutSteps: [
    "Fix the cart first: choose the exact Nutri-blend or cookware set and confirm its live listed price. Our ₹3,299 figure comes from an indexed official offer listing and may have changed.",
    "Apply the slab mentally using discount = cart value × slab rate. Current banner slabs on 26 Nov 2026: 5% above ₹2,499, 10% above ₹3,999, 15% above ₹7,499.",
    "Check the ₹799 free-delivery floor for small utensil orders. Delivery can erase the benefit of a small discount.",
    "Do not add filler purely to cross a slab. Compare the net extra cost: extra spend minus extra discount. At ₹3,299 → ₹3,999 that is ₹700 − ₹234.95 = ₹465.05.",
    "Test old codes in the cart if you have them. CHEF10, KITCHEN500 and PREPAID5 were not found on the official offers page on 26 Nov 2026; their availability and stacking are unverified.",
    "For non-stick cookware, check the product page for coating statements and warranty terms, then register the purchase on the official warranty page. Use wooden or silicone utensils to reduce film damage — that is general care advice, not a Wonderchef test result.",
  ],
  checkoutNote:
    "Slabs and thresholds are official banners checked 26 Nov 2026, not a verified checkout simulation. Taxes, delivery, bank offers and variant prices can change the final payable amount. The cart is the source of truth.",
  verifiedFacts: {
    kicker: "Wonderchef · checked 26 Nov 2026 · checked 26 Nov 2026",
    title: "What the official pages say",
    facts: [
      {
        label: "Three live percentage slabs and a delivery floor.",
        detail:
          "The official offers banner showed 15% off above ₹7,499, 10% off above ₹3,999, 5% off above ₹2,499 and free delivery above ₹799 on 26 Nov 2026. Eligibility and exclusions were not published in the banner we read.",
        href: "https://wonderchef.in/offer.html",
      },
      {
        label: "An indexed official listing showed Nutriblend at ₹3,299.",
        detail:
          "A search-indexed official offer listing gave 'Wonderchef Nutriblend – White ₹3,299, MRP ₹5,000, 34% off'. This is a dated indexed figure, not a live quote, and variant prices may differ.",
        href: "https://wonderchef.in/offer/wonderchef-nutriblend-white.html",
      },
      {
        label: "Non-stick listing states PFOA/heavy-metal free and 2-year warranty.",
        detail:
          "An indexed official cookware product listing describes PFOA/heavy-metals-free non-stick, a 3 mm construction and a 2-year warranty limited to manufacturing defects. We did not test the coating or verify the label.",
        href: "https://www.wonderchef.in/wonderchef-nutri-blend-champagne-with-jar.html",
      },
      {
        label: "Warranty registration is an official step.",
        detail:
          "Wonderchef's warranty-registration page asks owners to register products for better service. Registration does not by itself extend or alter the warranty terms on the product page.",
        href: "https://wonderchef.in/warranty-registration",
      },
      {
        label: "The Sanjeev Kapoor association is stated on the official site.",
        detail:
          "The official about page describes Wonderchef as Sanjeev Kapoor's kitchen and home appliance store. This is a brand association, not an endorsement of any specific discount.",
        href: "https://wonderchef.in/about-us",
      },
    ],
    note: "The offers page was read directly; some product pages were rate-limited and were read through indexed official search results. We did not purchase, cook with or test any product.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked the official Wonderchef offers banner, warranty page, about page and indexed official product listings on 26 Nov 2026. Slab calculations are our arithmetic on the published thresholds and on an indexed ₹3,299 Nutriblend price; no checkout was simulated and no bank or code stacking is claimed. The older CHEF10, KITCHEN500 and PREPAID5 codes could not be verified on the official offers page and are not presented as live. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Slab formula: discount = cart value × rate, where the rate applies only above the stated threshold. Payable = cart value − discount, before taxes and fees.",
    "The ₹3,299 Nutriblend price is an indexed official figure; confirm the exact variant price before relying on any calculation.",
    "A slab 'above ₹3,999' is treated as strictly greater than ₹3,999 in the worked example; at exactly ₹3,999 the banner wording should be checked in the cart.",
    "Crossing a slab is worthwhile only when the added goods were wanted; the marginal-benefit arithmetic is shown, not hidden in a headline percentage.",
    "PFOA-free and heavy-metal-free are listing claims. Durza did not verify coating composition or EU contact audits; an earlier draft's certification wording is not repeated.",
    "Registering a product and using gentle utensils are practical steps, not guarantees against coating failure.",
  ],
  exploreLinks: [
    { href: "/categories/home-kitchen", label: "Home & Kitchen category hub" },
    { href: "/topics/home", label: "Home & Appliances topic hub" },
    { href: "/stores/wonderchef", label: "Wonderchef store hub" },
    { href: "/guides/milton-thermosteel-offers-guide", label: "Milton Thermosteel guide" },
    { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant discount vs No-Cost EMI" },
  ],
  faqs: [
    {
      question: "Which Wonderchef code should I use?",
      answer:
        "We cannot name a verified code. On 26 Nov 2026 the official offers page showed automatic percentage slabs, not CHEF10 or KITCHEN500. If you hold a code, test it in the cart and keep whichever route gives the lower final payable amount.",
    },
    {
      question: "Is it worth adding items to cross ₹3,999?",
      answer:
        "Only if you wanted them. Using the indexed ₹3,299 Nutriblend price, the 5% discount is ₹164.95. At ₹3,999 the 10% discount is ₹399.90 — ₹234.95 more. Adding ₹700 of goods therefore still costs about ₹465.05 net.",
    },
    {
      question: "Does PREPAID5 stack with the slabs?",
      answer:
        "Unverified. The code was not found on the official offers page we checked, and no stacking rule was published in the banner. Check the payment summary rather than trusting an article.",
    },
    {
      question: "Are Wonderchef non-stick pans safe?",
      answer:
        "An indexed official listing states PFOA/heavy-metals-free construction and a 2-year manufacturing-defect warranty. Durza did not test the coating or independently verify certifications. Use wooden or silicone utensils and replace the pan when the film is visibly damaged.",
    },
    {
      question: "What does free delivery above ₹799 mean for small orders?",
      answer:
        "The official banner sets the floor at ₹799. For a small dinnerware cart below that amount, compare the delivery charge with the cost of adding an item you actually need; do not assume the percentage slabs apply below ₹2,499.",
    },
    {
      question: "Did Durza test any Wonderchef appliance?",
      answer:
        "No. This guide is a comparison of published banners, listings and policy pages checked 26 Nov 2026, with our own arithmetic shown in full.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Offer slabs and prices are dated snapshots; product pages were partially rate-limited and read via indexed official results. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Official Wonderchef offers page",
      href: "https://wonderchef.in/offer.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official Nutriblend offer listing (indexed)",
      href: "https://wonderchef.in/offer/wonderchef-nutriblend-white.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official Nutri-blend product page (indexed)",
      href: "https://www.wonderchef.in/wonderchef-nutri-blend-champagne-with-jar.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official warranty registration",
      href: "https://wonderchef.in/warranty-registration",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official about page",
      href: "https://wonderchef.in/about-us",
      checkedAt: "26 Nov 2026",
    },
  ],
};
