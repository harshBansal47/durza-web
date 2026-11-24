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
};
