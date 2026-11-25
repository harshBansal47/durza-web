import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "nourish-mantra-vegan-anti-aging-guide",
  url: "https://durza.in/guides/nourish-mantra-vegan-anti-aging-guide",
  title: "Nourish Mantra Skincare — INCI Audit & Routine Cost (2026)",
  description:
    "We decoded a Nourish Mantra serum label: niacinamide, a vitamin C derivative, and fragrance. Here is what 'vegan anti-aging' means in cosmetic terms — and what it does not.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Third-party INCI transcription", "Official brand claim", "Cosmetic claims only"],
  audience: {
    bestFor: [
      "Shoppers comparing Nourish Mantra serums on ingredient lists rather than on 'glow' marketing.",
      "Buyers with reactive skin who want to know whether a vegan-labelled serum still contains fragrance and essential oils.",
    ],
    skipIf: [
      "Anyone seeking treatment for wrinkles, melasma, eczema or acne scarring — cosmetic serums do not replace dermatological care.",
      "People with fragrance or essential-oil sensitivity: the serum INCI we decoded lists fragrance and citrus oil.",
      "Shoppers who need a current, label-scanned INCI — the transcription we found was uploaded in 2021 and may not match the pack you receive.",
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
    question: "Is Nourish Mantra fragrance-free, and does 'vegan anti-aging' mean medical results?",
    answer:
      "No and no. The brand states PETA-certified vegan and cruelty-free, but the third-party INCI transcription for its Urban Rani Facial Serum lists Fragrance (less than 1%), Benzyl Alcohol and Sweet Orange Oil alongside Niacinamide and Sodium Ascorbyl Phosphate. Vegan describes sourcing, not absence of allergens. These are cosmetic ingredients that can support hydration and the appearance of tone; they are not prescription treatment for wrinkles or pigmentation. The INCI we read was uploaded in 2021 — check your own pack.",
    jumpHref: "#scenarios",
    jumpLabel: "See the INCI audit",
  },
  ctas: [
    {
      href: "https://track.vcommission.com/click?campaign_id=12144&pub_id=133499&url=https%3A%2F%2Fwww.nourishmantra.in&p1=guide_nourish-mantra-vegan-anti-aging-guide",
      label: "Check live offers on nourishmantra.in",
      primary: true,
    },
    { href: "/go/amazon-in?src=guide-nourish-mantra-mid", label: "Compare Nourish Mantra prices on Amazon India" },
    {
      href: "https://www.amazon.in/Nourish-Mantra-Vitamin-Parabens-Sulphates/dp/B09NC1LQGF?tag=durza02-21&ascsubtag=guide_nourish-mantra_table",
      label: "Check the Vitamin C serum on Amazon",
    },
  ],
  methodNote:
    "We read the brand's official site and ingredient statement, a third-party user-uploaded INCI transcription for Urban Rani Facial Serum, two peer-reviewed reviews on niacinamide and topical vitamin C, and AAD patch-test guidance on 26 Nov 2026. We did not buy, open or patch-test any product, and the INCI is not an official label scan.",
  scenarios: [
    {
      heading: "Urban Rani Facial Serum — the label we could actually read",
      body: "A third-party INCI transcription uploaded on 15 Apr 2021 lists Purified Aqua, Glycerin, Niacinamide, Hyaluronic Acid, Xanthan Gum, Aloe Barbadensis Leaf Extract, Benzyl Alcohol, Allantoin, Glycyrrhiza Glabra Extract, Potassium Sorbate, Sodium Benzoate, Sodium Ascorbyl Phosphate, oat and saffron extracts, several plant oils, Tocopherol, Tocopheryl Acetate, Citrus Sinensis (Sweet Orange) Oil and Fragrance (less than 1%). It is a useful starting point, not proof of the current formula.",
      icon: null,
    },
    {
      heading: "Niacinamide — the strongest-supported active on this list",
      body: "Niacinamide appears near the top of the transcribed list, but no percentage is given. Independent reviews support roles in barrier support, oil balance and the appearance of tone; most trials use roughly 2–5%. More is not automatically better, and above 10% tolerance often drops. Treat 'anti-aging' here as cosmetic improvement in appearance, not reversal of skin ageing.",
      icon: null,
    },
    {
      heading: "Sodium Ascorbyl Phosphate — a stable vitamin C derivative",
      body: "The transcribed INCI uses SAP rather than pure L-ascorbic acid. SAP is more stable, but peer-reviewed reviews note limited skin penetration compared with pure ascorbic acid and weaker evidence for the same photo-protective effect. A vitamin C derivative on a label is not interchangeable with a clinical-strength L-ascorbic acid serum.",
      icon: null,
    },
    {
      heading: "Fragrance and citrus oil — the part the 'clean' framing hides",
      body: "Benzyl Alcohol, Sweet Orange Oil and generic Fragrance are all listed. Benzyl Alcohol is a permitted preservative but can irritate some skin; citrus peel oil is largely limonene, a common sensitiser that can oxidise after opening. Vegan and cruelty-free say nothing about this. Patch test for 7–10 days before using a new pack on your face.",
      icon: null,
    },
    {
      heading: "What we could not verify",
      body: "Older Durza copy claimed GLOW20 above ₹1,499, MANTRA15 sitewide, EXTRA5 at payment, free delivery above ₹499 and a bakuchiol line. We found no current official source confirming those specific terms or a bakuchiol concentration, so they are not presented as active offers. The US site shows a 'buy 2 get 10%, buy 3 get 20%' banner, which is a different market and should not be assumed to apply in India.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Product / source", "Actives on the label", "Fragrance / sensitivity", "Verification status"],
    rows: [
      [
        "Urban Rani Facial Serum (third-party INCI, uploaded 15 Apr 2021)",
        "Niacinamide, Sodium Ascorbyl Phosphate, Glycerin, Hyaluronic Acid, plant oils, Tocopherol",
        "Fragrance (<1%), Benzyl Alcohol, Sweet Orange Oil — not fragrance-free",
        "User-uploaded transcription, not an official label scan; no percentages verified",
      ],
      [
        "Vitamin C Glow Serum (Amazon India listing)",
        "Brand text names Vitamin C, Hyaluronic Acid, Niacinamide, Aloe Vera and Moringa",
        "Full INCI not verified from an official printed label",
        "Listing text only; do not assume the same formula as Urban Rani",
      ],
      [
        "Radiant Glow Serum (official India product page)",
        "Brand describes a Vitamin C tonic",
        "Full INCI not available in the material we read",
        "Page title and brand description confirmed; formula not audited",
      ],
    ],
  },
  checkoutSteps: [
    "Choose one serum first. Do not start two new active products in the same week.",
    "Read the back label of the pack you receive. If it differs from the 2021 INCI we decoded, trust the pack.",
    "Patch test twice daily for 7–10 days on the underside of the forearm or the bend of the elbow — a 24-hour check can miss a delayed reaction.",
    "Check fragrance and citrus-oil sensitivity before using it in a morning routine, and use a broad-spectrum SPF 50 daily while introducing brightening actives.",
    "Only then compare cart totals. We have not verified current Indian coupon codes, stacking rules or a free-delivery threshold, so read the payment summary before paying.",
  ],
  checkoutNote:
    "Prices, codes and offers change frequently. We verified the brand's vegan/cruelty-free statement and an older INCI transcription, not any current discount. The cart is the only source of truth for payable amount.",
  verifiedFacts: {
    kicker: "Nourish Mantra · checked 26 Nov 2026",
    title: "What the label and the evidence actually say",
    facts: [
      {
        label: "The brand states PETA-certified vegan and cruelty-free.",
        detail:
          "That claim appears on the official Nourish Mantra site and on its ingredient statement page. It describes sourcing and testing policy, not allergen content or clinical performance.",
        href: "https://nourishmantra.in",
      },
      {
        label: "The serum transcription includes fragrance.",
        detail:
          "The INKEDEcoder entry for Urban Rani Facial Serum lists Fragrance (less than 1%), Benzyl Alcohol and Citrus Sinensis (Sweet Orange) Oil. 'Vegan' and 'fragrance-free' are separate claims.",
        href: "https://inkeedecoder.com/products/nourish-mantra-urban-rani-facial-serum",
      },
      {
        label: "Niacinamide evidence is cosmetic, not curative.",
        detail:
          "A published review describes niacinamide's barrier, oil-balance and hyperpigmentation-appearance effects at typical 2–5% levels. It does not make niacinamide a treatment for melasma or eczema, and no percentage is verified for this product.",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8389214",
      },
      {
        label: "Topical vitamin C evidence is formulation-specific.",
        detail:
          "A peer-reviewed review of topical vitamin C distinguishes pure L-ascorbic acid from derivatives on stability and penetration. Sodium Ascorbyl Phosphate is not clinically interchangeable with a high-strength L-ascorbic acid serum.",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5605218",
      },
      {
        label: "AAD recommends days of patch testing, not hours.",
        detail:
          "The American Academy of Dermatology advises applying a new product twice daily for 7–10 days to a small area such as the underside of the arm or the bend of the elbow. Older Durza advice to patch test just behind the ear was too casual.",
        href: "https://www.aad.org/public/everyday-care/skin-care-secrets/prevent-skin-problems/test-skin-care-products",
      },
    ],
    note: "The INCI comes from a user-uploaded third-party database dated 2021 and is not an official label scan. We did not purchase, open or patch-test any Nourish Mantra product.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked the official Nourish Mantra site and ingredient statement, a third-party INCI transcription, niacinamide and vitamin C reviews, and AAD patch-test guidance on 26 Nov 2026. No product was purchased, opened or patch-tested. The INCI is an old user-uploaded transcription rather than a current printed label, and every 'anti-aging' or 'glow' result is a cosmetic appearance claim. We make no dermatological claims. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Vegan and cruelty-free are sourcing and testing claims; they do not mean fragrance-free or hypoallergenic.",
    "Ingredient position suggests relative quantity but no percentages were verified for this formula.",
    "Sweet orange oil contains limonene, which can oxidise after opening; patch test each new pack.",
    "Cosmetic actives can support hydration and the appearance of tone; they do not treat wrinkles, melasma or eczema.",
    "The specific Indian coupon codes and thresholds in older Durza copy could not be verified and are not repeated as facts.",
  ],
  exploreLinks: [
    { href: "/topics/beauty", label: "Beauty & Grooming topic hub" },
    { href: "/categories/beauty", label: "Beauty & Grooming category" },
    { href: "/guides/indian-skincare-actives-haircare-guide", label: "Beginner's guide to skincare actives" },
    { href: "/guides/dot-and-key-skin-active-guide", label: "Dot & Key actives and patch-testing guide" },
    { href: "/compare/kama-ayurveda-vs-forest-essentials-vs-indus-valley", label: "Ayurvedic skincare comparison" },
    { href: "/stores/nourish-mantra", label: "Nourish Mantra store hub" },
    { href: "/stores/dot-and-key", label: "Dot & Key store hub" },
  ],
  faqs: [
    {
      question: "Are Nourish Mantra serums vegan and fragrance-free?",
      answer:
        "The brand states PETA-certified vegan and cruelty-free. Fragrance-free is a different claim: the INCI transcription we read for Urban Rani Facial Serum lists Fragrance (less than 1%), Benzyl Alcohol and Sweet Orange Oil. Check the back label of your own pack, especially if your skin is reactive.",
    },
    {
      question: "Does the serum treat wrinkles or pigmentation?",
      answer:
        "No. Niacinamide and a vitamin C derivative can support barrier function, hydration and the appearance of tone. They are cosmetic ingredients, not prescription treatment for wrinkles, melasma or acne scarring. See a dermatologist for those concerns.",
    },
    {
      question: "How should I introduce this serum?",
      answer:
        "Patch test twice daily for 7–10 days on the underside of the arm or the bend of the elbow. Start with one new active at a time and use a broad-spectrum SPF 50 every morning, particularly while using brightening ingredients.",
    },
    {
      question: "Is the INCI list on this page the current formula?",
      answer:
        "We cannot say. The transcription we read was uploaded on 15 Apr 2021. Formulas change; the printed label on the pack you receive is authoritative.",
    },
    {
      question: "Did Durza test these products?",
      answer:
        "No. We compared published claims, a third-party INCI transcription and peer-reviewed evidence on 26 Nov 2026 and make no dermatological claims.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. The INCI is an old third-party transcription and no product was purchased or patch-tested. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    { label: "Official Nourish Mantra India site", href: "https://nourishmantra.in", checkedAt: "26 Nov 2026" },
    {
      label: "Nourish Mantra ingredient statement",
      href: "https://nourishmantra.com/pages/ingredients",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "INKEDEcoder — Urban Rani Facial Serum INCI",
      href: "https://inkeedecoder.com/products/nourish-mantra-urban-rani-facial-serum",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Amazon India — Nourish Mantra Vitamin C Serum",
      href: "https://www.amazon.in/Nourish-Mantra-Vitamin-Parabens-Sulphates/dp/B09NC1LQGF",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Niacinamide evidence review",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8389214",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Topical vitamin C review",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5605218",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "AAD patch-test guidance",
      href: "https://www.aad.org/public/everyday-care/skin-care-secrets/prevent-skin-problems/test-skin-care-products",
      checkedAt: "26 Nov 2026",
    },
  ],
};
