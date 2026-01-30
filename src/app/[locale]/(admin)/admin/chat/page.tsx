"use client";

import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import ChatShell from "@/components/admin/chat/ChatShell";
import {chatStore} from "@/lib/chat.store";

export default function AdminChatPage() {
  const t = useTranslations("Chat");
  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState<string>(() => chatStore.getDefaultThreadId());

  const threads = chatStore.useThreads(); // reactive hook
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return threads;
    return threads.filter((th) => {
      const name = (th.customerName || "").toLowerCase();
      const phone = (th.customerPhone || "").toLowerCase();
      const last = (th.lastMessage || "").toLowerCase();
      return name.includes(s) || phone.includes(s) || last.includes(s);
    });
  }, [threads, q]);

  const active = filtered.find((x) => x.id === activeId) ?? threads.find((x) => x.id === activeId) ?? null;

  return (
    <div className="min-w-0">
      <PageHeader title={t("title")} breadcrumb={t("breadcrumb")} />
      <ChatShell
        query={q}
        onQueryChange={setQ}
        threads={filtered}
        activeThread={active}
        onSelectThread={setActiveId}
      />
    </div>
  );
}
