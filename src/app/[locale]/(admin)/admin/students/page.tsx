"use client";

import { useTranslations } from "next-intl";
import StudentsManager from "@/components/admin/students/StudentsManager";

export default function StudentsPage() {
  const t = useTranslations("Students");

  return (
    <div>
      <StudentsManager />
    </div>
  );
}
