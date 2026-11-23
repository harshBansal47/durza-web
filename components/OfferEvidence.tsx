/** One type label and one evidence line per offer card (Phase 1 T6). */
export default function OfferEvidence({
  typeLabel,
  evidence,
}: {
  typeLabel: string;
  evidence: string;
}) {
  return (
    <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px] text-ink-soft">
      <span className="rounded bg-paper-alt px-1.5 py-0.5 font-medium text-ink">{typeLabel}</span>
      <span aria-label="Evidence">{evidence}</span>
    </p>
  );
}
