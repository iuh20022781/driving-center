"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Menu } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import NavBar from "./nav-bar";
import SearchBox from "./SearchBox";
import MobileMenu from "./mobile-menu";

export default function MainHeader() {
  const [openMobile, setOpenMobile] = React.useState(false);

  const params = useParams();
  const locale = (params?.locale as string) || "vi";
  const t = useTranslations("Header");

  return (
    <>
      <div className="flex items-center justify-between py-3 gap-4">
        {/* ===== Brand (FIXED WIDTH – không đẩy menu) ===== */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 shrink-0 w-[260px] min-w-[260px]"
        >
          {/* Logo */}
          <Image
            src="/image/logotron.png"
            alt="Song Tien Driving School"
            width={52}
            height={52}
            priority
            className="h-12 w-12 object-contain"
          />

          {/* ===== Brand text (LỚN HƠN) ===== */}
          <div className="leading-tight overflow-hidden">
            <div className="text-[15px] md:text-[16px] font-bold text-blue-700 uppercase">
              {t("brand.line1")}
            </div>

            <div className="text-[15px] md:text-[16px] font-bold text-blue-700 uppercase">
              {t("brand.line2")}
            </div>

            <div className="text-[22px] md:text-[24px] font-extrabold text-orange-500 uppercase">
              {t("brand.line3")}
            </div>
          </div>

        </Link>

        {/* ===== Desktop: Menu + Search + Auth ===== */}
        <div className="hidden lg:flex items-center justify-end flex-1 gap-4 min-w-0">
          <NavBar />
        </div>

        {/* ===== Mobile ===== */}
        <div className="lg:hidden flex items-center gap-3 shrink-0">
          <SearchBox />
          <button
            type="button"
            onClick={() => setOpenMobile(true)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7 text-blue-800" />
          </button>
        </div>
      </div>

      <MobileMenu open={openMobile} onClose={() => setOpenMobile(false)} />
    </>
  );
}
