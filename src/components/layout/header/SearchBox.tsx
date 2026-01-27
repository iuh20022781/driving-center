"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SearchBox() {
  const t = useTranslations("Header.Search");

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={t("placeholder")}
        className="
          w-full
          rounded-xl
          bg-white
          py-2.5 pl-4 pr-10
          text-sm text-gray-900
          placeholder:text-gray-400
          shadow-sm
          outline-none
          focus:ring-2 focus:ring-yellow-400
        "
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  );
}
