import Image from "next/image";
import { guideImageFor } from "@/lib/siteImages";
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
  const localImage = guideImageFor(title, summary);

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

  if (localImage) {
    return (
      <Image
        src={localImage}
        alt=""
        width={1200}
        height={675}
        priority={size === "hero"}
        sizes={size === "hero" ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
        className={`w-full border border-ledger-line object-cover ${
          size === "hero" ? "aspect-[16/9] rounded-2xl" : "aspect-[16/9] rounded-xl"
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
