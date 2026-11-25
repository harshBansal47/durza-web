import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "sale-calendar-india-eors-pink-friday-2026",
  url: "https://durza.in/guides/sale-calendar-india-eors-pink-friday-2026",
  title: "India Sale Calendar 2026 — EORS, Pink Friday & What Is Actually Confirmed",
  description:
    "Confirmed store-published windows, clearly labelled expectations, and a dated price-reveal ledger showing why a revealed sale price is not a payable one.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Store-published dates", "Dated price snapshots", "Original confirmed-vs-expected timeline", "No invented windows"],
  audience: {
    bestFor: [
      "Shoppers planning a 2026 purchase around a sale and wanting dates a store actually published.",
      "Anyone comparing a revealed sale price against a dated current price for the same SKU.",
    ],
    skipIf: [
      "Anyone treating an expected date as a live sale window — expectations are labelled and are not confirmed.",
      "Readers wanting hands-on testing. This guide uses dated official pages and indexed listings; Durza did not buy or test any product.",
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
    question: "Which 2026 Indian sale dates are confirmed, and when is Nykaa's Pink Friday?",
    answer:
      "Confirmed from store-published material we checked: Myntra End of Reason Sale summer 2026 from 29 May with 50–90% off (official EORS page snippet; direct page fetch timed out on 26 Nov), and Tata CLiQ's Big CLiQ Sale 14–31 May 2026 (official press release). Nykaa's own price-reveal page showed 'Pink Friday Sale Price' labels on 26 Nov 2026 but no dates; third-party sites disagree between 21 and 27 November. Do not treat any of those third-party dates as confirmed. Winter EORS is expected in early December, not announced. Revealed prices are not payable prices — our dated ledger shows ₹719 current versus ₹559 revealed on one lip gloss, about 22.3% lower by our arithmetic.",
    jumpHref: "#scenarios",
    jumpLabel: "See the confirmed-vs-expected timeline",
  },
  ctas: [
    {
      href: "/go/tatacliq-com-ecommerce-cps-india?src=guide&sub=guide_sale-calendar-india-eors-pink-friday-2026",
      label: "Check live Tata CLiQ sale offers",
      primary: true,
    },
    {
      href: "/go/nykaa?src=guide&sub=guide_sale-calendar-india-eors-pink-friday-2026",
      label: "Check Nykaa's live sale prices",
    },
    {
      href: "https://www.nykaa.com/price-reveal-new-drops-pink-summer-sale-2026/c/100798",
      label: "Read Nykaa's price-reveal page",
    },
  ],
  methodNote:
    "On 26 Nov 2026 we checked an official Tata CLiQ press release, an indexed official Myntra EORS snippet, Nykaa's own price-reveal page and earlier Durza audit notes dated 25 Nov 2026. The direct Myntra page fetch timed out, and several previously recorded dates could not be re-verified; each is labelled accordingly. All percentage calculations are Durza's arithmetic on published figures.",
  scenarios: [
    {
      heading: "Confirmed vs expected: the 2026 timeline",
      body: "CONFIRMED — Big CLiQ Sale, 14–31 May 2026, from an official press release covering Tata CLiQ Fashion, Luxury and Palette. CONFIRMED (indexed official snippet; direct fetch timed out) — Myntra EORS summer 2026 starting 29 May, advertised at 50–90% off. CONFIRMED IN PRIOR DURZA AUDIT, NOT RE-VERIFIED TODAY — Flipkart Black Friday 21–27 Nov 2026 and Tata CLiQ Black Friday 19–30 Nov 2026. EXPECTED ONLY — winter EORS in early December (third-party guidance; Myntra's live page showed no dates). UNCONFIRMED — Nykaa Pink Friday dates: its own page showed price labels but no dates, while third-party sites variously claimed 21 November, 27 November and 21–28 November. Sources disagree, so Durza publishes no confirmed window.",
      icon: "cap",
    },
    {
      heading: "A revealed price is not a payable price",
      body: "Nykaa's official reveal page, last updated 25 Nov 2026, showed Maybelline Lifter Gloss at ₹799 regular, ₹719 current and ₹559 'Pink Friday Sale Price'. The ₹559 is ₹160 below the price a shopper could see on 26 Nov, about 22.3% lower by our arithmetic, and ₹240 below regular (30%). L'Oréal Telescopic Extensionist showed ₹1,099 regular and ₹824 revealed (25%). None of those amounts was confirmed as payable at checkout on 26 Nov 2026.",
      icon: "laptop",
    },
    {
      heading: "Build a same-SKU baseline before a sale",
      body: "Match the full product name and variant, record the price you can pay today, then compare the sale price against that number — not against MRP. The Lifter Gloss example shows why: the 30% headline is measured against ₹799, while the real incremental cut from today's price is about 22%. MRP is a reference ceiling, not a record of what a product usually sold for.",
      icon: "gamepad",
    },
    {
      heading: "What failed verification in this recheck",
      body: "The direct Myntra EORS page request timed out, so its dates rest on an indexed official snippet rather than a page we fully read. We did not re-open Flipkart's or Lenovo's offer pages on 26 Nov 2026, so those earlier Durza dates and the third-party Lenovo price-history record are carried as 'earlier audit, not re-verified'. No third-party Nykaa date is promoted to a confirmed window.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Event or price point", "Dates / figures", "Status on 26 Nov 2026", "Source basis"],
    rows: [
      ["Tata CLiQ Big CLiQ Sale", "14–31 May 2026", "CONFIRMED", "Official press release"],
      ["Myntra EORS summer", "From 29 May 2026; 50–90% off", "CONFIRMED via indexed official snippet; direct fetch timed out", "Official Myntra EORS page snippet"],
      ["Flipkart Black Friday", "21–27 Nov 2026", "EARLIER DURZA AUDIT — not re-verified on 26 Nov", "Prior audit note dated 25 Nov 2026"],
      ["Tata CLiQ Black Friday", "19–30 Nov 2026", "EARLIER DURZA AUDIT — not re-verified on 26 Nov", "Prior audit note dated 25 Nov 2026"],
      ["Myntra winter EORS", "Expected early December 2026", "EXPECTED — not announced", "Third-party guidance; Myntra live page showed no dates"],
      ["Nykaa Pink Friday", "No official dates on the page", "UNCONFIRMED — third-party sources disagree (21 / 27 / 21–28 Nov)", "Official reveal page plus conflicting third-party claims"],
      ["Maybelline Lifter Gloss", "₹799 regular / ₹719 current / ₹559 revealed", "REVEAL ONLY — not payable", "Official Nykaa price-reveal page"],
      ["L'Oréal Telescopic Extensionist Mascara", "₹1,099 regular / ₹824 revealed", "REVEAL ONLY — not payable", "Official Nykaa price-reveal page"],
    ],
  },
  checkoutSteps: [
    "Write down the exact SKU and the price you can pay today before any sale begins.",
    "Only plan around dates marked CONFIRMED. Treat EXPECTED and UNCONFIRMED rows as watch-list items, not shopping plans.",
    "When a sale is live, compare the final payable on the payment screen — sale price, bank offer, exchange adjustment and excluded modes.",
    "For revealed prices, re-read the product page when the sale opens. A reveal is a label on a category page, not a payable quote.",
    "Record the seller of record and return terms; a lower headline from a different seller is not the same purchase.",
    "Screenshot the date and price you used as your baseline so a later strike-through cannot rewrite your comparison.",
  ],
  checkoutNote:
    "Dates and prices are dated snapshots checked 26 Nov 2026, with some rows explicitly carried from an earlier 25 Nov audit and marked as not re-verified. No expected or third-party date is presented as a live sale window.",
  verifiedFacts: {
    kicker: "Sale calendar · checked 26 Nov 2026",
    title: "What each source actually established",
    facts: [
      {
        label: "Tata CLiQ published a dated 2026 sale window.",
        detail:
          "An official press release says the Big CLiQ Sale ran 14–31 May 2026 across Tata CLiQ Fashion, Luxury and Palette. That is a confirmed window from company-issued material.",
        href: "https://www.businesswireindia.com/every-cliq-is-more-rewarding-at-the-big-cliq-sale-on-tata-cliq-tata-cliq-luxury-and-tata-cliq-palette-90045.html",
      },
      {
        label: "Myntra's official EORS snippet gives a start date but the page did not load.",
        detail:
          "The indexed official EORS page snippet says the sale starts 29 May 2026 with 50–90% off. A direct fetch on 26 Nov 2026 timed out, so this is an indexed official statement, not a fully re-read page.",
        href: "https://www.myntra.com/eors",
      },
      {
        label: "Nykaa's reveal page shows prices, not dates.",
        detail:
          "The official page carried 'Pink Friday Sale Price' labels and a footer saying 'Last Updated: November 25, 2026'. No sale window was stated on the page we read.",
        href: "https://www.nykaa.com/price-reveal-new-drops-pink-summer-sale-2026/c/100798",
      },
      {
        label: "Third-party Pink Friday dates conflict.",
        detail:
          "Different third-party pages claimed 21 November, 27 November and 21–28 November 2026. Durza publishes none of them as confirmed; check Nykaa's live site.",
        href: null,
      },
      {
        label: "The reveal arithmetic is ours.",
        detail:
          "On the Lifter Gloss, ₹559 against ₹719 current is ₹160 lower, or about 22.25% by our calculation; against ₹799 regular it is ₹240 lower, or 30.04%. Both figures come from the same official page.",
        href: "https://www.nykaa.com/price-reveal-new-drops-pink-summer-sale-2026/c/100798",
      },
      {
        label: "Several earlier Durza dates were not re-verified.",
        detail:
          "Flipkart Black Friday 21–27 Nov, Tata CLiQ Black Friday 19–30 Nov and the Lenovo India offer window came from an earlier audit. We did not re-open those pages on 26 Nov 2026 and label them accordingly.",
        href: null,
      },
    ],
    note: "Durza did not buy or test any product. Where a page timed out or a date came only from an earlier audit, the guide says so explicitly.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked an official Tata CLiQ press release, an indexed official Myntra EORS snippet, Nykaa's own price-reveal page and prior Durza audit notes on 26 Nov 2026. The Myntra direct fetch timed out; Flipkart, Lenovo and some CLiQ windows were not re-verified; third-party Pink Friday dates disagree. Confirmed windows are labelled CONFIRMED, expectations are labelled EXPECTED and prior-audit figures are labelled as such. Reveal percentages are Durza's arithmetic on published figures and are not payable quotes. No product was bought or tested. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "A confirmed sale window comes from a store's own published material, not from a coupon blog.",
    "Expected dates describe a recurring pattern; they are not announcements.",
    "A revealed price is not payable until the sale is live and the product page shows it at checkout.",
    "Measure a discount against the recent payable price for the exact SKU, not against MRP or a strike-through.",
    "Sources disagree on Nykaa Pink Friday 2026 dates — Durza publishes no confirmed window.",
    "Earlier audit figures not re-checked on 26 Nov 2026 are labelled and should be confirmed on the store before planning a purchase.",
  ],
  exploreLinks: [
    { href: "/stores/tatacliq-com-ecommerce-cps-india", label: "Tata CLiQ store hub" },
    { href: "/stores/nykaa", label: "Nykaa store hub" },
    { href: "/guides/nykaa-coupons-and-sale-guide", label: "Nykaa coupons and sale guide" },
    { href: "/guides/how-to-match-laptop-model-codes-india", label: "Match exact model codes before comparing prices" },
    { href: "/guides/how-durza-verifies-offers-methodology-2026", label: "How Durza verifies offers" },
  ],
  faqs: [
    {
      question: "Who runs the End of Reason Sale?",
      answer:
        "Myntra. Its official EORS page snippet checked 26 Nov 2026 says the summer edition starts 29 May 2026 with 50–90% off. The direct page fetch timed out, so that is an indexed official snippet. Winter EORS is expected in early December, not announced.",
    },
    {
      question: "What Tata CLiQ sale dates are confirmed?",
      answer:
        "The Big CLiQ Sale ran 14–31 May 2026, per an official press release. Other 2026 windows in an earlier Durza audit were not re-verified on 26 Nov and are labelled as prior-audit figures.",
    },
    {
      question: "When is Nykaa Pink Friday 2026?",
      answer:
        "Not confirmed. Nykaa's own reveal page showed Pink Friday price labels but no dates on 26 Nov 2026. Third-party pages claimed 21, 27 and 21–28 November. Verify on Nykaa's live site.",
    },
    {
      question: "Can I buy a revealed Pink Friday price now?",
      answer:
        "No. The reveal page showed ₹719 current and ₹559 revealed on Maybelline Lifter Gloss, for example. The reveal is not a payable checkout price until the sale is live.",
    },
    {
      question: "How much is the Lifter Gloss reveal actually worth?",
      answer:
        "₹160 below the ₹719 current price, about 22.3% by our arithmetic. Against the ₹799 regular price it is ₹240, or about 30% — the larger headline uses the higher baseline.",
    },
    {
      question: "Did Durza verify every date on this calendar?",
      answer:
        "No. Only the confirmed rows are store-published and checked. Expected and prior-audit rows are explicitly labelled, and the Myntra direct fetch timed out. Where verification failed, the guide says so.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Original contribution: a confirmed-vs-expected-vs-unverified timeline that refuses to promote third-party dates, plus a dated reveal ledger with our own incremental-saving arithmetic. No expected window is presented as live. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Tata CLiQ Big CLiQ Sale 2026 press release",
      href: "https://www.businesswireindia.com/every-cliq-is-more-rewarding-at-the-big-cliq-sale-on-tata-cliq-tata-cliq-luxury-and-tata-cliq-palette-90045.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Myntra End of Reason Sale page (indexed snippet; direct fetch timed out)",
      href: "https://www.myntra.com/eors",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Nykaa price-reveal page — Pink Friday labels and dated prices",
      href: "https://www.nykaa.com/price-reveal-new-drops-pink-summer-sale-2026/c/100798",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Nykaa storefront — site footer policies",
      href: "https://www.nykaa.com/",
      checkedAt: "26 Nov 2026",
    },
  ],
};
