"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  UserCog,
  BookOpen,
  X,
  MessageCircle,
  Newspaper,
  Bell
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useSidebar } from "./SidebarContext";
import UserMenu from "./UserMenu";

const items = [
  { key: "dashboard", href: "/admin", icon: LayoutDashboard },
  { key: "analytics", href: "/admin/analytics", icon: BarChart3 },
  { key: "chat", href: "/admin/chat", icon: MessageCircle },
  { key: "notifications", href: "/admin/notifications", icon: Bell },
  { key: "students", href: "/admin/students", icon: Users },
  { key: "instructors", href: "/admin/instructors", icon: UserCog },
  { key: "courses", href: "/admin/courses", icon: BookOpen },
  { key: "posts", href: "/admin/posts", icon: Newspaper },
  
  
];

function stripLocale(pathname: string) {
  return pathname.replace(/^\/(vi|en)(?=\/|$)/, "") || "/";
}

export default function Sidebar() {
  const pathname = usePathname();
  const locale = useLocale() || "vi";
  const t = useTranslations("Nav");
  const { open, close } = useSidebar();

  const basePath = stripLocale(pathname);

  return (
    <>
      {/* ===== Desktop sidebar ===== */}
      <aside
        className={cn(
          "hidden md:flex min-h-screen border-r border-white/10 bg-[rgb(15,19,26)] transition-all duration-200",
          open ? "w-[280px]" : "w-0 overflow-hidden border-r-0"
        )}
      >
        <div className={cn("w-full px-4 py-5", open ? "block" : "hidden")}>
          <div className="flex items-center gap-3 pb-5">
            <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="leading-tight min-w-0">
              <div className="font-semibold text-white/90 truncate">
                Driving Center
              </div>
              <div className="text-xs text-white/50 truncate">
                {t("subtitle")}
              </div>
            </div>
          </div>

          <div className="text-xs text-white/50 mb-3">{t("menu")}</div>

          <nav className="space-y-1">
            {items.map((it) => {
              const target = `/${locale}${it.href}`;
              const active = pathname === target;
              const Icon = it.icon;

              return (
                <Link
                  key={it.href}
                  href={target}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition border",
                    active
                      ? "bg-white/10 text-white border-white/10"
                      : "text-white/80 border-transparent hover:bg-white/5 hover:border-white/10 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t(it.key)}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ===== Mobile drawer ===== */}
      <div className="md:hidden">
        {open && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/60" onClick={close} />

            <div className="absolute left-0 top-0 h-full w-[82vw] max-w-[320px] bg-[rgb(15,19,26)] border-r border-white/10 flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <Image
                      src="/images/logo.png"
                      alt="Logo"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white/90 truncate">
                      Driving Center
                    </div>
                    <div className="text-xs text-white/50 truncate">
                      {t("subtitle")}
                    </div>
                  </div>
                </div>

                <button
                  className="btn-ghost p-2"
                  onClick={close}
                  aria-label="Close menu"
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-4 py-4 flex-1 overflow-y-auto">
                <div className="text-xs text-white/50 mb-3">{t("menu")}</div>

                <nav className="space-y-1">
                  {items.map((it) => {
                    const target = `/${locale}${it.href}`;
                    const active = pathname === target;
                    const Icon = it.icon;

                    return (
                      <Link
                        key={it.href}
                        href={target}
                        onClick={close}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition border",
                          active
                            ? "bg-white/10 text-white border-white/10"
                            : "text-white/80 border-transparent hover:bg-white/5 hover:border-white/10 hover:text-white"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {t(it.key)}
                      </Link>
                    );
                  })}
                </nav>

                <div className="my-5 border-t border-white/10" />

                <div className="text-xs text-white/50 mb-2">{t("account")}</div>
                <div className="panel p-2">
                  <UserMenu variant="mobile" onNavigate={close} />
                </div>

                {/* ✅ Locale buttons at bottom */}
                <div className="mt-4">
                  <div className="text-xs text-white/50 mb-2">
                    {t("language")}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/vi${basePath}`}
                      onClick={close}
                      className={cn(
                        "flex-1 text-center rounded-xl px-3 py-2 text-sm border transition",
                        locale === "vi"
                          ? "bg-pink-500 text-white border-pink-500"
                          : "border-white/10 text-white/80 hover:bg-white/5"
                      )}
                    >
                      VI
                    </Link>

                    <Link
                      href={`/en${basePath}`}
                      onClick={close}
                      className={cn(
                        "flex-1 text-center rounded-xl px-3 py-2 text-sm border transition",
                        locale === "en"
                          ? "bg-pink-500 text-white border-pink-500"
                          : "border-white/10 text-white/80 hover:bg-white/5"
                      )}
                    >
                      EN
                    </Link>
                  </div>
                </div>

                <div className="h-6" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
