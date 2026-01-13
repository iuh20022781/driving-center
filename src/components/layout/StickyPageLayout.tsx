"use client";

import React from "react";

type Props = {
  top: React.ReactNode;      // TopBar + Header
  footer?: React.ReactNode;  // Footer
  children: React.ReactNode; // Nội dung trang
};

export default function StickyPageLayout({ top, footer, children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Sticky wrapper: TopBar + Header dính khi cuộn */}
      <div className="sticky top-0 z-50 bg-white">
        {top}
      </div>

      {/* Content căn lề 2 bên cho đẹp */}
      <main className="min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {footer}
    </div>
  );
}
