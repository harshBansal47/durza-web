import type { Metadata } from "next";
import AccountShell from "@/components/account/AccountShell";
import NotificationSettings from "@/components/account/NotificationSettings";
import { requireNotificationAccount, updatePreferencesAction } from "@/app/account/actions";
import { absoluteUrl } from "@/lib/seo";
import TelegramChannelLink from "@/components/TelegramChannelLink";
import WhatsAppChannelLink from "@/components/WhatsAppChannelLink";

export const metadata: Metadata = {
  title: "Notification settings",
  description: "Manage email alerts and find Durza’s public Telegram channel.",
  alternates: { canonical: absoluteUrl("/account/notifications") },
  robots: { index: false, follow: false },
};

export default async function NotificationsPage() {
  const { user, prefs } = await requireNotificationAccount();

  return (
    <AccountShell user={user} active="/account/notifications">
      <h2 className="font-serif text-xl text-ink">Notifications</h2>
      <p className="mt-2 max-w-prose text-sm text-ink-soft">
        Email is the only personal alert channel. Turning it off is a legitimate choice and nothing
        on the site will nag you about it.
      </p>

      <div className="mt-6 max-w-prose">
        <NotificationSettings
          action={updatePreferencesAction}
          initial={{ email_enabled: prefs.email_enabled }}
        />
      </div>

      <div className="mt-6 max-w-prose border border-ledger-line bg-paper-raised p-4">
        <p className="text-sm text-ink-soft">
          Get public offer updates. Anyone can join; no Durza account is needed.
        </p>
        <TelegramChannelLink>Join Durza&apos;s public channel</TelegramChannelLink>
        <WhatsAppChannelLink>Join Durza&apos;s WhatsApp channel</WhatsAppChannelLink>
      </div>

    </AccountShell>
  );
}
