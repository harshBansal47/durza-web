import type { ReactNode } from "react";

/** Link to Durza's public Instagram account. */
export default function InstagramChannelLink({
  children = "@durzacouponsindia",
}: {
  children?: ReactNode;
}) {
  return (
    <a
      href="https://www.instagram.com/durzacouponsindia/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-inkblue transition-colors hover:underline"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-pink-600">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.6" fill="currentColor" />
      </svg>
      <span>{children}</span>
    </a>
  );
}
