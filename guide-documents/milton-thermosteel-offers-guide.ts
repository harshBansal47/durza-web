import type { GuideDocument } from "@/lib/guide-document";

export const guideDocument: GuideDocument = {
  slug: "milton-thermosteel-offers-guide",
  url: "https://durza.in/guides/milton-thermosteel-offers-guide",
  title: "Milton Thermosteel (2026): Capacity, Shipping-Floor Math and Honest Offer Checks",
  description:
    "Which Thermosteel size to buy, what the 24-hour hot/cold claim actually means, and the arithmetic for crossing the ₹699 free-shipping floor. Live banners are separated from older, unverified codes.",
  researchReviewedDate: "26 Nov 2026",
  evidenceBadges: ["Official store listings", "Dated offer banners", "No insulation testing", "Older codes not verified"],
  audience: {
    bestFor: [
      "Office and gym buyers comparing 500–1,000 ml vacuum-insulated bottles on capacity, listed price and the official ₹699 shipping floor.",
      "Shoppers who want to check current store banners and UPI terms in the cart rather than trust an old code list.",
    ],
    skipIf: [
      "Anyone who needs a verified temperature-retention test — the 24-hour claim is Milton's, and Durza did not measure it.",
      "Buyers looking for the old Asiana / Pacer / Office Master tier comparison: those model names were not found on the current official Thermosteel collection and are not asserted here.",
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
    question: "Which Milton Thermosteel bottle is worth buying, and what does a single bottle cost per day?",
    answer:
      "Pick capacity from your actual refill routine: a 500 ml bottle needs four fills for an illustrative 2 L day, a 1 L bottle needs two. Milton's official Thermosteel collection states 24-hour hot/cold retention as a brand claim; we did not test it. On 26 Nov 2026 the official site showed free shipping above ₹699 and an additional flat 3% off on UPI. A ₹761 Aura or ₹923 Sparkle clears the shipping floor alone; a ₹559 Tiny bottle needs ₹140 more and a ₹534 Elfin needs ₹165 more to reach it. Annualised at an assumed two-year life, ₹761 works out to about ₹1.04/day — a formula, not a guarantee.",
    jumpHref: "#scenarios",
    jumpLabel: "See the capacity and shipping math",
  },
  ctas: [
    {
      href: "https://track.vcommission.com/click?campaign_id=12749&pub_id=133499&url=https%3A%2F%2Fwww.miltonindia.in&p1=guide_milton-thermosteel-offers-guide",
      label: "Check live Milton offers",
      primary: true,
    },
    {
      href: "https://track.vcommission.com/click?campaign_id=12749&pub_id=133499&url=https%3A%2F%2Fwww.milton.in%2Fcollections%2Fthermosteel-bottles&p1=guide_milton-thermosteel-table",
      label: "Open the official Thermosteel collection",
    },
    { href: "/stores/milton", label: "Milton store hub on Durza" },
  ],
  methodNote:
    "We read the official Milton Thermosteel collection and brand pages on 26 Nov 2026, including banner codes, shipping and UPI terms and listed prices. Insulation duration is the brand's own claim; we did not fill, time or temperature-test any bottle. The older OFFICE15 code and the Asiana/Pacer/Office Master tier claims from the previous guide were not found on the current official pages and are not repeated as fact.",
  scenarios: [
    {
      heading: "Small bottles (160–350 ml): cheap to buy, many refills",
      body: "The official collection lists Elfin from ₹534 (160/300/500/750 ml variants), Tiny from ₹559 (180/260/350 ml) and Minimate from ₹595 (190/260/280 ml). At an illustrative 2 L daily intake — a planning figure, not medical advice — a 300 ml bottle needs about 6.7 fills and a 350 ml bottle about 5.7. They are sensible for a school bag or a single commute, not for a full workday without a refill point.",
      icon: null,
    },
    {
      heading: "Mid-size (500–750 ml): the shipping-floor decision",
      body: "Aura is listed from ₹761 with 500/750/1,000 ml options; Felice from ₹828 with 550/715/880 ml. Both clear the official ₹699 free-shipping floor on their own. By contrast, the ₹559 Tiny is ₹140 short and the ₹534 Elfin is ₹165 short — adding a small utensil or spare part to reach ₹699 may cost less than paying delivery, but only if you wanted the extra item.",
      icon: null,
    },
    {
      heading: "Large (900–1,000 ml): fewer fills, heavier carry",
      body: "Sparkle is listed from ₹923 with 620/920 ml options, and Fame from ₹858 with 600/800/1,000 ml. A 1 L bottle covers half of an illustrative 2 L day in one fill. Check the filled weight and your fridge-door shelf before buying: a wide 1 L flask may not fit a narrow door column.",
      icon: null,
    },
    {
      heading: "What the 24-hour claim does and does not say",
      body: "Milton's brand page says the Thermosteel range keeps beverages hot or cold for 24 hours and describes double-walled vacuum insulation. That is a brand claim under its own test conditions. Real retention depends on starting temperature, fill level, lid seal, ambient heat and how often you open it. Durza has no thermometer data and makes no retention guarantee.",
      icon: null,
    },
  ],
  skuTable: {
    headers: ["Range (official listing)", "Listed price, 26 Nov 2026", "Capacity options shown", "Editorial read"],
    rows: [
      ["Aura Thermosteel Bottle", "₹761 (MRP ₹900 shown)", "500 / 750 / 1000 ml", "Clears ₹699 shipping floor; mid-size all-rounder"],
      ["Sparkle Thermosteel Bottle", "₹923 (MRP ₹1,090 shown)", "620 / 920 ml", "Clears shipping floor; larger capacity for desk use"],
      ["Fame Thermosteel Bottle", "₹858 (MRP ₹1,015 shown)", "600 / 800 / 1000 ml", "Check which size the listed price maps to before paying"],
      ["Felice Thermosteel Bottle", "₹828 (MRP ₹980 shown)", "550 / 715 / 880 ml", "Multiple colours; price shown is the collection listing"],
      ["Tiny Thermosteel Water Bottle", "₹559 (MRP ₹700 shown)", "180 / 260 / 350 ml", "₹140 below the free-shipping floor as listed"],
      ["Elfin Thermosteel Bottle", "₹534 (MRP ₹630 shown)", "160 / 300 / 500 / 750 ml", "₹165 below the free-shipping floor as listed"],
    ],
  },
  checkoutSteps: [
    "Choose capacity from refills, not from the discount. Formula: fills per day = your daily litres × 1,000 ÷ bottle ml. For an illustrative 2 L day: 500 ml → 4 fills; 750 ml → 2.7; 1,000 ml → 2.",
    "Compare the listed price with the ₹699 free-shipping floor. Shortfall = ₹699 − listed price. For Tiny at ₹559 it is ₹140; for Elfin at ₹534 it is ₹165. Do not add an unwanted item just to cross the line.",
    "Check the live banner panel. On 26 Nov 2026 the official site showed BFSALE10 (extra 10%), BRASS15 (flat 15% on the brass collection), PERSONAL10 (10% off personalised products) and 'Additional Flat 3% Off On UPI Payment'. Scope and stacking were not verified — test them in the cart.",
    "The old OFFICE15 code is not asserted. It appeared in an earlier Durza draft and was not found on the official site on 26 Nov 2026; if it still works for you, the cart will say so.",
    "Look at the official Spares for Bottles & Flasks collection before replacing a whole bottle. A cap or gasket change is often the relevant repair; we did not verify spare-part prices.",
    "Read the variant carefully. Collection prices are the figure shown on the listing page; colour and capacity variants can carry different prices, so confirm the final amount after selecting your size.",
  ],
  checkoutNote:
    "Prices, banners and the shipping floor are snapshots from official Milton pages checked 26 Nov 2026. Store banners rotate and the cart decides which offers apply. Durza did not purchase or thermally test any bottle.",
  verifiedFacts: {
    kicker: "Milton · checked 26 Nov 2026 · checked 26 Nov 2026",
    title: "What the official store says",
    facts: [
      {
        label: "Free shipping starts above ₹699.",
        detail:
          "The official store banner says 'Free Shipping Above Rs. 699/-'. Small bottles listed below that amount may attract delivery charges unless the cart is topped up.",
        href: "https://milton.in/collections/thermosteel-bottles",
      },
      {
        label: "A UPI discount and three named banners were live.",
        detail:
          "The same page showed 'Additional Flat 3% Off On UPI Payment', BFSALE10, BRASS15 and PERSONAL10. We did not verify eligibility, exclusions or whether these stack with one another.",
        href: "https://milton.in/collections/thermosteel-bottles",
      },
      {
        label: "The 24-hour retention claim is Milton's own.",
        detail:
          "The official brand page says the Thermosteel range keeps beverages hot or cold for 24 hours; the collection says double insulation helps retain temperature for up to 24 hours. No independent test was located or run.",
        href: "https://milton.in/pages/milton",
      },
      {
        label: "Current Thermosteel names differ from the old guide.",
        detail:
          "The official collection lists Aura, Sparkle, Fame, Felice, Elfin, Tiny and others. The earlier Asiana / Pacer / Office Master tier table was not found there, so its claims are not repeated here.",
        href: "https://milton.in/collections/thermosteel-bottles",
      },
      {
        label: "Spare parts are sold on the official site.",
        detail:
          "A 'Spares for Bottles & Flasks' collection is linked from the official store. That supports checking a replacement cap or gasket before buying a new flask; specific spare prices were not verified.",
        href: "https://milton.in/collections/spares-for-bottles-flasks",
      },
    ],
    note: "All prices are listed sale figures seen on 26 Nov 2026, not live quotes for a chosen variant. The store blocked some direct product-page requests with rate limits; collection and brand pages were read directly.",
    methodHref: "/methodology",
  },
  verificationParagraph:
    "We checked official Milton brand, collection and spare-part pages on 26 Nov 2026 for product names, listed prices, capacity options, the ₹699 shipping floor and banner offers. The 24-hour hot/cold statement is a brand claim; we did not test insulation, leakage or food-grade steel composition. The OFFICE15 code and the Asiana/Pacer/Office Master hierarchy from the previous guide could not be verified on the current site and are explicitly not claimed. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.",
  verificationNotes: [
    "Capacity math uses an illustrative 2 L/day intake; it is a planning input, not a health recommendation.",
    "Annualised cost = listed price ÷ assumed life in days. At an assumed two-year life (730 days): ₹761 ÷ 730 ≈ ₹1.04/day; ₹923 ÷ 730 ≈ ₹1.26/day. The life assumption is ours, not a Milton warranty figure.",
    "Collection prices are shown figures for the range; a chosen colour/size variant can price differently. Confirm after variant selection.",
    "24 hours hot/cold is a retention claim under the brand's conditions, not a promise for an opened, half-empty flask in a hot room.",
    "We found an official spare-parts collection but did not verify cap or gasket prices; the earlier ₹150–₹300 figure is not repeated as fact.",
  ],
  exploreLinks: [
    { href: "/categories/home-kitchen", label: "Home & Kitchen category hub" },
    { href: "/topics/home", label: "Home & Appliances topic hub" },
    { href: "/stores/milton", label: "Milton store hub" },
    { href: "/guides/wonderchef-khuramas-kitchenware-guide", label: "Wonderchef kitchenware guide" },
  ],
  faqs: [
    {
      question: "Which Milton capacity should I buy?",
      answer:
        "Use fills per day = daily litres × 1,000 ÷ bottle ml. For an illustrative 2 L day: 500 ml means four fills, 750 ml about 2.7 and 1,000 ml two. Buy the largest size you will actually carry when full; a 1 L steel bottle is heavy once filled.",
    },
    {
      question: "Does a single bottle qualify for free shipping?",
      answer:
        "The official store banner says free shipping above ₹699. A ₹761 Aura or ₹923 Sparkle clears it as listed; a ₹559 Tiny or ₹534 Elfin does not. Check the final cart because variant prices and banners can change.",
    },
    {
      question: "Is OFFICE15 still valid?",
      answer:
        "We could not verify it. It came from an earlier Durza draft and was not found on the official site on 26 Nov 2026. The live banners we saw were BFSALE10, BRASS15, PERSONAL10 and a 3% UPI offer, with scope and stacking unconfirmed.",
    },
    {
      question: "Is the 24-hour hot/cold claim independently tested?",
      answer:
        "Not by Durza. It is Milton's published claim. Real-world retention depends on fill level, ambient temperature, lid seal and opening frequency; we did not run a temperature test.",
    },
    {
      question: "My flask leaks — should I replace the whole bottle?",
      answer:
        "Start with the cap and gasket. Milton's official site has a Spares for Bottles & Flasks collection. We did not verify spare prices, so check the current listing before deciding.",
    },
    {
      question: "Did Durza buy or test any Milton product?",
      answer:
        "No. This guide compares published listings and policy banners checked 26 Nov 2026. All calculations show their inputs and assumptions.",
    },
  ],
  editorialNote:
    "Research reviewed 26 Nov 2026. Prices and banners are dated snapshots; direct product pages were intermittently rate-limited, so some figures come from the official collection listing. Durza may earn a commission on tracked links at no extra cost to you.",
  sources: [
    {
      label: "Official Vacuum Thermosteel Bottles collection",
      href: "https://milton.in/collections/thermosteel-bottles",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official Milton brand page (24-hour claim)",
      href: "https://milton.in/pages/milton",
      checkedAt: "26 Nov 2026",
    },
    {
      label: "Official spare parts collection",
      href: "https://milton.in/collections/spares-for-bottles-flasks",
      checkedAt: "26 Nov 2026",
    },
  ],
};
