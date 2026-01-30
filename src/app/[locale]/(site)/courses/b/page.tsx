import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import CourseBBreadcrumb from "@/components/courses/b/CourseBBreadcrumb";
import CourseBHero from "@/components/courses/b/CourseBHero";
import CourseBContent from "@/components/courses/b/CourseBContent";

export default async function CourseBPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!["vi", "en"].includes(locale)) notFound();

  const t = await getTranslations({ locale, namespace: "CourseB" });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <CourseBBreadcrumb locale={locale} t={t} />

      <CourseBHero locale={locale} t={t} />

      <CourseBContent t={t} />

      <div className="h-10" />
    </div>
  );
}
