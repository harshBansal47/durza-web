/**
 * Single source of truth for the three-row header.
 *
 * Tier 1 sits in the sticky Primary nav, tier 3 in the scrolling Secondary
 * strip. Every href is an existing route — this file never invents one.
 */
export type NavIcon = "shield" | "sparkles" | "bookmark" | "compass";

export interface SiteNavItem {
  label: string;
  href: string;
  tier: 1 | 3;
  icon?: NavIcon;
  badge?: string;
  /** Seasonal accent pill; remove the flag to turn it off. */
  seasonal?: boolean;
}

export const SITE_NAV: readonly SiteNavItem[] = [
  { label: "Comparisons", href: "/compare", tier: 1 },
  { label: "Guides", href: "/guides", tier: 1 },
  { label: "Reviews", href: "/reviews", tier: 1 },
  { label: "Coupons", href: "/coupons", tier: 3 },
  { label: "Deals", href: "/deals", tier: 3 },
  { label: "Stores", href: "/stores", tier: 3 },
  { label: "Categories", href: "/categories", tier: 3 },
  { label: "Collections", href: "/collections", tier: 3 },
  { label: "Bank & card offers", href: "/bank-offers", tier: 3 },
  {
    label: "Black Friday 2026",
    href: "/black-friday",
    tier: 3,
    icon: "sparkles",
    badge: "Seasonal",
    seasonal: true,
  },
  { label: "How we research", href: "/methodology", tier: 3, icon: "shield" },
  { label: "Saved", href: "/saved", tier: 3, icon: "bookmark" },
] as const;

export const PRIMARY_NAV = SITE_NAV.filter((item) => item.tier === 1);
export const SECONDARY_NAV = SITE_NAV.filter((item) => item.tier === 3);
export const SAVED_NAV = SITE_NAV.find((item) => item.href === "/saved");

/** Right-hand call to action in the primary row, outside the scrolling strip. */
export const EXPLORE_TOPICS_NAV = {
  label: "Explore all topics",
  href: "/topics",
  icon: "compass",
} as const satisfies Pick<SiteNavItem, "label" | "href"> & { icon: NavIcon };
