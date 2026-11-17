/**
 * Content copied verbatim from the custom store pages (app/stores/<slug>/client.tsx).
 *
 * These are the brand-supplied option lists, step lists and price points behind each
 * store's tool. They are kept byte-for-byte so the home-page tools say exactly what the
 * store pages say. Prices and performance claims here are the brand's own and are
 * static: they are not read from the live catalogue, so they can go stale. The registry
 * in lib/store-tools.ts labels them as such in the UI.
 */

export const SIRONA_CUP_SIZES = [
  { id: "s", label: "Under 25 & Not Given Birth?", size: "Size S (Small)", detail: "Designed for teens and women below 25 who have not given birth — narrower bell, secure fit for light-to-moderate flow.", url: "https://www.thesirona.com/products/sirona-reusable-menstrual-cup", sub: "cup_size_s" },
  { id: "m", label: "25+ or Normal Flow?", size: "Size M (Medium — Most Popular)", detail: "The all-rounder: perfect for most women with normal flow, regardless of age. Balanced capacity and comfort.", url: "https://www.thesirona.com/products/sirona-reusable-menstrual-cup", sub: "cup_size_m" },
  { id: "l", label: "Given Birth Vaginally?", size: "Size L (Large)", detail: "Higher capacity rim for post-childbirth anatomy and heavy-flow days — reliable protection for up to 10 hours.", url: "https://www.thesirona.com/products/sirona-reusable-menstrual-cup", sub: "cup_size_l" },
];

export const LEVIS_CARTS = [
  { id: "solo", label: "1 × 511™ Jeans (₹2,599)", total: "₹2,599", outcome: "No flat coupon unlocked — add the Batwing Tee to cross ₹3,499.", sub: "cart_solo", url: "https://www.levi.in" },
  { id: "plus_tee", label: "511™ Jeans + Batwing Tee", total: "₹3,598", outcome: "Unlocks LEVIS500 — effectively ₹499 for the ₹1,499 tee.", sub: "cart_plus_tee", url: "https://www.levi.in/sale" },
  { id: "bundle", label: "501® + Trucker Jacket (₹7,598)", total: "₹7,598", outcome: "Unlocks LEVIS1000 — flat ₹1,000 off the whole wardrobe.", sub: "cart_bundle", url: "https://www.levi.in/sale" },
];

export const LAVIE_CARRY = [
  { id: "laptop", label: "14\" Laptop + Charger", result: "Work Tote", detail: "You need the Horsebit Structured Large Work Tote (₹1,399) — padded sleeve fits a 14\" laptop with room for a charger and documents.", math: "Base 65% OFF + extra 10% with LAVIE10 + 5% UPI ≈ ₹1,069 final.", url: "https://www.lavieworld.com/collections/tote-bags", sub: "capacity_laptop" },
  { id: "everyday", label: "Phone + Makeup + Keys", result: "Dome Satchel", detail: "The Betula Medium Dome Satchel (₹1,199) swallows a phone, makeup pouch, keys and a cardholder with a structured silhouette.", math: "66% OFF + extra 10% with LAVIE10 + 5% UPI ≈ ₹916 final.", url: "https://www.lavieworld.com/collections/satchel-bags", sub: "capacity_everyday" },
  { id: "minimal", label: "Phone + Cards Only", result: "Quilted Sling", detail: "The Ushawu Quilted Crossbody Sling (₹799) fits a 6.7\" phone, keys and a cardholder hands-free.", math: "64% OFF + extra 10% with LAVIE10 + 5% UPI ≈ ₹610 final.", url: "https://www.lavieworld.com/collections/sling-bags", sub: "capacity_minimal" },
];

export const MILTON_NEEDS = [
  { id: "hot", label: "Need 24H Boiling Hot Tea/Coffee?", result: "Vacuum Thermosteel (Flip Lid 1000ml)", detail: "A double-walled vacuum flask keeps tea, coffee or dal at boiling temperature for up to 24 hours. Pre-heat with hot water for 5 minutes first.", note: "₹849 • 25% OFF + extra 10% with MILTON10", url: "https://www.milton.in/collections/thermosteel-flasks", sub: "need_hot" },
  { id: "lunch", label: "Need Piping Hot Office Lunch Without Microwave?", result: "Plug-in Electric Tiffin (Futuron)", detail: "Three stainless containers with auto cut-off heating warm your home meal in about 30 minutes — no office kitchen required.", note: "₹1,399 • 30% OFF + eligible for OFFICE15", url: "https://www.milton.in/collections/electric-lunch-boxes", sub: "need_lunch" },
  { id: "copper", label: "Overnight Ayurvedic Copper Water?", result: "99.9% Pure Copper Bottle", detail: "Store room-temperature or cool water overnight for the traditional tamra jal Ayurvedic practice.", note: "Never pour hot or boiling water into a copper bottle — it can leach excess copper and damage the lacquer.", url: "https://www.milton.in/collections/copper-bottles", sub: "need_copper" },
];

export const NEESH_CONCENTRATIONS = [
  { id: "edp", label: "Eau de Parfum (15–18%)", headline: "Standard EDP — fades in 2–3 hours in Indian heat", points: ["15%–18% perfume oil concentration", "Evaporates fast in high heat and humidity", "Reapplication needed through the day", "Fine for mild climates and short wear"] },
  { id: "extrait", label: "Extrait de Parfum (25–30%)", headline: "Neesh Extrait — 12H+ projection, built for India", points: ["25%–30% pure perfume oil concentration", "Survives heat and humidity without collapse", "Sillage and projection last 12+ hours", "Richer amber, musk and vanilla base accords"] },
];

export const TRUEBASICS_COMPARISONS = [
  { id: "ashwagandha", generic: { label: "Generic Ashwagandha", points: ["Unverified withanolide % — often <1.5%", "May contain toxic leaf material mixed with root", "Effectiveness varies batch to batch", "No clinical trials backing stress claims"] }, patented: { label: "KSM-66® (Full-Spectrum Root)", points: ["Highest concentration of withanolides (5%+)", "Root-only extract — zero leaf alkaloids", "22 published clinical trials on stress & sleep", "Same extract used in the studies, not a look-alike"] } },
  { id: "omega3", generic: { label: "Standard 1000mg Fish Oil", points: ["Only ~300mg active EPA+DHA per softgel", "~70% filler oil with low bioavailability", "Often skips enteric coating (fishy burps)", "Needs 3–4 softgels for the same EPA+DHA dose"] }, patented: { label: "TrueBasics Triple Strength", points: ["960mg active EPA+DHA per softgel", "3× concentration vs commercial fish oils", "Enteric coated — zero aftertaste or burps", "One softgel delivers a clinically relevant dose"] } },
];

export const ZEROHARM_TECH = [
  { id: "standard", label: "Standard Supplements", points: ["High-heat chemical extraction destroys phytonutrients", "Harsh stomach acid blocks up to 80% of absorption", "Large 1000mg tablets just to compensate for loss", "Bulk dosage increases side-effect risk"] },
  { id: "nano", label: "ZeroHarm Nano-Tech", points: ["Water-based extraction preserves live phytonutrients", "Microscopic lipid spheres bypass stomach acid entirely", "Absorbed directly in the small intestine for 5–10× uptake", "Smaller clean dosages with zero heavy metals or synthetics"] },
];

export const ZOFF_GRINDING = [
  { id: "traditional", label: "Traditional Chakki / Hammer Mills", points: ["Generates up to 95°C heat during grinding", "Volatile essential oils burn off — dull, bitter spices", "Preservative-free powders go stale within months", "Color fades; curcumin and capsaicin degrade"] },
  { id: "coolgrind", label: "ZOFF Cool-Grinding Tech", points: ["Spices ground at sub-zero temperatures", "Locks in up to 95% of natural essential oils", "Vibrant natural color without artificial dyes", "Medicinal curcumin and capsaicin stay potent"] },
];

export const ZOFF_RESTOCK_ITEMS = [
  { id: "masala", label: "Essential Masala Combo (₹499)", amount: 499 },
  { id: "almonds", label: "Almonds & Cardamom Combo (₹599)", amount: 599 },
];

export const MOGLIX_BUYERS = [
  { id: "retail", label: "Retail Buyer (Home DIY)", lines: [["High-Pressure Washer", "₹4,299"], ["TOOLS250 coupon", "− ₹250"], ["Effective price", "₹4,049"]], note: "Plus extra 5% instant off on prepaid UPI/card checkout." },
  { id: "gst", label: "GST Registered Business", lines: [["High-Pressure Washer", "₹4,299"], ["TOOLS250 coupon", "− ₹250"], ["18% GST Input Tax Credit", "~ − ₹619"], ["Effective net cost", "~ ₹3,430"]], note: "Claim back the GST component as Input Tax Credit in your next GST return — enter your GSTIN at checkout." },
];

export const ASTRO_CHECKLIST = [
  { title: "Lab Verification", detail: "Every gemstone includes an independent gemological lab certificate verifying natural origin — no glass-filled or synthetic stones." },
  { title: "X-Ray Tested Rudraksha", detail: "Internal seed chambers are X-ray verified to be intact and unglued — the key difference between real and fake beads." },
  { title: "Personalized Remedies", detail: "Consultations focus on practical lifestyle, mantra and planetary remedies — never fear-based upselling." },
];

export const MYMUSE_GUARANTEES = [
  { title: "Plain Brown Box", detail: "Neither the courier partner nor anyone at home can see the brand name or contents on the outer label." },
  { title: "Neutral Billing Name", detail: "Your UPI/card statement never displays explicit product details — the descriptor stays neutral." },
  { title: "Doctor-Approved Materials", detail: "100% phthalate-free medical silicone and pH-balanced water-based gels, paraben-free." },
];

export const NILKAMAL_CONFIDENCE = [
  { title: "Mesh Breathability", detail: "Aerated mesh backs prevent back sweating during long Indian summers — the single biggest complaint with leatherette chairs." },
  { title: "Free Assembly Service", detail: "Wardrobes, beds and large tables include complimentary professional carpenter assembly in covered cities — no flatpack headaches." },
  { title: "Dual Coupon Stacking", detail: "Base sale discount + NILKAMAL500 (above ₹4,999) + 5% instant UPI deduction stack together at checkout." },
];

export const NOURISH_CONFIDENCE = [
  { title: "Vedic Modernity", detail: "Traditional herbs like Ashwagandha and Gotu Kola fused with clinical actives — Peptides and Niacinamide — in one formula." },
  { title: "Clean Guarantee", detail: "Zero parabens, phthalates, synthetic sulphates, or animal derivatives. PETA-certified cruelty-free and 100% vegan; plastic-neutral packaging." },
  { title: "Stacking Formula", detail: "Catalog discount + GLOW20 (flat 20% off above ₹1,499) + 5% instant UPI deduction = maximum savings on clean beauty." },
];

export const WONDERCHEF_ADVISOR = [
  { title: "100% PFOA & Lead-Free", detail: "Wonderchef Granite coatings use non-toxic mineral layers safe for high-heat Indian tadka — no leaching, no flaking fumes." },
  { title: "Induction + Gas Dual Base", detail: "All granite pans carry a magnetic stainless steel base plate, fully compatible with both induction cooktops and gas stoves." },
  { title: "Stacking Formula", detail: "Catalog 49% off + code CHEF10 (extra 10%) + 5% instant UPI deduction = maximum savings on chef-grade kitchenware." },
];

export const MAN_COMPANY_STEPS = [
  { title: "Step 1 — Micro-needle 2x a week", detail: "Roll the 0.5mm titanium Derma Roller over patchy areas twice weekly to boost blood circulation and collagen production around dormant follicles." },
  { title: "Step 2 — Feed follicles daily", detail: "Apply Almond & Thyme Growth Oil every evening to nourish active hair follicles and soften coarse beard hair." },
  { title: "Step 3 — Bundle and stack", detail: "Buy the Derma Roller + Growth Oil + Wash as a kit and apply code BEARD20 for flat 20% off, plus free shipping above ₹499." },
];

export const NATURAL_WASH_CART_FILLERS = [
  { id: "potato", label: "Potato Wax (₹380)", amount: 380 },
  { id: "beetroot", label: "Beetroot Lip Balm (₹220)", amount: 220 },
  { id: "rose", label: "Rose Water (₹299)", amount: 299 },
];

export const FIRSTCRY_DIAPERS = [
  { brand: "Pampers", pack: 34, price: 449 },
  { brand: "Pampers", pack: 68, price: 849 },
  { brand: "MamyPoko", pack: 32, price: 399 },
  { brand: "MamyPoko", pack: 76, price: 899 },
  { brand: "Huggies", pack: 30, price: 379 },
  { brand: "Huggies", pack: 66, price: 799 },
];

export const FIRSTCRY_GEAR = [
  { name: "R for Rabbit Pocket Stroller", type: "Stroller", weight: "6.5 kg", fold: "One-hand", rating: "4.3" },
  { name: "LuvLap Sunshine Stroller", type: "Stroller", weight: "7.2 kg", fold: "Two-hand", rating: "4.1" },
  { name: "Chicco KeyFit 30 Car Seat", type: "Car Seat", weight: "4.1 kg", fold: "N/A", rating: "4.6" },
  { name: "Graco SnugRide 35", type: "Car Seat", weight: "3.4 kg", fold: "N/A", rating: "4.4" },
];
