import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import CourseC1Breadcrumb from "@/components/courses/c1/CourseC1Breadcrumb";
import CourseC1Hero from "@/components/courses/c1/CourseC1Hero";
import CourseC1Content from "@/components/courses/c1/CourseC1Content";

export default async function CourseC1Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!["vi", "en"].includes(locale)) notFound();

  const t = await getTranslations({ locale, namespace: "CourseC1" });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <CourseC1Breadcrumb locale={locale} t={t} />

      <CourseC1Hero
        locale={locale}
        t={t}
        imageSrc="/image/khoa-hoc-c1.jpg"
      />

      <CourseC1Content t={t} />

      <div className="h-10" />
    </div>
  );
}
