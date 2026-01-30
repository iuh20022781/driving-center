"use client";

import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import Toolbar from "@/components/table/Toolbar";
import DataTable from "@/components/table/DataTable";
import {formatVnd} from "@/utils/format";

type Course = {
  code: string;
  name: string;
  duration: string;
  fee: number;
  status: "OPEN" | "LOCKED";
};

const MOCK: Course[] = [
  {code: "B1", name: "Khóa B1", duration: "2.5 tháng", fee: 12000000, status: "OPEN"},
  {code: "B2", name: "Khóa B2", duration: "3 tháng", fee: 14500000, status: "OPEN"},
  {code: "C", name: "Khóa C", duration: "4 tháng", fee: 22000000, status: "LOCKED"}
];

export default function CoursesPage() {
  const t = useTranslations("Courses");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return MOCK;
    return MOCK.filter((x) => `${x.code} ${x.name}`.toLowerCase().includes(s));
  }, [q]);

  return (
    <div>
      <PageHeader
        title={t("title")}
        breadcrumb={t("breadcrumb")}
        right={
          <button className="rounded-xl bg-amber-700/80 px-4 py-2 text-sm font-medium hover:bg-amber-700">
            {t("add")}
          </button>
        }
      />

      <Toolbar query={q} onQueryChange={setQ} onReset={() => setQ("")} />

      <DataTable<Course>
        columns={[
          {key: "code", header: t("cols.code"), width: 90},
          {key: "name", header: t("cols.name")},
          {key: "duration", header: t("cols.duration"), width: 140},
          {key: "fee", header: t("cols.fee"), width: 160, render: (r) => formatVnd(r.fee)},
          {
            key: "status",
            header: t("cols.status"),
            width: 120,
            render: (r) => (
              <span className={r.status === "OPEN" ? "text-emerald-400 font-medium" : "text-amber-400 font-medium"}>
                {t(`status.${r.status}`)}
              </span>
            )
          }
        ]}
        rows={rows}
        onEdit={(r) => alert(`${t("edit")} ${r.code}`)}
        onDelete={(r) => alert(`${t("delete")} ${r.code}`)}
      />
    </div>
  );
}
