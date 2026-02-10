"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { StudentStatus } from "./StudentsManager";
import SelectDark from "@/components/ui/SelectDark";
import { cn } from "@/utils/cn";

export type StudentFormValue = {
  name: string;
  phone: string;
  cccd: string;
  address: string;
  email: string;
  course: string;
  status: StudentStatus;
};

export default function StudentFormModal({
  open,
  title,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  title: string;
  initial?: StudentFormValue;
  onClose: () => void;
  onSave: (v: StudentFormValue) => void;
}) {
  const t = useTranslations("Students.form");

  // ✅ không log MISSING_MESSAGE
  const tx = (key: string, fallback: string) => {
    return t.has(key as any) ? t(key as any) : fallback;
  };

  const [v, setV] = useState<StudentFormValue>({
    name: "",
    phone: "",
    cccd: "",
    address: "",
    email: "",
    course: "",
    status: "ACTIVE",
  });

  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setErr(null);
    setV(
      initial || {
        name: "",
        phone: "",
        cccd: "",
        address: "",
        email: "",
        course: "",
        status: "ACTIVE",
      }
    );
  }, [open, initial]);

  const statusOptions = useMemo(
    () => [
      { value: "ACTIVE" as const, label: tx("statusActive", "Đang học") },
      { value: "PAUSED" as const, label: tx("statusPaused", "Tạm dừng") },
      { value: "DONE" as const, label: tx("statusDone", "Hoàn thành") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  if (!open) return null;

  function validate() {
    if (!v.name.trim()) return tx("errors.name", "Vui lòng nhập tên học viên.");
    if (!v.phone.trim())
      return tx("errors.phone", "Vui lòng nhập số điện thoại.");
    if (!v.cccd.trim()) return tx("errors.cccd", "Vui lòng nhập CCCD.");
    if (!v.address.trim())
      return tx("errors.address", "Vui lòng nhập địa chỉ.");
    if (!v.email.trim()) return tx("errors.email", "Vui lòng nhập Gmail.");
    if (!v.course.trim())
      return tx("errors.course", "Vui lòng nhập khóa học.");
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
      course: v.course.trim(),
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
          <Field label={tx("name", "Tên học viên")}>
            <input
              className="input-dark"
              value={v.name}
              onChange={(e) => setV({ ...v, name: e.target.value })}
              placeholder={tx("namePh", "Nguyễn Văn A")}
            />
          </Field>

          <Field label={tx("phone", "Số điện thoại")}>
            <input
              className="input-dark"
              value={v.phone}
              onChange={(e) => setV({ ...v, phone: e.target.value })}
              placeholder={tx("phonePh", "0912345678")}
            />
          </Field>

          <Field label={tx("cccd", "CCCD")}>
            <input
              className="input-dark"
              value={v.cccd}
              onChange={(e) => setV({ ...v, cccd: e.target.value })}
              placeholder={tx("cccdPh", "079123456789")}
            />
          </Field>

          <Field label={tx("email", "Gmail")}>
            <input
              className="input-dark"
              value={v.email}
              onChange={(e) => setV({ ...v, email: e.target.value })}
              placeholder={tx("emailPh", "abc@gmail.com")}
            />
          </Field>

          <Field label={tx("address", "Địa chỉ")}>
            <input
              className="input-dark"
              value={v.address}
              onChange={(e) => setV({ ...v, address: e.target.value })}
              placeholder={tx("addressPh", "TP. Hồ Chí Minh")}
            />
          </Field>

          <Field label={tx("course", "Khóa học")}>
            <input
              className="input-dark"
              value={v.course}
              onChange={(e) => setV({ ...v, course: e.target.value })}
              placeholder={tx("coursePh", "B2 - 3 tháng")}
            />
          </Field>

          <Field label={tx("status", "Trạng thái")}>
            <SelectDark<"ACTIVE" | "PAUSED" | "DONE">
              value={v.status}
              onChange={(s) => setV({ ...v, status: s })}
              options={statusOptions}
            />
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-xs text-white/55 mb-1">{label}</div>
      {children}
    </label>
  );
}
