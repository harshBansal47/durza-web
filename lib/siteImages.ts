/** Local editorial imagery matched from explicit topic words in content. */
export function guideImageFor(title: string, summary: string): string | null {
  const topic = `${title} ${summary}`.toLowerCase();
  if (/\bamazon\b/.test(topic)) return "/site_images/amazon_shopping_banner.webp";
  if (/\b(myntra|fashion|clothing|apparel)\b/.test(topic)) return "/site_images/myntra_fashion_banner.webp";
  if (/\b(credit card|bank card|credit-card|cashback card|emi)\b/.test(topic)) {
    return "/site_images/credit_cards_banner.webp";
  }
  if (/\b(buying guide|shopping guide|how to shop|online shopping)\b/.test(topic)) {
    return "/site_images/banner_buying_guide.webp";
  }
  return null;
}

/** Pick a category image only when the category's own name or slug matches. */
export function categoryImageFor(category: { name?: string | null; slug: string }): string | null {
  const topic = `${category.slug} ${category.name ?? ""}`.toLowerCase().replace(/[_-]+/g, " ");
  if (/\b(grocer|grocery|groccery|food|supermarket)\b/.test(topic)) return "/site_images/groccery.webp";
  if (/\b(travel|flight|holiday|hotel)\b/.test(topic)) return "/site_images/travel.webp";
  if (/\b(beauty|skin care|skincare|cosmetic)\b/.test(topic)) return "/site_images/beauty.webp";
  if (/\b(fashion|clothing|apparel|wear)\b/.test(topic)) return "/site_images/fashion.webp";
  if (/\b(appliance|home and kitchen|kitchen)\b/.test(topic)) return "/site_images/appliances.webp";
  if (/\b(credit|bank|card)\b/.test(topic)) return "/site_images/cards.webp";
  if (/\b(electronic|shopping|ecommerce|online)\b/.test(topic)) return "/site_images/ecommerce.webp";
  return null;
}
