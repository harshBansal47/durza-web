import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "pepperfry-bean-bags-and-furniture-guide",
  url: "https://durza.in/guides/pepperfry-bean-bags-and-furniture-guide",
  title: "Pepperfry Furniture (2026): Bean-Bag Prices, Assembly Fields and Real Landed Cost",
  description:
    "A filled 4XL bean bag needs no assembly; a sectional sofa may need 30–45 minutes. Compare current bean-bag listings, decode each product's Assembly field, and compute landed cost before paying.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Indexed official listings", "Assembly fields decoded", "Older slot and bank claims unverified", "No furniture tested"],
  audience: {
    bestFor: [
      "Buyers comparing filled bean bags with ready-to-use sofas where setup effort, not just price, decides the purchase.",
      "Shoppers adding carpenter-assembly wardrobes or sectionals who want to know who assembles, when, and what to check on delivery.",
    ],
    skipIf: [
      "Anyone counting on the earlier ₹1,999 4XL slot, Kotak/Axis 10% above ₹15,000, or ₹500–1,000 installation fee — none was verified on 26 Nov 2026.",
      "Buyers wanting custom modular kitchens or bespoke joinery; these listings are ready and ready-to-assemble furniture.",
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
    question: "Is the Pepperfry bean-bag deal real, and what does assembly actually cost?",
    answer:
      "We did not find the earlier ₹1,999 4XL slot. Indexed official listings on 26 Nov 2026 showed a Classic 4XL Fur bean bag at ₹2,399 (MRP ₹5,499) and another at ₹3,199 (MRP ₹7,099), both with 6-month warranty; a filled 4XL fabric bean bag is described as pre-assembled and ready to use. For larger furniture, read the Assembly field: standard three-seaters are described as pre-assembled, sectionals may need 30–45 minutes with delivery-team setup at no extra charge, while other items say 'Assembly by Brand (Installation in 72 hours)' or carpenter assembly within 48 hours, and some are self-assembly. Landed cost = listed price + any installation fee + delivery; never pay a fee for work the listing already includes.",
    jumpHref: "#scenarios",
    jumpLabel: "See the assembly decision matrix",
  },
  ctas: [
    {
      href: "https://track.vcommission.com/click?campaign_id=10194&pub_id=133499&url=https%3A%2F%2Fwww.pepperfry.com&p1=guide_pepperfry-bean-bags-and-furniture-guide",
      label: "Check live Pepperfry prices",
      primary: true,
    },
    { href: "/stores/pepperfry", label: "Pepperfry store hub on Durza" },
    { href: "/categories/home-kitchen", label: "Home & Kitchen category hub" },
  ],
  methodNote:
    "We checked indexed official Pepperfry category, brand and product pages on 26 Nov 2026; direct page fetches were blocked, so prices and assembly wording come from official search-indexed content. We did not order furniture, inspect fabric or verify any bank offer, installation fee or damage-claim window.",
  scenarios: [
    {
      heading: "Filled bean bag: no assembly, low effort",
      body: "An official product listing describes a premium 4XL fabric bean bag as pre-assembled and filled with Sattva beans, with double stitching and a strong fastening mechanism. The filled weight is listed as 1.5 kg. For a renter or a first-floor apartment with no lift, the low handling burden can matter more than the discount percentage.",
      icon: null,
    },
    {
      heading: "4XL fur bean bag: two current listings",
      body: "Indexed official pages showed a Classic 4XL Fur bean bag at ₹2,399 against ₹5,499 MRP (56% off) and another at ₹3,199 against ₹7,099 MRP (55% off), each with a 6-month warranty and express shipping in one day. Discount check: (5,499 − 2,399) ÷ 5,499 = 56.4%; (7,099 − 3,199) ÷ 7,099 = 54.9%. Colour, fill and seller terms can differ — confirm the exact SKU.",
      icon: null,
    },
    {
      heading: "Sofa: pre-assembled or a 30–45 minute job",
      body: "Official category content says standard three-seater sofas arrive pre-assembled and sectionals or L-shapes may need 30–45 minutes of assembly, with delivery teams handling setup at no extra charge. Other product pages state 'Assembly by Brand (Installation in 72 hours)'. Read the field on your item rather than assuming one rule.",
      icon: null,
    },
    {
      heading: "Wardrobe and beds: carpenter versus self-assembly",
      body: "Some Pepperfry product pages state carpenter assembly, with the team contacting the buyer within 48 hours of delivery, and explicitly warn that if 'Self Assembly' is mentioned the buyer must assemble it. Warranty text on those pages excludes damage from incorrect storage, assembly or installation — a reason to photograph the setup and keep the assembly receipt.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Item (indexed official listing)", "Price / MRP seen 26 Nov 2026", "Assembly signal", "What to check"],
    rows: [
      ["Classic 4XL Fur bean bag (brown)", "₹2,399 / ₹5,499 (56%)", "Pre-filled, ready to use", "Fill type, colour, 6-month warranty"],
      ["Classic 4XL Fur bean bag (brown)", "₹3,199 / ₹7,099 (55%)", "Pre-filled, ready to use", "Why the higher listing price; seller and fabric"],
      ["Premium 4XL fabric bean bag (grey)", "Price not reliably captured", "Pre-assembled, filled, double-stitched", "Exact price and fill weight in cart"],
      ["Squivo 4XL leatherette bean bag with footrest, cushion, pocket", "MRP ₹6,899; 59% off banner", "Ready-to-use soft furniture", "Derived price ≈ ₹2,829 (verify in cart)"],
      ["Bean bag with footstool, filled", "₹4,399 / ₹5,499 (20%)", "Filled; footstool included", "Whether the ₹2,000 premium over the 4XL fur bag is worth the footstool"],
      ["Standard 3-seater sofa", "Varies by SKU", "Described as pre-assembled", "Carry-in width and staircase clearance"],
      ["Sectional / L-shape sofa", "Varies by SKU", "30–45 minutes, delivery team setup stated at no extra charge", "Confirm the 'no extra charge' wording on your item"],
    ],
  },
  checkoutSteps: [
    "Read the Assembly field on the exact product page. Values seen include 'pre-assembled', 'Assembly by Brand (Installation in 72 hours)', 'Carpenter Assembly' and 'Self Assembly'. They are not interchangeable.",
    "Compute landed cost: listed price + installation fee (if any) + delivery charge + minority handling costs such as lift rent. If the listing says setup is included, question any add-on fee.",
    "For bean bags, compare like with like: size label (4XL), fabric (fur, leatherette, canvas), whether beans are included, and warranty. A lower MRP with a smaller fill is not the same product.",
    "Check the discount against MRP yourself: discount % = (MRP − listed price) ÷ MRP × 100. For ₹2,399 against ₹5,499 that is 56.4%, consistent with the 56% badge.",
    "Do not budget the old Kotak/Axis 10% above ₹15,000 offer. It was not found on official pages on 26 Nov 2026; screenshot the bank panel on the day you pay if one appears.",
    "On delivery, photograph the packaging and item before assembly. Product warranty text excludes damage caused by incorrect assembly, misuse and normal wear and tear.",
    "Do not rely on the earlier 48-hour damage-claim window. We could not verify that rule; ask customer care for the applicable policy in writing if it matters to you.",
  ],
  checkoutNote:
    "Pepperfry pages blocked direct automated fetch, so listings and assembly wording were read from indexed official pages checked 26 Nov 2026. Prices rotate by colour, pincode and seller; the cart is the source of truth.",
  verifiedFacts: {
    kicker: "Pepperfry · checked 26 Nov 2026 · checked 26 Nov 2026",
    title: "What the indexed official pages say",
    facts: [
      {
        label: "A filled 4XL bean bag is described as ready to use.",
        detail:
          "An official product listing says the bean bag comes filled with Sattva beans, with double stitching and a strong fastening mechanism, and is pre-assembled — open the package and it is ready to use. Listed weight: 1.5 kg.",
        href: "https://pepperfry.com/product/premium-4xl-fabric-bean-bag-with-beans-in-grey-colour-1853131.html",
      },
      {
        label: "Two 4XL fur listings were visible at ₹2,399 and ₹3,199.",
        detail:
          "Indexed official listings showed ₹2,399 against ₹5,499 MRP and ₹3,199 against ₹7,099 MRP, both with 6-month warranty and express shipping in one day. We did not verify stock or colour-level pricing.",
        href: "https://pepperfry.com/brands/sattva.html",
      },
      {
        label: "Sofas: pre-assembled versus 30–45 minutes.",
        detail:
          "Official category content says standard three-seater sofas arrive pre-assembled, while sectionals and L-shapes may need 30–45 minutes; delivery teams handle setup at no extra charge in that content.",
        href: "https://www.pepperfry.com/category/sofas-and-seating.html",
      },
      {
        label: "Other items use brand or carpenter assembly.",
        detail:
          "Product pages state 'Assembly by Brand (Installation in 72 hours)' or carpenter assembly arranged within 48 hours of delivery, and warn that self-assembly items must be assembled by the buyer.",
        href: "https://pepperfry.com/product/maltein-2-door-without-mirror-wardrobe-in-brown-maple-finish-2260674.html",
      },
      {
        label: "Warranty text excludes incorrect assembly.",
        detail:
          "Warranty language on indexed product pages excludes products that have been stored, assembled or installed incorrectly, used inappropriately, or cleaned with the wrong methods. Keep installation records.",
        href: "https://pepperfry.com/product/faro-2-seater-sofa-in-royal-blue-colour-2343141.html",
      },
      {
        label: "Older offer and fee claims are unverified.",
        detail:
          "The earlier guide's ₹1,999 4XL slot, Kotak/Axis 10% above ₹15,000, ₹500–1,000 installation fee and 48-hour claim window were not found on official pages checked 26 Nov 2026 and are not repeated as fact.",
        href: "https://www.pepperfry.com/",
      },
    ],
    note: "Direct Pepperfry fetches returned 403; all findings come from official search-indexed pages. No purchase, assembly or inspection was performed.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We examined indexed official Pepperfry category, brand and product pages on 26 Nov 2026 for bean-bag prices, discounts and assembly wording. Direct requests were blocked, so listings may be stale; no bank offer, installation fee or damage-claim window was verified. Price comparisons and discount percentages are our arithmetic on the indexed figures and are not quotes. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Discount formula: (MRP − listed price) ÷ MRP × 100. ₹2,399 vs ₹5,499 = 56.4%; ₹3,199 vs ₹7,099 = 54.9%.",
    "Derived price for the Squivo leatherette bean bag: ₹6,899 × (1 − 0.59) = ₹2,828.59 ≈ ₹2,829. This is arithmetic on a banner discount, not a confirmed cart price.",
    "Landed cost = listed price + installation fee + delivery charge + handling. Assembly-included wording means the installation line should be zero unless a separate service is requested.",
    "A '6-month warranty' badge is a listing claim; Durza did not read the full warranty certificate for any SKU.",
    "Assembly times (30–45 minutes, 48 or 72 hours) are quoted from indexed official wording and are not service-level guarantees.",
    "This guide does not claim a ₹1,999 bean bag slot, a bank card rate, or a fixed installation fee — none could be verified on 26 Nov 2026.",
  ],
  exploreLinks: [
    { href: "/categories/home-kitchen", label: "Home & Kitchen category hub" },
    { href: "/topics/home", label: "Home & Appliances topic hub" },
    { href: "/stores/pepperfry", label: "Pepperfry store hub" },
    { href: "/guides/nilkamal-furniture-offers-and-NEU-guide", label: "Nilkamal furniture guide" },
  ],
  faqs: [
    {
      question: "Is the ₹1,999 4XL bean bag deal still live?",
      answer:
        "We could not verify it. Indexed official listings on 26 Nov 2026 showed ₹2,399 (MRP ₹5,499) and ₹3,199 (MRP ₹7,099) for Classic 4XL Fur variants. Check the live listing for your colour and pincode.",
    },
    {
      question: "Which bank offer applies at Pepperfry?",
      answer:
        "We cannot name one. The earlier Kotak/Axis 10% above ₹15,000 claim was not found on official pages on 26 Nov 2026. Screenshot the bank panel at checkout; do not budget a discount that is not shown there.",
    },
    {
      question: "Is assembly really free?",
      answer:
        "It depends. Official category content says standard three-seaters arrive pre-assembled and sectional setup is handled by delivery teams at no extra charge, while individual product pages state brand or carpenter assembly and some are self-assembly. Read your product's Assembly field.",
    },
    {
      question: "What does 'Assembly by Brand (Installation in 72 hours)' mean?",
      answer:
        "It is the listing's stated installation window for that SKU. It is not a Durza guarantee. Record the delivery date and follow up if the team does not contact you; warranty text excludes damage from incorrect assembly.",
    },
    {
      question: "How do I check whether a discount is real?",
      answer:
        "Compute (MRP − listed price) ÷ MRP × 100 and compare it with the badge. For ₹2,399 against ₹5,499 the result is 56.4%, matching the 56% badge. Then compare the final payable amount after delivery and any fees.",
    },
    {
      question: "Did Durza inspect any Pepperfry furniture?",
      answer:
        "No. Direct page fetches were blocked, so this guide relies on official indexed content and our own arithmetic.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Prices, discounts and assembly wording are dated snapshots read via indexed official pages because direct access was blocked. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Official bean bags category (indexed)",
      href: "https://pepperfry.com/category/bean-bags.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official Sattva brand listings (indexed)",
      href: "https://pepperfry.com/brands/sattva.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official 4XL fabric bean bag product page (indexed)",
      href: "https://pepperfry.com/product/premium-4xl-fabric-bean-bag-with-beans-in-grey-colour-1853131.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official fabric bean bag listings (indexed)",
      href: "https://pepperfry.com/discover/fabric-bean-bags.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official sofas & seating category (indexed)",
      href: "https://www.pepperfry.com/category/sofas-and-seating.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official wardrobe product page with assembly wording (indexed)",
      href: "https://pepperfry.com/product/maltein-2-door-without-mirror-wardrobe-in-brown-maple-finish-2260674.html",
      checkedAt: "26 Nov 2026",
    },
  ],
};
