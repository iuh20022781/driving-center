"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import NotificationsFiltersBar from "@/components/admin/notifications/NotificationsFiltersBar";
import NotificationCard from "@/components/admin/notifications/NotificationCard";
import NotificationsHeaderActions from "@/components/admin/notifications/NotificationsHeaderActions";
import type { NotificationStatus, NotificationType } from "@/types/notification";
import { notificationsStore } from "@/lib/notifications.store";

export default function AdminNotificationsPage() {
  const t = useTranslations("Notifications");
  const locale = (useLocale() || "vi") as "vi" | "en";

  const list = notificationsStore.useList(locale);

  const [type, setType] = useState<NotificationType | "all">("all");
  const [status, setStatus] = useState<NotificationStatus | "all">("all");

  const filtered = useMemo(() => {
    return list.filter((x) => {
      const okType = type === "all" ? true : x.type === type;
      const okStatus = status === "all" ? true : x.status === status;
      return okType && okStatus;
    });
  }, [list, type, status]);

  const unreadCount = useMemo(
    () => list.filter((x) => x.status === "unread").length,
    [list]
  );

  return (
    <div>
      <PageHeader
        title={t("title")}
        breadcrumb={t("breadcrumb")}
        right={
          <NotificationsHeaderActions
            unreadCount={unreadCount}
            onMarkAllRead={() => notificationsStore.markAll(locale, "read")}
          />
        }
      />

      {/* ✅ Thanh bộ lọc nằm ngang ở trên (giống trang học viên) */}
      <NotificationsFiltersBar
        type={type}
        status={status}
        onTypeChange={setType}
        onStatusChange={setStatus}
      />

      {/* ✅ List ở dưới */}
      <div className="mt-4 space-y-3">
        {filtered.map((it) => (
          <NotificationCard
            key={it.id}
            item={it}
            onMarkRead={() => notificationsStore.markStatus(locale, it.id, "read")}
            onDelete={() => notificationsStore.remove(locale, it.id)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="panel p-6 text-white/60">{t("empty")}</div>
        )}
      </div>
    </div>
  );
}
