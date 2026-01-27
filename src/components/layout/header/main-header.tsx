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
      <div className="w-full overflow-x-clip">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          {/* ✅ Brand nhỏ lại, Search rộng ra */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2
                          lg:grid-cols-[280px_minmax(0,1fr)_auto]">
            {/* Brand */}
            <Link href={`/${locale}`} className="flex min-w-0 items-center gap-2">
              <Image
                src="/image/logotron.png"
                alt="Song Tien Driving School"
                width={40}
                height={40}
                priority
                className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
              />

              <div className="min-w-0 leading-[1.05]">
                <div className="truncate text-[11px] font-bold text-blue-700 sm:text-[12px] uppercase">
                  {t("brand.line1")}
                </div>
                <div className="truncate text-[11px] font-bold text-blue-700 sm:text-[12px] uppercase">
                  {t("brand.line2")}
                </div>
                <div className="truncate text-[15px] font-extrabold text-orange-500 sm:text-[16px] uppercase">
                  {t("brand.line3")}
                </div>
              </div>
            </Link>

            {/* Desktop area */}
            <div className="hidden min-w-0 items-center gap-4 lg:flex">
              {/* ✅ Search rộng hơn */}
              <div className="min-w-0 flex-1">
                <div className="w-full max-w-[520px] xl:max-w-[620px]">
                  <SearchBox />
                </div>
              </div>

              {/* Nav */}
              <div className="min-w-0">
                <NavBar />
              </div>
            </div>

            {/* Mobile */}
            <div className="flex items-center justify-end gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setOpenMobile(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-white hover:bg-gray-50"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-blue-800" />
              </button>
            </div>
          </div>

          {/* ✅ Mobile search xuống dòng (đẹp + không tràn) */}
          <div className="pb-2 lg:hidden">
            <SearchBox />
          </div>
        </div>
      </div>

      <MobileMenu open={openMobile} onClose={() => setOpenMobile(false)} />
    </>
  );
}
