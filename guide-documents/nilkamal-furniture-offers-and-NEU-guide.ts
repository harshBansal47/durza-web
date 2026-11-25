import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "nilkamal-furniture-offers-and-NEU-guide",
  url: "https://durza.in/guides/nilkamal-furniture-offers-and-NEU-guide",
  title: "Nilkamal Furniture (2026): Freight, Assembly and Warranty Reality Check",
  description:
    "A ₹790 chair can carry ₹999 shipping outside selected pincodes. Build the cart from official starting prices, check the assembly field and read the warranty exclusions before paying — with the arithmetic shown.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official policy pages", "Freight math shown", "Codes not verified", "Assembly claims checked"],
  audience: {
    bestFor: [
      "Buyers furnishing a bedroom or home office who want to know whether a low item price survives delivery charges and assembly obligations.",
      "Households in humid or coastal Indian cities checking HDPE/plastic versus wood and reading warranty exclusions before ordering.",
    ],
    skipIf: [
      "Anyone expecting BEDROOM1000 or NILKAMAL500 to be verified — neither code was found on the official site on 26 Nov 2026.",
      "Buyers who want a modular kitchen or custom-size joinery; Nilkamal's listed lines here are ready furniture and D-I-Y cabinets, not modular systems.",
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
    question: "Is Nilkamal furniture a good deal once delivery and assembly are counted?",
    answer:
      "It depends on your pincode and the SKU's assembly field. The official shipping page offers free shipping on furniture only for selected pincodes and states ₹999 otherwise. On a ₹790 chair that is 126.5% of the item price; on an illustrative ₹18,019 cart built from official starting prices it is 5.5%. The consumer warranty policy grants three years against manufacturing defects but excludes plastic breakage, misuse and improper assembly. The old BEDROOM1000 and NILKAMAL500 codes were not found on the official site and are not claimed.",
    jumpHref: "#scenarios",
    jumpLabel: "See the cart and freight model",
  },
  ctas: [
    {
      href: "https://track.vcommission.com/click?campaign_id=11875&pub_id=133499&url=https%3A%2F%2Fwww.nilkamalfurniture.com&p1=guide_nilkamal-furniture-offers-and-NEU-guide",
      label: "Check live Nilkamal prices and delivery",
      primary: true,
    },
    { href: "/stores/nilkamalfurniture", label: "Nilkamal store hub on Durza" },
    { href: "/categories/home-kitchen", label: "Home & Kitchen category hub" },
  ],
  methodNote:
    "We read Nilkamal Furniture's official warranty policy, shipping and delivery FAQ, purchase/returns page and indexed product pages on 26 Nov 2026. Prices used in the model are official category 'from' figures, not quotes for specific SKUs. We did not order, assemble or inspect furniture, and did not verify the earlier coupon codes or the claim that installation is automatically free above ₹10,000.",
  scenarios: [
    {
      heading: "Cheap single item outside a selected pincode",
      body: "Official category pages show plastic chairs from ₹790. If your pincode is not in the free-shipping list, the stated ₹999 charge makes the landed price ₹1,789 — shipping is 999 ÷ 790 = 126.5% of the item price. A local store pickup or a multi-item cart is the obvious comparison before paying.",
      icon: null,
    },
    {
      heading: "Illustrative five-piece bedroom cart",
      body: "Using official starting prices only: bed ₹7,990 + wardrobe ₹6,649 + two plastic chairs at ₹790 each + shoe rack ₹1,800 = ₹18,019. Freight at ₹999 is 999 ÷ 18,019 = 5.5% of the cart; at a free-shipping pincode it is zero. These are category starting prices, not a real bundle quote — rebuild the total with your chosen SKUs.",
      icon: null,
    },
    {
      heading: "Assembly: pre-done is not the default",
      body: "The earlier guide said Nilkamal furniture arrives pre-assembled with zero installation above ₹10,000. The official pages do not support that blanket claim: several cabinet product pages state D-I-Y delivery with basic assembly by the customer, while other product pages say installation and demo are free within 2–5 days post-delivery, and the shipping FAQ says assembly is undertaken within 3–5 days after delivery. Read the 'Delivery Condition' and 'Installation & Demo Details' fields on your exact product page.",
      icon: null,
    },
    {
      heading: "Warranty: what three years does not cover",
      body: "The official consumer warranty policy gives three years against manufacturing defects for domestic use, with a valid invoice and warranty card. It explicitly excludes breakage of plastic, rubber or glass components, normal wear and tear, misuse beyond load limits, improper self-assembly, moisture or salt-air damage, and commercial use. A separate trade terms page mentions one year — check which applies to your invoice, especially for institutional purchases.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Official category", "Starting price shown", "What to verify on the product page", "Freight sensitivity at ₹999"],
    rows: [
      ["Plastic chairs", "from ₹790", "Delivery condition (D-I-Y vs installed); load limit", "₹999 exceeds the item price by 126.5%"],
      ["Shoe racks", "from ₹1,800", "Shelf dimensions, assembly field", "₹999 is 55.5% of the item price"],
      ["Beds", "from ₹7,990", "Mattress size, sweep/clearance, installation window", "₹999 is 12.5% of the item price"],
      ["Wardrobes", "from ₹6,649", "D-I-Y vs free installation within 2–5 days", "₹999 is 15.0% of the item price"],
      ["Sofas", "from ₹7,500", "Fabric vs foam exclusions in warranty", "₹999 is 13.3% of the item price"],
      ["Dining sets", "from ₹8,890", "Seat count, table dimensions, pincode eligibility", "₹999 is 11.2% of the item price"],
    ],
  },
  checkoutSteps: [
    "Measure the room before building the cart: bed and wardrobe footprints, door width for carry-in, and clearance for recliners. Returns logistics on bulky furniture are not a casual undo button.",
    "Check your pincode against the official shipping statement. Free shipping is offered on selected pincodes; otherwise ₹999 is stated. Recompute the landed cost with freight included.",
    "Read the exact product page's Delivery Condition and Installation & Demo Details. Some items are D-I-Y with basic tools; others promise free installation within 2–5 days of delivery. Do not assume one rule for the whole site.",
    "Build the cart from the actual SKUs and recompute: landed cost = item total + freight + any paid assembly. Our ₹18,019 example is a model using official 'from' prices, not a live quote.",
    "Test any code at checkout. BEDROOM1000 and NILKAMAL500 came from an earlier draft and were not found on the official site on 26 Nov 2026; no bundle threshold or stacking is claimed here.",
    "Register the purchase and keep the invoice and warranty card. The policy requires both and asks for defects to be reported within 15 days of discovery.",
    "Photograph the delivery on arrival, especially for plastic components and glass fittings, because the warranty excludes physical breakage and shifting damage.",
  ],
  checkoutNote:
    "Policy text and starting prices were checked on 26 Nov 2026. Pincode eligibility, assembly promises and variant prices are SKU-specific; the final order summary is the only reliable figure.",
  verifiedFacts: {
    kicker: "Nilkamal Furniture · checked 26 Nov 2026 · checked 26 Nov 2026",
    title: "What the official policies actually say",
    facts: [
      {
        label: "₹999 shipping applies outside selected pincodes.",
        detail:
          "The official shipping and delivery page states free shipping for the furniture range on selected pincodes and ₹999 shipping otherwise. The FAQ repeats this. Eligibility is pincode- and SKU-dependent.",
        href: "https://nilkamalfurniture.com/pages/shipping-delivery",
      },
      {
        label: "Assembly has a window, but not a universal 'pre-assembled' rule.",
        detail:
          "The shipping page says assembly is undertaken within 3–5 days after delivery. Product pages variously state D-I-Y delivery or free installation/demo within 2–5 days post-delivery. The exact product field governs.",
        href: "https://www.nilkamalfurniture.com/pages/faqs",
      },
      {
        label: "The consumer warranty is three years, with exclusions.",
        detail:
          "The official limited warranty covers manufacturing defects for three years from purchase for household use with valid invoice and warranty card, but excludes plastic/rubber/glass breakage, misuse, wear and tear, improper assembly and environmental damage.",
        href: "https://nilkamalfurniture.com/pages/warranty-policy",
      },
      {
        label: "A separate trade page mentions one year.",
        detail:
          "The trade terms page states a one-year warranty from invoice for manufacturing defects. Which term applies depends on the purchase channel; read your invoice rather than assuming the longer period for institutional buys.",
        href: "https://nilkamalfurniture.com/pages/trade-terms-condition",
      },
      {
        label: "Category starting prices are visible on the site.",
        detail:
          "Official category pages showed beds from ₹7,990, wardrobes from ₹6,649, dining sets from ₹8,890, shoe racks from ₹1,800, plastic chairs from ₹790 and sofas from ₹7,500 on 26 Nov 2026. These are starting figures, not bundle prices.",
        href: "https://www.nilkamalfurniture.com/collections/bed",
      },
    ],
    note: "We did not order furniture, verify pincode eligibility or assemble any product. Price figures are category starting points seen on 26 Nov 2026.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked official Nilkamal Furniture warranty, shipping, FAQ, trade-terms and category pages on 26 Nov 2026. The freight and cart figures are our arithmetic on published starting prices and the stated ₹999 charge; they are not a live quote. The earlier BEDROOM1000 and NILKAMAL500 codes and the blanket 'pre-assembled, zero installation above ₹10,000' claim could not be verified on the current site and are not asserted. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Freight ratio = ₹999 ÷ item price. For a ₹790 chair: 1.265, or 126.5%. For the illustrative ₹18,019 cart: 0.0555, or 5.5%.",
    "Illustrative cart inputs: bed ₹7,990 + wardrobe ₹6,649 + 2 × chair ₹790 + shoe rack ₹1,800 = ₹18,019. All four are official category 'from' prices, not selected SKU quotes.",
    "Warranty requires the original invoice and a stamped warranty card, and defects must be reported within 15 days of discovery.",
    "The 3-year consumer policy and 1-year trade-terms statement conflict; durability planning should use the written term on your invoice.",
    "HDPE is described in Nilkamal's own blog as a high-grade weather-resistant thermoplastic. We did not independently rate any product's lifespan.",
    "Neither a coupon code nor a bank offer was verified in a live cart; do not budget a discount that the checkout does not show.",
  ],
  exploreLinks: [
    { href: "/categories/home-kitchen", label: "Home & Kitchen category hub" },
    { href: "/topics/home", label: "Home & Appliances topic hub" },
    { href: "/stores/nilkamalfurniture", label: "Nilkamal store hub" },
    { href: "/guides/pepperfry-bean-bags-and-furniture-guide", label: "Pepperfry furniture guide" },
    { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant discount vs No-Cost EMI" },
  ],
  faqs: [
    {
      question: "Is delivery really ₹999?",
      answer:
        "The official shipping page says furniture ships free on selected pincodes and charges ₹999 otherwise. Enter your pincode and check the order summary; the ratio matters — ₹999 is more than the price of a ₹790 chair.",
    },
    {
      question: "Does Nilkamal assemble furniture for free?",
      answer:
        "Sometimes, depending on the SKU. The shipping FAQ says assembly is done within 3–5 days after delivery, and several product pages promise free installation within 2–5 days. Other cabinets are explicitly D-I-Y. Read your product's Delivery Condition field.",
    },
    {
      question: "What is the warranty period?",
      answer:
        "The consumer warranty policy states three years for manufacturing defects with a valid invoice and warranty card. A separate trade-terms page states one year. Check which applies to your purchase channel and keep the paperwork.",
    },
    {
      question: "Does the warranty cover a cracked plastic part?",
      answer:
        "No. The policy explicitly excludes breakage of plastic, rubber and glass components, along with misuse, overload, wear and tear and improper self-assembly. Budget for that risk rather than assuming accidental damage is covered.",
    },
    {
      question: "Do BEDROOM1000 or NILKAMAL500 work?",
      answer:
        "We could not verify either code on the official site on 26 Nov 2026. The earlier guide's bundle and threshold claims are not repeated. Test any code in the cart and keep the route with the lower final payable amount.",
    },
    {
      question: "Did Durza assemble or test any furniture?",
      answer:
        "No. This guide compares published policies and starting prices with our own arithmetic shown in full.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Policy wording and starting prices are dated snapshots; SKU-level assembly and pincode eligibility must be checked on the product page. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Official shipping & delivery page",
      href: "https://nilkamalfurniture.com/pages/shipping-delivery",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official warranty policy",
      href: "https://nilkamalfurniture.com/pages/warranty-policy",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official trade terms",
      href: "https://nilkamalfurniture.com/pages/trade-terms-condition",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official FAQs",
      href: "https://www.nilkamalfurniture.com/pages/faqs",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official beds collection (starting price)",
      href: "https://www.nilkamalfurniture.com/collections/bed",
      checkedAt: "26 Nov 2026",
    },
  ],
};
