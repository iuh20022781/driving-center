"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

type DropdownBlock = { title?: string; [key: string]: any };

function withLocalePath(locale: string, href: string) {
  if (/^https?:\/\//.test(href)) return href;
  const safe = href.startsWith("/") ? href : `/${href}`;
  if (safe === "/") return `/${locale}`;
  if (safe.startsWith(`/${locale}/`) || safe === `/${locale}`) return safe;
  return `/${locale}${safe}`;
}

function clsx(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function Dropdown({
  label,
  widthClass,
  children,
}: {
  label: string;
  widthClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <button
        type="button"
        className="
          inline-flex items-center gap-1 whitespace-nowrap
          rounded-xl px-3 py-2
          transition
          hover:bg-blue-50 hover:text-blue-700
          focus:outline-none
        "
      >
        {label}
        <ChevronDown className="h-5 w-5 transition group-hover:rotate-180" />
      </button>

      <div
        className={clsx(
          "absolute left-0 top-full mt-2",
          widthClass,
          "rounded-2xl border border-gray-200 bg-white p-2 shadow-xl",
          "origin-top opacity-0 invisible translate-y-1",
          "group-hover:opacity-100 group-hover:visible group-hover:translate-y-0",
          "transition-all duration-200 z-50"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function DropdownList({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-1">{children}</ul>;
}

function NavItem({
  href,
  locale,
  children,
}: {
  href: string;
  locale: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const to = withLocalePath(locale, href);
  const isActive = pathname === to || pathname?.startsWith(`${to}/`);

  return (
    <li>
      <Link
        href={to}
        className={clsx(
          "block rounded-xl px-3 py-2 text-sm transition",
          "hover:bg-blue-50 hover:text-blue-700",
          "focus:outline-none focus:ring-2 focus:ring-blue-300",
          isActive && "bg-blue-100 text-blue-800 font-semibold"
        )}
      >
        {children}
      </Link>
    </li>
  );
}

export default function NavBar({ isLoggedIn }: { isLoggedIn?: boolean }) {
  const t = useTranslations("Header");
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || "vi";

  const courses = t.raw("dropdown.khoa-hoc") as DropdownBlock;
  const register = t.raw("dropdown.dang-ky-hoc") as DropdownBlock;
  const news = t.raw("dropdown.tin-tuc") as DropdownBlock;
  const students = t.raw("dropdown.hoc-vien") as DropdownBlock;
  const contact = t.raw("dropdown.lien-he") as DropdownBlock;

  const aboutPath = withLocalePath(locale, "/about");
  const aboutActive = pathname === aboutPath || pathname?.startsWith(`${aboutPath}/`);

  // ✅ Trang của tôi
  const myPagePath = withLocalePath(locale, "/account/profile");
  const myPageActive = pathname === myPagePath || pathname?.startsWith(`${myPagePath}/`);

  return (
    <nav className="flex min-w-0 flex-wrap items-center justify-end gap-x-2 gap-y-2 text-base font-medium">
      <Link
        href={aboutPath}
        className={clsx(
          "rounded-xl px-3 py-2 transition whitespace-nowrap",
          "hover:bg-blue-50 hover:text-blue-700",
          aboutActive && "bg-blue-100 text-blue-800 font-semibold"
        )}
      >
        {t("menu.gioi-thieu")}
      </Link>

      {/* ✅ CHỈ THÊM NÚT NÀY */}
      {isLoggedIn ? (
        <Link
          href={myPagePath}
          className={clsx(
            "rounded-xl px-3 py-2 transition whitespace-nowrap",
            "bg-blue-600 text-white hover:bg-blue-700",
            "focus:outline-none focus:ring-2 focus:ring-blue-300",
            myPageActive && "bg-blue-700"
          )}
        >
          {t("menu.trang-cua-toi") ?? "Trang của tôi"}
        </Link>
      ) : null}

      <Dropdown label={t("menu.khoa-hoc")} widthClass="w-80">
        <DropdownList>
          <NavItem locale={locale} href="/courses/a1">{courses.a1}</NavItem>
          <NavItem locale={locale} href="/courses/a">{courses.a}</NavItem>
          <NavItem locale={locale} href="/courses/b1">{courses.b1}</NavItem>
          <NavItem locale={locale} href="/courses/b">{courses.b}</NavItem>
          <NavItem locale={locale} href="/courses/c1">{courses.c1}</NavItem>
          <NavItem locale={locale} href="/courses/c">{courses.c}</NavItem>
        </DropdownList>
      </Dropdown>

      <Dropdown label={t("menu.dang-ky-hoc")} widthClass="w-72">
        <DropdownList>
          <NavItem locale={locale} href="/registration/nop-ho-so">
            {register["nop-ho-so-truc-tuyen"]}
          </NavItem>
          <NavItem locale={locale} href="/registration/hoi-dap">
            {register["hoi-dap"]}
          </NavItem>
          <NavItem locale={locale} href="/registration/tra-cuu">
            {register["tra-cuu-thong-tin-hoc-vien"]}
          </NavItem>
        </DropdownList>
      </Dropdown>

      <Dropdown label={t("menu.tin-tuc")} widthClass="w-72">
        <DropdownList>
          <NavItem locale={locale} href="/news/thong-bao">{news["thong-bao"]}</NavItem>
          <NavItem locale={locale} href="/news/lich-thi">{news["lich-thi"]}</NavItem>
          <NavItem locale={locale} href="/news/so-bao-danh">{news["so-bao-danh"]}</NavItem>
        </DropdownList>
      </Dropdown>

      <Dropdown label={t("menu.hoc-vien")} widthClass="w-80">
        <DropdownList>
          <NavItem locale={locale} href="/account/on-tap-o-to">{students["on-tap-o-to"]}</NavItem>
          <NavItem locale={locale} href="/account/on-tap-mo-to">{students["on-tap-mo-to"]}</NavItem>
          <NavItem locale={locale} href="/account/tai-lieu">{students["tai-lieu-phan-mem"]}</NavItem>
          <NavItem locale={locale} href="/account/dang-ky-cabin">{students["dang-ky-cabin"]}</NavItem>
          <NavItem locale={locale} href="/account/dang-ky-xe-cam-bien">{students["dang-ky-xe-cam-bien"]}</NavItem>
        </DropdownList>
      </Dropdown>

      <Dropdown label={t("menu.lien-he")} widthClass="w-64">
        <DropdownList>
          <NavItem locale={locale} href="/contact">{contact["lien-he"]}</NavItem>
          <NavItem locale={locale} href="/tuyen-dung">{contact["tuyen-dung"]}</NavItem>
        </DropdownList>
      </Dropdown>
    </nav>
  );
}
