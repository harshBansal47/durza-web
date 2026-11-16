"use client";

import { useState } from "react";
import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import { api } from "@/lib/api";
import { formatDiscountHeading } from "@/lib/format";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { CouponPublic } from "@/lib/types";

const FALLBACK_URL = "https://www.amazon.in";

interface SectionDef {
  id: string;
  title: string;
  lead: string;
  picks: Array<{ id: string; badge?: string }>;
}

const SECTIONS: SectionDef[] = [
  {
    id: "desk",
    title: "Work from home that actually works",
    lead: "Laptop stands, monitoring gear, notebooks and chairs — what you need to sit at a desk for eight hours and stay sane.",
    picks: [
      { id: "59bcd4c8-8177-4495-beb2-d5110c5fddd7", badge: "FRONT-OF-CAMERA" },
      { id: "386ca36a-e97b-492c-bbc7-ec9f71fd50d2", badge: "DUAL-MONITOR PICK" },
      { id: "8fdfd6e8-48af-4571-957a-b9e4ce95c2e0", badge: "TOP PICK" },
      { id: "4341bdd4-562e-4efd-aac3-aff19c6ee624", badge: "SIT FOR 8 HOURS" },
      { id: "455fd1f8-ed12-4b27-997b-932e71310b20", badge: "FRIDGE-REMINDER" },
    ],
  },
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
  {
    id: "tools",
    title: "Tools & DIY",
    lead: "Plugs, drills and the kinds of pliers a kitchen drawer forgets about. Professional-grade.",
    picks: [
      { id: "3ce3a8b1-3499-4203-ba70-a45f366dd603", badge: "500W VS DRILL" },
      { id: "1b1c1232-6739-48d0-b72c-e9e5e3934f97", badge: "MOBILE KIT" },
      { id: "bd6bdfb6-df4b-4c18-8af2-63e93482aec9", badge: "SET WITH BOX" },
      { id: "8ffe28f8-ff4e-404b-b5c6-80b28a36a94b", badge: "DIGITAL EYE" },
    ],
  },
  {
    id: "software",
    title: "Software & subscriptions",
    lead: "Prime, Audible and Kindle Unlimited — experiences you can start before dinner.",
    picks: [
      { id: "a19b086a-f209-4bff-aef3-6165b8b7f967", badge: "ANNUAL SAVER" },
      { id: "6b145afb-db33-4984-8b6b-3c2b4d8cf7fa", badge: "2 MONTHS FREE" },
      { id: "0a03b3ce-b02e-41bd-a709-fab95b192aef", badge: "UNLIMITED BOOKS" },
      { id: "8a56ca88-659c-4ec2-8a98-92aa56cbf280", badge: "B2B REGISTER" },
      { id: "0ee34e79-1bf6-442f-82eb-1ab487694642", badge: "REFURBISHED" },
    ],
  },
  {
    id: "health",
    title: "Health & wellness essentials",
    lead: "Nutrients this year, blood-pressure after the doctor's advice — at prices within the standard pharmacy lane.",
    picks: [
      { id: "94804b19-1423-4ef1-ac17-9e1f73d404d2", badge: "VIT C" },
      { id: "815c20c5-029d-49be-b59f-a160ae91779c", badge: "DOCTOR-PREFERRED" },
      { id: "d35f89a4-57c3-43d9-bc18-2887e66e904d", badge: "WITH STRIPS" },
    ],
  },
  {
    id: "finance",
    title: "Finance & card smarts",
    lead: "Amazon-branded payment products — ICICI cards, welcome bonuses, EMI options and gift cards.",
    picks: [
      { id: "a93cfd4f-2181-4638-9ce1-1a5ac9277496", badge: "ICICI CO-BRAND" },
      { id: "a9c7985d-cdab-4456-b0c4-4bcad264d4c6", badge: "BONUS VAULT" },
      { id: "8254a99e-0871-4094-9d0e-e5347f2aaac8", badge: "UPI WELCOME" },
      { id: "3b005736-72e7-49b7-b849-ec172c55cef1", badge: "EMI ON CARDS" },
      { id: "7594fcb1-b877-4a7e-90f3-f87d663fcaf5", badge: "GIFT CARDS" },
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
        subtitle="Work-from-home, components, audio, kitchen, home gym, personal care and cards — curated picks from Amazon India, every card brand-backed and professionally chosen."
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

      <div className="mt-8 space-y-12">
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
