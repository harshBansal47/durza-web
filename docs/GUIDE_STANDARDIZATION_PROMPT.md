# Guide standardization research prompt

You are the research agent for Durza. We are migrating every buying-guide page to the
Acer reference design. The Acer page is the single source of truth for structure,
evidence standards, and content depth. Read it here:

**Reference:** https://durza.in/guides/best-acer-laptop-deals-promo-codes

## Hard rules

1. **Content is frozen.** Copy every existing word, heading, bullet, table cell, price,
   MRP, SKU/model code, date, badge label, source link, FAQ item, nav link and legal line
   verbatim. Do not summarize, paraphrase, reorder sentences, or add claims.
2. **Nothing gets hidden.** No truncation, line clamps, tabs, collapsed panels, or
   "read more". The FAQ keeps its existing click-to-expand behaviour.
3. **Evidence is sacred.** Preserve "NO TEST CLAIMS", "PUBLISHED SPEC DATA",
   "STORE-DIRECT & MARKETPLACE", reviewed/published/updated/facts-checked dates,
   "codes accepted only at checkout", every Source link, and the affiliate disclosure.
4. **No new editorial content.** No invented prices, codes, dates, ratings, or promo copy.
5. If a section does not exist in the source guide, return `null` for it. Never write
   filler to make the object complete.

## Acer standard — what each guide must provide

The Acer guide establishes these sections in this reading order:

1. Trust strip: `Research reviewed 24 Nov 2026 · Codes accepted only at checkout`
2. Evidence badges: `PUBLISHED SPEC DATA`, `STORE-DIRECT & MARKETPLACE`, `NO TEST CLAIMS`
3. H1 + lede
4. Audience pair: `WHO IT IS FOR` / `WHO SHOULD SKIP IT`, with all bullets verbatim
5. Byline: author, role, published / updated / facts-checked dates, bio, method link
6. `ANSWER IN 10 SECONDS`: question, full answer, jump link to the breakdown
7. CTA row: official store / marketplace comparison links, exact labels and hrefs
8. Method paragraph starting "We compared published specifications…"
9. `PICK YOUR SCENARIO`: three full-width paragraphs with their exact headings
10. SKU table: `Factor`, `What we verified`, `What you must check` — all 6 rows
11. Checkout steps: all five, in order, plus the complete `Note:` callout
12. Verified facts panel: dated header, fact rows, every `Source ↗`, disclosure
13. `WHAT WE VERIFIED, AND WHAT WE DID NOT`: full paragraph + four bullets + method link
14. `KEEP EXPLORING`: all internal links (Acer has 11)
15. FAQ: all questions and complete answers
16. Editorial note, including the commission disclosure

## Required output

Return **one TypeScript object** shaped exactly like this, with every value copied
from the source guide:

```ts
interface GuideDocument {
  slug: string;                 // URL slug, verbatim
  url: string;                  // full https://durza.in/guides/<slug>
  title: string;                // H1, verbatim
  description: string;          // meta description / lede, verbatim
  researchReviewedDate: string | null;
  evidenceBadges: string[];     // verbatim badge text only
  audience: {
    bestFor: string[];
    skipIf: string[];
  } | null;
  byline: {
    author: string;
    role: string;
    published: string;
    updated: string;
    factsChecked: string;
    bio: string;
    methodHref: string;
  } | null;
  quickAnswer: {
    question: string;
    answer: string;
    jumpHref: string;
    jumpLabel: string;
  } | null;
  ctas: { href: string; label: string; primary?: boolean }[];
  methodNote: string | null;
  scenarios: { heading: string; body: string; icon: "gamepad" | "laptop" | "cap" | null }[] | null;
  skuTable: { headers: string[]; rows: string[][] } | null;
  checkoutSteps: string[] | null;
  checkoutNote: string | null;
  verifiedFacts: {
    kicker: string;
    title: string;
    facts: { label: string; detail: string; href: string | null }[];
    note: string;
    methodHref: string;
  } | null;
  verificationParagraph: string | null;
  verificationNotes: string[] | null;
  exploreLinks: { href: string; label: string }[] | null;
  faqs: { question: string; answer: string }[] | null;
  editorialNote: string | null;
  sources: { label: string; href: string; checkedAt: string | null }[];
}
```

## Field rules

- Keep `₹` figures and dates exactly as written; never recalculate or "clean" them.
- Keep SKU/model codes verbatim (e.g. `A324-53`, `UN.37RSI.003`, `UN.U7PSI.008`).
- Every `href` must be copied exactly, including `/go/...` redirects and query strings.
- External links must keep their original `target`/`rel` intent; do not rewrite URLs.
- `sources[]` collects every Source link found anywhere on the page.
- For any missing section, use `null` — never invent text.
- Return only the object, no commentary, for one guide at a time.

## Guide links to process

  1. https://durza.in/guides/adidas-india-ultraboost-originals-training-2026-guide
  2. https://durza.in/guides/adidas-sale-india-2026
  3. https://durza.in/guides/ajio-marketplace-coupons-and-bank-offers
  4. https://durza.in/guides/aldo-shoes-india-heels-comfort-guide
  5. https://durza.in/guides/alpino-peanut-butter-and-oats-guide
  6. https://durza.in/guides/amazon-finance-card-smarts-buying-guide
  7. https://durza.in/guides/amazon-flipkart-sale-dates-2026
  8. https://durza.in/guides/amazon-home-office-setup-deals-india
  9. https://durza.in/guides/amazon-living-room-tv-echo-kindle-guide
 10. https://durza.in/guides/amazon-prime-audible-kindle-subscriptions-guide
 11. https://durza.in/guides/asus-india-rog-tuf-zenbook-vhpbook-2026-guide
 12. https://durza.in/guides/baccabucci-footwear-sandali-loafers-guide
 13. https://durza.in/guides/bath-and-body-works-india-mists-candles-guide
 14. https://durza.in/guides/beast-life-whey-and-recovery-guide
 15. https://durza.in/guides/best-acer-laptop-deals-promo-codes
 16. https://durza.in/guides/best-credit-card-online-shopping-india-2026
 17. https://durza.in/guides/best-credit-cards-for-electronics-india
 18. https://durza.in/guides/best-credit-cards-for-food-delivery-india
 19. https://durza.in/guides/black-friday-2026-date-and-what-to-buy
 20. https://durza.in/guides/blissclub-ultimate-leggings-fit-guide
 21. https://durza.in/guides/boldfit-home-gym-deals-and-offers-guide
 22. https://durza.in/guides/boult-audio-earbuds-anc-codes-guide
 23. https://durza.in/guides/brillare-scalp-care-guide
 24. https://durza.in/guides/bytepe-bill-payments-fastag-vouchers-guide
 25. https://durza.in/guides/charles-and-keith-india-style-guide
 26. https://durza.in/guides/christmas-2026-gifts-gourmet-india-buying-guide
 27. https://durza.in/guides/cyber-monday-2026-india-electronics-home-gifts
 28. https://durza.in/guides/digihaat-ONDC-zero-platform-fees-guide
 29. https://durza.in/guides/dot-and-key-skin-active-guide
 30. https://durza.in/guides/firstcry-parenting-deals-and-firstcry-club-guide
 31. https://durza.in/guides/fitspire-plant-protein-and-vegan-guide
 32. https://durza.in/guides/fuelone-protein-pea-isolate-guide
 33. https://durza.in/guides/gritzo-kids-nutrition-and-growth-guide
 34. https://durza.in/guides/guvi-skill-course-codes-guide
 35. https://durza.in/guides/havells-bldc-fan-offers-guide
 36. https://durza.in/guides/healthkart-whey-creator-and-stacking-guide
 37. https://durza.in/guides/hirafragrance-attar-and-oud-guide
 38. https://durza.in/guides/hkvitals-daily-multivitamin-guide
 39. https://durza.in/guides/how-durza-verifies-offers-methodology-2026
 40. https://durza.in/guides/how-to-match-laptop-model-codes-india
 41. https://durza.in/guides/how-to-save-on-amazon-india
 42. https://durza.in/guides/how-to-stack-health-food-deals-india
 43. https://durza.in/guides/how-to-stack-healthkart-discounts
 44. https://durza.in/guides/how-to-stack-myntra-discounts
 45. https://durza.in/guides/iba-cosmetics-halal-beauty-guide
 46. https://durza.in/guides/icici-bank-offers-india-2026
 47. https://durza.in/guides/igp-cake-delivery-and-gifts-guide
 48. https://durza.in/guides/indian-skincare-actives-haircare-guide
 49. https://durza.in/guides/indus-valley-hair-serum-guide
 50. https://durza.in/guides/kama-ayurveda-bringadi-and-kumkumadi-guide
 51. https://durza.in/guides/kapiva-ayurveda-daily-wellness-guide
 52. https://durza.in/guides/lavie-world-handbag-offers-guide
 53. https://durza.in/guides/lenovo-india-laptop-offers-2026-guide
 54. https://durza.in/guides/lenovo-laptop-offers-india-2026
 55. https://durza.in/guides/lenskart-eyewear-offers-and-stacking-guide
 56. https://durza.in/guides/levis-denim-offers-and-sale-guide
 57. https://durza.in/guides/life-changing-astro-consultation-guide
 58. https://durza.in/guides/milton-thermosteel-offers-guide
 59. https://durza.in/guides/moglix-tools-and-gst-savings-guide
 60. https://durza.in/guides/mymuse-intimate-wellness-guide
 61. https://durza.in/guides/neesh-perfumes-extrait-de-parfum-guide
 62. https://durza.in/guides/new-year-2027-sale-electronics-home-gifts-guide
 63. https://durza.in/guides/nilkamal-furniture-offers-and-NEU-guide
 64. https://durza.in/guides/nourish-mantra-vegan-anti-aging-guide
 65. https://durza.in/guides/nuawoman-lingerie-and-comfort-guide
 66. https://durza.in/guides/nykaa-coupons-and-sale-guide
 67. https://durza.in/guides/palmonas-demi-fine-jewelry-tarnish-care-guide
 68. https://durza.in/guides/pepperfry-bean-bags-and-furniture-guide
 69. https://durza.in/guides/perfora-oral-care-electric-brush-guide
 70. https://durza.in/guides/purevpn-india-plans-pricing-2026-guide
 71. https://durza.in/guides/r-for-rabbit-baby-safety-guide
 72. https://durza.in/guides/rbl-bank-offers-india-2026
 73. https://durza.in/guides/reliance-digital-appliance-laptop-offers-guide
 74. https://durza.in/guides/sale-calendar-india-eors-pink-friday-2026
 75. https://durza.in/guides/sanskruti-homes-linen-care-guide
 76. https://durza.in/guides/shop-tupperware-kitchen-storage-guide
 77. https://durza.in/guides/sirona-menstrual-cup-guide
 78. https://durza.in/guides/swiggy-instamart-free-delivery
 79. https://durza.in/guides/tata-cliq-bank-offers-and-sale-guide
 80. https://durza.in/guides/the-bear-house-linen-chinos-oxford-guide
 81. https://durza.in/guides/the-man-company-grooming-beard-kits-guide
 82. https://durza.in/guides/the-natural-wash-kitchen-clean-guide
 83. https://durza.in/guides/truebasics-clinical-strength-guide
 84. https://durza.in/guides/vero-moda-india-work-dresses-guide
 85. https://durza.in/guides/victorias-secret-india-fragrance-sizing-guide
 86. https://durza.in/guides/wonderchef-khuramas-kitchenware-guide
 87. https://durza.in/guides/zeroharm-clean-nutrition-guide
 88. https://durza.in/guides/zoff-foods-pantry-clean-labels-guide

Total: 88 unique guide URLs collected from the local routes/data and the live
sitemap. Process them one at a time and name the output file
`guide-documents/<slug>.ts` in the repository.
