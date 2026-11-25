import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "mymuse-intimate-wellness-guide",
  url: "https://durza.in/guides/mymuse-intimate-wellness-guide",
  title: "MyMuse Intimate Wellness — Materials, Lubricants & Discreet Buying (2026)",
  description:
    "A materials-and-compatibility guide to MyMuse: water-based versus silicone lubricants, condom safety, the 21+ gate and which older shipping claims we could not verify.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official brand guidance", "CDC public-health guidance", "No medical claims"],
  audience: {
    bestFor: [
      "Adults 21+ in India comparing a first lubricant or massager on material safety and device compatibility.",
      "Buyers who want to understand discreet delivery and returns from the official store before ordering.",
    ],
    skipIf: [
      "Anyone under 21 — the official site applies an age gate at entry.",
      "Anyone seeking treatment for persistent dryness, pain or infection — see a healthcare professional; lubricants are comfort products, not medicines.",
      "Shoppers relying on the old BUNDLE20, MUSE10 or seven-day-returns statements — we could not verify those terms.",
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
    question: "What should a first-time buyer check on MyMuse, and is delivery actually discreet?",
    answer:
      "Start with the material, not the discount. MyMuse's own guide says its water-based Glide is paraben-free, glycerin-free, pH-balanced and safe with silicone massagers and condoms; silicone-based lubricants should not be used with silicone devices. The store states free, discreet and express delivery with COD, and applies a 21+ age gate. We could not verify the old BUNDLE20 or MUSE10 codes, the exact unmarked-box description or the seven-day returns claim, so they are not presented as facts.",
    jumpHref: "#scenarios",
    jumpLabel: "See the compatibility matrix",
  },
  ctas: [
    {
      href: "https://track.vcommission.com/click?campaign_id=10666&pub_id=133499&url=https%3A%2F%2Fwww.mymuse.in&p1=guide_mymuse-intimate-wellness-guide",
      label: "Check the official MyMuse catalogue",
      primary: true,
    },
    { href: "https://www.mymuse.in/blogs/guides/water-based-lubricants", label: "Read MyMuse's lubricant guide" },
  ],
  methodNote:
    "We read the official storefront, its water-based-lubricant guide and CDC condom-use guidance on 26 Nov 2026. The MyMuse guide states prices were checked on 3 Oct 2026. We did not purchase, use or test any product, and no coupon code was independently validated.",
  scenarios: [
    {
      heading: "The material-and-compatibility matrix",
      body: "Water-based lubricant: compatible with silicone massagers, latex, polyurethane and polyisoprene condoms; washes off with water; may need reapplication. Silicone-based lubricant: condom-compatible and longer-lasting, but the brand warns it can degrade silicone devices. Oil-based products: CDC says petroleum jelly, body lotion and cooking oils can weaken latex condoms and cause breakage. For a first purchase with silicone toys, water-based is the least complicated choice.",
      icon: null,
    },
    {
      heading: "Glide — what the official guide actually states",
      body: "MyMuse's guide lists Glide water-based lubricant at ₹699, described as paraben-free, glycerin-free, fragrance-free, pH-balanced and made with organic aloe vera extract. It says the formula is compatible with all MyMuse massagers and condoms. The guide also recommends a pH between 3.8 and 4.5 for vaginal use. These are brand statements; we did not see a full INCI or an independent pH measurement.",
      icon: null,
    },
    {
      heading: "Cost and what we cannot calculate",
      body: "The guide gives ₹699 for Glide but we could not verify a stated bottle volume on the official page we read, so a cost per use would be guesswork. Marketplace listings show different pack sizes and prices, but they are not the official store. We also saw a Link+ C-shaped massager at ₹4999 against ₹6999 on the storefront, and a free travel pouch on orders above ₹3,499 — both are snapshots, not promises.",
      icon: null,
    },
    {
      heading: "Discretion and the age gate",
      body: "The storefront displays 'FREE, DISCREET & EXPRESS DELIVERY' and 'COD AVAILABLE', and opens with a 'Are you over 21?' gate. Brand claims also mention discreet packaging and billing, body-safe materials, a 100-day warranty and 3.75 lakh plus customers. Older Durza copy described unmarked kraft boxes, a generic 'personal care' courier sticker, a two-to-three-day shipping window and a seven-day returns rule; we could not verify those specifics and have removed them.",
      icon: null,
    },
    {
      heading: "Comfort product, not treatment",
      body: "Using a lubricant is normal and does not signal a problem. MyMuse's own guide says so and advises consulting a healthcare professional if dryness is persistent. Nothing on this page is a treatment for infection, hormonal symptoms or pain. If something hurts, stop and get clinical advice rather than trying another product.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Item / source", "Stated spec or price", "Compatibility", "Verification status"],
    rows: [
      [
        "MyMuse Glide water-based lubricant (official guide)",
        "₹699; paraben-free, glycerin-free, fragrance-free, aloe vera, pH-balanced",
        "Silicone devices, latex/polyurethane/polyisoprene condoms",
        "Brand guide, prices checked 3 Oct 2026; no full INCI or pH test seen",
      ],
      [
        "Silicone-based lubricant (category guidance)",
        "Longer-lasting, needs soap to clean",
        "Condoms yes; silicone devices no",
        "Brand comparison table plus CDC condom guidance",
      ],
      [
        "Link+ C-shaped app-controlled massager (storefront)",
        "₹4999 against ₹6999",
        "Use water-based lubricant with silicone devices",
        "Storefront snapshot 26 Nov 2026; check live price",
      ],
      [
        "BUNDLE20 / MUSE10 / returns window from older copy",
        "20% on bundles, 10% sitewide, seven-day returns",
        "Not applicable",
        "Not verified — excluded from the verdict",
      ],
    ],
  },
  checkoutSteps: [
    "Confirm you are 21 or over; the site's entry gate requires it.",
    "Pick the lubricant by device and condom material first. If you own silicone massagers, choose water-based.",
    "Read the ingredient statement on the pack. 'Paraben-free' and 'glycerin-free' are useful, but a full list is better than a marketing badge.",
    "Check the live cart for bundle pricing and any prepaid offer. We verified no fixed code, so compare the final payable amount.",
    "Review the store's current shipping and returns policy at checkout; older Durza shipping and returns figures were not verified.",
  ],
  checkoutNote:
    "Storefront and brand-guide content were checked on 26 Nov 2026; the brand says its guide prices were checked on 3 Oct 2026. No purchase was made and no coupon was validated. The cart and the product label are the sources of truth.",
  verifiedFacts: {
    kicker: "MyMuse · checked 26 Nov 2026",
    title: "What the brand and public-health guidance say",
    facts: [
      {
        label: "The site applies a 21+ age gate.",
        detail:
          "The official storefront opens with an 'Are you over 21?' prompt before allowing entry. Older Durza advice about under-18 buyers was out of step with this.",
        href: "https://www.mymuse.in",
      },
      {
        label: "Water-based lubricant is presented as the universal option.",
        detail:
          "MyMuse's guide says water-based formulas work with silicone massagers, latex and all body-safe materials, and that silicone-based lubricant can degrade silicone devices over time.",
        href: "https://mymuse.in/blogs/guides/water-based-lubricants",
      },
      {
        label: "Glide is stated at ₹699 with a specific positioning.",
        detail:
          "The same guide describes Glide as paraben-free, glycerin-free, aloe-vera-based and pH-balanced, and recommends pH 3.8–4.5 for vaginal use. These are brand statements, not independent measurements.",
        href: "https://mymuse.in/blogs/guides/water-based-lubricants",
      },
      {
        label: "CDC agrees on condom compatibility.",
        detail:
          "CDC advises using water-based or silicone-based lubricants with condoms and warns that oil-based products such as petroleum jelly, body lotion and cooking oil can weaken latex and cause breakage.",
        href: "https://www.cdc.gov/condom-use/index.html",
      },
      {
        label: "The store states discreet, express delivery.",
        detail:
          "The storefront banner reads 'FREE, DISCREET & EXPRESS DELIVERY' and 'COD AVAILABLE'. We did not verify the older claim of unmarked kraft boxes with a specific courier sticker.",
        href: "https://www.mymuse.in",
      },
    ],
    note: "No product was purchased or used. The brand's own guide states its prices were checked on 3 Oct 2026, and its comfort and material claims were not independently tested.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked the official MyMuse storefront and lubricant guide, and CDC condom-use guidance, on 26 Nov 2026. We did not buy, use or test any product. Older Durza claims about specific coupon codes, packaging text, delivery times and a seven-day returns window could not be verified and are not repeated as facts. Lubricants and massagers are comfort products, not medical treatments. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Silicone lubricant plus a silicone toy can degrade the toy; water-based avoids that problem.",
    "Oil-based products, including body lotion and petroleum jelly, can weaken latex condoms.",
    "Persistent dryness, pain or bleeding is a clinical issue — see a healthcare professional.",
    "Brand claims such as 'body-safe materials' and 'pH-balanced' were not independently tested by Durza.",
    "Discreet delivery is stated by the store; the exact packaging description from an older draft was not verified.",
  ],
  exploreLinks: [
    { href: "/categories/beauty", label: "Beauty & Personal Care category" },
    { href: "/topics/health", label: "Health & Fitness topic hub" },
    { href: "/stores/mymuse", label: "MyMuse store hub" },
    { href: "/stores/sirona", label: "Sirona store hub" },
    { href: "/guides/sirona-menstrual-cup-guide", label: "Sirona menstrual cup guide" },
  ],
  faqs: [
    {
      question: "Which lubricant should I buy first?",
      answer:
        "If you have silicone massagers or use condoms, a water-based lubricant is the simplest choice. MyMuse's guide says its Glide formula is compatible with both, and CDC recommends water-based or silicone-based lubricants with condoms. Avoid oil-based products with latex condoms.",
    },
    {
      question: "Is the packaging discreet?",
      answer:
        "The storefront states 'FREE, DISCREET & EXPRESS DELIVERY' and mentions discreet packaging and billing. We could not verify the older description of unmarked kraft boxes and a generic courier sticker, so we do not promise that exact format.",
    },
    {
      question: "Can I use silicone lubricant with my silicone massager?",
      answer:
        "No. MyMuse's own guide warns that silicone-based lubricant can degrade silicone devices over time. Use water-based with silicone toys; silicone lubricant is fine with condoms but needs soap to wash off.",
    },
    {
      question: "Can a lubricant treat dryness?",
      answer:
        "It can improve comfort and reduce friction, but it is not a treatment for an underlying cause. The brand's guide itself advises consulting a healthcare professional if dryness is persistent.",
    },
    {
      question: "Did Durza test these products?",
      answer:
        "No. We read official and CDC guidance on 26 Nov 2026, purchased nothing and make no medical claims.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. No product was purchased or tested, and several older shipping and coupon claims failed verification. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    { label: "Official MyMuse storefront", href: "https://www.mymuse.in", checkedAt: "26 Nov 2026" },
    {
      label: "MyMuse guide — water-based lubricants",
      href: "https://mymuse.in/blogs/guides/water-based-lubricants",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "CDC — Condom Use: An Overview",
      href: "https://www.cdc.gov/condom-use/index.html",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Amazon India — MyMuse Glide water-based lubricant",
      href: "https://www.amazon.in/MYMUSE-Ingredients-Non-Sticky-Stain-Free-Balanced/dp/B0C4LBK3PV",
      checkedAt: "26 Nov 2026",
    },
  ],
};
