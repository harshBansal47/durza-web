import Link from "next/link";
import type { ReactNode } from "react";

const ADMIN_LINKS = [
  { href: "/admin", label: "Admin Home" },
  { href: "/admin/ingestion", label: "Ingestion" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/campaigns", label: "Campaigns" },
  { href: "/admin/whatsapp-publisher", label: "WhatsApp Publisher" },
  { href: "/admin/telegram-publisher", label: "Telegram Publisher" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <nav aria-label="Admin" className="border-b border-ledger-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-3">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-ledger-line px-3 py-1 text-sm font-medium text-ink-soft transition-colors hover:border-inkblue hover:text-inkblue"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/"
            className="ml-auto rounded-full border border-ledger-line px-3 py-1 text-sm font-medium text-ink-soft transition-colors hover:border-inkblue hover:text-inkblue"
          >
            ← Site
          </Link>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
