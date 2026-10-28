"use client";

import type { ReactNode } from "react";
import { BarChart3 } from "lucide-react";

export function MetricCard({
  title,
  value,
  detail,
  icon,
}: {
  title: string;
  value: string;
  detail?: string;
  icon?: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {icon}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-gray-950">{value}</p>
      {detail ? <p className="mt-1 text-xs text-gray-500">{detail}</p> : null}
    </article>
  );
}

export function Panel({
  title,
  detail,
  children,
}: {
  title: string;
  detail?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {detail ? <p className="mt-1 text-sm text-gray-500">{detail}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex min-h-32 flex-col items-center justify-center text-center text-gray-400">
      <BarChart3 aria-hidden="true" className="mb-2 h-7 w-7 opacity-40" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function DataBars({
  rows,
}: {
  rows: { label: string; value: number; detail?: string }[];
}) {
  if (!rows.length) return <EmptyState message="No data for this date range." />;
  const max = Math.max(...rows.map((row) => row.value), 1);
  return (
    <ul className="space-y-4">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="mb-1 flex justify-between gap-3 text-sm">
            <span className="truncate text-gray-700">{row.label}</span>
            <span className="shrink-0 font-medium text-gray-900">
              {row.value.toLocaleString()}
              {row.detail ? <span className="ml-2 text-xs text-gray-500">{row.detail}</span> : null}
            </span>
          </div>
          <div
            aria-hidden="true"
            className="h-2 overflow-hidden rounded-full bg-gray-100"
          >
            <div
              className="h-full rounded-full bg-orange-500"
              style={{ width: `${Math.max((row.value / max) * 100, 2)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
