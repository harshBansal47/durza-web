import OfferCard from "@/components/OfferCard";
import { storeGoHref } from "@/lib/go";
import type { StoreOfferCard } from "@/lib/store-offers";

/** Shared live-offers grid for custom brand-store pages. */
export default function LiveOffersSection({
  offers,
  storeSlug,
  domain,
}: {
  offers: StoreOfferCard[];
  storeSlug: string;
  domain: string;
}) {
  if (offers.length === 0) return null;
  return (
    <section className="mt-10" aria-labelledby="live-offers">
      <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on {domain}.
      </p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <li key={offer.id} className="min-h-0">
            <OfferCard
              bookmarkId={offer.id}
              code={offer.code}
              badge={offer.badge}
              title={offer.title}
              description={offer.description}
              ctaHref={offer.targetUrl || storeGoHref(storeSlug, "offer-card")}
              expiresAt={offer.expiresAt}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
