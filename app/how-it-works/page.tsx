import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Durza works",
  description: "From sourcing to verification to disclosure — how the platform works.",
};

const STEPS: [string, string][] = [
  ["Where coupons come from", "Offers arrive from our sources — feeds, imports and staff curation — and flow through one pipeline: normalize, dedupe, validate. Hand-researched offers are read from the store's own pages, and the source page and check date travel with the offer."],
  ["How we verify them", "Each offer is structurally validated and (where enabled) probed live. Shopper worked/didn't-work votes set the success rate on the offer — until someone reports, the offer shows no rate at all."],
  ["How users report results", "One vote per visitor per coupon per day, keyed by a salted IP hash — real signal, no raw tracking."],
  ["How commissions work", "Some links earn us a commission. Expected commission earnings are one weighted input in how offers are ordered, alongside verification status and shopper success rates. Every offer page says how we make money."],
  ["What Durza does NOT do", "We don't sell your data, we don't sell ranking (sponsored placements are labelled, and commission data is only one input), and we don't hijack another creator's referral link."],
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-4xl font-extrabold text-ink sm:text-5xl">How Durza works</h1>
      <ol className="mt-10 space-y-8 border-l border-ledger-line pl-8">
        {STEPS.map(([title, body], i) => (
          <li key={title}>
            <p className="font-mono text-xs uppercase tracking-widest text-verified">{i + 1} / {STEPS.length}</p>
            <h2 className="mt-1 font-serif text-xl text-ink">{title}</h2>
            <p className="mt-2 text-ink-soft">{body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-12 text-ink-soft">
        Read the full version on the{" "}
        <Link href="/trust" className="text-inkblue underline underline-offset-2">trust page</Link>.
      </p>
    </div>
  );
}
