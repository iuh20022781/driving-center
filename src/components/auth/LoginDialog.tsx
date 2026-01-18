"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { LoginServerAction } from "@/actions/LoginAction";
import type { LoginRequest } from "@/types/request/auth/login_request";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onLoggedIn?: () => void | Promise<void>;
};

export default function LoginDialog({ open, onOpenChange, onLoggedIn }: Props) {
  const t = useTranslations("Auth");

  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = () => {
    setErr(null);

    startTransition(async () => {
      try {
        const payload: LoginRequest = { email, password } as any;
        const res = await LoginServerAction(payload);

        if (res?.status === 200) {
          onOpenChange(false);
          setEmail("");
          setPassword("");
          await onLoggedIn?.();
          return;
        }

        setErr(res?.message || t("loginFailed"));
      } catch (e: any) {
        setErr(e?.message || t("errorOccurred"));
      }
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">
              {t("loginTitle")}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded-lg p-2 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-sm text-gray-600">
                {t("email")}
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border px-4 py-2 outline-none focus:ring"
                placeholder={t("placeholderEmail")}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-600">
                {t("password")}
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-xl border px-4 py-2 outline-none focus:ring"
                placeholder={t("placeholderPassword")}
                autoComplete="current-password"
              />
            </div>

            {err ? (
              <div className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">
                {err}
              </div>
            ) : null}

            <button
              onClick={onSubmit}
              disabled={isPending || !email || !password}
              className="w-full rounded-xl bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {isPending ? t("loggingIn") : t("login")}
            </button>

            <div className="flex items-center justify-between text-sm">
              <a className="text-gray-600 hover:underline" >
                
              </a>
              <a
                className="text-gray-600 hover:underline"
                href="/account/forgot-password"
              >
                {t("forgotPassword")}
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
