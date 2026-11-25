import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "moglix-tools-and-gst-savings-guide",
  url: "https://durza.in/guides/moglix-tools-and-gst-savings-guide",
  title: "Moglix Tools & GST Savings — A B2B Cart Math Guide (2026)",
  description:
    "Input tax credit is not a coupon. Here is how a GST-registered buyer should read a Moglix industrial cart, work the ITC arithmetic and keep the invoice fit for a claim.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official GST portal", "Store-direct listings", "Original worked ITC example", "Codes unverified"],
  audience: {
    bestFor: [
      "GST-registered workshops, contractors and small factories buying tools, electricals, safety gear or MRO supplies for business use.",
      "Buyers who want to compare a discount code against the tax credit that a lower taxable value would reduce.",
    ],
    skipIf: [
      "Individual consumers buying for personal or household use — goods for personal consumption are not an input for a business and ITC is not a cash saving for you.",
      "Anyone expecting a refund of GST into their bank account. ITC normally offsets output tax liability; it is not an automatic cash payout.",
      "Buyers who cannot obtain a tax invoice carrying their own GSTIN — without it, the credit trail breaks.",
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
    question: "Does a Moglix coupon actually save a GST-registered business more than the headline discount?",
    answer:
      "A discount cuts the taxable value, so it also cuts the GST you can claim as input tax credit. On a ₹10,000 taxable cart at an illustrative 18%, a ₹250 code leaves ₹11,505 payable (₹9,750 + ₹1,755) instead of ₹11,800, but ITC falls from ₹1,800 to ₹1,755. The immediate cash benefit is ₹295, of which only ₹250 is the code and ₹45 is lower tax paid. The 18% is an illustration, not a verified rate for any SKU — read the tax invoice. Durza could not verify GSTSAVE, MOGLIX100, TOOLS250 or a 5% UPI offer on Moglix's own pages on 26 Nov 2026.",
    jumpHref: "#scenarios",
    jumpLabel: "See the ITC worked example",
  },
  ctas: [
    {
      href: "/go/moglix?src=guide&sub=guide_moglix-tools-and-gst-savings-guide",
      label: "Check live Moglix prices and checkout offers",
      primary: true,
    },
    {
      href: "https://www.gst.gov.in/help/inputtaxcredit",
      label: "Read the GST portal's Input Tax Credit help",
    },
    {
      href: "https://business.moglix.com/",
      label: "See Moglix Business procurement",
    },
  ],
  methodNote:
    "We read Moglix's own storefront and business site, the Goods and Services Tax portal's Input Tax Credit knowledge pages and indexed Moglix listings on 26 Nov 2026. The ITC arithmetic in this guide is our own worked illustration. We did not place a B2B order, verify any coupon, inspect a live GST invoice or provide tax advice.",
  scenarios: [
    {
      heading: "Worked example: what a ₹250 code does to an 18% cart",
      body: "Illustration only. Cart of ₹10,000 taxable value at an assumed 18%: GST ₹1,800, invoice total ₹11,800, potential ITC ₹1,800. Apply a hypothetical ₹250 discount on taxable value: new taxable ₹9,750, GST ₹1,755, total ₹11,505, potential ITC ₹1,755. Cash outlay falls ₹295; the credit you can later use falls ₹45. Net economic saving after the credit is used is still ₹250 — the tax is a pass-through, not free money. If your supplies are exempt or you make only exempt outward supplies, the credit may not be usable at all.",
      icon: "laptop",
    },
    {
      heading: "Why the tax rate must come from the invoice, not a guide",
      body: "Hand tools, power tools, electrical wire, safety shoes, measuring instruments and installation services can sit on different GST slabs, and the rate on a specific SKU can change. India's rate structure uses multiple slabs (commonly 5%, 12%, 18% and 28%, with some goods at nil rate and some carrying cess). Durza did not verify the rate of any specific Moglix SKU. Open the product's tax invoice or the checkout tax break-up before you build a credit sheet.",
      icon: "cap",
    },
    {
      heading: "When ITC is not available",
      body: "A GST-registered buyer still needs a compliant tax invoice in the name of the registered person, the supplier's GSTIN, payment of the tax to the supplier and use of the goods for business. Goods bought for personal use, or supplies used for exempt outward supplies, are common reversal situations. The GST portal's ITC knowledge pages cover utilisation, blocking and reversal processes; your own accountant must decide your facts.",
      icon: null,
    },
    {
      heading: "Moglix's actual B2B surface",
      body: "The storefront we checked on 26 Nov 2026 organises Industrial Tools, Electricals, Safety Supplies, Power Tools, Construction Materials, Medical Supplies and a separate Moglix Business procurement site. That breadth is the real reason a business buys here; the coupon story is secondary and, in our check, unverified.",
      icon: "gamepad",
    },
  ],
  skuTable: {
    headers: ["Indexed Moglix listing (26 Nov 2026)", "Price shown", "MRP shown", "What to verify before calling it a deal"],
    rows: [
      [
        "Hillgrove 5 Pcs 1.5Ah 12V Cordless Power Drill Driver Kit, HGCM1379M1",
        "₹1,479",
        "₹4,052 (63% off shown)",
        "Confirm the exact model code, GST rate on the tax invoice and whether the seller is Moglix or a marketplace seller.",
      ],
      [
        "Hillgrove 1200W 26mm Rotary Hammer Drill with 5 Bits, HG0082",
        "₹2,599",
        "₹4,999 (48% off shown)",
        "Check warranty and whether the bit set is included in the same SKU rather than a bundle variant.",
      ],
      [
        "Jakmister 1000W Heavy Duty Air Blower, W/P-1000W-Y",
        "₹1,299",
        "₹4,600 (71% off shown)",
        "Strike-through MRP is not a historic selling price; compare against a dated same-SKU baseline.",
      ],
      [
        "FAB 1.5 Sqmm Single Core Red FR PVC Copper House Wire, 91 m",
        "₹585",
        "₹2,100 (72% off shown)",
        "Cable is commonly sold by length and grade — match the exact length and IS marking, not just the brand name.",
      ],
      [
        "3M Aura 9320A Plus Particulate Respirator, pack of 10",
        "₹1,069",
        "₹3,600 (70% off shown)",
        "For safety equipment, verify authenticity and certification marks on the pack before using it on a worksite.",
      ],
    ],
  },
  checkoutSteps: [
    "Register your business GSTIN on the account before ordering, and confirm the invoice will carry that GSTIN and your registered trade name.",
    "Open the product page and record the exact model/SKU code and the displayed tax break-up. Do not assume a category-wide GST rate.",
    "Check the bank-offer and coupon panels at checkout. Durza could not verify GSTSAVE, MOGLIX100, TOOLS250 or any prepaid UPI percentage on official pages on 26 Nov 2026 — treat older Durza copy about those codes as unverified, not as live terms.",
    "Recompute: taxable value after discount, GST on that value, final payable, and the ITC you expect to claim. A discount lowers both the cash outlay and the credit.",
    "Download the tax invoice immediately after delivery and reconcile it with GSTR-2B before claiming ITC in your return. If the supplier has not filed or the invoice is missing, the credit can be blocked.",
  ],
  checkoutNote:
    "Prices in the table are dated storefront snapshots from 26 Nov 2026 and can change without notice. Coupon codes, bank offers and UPI prepaid terms quoted in older Durza copy were not verified on this recheck; the checkout panel is the only source of truth.",
  verifiedFacts: {
    kicker: "GST & Moglix · checked 26 Nov 2026",
    title: "What an official source actually supports",
    facts: [
      {
        label: "ITC processes are documented by the GST portal.",
        detail:
          "The Goods and Services Tax portal maintains a dedicated Input Tax Credit knowledge section covering utilisation of the electronic credit ledger, ITC-01 to ITC-04 forms, blocking and reversal. Durza used it as the official process reference, not as a promise that any particular purchase qualifies.",
        href: "https://www.gst.gov.in/help/inputtaxcredit",
      },
      {
        label: "Moglix has a distinct B2B procurement arm.",
        detail:
          "The storefront links to Moglix Business, an AI-powered procurement site. That is the relevant surface for business purchasing; the consumer storefront is where the indexed tool prices in this guide were read.",
        href: "https://business.moglix.com/",
      },
      {
        label: "Tool prices on the storefront are visible without login.",
        detail:
          "The indexed Hillgrove, Jakmister, FAB and 3M listings carried visible prices on 26 Nov 2026. These are listing prices, not final payable amounts, and the tax component was not shown on the listing.",
        href: "https://www.moglix.com/",
      },
      {
        label: "The old coupon claims did not survive this check.",
        detail:
          "Earlier Durza copy described GSTSAVE as an ITC refund-sheet tool, MOGLIX100 as ₹100 off above ₹1,499, TOOLS250 as ₹250 off above ₹3,499 and a 5% UPI prepaid stack. None of those terms was readable on Moglix's own pages on 26 Nov 2026, so this guide does not repeat them as facts.",
        href: null,
      },
      {
        label: "ITC is a credit against output tax, not a cash refund.",
        detail:
          "The GST portal's material on utilising the electronic credit ledger describes ITC being used to discharge return-related liabilities. Whether any refund arises depends on separate refund provisions and your filing position — Durza makes no claim about eligibility.",
        href: "https://www.gst.gov.in/help/inputtaxcredit",
      },
    ],
    note: "We did not create an account, place a test order, obtain a GST invoice or verify a coupon. The worked arithmetic is ours and uses an assumed rate purely to show the mechanism.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "On 26 Nov 2026 we checked the official GST portal's Input Tax Credit help section, Moglix's storefront and its business procurement site, and indexed product listings. The ITC worked example is original Durza arithmetic with an explicitly assumed tax rate; it is not tax advice and not a quote. No coupon, bank offer or prepaid discount was verified from an official Moglix page on this date, and no GST invoice was examined. GST-registered buyers should confirm rates, invoicing and credit eligibility with their own tax adviser. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "The 18% rate in the worked example is illustrative. The rate for a specific SKU must be read from the invoice or checkout tax break-up.",
    "A lower taxable value means lower GST paid and therefore lower ITC — that is why a coupon is not 'free extra savings' on top of the credit.",
    "ITC generally requires a compliant tax invoice in the registered person's name, a supplier who has paid the tax and business use of the goods.",
    "Personal purchases, exempt supplies and missing supplier filings are common reasons a credit is denied or reversed.",
    "Strike-through MRP on a marketplace listing is a reference price, not evidence that the item previously sold at that amount.",
    "This guide does not verify or guarantee that any coupon code will work at your checkout.",
  ],
  exploreLinks: [
    { href: "/stores/moglix", label: "Moglix store hub" },
    { href: "/guides/how-to-stack-healthkart-discounts", label: "How Durza checks discount stacking" },
    { href: "/guides/how-durza-verifies-offers-methodology-2026", label: "Durza offer verification methodology" },
    { href: "/methodology", label: "Research method" },
  ],
  faqs: [
    {
      question: "Is GSTSAVE a real Moglix coupon that gives an ITC refund?",
      answer:
        "We could not verify it. Earlier Durza copy described GSTSAVE as a tool that reconciles an ITC sheet, but no such term was readable on Moglix's official pages on 26 Nov 2026. A coupon cannot create a tax credit by itself — the credit comes from the GST charged on a valid tax invoice.",
    },
    {
      question: "Do MOGLIX100 and TOOLS250 still work?",
      answer:
        "Unverified on this recheck. The older copy quoted ₹100 off above ₹1,499 and ₹250 off above ₹3,499, with conflicting thresholds in the same entry. Do not plan a purchase around either code; read the checkout panel.",
    },
    {
      question: "Does GST get refunded to my bank account after a Moglix B2B purchase?",
      answer:
        "Not ordinarily. Input tax credit is adjusted against output tax liability through your GST return. Refunds are a separate legal route with their own conditions. Durza does not assess your eligibility — ask a GST practitioner or chartered accountant.",
    },
    {
      question: "How do I compare a discount against the tax credit I lose?",
      answer:
        "Use the worked example: discount the taxable value, recompute GST at the rate printed on the invoice, then compare final payable and the resulting ITC. In our ₹10,000 illustration a ₹250 code lowered cash outlay by ₹295 including ₹45 less GST, but the usable credit also fell by ₹45.",
    },
    {
      question: "Can I claim ITC if the invoice is in my personal name but I use the tool for work?",
      answer:
        "Generally no — a business ITC claim needs a tax invoice in the name of the registered person with the correct GSTIN. Have the business account and GSTIN set up before ordering, and check the downloaded invoice.",
    },
    {
      question: "Did Durza buy anything or test the cart?",
      answer:
        "No. We checked public pages on 26 Nov 2026, did not place an order and did not obtain a GST invoice. All prices are dated snapshots and all arithmetic is our own illustration.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Original contribution: a worked GST/ITC example showing how a discount changes both cash payable and credit claimed, plus an explicit ledger of coupon claims that failed verification. Prices and offers are dated snapshots. Durza may earn a commission on tracked links at no extra cost to you. This is buying guidance, not tax advice.",
  sources: [
    {
      label: "GST portal — Input Tax Credit knowledge section",
      href: "https://www.gst.gov.in/help/inputtaxcredit",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "GST portal — home and help topics",
      href: "https://www.gst.gov.in/",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Moglix storefront — indexed listings and categories",
      href: "https://www.moglix.com/",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Moglix Business procurement site",
      href: "https://business.moglix.com/",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Hillgrove 12V drill kit listing (price snapshot)",
      href: "https://www.moglix.com/hillgrove-5-pcs-15ah-12v-portable-cordless-power-drill-machine-kit-hgcm1379m1/mp/msne9j8opgo09d",
      checkedAt: "26 Nov 2026",
    },
  ],
};
