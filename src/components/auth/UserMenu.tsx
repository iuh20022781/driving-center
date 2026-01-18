"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User2 } from "lucide-react";
import { useTranslations } from "next-intl";

import AuthButton from "./AuthButton";
import { LogoutServerAction } from "@/actions/LogoutAction";
import type { User } from "@/types/response/user/user";

type Props = {
  user: User;
  onLoggedOut?: () => void | Promise<void>;
};

export default function UserMenu({ user, onLoggedOut }: Props) {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const displayName =
    (user as any)?.fullName ||
    (user as any)?.name ||
    (user as any)?.email ||
    t("unknownUser");

  const onLogout = () => {
    startTransition(async () => {
      await LogoutServerAction();
      await onLoggedOut?.();
      router.refresh();
    });
  };

  return (
    <div className="relative group">
      <AuthButton>
        <User2 className="w-5 h-5" />
        <span className="max-w-[140px] truncate">{displayName}</span>
      </AuthButton>

      <div className="invisible absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border bg-white p-2 shadow-lg opacity-0 transition group-hover:visible group-hover:opacity-100">
        <a
          href="/account"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100 text-gray-800"
        >
          {t("account")}
        </a>
        <a
          href="/account/settings"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100 text-gray-800"
        >
          {t("settings")}
        </a>

        <div className="my-2 h-px bg-gray-100" />

        <button
          onClick={onLogout}
          disabled={isPending}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100 disabled:opacity-60 text-gray-800"
        >
          <LogOut className="h-4 w-4" />
          {isPending ? t("loggingOut") : t("logout")}
        </button>
      </div>
    </div>
  );
}
