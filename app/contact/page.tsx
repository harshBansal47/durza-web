import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquareWarning, Store, Handshake } from "lucide-react";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Durza team to report a coupon that did not work, suggest a store we should track, or ask about listings and partnerships.",
};

const CHANNELS = [
  {
    icon: Mail,
    title: "Email us",
    body: "Questions, corrections, or a store you would like listed. We read everything and reply as soon as we can.",
    action: { href: "mailto:hello@durza.in", label: "hello@durza.in" },
  },
  {
    icon: MessageSquareWarning,
    title: "Report a coupon",
    body: "If a coupon on our site didn't work, the fastest fix is the didn't-work button on its page — it updates the success rate everyone sees.",
    action: { href: "/deals", label: "Browse today's deals" },
  },
  {
    icon: Store,
    title: "Suggest a store",
    body: "Know a retailer we should track? Tell us the store name and, if you can, the offer page you saw it on.",
    action: { href: "mailto:hello@durza.in?subject=Store%20suggestion", label: "Suggest a store" },
  },
  {
    icon: Handshake,
    title: "Partnerships",
    body: "For affiliate, sponsored or editorial partnerships, write to us with a short note about what you have in mind.",
    action: { href: "mailto:hello@durza.in?subject=Partnership", label: "Start a conversation" },
  },
];

export default function ContactPage() {
  return (
    <LegalPage
      eyebrow="Contact"
      title="Talk to a human"
      lede="Questions, corrections, or a store you would like listed? Reach the Durza team — and if a coupon didn't work, use the report button so the fix reaches everyone."
      related={[
        { href: "/trust", label: "How Durza works" },
        { href: "/privacy", label: "Privacy policy" },
        { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
      ]}
    >
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {CHANNELS.map((channel) => {
          const Icon = channel.icon;
          return (
            <article
              key={channel.title}
              className="info-card flex h-full flex-col p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-verified-soft text-verified">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-serif text-lg font-bold text-ink">{channel.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{channel.body}</p>
              <Link
                href={channel.action.href}
                className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-inkblue hover:underline"
              >
                {channel.action.label}
                <span aria-hidden="true"> →</span>
              </Link>
            </article>
          );
        })}
      </div>

      <p className="mt-8 rounded-xl border border-ledger-line bg-white p-5 text-sm leading-6 text-ink-soft">
        <strong className="font-semibold text-ink">A note on response times.</strong> We are a small
        team and we prioritise coupon corrections and broken links. For anything that needs an
        account action, include the email address on your account so we can help quickly.
      </p>
    </LegalPage>
  );
}
