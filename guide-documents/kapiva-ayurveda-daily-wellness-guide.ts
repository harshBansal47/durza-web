import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "kapiva-ayurveda-daily-wellness-guide",
  url: "https://durza.in/guides/kapiva-ayurveda-daily-wellness-guide",
  title: "Kapiva Supplements — Cost per Serving, Batch Reports & Safety (2026)",
  description:
    "Buy one jar before you subscribe. Worked ₹/serving maths for Shilajit Resin, a batch-report checklist, and clear medical exclusions. Reviewed 26 Nov 2026.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official product page", "Peer-reviewed safety literature", "No health claims"],
  audience: {
    bestFor: [
      "Adults 18+ comparing Kapiva Shilajit packs direct from kapiva.in against a marketplace listing, on a cost-per-serving basis.",
      "Shoppers who want to know what to check in a batch report and what the brand actually states about dose and minerals.",
    ],
    skipIf: [
      "Pregnant or lactating women and anyone under 18 — the official page restricts this product to adults and excludes pregnant or lactating women.",
      "People with kidney, liver, thyroid, blood-pressure or diabetes conditions, or on prescription medication — talk to a doctor before adding a concentrated herbal-mineral product.",
      "Anyone looking for medical treatment. Supplements do not diagnose, treat, cure or prevent disease, and this page makes no efficacy claims.",
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
    question: "Is a Kapiva subscription worth it, and what does a serving actually cost?",
    answer:
      "Start with one jar. The official page lists Himalayan Shilajit Resin 20g at ₹999 (MRP ₹1,199) for 80 stated servings of 250 mg — about ₹12.49 per serving. The same page lists 40g at ₹1,599 for 160 servings (₹9.99) and 60g at ₹1,999 for 240 servings (₹8.33), but those only win if you will finish them. We could not verify a fixed subscription percentage, so compare the live cart rather than assuming a discount. We did not open a batch-specific certificate or test any product.",
    jumpHref: "#scenarios",
    jumpLabel: "See the pack maths",
  },
  ctas: [
    {
      href: "https://track.vcommission.com/click?campaign_id=10126&pub_id=133499&url=https%3A%2F%2Fwww.kapiva.in&p1=guide_kapiva-ayurveda-daily-wellness-guide",
      label: "Check live prices on kapiva.in",
      primary: true,
    },
    { href: "/go/amazon-in?src=guide-kapiva-mid", label: "Compare Kapiva prices on Amazon India" },
    {
      href: "https://www.amazon.in/dp/B09BZNDYT2?tag=durza02-21&ascsubtag=guide_kapiva_table",
      label: "Check Shilajit Resin 20g on Amazon",
    },
  ],
  methodNote:
    "We read the official Kapiva product page and a marketplace listing on 26 Nov 2026, then checked peer-reviewed literature on shilajit safety and heavy metals. We did not purchase, consume or laboratory-test any product, and we did not open a batch-specific certificate of analysis. All prices are dated snapshots.",
  scenarios: [
    {
      heading: "Himalayan Shilajit Resin 20g — the one-jar test",
      body: "The official page shows ₹999 against an MRP of ₹1,199 (17% off) and states 80 servings at a ¼ teaspoon / 250 mg measure — roughly ₹12.49 per serving, or about ₹375 a month at one serving a day. It lists 60%+ fulvic acid and 80+ minerals, Triphala infusion, a traditional Shodhana purification step, GMP-certified manufacture and 'NABL reports available for every pack'. These are brand statements; we did not see a report for a specific batch.",
      icon: null,
    },
    {
      heading: "40g and 60g packs — where the per-serving cost drops",
      body: "The same page lists 40g at ₹1,599 for 160 servings (₹9.99 each) and 60g as two 30g packs at ₹1,999 for 240 servings (₹8.33 each). The maths is straightforward; the question is whether you will use 160 or 240 servings before the pack runs past its useful life. A lower per-serving price on a jar you finish slowly is not a saving.",
      icon: null,
    },
    {
      heading: "Shilajit + Ashwagandha Gold 20g combo",
      body: "Listed at ₹1,169 (20% off). It is not a like-for-like serving comparison with the plain resin because it bundles a second product. Do not divide the combo price by the shilajit serving count and call the result a shilajit saving — read both labels and compare the two products separately.",
      icon: null,
    },
    {
      heading: "The batch-report check, before the subscription",
      body: "Find the batch code on your jar and ask for the matching report. A useful certificate names the batch, the test date and an accredited lab, gives heavy metals such as lead, arsenic, mercury and cadmium with units and a limit, and states fulvic acid by a named method. A generic 'tested for purity' badge is not the same thing. If no matching report is available, do not treat that batch as verified.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Pack (official page, 26 Nov 2026)", "Stated servings", "Price & ₹/serving", "What we could and could not verify"],
    rows: [
      [
        "Himalayan Shilajit Resin 20g",
        "80 servings · 250 mg measure",
        "₹999 (MRP ₹1,199) → ₹12.49/serving",
        "Price, serving count and 60%+ fulvic acid claim read on kapiva.in; no batch COA opened",
      ],
      [
        "Himalayan Shilajit Resin 40g",
        "160 servings",
        "₹1,599 → ₹9.99/serving",
        "Price and count stated on the same official page; not independently checked at checkout",
      ],
      [
        "Himalayan Shilajit Resin 60g (2 × 30g)",
        "240 servings",
        "₹1,999 → ₹8.33/serving",
        "Price and count stated on the same official page; only buy if you will use 240 servings",
      ],
      [
        "Shilajit + Ashwagandha Gold 20g combo",
        "Shilajit servings not separately stated on the listing we read",
        "₹1,169 → not a comparable ₹/serving",
        "Two-product bundle; verify the ashwagandha dose and your medicine interactions first",
      ],
    ],
  },
  checkoutSteps: [
    "Buy one jar first. Confirm the 250 mg measure and the stated serving count on the pack you receive, not just on the webpage.",
    "Use the live cart to compare the one-off price with any subscription offer. We found no fixed subscription percentage we could stand behind, and combo codes may exclude each other.",
    "Check whether the ₹999 single jar or another pack gives the lower cost per serving for the quantity you will actually finish.",
    "Look for the batch code and request the matching report before treating purity or heavy-metal safety as verified.",
    "If you take thyroid, blood-pressure or diabetes medication, or have a kidney or liver condition, speak to your doctor before starting — a GMP certificate is a manufacturing standard, not a personal safety assessment.",
  ],
  checkoutNote:
    "Prices and offers are snapshots read 26 Nov 2026 from the official product page and a marketplace listing. Promotions, subscription terms and stock change often; the cart and the printed label are the only sources of truth.",
  verifiedFacts: {
    kicker: "Kapiva · checked 26 Nov 2026",
    title: "What the official page and the literature actually say",
    facts: [
      {
        label: "The 20g jar is ₹999 for 80 stated servings.",
        detail:
          "The official Kapiva page shows ₹999 against ₹1,199 MRP and gives a ¼ teaspoon / 250 mg measure with 80 servings. That is about ₹12.49 per serving — our arithmetic from the brand's own figures.",
        href: "https://www.kapiva.in/mens-health/kapiva-himalayan-shilajit-resin-20g/",
      },
      {
        label: "The brand states 60%+ fulvic acid and 80+ minerals.",
        detail:
          "The same page describes Himalayan sourcing, Shodhana purification, Triphala infusion, GMP-certified manufacture and NABL reports 'for every pack'. We did not open a report for a specific batch, so treat these as brand claims.",
        href: "https://www.kapiva.in/mens-health/kapiva-himalayan-shilajit-resin-20g/",
      },
      {
        label: "Independent reviewers still call for better human studies.",
        detail:
          "A published safety and efficacy review identifies dibenzo-α-pyrones and fulvic acid as likely constituents and explicitly says additional well-controlled human and animal studies with standardised products are needed. That is not a verdict that any specific brand works.",
        href: "https://pubmed.ncbi.nlm.nih.gov/23733436/",
      },
      {
        label: "Heavy metals are a real issue in this category.",
        detail:
          "A later review examines shilajit's heavy-metal profile, associated toxicities and how humic substances may bind metals. It supports checking a batch-specific report rather than relying on traditional reputation or colour and smell tests.",
        href: "https://pubmed.ncbi.nlm.nih.gov/38393486/",
      },
      {
        label: "The official page sets an adult-only boundary.",
        detail:
          "Kapiva says the resin is suitable for men and women over 18 and is not recommended for pregnant or lactating women. Older Durza copy about medical uses has been removed from this guide.",
        href: "https://www.kapiva.in/mens-health/kapiva-himalayan-shilajit-resin-20g/",
      },
    ],
    note: "We read the official product page and a marketplace listing; INCI-style lab data was not available to us, and no certificate of analysis was opened. Prices are dated snapshots. Durza did not buy or consume any product.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked the official Kapiva product page and a marketplace listing, and read peer-reviewed shilajit safety and heavy-metal literature on 26 Nov 2026. Prices and serving counts are dated brand statements, not independently audited figures. We did not purchase, consume or commission laboratory testing, did not open a batch-specific COA, and make no health or efficacy claims. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Dietary supplements are not medicines. They do not diagnose, treat, cure or prevent disease.",
    "The brand's 4-, 8- and 12-week benefit timeline on its FAQ is brand-reported and was not independently verified.",
    "A GMP certificate or an 'NABL reports available' statement is not proof about the specific jar in your hand — match the batch code.",
    "Colour, smell and texture tests are folklore, not a substitute for an accredited heavy-metal report.",
    "Herbal products can interact with prescription medicines; a doctor's advice is not replaced by a coupon or a lab badge.",
  ],
  exploreLinks: [
    { href: "/topics/health", label: "Health & Fitness topic hub" },
    { href: "/categories/supplements", label: "Supplements & Fitness category" },
    { href: "/compare/kapiva-vs-hkvitals-vs-healthkart-supplements-india", label: "Kapiva vs HK Vitals vs HealthKart compared" },
    { href: "/reviews/kapiva-himalayan-shilajit-resin-india-review", label: "Kapiva Shilajit resin review" },
    { href: "/guides/hkvitals-daily-multivitamin-guide", label: "HK Vitals cost-per-serving guide" },
    { href: "/stores/kapiva", label: "Kapiva store hub" },
    { href: "/stores/amazon-in", label: "Amazon India store hub" },
  ],
  faqs: [
    {
      question: "Should I subscribe or buy one-off?",
      answer:
        "Buy one jar first and check tolerance and the printed serving count. At ₹999 for 80 servings the single 20g jar works out to about ₹12.49 a serving. The 40g and 60g packs work out lower per serving on the official page, but only make sense if you will finish them. We could not verify a fixed subscription percentage, so compare the live cart instead of trusting an advertised rate.",
    },
    {
      question: "How do I verify a batch of shilajit without folklore?",
      answer:
        "Match the batch code on your jar to a report that names that batch, an accredited lab and a test date, and that reports lead, arsenic, mercury and cadmium with units and limits plus fulvic acid by a named method. Colour, smell and texture are not a certificate. We did not open a specific Kapiva COA ourselves.",
    },
    {
      question: "Is Kapiva safe if I am on medication?",
      answer:
        "We cannot tell you that. Supplements can interact with prescription medicines. If you take thyroid, blood-pressure or diabetes medication, or have a kidney or liver condition, speak to your doctor. GMP certification is a manufacturing standard, not proof that a product is safe for you or free of interactions.",
    },
    {
      question: "Did Durza test or consume these products?",
      answer:
        "No. We compared published label and pricing information on 26 Nov 2026 and make no health or efficacy claims. We did not buy, consume or independently lab-test any Kapiva product.",
    },
    {
      question: "Why did the old guide mention medical benefits?",
      answer:
        "That language was removed. The peer-reviewed literature we found describes traditional use and calls for better-controlled studies; it does not support Durza making treatment claims for an over-the-counter supplement.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Prices and serving counts are dated brand statements; no batch report was opened and no product was purchased or consumed. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Official Kapiva Himalayan Shilajit Resin 20g page",
      href: "https://www.kapiva.in/mens-health/kapiva-himalayan-shilajit-resin-20g/",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Amazon India — Kapiva Original Himalayan Shilajit Resin 20g",
      href: "https://www.amazon.in/Kapiva-Himalayan-Shilajit-Endurance-Stamina/dp/B09BZNDYT2",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Safety and efficacy of shilajit (mumie, moomiyo) — PubMed",
      href: "https://pubmed.ncbi.nlm.nih.gov/23733436/",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Hazardous or Advantageous: heavy metals in shilajit — PubMed",
      href: "https://pubmed.ncbi.nlm.nih.gov/38393486/",
      checkedAt: "26 Nov 2026",
    },
  ],
};
