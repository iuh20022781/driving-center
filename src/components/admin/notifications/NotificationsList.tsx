"use client";

import { useTranslations } from "next-intl";
import NotificationCard from "@/components/admin/notifications/NotificationCard";
import type { NotificationItem } from "@/types/notification";

export default function NotificationsList({
  items,
  onMarkRead,
  onDelete
}: {
  items: NotificationItem[];
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const t = useTranslations("Notifications");

  if (items.length === 0) {
    return <div className="panel p-6 text-white/60">{t("empty")}</div>;
  }

  return (
    <div className="space-y-3">
      {items.map((it) => (
        <NotificationCard
          key={it.id}
          item={it}
          onMarkRead={() => onMarkRead(it.id)}
          onDelete={() => onDelete(it.id)}
        />
      ))}
    </div>
  );
}
