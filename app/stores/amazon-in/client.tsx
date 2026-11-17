"use client";

import { useState } from "react";
import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import { api } from "@/lib/api";
import { formatDiscountHeading } from "@/lib/format";
import { ArrowUpRight, ChevronDown, BadgeCheck } from "lucide-react";
import Image from "next/image";
import type { CouponPublic } from "@/lib/types";

const FALLBACK_URL = "https://www.amazon.in";

interface HomeKitchenPick {
  name: string;
  badge: string;
  url: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
}

/** Curated Home & Kitchen items — editor's pick, chosen for genuine usefulness. */
const HOME_KITCHEN_PICKS: HomeKitchenPick[] = [
  {
    name: "Happi Planet Magic Eraser | Pack of 4 | No Scratch Multi-Surface Cleaning Sponge",
    badge: "Useful pick — cleaning",
    url: "https://link.amazon/B0aLjz4py",
    image: "/stores/home-kitchen/happi-planet-magic-eraser.jpg",
    imageWidth: 500,
    imageHeight: 500,
  },
  {
    name: "Scotch-Brite Scrub Sponge | Pack of 3 — everyday utensil cleaning",
    badge: "Useful pick — kitchen",
    url: "https://link.amazon/B05dkGhsf",
    image: "/stores/home-kitchen/scotch-brite-scrub-sponge.jpg",
    imageWidth: 500,
    imageHeight: 500,
  },
  {
    name: "ShineXPro Microfiber Cleaning Cloth Roll | 20 pcs | Ultra-absorbent, washable",
    badge: "Useful pick — cleaning cloth",
    url: "https://www.amazon.in/ShineXPro-Microfiber-Cleaning-Cloth-Roll/dp/B0FS1VB862?pd_rd_w=PzNgP&content-id=amzn1.sym.b908f532-cbe7-4274-8b24-b671acc58bd2&pf_rd_p=b908f532-cbe7-4274-8b24-b671acc58bd2&pf_rd_r=NGJDWMGF74DBC4GWTNAM&pd_rd_wg=2GQjb&pd_rd_r=83637cff-77e6-4ca4-ba9f-e56aaf6afb04&pd_rd_i=B0FS1VB862&th=1&linkCode=ll2&tag=durza02-21&linkId=61b2163cf9a498bd24554c01a3e1c94a&ref_=as_li_ss_tl",
    image: "/stores/home-kitchen/shinexpro-microfiber-cleaning-cloth.jpg",
    imageWidth: 500,
    imageHeight: 500,
  },
  {
    name: "Zulaxy Photo Frame Hooks for Wall Without Drilling | 10 Pack Self Adhesive",
    badge: "Useful pick — wall hooks",
    url: "https://link.amazon/B061JtXXr",
    image: "/stores/home-kitchen/zulaxy-photo-frame-hooks.jpg",
    imageWidth: 500,
    imageHeight: 500,
  },
  {
    name: "WaterScience Replacement Cartridge for CLEO Shower & Tap Filter | Borewell water",
    badge: "Useful pick — water filter",
    url: "https://link.amazon/B04uEUk26",
    image: "/stores/home-kitchen/waterscience-cleo-shower-filter.jpg",
    imageWidth: 500,
    imageHeight: 500,
  },
  {
    name: "Gala Sponge Wipe for Kitchen Cleaning | Biodegradable Cellulose | 5 Pcs",
    badge: "Useful pick — kitchen sponge",
    url: "https://link.amazon/B09kXLwZk",
    image: "/stores/home-kitchen/gala-sponge-wipe.jpg",
    imageWidth: 500,
    imageHeight: 500,
  },
  {
    name: "GM 3060 Extension Board 10A | 2M Cord | Master Switch + Safety Shutter",
    badge: "Useful pick — extension board",
    url: "https://link.amazon/B0iLjOpdt",
    image: "/stores/home-kitchen/gm-3060-extension-board.jpg",
    imageWidth: 500,
    imageHeight: 500,
  },
  {
    name: "Scotch-Brite Twin Bucket Spin Mop | Easy Wring & Rinse | 360° Adjustable Handle",
    badge: "Useful pick — spin mop",
    url: "https://link.amazon/B0evjuTT8",
    image: "/stores/home-kitchen/scotch-brite-spin-mop.jpg",
    imageWidth: 500,
    imageHeight: 500,
  },
];

interface SectionDef {
  id: string;
  title: string;
  lead: string;
  picks: Array<{ id: string; badge?: string }>;
}

interface ProteinPick {
  badge: string;
  brand: string;
  name: string;
  blurb: string;
  bestFor: string;
  url: string;
  image?: string;
}

/** The three health products the Durza desk stands behind — hand-picked, no feed. */
const PROTEIN_PICKS: ProteinPick[] = [
  {
    badge: "ISOLATE WHEY — UK INFORMED CHOICE",
    brand: "BigMuscles Nutrition",
    name: "Premium Gold Whey [2 kg, Rich Chocolate]",
    blurb:
      "25 g protein per ~37 g scoop with 11 g EAA and ProHydrolase enzyme technology — a disclosed, isolate-first blend with no amino spiking. Batches are tested monthly under Informed Choice (UK) and every pack carries a batch-verification code.",
    bestFor: "Closing the protein gap on training days — the post-workout or breakfast shake.",
    url: "https://link.amazon/B02k8S0KF",
    image: "/stores/amazon-in/bigmuscles-premium-gold-whey.png",
  },
  {
    badge: "26 G PROTEIN PER 100 G — NO ADDED SUGAR",
    brand: "Yoga Bar",
    name: "High Protein Oats 1 kg, Pack of 2 [Dark Chocolate]",
    blurb:
      "26 g protein per 100 g from a whey + soya protein blend with chia, sunflower and pumpkin seeds, probiotics (Bacillus coagulans) and zero added sugar — a training-day breakfast that eats like dessert.",
    bestFor: "A quick breakfast on gym days — 26 g of protein before 9 am without a shaker.",
    url: "https://link.amazon/B05uwpEeL",
    image: "/stores/amazon-in/yogabar-high-protein-oats-dark-chocolate.png",
  },
  {
    badge: "CREAMP — TRUSTIFIED CERTIFIED",
    brand: "MuscleBlaze",
    name: "Micronised Creatine Monohydrate CreAMP Powder, 100 g",
    blurb:
      "3 g micronised creatine monohydrate per scoop (~33 servings per 100 g pouch) with CreAbsorb technology and third-party Trustified certification — plain creatine, done right, in the safest starter size.",
    bestFor: "Strength and power blocks — progressive overload on lifting days.",
    url: "https://link.amazon/B0iU3vLmN",
    image: "/stores/amazon-in/creamp.jpg",
  },
];

interface PersonalDevice {
  badge: string;
  brand: string;
  name: string;
  blurb: string;
  bestFor: string;
  url: string;
  image?: string;
}

/** Three personal-care devices that earn their shelf — hand-picked, no feed. */
const PERSONAL_DEVICES: PersonalDevice[] = [
  {
    badge: "FOOT & NAIL CARE — LED + 3 SPEEDS",
    brand: "Automatic · USB rechargeable",
    name: "Automatic Electric Nail Clipper & Grinder with LED Light & 3 Speed Settings",
    blurb:
      "LED-lit cutting window, 3 speed settings and a USB-rechargeable grinding/shaving platform — the gentle, lamp-lit way to trim nails for adults, kids and seniors who find a manual clipper a struggle.",
    bestFor: "Thick nails, shaky hands and anyone skipping trims because they hurt.",
    url: "https://link.amazon/B0fA1dltP",
    image: "/stores/amazon-in/nail-clipper.jpg",
  },
  {
    badge: "CE & USFDA — AUDIO-VISUAL ALARM",
    brand: "Dr Trust USA · Signature Series 201 (Midnight Black)",
    name: "Signature Series Fingertip Pulse Oximeter with Audio Visual Alarm",
    blurb:
      "SpO2 and pulse rate on a large rotatable OLED, with an audio-visual alarm when readings drop, perfusion-index strength gauge and automatic shut-off. Splash-resistant for bedside, travel and high-altitude use.",
    bestFor: "Elderly parents at home — saturation at a glance, no guessing.",
    url: "https://link.amazon/B0ceYJazW",
    image: "/stores/amazon-in/drtrust-oximeter.jpg",
  },
  {
    badge: "BP-02 — LARGE LCD, ONE BUTTON",
    brand: "Dr. Morepen",
    name: "Blood Pressure Monitor Model BP-02",
    blurb:
      "Fully automatic blood pressure monitoring on a large dedicated LCD — systolic, diastolic and pulse/minute, with per-session memory and a colour-coded category scale printed on the panel. No cuff-inflating by hand, ever.",
    bestFor: "Weekly home tracking — same time, same arm, seated, back supported.",
    url: "https://link.amazon/B08Sl3rmX",
    image: "/stores/amazon-in/dr-morepen-bp02.jpg",
  },
];

interface CuratedPick {
  badge: string;
  brand: string;
  name: string;
  blurb: string;
  bestFor: string;
  url: string;
  image?: string;
  imageAlt?: string;
}

/** Household things — hand-picked, no feed. */
const HOUSEHOLD_PICKS: CuratedPick[] = [
  {
    badge: "DRY & WET WASTE — 180 COUNT",
    brand: "Amazon Brand · Presto!",
    name: "Presto! Garbage Bags | Medium | 30 Bags × 6 Rolls | 19 × 21 Inches | Black",
    blurb:
      "Medium oxo-biodegradable garbage bags sized for everyday kitchen and bathroom bins — 180 bags across six rolls, suited to both dry and wet waste without tearing at the seams.",
    bestFor: "Daily bin liners where you want a known roll count and a no-fuss medium size.",
    url: "https://link.amazon/B012CLFpv",
    image: "/stores/amazon-in/presto-garbage-bags.jpg",
    imageAlt: "Amazon Brand Presto! medium garbage bags, 180 count, black",
  },
  {
    badge: "6-PIECE SET — TRANSPARENT WINDOW",
    brand: "Homestrap · Shark Tank featured",
    name: "Set of 6 Non-Woven Printed Saree Cover / Wardrobe Organizer (Grey, 45 × 33 × 22 cm)",
    blurb:
      "Non-woven printed saree and cloth storage covers with a transparent window so you can see what’s inside without unzipping — six pieces to sort a shelf or wardrobe in one go.",
    bestFor: "Seasonal sarees, lehengas and occasion wear you want dust-free but visible.",
    url: "https://link.amazon/B00kmawoo",
    image: "/stores/amazon-in/homestrap-saree-covers.jpg",
    imageAlt: "Homestrap set of 6 non-woven printed saree covers with transparent window, grey",
  },
  {
    badge: "1800 W — DUAL TEMPERATURE",
    brand: "BLACK+DECKER",
    name: "KX1800-B1 Corded Heat Gun (3 Metre Cable, Orange & Black)",
    blurb:
      "High-speed 1800 W heat gun with dual temperature settings for stripping paint, drying coats, remelting adhesives and shrink-wrapping — corded with a 3-metre cable for reach around a room.",
    bestFor: "Paint removal, heat-shrink tubing and loosening old adhesive on DIY jobs.",
    url: "https://link.amazon/B09AR7wfc",
    image: "/stores/amazon-in/black-decker-kx1800-heat-gun.jpg",
    imageAlt: "BLACK+DECKER KX1800-B1 1800 W heat gun",
  },
  {
    badge: "50-PIECE — TiN-COATED",
    brand: "Bosch",
    name: "X-Line 50-Piece Drill & Screwdriver Bit Set",
    blurb:
      "An all-in-one DIY kit: 11 metal drill bits, 6 masonry, 5 wood, spade bits, 18 screwdriver bits, countersink, knife and nutsetters — TiN-coated for longer edge life across common home materials.",
    bestFor: "A first proper drill-and-drive kit for shelves, frames and weekend fixes.",
    url: "https://link.amazon/B09hu4GMq",
    image: "/stores/amazon-in/bosch-xline-50.jpg",
    imageAlt: "Bosch X-Line 50-piece TiN-coated drill and screwdriver bit set",
  },
];

/** Kitchen appliances — hand-picked, no feed. */
const KITCHEN_APPLIANCE_PICKS: CuratedPick[] = [
  {
    badge: "500 W — 3 JARS & 2 BLADES",
    brand: "NutriPro · 1 Year Warranty",
    name: "Juicer Mixer Grinder – Smoothie Maker (Gold)",
    blurb:
      "500-watt juicer-mixer-grinder built around smoothie making — supplied with 3 jars and 2 blades in a gold finish, backed by a 1-year warranty as stated on the listing.",
    bestFor: "Daily smoothies and quick chutneys without a bulky countertop footprint.",
    url: "https://link.amazon/B04HvT3G7",
    image: "/stores/amazon-in/nutripro-jmg.jpg",
    imageAlt: "NutriPro juicer mixer grinder smoothie maker, 500 W, 3 jars and 2 blades, gold",
  },
  {
    badge: "PORTABLE — NON-STICK ROUND",
    brand: "Mini electric waffle iron",
    name: "Mini Waffle Maker | Portable Non-Stick Waffle Iron (Red)",
    blurb:
      "A compact, plug-in round waffle iron with a non-stick plate — sized for individual waffles, pancakes, cookies, eggs, paninis and quick breakfast snacks.",
    bestFor: "Single-serve breakfasts and snack waffles in a small kitchen or hostel room.",
    url: "https://link.amazon/B08tyKqCH",
    image: "/stores/amazon-in/mini-waffle-maker-red.jpg",
    imageAlt: "Portable red mini round waffle maker, non-stick plate",
  },
  {
    badge: "10 KG CAPACITY — LCD DISPLAY",
    brand: "Aliston Atom · SF400 / A121",
    name: "Atom Kitchen Weight Machine Digital Scale",
    blurb:
      "Digital kitchen scale with LCD display rated to 10 kg, aimed at home baking, cooking and portion control — sold with a 6-month manufacturer warranty as stated on the listing (colour may vary).",
    bestFor: "Baking by weight, meal-prep portions and dialling in coffee or dough ratios.",
    url: "https://link.amazon/B0gPMbSmL",
    image: "/stores/amazon-in/atom-sf400-a121-kitchen-scale.jpg",
    imageAlt: "Atom SF400/A121 digital kitchen weighing scale, 10 kg capacity",
  },
  {
    badge: "CORDLESS — 6 MOULDS",
    brand: "Pigeon · Instamami",
    name: "Automatic Noodle Maker with 6 Moulds | Cordless Type-C Idiyappam & Pasta Maker (Cream)",
    blurb:
      "A portable, handheld cordless noodle press that runs on Type-C charging and ships with 6 moulds — presses idiyappam, noodles and pasta shapes without being tethered to a socket.",
    bestFor: "Fresh idiyappam and quick pasta shapes when you don’t want a full machine out.",
    url: "https://link.amazon/B0b5B8P4l",
    image: "/stores/amazon-in/pigeon-instamami-noodle-maker.jpg",
    imageAlt: "Pigeon Instamami cordless automatic noodle and idiyappam maker with moulds",
  },
  {
    badge: "HEAT SEALER — PORTABLE",
    brand: "Amazer",
    name: "Mini Sealing Machine for Food Packets / Plastic Bags (Assorted)",
    blurb:
      "A pocket-size heat sealer for reclosing snack packets and plastic bags at home — portable and hand-held, aimed at keeping opened food packs sealed between uses (colour assorted).",
    bestFor: "Resealing chips, namkeen and freezer bags without hunting for clips.",
    url: "https://link.amazon/B09AEQ7RS",
    image: "/stores/amazon-in/amazer-mini-sealer.jpg",
    imageAlt: "Amazer mini heat sealing machine for food packets and plastic bags",
  },
];

/** Work-from-home picks — hand-picked, images to be added later. */
const WORK_FROM_HOME_PICKS: CuratedPick[] = [
  {
    badge: "1080P — DUAL MICROPHONES",
    brand: "Logitech",
    name: "C920 HD Pro Webcam — 1080p Full HD Streaming Camera (Black)",
    blurb:
      "Full HD 1080p webcam with autofocus and dual built-in microphones for widescreen video calling and recording — compatible with desktop PCs and laptops.",
    bestFor: "Clear video calls, meetings and basic streaming without a separate mic.",
    url: "https://link.amazon/B07JIGYtz",
    image: "/stores/amazon-in/logitech-c920.jpg",
    imageAlt: "Logitech C920 HD Pro Webcam, 1080p full HD",
  },
  {
    badge: "USB — ON-BOARD CONTROLS",
    brand: "HyperX",
    name: "QuadCast 2 USB Microphone for Gaming, Streaming and Podcasting (Black)",
    blurb:
      "USB microphone with on-board controls, LED lighting, quick-release shock mount and built-in arm/stand mount — works with PC, Mac, PS5 and PS4 over USB-C.",
    bestFor: "Streaming, podcasts and calls where voice clarity matters more than a laptop mic.",
    url: "https://link.amazon/B0aBYLzMb",
    image: "/stores/amazon-in/hyperx-quadcast2.jpg",
    imageAlt: "HyperX QuadCast 2 USB microphone, black",
  },
  {
    badge: "2 PCs — 4 PORTS",
    brand: "UGREEN",
    name: "4 Ports USB 2.0 Switch (2 in 4 Out) with 2 USB 2.0 Cables",
    blurb:
      "USB 2.0 sharing switch that lets two PCs share up to four peripherals — mouse, keyboard, scanner, printer, USB stick or hard drive. Compatible with Windows and Mac OS 8.6 and above.",
    bestFor: "Swapping one keyboard/mouse set between a work laptop and a personal PC.",
    url: "https://link.amazon/B0b3cEHEY",
    image: "/stores/amazon-in/ugreen-usb-switch.jpg",
    imageAlt: "UGREEN 4-port USB 2.0 switch for 2 PCs",
  },
  {
    badge: "FULL-SIZE — SPILL RESISTANT",
    brand: "Dell",
    name: "KB216 Wired Multimedia Keyboard",
    blurb:
      "Full-size wired keyboard with USB plug-and-play, chiclet keys, spill resistance and hot keys for volume, mute, play/pause and track controls — with three indicator lights.",
    bestFor: "A reliable, no-fuss wired keyboard for long typing sessions at a desk.",
    url: "https://link.amazon/B02Wdjg8G",
    image: "/stores/amazon-in/dell-kb216.jpg",
    imageAlt: "Dell KB216 wired multimedia keyboard",
  },
  {
    badge: "13–30 INCH — VESA MOUNT",
    brand: "Amazon Basics",
    name: "Single Monitor Arm — Height Adjustable VESA Desk Mount (Steel, Black)",
    blurb:
      "Height-adjustable single monitor arm with cable management, full-motion tilt and 360° rotation — fits 13–30 inch monitors via VESA desk mounting.",
    bestFor: "Freeing desk space and getting your screen to eye level on a fixed table.",
    url: "https://link.amazon/B05KtbpPp",
    image: "/stores/amazon-in/amazon-basics-monitor-arm.jpg",
    imageAlt: "Amazon Basics single monitor arm, height adjustable VESA desk mount",
  },
  {
    badge: "HIGH BACK — ERGONOMIC",
    brand: "Green Soul",
    name: "Vienna Premium Leatherette Office Chair (Black & Tan)",
    blurb:
      "High-back ergonomic executive chair with leatherette upholstery, a spacious cushion seat and a heavy-duty metal base — designed for home-office use.",
    bestFor: "All-day sitting where a basic chair starts to complain before you do.",
    url: "https://link.amazon/B07beeAUB",
    image: "/stores/amazon-in/green-soul-vienna-chair.jpg",
    imageAlt: "Green Soul Vienna premium leatherette high-back office chair, black and tan",
  },
];

const SECTIONS: SectionDef[] = [
  {
    id: "components",
    title: "PC components & upgrades",
    lead: "SSDs, RAM and the bits a desktop still needs first. No flavour, no filler — just the upgrades that matter.",
    picks: [
      { id: "1b3136bc-8686-46fc-83d8-5ebf863e7793", badge: "NEW BUILD" },
      { id: "38fd4634-9d63-429f-a072-bce0f2643420", badge: "230 GB TIER" },
      { id: "556fa97a-ca82-449c-b000-d2a190a0aaaa", badge: "3200MHz" },
      { id: "4f015458-2f9c-45f1-a645-450341661345", badge: "128GB MICROSD" },
      { id: "43bc56d4-66bd-46e5-bf02-9718fff177dd", badge: "COLD STORAGE" },
    ],
  },
  {
    id: "audio",
    title: "Audio — headphones and speakers",
    lead: "Noise-killing travel cans, monitor-grade wired sets and honest portables. No audiophile snobbery, just what sounds good on a monthly salary.",
    picks: [
      { id: "4af2ea87-0277-43d3-b41c-069dfa37e51e", badge: "BATTERY-LEADER" },
      { id: "e00fb12c-a8e2-43da-974c-3b40a82b020e", badge: "TRAVEL PICK" },
      { id: "bec5e778-f291-43e6-b1d8-96be05d0ddd4", badge: "BUDGET MONITOR" },
      { id: "9794f9c2-5dd2-4506-b57f-2979f3c5bcf1", badge: "NEED FOR SPEED" },
      { id: "db2cea40-5384-454b-ba8f-df14e769e3e0", badge: "FOLDABLE" },
    ],
  },
  {
    id: "living",
    title: "Living room — TV, Echo & Kindle",
    lead: "Streamer boxes, smart displays and a Kindle. Pick one or pick them all — they all sit behind the same remote anyway.",
    picks: [
      { id: "de5c0687-7676-4e3a-b0df-c60040cfd0c8", badge: "NO-CLUTTER PICK" },
      { id: "97d92d40-08c8-423d-9827-0cf90cb70236", badge: "BEST-SELLER" },
      { id: "024b4583-d9b4-4419-bf64-74c278a11978", badge: "MOST LOVED" },
      { id: "b6455df2-da9a-41ab-bbe0-8dcf134f6141", badge: "PAPER-LIKE" },
      { id: "aea66452-612c-4fab-83b6-a442bb1decbc", badge: "TV UPGRADE" },
    ],
  },
  {
    id: "personal-care",
    title: "Personal care — tested clean",
    lead: "Indian skincare that doesn't silt its way into your bathroom cabinet — three months of gentle, effective mornings included.",
    picks: [
      { id: "c28b016f-7671-45f2-8a32-bb204106c02d", badge: "NIACINAMIDE 10" },
      { id: "fd3de9e5-d266-45c3-bac1-507ecc3ccf35", badge: "2% SALICYLIC" },
      { id: "fe232386-d3af-4679-a4c1-e20c02819dcc", badge: "APPLE CIDER" },
      { id: "0576e2ba-ee9d-483e-9d8a-233e3aa474e4", badge: "ARGAN OIL" },
    ],
  },
  {
    id: "luggage",
    title: "Luggage & travel",
    lead: "Cabin trolleys and backpacks India trusts past airport security and onto trains. Sizes are tested against Indian airlines' cabin limits.",
    picks: [
      { id: "f2e50869-b678-4e6e-83de-d24079eee07f", badge: "FAMILY FAVOURITE" },
      { id: "6bfea447-726f-41b1-abaa-2862ff04e1c8", badge: "CABIN-SIZE" },
      { id: "4e86264d-c654-4f8c-9c49-6f854d852653", badge: "CABIN TOO" },
      { id: "58e49ea9-87b5-477f-b656-1bf9e50c6d8a", badge: "LAPTOP BAG" },
    ],
  },
  {
    id: "home",
    title: "Kitchen & home must-haves",
    lead: "Cookware, hot-water storage, mixers and the things people replace after Indian summers finally win.",
    picks: [
      { id: "488ccc0e-f9cc-4517-a6b3-54cb2800ddff", badge: "HOT WATER" },
      { id: "569a132f-075e-4861-9a46-71925659a856", badge: "4-PIECE SET" },
      { id: "4136bd9f-5c87-4859-aabb-f3ffe3661adc", badge: "PRESSURE CLASSIC" },
      { id: "610ba4c0-77a6-404a-a114-d2274313c4e5", badge: "3-JAR GRINDER" },
      { id: "4697b0cd-f1d6-4e8b-8e4d-c7cb95871746", badge: "BEACH-SIDE BLANKET" },
    ],
  },
  {
    id: "fitness",
    title: "Fitness & home gym",
    lead: "Dumbbells, mats and ropes — the Indian home gym, built for one corner, one budget.",
    picks: [
      { id: "981c4300-aecc-4044-8d92-35e3b9ff4b3c", badge: "20KG KIT" },
      { id: "f8424dc0-7864-4912-9b07-5c3eff346238", badge: "COMBO UP" },
      { id: "40a08e20-e77f-4570-bf3e-73da1ec0195f", badge: "WITH STRAP" },
      { id: "206403a0-16c1-4aa9-988c-b580f920697c", badge: "WITH BEARINGS" },
      { id: "de8c6b0a-4087-42c3-aae7-bdf46ea31006", badge: "COURT READY" },
    ],
  },
];

interface Props {
  offers: CouponPublic[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

const cue = (offers: CouponPublic[], id: string): CouponPublic | undefined =>
  offers.find((o) => o.id === id);

export default function AmazonStorePage({
  offers,
  faqs,
  stats,
  heroImageUrl,
  offerCount,
  storeUrl,
}: Props) {
  const topOffer = offers[0] ?? null;
  const baseUrl = storeUrl ?? FALLBACK_URL;
  const domain = new URL(baseUrl).hostname.replace(/^www\./, "");
  const ctaHref = `/go/amazon-in?src=store-page`;

  const sectioned = SECTIONS.map((s) => ({
    ...s,
    items: s.picks
      .map((p) => {
        const o = cue(offers, p.id);
        return o ? { o, badge: p.badge } : null;
      })
      .filter(Boolean) as Array<{ o: CouponPublic; badge?: string }>,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 lg:pb-8">
      <StoreHero
        name="Amazon"
        heading="Amazon — hand-picked best"
        subtitle="Work-from-home, components, audio, kitchen, home gym, personal care and health — curated picks from Amazon India, every card brand-backed and professionally chosen."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        ctaLabel="Go to Amazon"
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <nav aria-label="Jump to a section" className="mt-6 flex flex-wrap gap-2">
        <a
          href="#health"
          className="inline-flex items-center gap-1.5 rounded-full border border-ledger-line bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-inkblue hover:text-inkblue"
        >
          Health &amp; wellness
          <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
        <a
          href="#personal-care-devices"
          className="inline-flex items-center gap-1.5 rounded-full border border-ledger-line bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-inkblue hover:text-inkblue"
        >
          Personal care devices
          <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
        <a
          href="#household"
          className="inline-flex items-center gap-1.5 rounded-full border border-ledger-line bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-inkblue hover:text-inkblue"
        >
          Household essentials
          <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
        <a
          href="#kitchen-appliances"
          className="inline-flex items-center gap-1.5 rounded-full border border-ledger-line bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-inkblue hover:text-inkblue"
        >
          Kitchen appliances
          <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
        <a
          href="#amazon-home-kitchen-picks"
          className="inline-flex items-center gap-1.5 rounded-full border border-ledger-line bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-inkblue hover:text-inkblue"
        >
          Home &amp; kitchen
          <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
        </a>

        {sectioned.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-ledger-line bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-inkblue hover:text-inkblue"
          >
            {s.title.split("—")[0].trim()}
            <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        ))}
      </nav>

      <section id="health" aria-labelledby="health-heading" className="mt-10 rounded-2xl border border-ledger-line bg-paper-raised p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ledger-line pb-4">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Health &amp; sports nutrition</p>
            <h2 id="health-heading" className="mt-1 font-serif text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Health &amp; wellness essentials
            </h2>
            <p className="mt-1 text-sm leading-6 text-ink-soft">
              The three we would put in this cart first — picked for honest scoop math, real certifications and no-label-mystery ingredients. Every card links straight to the Amazon listing.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-alt px-3 py-1.5 text-xs font-semibold text-ink-soft">
            <BadgeCheck aria-hidden="true" className="h-4 w-4 text-emerald-600" strokeWidth={2} />
            Editor&apos;s picks
          </span>
        </div>

        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {PROTEIN_PICKS.map((pick) => (
            <li key={pick.url}>
              <a
                href={pick.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ledger-line bg-white transition hover:border-inkblue hover:shadow-md"
              >
                {pick.image ? (
                  <span className="relative block aspect-[4/5] w-full overflow-hidden bg-paper-alt">
                    <Image
                      src={pick.image}
                      alt={pick.name}
                      width={700}
                      height={875}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 380px"
                      className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>
                ) : (
                  <span className="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,#241f1d_0%,#0e0c0b_100%)] p-6">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-zinc-500">MuscleBlaze</span>
                    <span className="font-serif text-6xl font-black leading-none tracking-tight text-white">
                      CRE<span className="text-red-600">AMP</span>
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-300">Micronised Creatine Monohydrate</span>
                    <span className="mt-2 rounded-full border border-red-600 bg-red-600/10 px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-red-400">
                      Trustified Certified
                    </span>
                  </span>
                )}
                <span className="flex flex-1 flex-col p-4">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-inkblue">{pick.badge}</span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft/80">{pick.brand}</span>
                  <span className="mt-1 font-serif text-lg font-bold leading-snug text-ink">{pick.name}</span>
                  <span className="mt-2 text-[12px] leading-6 text-ink-soft">{pick.blurb}</span>
                  <span className="mt-3 text-[11px] font-medium leading-5 text-ink-soft/90">
                    <span className="font-semibold text-ink">Best for: </span>
                    {pick.bestFor}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[11px] font-semibold text-inkblue transition-colors group-hover:underline">
                    View on Amazon
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 overflow-x-auto rounded-xl border border-ledger-line">
          <table className="min-w-full divide-y divide-ledger-line bg-white text-left text-[12px] leading-5">
            <thead className="bg-paper-alt">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-ink-soft">Side by side</th>
                <th scope="col" className="px-4 py-2.5 font-semibold text-ink">Premium Gold Whey</th>
                <th scope="col" className="px-4 py-2.5 font-semibold text-ink">High Protein Oats</th>
                <th scope="col" className="px-4 py-2.5 font-semibold text-ink">CreAMP Creatine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ledger-line">
              <tr>
                <th scope="row" className="px-4 py-2 font-medium text-ink-soft">What it is</th>
                <td className="px-4 py-2 text-ink">Whey isolate-first blend, flavoured (Rich Chocolate)</td>
                <td className="px-4 py-2 text-ink">Wholegrain oat cereal with protein blend</td>
                <td className="px-4 py-2 text-ink">Micronised creatine monohydrate, unflavoured</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-2 font-medium text-ink-soft">Per serving (pack label)</th>
                <td className="px-4 py-2 text-ink">25 g protein / 37 g scoop</td>
                <td className="px-4 py-2 text-ink">26 g protein / 100 g oats</td>
                <td className="px-4 py-2 text-ink">3 g creatine / 1 scoop</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-2 font-medium text-ink-soft">Certification</th>
                <td className="px-4 py-2 text-ink">Informed Choice (UK) — monthly batch testing</td>
                <td className="px-4 py-2 text-ink">No third-party badge claimed — check batch on arrival</td>
                <td className="px-4 py-2 text-ink">Trustified certified</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-2 font-medium text-ink-soft">Best for</th>
                <td className="px-4 py-2 text-ink">Training-day protein gap</td>
                <td className="px-4 py-2 text-ink">Breakfast that pulls its weight</td>
                <td className="px-4 py-2 text-ink">Strength and power blocks · ~33 days at 3 g/day</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-2 font-medium text-ink-soft">Think twice if</th>
                <td className="px-4 py-2 text-ink">Heavy dairy intolerance with no lactase support</td>
                <td className="px-4 py-2 text-ink">You dislike a textured cereal bowl</td>
                <td className="px-4 py-2 text-ink">Your doctor flagged kidney concerns — ask first</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[11px] leading-5 text-ink-soft">
          Figures are the brands&apos; own label values, not a lab audit by Durza — scan the pack&apos;s batch/QR code when your order arrives. Nothing on this page shows a price or a “was” anchor: Amazon sets the live figure. Every card is an Amazon Associates link (tag=durza02-21), so a qualifying purchase supports Durza at no extra cost to you. Pregnant, nursing or managing a condition? Talk to your doctor before you start any supplement.
        </p>
      </section>

      <section id="personal-care-devices" aria-labelledby="personal-care-devices-heading" className="mt-10 rounded-2xl border border-ledger-line bg-paper-raised p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ledger-line pb-4">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Home health gadgets</p>
            <h2 id="personal-care-devices-heading" className="mt-1 font-serif text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Personal care devices
            </h2>
            <p className="mt-1 text-sm leading-6 text-ink-soft">
              Three devices that earn the shelf — a lamp-lit way to trim nails, an at-a-glance oxygen clip and a blood-pressure check you can actually run correctly at home.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-alt px-3 py-1.5 text-xs font-semibold text-ink-soft">
            <BadgeCheck aria-hidden="true" className="h-4 w-4 text-emerald-600" strokeWidth={2} />
            Editor&apos;s picks
          </span>
        </div>

        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {PERSONAL_DEVICES.map((device) => (
            <li key={device.url}>
              <a
                href={device.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ledger-line bg-white transition hover:border-inkblue hover:shadow-md"
              >
                {device.image ? (
                  <span className="relative block aspect-[4/5] w-full overflow-hidden bg-white">
                    <Image
                      src={device.image}
                      alt={device.name}
                      width={800}
                      height={708}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 380px"
                      className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>
                ) : device.url.includes("B0fA1dltP") ? (
                  <span className="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,#1c232b_0%,#0c1015_100%)] p-6">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">Foot &amp; nail care</span>
                    <span className="text-center font-serif text-4xl font-black leading-tight text-white">
                      NAIL<span className="text-cyan-400">LIT</span>
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">Electric clipper + grinder</span>
                    <span className="rounded-full border border-cyan-400/60 bg-cyan-400/10 px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
                      LED · 3 speeds · USB
                    </span>
                  </span>
                ) : (
                  <span className="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,#19141c_0%,#0b090e_100%)] p-6">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-zinc-500">Dr Trust USA</span>
                    <span className="text-center font-serif text-4xl font-black leading-tight text-white">
                      SIGNATURE<span className="text-red-500">201</span>
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-300">Oxygen clip · Midnight Black</span>
                    <span className="rounded-full border border-red-500/60 bg-red-500/10 px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-red-400">
                      CE &amp; USFDA Approved
                    </span>
                  </span>
                )}
                <span className="flex flex-1 flex-col p-4">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-inkblue">{device.badge}</span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft/80">{device.brand}</span>
                  <span className="mt-1 font-serif text-[17px] font-bold leading-snug text-ink">{device.name}</span>
                  <span className="mt-2 text-[12px] leading-6 text-ink-soft">{device.blurb}</span>
                  <span className="mt-3 text-[11px] font-medium leading-5 text-ink-soft/90">
                    <span className="font-semibold text-ink">Best for: </span>
                    {device.bestFor}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[11px] font-semibold text-inkblue transition-colors group-hover:underline">
                    View on Amazon
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 overflow-x-auto rounded-xl border border-ledger-line">
          <table className="min-w-full divide-y divide-ledger-line bg-white text-left text-[12px] leading-5">
            <thead className="bg-paper-alt">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-ink-soft">Read this before you buy</th>
                <th scope="col" className="px-4 py-2.5 font-semibold text-ink">Nail Clipper &amp; Grinder</th>
                <th scope="col" className="px-4 py-2.5 font-semibold text-ink">Pulse Oximeter 201</th>
                <th scope="col" className="px-4 py-2.5 font-semibold text-ink">BP-02 Monitor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ledger-line">
              <tr>
                <th scope="row" className="px-4 py-2 font-medium text-ink-soft">What it reads</th>
                <td className="px-4 py-2 text-ink">How cleanly a nail is trimmed — grind and cut</td>
                <td className="px-4 py-2 text-ink">SpO2 % · pulse rate · perfusion index</td>
                <td className="px-4 py-2 text-ink">SBP / DBP / pulse per minute</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-2 font-medium text-ink-soft">Watch out for</th>
                <td className="px-4 py-2 text-ink">Grind in short passes — never force against the growth line</td>
                <td className="px-4 py-2 text-ink">Cold fingers read lower — warm up and sit still, 6-8 seconds</td>
                <td className="px-4 py-2 text-ink">One reading proves nothing — track weekly, same arm, same time</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-2 font-medium text-ink-soft">Not a substitute for</th>
                <td className="px-4 py-2 text-ink">Foot clinic care for ingrown nails and diabetic foot checks</td>
                <td className="px-4 py-2 text-ink">An ER or your physician reviewing persistent low SpO2</td>
                <td className="px-4 py-2 text-ink">Your doctor&apos;s diagnosis or medication plan</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[11px] leading-5 text-ink-soft">
          Screening, not diagnosis — bring your readings to your doctor, especially before changing medication. Prices and availability live on Amazon; every card is an Amazon Associates link (tag=durza02-21) and Durza earns a referral at no extra cost to you. Devices here show the listing&apos;s own blurb, not an independent lab audit.
        </p>
      </section>

      <section id="household" aria-labelledby="household-heading" className="mt-10 rounded-2xl border border-ledger-line bg-paper-raised p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ledger-line pb-4">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Home + DIY</p>
            <h2 id="household-heading" className="mt-1 font-serif text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Household essentials
            </h2>
            <p className="mt-1 text-sm leading-6 text-ink-soft">
              Everyday bins, wardrobe order and two tool-bench basics — picked for the jobs they actually solve, not for a spec sheet.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-alt px-3 py-1.5 text-xs font-semibold text-ink-soft">
            <BadgeCheck aria-hidden="true" className="h-4 w-4 text-emerald-600" strokeWidth={2} />
            Editor&apos;s picks
          </span>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOUSEHOLD_PICKS.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ledger-line bg-white transition hover:border-inkblue hover:shadow-md"
              >
                {item.image ? (
                  <span className="relative block aspect-[4/5] w-full overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.name}
                      width={800}
                      height={800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                      className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>
                ) : item.url.includes("B012CLFpv") ? (
                  <span className="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,#1f2937_0%,#0b0f14_100%)] p-6">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">Presto!</span>
                    <span className="text-center font-serif text-3xl font-black leading-tight text-white">
                      GARBAGE<span className="text-emerald-400">BAGS</span>
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">Medium · 180 count</span>
                    <span className="rounded-full border border-emerald-400/60 bg-emerald-400/10 px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-300">
                      30 × 6 rolls · 19×21&quot;
                    </span>
                  </span>
                ) : item.url.includes("B00kmawoo") ? (
                  <span className="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,#2a2d33_0%,#121418_100%)] p-6">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-zinc-500">Homestrap</span>
                    <span className="text-center font-serif text-3xl font-black leading-tight text-white">
                      SAREE<span className="text-amber-300">COVERS</span>
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-300">Set of 6 · Grey</span>
                    <span className="rounded-full border border-amber-300/60 bg-amber-300/10 px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-200">
                      Window · 45×33×22 cm
                    </span>
                  </span>
                ) : (
                  <span className="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,#1b2430_0%,#0a0f16_100%)] p-6">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">Bosch</span>
                    <span className="text-center font-serif text-3xl font-black leading-tight text-white">
                      X-LINE<span className="text-sky-400">50</span>
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">Drill &amp; screwdriver kit</span>
                    <span className="rounded-full border border-sky-400/60 bg-sky-400/10 px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-300">
                      TiN-coated · 50 pieces
                    </span>
                  </span>
                )}
                <span className="flex flex-1 flex-col p-4">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-inkblue">{item.badge}</span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft/80">{item.brand}</span>
                  <span className="mt-1 font-serif text-[16px] font-bold leading-snug text-ink">{item.name}</span>
                  <span className="mt-2 text-[12px] leading-6 text-ink-soft">{item.blurb}</span>
                  <span className="mt-3 text-[11px] font-medium leading-5 text-ink-soft/90">
                    <span className="font-semibold text-ink">Best for: </span>
                    {item.bestFor}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[11px] font-semibold text-inkblue transition-colors group-hover:underline">
                    View on Amazon
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[11px] leading-5 text-ink-soft">
          Descriptions reflect the listings&apos; stated specs and contents — check the live Amazon page for current pack details and compatibility. No prices or “was” anchors are shown here. Every card is an Amazon Associates link (tag=durza02-21) and Durza earns a referral on qualifying purchases at no extra cost to you.
        </p>
      </section>

      <section id="kitchen-appliances" aria-labelledby="kitchen-appliances-heading" className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ledger-line pb-4">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Kitchen equipment</p>
            <h2 id="kitchen-appliances-heading" className="mt-1 font-serif text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Kitchen appliances
            </h2>
            <p className="mt-1 text-sm leading-6 text-ink-soft">
              Small, useful machines for the counter — from a 500 W mixer and a single-serve waffle iron to a scale, a cordless noodle press and a pocket heat sealer.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-alt px-3 py-1.5 text-xs font-semibold text-ink-soft">
            <BadgeCheck aria-hidden="true" className="h-4 w-4 text-emerald-600" strokeWidth={2} />
            Editor&apos;s picks
          </span>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {KITCHEN_APPLIANCE_PICKS.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ledger-line bg-white transition hover:border-inkblue hover:shadow-md"
              >
                {item.image ? (
                  <span className="relative block aspect-[4/5] w-full overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.name}
                      width={800}
                      height={800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 240px"
                      className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>
                ) : item.url.includes("B04HvT3G7") ? (
                  <span className="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,#2a2118_0%,#120e0a_100%)] p-6">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-600/80">NutriPro</span>
                    <span className="text-center font-serif text-3xl font-black leading-tight text-white">
                      500<span className="text-amber-400">W</span>
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-100/80">Juicer · Mixer · Grinder</span>
                    <span className="rounded-full border border-amber-400/60 bg-amber-400/10 px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-300">
                      3 jars · 2 blades · Gold
                    </span>
                  </span>
                ) : (
                  <span className="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,#1b2430_0%,#0b1016_100%)] p-6">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">Amazer</span>
                    <span className="text-center font-serif text-3xl font-black leading-tight text-white">
                      MINI<span className="text-teal-400">SEAL</span>
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">Heat sealer for packets</span>
                    <span className="rounded-full border border-teal-400/60 bg-teal-400/10 px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-teal-300">
                      Portable · hand-held
                    </span>
                  </span>
                )}
                <span className="flex flex-1 flex-col p-4">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-inkblue">{item.badge}</span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft/80">{item.brand}</span>
                  <span className="mt-1 font-serif text-[16px] font-bold leading-snug text-ink">{item.name}</span>
                  <span className="mt-2 text-[12px] leading-6 text-ink-soft">{item.blurb}</span>
                  <span className="mt-3 text-[11px] font-medium leading-5 text-ink-soft/90">
                    <span className="font-semibold text-ink">Best for: </span>
                    {item.bestFor}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[11px] font-semibold text-inkblue transition-colors group-hover:underline">
                    View on Amazon
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[11px] leading-5 text-ink-soft">
          Specs, included accessories and warranty terms are taken from the listings — confirm the live Amazon page before you buy, as variants (colour, jar count, moulds) can differ by seller. No prices or “was” anchors are shown here. Every card is an Amazon Associates link (tag=durza02-21) and Durza earns a referral on qualifying purchases at no extra cost to you.
        </p>
      </section>

      <section id="amazon-home-kitchen-picks" aria-labelledby="home-kitchen-picks-heading" className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ledger-line pb-4">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Best useful items in Home &amp; Improvement</p>
            <h2 id="home-kitchen-picks-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">Useful Home &amp; Improvement picks</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-soft">Eight items we think are genuinely useful in the Home &amp; Kitchen aisle. Click any card to go straight to the product — Amazon serves it and Durza earns a small referral from the click.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-alt px-3 py-1.5 text-xs font-semibold text-ink-soft">
            <BadgeCheck aria-hidden="true" className="h-4 w-4 text-emerald-600" strokeWidth={2} />
            Editor's picks
          </span>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {HOME_KITCHEN_PICKS.map((item) => (
            <li key={item.url} className="min-h-0">
              <a
                href={item.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ledger-line bg-paper-raised transition hover:border-inkblue hover:shadow-sm"
              >
                <span className="relative block aspect-square w-full overflow-hidden bg-paper-alt">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={item.imageWidth}
                    height={item.imageHeight}
                                        className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 flex-col p-3">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-inkblue">{item.badge}</span>
                  <span className="mt-1 line-clamp-2 text-[12px] leading-5 text-ink">{item.name}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[11px] font-semibold text-inkblue transition-colors group-hover:underline">
                    View on Amazon
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[11px] leading-5 text-ink-soft">
          Selection reflects what our editor found genuinely useful in the Home &amp; Kitchen category — not a claim about popularity. Every link on this row is an Amazon Associates link.
        </p>
      </section>


      <div className="mt-8 space-y-12">
        <section id="desk" aria-labelledby="desk-heading" className="rounded-2xl border border-ledger-line bg-paper-raised p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ledger-line pb-4">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Home office</p>
              <h2 id="desk-heading" className="mt-1 font-serif text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Work from home that actually works
              </h2>
              <p className="mt-1 text-sm leading-6 text-ink-soft">
                Webcam, mic, USB switch, keyboard, monitor arm and a chair — the basics for a desk you can sit at for hours without fighting your setup.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-alt px-3 py-1.5 text-xs font-semibold text-ink-soft">
              <BadgeCheck aria-hidden="true" className="h-4 w-4 text-emerald-600" strokeWidth={2} />
              Editor&apos;s picks
            </span>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WORK_FROM_HOME_PICKS.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ledger-line bg-white transition hover:border-inkblue hover:shadow-md"
                >
                  {item.image ? (
                    <span className="relative block aspect-[4/3] w-full overflow-hidden bg-white">
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? item.name}
                        width={800}
                        height={800}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                        className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      />
                    </span>
                  ) : (
                    <span className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,#1e293b_0%,#0b1220_100%)] p-6">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">{item.brand}</span>
                      <span className="text-center font-serif text-2xl font-black leading-tight text-white">WFH</span>
                      <span className="rounded-full border border-slate-500/60 bg-slate-500/10 px-4 py-1 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                        {item.badge}
                      </span>
                    </span>
                  )}
                  <span className="flex flex-1 flex-col p-4">
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-inkblue">{item.badge}</span>
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft/80">{item.brand}</span>
                    <span className="mt-1 font-serif text-[16px] font-bold leading-snug text-ink">{item.name}</span>
                    <span className="mt-2 text-[12px] leading-6 text-ink-soft">{item.blurb}</span>
                    <span className="mt-3 text-[11px] font-medium leading-5 text-ink-soft/90">
                      <span className="font-semibold text-ink">Best for: </span>
                      {item.bestFor}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[11px] font-semibold text-inkblue transition-colors group-hover:underline">
                      View on Amazon
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-[11px] leading-5 text-ink-soft">
            Specs and compatibility are taken from the listings — confirm the live Amazon page (system support, VESA size, chair dimensions) before you buy. No prices or “was” anchors are shown here. Every card is an Amazon Associates link (tag=durza02-21) and Durza earns a referral on qualifying purchases at no extra cost to you.
          </p>
        </section>

        {sectioned.map((section) =>
          section.items.length === 0 ? null : (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <div className="mb-4">
                <h2 id={`${section.id}-heading`} className="font-serif text-2xl font-extrabold tracking-tight text-ink">
                  {section.title}
                </h2>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-ink-soft">{section.lead}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.items.map(({ o, badge }) => (
                  <OfferCard
                    key={o.id}
                    bookmarkId={o.id}
                    code={o.code}
                    badge={badge ?? formatDiscountHeading(o, "INR")}
                    title={o.title}
                    description={o.description ?? undefined}
                    ctaHref={api.goUrl(o.id, "store-page")}
                    expiresAt={o.expires_at}
                  />
                ))}
              </div>
            </section>
          ),
        )}
      </div>

      <FaqSection eyebrow="Amazon FAQs" items={faqs} />

      {topOffer && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] backdrop-blur md:hidden">
          <a
            href={`/coupons/${topOffer.slug}`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white"
          >
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-300">
                Amazon best deal
              </span>
              <span className="block truncate text-xs font-semibold">{topOffer.title}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-xs font-bold">
              Shop
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
