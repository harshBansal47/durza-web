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

const ADVANTAGES = [{"title": "GST-compliant invoicing", "desc": "GST invoices can be generated for eligible orders (enter GSTIN at checkout where applicable) to support business purchases and input tax credit."}, {"title": "Bulk & business buying options", "desc": "Volume pricing and bulk quote/RFQ options are available for many industrial and business supplies, subject to product and quantity."}, {"title": "Wide MRO & industrial catalogue", "desc": "Access a broad range of power tools, safety, electricals and facility supplies with detailed specs on official listings."}, {"title": "Payment & delivery options", "desc": "Multiple payment modes (including prepaid/EMI where eligible) and PIN-code based delivery are available \u2014 check live terms at checkout."}] as const;
const MATCHERS = [{"id": "diy", "label": "Home DIY & Repairs", "headline": "Reliable tools for home maintenance and projects", "bullets": ["Choose tool power, chuck/size and accessories for your tasks", "Check voltage compatibility and included warranty/support", "Verify return eligibility and specs on the product page"], "cta": "Explore power tools \u2192", "src": "matcher-diy"}, {"id": "safety", "label": "Safety & PPE", "headline": "Compliant safety gear for sites and workplaces", "bullets": ["Check relevant safety standards/ratings (e.g. footwear/helmets) as listed", "Pick the right size, material and protection level for the job", "Order correct quantities and confirm return terms for consumables"], "cta": "Explore safety & PPE \u2192", "src": "matcher-safety"}, {"id": "electricals", "label": "Electricals & Renovation", "headline": "Wires, switchgear and electrical essentials", "bullets": ["Verify ratings, certifications and suitability (load/amp/pole) on listings", "Match cable/wire specs and lengths to your requirement", "Prefer authorized brands and check warranty/return eligibility"], "cta": "Explore electricals \u2192", "src": "matcher-electricals"}, {"id": "facility", "label": "Office & Facility", "headline": "Supplies for offices, warehouses and operations", "bullets": ["Compare specs and pack sizes for packaging or facility needs", "Use GST invoicing and bulk options where applicable", "Check delivery timelines and serviceability for your PIN code"], "cta": "Explore facility supplies \u2192", "src": "matcher-facility"}] as const;
const LINEUP = [{"title": "Power & Hand Tools", "badge": "Tools", "copy": "Drills, grinders and tool kits \u2014 compare power, size and included accessories.", "src": "lineup-power-tools"}, {"title": "Safety & PPE", "badge": "Safety", "copy": "Safety shoes, helmets and protective gear \u2014 check standards and ratings.", "src": "lineup-safety"}, {"title": "Electricals & Switchgear", "badge": "Electricals", "copy": "Wires, MCBs and electrical components \u2014 verify ratings and certifications.", "src": "lineup-electricals"}, {"title": "Pumps & Motors", "badge": "Utilities", "copy": "Pumps and motors for home or work \u2014 match capacity, head and power.", "src": "lineup-pumps"}, {"title": "Packaging & Warehouse", "badge": "Operations", "copy": "Boxes, tapes and supplies for dispatch and storage \u2014 compare sizes and packs.", "src": "lineup-packaging"}, {"title": "Office & Facility Supplies", "badge": "Facility", "copy": "Equipment and supplies for workplaces \u2014 review specs and availability.", "src": "lineup-office"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="moglix"
      name="Moglix"
      headline="Moglix Official Store — Power Tools, Electricals & Industrial Supplies"
      lead="Find the right tools and supplies by task or business need, then check live specs, pricing, GST invoicing and bulk options on the official Moglix store."
      matcherHeading="Find supplies for your job"
      matcherDescription="Select your use case to get a quick checklist, then browse matching categories on Moglix."
      lineupEyebrow="Official catalogue"
      lineupTitle="Shop Moglix by category"
      lineupDescription="Browse high-intent categories and confirm specs, GST details and live pricing on the official Moglix store."
      faqNote="GST, bulk pricing, delivery and return eligibility vary by product and order — confirm on the official Moglix listing and checkout."
      mobileCtaLabel="Check live range & offers on Moglix"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
