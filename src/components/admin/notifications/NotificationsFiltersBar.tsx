"use client";

import { useTranslations } from "next-intl";
import type { NotificationStatus, NotificationType } from "@/types/notification";
import { cn } from "@/utils/cn";

export default function NotificationsFiltersBar({
  type,
  status,
  onTypeChange,
  onStatusChange
}: {
  type: NotificationType | "all";
  status: NotificationStatus | "all";
  onTypeChange: (v: NotificationType | "all") => void;
  onStatusChange: (v: NotificationStatus | "all") => void;
}) {
  const t = useTranslations("Notifications");

  const pill = (active: boolean) =>
    cn(
      "rounded-xl border px-3 py-2 text-sm transition whitespace-nowrap",
      active
        ? "bg-pink-500/15 border-pink-500/40 text-pink-100"
        : "border-white/10 text-white/80 hover:bg-white/5"
    );

  return (
    <div className="panel mt-4 p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="text-sm text-white/70 shrink-0">{t("filters")}</div>

        <div className="flex flex-wrap items-center gap-2">
          {/* ✅ ONE "All" button */}
          <button
            type="button"
            className={pill(type === "all" && status === "all")}
            onClick={() => {
              onTypeChange("all");
              onStatusChange("all");
            }}
          >
            {t("type.all")}
          </button>

          {/* Type */}
          <button
            type="button"
            className={pill(type === "course_registration")}
            onClick={() => onTypeChange("course_registration")}
          >
            {t("type.course")}
          </button>

          <button
            type="button"
            className={pill(type === "profile_review")}
            onClick={() => onTypeChange("profile_review")}
          >
            {t("type.profile")}
          </button>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-white/10 mx-2" />

          {/* Status (no "all") */}
          <button
            type="button"
            className={pill(status === "unread")}
            onClick={() => onStatusChange("unread")}
          >
            {t("status.unread")}
          </button>

          <button
            type="button"
            className={pill(status === "read")}
            onClick={() => onStatusChange("read")}
          >
            {t("status.read")}
          </button>
        </div>
      </div>
    </div>
  );
}
