"use client";

import React from "react";
import { useTranslations } from "next-intl";

type UploadKey = "cccdFront" | "cccdBack" | "portrait";

type FormState = {
  fullName: string;
  gender: "Nam" | "Nữ" | "Khác";
  birthday: string;
  phone: string;
  email: string;
  address: string;
  identityCard: string;
  issuedDate: string;
  issuedPlace: string;

  courseType: string; // B, C1, C, A1...
  courseName: string; // B2 - K202 (2025)...
  expectedStart: string;
  note: string;

  // file objects
  cccdFront?: File | null;
  cccdBack?: File | null;
  portrait?: File | null;
};

function clsx(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function isValidEmail(email: string) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return `${Math.round(bytes / 1024)} KB`;
  return `${mb.toFixed(2)} MB`;
}

function UploadCard({
    label,
    hint,
    required,
    value,
    onChange,
    uploadAction,
    changeText,
    removeText,
  }: {
    label: string;
    hint: string;
    required?: boolean;
    value?: File | null;
    onChange: (file: File | null) => void;
  
    // ✅ text dịch truyền từ cha xuống
    uploadAction: { highlight: string; rest: string };
    changeText: string;
    removeText: string;
  }) {
    const inputId = React.useId();
    const [preview, setPreview] = React.useState<string>("");
  
    React.useEffect(() => {
      if (!value) {
        setPreview("");
        return;
      }
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }, [value]);
  
    return (
      <div className="rounded-xl border bg-white p-4 shadow-sm min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900">
              {label} {required ? <span className="text-red-500">*</span> : null}
            </div>
            <div className="mt-1 text-xs text-gray-500">{hint}</div>
          </div>
  
          {value ? (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="shrink-0 rounded-lg border px-3 py-1 text-xs font-medium hover:bg-gray-50"
            >
              {removeText}
            </button>
          ) : null}
        </div>
  
        <label
          htmlFor={inputId}
          className={clsx(
            "mt-3 block cursor-pointer rounded-lg border-2 border-dashed p-3 transition",
            preview ? "border-gray-200" : "border-gray-300 hover:border-blue-400"
          )}
        >
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
  
          {preview ? (
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg border bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt={label} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-gray-900">
                  {value?.name}
                </div>
                <div className="text-xs text-gray-500">
                  {value ? formatSize(value.size) : ""}
                </div>
                <div className="mt-1 text-xs text-blue-700 underline">
                  {changeText}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-700">
              <span className="font-semibold text-blue-700">
                {uploadAction.highlight}
              </span>{" "}
              {uploadAction.rest}
            </div>
          )}
        </label>
      </div>
    );
  }

export default function RegistrationNopHoSoPage() {
  const t = useTranslations("RegistrationNopHoSo");

  const [form, setForm] = React.useState<FormState>({
    fullName: "",
    gender: "Nam",
    birthday: "",
    phone: "",
    email: "",
    address: "",
    identityCard: "",
    issuedDate: "",
    issuedPlace: "",

    courseType: "B",
    courseName: "",
    expectedStart: "",
    note: "",

    cccdFront: null,
    cccdBack: null,
    portrait: null,
  });

  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [success, setSuccess] = React.useState<string>("");

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[String(key)];
      return next;
    });
    setSuccess("");
  };

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.fullName.trim()) e.fullName = t("errors.required");
    if (!form.phone.trim()) e.phone = t("errors.required");
    if (!form.address.trim()) e.address = t("errors.required");
    if (!form.identityCard.trim()) e.identityCard = t("errors.required");
    if (!form.courseName.trim()) e.courseName = t("errors.required");

    if (!isValidEmail(form.email)) e.email = t("errors.invalid_email");

    if (!form.cccdFront) e.cccdFront = t("errors.required_image");
    if (!form.cccdBack) e.cccdBack = t("errors.required_image");
    if (!form.portrait) e.portrait = t("errors.required_image");

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSuccess("");

    if (!validate()) return;

    setSubmitting(true);
    try {
      // ✅ Bạn thay phần này bằng API thật
      // Ví dụ gửi FormData:
      // const fd = new FormData();
      // Object.entries(form).forEach(([k,v]) => { if (v != null) fd.append(k, v as any); });
      // await fetch("/api/registration/nop-ho-so", { method:"POST", body: fd });

      await new Promise((r) => setTimeout(r, 600));
      setSuccess(t("success"));
      setSubmitting(false);
    } catch {
      setSubmitting(false);
      setErrors({ submit: t("errors.submit_failed") });
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-blue-700 sm:text-2xl">
              {t("title")}
            </h1>
            <p className="mt-1 text-sm text-gray-600">{t("subtitle")}</p>
          </div>

          <div className="text-xs text-gray-500">
            <span className="text-red-500">*</span> {t("required_note")}
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-6">
          {/* ===== Thông tin cá nhân ===== */}
          <section className="rounded-2xl border bg-gray-50 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                {t("personal.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                label={t("personal.fullName")}
                required
                error={errors.fullName}
              >
                <input
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  className={inputClass(!!errors.fullName)}
                  placeholder={t("personal.fullName_ph")}
                />
              </Field>

              <Field label={t("personal.gender")} required>
                <select
                  value={form.gender}
                  onChange={(e) => setField("gender", e.target.value as any)}
                  className={inputClass(false)}
                >
                  <option value="Nam">{t("gender.male")}</option>
                  <option value="Nữ">{t("gender.female")}</option>
                  <option value="Khác">{t("gender.other")}</option>
                </select>
              </Field>

              <Field label={t("personal.birthday")}>
                <input
                  type="date"
                  value={form.birthday}
                  onChange={(e) => setField("birthday", e.target.value)}
                  className={inputClass(false)}
                />
              </Field>

              <Field label={t("personal.phone")} required error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className={inputClass(!!errors.phone)}
                  placeholder="0xxxxxxxxx"
                />
              </Field>

              <Field label={t("personal.email")} error={errors.email}>
                <input
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={inputClass(!!errors.email)}
                  placeholder="example@gmail.com"
                />
              </Field>

              <Field label={t("personal.address")} required error={errors.address}>
                <input
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  className={inputClass(!!errors.address)}
                  placeholder={t("personal.address_ph")}
                />
              </Field>

              <Field
                label={t("personal.identityCard")}
                required
                error={errors.identityCard}
              >
                <input
                  value={form.identityCard}
                  onChange={(e) => setField("identityCard", e.target.value)}
                  className={inputClass(!!errors.identityCard)}
                  placeholder="0xxxxxxxxxxx"
                />
              </Field>

              <Field label={t("personal.issuedDate")}>
                <input
                  type="date"
                  value={form.issuedDate}
                  onChange={(e) => setField("issuedDate", e.target.value)}
                  className={inputClass(false)}
                />
              </Field>

              <Field label={t("personal.issuedPlace")}>
                <input
                  value={form.issuedPlace}
                  onChange={(e) => setField("issuedPlace", e.target.value)}
                  className={inputClass(false)}
                  placeholder={t("personal.issuedPlace_ph")}
                />
              </Field>
            </div>
          </section>

          {/* ===== Thông tin khóa học ===== */}
          <section className="rounded-2xl border bg-gray-50 p-4 sm:p-5">
            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
              {t("course.title")}
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label={t("course.type")} required>
                <select
                  value={form.courseType}
                  onChange={(e) => setField("courseType", e.target.value)}
                  className={inputClass(false)}
                >
                  <option value="A1">A1</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C">C</option>
                </select>
              </Field>

            

              <Field label={t("course.expectedStart")}>
                <input
                  type="date"
                  value={form.expectedStart}
                  onChange={(e) => setField("expectedStart", e.target.value)}
                  className={inputClass(false)}
                />
              </Field>

              <Field label={t("course.note")}>
                <input
                  value={form.note}
                  onChange={(e) => setField("note", e.target.value)}
                  className={inputClass(false)}
                  placeholder={t("course.note_ph")}
                />
              </Field>
            </div>
          </section>

          {/* ===== Upload ảnh ===== */}
          <section className="rounded-2xl border bg-gray-50 p-4 sm:p-5">
            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
              {t("upload.title")}
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="min-w-0">
              <UploadCard
                label={t("upload.cccdFront")}
                hint={t("upload.cccdHint")}
                required
                value={form.cccdFront}
                onChange={(f) => setField("cccdFront", f)}
                uploadAction={{
                    highlight: t("upload.uploadAction.highlight"),
                    rest: t("upload.uploadAction.rest"),
                }}
                changeText={t("upload.changeImage")}
                removeText={t("upload.remove")}
                />

                {errors.cccdFront ? (
                  <div className="mt-2 text-xs font-medium text-red-600">
                    {errors.cccdFront}
                  </div>
                ) : null}
              </div>

              <div className="min-w-0">
              <UploadCard
                label={t("upload.cccdFront")}
                hint={t("upload.cccdHint")}
                required
                value={form.cccdFront}
                onChange={(f) => setField("cccdFront", f)}
                uploadAction={{
                    highlight: t("upload.uploadAction.highlight"),
                    rest: t("upload.uploadAction.rest"),
                }}
                changeText={t("upload.changeImage")}
                removeText={t("upload.remove")}
                />

                {errors.cccdBack ? (
                  <div className="mt-2 text-xs font-medium text-red-600">
                    {errors.cccdBack}
                  </div>
                ) : null}
              </div>

              <div className="min-w-0">
              <UploadCard
                label={t("upload.cccdFront")}
                hint={t("upload.cccdHint")}
                required
                value={form.cccdFront}
                onChange={(f) => setField("cccdFront", f)}
                uploadAction={{
                    highlight: t("upload.uploadAction.highlight"),
                    rest: t("upload.uploadAction.rest"),
                }}
                changeText={t("upload.changeImage")}
                removeText={t("upload.remove")}
                />

                {errors.portrait ? (
                  <div className="mt-2 text-xs font-medium text-red-600">
                    {errors.portrait}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600">
              {errors.submit ? (
                <span className="font-semibold text-red-600">{errors.submit}</span>
              ) : success ? (
                <span className="font-semibold text-green-600">{success}</span>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={clsx(
                "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition",
                submitting ? "bg-blue-400" : "bg-blue-700 hover:bg-blue-800"
              )}
            >
              {submitting ? t("submit.loading") : t("submit.label")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ===== UI helpers ===== */

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center gap-2">
        <div className="text-sm font-semibold text-gray-900">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </div>
      </div>
      {children}
      {error ? <div className="mt-1 text-xs font-medium text-red-600">{error}</div> : null}
    </div>
  );
}

function inputClass(isError: boolean) {
  return clsx(
    "w-full min-w-0 rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition",
    "placeholder:text-gray-400",
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    isError ? "border-red-400 focus:ring-red-200 focus:border-red-400" : "border-gray-200"
  );
}
