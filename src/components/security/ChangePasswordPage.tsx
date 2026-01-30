"use client";

import { useTranslations } from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordPage() {
  const t = useTranslations("ChangePassword");

  return (
    <div>
      <PageHeader title={t("title")} breadcrumb={t("breadcrumb")} />
      <div className="mt-4">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
