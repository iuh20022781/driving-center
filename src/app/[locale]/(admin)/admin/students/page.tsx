"use client";

import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import Toolbar from "@/components/table/Toolbar";
import DataTable from "@/components/table/DataTable";

type Student = {
  code: string;
  name: string;
  phone: string;
  course: string;
  status: "ACTIVE" | "PAUSED" | "DONE";
};

const MOCK: Student[] = [
  {code: "HV0001", name: "Nguyễn Văn A", phone: "0912345678", course: "B2 - 3 tháng", status: "ACTIVE"},
  {code: "HV0002", name: "Trần Thị B", phone: "0987654321", course: "B1 - 2.5 tháng", status: "PAUSED"},
  {code: "HV0003", name: "Lê Văn C", phone: "0901122334", course: "C - 4 tháng", status: "DONE"}
];

export default function StudentsPage() {
  const t = useTranslations("Students");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return MOCK;
    return MOCK.filter((x) => `${x.code} ${x.name} ${x.phone} ${x.course}`.toLowerCase().includes(s));
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

      <DataTable<Student>
        columns={[
          {key: "code", header: t("cols.code"), width: 160},
          {key: "name", header: t("cols.name")},
          {key: "phone", header: t("cols.phone"), width: 160},
          {key: "course", header: t("cols.course")},
          {
            key: "status",
            header: t("cols.status"),
            width: 140,
            render: (r) => (
              <span
                className={
                  "font-medium " +
                  (r.status === "ACTIVE"
                    ? "text-sky-400"
                    : r.status === "PAUSED"
                    ? "text-amber-400"
                    : "text-emerald-400")
                }
              >
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
