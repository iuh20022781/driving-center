"use client";

import { useTranslations } from "next-intl";

export default function NotificationsHeaderActions({
  unreadCount,
  onMarkAllRead
}: {
  unreadCount: number;
  onMarkAllRead: () => void;
}) {
  const t = useTranslations("Notifications");

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm text-white/60">
        {t("unread")}:{" "}
        <span className="text-white/90 font-semibold">{unreadCount}</span>
      </div>

      <button type="button" className="btn-pink" onClick={onMarkAllRead}>
        {t("markAllRead")}
      </button>
    </div>
  );
}
