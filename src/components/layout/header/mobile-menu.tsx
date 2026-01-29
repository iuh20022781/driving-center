"use client";

import Link from "next/link";
import React from "react";
import { X, ChevronDown, Mail, Phone, Facebook, Youtube, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";

import AuthEntry from "@/components/auth/AuthEntry";

type DropdownBlock = { title?: string; [key: string]: any };

function clsx(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function MobileSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        className={clsx(
          "flex w-full items-center justify-between py-3 text-left font-semibold",
          "rounded-xl px-2 transition",
          "hover:bg-gray-50"
        )}
      >
        <span className="min-w-0 truncate">{title}</span>
        <ChevronDown className={clsx("h-5 w-5 transition", open && "rotate-180")} />
      </button>

      {open ? <div className="pb-3 pl-2 pr-2">{children}</div> : null}
    </div>
  );
}

function MobileItem({
  href,
  locale,
  onClose,
  children,
}: {
  href: string;
  locale: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const to = `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
  const isActive = pathname === to || pathname?.startsWith(`${to}/`);

  return (
    <Link
      onClick={onClose}
      href={to}
      className={clsx(
        "block rounded-xl px-3 py-2 text-sm transition",
        "border border-transparent",
        "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-100",
        isActive && "bg-blue-100 text-blue-800 border-blue-200 font-semibold"
      )}
    >
      {children}
    </Link>
  );
}

export default function MobileMenu({
  open,
  onClose,
  isLoggedIn,
}: {
  open: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
}) {
  const t = useTranslations("Header");
  const tTop = useTranslations("TopBar");

  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const locale = (params?.locale as string) || "vi";

  const courses = t.raw("dropdown.khoa-hoc") as DropdownBlock;
  const register = t.raw("dropdown.dang-ky-hoc") as DropdownBlock;
  const news = t.raw("dropdown.tin-tuc") as DropdownBlock;
  const students = t.raw("dropdown.hoc-vien") as DropdownBlock;
  const contact = t.raw("dropdown.lien-he") as DropdownBlock;

  const [openKey, setOpenKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) setOpenKey(null);
  }, [open]);

  const changeLanguage = (newLocale: string) => {
    const newPath = pathname.replace(/^\/(vi|en)/, "");
    onClose();
    router.push(`/${newLocale}${newPath || ""}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button
        aria-label="Close menu overlay"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        type="button"
      />

      <div className="absolute right-0 top-0 h-[100dvh] w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto overscroll-contain">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-semibold text-lg">Menu</div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-4 py-2">
          <MobileItem href="/about" locale={locale} onClose={onClose}>
            {t("menu.gioi-thieu")}
          </MobileItem>

          {/* ✅ CHỈ THÊM ITEM NÀY */}
          {isLoggedIn ? (
            <MobileItem href="/account/profile" locale={locale} onClose={onClose}>
              {t("menu.trang-cua-toi") ?? "Trang của tôi"}
            </MobileItem>
          ) : null}

          {/* ... phần còn lại giữ nguyên y như bạn */}
          {/* Courses */}
          <MobileSection
            title={t("menu.khoa-hoc")}
            open={openKey === "courses"}
            onToggle={() => setOpenKey(openKey === "courses" ? null : "courses")}
          >
            <div className="grid gap-2">
              <MobileItem href="/courses/a1" locale={locale} onClose={onClose}>{courses.a1}</MobileItem>
              <MobileItem href="/courses/a" locale={locale} onClose={onClose}>{courses.a}</MobileItem>
              <MobileItem href="/courses/b1" locale={locale} onClose={onClose}>{courses.b1}</MobileItem>
              <MobileItem href="/courses/b" locale={locale} onClose={onClose}>{courses.b}</MobileItem>
              <MobileItem href="/courses/c1" locale={locale} onClose={onClose}>{courses.c1}</MobileItem>
              <MobileItem href="/courses/c" locale={locale} onClose={onClose}>{courses.c}</MobileItem>
            </div>
          </MobileSection>

          {/* Register */}
          <MobileSection
            title={t("menu.dang-ky-hoc")}
            open={openKey === "register"}
            onToggle={() => setOpenKey(openKey === "register" ? null : "register")}
          >
            <div className="grid gap-2">
              <MobileItem href="/registration/nop-ho-so" locale={locale} onClose={onClose}>
                {register["nop-ho-so-truc-tuyen"]}
              </MobileItem>
              <MobileItem href="/registration/hoi-dap" locale={locale} onClose={onClose}>
                {register["hoi-dap"]}
              </MobileItem>
              <MobileItem href="/registration/tra-cuu" locale={locale} onClose={onClose}>
                {register["tra-cuu-thong-tin-hoc-vien"]}
              </MobileItem>
            </div>
          </MobileSection>

          {/* News */}
          <MobileSection
            title={t("menu.tin-tuc")}
            open={openKey === "news"}
            onToggle={() => setOpenKey(openKey === "news" ? null : "news")}
          >
            <div className="grid gap-2">
              <MobileItem href="/news/thong-bao" locale={locale} onClose={onClose}>{news["thong-bao"]}</MobileItem>
              <MobileItem href="/news/lich-thi" locale={locale} onClose={onClose}>{news["lich-thi"]}</MobileItem>
              <MobileItem href="/news/so-bao-danh" locale={locale} onClose={onClose}>{news["so-bao-danh"]}</MobileItem>
            </div>
          </MobileSection>

          {/* Students */}
          <MobileSection
            title={t("menu.hoc-vien")}
            open={openKey === "students"}
            onToggle={() => setOpenKey(openKey === "students" ? null : "students")}
          >
            <div className="grid gap-2">
              <MobileItem href="/account/on-tap-o-to" locale={locale} onClose={onClose}>{students["on-tap-o-to"]}</MobileItem>
              <MobileItem href="/account/on-tap-mo-to" locale={locale} onClose={onClose}>{students["on-tap-mo-to"]}</MobileItem>
              <MobileItem href="/account/tai-lieu" locale={locale} onClose={onClose}>{students["tai-lieu-phan-mem"]}</MobileItem>
              <MobileItem href="/account/dang-ky-cabin" locale={locale} onClose={onClose}>{students["dang-ky-cabin"]}</MobileItem>
              <MobileItem href="/account/dang-ky-xe-cam-bien" locale={locale} onClose={onClose}>{students["dang-ky-xe-cam-bien"]}</MobileItem>
            </div>
          </MobileSection>

          {/* Contact */}
          <MobileSection
            title={t("menu.lien-he")}
            open={openKey === "contact"}
            onToggle={() => setOpenKey(openKey === "contact" ? null : "contact")}
          >
            <div className="grid gap-2">
              <MobileItem href="/contact" locale={locale} onClose={onClose}>{contact["lien-he"]}</MobileItem>
              <MobileItem href="/tuyen-dung" locale={locale} onClose={onClose}>{contact["tuyen-dung"]}</MobileItem>
            </div>
          </MobileSection>

          {/* Footer card giữ nguyên */}
          <div className="mt-4 rounded-2xl border bg-blue-800 text-white p-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="break-words">{tTop("email")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{tTop("hotline")}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <Link href="#" className="inline-flex items-center gap-1 hover:text-yellow-300">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="inline-flex items-center gap-1 hover:text-yellow-300">
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>

              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <Globe className="h-4 w-4" />
                <button
                  onClick={() => changeLanguage("vi")}
                  className={clsx("font-medium", locale === "vi" ? "text-yellow-300" : "hover:text-yellow-300")}
                >
                  VI
                </button>
                <span className="text-white/60">|</span>
                <button
                  onClick={() => changeLanguage("en")}
                  className={clsx("font-medium", locale === "en" ? "text-yellow-300" : "hover:text-yellow-300")}
                >
                  EN
                </button>
              </div>
            </div>

            <div className="mt-3 flex justify-center">
              <AuthEntry />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
