"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { LogOut, Lock, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/utils/cn";

export default function UserMenu({
  variant = "desktop",
  onNavigate
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const t = useTranslations("UserMenu");
  const locale = useLocale() || "vi";
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // ✅ routes có locale
  const routes = useMemo(
    () => ({
      profile: `/${locale}/admin/personal-information`,
      changePassword: `/${locale}/admin/change-password`
    }),
    [locale]
  );

  useEffect(() => {
    if (variant !== "desktop") return;

    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [variant]);

  // Mobile: block menu
  if (variant === "mobile") {
    return (
      <div>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/5">
            <Image
              src="/images/avatar.png"
              alt="Avatar"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-white/90 truncate">{t("name")}</div>
            <div className="text-sm text-white/60 truncate">{t("role")}</div>
          </div>
        </div>

        <div className="mt-2">
          {/* ✅ locale route */}
          <Link
            href={routes.profile}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/85 hover:bg-white/5"
          >
            <User className="h-4 w-4 text-white/70" />
            {t("profile")}
          </Link>

          {/* ✅ locale route */}
          <Link
            href={routes.changePassword}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/85 hover:bg-white/5"
          >
            <Lock className="h-4 w-4 text-white/70" />
            {t("changePassword")}
          </Link>

          <button
            type="button"
            onClick={() => {
              onNavigate?.();
              console.log("logout");
            }}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/85 hover:bg-white/5"
          >
            <LogOut className="h-4 w-4 text-white/70" />
            {t("logout")}
          </button>
        </div>
      </div>
    );
  }

  // Desktop: dropdown
  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-white/5"
        aria-label="Open user menu"
      >
        <Image
          src="/images/avatar.png"
          alt="Avatar"
          fill
          className="object-cover"
          priority
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10",
            "bg-[rgb(15,19,26)] shadow-2xl"
          )}
        >
          <div className="px-4 py-3 border-b border-white/10">
            <div className="text-base font-semibold text-white/90">{t("name")}</div>
            <div className="text-sm text-white/60">{t("role")}</div>
          </div>

          <div className="py-2">
            {/* ✅ locale route */}
            <Link
              href={routes.profile}
              className="flex items-center gap-3 px-4 py-2 text-sm text-white/85 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              <User className="h-4 w-4 text-white/70" />
              {t("profile")}
            </Link>

            {/* ✅ locale route */}
            <Link
              href={routes.changePassword}
              className="flex items-center gap-3 px-4 py-2 text-sm text-white/85 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              <Lock className="h-4 w-4 text-white/70" />
              {t("changePassword")}
            </Link>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                console.log("logout");
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/85 hover:bg-white/5"
            >
              <LogOut className="h-4 w-4 text-white/70" />
              {t("logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
