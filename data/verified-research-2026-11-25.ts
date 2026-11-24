/**
 * Reusable, checkable facts extracted from the 25 Nov 2026 research packet.
 *
 * Every entry links to a URL that was opened on that date. Figures are listing
 * displays or official text, never live quotes. No first-hand testing is
 * implied. Use these facts across guides, store pages, topic hubs and the
 * methodology page so the same verified evidence is not rewritten differently
 * in different places.
 */
export const RESEARCH_CHECK_DATE = "25 Nov 2026";

export type VerifiedResearchKind = keyof typeof VERIFIED_RESEARCH;

export interface VerifiedListing {
  model: string;
  name: string;
  price: string;
  mrp: string;
  seller: string;
  source: string;
  note?: string;
}

/** Exact-code listings opened on 25 Nov 2026. Prices are displays, not live quotes. */
export const VERIFIED_LISTINGS: Record<string, VerifiedListing[]> = {
  asus: [
    { model: "FA401EA-RG020WS", name: "TUF A14 (32GB/1TB, Jaeger Gray)", price: "₹2,49,990", mrp: "₹3,23,990", seller: "AYR Technologies (ASUS eStore)", source: "https://in.store.asus.com/asus-tuf-gaming-a14-fa401ea-rg020ws-copilot-pc-gaming-laptop.html", note: "₹3,000 HDFC 'Nov26' display shown separately; card family and minimum not stated." },
    { model: "FA401EA-RG020WS", name: "Same MTM at Flipkart", price: "₹2,54,000", mrp: "ref ₹2,59,990", seller: "GamingIcons", source: "https://www.flipkart.com/asus-tuf-gaming-a14-2026-office-2024-m365-basic-ai-pc-npu-upto-50tops-amd-ryzen-max-32-gb-1-tb-ssd-windows-11-home-amd-radeon-8060s-165-hz-fa401ea-rg020ws-laptop/p/itm456a598c5ceae", note: "Reference is not labelled MRP; warranty and returns differ by seller." },
    { model: "FA608PP-QT014WS", name: "TUF A16 (R9/16GB/1TB/RTX 5070)", price: "₹2,34,990", mrp: "₹3,05,990", seller: "ASUS estore (reseller)", source: "https://www.asus.com/in/deals/" },
    { model: "X1504VAP-IN009WS", name: "Vivobook 15 (i5-120U/16GB/512GB)", price: "₹79,990", mrp: "₹1,59,990", seller: "ASUS estore (reseller)", source: "https://www.asus.com/in/content/offer/" },
  ],
  acer: [
    { model: "UN.37RSI.003", name: "Aspire 5 A514-55 (U5 226V/16GB/512GB)", price: "₹84,999", mrp: "₹1,29,999", seller: "Acer India (in stock)", source: "https://store.acer.com/en-in/laptops", note: "MRP includes taxes; only one offer applies per the store page." },
    { model: "UN.U7PSI.008", name: "Nitro 5 AN516-74G1 (i7/16GB/1TB/RTX 5050)", price: "₹1,64,990", mrp: "₹2,83,990", seller: "Acer India (in stock)", source: "https://store.acer.com/en-in/laptops" },
    { model: "UN.38BSI.007", name: "Aspire 15 AS15-39 (R3/8GB/512GB)", price: "₹39,999", mrp: "₹89,999", seller: "Acer India (coming soon)", source: "https://store.acer.com/en-in/laptops", note: "Not buyable at check time." },
  ],
  lenovo: [
    { model: "83DV01KYIN", name: "LOQ 15IRX9 (i5-13450HX/16GB/1TB/RTX 4050)", price: "₹1,58,491", mrp: "₹2,49,591", seller: "Lenovo India", source: "https://www.lenovo.com/in/en/p/laptops/loq-laptops/lenovo-loq-15irx9/len101q0005", note: "Includes displayed savings and AFTERHOURSDEAL eCoupon; cashback is post-payment." },
    { model: "83DV01K8IN", name: "LOQ 15IRX9 (i7-13650HX/16GB/512GB/RTX 4050)", price: "₹1,86,991", mrp: "₹2,80,691", seller: "Lenovo India", source: "https://www.lenovo.com/in/en/p/laptops/loq-laptops/lenovo-loq-15irx9/len101q0005" },
    { model: "83DV01LRIN", name: "LOQ 15IRX9 (i7-14650HX/16GB/512GB TLC/RTX 4050)", price: "₹1,96,990", mrp: "₹3,04,090", seller: "Lenovo India", source: "https://www.lenovo.com/in/en/p/laptops/loq-laptops/lenovo-loq-15irx9/len101q0005" },
    { model: "83DV01K7IN", name: "LOQ 15IRX9 (i5/16GB/512GB/RTX 4050)", price: "₹1,61,990", mrp: "₹2,22,490", seller: "Lenovo India (not available)", source: "https://www.lenovo.com/in/en/p/laptops/loq-laptops/lenovo-loq-15irx9/83dv01k7in", note: "Marked 'currently not available' at check time." },
  ],
  boult: [
    { model: "Anchor", name: "Over-ear, ANC-marketed", price: "₹2,499", mrp: "₹9,999", seller: "Exotic Mile Pvt Ltd", source: "https://goboult.co.in/products/probass-anchor-over-ear-bluetooth-headphone-with-mic", note: "Spec block says ENC — verify on the store." },
    { model: "Fluid X", name: "On-ear, ENC", price: "₹1,799", mrp: "₹5,999", seller: "Exotic Mile Pvt Ltd", source: "https://goboult.co.in/products/fluid-x", note: "ENC mic, not ANC." },
  ],
};

export interface ResearchFact {
  label: string;
  detail: string;
  href?: string;
}

export interface ResearchSet {
  kicker: string;
  title: string;
  facts: ResearchFact[];
  note: string;
}

export const VERIFIED_RESEARCH: Record<string, ResearchSet> = {
  general: {
    kicker: "Evidence standard",
    title: "How we read a sale price",
    facts: [
      {
        label: "MRP is a ceiling, not a baseline",
        detail: "Rule 2(m) of the Legal Metrology (Packaged Commodities) Rules, 2011 defines it as the maximum price inclusive of all taxes; rule 18(2) prohibits selling above it.",
        href: "https://www.legalmetrologymh.in/public/temp/368/919d4d8be0fbda825b0d10da72f6e1e7.pdf",
      },
      {
        label: "Match the full model code",
        detail: "A series name is not a SKU. Lenovo LOQ 15IRX9 contains distinct MTMs such as 83DV01KYIN and 83DV01K7IN with different specs and availability.",
        href: "https://www.lenovo.com/in/en/p/laptops/loq-laptops/lenovo-loq-15irx9/len101q0005",
      },
      {
        label: "Bank slabs carry conditions",
        detail: "Opened 2026 terms state card family, cap, minimum spend and excluded payment modes, and allow withdrawal without notice. A product-page discount is not a guarantee.",
        href: "https://www.tatacliq.com/terms/amx-bfs-tnc",
      },
      {
        label: "Checkout additions are enforceable",
        detail: "A Rajya Sabha reply dated 4 Aug 2026 records CCPA penalties of ₹2,00,000 on FirstCry and ₹7,00,000 on Zepto for charges added at checkout.",
        href: "https://sansad.in/getFile/annex/271/AU1798_Gxsxwg.pdf?source=pqars",
      },
    ],
    note: "Research-based, not independently tested. Durza did not buy, consume or wear any product.",
  },
  store: {
    kicker: "Reading store pages",
    title: "Before you trust a discount",
    facts: [
      {
        label: "MRP is not the usual price",
        detail: "It is a tax-inclusive legal ceiling. Compare the final payable against a dated price for the identical model code.",
        href: "https://www.legalmetrologymh.in/public/temp/368/919d4d8be0fbda825b0d10da72f6e1e7.pdf",
      },
      {
        label: "Strike-through has a rule",
        detail: "A reduced MRP may be shown only while the original remains visible and legible (rule 6(3) proviso, checked 25 Nov 2026).",
        href: "https://consumeraffairs.gov.in/public/upload/admin/cmsfiles/whatsnews/Frequently_Asked_Questions_on_Legal_Metrology_whatsnews.pdf",
      },
      {
        label: "The payment screen decides",
        detail: "Flipkart's SBI T&C says the product-page discount applies to select cards and instructs shoppers to check the amount on the Payment page.",
        href: "https://www.flipkart.com/pages/bobcarda-tnc",
      },
      {
        label: "Listings are dated snapshots",
        detail: "On 25 Nov 2026 the same ASUS FA401EA-RG020WS showed a ₹3,23,990 MRP at ASUS eStore and a ₹2,59,990 reference at Flipkart — verify on the exact SKU.",
        href: "https://in.store.asus.com/asus-tuf-gaming-a14-fa401ea-rg020ws-copilot-pc-gaming-laptop.html",
      },
    ],
    note: "Every figure above is a published listing or official document checked 25 Nov 2026, not a live quote. Durza did not test the products.",
  },
  lenovo: {
    kicker: "Lenovo India · checked 25 Nov 2026",
    title: "Verified Lenovo facts",
    facts: [
      {
        label: "Offer window: 24 Nov–2 Dec 2026",
        detail: "Lenovo India's official offer terms list this window. The Black Friday landing page itself carries no dates.",
        href: "https://www.lenovo.com/in/en/lenovo-offer-details/",
      },
      {
        label: "The benefit is post-payment cashback",
        detail: "You pay the full website price; cashback is posted to the bank account after delivery and is not valid on EMI transactions.",
        href: "https://www.lenovo.com/in/en/lenovo-offer-details/",
      },
      {
        label: "83DV01KYIN: ₹1,58,491",
        detail: "Lenovo India listing checked 25 Nov 2026: MRP ₹2,49,591, seller Lenovo India, inclusive of shipping and taxes. The LOQ 15IRX9 name is a series, not a SKU.",
        href: "https://www.lenovo.com/in/en/p/laptops/loq-laptops/lenovo-loq-15irx9/len101q0005",
      },
      {
        label: "Sources disagree on cashback",
        detail: "A product badge says 'FLAT 10K', the offer table band for that price is ₹6,500, and the timing is given as both 20 and 30 days — verify on the offer page.",
        href: "https://www.lenovo.com/in/en/lenovo-offer-details/",
      },
    ],
    note: "These are published figures checked 25 Nov 2026, not live quotes. Durza did not buy or test a Lenovo laptop.",
  },
  acer: {
    kicker: "Acer India · checked 25 Nov 2026",
    title: "Verified Acer facts",
    facts: [
      {
        label: "No Black Friday window on opened pages",
        detail: "Acer India's store showed a Sale section with Special Prices against MRP and no campaign dates; the Acer Day page counts down to 2027.",
        href: "https://store.acer.com/en-in/laptops",
      },
      {
        label: "Aspire 5 UN.37RSI.003: ₹84,999",
        detail: "MRP ₹1,29,999 inclusive of taxes, in stock on 25 Nov 2026 (Ultra 5 226V / 16GB / 512GB / 14-inch WUXGA).",
        href: "https://store.acer.com/en-in/laptops",
      },
      {
        label: "Nitro 5 UN.U7PSI.008: ₹1,64,990",
        detail: "MRP ₹2,83,990, in stock on 25 Nov 2026 (i7-14650HX / RTX 5050 / 16GB / 1TB / 16-inch 165Hz).",
        href: "https://store.acer.com/en-in/laptops",
      },
      {
        label: "Only one offer applies",
        detail: "Acer's special-offers page states that only one of the offers is applicable — check before assuming a code and a bank offer stack.",
        href: "https://store.acer.com/en-in/special-offers",
      },
    ],
    note: "Published listings checked 25 Nov 2026, not live quotes. Durza did not configure or test these machines.",
  },
  money: {
    kicker: "Sale & card math · checked 25 Nov 2026",
    title: "What was actually confirmed",
    facts: [
      {
        label: "Flipkart: 21–27 Nov 2026",
        detail: "Flipkart's official Black Friday store page listed this window; Cashify's tracker corroborated it.",
        href: "https://www.flipkart.com/black-friday-sale-store",
      },
      {
        label: "Tata CLiQ: 19–30 Nov 2026",
        detail: "The official press release and American Express offer T&C both list this window.",
        href: "https://www.tatacliq.com/terms/amx-bfs-tnc",
      },
      {
        label: "Amazon India dates not confirmed",
        detail: "Amazon India's page updated 19 Nov 2026 says its Black Friday Sale is returning, with dates to be announced — not yet confirmed on the live site as of 25 Nov 2026.",
        href: "https://www.aboutamazon.in/news/retail/amazon-black-friday-sale-india",
      },
      {
        label: "Amex × Tata CLiQ, full terms",
        detail: "12.5% instant on full swipe, minimum ₹3,000, maximum ₹1,500, once per card, code AMEXTCFBFS. Axis and Kotak are named at 12.5% in the release, but caps and minimums are not stated.",
        href: "https://www.tatacliq.com/terms/amx-bfs-tnc",
      },
      {
        label: "No documented OTP-quota mechanism",
        detail: "Opened terms document per-card caps, refresh cycles and ineligible payment modes — not a shared campaign quota that exhausts at OTP. Do not publish that mechanism as fact.",
        href: "https://www.sbicard.com/en/personal/offer/flipkart-festive-oct26.page",
      },
    ],
    note: "Official pages and offer terms opened 25 Nov 2026. No first-hand checkout was attempted.",
  },
  asus: {
    kicker: "ASUS India · checked 25 Nov 2026",
    title: "Verified ASUS facts",
    facts: [
      {
        label: "November Sale, not Black Friday branding",
        detail: "The opened official offer page shows 'ASUS November Sale' / 'Mega Deals' with dated-price SKUs; no Black Friday branding or calendar window appeared on that page.",
        href: "https://www.asus.com/in/content/offer/",
      },
      {
        label: "TUF A14 FA401EA-RG020WS: ₹2,49,990",
        detail: "ASUS eStore listing checked 25 Nov 2026: MRP ₹3,23,990, full code 90NR0PM1-M001P0, sold by AYR Technologies (authorised reseller), free shipping, inclusive of all taxes.",
        href: "https://in.store.asus.com/asus-tuf-gaming-a14-fa401ea-rg020ws-copilot-pc-gaming-laptop.html",
      },
      {
        label: "Same model code, different reference",
        detail: "Flipkart showed ₹2,54,000 (reference ₹2,59,990) for the identical FA401EA-RG020WS on 25 Nov 2026, sold by GamingIcons — a ₹4,010 difference by our arithmetic, not a live quote.",
        href: "https://www.flipkart.com/asus-tuf-gaming-a14-2026-office-2024-m365-basic-ai-pc-npu-upto-50tops-amd-ryzen-max-32-gb-1-tb-ssd-windows-11-home-amd-radeon-8060s-165-hz-fa401ea-rg020ws-laptop/p/itm456a598c5ceae",
      },
      {
        label: "HDFC display is SKU-level, not a full slab",
        detail: "The eStore showed 'Save ₹3,000 with HDFC Bank Nov26' on RG020WS, but the eligible card family and minimum spend were not stated — verify at checkout.",
        href: "https://in.store.asus.com/asus-tuf-gaming-a14-fa401ea-rg020ws-copilot-pc-gaming-laptop.html",
      },
    ],
    note: "Published listings checked 25 Nov 2026, not live quotes. Durza did not test any ASUS laptop.",
  },
  boult: {
    kicker: "GoBoult · checked 25 Nov 2026",
    title: "Verified Boult facts",
    facts: [
      {
        label: "Anchor: ₹2,499 against ₹9,999 MRP",
        detail: "Brand store listing checked 25 Nov 2026: 75% off MRP, inclusive of taxes, sold by Exotic Mile Pvt Ltd; a separate 'extra offer' shows ₹2,399.",
        href: "https://goboult.co.in/products/probass-anchor-over-ear-bluetooth-headphone-with-mic",
      },
      {
        label: "ANC claim conflicts with spec block",
        detail: "The Anchor page markets ANC with a dedicated switch and 30 hours with ANC, but its specification block says Environmental Noise Cancellation and a FAQ calls it a neckband — verify on the store.",
        href: "https://goboult.co.in/products/probass-anchor-over-ear-bluetooth-headphone-with-mic",
      },
      {
        label: "Fluid X is ENC, not ANC",
        detail: "GoBoult states Fluid X uses a Zen ENC mic with 60H playtime and 40mm drivers (official product page, checked 25 Nov 2026) — do not file it under ANC.",
        href: "https://goboult.co.in/products/fluid-x",
      },
      {
        label: "Countdown without a published window",
        detail: "The site showed a 'BLACK-FR!DAY SALE' countdown (~68 hours at check) and an empty Friday Sale collection; a stale 'HOLI SALE' banner was also present. No calendar dates are published — verify on the store.",
        href: "https://goboult.co.in/collections/friday-sale",
      },
    ],
    note: "Manufacturer claims are labelled as claims, not Durza measurements. Nothing here was physically tested.",
  },
  tatacliq: {
    kicker: "Tata CLiQ · checked 25 Nov 2026",
    title: "Verified Tata CLiQ facts",
    facts: [
      {
        label: "Black Friday sale: 19–30 Nov 2026",
        detail: "The official press release and the American Express offer T&C both list this window for CLiQ Fashion and Luxury.",
        href: "https://www.businesswireindia.com/tata-cliq-luxury-and-tata-cliq-fashion's-black-friday-sale-promises-an-exciting-start-to-the-holiday-shopping-season-102737.html",
      },
      {
        label: "Amex slab, full string",
        detail: "12.5% instant on American Express credit cards (full swipe), minimum ₹3,000, maximum ₹1,500, once per card, code AMEXTCFBFS. Axis and Kotak are named at 12.5% in the release, but their caps and minimums are not stated.",
        href: "https://www.tatacliq.com/terms/amx-bfs-tnc",
      },
      {
        label: "'50%–85% off' applies to selected styles",
        detail: "The press release names brand-level conditions (e.g., Only/Rareism minimum 30%, Metro & Mochi minimum 30%, Decathlon up to 70%). Never publish the headline figure without that condition.",
        href: "https://www.businesswireindia.com/tata-cliq-luxury-and-tata-cliq-fashion's-black-friday-sale-promises-an-exciting-start-to-the-holiday-shopping-season-102737.html",
      },
      {
        label: "SKU prices were not readable",
        detail: "The campaign page and Luxury HDFC T&C returned shells only on 25 Nov 2026; no Tata CLiQ exact-SKU price is verified — verify on the store.",
        href: "https://www.tatacliq.com/black-friday-sale?cms=cft",
      },
    ],
    note: "Official release and offer terms opened 25 Nov 2026. No first-hand purchase was attempted.",
  },
  "sale-calendar": {
    kicker: "Sale calendar · checked 25 Nov 2026",
    title: "Confirmed dates vs expectations",
    facts: [
      {
        label: "Myntra EORS: summer 2026 confirmed",
        detail: "Myntra's official blog (28 May 2026) lists the End of Reason Sale for 29 May–14 June 2026 with 50–90% off.",
        href: "https://blog.myntra.com/myntra-end-of-reason-sale-2026-deals-up-to-90-off/",
      },
      {
        label: "Winter EORS is only expected",
        detail: "Bajaj Finance's guide (updated 2 Nov 2026) says winter EORS is expected 5–15 December 2026; Myntra's live page shows no dates — not confirmed on the live site as of 25 Nov 2026.",
        href: "https://www.bajajfinserv.in/myntra-upcoming-sale-and-offers-date",
      },
      {
        label: "Tata CLiQ's 2026 regular-sale calendar",
        detail: "Its official release lists Big CLiQ Sale 14–31 May, Moments that CLiQ 23 Jul–10 Aug, and 10.10 sale 8–18 Oct 2026.",
        href: "https://www.businesswireindia.com/tata-cliq-luxury-and-tata-cliq-fashion's-black-friday-sale-promises-an-exciting-start-to-the-holiday-shopping-season-102737.html",
      },
      {
        label: "Nykaa: Hot Pink confirmed, Pink Friday dates unconfirmed",
        detail: "Nykaa's blog lists Hot Pink Sale 2026 with up to 60% off, a ₹49 pass and an extra 10% HSBC credit-card discount (cap and minimum not stated). Pink Friday dates are not confirmed on any opened official page.",
        href: "https://www.nykaa.com/beauty-blog/nykaa-hot-pink-sale-2026",
      },
      {
        label: "Revealed prices are not payable prices",
        detail: "Nykaa's price-reveal page checked 25 Nov 2026 showed L'Oréal serum at ₹719 current and ₹439 revealed Pink Friday price — a reveal, not a live payable price.",
        href: "https://www.nykaa.com/price-reveal-season-s-hottest-offers-hot-pink-sale-2026/c/108343",
      },
    ],
    note: "Dates are reported only where an official page confirms them. Expected windows are labelled as expectations, never as live sale dates.",
  },
  bank: {
    kicker: "Offer terms · checked 25 Nov 2026",
    title: "What the opened 2026 terms actually say",
    facts: [
      {
        label: "Amex × Tata CLiQ Black Friday: full string",
        detail: "12.5% instant on American Express credit cards (full swipe), minimum ₹3,000, maximum ₹1,500, once per card, code AMEXTCFBFS, 19–30 Nov 2026. Axis and Kotak are named in the release, but their caps and minimums are not stated.",
        href: "https://www.tatacliq.com/terms/amx-bfs-tnc",
      },
      {
        label: "Lenovo's benefit is cashback, not instant",
        detail: "You pay the full website price; cashback is posted after delivery, is not valid on EMI, and is limited to one transaction per card. Opened pages disagree on the amount (₹6,500 band vs 'FLAT 10K' badge) and timing (20 vs 30 days).",
        href: "https://www.lenovo.com/in/en/lenovo-offer-details/",
      },
      {
        label: "Per-card caps and refresh cycles are real",
        detail: "SBI's festive offer capped savings at ₹48,000 per card with refreshes on 29/30/31 Oct and 1/6 Nov 2026; Amazon's HDFC offer capped ₹22,000 per card with a daily base refresh.",
        href: "https://www.sbicard.com/en/personal/offer/flipkart-festive-oct26.page",
      },
      {
        label: "Reward points can be forfeited",
        detail: "SBI Card's T&C forfeits reward points on eligible non-EMI transactions; Amazon's HDFC terms reverse reward points within 120 days (official terms, checked 25 Nov 2026).",
        href: "https://www.amazon.in/promotion/details/popup/AB3VHKV8ABYA2",
      },
      {
        label: "Stacking is usually restricted",
        detail: "Opened terms bar bank + another promotion at Amex CLiQ and HDFC Amazon, two bank offers on one order, bank + EMI where full swipe is required, and excluded modes including UPI, net banking, COD and wallet part-payment.",
        href: "https://www.tatacliq.com/terms/amx-bfs-tnc",
      },
      {
        label: "No documented OTP-quota mechanism",
        detail: "The opened T&Cs document per-card caps, refresh cycles and ineligible payment modes — not a shared campaign quota that exhausts at OTP. Do not publish that mechanism as fact.",
        href: "https://www.flipkart.com/pages/bobcarda-tnc",
      },
    ],
    note: "Official offer terms opened 25 Nov 2026, not live quotes. Durza did not attempt a checkout or claim any discount is guaranteed.",
  },
  "model-codes": {
    kicker: "Model-code discipline · checked 25 Nov 2026",
    title: "A series name is not a SKU",
    facts: [
      {
        label: "Lenovo LOQ 15IRX9 is a series",
        detail: "Distinct MTMs checked 25 Nov 2026 include 83DV01KYIN (i5-13450HX/16GB/1TB/RTX 4050), 83DV01K8IN (i7/16GB/512GB), 83DV01LRIN (i7-14650HX/16GB/512GB TLC) and 83DV01K7IN (unavailable). Never merge them.",
        href: "https://www.lenovo.com/in/en/p/laptops/loq-laptops/lenovo-loq-15irx9/len101q0005",
      },
      {
        label: "ASUS TUF A14 has distinct suffixes",
        detail: "FA401EA-RG020WS is Jaeger Gray with 32GB/1TB and part number 90NR0PM1-M001P0; RG019WS is Moonlight White. Vivobook 15 X1504VAP suffixes also differ in CPU and RAM.",
        href: "https://in.store.asus.com/asus-tuf-gaming-a14-fa401ea-rg020ws-copilot-pc-gaming-laptop.html",
      },
      {
        label: "Acer shares series names across specs",
        detail: "Aspire 15 'AS15-39' appears with Ryzen 3 3200U (UN.38BSI.007) and Ryzen 5 3500U at different prices — the Ref code decides the product.",
        href: "https://store.acer.com/en-in/laptops",
      },
      {
        label: "Same-code cross-store example",
        detail: "FA401EA-RG020WS was ₹2,49,990 at ASUS eStore and ₹2,54,000 at Flipkart on 25 Nov 2026 — a ₹4,010 gap by our arithmetic. Sellers differ (AYR Technologies vs GamingIcons), so warranty and returns differ too.",
        href: "https://www.flipkart.com/asus-tuf-gaming-a14-2026-office-2024-m365-basic-ai-pc-npu-upto-50tops-amd-ryzen-max-32-gb-1-tb-ssd-windows-11-home-amd-radeon-8060s-165-hz-fa401ea-rg020ws-laptop/p/itm456a598c5ceae",
      },
      {
        label: "Audio: ANC and ENC are different claims",
        detail: "GoBoult Fluid X is ENC, not ANC; the Anchor page markets ANC while its spec block says ENC. Match the exact model and the exact claim before comparing.",
        href: "https://goboult.co.in/products/fluid-x",
      },
    ],
    note: "Exact codes and dated listings checked 25 Nov 2026. Durza did not physically test or buy any product.",
  },
};
