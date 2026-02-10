"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/utils/cn";
import type { HrStatus } from "./HrManager";

export default function HrStatusBadge({ status }: { status: HrStatus }) {
  const t = useTranslations("HR");

  const label =
    // @ts-ignore
    (typeof t.has === "function" && t.has(`status.${status}`) && t(`status.${status}` as any)) ||
    status;

  const cls =
    status === "ACTIVE"
      ? "text-sky-300 bg-sky-500/10 border-sky-500/20"
      : status === "PAUSED"
      ? "text-amber-300 bg-amber-500/10 border-amber-500/20"
      : "text-emerald-300 bg-emerald-500/10 border-emerald-500/20";

  return (
    <span className={cn("inline-flex items-center rounded-xl border px-2.5 py-1 text-xs font-medium", cls)}>
      {label}
    </span>
  );
}
