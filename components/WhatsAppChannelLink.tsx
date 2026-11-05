import type { ReactNode } from "react";

/** Link to Durza's public WhatsApp channel. */
export default function WhatsAppChannelLink({
  children = "Join us on WhatsApp",
}: {
  children?: ReactNode;
}) {
  return (
    <a
      href="https://whatsapp.com/channel/0029Vb9I5u86rsQr0EWLaL1D"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-inkblue transition-colors hover:underline"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-green-500">
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <path
          d="M17.5 6.5A6.9 6.9 0 0 0 12 4a7 7 0 0 0-6 10.6L5 20l5.6-1a7 7 0 0 0 6.9-12.5Zm-5.5 11a5.8 5.8 0 0 1-3-.8l-.2-.1-3.3.9.9-3.2-.1-.2a5.8 5.8 0 1 1 5.7 3.4Zm3.2-4.3c-.2-.1-1-.5-1.2-.5s-.3-.1-.4.1-.5.5-.6.7-.2.2-.4.1a4.9 4.9 0 0 1-1.4-.9 5.3 5.3 0 0 1-1-1.2c-.1-.2 0-.3.1-.4l.3-.3.2-.3c.1-.1.1-.2 0-.4s-.4-1-.6-1.3-.3-.3-.4-.3h-.4c-.1 0-.3.1-.5.2s-.6.6-.6 1.4.6 1.6.7 1.7 1.2 1.8 2.9 2.5 1.7.5 2 .4.9-.4 1-.7.1-.7 0-.7-.2-.1-.4-.2Z"
          fill="white"
        />
      </svg>
      <span>{children}</span>
    </a>
  );
}
```

Add to Footer.<|end|><|start|> fileList <|constrain|>xml<|message|><rfl:parameter name="path">
/home/harsh-bansal/Downloads/Couponza/couponza-web/components/Footer.tsx