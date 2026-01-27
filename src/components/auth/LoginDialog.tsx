// "use client";

// import * as Dialog from "@radix-ui/react-dialog";
// import { useState, useTransition } from "react";
// import { X } from "lucide-react";
// import { useTranslations } from "next-intl";

// import { LoginServerAction } from "@/actions/LoginAction";
// import type { LoginRequest } from "@/types/request/auth/login_request";

// type Props = {
//   open: boolean;
//   onOpenChange: (v: boolean) => void;
//   onLoggedIn?: () => void | Promise<void>;
// };

// export default function LoginDialog({ open, onOpenChange, onLoggedIn }: Props) {
//   const t = useTranslations("Auth");

//   const [isPending, startTransition] = useTransition();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState<string | null>(null);

//   const onSubmit = () => {
//     setErr(null);

//     startTransition(async () => {
//       try {
//         const payload: LoginRequest = { email, password } as any;
//         const res = await LoginServerAction(payload);

//         if (res?.status === 200) {
//           onOpenChange(false);
//           setEmail("");
//           setPassword("");
//           await onLoggedIn?.();
//           return;
//         }

//         setErr(res?.message || t("loginFailed"));
//       } catch (e: any) {
//         setErr(e?.message || t("errorOccurred"));
//       }
//     });
//   };

//   return (
//     <Dialog.Root open={open} onOpenChange={onOpenChange}>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
//         <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
//           <div className="flex items-center justify-between">
//             <Dialog.Title className="text-lg font-semibold">
//               {t("loginTitle")}
//             </Dialog.Title>
//             <Dialog.Close asChild>
//               <button className="rounded-lg p-2 hover:bg-gray-100">
//                 <X className="h-5 w-5" />
//               </button>
//             </Dialog.Close>
//           </div>

//           <div className="mt-4 space-y-3">
//             <div>
//               <label className="mb-1 block text-sm text-gray-600">
//                 {t("email")}
//               </label>
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full rounded-xl border px-4 py-2 outline-none focus:ring"
//                 placeholder={t("placeholderEmail")}
//                 autoComplete="email"
//               />
//             </div>

//             <div>
//               <label className="mb-1 block text-sm text-gray-600">
//                 {t("password")}
//               </label>
//               <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="password"
//                 className="w-full rounded-xl border px-4 py-2 outline-none focus:ring"
//                 placeholder={t("placeholderPassword")}
//                 autoComplete="current-password"
//               />
//             </div>

//             {err ? (
//               <div className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">
//                 {err}
//               </div>
//             ) : null}

//             <button
//               onClick={onSubmit}
//               disabled={isPending || !email || !password}
//               className="w-full rounded-xl bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
//             >
//               {isPending ? t("loggingIn") : t("login")}
//             </button>

//             <div className="flex items-center justify-between text-sm">
//               <a className="text-gray-600 hover:underline" >
                
//               </a>
//               <a
//                 className="text-gray-600 hover:underline"
//                 href="/account/forgot-password"
//               >
//                 {t("forgotPassword")}
//               </a>
//             </div>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }


"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState, useTransition } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { LoginServerAction } from "@/actions/LoginAction";
import type { LoginRequest } from "@/types/request/auth/login_request";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onLoggedIn?: () => void | Promise<void>;
};

// ✅ Tài khoản demo (không cần DB)
const DEMO_ADMIN = {
  email: "admin@gmail.com", // bạn có thể đổi thành "admin"
  password: "123456",
};

export default function LoginDialog({ open, onOpenChange, onLoggedIn }: Props) {
  const t = useTranslations("Auth");

  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  // ✅ Reset khi mở lại dialog cho sạch
  useEffect(() => {
    if (!open) return;
    setErr(null);
  }, [open]);

  const handleDemoLogin = async () => {
    // ✅ Lưu trạng thái đăng nhập giả vào localStorage (demo UI)
    // Nếu bạn có API/session thật thì không cần đoạn này
    localStorage.setItem(
      "demo_user",
      JSON.stringify({
        id: 1,
        email: DEMO_ADMIN.email,
        fullName: "Admin",
        role: { id: 1, name: "admin" },
        isActive: 1,
      })
    );

    onOpenChange(false);
    setEmail("");
    setPassword("");
    await onLoggedIn?.();
  };

  const onSubmit = () => {
    setErr(null);

    startTransition(async () => {
      try {
        // ✅ 1) Ưu tiên login demo admin (không cần DB)
        const normalizedEmail = email.trim().toLowerCase();
        const isDemoAdmin =
          (normalizedEmail === "admin" ||
            normalizedEmail === DEMO_ADMIN.email.toLowerCase()) &&
          password === DEMO_ADMIN.password;

        if (isDemoAdmin) {
          await handleDemoLogin();
          return;
        }

        // ✅ 2) Nếu không phải demo admin -> gọi server action như bình thường
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

  // ✅ Nút "Điền nhanh admin"
  const fillAdmin = () => {
    setEmail(DEMO_ADMIN.email);
    setPassword(DEMO_ADMIN.password);
    setErr(null);
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
            {/* ✅ Hint demo admin */}
            <div className="rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-700">
              <div className="font-semibold">Demo admin</div>
              <div className="mt-1">
                Email: <b>{DEMO_ADMIN.email}</b> (hoặc <b>admin</b>)
              </div>
              <div>
                Mật khẩu: <b>{DEMO_ADMIN.password}</b>
              </div>
              <button
                type="button"
                onClick={fillAdmin}
                className="mt-2 inline-flex rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
              >
                Điền nhanh
              </button>
            </div>

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
              <span />
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
