import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import CourseB1Breadcrumb from "@/components/courses/b1/CourseB1Breadcrumb";
import CourseB1Hero from "@/components/courses/b1/CourseB1Hero";
import CourseB1Content from "@/components/courses/b1/CourseB1Content";

export default async function CourseB1Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!["vi", "en"].includes(locale)) notFound();

  const t = await getTranslations({ locale, namespace: "CourseB1" });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <CourseB1Breadcrumb locale={locale} t={t} />

      <CourseB1Hero
        locale={locale}
        t={t}
        imageSrc="/image/khoa-hoc-b1.png" // ✅ đổi đúng ảnh của bạn
      />

      <CourseB1Content t={t} />

      <div className="h-10" />
    </div>
  );
}
