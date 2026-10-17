import { DEFAULT_DISCLOSURE } from "@/lib/disclosure";

export default function DisclosureNote({
  commissionDisclosure,
}: {
  commissionDisclosure: string | null | undefined;
}) {
  return (
    <div className="rounded-md border border-ledger-line bg-paper-raised px-4 py-3">
      <p className="mb-1 text-sm font-medium text-ink">How we make money on this page</p>
      <p className="text-sm leading-relaxed text-ink-soft">
        {commissionDisclosure ?? DEFAULT_DISCLOSURE}
      </p>
    </div>
  );
}
