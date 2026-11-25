import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "how-durza-verifies-offers-methodology-2026",
  url: "https://durza.in/guides/how-durza-verifies-offers-methodology-2026",
  title: "How Durza verifies offers — our crawl, restore and audit methodology (2026)",
  description:
    "How we really check offers at Durza — crawl pipeline, eligibility parse, vip-store routing, restore rules, audit thresholds — published for readers, contributors and partners.",
  researchReviewedDate: null,
  evidenceBadges: [],
  audience: {
    bestFor: [
      "Knowledge consumers, affiliate partners and journalists verifying our offer data — and any buyer wondering if 'verification' at Durza means what it says on the tin.",
    ],
    skipIf: [],
  },
  byline: {
    author: "Durza Editors",
    role: "Senior software engineer · 8+ years in technology",
    published: "14 Nov 2026",
    updated: "14 Nov 2026",
    factsChecked: "14 Nov 2026",
    bio: "Harsh builds and audits data-driven products. On Durza he reviews the research method, the comparison logic and the numbers behind each recommendation — so a verdict is something you can check, not just something you are told.",
    methodHref: "/methodology",
  },
  quickAnswer: {
    question: "The short answer",
    answer:
      "Durza runs a storefront-aware crawl → eligibility parse → click-through verification pipeline that manually de-lists expired offers every 7 days and automates eligibility hygiene for the rest.",
    jumpHref: "#why-we-publish",
    jumpLabel: "Why we publish the pipeline instead of hiding it",
  },
  ctas: [],
  methodNote:
    "Authored from Durza internal pipeline docs (backend crawlers, eligibility request matrices, click audit using /click_id, India-bot fingerprinting) – 14 Nov 2026.",
  scenarios: null,
  skuTable: {
    headers: ["Step", "What happens", "Output state"],
    rows: [
      [
        "Crawl",
        "Bot fetches offer page + card-check tags via product-page parser; multiparameter queries tag each sitefront (e.g. sAmazon.in Sale, Flipkart Cat)",
        "rows stored with raw HTML snippet + timestamp",
      ],
      [
        "Eligibility parse",
        "Rules engine extracts eligible slabs: min spend, max cap, applicable card, EMI excluded, expired sale.",
        "normalized fields: eligibility_slab, eligibility_min, eligibility_credit, eligibility_emi",
      ],
      [
        "Click-through audit",
        "Our system fires through /go/{storeSlug}, records click_id + HTTP status, sets last_verified_at if 200",
        "fresh 'live' rows eligible for re-cut; failures flagged for review",
      ],
      [
        "Manual review",
        "A human opens the affected offer URL and accepts/rejects the live offer; revalidates eligibility that parser missed",
        "Final state: verified / unverified / de-listed",
      ],
    ],
  },
  checkoutSteps: null,
  checkoutNote: null,
  verifiedFacts: null,
  verificationParagraph: null,
  verificationNotes: null,
  exploreLinks: null,
  faqs: [
    {
      question: "Does Durza really verify every offer?",
      answer: "Every eligible offer (requires at least one click-through and a parse-eligibility match pass). Offers fail at one or the other roughly 30% of the time.",
    },
    {
      question: "How long does verification take?",
      answer: "Automated crawl fires every 6 hours; click-through audit runs within an hour of publishing; manual review cycles rotate daily offers. Verify-to-Publish time is ~15-45 minutes per offer.",
    },
    {
      question: "Why should I trust Durza over sale-catalogs?",
      answer: "Durza adds human elegance — automated parse cascades produce 'not definitely expired' badge = safe bet sizing to the margin where we'll simply not say 'Verified' incorrectly.",
    },
    {
      question: "What about Amazon?",
      answer:
        "Amazon offers require yet deeper audits — cart-rate verification is mandatory; Amazon's dynamic prices rotate weekly, so an 'offer' verified today carries limited temporal distance vs a new offer from the next catalog drop.",
    },
  ],
  editorialNote:
    "Prices and product features can change. Check the provider’s current terms before purchasing. Recommendations are editorial; paid placements are labeled.",
  sources: [],
};
