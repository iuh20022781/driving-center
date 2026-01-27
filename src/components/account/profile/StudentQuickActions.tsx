"use client";

import React from "react";
import { CalendarPlus, CalendarDays, Bell } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  layout?: "row" | "col";
  onOpenSchedule?: (mode: "REGISTER" | "VIEW") => void;
};

function ActionCard({
  title,
  desc,
  icon,
  tone,
  onClick,
  cta,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  tone: "blue" | "orange" | "gray";
  onClick?: () => void;
  cta: string;
}) {
  const toneClass =
    tone === "blue"
      ? "bg-sky-50 border-sky-100"
      : tone === "orange"
      ? "bg-orange-50 border-orange-100"
      : "bg-white border-gray-200";

  return (
    <div className={`rounded-2xl border p-6 shadow-sm ${toneClass}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold text-gray-900">{title}</div>
          <div className="mt-1 text-sm text-gray-600">{desc}</div>

          <button
            type="button"
            onClick={onClick}
            className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 hover:underline"
          >
            {cta} <span className="ml-1">→</span>
          </button>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-white">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function StudentQuickActions({ layout = "col", onOpenSchedule }: Props) {
  const t = useTranslations("StudentQuickActions");

  return (
    <div className={layout === "row" ? "grid grid-cols-1 gap-6 md:grid-cols-3" : "grid gap-6"}>
      <ActionCard
        title={t("registerSchedule.title")}
        desc={t("registerSchedule.desc")}
        icon={<CalendarPlus className="h-6 w-6 text-blue-700" />}
        tone="blue"
        cta={t("cta")}
        onClick={() => onOpenSchedule?.("REGISTER")}
      />

      <ActionCard
        title={t("viewSchedule.title")}
        desc={t("viewSchedule.desc")}
        icon={<CalendarDays className="h-6 w-6 text-gray-700" />}
        tone="gray"
        cta={t("cta")}
        onClick={() => onOpenSchedule?.("VIEW")}
      />

      <ActionCard
        title={t("notifications.title")}
        desc={t("notifications.desc")}
        icon={<Bell className="h-6 w-6 text-orange-600" />}
        tone="orange"
        cta={t("cta")}
        onClick={() => alert(t("notifications.mockAlert"))}
      />
    </div>
  );
}
