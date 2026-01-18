"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";

import AuthButton from "./AuthButton";
import LoginDialog from "./LoginDialog";
import UserMenu from "./UserMenu";

import { GetCurrentUserAction } from "@/actions/GetCurrentUserAction";
import type { User } from "@/types/response/user/user";

export default function AuthEntry() {
  const t = useTranslations("Auth");
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const reloadMe = async () => {
    setLoading(true);
    try {
      const res = await GetCurrentUserAction();
      setUser(res.status === 200 ? res.result : null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadMe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white opacity-70">
        <LogIn className="w-5 h-5" />
        {t("login")}
      </div>
    );
  }

  if (user) {
    return (
      <UserMenu
        user={user}
        onLoggedOut={async () => {
          setUser(null);
          router.refresh();
        }}
      />
    );
  }

  return (
    <>
      <AuthButton onClick={() => setOpen(true)}>
        <LogIn className="w-5 h-5" />
        {t("login")}
      </AuthButton>

      <LoginDialog
        open={open}
        onOpenChange={setOpen}
        onLoggedIn={async () => {
          await reloadMe();
          router.refresh();
        }}
      />
    </>
  );
}
