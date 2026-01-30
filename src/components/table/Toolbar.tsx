"use client";

import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Toolbar({
  query,
  onQueryChange,
  onReset
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onReset: () => void;
}) {
  const t = useTranslations("Table");

  return (
    <div className="panel p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-white/50" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={t("search")}
              className="input-dark"
            />
          </div>
        </div>

        <button className="btn-ghost inline-flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" /> {t("filter")}
        </button>

        <button onClick={onReset} className="btn-ghost inline-flex items-center gap-2">
          <RotateCcw className="h-4 w-4" /> {t("reset")}
        </button>
      </div>
    </div>
  );
}
