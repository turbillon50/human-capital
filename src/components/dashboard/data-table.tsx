"use client";

import * as React from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  /** Cell renderer. */
  cell: (row: T) => React.ReactNode;
  /** Value used for sorting; omit to disable sorting on this column. */
  sortValue?: (row: T) => string | number;
  className?: string;
  /** Hide this column on mobile card view priority. */
  hideOnMobile?: boolean;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchKeys,
  pageSize = 8,
  onRowClick,
  selectable = false,
  bulkActions,
  filters,
  emptyMessage = "Sin resultados",
}: {
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  bulkActions?: (selected: T[], clear: () => void) => React.ReactNode;
  filters?: React.ReactNode;
  emptyMessage?: string;
}) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const filtered = React.useMemo(() => {
    let rows = data;
    if (query && searchKeys) {
      const q = query.toLowerCase();
      rows = rows.filter((r) =>
        searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(q)),
      );
    }
    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      if (col?.sortValue) {
        rows = [...rows].sort((a, b) => {
          const av = col.sortValue!(a);
          const bv = col.sortValue!(b);
          if (av < bv) return sort.dir === "asc" ? -1 : 1;
          if (av > bv) return sort.dir === "asc" ? 1 : -1;
          return 0;
        });
      }
    }
    return rows;
  }, [data, query, sort, columns, searchKeys]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount - 1);
  const rows = filtered.slice(current * pageSize, current * pageSize + pageSize);

  React.useEffect(() => setPage(0), [query]);

  const toggleSort = (key: string) =>
    setSort((s) =>
      s?.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );

  const toggleRow = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allOnPage = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const toggleAll = () =>
    setSelected((s) => {
      const next = new Set(s);
      if (allOnPage) rows.forEach((r) => next.delete(r.id));
      else rows.forEach((r) => next.add(r.id));
      return next;
    });

  const selectedRows = data.filter((r) => selected.has(r.id));

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-outline-variant p-4 sm:flex-row sm:items-center sm:justify-between">
        {searchKeys && (
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant/60" strokeWidth={1.75} />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar…"
              className="h-10 pl-9"
            />
          </div>
        )}
        <div className="flex items-center gap-2">{filters}</div>
      </div>

      {/* Bulk action bar */}
      {selectable && selectedRows.length > 0 && (
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant bg-secondary/5 px-4 py-2.5">
          <span className="text-sm font-medium text-secondary">
            {selectedRows.length} seleccionado{selectedRows.length > 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            {bulkActions?.(selectedRows, () => setSelected(new Set()))}
          </div>
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low">
              {selectable && (
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allOnPage}
                    onChange={toggleAll}
                    className="size-4 rounded border-outline-variant accent-secondary"
                    aria-label="Seleccionar todo"
                  />
                </th>
              )}
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn("px-4 py-3 text-left label-meta text-on-surface-variant", c.className)}
                >
                  {c.sortValue ? (
                    <button
                      onClick={() => toggleSort(c.key)}
                      className="inline-flex items-center gap-1 transition-colors hover:text-on-surface"
                    >
                      {c.header}
                      <ArrowUpDown
                        className={cn("size-3", sort?.key === c.key ? "text-secondary" : "opacity-40")}
                      />
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-outline-variant last:border-0 transition-colors",
                  i % 2 === 1 && "bg-surface-low/40",
                  onRowClick && "cursor-pointer hover:bg-secondary/5",
                  selected.has(row.id) && "bg-secondary/5",
                )}
              >
                {selectable && (
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                      className="size-4 rounded border-outline-variant accent-secondary"
                      aria-label="Seleccionar fila"
                    />
                  </td>
                )}
                {columns.map((c) => (
                  <td key={c.key} className={cn("px-4 py-3 text-on-surface", c.className)}>
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-outline-variant md:hidden">
        {rows.map((row) => (
          <button
            key={row.id}
            onClick={() => onRowClick?.(row)}
            className="block w-full px-4 py-3 text-left active:bg-surface-low"
          >
            {columns
              .filter((c) => !c.hideOnMobile)
              .map((c) => (
                <div key={c.key} className="flex items-center justify-between gap-3 py-0.5">
                  <span className="label-meta text-on-surface-variant">{c.header}</span>
                  <span className="text-sm text-on-surface">{c.cell(row)}</span>
                </div>
              ))}
          </button>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="px-4 py-12 text-center text-sm text-on-surface-variant">{emptyMessage}</div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-outline-variant px-4 py-3">
        <span className="text-xs text-on-surface-variant">
          {filtered.length === 0
            ? "0"
            : `${current * pageSize + 1}–${Math.min((current + 1) * pageSize, filtered.length)}`}{" "}
          de {filtered.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={current === 0}
            className="grid size-8 place-items-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-low disabled:opacity-40"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="px-2 text-sm font-medium">
            {current + 1} / {pageCount}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={current >= pageCount - 1}
            className="grid size-8 place-items-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-low disabled:opacity-40"
            aria-label="Siguiente"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
