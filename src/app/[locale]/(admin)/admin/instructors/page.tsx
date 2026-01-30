"use client";

import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import Toolbar from "@/components/table/Toolbar";
import DataTable from "@/components/table/DataTable";

type Instructor = {
  code: string;
  name: string;
  phone: string;
  specialty: "B1" | "B2" | "C";
  status: "ACTIVE" | "OFF";
};

const MOCK: Instructor[] = [
  {code: "GV001", name: "Thầy Minh", phone: "0909000111", specialty: "B2", status: "ACTIVE"},
  {code: "GV002", name: "Cô Lan", phone: "0909000222", specialty: "B1", status: "OFF"}
];

export default function InstructorsPage() {
  const t = useTranslations("Instructors");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return MOCK;
    return MOCK.filter((x) => `${x.code} ${x.name} ${x.phone} ${x.specialty}`.toLowerCase().includes(s));
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

      <DataTable<Instructor>
        columns={[
          {key: "code", header: t("cols.code"), width: 140},
          {key: "name", header: t("cols.name")},
          {key: "phone", header: t("cols.phone"), width: 160},
          {key: "specialty", header: t("cols.specialty"), width: 140},
          {
            key: "status",
            header: t("cols.status"),
            width: 140,
            render: (r) => (
              <span className={r.status === "ACTIVE" ? "text-emerald-400 font-medium" : "text-amber-400 font-medium"}>
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
