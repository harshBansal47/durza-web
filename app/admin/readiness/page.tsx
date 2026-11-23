import Link from "next/link";
import { mergedCollections } from "@/lib/collections";
import ReadinessClient from "./ReadinessClient";

export const dynamic = "force-dynamic";

export default async function ReadinessPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Content readiness</h1>
          <p className="mt-1 text-sm text-slate-600">Evidence throughput and collection gate status from live data. Advisory only.</p>
        </div>
        <Link href="/admin" className="text-sm text-slate-600 underline">Admin</Link>
      </div>
      <ReadinessClient collections={await mergedCollections()} />
    </main>
  );
}
