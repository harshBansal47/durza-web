"use client";

import Link, { useLinkStatus, type LinkProps } from "next/link";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

/**
 * A Link with built-in pending feedback: `useLinkStatus` flips true the moment
 * navigation starts and clears when the route resolves, so a clicked element
 * shows immediate feedback instead of dead air.
 *
 * `inline`  — small spinner beside the label (pills, chips)
 * `overlay` — dimmed surface + centered spinner (tiles, cards)
 */
export default function PendingLink({
  variant = "inline",
  className = "",
  children,
  ...rest
}: LinkProps & {
  variant?: "inline" | "overlay";
  className?: string;
  children: ReactNode;
}) {
  const { pending } = useLinkStatus();

  if (variant === "overlay") {
    return (
      <Link
        {...rest}
        className={`${className} relative`}
        aria-busy={pending || undefined}
      >
        {children}
        {pending && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70"
          >
            <Loader2 className="h-6 w-6 animate-spin text-slate-700" strokeWidth={2} />
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      {...rest}
      className={`${className} inline-flex items-center gap-1.5${pending ? " opacity-70" : ""}`}
      aria-busy={pending || undefined}
    >
      {children}
      {pending && (
        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" strokeWidth={2} aria-hidden="true" />
      )}
    </Link>
  );
}
