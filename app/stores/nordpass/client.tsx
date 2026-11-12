"use client";

import StoreHero from "@/components/StoreHero";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("nordpass", url, sub);
const FAMILY_MEMBERS = [2, 3, 4, 5, 6];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function NordPassClient({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [members, setMembers] = useState(6);
  const filtered = products.filter((p) => p.tab === concern);
  const perPerson = Math.round(249 / members);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="NordPass"
        subtitle="Stress-Free Digital Life • Encrypted Passwords, Passkeys & Real-Time Breach Alerts"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Plan Cost &amp; Device Multiplier Tool</h2>
        <p className="mt-1 text-sm text-ink-soft">The Family Plan (₹249/mo for 6 vaults) drops per-person cost dramatically as you add members.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {FAMILY_MEMBERS.map((m) => (
            <button key={m} type="button" onClick={() => setMembers(m)} className={`rounded-full px-4 py-2 text-sm font-medium ${members === m ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{m} {m === 2 ? "vaults" : "vaults"}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 text-center">
          <div className="rounded-xl bg-paper p-4"><p className="text-xs text-ink-soft">Family plan total</p><p className="mt-1 text-2xl font-bold text-ink">₹249<span className="text-sm font-medium text-ink-soft">/mo</span></p></div>
          <div className="rounded-xl bg-paper p-4"><p className="text-xs text-ink-soft">Per person</p><p className="mt-1 text-2xl font-bold text-ink">~₹{perPerson}<span className="text-sm font-medium text-ink-soft">/mo</span></p></div>
          <div className="rounded-xl bg-paper p-4"><p className="text-xs text-ink-soft">Savings vs Individual</p><p className="mt-1 text-2xl font-bold text-ink">~{Math.round((1 - perPerson / 129) * 100)}%</p></div>
        </div>
        <p className="mt-3 text-xs text-ink-soft">Each member gets a private zero-knowledge vault, passkey sync across devices, breach scanner and encrypted file attachments.</p>
        <a href={link("https://nordpass.com/family-password-manager/", "plan_multiplier")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Get Family Plan on NordPass</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on NordPass</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Security Tier &amp; Plan Decoder</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((c) => (
            <button key={c} type="button" onClick={() => setConcern(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${concern === c ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <div key={p.name} className="rounded-2xl border border-ledger-line bg-white p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{p.specs}</p>
              <div className="mt-2 flex items-baseline gap-2"><span className="text-lg font-bold text-ink">{p.price}</span>{p.mrp !== p.price && <span className="text-sm text-ink-soft line-through">{p.mrp}</span>}</div>
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Plan on NordPass</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What happens if I forget my Master Password?</summary><p className="mt-2 text-sm text-ink-soft">Nord cannot recover it — that is what zero-knowledge means. Save your Recovery Code offline at setup, or configure Emergency Access with a trusted contact. Without either, the vault cannot be decrypted.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does XChaCha20 encryption work?</summary><p className="mt-2 text-sm text-ink-soft">NordPass encrypts every vault item with XChaCha20, a fast, constant-time authenticated cipher with a 256-bit key. Combined with zero-knowledge architecture, even Nord Security cannot read your stored data.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does the 30-day money-back guarantee operate?</summary><p className="mt-2 text-sm text-ink-soft">Buy any premium plan, try it risk-free, and request a full refund within 30 days via live chat or email with no questions asked — the charge is reversed to your original payment method.</p></details>
      </section>
    </div>
  );
}
