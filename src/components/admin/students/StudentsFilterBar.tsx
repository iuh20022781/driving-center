"use client";

import Toolbar from "@/components/table/Toolbar";

export default function StudentsFilterBar({
  query,
  onQueryChange,
  onReset,
  onOpenFilter,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onReset: () => void;
  onOpenFilter: () => void;
}) {
  return (
    <div className="panel p-0 ring-1 ring-white/10">
      <Toolbar
        query={query}
        onQueryChange={onQueryChange}
        onReset={onReset}
        onFilter={onOpenFilter}
      />
    </div>
  );
}
