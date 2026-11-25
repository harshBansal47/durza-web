import type { EditorialContent, EditorialFAQ } from "@/lib/types";
import { getAmazonProductLink } from "@/lib/affiliate";

export type CompareCategory =
  | "All"
  | "Electronics & Laptops"
  | "Smartphones"
  | "Fashion & Beauty"
  | "Health & Home"
  | "Sale & Card Math";

export interface CompareStoreAction {
  storeSlug: string;
  storeName: string;
  bullets: string[];
  /** Set false when the store is context only — no CTA button on its card. */
  cta?: boolean;
}

export interface CompareEntry {
  slug: string;
  category: Exclude<CompareCategory, "All">;
  title: string;
  seoTitle: string;
  metaDescription: string;
  heroImage: string;
  summary: string;
  updatedLabel: string;
  /** Named reviewer for E-E-A-T. Falls back to the editorial desk. */
  authorName?: string;
  /** ISO date facts were actually checked. Never set without a real check. */
  factsCheckedOn?: string;
  /** The two-line "who this is for / who should skip" block from our template. */
  audience?: { bestFor: string[]; skipIf: string[] };
  /** Verified Amazon product links for the exact models discussed. */
  productLinks?: { label: string; href: string; note?: string }[];
  /** Research sources with publisher, URL and check date. */
  sources?: { label: string; href: string; checkedAt?: string }[];
  verdict: {
    optionA: string;
    optionB: string;
    text: string;
    primaryStoreSlug: string;
    primaryStoreLabel: string;
    secondaryStoreSlug: string;
    secondaryStoreLabel: string;
  };
  table: {
    leftName: string;
    rightName: string;
    /** Optional third brand column for three-way comparisons. */
    extraName?: string;
    rows: { factor: string; left: string; right: string; extra?: string }[];
  };
  insider: {
    title: string;
    points: string[];
  };
  blocks: { heading: string; paragraphs: string[] }[];
  storeActions: CompareStoreAction[];
  faqs: EditorialFAQ[];
  relatedComparisons: string[];
  relatedGuides: { href: string; label: string }[];
  relatedReviewsStores: { href: string; label: string }[];
  keywords: string[];
}

export const COMPARE_CATEGORIES: Exclude<CompareCategory, "All">[] = [
  "Electronics & Laptops",
  "Smartphones",
  "Fashion & Beauty",
  "Health & Home",
  "Sale & Card Math",
];

export const COMPARISONS: CompareEntry[] = [
  {
    slug: "black-friday-2026-india-best-deals-vs-regular-sale",
    category: "Sale & Card Math",
    title: "Black Friday 2026 India vs. Regular Sales: Which Categories to Check First — and How to Verify the Final Price",
    seoTitle: "Black Friday 2026 India vs Regular Sales: What to Check First | Durza",
    metaDescription:
      "Flipkart and Tata CLiQ have confirmed 2026 Black Friday windows; Amazon India has not. Compare final payable prices, bank-slab caps and recent same-SKU baselines instead of trusting a strike-through MRP.",
    heroImage: "public/guides/sale.webp",
    summary:
      "A sale banner is not proof of a lower price: MRP is a tax-inclusive ceiling (PC Rules 2011, r.2(m)), and tracked laptop prices in Black Friday week sat above their earlier-2026 prices. Compare the final payable against recent prices for the same SKU.",
    updatedLabel: "Updated 18/11/2026",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-25T00:00:00.000Z",
    audience: {
      bestFor: [
        "Shoppers in India who already have a laptop model in mind and want to compare final payable prices across stores.",
        "Anyone who wants to know which 2026 sale windows are officially confirmed and which are still unannounced.",
      ],
      skipIf: [
        "Anyone expecting a guaranteed bank discount — caps, minimums and payment-mode exclusions are documented in the offer terms, and offers can be withdrawn.",
        "Readers who want a hands-on tested verdict. This page uses published listings and official documents checked 25 Nov 2026; Durza did not physically test any product.",
      ],
    },
    sources: [
      { label: "Flipkart — Black Friday Sale store (21–27 Nov 2026)", href: "https://www.flipkart.com/black-friday-sale-store", checkedAt: "25 Nov 2026" },
      { label: "Tata CLiQ — Black Friday sale press release (19–30 Nov 2026)", href: "https://www.businesswireindia.com/tata-cliq-luxury-and-tata-cliq-fashion's-black-friday-sale-promises-an-exciting-start-to-the-holiday-shopping-season-102737.html", checkedAt: "25 Nov 2026" },
      { label: "Tata CLiQ — American Express Black Friday offer T&C", href: "https://www.tatacliq.com/terms/amx-bfs-tnc", checkedAt: "25 Nov 2026" },
      { label: "Lenovo India — offer terms and conditions (24 Nov–2 Dec 2026)", href: "https://www.lenovo.com/in/en/lenovo-offer-details/", checkedAt: "25 Nov 2026" },
      { label: "Legal Metrology (Maharashtra) — Packaged Commodities Rules text", href: "https://www.legalmetrologymh.in/public/temp/368/919d4d8be0fbda825b0d10da72f6e1e7.pdf", checkedAt: "25 Nov 2026" },
      { label: "Department of Consumer Affairs — Legal Metrology FAQ", href: "https://consumeraffairs.gov.in/public/upload/admin/cmsfiles/whatsnews/Frequently_Asked_Questions_on_Legal_Metrology_whatsnews.pdf", checkedAt: "25 Nov 2026" },
      { label: "Rajya Sabha Q1798 reply (4 Aug 2026) — CCPA drip-pricing penalties", href: "https://sansad.in/getFile/annex/271/AU1798_Gxsxwg.pdf?source=pqars", checkedAt: "25 Nov 2026" },
      { label: "PriceHistory.app — Lenovo LOQ 83DV01AAIN (Flipkart record)", href: "https://pricehistory.app/p/lenovo-loq-15irx9-intel-core-i5-13th-H36pSjG5", checkedAt: "25 Nov 2026" },
      { label: "PriceHistory.app — Lenovo LOQ 83DV00BHIN (Amazon record)", href: "https://pricehistory.app/p/lenovo-loq-intel-core-i5-13450hx-13th-yhKf7t2h", checkedAt: "25 Nov 2026" },
      { label: "ASUS eStore — TUF A14 FA401EA-RG020WS", href: "https://in.store.asus.com/asus-tuf-gaming-a14-fa401ea-rg020ws-copilot-pc-gaming-laptop.html", checkedAt: "25 Nov 2026" },
      { label: "Flipkart — TUF A14 FA401EA-RG020WS listing", href: "https://www.flipkart.com/asus-tuf-gaming-a14-2026-office-2024-m365-basic-ai-pc-npu-upto-50tops-amd-ryzen-max-32-gb-1-tb-ssd-windows-11-home-amd-radeon-8060s-165-hz-fa401ea-rg020ws-laptop/p/itm456a598c5ceae", checkedAt: "25 Nov 2026" },
    ],
    verdict: {
      optionA: "Black Friday offers",
      optionB: "Regular sales",
      text: "If you already have a laptop model in mind, check the live offers first — but verify the final payable against recent prices: on 25 Nov 2026, tracked Black-Friday-week laptop prices sat above their 1 November levels. For 4K TVs and premium ANC audio, no dated Black Friday price was verified — check the exact model on the store. For fashion, beauty and groceries, compare the same item against a regular-sale price before paying. Confirm the final amount with any card offer applied.",
      primaryStoreSlug: "amazon-in",
      primaryStoreLabel: "Amazon",
      secondaryStoreSlug: "lenovo-india",
      secondaryStoreLabel: "Lenovo India",
    },
    table: {
      leftName: "Black Friday (India)",
      rightName: "Regular sales",
      rows: [
        { factor: "Best for", left: "Laptops have verified live offer listings (Lenovo, ASUS, Acer, checked 25 Nov 2026). For 4K TVs no dated Black Friday listing was verified — check the exact model before assuming a drop.", right: "Fashion, beauty and groceries: compare against regular-sale prices. Nykaa's pages show regular versus revealed Pink Friday prices for the same item (checked 25 Nov 2026)." },
        { factor: "Confirmed 2026 window", left: "Flipkart's official page listed 21–27 Nov 2026; Tata CLiQ's release and T&C listed 19–30 Nov 2026; Lenovo India's offer terms listed 24 Nov–2 Dec 2026 (checked 25 Nov 2026).", right: "Myntra's official blog lists summer EORS 2026 (29 May–14 June); winter EORS is only expected 5–15 Dec and is not confirmed on Myntra's live page." },
        { factor: "Bank offers", left: "Tata CLiQ's Amex T&C (checked 25 Nov 2026): 12.5% instant, min ₹3,000, max ₹1,500, once per card, code AMEXTCFBFS. Axis and Kotak are named at 12.5% in the press release, but caps and minimums are not stated — check the store.", right: "Card offers have their own caps, minimums and exclusions in every event — check them before paying." },
        { factor: "Price pattern", left: "MRP is a legal tax-inclusive ceiling, not a baseline (PC Rules 2011 r.2(m), 6(1)(e), 18(2); checked 25 Nov 2026). The same ASUS FA401EA-RG020WS showed ₹3,23,990 MRP at ASUS eStore and a ₹2,59,990 reference at Flipkart that day — compare the final payable.", right: "Match the full model code across dated pages; a series name is not a SKU." },
        { factor: "Risk", left: "Flipkart's SBI Debit T&C (checked 25 Nov 2026) says the product-page discount applies to select cards and to check the discount on the Payment page. Opened T&Cs cap savings per card, refresh offers and allow withdrawal without notice.", right: "Outside big events, card offers still carry caps, minimums and payment-mode exclusions — check them before paying." },
        { factor: "Smart move", left: "Record the cart summary before paying; re-check if the amount changes.", right: "Keep a note of the regular-sale price for the same SKU." },
      ],
    },
    insider: {
      title: "What we verified, and what we did not",
      points: [
        "MRP is the maximum tax-inclusive price (rule 2(m)); a reduced MRP may be shown only without hiding the original (rule 6(3), DoCA FAQ, checked 25 Nov 2026). CCPA penalised FirstCry (₹2,00,000) and Zepto (₹7,00,000) for adding charges at checkout (Rajya Sabha reply, 4 Aug 2026). What matters is the final payable after card offers and exclusions — not how common padded MRPs are, which we did not verify.",
        "A displayed discount can fail at payment if your card or product is ineligible, the payment mode is excluded (UPI, net banking, COD, debit non-EMI, Amazon Pay balance part-payment), the minimum is not met, or your per-card limit is exhausted (offers refresh daily or periodically). Flipkart's SBI T&C explicitly says to check the discount on the Payment page. Keep an eligible alternative ready.",
        "Record the cart and payment summary before you pay. If the amount changes, that record lets you compare options instead of guessing.",
      ],
    },
    blocks: [
      {
        heading: "Check the final amount before you pay",
        paragraphs: [
          "The official 2026 windows we could verify on 25 Nov 2026 are Flipkart 21–27 Nov, Tata CLiQ 19–30 Nov and Lenovo India offers 24 Nov–2 Dec. Amazon India's official page (updated 19 Nov 2026) says its Black Friday Sale is returning but dates will be announced — not yet confirmed on the live site as of 25 Nov 2026. Treat a calendar date as evidence only when a store's own page confirms it.",
          "Record the exact model code, selling price, MRP or reference shown, seller, coupon, bank-offer terms and final payable on the payment screen. That is the comparison that matters.",
        ],
      },
      {
        heading: "Categories worth checking during Black Friday",
        paragraphs: [
          "Verified laptop examples checked 25 Nov 2026: Lenovo LOQ 83DV01KYIN ₹1,58,491 (MRP ₹2,49,591); ASUS FA401EA-RG020WS ₹2,49,990 (MRP ₹3,23,990); Acer Nitro UN.U7PSI.008 ₹1,64,990 (MRP ₹2,83,990). GoBoult Anchor (ANC-marketed) was ₹2,499 (MRP ₹9,999). No dated Black Friday listing was verified for 4K TVs or premium ANC audio outside Boult — verify on the store.",
          "Match the full model code, not the series name. Worked example: FA401EA-RG020WS was ₹2,54,000 at Flipkart and ₹2,49,990 at ASUS eStore on 25 Nov 2026 — a ₹4,010 difference by our arithmetic on published listings, not a live quote. The sellers differ (GamingIcons vs AYR Technologies), so warranty and returns differ too. Amazon.in buyboxes were not readable on 25 Nov 2026 — verify on the store before treating any Amazon price as current.",
        ],
      },
      {
        heading: "Categories to compare against regular sales",
        paragraphs: [
          "Tracked prices show why a baseline matters: PriceHistory.app recorded Lenovo LOQ 83DV01AAIN at ₹1,04,990 on 1 Nov 2026 and ₹1,17,990 on 24 Nov 2026 — 12.38% higher in Black Friday week, by our calculation from a third-party record, not a live quote. The same tracker shows 83DV00BHIN at ₹87,999 on 20 Mar 2026 versus ₹1,14,690 on 23 Nov 2026. Verify the exact SKU on the store.",
          "For fashion, beauty and groceries, compare the exact item against a regular-sale price before paying. Nykaa's price-reveal page checked 25 Nov 2026 showed L'Oréal Extraordinary Oil Serum at ₹719 current and ₹439 as a revealed Pink Friday price — a reveal, not yet a payable price.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "amazon-in", storeName: "Amazon", bullets: ["Compare final payable prices on electronics and check card-offer terms shown on the product page.", "Useful as a reference point when you want a second listing for the same model."], cta: false },
      { storeSlug: "lenovo-india", storeName: "Lenovo India", bullets: ["Check official laptop pricing and warranty add-ons when a marketplace deal looks close.", "Offer terms checked 25 Nov 2026 list 24 Nov–2 Dec 2026 cashback, paid after delivery, not at checkout."], cta: false },
      { storeSlug: "asus", storeName: "ASUS India", bullets: ["The eStore listing names AYR Technologies as seller and ASUS India as importer — check warranty and returns.", "Compare the full model code, not the series name."], cta: false },
      { storeSlug: "acer", storeName: "Acer India", bullets: ["Official laptop listings checked 25 Nov 2026 show Special Prices against MRP with taxes included.", "The opened pages state only one offer applies — verify terms before paying."], cta: false },
      { storeSlug: "tatacliq-com-ecommerce-cps-india", storeName: "Tata CLiQ", bullets: ["Press release lists Black Friday 19–30 Nov 2026; Amex 12.5% slab has a ₹1,500 cap and ₹3,000 minimum.", "Product pages were not readable on 25 Nov 2026 — verify prices on the store."], cta: false },
      { storeSlug: "boult", storeName: "Boult", bullets: ["Anchor was ₹2,499 against ₹9,999 MRP on 25 Nov 2026; the page markets ANC but its spec block says ENC — verify on the store.", "Compare the final amount with other listings before paying."], cta: true },
    ],
    faqs: [
      { question: "Is Black Friday actually cheaper in India?", answer: "Not necessarily. Flipkart's Black Friday sale ran 21–27 Nov 2026 (official page, checked 25 Nov 2026), but a third-party record shows Lenovo LOQ 83DV01AAIN at ₹1,17,990 on 24 Nov versus ₹1,04,990 on 1 Nov 2026 — our calculation from published tracker figures (12.38% higher), not a live quote. Verify the exact SKU.", sort_order: 0 },
      { question: "Why might my bank discount not appear at checkout?", answer: "Flipkart's SBI Debit T&C says the product-page discount applies to select cards and to check the Payment page. Opened terms also exclude UPI, net banking, COD, debit non-EMI and wallet part-payment, require minimum spends, cap savings per card and allow withdrawal without notice. Re-check the final amount before paying.", sort_order: 1 },
      { question: "Should I trust the MRP shown during Black Friday?", answer: "MRP is a legal tax-inclusive ceiling (rule 2(m), 6(1)(e); rule 18(2) prohibits selling above it), not a 'usual price' benchmark. The same ASUS FA401EA-RG020WS showed different strike-through references at two stores on 25 Nov 2026. Compare the final payable.", sort_order: 2 },
      { question: "What should I record before paying?", answer: "Record the exact model code, selling price, MRP or reference shown, seller, coupon, bank-offer terms (family, cap, minimum), the final payable on the payment screen, and the date and time. That lets you compare if the amount changes.", sort_order: 3 },
    ],
    relatedComparisons: [
      "credit-card-instant-discount-vs-no-cost-emi-india",
      "mrp-vs-recent-price-india-sale-baseline",
      "best-laptop-deals-india-amazon-vs-flipkart-2026",
    ],
    relatedGuides: [
      { href: "/guides/lenovo-laptop-offers-india-2026", label: "Lenovo India laptop offers guide" },
      { href: "/guides/how-to-match-laptop-model-codes-india", label: "How to match laptop model codes" },
      { href: "/guides/best-acer-laptop-deals-promo-codes", label: "Acer laptop deals guide" },
      { href: "/guides/sale-calendar-india-eors-pink-friday-2026", label: "India sale calendar 2026" },
    ],
    relatedReviewsStores: [
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
      { href: "/stores/lenovo", label: "Lenovo store hub" },
      { href: "/stores/asus", label: "ASUS store hub" },
      { href: "/stores/boult", label: "Boult store hub" },
      { href: "/stores/tatacliq-com-ecommerce-cps-india", label: "Tata CLiQ store hub" },
      { href: "/black-friday", label: "Black Friday deals hub" },
    ],
    keywords: ["Black Friday sale India 2026", "Black Friday vs regular sale India", "bank instant discount India", "final payable price comparison", "laptop TV deals India"],
  },
  {
    slug: "mrp-vs-recent-price-india-sale-baseline",
    category: "Sale & Card Math",
    title: "MRP vs Recent Selling Price in India: What to Trust During a Sale",
    seoTitle: "MRP vs Recent Selling Price in India: Sale Price Baseline | Durza",
    metaDescription:
      "MRP is a tax-inclusive legal ceiling, not a usual-price benchmark. Compare a dated recent selling price for the identical SKU; the same model showed different strike-throughs across two stores on 25 Nov 2026.",
    heroImage: "public/guides/mrp-vs-recent-price-india-sale-baseline.webp",
    summary:
      "MRP is a legal ceiling inclusive of all taxes, not a record of what a product usually sells for. During a sale, compare the final payable against a dated recent price for the same exact model code — never against the strike-through alone.",
    updatedLabel: "Updated 25/11/2026",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-25T00:00:00.000Z",
    audience: {
      bestFor: [
        "Shoppers comparing a sale price against a 'was' price or MRP on an Indian store page.",
        "Anyone who wants a dated same-SKU baseline before deciding whether a discount is real.",
      ],
      skipIf: [
        "Anyone looking for a universal 'true price' formula — a baseline exists only when an identical model code has a dated price on another page.",
        "Readers who want first-hand testing. This page uses official rules and dated listings checked 25 Nov 2026; Durza did not buy or test any product.",
      ],
    },
    sources: [
      { label: "Legal Metrology (Maharashtra) — Packaged Commodities Rules text", href: "https://www.legalmetrologymh.in/public/temp/368/919d4d8be0fbda825b0d10da72f6e1e7.pdf", checkedAt: "25 Nov 2026" },
      { label: "Rule 18(2) — no sale above retail sale price", href: "https://indiankanoon.org/doc/162329261/", checkedAt: "25 Nov 2026" },
      { label: "Department of Consumer Affairs — Legal Metrology FAQ", href: "https://consumeraffairs.gov.in/public/upload/admin/cmsfiles/whatsnews/Frequently_Asked_Questions_on_Legal_Metrology_whatsnews.pdf", checkedAt: "25 Nov 2026" },
      { label: "Rajya Sabha Q1798 reply (4 Aug 2026) — CCPA drip-pricing penalties", href: "https://sansad.in/getFile/annex/271/AU1798_Gxsxwg.pdf?source=pqars", checkedAt: "25 Nov 2026" },
      { label: "ASUS eStore — TUF A14 FA401EA-RG020WS listing", href: "https://in.store.asus.com/asus-tuf-gaming-a14-fa401ea-rg020ws-copilot-pc-gaming-laptop.html", checkedAt: "25 Nov 2026" },
      { label: "Flipkart — TUF A14 FA401EA-RG020WS listing", href: "https://www.flipkart.com/asus-tuf-gaming-a14-2026-office-2024-m365-basic-ai-pc-npu-upto-50tops-amd-ryzen-max-32-gb-1-tb-ssd-windows-11-home-amd-radeon-8060s-165-hz-fa401ea-rg020ws-laptop/p/itm456a598c5ceae", checkedAt: "25 Nov 2026" },
      { label: "PriceHistory.app — Lenovo LOQ 83DV01AAIN record", href: "https://pricehistory.app/p/lenovo-loq-15irx9-intel-core-i5-13th-H36pSjG5", checkedAt: "25 Nov 2026" },
      { label: "PriceHistory.app — Lenovo LOQ 83DV00BHIN record", href: "https://pricehistory.app/p/lenovo-loq-intel-core-i5-13450hx-13th-yhKf7t2h", checkedAt: "25 Nov 2026" },
      { label: "Nykaa — price reveal season page", href: "https://www.nykaa.com/price-reveal-season-s-hottest-offers-hot-pink-sale-2026/c/108343", checkedAt: "25 Nov 2026" },
    ],
    verdict: {
      optionA: "MRP / strike-through",
      optionB: "Dated recent selling price",
      text: "Use MRP only as a legal ceiling: rule 2(m) of the Packaged Commodities Rules defines it as the maximum price inclusive of all taxes, and rule 18(2) prohibits selling above it. It is not a usual-price benchmark. For a real saving, compare the final payable against a dated price for the identical model code from another page. On 25 Nov 2026 the same ASUS FA401EA-RG020WS carried a ₹3,23,990 MRP at ASUS eStore but a ₹2,59,990 reference at Flipkart — sources disagree, so verify on the exact SKU at checkout.",
      primaryStoreSlug: "amazon-in",
      primaryStoreLabel: "Amazon",
      secondaryStoreSlug: "lenovo-india",
      secondaryStoreLabel: "Lenovo India",
    },
    table: {
      leftName: "MRP / strike-through",
      rightName: "Dated recent selling price",
      rows: [
        { factor: "What it means", left: "Rule 2(m), PC Rules 2011: the maximum price at which a packaged commodity may be sold, inclusive of all taxes (official text, checked 25 Nov 2026).", right: "A dated listing for the identical full model code — never a series-name match and never MRP." },
        { factor: "Can it change?", left: "A reduced MRP may be shown only if the original remains visible and legible (rule 6(3) proviso, DoCA FAQ, checked 25 Nov 2026).", right: "Yes; a 2026 baseline must come from a dated page for the same SKU, such as a tracker record or earlier store listing." },
        { factor: "Taxes", left: "The official Legal Metrology GST FAQ says GST is included in MRP and is not to be charged over MRP (checked 25 Nov 2026).", right: "Confirm tax treatment on the listing; marketplace records may state it separately." },
        { factor: "Worked example", left: "GoBoult Anchor at ₹2,499 against ₹9,999 MRP is 75.0% off MRP — our arithmetic on published figures, not a live quote.", right: "Lenovo LOQ 83DV01AAIN was ₹1,04,990 on 1 Nov 2026 and ₹1,17,990 on 24 Nov 2026 — 12.38% higher by our calculation from a third-party record." },
        { factor: "Same SKU, two references", left: "ASUS FA401EA-RG020WS: ₹3,23,990 MRP at ASUS eStore on 25 Nov 2026.", right: "The same model code at Flipkart showed a ₹2,59,990 reference (not labelled MRP) the same day — compare the final payable." },
        { factor: "Enforcement", left: "Rajya Sabha reply (4 Aug 2026) records CCPA penalties of ₹2,00,000 on FirstCry and ₹7,00,000 on Zepto for charges added at checkout, among ₹20 lakh total actions.", right: "Record the final payable on the payment screen; a headline percentage is not evidence of the amount you pay." },
      ],
    },
    insider: {
      title: "What we verified, and what we did not",
      points: [
        "We verified the MRP definition, tax-inclusive rule, no-sale-above-MRP rule and e-commerce display duty from official documents opened 25 Nov 2026, along with dated CCPA drip-pricing penalties in a Rajya Sabha reply from 4 Aug 2026. Durza did not buy, consume or wear any product.",
        "We did not verify how common padded MRPs are during Black Friday — no prevalence source was opened. Do not read this page as a claim that most sale banners are inflated.",
        "Tracker figures are third-party records, not live quotes. Where a tracker and a store listing disagree by a few hundred rupees on the same model code, we show both and tell you to verify on the store rather than averaging them.",
      ],
    },
    blocks: [
      {
        heading: "MRP is a ceiling, not a baseline",
        paragraphs: [
          "Rule 2(m) of the Legal Metrology (Packaged Commodities) Rules, 2011 defines retail sale price as the maximum price at which a packaged commodity may be sold, inclusive of all taxes (official text checked 25 Nov 2026). Rule 18(2) says no seller may charge above it. That makes MRP a legal ceiling — it does not tell you what a product usually sold for last month.",
          "The Department of Consumer Affairs FAQ says a lower revised MRP may be shown only while the original remains visible and legible (rule 6(3) proviso, checked 25 Nov 2026). A big gap between MRP and the selling price is therefore not, on its own, proof of a good deal.",
        ],
      },
      {
        heading: "How to build a same-SKU baseline",
        paragraphs: [
          "Match the full model code, not the series name. For example, Lenovo LOQ 15IRX9 is a series containing distinct MTMs such as 83DV01KYIN and 83DV01K7IN with different processors, storage and availability. A tracker record for 83DV01AAIN showed ₹1,04,990 on 1 Nov 2026 and ₹1,17,990 on 24 Nov 2026 — by our arithmetic, the later price was 12.38% higher. These are third-party records; verify on the store.",
          "Another tracker record shows 83DV00BHIN at ₹87,999 on 20 Mar 2026 versus ₹1,14,690 on 23 Nov 2026, with a 933-day average of ₹85,924. Using a December 2024 low as a 2026 baseline would be misleading — keep the baseline inside the same year and the same exact code.",
        ],
      },
      {
        heading: "A revealed sale price is not a payable price",
        paragraphs: [
          "Nykaa's price-reveal page checked 25 Nov 2026 showed L'Oréal Extraordinary Oil Serum at a regular ₹799, a current ₹719 and a revealed Pink Friday price of ₹439. Against the current price that is 38.94% additional saving by our arithmetic on published figures; against the list price it is 45.06%. The reveal is not yet a payable price — verify when the sale goes live.",
          "For packaged goods, the official GST FAQ says GST is included in MRP and cannot be charged over it. Checkout additions were the subject of CCPA penalties recorded in the 4 Aug 2026 Rajya Sabha reply: FirstCry was penalised ₹2,00,000 for charging GST over an 'inclusive of all taxes' MRP, and Zepto ₹7,00,000 for adding handling and membership fees at checkout.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "amazon-in", storeName: "Amazon", bullets: ["Compare a dated same-SKU listing against the sale price; Amazon buyboxes were not readable on 25 Nov 2026.", "Do not publish a price from a snippet — verify on the store."], cta: false },
      { storeSlug: "lenovo-india", storeName: "Lenovo India", bullets: ["Match the MTM, not the series name: 83DV01KYIN was ₹1,58,491 against MRP ₹2,49,591 on 25 Nov 2026.", "Offers and cashback are separate from the listed selling price."], cta: false },
      { storeSlug: "asus", storeName: "ASUS India", bullets: ["The eStore listing for FA401EA-RG020WS showed ₹2,49,990 against MRP ₹3,23,990 on 25 Nov 2026, sold by AYR Technologies.", "A different store showed a different reference price for the same model code."], cta: false },
      { storeSlug: "acer", storeName: "Acer India", bullets: ["Acer's official store lists Special Prices against MRP with taxes included; offer stacking is restricted.", "Use the exact Ref code, not the series name."], cta: false },
    ],
    faqs: [
      { question: "Is MRP the usual selling price in India?", answer: "No. MRP is the maximum tax-inclusive price defined in rule 2(m) of the Packaged Commodities Rules, 2011; rule 18(2) prohibits selling above it (official text checked 25 Nov 2026). It is a ceiling, not a recent-price benchmark.", sort_order: 0 },
      { question: "Can a store charge GST over MRP?", answer: "The official Legal Metrology GST FAQ states GST is included in MRP and is not to be charged over MRP (checked 25 Nov 2026).", sort_order: 1 },
      { question: "What counts as a fair baseline?", answer: "The identical full model code or exact item on a dated page from a regular sale — never MRP and never a different variant. Tracker records are third-party; verify on the store.", sort_order: 2 },
      { question: "Does a 75% strike-through mean 75% off the real price?", answer: "It means 75% off MRP by our arithmetic on published figures. For GoBoult Anchor, ₹2,499 against ₹9,999 MRP is 75.01% off MRP; the saving against its recent selling price is a different number and is not sourced here.", sort_order: 3 },
      { question: "Has anyone been penalised for checkout price tricks?", answer: "The Rajya Sabha reply dated 4 Aug 2026 records CCPA penalties of ₹2,00,000 on FirstCry and ₹7,00,000 on Zepto for drip pricing, among actions totalling ₹20 lakh.", sort_order: 4 },
    ],
    relatedComparisons: [
      "black-friday-2026-india-best-deals-vs-regular-sale",
      "credit-card-instant-discount-vs-no-cost-emi-india",
      "best-laptop-deals-india-amazon-vs-flipkart-2026",
    ],
    relatedGuides: [
      { href: "/guides/lenovo-laptop-offers-india-2026", label: "Lenovo India laptop offers guide" },
    ],
    relatedReviewsStores: [
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
      { href: "/stores/lenovo", label: "Lenovo store hub" },
      { href: "/stores/asus", label: "ASUS store hub" },
      { href: "/stores/acer", label: "Acer store hub" },
    ],
    keywords: ["MRP vs selling price India", "strike through price reliability", "Legal Metrology MRP rules", "same SKU price baseline", "CCPA drip pricing penalties"],
  },
  {
    slug: "best-smartphone-deals-india-amazon-vs-flipkart-2026",
    category: "Smartphones",
    title: "Amazon vs. Flipkart for Smartphones (₹10K–₹80K): Exchange Bonuses & Card Slabs",
    seoTitle: "Amazon vs Flipkart for Smartphones in India (2026): Exchange & Card Offers | Durza",
    metaDescription:
      "Compare Amazon vs Flipkart smartphone deals in India (₹10K–₹80K): exchange bonus deductions, Open-Box Delivery rules, bank discounts, and which platform wins for your checkout.",
    heroImage: "public/guides/mobile.webp",
    summary:
      "Flipkart can look cheaper with a big exchange bump, but doorstep deductions can erase it. Amazon often wins on flat card discounts and cleaner non-exchange pricing—especially if your old phone isn’t mint.",
    updatedLabel: "Updated 18/11/2026",
    verdict: {
      optionA: "Amazon",
      optionB: "Flipkart",
      text: "Choose Flipkart if your old phone is in excellent condition and the exchange bonus genuinely holds after pickup checks. Choose Amazon if you want a simpler checkout with flat bank discounts, no exchange risk, or a model where the base price and support matter more than a headline exchange bump.",
      primaryStoreSlug: "amazon-in",
      primaryStoreLabel: "Amazon",
      secondaryStoreSlug: "flipkart",
      secondaryStoreLabel: "Flipkart",
    },
    table: {
      leftName: "Amazon",
      rightName: "Flipkart",
      rows: [
        { factor: "Typical strength", left: "Flat bank instant discounts, OnePlus/Samsung/iQOO/Redmi deals (varies by sale)", right: "Exclusive launches and aggressive exchange bonuses on select brands" },
        { factor: "Exchange experience", left: "Often simpler if you skip exchange; value depends on model/condition", right: "Higher advertised exchange bump, but doorstep diagnostics can deduct for scratches" },
        { factor: "Delivery check", left: "Open-box/inspection flow on eligible high-value phones—inspect before OTP", right: "Open-Box Delivery common—never share OTP before physical screen/IMEI check" },
        { factor: "Returns/support", left: "Generally smoother issue resolution on many orders", right: "Service-center/brand-led processes apply; check seller and listing terms" },
        { factor: "Best for", left: "Buyers without a perfect exchange device or who prefer predictable pricing", right: "Buyers with mint-condition exchange phones and sale-exclusive models" },
      ],
    },
    insider: {
      title: "Out-of-the-Box Insider Reality (What Other Sites Won't Tell You)",
      points: [
        "Doorstep exchange haircut: Flipkart may advertise a ₹3,000–₹8,000 exchange bump, but pickup diagnostics can deduct ₹1,500–₹2,500 for micro-scratches or bezel marks. If your phone isn’t spotless, compare the non-exchange final price before committing.",
        "Open-Box Delivery (OBD) is your only easy checkpoint: open the box, inspect the screen/body, and verify IMEI before sharing the OTP. Once the OTP is given, physical-damage claims become much harder.",
        "A lower base price plus a reliable bank discount can beat a flashy exchange headline. Do the math on the final payable amount, not the banner.",
      ],
    },
    blocks: [
      {
        heading: "When the exchange bonus melts at your doorstep",
        paragraphs: [
          "You’ve picked a phone, accepted the exchange value, and waited for delivery—then the pickup agent checks your old device under a flashlight and knocks ₹2,000 off for a tiny scuff. That’s the gap between advertised exchange pricing and what you actually pay.",
          "For smartphones in the ₹10K–₹80K range, the better deal is usually the one with the lower final payable amount after real exchange deductions and card terms, not the biggest number on the product page.",
        ],
      },
      {
        heading: "Where each platform tends to win",
        paragraphs: [
          "Flipkart often leads on select launches and exchange-heavy offers (brands and models vary by sale). Amazon often shines when flat HDFC/ICICI/SBI-style instant discounts apply cleanly and you don’t want exchange uncertainty.",
          "If you’re buying without exchange, compare the same variant (RAM/storage/color) and check seller authorization and invoice details for warranty support.",
        ],
      },
      {
        heading: "Delivery and warranty basics to protect yourself",
        paragraphs: [
          "Treat Open-Box Delivery as mandatory on high-value phones: check the seal, screen, and IMEI before OTP. After delivery, confirm warranty activation status and keep the GST invoice handy for brand service claims.",
        ],
      },
    ],
    storeActions: [
      {
        storeSlug: "amazon-in",
        storeName: "Amazon",
        bullets: ["Strong for no-exchange buys with clear card discount slabs on eligible listings.", "Good place to compare final payable price across variants and sellers."],
      },
      {
        storeSlug: "flipkart",
        storeName: "Flipkart",
        bullets: ["Can be excellent for exchange-led deals if your old phone is in mint condition.", "Check sale-exclusive models and confirm exchange terms before checkout."],
      },
    ],
    faqs: [
      { question: "Which is better for phone exchange, Amazon or Flipkart?", answer: "Flipkart often advertises higher exchange bumps on select models, but final value depends on doorstep inspection. If your old phone has visible wear, compare Amazon’s non-exchange/card-discount price before relying on exchange savings.", sort_order: 0 },
      { question: "What is Open-Box Delivery and should I share the OTP?", answer: "Open-Box Delivery lets you inspect the phone at delivery on eligible orders. Do not share the OTP until you’ve checked the box, screen, and IMEI. Sharing OTP usually confirms acceptance.", sort_order: 1 },
      { question: "Do bank discounts apply on exchange orders?", answer: "Sometimes, but eligibility varies by card, tenure, and campaign terms. Always check the payment page summary to confirm the discount applies with your chosen exchange/EMI option.", sort_order: 2 },
      { question: "How do I avoid warranty issues after buying online?", answer: "Buy from authorized sellers, save the GST invoice, and verify the device IMEI/serial and warranty status with the brand soon after delivery.", sort_order: 3 },
    ],
    relatedComparisons: [
      "amazon-vs-flipkart-electronics-2026",
      "credit-card-instant-discount-vs-no-cost-emi-india",
      "best-laptop-deals-india-amazon-vs-flipkart-2026",
    ],
    relatedGuides: [
      { href: "/guides/best-credit-card-online-shopping-india-2026", label: "Best online-shopping card guide" },
      { href: "/guides/sale-calendar-india-eors-pink-friday-2026", label: "India sale calendar 2026" },
    ],
    relatedReviewsStores: [
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
      { href: "/stores/flipkart", label: "Flipkart store hub" },
    ],
    keywords: ["Amazon vs Flipkart smartphone deals India 2026", "Flipkart exchange bonus deduction", "Open Box Delivery phone", "HDFC ICICI SBI card discount mobile"],
  },
  {
    slug: "best-laptop-deals-india-amazon-vs-flipkart-2026",
    category: "Electronics & Laptops",
    title: "Buying a Laptop in India (₹35K–₹75K): Amazon vs. Flipkart vs. Brand eStores",
    seoTitle: "Best Laptop Deals in India (₹35K–₹75K): Amazon vs Flipkart vs Brand Stores | Durza",
    metaDescription:
      "Compare laptop deals in India (₹35K–₹75K): Amazon vs Flipkart vs Lenovo/ASUS eStores. Learn the soldered-RAM trap, ADP value, student discounts, and warranty checks.",
    heroImage: "public/guides/laptops.webp",
    summary:
      "Two laptops with the same CPU/RAM label can be very different machines. Marketplaces can be cheaper upfront, but official stores often win on RAM upgrades, warranty protection, and student pricing.",
    updatedLabel: "Updated 18/11/2026",
    verdict: {
      optionA: "Amazon / Flipkart",
      optionB: "Lenovo / ASUS official stores",
      text: "Choose Amazon or Flipkart for fast delivery and strong card discounts on ready-to-ship configs. Choose Lenovo or ASUS official stores if you need the right RAM/storage config, ₹999-style ADP bundles, or student/corporate pricing—those can save more over the laptop’s life than a small upfront discount.",
      primaryStoreSlug: "lenovo-india",
      primaryStoreLabel: "Lenovo India",
      secondaryStoreSlug: "asus",
      secondaryStoreLabel: "ASUS",
    },
    table: {
      leftName: "Amazon / Flipkart",
      rightName: "Brand eStores (Lenovo/ASUS)",
      rows: [
        { factor: "₹35K–₹50K", left: "Often strong card slabs on ready-to-ship office/student models", right: "Good for specific configs, but compare final price with benefits" },
        { factor: "₹50K–₹75K", left: "Sale pricing on gaming/creator laptops can be sharp", right: "Better for RAM/display upgrades, ADP bundles, student verification offers" },
        { factor: "RAM & upgradeability", left: "Watch for soldered 8GB configs and limited slots", right: "More clarity on CTO/config options (model-dependent)" },
        { factor: "Warranty & protection", left: "ADP add-ons can be expensive; check what’s included", right: "Often better-value protection bundles and direct support paths" },
        { factor: "Delivery speed", left: "Usually fastest for in-stock SKUs", right: "Custom builds can take longer (often days to weeks)" },
      ],
    },
    insider: {
      title: "Out-of-the-Box Insider Reality (What Other Sites Won't Tell You)",
      points: [
        "The hidden RAM-slot trap: an 8GB “same model name” listing may be soldered or limited, making upgrades painful or impossible. Check the exact SKU/spec sheet, not just the headline.",
        "₹999 ADP on official stores vs expensive marketplace add-ons: paying a bit more upfront for accidental damage protection can be cheaper than buying a separate plan later (or paying for one repair).",
        "Pre-activated warranty check: on Day 1, verify the serial number on the brand’s warranty portal. If it started early, upload your GST invoice promptly to request correction where applicable.",
      ],
    },
    blocks: [
      {
        heading: "Same specs on paper, different laptop in reality",
        paragraphs: [
          "At ₹52,990, two laptops can both claim Core i5/Ryzen 5, 16GB RAM, and 512GB SSD—yet one ships with a dull panel and soldered memory while the other gives you a better screen and room to upgrade. That’s where most ₹35K–₹75K buyers lose money long-term.",
        ],
      },
      {
        heading: "How to choose by budget bracket",
        paragraphs: [
          "For study and office use (₹35K–₹50K), marketplaces often have convenient ready-to-ship options with card discounts. For coding, light editing, or entry gaming (₹50K–₹75K), compare marketplace sale prices against official Lenovo/ASUS pricing after adding student/corporate benefits and protection plans.",
          "If you’ll keep the laptop 3+ years, prioritize the right configuration and warranty coverage over a small instant discount.",
        ],
      },
      {
        heading: "Before you place the order",
        paragraphs: [
          "Confirm the exact model number, RAM type (soldered vs upgradable), SSD slots, display specs, and included warranty. After delivery, keep the invoice and run a warranty/serial check immediately.",
        ],
      },
    ],
    storeActions: [
      {
        storeSlug: "amazon-in",
        storeName: "Amazon",
        bullets: ["Good for quick delivery and comparing ready-to-ship laptop deals.", "Check seller details, exact SKU, and included warranty before ordering."],
      },
      {
        storeSlug: "flipkart",
        storeName: "Flipkart",
        bullets: ["Worth checking for gaming laptop sale pricing and bank bundles.", "Verify model number/specs carefully—similar names can hide different configs."],
      },
      {
        storeSlug: "lenovo-india",
        storeName: "Lenovo India",
        bullets: ["Useful for custom configs, student/corporate offers, and warranty add-ons.", "Compare total 3-year ownership value, not just upfront price."],
      },
      {
        storeSlug: "asus",
        storeName: "ASUS",
        bullets: ["Check official eStore deals for creator/gaming models and support options.", "Good option when you want a specific configuration or brand-direct purchase."],
      },
    ],
    faqs: [
      { question: "Is it cheaper to buy a laptop from Amazon/Flipkart or the brand website?", answer: "Marketplaces can be cheaper upfront on ready-to-ship models, especially with card offers. Brand stores can win when you factor in configuration choices, student discounts, and lower-cost accidental damage protection.", sort_order: 0 },
      { question: "What laptop specs should I double-check before buying?", answer: "Check the exact model/SKU, RAM type (soldered vs upgradable), storage slots, display panel specs, battery/warranty terms, and whether ADP is included or extra.", sort_order: 1 },
      { question: "What if my laptop warranty shows as already activated?", answer: "Check the serial number on the brand’s warranty portal on Day 1 and keep your GST invoice. Contact brand support with proof of purchase to request a warranty start-date correction if needed.", sort_order: 2 },
      { question: "Are student discounts worth it on brand stores?", answer: "Often yes, especially when combined with official bundles or protection plans. Verify eligibility (e.g. student/corporate programs) and compare the final payable amount with marketplace deals.", sort_order: 3 },
    ],
    relatedComparisons: [
      "official-brand-store-vs-amazon-flipkart-laptops-india",
      "credit-card-instant-discount-vs-no-cost-emi-india",
      "amazon-vs-flipkart-electronics-2026",
    ],
    relatedGuides: [
      { href: "/guides/lenovo-india-laptop-offers-2026-guide", label: "Lenovo India laptop offers guide" },
      { href: "/guides/asus-india-rog-tuf-zenbook-vhpbook-2026-guide", label: "ASUS ROG/TUF/Zenbook/Vivobook guide" },
      { href: "/guides/best-acer-laptop-deals-promo-codes", label: "Acer laptop deals guide" },
    ],
    relatedReviewsStores: [
      { href: "/stores/lenovo", label: "Lenovo store hub" },
      { href: "/stores/asus", label: "ASUS store hub" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
    ],
    keywords: ["best laptop deals India 35000 to 75000", "Amazon vs Flipkart laptops", "Lenovo ASUS official store laptop", "soldered RAM laptop India", "ADP warranty laptop"],
  },
  {
    slug: "amazon-vs-flipkart-electronics-2026",
    category: "Electronics & Laptops",
    title: "Amazon India vs. Flipkart in 2026: Returns, Open-Box Delivery & Bank Offers",
    seoTitle: "Amazon vs Flipkart for Electronics in India (2026): Returns, OBD & Bank Offers | Durza",
    metaDescription:
      "Amazon vs Flipkart electronics in India (2026): compare service-center replacement policies, Open-Box Delivery, seller/invoice checks, and where bank offers or delivery wins.",
    heroImage: "/guides/amazon-vs-flipkart-electronics-2026.webp",
    summary:
      "For electronics, the safest buy is often the one with the right seller, clear invoice, and inspection at delivery—not just the lowest price. Both platforms have tightened returns on phones, laptops, and many appliances.",
    updatedLabel: "Updated 18/11/2026",
    verdict: {
      optionA: "Amazon",
      optionB: "Flipkart",
      text: "Choose Amazon for accessories, audio gear, routers, small appliances, and consistent delivery/invoice access. Choose Flipkart when scheduled installation, large-appliance exchange, or a specific festive bundle offers better value. On high-value electronics, prioritize authorized sellers and Open-Box checks over a small discount.",
      primaryStoreSlug: "amazon-in",
      primaryStoreLabel: "Amazon",
      secondaryStoreSlug: "flipkart",
      secondaryStoreLabel: "Flipkart",
    },
    table: {
      leftName: "Amazon",
      rightName: "Flipkart",
      rows: [
        { factor: "Returns/replacement", left: "Many electronics follow service-center/brand-led replacement (DOA rules apply)", right: "Similar 7-day service-center replacement patterns on many electronics" },
        { factor: "Delivery", left: "Strong Prime/metro delivery consistency; OBD on eligible items", right: "OBD on eligible items; good for scheduled large-appliance delivery in many areas" },
        { factor: "Best categories", left: "Audio, PC accessories, routers, kitchen/small appliances", right: "Large appliances with installation/exchange, select festive bundles" },
        { factor: "Invoice & warranty", left: "Easy invoice access; verify GST seller details", right: "Invoice available; verify seller authorization and warranty terms" },
        { factor: "Key risk", left: "Wrong seller/listing can complicate warranty claims", right: "Exchange/installation promises vary by pincode and seller" },
      ],
    },
    insider: {
      title: "Out-of-the-Box Insider Reality (What Other Sites Won't Tell You)",
      points: [
        "“No-questions returns” are mostly gone for phones/laptops and many electronics: expect service-center replacement with a brand DOA/job-sheet process if something is faulty. Your leverage is delivery inspection, correct invoice, and authorized seller.",
        "Open-Box Delivery matters more than the platform logo. Inspect before OTP on eligible high-value items—especially screens, seals, and accessories.",
        "A ₹800 cheaper listing from an unknown seller can cost you weeks if warranty registration or service support gets messy. Check seller name, GST invoice, and brand authorization cues.",
      ],
    },
    blocks: [
      {
        heading: "The ₹800 discount that wasn’t worth it",
        paragraphs: [
          "Saving ₹800 on a ₹40,000 monitor feels great—until it arrives with issues and you’re stuck collecting service-center paperwork. For electronics, post-purchase support and documentation matter as much as the checkout price.",
        ],
      },
      {
        heading: "What to compare beyond price",
        paragraphs: [
          "Compare the final price after bank offers, but also check delivery timelines, Open-Box availability, seller reputation, and whether installation/exchange is included where relevant. For large appliances, confirm pincode serviceability and installation terms before ordering.",
        ],
      },
      {
        heading: "Protect your purchase in 2 minutes",
        paragraphs: [
          "At delivery, inspect the package and device before OTP where possible. After delivery, download the invoice, verify serial/warranty status if applicable, and keep packaging until you’re confident the product is fine.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "amazon-in", storeName: "Amazon", bullets: ["Reliable for accessories and smaller electronics with quick delivery options.", "Easy to review seller info and invoices for warranty records."] },
      { storeSlug: "flipkart", storeName: "Flipkart", bullets: ["Useful for large appliances with installation/exchange offers in supported pincodes.", "Compare festive bank bundles and delivery commitments before checkout."] },
      { storeSlug: "havells", storeName: "Havells", bullets: ["Check official product info and service/installation pathways for appliances.", "Good reference when comparing marketplace appliance listings."] },
      { storeSlug: "boult", storeName: "Boult", bullets: ["Buy direct for official warranty registration and authentic audio products.", "Compare with marketplace pricing, but prioritize authorized purchase paths."] },
    ],
    faqs: [
      { question: "Can I return electronics easily on Amazon or Flipkart?", answer: "It depends on the category and listing. Many phones, laptops, and electronics have service-center replacement or limited return windows, often requiring brand DOA verification. Check the listing’s return policy before buying.", sort_order: 0 },
      { question: "What is the most important thing to check at delivery?", answer: "For eligible high-value items, use Open-Box Delivery and inspect before sharing OTP. Also check packaging condition and that included accessories match the listing.", sort_order: 1 },
      { question: "Does seller choice matter for warranty?", answer: "Yes. Authorized sellers and correct GST invoices make warranty registration and service claims smoother. Avoid unclear listings when the price difference is small.", sort_order: 2 },
      { question: "Which platform is better for large appliances?", answer: "It varies by product and pincode. Flipkart often promotes installation/exchange bundles, while Amazon can be strong on delivery and pricing for some items—compare final cost and service terms locally.", sort_order: 3 },
    ],
    relatedComparisons: [
      "best-smartphone-deals-india-amazon-vs-flipkart-2026",
      "best-laptop-deals-india-amazon-vs-flipkart-2026",
      "boat-vs-boult-vs-oneplus-tws-under-2000-india",
    ],
    relatedGuides: [
      { href: "/guides/lenovo-india-laptop-offers-2026-guide", label: "Lenovo laptop offers guide" },
      { href: "/guides/best-credit-card-online-shopping-india-2026", label: "Credit card offers guide" },
    ],
    relatedReviewsStores: [
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
      { href: "/stores/flipkart", label: "Flipkart store hub" },
      { href: "/stores/havells", label: "Havells store hub" },
    ],
    keywords: ["Amazon vs Flipkart electronics India 2026", "service center replacement only", "Open Box Delivery", "GST invoice warranty", "authorized seller electronics"],
  },
  {
    slug: "official-brand-store-vs-amazon-flipkart-laptops-india",
    category: "Electronics & Laptops",
    title: "Lenovo & ASUS Official Stores vs. Amazon & Flipkart: Where Do You Get Better Warranty & Price?",
    seoTitle: "Lenovo & ASUS Official Stores vs Amazon/Flipkart: Laptop Price & Warranty | Durza",
    metaDescription:
      "Compare Lenovo and ASUS official stores vs Amazon/Flipkart for laptops in India: CTO configs, ADP value, student discounts, delivery time, and long-term ownership cost.",
    heroImage: "/guides/official-brand-store-vs-amazon-flipkart-laptops-india.webp",
    summary:
      "Official brand stores can look ₹2,000 costlier upfront, but custom configs, cheaper ADP, and verified discounts often make them better value over 3 years. Marketplaces still win for speed and some card deals.",
    updatedLabel: "Updated 18/11/2026",
    verdict: {
      optionA: "Lenovo / ASUS official stores",
      optionB: "Amazon / Flipkart",
      text: "Choose official brand stores when you care about the exact configuration, bundled accidental damage protection, and student/corporate benefits. Choose marketplaces when you need fast delivery on a standard config and a strong card discount makes the upfront price clearly lower.",
      primaryStoreSlug: "lenovo-india",
      primaryStoreLabel: "Lenovo India",
      secondaryStoreSlug: "asus",
      secondaryStoreLabel: "ASUS",
    },
    table: {
      leftName: "Official brand stores",
      rightName: "Amazon / Flipkart",
      rows: [
        { factor: "Configuration", left: "More control (CTO/options on select models)", right: "Fixed ready-to-ship SKUs" },
        { factor: "Protection plans", left: "Often better-value ADP bundles (model/offer dependent)", right: "Add-ons can be pricier; terms vary" },
        { factor: "Discounts", left: "Student/corporate programs + brand rewards on eligible purchases", right: "Bank instant discounts and sale pricing on listed SKUs" },
        { factor: "Delivery", left: "Custom builds may take longer", right: "Usually faster for in-stock units" },
        { factor: "Ownership value", left: "Can save money over 3 years with right config + protection", right: "Can win upfront if you don’t need upgrades or extra coverage" },
      ],
    },
    insider: {
      title: "Out-of-the-Box Insider Reality (What Other Sites Won't Tell You)",
      points: [
        "CTO vs ready-to-ship: paying a bit more on lenovo.com or asus.com/in can get you the RAM/display you actually need, instead of spending later on compromises or external workarounds.",
        "ADP math matters: a low-cost official accidental damage plan can be far cheaper than marketplace protection or a single out-of-warranty repair.",
        "Avoid pre-activated warranty surprises by checking serial/warranty status on Day 1 and keeping your GST invoice—whether you buy direct or from a marketplace.",
      ],
    },
    blocks: [
      {
        heading: "Why “₹2,000 more” can be the cheaper choice",
        paragraphs: [
          "Many buyers compare only the checkout price. But for laptops, the 3-year cost includes upgrades you wish you had, accidental damage risk, and support quality. Official stores can bundle value that doesn’t show up in a marketplace headline price.",
        ],
      },
      {
        heading: "When marketplaces are still the right call",
        paragraphs: [
          "If you need a standard configuration quickly and a card discount makes the price clearly lower, Amazon or Flipkart can be the practical choice. Just confirm the exact SKU, seller, and warranty terms before ordering.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "lenovo-india", storeName: "Lenovo India", bullets: ["Best for configuration options, student/corporate benefits, and official support.", "Compare total value with protection plans included."] },
      { storeSlug: "asus", storeName: "ASUS", bullets: ["Good for official ROG/TUF/Zenbook/Vivobook purchases and brand-direct offers.", "Check eStore bundles and warranty coverage before deciding."] },
      { storeSlug: "amazon-in", storeName: "Amazon", bullets: ["Fast delivery on standard configs with periodic bank discounts.", "Verify exact model specs and seller authorization."] },
    ],
    faqs: [
      { question: "Do official Lenovo/ASUS stores offer better warranty?", answer: "They can offer clearer purchase records and bundled protection options (like ADP) on eligible models. Warranty terms depend on the product and plan, so compare what’s included, not just the label.", sort_order: 0 },
      { question: "What is CTO and why does it matter?", answer: "CTO (custom-to-order) lets you choose certain specs/configurations on eligible models. It helps avoid being stuck with soldered RAM or a weaker display when you need better long-term performance.", sort_order: 1 },
      { question: "How long does official store delivery take?", answer: "Ready-to-ship models can be quick, but custom builds may take longer than marketplace delivery. Check estimated shipping timelines on the product page before ordering.", sort_order: 2 },
      { question: "Should I still check marketplace prices?", answer: "Yes. Compare final payable amounts after card offers and confirm the exact SKU. Choose the option that gives the best total value for how you’ll use the laptop.", sort_order: 3 },
    ],
    relatedComparisons: [
      "best-laptop-deals-india-amazon-vs-flipkart-2026",
      "credit-card-instant-discount-vs-no-cost-emi-india",
      "black-friday-2026-india-best-deals-vs-regular-sale",
    ],
    relatedGuides: [
      { href: "/guides/lenovo-india-laptop-offers-2026-guide", label: "Lenovo India laptop offers guide" },
      { href: "/guides/asus-india-rog-tuf-zenbook-vhpbook-2026-guide", label: "ASUS India buying guide" },
    ],
    relatedReviewsStores: [
      { href: "/stores/lenovo", label: "Lenovo store hub" },
      { href: "/stores/asus", label: "ASUS store hub" },
    ],
    keywords: ["Lenovo official website vs Amazon Flipkart", "ASUS eShop India laptop", "CTO laptop India", "ADP accidental damage protection", "student discount laptop India"],
  },
  {
    slug: "myntra-vs-ajio-vs-brand-stores-fashion-india",
    category: "Fashion & Beauty",
    title: "Myntra vs. Ajio vs. Official Brand Sites (Vero Moda, ALDO, Charles & Keith): Sizing & Authenticity",
    seoTitle: "Myntra vs Ajio vs Official Brand Stores in India: Sizing, Authenticity & Returns | Durza",
    metaDescription:
      "Compare Myntra, Ajio, and official brand sites (Vero Moda, ALDO, Charles & Keith) in India for sizing, freshness of stock, authenticity cues, and return hygiene.",
    heroImage: "public/guides/fashion.webp",
    summary:
      "Aggregators are great for variety and markdowns, but current-season pieces, gifting, and hard-to-find sizes are often safer to buy direct from brand stores for fresher stock and complete packaging.",
    updatedLabel: "Updated 18/11/2026",
    verdict: {
      optionA: "Myntra / Ajio",
      optionB: "Official brand stores",
      text: "Choose Myntra or Ajio for multi-brand browsing, basics, and end-of-season discounts. Choose official brand stores (Vero Moda, ALDO, Charles & Keith) for current-season drops, gifting, precise size availability, and fresher warehouse stock with full packaging.",
      primaryStoreSlug: "vero-moda",
      primaryStoreLabel: "Vero Moda",
      secondaryStoreSlug: "charles-keith",
      secondaryStoreLabel: "Charles & Keith",
    },
    table: {
      leftName: "Myntra / Ajio",
      rightName: "Official brand stores",
      rows: [
        { factor: "Selection", left: "Wide multi-brand catalog and quick comparison", right: "Focused current-season brand inventory" },
        { factor: "Pricing", left: "Strong during EoSS/sale events and coupons", right: "Brand promos; value in freshness, size range, and packaging" },
        { factor: "Sizing/stock", left: "Popular sizes can sell out or come from return cycles", right: "Better chance of fresh stock and full size matrices (varies by item)" },
        { factor: "Gifting/presentation", left: "Packaging can vary; boxes may be worn", right: "More consistent brand packaging, dust bags, and presentation" },
        { factor: "Returns", left: "Convenient app-based flows; keep tags/boxes intact", right: "Brand-specific policies; usually strict on condition/tags" },
      ],
    },
    insider: {
      title: "Out-of-the-Box Insider Reality (What Other Sites Won't Tell You)",
      points: [
        "Marketplace return-cycle issue: popular sizes (e.g. UK 5–7 footwear, XS–M blazers) may arrive tried/returned multiple times, sometimes with crushed boxes or missing extras. For gifting or pristine pieces, brand-direct can be worth it.",
        "Dust bags and accessories matter: check for included dust bags, straps, or care cards at delivery/unboxing—especially for handbags and premium footwear.",
        "Return hygiene tip: keep tags, barcodes, and shoe boxes intact; test footwear indoors on a clean surface to avoid scuffs that can void exchanges.",
      ],
    },
    blocks: [
      {
        heading: "When a “great deal” arrives in a tired box",
        paragraphs: [
          "If you’ve ever received a handbag in a battered carton with a missing dust bag, you’ve seen the downside of high-velocity marketplace returns. For current-season fashion and gifts, where the item comes from can matter as much as the discount.",
        ],
      },
      {
        heading: "How to choose the right channel",
        paragraphs: [
          "Use Myntra/Ajio for discovery, basics, and stacking sale prices. Use official stores when you need a specific size, the latest drop, or assured presentation. If authenticity and condition are top priorities, brand-direct is usually the calmer option.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "vero-moda", storeName: "Vero Moda", bullets: ["Good for current-season women’s fashion and consistent sizing info.", "Useful when you want brand-direct stock and packaging."] },
      { storeSlug: "aldo-new", storeName: "ALDO", bullets: ["Brand-direct footwear and accessories with fresh inventory.", "Better for gifting and specific size availability."] },
      { storeSlug: "charles-keith", storeName: "Charles & Keith", bullets: ["Reliable for latest bags/shoes and complete presentation.", "Helpful when marketplace boxes or extras are a concern."] },
      { storeSlug: "ajio-com-ecommerce-cps-india", storeName: "AJIO", bullets: ["Strong for multi-brand deals and seasonal discounts.", "Compare final price and return terms before buying premium pieces."] },
    ],
    faqs: [
      { question: "Is it safer to buy branded fashion from official websites?", answer: "For current-season items, gifting, and hard-to-find sizes, official brand stores often provide fresher stock and consistent packaging. Aggregators can still be great for deals—just check seller/listing details and return policies.", sort_order: 0 },
      { question: "Why do marketplace orders sometimes arrive without extras?", answer: "High return volumes can lead to packaging wear or missing non-essential extras in some cases. Inspect on delivery, keep proof, and use the platform’s return flow if something is missing or not as described.", sort_order: 1 },
      { question: "How can I avoid return issues for shoes and bags?", answer: "Keep all tags, inserts, and boxes intact, and try shoes indoors on a clean surface. Review the return/exchange window and condition requirements before purchasing.", sort_order: 2 },
      { question: "Which is better for sale prices: Myntra/Ajio or brand sites?", answer: "Myntra and Ajio often lead during large sale events, while brand sites run their own promos. Compare the final payable price including shipping and any member offers.", sort_order: 3 },
    ],
    relatedComparisons: [
      "adidas-vs-nike-vs-asics-running-shoes-india",
      "kama-ayurveda-vs-forest-essentials-vs-indus-valley",
    ],
    relatedGuides: [
      { href: "/guides/charles-and-keith-india-style-guide", label: "Charles & Keith India style guide" },
      { href: "/guides/adidas-india-ultraboost-originals-training-2026-guide", label: "Adidas India buying guide" },
    ],
    relatedReviewsStores: [
      { href: "/stores/vero-moda", label: "Vero Moda store hub" },
      { href: "/stores/aldo-shoes", label: "ALDO store hub" },
      { href: "/stores/charles-and-keith", label: "Charles & Keith store hub" },
    ],
    keywords: ["Myntra vs Ajio vs brand store India", "Charles and Keith India authentic", "ALDO Vero Moda official site", "fashion sizing returns India"],
  },
  {
    slug: "kama-ayurveda-vs-forest-essentials-vs-indus-valley",
    category: "Fashion & Beauty",
    title: "Ayurvedic Skincare & Haircare in India: Luxury Cold-Pressed vs. Everyday Botanicals",
    seoTitle: "Kama Ayurveda vs Forest Essentials vs Indus Valley (India): What to Buy Where | Durza",
    metaDescription:
      "Compare Kama Ayurveda, Forest Essentials, and Indus Valley in India: cold-pressed oils, sensorial luxury Ayurveda, ammonia/PPD-free hair color, and why buying direct matters.",
    heroImage: "/guides/kama-ayurveda-vs-forest-essentials-vs-indus-valley.webp",
    summary:
      "“Ayurvedic” can mean very different things. Choose based on formulation style and routine: classical oils and distillates, luxury sensorial care, or everyday botanical hair color—then buy from trusted sources to avoid near-expiry stock.",
    updatedLabel: "Updated 18/11/2026",
    verdict: {
      optionA: "Kama Ayurveda / Forest Essentials",
      optionB: "Indus Valley / Dot & Key (by need)",
      text: "Choose Kama Ayurveda for classical cold-pressed/steam-distilled oils and targeted rituals, and Forest Essentials for luxury sensorial Ayurveda and gifting. Choose Indus Valley for ammonia-free/PPD-free botanical hair color and everyday hair care, or Dot & Key if you prefer active-led skincare (ceramides, niacinamide, SPF) for humid weather.",
      primaryStoreSlug: "kama-ayurveda",
      primaryStoreLabel: "Kama Ayurveda",
      secondaryStoreSlug: "indus-valley",
      secondaryStoreLabel: "Indus Valley",
    },
    table: {
      leftName: "Luxury/classical Ayurveda",
      rightName: "Everyday botanicals & actives",
      rows: [
        { factor: "Kama Ayurveda", left: "Cold-pressed oils/distillates, consultations, discovery sizes", right: "—" },
        { factor: "Forest Essentials", left: "Sensorial textures, premium gifting, higher price/ml", right: "—" },
        { factor: "Indus Valley", left: "—", right: "Ammonia-free/PPD-free hair color options and botanical hair care" },
        { factor: "Dot & Key", left: "—", right: "Fruit-actives/ceramides/niacinamide/SPF for daily skincare routines" },
        { factor: "Buying tip", left: "Buy direct for freshness, minis, and brand guidance", right: "Buy direct/authorized to avoid near-expiry or mishandled stock" },
      ],
    },
    insider: {
      title: "Out-of-the-Box Insider Reality (What Other Sites Won't Tell You)",
      points: [
        "Not all “Ayurvedic” products are formulated the same: classical oils/distillates, luxury sensorial blends, and functional hair-color botanicals serve different needs and budgets.",
        "Check ingredient and safety details that matter to you (e.g. ammonia/peroxide/PPD-free claims for hair color, or active ingredients and SPF filters for skincare) rather than relying on buzzwords.",
        "Buying direct from brand sites can reduce the risk of near-expiry or poorly stored stock and may include consultations, samples, or routine guidance.",
      ],
    },
    blocks: [
      {
        heading: "Picking the right kind of “Ayurveda” for your routine",
        paragraphs: [
          "A ₹250 green-tinted shampoo and a classical hair oil are not interchangeable. Start with your goal—scalp/hair rituals, luxury self-care, grey coverage, or active-led skincare—then choose the brand and formulation style that fits.",
        ],
      },
      {
        heading: "Practical checks before you buy",
        paragraphs: [
          "Read ingredient lists, usage instructions, and patch-test guidance (especially for hair color and actives). If you have sensitivities, verify claims on the official product page and consult a professional when needed.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "kama-ayurveda", storeName: "Kama Ayurveda", bullets: ["Classical oils and distillates with brand guidance and discovery options.", "Good for targeted rituals and gifting."] },
      { storeSlug: "indus-valley", storeName: "Indus Valley", bullets: ["Botanical hair color and hair care with clear ingredient positioning.", "Buy direct for product authenticity and current batches."] },
      { storeSlug: "dot-and-key", storeName: "Dot & Key", bullets: ["Active-led skincare routines (ceramides, niacinamide, sunscreen, etc.).", "Useful if you prefer lightweight formulas for humid weather."] },
    ],
    faqs: [
      { question: "Which brand is best for hair oils?", answer: "It depends on your preference: Kama Ayurveda is known for classical oil rituals, while Indus Valley focuses more on botanical hair color/care ranges. Check ingredients and choose based on your scalp/hair needs.", sort_order: 0 },
      { question: "Is Indus Valley hair color ammonia-free or PPD-free?", answer: "Indus Valley markets ammonia-free and 100% PPD-free options in parts of its range, but always verify the exact product label and ingredient list on the official page before buying.", sort_order: 1 },
      { question: "Why buy skincare/haircare direct from brand sites?", answer: "Direct purchases can reduce the chance of near-expiry or mishandled stock and may offer samples, consultations, or clearer return/support policies.", sort_order: 2 },
      { question: "Where does Dot & Key fit in?", answer: "Dot & Key is more active-led (e.g. ceramides, niacinamide, SPF) than traditional Ayurvedic oils, which can suit daily skincare routines—especially in humid climates.", sort_order: 3 },
    ],
    relatedComparisons: [
      "myntra-vs-ajio-vs-brand-stores-fashion-india",
      "kapiva-vs-hkvitals-vs-healthkart-supplements-india",
    ],
    relatedGuides: [
      { href: "/guides/indus-valley-hair-serum-guide", label: "Indus Valley hair care guide" },
      { href: "/guides/dot-and-key-skin-active-guide", label: "Dot & Key skin actives guide" },
    ],
    relatedReviewsStores: [
      { href: "/stores/kama-ayurveda", label: "Kama Ayurveda store hub" },
      { href: "/stores/indus-valley", label: "Indus Valley store hub" },
      { href: "/stores/dot-and-key", label: "Dot & Key store hub" },
    ],
    keywords: ["Kama Ayurveda vs Forest Essentials", "Indus Valley ammonia free PPD free hair color", "Ayurvedic skincare India", "Dot and Key actives", "buy direct skincare"],
  },
  {
    slug: "kapiva-vs-hkvitals-vs-healthkart-supplements-india",
    category: "Health & Home",
    title: "Kapiva vs. HK Vitals vs. HealthKart in India (2026): Labels, Lab Reports & Safe Buying",
    seoTitle: "Kapiva vs HK Vitals vs HealthKart India 2026: Labels, Lab Reports & Cost Per Serving | Durza",
    metaDescription:
      "Compare three different supplement routes in India using published label data: Kapiva Shilajit resin, HK Vitals marine collagen and MuscleBlaze whey via HealthKart — with serving counts, cost per serving and verification checks.",
    heroImage: "/guides/kapiva-vs-hkvitals-vs-healthkart-supplements-india.webp",
    summary:
      "These are not direct substitutes: Kapiva sells Ayurvedic resins, HK Vitals sells daily nutraceuticals, and HealthKart is a multi-brand sports-nutrition marketplace. Compare label transparency, cost per serving and verification options — not headline discounts. No health or efficacy claims are made here.",
    updatedLabel: "Updated 24/11/2026",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-24T00:00:00.000Z",
    audience: {
      bestFor: [
        "Adults in India comparing an Ayurvedic resin, a daily collagen or a whey protein, and wanting to check label data and cost per serving before buying.",
        "Shoppers who want to know which channels publish batch reports or authentication tools they can check themselves.",
      ],
      skipIf: [
        "Pregnant or lactating women, anyone under 18, and people with kidney, liver or endocrine conditions or on prescription medication — speak to a qualified doctor first.",
        "Anyone seeking treatment or disease management. Dietary supplements do not diagnose, treat, cure or prevent disease, and this page makes no efficacy claims.",
      ],
    },
    productLinks: [
      {
        label: "Check live price — Kapiva Himalayan Shilajit Resin 20g",
        href: getAmazonProductLink("B09BZNDYT2", "compare_supplements"),
        note: "Verified ASIN. 250mg servings; 18+ only.",
      },
      {
        label: "Check live price — MuscleBlaze Biozyme Whey 1kg (Rich Chocolate)",
        href: getAmazonProductLink("B091HTLXL3", "compare_supplements"),
        note: "Verified ASIN. 25g protein per 36g scoop, 28 servings.",
      },
      {
        label: "Check live price — MuscleBlaze Biozyme Whey 1kg (French Vanilla)",
        href: getAmazonProductLink("B0CCV5T996", "compare_supplements"),
      },
      {
        label: "Check live price — MuscleBlaze Biozyme Whey 1kg (Rocky Road)",
        href: getAmazonProductLink("B0G1M1W72M", "compare_supplements"),
      },
    ],
    sources: [
      { label: "Kapiva official product page", href: "https://kapiva.in/mens-health/kapiva-himalayan-shilajit-resin-20g/", checkedAt: "25 Nov 2026" },
      { label: "Kapiva official blog — fulvic acid & testing claims", href: "https://kapiva.in/blog/best-shilajit-resin-india", checkedAt: "25 Nov 2026" },
      { label: "Amazon India — Kapiva Shilajit 20g", href: "https://www.amazon.in/Kapiva-Himalayan-Shilajit-Endurance-Stamina/dp/B09BZNDYT2", checkedAt: "25 Nov 2026" },
      { label: "PharmEasy — Kapiva Shilajit 20g", href: "https://pharmeasy.in/health-care/products/kapiva-himalayan-shilajit-resin---20g-2931802", checkedAt: "25 Nov 2026" },
    ],
    verdict: {
      optionA: "Kapiva Himalayan Shilajit Resin",
      optionB: "HK Vitals Marine Collagen / MuscleBlaze whey via HealthKart",
      text: "Pick by category, not by brand loyalty. Kapiva Himalayan Shilajit Resin 20g is ₹999 on the brand site with a 250mg serving (80 servings, ≈₹12.5 per serving) and the brand states NABL reports are available per pack. HK Vitals Skin Radiance Marine Collagen 200g is ₹909 with 5g collagen and 40mg vitamin C stated per serving (≈40 servings, ≈₹22.7 per serving) and is non-vegetarian (fish). MuscleBlaze Biozyme Performance Whey 1kg is listed at ₹3,999 with 25g protein per 36g scoop across 28 servings (≈₹142.8 per serving, ≈₹5.7 per gram of protein); the retailer states third-party certification, which you should verify on the exact batch. All figures were checked on 24 Nov 2026.",
      primaryStoreSlug: "kapiva",
      primaryStoreLabel: "Kapiva",
      secondaryStoreSlug: "healthkart",
      secondaryStoreLabel: "HealthKart",
    },
    table: {
      leftName: "Kapiva Shilajit Resin 20g",
      rightName: "HK Vitals Marine Collagen 200g",
      extraName: "MuscleBlaze Biozyme Whey 1kg",
      rows: [
        { factor: "Category", left: "Ayurvedic resin", right: "Daily nutraceutical (marine collagen)", extra: "Sports nutrition (whey protein)" },
        { factor: "Serving size / servings", left: "250 mg / 80 servings (20 g jar)", right: "5 g collagen per scoop / ≈40 servings (200 g jar)", extra: "36 g scoop / 28 servings (1 kg tub)" },
        { factor: "Actives stated on official/retail page", left: "Brand states 60%+ fulvic acid and 80+ minerals", right: "5 g hydrolysed marine collagen + 40 mg vitamin C per serving", extra: "25 g protein, 11.75 g EAA, 5.51 g BCAA per scoop" },
        { factor: "Dietary / allergen marker", left: "Vegetarian; brand says not for pregnant or lactating women; 18+", right: "Non-vegetarian (fish source) — check shellfish allergy", extra: "Vegetarian dot, but contains milk and soy" },
        { factor: "Batch / testing claim to verify", left: "Brand states NABL report with every pack — match the batch code", right: "Brand states third-party testing — ask for the batch COA", extra: "Retailer states Informed Choice / Labdoor / Trustified checks — verify the exact batch" },
        { factor: "Price as reviewed*", left: "₹999 (MRP ₹1,199), kapiva.in, 24 Nov 2026", right: "₹909 (MRP ₹975), hkvitals.com, 24 Nov 2026", extra: "₹3,999, Amazon.in listing, 24 Nov 2026" },
        { factor: "Cost per serving*", left: "≈₹12.5 (999 ÷ 80)", right: "≈₹22.7 (909 ÷ 40)", extra: "≈₹142.8 (3,999 ÷ 28); ≈₹5.7 per g protein" },
      ],
    },
    insider: {
      title: "Out-of-the-Box Insider Reality (What Other Sites Won't Tell You)",
      points: [
        "These three products are not alternatives to each other. A resin, a collagen powder and a whey tub solve different purchase questions — compare within a category, not across it.",
        "A 'clinically proven' line on a brand page is not evidence by itself. We do not repeat efficacy claims on this page because no named study is cited in the sources we reviewed.",
        "Batch reports must match the batch code printed on your pack. A generic certificate from a different batch is not the same thing.",
        "*Prices are snapshots from 24 Nov 2026 and change during sales. Cost per serving divides the reviewed price by the stated servings; it is arithmetic on published data, not a measured result.",
        "We did not purchase, consume or independently lab-test any of these products. We make no medical claims. If you have a medical condition, are pregnant, or take medication, consult a qualified professional.",
      ],
    },
    blocks: [
      {
        heading: "1. Label transparency — Winner: HK Vitals (5 g + 40 mg stated per serving)",
        paragraphs: [
          "Of the three official pages we reviewed, HK Vitals states the most specific per-serving numbers for its marine collagen: 5 g collagen and 40 mg vitamin C, with a 200 g jar. MuscleBlaze states 25 g protein per 36 g scoop across 28 servings. Kapiva states 60%+ fulvic acid but dosing is a 250 mg measure by spoon, so exact daily intake depends on how level the scoop is.",
        ],
      },
      {
        heading: "2. Cost per serving — Winner: Kapiva (≈₹12.5 per serving)",
        paragraphs: [
          "Dividing the reviewed price by stated servings gives ≈₹12.5 per Kapiva serving, ≈₹22.7 per HK Vitals serving and ≈₹142.8 per whey serving. These are not comparable benefits — they are different product categories — but the arithmetic stops a ₹999 jar from looking cheaper than it is without knowing the serving count.",
        ],
      },
      {
        heading: "3. Batch testing claims — Winner: whichever brand gives you a matching COA",
        paragraphs: [
          "Kapiva states NABL reports are available with every pack; HK Vitals states third-party testing; the MuscleBlaze retailer page names Informed Choice, Labdoor and Trustified checks. We have not verified any specific certificate. Ask for the report matching the batch code on your pack before you rely on it.",
        ],
      },
      {
        heading: "4. Allergens and dietary markers — Winner: no brand, check the label",
        paragraphs: [
          "HK Vitals collagen is explicitly non-vegetarian because it comes from fish. The whey carries a vegetarian dot but contains milk and soy. Kapiva's resin is labelled vegetarian and the brand says it is not for pregnant or lactating women and is for adults over 18. Read the back panel of the exact SKU rather than the front-of-pack claim.",
        ],
      },
      {
        heading: "5. Purchase channel — Winner: brand-direct where verification is supported",
        paragraphs: [
          "HealthKart describes an HK Verify scratch-code check on eligible products; brand-direct stores give you a clearer invoice and batch trail. Unknown marketplace resellers are where counterfeit and storage complaints concentrate. Keep the invoice and batch number for any return or quality question.",
        ],
      },
      {
        heading: "What we verified, and what we did not",
        paragraphs: [
          "A 25 Nov 2026 evidence pass confirmed Kapiva Shilajit pricing across three listings: ₹988 on Amazon (sold by RK World Infocom), ₹999 direct from Kapiva, and ₹1,004 on PharmEasy. MRPs conflict across sources (₹1,199 on Amazon and the brand site vs ₹1,499 on PharmEasy), so verify the exact MRP at checkout. The HK Vitals and MuscleBlaze URLs in that pass returned no extractable SKU data; their figures on this page come from our earlier checks dated 24 Nov 2026. We did not purchase, consume, or commission laboratory testing on any product, make no health or efficacy claims, and could not open a batch-specific COA. Prices are dated snapshots and change during sales.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "kapiva", storeName: "Kapiva", bullets: ["Brand-direct: check the batch report and 18+ / pregnancy guidance on the pack.", "₹999 seen 24 Nov 2026 — verify current price."] },
      { storeSlug: "hkvitals", storeName: "HK Vitals", bullets: ["Check the non-vegetarian fish source and per-serving collagen figure.", "₹909 seen 24 Nov 2026 — verify current price."] },
      { storeSlug: "healthkart", storeName: "HealthKart", bullets: ["Multi-brand: confirm the exact brand and batch, not just the marketplace.", "Use authentication checks where the product supports them."] },
    ],
    faqs: [
      { question: "Which should I buy: Kapiva, HK Vitals or a whey tub from HealthKart?", answer: "They are different categories. Kapiva Himalayan Shilajit Resin 20g is an Ayurvedic resin at ₹999 with 250 mg servings (≈₹12.5/serving). HK Vitals Marine Collagen 200g is a fish-derived daily supplement at ₹909 with 5 g collagen per serving (≈₹22.7/serving). MuscleBlaze Biozyme Whey 1kg is sports nutrition at ₹3,999 with 25 g protein per 36 g scoop (≈₹5.7 per gram of protein). Choose within your category and verify the label.", sort_order: 0 },
      { question: "How do I check a batch lab report?", answer: "Find the batch code printed on your pack, then ask the brand for the certificate of analysis matching that code. A generic report from another batch is not the same evidence. Kapiva states NABL reports are available per pack; we have not opened a specific report ourselves.", sort_order: 1 },
      { question: "What is HK Verify?", answer: "HealthKart describes it as a scratch-code authentication mechanism on eligible products. Check whether your exact product supports it and follow the instructions on the pack. We have not tested the mechanism.", sort_order: 2 },
      { question: "Do I need to check veg/non-veg markers?", answer: "Yes. HK Vitals' collagen is non-vegetarian because it is fish-derived; the whey carries a vegetarian dot but contains milk and soy. Read the ingredient panel of the exact SKU before buying.", sort_order: 3 },
      { question: "Did Durza test or consume these supplements?", answer: "No. We compared published label and retail data on 24 Nov 2026 and make no medical or efficacy claims. Consult a qualified professional before starting any supplement, especially if you are pregnant, under 18, or taking medication.", sort_order: 4 },
    ],
    relatedComparisons: [
      "credit-card-instant-discount-vs-no-cost-emi-india",
    ],
    relatedGuides: [
      { href: "/guides/kapiva-ayurveda-daily-wellness-guide", label: "Kapiva daily wellness guide" },
      { href: "/guides/hkvitals-daily-multivitamin-guide", label: "HK Vitals daily nutrition guide" },
      { href: "/guides/healthkart-whey-creator-and-stacking-guide", label: "HealthKart whey and creatine buying guide" },
    ],
    relatedReviewsStores: [
      { href: "/topics/health", label: "Health & Fitness topic hub" },
      { href: "/categories/supplements", label: "Supplements & Fitness category" },
      { href: "/reviews/kapiva-himalayan-shilajit-resin-india-review", label: "Kapiva Shilajit resin review" },
      { href: "/stores/kapiva", label: "Kapiva store hub" },
      { href: "/stores/hkvitals", label: "HK Vitals store hub" },
      { href: "/stores/healthkart", label: "HealthKart store hub" },
      { href: "/stores/beast-life", label: "BeastLife store hub" },
    ],
    keywords: ["Kapiva vs HK Vitals vs HealthKart India", "Shilajit NABL lab report check", "HK Vitals marine collagen serving", "cost per serving supplements India", "MuscleBlaze whey protein per gram India", "authentic supplements India"],
  },
  {
    slug: "adidas-vs-nike-vs-asics-running-shoes-india",
    category: "Fashion & Beauty",
    title: "Best Running & Everyday Sneakers for Indian Roads: Cushioning, Sizing & Official Store Perks",
    seoTitle: "Adidas vs Nike vs ASICS for Indian Roads (2026): Grip, Cushioning & Sizing | Durza",
    metaDescription:
      "Compare Adidas, Nike, and ASICS for Indian roads and monsoon conditions: outsole grip, cushioning, UK-to-CM sizing, and why buying official can reduce counterfeit risk.",
    heroImage: "public/guides/adidas-vs-nike-vs-asics-running-shoes-india.webp",
    summary:
      "Indian concrete, broken footpaths, and monsoon-slick tiles punish the wrong shoes. Pick based on grip and support for your use, get sizing right in CM, and buy from trusted channels for popular models.",
    updatedLabel: "Updated 18/11/2026",
    verdict: {
      optionA: "Adidas / ASICS",
      optionB: "Nike (and when to choose what)",
      text: "Choose Adidas for strong wet-road grip options (e.g. Continental rubber on select models) and easy domestic buying/returns, ASICS for stability and long-run cushioning on hard surfaces, and Nike for responsive performance and lifestyle picks—if you get the right fit and buy from trusted sources.",
      primaryStoreSlug: "adidas",
      primaryStoreLabel: "Adidas",
      secondaryStoreSlug: "boldfit",
      secondaryStoreLabel: "Boldfit",
    },
    table: {
      leftName: "Best fit for",
      rightName: "What to watch",
      rows: [
        { factor: "Adidas", left: "Everyday + training + grip-focused models; popular lifestyle icons", right: "Pick outsole/cushioning for roads; use UK/CM chart for half sizes" },
        { factor: "ASICS", left: "Stability/cushioning for regular running on concrete", right: "Model choice matters (stability vs neutral); try fit for toe room" },
        { factor: "Nike", left: "Responsive ride/race-day feel and lifestyle styles", right: "Check delivery/KYC timelines for some orders; confirm sizing in CM" },
        { factor: "Indian conditions", left: "Grip for monsoon tiles/wet roads, durable outsoles", right: "Soft lifestyle soles can wear fast on rough surfaces" },
        { factor: "Buying channel", left: "Official stores reduce counterfeit risk and ease exchanges", right: "Be cautious with too-good-to-be-true prices on popular pairs" },
      ],
    },
    insider: {
      title: "Out-of-the-Box Insider Reality (What Other Sites Won't Tell You)",
      points: [
        "Indian roads are tough on shoes: prioritize outsole grip and durability (e.g. Continental rubber on select Adidas models) if you walk/run on wet tiles or rough asphalt.",
        "Size in CM, not just UK: half-size mistakes are common. Measure your foot length and match the brand’s CM chart—especially for narrow performance fits.",
        "Counterfeit risk is highest on hyped models. Buying from adidas.co.in (and other official channels) can save you from fakes and makes exchanges simpler; adiClub perks may add value on eligible purchases.",
      ],
    },
    blocks: [
      {
        heading: "Why treadmill comfort doesn’t always translate outdoors",
        paragraphs: [
          "A soft, comfy sole can feel great indoors but wear quickly or slip on monsoon-wet surfaces. For Indian daily use, think about grip, outsole durability, and support before aesthetics.",
        ],
      },
      {
        heading: "Get the fit right the first time",
        paragraphs: [
          "Check each brand’s size chart in centimeters, leave a bit of toe room for running, and consider width/lockdown for your foot shape. If you’re between sizes, use the CM measurement as your anchor.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "adidas", storeName: "Adidas", bullets: ["Official source for popular models, sizing support, and member perks.", "Good for grip-focused trainers and everyday sneakers."] },
      { storeSlug: "boldfit", storeName: "Boldfit", bullets: ["Useful for affordable fitness accessories and training essentials.", "Pair with the right footwear choice for your workout routine."] },
    ],
    faqs: [
      { question: "Which shoes are best for Indian monsoon roads?", answer: "Look for durable outsoles with reliable wet grip and a stable fit. Model choice matters more than brand name—check outsole material and tread suited to wet tiles/roads.", sort_order: 0 },
      { question: "How should I choose sneaker size online in India?", answer: "Measure your foot length in centimeters and use the brand’s CM/UK size chart. For running shoes, ensure enough toe room and a secure midfoot fit.", sort_order: 1 },
      { question: "Is Adidas better than Nike for running in India?", answer: "It depends on the model and your needs. Adidas offers strong grip options on some lines, Nike excels in responsive performance models, and ASICS is often preferred for stability/cushioning—compare specific shoes, not just brands.", sort_order: 2 },
      { question: "How do I avoid fake sneakers?", answer: "Buy from official brand stores or authorized retailers, be cautious of unusually low prices, and check packaging, labels, and return policies.", sort_order: 3 },
    ],
    relatedComparisons: [
      "myntra-vs-ajio-vs-brand-stores-fashion-india",
      "kapiva-vs-hkvitals-vs-healthkart-supplements-india",
    ],
    relatedGuides: [
      { href: "/guides/adidas-india-ultraboost-originals-training-2026-guide", label: "Adidas India Ultraboost/Originals/Training guide" },
    ],
    relatedReviewsStores: [
      { href: "/stores/adidas", label: "Adidas store hub" },
    ],
    keywords: ["Adidas vs Nike vs Asics running shoes India", "best running shoes Indian roads monsoon", "Continental rubber grip", "UK to CM shoe size India", "adiClub perks"],
  },
  {
    slug: "havells-vs-ao-smith-vs-crompton-water-heaters-india",
    category: "Health & Home",
    title: "Havells vs. AO Smith vs. Crompton Geysers in India (2026): 8-Bar, Hard Water & Warranty Compared",
    seoTitle: "Havells vs AO Smith vs Crompton Geyser India 2026: 15L 5-Star Compared | Durza",
    metaDescription:
      "Compare the Havells Adonia Spin 15L, AO Smith HSE-SDS-015 and Crompton Arno Neo 15L on 8-bar pressure, BEE standing loss, hard-water tank protection and warranty — with numbers from official spec sheets.",
    heroImage: "public/guides/havells-vs-ao-smith-vs-crompton-water-heaters-india.webp",
    summary:
      "In Indian high-rises and hard-water cities, a 5-star sticker does not stop a tank from leaking in year three. Here is how three 15L storage geysers compare on rated pressure, tank coating, standing heat loss and warranty — using manufacturer spec sheets and published label data rather than marketing claims.",
    updatedLabel: "Updated 24/11/2026",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-24T00:00:00.000Z",
    audience: {
      bestFor: [
        "High-rise apartment owners and homes with pressure pumps that need an 8-bar rated 15L–25L storage geyser.",
        "Buyers in hard-water cities comparing glass-lined tanks, anode protection and tank warranty terms.",
      ],
      skipIf: [
        "Buyers needing a 3L instant kitchen geyser or a gas/solar heater — this compares 15L bathroom storage models.",
        "Renters in low-pressure independent houses where a basic 6.5-bar budget geyser is sufficient.",
      ],
    },
    productLinks: [
      {
        label: "Check live price — Crompton Arno Neo 15L",
        href: getAmazonProductLink("B08GSQXLJ2", "compare_water_heater"),
        note: "Verified ASIN. The Havells and AO Smith models do not yet have a verified product link on Durza.",
      },
    ],
    sources: [
      { label: "Havells Water Heaters Catalogue", href: "https://havells.com/media/wysiwyg/Brochure-and-pricelist/Water_Heaters/Catalogue_Havells_Water_Heaters.pdf", checkedAt: "25 Nov 2026" },
      { label: "AO Smith HSE-SDS user manual", href: "https://m.media-amazon.com/images/I/C1n43u2QsCL.pdf", checkedAt: "25 Nov 2026" },
      { label: "Smartprix — Havells vs AO Smith", href: "https://www.smartprix.com/geysers/havells_adonia_spin_15l_water__vs_ao_smith_hse_sds_15l_storage_w-cpd1zz56grqu_2310uv6sos9.php", checkedAt: "25 Nov 2026" },
      { label: "Smartprix — Havells vs Crompton", href: "https://www.smartprix.com/geysers/havells_adonia_spin_15l_water__vs_crompton_arno_neo_15_l_storage-cpd1zz56grqu_pd1apims3sp.php", checkedAt: "25 Nov 2026" },
    ],
    verdict: {
      optionA: "Havells Adonia Spin 15L",
      optionB: "AO Smith HSE-SDS-015 / Crompton Arno Neo 15L",
      text: "All three are 8-bar, 2000W, 5-star 15L storage geysers, so the decision comes down to what you value. Havells Adonia Spin has the lowest published standing loss (0.419 kWh/24h) and the strongest warranty split (7-year tank, 4-year element, 2-year comprehensive). AO Smith HSE-SDS-015 uses a Blue Diamond glass-lined tank with a 7-year tank and 2+2-year element warranty, but its standing loss is higher at 0.451 kWh/24h and the anode is explicitly outside warranty. Crompton Arno Neo 15L is the value pick at a 5-year tank / 2-year element / 2-year product warranty — but we could not verify its standing-loss figure from an official source, so do not buy it on efficiency claims alone.",
      primaryStoreSlug: "havells",
      primaryStoreLabel: "Havells",
      secondaryStoreSlug: "amazon-in",
      secondaryStoreLabel: "Amazon India",
    },
    table: {
      leftName: "Havells Adonia Spin 15L",
      rightName: "AO Smith HSE-SDS-015",
      extraName: "Crompton Arno Neo 15L",
      rows: [
        { factor: "Rated pressure", left: "8 bar (0.8 MPa)", right: "8 bar (0.8 MPa)", extra: "8 bar (0.8 MPa)" },
        { factor: "Tank & element", left: "Feroglas single-weld steel tank; Incoloy 800 glass-coated element; heavy magnesium anode", right: "Blue Diamond glass-lined tank; glass-coated Incoloy element; anode not covered by warranty", extra: "Anti-scale / Nano polymer-coated tank; copper-tube element; magnesium anode" },
        { factor: "Standing loss (kWh/24h at 45°C)", left: "0.419 (Havells brochure)", right: "0.451 (AO Smith user guide)", extra: "Not published on the official page we checked — verify on the BEE label" },
        { factor: "Reheat time", left: "20 min to raise 50°C (Havells brochure)", right: "12 min for a 35°C rise (AO Smith user guide)", extra: "Third-party listings say ~40 min; not confirmed on an official source" },
        { factor: "Power / BEE rating", left: "2000 W · 5 star", right: "2000 W · 5 star", extra: "2000 W · 5 star" },
        { factor: "Warranty (tank / element / product)", left: "7 yr / 4 yr / 2 yr", right: "7 yr / 2+2 yr / 2 yr (element extension needs registration within 60 days)", extra: "5 yr / 2 yr / 2 yr" },
        { factor: "In the box", left: "2 flexi pipes, wall-mounting accessory, shock-safe plug (Havells brochure)", right: "Check the exact listing — hoses are not covered by AO Smith warranty", extra: "Geyser, multi-function valve, warranty card (listing)" },
        { factor: "Price as reviewed*", left: "MRP ₹19,510 on Havells brochure; street listing ₹10,990 seen on Smartprix", right: "₹9,299 seen on Smartprix", extra: "₹5,699 seen in a third-party comparison; verify the live listing" },
      ],
    },
    insider: {
      title: "Out-of-the-Box Insider Reality (What Other Sites Won't Tell You)",
      points: [
        "8 bar is a rating, not a guarantee. All three models here carry 8-bar (0.8 MPa) ratings, but the multi-function safety valve must be fitted correctly — AO Smith's manual explicitly warns against removing or tampering with it.",
        "Wattage is not your electricity bill. Standing loss is what you pay while the tank sits hot between morning and evening use. Havells publishes 0.419 kWh/24h, AO Smith 0.451 kWh/24h. We could not confirm a Crompton figure from an official source, so treat any efficiency claim for it as unverified.",
        "Element warranty is not tank warranty. Havells offers 4 years on the element; AO Smith offers 2+2 years only if you register within 60 days; Crompton offers 2 years. The longest tank warranty does not mean the longest element cover.",
        "Anodes are consumables. AO Smith's warranty document states the anode is not covered and that the tank warranty can be void if it is removed or not replaced when consumed — budget for periodic service in hard-water areas.",
        "*We did not purchase, install or physically test these water heaters. Prices are listing snapshots seen on 24 Nov 2026, not live quotes. Check the current price, pincode installation terms and exact SKU before paying.",
      ],
    },
    blocks: [
      {
        heading: "1. High-rise pressure — Winner: tie (all three are 8 bar)",
        paragraphs: [
          "Every floor adds static pressure, and booster pumps push it higher. All three models in this comparison are rated to 8 bar (0.8 MPa), so none of them is automatically unsafe for a high-rise. Check the rating plate on the exact SKU you receive: older and budget variants from these brands can still be 6.5 bar.",
        ],
      },
      {
        heading: "2. Hard-water tank longevity — Winner: Havells and AO Smith",
        paragraphs: [
          "Havells uses a Feroglas single-weld steel tank with an Incoloy 800 glass-coated element and a heavy magnesium anode. AO Smith uses its Blue Diamond glass-lined tank with a glass-coated element. Crompton's anti-scale coating is rated for high TDS, but its element is a copper tube and the tank warranty is 5 years rather than 7. In high-TDS water, plan periodic descaling regardless of coating — AO Smith's own manual makes anode replacement a warranty condition.",
        ],
      },
      {
        heading: "3. Standing heat loss — Winner: Havells (0.419 kWh/24h)",
        paragraphs: [
          "Published standing loss is 0.419 kWh/24h at 45°C for the Havells Adonia Spin 15L and 0.451 kWh/24h for the AO Smith HSE-SDS-015. At typical Indian tariffs the gap is small in rupees per day, but it compounds over a year of standby operation. We could not verify a standing-loss number for the Crompton Arno Neo from an official page — do not assume 5-star means the same standby loss across brands.",
        ],
      },
      {
        heading: "4. Price versus installation extras — Winner: Crompton (value)",
        paragraphs: [
          "Listing snapshots on 24 Nov 2026 put the Crompton well below the other two, with a 5-year tank warranty. Havells' brochure lists 2 flexi pipes and a wall-mounting kit in the box; AO Smith's warranty excludes hoses and site plumbing work. Compare the final payable amount including installation and pipe kits, not just the product price.",
        ],
      },
      {
        heading: "5. Warranty structure — Winner: Havells",
        paragraphs: [
          "Havells: 7-year tank, 4-year element, 2-year comprehensive. AO Smith: 7-year tank, 2+2-year element only after registration within 60 days, 2-year product, with the anode excluded. Crompton: 5-year tank, 2-year element, 2-year product. If you plan to keep the geyser past year five, the element cover is the part that matters.",
        ],
      },
      {
        heading: "What we verified, and what we did not",
        paragraphs: [
          "A 25 Nov 2026 evidence pass confirmed the Havells Adonia Spin 15L official MRP of ₹19,510 against a Smartprix selling price of ₹10,990; the Crompton Arno Neo 15L at ₹5,699; and the AO Smith warranty and Blue Diamond lining from its official user manual. No verifiable live price was found for the AO Smith HSE-SDS-015, so we publish none. We did not purchase, install or physically test any of these water heaters, and we have not checked pincode-specific installation charges. Prices are dated snapshots and will change during sales.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "havells", storeName: "Havells", bullets: ["Check the exact 15L SKU, warranty card and installation terms.", "Official store for model specs and service information."] },
      { storeSlug: "amazon-in", storeName: "Amazon India", bullets: ["Compare prices across all three brands and verify the seller.", "Inspect the BEE label and rating plate on delivery."] },
    ],
    faqs: [
      { question: "Which is the best 15L geyser for a high-rise in India?", answer: "All three compared here are rated 8 bar (0.8 MPa), which is the figure to check for high-rise and pressure-pump use. On published data the Havells Adonia Spin 15L has the lowest standing loss (0.419 kWh/24h) and the longest element warranty (4 years); AO Smith HSE-SDS-015 has a 7-year tank but 2+2-year element cover; Crompton Arno Neo 15L is the value option with a 5-year tank warranty.", sort_order: 0 },
      { question: "What does 8-bar pressure rating actually mean?", answer: "It means the tank and its multi-function safety valve are designed for 0.8 MPa of water pressure — the figure that matters in tall buildings and with booster pumps. Verify it on the rating plate of the exact SKU, since budget variants from the same brands can be 6.5 bar.", sort_order: 1 },
      { question: "Which geyser is better for hard water?", answer: "Havells' Feroglas single-weld tank with an Incoloy 800 glass-coated element and AO Smith's Blue Diamond glass-lined tank are both designed for demanding water. Crompton's anti-scale coating is rated for high TDS too, but its element warranty is shorter. In all cases, periodic descaling and anode replacement matter more than the coating name.", sort_order: 2 },
      { question: "Does the 5-star rating tell me my electricity bill?", answer: "Not by itself. Standing loss (kWh per 24 hours at 45°C) is the number that reflects standby cost. Havells publishes 0.419 and AO Smith 0.451 for the models here. We could not verify Crompton's figure from an official source, so do not compare on the star sticker alone.", sort_order: 3 },
      { question: "Did Durza physically test these water heaters?", answer: "No. We compared manufacturer spec sheets, warranty documents and published retail listings accessed on 24 Nov 2026. Prices are dated snapshots, not live quotes, and we have not verified pincode-specific installation charges.", sort_order: 4 },
    ],
    relatedComparisons: [
      "amazon-vs-flipkart-electronics-2026",
      "credit-card-instant-discount-vs-no-cost-emi-india",
    ],
    relatedGuides: [
      { href: "/guides/havells-bldc-fan-offers-guide", label: "Havells BLDC fan offers and honest savings math" },
      { href: "/guides/how-to-save-on-amazon-india", label: "How to save on Amazon India" },
    ],
    relatedReviewsStores: [
      { href: "/topics/home", label: "Home & Appliances topic hub" },
      { href: "/categories/home-kitchen", label: "Home & Kitchen category" },
      { href: "/collections/high-rise-indian-apartment-utility-and-diy-kit", label: "High-rise apartment setup kit" },
      { href: "/stores/havells/bldc-calculator", label: "Havells BLDC electricity savings calculator" },
      { href: "/coupons/havells-adonia-spin-15-litre-storage-water-heater", label: "Havells Adonia Spin 15L offer" },
      { href: "/coupons/crompton-arno-neo-15l-storage-water-heater", label: "Crompton Arno Neo 15L offer" },
      { href: "/stores/havells", label: "Havells store hub" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
    ],
    keywords: ["Havells vs AO Smith vs Crompton geyser India", "best 15L geyser high rise India", "8 bar pressure water heater", "BEE 5 star geyser standing loss", "hard water geyser tank warranty", "Havells Adonia Spin vs AO Smith HSE-SDS-015"],
  },
  {
    slug: "credit-card-instant-discount-vs-no-cost-emi-india",
    category: "Sale & Card Math",
    title: "Instant Bank Discount vs. No-Cost EMI in India: What the 2026 Terms Actually Say",
    seoTitle: "Instant Bank Discount vs No-Cost EMI in India: Checked Terms | Durza",
    metaDescription:
      "Official 2026 offer terms show some bank benefits are post-payment cashback, capped per card and unavailable on EMI. Compare final payable, eligibility and reward-point impact before paying.",
    heroImage: "public/guides/bank.webp",
    summary:
      "A discount shown on a product page is not always an instant reduction: Lenovo India's 2026 offer pays cashback after delivery and is not valid on EMI. Check payment-mode eligibility, per-card caps and reward-point terms before choosing.",
    updatedLabel: "Updated 18/11/2026",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-25T00:00:00.000Z",
    audience: {
      bestFor: [
        "Shoppers choosing between a bank offer and EMI at checkout on a laptop or appliance.",
        "Anyone who wants to know whether an advertised discount is instant, post-payment cashback, or EMI-only.",
      ],
      skipIf: [
        "Anyone expecting a guaranteed discount — opened T&Cs cap savings per card, exclude payment modes and allow withdrawal without notice.",
        "Readers who want a hands-on tested verdict. This page uses official offer terms checked 25 Nov 2026; Durza did not attempt a purchase or payment.",
      ],
    },
    sources: [
      { label: "Lenovo India — offer terms and conditions", href: "https://www.lenovo.com/in/en/lenovo-offer-details/", checkedAt: "25 Nov 2026" },
      { label: "Tata CLiQ — American Express Black Friday offer T&C", href: "https://www.tatacliq.com/terms/amx-bfs-tnc", checkedAt: "25 Nov 2026" },
      { label: "Amazon Pay India / HDFC — GIF 2026 promotion terms", href: "https://www.amazon.in/promotion/details/popup/AB3VHKV8ABYA2", checkedAt: "25 Nov 2026" },
      { label: "SBI Card — Flipkart festive offer page", href: "https://www.sbicard.com/en/personal/offer/flipkart-festive-oct26.page", checkedAt: "25 Nov 2026" },
      { label: "Flipkart / SBI — debit-card offer T&C", href: "https://www.flipkart.com/pages/bobcarda-tnc", checkedAt: "25 Nov 2026" },
      { label: "HDFC Bank — Amazon offers listing", href: "https://www.hdfc.bank.in/ps/offers/retail-stores/amazon", checkedAt: "25 Nov 2026" },
      { label: "Tata CLiQ — Black Friday sale press release (19–30 Nov 2026)", href: "https://www.businesswireindia.com/tata-cliq-luxury-and-tata-cliq-fashion's-black-friday-sale-promises-an-exciting-start-to-the-holiday-shopping-season-102737.html", checkedAt: "25 Nov 2026" },
    ],
    verdict: {
      optionA: "Instant discount (eligible full swipe)",
      optionB: "EMI or post-payment cashback",
      text: "Choose a genuine instant discount when your card, product and payment mode are eligible and the final amount on the payment screen is lower. Do not assume an advertised benefit is instant: Lenovo India's 2026 offer is post-payment cashback, is not valid on EMI, and the opened T&Cs disagree on the cashback amount and timing. Compare the payment-page amount, the total outflow over the EMI tenure and any reward points you lose.",
      primaryStoreSlug: "amazon-in",
      primaryStoreLabel: "Amazon",
      secondaryStoreSlug: "lenovo-india",
      secondaryStoreLabel: "Lenovo India",
    },
    table: {
      leftName: "Instant discount",
      rightName: "EMI / cashback",
      rows: [
        { factor: "When it applies", left: "Tata CLiQ's Amex T&C (checked 25 Nov 2026): 12.5% instant on full swipe, min ₹3,000, max ₹1,500, once per card, code AMEXTCFBFS, 19–30 Nov 2026.", right: "Lenovo India's offer T&C (checked 25 Nov 2026): post-payment cashback, not an instant checkout reduction, not valid on EMI." },
        { factor: "Payment-mode exclusions", left: "Amex CLiQ excludes debit, EMI, net banking and COD; Amazon's HDFC terms exclude net banking, debit non-EMI, COD and Amazon Pay balance part-payment.", right: "Lenovo allows credit-card cashback OR UPI cashback, not both; cashback is not valid on EMI transactions." },
        { factor: "Per-card limits", left: "SBI Card's festive offer capped total savings at ₹48,000 per card with refreshes on 29/30/31 Oct and 1/6 Nov 2026; Amazon's HDFC offer capped ₹22,000 per card with a daily base refresh.", right: "Lenovo limits the offer to one transaction per card and three units, with cashback posted within 30 days of delivery (examples in the same T&C say 20 days)." },
        { factor: "Reward points", left: "SBI Card forfeits reward points on eligible non-EMI transactions; Amazon's HDFC terms reverse reward points within 120 days (official terms, checked 25 Nov 2026).", right: "Check the card's own reward rules before counting points on top of a discount." },
        { factor: "What does not stack", left: "Opened T&Cs bar bank + another promotion (Amex CLiQ, HDFC Amazon), and two bank offers on one order.", right: "Lenovo cashback is not valid on EMI; Lenovo also excludes employee, ambassador, O2O, Pro and refurbished purchases." },
        { factor: "Best practice", left: "Flipkart's SBI Debit T&C says to enter card details and check the discount on the Payment page.", right: "Compare the payment-page amount and total outflow before confirming." },
      ],
    },
    insider: {
      title: "What the opened terms actually say",
      points: [
        "Lenovo calls its 2026 benefit cashback: you pay the full website price and the cashback is posted to your bank account later. The T&C explicitly says it is not valid on EMI. The offer page, product badges and worked examples disagree on the cashback amount (e.g., a ₹6,500 band versus a 'FLAT 10K' badge) and on timing (20 versus 30 days) — sources disagree; verify on the offer page at checkout.",
        "Tata CLiQ's press release names Amex, Axis and Kotak at 12.5% for its 19–30 Nov 2026 Black Friday sale, but only the Amex T&C was readable. It gives the full string: min ₹3,000, max ₹1,500, once per card, code AMEXTCFBFS. Axis and Kotak caps and minimums are not stated — check the store.",
        "Do not treat a displayed percentage as locked. Opened terms reserve the right to modify or withdraw offers without notice and describe them as best effort. Per-card caps, daily or periodic refreshes and payment-mode exclusions are documented; a shared campaign quota exhausting at OTP is not documented in any source we opened.",
      ],
    },
    blocks: [
      {
        heading: "Instant is not always instant",
        paragraphs: [
          "From the terms opened on 25 Nov 2026, Tata CLiQ's Amex Black Friday benefit is a real checkout instant discount with a stated minimum, cap and code. Lenovo India's 2026 benefit is post-payment cashback: you pay the full price first and the cashback arrives after delivery, and it is not valid on EMI. These are different products with different cash-flow effects.",
          "The HDFC Amazon EasyEMI listing ('up to ₹4,000', all HDFC credit cards except co-branded, valid to 30 Nov 2026) did not state a minimum spend or tenure on the listing; the detail page was not readable. Verify those terms on the offer page rather than assuming a cap or percentage.",
        ],
      },
      {
        heading: "Why the payment screen is the source of truth",
        paragraphs: [
          "Flipkart's SBI Debit offer T&C says the discount displayed on the product page applies only to select cards and instructs shoppers to enter card details on the Payment page to see whether it applies. Amazon's HDFC terms exclude net banking, debit non-EMI, COD and Amazon Pay balance part-payment; SBI's terms forfeit reward points on eligible non-EMI transactions.",
          "Per-card caps matter too: SBI's festive offer capped total savings at ₹48,000 per card across refresh dates, and Amazon's HDFC offer capped ₹22,000 per card with a daily base refresh. Recheck the final amount rather than carrying a discount forward from the product page.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "amazon-in", storeName: "Amazon", bullets: ["HDFC terms exclude net banking, debit non-EMI, COD and wallet part-payment; ₹22,000 per-card cap on the GIF offer.", "Check the discount line on the payment page before confirming."], cta: false },
      { storeSlug: "lenovo-india", storeName: "Lenovo India", bullets: ["2026 benefit is post-payment cashback, not an instant checkout discount, and is not valid on EMI.", "Offer terms checked 25 Nov 2026 list 24 Nov–2 Dec 2026, one transaction per card and cashback within 30 days of delivery."], cta: false },
      { storeSlug: "tatacliq-com-ecommerce-cps-india", storeName: "Tata CLiQ", bullets: ["Black Friday 19–30 Nov 2026; Amex full-swipe 12.5%, min ₹3,000, max ₹1,500, once per card, code AMEXTCFBFS.", "Axis and Kotak are named in the press release, but their caps and minimums are not stated — check the store."], cta: false },
    ],
    faqs: [
      { question: "Is an advertised bank discount always instant?", answer: "No. Lenovo India's 2026 offer is post-payment cashback with the full price paid first, and it is not valid on EMI (offer T&C checked 25 Nov 2026). Check whether the benefit is instant, cashback or EMI-only in the terms.", sort_order: 0 },
      { question: "Why is my discount missing when I choose EMI?", answer: "Opened terms exclude EMI for Lenovo cashback and for the Amex Tata CLiQ full-swipe offer. Some ICICI EMI codes exist (TCFICICIEMI, TCLICICIEMI), but the merchant and exclusions were not captured in readable text — verify in the live code box at checkout.", sort_order: 1 },
      { question: "Do bank discounts affect reward points?", answer: "SBI Card's terms forfeit reward points on eligible non-EMI transactions; Amazon's HDFC terms reverse reward points within 120 days (checked 25 Nov 2026). Check your card's reward rules before counting points on top of a discount.", sort_order: 2 },
      { question: "Can I stack a bank offer with a coupon or exchange?", answer: "Opened T&Cs bar bank + another promotion at Amex CLiQ and HDFC Amazon, and two bank offers on one order. Amazon's HDFC terms allow exchange only if the card-paid amount after exchange still meets the minimum. Verify on the payment screen.", sort_order: 3 },
    ],
    relatedComparisons: [
      "black-friday-2026-india-best-deals-vs-regular-sale",
      "mrp-vs-recent-price-india-sale-baseline",
      "best-laptop-deals-india-amazon-vs-flipkart-2026",
    ],
    relatedGuides: [
      { href: "/guides/best-credit-card-online-shopping-india-2026", label: "Best online-shopping card guide" },
    ],
    relatedReviewsStores: [
      { href: "/bank-offers", label: "Bank & card offers hub" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
      { href: "/stores/lenovo", label: "Lenovo store hub" },
      { href: "/stores/tatacliq-com-ecommerce-cps-india", label: "Tata CLiQ store hub" },
    ],
    keywords: ["instant discount vs No Cost EMI India", "bank offer cashback after delivery", "credit card EMI hidden charges", "per card offer cap India"],
  },
  {
    slug: "boat-vs-boult-vs-oneplus-tws-under-2000-india",
    category: "Electronics & Laptops",
    title: "boAt vs. Boult vs. OnePlus TWS Under ₹2,000 in India (2026): Call Mics, ANC & Battery",
    seoTitle: "boAt vs Boult vs OnePlus Earbuds Under ₹2000 India 2026: Specs Compared | Durza",
    metaDescription:
      "Compare Boult Z40 Pro, boAt Airdopes 141 ANC and OnePlus Nord Buds 2r under ₹2,000 on mic count, ANC claims, battery, IP rating, latency and price — with all figures labelled as manufacturer or listing data.",
    heroImage: "public/guides/boat-vs-boult-vs-oneplus-tws-under-2000-india.webp",
    summary:
      "Under ₹2,000, a “32dB ANC” sticker will not make your voice clearer on a noisy auto or metro. Call microphones and ENC do that. Here are three specific models compared on published specs, with every decibel and battery figure clearly labelled as a manufacturer claim.",
    updatedLabel: "Updated 24/11/2026",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-24T00:00:00.000Z",
    audience: {
      bestFor: [
        "Commuters and remote workers under ₹2,000 who care more about clear voice pickup than heavy bass.",
        "Students comparing battery endurance, low-latency modes and a one-year brand warranty.",
      ],
      skipIf: [
        "Buyers expecting true engine or flight-noise cancellation — sub-₹2,000 ANC mostly dulls steady fan and AC hum.",
        "Competitive FPS players: even 45–94 ms “gaming modes” still trail wired earphones.",
      ],
    },
    sources: [
      { label: "Boult official — Z40 Pro", href: "https://goboult.co.in/products/goboult-z40-pro", checkedAt: "25 Nov 2026" },
      { label: "Cashify — Boult Z40 Pro vs W50 vs AirBass W50", href: "https://www.cashify.in/compare-earbuds/boult-audio-z40-pro-vs-boult-audio-w40-vs-boult-audio-airbass-w50", checkedAt: "25 Nov 2026" },
      { label: "Cashify — Z40 Pro vs Airdopes 141 ANC vs Nord Buds 2r", href: "https://www.cashify.in/compare-earbuds/boult-audio-z40-pro-vs-boat-airdopes-141-anc-vs-oneplus-nord-buds-2r", checkedAt: "25 Nov 2026" },
    ],
    verdict: {
      optionA: "Boult Z40 Pro",
      optionB: "boAt Airdopes 141 ANC / OnePlus Nord Buds 2r",
      text: "Pick the Boult Z40 Pro at ₹1,299 if battery and low latency matter most: its official page lists 100 hours total playback, Zen Quad Mic ENC, Bluetooth 5.3, IPX5 and a 45 ms gaming mode. Pick the boAt Airdopes 141 ANC (₹1,256–₹1,399 across listings) if you want an advertised 32 dB ANC rating and quad mics, accepting 42 hours total. Pick the OnePlus Nord Buds 2r (₹1,649 seen on Smartprix) if IP55 dust protection and a 12.4 mm driver matter more than battery — but check the live price, since it can sit above ₹2,000. All figures are manufacturer or retail-listing claims; we did not test these earbuds.",
      primaryStoreSlug: "boult",
      primaryStoreLabel: "Boult",
      secondaryStoreSlug: "amazon-in",
      secondaryStoreLabel: "Amazon India",
    },
    table: {
      leftName: "Boult Z40 Pro",
      rightName: "boAt Airdopes 141 ANC",
      extraName: "OnePlus Nord Buds 2r",
      rows: [
        { factor: "Price as reviewed*", left: "₹1,299 (goboult.co.in)", right: "₹1,256–₹1,399 (Gadgets Now / Smartprix / Cashify)", extra: "₹1,649 (Smartprix); other listings up to ₹2,299" },
        { factor: "Call mic setup", left: "Zen Quad Mic ENC (official page)", right: "Quad mic (Smartprix)", extra: "Dual mic with AI noise reduction (Smartprix)" },
        { factor: "ANC (manufacturer claim)", left: "Not listed on official page — ENC only; verify exact SKU", right: "32 dB ANC claimed in listings", extra: "25 dB ANC claimed in listings" },
        { factor: "Bluetooth / codecs", left: "5.3 · AAC, SBC", right: "5.3 · codecs not published in sources checked", extra: "5.3 · codecs not published in sources checked" },
        { factor: "Battery (brand/listings)", left: "8 h buds · 100 h with case", right: "6 h buds ANC off · 42 h total; 5 h / 35 h ANC on", extra: "8 h buds · 38 h total ANC off; 5 h / 27 h ANC on" },
        { factor: "Driver", left: "Official page lists 10 mm in specs and 13 mm in feature text — verify SKU", right: "10 mm", extra: "12.4 mm titanium" },
        { factor: "Latency mode", left: "45 ms (official)", right: "50 ms Beast mode (listing)", extra: "94 ms (listing)" },
        { factor: "Water resistance / warranty", left: "IPX5 · 1 year", right: "IPX5 · 1 year", extra: "IP55 (dust + splash) · 1 year" },
      ],
    },
    insider: {
      title: "Out-of-the-Box Insider Reality (What Other Sites Won't Tell You)",
      points: [
        "ENC and ANC do different jobs. ENC suppresses noise picked up by the microphone so the caller hears you; ANC reduces noise you hear. A bigger dB number on the box says nothing about call clarity.",
        "Every dB figure here is a manufacturer or retail-listing claim, not a measurement. We did not run an acoustic chamber or wind-tunnel test.",
        "Turning ANC on costs battery: the listed OnePlus figures drop from 8 h / 38 h to 5 h / 27 h, and the boAt figures from 6 h / 42 h to 5 h / 35 h.",
        "Check the driver spec on the exact SKU: Boult's own Z40 Pro page lists both 10 mm and 13 mm in different sections.",
        "*Prices are snapshots seen on 24 Nov 2026 and move during sales. Register e-warranty with the GST invoice and test both buds immediately after delivery.",
      ],
    },
    blocks: [
      {
        heading: "1. Call microphones — Winner: Boult and boAt on mic count (4 vs 2)",
        paragraphs: [
          "The Boult Z40 Pro and boAt Airdopes 141 ANC are both listed with four-microphone arrays; the OnePlus Nord Buds 2r is listed with two. More mics can help isolate speech in traffic, but tuning and fit matter as much as the count. We did not test call quality.",
        ],
      },
      {
        heading: "2. ANC claims — Winner: boAt on paper (32 dB claimed)",
        paragraphs: [
          "Listings claim 32 dB ANC for the boAt Airdopes 141 ANC and 25 dB for the OnePlus Nord Buds 2r, while Boult's Z40 Pro page lists ENC but no ANC rating. These are peak laboratory figures at narrow frequencies, not real-world street silence. Expect a modest reduction in steady fan or AC hum, not horn cancellation.",
        ],
      },
      {
        heading: "3. Battery — Winner: Boult Z40 Pro (100 h total claimed)",
        paragraphs: [
          "Boult claims 100 hours total playback for the Z40 Pro and 8 hours on the buds. The boAt is listed at 42 hours total and the OnePlus at 38 hours with ANC off. With ANC on, the published figures fall to 35 hours (boAt) and 27 hours (OnePlus). Judge on bud runtime first — a large case number does not save a mid-day top-up.",
        ],
      },
      {
        heading: "4. Durability — Winner: OnePlus (IP55)",
        paragraphs: [
          "The Nord Buds 2r carry an IP55 rating, covering dust as well as splashes. The Boult and boAt models are IPX5 — splash protection with no dust rating. For gym bags and dusty commutes, that distinction is more useful than a headline dB figure.",
        ],
      },
      {
        heading: "5. Latency and price — Winner: Boult Z40 Pro",
        paragraphs: [
          "Boult lists a 45 ms gaming mode against 50 ms for boAt and 94 ms for OnePlus, and its ₹1,299 official price is the lowest of the three. Even 45 ms is not competitive with wired earphones for competitive play.",
        ],
      },
      {
        heading: "What we verified, and what we did not",
        paragraphs: [
          "A 25 Nov 2026 evidence pass read the official Boult Z40 Pro page and Cashify comparison listings. Smartprix and Gadgets Now URLs returned no extractable SKU data in that pass, so they are not cited here. Sources conflict on the Z40 Pro driver size (13 mm claimed by Boult vs 10 mm listed by Cashify), and on current pricing: ₹1,299 for the Z40 Pro, ₹1,399 for the W50, ₹1,699 for the Airdopes 141 ANC and ₹2,199 for the Nord Buds 2r were the figures available, not confirmed live checkout quotes. We did not purchase, wear or acoustically test any of these earbuds; all dB, battery and latency figures are manufacturer or listing claims.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "boult", storeName: "Boult", bullets: ["Official store for Z40 Pro specs, current price and e-warranty.", "Use the Audio Decision Snippet on the store hub if you are unsure which model fits."] },
      { storeSlug: "amazon-in", storeName: "Amazon India", bullets: ["Compare seller authorization and final price across all three models.", "Check the exact model code — similarly named SKUs differ on ANC."] },
    ],
    faqs: [
      { question: "What is the difference between ANC and ENC?", answer: "ANC reduces sound you hear, such as fan or AC hum. ENC reduces noise picked up by the microphone so callers hear you more clearly. For traffic calls, mic quality and ENC matter more than a dB figure.", sort_order: 0 },
      { question: "Which of these three has the best battery?", answer: "On published figures, the Boult Z40 Pro leads with 8 hours on the buds and 100 hours total. The boAt Airdopes 141 ANC is listed at 6 h / 42 h with ANC off and 5 h / 35 h with ANC on; the OnePlus Nord Buds 2r at 8 h / 38 h and 5 h / 27 h respectively.", sort_order: 1 },
      { question: "Is a 32 dB ANC claim meaningful?", answer: "It is a manufacturer peak figure at narrow frequencies, not a measurement of a noisy Indian street. We did not test it. Expect some reduction in steady hum and little effect on voices or horns.", sort_order: 2 },
      { question: "Which has the best dust and water protection?", answer: "The OnePlus Nord Buds 2r carry IP55, which covers both dust and splashes. The Boult Z40 Pro and boAt Airdopes 141 ANC are listed as IPX5 — splash protection without a dust rating.", sort_order: 3 },
      { question: "Did Durza test these earbuds?", answer: "No. We compared official product pages and published spec listings on 24 Nov 2026. All decibel, battery and latency numbers are manufacturer or listing claims, and prices are dated snapshots.", sort_order: 4 },
    ],
    relatedComparisons: [
      "amazon-vs-flipkart-electronics-2026",
      "best-smartphone-deals-india-amazon-vs-flipkart-2026",
    ],
    relatedGuides: [
      { href: "/guides/boult-audio-earbuds-anc-codes-guide", label: "Boult Audio ANC earbuds and codes guide" },
      { href: "/guides/how-to-save-on-amazon-india", label: "How to save on Amazon India" },
    ],
    relatedReviewsStores: [
      { href: "/topics/tech", label: "Tech & Gadgets topic hub" },
      { href: "/categories/electronics", label: "Electronics category hub" },
      { href: "/coupons/boult-audio-w50-with-30db-active-noise-cancellation", label: "Boult W50 live offer" },
      { href: "/coupons/boult-audio-z40-pro-earbuds", label: "Boult Z40 Pro live offer" },
      { href: "/stores/boult", label: "Boult store hub & Audio Decision Snippet" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
      { href: "/stores/flipkart", label: "Flipkart store hub" },
    ],
    keywords: ["boAt vs Boult vs OnePlus earbuds under 2000 India", "best TWS under 2000 India 2026", "ANC vs ENC calling earbuds", "Boult Z40 Pro vs boAt Airdopes 141 ANC", "OnePlus Nord Buds 2r specs India"],
  },
  {
    slug: "best-laptops-under-50000-india-coding-office-2026",
    category: "Electronics & Laptops",
    title: "Best Laptops Under ₹50,000 in India (2026): Acer Aspire vs Lenovo IdeaPad vs ASUS Vivobook",
    seoTitle: "Best Laptops Under ₹50,000 India 2026: Acer vs Lenovo vs ASUS Compared | Durza",
    metaDescription:
      "Compare the Acer Aspire 3, Lenovo IdeaPad Slim 3 and ASUS Vivobook 15 under ₹50,000 in India on CPU class, RAM upgradeability, display, battery and service — with sourced numbers and honest caveats.",
    heroImage: "/guides/best-laptops-under-50000-india-coding-office-2026.webp",
    summary:
      "Under ₹50,000 the headline spec is rarely the thing that decides whether a laptop feels good in year three. Processor class, a spare RAM slot and a readable display do. Here is how three common 2026 picks compare, using published lab data rather than manufacturer claims.",
    updatedLabel: "Updated 24/11/2026",
    authorName: "Harsh Bansal",
    factsCheckedOn: "2026-11-24T00:00:00.000Z",
    audience: {
      bestFor: [
        "Students and office buyers who need 16GB RAM, a usable keyboard and a clean Windows install under ₹50,000.",
        "Buyers planning to keep the machine 3+ years and wanting a spare RAM or SSD slot rather than a sealed chassis.",
      ],
      skipIf: [
        "Anyone doing CAD, native macOS-only work or sustained 3D rendering — none of these are workstations.",
        "Buyers who need a bright, colour-accurate screen for outdoor or photo work without checking the exact panel first.",
      ],
    },
    sources: [
      { label: "91mobiles — best laptops under ₹50,000 (lab tests)", href: "https://www.91mobiles.com/reviews/best-laptops-under-rs-50000-in-india/", checkedAt: "25 Nov 2026" },
      { label: "BuySmarterIn — October 2026 roundup", href: "https://buysmarter.in/reviews/laptops/best-laptops-under-50000-india-2026", checkedAt: "25 Nov 2026" },
      { label: "Gadgets 360 — best laptops under ₹50,000", href: "https://www.gadgets360.com/laptops/features/best-laptops-under-rs-50000-in-india-lenovo-ideapad-slim-3-acer-aspire-lite-asus-vivobook-go-14-dell-inspiron-15-moto-book-60-9609700", checkedAt: "25 Nov 2026" },
    ],
    verdict: {
      optionA: "Acer Aspire 3 A324-53",
      optionB: "Lenovo IdeaPad Slim 3 / ASUS Vivobook 15",
      text: "Pick the Acer Aspire 3 if you carry the laptop daily and want 16GB RAM with a fast Gen 4 SSD at the lowest reviewed price (₹40,990). Pick the ASUS Vivobook 15 if the screen and keyboard matter more than portability — its 144Hz 300-nit panel is the best display here. Pick the Lenovo IdeaPad Slim 3 if multitasking and upgradeable RAM matter most. If your work is compile-heavy, save longer for a 45W HS-series machine such as the Lenovo ThinkBook 16, whose Ryzen 5 7535HS posted a Cinebench R23 multi-core score of 9,393 in 91mobiles' 2026 testing — well clear of the 15W chips below.",
      primaryStoreSlug: "amazon-in",
      primaryStoreLabel: "Amazon India",
      secondaryStoreSlug: "flipkart",
      secondaryStoreLabel: "Flipkart",
    },
    table: {
      leftName: "Acer Aspire 3 A324-53",
      rightName: "Lenovo IdeaPad Slim 3",
      extraName: "ASUS Vivobook 15",
      rows: [
        { factor: "Processor class", left: "Intel Core i5-1334U (15W efficiency chip)", right: "AMD Ryzen 5 7530U (15W, 6C/12T)", extra: "Intel Core i5-1335U (13th gen, 10-core)" },
        { factor: "RAM & upgrade path", left: "16GB DDR4, expandable to 32GB", right: "16GB DDR4 across 2 DIMM slots", extra: "16GB DDR4 soldered — non-upgradeable" },
        { factor: "Storage", left: "512GB Gen 4 SSD; 7,039 MB/s read in 91mobiles' CrystalDiskMark test", right: "512GB SSD — verify Gen 3 vs Gen 4 on the exact SKU", extra: "512GB SSD — verify Gen 3 vs Gen 4 on the exact SKU" },
        { factor: "Display", left: "14-inch FHD, 45% NTSC — flat colours, poor for creative work", right: "15.6-inch FHD IPS, 250 nits — adequate indoors", extra: "15.6-inch FHD IPS, 144Hz, 300 nits — best panel here" },
        { factor: "Battery (published tests)", left: "45.6Wh, 7h 25m in PCMark 10 video loop; 65W USB-C", right: "45Wh, ~6.5h real-world", extra: "50Wh, ~7.5h real-world" },
        { factor: "Carry weight", left: "Under 1.5kg, 19.4mm — easiest to carry daily", right: "~1.6–1.7kg", extra: "1.7kg with aluminium lid" },
        { factor: "Price as reviewed*", left: "₹40,990 (91mobiles, 6 Sep 2026)", right: "₹43,990 (BuysmarterIn roundup, 8 Oct 2026)", extra: "₹44,990 (BuysmarterIn roundup, 8 Oct 2026)" },
        { factor: "What to verify at checkout", left: "Exact SKU A324-53, RAM slot count and panel part number", right: "Exact Ryzen 5 SKU and free DIMM slot", extra: "Exact processor and RAM — 'Vivobook 15' covers several SKUs" },
      ],
    },
    insider: {
      title: "Out-of-the-Box Insider Reality (What Other Sites Won't Tell You)",
      points: [
        "The series name hides the spec. 'Vivobook 15' in Indian listings spans an 11th-gen i5 with 8GB and a 13th-gen i5 with 16GB and a 144Hz panel. Match the exact model number, not the family name.",
        "15W is not 45W. 91mobiles' tested ₹50,000 winner was the Lenovo ThinkBook 16 with a 45W Ryzen 5 7535HS (Cinebench R23 multi 9,393). The 15W i5-1334U in the Acer is quicker in day-to-day responsiveness but will not keep up on long compiles or large spreadsheets.",
        "Soldered RAM is the expensive mistake. An 8GB soldered base with one free slot is only acceptable if you budget for the second stick immediately; by 2026, 8GB is the thing that makes a laptop feel old in year two.",
        "*Every price above is the price at the time the source reviewed it, not a live quote. Memory costs rose through 2026. Check the live listing before treating any of these numbers as current.",
        "We did not physically test these units. Figures come from published lab tests by 91mobiles (Sep 2026) and Indian buying roundups (Oct 2026), reviewed on 24 Nov 2026. That is a real method, and we are labelling it as such.",
      ],
    },
    blocks: [
      {
        heading: "1. CPU class first, everything else second (Winner: Lenovo ThinkBook 16 for compiling; Acer Aspire 3 for light responsiveness)",
        paragraphs: [
          "A 16GB/512GB configuration can still feel slow if the processor is a low-power U-series part built for battery life. In 91mobiles' September 2026 testing, the HS-series Ryzen 5 7535HS in the Lenovo ThinkBook 16 scored 9,393 in Cinebench R23 multi-core, while the 15W i5-1334U in the Acer Aspire 3 scored 8,061 in Geekbench 6 multi-core and led the group in PCMark 10 day-to-day responsiveness. Neither is \"better\" in the abstract — one sustains heavy work, the other feels quick and cool in ordinary use.",
          "If your day is browser tabs, Zoom, Office and light photo work, the 15W chips are enough. If it is compiling, Python scripts or large Excel models, the extra watts are worth saving for.",
        ],
      },
      {
        heading: "2. The upgrade slot matters more than shipped RAM (Winner: tie — Acer Aspire 3 and Lenovo IdeaPad Slim 3)",
        paragraphs: [
          "The Acer ships 16GB DDR4 and can be taken to 32GB. The Lenovo IdeaPad Slim 3 variant in the October 2026 roundup ships 16GB across two DIMM slots. The ASUS Vivobook 15 configuration at ₹44,990 ships 16GB soldered. A soldered 16GB is fine for a machine you will replace in three years; a spare slot is better for one you want to keep in five.",
        ],
      },
      {
        heading: "3. Display and battery are the daily experience (Winner: ASUS Vivobook 15 — 144Hz, 300 nits, 50Wh)",
        paragraphs: [
          "The Acer's 45% NTSC panel is the weakest part of an otherwise strong value package — flat colours that make creative work frustrating. The ASUS 144Hz, 300-nit IPS panel is the best screen here. The Lenovo's 250-nit panel is adequate indoors and dim in bright rooms.",
          "Published battery tests put the Acer at 7h 25m in a PCMark 10 video loop from a 45.6Wh cell, the ASUS around 7.5 hours real-world from 50Wh, and the Lenovo around 6.5 hours from 45Wh. Treat these as comparable indications, not guarantees — brightness and workload move the result.",
        ],
      },
      {
        heading: "4. Portability and daily carry (Winner: Acer Aspire 3 — under 1.5kg with 65W USB-C)",
        paragraphs: [
          "The Aspire 3 weighs under 1.5kg at 19.4mm and charges over 65W USB-C, so one adapter handles the laptop and phone. The Lenovo is around 1.6–1.7kg and the ASUS 1.7kg. If you carry the laptop across campus or through a metro commute every day, that difference is felt more than a small benchmark gain.",
        ],
      },
      {
        heading: "5. Marketplace bank slabs vs official eStore perks (Winner: Amazon/Flipkart on flat discounts; Lenovo.com on ADP)",
        paragraphs: [
          "On a ₹40,000–₹50,000 laptop, a flat ₹3,000 bank instant discount on Amazon India or Flipkart lowers the payable amount by roughly 6–7.5% — often more than an official-store coupon. Brand-direct checkout can still win on warranty extras: Lenovo.com India has offered student verification and discounted multi-year Accidental Damage Protection. Compare the final payable amount on both carts, including any EMI processing fee, before choosing.",
        ],
      },
      {
        heading: "6. Where each one fits — summary",
        paragraphs: [
          "Acer Aspire 3 A324-53: the student pick. Under 1.5kg, a complete port selection, 65W USB-C charging and the fastest SSD in 91mobiles' group. Accept the display and basic webcam.",
          "Lenovo IdeaPad Slim 3: the multitasking pick. Ryzen multi-thread performance and upgradeable RAM at a reviewed ₹43,990, with a dimmer screen and shorter battery.",
          "ASUS Vivobook 15: the display-and-keyboard pick. 144Hz, 300 nits, a backlit numpad keyboard and an aluminium lid, with soldered RAM as the tradeoff.",
          "Upgrade pick: Lenovo ThinkBook 16 at a reviewed ₹46,990, with dual RAM and dual M.2 slots and a 45W chip — the closest thing to a future-proof machine under ₹50,000.",
        ],
      },
      {
        heading: "What we verified, and what we did not",
        paragraphs: [
          "A 25 Nov 2026 evidence pass re-read 91mobiles' laptop test, BuySmarterIn's October 2026 roundup and Gadgets 360. Sources disagree on the Lenovo IdeaPad Slim 3: Gadgets 360 lists a 15ABR8 with a Ryzen 5 5625U at ₹42,490, while the October 2026 roundup lists a Ryzen 5 7530U variant at ₹43,990. Treat these as different SKUs and verify the exact model code at checkout. Acer 'Aspire Lite' and 'Aspire 3' are also listed with conflicting RAM and storage. We did not purchase or physically test these machines, and we have not checked live prices; the dates refer to when sources were reviewed, not a hands-on test by Durza.",
        ],
      },
    ],
    storeActions: [
      { storeSlug: "amazon-in", storeName: "Amazon India", bullets: ["Compare exact SKUs, seller authorization and current price.", "Keep the GST invoice for warranty claims."] },
      { storeSlug: "flipkart", storeName: "Flipkart", bullets: ["Check the exact processor/RAM variant before buying.", "Inspect under Open-Box Delivery before sharing the OTP."] },
      { storeSlug: "lenovo", storeName: "Lenovo India", bullets: ["Direct eStore for warranty extension and student offers.", "Compare direct price against marketplace bank slabs."] },
    ],
    faqs: [
      { question: "Which is the best laptop under ₹50,000 for coding in India in 2026?", answer: "For browser-based work and light development, the Acer Aspire 3 A324-53 is good value: 16GB expandable RAM, a fast Gen 4 SSD and under 1.5kg. For compiling or heavy Excel, the 45W Lenovo ThinkBook 16 (Ryzen 5 7535HS, reviewed at ₹46,990) is the stronger choice — its sustained multi-core performance is well ahead of the 15W chips.", sort_order: 0 },
      { question: "Is 16GB RAM enough in 2026?", answer: "Yes for most students and office users, provided it is 16GB as shipped. 8GB — especially soldered — is the configuration most likely to feel slow within two years. A spare slot matters more than a slightly faster processor if you plan to keep the laptop 3–5 years.", sort_order: 1 },
      { question: "Are the prices in this article current?", answer: "No. These are prices reported by the sources at review time in September and October 2026. Memory prices moved through 2026, so check the live listing before deciding. Use our Amazon vs Flipkart payment comparison to calculate the final payable amount after bank offers and exchange deductions.", sort_order: 2 },
      { question: "Which has the best display?", answer: "The ASUS Vivobook 15 configuration discussed here — 15.6-inch FHD IPS at 144Hz and 300 nits. The Acer Aspire 3's 45% NTSC panel is the weakest for colour work, and the Lenovo's 250-nit panel is indoor-only in bright rooms.", sort_order: 3 },
      { question: "Did Durza physically test these laptops?", answer: "No. We reviewed published lab testing from 91mobiles (September 2026) and Indian buying roundups from October 2026, and cross-checked configurations against retail listings. We say so explicitly rather than implying hands-on testing we did not do.", sort_order: 4 },
    ],
    relatedComparisons: [
      "best-laptop-deals-india-amazon-vs-flipkart-2026",
      "official-brand-store-vs-amazon-flipkart-laptops-india",
      "amazon-vs-flipkart-electronics-2026",
    ],
    relatedGuides: [
      { href: "/guides/best-acer-laptop-deals-promo-codes", label: "Acer laptop deals and promo codes" },
      { href: "/guides/lenovo-laptop-offers-india-2026", label: "Lenovo India offers guide" },
    ],
    relatedReviewsStores: [
      { href: "/categories/electronics", label: "Electronics category hub" },
      { href: "/topics/tech", label: "Tech & Gadgets topic hub" },
      { href: "/bank-offers", label: "Bank & card instant discounts" },
      { href: "/reviews/lenovo-loq-and-thinkpad-india-official-store-review", label: "Buying direct from Lenovo India" },
      { href: "/stores/amazon-in", label: "Amazon India store hub" },
      { href: "/stores/flipkart", label: "Flipkart store hub" },
      { href: "/stores/acer", label: "Acer official store hub" },
      { href: "/stores/lenovo", label: "Lenovo India store hub" },
      { href: "/stores/asus", label: "ASUS store hub" },
    ],
    keywords: ["best laptop under 50000 India 2026", "Acer Aspire 3 vs Lenovo IdeaPad vs ASUS Vivobook", "laptop for coding under 50000 India", "best laptop for students India 2026", "i5 1334U vs Ryzen 5 7530U", "16GB RAM laptop under 50000"],
  },
];

export function getComparisonBySlug(slug: string): CompareEntry | undefined {
  return COMPARISONS.find((item) => item.slug === slug);
}

export function comparisonToEditorial(item: CompareEntry): EditorialContent {
  const now = "2026-11-18T00:00:00.000Z";
  return {
    id: `static-compare-${item.slug}`,
    content_type: "comparison",
    status: "published",
    title: item.title,
    slug: item.slug,
    summary: item.summary,
    content_blocks: item.blocks.map((b, i) => ({ type: "heading", heading: b.heading, _idx: i })),
    structured_data: {
      features: item.table.rows.map((r) => ({
        name: r.factor,
        left: r.left,
        right: r.right,
        ...(r.extra ? { extra: r.extra } : {}),
      })),
      left_name: item.table.leftName,
      right_name: item.table.rightName,
      ...(item.table.extraName ? { extra_name: item.table.extraName } : {}),
      verdict: item.verdict.text,
      category: item.category,
    },
    hero_image_url: item.heroImage,
    author_name: item.authorName ?? "Durza Research Desk",
    market: "IN",
    seo_title: item.seoTitle,
    meta_description: item.metaDescription,
    canonical_url: `/compare/${item.slug}`,
    is_indexable: true,
    is_featured: true,
    published_at: now,
    created_at: now,
    updated_at: now,
    relations: [],
    entity_links: [],
    faqs: item.faqs,
    adsense_eligible: false,
  };
}

