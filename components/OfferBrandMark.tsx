"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { storeLogoUrl } from "@/lib/storeLogos";
import { storeInitials } from "@/lib/catalog";

export interface OfferBrand {
  id?: string;
  name: string;
  slug: string;
  logo_url?: string | null;
  website_url?: string | null;
}

/**
 * The tiny brand identity row — logo + name + arrow — used wherever offers
 * from several stores share a grid (homepage explorer deals feed). Logo falls
 * back to the store's monogram initials on error.
 */
export default function OfferBrandMark({ brand }: { brand: OfferBrand }) {
  const [failed, setFailed] = useState(false);
  const logo = storeLogoUrl(brand);

  return (
    <Link
      href={`/stores/${brand.slug}`}
      className="group/brand mb-3 flex w-fit min-w-0 items-center gap-2 rounded-lg px-1 py-1 transition-colors hover:bg-slate-50"
      aria-label={`${brand.name} store hub`}
    >
      {!logo || failed ? (
        <span
          aria-hidden="true"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-900 text-[10px] font-bold tracking-tight text-white"
        >
          {storeInitials(brand.name)}
        </span>
      ) : (
        <Image
          src={logo}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 shrink-0 rounded-md border border-slate-100 object-contain"
          onError={() => setFailed(true)}
        />
      )}
      <span className="truncate text-xs font-semibold text-slate-700 transition-colors group-hover/brand:text-indigo-600">
        {brand.name}
      </span>
      <ArrowRight
        aria-hidden="true"
        className="h-3 w-3 shrink-0 text-slate-400 transition-transform duration-150 group-hover/brand:translate-x-0.5 group-hover/brand:text-indigo-600"
        strokeWidth={2}
      />
    </Link>
  );
}
