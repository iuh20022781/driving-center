"use client";

import Link from "next/link";
import React from "react";
import { X, ChevronDown, Mail, Phone, Facebook, Youtube, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";

import AuthEntry from "@/components/auth/AuthEntry";

type DropdownBlock = { title?: string; [key: string]: any };

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
        className="flex w-full items-center justify-between py-3 text-left font-medium"
      >
        <span className="min-w-0 truncate">{title}</span>
        <ChevronDown className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-3 pl-3 text-gray-700">{children}</div>}
    </div>
  );
}

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
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
      {/* overlay */}
      <button
        aria-label="Close menu overlay"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        type="button"
      />

      {/* panel */}
      <div className="absolute right-0 top-0 h-[100dvh] w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto overscroll-contain">
        {/* Header */}
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

        {/* ✅ TopBar content on mobile */}
        

        {/* Menu items */}
        <div className="px-4 py-2">
          <Link
            href={`/${locale}`}
            onClick={onClose}
            className="block py-3 font-medium border-b border-gray-200"
          >
            {t("menu.gioi-thieu")}
          </Link>

          <MobileSection
            title={t("menu.khoa-hoc")}
            open={openKey === "courses"}
            onToggle={() => setOpenKey(openKey === "courses" ? null : "courses")}
          >
            <ul className="space-y-2">
              <li><Link onClick={onClose} href={`/${locale}/khoa-hoc/a1`} className="block py-1">{courses.a1}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/khoa-hoc/a`} className="block py-1">{courses.a}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/khoa-hoc/b1`} className="block py-1">{courses.b1}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/khoa-hoc/b`} className="block py-1">{courses.b}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/khoa-hoc/c1`} className="block py-1">{courses.c1}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/khoa-hoc/c`} className="block py-1">{courses.c}</Link></li>
            </ul>
          </MobileSection>

          <MobileSection
            title={t("menu.dang-ky-hoc")}
            open={openKey === "register"}
            onToggle={() => setOpenKey(openKey === "register" ? null : "register")}
          >
            <ul className="space-y-2">
              <li><Link onClick={onClose} href={`/${locale}/dang-ky/nop-ho-so`} className="block py-1">{register["nop-ho-so-truc-tuyen"]}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/dang-ky/hoi-dap`} className="block py-1">{register["hoi-dap"]}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/dang-ky/tra-cuu`} className="block py-1">{register["tra-cuu-thong-tin-hoc-vien"]}</Link></li>
            </ul>
          </MobileSection>

          <MobileSection
            title={t("menu.tin-tuc")}
            open={openKey === "news"}
            onToggle={() => setOpenKey(openKey === "news" ? null : "news")}
          >
            <ul className="space-y-2">
              <li><Link onClick={onClose} href={`/${locale}/tin-tuc/thong-bao`} className="block py-1">{news["thong-bao"]}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/tin-tuc/lich-thi`} className="block py-1">{news["lich-thi"]}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/tin-tuc/so-bao-danh`} className="block py-1">{news["so-bao-danh"]}</Link></li>
            </ul>
          </MobileSection>

          <MobileSection
            title={t("menu.hoc-vien")}
            open={openKey === "students"}
            onToggle={() => setOpenKey(openKey === "students" ? null : "students")}
          >
            <ul className="space-y-2">
              <li><Link onClick={onClose} href={`/${locale}/hoc-vien/on-tap-o-to`} className="block py-1">{students["on-tap-o-to"]}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/hoc-vien/on-tap-mo-to`} className="block py-1">{students["on-tap-mo-to"]}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/hoc-vien/tai-lieu`} className="block py-1">{students["tai-lieu-phan-mem"]}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/hoc-vien/dang-ky-cabin`} className="block py-1">{students["dang-ky-cabin"]}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/hoc-vien/dang-ky-xe-cam-bien`} className="block py-1">{students["dang-ky-xe-cam-bien"]}</Link></li>
            </ul>
          </MobileSection>

          <MobileSection
            title={t("menu.lien-he")}
            open={openKey === "contact"}
            onToggle={() => setOpenKey(openKey === "contact" ? null : "contact")}
          >
            <ul className="space-y-2">
              <li><Link onClick={onClose} href={`/${locale}/lien-he`} className="block py-1">{contact["lien-he"]}</Link></li>
              <li><Link onClick={onClose} href={`/${locale}/tuyen-dung`} className="block py-1">{contact["tuyen-dung"]}</Link></li>
            </ul>
          </MobileSection>
          <div className="px-4 py-4 border-b bg-blue-800 text-white">
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
          </div>

          <div className="mt-2 ">
            <div className="w-full justify-center">
              <AuthEntry />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
