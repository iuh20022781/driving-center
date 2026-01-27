"use client";

import React from "react";
import { ArrowDownCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

export type Props = {
  /** If provided, scroll to element id on current page */
  targetId?: string;
  /** If provided, navigate to this path (locale will be prefixed if needed) */
  href?: string;
  className?: string;
};

export default function FloatingRegisterNow({
  targetId,
  href = "/registration/nop-ho-so",
  className = "",
}: Props) {
  const t = useTranslations("FloatingRegister");
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "vi";

  const onClick = () => {
    // 1) If target exists on current page -> scroll
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    // 2) Otherwise navigate to /{locale}/registration/nop-ho-so
    const path = href.startsWith("/") ? href : `/${href}`;
    router.push(`/${locale}${path}`);
  };

  return (
    <div className={`fixed bottom-6 left-6 z-[10000] ${className}`}>
      <div
        className="
          absolute inset-0 -z-10 rounded-full
          bg-gradient-to-r from-red-500 via-yellow-400 to-green-500
          blur-2xl opacity-70
          animate-pulse
        "
      />

      <button
        type="button"
        onClick={onClick}
        aria-label={t?.("aria") ?? "Đăng ký ngay"}
        className="
          group relative flex items-center gap-2
          rounded-full
          bg-gradient-to-r from-red-600 via-yellow-500 to-green-600
          px-6 py-3
          text-sm font-bold uppercase tracking-wide text-white
          shadow-xl
          transition-all duration-300
          hover:scale-105
          hover:shadow-2xl
          active:scale-95
        "
      >
        <span className="whitespace-nowrap drop-shadow-sm">
          {t?.("label") ?? "Đăng ký ngay"}
        </span>

        <ArrowDownCircle
          className="
            h-10 w-10
            opacity-90
            transition-transform duration-300
            group-hover:translate-y-0.5
          "
        />
      </button>
    </div>
  );
}
