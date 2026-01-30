"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { ChatThread, ChatMessage, ChatChannel } from "@/types/chat";
import { ArrowLeft, Send, ImagePlus } from "lucide-react";
import { chatStore } from "@/lib/chat.store";

function safeChannel(ch: ChatChannel | string | undefined) {
  if (ch === "facebook" || ch === "zalo" || ch === "phone" || ch === "other") return ch;
  return "other";
}

export default function ChatWindow({
  thread,
  onBackMobile
}: {
  thread: ChatThread | null;
  onBackMobile?: () => void;
}) {
  const t = useTranslations("Chat");
  const [text, setText] = useState("");

  const threadId = thread?.id ?? null;
  const messages = chatStore.useMessages(threadId);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, threadId]);

  const header = useMemo(() => {
    if (!thread) return null;
    const ch = safeChannel(thread.channel);

    return (
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-black/10">
        <div className="flex items-center gap-3 min-w-0">
          {onBackMobile && (
            <button
              type="button"
              className="btn-ghost p-2 lg:hidden"
              onClick={onBackMobile}
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div className="min-w-0">
            <div className="font-semibold text-white/90 truncate">{thread.customerName}</div>
            <div className="text-xs text-white/50 truncate">
              {thread.customerPhone} • {t(`channel.${ch}` as any)}
            </div>
          </div>
        </div>

        <div className="text-xs text-white/50 shrink-0">{t("onlineMock")}</div>
      </div>
    );
  }, [thread, onBackMobile, t]);

  if (!thread) {
    return <div className="p-6 text-white/60">{t("pickLeft")}</div>;
  }

  // ✅ thread chắc chắn có từ đây
  const realThreadId = thread.id;

  function send() {
    const v = text.trim();
    if (!v) return;

    chatStore.sendMessage(realThreadId, {
      id: crypto.randomUUID(),
      threadId: realThreadId,
      from: "admin",
      text: v,
      createdAt: Date.now()
    });

    setText("");
    chatStore.mockCustomerReply(realThreadId);
  }

  return (
    <div className="flex h-[calc(100vh-190px)] lg:h-[calc(100vh-210px)] min-w-0 flex-col">
      {header}

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-w-0">
        {messages.map((m: ChatMessage) => (
          <div key={m.id} className={m.from === "admin" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.from === "admin"
                  ? "max-w-[85%] rounded-2xl bg-pink-500/90 text-white px-3 py-2 text-sm border border-pink-400/40"
                  : "max-w-[85%] rounded-2xl bg-white/[0.06] text-white/90 px-3 py-2 text-sm border border-white/10"
              }
            >
              {m.text}
              <div className="mt-1 text-[11px] opacity-70">
                {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-white/10 bg-black/10 px-3 py-3">
        <div className="flex items-end gap-2">
          <button type="button" className="btn-ghost p-2" aria-label="Attach image">
            <ImagePlus className="h-5 w-5" />
          </button>

          <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={1}
              className="w-full resize-none bg-transparent text-sm outline-none text-white/90 placeholder:text-white/40"
              placeholder={t("placeholder")}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
          </div>

          <button type="button" className="btn-pink p-2" onClick={send} aria-label="Send">
            <Send className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-2 text-xs text-white/50">{t("hintEnter")}</div>
      </div>
    </div>
  );
}
