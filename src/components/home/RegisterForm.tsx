"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function RegisterForm() {
  const t = useTranslations("RegisterForm");

  const inputClass =
    "px-6 py-4 rounded-lg text-gray-900 bg-white " +
    "border border-white/70 " +
    "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 " +
    "shadow-sm placeholder:text-gray-500";

  return (
    <section id="register-form" className="py-16 bg-blue-700">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-blue-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left */}
            <div className="p-8 text-white text-center md:text-left md:w-1/3">
              <div className="flex justify-center md:justify-start mb-6">
                <Image
                  src="/image/logotron.png"
                  alt="Sông Tiền"
                  width={120}
                  height={120}
                  priority
                />
              </div>
              <h2 className="text-3xl font-bold mb-2">{t("title")}</h2>
              <p className="text-lg">{t("subtitle")}</p>
            </div>

            {/* Right */}
            <div className="p-8 md:w-2/3 w-full">
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder={t("name")}
                  className={inputClass}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder={t("email")}
                  className={inputClass}
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder={t("phone")}
                  className={inputClass}
                  required
                />

                <select
                  name="course"
                  className={inputClass}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t("course")}
                  </option>
                  <option value="A1">A1</option>
                  <option value="A_OVER_125">A (trên 125cc)</option>
                  <option value="B_AUTO">B số tự động</option>
                  <option value="B_MANUAL">B số sàn</option>
                  <option value="C1">C1</option>
                  <option value="UPGRADE_C">Nâng hạng C</option>
                </select>

                <button
                  type="submit"
                  className="md:col-span-4 bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-5 rounded-lg uppercase transition shadow-lg"
                >
                  {t("submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
