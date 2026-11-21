# Amazon Beauty Toolkit — AI Research Brief

> Give this document to an AI research model, then add your prompt asking it to produce the 108-product JSON.

## 1) Project context and intuition
- **Site:** Durza (https://durza.in), a deal/coupon/content site.
- **Page:** `/collections/complete-amazon-makeup-toolkit` — "The Complete Makeup Toolkit" on Amazon.in.
- **Core intuition:** Many users, especially beginners, do not know the correct makeup order or which products to buy. Instead of occasion buckets, organize products by **makeup routine steps** from start to finish. Each step should have options from budget/decent to premium so users can build a full kit in one place.
- **Shopping behavior:** User browses by step, compares a few picks, and clicks out to Amazon.in to check live price/details and buy.
- **Tone:** Practical, Indian-shopper friendly, clear, no hype. No medical claims.
- **Commercial rules:** Amazon.in only. Existing verified products have affiliate/tracked links that must be preserved. New products may use Amazon `/dp/ASIN` or search links until affiliate links are supplied. No fake coupon codes, fake discounts, fake ratings, "Amazon's Choice" claims, or stock claims unless verified.

## 2) Current design/layout (already scaffolded in codebase)
- **Single page** at `/collections/complete-amazon-makeup-toolkit`.
- **Hero:** punchy, with gradient + SVG grid/dot background. Title: "The Complete Makeup Toolkit." Subline: "Every step. Every essential. One place." No old top subtitle/filter strip.
- **Main catalog:** 18 routine-step sections in order. Each section has step label, title, short intro, and product grid.
- **Grid:** 2 cards per row on mobile, 4 cards per row on desktop.
- **Small product card:** tag on top-left over image; brand name; small/different-font product name; price; MRP; discount; "View on Amazon" button.
- **Every product must show price + MRP + discount.** Labels are indicative; live price checked on Amazon.in.
- **End of page (info/lists only, NOT product cards):** "Trending Now", "5-Minute Everyday", "Party Glam", "Wedding & Festive", "Starter Basics", "Tools & Touch-Ups". These are quick guides; main catalog remains routine-step based.

## 3) Research target
- **Target:** 108 products total (minimum 100 acceptable, 108 preferred to fill current scaffold).
- **Distribution:** ~6 products per category across 18 categories.
- **Price mix per category where relevant:** budget/decent, mid-range, premium.
- **Current state:** scaffold already has 36 existing verified products preserved; remaining slots are placeholders. Replace/fill placeholders with real, good Amazon.in picks.

## 4) Current inventory snapshot
- Total slots: **109**
- Existing verified/preserved products: **36**
- Placeholder slots to fill/replace: **73**

## 5) Routine categories and current products

### 1. Step 1: Cleanse — Cleanser (`cleanser`)
- Intro: Start fresh with a gentle face wash that suits your skin type.
- Current: **0 existing** + **6 placeholders** = **6** slots
- **Existing preserved products:** none
- **Placeholder slots to research/replace:**
  - `cleanser-ph-1` | temporary: Cetaphil — Gentle Skin Cleanser (125ml) | ₹333 / MRP ₹399 / 17% off
  - `cleanser-ph-2` | temporary: Simple — Refreshing Facial Wash (150ml) | ₹385 / MRP ₹440 / 13% off
  - `cleanser-ph-3` | temporary: Minimalist — 2% Salicylic Acid Face Wash (100ml) | ₹299 / MRP ₹349 / 14% off
  - `cleanser-ph-4` | temporary: CeraVe — Hydrating Facial Cleanser (236ml) | ₹1,350 / MRP ₹1,600 / 16% off
  - `cleanser-ph-5` | temporary: La Roche-Posay — Toleriane Purifying Foaming Cleanser (50ml) | ₹950 / MRP ₹1,150 / 17% off
  - `cleanser-ph-6` | temporary: Brand 6 — Cleanser Pick 6 | ₹499 / MRP ₹699 / 29% off

### 2. Step 2: Moisturize — Moisturizer (`moisturizer`)
- Intro: Hydrate and prep your skin for smooth makeup application.
- Current: **1 existing** + **5 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `ed-tinted-moisturiser` | **RENEE** — Tinted Moisturiser (Caramel Glint, 50ml) | Check price | MRP N/A | N/A | Tag: Everyday Pick | Image: local webp image | Link: https://link.amazon/B08sYF4R6
- **Placeholder slots to research/replace:**
  - `moisturizer-ph-1` | temporary: Neutrogena — Hydro Boost Water Gel (50g) | ₹850 / MRP ₹1,050 / 19% off
  - `moisturizer-ph-2` | temporary: Cetaphil — Moisturising Cream (80g) | ₹450 / MRP ₹550 / 18% off
  - `moisturizer-ph-3` | temporary: Plum — Green Tea Oil-Free Moisturizer (50ml) | ₹470 / MRP ₹575 / 18% off
  - `moisturizer-ph-4` | temporary: Minimalist — 10% Vitamin B5 Moisturizer (50g) | ₹329 / MRP ₹399 / 18% off
  - `moisturizer-ph-5` | temporary: Clinique — Moisture Surge 100H Auto-Replenishing Hydrator (30ml) | ₹1,950 / MRP ₹2,400 / 19% off

### 3. Step 3: Protect — Sunscreen (`sunscreen`)
- Intro: Daily SPF to protect skin from sun and tanning.
- Current: **0 existing** + **6 placeholders** = **6** slots
- **Existing preserved products:** none
- **Placeholder slots to research/replace:**
  - `sunscreen-ph-1` | temporary: Lakmé — Sun Expert SPF 50 PA+++ Ultra Matte Lotion (50ml) | ₹299 / MRP ₹399 / 25% off
  - `sunscreen-ph-2` | temporary: Minimalist — SPF 50 PA++++ Sunscreen (50g) | ₹399 / MRP ₹499 / 20% off
  - `sunscreen-ph-3` | temporary: Neutrogena — UltraSheer Dry-Touch Sunblock SPF 50+ (80ml) | ₹675 / MRP ₹780 / 13% off
  - `sunscreen-ph-4` | temporary: La Shield — FISICO Sunscreen SPF 50 (50g) | ₹630 / MRP ₹790 / 20% off
  - `sunscreen-ph-5` | temporary: Beauty of Joseon — Relief Sun SPF 50+ (50ml) | ₹1,350 / MRP ₹1,650 / 18% off
  - `sunscreen-ph-6` | temporary: Brand 6 — Sunscreen Pick 6 | ₹499 / MRP ₹699 / 29% off

### 4. Step 4: Prime — Primer (`primer`)
- Intro: Create a smooth base so makeup lasts longer.
- Current: **0 existing** + **6 placeholders** = **6** slots
- **Existing preserved products:** none
- **Placeholder slots to research/replace:**
  - `primer-ph-1` | temporary: Maybelline — Fit Me Primer (30ml) | ₹499 / MRP ₹649 / 23% off
  - `primer-ph-2` | temporary: Lakmé — Absolute Blur Perfect Makeup Primer (30g) | ₹750 / MRP ₹850 / 12% off
  - `primer-ph-3` | temporary: Swiss Beauty — Real Makeup Base Highlighting Primer (32ml) | ₹399 / MRP ₹549 / 27% off
  - `primer-ph-4` | temporary: e.l.f. — Power Grip Primer (24ml) | ₹1,050 / MRP ₹1,299 / 19% off
  - `primer-ph-5` | temporary: Smashbox — Photo Finish Smooth & Blur Primer (30ml) | ₹3,200 / MRP ₹3,800 / 16% off
  - `primer-ph-6` | temporary: Brand 6 — Primer Pick 6 | ₹499 / MRP ₹699 / 29% off

### 5. Step 5: Base — Foundation (`foundation`)
- Intro: Even out your skin tone with a base that matches you.
- Current: **2 existing** + **4 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `wf-foundation` | **Maybelline** — Fit Me Matte + Poreless Liquid Foundation (228, 18ml) | ₹155 | MRP ₹217 | 29% off | Tag: Wedding Pick | Image: local webp image | Link: https://link.amazon/B0drFinUS
  - `st-bb` | **Garnier** — Skin Naturals BB Cream - Bright Complete Vitamin C (30g) | ₹206 | MRP N/A | N/A | Tag: Starter Pick | Image: local webp image | Link: https://link.amazon/B0c40JHhI
- **Placeholder slots to research/replace:**
  - `foundation-ph-2` | temporary: L'Oréal Paris — Infallible 24H Fresh Wear Foundation (30ml) | ₹1,099 / MRP ₹1,399 / 21% off
  - `foundation-ph-3` | temporary: Huda Beauty — FauxFilter Luminous Matte Foundation (35ml) | ₹3,300 / MRP ₹3,950 / 16% off
  - `foundation-ph-4` | temporary: Brand 4 — Foundation Pick 4 | ₹499 / MRP ₹699 / 29% off
  - `foundation-ph-5` | temporary: Brand 5 — Foundation Pick 5 | ₹499 / MRP ₹699 / 29% off

### 6. Step 6: Conceal — Concealer (`concealer`)
- Intro: Cover spots, dark circles, and brighten where needed.
- Current: **1 existing** + **5 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `ed-concealer` | **Maybelline** — Fit Me Concealer (36 Golden Caramel) | Check price | MRP N/A | N/A | Tag: Everyday Pick | Image: local webp image | Link: https://link.amazon/B04zfnp8V
- **Placeholder slots to research/replace:**
  - `concealer-ph-1` | temporary: Maybelline — Fit Me Concealer (6.8ml) | ₹449 / MRP ₹549 / 18% off
  - `concealer-ph-2` | temporary: Swiss Beauty — Liquid Concealer (5.6g) | ₹229 / MRP ₹299 / 23% off
  - `concealer-ph-3` | temporary: L.A. Girl — Pro Conceal HD Concealer (8g) | ₹695 / MRP ₹795 / 13% off
  - `concealer-ph-4` | temporary: NARS — Radiant Creamy Concealer (6ml) | ₹2,800 / MRP ₹3,200 / 13% off
  - `concealer-ph-5` | temporary: Kay Beauty — HD Liquid Concealer (6.5ml) | ₹799 / MRP ₹999 / 20% off

### 7. Step 7: Set Base — Compact & Setting Powder (`compact-powder`)
- Intro: Lock in base and control shine through the day.
- Current: **2 existing** + **4 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `wf-compact` | **FACES CANADA** — Weightless Stay Matte Finish Compact Powder (Natural Almond 06, 9g) | Check price | MRP N/A | N/A | Tag: Wedding Pick | Image: local webp image | Link: https://link.amazon/B07ULHHRJ
  - `st-compact` | **FACES CANADA** — Weightless Stay Matte Finish Compact Powder (Natural Almond 06, 9g) | Check price | MRP N/A | N/A | Tag: Starter Pick | Image: local webp image | Link: https://link.amazon/B07ULHHRJ
- **Placeholder slots to research/replace:**
  - `compact-powder-ph-1` | temporary: Maybelline — Fit Me Matte+Poreless Compact (6g) | ₹230 / MRP ₹299 / 23% off
  - `compact-powder-ph-2` | temporary: Lakmé — 9 to 5 Primer + Matte Powder Foundation (9g) | ₹500 / MRP ₹600 / 17% off
  - `compact-powder-ph-3` | temporary: Huda Beauty — Easy Bake Loose Powder (20g) | ₹3,250 / MRP ₹3,800 / 14% off
  - `compact-powder-ph-4` | temporary: Swiss Beauty — Ultra Fine Loose Powder (10g) | ₹349 / MRP ₹449 / 22% off

### 8. Step 8: Add Flush — Blush (`blush`)
- Intro: Add a natural flush of color to cheeks.
- Current: **5 existing** + **1 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `tr-liquid-blush` | **MARS** — Liquid Blush | Check price | MRP N/A | N/A | Tag: Trending · Nov 2026 | Image: local webp image | Link: https://www.amazon.in/dp/B0D9HJXYX9
  - `tr-blush-wand` | **Typsy Beauty** — Silk Cushion Liquid Blush Wand | Check price | MRP N/A | N/A | Tag: Trending · Nov 2026 | Image: local webp image | Link: https://www.amazon.in/dp/B0CM3PR7L6
  - `tr-lip-cheek-tint` | **Blue Heaven** — Blush & Juicy Lip & Cheek Tint (Berry Juice, 9ml) | Check price | MRP N/A | N/A | Tag: Trending · Nov 2026 | Image: local webp image | Link: https://link.amazon/B087X0B5L
  - `tr-jelly-tint` | **RENEE** — Summer Slush Jelly Tint | Check price | MRP N/A | N/A | Tag: Trending · Nov 2026 | Image: local webp image | Link: https://www.amazon.in/dp/B09X7BWM97
  - `ed-lip-cheek` | **Lakmé** — 9 to 5 Weightless Matte Mousse Lip & Cheek Color (Coca Soft, 9g) | Check price | MRP N/A | N/A | Tag: Everyday Pick | Image: local webp image | Link: https://link.amazon/B07g4mBCp
- **Placeholder slots to research/replace:**
  - `blush-ph-1` | temporary: Swiss Beauty — Baked Blusher (6g) | ₹299 / MRP ₹399 / 25% off

### 9. Step 9: Glow — Highlighter (`highlighter`)
- Intro: Add glow to high points for a fresh look.
- Current: **1 existing** + **5 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `pg-strobing` | **Maybelline** — Master Strobing Liquid Illuminating Highlighter (Light/Iridescent) | ₹155 | MRP ₹217 | 29% off | Tag: Glam Pick | Image: local webp image | Link: https://link.amazon/B0g6sbzyN
- **Placeholder slots to research/replace:**
  - `highlighter-ph-1` | temporary: Swiss Beauty — Baked Highlighter (6g) | ₹299 / MRP ₹399 / 25% off
  - `highlighter-ph-2` | temporary: MARS — Glowzilla Highlighter (7g) | ₹329 / MRP ₹399 / 18% off
  - `highlighter-ph-3` | temporary: Becca-style alt — Rare Beauty Positive Light Liquid Luminizer (15ml) | ₹2,700 / MRP ₹3,200 / 16% off
  - `highlighter-ph-4` | temporary: Lakmé — Absolute Liquid Highlighter (25ml) | ₹650 / MRP ₹750 / 13% off
  - `highlighter-ph-5` | temporary: Pixi — On-the-Glow Blush/Highlighter Stick (19g) | ₹1,650 / MRP ₹1,950 / 15% off

### 10. Step 10: Sculpt — Contour & Bronzer (`contour-bronzer`)
- Intro: Add warmth and definition for a sculpted look.
- Current: **0 existing** + **6 placeholders** = **6** slots
- **Existing preserved products:** none
- **Placeholder slots to research/replace:**
  - `contour-bronzer-ph-1` | temporary: Swiss Beauty — Contour Stick (6g) | ₹299 / MRP ₹399 / 25% off
  - `contour-bronzer-ph-2` | temporary: MARS — Contour Stick (7g) | ₹249 / MRP ₹349 / 29% off
  - `contour-bronzer-ph-3` | temporary: Huda Beauty — Tantour Contour & Bronzer Cream (11ml) | ₹2,900 / MRP ₹3,400 / 15% off
  - `contour-bronzer-ph-4` | temporary: Benefit — Hoola Matte Bronzer (8g) | ₹3,200 / MRP ₹3,700 / 14% off
  - `contour-bronzer-ph-5` | temporary: Makeup Revolution — Mega Bronzer (15g) | ₹550 / MRP ₹695 / 21% off
  - `contour-bronzer-ph-6` | temporary: e.l.f. — Putty Bronzer (10g) | ₹850 / MRP ₹1,050 / 19% off

### 11. Step 11: Brows — Eyebrow (`eyebrow`)
- Intro: Frame your face with defined, natural-looking brows.
- Current: **1 existing** + **5 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `st-brow` | **Swiss Beauty** — Waterproof Eyebrow Pencil with Brush (02 Dark Brown, 1.5g) | Check price | MRP N/A | N/A | Tag: Starter Pick | Image: local webp image | Link: https://link.amazon/B0dZ5dtQi
- **Placeholder slots to research/replace:**
  - `eyebrow-ph-1` | temporary: Swiss Beauty — Eyebrow Pencil (1.5g) | ₹199 / MRP ₹249 / 20% off
  - `eyebrow-ph-2` | temporary: Maybelline — Define & Blend Brow Pencil (0.16g) | ₹499 / MRP ₹599 / 17% off
  - `eyebrow-ph-3` | temporary: Benefit — Gimme Brow+ Volumizing Gel (3g) | ₹2,700 / MRP ₹3,100 / 13% off
  - `eyebrow-ph-4` | temporary: e.l.f. — Brow Lift (10g) | ₹850 / MRP ₹1,050 / 19% off
  - `eyebrow-ph-5` | temporary: Anastasia Beverly Hills — Brow Wiz (0.085g) | ₹2,400 / MRP ₹2,800 / 14% off

### 12. Step 12: Eyeshadow — Eyeshadow (`eyeshadow`)
- Intro: Add depth and color to your eyes.
- Current: **0 existing** + **6 placeholders** = **6** slots
- **Existing preserved products:** none
- **Placeholder slots to research/replace:**
  - `eyeshadow-ph-1` | temporary: Swiss Beauty — Ultimate Eyeshadow Palette (9g) | ₹299 / MRP ₹399 / 25% off
  - `eyeshadow-ph-2` | temporary: MARS — 12 Shades Dance of Joy Palette (14g) | ₹349 / MRP ₹499 / 30% off
  - `eyeshadow-ph-3` | temporary: Maybelline — Nudes Eyeshadow Palette (9.6g) | ₹799 / MRP ₹999 / 20% off
  - `eyeshadow-ph-4` | temporary: Huda Beauty — Nude Obsessions Palette (10g) | ₹2,900 / MRP ₹3,400 / 15% off
  - `eyeshadow-ph-5` | temporary: L'Oréal Paris — La Petite Eyeshadow Palette (7g) | ₹899 / MRP ₹1,099 / 18% off
  - `eyeshadow-ph-6` | temporary: Nykaa — Eyes On Me! Quad (4.5g) | ₹499 / MRP ₹625 / 20% off

### 13. Step 13: Define Eyes — Eyeliner & Kajal (`eyeliner-kajal`)
- Intro: Define eyes with kajal or liner for everyday to glam.
- Current: **7 existing** + **0 placeholders** = **7** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `st-kajal` | **Lakmé** — Eyeconic Black Kajal (0.35g, Combo Pack of 2) | ₹228 | MRP ₹319 | 29% off | Tag: Starter Pick | Image: local webp image | Link: https://link.amazon/A07IQZnqD
  - `wf-bold-liner` | **Maybelline** — Colossal Bold Eyeliner (Black) | ₹499 | MRP N/A | N/A | Tag: Wedding Pick | Image: local webp image | Link: https://link.amazon/B0je2FadW
  - `wf-kohl` | **MARS** — Kohl of Fame Retractable Kajal (0.35g, Black) | ₹499 | MRP N/A | N/A | Tag: Wedding Pick | Image: local webp image | Link: https://link.amazon/B0hNDMdQj
  - `ed-kajal` | **Plum** — NaturStudio All-Day-Wear Kohl Kajal (Black Brilliance, Pack of 2) | ₹499 | MRP N/A | N/A | Tag: Everyday Pick | Image: local webp image | Link: https://link.amazon/B0aHLsvUr
  - `pg-pen-liner` | **MARS** — Ink Black Liquid Pen Eyeliner (1ml, Black) | Check price | MRP N/A | N/A | Tag: Glam Pick | Image: local webp image | Link: https://link.amazon/B0c7E9WWf
  - `pg-felt-liner` | **Swiss Beauty** — Waterproof Bold Felt Tip Pen Eyeliner (Black, 1.2ml) | Check price | MRP N/A | N/A | Tag: Glam Pick | Image: local webp image | Link: https://link.amazon/B0fJEyP9f
  - `pg-kohl` | **Sotrue** — Dark Spell Kohl Kajal (1.5g) | ₹497 | MRP ₹646 | 23% off | Tag: Glam Pick | Image: local webp image | Link: https://link.amazon/B03oYQADA

### 14. Step 14: Lashes — Mascara (`mascara`)
- Intro: Lift and volumize lashes for an open-eye look.
- Current: **5 existing** + **1 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `wf-mascara` | **Maybelline** — Colossal Waterproof Mascara (10ml, Black) | ₹499 | MRP N/A | N/A | Tag: Bestseller | Image: local webp image | Link: https://link.amazon/B00xvb4PaL
  - `pg-waterproof-mascara` | **Maybelline** — Lash Sensational Sky High Waterproof Mascara (Very Black) | ₹497 | MRP ₹646 | 23% off | Tag: Bestseller | Image: local webp image | Link: https://link.amazon/B06HGrdAW
  - `tr-sky-tubes` | **Maybelline** — Lash Sensational Sky High Tubes Tubing Mascara (Very Black) | ₹850 | MRP N/A | N/A | Tag: Trending · Nov 2026 | Image: local webp image | Link: https://link.amazon/B0eu1LgyE
  - `ed-mascara` | **Maybelline** — Lash Sensational Sky High Mascara | ₹497 | MRP ₹646 | 23% off | Tag: Bestseller | Image: local webp image | Link: https://link.amazon/B06HGrdAW
  - `st-mascara` | **MARS** — Fabulash Volumizing Mascara (12ml, Waterproof) | ₹209 | MRP ₹251 | 17% off | Tag: Starter Pick | Image: local webp image | Link: https://link.amazon/B0aHPhLL7
- **Placeholder slots to research/replace:**
  - `mascara-ph-3` | temporary: Brand 3 — Mascara Pick 3 | ₹499 / MRP ₹699 / 29% off

### 15. Step 15: Prep Lips — Lip Balm (`lip-balm`)
- Intro: Keep lips soft and hydrated before color.
- Current: **2 existing** + **4 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `ed-lip-balm` | **Maybelline** — Baby Lips Color Changing Lip Balm (Pink Bloom) | Check price | MRP N/A | N/A | Tag: Everyday Pick | Image: local webp image | Link: https://link.amazon/B06ItAIt6
  - `st-lip-balm` | **Maybelline** — Baby Lips Lip Balm - Cherry Kiss (4g, Buy 1 Get 1) | ₹189 | MRP ₹227 | 17% off | Tag: Starter Pick | Image: local webp image | Link: https://link.amazon/B0f3JqZ2b
- **Placeholder slots to research/replace:**
  - `lip-balm-ph-1` | temporary: Nivea — Original Care Lip Balm (4.8g) | ₹199 / MRP ₹249 / 20% off
  - `lip-balm-ph-2` | temporary: Laneige — Lip Sleeping Mask (20g) | ₹1,350 / MRP ₹1,600 / 16% off
  - `lip-balm-ph-3` | temporary: Dot & Key — Vitamin C+E Lip Balm SPF 50 (12g) | ₹249 / MRP ₹299 / 17% off
  - `lip-balm-ph-4` | temporary: The Body Shop — Lip Butter (10ml) | ₹595 / MRP ₹750 / 21% off

### 16. Step 16: Lip Color — Lipstick & Lip Tint (`lipstick-lip-tint`)
- Intro: Finish with lip color that matches your mood.
- Current: **3 existing** + **3 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `tr-lip-oil` | **Etude** — Dear Darling Oil Tint (06 Pink Oil, 4.2ml) | ₹600 | MRP ₹750 | 20% off | Tag: Trending · Nov 2026 | Image: local webp image | Link: https://link.amazon/B019J3PvV
  - `pg-vinyl-ink` | **Maybelline** — SuperStay Vinyl Ink Liquid Lipstick (Witty) | ₹466 | MRP ₹559 | 17% off | Tag: Glam Pick | Image: local webp image | Link: https://link.amazon/B00ZsyP8J
  - `wf-liquid-lip` | **Lakmé** — Forever Matte Liquid Lip Colour (Wine Touch, 5.6ml) | ₹228 | MRP ₹319 | 29% off | Tag: Wedding Pick | Image: local webp image | Link: https://link.amazon/B05eel6oU
- **Placeholder slots to research/replace:**
  - `lipstick-lip-tint-ph-1` | temporary: MARS — Creamy Matte Lipstick (3.2g) | ₹199 / MRP ₹299 / 33% off
  - `lipstick-lip-tint-ph-2` | temporary: Maybelline — SuperStay Matte Ink Liquid Lipstick (5ml) | ₹699 / MRP ₹849 / 18% off
  - `lipstick-lip-tint-ph-3` | temporary: M.A.C — Matte Lipstick (3g) | ₹2,150 / MRP ₹2,450 / 12% off

### 17. Step 17: Lock In — Setting Spray (`setting-spray`)
- Intro: Seal your look so it stays fresh longer.
- Current: **2 existing** + **4 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `tt-fixer-renee` | **RENEE** — Bollywood Filter Blurring Setting Spray (100ml) | ₹499 | MRP N/A | N/A | Tag: Tool Pick | Image: local webp image | Link: https://link.amazon/B0ioIDQcV
  - `tt-fixer-faces` | **FACES CANADA** — Ultime Pro Makeup Fixer (100ml) | ₹499 | MRP N/A | N/A | Tag: Tool Pick | Image: local webp image | Link: https://link.amazon/B0a2NOeU0
- **Placeholder slots to research/replace:**
  - `setting-spray-ph-3` | temporary: Urban Decay — All Nighter Setting Spray (118ml) | ₹3,200 / MRP ₹3,800 / 16% off
  - `setting-spray-ph-4` | temporary: M.A.C — Fix+ Setting Spray (100ml) | ₹2,400 / MRP ₹2,800 / 14% off
  - `setting-spray-ph-5` | temporary: Brand 5 — Setting Spray Pick 5 | ₹499 / MRP ₹699 / 29% off
  - `setting-spray-ph-6` | temporary: Brand 6 — Setting Spray Pick 6 | ₹499 / MRP ₹699 / 29% off

### 18. Step 18: Tools — Makeup Tools (`makeup-tools`)
- Intro: Tools that make application easier and cleaner.
- Current: **4 existing** + **2 placeholders** = **6** slots
- **Existing preserved products (keep ID/image/link/price unless clearly justified replacement):**
  - `tt-curler` | **Vega** — Eyelash Curler (EC-02) | ₹499 | MRP N/A | N/A | Tag: Tool Pick | Image: local webp image | Link: https://link.amazon/B06LnOEez
  - `tt-blotting` | **Generic** — Face Blotting Paper (100pcs, with Mirror & Puff) | ₹499 | MRP N/A | N/A | Tag: Tool Pick | Image: local webp image | Link: https://link.amazon/B03zmZhzC
  - `tt-brush` | **Artist's Arsenal** — Angular Buffing Brush (Golden) | ₹499 | MRP N/A | N/A | Tag: Tool Pick | Image: local webp image | Link: https://link.amazon/B0c6ZEaHf
  - `tt-sponge` | **Omidazzle** — Ultra Soft Professional Blender Set (Set of 4) | ₹499 | MRP N/A | N/A | Tag: Tool Pick | Image: local webp image | Link: https://link.amazon/B05mmDFfX
- **Placeholder slots to research/replace:**
  - `makeup-tools-ph-5` | temporary: Brand 5 — Makeup Tools Pick 5 | ₹499 / MRP ₹699 / 29% off
  - `makeup-tools-ph-6` | temporary: Brand 6 — Makeup Tools Pick 6 | ₹499 / MRP ₹699 / 29% off

## 6) What the research AI should produce
For each placeholder slot, suggest a real Amazon.in product. You may also suggest better options for a category, but clearly mark whether it replaces an existing preserved product or a placeholder.

### Required fields per product
- `replaces_id`: existing placeholder/product ID to replace, or `null` if additive
- `id`: stable slug id (lowercase-hyphen)
- `brand`
- `name`: full product name, include size/shade/variant where useful
- `why`: one short practical reason (1 line)
- `tag`: one of `Budget Pick`, `Bestseller`, `Trending`, `Premium Pick`, `Editor Pick`, `Beginner Pick`, `Long Wear`, `Waterproof` (or similar short tag)
- `priceLabel`: e.g. `₹499`
- `mrpLabel`: e.g. `₹699`
- `discountLabel`: e.g. `29% off` (or `Approx. 29% off` if estimated)
- `amazon_url`: prefer `https://www.amazon.in/dp/<ASIN>`; search URL acceptable if marked
- `asin`: ASIN if known, else empty string
- `image_url`: product image URL if confidently available, else `null`
- `confidence`: `high` / `medium` / `low` for price+availability
- `notes`: optional (shade picked, variant, availability caveat)

### Research rules
- Amazon.in only.
- Prioritize popular, well-reviewed, widely available products in India.
- Cover budget, mid, and premium options in each category where sensible.
- Keep variant/shade practical for Indian shoppers; if many shades, pick a popular default and note it.
- Avoid duplicates across categories unless genuinely multi-use; place in most relevant step.
- Do not invent fake ratings/reviews/badges/stock claims.
- **Every product must have price, MRP, discount.** If exact live values are uncertain, give best realistic estimate and mark in `confidence`/`notes`; do not leave blank.
- Prefer current, active products; avoid obviously discontinued listings.

## 7) Expected JSON output shape
```json
{
  "generated_at": "YYYY-MM-DD",
  "currency": "INR",
  "source": "amazon.in research",
  "categories": [
    {
      "slug": "cleanser",
      "title": "Cleanser",
      "products": [
        {
          "replaces_id": "cleanser-ph-1",
          "id": "cleanser-cetaphil-gentle-125",
          "brand": "Cetaphil",
          "name": "Gentle Skin Cleanser (125ml)",
          "why": "Gentle daily cleanser suitable for most skin types.",
          "tag": "Budget Pick",
          "priceLabel": "₹333",
          "mrpLabel": "₹399",
          "discountLabel": "17% off",
          "amazon_url": "https://www.amazon.in/dp/ASIN",
          "asin": "B00...",
          "image_url": "https://...",
          "confidence": "high",
          "notes": ""
        }
      ]
    }
  ]
}
```

## 8) Preservation rule (important)
The **36 existing preserved products** listed above already have working local images and tracked/affiliate Amazon links in the live codebase. **Do not replace their affiliate links or images unless explicitly instructed.** You may suggest alternatives in `notes`, but by default keep those preserved IDs in place.

## 9) Old occasion sections (end-of-page info only)
These are no longer product-card sections; they are quick guides at the bottom of the page:
- **Trending Now** — buzz-worthy picks; refresh monthly from trends/best-seller signals.
- **5-Minute Everyday** — quick fresh routine.
- **Party Glam** — high-impact night/event look.
- **Wedding & Festive** — long-wear, photo-friendly, humidity-aware.
- **Starter Basics** — simple beginner kit.
- **Tools & Touch-Ups** — application/maintenance helpers.

Main catalog must stay organized by the 18 routine steps.