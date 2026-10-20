import Image from "next/image";
import { storeLogoUrl } from "@/lib/storeLogos";

type Brand = { name: string; slug: string; aliases: string[] };

const BRANDS: Brand[] = [
  { name: "Amazon", slug: "amazon-in", aliases: ["Amazon India", "Amazon.in", "Amazon"] },
  { name: "Flipkart", slug: "flipkart", aliases: ["Flipkart"] },
  { name: "Myntra", slug: "myntra", aliases: ["Myntra"] },
  { name: "Ajio", slug: "ajio", aliases: ["Ajio", "AJIO"] },
  { name: "Nykaa", slug: "nykaa", aliases: ["Nykaa"] },
  { name: "Croma", slug: "croma", aliases: ["Croma"] },
  { name: "Meesho", slug: "meesho", aliases: ["Meesho"] },
  { name: "BigBasket", slug: "bigbasket", aliases: ["BigBasket", "Big Basket"] },
  { name: "Lenskart", slug: "lenskart", aliases: ["Lenskart"] },
  { name: "FirstCry", slug: "firstcry", aliases: ["FirstCry", "First Cry"] },
  { name: "Zomato", slug: "zomato", aliases: ["Zomato"] },
  { name: "Swiggy", slug: "swiggy", aliases: ["Swiggy"] },
  { name: "Reliance Digital", slug: "reliance-digital", aliases: ["Reliance Digital"] },
  { name: "MakeMyTrip", slug: "makemytrip", aliases: ["MakeMyTrip", "Make My Trip"] },
  { name: "Ixigo", slug: "ixigo", aliases: ["Ixigo", "ixigo"] },
];

const ALIAS_TO_BRAND = new Map<string, Brand>();
for (const brand of BRANDS) {
  for (const alias of brand.aliases) ALIAS_TO_BRAND.set(alias.toLowerCase(), brand);
}

function logoFor(brand: Brand): string | null {
  return storeLogoUrl({ slug: brand.slug, logo_url: null });
}

export function renderBrandText(text: string): React.ReactNode {
  if (!text) return text;
  const pattern = new RegExp(
    `\\b(${BRANDS.flatMap((brand) => brand.aliases).sort((a, b) => b.length - a.length).map(escapeRegExp).join("|")})\\b`,
    "gi",
  );
  const parts = text.split(pattern);
  return parts.map((part, index) => {
    const brand = ALIAS_TO_BRAND.get(part.toLowerCase());
    const logo = brand ? logoFor(brand) : null;
    if (!brand || !logo) return <span key={index}>{part}</span>;
    return (
      <span key={index} className="inline-flex items-center gap-1.5 align-middle">
        <Image
          src={logo}
          alt=""
          width={18}
          height={18}
          unoptimized
          className="h-[1.1em] w-[1.1em] rounded-sm object-contain"
        />
        <span>{part}</span>
      </span>
    );
  });
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
