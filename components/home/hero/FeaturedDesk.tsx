"use client";

import Link from "next/link";
import {
  ArrowRight,
  Baby,
  CreditCard,
  Cpu,
  Dumbbell,
  LayoutGrid,
  Shirt,
  Sparkles,
  Utensils,
} from "lucide-react";
import { dealEndsLabel, type HeroDeal } from "@/lib/home-hero";
import CopyCodeButton from "./CopyCodeButton";
import StoreMark from "./StoreMark";

const CATEGORY_SHORTCUTS = [
  { label: "Baby & Kids", href: "/categories/baby-kids", icon: Baby },
  { label: "Beauty & Grooming", href: "/categories/beauty", icon: Sparkles },
  { label: "Electronics", href: "/categories/electronics", icon: Cpu },
  { label: "Fashion", href: "/categories/fashion", icon: Shirt },
  { label: "Finance & Cards", href: "/categories/finance", icon: CreditCard },
  { label: "Fitness", href: "/categories/fitness", icon: Dumbbell },
  { label: "Food Delivery", href: "/categories/food-delivery", icon: Utensils },
  { label: "All categories", href: "/categories", icon: LayoutGrid },
] as const;

/** One real featured offer, plus compact category shortcuts. No rotation UI. */
export default function FeaturedDesk({
  deals,
  total,
  onOpenDeal,
}: {
  deals: HeroDeal[];
  total: number;
  onOpenDeal: (deal: HeroDeal) => void;
}) {
  const count = deals.length;

  return (
    <aside
      className="hx-desk hx-rise"
      style={{ ["--i" as string]: 3 }}
      aria-label={count > 1 ? "Featured offers" : "Featured offer"}
    >
      <div className="hx-desk-head">
        <span className="hx-desk-title">{count > 1 ? "Featured offers" : "Featured offer"}</span>
        <span className="hx-live">
          <span className="hx-pulse" aria-hidden="true" />
          LIVE
        </span>
      </div>

      {count === 0 ? (
        <div className="hx-desk-empty">
          <b>No featured offers right now</b>
          We would rather show nothing than pad this panel with offers we cannot source. Browse all coupons instead.
        </div>
      ) : (
        deals.map((deal) => {
          const ends = dealEndsLabel(deal);
          return (
            <article key={deal.id} className="hx-fcard">
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

      <div className="hx-deskcats">
        <p className="hx-deskcats-title">Shop by category</p>
        <div className="hx-deskcats-grid">
          {CATEGORY_SHORTCUTS.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} className="hx-deskcat">
              <Icon aria-hidden="true" size={14} strokeWidth={1.9} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="hx-desk-foot">
        <Link href="/coupons?sort=recommended" className="hx-desk-all">
          {total > 0 ? `All ${total.toLocaleString("en-IN")} coupons` : "All coupons"}
          <ArrowRight aria-hidden="true" size={14} strokeWidth={2.6} />
        </Link>
      </div>
    </aside>
  );
}
