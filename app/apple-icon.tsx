import { ImageResponse } from "next/og";
import { markSvg, svgDataUri } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own rounded-corner mask, so ship a full-bleed square.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <img
        src={svgDataUri(markSvg({ rounded: false }))}
        width={size.width}
        height={size.height}
        alt=""
      />
    ),
    size,
  );
}
