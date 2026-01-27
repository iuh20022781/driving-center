"use client";

import React from "react";
import { useTranslations } from "next-intl";
import type { CalendarDayData, ScheduleMode } from "./MonthlyScheduleCalendar";

export default function ScheduleDayDetail({
  mode,
  dateISO,
  data,
  onRegister,
}: {
  mode: ScheduleMode;
  dateISO: string;
  data?: CalendarDayData;
  onRegister?: (eventId: number) => void;
}) {
  const t = useTranslations("ScheduleDayDetail");
  const events = data?.events ?? [];

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h4 className="text-lg font-bold text-gray-900">
            {t("title", { date: dateISO })}
          </h4>
          <p className="mt-1 text-sm text-gray-600">
            {mode === "VIEW" ? t("viewSubtitle") : t("registerSubtitle")}
          </p>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
          {t("empty")}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {events.map((e) => (
            <div
              key={e.id}
              className="rounded-xl border bg-white px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="font-semibold text-gray-900">{e.title}</div>
                <div className="mt-1 text-sm text-gray-600">
                  {e.time} • {e.mode} • {e.room} • {e.instructor}
                </div>
              </div>

              {mode === "REGISTER" ? (
                <button
                  onClick={() => onRegister?.(e.id)}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {t("registerBtn")}
                </button>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
