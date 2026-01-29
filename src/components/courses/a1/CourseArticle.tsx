import Link from "next/link";
import { CalendarDays, Share2, ArrowRight } from "lucide-react";

function withLocale(locale: string, href: string) {
  if (/^https?:\/\//.test(href)) return href;
  const safe = href.startsWith("/") ? href : `/${href}`;
  if (safe === "/") return `/${locale}`;
  if (safe.startsWith(`/${locale}/`) || safe === `/${locale}`) return safe;
  return `/${locale}${safe}`;
}

export default function CourseArticle({
  locale,
  t,
}: {
  locale: string;
  t: (key: string) => string;
}) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
      {/* ✅ title + button cùng hàng, không rớt dòng */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {t("intro")}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {t("meta.updated")}
            </span>
            <span className="inline-flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              {t("meta.share")}
            </span>
          </div>
        </div>

        {/* ✅ nút: luôn 1 dòng + đẹp hơn */}
        <Link
          href={withLocale(locale, "/registration/nop-ho-so")}
          className="
            shrink-0
            inline-flex items-center justify-center gap-2
            rounded-2xl
            bg-blue-700 px-5 py-3
            text-sm font-extrabold text-white
            shadow-lg shadow-blue-700/20
            transition
            hover:bg-blue-800 hover:shadow-blue-800/25
            active:scale-[0.98]
            whitespace-nowrap
          "
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Quick box */}
      <div className="mt-5 rounded-2xl bg-gray-50 p-4">
        <div className="text-sm font-bold text-blue-700">{t("quick.title")}</div>
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
