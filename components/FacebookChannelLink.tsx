import type { ReactNode } from "react";

/** Link to Durza's Facebook page. */
export default function FacebookChannelLink({
  children = "Durza on Facebook",
}: {
  children?: ReactNode;
}) {
  return (
    <a
      href="https://www.facebook.com/profile.php?id=61596707182025"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-inkblue transition-colors hover:underline"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-[#1877F2]">
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <path
          fill="white"
          d="M13.5 21v-6.2h2.08l.31-2.4H13.5v-1.54c0-.7.19-1.17 1.19-1.17h1.28V7.7c-.62-.08-1.4-.17-2.5-.17-2.48 0-4.18 1.5-4.18 4.27V12H7.5v2.4h2.78V21h3.22Z"
        />
      </svg>
      <span>{children}</span>
    </a>
  );
}
