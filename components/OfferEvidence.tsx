/** One offer-type label; optional last-checked date; checkout claim only when verified. */
export default function OfferEvidence({
  typeLabel,
  lastChecked,
  checkedOut = false,
}: {
  typeLabel: string;
  lastChecked?: string | null;
  checkedOut?: boolean;
}) {
  return (
    <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px] text-ink-soft">
      <span className="rounded bg-paper-alt px-1.5 py-0.5 font-medium text-ink">{typeLabel}</span>
      {checkedOut ? <span>Checked out with this code</span> : null}
      {lastChecked ? <span>{lastChecked}</span> : null}
    </p>
  );
}
