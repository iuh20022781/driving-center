"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Menu } from "lucide-react";

import NavBar from "./nav-bar";
import SearchBox from "./SearchBox";
import MobileMenu from "./mobile-menu";

export default function MainHeader() {
  const [openMobile, setOpenMobile] = React.useState(false);

  return (
    <>
      <div className="flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/vi" className="flex items-center shrink-0">
          <Image
            src="/image/logotron.png"
            alt="Song Tien Driving School"
            width={180}
            height={48}
            priority
            className="h-12 w-auto object-contain hover:opacity-90 transition"
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center justify-end flex-1">
          <NavBar />
        </div>

        {/* Mobile: Search + Menu */}
        <div className="lg:hidden flex items-center gap-3">
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
