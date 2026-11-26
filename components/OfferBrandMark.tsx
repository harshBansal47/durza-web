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
 * Brand identity row — logo + name + arrow — used wherever offers from several
 * stores share a grid. The logo sits in a centered rounded-square box and is
 * scaled to fit without cropping. Falls back to monogram initials on error.
 */
export default function OfferBrandMark({ brand }: { brand: OfferBrand }) {
  const [failed, setFailed] = useState(false);
  const logo = storeLogoUrl(brand);

  return (
    <Link
      href={`/stores/${brand.slug}`}
      className="group/brand mb-2 flex w-fit min-w-0 items-center gap-2.5 rounded-xl py-0.5 pr-1 transition-colors hover:bg-slate-50"
      aria-label={`${brand.name} store hub`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
        {!logo || failed ? (
          <span
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center rounded-lg bg-slate-900 text-sm font-bold tracking-tight text-white"
          >
            {storeInitials(brand.name)}
          </span>
        ) : (
          <Image
            src={logo}
            alt=""
            width={108}
            height={108}
            className="h-full w-full object-contain object-center"
            onError={() => setFailed(true)}
          />
        )}
      </span>

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