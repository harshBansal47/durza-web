"use client";

import StoreGuidePage from "@/components/store/StoreGuidePage";
import type { TrustStatsProps } from "@/components/store/TrustStats";

interface Props {
  faqs: { question: string; answer: string }[];
  stats: TrustStatsProps;
  // Accepted for route parity; the shared template does not need these yet.
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

const ADVANTAGES = [{"title": "Delivery & assembly on eligible items", "desc": "Doorstep delivery and technician assembly are available on eligible furniture orders, subject to PIN-code serviceability shown on the product page."}, {"title": "Manufacturer warranty", "desc": "Nilkamal furniture includes manufacturer warranty against defects as per category/product terms \u2014 review coverage on the listing."}, {"title": "EMI & flexible payments", "desc": "EMI and other payment options may be available on eligible orders \u2014 see live options at checkout."}, {"title": "Coordinated ranges & finishes", "desc": "Shop matching finishes and configurations across bedroom, living, office and utility ranges directly from Nilkamal."}] as const;
const MATCHERS = [{"id": "wfh", "label": "WFH & Study", "headline": "Ergonomic seating and desks for daily work", "bullets": ["Measure desk width, depth and legroom for your space", "Prioritize adjustable seating and back support for long hours", "Check materials, load capacity and assembly requirements"], "cta": "Explore WFH & study \u2192", "src": "matcher-wfh"}, {"id": "bedroom", "label": "Bedroom & Storage", "headline": "Beds and wardrobes that fit your room", "bullets": ["Confirm mattress size and room/doorway clearance before buying", "Choose storage type (box/hydraulic/shelves) based on access needs", "Verify wardrobe dimensions and door swing or sliding space"], "cta": "Explore bedroom furniture \u2192", "src": "matcher-bedroom"}, {"id": "living", "label": "Living & Dining", "headline": "Comfortable seating and dining for everyday use", "bullets": ["Measure entryways and layout for sofas and dining sets", "Pick upholstery/material suited to maintenance, kids or pets", "Check seating capacity and finish consistency across pieces"], "cta": "Explore living & dining \u2192", "src": "matcher-living"}, {"id": "outdoor", "label": "Outdoor & Utility", "headline": "Durable, easy-care seating and utility pieces", "bullets": ["Choose weather-resistant, sturdy materials for balconies or outdoors", "Consider stackable or space-saving designs where needed", "Review weight-bearing and care instructions on the listing"], "cta": "Explore utility furniture \u2192", "src": "matcher-outdoor"}] as const;
const LINEUP = [{"title": "Office & Study Chairs", "badge": "WFH", "copy": "Ergonomic chairs \u2014 compare adjustability, support and materials.", "src": "lineup-office-chairs"}, {"title": "Study & Computer Desks", "badge": "Study", "copy": "Desks for home and students \u2014 check size, storage and build.", "src": "lineup-study-tables"}, {"title": "Beds with Storage", "badge": "Bedroom", "copy": "Beds in multiple sizes and storage options \u2014 confirm dimensions and finish.", "src": "lineup-beds"}, {"title": "Sofas & Recliners", "badge": "Living", "copy": "Seating configurations for your living room \u2014 review upholstery and measurements.", "src": "lineup-sofas"}, {"title": "Wardrobes & Cabinets", "badge": "Storage", "copy": "Organize with wardrobes and cabinets \u2014 check layout and door type.", "src": "lineup-storage"}, {"title": "Moulded & Outdoor Chairs", "badge": "Utility", "copy": "Durable multipurpose seating \u2014 see material and load details.", "src": "lineup-outdoor"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="nilkamalfurniture"
      name="Nilkamal Furniture"
      headline="Nilkamal Furniture Official Store — Chairs, Beds & Home Storage"
      lead="Find Nilkamal furniture for your space, compare dimensions and materials, then check live price, PIN-code delivery and eligible assembly on the official store."
      matcherHeading="Match furniture to your space"
      matcherDescription="Choose your room or need to get a quick checklist, then explore the right range on the official store."
      lineupEyebrow="Official range"
      lineupTitle="Shop Nilkamal by room"
      lineupDescription="Browse popular Nilkamal categories and confirm dimensions, delivery and live pricing on the official store."
      faqNote="Delivery, assembly and return terms can vary by product and PIN code — confirm on the official Nilkamal listing before ordering."
      mobileCtaLabel="Check live range & offers on Nilkamal Furniture"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
