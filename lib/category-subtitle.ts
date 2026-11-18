function slugFallbackSubtitle(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes("fashion")) return "Apparel, footwear, and style deals from top brands.";
  if (s.includes("electronics")) return "Laptops, gadgets, audio, and tech offers worth comparing.";
  if (s.includes("beauty") || s.includes("personal-care")) return "Skincare, grooming, and beauty picks from trusted stores.";
  if (s.includes("health") || s.includes("fitness") || s.includes("supplement")) return "Wellness, nutrition, and fitness essentials with live offers.";
  if (s.includes("home") || s.includes("kitchen") || s.includes("furniture")) return "Home, kitchen, and appliance deals for everyday upgrades.";
  if (s.includes("travel")) return "Flights, stays, and travel essentials with active offers.";
  if (s.includes("food") || s.includes("grocery")) return "Food, grocery, and daily essentials offers.";
  if (s.includes("baby") || s.includes("kids")) return "Baby, kids, and family essentials from verified stores.";
  return "Browse live coupons, deals, and stores in this category.";
}

export function categorySubtitle(category: { slug: string; description?: string | null }): string {
  const desc = category.description?.trim();
  if (desc) return desc;
  return slugFallbackSubtitle(category.slug);
}
