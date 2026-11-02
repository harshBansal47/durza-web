import type { ReactNode } from "react";

/** Link to Durza's public Telegram channel. */
export default function TelegramChannelLink({
  children = "Join us on Telegram",
}: {
  children?: ReactNode;
}) {
  return (
    <a
      href="https://t.me/durzacoupons"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-inkblue transition-colors hover:underline"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-sky-500">
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <path
          d="m5.5 11.7 12.1-4.6c.6-.2 1.1.2.9 1l-2.1 10c-.2.7-.7.9-1.3.5l-3.2-2.4-1.6 1.6c-.2.2-.4.4-.8.4l.2-3.2 5.8-5.2c.3-.3-.1-.4-.4-.2l-7.2 4.5-3.1-1c-.7-.2-.7-.7.7-1.4Z"
          fill="white"
        />
      </svg>
      <span>{children}</span>
    </a>
  );
}
