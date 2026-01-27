"use client";

import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CalendarDayData, ScheduleMode } from "./MonthlyScheduleCalendar";

export default function SchedulePanel({
  open,
  onOpenChange,
  mode,
  dateISO,
  data,
  onRegister,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: ScheduleMode;
  dateISO: string | null;
  data?: CalendarDayData;
  onRegister?: (eventId: number) => void;
}) {
  const t = useTranslations("SchedulePanel");
  const events = data?.events ?? [];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-xl font-bold text-gray-900">
                {mode === "VIEW" ? t("viewTitle") : t("registerTitle")}
              </Dialog.Title>
              <div className="mt-1 text-sm text-gray-600">
                {t("dateLabel")}{" "}
                <span className="font-semibold text-gray-900">{dateISO ?? "-"}</span>
              </div>
            </div>

            <Dialog.Close asChild>
              <button className="rounded-lg p-2 hover:bg-gray-100" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-5">
            {events.length === 0 ? (
              <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                {t("empty")}
              </div>
            ) : (
              <div className="space-y-3">
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
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="rounded-xl border px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                {t("closeBtn")}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
