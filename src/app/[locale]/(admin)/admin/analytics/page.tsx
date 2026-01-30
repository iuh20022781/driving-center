"use client";

import { useTranslations } from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";

export default function AnalyticsPage() {
  const t = useTranslations("Analytics");

  return (
    <div>
      <PageHeader title={t("title")} breadcrumb={t("breadcrumb")} />

      <div className="panel p-4 mt-4">
        <div className="text-sm text-white/70">{t("desc")}</div>
      </div>
    </div>
  );
}
