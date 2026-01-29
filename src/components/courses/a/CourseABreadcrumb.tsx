import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

function withLocale(locale: string, href: string) {
  if (/^https?:\/\//.test(href)) return href;
  const safe = href.startsWith("/") ? href : `/${href}`;
  if (safe === "/") return `/${locale}`;
  if (safe.startsWith(`/${locale}/`) || safe === `/${locale}`) return safe;
  return `/${locale}${safe}`;
}

export default function CourseABreadcrumb({
  locale,
  t,
}: {
  locale: string;
  t: (key: string) => string;
}) {
  return (
    <div className="pt-3">
      <nav
        className="
          inline-flex items-center gap-2
          rounded-2xl border border-gray-200/80
          bg-white/80 px-4 py-2
          shadow-sm backdrop-blur
        "
        aria-label="Breadcrumb"
      >
        {/* Home */}
        <Link
          href={withLocale(locale, "/")}
          className="
            group inline-flex items-center gap-2
            font-extrabold text-gray-700
            transition-all duration-200
            hover:text-blue-700
            active:scale-[0.99]
          "
        >
          <span
            className="
              inline-flex h-8 w-8 items-center justify-center
              rounded-xl border bg-gray-50
              transition
              group-hover:border-blue-200 group-hover:bg-blue-50
            "
          >
            <Home className="h-4 w-4" />
          </span>

          <span className="relative">
            {t("breadcrumb.home")}
            <span
              className="
                absolute -bottom-1 left-0 h-[2px] w-0
                bg-blue-700
                transition-all duration-300
                group-hover:w-full
              "
            />
          </span>
        </Link>

        <ChevronRight className="h-4 w-4 text-gray-300" />

        {/* Courses */}
        <Link
          href={withLocale(locale, "/courses/a")}
          className="
            group inline-flex items-center
            font-bold text-gray-600
            transition-all duration-200
            hover:text-blue-700
            active:scale-[0.99]
          "
        >
          <span className="relative">
            {t("breadcrumb.courses")}
            <span
              className="
                absolute -bottom-1 left-0 h-[2px] w-0
                bg-blue-700
                transition-all duration-300
                group-hover:w-full
              "
            />
          </span>
        </Link>

        <ChevronRight className="h-4 w-4 text-gray-300" />

        {/* Current */}
        <span
          className="
            inline-flex items-center
            rounded-xl bg-blue-50 px-3 py-1
            text-sm font-extrabold text-blue-800
            ring-1 ring-blue-100
          "
        >
          {t("breadcrumb.a")}
        </span>
      </nav>
    </div>
  );
}
