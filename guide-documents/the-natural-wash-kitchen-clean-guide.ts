import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "the-natural-wash-kitchen-clean-guide",
  url: "https://durza.in/guides/the-natural-wash-kitchen-clean-guide",
  title: "The Natural Wash — Claim Audit & What the Catalogue Sells (2026)",
  description:
    "We could not verify kitchen cleaners, dish bundles or an ISO 9001 grease claim on the official catalogue. Here is the label audit of a real TNW SKU and how to read cleaning claims safely.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official catalogue checked", "Third-party INCI transcription", "Verification failed on old claims"],
  audience: {
    bestFor: [
      "Shoppers who saw an older Durza page promising kitchen-acid cleaners and want to know whether those products exist.",
      "Buyers who want a plain-English INCI audit of an actual The Natural Wash product before ordering.",
    ],
    skipIf: [
      "Anyone specifically looking for dishwash liquid, utensil cleaners or floor cleaner on this storefront — we could not find those categories on 26 Nov 2026.",
      "Anyone relying on the old '₹0.40 per week' or 'ISO 9001 lab-certified grease' statements as verified facts; they were not verified.",
      "Anyone with a beeswax, honey or fragrance allergy — the lip balm INCI we decoded contains all three.",
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
    question: "Does The Natural Wash sell kitchen cleaners, and are the old grease claims true?",
    answer:
      "We could not verify that. The official catalogue we read is organised around skin care, makeup, body care, hair care, baby care and lip care — no dishwash, utensil-cleaner or floor-cleaner category appeared. Searches for 'The Natural Wash dishwash' and for kitchen cleaner on the official domain returned no results. The old Durza statements about a lemon-and-bicarbonate grease base, ISO 9001 lab certification and ₹0.40 a week have no source we could find and are withdrawn. What we could audit is a real product: the Herbal Beetroot Lip Balm INCI lists beeswax, honey and fragrance alongside plant oils.",
    jumpHref: "#scenarios",
    jumpLabel: "See the claim audit",
  },
  ctas: [
    {
      href: "https://track.vcommission.com/click?campaign_id=12839&pub_id=133499&url=https%3A%2F%2Fwww.thenaturalwash.in&p1=guide_the-natural-wash-kitchen-clean-guide",
      label: "Check the official TNW catalogue",
      primary: true,
    },
    { href: "/go/amazon-in?src=guide-natural-wash-mid", label: "Compare TNW prices on Amazon India" },
  ],
  methodNote:
    "We read the official storefront navigation and offer banner, searched the official domain for cleaning products, and decoded a third-party INCI transcription for a real TNW product on 26 Nov 2026. Direct fetching of an individual product page was rate-limited. We did not purchase or test any product, and we found no source for the older kitchen-cleaning claims.",
  scenarios: [
    {
      heading: "What the official catalogue actually lists",
      body: "The storefront menu we read on 26 Nov 2026 shows All Products, Combos, Skin Care (facewash, serum, toner, moisturisers, masks, scrubs, face oil, SPF, eye care), Makeup, Body Care, Hair Care, Baby Care and Lip Care, plus concern-based collections. There is no home-cleaning or kitchen-cleaning category in that navigation. The banner advertised 'Upto 60% Off Sitewide + Extra 5% OFF' at the time of the check.",
      icon: null,
    },
    {
      heading: "INCI audit — Herbal Beetroot Lip Balm",
      body: "A third-party transcription lists Shea Butter, Bees Wax, Cocoa Butter, Kokum Butter, Almond Oil, Sunflower Oil, Jojoba Oil, Honey, Beet Root Extract, Carrot Seed Oil, Licorice, Wheat Germ Oil, Aloe Vera Extract, Glycerine, Apricot Oil, Avocado Oil, Grapeseed Oil, Vitamin E, Fragrance, Sepilift DPHP and colour. Two findings matter: beeswax and honey mean this is not a vegan formula, and Fragrance is listed despite 'natural' positioning. 'Natural' is a marketing word, not an allergen guarantee.",
      icon: null,
    },
    {
      heading: "The old 'kitchen-acid physics' paragraph",
      body: "Previous Durza copy described a lemon, bicarbonate and vinegar base, a 'कर्षिका acid' ingredient, ISO 9001 lab certification for surface safety, and a ₹0.40-per-week cost advantage over dish soap. We found no official page or independent source for any of those statements. They have been removed from the verdict rather than softened.",
      icon: null,
    },
    {
      heading: "How to read a cleaning claim without a lab report",
      body: "For any household cleaner, ask what the active is, what it is approved or tested against, the contact time, and whether the certification covers the product or only the factory. 'ISO 9001' is a quality-management standard for processes; by itself it does not prove a grease-cutting result. Never mix acidic cleaners with bleach — the combination can release chlorine gas. That is general household safety guidance, not a claim about any TNW product.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Item / claim", "What older Durza copy said", "What we verified on 26 Nov 2026", "Status"],
    rows: [
      [
        "Kitchen-acid cleaner / dish bundles",
        "Lemon + bicarbonate + 'कर्षिका acid' base for tough grease",
        "No cleaning category or product found in the official catalogue navigation or domain search",
        "Unverified — do not buy expecting this product",
      ],
      [
        "ISO 9001 'lab-certified for surface safety'",
        "Presented as a test result",
        "No certificate or product-specific testing statement located",
        "Unverified — ISO 9001 is a process standard, not a performance test",
      ],
      [
        "₹0.40 per week versus branded dish soap",
        "Presented as a worked cost-per-wash saving",
        "No pack size, price or usage rate found to support the calculation",
        "Unverified — arithmetic without inputs is not a saving",
      ],
      [
        "B2G1 on dish sets, TNW15 sitewide, UPI prepaid stack",
        "Presented as live offers",
        "Only 'Upto 60% Off Sitewide + Extra 5% OFF' was visible on the storefront banner we read",
        "Codes not verified; read the live cart",
      ],
      [
        "Herbal Beetroot Lip Balm (real SKU)",
        "Not covered by the old kitchen-clean copy",
        "Third-party INCI lists beeswax, honey, plant oils and Fragrance",
        "Ingredient list audited; not an official label scan",
      ],
    ],
  },
  checkoutSteps: [
    "Decide what you actually want. If it is kitchen cleaning, this storefront did not show those products when we checked — do not add items hoping they are cleaners.",
    "If you are buying a TNW SKU, read the INCI on the pack rather than relying on the 'natural' banner.",
    "Check for beeswax, honey and fragrance if you have allergies or reactive skin; the lip balm transcription contains all three.",
    "The sitewide banner and any extra percentage are snapshots; confirm the final payable amount and whether discounts combine before paying.",
    "For kitchen grease, compare an actual cleaner with a stated active ingredient and a printed safe-use direction instead of substituting a beauty product.",
  ],
  checkoutNote:
    "The official storefront and offer banner were read on 26 Nov 2026; one product page request was rate-limited. No purchase was made. Offers and catalogue contents change, so the store and cart are the source of truth.",
  verifiedFacts: {
    kicker: "The Natural Wash · checked 26 Nov 2026",
    title: "What we verified, and what failed verification",
    facts: [
      {
        label: "The catalogue is beauty and personal care, not home cleaning.",
        detail:
          "The official navigation lists Skin Care, Makeup, Body Care, Hair Care, Baby Care and Lip Care. We found no dishwash, utensil-cleaner or floor-cleaner category in the material we read.",
        href: "https://www.thenaturalwash.in",
      },
      {
        label: "A sitewide offer was visible; specific codes were not.",
        detail:
          "The storefront banner read 'Upto 60% Off Sitewide + Extra 5% OFF'. We did not verify TNW15, B2G1 on dish sets or a UPI prepaid stack from an official source.",
        href: "https://www.thenaturalwash.in",
      },
      {
        label: "A real TNW lip balm lists beeswax, honey and fragrance.",
        detail:
          "The third-party INCI for TNW Herbal Beetroot Lip Balm includes Bees Wax, Honey and Fragrance as well as plant butters and oils. That is inconsistent with a blanket 'vegan' reading of the brand.",
        href: "https://inkeedecoder.com/products/tnw-the-natural-wash-herbal-beetroot-lip-balm",
      },
      {
        label: "Kitchen-acid and grease claims could not be sourced.",
        detail:
          "A domain-restricted search for dishwash or kitchen cleaner returned no results, and a general search for the quoted phrases also returned nothing. We found no official product or independent test behind those claims.",
        href: "https://www.thenaturalwash.com",
      },
      {
        label: "The ₹0.40-per-week figure has no inputs behind it.",
        detail:
          "Without a verified pack size, price and dose, a cost-per-wash figure cannot be checked. We have removed it from the guide rather than repeating it.",
        href: "https://www.thenaturalwash.in",
      },
    ],
    note: "One official product page request was rate-limited. The INCI is a user-uploaded third-party transcription, not a label scan. No product was purchased or tested.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked the official The Natural Wash storefront, searched its domain for cleaning products, and decoded a third-party INCI transcription on 26 Nov 2026. Verification failed for the kitchen-cleaning premise: no cleaning category, dish bundle, ISO 9001 test claim or ₹0.40-per-week calculation could be confirmed. Those older statements are withdrawn, not merely caveated. We did not purchase or test any product and make no cleaning-performance claims. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "ISO 9001 certifies a quality-management process; it is not a laboratory result for grease removal.",
    "Never mix an acid-based cleaner with bleach — it can release chlorine gas. Mixing cleaning products is not a shortcut.",
    "'Natural' and 'herbal' describe positioning, not the absence of allergens; this brand's lip balm contains beeswax, honey and fragrance.",
    "The catalogue may change. A product that is absent today may appear later, and vice versa.",
    "Cost-per-use figures need a verified pack size, price and dose; we found none for the old kitchen claim.",
  ],
  exploreLinks: [
    { href: "/topics/beauty", label: "Beauty & Grooming topic hub" },
    { href: "/categories/beauty", label: "Beauty & Grooming category" },
    { href: "/guides/dot-and-key-skin-active-guide", label: "How we audit an INCI list" },
    { href: "/stores/the-natural-wash", label: "The Natural Wash store hub" },
    { href: "/stores/wonderchef", label: "Wonderchef store hub" },
    { href: "/stores/amazon-in", label: "Amazon India store hub" },
  ],
  faqs: [
    {
      question: "Where can I buy The Natural Wash kitchen cleaner?",
      answer:
        "We cannot point you to one. On 26 Nov 2026 the official catalogue showed beauty and personal-care categories only, and searches for a dishwash or kitchen cleaner on the official domain returned no results. If you need a kitchen cleaner, choose one with a stated active ingredient and safe-use directions.",
    },
    {
      question: "Was the ISO 9001 grease-safety claim made up?",
      answer:
        "We cannot say it was made up, but we could not verify it from any official page or certificate. ISO 9001 is a process standard, not a performance test. We have removed the claim because a badge is not evidence of a cleaning result.",
    },
    {
      question: "What did the INCI audit actually find?",
      answer:
        "In the third-party transcription of TNW Herbal Beetroot Lip Balm we found Shea Butter, Bees Wax, Cocoa Butter, Kokum Butter, several seed oils, Honey, Beet Root Extract, Aloe Vera Extract, Glycerine, Vitamin E, Fragrance and colour. Beeswax and honey mean it is not vegan, and fragrance is present. It is a 2026 label check, not a kitchen-cleaning test.",
    },
    {
      question: "Did Durza test these products?",
      answer:
        "No. We read the official catalogue and one third-party INCI transcription, did not purchase or test any product, and make no performance or dermatological claims.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. The kitchen-cleaning premise from an older Durza draft failed verification and has been corrected. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    { label: "Official The Natural Wash storefront", href: "https://www.thenaturalwash.in", checkedAt: "26 Nov 2026" },
    {
      label: "The Natural Wash product catalogue (alternate domain)",
      href: "https://www.thenaturalwash.com",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "INKEDEcoder — TNW Herbal Beetroot Lip Balm INCI",
      href: "https://inkeedecoder.com/products/tnw-the-natural-wash-herbal-beetroot-lip-balm",
      checkedAt: "26 Nov 2026",
    },
  ],
};
