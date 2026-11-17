import { STORE_TOOLS, type StoreTool, type ToolCategory } from "@/lib/store-tools";
import { STORE_GUIDES, type StaticGuide } from "@/data/store-guides";

const TOOL_CATEGORIES_FOR_SITE: Record<string, ToolCategory[]> = {
  beauty: ["beauty"],
  fashion: ["fashion"],
  supplements: ["fitness"],
  fitness: ["fitness"],
  electronics: ["tech"],
  "home-kitchen": ["home"],
  grocery: ["home", "fitness"],
  software: ["tech"],
  "ai-tools": ["tech"],
  vpn: ["tech"],
  "vpn-security": ["tech"],
  hosting: ["tech"],
  finance: ["tech"],
  "tools-hardware": ["home", "tech"],
  "baby-kids": ["family"],
  gifts: ["family"],
  travel: ["family"],
  "food-delivery": ["family"],
  other: [],
  ecommerce: ["fashion", "home", "tech"],
};

const GUIDE_CATEGORY_HINTS: Record<string, RegExp> = {
  beauty: /beauty|personal care|groom|skin|fragrance|perfume|cosmetic|menstrual|intimate/i,
  fashion: /fashion|lifestyle|apparel|eyewear|footwear|handbag|denim/i,
  supplements: /nutrition|supplement|whey|protein|ayurveda|clinical|multivitamin|clean nutrition/i,
  fitness: /fitness|gym|home gym|recovery|protein|whey/i,
  electronics: /electronic|tech|audio|gadget|appliance/i,
  "home-kitchen": /home|kitchen|furniture|cookware|fan|thermo|pantry/i,
  grocery: /grocery|food|pantry|oats|peanut/i,
  software: /software|digital|course|skill|bill|payment|vpn|password|astro/i,
  "ai-tools": /ai|software|video/i,
  vpn: /vpn|security|password/i,
  "vpn-security": /vpn|security|password/i,
  hosting: /hosting|software|digital/i,
  finance: /bank|card|finance|payment|bill/i,
  "tools-hardware": /tool|hardware|industrial|bldc|gst/i,
  "baby-kids": /baby|kids|parent|diaper|gear/i,
  gifts: /gift|hamper|cake|celebration/i,
  travel: /travel|rail|flight|hotel/i,
  "food-delivery": /food|delivery|dining/i,
};

export function toolsForCategory(categorySlug: string, storeSlugsInCategory: Set<string>): StoreTool[] {
  const mapped = TOOL_CATEGORIES_FOR_SITE[categorySlug] ?? [];
  const byCategory = new Set(mapped);
  const seen = new Set<string>();
  const out: StoreTool[] = [];
  for (const tool of STORE_TOOLS) {
    if (seen.has(tool.id)) continue;
    const storeMatch = storeSlugsInCategory.has(tool.store) || storeSlugsInCategory.has(tool.href.replace(/^\/stores\//, "").split(/[/?#]/)[0] || "");
    const categoryMatch = byCategory.has(tool.category);
    if (storeMatch || (categoryMatch && storeSlugsInCategory.size === 0)) {
      // prefer store match, or category match when clearly relevant
      if (storeMatch || categoryMatch) {
        seen.add(tool.id);
        out.push(tool);
      }
    }
  }
  // if nothing matched by store but we have mapped tool categories, include category-matching tools
  if (out.length === 0 && byCategory.size > 0) {
    for (const tool of STORE_TOOLS) {
      if (byCategory.has(tool.category)) out.push(tool);
    }
  }
  return out.slice(0, 12);
}

export function guidesForCategory(categorySlug: string, categoryName: string, storeSlugsInCategory: Set<string>): StaticGuide[] {
  const hint = GUIDE_CATEGORY_HINTS[categorySlug];
  const seen = new Set<string>();
  const scored: Array<{ g: StaticGuide; score: number }> = [];
  for (const g of STORE_GUIDES) {
    if (seen.has(g.slug)) continue;
    let score = 0;
    if (storeSlugsInCategory.has(g.storeSlug)) score += 5;
    if (g.relatedStores?.some((s: string) => storeSlugsInCategory.has(s))) score += 2;
    if (g.category && (hint?.test(g.category) || g.category.toLowerCase().includes(categoryName.toLowerCase()))) score += 2;
    if (hint?.test(`${g.seo?.title ?? ""} ${g.summary ?? ""}`)) score += 1;
    if (score > 0) {
      seen.add(g.slug);
      scored.push({ g, score });
    }
  }
  scored.sort((a, b) => b.score - a.score || a.g.slug.localeCompare(b.g.slug));
  return scored.map((x) => x.g).slice(0, 12);
}
