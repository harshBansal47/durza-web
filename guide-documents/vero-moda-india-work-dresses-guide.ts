import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "vero-moda-india-work-dresses-guide",
  url: "https://durza.in/guides/vero-moda-india-work-dresses-guide",
  title: "Vero Moda India Work Dresses — Fit Matrix & Cost Per Wear (2026)",
  description:
    "Which Vero Moda silhouette survives a Monday meeting, how to read the fit categories, and a cost-per-wear method that uses real checkout numbers.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official India site", "Observed offer banners", "Editorial fit framework"],
  audience: {
    bestFor: [
      "Indian office-goers choosing between Vero Moda's Office Looks, dresses, blazers and trousers for a Monday-to-Friday wardrobe.",
      "Shoppers comparing the cost per wear of a dress against a blazer-and-trouser combination before committing.",
    ],
    skipIf: [
      "Anyone relying on the older 'size down from Zara' rule or specific fabric percentages — neither was verified on the official site.",
      "Buyers wanting certified sustainable or natural-fibre claims; the site's own FAQ lists cotton, viscose and polyester without certification detail.",
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
    question: "Which Vero Moda dress works for the office, and how do I judge its value?",
    answer:
      "The official India site has an 'Office Looks' collection, a Dresses & Jumpsuits category, Blazers, Trousers and a Curve range in sizes 42–54. Its FAQ lists cotton, viscose and polyester fabrics and refers shoppers to a size guide. The older 'size down from Zara' rule and silk/crepe composition claims were NOT verified. On 26 Nov 2026 the site showed VM300 (₹300 off ₹4,499+), WELCOME10 (10% off in the app) and free shipping above ₹1,999 — check which apply to your cart rather than assuming they stack.",
    jumpHref: "#scenarios",
    jumpLabel: "See the fit matrix",
  },
  ctas: [
    {
      href: "/go/veromoda?src=guide&sub=guide_vero-moda-india-work-dresses-guide",
      label: "Shop the official Vero Moda India collection",
      primary: true,
    },
    { href: "/go/amazon-in?src=guide-veromoda", label: "Compare workwear prices on Amazon India" },
    { href: "https://www.veromoda.in/", label: "Open veromoda.in" },
  ],
  methodNote:
    "We read the official Vero Moda India homepage and its own FAQ and collection descriptions on 26 Nov 2026. We did not purchase or try on any garment. The fit matrix and cost-per-wear framework are Durza's editorial contribution; fabric percentages, Zara size comparisons and dress prices from older copy were not verified.",
  scenarios: [
    {
      heading: "The Office Looks collection — start here",
      body: "The site lists 'Office Looks' under Collections alongside Marquee, Everyday Essentials and Best Sellers, and its homepage copy explicitly describes 'power clothing' with tailored trousers, crisp blazers and feminine dresses. For a Monday meeting, this is the most relevant filter. We did not verify any specific dress SKU or price, so treat the collection as a starting point, not a recommendation of a particular cut.",
      icon: null,
    },
    {
      heading: "Fit matrix: choose by silhouette and day, not by label",
      body: "Our editorial framework: a straight or shift-shaped dress in a structured fabric reads as office-safe and works for long sittings; a flowy or draped dress reads softer and is better for a dinner or sangeet; a blazer plus trousers gives the most adjustable fit across a day. The site's FAQ says a size guide exists and lists clothing measurements, so use it — we did not verify a universal 'size down' rule. Check the product page for length and lining before assuming a dress is boardroom-appropriate.",
      icon: null,
    },
    {
      heading: "Fabric reality check",
      body: "Vero Moda's own FAQ says it uses fabrics ranging from 'breezy cotton to flowy viscose and everyday polyesters'. That is the extent of what we verified. The older guide's silk dresses, crepe shift dresses and 'upcycled wool-blend' trousers were not confirmed on the pages we read. Read the fabric callout on the exact product page and care for viscose and polyester differently from cotton in Indian humidity.",
      icon: null,
    },
    {
      heading: "Size range and Curve",
      body: "The site describes VERO MODA Curve as sizes 42–54 and says the brand offers a broad size range with a size guide. We verified that statement; we did not verify how the fit differs from other brands. If you are between sizes, order two and keep tags — the fit matrix above is a decision aid, not a substitute for a try-on.",
      icon: null,
    },
    {
      heading: "Cost per wear — the number that actually helps",
      body: "Formula: net payable price ÷ number of planned wears. A dress worn 20 times costs far less per wear than a similar-priced trend piece worn twice, even if the trend piece carries a bigger discount badge. Use your real checkout price after VM300/WELCOME10 and add alteration or dry-cleaning costs. We publish the method rather than a price, because we did not verify a live SKU price on 26 Nov 2026.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Category on the official site", "Best editorial use", "Fabric status", "Price / offer status (26 Nov 2026)"],
    rows: [
      [
        "Office Looks",
        "Monday meetings, interviews, client calls — the most relevant filter",
        "Site FAQ lists cotton, viscose and polyester across the range; check the SKU",
        "No SKU price verified; VM300 banner observed at ₹300 off ₹4,499+",
      ],
      [
        "Dresses & Jumpsuits",
        "Shift-style shapes for office; draped shapes for evening",
        "Older 'silk' and 'crepe' claims not verified",
        "No price verified — check the live product page",
      ],
      [
        "Blazers",
        "Layer over a dress or trousers; easiest fit to adjust across a day",
        "Fabric not verified on the pages we read",
        "No price verified",
      ],
      [
        "Trousers and Co-ords",
        "Build a mix-and-match work capsule; co-ords double as weekend sets",
        "Fabric not verified on the pages we read",
        "Free shipping above ₹1,999 observed on the homepage",
      ],
      [
        "Curve (sizes 42–54) and Marquee",
        "Extended size range and occasion-focused capsule; check each product page",
        "No certification claim verified",
        "No price verified",
      ],
    ],
  },
  checkoutSteps: [
    "Choose the category first: Office Looks for work, Dresses & Jumpsuits for a broader mix, Curve if you need sizes 42–54.",
    "Use the site's size guide and the product page's measurements. Do not apply the old 'size down from Zara' rule — we could not verify it.",
    "Read the fabric callout on the exact SKU. Vero Moda's own FAQ lists cotton, viscose and polyester; it is not a silk-only range.",
    "Check the offer banners: on 26 Nov 2026 the site showed VM300 (₹300 off ₹4,499+), WELCOME10 (flat 10% in the app) and free shipping above ₹1,999. We did not verify which stack.",
    "Compute cost per wear with the final payable amount: price ÷ planned wears, plus any alteration or dry-cleaning cost.",
    "Compare with the tracked link before paying; marketplace sellers and return windows can differ from the official store.",
  ],
  checkoutNote:
    "Offer banners and the free-shipping floor are dated snapshots from 26 Nov 2026. No dress price, fabric percentage or cross-brand size rule is asserted because we could not verify them.",
  verifiedFacts: {
    kicker: "Vero Moda India · official site checked 26 Nov 2026 · checked 26 Nov 2026",
    title: "What the official India site confirms",
    facts: [
      {
        label: "Office Looks is a real collection.",
        detail:
          "The homepage lists Office Looks alongside Marquee, Everyday Essentials and Best Sellers, and describes workwear as tailored trousers, blazers and dresses.",
        href: "https://www.veromoda.in/",
      },
      {
        label: "The brand's own FAQ lists cotton, viscose and polyester.",
        detail:
          "Its FAQ answers the fabric question with 'breezy cotton to flowy viscose and everyday polyesters'. No silk, crepe or wool-blend claim was found on the pages we read.",
        href: "https://www.veromoda.in/",
      },
      {
        label: "Curve is sized 42–54.",
        detail:
          "The homepage states that VERO MODA Curve covers sizes 42–54 and that a size guide with measurements is available.",
        href: "https://www.veromoda.in/",
      },
      {
        label: "Offer banners were visible on 26 Nov 2026.",
        detail:
          "The site showed 'USE VM300 & GET ₹300 OFF ON ₹4,499+', 'USE WELCOME10 & GET FLAT 10% OFF ONLY ON THE VERO MODA APP', a first-order 10% message and 'Free Shipping Above Rs 1999'. We did not verify stacking.",
        href: "https://www.veromoda.in/",
      },
      {
        label: "The Zara size-down rule is unverified.",
        detail:
          "Older Durza copy claimed Vero Moda fits relaxed where Zara fits trim and advised sizing down. We found no official support for that comparison and do not repeat it as guidance.",
        href: null,
      },
    ],
    note: "We read the official homepage and its published FAQ text only. We did not buy, try on or measure any garment, and we make no fabric or fit-guarantee claim.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked the official Vero Moda India site on 26 Nov 2026 for its collections, size guidance, fabric FAQ and offer banners. We did not purchase or try on any product. The older guide's Zara size comparison, silk/crepe fabric claims and specific price slabs were not verified and are not asserted here. The fit matrix and cost-per-wear formula are Durza's own editorial framework. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "A collection name such as Office Looks is a shopping filter, not a guarantee that every piece in it suits every workplace.",
    "Cotton, viscose and polyester behave differently in humidity — check the product page before assuming a dress is breathable.",
    "Cost per wear only works if the wear estimate is honest; a dress worn twice a year is an occasion purchase, not a workhorse.",
    "Free shipping above ₹1,999 and the VM300/WELCOME10 banners are snapshots; the payment summary decides the final amount.",
    "Curve 42–54 is a size range, not a verified fit promise — use the size guide and keep tags until you have tried it on.",
  ],
  exploreLinks: [
    { href: "/stores/veromoda", label: "Vero Moda store hub" },
    { href: "/stores/charles-keith", label: "Charles & Keith store hub" },
    { href: "/guides/charles-and-keith-india-style-guide", label: "Charles & Keith style guide" },
    { href: "/stores/palmonas", label: "Palmonas store hub" },
    { href: "/guides/palmonas-demi-fine-jewelry-tarnish-care-guide", label: "Palmonas plating & care guide" },
    { href: "/stores/aldo-new", label: "Aldo store hub" },
  ],
  faqs: [
    {
      question: "How does Vero Moda fit compared with Zara India?",
      answer:
        "We cannot confirm the old 'size down from Zara' rule. We found no official comparison on 26 Nov 2026. Use Vero Moda's own size guide and product measurements, and order two sizes if returns allow.",
    },
    {
      question: "What fabrics does Vero Moda India use?",
      answer:
        "The brand's own FAQ says cotton, viscose and everyday polyesters. We did not verify silk, crepe or wool-blend claims from older Durza copy. Check the exact product page for the fabric callout and care instructions.",
    },
    {
      question: "Can one dress work for both the office and a sangeet?",
      answer:
        "Possibly, but not every silhouette will. Our editorial matrix puts structured, straight shapes in the office column and draped shapes in the evening column. A solid-colour dress with a blazer is the most flexible combination; judge it using the product page's length, lining and fabric.",
    },
    {
      question: "Are VM300 and WELCOME10 applicable together?",
      answer:
        "We saw both banners on 26 Nov 2026 — VM300 at ₹300 off ₹4,499+ and WELCOME10 for 10% off in the app — but we did not verify stacking or eligibility. Only the checkout panel can confirm what applies to your cart.",
    },
    {
      question: "Did Durza try these dresses on?",
      answer:
        "No. We read the official site on 26 Nov 2026, purchased nothing and make no fit or fabric guarantee. The fit matrix is an editorial decision aid, not a measurement chart.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Unverified cross-brand sizing and fabric claims from the earlier guide were removed; the original contribution here is a silhouette-based fit matrix and a cost-per-wear framework you can apply to real checkout prices. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Vero Moda India official homepage — collections, FAQ and offer banners",
      href: "https://www.veromoda.in/",
      checkedAt: "26 Nov 2026",
    },
  ],
};
