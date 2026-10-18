"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TABS = [
  { href: "/account", label: "Overview" },
  { href: "/account/saved", label: "Saved" },
  { href: "/account/products", label: "Tracked" },
  { href: "/account/alerts", label: "Alerts" },
  { href: "/account/notifications", label: "Notifications" },
  { href: "/account/settings", label: "Settings" },
];

const VISITS_KEY = "durza.account_tab_visits";

function readVisits(): Record<string, number> {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(VISITS_KEY) ?? "{}");
    if (raw && typeof raw === "object") return raw as Record<string, number>;
  } catch {
    /* ignore */
  }
  return {};
}

function recordVisit(href: string): void {
  try {
    const v = readVisits();
    v[href] = (v[href] ?? 0) + 1;
    localStorage.setItem(VISITS_KEY, JSON.stringify(v));
  } catch {
    /* best effort */
  }
}

/**
 * Adaptive account tab rail (§22). Tabs the visitor actually uses float to the
 * front; tabs they have never touched keep their default order after the
 * front-runners. "Overview" stays first so the landing page is always reachable.
 */
export default function AccountTabs({
  active,
  counts,
}: {
  active: string;
  counts?: Partial<Record<string, number>>;
}) {
  const [ordered, setOrdered] = useState(TABS);

  useEffect(() => {
    const visits = readVisits();
    const ranked = [...TABS].sort((a, b) => {
      if (a.href === "/account") return -1;
      if (b.href === "/account") return 1;
      return (visits[b.href] ?? 0) - (visits[a.href] ?? 0);
    });
    setOrdered(ranked);
  }, []);

  return (
    <nav
      aria-label="Account sections"
      className="-mb-px overflow-x-auto border-b border-ledger-line scrollbar-hide"
    >
      <ul className="flex min-w-max">
        {ordered.map((tab) => {
          const isActive = tab.href === active;
          const count = counts?.[tab.href];
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => recordVisit(tab.href)}
                className={[
                  "inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm whitespace-nowrap transition-colors",
                  isActive
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-soft hover:border-ledger-line hover:text-ink",
                ].join(" ")}
              >
                {tab.label}
                {count !== undefined && count > 0 && (
                  <span className="font-mono text-[10px] text-ink-soft">{count}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
