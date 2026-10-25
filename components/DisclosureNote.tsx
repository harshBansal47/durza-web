import Link from "next/link";
import { DEFAULT_DISCLOSURE } from "@/lib/disclosure";

export default function DisclosureNote({
  commissionDisclosure,
  compact = false,
}: {
  commissionDisclosure: string | null | undefined;
  /** Plain paragraph for use inside another card, instead of a bordered box of its own. */
  compact?: boolean;
}) {
  const text = commissionDisclosure ?? DEFAULT_DISCLOSURE;

  if (compact) {
    return (
      <p className="text-[13px] leading-relaxed text-ink-soft">
        <span className="font-medium text-ink">How we make money on this page.</span> {text}{" "}
        <Link href="/affiliate-disclosure" className="font-medium text-inkblue hover:underline">
          Learn more
        </Link>
      </p>
    );
  }

  return (
    <div className="rounded-md border border-ledger-line bg-paper-raised px-4 py-3">
      <p className="mb-1 text-sm font-medium text-ink">How we make money on this page</p>
      <p className="text-sm leading-relaxed text-ink-soft">{text}</p>
    </div>
  );
}
