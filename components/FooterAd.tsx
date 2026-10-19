import SponsoredCard from "@/components/SponsoredCard";
import { getSponsored } from "@/lib/ads";

/**
 * The footer's sponsored slot.
 *
 * Rendered behind a Suspense boundary in the layout so a slow ad request can
 * never hold up the rest of the page — the layout is the one part of every
 * route that cannot be skipped, and an ad is the least important thing on it.
 */
export default async function FooterAd() {
  const ad = await getSponsored("footer");
  if (!ad) return null;

  return (
    <div className="mx-auto mb-8 max-w-6xl px-4 sm:px-6">
      <SponsoredCard ad={ad} src="ad-footer" aspect="aspect-[4/1] sm:aspect-[6/1]" />
    </div>
  );
}

/** Holds the ad's place so the footer does not jump when it streams in. */
export function FooterAdFallback() {
  return (
    <div className="mx-auto mb-8 max-w-6xl px-4 sm:px-6" aria-hidden="true">
      <div className="aspect-[4/1] w-full sm:aspect-[6/1]" />
    </div>
  );
}
