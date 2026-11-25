import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "the-man-company-grooming-beard-kits-guide",
  url: "https://durza.in/guides/the-man-company-grooming-beard-kits-guide",
  title: "The Man Company Grooming — Beard Oil INCI & Kit Maths (2026)",
  description:
    "We decoded the beard oil label: carrier oils, vitamin E and four essential oils. Here is what a beard kit can and cannot do, and which older code claims we could not verify.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Third-party INCI transcription", "Official product listing", "Cosmetic claims only"],
  audience: {
    bestFor: [
      "Men comparing a beard oil single against a beard-care kit on ingredient quality and what is actually bundled.",
      "First-time buyers who want to know whether 'beard growth' oil is conditioning or treatment.",
    ],
    skipIf: [
      "Anyone expecting a cosmetic beard oil to treat alopecia or create hair where follicles are inactive — that is a medical question for a dermatologist.",
      "Anyone sensitive to essential oils: the transcribed formula includes thyme, rosemary, lemon and geranium oils.",
      "Shoppers relying on the older BEARD20, TMC15 or PREPAID5 codes — we could not verify those terms on 26 Nov 2026.",
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
    question: "Does The Man Company beard oil actually grow hair, and which code works?",
    answer:
      "The ingredient list we decoded is a conditioning blend — sweet almond, hazelnut, argan and jojoba oils, tocopheryl acetate and four essential oils, preserved with BHT. Softer, better-conditioned facial hair can look fuller because it breaks and sheds less; that is not the same as stimulating new follicles. The brand's newer 'Beard Growth Regime' page names RootBioTec, a brand claim we did not independently verify. We also could not verify BEARD20, TMC15 or PREPAID5, so check the live cart rather than treating them as active.",
    jumpHref: "#scenarios",
    jumpLabel: "See the INCI audit",
  },
  ctas: [
    {
      href: "https://track.vcommission.com/click?campaign_id=10248&pub_id=133499&url=https%3A%2F%2Fwww.themancompany.com&p1=guide_the-man-company-grooming-beard-kits-guide",
      label: "Check live offers on themancompany.com",
      primary: true,
    },
    { href: "/go/amazon-in?src=guide-man-company-mid", label: "Compare beard oil prices on Amazon India" },
    {
      href: "https://www.amazon.in/Man-Company-Beard-Growth-Oil/dp/B07GT3JQDT?tag=durza02-21&ascsubtag=guide_man_company_table",
      label: "Check The Man Company beard oil on Amazon",
    },
  ],
  methodNote:
    "We read the official beard-growth collection and beard-regime listing, a third-party user-uploaded INCI transcription dated 28 Jan 2025, and a marketplace listing on 26 Nov 2026. We did not buy, apply or laboratory-test any product, and no coupon code was independently validated.",
  scenarios: [
    {
      heading: "The beard oil INCI — what is really in the bottle",
      body: "The transcription lists Prunus Amygdalus Dulcis (Sweet Almond) Oil, Hazelnut Oil, Argania Spinosa Kernel Oil, Simmondsia Chinensis (Jojoba) Oil, Tocopheryl Acetate, Thyme Essential Oil, Rosemary Essential Oil, Lemon Essential Oil, Geranium Essential Oil and BHT. The first four are emollients; tocopheryl acetate is a stable vitamin E derivative; BHT is a preservative antioxidant. There is no minoxidil, no hormone blocker and no drug active on this list.",
      icon: null,
    },
    {
      heading: "Conditioning versus 'growth'",
      body: "Emollient oils coat the hair shaft and soften the skin underneath, which reduces breakage and flaking. A beard that breaks less can appear denser over a few weeks. That cosmetic effect is often marketed as 'growth'. We found no approved drug active in the INCI we decoded, and we cannot verify any claim that this oil creates new hair. Patchiness caused by alopecia or scarring needs a dermatologist.",
      icon: null,
    },
    {
      heading: "The essential-oil caveat for Indian skin",
      body: "Lemon peel oil is mostly limonene and contains furanocoumarins that can make daytime use phototoxic; rosemary oil contains camphor and geranium oil contains geraniol and citronellol, all potential irritants for reactive skin. In a humid climate, a heavy oil blend can also feel occlusive on acne-prone skin under the beard. Patch test for 7–10 days rather than assuming 'natural' means gentle.",
      icon: null,
    },
    {
      heading: "The Beard Growth Regime listing",
      body: "The official collection page describes a beard-growth regime featuring RootBioTec and thyme and sunflower oils, with language about density and patchiness. Those are brand statements from a product listing. We found no independent clinical data for that specific ingredient system and no verified concentration, so we do not repeat the outcome claims as fact.",
      icon: null,
    },
    {
      heading: "What we could not verify about offers",
      body: "Older Durza copy named BEARD20 on kits, TMC15 sitewide and a PREPAID5 stack above ₹999. We found no current official source confirming those codes, their exclusions or how they combine. The only safe advice is to apply each code in the live cart and compare the final payable amount; do not plan a purchase around an unverified percentage.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Product / source", "Ingredients or contents stated", "What it can realistically do", "Verification status"],
    rows: [
      [
        "The Man Company Beard Oil (third-party INCI, 28 Jan 2025)",
        "Sweet almond, hazelnut, argan and jojoba oils; tocopheryl acetate; thyme, rosemary, lemon and geranium oils; BHT",
        "Condition and soften hair and skin; no drug active for new follicle growth",
        "User-uploaded transcription, not an official label scan — check your pack",
      ],
      [
        "Beard Growth Regime (official collection page)",
        "Brand names RootBioTec, thyme oil and sunflower oil",
        "Brand positions it for density and patchiness; we have no independent trials for this SKU",
        "Official listing text only; concentration and outcomes unverified",
      ],
      [
        "Blanc Eau de Parfum (named in older Durza copy)",
        "No concentration or price verified",
        "A fragrance choice, not a grooming treatment",
        "Excluded from the verdict because we could not verify current details",
      ],
    ],
  },
  checkoutSteps: [
    "Start with a single beard oil rather than a multi-piece kit, and patch test for 7–10 days on the jawline or forearm.",
    "If you buy a kit, list what is inside it and price each item separately. A bundle is only a saving if you will use every piece.",
    "Check the back label for the essential oils listed above if you have sensitive skin or use the product in daytime sun.",
    "Try any code in the live cart and read the exclusions. We verified no fixed code or stacking rule.",
    "If your goal is genuine hair regrowth rather than conditioning, book a dermatology consultation instead of buying another oil.",
  ],
  checkoutNote:
    "Product listings and coupon terms were checked on 26 Nov 2026. Prices, kit contents and codes change frequently; the cart and the printed label are the only sources of truth. No purchase was made.",
  verifiedFacts: {
    kicker: "The Man Company · checked 26 Nov 2026",
    title: "What the INCI and the official listing say",
    facts: [
      {
        label: "The beard oil is a carrier-oil blend with essential oils.",
        detail:
          "The INKEDEcoder transcription lists sweet almond, hazelnut, argan and jojoba oils, tocopheryl acetate, thyme, rosemary, lemon and geranium essential oils and BHT. It is an emollient conditioning formula.",
        href: "https://inkeedecoder.com/products/the-man-company-beard-oil",
      },
      {
        label: "Lemon essential oil carries a daytime caveat.",
        detail:
          "The same INCI database notes that citrus peel oils are largely limonene and contain furanocoumarins that can be mildly phototoxic. That is a reason to be careful with daytime use, not a reason to panic.",
        href: "https://inkeedecoder.com/products/the-man-company-beard-oil",
      },
      {
        label: "The brand's growth page names RootBioTec.",
        detail:
          "The official beard-growth collection describes a regime with RootBioTec, thyme and sunflower oil. We found no independent clinical evidence for those claims and no verified percentage, so they remain brand statements.",
        href: "https://www.themancompany.com/collections/beard-growth",
      },
      {
        label: "The older code claims have no verified source.",
        detail:
          "BEARD20, TMC15 and PREPAID5 appeared in earlier Durza copy. We could not confirm them, their eligibility rules or their stacking behaviour from an official source on 26 Nov 2026.",
        href: "https://www.themancompany.com",
      },
      {
        label: "A marketplace listing describes the same oil as conditioning.",
        detail:
          "The Amazon India listing for the almond, thyme, argan and jojoba formula talks about softening and strengthening beard hair. That is cosmetic language, consistent with the INCI we decoded.",
        href: "https://www.amazon.in/Man-Company-Beard-Growth-Oil/dp/B07GT3JQDT",
      },
    ],
    note: "The INCI is a user-uploaded third-party transcription dated 28 Jan 2025 and is not an official label scan. We did not buy or apply any product and make no dermatological claims.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We read the official beard-growth collection, a third-party INCI transcription, and a marketplace listing on 26 Nov 2026. The INCI is old and user-uploaded, not a current printed label. Coupon codes from an earlier draft could not be verified and are not presented as active. We did not purchase or apply any product, and every 'growth' statement on this page is either a brand claim or a description of cosmetic conditioning. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Conditioning reduces breakage and can make a beard look fuller; it does not create new follicles.",
    "No minoxidil or other approved hair-loss drug appears in the INCI we decoded.",
    "Essential oils are frequent contact sensitisers; 'natural' does not mean non-irritating.",
    "Citrus peel oil in a leave-on product deserves care with daytime sun exposure.",
    "Patch testing is a screening step, not a diagnosis. See a dermatologist for genuine hair loss or persistent irritation.",
  ],
  exploreLinks: [
    { href: "/topics/beauty", label: "Beauty & Grooming topic hub" },
    { href: "/categories/beauty", label: "Beauty & Grooming category" },
    { href: "/guides/dot-and-key-skin-active-guide", label: "How we audit an ingredient list" },
    { href: "/stores/the-man-company", label: "The Man Company store hub" },
    { href: "/stores/hirafragrance", label: "Hira Fragrance store hub" },
    { href: "/stores/amazon-in", label: "Amazon India store hub" },
  ],
  faqs: [
    {
      question: "Is The Man Company beard oil DHT-blocking?",
      answer:
        "We found no DHT-blocking drug active in the INCI transcription: it is carrier oils, vitamin E derivative, essential oils and BHT. Any 'growth' language should be read as conditioning and appearance, not hormone modulation or medical treatment.",
    },
    {
      question: "Can TMC15 be stacked with PREPAID5?",
      answer:
        "We could not verify either code or their stacking behaviour from an official source on 26 Nov 2026. Apply each in the live cart and compare the payable amount. Do not assume an older guide's percentage still applies.",
    },
    {
      question: "Should I start with a kit or a single oil?",
      answer:
        "Start with one oil and patch test for 7–10 days. A kit is only good value if you will use every item, and a multi-product routine makes it harder to identify what caused an irritation.",
    },
    {
      question: "Did Durza test these products?",
      answer:
        "No. We compared a third-party INCI, official listing text and a marketplace page on 26 Nov 2026, did not buy or apply anything, and make no dermatological claims.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. The INCI is an old third-party transcription and the old code claims failed verification. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Official The Man Company beard-growth collection",
      href: "https://www.themancompany.com/collections/beard-growth",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official The Man Company Beard Growth Regime listing",
      href: "https://www.themancompany.com/products/beard-growth-regime-1",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "INKEDEcoder — The Man Company Beard Oil INCI",
      href: "https://inkeedecoder.com/products/the-man-company-beard-oil",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Amazon India — The Man Company beard oil",
      href: "https://www.amazon.in/Man-Company-Beard-Growth-Oil/dp/B07GT3JQDT",
      checkedAt: "26 Nov 2026",
    },
  ],
};
