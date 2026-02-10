"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  LayoutDashboard,
  BarChart3,
  MessageCircle,
  Bell,
  Users,
  UserCog,
  GraduationCap,
  BookOpen,
  ClipboardList,
  CalendarDays,
  ClipboardCheck,
  Route,
  Car,
  Wrench,
  CreditCard,
  FileText,
  Building2,
  Shield,
  Settings,
  ScrollText,
  Newspaper,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useSidebar } from "./SidebarContext";
import UserMenu from "./UserMenu";
import { useMemo, useState } from "react";

type NavItem = {
  key: string;
  href: string;
  icon: any;
};

type NavGroup = {
  key: string;
  icon: any;
  items: NavItem[];
};

function stripLocale(pathname: string) {
  return pathname.replace(/^\/(vi|en)(?=\/|$)/, "") || "/";
}

function isActivePath(pathname: string, locale: string, href: string) {
  const target = `/${locale}${href}`;
  if (pathname === target) return true;
  // active cho route con
  return pathname.startsWith(target + "/");
}

export default function Sidebar() {
  const pathname = usePathname();
  const locale = useLocale() || "vi";
  const t = useTranslations("Nav");
  const { open, close } = useSidebar();

  const basePath = stripLocale(pathname);

  // ====== GỘP MENU ======
  const { singles, groups } = useMemo(() => {
    const singles: NavItem[] = [
      { key: "dashboard", href: "/admin", icon: LayoutDashboard },
      { key: "analytics", href: "/admin/analytics", icon: BarChart3 },
    ];

    const groups: NavGroup[] = [
      {
        key: "ai",
        icon: MessageCircle,
        items: [
          { key: "chat", href: "/admin/chat", icon: MessageCircle },
          { key: "notifications", href: "/admin/notifications", icon: Bell },
        ],
      },
      {
        key: "admissions_group",
        icon: ClipboardList,
        items: [{ key: "admissions", href: "/admin/admissions", icon: ClipboardList }],
      },
      {
        key: "people",
        icon: Users,
        items: [
          { key: "students", href: "/admin/students", icon: Users },
          { key: "instructors", href: "/admin/instructors", icon: UserCog },
          { key: "hr", href: "/admin/hr", icon: Building2 },
        ],
      },
      {
        key: "training",
        icon: GraduationCap,
        items: [
          { key: "courses", href: "/admin/courses", icon: BookOpen },
          { key: "enrollments", href: "/admin/enrollments", icon: GraduationCap },
          { key: "theory_sessions", href: "/admin/class-sessions", icon: CalendarDays },
          { key: "teaching_assignments", href: "/admin/teaching-assignments", icon: ClipboardList },
          { key: "attendance", href: "/admin/attendance", icon: ClipboardCheck },
        ],
      },
      {
        key: "practice",
        icon: Route,
        items: [
          { key: "practice_schedules", href: "/admin/practice-schedules", icon: Route },
          { key: "rentals", href: "/admin/rentals", icon: Car },
          { key: "rental_packages", href: "/admin/rental-packages", icon: FileText },
        ],
      },
      {
        key: "fleet",
        icon: Car,
        items: [
          { key: "vehicles", href: "/admin/vehicles", icon: Car },
          { key: "maintenance", href: "/admin/maintenance", icon: Wrench },
        ],
      },
      {
        key: "finance_reports",
        icon: CreditCard,
        items: [
          { key: "payments", href: "/admin/payments", icon: CreditCard },
          { key: "reports", href: "/admin/reports", icon: FileText },
        ],
      },
      {
        key: "system",
        icon: Settings,
        items: [
          { key: "rbac", href: "/admin/rbac", icon: Shield },
          { key: "system_settings", href: "/admin/settings", icon: Settings },
          { key: "audit_logs", href: "/admin/audit-logs", icon: ScrollText },
        ],
      },
      {
        key: "content",
        icon: Newspaper,
        items: [{ key: "posts", href: "/admin/posts", icon: Newspaper }],
      },
    ];

    return { singles, groups };
  }, []);

  // ====== OPEN GROUPS (desktop + mobile dùng chung) ======
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  function toggleGroup(key: string) {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // auto open group if active (khi vào trang con)
  useMemo(() => {
    const next: Record<string, boolean> = {};
    for (const g of groups) {
      const active = g.items.some((it) => isActivePath(pathname, locale, it.href));
      if (active) next[g.key] = true;
    }
    setOpenGroups((prev) => ({ ...next, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, locale]);

  const NavLink = ({
    it,
    onNavigate,
  }: {
    it: NavItem;
    onNavigate?: () => void;
  }) => {
    const Icon = it.icon;
    const target = `/${locale}${it.href}`;
    const active = isActivePath(pathname, locale, it.href);

    return (
      <Link
        href={target}
        scroll={false}
        onClick={(e) => {
          // tránh focus scroll weird + đóng mobile drawer
          (e.currentTarget as HTMLElement).blur();
          onNavigate?.();
        }}
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
  };

  const NavGroupBlock = ({
    g,
    onNavigate,
  }: {
    g: NavGroup;
    onNavigate?: () => void;
  }) => {
    const Icon = g.icon;
    const anyActive = g.items.some((it) => isActivePath(pathname, locale, it.href));
    const expanded = !!openGroups[g.key];

    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => toggleGroup(g.key)}
          className={cn(
            "w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm transition border",
            anyActive
              ? "bg-white/10 text-white border-white/10"
              : "text-white/80 border-transparent hover:bg-white/5 hover:border-white/10 hover:text-white"
          )}
        >
          <span className="flex items-center gap-3">
            <Icon className="h-4 w-4" />
            {t(g.key)}
          </span>
          <ChevronDown className={cn("h-4 w-4 transition", expanded ? "rotate-180" : "")} />
        </button>

        {expanded && (
          <div className="pl-3 space-y-1">
            {g.items.map((it) => (
              <NavLink key={it.href} it={it} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    );
  };

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
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover" priority />
            </div>

            <div className="leading-tight min-w-0">
              <div className="font-semibold text-white/90 truncate">Driving Center</div>
              <div className="text-xs text-white/50 truncate">{t("subtitle")}</div>
            </div>
          </div>

          <div className="text-xs text-white/50 mb-3">{t("menu")}</div>

          <nav className="space-y-2">
            <div className="space-y-1">
              {singles.map((it) => (
                <NavLink key={it.href} it={it} />
              ))}
            </div>

            <div className="my-2 border-t border-white/10" />

            <div className="space-y-2">
              {groups.map((g) => (
                <NavGroupBlock key={g.key} g={g} />
              ))}
            </div>
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
                    <Image src="/images/logo.png" alt="Logo" fill className="object-cover" priority />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white/90 truncate">Driving Center</div>
                    <div className="text-xs text-white/50 truncate">{t("subtitle")}</div>
                  </div>
                </div>

                <button className="btn-ghost p-2" onClick={close} aria-label="Close menu" type="button">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-4 py-4 flex-1 overflow-y-auto">
                <div className="text-xs text-white/50 mb-3">{t("menu")}</div>

                <nav className="space-y-2">
                  <div className="space-y-1">
                    {singles.map((it) => (
                      <NavLink key={it.href} it={it} onNavigate={close} />
                    ))}
                  </div>

                  <div className="my-2 border-t border-white/10" />

                  <div className="space-y-2">
                    {groups.map((g) => (
                      <NavGroupBlock key={g.key} g={g} onNavigate={close} />
                    ))}
                  </div>
                </nav>

                <div className="my-5 border-t border-white/10" />

                <div className="text-xs text-white/50 mb-2">{t("account")}</div>
                <div className="panel p-2">
                  <UserMenu variant="mobile" onNavigate={close} />
                </div>

                {/* Locale buttons */}
                <div className="mt-4">
                  <div className="text-xs text-white/50 mb-2">{t("language")}</div>

                  <div className="flex gap-2">
                    <Link
                      href={`/vi${basePath}`}
                      scroll={false}
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
                      scroll={false}
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
