import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/ui/PageTitle";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How it works",
  description: "From sourcing to verification to disclosure — how the platform works.",
  alternates: { canonical: absoluteUrl("/how-it-works") },
};

const STEPS: [string, string][] = [
  ["Where offers come from", "Offers come from partner feeds, imports, and manual checks. Each one is cleaned up, de-duplicated, and kept with the store page it came from and the date it was last checked."],
  ["How they’re checked", "We validate offer details and, where possible, recheck them. The success rate comes from shopper votes — if no one has reported yet, we don’t show a rate."],
  ["How reports work", "Visitors can mark an offer as worked or didn’t work. Reports are limited to reduce spam and keep the signal useful."],
  ["What we don’t do", "We don’t sell your data, sell rankings, or redirect someone else’s referral. Sponsored placements are labelled, and commissions are disclosed."],
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageTitle>How it works</PageTitle>
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
