import { listPages, type ContentPage } from "@/lib/content";

const GUIDE_CATEGORY_HINTS: Record<string, RegExp> = {
  beauty: /beauty|personal care|groom|skin|fragrance|perfume|cosmetic|menstrual|intimate/i,
  fashion: /fashion|lifestyle|apparel|eyewear|footwear|handbag|denim/i,
  supplements: /nutrition|supplement|whey|protein|ayurveda|clinical|multivitamin|clean nutrition/i,
  fitness: /fitness|gym|home gym|recovery|protein|whey/i,
  electronics: /electronic|tech|audio|gadget|appliance|laptop/i,
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

/**
 * Category pages rank editorial guides from the database. No guide titles,
 * summaries or metadata live in this file — only the category hints used for
 * matching.
 */
export async function guidesForCategory(
  categorySlug: string,
  categoryName: string,
  storeSlugsInCategory: Set<string>,
): Promise<ContentPage[]> {
  const allGuides = await listPages("guide");
  const hint = GUIDE_CATEGORY_HINTS[categorySlug];
  const categoryNeedle = categoryName.toLowerCase();

  const scored = allGuides
    .map((guide) => {
      const structured = guide.structured_data as Record<string, unknown>;
      const declaredCategory = typeof structured.category === "string" ? structured.category : "";
      const haystack = `${guide.slug} ${guide.title} ${guide.description} ${declaredCategory}`.toLowerCase();
      let score = 0;
      if (storeSlugsInCategory.has(guide.slug)) score += 5;
      for (const storeSlug of storeSlugsInCategory) {
        if (haystack.includes(storeSlug.toLowerCase().replace(/-/g, " "))) score += 2;
      }
      if (hint?.test(haystack)) score += 2;
      if (categoryNeedle && haystack.includes(categoryNeedle)) score += 2;
      return { guide, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.guide.slug.localeCompare(b.guide.slug));

  return scored.slice(0, 12).map((item) => item.guide);
}
