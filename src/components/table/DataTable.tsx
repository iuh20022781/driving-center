"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

export type Column<T> = {
  key: string;
  header: string;
  width?: number;
  render?: (row: T) => React.ReactNode;
};

export default function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  onEdit,
  onDelete
}: {
  columns: Column<T>[];
  rows: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}) {
  const t = useTranslations("Table");

  return (
    <div className="panel mt-4 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="panel-header text-white/60">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="px-4 py-3 text-left font-medium border-r border-white/10 last:border-r-0"
                  style={c.width ? { width: c.width } : undefined}
                >
                  {c.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-3 text-right font-medium border-l border-white/10">
                  {t("actions")}
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className="border-t border-white/10 hover:bg-white/[0.03]">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-white/90 border-r border-white/10 last:border-r-0">
                    {c.render ? c.render(r) : String(r[c.key] ?? "")}
                  </td>
                ))}

                {(onEdit || onDelete) && (
                  <td className="px-4 py-3 border-l border-white/10">
                    <div className="flex justify-end gap-2">
                      {onEdit && (
                        <button className="btn-ghost p-2" onClick={() => onEdit(r)} aria-label="edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button className="btn-ghost p-2" onClick={() => onDelete(r)} aria-label="delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr className="border-t border-white/10">
                <td className="px-4 py-8 text-center text-white/50" colSpan={columns.length + 1}>
                  {t("empty")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 text-xs text-white/50">
        <div>{t("perPage")}: 10</div>
        <div>
          1-10 {t("of")} {rows.length}
        </div>
      </div>
    </div>
  );
}
