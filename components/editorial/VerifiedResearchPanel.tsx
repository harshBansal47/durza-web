import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { RESEARCH_CHECK_DATE, VERIFIED_RESEARCH } from "@/data/verified-research-2026-11-25";

/** Shared, dated evidence panel. Citations only — no affiliate CTAs. */
export default function VerifiedResearchPanel({
  kind = "general",
}: {
  kind?: keyof typeof VERIFIED_RESEARCH;
}) {
  const set = VERIFIED_RESEARCH[kind];
  if (!set) return null;

  return (
    <aside
      aria-labelledby={`verified-research-${kind}`}
      className="rounded-2xl border border-ledger-line bg-paper-raised p-5"
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-durza-deep">
        {set.kicker} · checked {RESEARCH_CHECK_DATE}
      </p>
      <h2 id={`verified-research-${kind}`} className="mt-2 font-serif text-xl font-bold text-ink">
        {set.title}
      </h2>
      <ul className="mt-4 space-y-3">
        {set.facts.map((fact) => (
          <li key={fact.label} className="text-sm leading-6 text-ink-soft">
            <span className="font-semibold text-ink">{fact.label}.</span>{" "}
            {fact.detail}{" "}
            {fact.href && (
              <a
                href={fact.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-0.5 font-semibold text-durza-deep hover:underline"
              >
                Source <ExternalLink aria-hidden="true" className="h-3 w-3" />
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-ledger-line pt-3 text-xs leading-5 text-ink-soft">
        {set.note}
      </p>
      <p className="mt-2 text-xs">
        <Link href="/methodology" className="font-semibold text-durza-deep hover:underline">
          How Durza researches →
        </Link>
      </p>
    </aside>
  );
}
