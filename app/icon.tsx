import { ImageResponse } from "next/og";
import { markSvg, svgDataUri } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Durza "D" mark (orange tile, white D with a coupon-stub notch).
export default function Icon() {
  return new ImageResponse(
    (
      <img
        src={svgDataUri(markSvg())}
        width={size.width}
        height={size.height}
        alt=""
      />
    ),
    size,
  );
}
