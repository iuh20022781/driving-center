"use client";
import { useMemo, useState } from "react";
import type { FilterState } from "@/types/request/notification/notification";
import type { NotificationDTO } from "@/types/response/notification/notification";
import { seedNotifications } from "@/data/notifications";

export function useNotifications() {
  const [items, setItems] = useState<NotificationDTO[]>(seedNotifications());
  const [filter, setFilter] = useState<FilterState>({ tab: "all", type: "all", q: "" });

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const filtered = useMemo(() => {
    return items
      .filter((n) => (filter.tab === "unread" ? !n.read : filter.tab === "read" ? !!n.read : true))
      .filter((n) => (filter.type === "all" ? true : n.type === filter.type))
      .filter((n) =>
        filter.q ? (n.title + " " + n.body).toLowerCase().includes(filter.q.toLowerCase()) : true
      )
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  }, [items, filter]);

  // actions
  function markRead(id: string, read = true) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read } : n)));
  }
  function markUnread(id: string) {
    markRead(id, false);
  }
  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }
  function remove(id: string) {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }
  function removeRead() {
    setItems((prev) => prev.filter((n) => !n.read));
  }
  function removeAll() {
    setItems(() => []);
  }

  return {
    items,
    filtered,
    filter,
    setFilter,
    unreadCount,
    markRead,
    markUnread,
    markAllRead,
    remove,
    removeRead,
    removeAll,
  };
}
