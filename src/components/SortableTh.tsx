import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export type SortState<K extends string> = { key: K; dir: "asc" | "desc" } | null;

export function nextSort<K extends string>(cur: SortState<K>, key: K): SortState<K> {
  if (!cur || cur.key !== key) return { key, dir: "desc" };
  return { key, dir: cur.dir === "desc" ? "asc" : "desc" };
}

export function sortRows<T, K extends string>(rows: T[], sort: SortState<K>, get: (r: T, k: K) => unknown): T[] {
  if (!sort) return rows;
  const m = sort.dir === "desc" ? -1 : 1;
  return [...rows].sort((a, b) => {
    const x = get(a, sort.key) ?? "";
    const y = get(b, sort.key) ?? "";
    if (typeof x === "number" && typeof y === "number") return (x - y) * m;
    return String(x).localeCompare(String(y), "pt-BR", { numeric: true }) * m;
  });
}

export function SortableTh<K extends string>({ label, k, sort, onSort }: { label: string; k: K; sort: SortState<K>; onSort: (k: K) => void }) {
  const active = sort?.key === k;
  const Icon = !active ? ArrowUpDown : sort!.dir === "desc" ? ArrowDown : ArrowUp;
  return (
    <th className="px-4 py-3">
      <button type="button" onClick={() => onSort(k)} className={`inline-flex items-center gap-1 uppercase text-xs tracking-wider ${active ? "text-electric" : ""}`}>
        {label} <Icon size={12} />
      </button>
    </th>
  );
}
