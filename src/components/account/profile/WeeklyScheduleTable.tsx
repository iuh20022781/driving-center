"use client";

import React from "react";
import { useTranslations } from "next-intl";

export type LichItem = {
  id: number;
  ngay: string;
  gio: string;
  noiDung: string;
  phongNenTang: string;
  hinhThuc: "Online" | "Offline";
  giangVien: string;
  trangThai: "Sắp diễn ra" | "Đã xong" | "Hủy";
};

function Badge({
  status,
  label,
}: {
  status: LichItem["trangThai"];
  label: string;
}) {
  const cls =
    status === "Sắp diễn ra"
      ? "bg-blue-50 text-blue-700 ring-blue-200"
      : status === "Đã xong"
      ? "bg-green-50 text-green-700 ring-green-200"
      : "bg-red-50 text-red-700 ring-red-200";

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cls}`}>
      {label}
    </span>
  );
}

export default function WeeklyScheduleTable({ ds }: { ds: LichItem[] }) {
  const t = useTranslations("WeeklySchedule");

  const statusLabel = (s: LichItem["trangThai"]) => {
    if (s === "Sắp diễn ra") return t("status.upcoming");
    if (s === "Đã xong") return t("status.done");
    return t("status.cancel");
  };

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[900px] text-sm">
        <thead className="bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-3 font-semibold">{t("headers.date")}</th>
            <th className="px-4 py-3 font-semibold">{t("headers.time")}</th>
            <th className="px-4 py-3 font-semibold">{t("headers.content")}</th>
            <th className="px-4 py-3 font-semibold">{t("headers.roomPlatform")}</th>
            <th className="px-4 py-3 font-semibold">{t("headers.mode")}</th>
            <th className="px-4 py-3 font-semibold">{t("headers.instructor")}</th>
            <th className="px-4 py-3 font-semibold">{t("headers.status")}</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {ds.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                {t("empty")}
              </td>
            </tr>
          ) : (
            ds.map((it) => (
              <tr key={it.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">{it.ngay}</td>
                <td className="px-4 py-3 whitespace-nowrap">{it.gio}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">{it.noiDung}</td>
                <td className="px-4 py-3">{it.phongNenTang}</td>
                <td className="px-4 py-3">{it.hinhThuc}</td>
                <td className="px-4 py-3">{it.giangVien}</td>
                <td className="px-4 py-3">
                  <Badge status={it.trangThai} label={statusLabel(it.trangThai)} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
