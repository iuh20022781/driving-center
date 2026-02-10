"use client";

import { X } from "lucide-react";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/utils/cn";

export type InstructorFilterKey =
  | "code"
  | "name"
  | "phone"
  | "cccd"
  | "address"
  | "email"
  | "rank";

export default function InstructorsFilterModal({
  open,
  title,
  columns,
  selected,
  onChange,
  onClose,
  onApply,
  onSelectAll,
  onClear,
}: {
  open: boolean;
  title: string;
  columns: Array<{ key: InstructorFilterKey; label: string }>;
  selected: InstructorFilterKey[];
  onChange: (next: InstructorFilterKey[]) => void;
  onClose: () => void;
  onApply: () => void;
  onSelectAll: () => void;
  onClear: () => void;
}) {
  const t = useTranslations("Instructors.filter");

  const tx = (key: string, fallback: string) =>
    // @ts-ignore
    typeof t.has === "function" && t.has(key as any) ? t(key as any) : fallback;

  const selectedSet = useMemo(() => new Set(selected), [selected]);
  if (!open) return null;

  function toggle(key: InstructorFilterKey) {
    const has = selectedSet.has(key);
    const next = has ? selected.filter((x) => x !== key) : [...selected, key];
    onChange(next.length ? next : selected); // giữ >= 1
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 panel p-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="text-lg font-semibold text-white/90">
            {title || tx("title", "Bộ lọc")}
          </div>

          <button type="button" className="btn-ghost p-2" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 text-sm text-white/70">
          {tx("hint", "Chọn cột để áp dụng tìm kiếm:")}
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {columns.map((c) => {
            const active = selectedSet.has(c.key);
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => toggle(c.key)}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition",
                  active
                    ? "border-pink-500/50 bg-pink-500/10 text-white"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/5"
                )}
              >
                <span>{c.label}</span>
                <span
                  className={cn(
                    "h-4 w-4 rounded border",
                    active
                      ? "border-pink-500 bg-pink-500"
                      : "border-white/20 bg-transparent"
                  )}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <button type="button" className="btn-ghost" onClick={onSelectAll}>
              {tx("selectAll", "Chọn tất cả")}
            </button>

            <button type="button" className="btn-ghost" onClick={onClear}>
              {tx("clear", "Bỏ chọn")}
            </button>
          </div>

          <button type="button" className="btn-pink" onClick={onApply}>
            {tx("apply", "Áp dụng")}
          </button>
        </div>
      </div>
    </div>
  );
}
