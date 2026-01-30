"use client";

import { useSyncExternalStore } from "react";
import type { NotificationItem, NotificationStatus, NotificationType } from "@/types/notification";

type Locale = "vi" | "en";

type State = {
  byLocale: Record<Locale, NotificationItem[]>;
};

const KEY = "driving_admin_notifications_v1";

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function seed(): State {
  const now = Date.now();
  const mk = (o: Partial<NotificationItem>): NotificationItem => ({
    id: crypto.randomUUID(),
    type: "course_registration",
    status: "unread",
    title: "—",
    message: "—",
    createdAt: now,
    ...o
  });

  return {
    byLocale: {
      vi: [
        mk({
          type: "course_registration",
          title: "Đăng ký khóa học mới",
          message: "Học viên Nguyễn Văn A đăng ký khóa B1.",
          studentName: "Nguyễn Văn A",
          courseCode: "B1",
          phone: "0901234567",
          createdAt: now - 1000 * 60 * 8
        }),
        mk({
          type: "profile_review",
          title: "Hồ sơ cần duyệt",
          message: "Hồ sơ của Trần Thị B đang chờ duyệt.",
          studentName: "Trần Thị B",
          phone: "0987654321",
          reviewResult: "need_more",
          createdAt: now - 1000 * 60 * 25
        })
      ],
      en: [
        mk({
          type: "course_registration",
          title: "New course registration",
          message: "Student Nguyen Van A registered for B1.",
          studentName: "Nguyen Van A",
          courseCode: "B1",
          phone: "0901234567",
          createdAt: now - 1000 * 60 * 8
        }),
        mk({
          type: "profile_review",
          title: "Profile pending review",
          message: "Profile of Tran Thi B is waiting for review.",
          studentName: "Tran Thi B",
          phone: "0987654321",
          reviewResult: "need_more",
          createdAt: now - 1000 * 60 * 25
        })
      ]
    }
  };
}

let state: State = { byLocale: { vi: [], en: [] } };

function read(): State {
  if (typeof window === "undefined") return seed();
  const raw = localStorage.getItem(KEY);
  if (!raw) return seed();
  try {
    return JSON.parse(raw) as State;
  } catch {
    return seed();
  }
}

function write(next: State) {
  state = next;
  localStorage.setItem(KEY, JSON.stringify(next));
  emit();
}

function getSnapshot() {
  if (typeof window !== "undefined" && state.byLocale.vi.length === 0 && state.byLocale.en.length === 0) {
    state = read();
  }
  return state;
}

function getServerSnapshot(): State {
  return { byLocale: { vi: [], en: [] } };
}

export const notificationsStore = {
  useList(locale: Locale) {
    return useSyncExternalStore(
      subscribe,
      () => getSnapshot().byLocale[locale] ?? [],
      () => getServerSnapshot().byLocale[locale] ?? []
    );
  },

  add(locale: Locale, item: NotificationItem) {
    const s = getSnapshot();
    const list = s.byLocale[locale] ?? [];
    write({ ...s, byLocale: { ...s.byLocale, [locale]: [item, ...list] } });
  },

  markStatus(locale: Locale, id: string, status: NotificationStatus) {
    const s = getSnapshot();
    const list = (s.byLocale[locale] ?? []).map((x) => (x.id === id ? { ...x, status } : x));
    write({ ...s, byLocale: { ...s.byLocale, [locale]: list } });
  },

  markAll(locale: Locale, status: NotificationStatus) {
    const s = getSnapshot();
    const list = (s.byLocale[locale] ?? []).map((x) => ({ ...x, status }));
    write({ ...s, byLocale: { ...s.byLocale, [locale]: list } });
  },

  remove(locale: Locale, id: string) {
    const s = getSnapshot();
    const list = (s.byLocale[locale] ?? []).filter((x) => x.id !== id);
    write({ ...s, byLocale: { ...s.byLocale, [locale]: list } });
  },

  // tiện ích: đếm unread
  getUnreadCount(locale: Locale) {
    const s = getSnapshot();
    return (s.byLocale[locale] ?? []).filter((x) => x.status === "unread").length;
  }
};
