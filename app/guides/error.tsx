"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-lg rounded-3xl border border-[#141413]/10 bg-white p-8 text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8a4b12]">
          Guides unavailable
        </p>
        <h1 className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">
          We couldn&apos;t load the guide list
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#5a564f]">
          The editorial service may be temporarily unavailable. Please try again, or browse the rest of Durza.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-[#141413] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3f3b35]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-[#141413]/15 px-5 py-2.5 text-sm font-semibold text-[#141413] transition hover:bg-[#f3efe8]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
