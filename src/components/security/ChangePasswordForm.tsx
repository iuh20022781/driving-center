"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

type FormState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function validate(state: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!state.currentPassword) errors.currentPassword = "required";
  if (!state.newPassword) errors.newPassword = "required";
  if (state.newPassword && state.newPassword.length < 8) errors.newPassword = "min8";
  if (!state.confirmPassword) errors.confirmPassword = "required";
  if (state.newPassword && state.confirmPassword && state.newPassword !== state.confirmPassword)
    errors.confirmPassword = "notMatch";
  return errors;
}

export default function ChangePasswordForm() {
  const t = useTranslations("ChangePassword");

  const [state, setState] = useState<FormState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const canSubmit = useMemo(() => {
    const e = validate(state);
    return Object.keys(e).length === 0;
  }, [state]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);

    const eMap = validate(state);
    setErrors(eMap);
    if (Object.keys(eMap).length > 0) return;

    try {
      setSubmitting(true);

      // TODO: call API đổi mật khẩu tại đây
      // await authApiService.changePassword({ ... })

      await new Promise((r) => setTimeout(r, 500)); // mock delay

      setSuccess(t("success"));
      setState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } finally {
      setSubmitting(false);
    }
  }

  const fieldErrorText = (key: keyof FormState) => {
    const code = errors[key];
    if (!code) return "";
    if (code === "required") return t("error.required");
    if (code === "min8") return t("error.min8");
    if (code === "notMatch") return t("error.notMatch");
    return t("error.invalid");
  };

  return (
    <div className="panel p-5 md:p-6 max-w-[680px]">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
          <ShieldCheck className="h-5 w-5 text-pink-400" />
        </div>
        <div className="min-w-0">
          <div className="text-base font-semibold text-white/90">{t("subtitle")}</div>
          <div className="text-sm text-white/60 mt-1">{t("hint")}</div>
        </div>
      </div>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        {/* Current password */}
        <div>
          <label className="text-xs text-white/60">{t("current")}</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
            <input
              type={show.current ? "text" : "password"}
              value={state.currentPassword}
              onChange={(e) => setState((p) => ({ ...p, currentPassword: e.target.value }))}
              className="w-full bg-transparent text-sm text-white/90 outline-none placeholder:text-white/30"
              placeholder={t("placeholder.current")}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="btn-ghost p-2"
              onClick={() => setShow((s) => ({ ...s, current: !s.current }))}
              aria-label="toggle current password"
            >
              {show.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.currentPassword && (
            <div className="mt-2 text-xs text-pink-300">{fieldErrorText("currentPassword")}</div>
          )}
        </div>

        {/* New password */}
        <div>
          <label className="text-xs text-white/60">{t("new")}</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
            <input
              type={show.next ? "text" : "password"}
              value={state.newPassword}
              onChange={(e) => setState((p) => ({ ...p, newPassword: e.target.value }))}
              className="w-full bg-transparent text-sm text-white/90 outline-none placeholder:text-white/30"
              placeholder={t("placeholder.new")}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="btn-ghost p-2"
              onClick={() => setShow((s) => ({ ...s, next: !s.next }))}
              aria-label="toggle new password"
            >
              {show.next ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.newPassword && (
            <div className="mt-2 text-xs text-pink-300">{fieldErrorText("newPassword")}</div>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label className="text-xs text-white/60">{t("confirm")}</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
            <input
              type={show.confirm ? "text" : "password"}
              value={state.confirmPassword}
              onChange={(e) => setState((p) => ({ ...p, confirmPassword: e.target.value }))}
              className="w-full bg-transparent text-sm text-white/90 outline-none placeholder:text-white/30"
              placeholder={t("placeholder.confirm")}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="btn-ghost p-2"
              onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
              aria-label="toggle confirm password"
            >
              {show.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="mt-2 text-xs text-pink-300">{fieldErrorText("confirmPassword")}</div>
          )}
        </div>

        {success && (
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
            {success}
          </div>
        )}

        <div className="pt-2 flex items-center gap-2">
          <button
            type="submit"
            className={`btn-pink ${!canSubmit || submitting ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={!canSubmit || submitting}
          >
            {submitting ? t("saving") : t("save")}
          </button>

          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setErrors({});
              setSuccess(null);
              setState({ currentPassword: "", newPassword: "", confirmPassword: "" });
            }}
          >
            {t("reset")}
          </button>
        </div>
      </form>
    </div>
  );
}
