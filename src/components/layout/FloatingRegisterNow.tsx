"use client";

import React from "react";
import { ArrowDownCircle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  targetId?: string;
  className?: string;
};

export default function FloatingRegisterNow({
  targetId = "register-form",
  className = "",
}: Props) {
  const t = useTranslations("FloatingRegister");

  const onClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className={`fixed bottom-5 left-5 z-[9999] ${className}`}>
      {/* glow effect */}
      <div className="absolute inset-0 -z-10 rounded-full blur-xl opacity-70 animate-pulse bg-yellow-400" />

      <button
        type="button"
        onClick={onClick}
        aria-label={t("aria")}
        className="group flex items-center gap-2 rounded-full bg-green-500 text-white shadow-2xl px-5 py-3 hover:bg-green-600 transition active:scale-95"
      >
        <Sparkles className="h-5 w-5 group-hover:rotate-12 transition" />
        <span className="text-sm font-bold uppercase tracking-wide">
          {t("label")}
        </span>
        <ArrowDownCircle className="h-5 w-5 opacity-90 group-hover:translate-y-0.5 transition" />
      </button>
    </div>
  );
}
