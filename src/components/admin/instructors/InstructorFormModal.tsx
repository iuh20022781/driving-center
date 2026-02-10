"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import SelectDark from "@/components/ui/SelectDark";
import { cn } from "@/utils/cn";
import type { InstructorRank, InstructorStatus } from "./InstructorsManager";

export type InstructorFormValue = {
  name: string;
  phone: string;
  cccd: string;
  address: string;
  email: string;
  rank: InstructorRank;
  status: InstructorStatus;
};

const DEFAULT_VALUE: InstructorFormValue = {
  name: "",
  phone: "",
  cccd: "",
  address: "",
  email: "",
  rank: "B1",
  status: "ACTIVE",
};

export default function InstructorFormModal({
  open,
  title,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  title: string;
  initial?: Partial<InstructorFormValue>;
  onClose: () => void;
  onSave: (v: InstructorFormValue) => void;
}) {
  const t = useTranslations("Instructors.form");

  const tx = (key: string, fallback: string) =>
    // @ts-ignore
    typeof t.has === "function" && t.has(key) ? t(key as any) : fallback;

  const [v, setV] = useState<InstructorFormValue>(DEFAULT_VALUE);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setErr(null);
    setV({ ...DEFAULT_VALUE, ...(initial || {}) }); // ✅ initial không bao giờ làm thiếu field
  }, [open, initial]);

  const rankOptions = useMemo(
    () => [
      { value: "A" as const, label: "A" },
      { value: "A1" as const, label: "A1" },
      { value: "B" as const, label: "B" },
      { value: "B1" as const, label: "B1" },
      { value: "C" as const, label: "C" },
      { value: "C2" as const, label: "C2" },
    ],
    []
  );

  // ✅ dịch status option từ Instructors.status.* hoặc Instructors.ACTIVE kiểu phẳng
  const tRoot = useTranslations("Instructors");
  const statusLabel = (s: InstructorStatus, fallback: string) => {
    // @ts-ignore
    if (typeof tRoot.has === "function" && tRoot.has(`status.${s}`)) return tRoot(`status.${s}` as any);
    // @ts-ignore
    if (typeof tRoot.has === "function" && tRoot.has(s)) return tRoot(s as any);
    return fallback;
  };

  const statusOptions = useMemo(
    () => [
      { value: "ACTIVE" as const, label: statusLabel("ACTIVE", "Đang dạy") },
      { value: "PAUSED" as const, label: statusLabel("PAUSED", "Tạm dừng") },
      { value: "DONE" as const, label: statusLabel("DONE", "Ngừng dạy") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tRoot]
  );

  if (!open) return null;

  function validate() {
    if (!v.name.trim()) return tx("errors.name", "Vui lòng nhập tên giáo viên.");
    if (!v.phone.trim()) return tx("errors.phone", "Vui lòng nhập số điện thoại.");
    if (!v.cccd.trim()) return tx("errors.cccd", "Vui lòng nhập CCCD.");
    if (!v.address.trim()) return tx("errors.address", "Vui lòng nhập địa chỉ.");
    if (!v.email.trim()) return tx("errors.email", "Vui lòng nhập Gmail.");
    if (!v.rank) return tx("errors.rank", "Vui lòng chọn hạng dạy.");
    return null;
  }

  function submit() {
    const msg = validate();
    if (msg) return setErr(msg);

    onSave({
      ...v,
      name: v.name.trim(),
      phone: v.phone.trim(),
      cccd: v.cccd.trim(),
      address: v.address.trim(),
      email: v.email.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-[780px] -translate-x-1/2 -translate-y-1/2 panel p-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="text-lg font-semibold text-white/90">{title}</div>
          <button className="btn-ghost" type="button" onClick={onClose}>
            {tx("close", "Đóng")}
          </button>
        </div>

        {err && (
          <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {err}
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label={tx("name", "Tên giáo viên")}>
            <input className="input-dark" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} />
          </Field>

          <Field label={tx("phone", "Số điện thoại")}>
            <input className="input-dark" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} />
          </Field>

          <Field label={tx("cccd", "CCCD")}>
            <input className="input-dark" value={v.cccd} onChange={(e) => setV({ ...v, cccd: e.target.value })} />
          </Field>

          <Field label={tx("email", "Gmail")}>
            <input className="input-dark" value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} />
          </Field>

          <Field label={tx("address", "Địa chỉ")}>
            <input className="input-dark" value={v.address} onChange={(e) => setV({ ...v, address: e.target.value })} />
          </Field>

          <Field label={tx("rank", "Hạng dạy")}>
            <SelectDark<InstructorRank> value={v.rank} onChange={(rk) => setV({ ...v, rank: rk })} options={rankOptions} />
          </Field>

          <Field label={tx("status", "Trạng thái")}>
            <SelectDark<InstructorStatus> value={v.status} onChange={(s) => setV({ ...v, status: s })} options={statusOptions} />
          </Field>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button className="btn-ghost" type="button" onClick={onClose}>
            {tx("cancel", "Hủy")}
          </button>
          <button className={cn("btn-pink")} type="button" onClick={submit}>
            {tx("save", "Lưu")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs text-white/55 mb-1">{label}</div>
      {children}
    </label>
  );
}
