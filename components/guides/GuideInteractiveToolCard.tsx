import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

/**
 * Interactive-tool CTA for editorial buying guides.
 *
 * Every custom store on Durza has a unique interactive experience — BLDC
 * calculator (Havells), stack calculator (HealthKart), cup-size finder
 * (Sirona), fit decoder (Levis), GST advisor (Moglix), etc. The guide links
 * straight to the tool's anchor so readers go there in one click.
 *
 * The anchor is precomputed by the guide; the component just renders the
 * card. The parent guide must ensure `href` is relative and well-formed.
 */
export default function GuideInteractiveToolCard({
  storeName,
  href,
  headline,
  sublabel,
}: {
  /** e.g. "Havells" — the brand the tool belongs to. */
  storeName: string;
  /** e.g. "/stores/havells#bldc-calculator" — must be a same-origin path. */
  href: string;
  /** e.g. "Atomize your monthly BLDC savings — calculate ₹ in minutes" */
  headline: string;
  /** One-line value prop. */
  sublabel: string;
}) {
  return (
    <Link
      href={href}
      className="group not-prose my-8 flex items-center justify-between gap-4 rounded-2xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/70 via-slate-50 to-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md md:p-6"
    >
      <div className="flex min-w-0 items-start gap-4">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm transition-transform group-hover:scale-105"
        >
          <Wrench className="h-5 w-5" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-indigo-600">
            Interactive tool · {storeName}
          </p>
          <h3 className="mt-1 text-base font-bold leading-snug text-ink">{headline}</h3>
          <p className="mt-0.5 text-xs leading-5 text-ink-soft">{sublabel}</p>
        </div>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors group-hover:bg-slate-800">
        Launch Interactive Tool
        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
    </Link>
  );
}
