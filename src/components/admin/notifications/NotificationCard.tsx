"use client";

import { useTranslations } from "next-intl";
import type { NotificationItem } from "@/types/notification";
import { Check, Trash2 } from "lucide-react";

export default function NotificationCard({
  item,
  onMarkRead,
  onDelete
}: {
  item: NotificationItem;
  onMarkRead: () => void;
  onDelete: () => void;
}) {
  const t = useTranslations("Notifications");

  const badge =
    item.type === "course_registration"
      ? "bg-pink-500/15 border-pink-500/40 text-pink-100"
      : "bg-white/10 border-white/10 text-white/80";

  const statusDot = item.status === "unread" ? "bg-pink-400" : "bg-white/30";

  return (
    <div className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`h-2 w-2 rounded-full ${statusDot}`} />
            <div className="font-semibold text-white/90 truncate">{item.title}</div>
            <span className={`text-[11px] px-2 py-0.5 rounded-lg border ${badge}`}>
              {item.type === "course_registration" ? t("type.course") : t("type.profile")}
            </span>
          </div>

          <div className="mt-2 text-sm text-white/70">{item.message}</div>

          <div className="mt-3 text-xs text-white/50 flex flex-wrap gap-3">
            <span>{new Date(item.createdAt).toLocaleString()}</span>
            {item.studentName && <span>• {t("student")}: {item.studentName}</span>}
            {item.courseCode && <span>• {t("course")}: {item.courseCode}</span>}
            {item.phone && <span>• {t("phone")}: {item.phone}</span>}
          </div>

          {item.type === "profile_review" && item.reviewResult && (
            <div className="mt-2 text-xs">
              <span className="text-white/50">{t("review")}:</span>{" "}
              <span className="text-white/80">
                {t(`reviewResult.${item.reviewResult}` as any)}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {item.status === "unread" && (
            <button type="button" className="btn-ghost p-2" onClick={onMarkRead} aria-label="mark read">
              <Check className="h-4 w-4" />
            </button>
          )}
          <button type="button" className="btn-ghost p-2" onClick={onDelete} aria-label="delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
