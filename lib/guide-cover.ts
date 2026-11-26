const COVER = {
  laptops: "/guides/laptops.webp",
  mobile: "/guides/mobile.webp",
  homeOffice: "/guides/homeOffice.webp",
  cyber: "/guides/cyber.webp",
  festive: "/guides/festive.webp",
  sale: "/guides/sale.webp",
  bank: "/guides/bank.webp",
  beauty: "/guides/beauty.webp",
  fashion: "/guides/fashion.webp",
  supplements: "/guides/supplements.webp",
  fitness: "/guides/fitness.webp",
  home: "/guides/home.webp",
  travel: "/guides/travel.webp",
  trust: "/guides/trust.webp",
} as const;

export function isStoreLogoPath(path?: string | null): boolean {
  if (!path) return false;
  return /^\/stores\//.test(path) && /\.(png|webp|jpe?g|svg)$/i.test(path);
}

function includesAny(text: string, words: string[]): boolean {
  return words.some((w) => text.includes(w));
}

export function getGuideCoverImage(input: {
  slug?: string;
  title?: string;
  summary?: string;
  category?: string;
  image?: string | null;
}): string {
  const slug = (input.slug || "").toLowerCase();
  const title = (input.title || "").toLowerCase();
  const summary = (input.summary || "").toLowerCase();
  const category = (input.category || "").toLowerCase();
  const text = `${slug} ${title} ${summary} ${category}`;
  const image = input.image ?? undefined;

  const isDuplicatedSeasonal =
    slug === "cyber-monday-india-2026-deals" ||
    slug === "diwali-sale-2026-date-and-best-buys" ||
    slug === "christmas-new-year-sale-india-2026" ||
    slug === "republic-day-sale-india-2026-date-and-deals";

  if (image && !isStoreLogoPath(image) && !isDuplicatedSeasonal) {
    return image;
  }

  if (includesAny(text, ["trust", "verification", "methodology"])) return COVER.trust;
  if (includesAny(text, ["cyber monday", "cyber-monday"])) return COVER.cyber;
  if (includesAny(text, ["christmas", "new year", "festive gifting", "republic day", "diwali", "rakhi"])) return COVER.festive;
  if (includesAny(text, ["black friday", "mega sale", "sale calendar", "sale dates", "big billion", "great indian festival"])) return COVER.sale;
  if (includesAny(text, ["credit card", "bank offer", "bank offers", "emi", "hdfc", "icici", "rbl", "sbi card"])) return COVER.bank;
  if (includesAny(text, ["laptop", "pc", "acer", "lenovo", "asus", "thinkpad", "macbook", "notebook", "desktop"])) return COVER.laptops;
  if (includesAny(text, ["smartphone", "mobile", "audio", "earbud", "headphone", "tws", "phone"])) return COVER.mobile;
  if (includesAny(text, ["home office", "desk", "wfh", "work from home", "work-from-home"])) return COVER.homeOffice;
  if (includesAny(text, ["skincare", "beauty", "ayurveda", "haircare", "sunscreen", "serum", "moisturizer", "niacinamide"])) return COVER.beauty;
  if (includesAny(text, ["fashion", "footwear", "bag", "apparel", "shoe", "sneaker", "wardrobe", "clothing"])) return COVER.fashion;
  if (includesAny(text, ["supplement", "protein", "whey", "creatine", "multivitamin", "omega", "ayurveda nutrition", "shilajit"])) return COVER.supplements;
  if (includesAny(text, ["fitness", "home gym", "running", "workout", "yoga", "exercise"])) return COVER.fitness;
  if (includesAny(text, ["home appliance", "furniture", "kitchen", "appliance", "geyser", "fan", "mattress"])) return COVER.home;
  if (includesAny(text, ["travel", "flight", "hotel", "holiday", "trip"])) return COVER.travel;

  // category fallbacks
  if (includesAny(category, ["electronics", "laptop", "tech"])) return COVER.laptops;
  if (includesAny(category, ["beauty", "skincare", "grooming"])) return COVER.beauty;
  if (includesAny(category, ["fashion", "footwear", "accessories"])) return COVER.fashion;
  if (includesAny(category, ["supplement", "fitness", "nutrition", "health"])) return COVER.fitness;
  if (includesAny(category, ["home", "appliance", "kitchen", "furniture"])) return COVER.home;
  if (includesAny(category, ["travel"])) return COVER.travel;
  if (includesAny(category, ["bank", "card", "sale"])) return COVER.bank;

  return COVER.sale;
}

export type GuideHubCategory =
  | "All Guides"
  | "Electronics & Laptops"
  | "Sale & Bank Math"
  | "Beauty & Skincare"
  | "Fashion & Footwear"
  | "Supplements & Fitness"
  | "Home & Appliances"
  | "Travel & Lifestyle";

export function guideHubCategory(input: { slug?: string; title?: string; summary?: string; category?: string }): GuideHubCategory {
  const slug = (input.slug || "").toLowerCase();
  const title = (input.title || "").toLowerCase();
  const summary = (input.summary || "").toLowerCase();
  const category = (input.category || "").toLowerCase();
  const text = `${slug} ${title} ${summary} ${category}`;

  if (includesAny(text, ["sale", "black friday", "cyber monday", "diwali", "christmas", "new year", "republic day", "calendar", "bank", "credit card", "emi", "hdfc", "icici", "rbl", "sbi"])) {
    return "Sale & Bank Math";
  }
  if (includesAny(text, ["laptop", "pc", "acer", "lenovo", "asus", "smartphone", "mobile", "audio", "earbud", "headphone", "tws", "phone", "tech", "electronics"])) {
    return "Electronics & Laptops";
  }
  if (includesAny(text, ["skincare", "beauty", "ayurveda", "haircare", "sunscreen", "serum", "grooming", "personal care"])) {
    return "Beauty & Skincare";
  }
  if (includesAny(text, ["fashion", "footwear", "bag", "apparel", "shoe", "sneaker", "wardrobe", "clothing", "activewear"])) {
    return "Fashion & Footwear";
  }
  if (includesAny(text, ["supplement", "protein", "whey", "fitness", "home gym", "running", "workout", "yoga", "nutrition", "shilajit", "multivitamin"])) {
    return "Supplements & Fitness";
  }
  if (includesAny(text, ["home", "appliance", "furniture", "kitchen", "geyser", "fan"])) {
    return "Home & Appliances";
  }
  if (includesAny(text, ["travel", "flight", "hotel", "holiday"])) {
    return "Travel & Lifestyle";
  }
  return "Travel & Lifestyle";
}
