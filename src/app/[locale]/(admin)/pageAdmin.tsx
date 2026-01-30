"use client";

import { useTranslations } from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import OverviewStats from "@/components/admin/dashboard/OverviewStats";

export default function AdminPage() {
  const t = useTranslations("Dashboard");

  return (
    <div>
      <PageHeader title={t("title")} breadcrumb={t("breadcrumb")} />

      {/* 4 cards tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div className="panel p-4">
          <div className="text-sm text-white/60">{t("card.students")}</div>
          <div className="text-3xl font-semibold mt-2">1,248</div>
        </div>

        <div className="panel p-4">
          <div className="text-sm text-white/60">{t("card.instructors")}</div>
          <div className="text-3xl font-semibold mt-2">26</div>
        </div>

        <div className="panel p-4">
          <div className="text-sm text-white/60">{t("card.courses")}</div>
          <div className="text-3xl font-semibold mt-2">18</div>
        </div>

        <div className="panel p-4">
          <div className="text-sm text-white/60">{t("card.revenue")}</div>
          <div className="text-3xl font-semibold mt-2">120.000.000đ</div>
        </div>
      </div>

      {/* thống kê mới: visits / views / registrations + filter */}
      <OverviewStats />
    </div>
  );
}
