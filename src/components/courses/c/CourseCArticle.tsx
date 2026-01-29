import Link from "next/link";
import { CalendarDays, Share2, ArrowRight } from "lucide-react";

function withLocale(locale: string, href: string) {
  if (/^https?:\/\//.test(href)) return href;
  const safe = href.startsWith("/") ? href : `/${href}`;
  if (safe === "/") return `/${locale}`;
  if (safe.startsWith(`/${locale}/`) || safe === `/${locale}`) return safe;
  return `/${locale}${safe}`;
}

export default function CourseCArticle({
  locale,
  t,
}: {
  locale: string;
  t: (key: string) => string;
}) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            {t("title")}
          </h1>

          {/* intro */}
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-gray-700">
            <p className="font-semibold text-blue-700">{t("intro.p1")}</p>

            <ul className="list-disc space-y-1 pl-5">
              <li>{t("intro.li1")}</li>
              <li>{t("intro.li2")}</li>
              <li>{t("intro.li3")}</li>
            </ul>

            <p className="text-blue-700 font-semibold">{t("intro.note")}</p>
          </div>

          {/* meta */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {t("meta.updated")}
            </span>
            <span className="inline-flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              {t("meta.share")}
            </span>
          </div>

          {/* category */}
          <div className="mt-3 text-xs text-gray-500">
            <span className="font-semibold">{t("category.label")}</span>{" "}
            {t("category.value")}
          </div>

          {/* social fake */}
          <div className="mt-3 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600" />
            <div className="h-8 w-8 rounded-full bg-sky-500" />
            <div className="h-8 w-8 rounded-full bg-red-600" />
            <div className="h-8 w-8 rounded-full bg-gray-800" />
          </div>
        </div>

        {/* CTA */}
        <Link
          href={withLocale(locale, "/registration/nop-ho-so")}
          className="
            inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap
            rounded-2xl bg-blue-700 px-5 py-3
            text-sm font-extrabold text-white
            shadow-sm transition
            hover:bg-blue-800 hover:shadow-md
            active:scale-[0.98]
          "
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* quick box */}
      <div className="mt-5 rounded-2xl bg-gray-50 p-4">
        <div className="text-sm font-extrabold text-blue-700">{t("quick.title")}</div>

        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          <li>
            <span className="font-semibold">{t("quick.item1Label")}</span>{" "}
            {t("quick.item1Value")}
          </li>
          <li>
            <span className="font-semibold">{t("quick.item2Label")}</span>{" "}
            {t("quick.item2Value")}
          </li>
          <li>
            <span className="font-semibold">{t("quick.item3Label")}</span>{" "}
            {t("quick.item3Value")}
          </li>
        </ul>
      </div>
    </article>
  );
}
