import { resilient } from "@/lib/api";
import { GO_REL } from "@/lib/go";

/**
 * Sponsored affiliate banner slot for a store's connected affiliate programs.
 *
 * Banners are Admitad-supplied creatives rendered as an <img> inside a
 * rel="sponsored nofollow noopener" link to /go/{slug} — never as a raw embed,
 * so every banner click goes through the same redirect the rest of the site
 * uses: `/go` records the click with src=banner-store and the creative id as
 * content_ref, then resolves the store to its matched Admitad campaign with
 * the click-reference attached. That gives us per-banner placement attribution
 * in click_events without exposing any network name in the markup.
 *
 * Renders nothing when a store has no banner-capable program (or the API is
 * unreachable) — no placeholder, no filler.
 */
export default async function StoreBannerAds({ slug }: { slug: string }) {
  const creatives = await resilient.getStoreCreatives(slug, 1);
  const [top] = creatives;
  if (!top) return null;

  const contentRef = `${top.campaign_id}:${top.id}`.slice(0, 80);
  return (
    <figure className="mb-2 mt-8 flex flex-col items-center">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-widest text-ink-soft">
        Sponsored
      </p>
      <a
        href={`/go/${encodeURIComponent(slug)}?src=banner-store&content_ref=${encodeURIComponent(contentRef)}`}
        rel={GO_REL}
        target="_blank"
        className="mt-1 block max-w-full overflow-hidden rounded-lg border border-ledger-line transition-shadow hover:shadow-md"
      >
        {/* Plain <img>: the CDN is Admitad's own, and sizing is taken from the creative itself */}
        <img
          src={top.image_url}
          alt={`Advertisement — ${top.name}`}
          width={top.width}
          height={top.height}
          loading="lazy"
          decoding="async"
          className="h-auto w-auto max-w-full"
        />
      </a>
    </figure>
  );
}
