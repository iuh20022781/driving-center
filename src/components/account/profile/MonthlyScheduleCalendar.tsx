"use client";

import React from "react";
import { useTranslations } from "next-intl";

export type ScheduleMode = "VIEW" | "REGISTER";

export type DayEvent = {
  id: number;
  title: string;
  time: string; // "18:30 - 20:30"
  room: string; // "P101" / "Zoom"
  instructor: string;
  mode: "Online" | "Offline";
};

export type DayStatus = "EMPTY" | "AVAILABLE" | "FULL" | "HAS_CLASS";

export type CalendarDayData = {
  dateISO: string; // "2025-12-14"
  status: DayStatus;
  events?: DayEvent[];
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function iso(y: number, m: number, d: number) {
  return `${y}-${pad2(m)}-${pad2(d)}`;
}
function vnDayLabel(dow: number) {
  const map = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  return map[dow];
}

function buildMonthGrid(year: number, month: number) {
  const first = new Date(year, month - 1, 1);
  const firstDow = first.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const monBased = (firstDow + 6) % 7; // Monday=0..Sunday=6
  const totalCells = 42;

  const cells: { inMonth: boolean; dateISO?: string; dayNum?: number }[] = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - monBased + 1;
    if (dayNum >= 1 && dayNum <= daysInMonth) {
      cells.push({ inMonth: true, dateISO: iso(year, month, dayNum), dayNum });
    } else {
      cells.push({ inMonth: false });
    }
  }
  return cells;
}

function clsByStatus(status: DayStatus, mode: ScheduleMode) {
  if (mode === "VIEW") {
    if (status === "HAS_CLASS") return "bg-emerald-50 border-emerald-200 hover:bg-emerald-100";
    return "bg-white border-gray-200 hover:bg-gray-50";
  }

  if (status === "AVAILABLE") return "bg-emerald-50 border-emerald-200 hover:bg-emerald-100";
  if (status === "FULL") return "bg-red-50 border-red-200 opacity-80 cursor-not-allowed";
  return "bg-white border-gray-200 hover:bg-gray-50";
}

export default function MonthlyScheduleCalendar({
  mode,
  year,
  month,
  dayMap,
  selectedDateISO,
  onOpenPanel,
}: {
  mode: ScheduleMode;
  year: number;
  month: number;
  dayMap: Record<string, CalendarDayData>;
  selectedDateISO?: string | null;
  onOpenPanel: (dateISO: string) => void;
}) {
  const t = useTranslations("Schedule");
  const cells = React.useMemo(() => buildMonthGrid(year, month), [year, month]);

  const monthTitle = t("monthTitle", { month, year });

  const headers = [
    t("weekdays.mon"),
    t("weekdays.tue"),
    t("weekdays.wed"),
    t("weekdays.thu"),
    t("weekdays.fri"),
    t("weekdays.sat"),
    t("weekdays.sun"),
  ];

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {mode === "VIEW" ? t("viewTitle") : t("registerTitle")}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {mode === "VIEW" ? t("viewSubtitle") : t("registerSubtitle")}
          </p>
        </div>

        <div className="text-lg font-semibold text-gray-800">{monthTitle}</div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        {mode === "VIEW" ? (
          <>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-emerald-200" /> {t("legend.hasClass")}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-gray-200" /> {t("legend.noClass")}
            </span>
          </>
        ) : (
          <>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-emerald-200" /> {t("legend.available")}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-red-200" /> {t("legend.full")}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-gray-200" /> {t("legend.closed")}
            </span>
          </>
        )}
      </div>

      {/* Calendar */}
      <div className="mt-5 overflow-x-auto">
        <div className="min-w-[860px]">
          <div className="grid grid-cols-7 gap-3">
            {headers.map((h) => (
              <div key={h} className="px-1 text-center text-xs font-semibold text-gray-600">
                {h.toUpperCase()}
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-7 gap-3">
            {cells.map((c, idx) => {
              if (!c.inMonth) return <div key={idx} className="h-[92px] rounded-xl bg-transparent" />;

              const d = c.dateISO!;
              const info = dayMap[d];
              const status: DayStatus = info?.status ?? "EMPTY";
              const isSelected = selectedDateISO === d;

              const clickable = mode === "VIEW" ? status === "HAS_CLASS" : status === "AVAILABLE";

              return (
                <button
                  key={d}
                  type="button"
                  disabled={!clickable}
                  onClick={() => onOpenPanel(d)}
                  className={[
                    "h-[92px] rounded-xl border p-3 text-left transition",
                    clsByStatus(status, mode),
                    isSelected ? "ring-2 ring-blue-400" : "",
                  ].join(" ")}
                  title={`${vnDayLabel(new Date(d).getDay())} - ${d}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="text-sm font-bold text-gray-900">{c.dayNum}</div>

                    {mode === "VIEW" && status === "HAS_CLASS" ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    ) : null}
                    {mode === "REGISTER" && status === "AVAILABLE" ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    ) : null}
                    {mode === "REGISTER" && status === "FULL" ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    ) : null}
                  </div>

                  <div className="mt-3 text-xs text-gray-600">
                    {mode === "VIEW"
                      ? status === "HAS_CLASS"
                        ? t("hints.sessions", { count: info?.events?.length ?? 1 })
                        : ""
                      : status === "AVAILABLE"
                      ? t("hints.slots", { count: info?.events?.length ?? 1 })
                      : status === "FULL"
                      ? t("hints.full")
                      : ""}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
