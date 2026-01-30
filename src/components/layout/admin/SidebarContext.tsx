"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type SidebarCtx = {
  open: boolean;
  toggle: () => void;
  close: () => void;
  openSidebar: () => void;
};

const Ctx = createContext<SidebarCtx | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // desktop mở, mobile đóng
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setOpen(!isMobile);
  }, []);

  const value = useMemo(
    () => ({
      open,
      toggle: () => setOpen((v) => !v),
      close: () => setOpen(false),
      openSidebar: () => setOpen(true)
    }),
    [open]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSidebar() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
