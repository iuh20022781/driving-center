import AdminLayout from "@/components/layout/admin/AdminLayout";

export default function LayoutAdmin({children}: {children: React.ReactNode}) {
  return <AdminLayout>{children}</AdminLayout>;
}
