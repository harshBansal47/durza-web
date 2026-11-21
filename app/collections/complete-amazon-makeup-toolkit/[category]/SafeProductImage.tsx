"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_IMAGE = "/collections/amazon-beauty-toolkit/product-placeholder.svg";

export default function SafeProductImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover transition duration-500 group-hover:scale-[1.03]"
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
}
