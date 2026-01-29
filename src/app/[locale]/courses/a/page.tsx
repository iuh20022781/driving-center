import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import CourseAView from "@/components/courses/a/CourseAView";

export default async function CourseAPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!["vi", "en"].includes(locale)) notFound();

  const t = await getTranslations({ locale, namespace: "CourseA" });

  return <CourseAView locale={locale} t={t} />;
}
