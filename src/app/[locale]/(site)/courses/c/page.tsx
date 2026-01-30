import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import CourseCBreadcrumb from "@/components/courses/c/CourseCBreadcrumb";
import CourseCHero from "@/components/courses/c/CourseCHero";
import CourseCContent from "@/components/courses/c/CourseCContent";

export default async function CourseCPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!["vi", "en"].includes(locale)) notFound();

  const t = await getTranslations({ locale, namespace: "CourseC" });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <CourseCBreadcrumb locale={locale} t={t} />

      <CourseCHero locale={locale} t={t} imageSrc="/image/khoa-hoc-c.jpg" />

      <CourseCContent t={t} />

      <div className="h-10" />
    </div>
  );
}
