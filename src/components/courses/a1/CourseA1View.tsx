import CourseBreadcrumb from "./CourseBreadcrumb";
import CourseHero from "./CourseHero";
import CourseArticle from "./CourseArticle";

export default function CourseA1View({
  locale,
  t,
}: {
  locale: string;
  t: (key: string) => string;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <CourseBreadcrumb locale={locale} t={t} />

      <section className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[460px_1fr]">
        <CourseHero imageSrc="/image/khoa-hoc-a1.jpg" imageAlt="Khoa hoc A1" />
        <CourseArticle locale={locale} t={t} />
      </section>

      <div className="h-6" />

      <section className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-extrabold text-red-600">{t("section.title")}</h2>
        <p className="mt-3 text-sm leading-7 text-gray-700">{t("section.p1")}</p>

        <h3 className="mt-6 text-base font-extrabold text-gray-900">
          {t("section.subtitle1")}
        </h3>
        <ul className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>{t("section.li1")}</li>
          <li>{t("section.li2")}</li>
        </ul>

        <h3 className="mt-6 text-base font-extrabold text-gray-900">
          {t("section.subtitle2")}
        </h3>

        <div className="mt-3 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-yellow-200/70 text-left">
              <tr>
                <th className="px-4 py-3 font-extrabold text-gray-900">{t("table.col1")}</th>
                <th className="px-4 py-3 font-extrabold text-gray-900">{t("table.col2")}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {["r1", "r2", "r3", "r4", "r5"].map((k) => (
                <tr key={k}>
                  <td className="px-4 py-3 text-gray-800">{t(`table.${k}.c1`)}</td>
                  <td className="px-4 py-3 text-gray-700">{t(`table.${k}.c2`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 text-base font-extrabold text-gray-900">
          {t("section.subtitle3")}
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          <li>• {t("section.c1")}</li>
          <li>• {t("section.c2")}</li>
          <li>• {t("section.c3")}</li>
          <li>• {t("section.c4")}</li>
        </ul>

        <h3 className="mt-6 text-base font-extrabold text-gray-900">{t("location.title")}</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border bg-gray-50 p-4">
            <div className="text-sm font-bold text-gray-900">{t("location.name")}</div>
            <div className="mt-2 text-sm text-gray-700">{t("location.addr")}</div>
            <div className="mt-2 text-sm text-gray-700">{t("location.phone")}</div>
            <div className="mt-2 text-sm text-gray-700">{t("location.email")}</div>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-white">
            <iframe
              title="Map"
              className="h-[220px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=My%20Tho%20Tien%20Giang&output=embed"
            />
          </div>
        </div>
      </section>

      <div className="h-10" />
    </div>
  );
}
