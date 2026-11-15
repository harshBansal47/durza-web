import { ArrowDownRight } from "lucide-react";

/**
 * The 10-second answer at the top of a buying guide.
 *
 * Structure: one question a shopper actually types into a search box, a 1-2
 * sentence plain answer, and a jump link to the section that backs it up.
 * No invented numbers — every claim is the same one the rest of the article
 * argues for with the same evidence.
 */
export default function QuickAnswer({
  question,
  answer,
  jumpHref,
  jumpLabel,
}: {
  question: string;
  answer: string;
  jumpHref: string;
  jumpLabel: string;
}) {
  return (
    <aside
      role="region"
      aria-label="Answer in 10 seconds"
      className="mt-8 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50/60 p-5 sm:p-6"
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-orange-700">
        Answer in 10 seconds
      </p>
      <h2 className="mt-1.5 font-serif text-lg font-extrabold leading-snug text-ink sm:text-xl">
        {question}
      </h2>
      <p className="mt-2 text-sm leading-6 text-ink-soft sm:text-base sm:leading-7">{answer}</p>
      <a
        href={jumpHref}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-800 underline-offset-4 hover:underline"
      >
        {jumpLabel}
        <ArrowDownRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
      </a>
    </aside>
  );
}
