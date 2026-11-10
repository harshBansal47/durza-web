"use client";

import { useState } from "react";
import Image from "next/image";
import { PackageOpen } from "lucide-react";
import { api } from "@/lib/api";
import { formatDate, formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  categoryName: string;
  presentation?: {
    promotionalBadge?: string | null;
    rating?: number | string | null;
    reviewCount?: number | string | null;
    verifiedAt?: string | null;
    ctaText?: string | null;
  };
}

export default function ProductCard({
  product,
  categoryName,
  presentation,
}: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const price = product.effective_price ?? product.current_price;
  const originalPrice = product.list_price;
  const discountPercent =
    price !== null && originalPrice !== null && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;
  const savings =
    price !== null && originalPrice !== null && originalPrice > price ? originalPrice - price : null;
  const capturedAt =
    product.last_captured_at && Number.isFinite(Date.parse(product.last_captured_at))
      ? product.last_captured_at
      : null;
  const hasPriceDrop =
    product.last_price_drop_at !== null &&
    product.last_price_drop_pct !== null &&
    product.last_price_drop_pct > 0;
  const rating = presentation?.rating == null ? null : Number(presentation.rating);
  const reviewCount =
    presentation?.reviewCount == null
      ? null
      : Number(String(presentation.reviewCount).replaceAll(",", ""));
  const verifiedAt =
    presentation?.verifiedAt && Number.isFinite(Date.parse(presentation.verifiedAt))
      ? presentation.verifiedAt
      : null;
  const badge = presentation?.promotionalBadge?.trim() || (hasPriceDrop ? "Price drop" : null);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-ledger-line bg-white shadow-[var(--shadow-hairline)] transition-shadow duration-200 hover:shadow-[var(--shadow-raised)]">
      <div className="relative block aspect-square overflow-hidden bg-paper-alt">
        {product.image_url && !imageFailed ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="object-contain p-3 transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="flex h-full flex-col items-center justify-center gap-2 text-ink-soft">
            <PackageOpen aria-hidden="true" size={30} strokeWidth={1.5} />
            <span className="text-xs">Image unavailable</span>
          </span>
        )}
        {discountPercent !== null && discountPercent > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-durza px-2 py-1 text-[11px] font-bold text-white">
            {discountPercent}% off
          </span>
        )}
        {badge && (
          <span className="absolute right-2 top-2 rounded-md border border-ink/10 bg-white/95 px-2 py-1 text-[11px] font-semibold text-ink">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">{categoryName}</p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.75rem] text-sm font-medium leading-5 text-ink">
          {product.name}
        </h3>
        {rating !== null && Number.isFinite(rating) && rating >= 0 && rating <= 5 && (
          <p className="mt-1 text-xs text-ink-soft">
            <span aria-label={`${rating.toFixed(1)} out of 5 stars`}>★ {rating.toFixed(1)}</span>
            {reviewCount !== null && Number.isSafeInteger(reviewCount) && reviewCount > 0 && (
              <span> · {reviewCount.toLocaleString("en-IN")} reviews</span>
            )}
          </p>
        )}

        <div className="mt-3 min-h-[3.25rem]">
          {price !== null ? (
            <>
              <p className="font-mono text-lg font-bold leading-tight text-ink">
                {formatMoney(price, product.currency)}
              </p>
              {originalPrice !== null && originalPrice > price && (
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                  <span className="font-mono text-ink-soft line-through">
                    {formatMoney(originalPrice, product.currency)}
                  </span>
                  {savings !== null && savings > 0 && (
                    <span className="font-medium text-verified-ink">
                      Save {formatMoney(savings, product.currency)}
                    </span>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-sm font-medium text-ink-soft">Price unavailable</p>
          )}
        </div>

        {(capturedAt || verifiedAt) && (
          <p className="mt-2 text-[11px] text-ink-soft">
            {verifiedAt ? "Verified" : "Price captured"}{" "}
            <time dateTime={verifiedAt ?? capturedAt ?? undefined}>
              {formatDate(verifiedAt ?? capturedAt)}
            </time>
          </p>
        )}

        {product.has_url && (
          <a
            href={api.productGoUrl(product.id, "storefront")}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            aria-label={`View product at the store: ${product.name} (opens in a new tab)`}
            className="btn btn-cta mt-auto min-h-11 w-full justify-center px-2 text-center text-xs sm:text-sm"
          >
            {presentation?.ctaText?.trim() || "View product"}
          </a>
        )}
      </div>
    </article>
  );
}
