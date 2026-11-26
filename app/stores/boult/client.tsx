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

const ADVANTAGES = [{"title": "Official warranty & support", "desc": "Boult products include manufacturer warranty as per brand terms; buying direct helps with invoice-based support and warranty processes."}, {"title": "Latest launches & variants", "desc": "Access current models, colourways and feature variants listed on the official Boult store."}, {"title": "Genuine sealed products", "desc": "Order directly from the brand\u2019s official store for genuine, sealed units as sold by Boult."}, {"title": "Checkout offers as available", "desc": "Prepaid, bank or cart offers may be available from time to time \u2014 check live terms at checkout."}] as const;
const MATCHERS = [{"id": "commute", "label": "Commute & Calls", "headline": "TWS for daily travel and clearer calls", "bullets": ["Look for call clarity features (e.g. ENC mics) and a comfortable fit", "Consider ANC and battery life based on your commute", "Check Bluetooth version, case charging and warranty on the listing"], "cta": "Explore TWS earbuds \u2192", "src": "matcher-commute"}, {"id": "gaming", "label": "Gaming & Entertainment", "headline": "Low-latency audio for games and videos", "bullets": ["Prioritize low-latency/gaming modes where available", "Check driver, fit and total battery/playtime", "Review controls and compatibility with your devices"], "cta": "Explore gaming audio \u2192", "src": "matcher-gaming"}, {"id": "watch", "label": "Smartwatches & Fitness", "headline": "Wearables for calls, tracking and daily use", "bullets": ["Compare display type/brightness and battery life", "Check Bluetooth calling, health features and water resistance rating", "Confirm strap fit and supported app/features on the listing"], "cta": "Explore smartwatches \u2192", "src": "matcher-watch"}, {"id": "all-day", "label": "All-Day Battery", "headline": "Neckbands and audio for long listening", "bullets": ["Prioritize battery life, fast charging and comfort for long wear", "Check sweat/water resistance rating for workouts", "Compare connectivity options and controls"], "cta": "Explore neckbands & audio \u2192", "src": "matcher-all-day"}] as const;
const LINEUP = [{"title": "TWS Earbuds", "badge": "Everyday", "copy": "True wireless earbuds for music and calls \u2014 compare ANC/ENC, fit and battery.", "src": "lineup-tws"}, {"title": "Gaming Earbuds", "badge": "Low latency", "copy": "Gaming-focused audio modes \u2014 check latency features and controls.", "src": "lineup-gaming-tws"}, {"title": "Smartwatches", "badge": "Wearables", "copy": "Bluetooth calling and fitness watches \u2014 compare display, battery and ratings.", "src": "lineup-smartwatches"}, {"title": "Neckbands", "badge": "All-day", "copy": "Long-battery neckbands \u2014 review playback time, comfort and resistance.", "src": "lineup-neckbands"}, {"title": "Headphones & Speakers", "badge": "Home audio", "copy": "Over-ear and speaker options \u2014 check drivers, connectivity and features.", "src": "lineup-audio-home"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="boult"
      name="Boult"
      headline="Boult Official Store — TWS Earbuds, Smartwatches & Audio"
      lead="Pick Boult audio or wearables by how you use them, compare key features, and check live models, pricing and warranty details on the official store."
      matcherHeading="Find the right Boult for you"
      matcherDescription="Choose your use case to see what features to prioritize, then explore matching products on the official store."
      lineupEyebrow="Audio & wearables"
      lineupTitle="Shop Boult by category"
      lineupDescription="Browse Boult categories and confirm features, battery claims as listed, and live pricing on the official store."
      faqNote="Features (ANC/ENC, latency, IP ratings, battery) vary by model — always confirm the exact specifications on the official product listing."
      mobileCtaLabel="Check live range & offers on Boult"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
