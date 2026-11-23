import Link from "next/link";
import { mergedCollections } from "@/lib/collections";
import DigestClient from "./DigestClient";

export const dynamic = "force-dynamic";

export default async function DigestPage() {
  const collections = await mergedCollections();
  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Digest draft</h1>
          <p className="mt-1 text-sm text-slate-600">Distribution primitive only — no channel, sending or scheduling.</p>
        </div>
        <Link href="/admin" className="text-sm text-slate-600 underline">Admin</Link>
      </div>
      <DigestClient collections={collections} />
    </main>
  );
}
