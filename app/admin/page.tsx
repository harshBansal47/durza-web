import Link from "next/link";

const ADMIN_PAGES = [
  { href: "/admin/admitad", title: "Admitad Programs", description: "Discover, approve and monitor Admitad programs and store health." },
  { href: "/admin/campaigns", title: "VCommission Campaigns", description: "Manage VCommission campaign lifecycle and store integration." },
  { href: "/admin/analytics", title: "Analytics", description: "Traffic, coupons, and revenue stats." },
  { href: "/admin/whatsapp-publisher", title: "WhatsApp Publisher", description: "Publish offers to WhatsApp." },
  { href: "/admin/telegram-publisher", title: "Telegram Publisher", description: "Approve and send offers to Telegram." },
];

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold text-ink">Admin Home</h1>
      <p className="text-ink-soft">Jump to any admin page. Use the nav above to move around.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {ADMIN_PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:border-inkblue"
          >
            <h2 className="text-lg font-semibold text-ink">{page.title}</h2>
            <p className="mt-1 text-sm text-ink-soft">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
