import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "truebasics-clinical-strength-guide",
  url: "https://durza.in/guides/truebasics-clinical-strength-guide",
  title: "TrueBasics Supplements — Label Numbers & ₹/Active Ledger (2026)",
  description:
    "What the official TrueBasics pages actually state for Omega-3 and KSM-66 ashwagandha, a cost-per-100 mg ledger using dated prices, and who must consult a doctor first. Checked 26 Nov 2026.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: [
    "Official product pages & indexed listings checked",
    "FSSAI supplement-label rules consulted",
    "NIH / peer-reviewed safety evidence",
    "Ledger uses dated prices, not invented MRPs",
    "No purchase, ingestion or lab testing by Durza",
  ],
  audience: {
    bestFor: [
      "Adults 18+ comparing TrueBasics Omega-3 and KSM-66 Ashwagandha across single packs and multi-month sizes on a cost-per-active basis.",
      "Shoppers who want to see the exact label arithmetic before trusting a 'clinical strength' headline.",
    ],
    skipIf: [
      "Pregnant or lactating people, under-18s, anyone on blood thinners/antiplatelets or with a fish allergy, and anyone scheduled for surgery — consult a doctor first.",
      "People with thyroid disease, autoimmune conditions, liver problems or on prescription medication should not start ashwagandha without medical advice.",
      "Anyone seeking treatment for a disease, low triglyceride numbers or a diagnosed deficiency. These are FSSAI-regulated supplements, not medicines; this page makes no therapeutic claim.",
    ],
  },
  byline: {
    author: "Harsh Bansal",
    role: "Senior software engineer · 8+ years in technology",
    published: "25 Nov 2026",
    updated: "26 Nov 2026",
    factsChecked: "26 Nov 2026",
    bio: "Harsh builds and audits data-driven products. On Durza he reviews the research method, the comparison logic and the numbers behind each recommendation — so a verdict is something you can check, not just something you are told.",
    methodHref: "/methodology",
  },
  quickAnswer: {
    question: "What do the TrueBasics labels say, and which pack size costs less per active?",
    answer:
      "The official fish-oil product page we could read states 1150 mg omega-3 with 525 mg EPA and 375 mg DHA per softgel — 900 mg combined — at ₹549 for 30 capsules (MRP ₹699) on 26 Nov 2026; the size selector showed ₹1,149 for 60 and ₹1,449 for 90. That works out to about ₹2.03, ₹2.13 and ₹1.79 per 100 mg combined EPA+DHA respectively. Other official TrueBasics pages quote different figures (560 mg EPA/400 mg DHA), so check the physical label. KSM-66 ashwagandha is stated as 600 mg per serving with 5% withanolides; no therapeutic benefit is claimed here.",
    jumpHref: "#active-ledger",
    jumpLabel: "See the ₹/active ledger",
  },
  ctas: [
    {
      href: "/go/truebasics?src=guide-tb-mid&content_ref=guide_truebasics-clinical-strength-guide",
      label: "Check live TrueBasics bundles",
      primary: true,
    },
    { href: "/go/amazon-in?src=guide-tb-mid", label: "Compare TrueBasics prices on Amazon India" },
    {
      href: "https://www.amazon.in/s?k=TrueBasics+Triple+Strength+Omega+3+1250mg&tag=durza02-21&ascsubtag=guide_tb_table",
      label: "Search TrueBasics Omega-3 on Amazon",
    },
    { href: "https://www.truebasics.com", label: "Open the official TrueBasics site" },
  ],
  methodNote:
    "We read the official TrueBasics fish-oil product page and indexed official ashwagandha composition and sale listings, and checked FSSAI supplement-label direction, NIH ODS omega-3 guidance and peer-reviewed safety literature on 26 Nov 2026. Prices are dated snapshots of indexed/official pages and were not confirmed in a cart. We did not purchase, consume or laboratory-test any product, open a batch COA, or make any clinical claim.",
  scenarios: [
    {
      heading: "Omega-3: the label numbers are not consistent across official pages",
      body: "The fish-oil product page fetched on 26 Nov 2026 names the product 'Fish Oil with 1150mg Omega-3 525mg EPA 375mg DHA' and lists 30 capsules at ₹549 (MRP ₹699). Another official TrueBasics omega category page quotes both '1250 mg with 560 mg EPA and 400 mg DHA' and '525 mg EPA and 400 mg DHA'. We cannot resolve these conflicting figures from the web pages; the bottle you receive is the authority.",
      icon: null,
    },
    {
      heading: "KSM-66 ashwagandha: standardised extract, not a drug",
      body: "TrueBasics' official composition table states 600 mg KSM-66® ashwagandha root extract with 5% withanolides per serving. That is a brand-declared standardisation figure, not a batch COA we opened. Small trials of ashwagandha extracts exist, but results do not establish treatment of any disease, and safety in pregnancy, thyroid or autoimmune disease is not established by this guide.",
      icon: null,
    },
    {
      heading: "FSSAI label warnings apply to botanicals",
      body: "FSSAI's 2016 health-supplement/nutraceutical regulations require warning statements, prohibit medicinal claims, and an October 2026 advisory directed manufacturers of botanical products to state the plant part used and applicable cautions. Read the bottle's warnings; do not rely on a marketing page for contraindications.",
      icon: null,
    },
    {
      heading: "Bleeding risk and allergy are the practical cautions",
      body: "NIH ODS notes theoretical concerns about fish oil with anticoagulants, while a meta-analysis of randomised trials did not find an increased bleeding risk overall. Anyone on warfarin/antiplatelets, with a fish allergy or facing surgery should still ask a clinician. Stop and seek care for allergic reaction or unusual bleeding.",
      icon: null,
    },
    {
      heading: "Ashwagandha safety signals",
      body: "Peer-reviewed safety reviews discuss thyroid hormone modulation and liver-injury case reports with ashwagandha. People with thyroid disease, autoimmune conditions or liver problems, and pregnant or lactating people, should avoid self-supplementing and consult a doctor.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Product & pack", "Label figures we could source", "Dietary / caution", "Dated price & status"],
    rows: [
      [
        "Fish Oil with 1150 mg Omega-3, 525 mg EPA + 375 mg DHA — 30 capsules",
        "900 mg combined EPA+DHA per softgel; fish-derived; gelatin softgel",
        "Non-vegetarian; fish/shellfish allergy; consult if on blood thinners",
        "₹549 (MRP ₹699) on the official product page, 26 Nov 2026; confirm in cart",
      ],
      [
        "Same fish oil — 60 capsules",
        "Same label figures assumed from the size selector; verify on pack",
        "As above",
        "₹1,149 displayed in the size selector, 26 Nov 2026; confirm in cart",
      ],
      [
        "Same fish oil — 90 capsules",
        "Same label figures assumed from the size selector; verify on pack",
        "As above; a 90-day pack only saves money if you will finish it",
        "₹1,449 displayed in the size selector, 26 Nov 2026; confirm in cart",
      ],
      [
        "TrueBasics Ashwagandha — 60 capsules",
        "600 mg KSM-66® root extract, 5% withanolides per serving (official composition table)",
        "Check vegetarian marker and botanical warnings on the pack; avoid in pregnancy/thyroid/autoimmune disease without advice",
        "₹929 (MRP ₹1,129) on an indexed official sale listing, 26 Nov 2026; confirm in cart",
      ],
      [
        "Conflicting fish-oil figures on other official pages",
        "560 mg EPA + 400 mg DHA, or 525 mg EPA + 400 mg DHA, both quoted against '1250 mg' on an indexed official category page",
        "Do not average or guess — read your bottle",
        "No reliable price attached to the conflicting variant; unverified",
      ],
    ],
  },
  checkoutSteps: [
    "Buy one pack first to check digestive tolerance. Fish oil can cause GI upset; ashwagandha may cause drowsiness or stomach discomfort.",
    "Photograph or transcribe the EPA, DHA and KSM-66 milligrams from the bottle when it arrives; the web pages disagree, so the pack wins.",
    "Use the ledger below with the live cart price: cost per 100 mg combined EPA+DHA = (pack price ÷ capsule count) ÷ (combined mg ÷ 100). Only a bundle with a lower result is cheaper per active.",
    "Check the FSSAI licence number, batch code, vegetarian/non-vegetarian mark and botanical warning statements on the pack before use.",
    "Do not count codes such as CLINICAL20 or TRUE10 from the older Durza draft unless the checkout accepts them; compare final payable amounts, not banner percentages.",
  ],
  checkoutNote:
    "All ₹ figures are dated snapshots from the official product page or indexed official listings checked 26 Nov 2026, not confirmed cart totals. Size-selector prices and bundle terms can change; the checkout is the source of truth.",
  verifiedFacts: {
    kicker: "Official listings, FSSAI & peer-reviewed evidence · checked 26 Nov 2026",
    title: "What we verified — and what we could not",
    facts: [
      {
        label: "The readable fish-oil page states 525 mg EPA + 375 mg DHA",
        detail:
          "The official product page fetched 26 Nov 2026 labels the product 'Fish Oil with 1150mg Omega-3 525mg EPA 375mg DHA' and showed 30 capsules at ₹549 (MRP ₹699). The page title used a '1250mg' phrase, illustrating why the pack label must be checked.",
        href: "https://www.truebasics.com/sv/truebasics-fish-oil-with-1150mg-omega-3-525mg-epa-375mg-dha/SP-69915",
      },
      {
        label: "KSM-66 is stated as 600 mg with 5% withanolides",
        detail:
          "TrueBasics' official ashwagandha composition table lists 600 mg KSM-66® ashwagandha root extract per serving with 5% withanolides. This is a brand-declared figure, not a batch COA reviewed by Durza.",
        href: "https://truebasics.com/products/ashwagandha",
      },
      {
        label: "FSSAI prohibits medicinal claims and requires warnings",
        detail:
          "FSSAI's health-supplement/nutraceutical framework requires prominent warnings, prohibits medicinal or disease-cure claims, and its October 2026 advisory directed makers of botanical products to declare the plant part used and applicable cautions.",
        href: "https://thehindubusinessline.com/companies/fssai-directs-nutraceutical-makers-to-ensure-mandatory-warning-statements-on-products-with-herbal-extracts/article71604130.ece",
      },
      {
        label: "NIH ODS: bleeding concern is mostly theoretical at usual doses",
        detail:
          "NIH's omega-3 fact sheet discusses possible interactions with anticoagulants; a meta-analysis of randomised trials found omega-3 PUFA supplementation was not associated with increased bleeding overall. Clinician advice still applies to people on blood thinners or before surgery.",
        href: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional",
      },
      {
        label: "Ashwagandha has published safety cautions",
        detail:
          "Peer-reviewed reviews discuss thyrotoxicosis reports and liver injury associated with ashwagandha products; a 60-day randomised trial in stressed adults is often cited for stress outcomes but does not establish safety in pregnancy or thyroid/autoimmune disease.",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13436226",
      },
      {
        label: "Ashwagandha trials are small and condition-specific",
        detail:
          "A randomised, double-blind, placebo-controlled 60-day study assessed an ashwagandha extract in stressed healthy adults. Durza did not verify that the TrueBasics batch used the same extract or dose, and makes no clinical claim.",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6750292",
      },
    ],
    note: "Official pages conflict on the fish-oil MG figures. We did not open a product, read a physical label or obtain a batch-specific certificate of analysis.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked the official TrueBasics fish-oil product page, indexed official ashwagandha composition and sale listings, FSSAI's supplement-label direction via an October 2026 advisory report, NIH ODS omega-3 guidance and peer-reviewed omega-3/ashwagandha literature on 26 Nov 2026. Prices are dated snapshots, pack figures conflict between official pages, and no batch COA was opened. Durza did not purchase, consume or lab-test anything and makes no disease-treatment claim. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Original contribution — ₹/active ledger (inputs are dated page figures, not predictions): 30 caps ₹549 ÷ 30 = ₹18.30/softgel; ÷ 9 hundreds of mg = ₹2.03 per 100 mg EPA+DHA. 60 caps ₹1,149 ÷ 60 = ₹19.15/softgel → ₹2.13 per 100 mg. 90 caps ₹1,449 ÷ 90 = ₹16.10/softgel → ₹1.79 per 100 mg. Ashwagandha ₹929 ÷ 60 = ₹15.48 per 600 mg serving → ₹2.58 per 100 mg extract; 5% withanolides implies 30 mg withanolides per serving → about ₹0.52 per mg. Recompute with the live cart and your own label before deciding.",
    "The ledger assumes the same label figures apply to all pack sizes; that assumption was not verified from three separate bottles.",
    "The earlier Durza claim of 560 mg EPA + 400 mg DHA as a settled figure is unverified: other official pages quote different numbers. Do not treat any web figure as final.",
    "Stop use and seek medical advice for allergic reaction, persistent GI upset, unusual bleeding/bruising, jaundice, dark urine or palpitations.",
    "These supplements are not substitutes for prescribed omega-3 or any medication; do not stop prescribed treatment to buy a supplement.",
  ],
  exploreLinks: [
    { href: "/stores/truebasics", label: "TrueBasics store hub" },
    { href: "/stores/healthkart", label: "HealthKart store hub" },
    { href: "/stores/amazon-in", label: "Amazon India store hub" },
    { href: "/compare/kapiva-vs-hkvitals-vs-healthkart-supplements-india", label: "Indian supplement brands compared" },
    { href: "/guides/how-durza-verifies-offers-methodology-2026", label: "How Durza verifies offers" },
  ],
  faqs: [
    {
      question: "How much EPA and DHA does TrueBasics fish oil actually provide?",
      answer:
        "The official product page we could read states 525 mg EPA and 375 mg DHA (900 mg combined) per softgel for the 1150 mg variant. Other official pages quote 560 mg EPA/400 mg DHA or 525 mg/400 mg against a '1250 mg' description. We could not reconcile them, so read the bottle you receive.",
    },
    {
      question: "Which pack size is cheapest per active?",
      answer:
        "Using the dated page figures and assuming the same label across sizes: 30 capsules at ₹549 = about ₹2.03 per 100 mg combined EPA+DHA; 60 at ₹1,149 = about ₹2.13; 90 at ₹1,449 = about ₹1.79. The 90-pack looks best per active on those inputs, but only if you will finish it and the cart confirms the price.",
    },
    {
      question: "Does 600 mg KSM-66 mean 600 mg of withanolides?",
      answer:
        "No. The official composition table states 600 mg of KSM-66® root extract standardised to 5% withanolides — arithmetically 30 mg withanolides per serving. That standardisation is a brand-declared figure; no batch certificate was opened.",
    },
    {
      question: "Can I take these if I am on blood thinners or have a thyroid condition?",
      answer:
        "Do not self-supplement. Fish oil may interact with anticoagulant/antiplatelet therapy (though trial data do not show a clear bleeding increase), and ashwagandha has thyroid and liver safety signals in the literature. Ask your doctor first.",
    },
    {
      question: "Did Durza test purity or consume these products?",
      answer:
        "No. We read published label and pricing information and safety literature on 26 Nov 2026, did not open a batch COA, buy, consume or lab-test any product, and make no clinical claims.",
    },
  ],
  editorialNote:
    "Reviewed 26 Nov 2026. Prices and label figures are dated snapshots; official pages conflict on omega-3 milligrams. Durza may earn a commission through tracked links at no extra cost to you.",
  sources: [
    {
      label: "TrueBasics — Fish Oil 1150 mg / 525 EPA / 375 DHA product page",
      href: "https://www.truebasics.com/sv/truebasics-fish-oil-with-1150mg-omega-3-525mg-epa-375mg-dha/SP-69915",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "TrueBasics — Omega category page (conflicting figures)",
      href: "https://www.truebasics.com/omega?navKey=CL-4990",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "TrueBasics — Ashwagandha composition",
      href: "https://truebasics.com/products/ashwagandha",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "TrueBasics — indexed wellness sale listing",
      href: "https://truebasics.com/sale/wellness-products",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "FSSAI botanical-warning advisory report (Oct 2026)",
      href: "https://thehindubusinessline.com/companies/fssai-directs-nutraceutical-makers-to-ensure-mandatory-warning-statements-on-products-with-herbal-extracts/article71604130.ece",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "NIH ODS — Omega-3 Fatty Acids health professional sheet",
      href: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Omega-3 and bleeding risk meta-analysis",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11179820",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Ashwagandha safety review (thyroid, liver, immune effects)",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13436226",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Ashwagandha randomised 60-day trial",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6750292",
      checkedAt: "26 Nov 2026",
    },
  ],
};
