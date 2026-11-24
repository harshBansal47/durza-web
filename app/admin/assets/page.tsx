import Link from "next/link";
import { mergedCollections } from "@/lib/collections";
import { assetEligibility } from "@/lib/share-image";

export const dynamic = "force-dynamic";

export default async function AssetsPage() {
  const collections = await mergedCollections();
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Share assets</h1>
          <p className="mt-1 text-sm text-slate-600">Downloadable text-only images for published, evidence-backed collections. Nothing is posted.</p>
        </div>
        <Link href="/admin" className="text-sm text-slate-600 underline">Admin</Link>
      </div>
      <ul className="space-y-3 text-sm">
        {collections.map((entry) => {
          const errors = assetEligibility(entry);
          return (
            <li key={entry.slug} className="rounded border p-3">
              <p className="font-medium">{entry.title}</p>
              {errors.length ? (
                <p className="mt-1 text-xs text-rose-700">Not eligible: {errors.join("; ")}</p>
              ) : (
                <p className="mt-2 flex flex-wrap gap-3">
                  <a className="text-inkblue underline" href={`/api/admin/share-image/${entry.slug}?format=portrait&download=1`}>1080×1350 PNG</a>
                  <a className="text-inkblue underline" href={`/api/admin/share-image/${entry.slug}?format=square&download=1`}>1080×1080 PNG</a>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
