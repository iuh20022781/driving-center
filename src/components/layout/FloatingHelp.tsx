"use client";

import React from "react";
import { MessageCircle, X, PhoneCall, Send, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  hotline?: string;
  zaloLink?: string;
  facebookLink?: string;
};

type Msg = { from: "user" | "support"; text: string; time: string };

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function FloatingHelp({
  hotline = "19001234",
  zaloLink = "https://zalo.me/",
  facebookLink = "https://m.me/",
}: Props) {
  const t = useTranslations("Header");

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);

  const [text, setText] = React.useState("");
  const [messages, setMessages] = React.useState<Msg[]>([]);

  // init messages only client
  React.useEffect(() => {
    setMessages([
      {
        from: "support",
        text: t("floating.chat_welcome"),
        time: nowTime(),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (chatOpen) setMenuOpen(false);
  }, [chatOpen]);

  const send = () => {
    const value = text.trim();
    if (!value) return;

    setMessages((prev) => [...prev, { from: "user", text: value, time: nowTime() }]);
    setText("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "support", text: t("floating.chat_auto_reply"), time: nowTime() },
      ]);
    }, 600);
  };

  const openZalo = () => {
    setMenuOpen(false);
    window.open(zaloLink, "_blank", "noreferrer");
  };

  const openFacebook = () => {
    setMenuOpen(false);
    window.open(facebookLink, "_blank", "noreferrer");
  };

  const openChat = () => {
    setMenuOpen(false);
    setChatOpen(true);
  };

  return (
    <>
      {(menuOpen || chatOpen) && (
        <button
          type="button"
          aria-label="Close overlay"
          className="fixed inset-0 z-[9998] bg-black/30"
          onClick={() => {
            setMenuOpen(false);
            setChatOpen(false);
          }}
        />
      )}

      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3">
        {/* Panel chat */}
        {chatOpen && (
          <div className="w-[92vw] max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <div className="font-semibold">{t("floating.live_chat")}</div>
                <span className="text-xs opacity-90">{t("floating.online")}</span>
              </div>

              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="rounded-lg p-1.5 hover:bg-white/10"
                aria-label={t("floating.close_chat")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <a
              href={`tel:${hotline}`}
              className="flex items-center justify-center gap-2 bg-white px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-gray-50 border-b"
            >
              <PhoneCall className="h-4 w-4" />
              {t("floating.hotline")}: {hotline}
            </a>

            <div className="h-80 overflow-y-auto px-4 py-3">
              <div className="space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        m.from === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div>{m.text}</div>
                      <div
                        className={`mt-1 text-[11px] ${
                          m.from === "user" ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {m.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 border-t bg-white px-3 py-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder={t("floating.placeholder")}
                className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={send}
                className="rounded-xl bg-blue-600 p-2 text-white hover:bg-blue-700"
                aria-label={t("floating.send")}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Menu chọn kênh */}
        {menuOpen && !chatOpen && (
          <div className="mb-1 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <button
              type="button"
              onClick={openChat}
              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4 text-blue-600" />
              {t("floating.live_chat")}
            </button>

            <button
              type="button"
              onClick={openZalo}
              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-2 border-t"
            >
              <span className="h-4 w-4 rounded-sm bg-green-500 inline-block" />
              {t("floating.zalo")}
            </button>

            <button
              type="button"
              onClick={openFacebook}
              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-2 border-t"
            >
              <span className="h-4 w-4 rounded-sm bg-blue-700 inline-block" />
              {t("floating.facebook")}
            </button>

            <a
              href={`tel:${hotline}`}
              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-2 border-t font-semibold text-blue-700"
            >
              <PhoneCall className="h-4 w-4" />
              {t("floating.hotline")}: {hotline}
            </a>
          </div>
        )}

        {/* Nút nổi */}
        <button
          type="button"
          onClick={() => {
            if (chatOpen) {
              setChatOpen(false);
              return;
            }
            setMenuOpen((v) => !v);
          }}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-white shadow-xl hover:bg-blue-700"
          aria-label={t("floating.open_help")}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium">
            {chatOpen
              ? t("floating.close_chat")
              : menuOpen
              ? t("floating.close")
              : t("floating.help")}
          </span>
          <ChevronUp className={`h-4 w-4 transition ${menuOpen ? "rotate-180" : ""}`} />
        </button>
      </div>
    </>
  );
}
