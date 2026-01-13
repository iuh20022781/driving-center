"use client";

import Link from "next/link";
import { LogIn, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import SearchBox from "./SearchBox";

type DropdownBlock = {
  title?: string;
  [key: string]: any;
};

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
      <button className="flex items-center gap-1 hover:text-blue-600 transition whitespace-nowrap">
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

export default function NavBar() {
  const t = useTranslations("Header");

  const courses = t.raw("dropdown.khoa-hoc") as DropdownBlock;
  const register = t.raw("dropdown.dang-ky-hoc") as DropdownBlock;
  const news = t.raw("dropdown.tin-tuc") as DropdownBlock;
  const students = t.raw("dropdown.hoc-vien") as DropdownBlock;
  const contact = t.raw("dropdown.lien-he") as DropdownBlock;

  return (
    <nav className="flex items-center gap-6 text-base font-medium whitespace-nowrap">
      <Link href="/" className="hover:text-blue-600 transition whitespace-nowrap">
        {t("menu.gioi-thieu")}
      </Link>

      <Dropdown label={t("menu.khoa-hoc")} widthClass="w-80">
        <div className="font-bold text-lg mb-3 border-b pb-2">{courses.title}</div>
        <ul className="space-y-3 text-gray-800 whitespace-normal">
          <li><Link href="/khoa-hoc/a1" className="hover:text-blue-600 transition">{courses.a1}</Link></li>
          <li><Link href="/khoa-hoc/a" className="hover:text-blue-600 transition">{courses.a}</Link></li>
          <li><Link href="/khoa-hoc/b1" className="hover:text-blue-600 transition">{courses.b1}</Link></li>
          <li><Link href="/khoa-hoc/b" className="hover:text-blue-600 transition">{courses.b}</Link></li>
          <li><Link href="/khoa-hoc/c1" className="hover:text-blue-600 transition">{courses.c1}</Link></li>
          <li><Link href="/khoa-hoc/c" className="hover:text-blue-600 transition">{courses.c}</Link></li>
        </ul>
      </Dropdown>

      <Dropdown label={t("menu.dang-ky-hoc")} widthClass="w-64">
        <ul className="space-y-3 text-gray-800 whitespace-normal">
          <li><Link href="/dang-ky/nop-ho-so" className="hover:text-blue-600 transition">{register["nop-ho-so-truc-tuyen"]}</Link></li>
          <li><Link href="/dang-ky/hoi-dap" className="hover:text-blue-600 transition">{register["hoi-dap"]}</Link></li>
          <li><Link href="/dang-ky/tra-cuu" className="hover:text-blue-600 transition">{register["tra-cuu-thong-tin-hoc-vien"]}</Link></li>
        </ul>
      </Dropdown>

      <Dropdown label={t("menu.tin-tuc")} widthClass="w-64">
        <ul className="space-y-3 text-gray-800 whitespace-normal">
          <li><Link href="/tin-tuc/thong-bao" className="hover:text-blue-600 transition">{news["thong-bao"]}</Link></li>
          <li><Link href="/tin-tuc/lich-thi" className="hover:text-blue-600 transition">{news["lich-thi"]}</Link></li>
          <li><Link href="/tin-tuc/so-bao-danh" className="hover:text-blue-600 transition">{news["so-bao-danh"]}</Link></li>
        </ul>
      </Dropdown>

      <Dropdown label={t("menu.hoc-vien")} widthClass="w-64">
        <ul className="space-y-3 text-gray-800 whitespace-normal">
          <li><Link href="/hoc-vien/on-tap-o-to" className="hover:text-blue-600 transition">{students["on-tap-o-to"]}</Link></li>
          <li><Link href="/hoc-vien/on-tap-mo-to" className="hover:text-blue-600 transition">{students["on-tap-mo-to"]}</Link></li>
          <li><Link href="/hoc-vien/tai-lieu" className="hover:text-blue-600 transition">{students["tai-lieu-phan-mem"]}</Link></li>
          <li><Link href="/hoc-vien/dang-ky-cabin" className="hover:text-blue-600 transition">{students["dang-ky-cabin"]}</Link></li>
          <li><Link href="/hoc-vien/dang-ky-xe-cam-bien" className="hover:text-blue-600 transition">{students["dang-ky-xe-cam-bien"]}</Link></li>
        </ul>
      </Dropdown>

      <Dropdown label={t("menu.lien-he")} widthClass="w-48">
        <ul className="space-y-3 text-gray-800 whitespace-normal">
          <li><Link href="/lien-he" className="hover:text-blue-600 transition">{contact["lien-he"]}</Link></li>
          <li><Link href="/tuyen-dung" className="hover:text-blue-600 transition">{contact["tuyen-dung"]}</Link></li>
        </ul>
      </Dropdown>

      <SearchBox />

      <Link
        href="/dang-nhap"
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition whitespace-nowrap shrink-0"
      >
        <LogIn className="w-5 h-5" />
        {t("menu.dang-nhap")}
      </Link>
    </nav>
  );
}
