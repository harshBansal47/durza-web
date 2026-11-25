import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "reliance-digital-appliance-laptop-offers-guide",
  url: "https://durza.in/guides/reliance-digital-appliance-laptop-offers-guide",
  title: "Reliance Digital 2026: Bank Discount vs No-Cost EMI — The Actual Cart Math",
  description:
    "Official bank slabs, a worked ₹70,000 laptop example and the no-cost EMI interest-offset rule, with all inputs shown. The PayZapp points claim from the old guide could not be verified.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official bank T&C pages", "EMI math shown", "PayZapp claim unverified", "No checkout simulated"],
  audience: {
    bestFor: [
      "Buyers of laptops and large appliances deciding between an instant bank discount and a six-month no-cost EMI offer.",
      "Shoppers with HDFC, ICICI, SBI or other eligible cards who want to know why the headline percentage and the payable amount differ.",
    ],
    skipIf: [
      "Anyone relying on the old claim of HDFC PayZapp 5X points or 'up to 10% cashback' — we could not verify either on official Reliance Digital pages on 26 Nov 2026.",
      "Buyers who want a specific laptop price quote; none is asserted here, and the ₹70,000 cart is an illustrative input.",
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
    question: "At Reliance Digital, is a bank instant discount better than no-cost EMI?",
    answer:
      "Compare the final payable amount, not the headline. Official pages checked 26 Nov 2026 show a flat 5% HDFC card/credit-card discount, 7.5% (max ₹4,000) on SBI/HDFC/ICICI credit-card EMI, and ICICI terms of up to ₹12,500 with 5% on ICICI card EMI until 30 Nov 2026. On an illustrative ₹70,000 laptop: 5% = ₹3,500, 7.5% capped = ₹4,000, and a six-month no-cost EMI is ₹11,666.67/month totalling ₹70,000 with no upfront discount unless the bank's EMI slab also applies. Official terms say discounts are not applicable on brand-subvented no-cost-EMI transactions and offers cannot always be clubbed — the cart decides.",
    jumpHref: "#scenarios",
    jumpLabel: "See the EMI comparison table",
  },
  ctas: [
    {
      href: "/go/reliance-digital?src=guide&sub=guide_reliance-digital-appliance-laptop-offers-guide",
      label: "Check live Reliance Digital offers",
      primary: true,
    },
    { href: "/stores/reliance-digital", label: "Reliance Digital store hub on Durza" },
    { href: "https://www.reliancedigital.in/c/all-offers", label: "Official all-offers page" },
  ],
  methodNote:
    "We read official Reliance Digital bank-offer, no-cost-EMI and offers pages on 26 Nov 2026. Slabs are dated terms, not a live quote for your card or SKU. The ₹70,000 laptop price is an illustrative input supplied by us; we did not transact, and no PayZapp points or cashback rate was verified.",
  scenarios: [
    {
      heading: "Route A — flat 5% on HDFC card",
      body: "The indexed official all-offers page showed 'Flat 5% Instant Discount with HDFC CC / DC'. On an illustrative ₹70,000 cart: 70,000 × 0.05 = ₹3,500 off, payable ₹66,500 upfront. Check whether your card and SKU are eligible; eligibility is per offer terms, not universal.",
      icon: "laptop",
    },
    {
      heading: "Route B — 7.5% EMI slab capped at ₹4,000",
      body: "The same page showed 7.5% instant discount, maximum ₹4,000, on SBI/HDFC/ICICI credit-card EMI transactions. On ₹70,000: 70,000 × 0.075 = ₹5,250, but the cap reduces it to ₹4,000. Payable is ₹66,000 upfront, or ₹66,000 ÷ 6 = ₹11,000/month if the EMI slab is applied to the discounted amount. Confirm the treatment in the payment summary.",
      icon: "laptop",
    },
    {
      heading: "Route C — ICICI card terms until 30 Nov 2026",
      body: "An official bank T&C page states 'Up to Rs. 12,500 Instant Discount with ICICI Bank Credit Card transactions' and 5% instant discount up to ₹12,500 on ICICI credit-card EMI transactions, valid 1 July–30 Nov 2026, once per card. The slab table was not fully readable in our check, so do not assume a specific rupee amount without reading the page and the cart.",
      icon: "laptop",
    },
    {
      heading: "Route D — no-cost EMI",
      body: "Official terms say Reliance Digital provides the interest amount as an instant discount or deferred cashback so that principal plus interest, minus that benefit, equals the invoice amount. On a ₹70,000 invoice over six months that is ₹70,000 ÷ 6 = ₹11,666.67/month if the interest is fully offset. It is a cash-flow tool, not free money, and official terms state instant discounts are not applicable on brand-subvented no-cost-EMI transactions.",
      icon: "laptop",
    },
  ],
  skuTable: {
    headers: ["Route on a ₹70,000 illustrative cart", "Published rate / term", "Discount", "Payable or monthly"],
    rows: [
      ["Flat HDFC card / credit-card discount", "5% (indexed official all-offers page)", "₹3,500", "₹66,500 upfront"],
      ["SBI/HDFC/ICICI credit-card EMI", "7.5%, max ₹4,000", "₹4,000 (cap binds)", "₹66,000 upfront; ₹11,000/month over 6 if EMI applied"],
      ["ICICI card EMI", "5% up to ₹12,500, offer until 30 Nov 2026", "Not calculable without slab table", "Check the exact slab in the cart"],
      ["Six-month no-cost EMI", "Interest offset by merchant discount/cashback", "₹0 headline discount assumed", "₹11,666.67/month × 6 = ₹70,000"],
      ["PNB card, Nov 2026", "Official T&C: min ₹10,000, 1–30 Nov 2026", "Rate not verified here", "Read the offer T&C and cart"],
    ],
  },
  checkoutSteps: [
    "Fix the exact model code first. A laptop series name is not a SKU; confirm the processor, RAM, storage and warranty printed on the product page and invoice.",
    "Enter the cart with your intended card and read the bank panel. The indexed official offers page lists multiple slabs, but which one applies depends on card, EMI tenure, SKU and date.",
    "Compute the discount yourself: discount = min(cart × rate, cap). On ₹70,000 at 7.5% with a ₹4,000 cap, the cap binds, so the rate beyond that point adds nothing.",
    "Compare against no-cost EMI separately. Ask whether the EMI slab also grants an instant discount; official T&C pages say discounts are not applicable on brand-subvented no-cost-EMI transactions.",
    "Do not assume stacking. An official laptop/tablets T&C page states that existing offers, gifts and discounts above a coupon code cannot be clubbed. Keep whichever single route gives the lower final payable amount.",
    "Keep the printed bill and T&C. Exchange valuation and EMI disputes are settled against the invoice and the applicable offer terms.",
  ],
  checkoutNote:
    "Offer slabs were checked on official Reliance Digital pages on 26 Nov 2026; some T&C pages were too large to fetch in full and were read via indexed official search results. Rates, caps and eligibility change. The cart and the invoice are the source of truth.",
  verifiedFacts: {
    kicker: "Reliance Digital · checked 26 Nov 2026 · checked 26 Nov 2026",
    title: "What the official terms say",
    facts: [
      {
        label: "ICICI offer runs to 30 Nov 2026.",
        detail:
          "An official bank T&C page states up to ₹12,500 instant discount with ICICI credit cards and 5% up to ₹12,500 on ICICI credit-card EMI, valid 1 July–30 Nov 2026, once per card, and not applicable on brand-subvented no-cost-EMI transactions.",
        href: "https://reliancedigital.in/page/bank-offer-tc-2607",
      },
      {
        label: "The all-offers page lists 5% and 7.5% slabs.",
        detail:
          "Indexed official content showed 'Flat 5% Instant Discount with HDFC CC / DC' and '7.5% Instant Discount (Max 4000) with SBI, HDFC and ICICI Credit Cards EMI Txn'. We did not verify which SKUs or cards qualify.",
        href: "https://reliancedigital.in/c/all-offers",
      },
      {
        label: "No-cost EMI works by offsetting interest.",
        detail:
          "Official terms state Reliance Digital provides the interest amount as instant discount or deferred cashback so that principal plus interest minus the benefit equals the invoice value; availability is limited to select products and banks. For Apple products the interest is given as an instant discount.",
        href: "https://reliancedigital.in/page/no-cost-emi-and-additional-cashback-terms-and-conditions",
      },
      {
        label: "A PNB offer ran 1–30 Nov 2026 with a ₹10,000 floor.",
        detail:
          "An official PNB offer T&C page states a minimum purchase of ₹10,000 and an offer period from 1 November to 30 November 2026. The rate and product scope were not fully verified.",
        href: "https://www.reliancedigital.in/page/pnb-offer-tc-2611",
      },
      {
        label: "Offers may not be clubbed.",
        detail:
          "An official laptop/tablets T&C page states that existing offers, gifts and discounts over and above a coupon code cannot be clubbed. Treat the payment summary as the deciding authority.",
        href: "https://www.reliancedigital.in/page/laptop-tablets-offer-tc-2604",
      },
      {
        label: "PayZapp rewards claims are unverified.",
        detail:
          "The earlier Durza entry claimed HDFC PayZapp 5X points and up to 10% cashback on appliance/laptop slabs. We found no official Reliance Digital page confirming those figures on 26 Nov 2026 and do not repeat them as fact.",
        href: "https://reliancedigital.in/c/all-offers",
      },
    ],
    note: "Bank offers are dated and card-specific; several T&C pages exceeded fetch limits and were read through indexed official results. No purchase or EMI application was made.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We reviewed official Reliance Digital bank-offer, no-cost-EMI, all-offers and laptop T&C pages on 26 Nov 2026. Rates, caps and dates are attributed to those pages; the ₹70,000 cart, 5%, 7.5%, ₹4,000 cap and six-month division are our arithmetic on declared inputs, not a price quote or a guaranteed discount. The PayZapp points/cashback claim from the older guide could not be verified and is excluded. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "All examples use an illustrative cart of ₹70,000, a six-month EMI tenure and the official caps as stated on 26 Nov 2026. Change any input and redo the math.",
    "Discount formula: min(cart × rate, cap). At 7.5% and ₹4,000 cap, carts above ₹53,333.33 hit the cap.",
    "No-cost EMI monthly = invoice ÷ months only when the interest is fully offset; the exact treatment appears in the bank and product terms.",
    "Instant discount and cashback are different: an instant discount lowers the payable amount; cashback arrives later and may be reversed if the transaction is cancelled.",
    "An exchange offer's fair value is a separate negotiation and was not verified.",
    "Do not budget a discount the cart does not show. Bank panels rotate by date, card and SKU.",
  ],
  exploreLinks: [
    { href: "/categories/home-kitchen", label: "Home & Kitchen category hub" },
    { href: "/topics/home", label: "Home & Appliances topic hub" },
    { href: "/stores/reliance-digital", label: "Reliance Digital store hub" },
    { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant discount vs No-Cost EMI" },
    { href: "/guides/how-to-match-laptop-model-codes-india", label: "How to match laptop model codes" },
    { href: "/guides/havells-bldc-fan-offers-guide", label: "Havells BLDC buying guide" },
  ],
  faqs: [
    {
      question: "Which card offer wins at Reliance Digital?",
      answer:
        "It depends on the cart and the date. Indexed official terms showed 5% on HDFC cards, 7.5% capped at ₹4,000 on SBI/HDFC/ICICI card EMI, and ICICI terms up to ₹12,500 until 30 Nov 2026. On a ₹70,000 cart the capped 7.5% route gives ₹4,000, more than a flat 5% (₹3,500). Verify eligibility in the cart.",
    },
    {
      question: "Is no-cost EMI really no-cost?",
      answer:
        "Official terms say the interest is provided as an instant discount or deferred cashback so the total paid equals the invoice value. It preserves cash flow but generally does not reduce the total price. Also, official terms say instant discounts do not apply to brand-subvented no-cost-EMI transactions.",
    },
    {
      question: "Do HDFC PayZapp points apply?",
      answer:
        "Not verified. The previous guide's 5X points and up to 10% cashback claim was not found on official Reliance Digital pages on 26 Nov 2026. If your bank app shows a benefit, treat that as the evidence, not an article.",
    },
    {
      question: "Can I combine a bank offer with a coupon code?",
      answer:
        "Do not assume so. An official laptop/tablets T&C page says existing offers, gifts and discounts above a coupon code cannot be clubbed. Compare the final payable amount with and without each route.",
    },
    {
      question: "Why is 7.5% only ₹4,000 on a ₹70,000 laptop?",
      answer:
        "Because the cap binds. 70,000 × 0.075 = ₹5,250, but the published maximum is ₹4,000. Any cart above ₹53,333.33 gets the same ₹4,000 under that slab.",
    },
    {
      question: "Did Durza verify a live checkout?",
      answer:
        "No. We read official T&C content on 26 Nov 2026 and did not transact. The cart is the only source of truth for the final payable amount.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Offer terms are dated and card-specific; some T&C pages were read via indexed official results because of fetch-size limits. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Official bank offer T&C (ICICI, Jul–Nov 2026)",
      href: "https://reliancedigital.in/page/bank-offer-tc-2607",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official all-offers page",
      href: "https://reliancedigital.in/c/all-offers",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official no-cost EMI and cashback T&C",
      href: "https://reliancedigital.in/page/no-cost-emi-and-additional-cashback-terms-and-conditions",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official no-cost EMI T&C for TV and large appliances",
      href: "https://reliancedigital.in/page/ncemi-on-tv-and-la-tc-2608",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official PNB offer T&C (Nov 2026)",
      href: "https://www.reliancedigital.in/page/pnb-offer-tc-2611",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official laptop/tablets offer T&C (no clubbing)",
      href: "https://www.reliancedigital.in/page/laptop-tablets-offer-tc-2604",
      checkedAt: "26 Nov 2026",
    },
  ],
};
