"use client";
import { useTranslations } from "next-intl";
import HrManager from "@/components/admin/hr/HrManager";

export default function HrPage() {
    const t = useTranslations("Hr");

    return (
    <div>
      <HrManager />
    </div>
  );
}
