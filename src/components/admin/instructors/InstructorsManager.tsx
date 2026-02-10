"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import DataTable from "@/components/table/DataTable";
import ConfirmDeleteModal from "@/components/admin/students/ConfirmDeleteModal";
import InstructorsFilterBar from "./InstructorsFilterBar";
import InstructorsFilterModal, { InstructorFilterKey } from "./InstructorsFilterModal";
import InstructorFormModal, { InstructorFormValue } from "./InstructorFormModal";
import InstructorStatusBadge from "./InstructorStatusBadge";

export type InstructorStatus = "ACTIVE" | "PAUSED" | "DONE";
export type InstructorRank = "A" | "A1" | "B" | "B1" | "C" | "C2";

export type Instructor = {
  code: string;
  name: string;
  phone: string;
  cccd: string;
  address: string;
  email: string;
  rank: InstructorRank;
  status: InstructorStatus;
};

const MOCK: Instructor[] = [
  {
    code: "GV0001",
    name: "Nguyễn Văn A",
    phone: "0912345678",
    cccd: "079123456789",
    address: "TP. Hồ Chí Minh",
    email: "a@gmail.com",
    rank: "B",
    status: "ACTIVE",
  },
  {
    code: "GV0002",
    name: "Trần Thị B",
    phone: "0987654321",
    cccd: "079987654321",
    address: "Bình Dương",
    email: "b@gmail.com",
    rank: "B1",
    status: "PAUSED",
  },
  {
    code: "GV0003",
    name: "Lê Văn C",
    phone: "0901122334",
    cccd: "079555444333",
    address: "Đồng Nai",
    email: "c@gmail.com",
    rank: "C",
    status: "DONE",
  },
];

const ALL_FILTER_KEYS: InstructorFilterKey[] = [
  "code",
  "name",
  "phone",
  "cccd",
  "address",
  "email",
  "rank",
];

export default function InstructorsManager() {
  const t = useTranslations("Instructors");

  // ✅ không log MISSING_MESSAGE: chỉ gọi khi tồn tại key
  const tx = (key: string, fallback: string) =>
    // next-intl v3+ có t.has, nếu bạn đang dùng version không có thì fallback luôn
    // @ts-ignore
    typeof t.has === "function" && t.has(key as any) ? t(key as any) : fallback;

  const [q, setQ] = useState("");
  const [items, setItems] = useState<Instructor[]>(MOCK);

  // filter columns
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterCols, setFilterCols] = useState<InstructorFilterKey[]>(ALL_FILTER_KEYS);

  const filterColumnsMeta = useMemo(
    () => [
      { key: "code" as const, label: tx("cols.code", "Mã giáo viên") },
      { key: "name" as const, label: tx("cols.name", "Tên giáo viên") },
      { key: "phone" as const, label: tx("cols.phone", "Số điện thoại") },
      { key: "cccd" as const, label: tx("cols.cccd", "CCCD") },
      { key: "address" as const, label: tx("cols.address", "Địa chỉ") },
      { key: "email" as const, label: tx("cols.email", "Gmail") },
      { key: "rank" as const, label: tx("cols.rank", "Hạng dạy") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Instructor | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<Instructor | null>(null);

  // ✅ keyword search theo cột đã chọn
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;

    return items.filter((x) => {
      const parts: string[] = [];
      for (const k of filterCols) parts.push(String((x as any)[k] ?? ""));
      return parts.join(" ").toLowerCase().includes(s);
    });
  }, [q, items, filterCols]);

  const columns = useMemo(
    () => [
      { key: "code", header: tx("cols.code", "Mã giáo viên"), width: 140 },
      { key: "name", header: tx("cols.name", "Tên giáo viên"), width: 220 },
      { key: "phone", header: tx("cols.phone", "Số điện thoại"), width: 150 },
      { key: "cccd", header: tx("cols.cccd", "CCCD"), width: 170 },
      { key: "address", header: tx("cols.address", "Địa chỉ"), width: 220 },
      { key: "email", header: tx("cols.email", "Gmail"), width: 220 },
      { key: "rank", header: tx("cols.rank", "Hạng dạy"), width: 120 },
      {
        key: "status",
        header: tx("cols.status", "Trạng thái"),
        width: 140,
        render: (r: Instructor) => <InstructorStatusBadge status={r.status} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(r: Instructor) {
    setEditing(r);
    setFormOpen(true);
  }

  function openDelete(r: Instructor) {
    setDeleting(r);
    setDeleteOpen(true);
  }

  function save(v: InstructorFormValue) {
    if (editing) {
      setItems((prev) => prev.map((x) => (x.code === editing.code ? { ...x, ...v } : x)));
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

  // ✅ initial luôn đầy đủ, tránh undefined -> lỗi initial
  const initialForm: InstructorFormValue | undefined = editing
    ? {
        name: editing.name ?? "",
        phone: editing.phone ?? "",
        cccd: editing.cccd ?? "",
        address: editing.address ?? "",
        email: editing.email ?? "",
        rank: (editing.rank ?? "B") as InstructorRank,
        status: (editing.status ?? "ACTIVE") as InstructorStatus,
      }
    : undefined;

  return (
    <>
      <PageHeader
        title={tx("title", "Danh sách giáo viên")}
        breadcrumb={tx("breadcrumb", "Quản lý • Giáo viên")}
        right={
          <button type="button" className="btn-pink h-10 px-5" onClick={openCreate}>
            {tx("add", "Thêm giáo viên")}
          </button>
        }
      />

      <div className="mt-5">
        <InstructorsFilterBar
          query={q}
          onQueryChange={setQ}
          onReset={() => setQ("")}
          onOpenFilter={() => setFilterOpen(true)}
        />
      </div>

      <div className="mt-4">
        <DataTable<Instructor>
          columns={columns as any}
          rows={rows}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      </div>

      <InstructorsFilterModal
        open={filterOpen}
        title={tx("filterTitle", "Bộ lọc")}
        columns={filterColumnsMeta}
        selected={filterCols}
        onChange={setFilterCols}
        onClose={() => setFilterOpen(false)}
        onApply={() => setFilterOpen(false)}
        onSelectAll={() => setFilterCols(ALL_FILTER_KEYS)}
        onClear={() => setFilterCols([])}
      />

      <InstructorFormModal
        open={formOpen}
        title={editing ? tx("editTitle", "Sửa giáo viên") : tx("createTitle", "Thêm giáo viên")}
        initial={initialForm}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSave={save}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        title={tx("deleteTitle", "Xóa giáo viên")}
        description={
          deleting ? tx("deleteDesc", `Bạn có chắc muốn xóa ${deleting.code} – ${deleting.name}?`) : ""
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

function nextCode(items: Instructor[]) {
  let max = 0;
  for (const it of items) {
    const m = it.code.match(/GV(\d+)/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return `GV${String(max + 1).padStart(4, "0")}`;
}
