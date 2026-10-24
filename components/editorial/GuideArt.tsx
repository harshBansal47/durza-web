import Image from "next/image";
import { GuideCover, guideCoverVariant, guideStoreMentions } from "./GuideCover";

/**
 * The picture for a guide, always something relevant:
 *
 *  1. the guide's own `hero_image_url` when an editor has set one — a real
 *     photo always wins;
 *  2. otherwise a generated cover built from the guide itself: topic art plus
 *     the logos of any stores it names. No stock photos, no licences, nothing
 *     to upload, and it never goes stale.
 *
 * `unoptimized` on the real image keeps editors free to point at any host
 * without first allow-listing it in next.config.
 */
export default function GuideArt({
  title,
  summary,
  heroImageUrl,
  size = "card",
  className = "",
}: {
  title: string;
  summary: string;
  heroImageUrl: string | null;
  size?: "card" | "hero";
  className?: string;
}) {
  if (heroImageUrl) {
    return (
      <Image
        src={heroImageUrl}
        alt=""
        width={1200}
        height={675}
        unoptimized
        priority={size === "hero"}
        className={`w-full border border-ledger-line ${
          size === "hero" ? "h-auto rounded-2xl" : "aspect-[16/9] rounded-xl object-cover"
        } ${className}`}
      />
    );
  }

  return (
    <GuideCover
      variant={guideCoverVariant(title, summary)}
      storeSlugs={guideStoreMentions(title, summary)}
      size={size}
      className={className}
    />
  );
}
