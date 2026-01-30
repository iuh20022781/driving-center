"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { cn } from "@/utils/cn";
import { useSidebar } from "./SidebarContext";
import UserMenu from "./UserMenu";

function stripLocale(pathname: string) {
  return pathname.replace(/^\/(vi|en)(?=\/|$)/, "") || "/";
}

export default function TopbarAdmin() {
  const pathname = usePathname();
  const locale = useLocale() || "vi";
  const basePath = stripLocale(pathname);
  const t = useTranslations("Topbar");
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(15,19,26,0.85)] backdrop-blur">
      <div className="flex items-center justify-between px-4 md:px-5 py-3">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={toggle}
            className="btn-ghost p-2 shrink-0"
            aria-label="Toggle menu"
            type="button"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="text-sm text-white/60 truncate">
            {t("title")} •{" "}
            <span className="text-white/90">{t("center")}</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 shrink-0">
          {/* ✅ Locale chỉ hiện desktop */}
          <div className="hidden md:flex locale-pill">
            <Link
              href={`/vi${basePath}`}
              className={cn(
                "locale-btn",
                locale === "vi" && "locale-btn-active"
              )}
            >
              VI
            </Link>

            <Link
              href={`/en${basePath}`}
              className={cn(
                "locale-btn",
                locale === "en" && "locale-btn-active"
              )}
            >
              EN
            </Link>
          </div>

          {/* ✅ User menu (1 lần duy nhất – dùng cho cả mobile & desktop) */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
