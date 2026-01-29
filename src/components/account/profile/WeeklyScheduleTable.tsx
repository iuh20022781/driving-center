"use client";

import React, { useState } from "react";
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
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : status === "Đã xong"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-red-50 text-red-700 border-red-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${cls}`}
    >
      {label}
    </span>
  );
}

export default function WeeklyScheduleTable({ ds }: { ds: LichItem[] }) {
  const t = useTranslations("WeeklySchedule");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const statusLabel = (s: LichItem["trangThai"]) => {
    if (s === "Sắp diễn ra") return t("status.upcoming");
    if (s === "Đã xong") return t("status.done");
    return t("status.cancel");
  };

  if (ds.length === 0) {
    return (
      <div className="rounded-xl border px-4 py-10 text-center text-sm text-gray-500">
        {t("empty")}
      </div>
    );
  }

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="grid gap-3 md:hidden">
        {ds.map((it) => {
          const active = selectedId === it.id;

          return (
            <button
              key={it.id}
              type="button"
              onClick={() => setSelectedId(it.id)}
              className={`
                w-full text-left rounded-xl bg-white p-4 transition
                outline-none focus:outline-none focus-visible:outline-none
                ${active ? "border-2 border-blue-400" : "border border-gray-200"}
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {it.noiDung}
                  </div>
                  <div className="mt-1 text-xs text-gray-600">
                    {it.ngay} • {it.gio}
                  </div>
                </div>

                <Badge
                  status={it.trangThai}
                  label={statusLabel(it.trangThai)}
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-700">
                <div>
                  <div className="text-gray-500">
                    {t("headers.roomPlatform")}
                  </div>
                  <div className="font-medium">{it.phongNenTang}</div>
                </div>
                <div>
                  <div className="text-gray-500">{t("headers.mode")}</div>
                  <div className="font-medium">{it.hinhThuc}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-500">
                    {t("headers.instructor")}
                  </div>
                  <div className="font-medium">{it.giangVien}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block overflow-x-auto rounded-xl border bg-white">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="px-4 py-3 font-semibold">{t("headers.date")}</th>
              <th className="px-4 py-3 font-semibold">{t("headers.time")}</th>
              <th className="px-4 py-3 font-semibold">{t("headers.content")}</th>
              <th className="px-4 py-3 font-semibold">
                {t("headers.roomPlatform")}
              </th>
              <th className="px-4 py-3 font-semibold">{t("headers.mode")}</th>
              <th className="px-4 py-3 font-semibold">
                {t("headers.instructor")}
              </th>
              <th className="px-4 py-3 font-semibold">{t("headers.status")}</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {ds.map((it) => {
              const active = selectedId === it.id;

              return (
                <tr
                  key={it.id}
                  onClick={() => setSelectedId(it.id)}
                  className={`
                    cursor-pointer transition
                    ${active ? "bg-blue-50" : "hover:bg-gray-50"}
                  `}
                >
                  <td className="px-4 py-3 whitespace-nowrap">{it.ngay}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{it.gio}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {it.noiDung}
                  </td>
                  <td className="px-4 py-3">{it.phongNenTang}</td>
                  <td className="px-4 py-3">{it.hinhThuc}</td>
                  <td className="px-4 py-3">{it.giangVien}</td>
                  <td className="px-4 py-3">
                    <Badge
                      status={it.trangThai}
                      label={statusLabel(it.trangThai)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
