import Image from "next/image";
import Link from "next/link";
import { storeLogoUrl } from "@/lib/storeLogos";
import type { Store } from "@/lib/types";

/** Where to go from a dead end: the stores with the most live offers, and the categories. */
export default function PopularChips({
  stores,
  categories,
}: {
  stores: Store[];
  categories: { id: string; name: string; slug: string }[];
}) {
  const topStores = [...stores]
    .sort((a, b) => (b.offer_count ?? 0) - (a.offer_count ?? 0))
    .slice(0, 8);
  const chip =
    "inline-flex items-center gap-2 rounded-full border border-ledger-line bg-white px-3 py-1.5 text-sm text-ink transition-colors hover:border-inkblue";

  return (
    <div className="mt-8 space-y-5 text-left">
      {topStores.length > 0 && (
        <div>
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Popular stores
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {topStores.map((store) => {
              const logo = storeLogoUrl(store);
              return (
                <li key={store.id}>
                  <Link href={`/stores/${store.slug}`} className={chip}>
                    {logo && (
                      <Image
                        src={logo}
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 rounded-full border border-ledger-line bg-paper object-contain"
                      />
                    )}
                    {store.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {categories.length > 0 && (
        <div>
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Browse by category
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {categories.slice(0, 8).map((category) => (
              <li key={category.id}>
                <Link href={`/categories/${category.slug}`} className={chip}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
