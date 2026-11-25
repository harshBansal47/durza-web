import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "neesh-perfumes-extrait-de-parfum-guide",
  url: "https://durza.in/guides/neesh-perfumes-extrait-de-parfum-guide",
  title: "Neesh Perfumes — Extrait, Concentration & Cost per ml (2026)",
  description:
    "We compared Neesh's stated ₹/ml across 15, 50 and 100 ml packs, then separated fragrance conventions from claims we could not verify. Trial first, bottle later.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official product page (indexed)", "Industry-convention reference", "Unverified claims flagged"],
  audience: {
    bestFor: [
      "Shoppers deciding whether a 15 ml, 50 ml or 100 ml Neesh bottle gives the better cost per millilitre.",
      "Buyers who want to trial a scent in Indian heat before committing to a full bottle.",
    ],
    skipIf: [
      "Anyone expecting a regulated, published oil percentage for 'Extrait de Parfum' — we found none on the pages we checked.",
      "Shoppers relying on the old LUXE20, NEESH10 or DISCOVERY codes and the '8–12 hours' figure — none were verified.",
      "Anyone with fragrance sensitivity; an extrait is a concentrated leave-on product and should be patch tested on skin.",
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
    question: "Which Neesh bottle size is best value, and is 'Extrait de Parfum' a regulated strength?",
    answer:
      "The official Mehr product page, read via an indexed snippet because direct fetching was rate-limited, states ₹100 per ml at 15 ml, ₹99.8 per ml at 50 ml and ₹68.5 per ml at 100 ml — about ₹1,500, ₹4,990 and ₹6,850 respectively. The 100 ml pack is clearly the best stated rate, but only if you will wear that much. 'Extrait de Parfum' is an industry term, not a regulated percentage, and Neesh did not publish an oil percentage on the pages we checked. The old 18–30% and 8–12-hour claims are unverified.",
    jumpHref: "#scenarios",
    jumpLabel: "See the cost-per-ml maths",
  },
  ctas: [
    {
      href: "https://track.vcommission.com/click?campaign_id=10175&pub_id=133499&url=https%3A%2F%2Fwww.neeshperfumes.com&p1=guide_neesh-perfumes-extrait-de-parfum-guide",
      label: "Check live offers on neeshperfumes.com",
      primary: true,
    },
    { href: "/go/amazon-in?src=guide-neesh-mid", label: "Compare Neesh prices on Amazon India" },
    {
      href: "https://www.amazon.in/NEESH-Extrait-Perfume-Lasting-High-Concentration/dp/B0CR8N2556?tag=durza02-21&ascsubtag=guide_neesh_table",
      label: "Check Neesh Mehr Extrait on Amazon",
    },
  ],
  methodNote:
    "We read the official Neesh storefront and an indexed snippet of its Mehr product page, plus marketplace listings and a general fragrance-concentration reference, on 26 Nov 2026. Direct product-page requests returned a rate-limit response. We did not buy, smell or wear any fragrance, and no longevity test was performed.",
  scenarios: [
    {
      heading: "Cost per ml — the numbers Neesh itself publishes",
      body: "The indexed Mehr product page states a USP of ₹100/ml at 15 ml, ₹99.8/ml at 50 ml and ₹68.5/ml at 100 ml. Multiplying out gives roughly ₹1,500, ₹4,990 and ₹6,850. The small and medium packs are almost identically priced per ml; the 100 ml pack is materially cheaper per ml. These are derived from the brand's own figures, not from a checked cart.",
      icon: null,
    },
    {
      heading: "Trial sets before full bottles",
      body: "The storefront lists Trial Sets, Collector's Edition bottles, Combo offers including 'Buy any 2 × 15ml at ₹2499' and four-piece seasonal combos, My Closet (4 × 10 ml), gift sets and an offline-store locator. In a climate where heat changes how a scent opens, a trial set is a sensible first purchase. Older Durza copy named a DISCOVERY code and an eight-piece kit with ₹300 off; we could not verify that from the official site.",
      icon: null,
    },
    {
      heading: "Extrait, EDP, EDT — conventions, not law",
      body: "General perfumery references put parfum or extrait around 20–30% fragrance oil, EDP around 15–20%, EDT around 5–15% and body mist lower, while noting that no regulator defines these terms and each house sets its own. Neesh describes its line as high-concentration extrait de parfum but did not publish a percentage on the pages we read. Do not convert the word 'extrait' into a guaranteed number.",
      icon: null,
    },
    {
      heading: "Mehr's published note pyramid",
      body: "The indexed product snippet describes Mehr as fruity, floral and woody, with passionfruit, jasmine and bergamot at the top; red berries, amberwood and lily of the valley at the heart; and musk and sandalwood at the base. That is a brand description of the accord, not a laboratory analysis and not a statement about how long each note lasts on your skin.",
      icon: null,
    },
    {
      heading: "What we could not verify",
      body: "Older Durza copy claimed 18–30% concentration, 8–12 hours of wear, that one dab beats three sprays, LUXE20 on gift boxes, NEESH10 sitewide and free delivery above ₹499. We found no official source for the percentage, the hours, the dab comparison or those specific codes and thresholds. A FESTIVE20 flat 20% banner was visible on the storefront on the check date, but banners rotate.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Pack / format", "Brand-stated ₹ per ml", "Derived pack total", "Verification note"],
    rows: [
      [
        "Mehr Extrait de Parfum 15 ml",
        "₹100/ml (official indexed product page)",
        "≈₹1,500",
        "Direct fetch rate-limited; marketplace listing showed ₹1,456 against ₹1,500 MRP",
      ],
      [
        "Mehr Extrait de Parfum 50 ml",
        "₹99.8/ml (official indexed product page)",
        "≈₹4,990",
        "Derived arithmetic; confirm at checkout",
      ],
      [
        "Mehr Extrait de Parfum 100 ml",
        "₹68.5/ml (official indexed product page)",
        "≈₹6,850",
        "Best stated rate per ml; only a saving if you will wear the full bottle",
      ],
      [
        "My Closet 4 × 10 ml / trial sets",
        "Not stated on the pages we read",
        "Not calculated",
        "Listed on the official storefront; no verified price or code",
      ],
      [
        "Concentration percentage",
        "Not published by Neesh on the pages we checked",
        "Not applicable",
        "18–30% and 8–12-hour claims from older copy remain unverified",
      ],
    ],
  },
  checkoutSteps: [
    "Trial first. Use a discovery or 10 ml format if you are unsure how a scent behaves in Indian heat.",
    "Compare the brand's stated ₹/ml across sizes. At 100 ml the rate is clearly lower, but only buy that volume if you will finish it.",
    "Check whether a storefront banner code such as FESTIVE20 applies to your cart; we did not verify fixed codes or stacking rules.",
    "Patch test any concentrated fragrance on skin before regular wear, especially if you have sensitive skin.",
    "Compare the final payable amount on the brand site and a marketplace listing — seller and return terms differ.",
  ],
  checkoutNote:
    "The official product page was read through an indexed snippet because direct requests returned a rate-limit response on 26 Nov 2026. Pack totals are our arithmetic from the brand's stated ₹/ml, not checked cart prices. No fragrance was purchased or smelled.",
  verifiedFacts: {
    kicker: "Neesh Perfumes · checked 26 Nov 2026",
    title: "What the storefront and product snippet actually say",
    facts: [
      {
        label: "Neesh publishes a per-ml price on the Mehr page.",
        detail:
          "The indexed official product listing states ₹100/ml at 15 ml, ₹99.8/ml at 50 ml and ₹68.5/ml at 100 ml. The 100 ml pack is the cheapest stated rate per ml.",
        href: "https://neeshperfumes.com/products/mehr-1",
      },
      {
        label: "The storefront is organised into named collections.",
        detail:
          "Heritage, Haute, Bureau, Luxe and Florelle collections are listed, alongside Trial Sets, combos, My Closet 4 × 10 ml, gift sets and an offline-store page. A festive-season flat 20% banner was visible on the check date.",
        href: "https://www.neeshperfumes.com",
      },
      {
        label: "Mehr's note pyramid is brand-described.",
        detail:
          "The product snippet lists passionfruit, jasmine and bergamot; red berries, amberwood and lily of the valley; musk and sandalwood. It is an accord description, not an ingredient or performance test.",
        href: "https://neeshperfumes.com/products/mehr-1",
      },
      {
        label: "Concentration terms are conventions, not regulated values.",
        detail:
          "A perfumery reference explains that parfum/extrait, EDP and EDT ranges are industry practice and that no regulator defines the terms; houses set their own. We found no Neesh-published percentage.",
        href: "https://luxeformulalabs.com/blog/perfume-concentration-guide/",
      },
      {
        label: "Marketplace prices differ from the brand's stated rate.",
        detail:
          "A marketplace listing showed Mehr 15 ml at ₹1456 against a ₹1500 MRP. That is a snapshot and not the official store price.",
        href: "https://www.myntra.com/neesh-perfume",
      },
    ],
    note: "Direct requests to the official product page were rate-limited; the page content used here comes from an indexed snippet. We did not buy, smell or wear any product.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked the official Neesh storefront, an indexed snippet of the Mehr product page, marketplace listings and a fragrance-concentration reference on 26 Nov 2026. Direct product-page fetching was rate-limited. Pack totals are arithmetic from the brand's own ₹/ml figures. The old 18–30% concentration, 8–12-hour wear, dab-versus-spray and fixed-code claims could not be verified and are not presented as facts. We did not buy, smell or wear any fragrance. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "'Extrait de Parfum' is a naming convention with no regulator-enforced oil percentage.",
    "Longevity depends on skin chemistry, heat, humidity and application, not on a label word alone.",
    "A lower ₹/ml only helps if you finish the bottle; fragrance can change over long storage in Indian heat.",
    "Concentrated fragrance should be patch tested; stop use if irritation occurs.",
    "Marketplace MRPs and discounts are snapshots and are not the brand's official price.",
  ],
  exploreLinks: [
    { href: "/categories/beauty", label: "Beauty & Grooming category" },
    { href: "/topics/beauty", label: "Beauty & Grooming topic hub" },
    { href: "/guides/victorias-secret-india-fragrance-sizing-guide", label: "Victoria's Secret fragrance guide" },
    { href: "/stores/neesh-perfumes", label: "Neesh Perfumes store hub" },
    { href: "/stores/hirafragrance", label: "Hira Fragrance store hub" },
    { href: "/stores/amazon-in", label: "Amazon India store hub" },
  ],
  faqs: [
    {
      question: "Which Neesh size gives the best value?",
      answer:
        "On the figures stated on the official Mehr page, 100 ml works out to about ₹68.5 per ml versus about ₹100 per ml at 15 ml and ₹99.8 at 50 ml. That is a better rate, but it is only a saving if you will wear the whole bottle.",
    },
    {
      question: "Is Extrait de Parfum 18–30% oil?",
      answer:
        "That range is a common industry convention, not a verified Neesh specification. We found no oil percentage published on the pages we checked, so we do not state one for this brand.",
    },
    {
      question: "Will it last 8–12 hours?",
      answer:
        "We cannot promise that. We found no official longevity test, and wear time depends on your skin and the weather. The old 8–12-hour figure in Durza copy was not verified.",
    },
    {
      question: "Should I buy a trial set first?",
      answer:
        "Yes, if you are unsure. The storefront lists trial sets, 10 ml formats and multi-piece combos, which let you test how a scent behaves before paying for a 100 ml bottle.",
    },
    {
      question: "Did Durza smell or test these fragrances?",
      answer:
        "No. We read official and indexed pages and marketplace listings on 26 Nov 2026, purchased nothing and make no performance claims.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Direct product-page access was rate-limited and several older performance and code claims failed verification. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    { label: "Official Neesh Perfumes storefront", href: "https://www.neeshperfumes.com", checkedAt: "26 Nov 2026" },
    {
      label: "Neesh Mehr Extrait de Parfum product page (indexed snippet; direct fetch rate-limited)",
      href: "https://neeshperfumes.com/products/mehr-1",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Amazon India — Neesh Mehr Extrait de Parfum 15 ml",
      href: "https://www.amazon.in/NEESH-Extrait-Perfume-Lasting-High-Concentration/dp/B0CR8N2556",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Myntra — Neesh fragrance listings",
      href: "https://www.myntra.com/neesh-perfume",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Perfume concentration conventions (industry reference, not a regulator)",
      href: "https://luxeformulalabs.com/blog/perfume-concentration-guide/",
      checkedAt: "26 Nov 2026",
    },
  ],
};
