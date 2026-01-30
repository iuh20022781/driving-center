"use client";

import Sidebar from "./Sidebar";
import TopbarAdmin from "./TopBarAdmin"; 
import { SidebarProvider } from "./SidebarContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen app-bg">
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <TopbarAdmin />
            <main className="px-5 py-5">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
