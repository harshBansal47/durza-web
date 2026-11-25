import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "r-for-rabbit-baby-safety-guide",
  url: "https://durza.in/guides/r-for-rabbit-baby-safety-guide",
  title: "R for Rabbit Baby Safety — A Certificate Decoder, Not a Safety Promise (2026)",
  description:
    "'Safety Certified' is a shop filter, not a crash rating. Here is how to read ISOFIX, ECE and BIS wording on R for Rabbit listings, and what to check before a child ever rides in the seat.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Store-direct catalogue", "Independent child-safety guidance", "Original certification decoder", "No safety guarantee", "Claims unverified where noted"],
  audience: {
    bestFor: [
      "Parents choosing between rear-facing, convertible and ISOFIX car seats for a child's current height and weight.",
      "Buyers who want to know what a marketplace 'Safety Certified' badge actually names before paying.",
    ],
    skipIf: [
      "Anyone treating a product badge as proof of a crash result — Durza did not test, crash-test or certify any product.",
      "Parents who will skip professional installation checks or use a seat with an unknown history.",
      "Buyers who need a legal determination of Indian motor-vehicle rules — this guide does not provide one.",
    ],
  },
  byline: {
    author: "Harsh Bansal",
    role: "Senior software engineer · 8+ years in technology",
    published: "16 Nov 2026",
    updated: "26 Nov 2026",
    factsChecked: "26 Nov 2026",
    bio: "Harsh builds and audits data-driven products. On Durza he reviews the research method, the comparison logic and the numbers behind each recommendation — so a verdict is something you can check, not just something you are told.",
    methodHref: "/methodology",
  },
  quickAnswer: {
    question: "Are R for Rabbit car seats certified, and does that make them safe for my child?",
    answer:
      "The official car-seat collection we checked on 26 Nov 2026 has a 'Safety Certified' filter on 31 items, product names containing 'ISOFIX', and one carry-cot description saying 'ECE certified'. No certificate number, standard version or test report was readable on the collection page. 'Safety Certified' on a store page is not a crash rating. ISOFIX names an anchorage interface; a separate restraint standard governs crash performance. Durza cannot guarantee safety — match the seat to your child's height and weight, keep rear-facing as long as the seat allows, and get the installation checked. The older Durza claim about a 'Pearl Baby Carrier, 0–13 kg, ECE R44/04 under ₹8,000' was not found on the current site and is not repeated as verified.",
    jumpHref: "#scenarios",
    jumpLabel: "See the certification decoder",
  },
  ctas: [
    {
      href: "/go/rforrabbit-com-ecommerce-cps-india?src=guide&sub=guide_r-for-rabbit-baby-safety-guide",
      label: "See R for Rabbit's live collection",
      primary: true,
    },
    {
      href: "https://rforrabbit.com/collections/baby-car-seats",
      label: "Read the official car-seat collection",
    },
    {
      href: "https://www.cdc.gov/child-passenger-safety/about/index.html",
      label: "CDC child passenger safety guidance",
    },
  ],
  methodNote:
    "On 26 Nov 2026 we read R for Rabbit's official storefront and car-seat collection and the CDC's child passenger safety page. A UNECE standards page returned HTTP 403, so standard-version details in this guide are orientation only, not independently verified. We did not open the seat, inspect a certificate, fit a product in a car or crash-test anything.",
  scenarios: [
    {
      heading: "Certification decoder: four labels you will see",
      body: "1) 'Safety Certified' — a store filter on the R for Rabbit collection; no standard name or certificate number shown in the text we could read. Treat it as a vendor claim. 2) 'ISOFIX' in a product name (Jack N Jill Grand ISOFIX, ISOFIX Plus) — refers to a standardised vehicle anchorage interface; it tells you how the seat attaches, not how it performs in a crash. 3) 'ECE certified' on the Picaboo carry-cot/car-seat listing — a vendor-stated certification; ask which regulation and version, and see the printed label. 4) 'BIS certified' appears on a tricycle listing, not on the car seats we checked — that is a different product category and says nothing about a child restraint. Common child-restraint standard names you may encounter include UN ECE R44/04 and R129/i-Size; we could not read the UNECE source directly on 26 Nov 2026, so verify the exact version on the product label and certificate.",
      icon: "cap",
    },
    {
      heading: "Age and weight bands are the first filter, not the last",
      body: "The collection's own filters list seats up to 13 kg, 18 kg, 25 kg and 36 kg, with age groupings including 0–15 months, 0–12 years and combined groups. A 0–12-year seat is a convertible product, not a single-stage infant seat. CDC guidance says to keep children rear-facing until they reach the maximum height or weight limit of the seat, then move to a forward-facing seat with a harness and top tether. Follow the manual's limits, not the marketing age band.",
      icon: "laptop",
    },
    {
      heading: "What the store actually listed on 26 Nov 2026",
      body: "Jack N Jill Grand ISOFIX (0–12 years) was shown at ₹11,997 against ₹16,497; ISOFIX Plus (0–12 years, 360° rotatable) at ₹16,798 against ₹20,997; Jack N Jill 0–5 years at ₹5,998; Picaboo 4-in-1 carry cot/car seat at ₹3,998; Jack N Jill NXG (0–12 years) at ₹6,998. Carry cots with car-seat use were ₹2,997–₹5,998. These are catalogue snapshots, not safety endorsements.",
      icon: "gamepad",
    },
    {
      heading: "The claim that did not survive verification",
      body: "An older Durza entry named a 'Pearl Baby Carrier (0–13 kg)' priced under ₹8,000 and certified to ECE R44/04. We did not find that model on the current car-seat collection on 26 Nov 2026, and the site text we read did not give a standard version for any seat. Durza therefore does not repeat the model, price or standard version as verified. Also unverified: the old claim that 'ISOFIX-certified' baby gear is built for Indian roads, and that on-board installation support is offered by virtual call.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Listing on the official collection", "Price / MRP shown", "Store-stated markers", "What to verify before buying"],
    rows: [
      [
        "Jack N Jill Grand ISOFIX Car Seat, 0–12 years",
        "₹11,997 / ₹16,497",
        "ISOFIX in name; 5-point harness; collection filter 'Safety Certified'",
        "Exact restraint standard and version, certificate number, vehicle anchor compatibility, expiry date.",
      ],
      [
        "Jack N Jill ISOFIX Plus, 0–12 years, 360° rotatable",
        "₹16,798 / ₹20,997",
        "'Safety Certified' in title; ISOFIX in name",
        "Which standard the rotation mechanism is tested to; installation manual for your car model.",
      ],
      [
        "Jack N Jill Baby Car Seat, 0–5 years",
        "₹5,998 / ₹7,992",
        "Convertible; harness",
        "Whether it is genuinely rear-facing for your child's current height and weight.",
      ],
      [
        "Picaboo 4-in-1 Carry Cot Cum Car Seat",
        "₹3,998 / ₹5,499",
        "Description says 'ECE certified'",
        "Ask for the regulation version and test report; do not assume a carry cot is a crash-tested restraint for every use mode.",
      ],
      [
        "Jack N Jill NXG, 0–12 years",
        "₹6,998 / ₹9,999",
        "Advanced side-impact protection in title",
        "Side-impact is a marketing phrase here; ask for the underlying test standard and result.",
      ],
      [
        "Pocket Air Stroller",
        "₹6,798 / ₹8,991",
        "5-point harness; catalogue copy begins 'Certified with EN...'",
        "The truncated text did not name a complete standard — read the product page and certificate.",
      ],
    ],
  },
  checkoutSteps: [
    "Measure your child's height and weight and compare with the seat's printed limits — not the advertised age range.",
    "Check whether your car has the anchors the seat needs. An ISOFIX-named seat is useless if your vehicle lacks compatible anchor points.",
    "Choose rear-facing for as long as the seat's limits allow. CDC guidance keeps children rear-facing until they reach the seat's maximum height or weight limit.",
    "Ask the seller for the certificate: standard name, version number, issuing body and a copy that matches the exact model you are buying.",
    "Check the manufacturing and expiry date. A child restraint with an unknown history or expired date should not be used.",
    "Get the installation checked by a qualified child-passenger-safety technician where one is available; follow the seat manual and the vehicle manual together.",
    "Use the harness on every ride, with the chest clip at armpit level and no bulky clothing under the straps. Never place a rear-facing seat in front of an active air bag.",
  ],
  checkoutNote:
    "Prices and titles are dated snapshots from the official collection checked 26 Nov 2026. No certificate, standard version or crash result was verified by Durza. Durza does not sell safety — verify with the manufacturer and a qualified installer.",
  verifiedFacts: {
    kicker: "R for Rabbit & child safety · checked 26 Nov 2026",
    title: "What is on the page, and what is not",
    facts: [
      {
        label: "The collection offers a 'Safety Certified' filter on 31 items.",
        detail:
          "The filter appears alongside weight-capacity and age filters. No standard name or certificate number was shown in the readable page text, so the phrase is a store category, not a verified rating.",
        href: "https://rforrabbit.com/collections/baby-car-seats",
      },
      {
        label: "ISOFIX appears in product names, not as a stated standard version.",
        detail:
          "Jack N Jill Grand ISOFIX and ISOFIX Plus are listed with prices. The collection text did not cite a specific regulation version or test report for those seats.",
        href: "https://rforrabbit.com/collections/baby-car-seats",
      },
      {
        label: "One carry-cot listing says 'ECE certified'.",
        detail:
          "The Picaboo 4-in-1 descriptions use that phrase. Durza did not see the regulation number or certificate, so the claim is reported, not verified.",
        href: "https://rforrabbit.com/collections/baby-car-seats",
      },
      {
        label: "CDC recommends rear-facing as long as the seat allows.",
        detail:
          "CDC's child passenger safety page says to buckle children in a rear-facing car seat with a harness until they reach the seat's maximum weight or height limit, and never to put a rear-facing seat in the front seat. This is US guidance, not a statement of Indian law.",
        href: "https://www.cdc.gov/child-passenger-safety/about/index.html",
      },
      {
        label: "The UNECE standards source could not be read.",
        detail:
          "A direct request to the UNECE child-restraint standards page returned HTTP 403 on 26 Nov 2026. Durza therefore does not assert which version applies to any R for Rabbit seat.",
        href: null,
      },
      {
        label: "The old 'Pearl' car-seat claim was not found.",
        detail:
          "An earlier Durza entry described a Pearl Baby Carrier at 0–13 kg, ECE R44/04 and under ₹8,000. That model and those terms were not visible on the checked collection, so they are not carried forward.",
        href: null,
      },
    ],
    note: "We did not open, install, crash-test or certify any product. No safety outcome is claimed by Durza.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We read R for Rabbit's storefront and official car-seat collection and the CDC's child passenger safety guidance on 26 Nov 2026. The UNECE standards page returned HTTP 403, so standard-version statements are explicitly unverified here. Catalogue prices and vendor phrases are dated snapshots. We did not inspect a certificate, fit a seat, verify installation support or crash-test any product, and we make no promise that any seat will protect a child in a crash. Follow the product manual, your vehicle manual and a qualified installer. For Indian legal requirements, consult official government sources. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "'Safety Certified' is a store filter in the pages we read — it is not a named crash-performance standard.",
    "ISOFIX describes an anchorage interface; it is not by itself evidence of crash-test performance.",
    "'ECE certified' and 'BIS certified' must be checked against a certificate that names the exact model and standard version.",
    "Keep children rear-facing until they outgrow the seat's stated height or weight limit, and never in front of an active air bag.",
    "Do not buy a child restraint with an unknown history or an expired manufacturing date.",
    "CDC guidance is independent child-safety guidance from the United States, not a statement of Indian law.",
  ],
  exploreLinks: [
    { href: "/stores/r-for-rabbit", label: "R for Rabbit store hub" },
    { href: "/guides/firstcry-parenting-deals-and-firstcry-club-guide", label: "FirstCry parenting and club guide" },
    { href: "/guides/how-durza-verifies-offers-methodology-2026", label: "How Durza verifies offers" },
    { href: "/methodology", label: "Research method" },
  ],
  faqs: [
    {
      question: "Which R for Rabbit car seat should I pick for a three-month-old?",
      answer:
        "Start with the child's height and weight, not the age band. Choose a rear-facing seat whose printed limits cover your child, check that your car has the anchors it needs, and get the installation checked. We cannot recommend a specific model as 'safe' — Durza did not test any seat.",
    },
    {
      question: "What does 'Safety Certified' mean on the collection page?",
      answer:
        "In the pages we read it is a store filter on 31 items. No standard name, version or certificate number was shown in the readable text. Ask the seller for those details before paying.",
    },
    {
      question: "Is an ISOFIX seat automatically safer?",
      answer:
        "ISOFIX refers to a standardised way of anchoring the seat. It can make correct installation easier if your car has compatible anchors, but it is not a crash rating. Check the separate restraint standard and the installation manual.",
    },
    {
      question: "Are the strollers safe for Indian roads?",
      answer:
        "We did not test them. Older Durza copy claimed all-terrain suitability and virtual installation support; neither was verified on 26 Nov 2026. Match the stroller to your usual surfaces and check the harness and brakes in person.",
    },
    {
      question: "Did Durza verify the Pearl 0–13 kg ECE R44/04 seat?",
      answer:
        "No. That model was not visible on the current car-seat collection, and the old entry's price and standard claim could not be confirmed. We removed it from the verified set.",
    },
    {
      question: "Can a correctly fitted seat guarantee my child's safety?",
      answer:
        "No. Correct use reduces risk; it does not eliminate it. CDC guidance emphasises appropriate seat choice, rear-facing as long as possible, correct installation and harness use on every ride.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Original contribution: a certification decoder separating store badges ('Safety Certified'), anchorage names (ISOFIX) and standards claims (ECE/BIS), with explicit verification gaps where the standards source was blocked. No safety outcome is guaranteed. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "R for Rabbit official car-seat collection",
      href: "https://rforrabbit.com/collections/baby-car-seats",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "R for Rabbit official storefront",
      href: "https://rforrabbit.com/",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "CDC — Child Passenger Safety (updated 22 Apr 2026)",
      href: "https://www.cdc.gov/child-passenger-safety/about/index.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "UNECE child restraint standards page — access failed (HTTP 403)",
      href: "https://unece.org/transport/standards/transport/vehicle-regulations-wp29/child-restraint-systems",
      checkedAt: "26 Nov 2026",
    },
  ],
};
