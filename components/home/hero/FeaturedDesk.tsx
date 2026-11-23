"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { dealEndsLabel, type HeroDeal } from "@/lib/home-hero";
import CopyCodeButton from "./CopyCodeButton";
import StoreMark from "./StoreMark";
import { usePrefersReducedMotion } from "./hooks";

const ROTATE_MS = 6000;

/**
 * "Featured right now": up to four live offers, one highlighted. The highlight
 * advances every 6s, holds while hovered or focused (and never auto-advances for
 * people who prefer reduced motion); the dots jump straight to a card. The
 * rotation is a single timeout keyed on the current index, so a click or a state
 * change always restarts it and two timers can never run together.
 */
export default function FeaturedDesk({
  deals,
  total,
  onOpenDeal,
}: {
  deals: HeroDeal[];
  total: number;
  onOpenDeal: (deal: HeroDeal) => void;
}) {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const reduced = usePrefersReducedMotion();
  const count = deals.length;

  useEffect(() => {
    if (held || reduced || count < 2) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearTimeout(timer);
  }, [index, held, reduced, count]);

  const allVerified = count > 0 && deals.every((d) => d.verified);

  return (
    <aside
      className="hx-desk hx-rise"
      style={{ ["--i" as string]: 3 }}
      aria-label="Featured offers"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
      }}
    >
      <div className="hx-desk-head">
        <span className="hx-desk-title">Featured right now</span>
        <span className="hx-live">
          <span className="hx-pulse" aria-hidden="true" />
          {allVerified ? "CHECKED OUT" : "LIVE"}
        </span>
        {count > 1 && (
          <div className="hx-dots">
            {deals.map((deal, i) => (
              <button
                key={deal.id}
                type="button"
                className="hx-dot"
                aria-label={`Highlight offer ${i + 1} of ${count}: ${deal.store.name}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      {count === 0 ? (
        <div className="hx-desk-empty">
          <b>No featured offers right now</b>
          We would rather show nothing than pad this panel with offers we cannot source. Browse all coupons instead.
        </div>
      ) : (
        deals.map((deal, i) => {
          const hot = i === index;
          const ends = dealEndsLabel(deal);
          return (
            <article key={deal.id} className={`hx-fcard${hot ? " hot" : ""}`}>
              {hot && <span className="hx-fcard-tag">{deal.verified ? "TOP CHECK" : "FEATURED"}</span>}
              <StoreMark store={deal.store} size={44} />
              <div className="hx-fc-body">
                <div className="hx-fc-store">
                  <span>{deal.store.name}</span>
                  {deal.category && <span className="cat">· {deal.category}</span>}
                </div>
                <button type="button" className="hx-fc-open" onClick={() => onOpenDeal(deal)}>
                  {deal.title}
                </button>
                <div className="hx-fc-row">
                  {deal.code ? (
                    <CopyCodeButton deal={deal} />
                  ) : (
                    <span className="hx-codebtn view" aria-hidden="true">
                      VIEW DEAL →
                    </span>
                  )}
                  {deal.checkedLabel && (
                    <span className="hx-fc-check">
                      {deal.verified && (
                        <span className="v">
                          <BadgeCheck aria-hidden="true" size={12} strokeWidth={2.6} />
                        </span>
                      )}
                      checked {deal.checkedLabel}
                    </span>
                  )}
                </div>
              </div>
              <div className="hx-fc-off">
                {deal.discount}
                {ends && <small>{ends}</small>}
              </div>
            </article>
          );
        })
      )}

      <div className="hx-desk-foot">
        <Link href="/coupons?sort=recommended" className="hx-desk-all">
          {total > 0 ? `All ${total.toLocaleString("en-IN")} coupons` : "All coupons"}
          <ArrowRight aria-hidden="true" size={14} strokeWidth={2.6} />
        </Link>
        {count > 1 && <span className="hx-desk-note">Rotates every 6s · hover to hold</span>}
      </div>
    </aside>
  );
}
