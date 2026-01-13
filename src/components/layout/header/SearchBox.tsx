"use client";

import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <div className="relative flex items-center shrink-0">
      <input
        type="text"
        placeholder="Nhập tìm kiếm..."
        className="
          w-48 xl:w-56
          rounded-lg border border-gray-300
          py-2 pl-4 pr-10
          text-sm
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          transition
        "
      />
      <Search className="absolute right-3 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
