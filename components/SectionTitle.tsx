import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export default function SectionTitle({
  children,
  hint,
  icon: Icon,
  action,
}: {
  children: React.ReactNode;
  hint?: string;
  /** Small line icon beside the title, tinted with the brand accent. */
  icon?: LucideIcon;
  /** Optional "view all" link closing the header row. */
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
      <div className="flex min-w-0 items-center gap-3">
        {hint ? (
          <span aria-hidden="true" className="text-[13px] font-medium uppercase tracking-[0.24em] text-durza-deep">
            {hint}
          </span>
        ) : null}
        <h2 className="flex min-w-0 items-center gap-2 font-sans text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {Icon ? <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} /> : null}
          {children}
        </h2>
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group ml-auto inline-flex min-h-9 items-center gap-1 whitespace-nowrap text-sm font-semibold text-durza-deep transition-colors hover:text-accent"
        >
          {action.label}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
      ) : null}
    </div>
  );
}
