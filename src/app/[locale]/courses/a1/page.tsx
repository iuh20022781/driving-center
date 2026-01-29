import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import CourseA1View from "@/components/courses/a1/CourseA1View";

export default async function CourseA1Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!["vi", "en"].includes(locale)) notFound();

  const t = await getTranslations({ locale, namespace: "CourseA1" });

  return <CourseA1View locale={locale} t={t} />;
}
