"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import SelectDark from "@/components/ui/SelectDark";
import { cn } from "@/utils/cn";

/** ========= Types ========= */
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

export type HrGender = "MALE" | "FEMALE" | "OTHER";

export type HrFormValue = {
  role: HrRole;
  status: HrStatus;

  fullName: string;
  dob: string; // yyyy-mm-dd
  gender: HrGender;

  phone: string;
  cccd: string;
  email: string;
  address: string;

  username: string;
  password: string;

  permissions: string[]; // keys
};

const DEFAULT_VALUE: HrFormValue = {
  role: "ADMIN",
  status: "ACTIVE",
  fullName: "",
  dob: "",
  gender: "MALE",
  phone: "",
  cccd: "",
  email: "",
  address: "",
  username: "",
  password: "",
  permissions: [],
};

type PermissionItem = { key: string; label: string; group?: string };

export default function HrFormModal({
  open,
  title,
  initial,
  permissionItems,
  onClose,
  onSave,
}: {
  open: boolean;
  title: string;
  initial?: Partial<HrFormValue>;
  permissionItems: PermissionItem[];
  onClose: () => void;
  onSave: (v: HrFormValue) => void;
}) {
  const t = useTranslations("HR");
  const tf = useTranslations("HR.form");

  const tx = (key: string, fallback: string) =>
    // @ts-ignore
    typeof t.has === "function" && t.has(key) ? t(key as any) : fallback;

  const txf = (key: string, fallback: string) =>
    // @ts-ignore
    typeof tf.has === "function" && tf.has(key) ? tf(key as any) : fallback;

  /**
   * ✅ Input theme:
   * - ép nền tối, chống bị autofill trắng
   * - đồng bộ cho username/password y như input-dark
   */
  const inputDark = cn(
    "w-full rounded-xl border border-white/10 bg-transparent text-white",
    "px-4 py-3 text-sm outline-none",
    "placeholder:text-white/35",
    "focus:border-white/20 focus:ring-1 focus:ring-white/10",
    "appearance-none"
  );

  const [v, setV] = useState<HrFormValue>(DEFAULT_VALUE);
  const [err, setErr] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (!open) return;
    setErr(null);

    const merged: HrFormValue = {
      ...DEFAULT_VALUE,
      ...(initial || {}),
      role: ((initial?.role as HrRole) || DEFAULT_VALUE.role) as HrRole,
      status: ((initial?.status as HrStatus) || DEFAULT_VALUE.status) as HrStatus,
      gender: ((initial?.gender as HrGender) || DEFAULT_VALUE.gender) as HrGender,
      permissions: (initial?.permissions || DEFAULT_VALUE.permissions) as string[],
      username: (initial?.username ?? DEFAULT_VALUE.username) as string,
      password: (initial?.password ?? DEFAULT_VALUE.password) as string,
    };

    // gợi ý username từ phone nếu trống
    if (!merged.username && merged.phone) merged.username = merged.phone;

    setV(merged);
  }, [open, initial]);

  /** ========= Translate helpers ========= */

  // ✅ dịch ROLE từ HR.roles.*
  const roleLabel = (r: HrRole) => tx(`roles.${r}`, r);

  // ✅ dịch group/page từ HR.permissions.*
  const groupLabel = (g?: string) => {
    if (!g) return txf("permGroupOther", "Khác");
    return tx(`permissions.groups.${g}`, g);
  };

  const pageLabel = (k: string, fallback?: string) =>
    tx(`permissions.pages.${k}`, fallback || k);

  /** ========= Options ========= */
  const roleOptions = useMemo(
    () =>
      ([
        "STUDENT",
        "INSTRUCTOR",
        "ADMISSIONS",
        "DISPATCH",
        "VEHICLE_MANAGER",
        "ACCOUNTANT",
        "ADMIN",
        "OWNER",
      ] as HrRole[]).map((r) => ({ value: r, label: roleLabel(r) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  const statusOptions = useMemo(
    () => [
      { value: "ACTIVE" as const, label: tx("status.ACTIVE", "Đang hoạt động") },
      { value: "PAUSED" as const, label: tx("status.PAUSED", "Tạm dừng") },
      { value: "DONE" as const, label: tx("status.DONE", "Ngừng") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  const genderOptions = useMemo(
    () => [
      { value: "MALE" as const, label: txf("genderMale", "Nam") },
      { value: "FEMALE" as const, label: txf("genderFemale", "Nữ") },
      { value: "OTHER" as const, label: txf("genderOther", "Khác") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tf]
  );

  /** ========= Permission helpers ========= */
  const selectedSet = useMemo(() => new Set(v.permissions), [v.permissions]);
  const allPermissionKeys = useMemo(() => permissionItems.map((x) => x.key), [permissionItems]);

  function togglePermission(key: string) {
    setV((prev) => {
      const has = prev.permissions.includes(key);
      const next = has ? prev.permissions.filter((x) => x !== key) : [...prev.permissions, key];
      return { ...prev, permissions: next };
    });
  }

  function selectAllPermissions() {
    setV((prev) => ({ ...prev, permissions: allPermissionKeys }));
  }

  function clearPermissions() {
    setV((prev) => ({ ...prev, permissions: [] }));
  }

  /** ========= Group permissions ========= */
  const permissionsByGroup = useMemo(() => {
    const m = new Map<string, Array<{ key: string; label: string }>>();
    for (const it of permissionItems) {
      const g = it.group || "other";
      if (!m.has(g)) m.set(g, []);
      m.get(g)!.push({
        key: it.key,
        // ✅ label dịch theo key (ưu tiên translation), fallback dùng label truyền vào
        label: pageLabel(it.key, it.label),
      });
    }
    return Array.from(m.entries());
  }, [permissionItems, t]);

  /** ========= Validate + submit ========= */
  function validate(): string | null {
    if (!v.fullName.trim()) return txf("errors.fullName", "Vui lòng nhập họ và tên.");
    if (!v.dob) return txf("errors.dob", "Vui lòng chọn ngày sinh.");
    if (!v.phone.trim()) return txf("errors.phone", "Vui lòng nhập số điện thoại.");
    if (!v.cccd.trim()) return txf("errors.cccd", "Vui lòng nhập CCCD.");
    if (!v.email.trim()) return txf("errors.email", "Vui lòng nhập Gmail.");
    if (!v.address.trim()) return txf("errors.address", "Vui lòng nhập địa chỉ.");
    if (!v.username.trim()) return txf("errors.username", "Vui lòng nhập tài khoản.");
    if (!v.password.trim()) return txf("errors.password", "Vui lòng nhập mật khẩu.");
    return null;
  }

  function submit() {
    const msg = validate();
    if (msg) return setErr(msg);

    onSave({
      ...v,
      fullName: v.fullName.trim(),
      phone: v.phone.trim(),
      cccd: v.cccd.trim(),
      email: v.email.trim(),
      address: v.address.trim(),
      username: v.username.trim(),
      password: v.password.trim(),
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-[1080px] -translate-x-1/2 -translate-y-1/2 panel p-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="text-lg font-semibold text-white/90">{title}</div>
          <button className="btn-ghost" type="button" onClick={onClose}>
            {txf("close", "Đóng")}
          </button>
        </div>

        {err && (
          <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {err}
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* LEFT */}
          <div className="panel p-4">
            <div className="text-sm font-semibold text-white/85">
              {txf("basicInfo", "Thông tin cơ bản")}
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label={txf("role", "Chức vụ (Role)")}>
                <SelectDark<HrRole>
                  value={v.role}
                  onChange={(role) => setV({ ...v, role })}
                  options={roleOptions}
                />
              </Field>

              <Field label={txf("status", "Trạng thái")}>
                <SelectDark<HrStatus>
                  value={v.status}
                  onChange={(status) => setV({ ...v, status })}
                  options={statusOptions}
                />
              </Field>

              <Field label={txf("fullName", "Họ và tên")}>
                <input
                  className={inputDark}
                  value={v.fullName}
                  onChange={(e) => setV({ ...v, fullName: e.target.value })}
                  placeholder={txf("fullNamePh", "Nguyễn Văn A")}
                />
              </Field>

              <Field label={txf("dob", "Ngày sinh")}>
                <input
                  type="date"
                  className={inputDark}
                  value={v.dob}
                  onChange={(e) => setV({ ...v, dob: e.target.value })}
                />
              </Field>

              <Field label={txf("gender", "Giới tính")}>
                <SelectDark<HrGender>
                  value={v.gender}
                  onChange={(gender) => setV({ ...v, gender })}
                  options={genderOptions}
                />
              </Field>

              <Field label={txf("phone", "Số điện thoại")}>
                <input
                  className={inputDark}
                  value={v.phone}
                  onChange={(e) => setV({ ...v, phone: e.target.value })}
                  placeholder={txf("phonePh", "0912345678")}
                />
              </Field>

              <Field label={txf("cccd", "CCCD")}>
                <input
                  className={inputDark}
                  value={v.cccd}
                  onChange={(e) => setV({ ...v, cccd: e.target.value })}
                  placeholder={txf("cccdPh", "079123456789")}
                />
              </Field>

              <Field label={txf("email", "Gmail")}>
                <input
                  className={inputDark}
                  value={v.email}
                  onChange={(e) => setV({ ...v, email: e.target.value })}
                  placeholder={txf("emailPh", "abc@gmail.com")}
                />
              </Field>

              <Field label={txf("address", "Địa chỉ")}>
                <input
                  className={inputDark}
                  value={v.address}
                  onChange={(e) => setV({ ...v, address: e.target.value })}
                  placeholder={txf("addressPh", "TP. Hồ Chí Minh")}
                />
              </Field>
            </div>

            {/* Account */}
            <div className="mt-5 text-sm font-semibold text-white/85">
              {txf("account", "Tài khoản")}
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label={txf("username", "Tài khoản")}>
                <input
                  className={inputDark}
                  value={v.username}
                  onChange={(e) => setV({ ...v, username: e.target.value })}
                  placeholder={txf("usernamePh", "0369xxxxxx")}
                  autoComplete="off"
                />
              </Field>

              <Field label={txf("password", "Mật khẩu")}>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    className={cn(inputDark, "pr-11")}
                    value={v.password}
                    onChange={(e) => setV({ ...v, password: e.target.value })}
                    placeholder={txf("passwordPh", "••••••••")}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn-ghost p-2"
                    onClick={() => setShowPw((x) => !x)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>
            </div>

            {/* ✅ chống autofill nền trắng (Chrome) */}
            <style jsx global>{`
              input:-webkit-autofill,
              input:-webkit-autofill:hover,
              input:-webkit-autofill:focus {
                -webkit-text-fill-color: #fff !important;
                transition: background-color 9999s ease-in-out 0s;
                box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.06) inset !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
              }
            `}</style>
          </div>

          {/* RIGHT: Permissions */}
          <div className="panel p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white/85">
                {txf("permissionsTitle", "Phân quyền trang")}
              </div>

              <div className="flex gap-2">
                <button type="button" className="btn-ghost" onClick={selectAllPermissions}>
                  {txf("selectAll", "Chọn tất cả")}
                </button>
                <button type="button" className="btn-ghost" onClick={clearPermissions}>
                  {txf("clear", "Bỏ chọn")}
                </button>
              </div>
            </div>

            <div className="mt-3 text-xs text-white/55">
              {txf(
                "permissionsHint",
                "Gợi ý: Bạn có thể chọn 1 hoặc nhiều trang mà tài khoản được phép truy cập."
              )}
            </div>

            <div className="mt-3 max-h-[430px] overflow-y-auto pr-1">
              {permissionsByGroup.map(([groupKey, list]) => (
                <div key={groupKey} className="mb-4">
                  <div className="text-xs uppercase tracking-wide text-white/40 mb-2">
                    {groupLabel(groupKey)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {list.map((it) => {
                      const active = selectedSet.has(it.key);
                      return (
                        <button
                          key={it.key}
                          type="button"
                          onClick={() => togglePermission(it.key)}
                          className={cn(
                            "flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition",
                            active
                              ? "border-pink-500/50 bg-pink-500/10 text-white"
                              : "border-white/10 bg-black/20 text-white/80 hover:bg-white/5"
                          )}
                        >
                          <span className="truncate">{it.label}</span>
                          <span
                            className={cn(
                              "h-4 w-4 rounded border",
                              active
                                ? "border-pink-500 bg-pink-500"
                                : "border-white/20 bg-transparent"
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-end gap-2">
          <button className="btn-ghost" type="button" onClick={onClose}>
            {txf("cancel", "Hủy")}
          </button>
          <button className="btn-pink" type="button" onClick={submit}>
            {txf("save", "Lưu")}
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
