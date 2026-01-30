"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { BarChart3, Eye, MousePointerClick, ClipboardList } from "lucide-react";
import { cn } from "@/utils/cn";

type CourseKey = "All" |"A" | "A1" | "B" | "B1" | "C" | "C1";
const COURSE_KEYS: CourseKey[] = ["All", "A", "A1", "B", "B1", "C", "C1"];

export default function OverviewStats() {
  const t = useTranslations("Dashboard");
  const [course, setCourse] = useState<CourseKey>("B");

  // mock data (thay API sau)
  const data = useMemo(() => {
    const registrationsByCourse: Record<CourseKey, number> = {
      All: 100,
      A: 36,
      A1: 52,
      B: 128,
      B1: 74,
      C: 28,
      C1: 19
    };

    return {
      visits: 18342,
      courseViews: 6421,
      registrations: registrationsByCourse[course]
    };
  }, [course]);

  const cards = [
    {
      title: t("stats.visits"),
      value: data.visits.toLocaleString("vi-VN"),
      icon: MousePointerClick
    },
    {
      title: t("stats.courseViews"),
      value: data.courseViews.toLocaleString("vi-VN"),
      icon: Eye
    }
  ];

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2 text-white/85">
        <BarChart3 className="h-4 w-4 text-white/60" />
        <div className="text-sm font-semibold">{t("stats.title")}</div>
      </div>

      {/* visits + views */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} className="panel p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-white/60">{c.title}</div>
                  <div className="text-3xl font-semibold mt-2">{c.value}</div>
                </div>
                <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-white/70" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* registrations + filter */}
      <div className="panel p-4 mt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-white/70" />
            </div>
            <div>
              <div className="text-sm text-white/60">{t("stats.registrations")}</div>
              <div className="text-3xl font-semibold mt-1">
                {data.registrations.toLocaleString("vi-VN")}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-white/60">{t("stats.filterCourse")}</div>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value as CourseKey)}
              className={cn(
                "rounded-xl px-3 py-2 text-sm outline-none",
                "bg-black/20 text-white border border-white/10"
              )}
            >
              {COURSE_KEYS.map((k) => (
                <option key={k} value={k} className="bg-[rgb(15,19,26)]">
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 text-xs text-white/50">
          {t("stats.hint")}{" "}
          <span className="text-white/70">
            ({t("stats.selected")}: {course})
          </span>
        </div>
      </div>
    </div>
  );
}
