"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BrainrotRecord } from "@/lib/types";
import {
  compareNullableNumber,
  ExplorerShell,
  Field,
  inputClass,
  normalizeText,
  uniqueSorted,
} from "./ExplorerControls";

type SortKey = "name-asc" | "name-desc" | "cost-asc" | "cost-desc" | "income-asc" | "income-desc";

export default function BrainrotExplorer({
  records,
  compact = false,
}: {
  records: BrainrotRecord[];
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("");
  const [availability, setAvailability] = useState("");
  const [indexable, setIndexable] = useState("");
  const [sort, setSort] = useState<SortKey>("name-asc");
  const [pageSize, setPageSize] = useState(25);

  const rarities = useMemo(() => uniqueSorted(records.map((record) => record.rarity)), [records]);
  const availabilityValues = useMemo(
    () => uniqueSorted(records.map((record) => record.availability)),
    [records]
  );

  const filtered = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    const result = records
      .filter((record) => normalizeText(record.name).includes(normalizedQuery))
      .filter((record) => !rarity || record.rarity === rarity)
      .filter((record) => !availability || record.availability === availability)
      .filter((record) => {
        if (!indexable) return true;
        if (indexable === "yes") return record.indexable === true;
        if (indexable === "no") return record.indexable === false;
        return record.indexable === null;
      })
      .sort((a, b) => {
        if (sort === "name-asc") return a.name.localeCompare(b.name);
        if (sort === "name-desc") return b.name.localeCompare(a.name);
        if (sort === "cost-asc") return compareNullableNumber(a.baseCostValue, b.baseCostValue, "asc");
        if (sort === "cost-desc") return compareNullableNumber(a.baseCostValue, b.baseCostValue, "desc");
        if (sort === "income-asc") return compareNullableNumber(a.baseIncomeValue, b.baseIncomeValue, "asc");
        return compareNullableNumber(a.baseIncomeValue, b.baseIncomeValue, "desc");
      });

    return result;
  }, [availability, indexable, query, rarity, records, sort]);

  const visible = filtered.slice(0, pageSize);

  const reset = () => {
    setQuery("");
    setRarity("");
    setAvailability("");
    setIndexable("");
    setSort("name-asc");
    setPageSize(25);
  };

  return (
    <ExplorerShell>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Field label="Search">
          <input className={inputClass} value={query} onChange={(event) => setQuery(event.target.value)} />
        </Field>
        <Field label="Rarity">
          <select className={inputClass} value={rarity} onChange={(event) => setRarity(event.target.value)}>
            <option value="">All</option>
            {rarities.map((item) => <option key={item}>{item}</option>)}
          </select>
        </Field>
        <Field label="Availability">
          <select className={inputClass} value={availability} onChange={(event) => setAvailability(event.target.value)}>
            <option value="">All</option>
            {availabilityValues.map((item) => <option key={item}>{item}</option>)}
          </select>
        </Field>
        <Field label="Indexable">
          <select className={inputClass} value={indexable} onChange={(event) => setIndexable(event.target.value)}>
            <option value="">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unknown">Unknown</option>
          </select>
        </Field>
        <Field label="Sort">
          <select className={inputClass} value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="cost-asc">Cost Low-High</option>
            <option value="cost-desc">Cost High-Low</option>
            <option value="income-asc">Income Low-High</option>
            <option value="income-desc">Income High-Low</option>
          </select>
        </Field>
        <Field label="Page Size">
          <select className={inputClass} value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))}>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={records.length}>All</option>
          </select>
        </Field>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-[#8a8884]">{filtered.length} matching records</p>
        <button type="button" onClick={reset} className="rounded-md border border-[#d4af6a] px-4 py-2 text-sm text-[#d4af6a] focus:outline-none focus:ring-2 focus:ring-[#d4af6a]/40">
          Reset
        </button>
      </div>
      {visible.length === 0 ? (
        <div className="mt-6 rounded-lg border border-[#2a2826] p-6 text-center text-[#8a8884]">
          No records match these controls. <button type="button" onClick={reset} className="text-[#d4af6a] underline">Reset filters</button>.
        </div>
      ) : (
        <>
          <div className="mt-6 hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#d4af6a] text-[#05030c]">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Rarity</th>
                  <th className="px-4 py-3 text-right">Cost</th>
                  <th className="px-4 py-3 text-right">Income</th>
                  <th className="px-4 py-3 text-left">Availability</th>
                  {!compact && <th className="px-4 py-3 text-left">Acquisition</th>}
                </tr>
              </thead>
              <tbody>
                {visible.map((record) => (
                  <tr key={record.slug} className="border-t border-[#2a2826]">
                    <td className="px-4 py-3"><Link href={`/brainrots/${record.slug}`} className="text-[#d4af6a] hover:text-[#f0ece4]">{record.name}</Link></td>
                    <td className="px-4 py-3">{record.rarity ?? "Unknown"}</td>
                    <td className="px-4 py-3 text-right">{record.baseCostDisplay ?? "Unknown"}</td>
                    <td className="px-4 py-3 text-right">{record.baseIncomeDisplay ?? "Unknown"}</td>
                    <td className="px-4 py-3">{record.availability}</td>
                    {!compact && <td className="px-4 py-3">{record.acquisitionMethod ?? "Unknown"}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid gap-3 md:hidden">
            {visible.map((record) => (
              <Link key={record.slug} href={`/brainrots/${record.slug}`} className="rounded-lg border border-[#2a2826] bg-[#05030c]/70 p-4">
                <span className="text-[#d4af6a] font-semibold">{record.name}</span>
                <span className="mt-2 grid grid-cols-2 gap-2 text-sm text-[#8a8884]">
                  <span>{record.rarity ?? "Unknown"}</span>
                  <span>{record.baseIncomeDisplay ?? "Unknown"}</span>
                  <span>{record.availability}</span>
                  <span>{record.baseCostDisplay ?? "Unknown"}</span>
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </ExplorerShell>
  );
}
