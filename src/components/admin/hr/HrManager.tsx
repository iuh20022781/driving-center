"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import DataTable from "@/components/table/DataTable";
import ConfirmDeleteModal from "@/components/admin/students/ConfirmDeleteModal";
import HrFilterBar from "./HrFilterBar";
import HrFilterModal, { HrFilterKey } from "./HrFilterModal";
import HrFormModal, { HrFormValue } from "./HrFormModal";
import HrStatusBadge from "./HrStatusBadge";
import { flattenNav } from "./hr.nav";

export type HrStatus = "ACTIVE" | "PAUSED" | "DONE";

export type HrRole =
  | "STUDENT"
  | "INSTRUCTOR"
  | "ADMISSIONS"
  | "DISPATCH"
  | "VEHICLE_MANAGER"
  | "ACCOUNTANT"
  | "ADMIN"
  | "OWNER";

export type HrUser = {
  code: string; // NV0001...
  role: HrRole;
  fullName: string;
  dob: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  phone: string;
  cccd: string;
  email: string;
  address: string;

  username: string;
  password: string;

  allowedPages: string[];
  status: HrStatus;
};

const MOCK: HrUser[] = [
  {
    code: "NV0001",
    role: "ADMIN",
    fullName: "Nguyễn Văn A",
    dob: "1995-01-10",
    gender: "MALE",
    phone: "0912345678",
    cccd: "079123456789",
    email: "a@gmail.com",
    address: "TP. Hồ Chí Minh",
    username: "admin.a",
    password: "123456",
    allowedPages: ["/admin", "/admin/students", "/admin/instructors", "/admin/hr"],
    status: "ACTIVE",
  },
];

const ALL_FILTER_KEYS: HrFilterKey[] = [
  "code",
  "role",
  "fullName",
  "dob",
  "gender",
  "phone",
  "cccd",
  "email",
  "address",
  "username",
  "status",
];

export default function HrManager() {
  const t = useTranslations("HR");

  const tx = (key: string, fallback: string) =>
    // @ts-ignore
    typeof t.has === "function" && t.has(key as any) ? t(key as any) : fallback;

  const [q, setQ] = useState("");
  const [items, setItems] = useState<HrUser[]>(MOCK);

  // filter columns (cho search)
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterCols, setFilterCols] = useState<HrFilterKey[]>(ALL_FILTER_KEYS);

  const filterColumnsMeta = useMemo(
    () => [
      { key: "code" as const, label: tx("cols.code", "Mã nhân sự") },
      { key: "role" as const, label: tx("cols.role", "Chức vụ") },
      { key: "fullName" as const, label: tx("cols.fullName", "Họ và tên") },
      { key: "dob" as const, label: tx("cols.dob", "Ngày sinh") },
      { key: "gender" as const, label: tx("cols.gender", "Giới tính") },
      { key: "phone" as const, label: tx("cols.phone", "Số điện thoại") },
      { key: "cccd" as const, label: tx("cols.cccd", "CCCD") },
      { key: "email" as const, label: tx("cols.email", "Gmail") },
      { key: "address" as const, label: tx("cols.address", "Địa chỉ") },
      { key: "username" as const, label: tx("cols.username", "Tài khoản") },
      { key: "status" as const, label: tx("cols.status", "Trạng thái") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<HrUser | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<HrUser | null>(null);

  const permissionItems = useMemo(() => {
    const { pages } = flattenNav();
    return pages.map((p) => ({ key: p.key, label: p.key, group: p.groupKey }));
  }, []);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;

    return items.filter((x) => {
      const parts: string[] = [];
      for (const k of filterCols) {
        const v = (x as any)[k];
        if (Array.isArray(v)) parts.push(v.join(" "));
        else parts.push(String(v ?? ""));
      }
      return parts.join(" ").toLowerCase().includes(s);
    });
  }, [q, items, filterCols]);

  const columns = useMemo(
    () => [
      { key: "code", header: tx("cols.code", "Mã nhân sự"), width: 130 },
      { key: "role", header: tx("cols.role", "Chức vụ"), width: 170 },
      { key: "fullName", header: tx("cols.fullName", "Họ và tên"), width: 220 },
      { key: "phone", header: tx("cols.phone", "Số điện thoại"), width: 150 },
      { key: "email", header: tx("cols.email", "Gmail"), width: 220 },
      { key: "username", header: tx("cols.username", "Tài khoản"), width: 160 },
      {
        key: "status",
        header: tx("cols.status", "Trạng thái"),
        width: 140,
        render: (r: HrUser) => <HrStatusBadge status={r.status} />,
      },
      // ⚠️ Không thêm cột actions ở đây vì DataTable của bạn đã có actions built-in (onEdit/onDelete)
      // Nếu bạn muốn header "Thao tác", hãy sửa DataTable để header đó lấy từ prop (đừng thêm cột thủ công).
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(r: HrUser) {
    setEditing(r);
    setFormOpen(true);
  }

  function openDelete(r: HrUser) {
    setDeleting(r);
    setDeleteOpen(true);
  }

  function save(v: HrFormValue) {
    const allowedPages = permissionsToPaths(v.permissions);
    const userPayload: Omit<HrUser, "code"> = {
      role: v.role,
      fullName: v.fullName,
      dob: v.dob,
      gender: v.gender,
      phone: v.phone,
      cccd: v.cccd,
      email: v.email,
      address: v.address,
      username: v.username,
      password: v.password,
      allowedPages,
      status: v.status,
    };
    if (editing) {
      setItems((prev) =>
        prev.map((x) => (x.code === editing.code ? { ...x, ...userPayload } : x))
      );
    } else {
      setItems((prev) => [{ ...userPayload, code: nextCode(prev) }, ...prev]);
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

  const initialForm: Partial<HrFormValue> | undefined = editing
    ? {
        role: editing.role,
        fullName: editing.fullName ?? "",
        dob: editing.dob ?? "",
        gender: editing.gender ?? "MALE",
        phone: editing.phone ?? "",
        cccd: editing.cccd ?? "",
        email: editing.email ?? "",
        address: editing.address ?? "",
        username: editing.username ?? "",
        password: editing.password ?? "",
        permissions: pathsToPermissions(editing.allowedPages ?? ["/admin"]),
        status: editing.status ?? "ACTIVE",
      }
    : undefined;

  return (
    <>
      <PageHeader
        title={tx("title", "Danh sách nhân sự")}
        breadcrumb={tx("breadcrumb", "Quản lý · Nhân sự")}
        right={
          <button type="button" className="btn-pink h-10 px-5" onClick={openCreate}>
            {tx("add", "Thêm nhân sự")}
          </button>
        }
      />

      <div className="mt-5">
        <HrFilterBar query={q} onQueryChange={setQ} onReset={() => setQ("")} onOpenFilter={() => setFilterOpen(true)} />
      </div>

      <div className="mt-4">
        <DataTable<HrUser> columns={columns as any} rows={rows} onEdit={openEdit} onDelete={openDelete} />
      </div>

      <HrFilterModal
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

      <HrFormModal
        open={formOpen}
        title={editing ? tx("editTitle", "Sửa nhân sự") : tx("createTitle", "Thêm nhân sự")}
        initial={initialForm}
        permissionItems={permissionItems}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSave={save}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        title={tx("deleteTitle", "Xóa nhân sự")}
        description={deleting ? tx("deleteDesc", `Bạn có chắc muốn xóa ${deleting.code} – ${deleting.fullName}?`) : ""}
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

function nextCode(items: HrUser[]) {
  let max = 0;
  for (const it of items) {
    const m = it.code.match(/NV(\d+)/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return `NV${String(max + 1).padStart(4, "0")}`;
}

function permissionsToPaths(keys: string[]): string[] {
  const { pages } = flattenNav();
  const keyToHref = new Map(pages.map((p) => [p.key, p.href]));
  return keys.map((k) => keyToHref.get(k)).filter(Boolean) as string[];
}

function pathsToPermissions(paths: string[]): string[] {
  const { pages } = flattenNav();
  const hrefToKey = new Map(pages.map((p) => [p.href, p.key]));
  return paths.map((p) => hrefToKey.get(p)).filter(Boolean) as string[];
}
