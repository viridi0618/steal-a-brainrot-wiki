"use client";

import type { ReactNode } from "react";

export function ExplorerShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-4 md:p-6">
      {children}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.18em] text-[#d4af6a] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-md border border-[#2a2826] bg-[#05030c] px-3 py-2 text-sm text-[#f0ece4] outline-none focus:border-[#d4af6a] focus:ring-2 focus:ring-[#d4af6a]/30";

export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function uniqueSorted(values: Array<string | null>) {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value)))).sort();
}

export function compareNullableNumber(
  a: number | null,
  b: number | null,
  direction: "asc" | "desc"
) {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return direction === "asc" ? a - b : b - a;
}
