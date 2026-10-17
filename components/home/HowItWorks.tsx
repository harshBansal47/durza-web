import { Search, Ticket, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    glyph: Search,
    title: "Find a deal",
    body: "Search a store or product. Every offer shows where it came from and when it was last checked.",
  },
  { glyph: Ticket, title: "Reveal and copy", body: "One tap reveals the code and opens the store through our link. We may earn a commission." },
  {
    glyph: CheckCircle2,
    title: "Tell us if it worked",
    body: "Your report updates that offer's success rate for the next shopper. Dead codes drop away.",
  },
];

/** A real sequence, so the numbered steps are meaningful here. */
export default function HowItWorks() {
  return (
    <ol className="relative grid gap-5 md:grid-cols-3">
      <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-9 hidden border-t border-ledger-line md:block" />
      {STEPS.map((s, i) => {
        const Glyph = s.glyph;
        return (
          <li key={s.title} className="lift relative rounded-lg border border-ledger-line bg-white p-6 text-center shadow-[var(--shadow-hairline)]">
            <span className="bg-paper-alt relative mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-lg text-ink">
              <Glyph aria-hidden="true" className="h-9 w-9" strokeWidth={1.5} />
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink font-sans text-sm font-medium text-white">
                {i + 1}
              </span>
            </span>
            <h3 className="mt-4 font-sans text-lg font-medium text-ink">{s.title}</h3>
            <p className="mt-1.5 text-sm text-ink-soft">{s.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
