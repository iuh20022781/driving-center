"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import SearchBox from "./SearchBox";
import AuthEntry from "@/components/auth/AuthEntry";


type DropdownBlock = {
  title?: string;
  [key: string]: any;
};

function withLocalePath(locale: string, href: string) {
  // Nếu href đã là absolute (http...) thì không đụng
  if (/^https?:\/\//.test(href)) return href;

  // normalize
  const safe = href.startsWith("/") ? href : `/${href}`;

  // Trang home
  if (safe === "/") return `/${locale}`;

  // Nếu đã có locale ở đầu rồi thì giữ nguyên
  if (safe.startsWith(`/${locale}/`) || safe === `/${locale}`) return safe;

  // Gắn locale
  return `/${locale}${safe}`;
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
        className="flex items-center gap-1 hover:text-blue-600 transition whitespace-nowrap"
      >
        {label}
        <ChevronDown className="w-5 h-5 transition group-hover:rotate-180" />
      </button>

      <div
        className={[
          "absolute left-0 top-full mt-2",
          widthClass,
          "bg-white shadow-xl rounded-lg py-4 px-6",
          "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
          "transition-all duration-200 z-50 border border-gray-200",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

function DropdownTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-bold text-lg mb-3 border-b pb-2">{children}</div>
  );
}

function DropdownList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-3 text-gray-800 whitespace-normal">{children}</ul>
  );
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
  return (
    <li>
      <Link
        href={withLocalePath(locale, href)}
        className="hover:text-blue-600 transition"
      >
        {children}
      </Link>
    </li>
  );
}

export default function NavBar() {
  const t = useTranslations("Header");
  const params = useParams();
  const locale = (params?.locale as string) || "vi";

  const courses = t.raw("dropdown.khoa-hoc") as DropdownBlock;
  const register = t.raw("dropdown.dang-ky-hoc") as DropdownBlock;
  const news = t.raw("dropdown.tin-tuc") as DropdownBlock;
  const students = t.raw("dropdown.hoc-vien") as DropdownBlock;
  const contact = t.raw("dropdown.lien-he") as DropdownBlock;

  return (
    <nav className="flex items-center gap-6 text-base font-medium whitespace-nowrap">
      {/* Giới thiệu */}
      <Link
        href={withLocalePath(locale, "/about")}
        className="hover:text-blue-600 transition whitespace-nowrap"
      >
        {t("menu.gioi-thieu")}
      </Link>

      {/* Khóa học */}
      <Dropdown label={t("menu.khoa-hoc")} widthClass="w-80">
        {courses.title ? <DropdownTitle>{courses.title}</DropdownTitle> : null}
        <DropdownList>
          <NavItem locale={locale} href="/courses/a1">
            {courses.a1}
          </NavItem>
          <NavItem locale={locale} href="/courses/a">
            {courses.a}
          </NavItem>
          <NavItem locale={locale} href="/courses/b1">
            {courses.b1}
          </NavItem>
          <NavItem locale={locale} href="/courses/b">
            {courses.b}
          </NavItem>
          <NavItem locale={locale} href="/courses/c1">
            {courses.c1}
          </NavItem>
          <NavItem locale={locale} href="/courses/c">
            {courses.c}
          </NavItem>
        </DropdownList>
      </Dropdown>

      {/* Đăng ký học */}
      <Dropdown label={t("menu.dang-ky-hoc")} widthClass="w-64">
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

      {/* Tin tức */}
      <Dropdown label={t("menu.tin-tuc")} widthClass="w-64">
        <DropdownList>
          <NavItem locale={locale} href="/news/thong-bao">
            {news["thong-bao"]}
          </NavItem>
          <NavItem locale={locale} href="/news/lich-thi">
            {news["lich-thi"]}
          </NavItem>
          <NavItem locale={locale} href="/news/so-bao-danh">
            {news["so-bao-danh"]}
          </NavItem>
        </DropdownList>
      </Dropdown>

      {/* Học viên */}
      <Dropdown label={t("menu.hoc-vien")} widthClass="w-64">
        <DropdownList>
          <NavItem locale={locale} href="/account/on-tap-o-to">
            {students["on-tap-o-to"]}
          </NavItem>
          <NavItem locale={locale} href="/account/on-tap-mo-to">
            {students["on-tap-mo-to"]}
          </NavItem>
          <NavItem locale={locale} href="/account/tai-lieu">
            {students["tai-lieu-phan-mem"]}
          </NavItem>
          <NavItem locale={locale} href="/account/dang-ky-cabin">
            {students["dang-ky-cabin"]}
          </NavItem>
          <NavItem locale={locale} href="/account/dang-ky-xe-cam-bien">
            {students["dang-ky-xe-cam-bien"]}
          </NavItem>
        </DropdownList>
      </Dropdown>

      {/* Liên hệ */}
      <Dropdown label={t("menu.lien-he")} widthClass="w-48">
        <DropdownList>
          <NavItem locale={locale} href="/contact">
            {contact["lien-he"]}
          </NavItem>
          <NavItem locale={locale} href="/tuyen-dung">
            {contact["tuyen-dung"]}
          </NavItem>
        </DropdownList>
      </Dropdown>

      {/* Search */}
      <SearchBox />

     

    </nav>
  );
}
