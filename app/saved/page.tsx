import type { Metadata } from "next";
import { SavedPageClient } from "@/components/SavedPageClient";

export const metadata: Metadata = {
  title: "Saved deals",
  description: "Deals you bookmarked and stores you follow. No account needed.",
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="font-serif text-3xl font-extrabold text-ink">My deals</h1>
      <p className="mt-2 max-w-prose text-ink-soft">
        Everything you bookmarked or followed lives here — on this device, no sign-in required.
      </p>
      <div className="mt-8">
        <SavedPageClient />
      </div>
    </div>
  );
}
