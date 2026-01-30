"use client";

import { useSyncExternalStore } from "react";
import type { ChatMessage, ChatThread } from "@/types/chat";

type State = {
  threads: ChatThread[];
  messagesByThread: Record<string, ChatMessage[]>;
};

const now = () => Date.now();

const seedThreads: ChatThread[] = [
  {
    id: "t1",
    channel: "facebook",
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    lastMessage: "Cho mình hỏi lịch học bằng B1?",
    lastTime: "10:15"
  },
  {
    id: "t2",
    channel: "zalo",
    customerName: "Trần Thị B",
    customerPhone: "0987654321",
    lastMessage: "Học phí khóa A1 bao nhiêu?",
    lastTime: "09:42"
  },
  {
    id: "t3",
    channel: "phone",
    customerName: "Lê Văn C",
    customerPhone: "0912345678",
    lastMessage: "Có lớp học cuối tuần không?",
    lastTime: "Hôm qua"
  }
];

const seedMessages: Record<string, ChatMessage[]> = {
  t1: [
    {
      id: "m1",
      threadId: "t1",
      from: "customer",
      text: "Cho mình hỏi lịch học bằng B1?",
      createdAt: now() - 1000 * 60 * 8
    }
  ],
  t2: [
    {
      id: "m2",
      threadId: "t2",
      from: "customer",
      text: "Học phí khóa A1 bao nhiêu?",
      createdAt: now() - 1000 * 60 * 15
    }
  ],
  t3: [
    {
      id: "m3",
      threadId: "t3",
      from: "customer",
      text: "Có lớp học cuối tuần không?",
      createdAt: now() - 1000 * 60 * 60 * 5
    }
  ]
};

let state: State = {
  threads: seedThreads,
  messagesByThread: seedMessages
};

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return state;
}

/**
 * ✅ REQUIRED for SSR hydration:
 * Server snapshot must NOT depend on browser APIs.
 * Return safe default (empty) so server render is consistent.
 */
function getServerSnapshot(): State {
  return { threads: [], messagesByThread: {} };
}

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export const chatStore = {
  useThreads() {
    return useSyncExternalStore(
      subscribe,
      () => getSnapshot().threads,
      () => getServerSnapshot().threads
    );
  },

  useMessages(threadId: string | null) {
    return useSyncExternalStore(
      subscribe,
      () => {
        if (!threadId) return [];
        return getSnapshot().messagesByThread[threadId] ?? [];
      },
      () => []
    );
  },

  getDefaultThreadId() {
    return state.threads[0]?.id ?? "";
  },

  sendMessage(threadId: string, msg: ChatMessage) {
    const list = state.messagesByThread[threadId] ?? [];

    state = {
      ...state,
      messagesByThread: {
        ...state.messagesByThread,
        [threadId]: [...list, msg]
      },
      threads: state.threads.map((t) =>
        t.id === threadId
          ? { ...t, lastMessage: msg.text, lastTime: fmtTime(msg.createdAt) }
          : t
      )
    };

    emit();
  },

  mockCustomerReply(threadId: string) {
    const replies = [
      "Dạ mình muốn học cuối tuần được không ạ?",
      "Cho mình xin học phí và lịch khai giảng gần nhất.",
      "Mình đăng ký bằng B1 thì cần hồ sơ gì?",
      "Trung tâm có hỗ trợ thi sát hạch không ạ?"
    ];

    const pick = replies[Math.floor(Math.random() * replies.length)];
    const delay = 900 + Math.floor(Math.random() * 900);

    setTimeout(() => {
      const msg: ChatMessage = {
        id: crypto.randomUUID(),
        threadId,
        from: "customer",
        text: pick,
        createdAt: Date.now()
      };

      const list = state.messagesByThread[threadId] ?? [];

      state = {
        ...state,
        messagesByThread: {
          ...state.messagesByThread,
          [threadId]: [...list, msg]
        },
        threads: state.threads.map((t) =>
          t.id === threadId
            ? { ...t, lastMessage: msg.text, lastTime: fmtTime(msg.createdAt) }
            : t
        )
      };

      emit();
    }, delay);
  }
};
