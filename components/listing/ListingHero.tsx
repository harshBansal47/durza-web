import type { ReactNode } from "react";
import Link from "next/link";
import { CalendarCheck, ShieldCheck, TimerOff } from "lucide-react";
import "@/components/home/hero/hero.css";
import "./listing.css";

export interface ListingStat {
  value: string;
  label: string;
  live?: boolean;
}

/**
 * The light-theme header for the coupons, deals and stores pages: the home hero's
 * look (warm paper, soft aurora, display type, trust band) without its
 * interactive parts. It is a server component; the page passes in the real
 * numbers and the search control.
 *
 * The title keeps its exact wording for SEO; only its last word is tinted.
 * `mobile="title-only"` is for pages whose phone layout has its own sticky toolbar
 * (deals): below 768px just the h1 remains, visually hidden, as before.
 */
export default function ListingHero({
  eyebrow,
  title,
  lead,
  controls,
  chips,
  stats,
  mobile = "show",
}: {
  eyebrow?: ReactNode;
  title: string;
  lead: ReactNode;
  /** The search box. */
  controls?: ReactNode;
  chips?: { href: string; label: string }[];
  stats?: ListingStat[];
  mobile?: "show" | "title-only";
}) {
  const words = title.trim().split(/\s+/);
  const last = words.pop() ?? "";
  return (
    <section className="hx lx-hero" data-mobile={mobile}>
      <div className="hx-bg" aria-hidden="true">
        <div className="hx-aurora" />
        <div className="hx-grain" />
      </div>

      <div className="lx-hero-body">
        <div className="lx-hero-text">
          {eyebrow && (
            <span className="hx-eyebrow hx-rise" style={{ ["--i" as string]: 0 }}>
              <i aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h1 className="hx-h1 hx-rise" style={{ ["--i" as string]: 1 }}>
            {words.length > 0 ? `${words.join(" ")} ` : ""}
            <span className="hx-grad">{last}</span>
          </h1>
          <p className="hx-sub hx-rise" style={{ ["--i" as string]: 1 }}>
            {lead}
          </p>
        </div>
        {(controls || (chips && chips.length > 0)) && (
          <div className="lx-hero-side">
            {controls && (
              <div className="lx-hero-controls hx-rise" style={{ ["--i" as string]: 2 }}>
                {controls}
              </div>
            )}
            {chips && chips.length > 0 && (
              <nav className="lx-chips hx-rise" style={{ ["--i" as string]: 3 }} aria-label="Quick links">
                {chips.map((chip) => (
                  <Link key={chip.href} href={chip.href} className="lx-chip">
                    {chip.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        )}
      </div>

      <div className="lx-hero-band hx-rise" style={{ ["--i" as string]: 4 }}>
        <ul className="lx-trust">
          <li>
            <ShieldCheck aria-hidden="true" size={15} strokeWidth={2.4} />
            Offer type on every card
          </li>
          <li className="amber">
            <CalendarCheck aria-hidden="true" size={15} strokeWidth={2.4} />
            
          </li>
          <li className="blue">
            <TimerOff aria-hidden="true" size={15} strokeWidth={2.4} />
            No fake countdown timers
          </li>
        </ul>
        {stats && stats.length > 0 && (
          <dl className="lx-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="hx-num">{s.value}</dd>
                <dt className="hx-lbl">
                  {s.label}
                  {s.live && (
                    <>
                      {" "}
                      <b>· live</b>
                    </>
                  )}
                </dt>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div className="hx-seam" aria-hidden="true" />
    </section>
  );
}
