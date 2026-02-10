// components/admin/hr/hr.nav.ts
import {
    LayoutDashboard,
    BarChart3,
    MessageCircle,
    Bell,
    ClipboardList,
    Users,
    UserCog,
    Building2,
    GraduationCap,
    BookOpen,
    CalendarDays,
    ClipboardCheck,
    Route,
    Car,
    FileText,
    Wrench,
    CreditCard,
    Settings,
    Shield,
    ScrollText,
    Newspaper,
  } from "lucide-react";
  
  export type NavItem = { key: string; href: string; icon: any };
  export type NavGroup = { key: string; icon: any; items: NavItem[] };
  
  export function getNavModel() {
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
  }
  
  export function flattenNav() {
    const { singles, groups } = getNavModel();
    const groupItems = groups.flatMap((g) => g.items.map((it) => ({ ...it, groupKey: g.key })));
    return {
      pages: [...singles.map((x) => ({ ...x, groupKey: "__single" })), ...groupItems],
      groups,
      singles,
    };
  }
  