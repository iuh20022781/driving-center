import CourseABreadcrumb from "./CourseABreadcrumb";
import CourseAHero from "./CourseAHero";
import CourseAArticle from "./CourseAArticle";
import CourseABody from "./CourseABody";

export default function CourseAView({
  locale,
  t,
}: {
  locale: string;
  t: (key: string) => string;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <CourseABreadcrumb locale={locale} t={t} />

      <section className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[460px_1fr]">
        <CourseAHero imageSrc="/image/khoa-hoc-a.jpg" imageAlt="Khoa hoc A" />
        <CourseAArticle locale={locale} t={t} />
      </section>

      <div className="h-6" />

      <CourseABody t={t} />

      <div className="h-10" />
    </div>
  );
}
