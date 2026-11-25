import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "zeroharm-clean-nutrition-guide",
  url: "https://durza.in/guides/zeroharm-clean-nutrition-guide",
  title: "ZeroHarm Liposomal Claims — A Bioavailability Fact-Check (2026)",
  description:
    "Does '4–6x absorption' hold up? We compare the brand's wording with a 2025 scoping review, a 500 mg randomised trial, FSSAI nano-food rules and NIH dose guidance — with no health-outcome claims. Checked 26 Nov 2026.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: [
    "Peer-reviewed scoping review & randomised trial",
    "NIH ODS dose/safety guidance",
    "FSSAI novel/nano-food framework consulted",
    "Brand claims labelled unverified",
    "No ZeroHarm product tested or dosed by Durza",
  ],
  audience: {
    bestFor: [
      "Adults 18+ comparing a premium liposomal supplement with ordinary ascorbic acid on the strength of the published evidence, not the ad copy.",
      "Shoppers who want to know what '4–6x bioavailability' can and cannot mean before paying a premium.",
    ],
    skipIf: [
      "People with kidney disease, a history of kidney stones, iron overload/haemochromatosis, or taking chemotherapy/radiation — high-dose vitamin C needs medical supervision.",
      "Those on anticoagulants, with gallbladder disease, or pregnant/lactating: curcumin and herbal blends may not be appropriate without medical advice.",
      "Anyone expecting treatment or prevention of cancer, diabetes or any disease. ZeroHarm's site uses such therapeutic language; Durza does not endorse it and makes no disease-treatment claim.",
      "Buyers relying on a fixed NANO25 or ZERO15 code: neither was verified at checkout on 26 Nov 2026.",
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
    question: "Is ZeroHarm's '4–6x bioavailability' claim backed by evidence?",
    answer:
      "Partly, but not for a specific ZeroHarm bottle. A 2025 scoping review of 10 liposomal-vitamin-C studies found higher plasma Cmax in nine of them (1.2–5.4x) and higher AUC in most (1.3–7.2x), but formulations, doses (0.15–10 g) and sampling times varied, all studies had industry funding or employed authors, none measured urinary elimination, and only two looked at biological effects. A 500 mg randomised trial found +27% plasma Cmax and +21% AUC versus standard vitamin C — not a 4–6x effect at that dose. Durza found no ZeroHarm-specific pharmacokinetic study or batch COA and makes no health-outcome claim.",
    jumpHref: "#claim-audit",
    jumpLabel: "See the claim fact-check",
  },
  ctas: [
    {
      href: "/go/zeroharm?src=guide-zeroharm-clean-nutrition-guide&content_ref=guide_zeroharm-clean-nutrition-guide",
      label: "Check live ZeroHarm offers",
      primary: true,
    },
    { href: "https://www.zeroharm.in/", label: "Open the official ZeroHarm site" },
    { href: "/stores/truebasics", label: "Compare conventional supplement pricing" },
    { href: "/stores/healthkart", label: "Compare supplement marketplaces" },
  ],
  methodNote:
    "We read ZeroHarm's own About page and indexed blog claims, a 2025 peer-reviewed scoping review, a 2024 randomised placebo-controlled crossover trial, NIH ODS vitamin C guidance, and the FSSAI/DBT nano-food guidance records on 26 Nov 2026. We did not buy, open, dose or test any ZeroHarm product, and did not see a batch-specific certificate of analysis. The FSSAI FAQ PDF was located but not machine-readable in our fetcher.",
  scenarios: [
    {
      heading: "The brand says '100% absorption' and 20–27x curcumin increases",
      body: "ZeroHarm's About page says nanotechnology gives '100% Absorption, No Wastage', and its indexed blogs cite up to 20-fold bioavailability for nano-curcumin and 27-fold blood concentrations for nano-curcumin. These are brand statements. The peer-reviewed vitamin C literature does not support a literal 100% absorption claim, and we did not see the underlying curcumin study tied to a ZeroHarm batch.",
      icon: null,
    },
    {
      heading: "What the scoping review actually found",
      body: "Carr's 2025 scoping review included 10 studies: nine reported higher plasma Cmax (1.2–5.4x) and AUC ratios up to 7.2x versus non-liposomal ascorbate. The authors stress that doses ranged from 0.15 to 10 g, sampling from 4 to 24 hours, baseline vitamin C status varied widely, and all studies had industry funding or employed authors.",
      icon: null,
    },
    {
      heading: "The best-controlled trial found a modest effect",
      body: "Purpura et al. (2024) randomised 27 adults to 500 mg liposomal vitamin C, 500 mg standard vitamin C or placebo in a double-blind crossover. Liposomal Cmax was 27% higher in plasma and 20% higher in leukocytes; AUC was 21% and 8% higher respectively. It was funded by the liposome ingredient supplier and measured blood levels, not health outcomes.",
      icon: null,
    },
    {
      heading: "Higher blood levels are not the same as better health",
      body: "The scoping review notes that no included study measured vitamin C elimination, so it is unclear how much is retained, and only two assessed biological effects. In those, antioxidant/oxidation outcomes were essentially similar between forms. We found no peer-reviewed evidence that a ZeroHarm product improves any disease outcome.",
      icon: null,
    },
    {
      heading: "Dose still dominates formulation",
      body: "NIH ODS states that 70–90% of vitamin C is absorbed at 30–180 mg/day but absorption falls below 50% above 1 g/day, with the excess excreted. Adult RDAs are 75–90 mg (85 mg in pregnancy, 120 mg in lactation). Paying a premium for a formulation does not remove these basic dose constraints.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Claim / product family", "Verifiable source", "Our fact-check", "Verdict"],
    rows: [
      [
        "'4–6x bioavailability' (older Durza draft)",
        "No ZeroHarm product page or study located for this exact claim",
        "Peer-reviewed liposomal-C ratios span roughly 1.2–7.2x depending on study design and dose",
        "Unverified as a ZeroHarm-specific claim; treat as marketing",
      ],
      [
        "'100% absorption, no wastage'",
        "ZeroHarm About page, checked 26 Nov 2026",
        "Contradicted by NIH ODS dose-absorption data and by the reviewed trials' own Cmax ratios",
        "Not supported as written",
      ],
      [
        "Nano-curcumin 'up to 20-fold' / '27 times higher'",
        "Indexed ZeroHarm blogs, checked 26 Nov 2026",
        "No batch-matched study or COA was opened; we do not repeat these as established facts",
        "Brand claim, unverified",
      ],
      [
        "Six clinical trials 'going on' in the US",
        "ZeroHarm About page, checked 26 Nov 2026",
        "The same page says results will be provided once published; no published results were verified",
        "Ongoing ≠ proven; no outcome claim accepted",
      ],
      [
        "FSSAI / nano-food approval for a specific SKU",
        "FSSAI nutraceutical FAQ and DBT nano-guidelines records",
        "India's framework requires prior approval for novel-technology/nano ingredients; no product-specific approval was verified",
        "Unknown — ask the brand for the approval and batch COA",
      ],
    ],
  },
  checkoutSteps: [
    "Ask the brand for the exact FSSAI licence number, the batch-specific COA and any approval for nano/novel ingredients before paying. Durza did not see these documents.",
    "Compare the price per gram of actual active, not the multiplier on the banner. If a 500 mg standard vitamin C and a liposomal product differ by +21% AUC in a funded trial, decide whether the premium is worth it to you.",
    "Check the dose per serving against NIH guidance: adult RDA is 75–90 mg; absorption falls below 50% above 1 g per dose. Do not stack high-dose products.",
    "At checkout, test any code. NANO25 and ZERO15 came from an older Durza draft and were not verified on 26 Nov 2026; do not assume they stack with a prepaid offer.",
    "If you are on medication or have kidney, liver, thyroid or autoimmune disease, consult your clinician before adding a high-dose or herbal/nano supplement.",
  ],
  checkoutNote:
    "We did not verify prices, codes, subscription terms or batch documents on 26 Nov 2026. The cited study effects belong to specific branded formulations tested in trials, not to any ZeroHarm SKU.",
  verifiedFacts: {
    kicker: "Peer-reviewed evidence, regulator guidance & brand pages · checked 26 Nov 2026",
    title: "The bioavailability claim, line by line",
    facts: [
      {
        label: "A 2025 scoping review found a wide, not fixed, range",
        detail:
          "Of 321 identified studies, 10 were included. Nine reported higher plasma bioavailability with liposomal ascorbate: 1.2–5.4-fold Cmax and 1.3–7.2-fold AUC. Doses ranged 0.15–10 g, sampling 4–24 h, and all studies had industry funding and/or employed authors.",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12163105",
      },
      {
        label: "The review's own conclusion is cautious",
        detail:
          "The authors state it is uncertain how much liposomal vitamin C is retained versus eliminated, because no study measured urinary ascorbate; cellular uptake was assessed in only two studies and biological effects in only two. They call for steady-state and clinical-outcome research.",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12163105",
      },
      {
        label: "A 500 mg randomised trial found +27% / +21%",
        detail:
          "Purpura et al. (Eur J Nutr, 2024) randomised 27 adults in a double-blind placebo-controlled crossover: liposomal vitamin C raised plasma Cmax by 27% and AUC0–24 by 21% versus standard vitamin C; leukocyte increases were 20% and 8%. The study was funded by the ingredient supplier.",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11519160",
      },
      {
        label: "NIH: absorption falls at high doses",
        detail:
          "NIH ODS states 70–90% absorption at 30–180 mg/day but less than 50% above 1 g/day, with unmetabolised ascorbate excreted in urine. Adult RDA is 90 mg for men and 75 mg for women.",
        href: "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/",
      },
      {
        label: "NIH: no proven disease benefit from supplementary vitamin C",
        detail:
          "The ODS fact sheet reports that most randomised trials found no effect of vitamin C supplements on cancer risk or cardiovascular events, and advises people undergoing chemotherapy/radiation to consult their oncologist before antioxidant supplements.",
        href: "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/",
      },
      {
        label: "India treats nano/novel-food ingredients as requiring approval",
        detail:
          "FSSAI's nutraceutical FAQ states that products using novel technology, including nanotechnology, need prior approval of the authority; government nano-guidelines likewise require labelling and registration of nano-containing food products. Durza did not verify any product-specific approval for ZeroHarm.",
        href: "https://fssai.gov.in/upload/uploadfiles/files/FAQs_Nutraceutical_Regulations_06_10_2020.pdf",
      },
      {
        label: "ZeroHarm's own claims are broader than the evidence",
        detail:
          "The About page states '100% Absorption, No Wastage' and describes six ongoing trials with results to be provided after publication; indexed blogs cite 20x and 27x nano-curcumin figures. These are brand statements, not verified outcomes for a specific bottle.",
        href: "https://zeroharm.in/pages/about-us",
      },
    ],
    note: "FSSAI's FAQ PDF was located but could not be machine-read in this check; it is cited for the stated approval principle only. No ZeroHarm-specific study, COA or approval document was opened.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked ZeroHarm's About page and indexed blog claims, the 2025 Carr scoping review, the 2024 Purpura randomised trial, NIH ODS vitamin C guidance, and Indian nano/novel-food guidance records on 26 Nov 2026. Study effects apply to the specific formulations tested, not to any ZeroHarm SKU. We found no ZeroHarm-specific pharmacokinetic study or batch COA, did not buy or consume any product, and make no disease-treatment claim. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Original contribution — claim fact-check: separate three questions. (1) Does liposomal C raise blood levels? Generally yes in short studies. (2) By how much? Anywhere from ~1.2x to ~7.2x depending on formulation, dose, baseline status and sampling — not a fixed 4–6x. (3) Does that improve health outcomes? Not established; only two studies looked at biological effects and they showed minimal differences. A brand multiplier answers none of these for a specific bottle.",
    "The '4–6x' and 'lab-audited batch COAs on every bottle' statements in the older Durza draft were not verified and are not repeated as fact.",
    "Seek medical advice before high-dose vitamin C with kidney disease, stone history or iron overload, and before curcumin or herbal blends if you take anticoagulants or have gallbladder disease.",
    "Stop use and consult a clinician for severe diarrhoea, abdominal pain, allergic reaction or jaundice after starting any supplement.",
    "No code is claimed as active: NANO25 and ZERO15 were unverified on 26 Nov 2026.",
  ],
  exploreLinks: [
    { href: "/stores/zeroharm", label: "ZeroHarm store hub" },
    { href: "/stores/truebasics", label: "TrueBasics — conventional supplements" },
    { href: "/stores/healthkart", label: "HealthKart store hub" },
    { href: "/guides/how-durza-verifies-offers-methodology-2026", label: "How Durza verifies offers" },
  ],
  faqs: [
    {
      question: "Is '4–6x bioavailability' a real number?",
      answer:
        "It is within the range reported across liposomal-vitamin-C studies, but no single trial or ZeroHarm-specific test establishes 4–6x for a particular product. The 2025 review reports 1.2–5.4x Cmax and up to 7.2x AUC across very different formulations and doses.",
    },
    {
      question: "Does a higher blood level mean better immunity or health?",
      answer:
        "Not demonstrated. The review found no measurements of vitamin C elimination and only two studies of biological effects, with minimal differences. Durza makes no immunity, disease-prevention or treatment claim.",
    },
    {
      question: "What did the best-controlled study show?",
      answer:
        "A 2024 double-blind placebo-controlled crossover in 27 adults using 500 mg doses found liposomal vitamin C raised plasma Cmax by 27% and AUC by 21% versus standard vitamin C. The study was funded by the ingredient supplier and did not test health outcomes.",
    },
    {
      question: "Are ZeroHarm's nano products approved by FSSAI?",
      answer:
        "We could not verify a product-specific approval. FSSAI's guidance says novel-technology and nano ingredients need prior approval; ask the brand for the licence, approval reference and a batch-linked COA.",
    },
    {
      question: "Who should not take high-dose vitamin C or curcumin products?",
      answer:
        "People with kidney disease or stone history, iron overload, those on chemotherapy/radiation, anticoagulants, with gallbladder disease, and pregnant/lactating people should consult a clinician first. These supplements do not treat disease.",
    },
    {
      question: "Did Durza test or consume ZeroHarm products?",
      answer:
        "No. We fact-checked published claims against peer-reviewed and regulator sources on 26 Nov 2026 and found no product-specific study or COA. No health-outcome claim is made.",
    },
  ],
  editorialNote:
    "Reviewed 26 Nov 2026. Study results belong to the formulations tested in those papers, not to a ZeroHarm purchase. Durza may earn a commission through tracked links at no extra cost to you.",
  sources: [
    {
      label: "ZeroHarm — About Us (brand claims)",
      href: "https://zeroharm.in/pages/about-us",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "ZeroHarm — nano-encapsulation blog (20x claim)",
      href: "https://zeroharm.in/blogs/general-health/nano-encapsulation-technology-in-nutraceuticals",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Carr 2025 — liposomal vitamin C scoping review",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12163105",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Purpura et al. 2024 — 500 mg randomised crossover trial",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11519160",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "NIH ODS — Vitamin C health professional fact sheet",
      href: "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "FSSAI — Nutraceutical regulations FAQs (nano prior approval)",
      href: "https://fssai.gov.in/upload/uploadfiles/files/FAQs_Nutraceutical_Regulations_06_10_2020.pdf",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "PIB — Guidelines for evaluation of nano-based food products",
      href: "https://pib.gov.in/PressReleasePage.aspx?PRID=1637011",
      checkedAt: "26 Nov 2026",
    },
  ],
};
