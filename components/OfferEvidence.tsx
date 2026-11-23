/** One offer-type label and an optional last-checked date. */
export default function OfferEvidence({
  typeLabel,
  lastChecked,
}: {
  typeLabel: string;
  lastChecked?: string | null;
}) {
  return (
    <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px] text-ink-soft">
      <span className="rounded bg-paper-alt px-1.5 py-0.5 font-medium text-ink">{typeLabel}</span>
      {lastChecked ? <span>{lastChecked}</span> : null}
    </p>
  );
}
