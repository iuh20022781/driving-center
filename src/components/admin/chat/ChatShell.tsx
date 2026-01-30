"use client";

import {useEffect, useMemo, useState} from "react";
import type {ChatThread} from "@/types/chat";
import ChatThreadList from "./ChatThreadList";
import ChatWindow from "./ChatWindow";
import {cn} from "@/utils/cn";

export default function ChatShell({
  query,
  onQueryChange,
  threads,
  activeThread,
  onSelectThread
}: {
  query: string;
  onQueryChange: (v: string) => void;
  threads: ChatThread[];
  activeThread: ChatThread | null;
  onSelectThread: (id: string) => void;
}) {
  // mobile: list <-> chat
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  useEffect(() => {
    // nếu chọn thread trên mobile -> chuyển qua chat
    if (activeThread) setMobileView("chat");
  }, [activeThread?.id]);

  const canBack = useMemo(() => mobileView === "chat", [mobileView]);

  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 min-w-0">
      {/* LEFT */}
      <div className={cn("lg:col-span-4 min-w-0", mobileView === "chat" ? "hidden lg:block" : "block")}>
        <div className="panel overflow-hidden">
          <ChatThreadList
            query={query}
            onQueryChange={onQueryChange}
            threads={threads}
            activeId={activeThread?.id ?? null}
            onSelect={(id) => onSelectThread(id)}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className={cn("lg:col-span-8 min-w-0", mobileView === "list" ? "hidden lg:block" : "block")}>
        <div className="panel overflow-hidden min-w-0">
          <ChatWindow
            thread={activeThread}
            onBackMobile={canBack ? () => setMobileView("list") : undefined}
          />
        </div>
      </div>
    </div>
  );
}
