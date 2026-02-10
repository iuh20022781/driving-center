"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import DataTable from "@/components/table/DataTable";
import StudentFormModal, { StudentFormValue } from "./StudentFormModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import StudentStatusBadge from "./StudentStatusBadge";
import StudentsFilterBar from "./StudentsFilterBar";
import StudentsFilterModal, { StudentFilterKey } from "./StudentsFilterModal";

export type StudentStatus = "ACTIVE" | "PAUSED" | "DONE";

export type Student = {
  code: string;
  name: string;
  phone: string;
  cccd: string;
  address: string;
  email: string;
  course: string;
  status: StudentStatus;
};

const MOCK: Student[] = [
  {
    code: "HV0001",
    name: "Nguyễn Văn A",
    phone: "0912345678",
    cccd: "079123456789",
    address: "TP. Hồ Chí Minh",
    email: "a@gmail.com",
    course: "B2 - 3 tháng",
    status: "ACTIVE",
  },
  {
    code: "HV0002",
    name: "Trần Thị B",
    phone: "0987654321",
    cccd: "079987654321",
    address: "Bình Dương",
    email: "b@gmail.com",
    course: "B1 - 2.5 tháng",
    status: "PAUSED",
  },
  {
    code: "HV0003",
    name: "Lê Văn C",
    phone: "0901122334",
    cccd: "079555444333",
    address: "Đồng Nai",
    email: "c@gmail.com",
    course: "C - 4 tháng",
    status: "DONE",
  },
];

export default function StudentsManager() {
  const t = useTranslations("Students");
  const tx = (key: string, fallback: string) =>
    t.has(key as any) ? t(key as any) : fallback;

  const [q, setQ] = useState("");
  const [items, setItems] = useState<Student[]>(MOCK);

  // ✅ chọn cột để lọc
  const allFilterKeys: StudentFilterKey[] = [
    "code",
    "name",
    "phone",
    "cccd",
    "address",
    "email",
    "course",
  ];
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterCols, setFilterCols] = useState<StudentFilterKey[]>(allFilterKeys);

  const filterColumnsMeta = useMemo(
    () => [
      { key: "code" as const, label: tx("cols.code", "Mã học viên") },
      { key: "name" as const, label: tx("cols.name", "Tên học viên") },
      { key: "phone" as const, label: tx("cols.phone", "Số điện thoại") },
      { key: "cccd" as const, label: tx("cols.cccd", "CCCD") },
      { key: "address" as const, label: tx("cols.address", "Địa chỉ") },
      { key: "email" as const, label: tx("cols.email", "Gmail") },
      { key: "course" as const, label: tx("cols.course", "Khóa học") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<Student | null>(null);

  // ✅ keyword search chỉ theo cột đã chọn
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;

    return items.filter((x) => {
      const parts: string[] = [];
      for (const k of filterCols) parts.push(String(x[k] ?? ""));
      return parts.join(" ").toLowerCase().includes(s);
    });
  }, [q, items, filterCols]);

  const columns = useMemo(
    () => [
      { key: "code", header: tx("cols.code", "Mã học viên"), width: 140 },
      { key: "name", header: tx("cols.name", "Tên học viên"), width: 220 },
      { key: "phone", header: tx("cols.phone", "Số điện thoại"), width: 150 },
      { key: "cccd", header: tx("cols.cccd", "CCCD"), width: 170 },
      { key: "address", header: tx("cols.address", "Địa chỉ"), width: 220 },
      { key: "email", header: tx("cols.email", "Gmail"), width: 220 },
      { key: "course", header: tx("cols.course", "Khóa học"), width: 180 },
      {
        key: "status",
        header: tx("cols.status", "Trạng thái"),
        width: 140,
        render: (r: Student) => <StudentStatusBadge status={r.status} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(r: Student) {
    setEditing(r);
    setFormOpen(true);
  }

  function openDelete(r: Student) {
    setDeleting(r);
    setDeleteOpen(true);
  }

  function save(v: StudentFormValue) {
    if (editing) {
      setItems((prev) =>
        prev.map((x) => (x.code === editing.code ? { ...x, ...v } : x))
      );
    } else {
      setItems((prev) => [{ code: nextCode(prev), ...v }, ...prev]);
    }
    setFormOpen(false);
    setEditing(null);
  }

  function confirmDelete() {
    if (!deleting) return;
    setItems((prev) => prev.filter((x) => x.code !== deleting.code));
    setDeleteOpen(false);
    setDeleting(null);
  }

  return (
    <>
      <PageHeader
        title={tx("title", "Danh sách học viên")}
        breadcrumb={tx("breadcrumb", "Quản lý · Học viên")}
        right={
          <button type="button" className="btn-pink h-10 px-5" onClick={openCreate}>
            {tx("add", "Thêm học viên")}
          </button>
        }
      />

      {/* ✅ Thanh search có khung/viền */}
      <div className="mt-5">
        <StudentsFilterBar
          query={q}
          onQueryChange={setQ}
          onReset={() => setQ("")}
          onOpenFilter={() => setFilterOpen(true)}
        />
      </div>

      <div className="mt-4">
        <DataTable<Student>
          columns={columns as any}
          rows={rows}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      </div>

      {/* ✅ Filter modal chọn cột */}
      <StudentsFilterModal
        open={filterOpen}
        title="Bộ lọc"
        columns={filterColumnsMeta}
        selected={filterCols}
        onChange={setFilterCols}
        onClose={() => setFilterOpen(false)}
        onApply={() => setFilterOpen(false)}
        onSelectAll={() => setFilterCols(allFilterKeys)}
        onClear={() => setFilterCols([])} // giữ lại 1 cột
      />

      <StudentFormModal
        open={formOpen}
        title={editing ? tx("editTitle", "Sửa học viên") : tx("createTitle", "Thêm học viên")}
        initial={
          editing
            ? {
                name: editing.name,
                phone: editing.phone,
                cccd: editing.cccd,
                address: editing.address,
                email: editing.email,
                course: editing.course,
                status: editing.status,
              }
            : undefined
        }
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSave={save}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        title={tx("deleteTitle", "Xóa học viên")}
        description={
          deleting
            ? tx("deleteDesc", `Bạn có chắc muốn xóa ${deleting.code} – ${deleting.name}?`)
            : ""
        }
        onClose={() => {
          setDeleteOpen(false);
          setDeleting(null);
        }}
        onConfirm={confirmDelete}
        confirmText={tx("delete", "Xóa")}
        cancelText={tx("cancel", "Hủy")}
      />
    </>
  );
}

function nextCode(items: Student[]) {
  let max = 0;
  for (const it of items) {
    const m = it.code.match(/HV(\d+)/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return `HV${String(max + 1).padStart(4, "0")}`;
}
