"use client";

import {useTranslations} from "next-intl";
import type {ChatThread} from "@/types/chat";
import {Search, MessageCircle, Facebook, Phone, MessageSquareText} from "lucide-react";
import {cn} from "@/utils/cn";

function ChannelIcon({channel}:{channel: ChatThread["channel"]}) {
  if (channel === "facebook") return <Facebook className="h-4 w-4 text-white/70" />;
  if (channel === "zalo") return <MessageSquareText className="h-4 w-4 text-white/70" />;
  return <Phone className="h-4 w-4 text-white/70" />;
}

export default function ChatThreadList({
  query,
  onQueryChange,
  threads,
  activeId,
  onSelect
}:{
  query: string;
  onQueryChange: (v:string)=>void;
  threads: ChatThread[];
  activeId: string | null;
  onSelect: (id:string)=>void;
}) {
  const t = useTranslations("Chat");

  return (
    <div className="p-4 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <div className="text-lg font-semibold text-white/90">{t("inbox")}</div>
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
          <Search className="h-4 w-4 text-white/40" />
          <input
            value={query}
            onChange={(e)=>onQueryChange(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/40 text-white/90"
            placeholder={t("search")}
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {threads.map((th) => {
          const active = th.id === activeId;
          return (
            <button
              key={th.id}
              type="button"
              onClick={() => onSelect(th.id)}
              className={cn(
                "w-full text-left rounded-2xl border px-4 py-3 transition min-w-0",
                active
                  ? "bg-white/10 border-white/10"
                  : "bg-black/10 border-transparent hover:bg-white/[0.04] hover:border-white/10"
              )}
            >
              <div className="flex items-start justify-between gap-3 min-w-0">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-5 w-5 text-white/60" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="font-semibold text-white/90 truncate">{th.customerName}</div>
                      <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 text-xs text-white/70 shrink-0">
                        <ChannelIcon channel={th.channel} />
                        {t(`channel.${th.channel}`)}
                      </span>
                    </div>

                    <div className="text-xs text-white/50 truncate">{th.customerPhone}</div>
                    <div className="mt-1 text-sm text-white/70 truncate">{th.lastMessage}</div>
                  </div>
                </div>

                <div className="text-xs text-white/50 shrink-0">{th.lastTime}</div>
              </div>
            </button>
          );
        })}

        {threads.length === 0 && (
          <div className="text-sm text-white/60 pt-6">{t("empty")}</div>
        )}
      </div>
    </div>
  );
}
