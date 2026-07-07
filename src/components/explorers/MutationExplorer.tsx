"use client";

import { useMemo, useState } from "react";
import type { MutationRecord } from "@/lib/types";
import {
  compareNullableNumber,
  ExplorerShell,
  Field,
  inputClass,
  normalizeText,
  uniqueSorted,
} from "./ExplorerControls";

type SortKey = "name-asc" | "name-desc" | "multiplier-asc" | "multiplier-desc" | "spawn-asc" | "spawn-desc";

export default function MutationExplorer({ records }: { records: MutationRecord[] }) {
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState("");
  const [sort, setSort] = useState<SortKey>("multiplier-desc");

  const availabilityValues = useMemo(
    () => uniqueSorted(records.map((record) => record.availability)),
    [records]
  );

  const filtered = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    return records
      .filter((record) => normalizeText(record.name).includes(normalizedQuery))
      .filter((record) => !availability || record.availability === availability)
      .sort((a, b) => {
        if (sort === "name-asc") return a.name.localeCompare(b.name);
        if (sort === "name-desc") return b.name.localeCompare(a.name);
        if (sort === "multiplier-asc") return compareNullableNumber(a.multiplierValue, b.multiplierValue, "asc");
        if (sort === "multiplier-desc") return compareNullableNumber(a.multiplierValue, b.multiplierValue, "desc");
        if (sort === "spawn-asc") return compareNullableNumber(a.spawnRateValue, b.spawnRateValue, "asc");
        return compareNullableNumber(a.spawnRateValue, b.spawnRateValue, "desc");
      });
  }, [availability, query, records, sort]);

  const reset = () => {
    setQuery("");
    setAvailability("");
    setSort("multiplier-desc");
  };

  return (
    <ExplorerShell>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Search">
          <input className={inputClass} value={query} onChange={(event) => setQuery(event.target.value)} />
        </Field>
        <Field label="Availability">
          <select className={inputClass} value={availability} onChange={(event) => setAvailability(event.target.value)}>
            <option value="">All</option>
            {availabilityValues.map((item) => <option key={item}>{item}</option>)}
          </select>
        </Field>
        <Field label="Sort">
          <select className={inputClass} value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
            <option value="multiplier-desc">Multiplier High-Low</option>
            <option value="multiplier-asc">Multiplier Low-High</option>
            <option value="spawn-asc">Spawn Rate Low-High</option>
            <option value="spawn-desc">Spawn Rate High-Low</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </Field>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-[#8a8884]">{filtered.length} matching records</p>
        <button type="button" onClick={reset} className="rounded-md border border-[#d4af6a] px-4 py-2 text-sm text-[#d4af6a] focus:outline-none focus:ring-2 focus:ring-[#d4af6a]/40">
          Reset
        </button>
      </div>
      {filtered.length === 0 ? (
        <div className="mt-6 rounded-lg border border-[#2a2826] p-6 text-center text-[#8a8884]">
          No Mutations match these filters. <button type="button" onClick={reset} className="text-[#d4af6a] underline">Reset filters</button>.
        </div>
      ) : (
        <>
      <div className="mt-6 hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#d4af6a] text-[#05030c]">
            <tr>
              <th className="px-4 py-3 text-left">Mutation</th>
              <th className="px-4 py-3 text-left">Multiplier</th>
              <th className="px-4 py-3 text-left">Spawn Rate</th>
              <th className="px-4 py-3 text-left">Availability</th>
              <th className="px-4 py-3 text-left">Obtain Method</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => (
              <tr key={record.slug} className="border-t border-[#2a2826]">
                <td className="px-4 py-3 text-[#f0ece4]">{record.name}</td>
                <td className="px-4 py-3">{record.multiplierDisplay ?? "Unknown"}</td>
                <td className="px-4 py-3">{record.spawnRateDisplay ?? "Event or Unknown"}</td>
                <td className="px-4 py-3">{record.availability}</td>
                <td className="px-4 py-3">{record.acquisitionMethod ?? "Unknown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 grid gap-3 md:hidden">
        {filtered.map((record) => (
          <div key={record.slug} className="rounded-lg border border-[#2a2826] bg-[#05030c]/70 p-4">
            <span className="text-[#d4af6a] font-semibold">{record.name}</span>
            <span className="mt-3 grid grid-cols-2 gap-2 text-sm text-[#8a8884]">
              <span>{record.multiplierDisplay ?? "Unknown"}</span>
              <span>{record.spawnRateDisplay ?? "Event or Unknown"}</span>
              <span>{record.availability}</span>
              <span className="break-words">{record.acquisitionMethod ?? "Unknown"}</span>
            </span>
          </div>
        ))}
      </div>
        </>
      )}
    </ExplorerShell>
  );
}
