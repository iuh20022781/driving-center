"use client";
import { useTranslations } from "next-intl";
import InstructorsManager from "@/components/admin/instructors/InstructorsManager";

export default function InstructorsPage() {
  const t = useTranslations("Instructors");

  return (
    <div>
      <InstructorsManager />
    </div>
  );
}
