"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Phone, Facebook, Youtube, Globe } from "lucide-react";

import AuthEntry from "@/components/auth/AuthEntry";

export default function TopBar() {
  const t = useTranslations("TopBar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (newLocale: string) => {
    const newPath = pathname.replace(/^\/(vi|en)/, "");
    router.push(`/${newLocale}${newPath || ""}`);
  };

  return (
    <div className="hidden lg:block bg-blue-700 text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6 min-w-0">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <Mail className="w-4 h-4" />
            {t("email")}
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <Phone className="w-4 h-4" />
            {t("hotline")}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <Link href="#" className="flex items-center gap-2 hover:text-yellow-300 transition">
            <Facebook className="w-5 h-5" />
            Facebook
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-yellow-300 transition">
            <Youtube className="w-5 h-5" />
            Youtube
          </Link>

          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
            <Globe className="w-4 h-4" />
            <button
              onClick={() => changeLanguage("vi")}
              className={`font-medium ${locale === "vi" ? "text-yellow-300" : "hover:text-yellow-300"}`}
            >
              VI
            </button>
            <span className="text-white/60">|</span>
            <button
              onClick={() => changeLanguage("en")}
              className={`font-medium ${locale === "en" ? "text-yellow-300" : "hover:text-yellow-300"}`}
            >
              EN
            </button>
          </div>

          <AuthEntry />
        </div>
      </div>
    </div>
  );
}
