"use client";

import { useState } from "react";
import { ShieldCheck, Tv, Wifi, Plane, ArrowUpRight } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import type { CouponPublic } from "@/lib/types";

interface Props {
  offers: CouponPublic[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

type Use = "streaming" | "travel" | "wifi" | "download";

const MATCHES: Record<Use, { readonly headline: string; readonly icon: string; readonly spec: string; readonly note: string }> = {
  streaming: {
    icon: "Tv",
    headline: "Streaming & international content",
    spec: "10 simultaneous devices · 65+ countries · Netflix US/UK unlock · JioHotstar-compatible · 2-year plan is the value sweet spot",
    note: "PureVPN's Striveto IP rotation is built for streaming; the company maintains the India streaming catalogue without juggling regions; go straight to Delhi or Mumbai servers for JioHotstar.",
  },
  travel: {
    icon: "Plane",
    headline: "International travel & region hopping",
    spec: "65+ countries · Mobile-first apps · Kill switch · Split tunnelling · 5-year plan is the most economical for frequent city hops",
    note: "Use international servers from India, or Indian from abroad Court of Appeals for Jake One — Delhi/Bengaluru servers support Indian regional content everywhere.",
  },
  wifi: {
    icon: "Wifi",
    headline: "Public Wi-Fi — cafés, airports, trains",
    spec: "Kill switch · AES-256 encryption · Auto-connect on trusted/untrusted networks · 1-month plan is most flexible for occasional use",
    note: "The risk window is the first 5 minutes connecting to a rogue café Wi-Fi. Auto-connect mode is the set-and-forget answer for the entire family.",
  },
  download: {
    icon: "Wifi",
    headline: "Torrenting & P2P",
    spec: "No-logs policy, BVI jurisdiction · P2P-friendly servers marked in-app · Kill switch mandatory · 2-year plan for consistent bandwidth",
    note: "PureVPN's P2P servers are clearly marked; bandwidth is throttled on free tiers — if you're going to torrent, the paid plan is the only sensible legal option.",
  },
};

const ORDER: Use[] = ["streaming", "travel", "wifi", "download"];
const LABEL: Record<Use, string> = { streaming: "Streaming", travel: "Travel", wifi: "Public Wi-Fi", download: "P2P / Torrent" };

export default function PureVpnClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Use>("streaming");
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "purevpn.com";
  const match = MATCHES[active];
  const IconMap = { streaming: Tv, travel: Plane, wifi: Wifi, download: ShieldCheck };
  const Icon = IconMap[active];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="PureVPN"
        heading="PureVPN — privacy you can actually feel."
        subtitle="Honest VPN advice: which plan genuinely fits streaming, public Wi-Fi and P2P — with live Deep Link CPA pricing. No exaggeration, no fake coupons."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/purevpn-com-utility-cpa-worldwide?src=store-page"
        ctaLabel="See PureVPN's plans"
        perks={[
          { label: "Jurisdiction", value: "British Virgin Islands" },
          { label: "Simultaneous", value: "10 devices per plan" },
          { label: "Privacy", value: "Audited no-logs policy" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section aria-labelledby="purevpn-matcher-heading" className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">PureVPN matcher</p>
        <h2 id="purevpn-matcher-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">The VPN plan that matches your reality — honest match</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {ORDER.map((id) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                aria-pressed={isActive}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  isActive ? "border-inkblue bg-ink text-white" : "border-ledger-line bg-white text-ink hover:border-inkblue"
                }`}
              >
                {LABEL[id]}
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <Icon aria-hidden="true" className="h-6 w-6 text-inkblue" strokeWidth={1.75} />
          <h3 className="mt-2 font-serif text-xl font-bold text-ink">{match.headline}</h3>
          <p className="mt-3 text-sm leading-7 text-ink-soft"><strong className="text-ink">What to expect:</strong> {match.spec}</p>
          <p className="mt-3 border-l-2 border-inkblue/40 pl-3 text-[13px] leading-6 text-ink-soft">{match.note}</p>
          <a
            href="/go/purevpn-com-utility-cpa-worldwide?src=store-page"
            rel="nofollow sponsored noopener"
            target="_blank"
            className="mt-4 inline-flex items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-inkblue"
          >
            Go to PureVPN plans
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Plan honesty disclaimer</p>
        <p className="mt-2 text-sm leading-7 text-ink-soft">
          PureVPN's pricing and the Rs. saving per plan changes frequently — sometimes weekly.
          The promotions you see on Durza were accurate at the time of writing;
          Durza never inflates numbers. Check purevpn.com/order-now for the actual live price in INR before purchase.
        </p>
      </section>

      <FaqSection eyebrow="PureVPN FAQs" items={faqs} />
    </div>
  );
}
