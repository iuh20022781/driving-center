"use client";

import { useTranslations } from "next-intl";
import type { StudentStatus } from "./StudentsManager";
import { cn } from "@/utils/cn";

export default function StudentStatusBadge({ status }: { status: StudentStatus }) {
  const t = useTranslations("Students");
  const cls =
    status === "ACTIVE"
      ? "text-sky-300 bg-sky-500/10 border-sky-500/20"
      : status === "PAUSED"
      ? "text-amber-300 bg-amber-500/10 border-amber-500/20"
      : "text-emerald-300 bg-emerald-500/10 border-emerald-500/20";

  return (
    <span className={cn("inline-flex items-center rounded-xl border px-2.5 py-1 text-xs font-medium", cls)}>
      {t(`status.${status}`)}
    </span>
  );
}
