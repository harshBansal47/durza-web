export default function SectionTitle({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-3">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-[13px] font-medium uppercase tracking-[0.24em] text-accent">
          {hint}
        </span>
        <h2 className="font-sans text-2xl font-medium tracking-tight text-ink sm:text-3xl">{children}</h2>
      </div>
    </div>
  );
}
