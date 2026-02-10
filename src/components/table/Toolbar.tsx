"use client";

import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/utils/cn";

export default function Toolbar({
  query,
  onQueryChange,
  onReset,
  onFilter,
  className,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onReset: () => void;
  onFilter?: () => void;
  className?: string;
}) {
  const t = useTranslations("Table");

  return (
    <div className={cn("panel p-0 ring-1 ring-white/10", className)}>
      <div className="px-4 py-3 flex flex-col md:flex-row md:items-center gap-3">
        {/* Search */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-white/50 shrink-0" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={t("search")}
              className="input-dark"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn-ghost inline-flex items-center gap-2"
            onClick={onFilter}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t("filter")}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="btn-ghost inline-flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {t("reset")}
          </button>
        </div>
      </div>
    </div>
  );
}
