import Link from "next/link";
import { CalendarDays, Share2, ArrowRight } from "lucide-react";

function withLocale(locale: string, href: string) {
  if (/^https?:\/\//.test(href)) return href;
  const safe = href.startsWith("/") ? href : `/${href}`;
  if (safe === "/") return `/${locale}`;
  if (safe.startsWith(`/${locale}/`) || safe === `/${locale}`) return safe;
  return `/${locale}${safe}`;
}

export default function CourseAArticle({
  locale,
  t,
}: {
  locale: string;
  t: (key: string) => string;
}) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            {t("title")}
          </h1>

          {/* bullet như ảnh */}
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
              <span>{t("introBullet1")}</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              <span className="font-semibold text-blue-700">{t("introBullet2")}</span>
            </li>
          </ul>

          {/* tags + share */}
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

          {/* categories line (như ảnh) */}
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-semibold text-gray-700">{t("category.label")}: </span>
            {t("category.value")}
          </div>

          {/* social icons (fake) */}
          <div className="mt-3 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600" />
            <div className="h-8 w-8 rounded-full bg-sky-500" />
            <div className="h-8 w-8 rounded-full bg-red-600" />
            <div className="h-8 w-8 rounded-full bg-gray-800" />
          </div>
        </div>

        <Link
          href={withLocale(locale, "/registration/nop-ho-so")}
          className="
            shrink-0 whitespace-nowrap
            inline-flex items-center justify-center gap-2
            rounded-2xl
            bg-blue-700 px-5 py-3
            text-sm font-extrabold text-white
            shadow-lg shadow-blue-700/20
            transition
            hover:bg-blue-800 hover:shadow-blue-800/25
            active:scale-[0.98]
          "
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
