import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Shared header for homepage sections: small label, H2, description and a
 * "view all" link. Typography and colors match SectionTitle so every section
 * on the page reads as one system.
 */
export default function SectionHead({
  id,
  pill,
  title,
  description,
  href,
  linkLabel,
}: {
  id: string;
  pill: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3 sm:mb-8">
      <div className="min-w-0 max-w-2xl">
        <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-durza-deep sm:tracking-[0.24em]">
          {pill}
        </span>
        <h2
          id={`${id}-heading`}
          className="mt-2 font-sans text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          {description}
        </p>
      </div>

      <Link
        href={href}
        className="group inline-flex min-h-9 items-center gap-1 whitespace-nowrap text-sm font-semibold text-durza-deep transition-colors hover:text-accent"
      >
        {linkLabel}
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </Link>
    </div>
  );
}