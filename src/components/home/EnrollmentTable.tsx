"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function EnrollmentTable() {
  const t = useTranslations("EnrollmentTable");

  const tableBase =
    "w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md border border-gray-200";

  const thBase = "py-4 px-6 font-semibold";
  const tdBase = "py-5 px-6";

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12 uppercase">
          {t("title")}
        </h2>

        {/* ===================== XE MÁY ===================== */}
        <div className="mb-16">
          <div className="overflow-x-auto">
            <table className={tableBase}>
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className={`${thBase} text-left w-[30%]`}>
                    {t("motorcycle-title")}
                  </th>
                  <th className={`${thBase} text-center w-[17.5%]`}>
                    {t("tuition")}
                  </th>
                  <th className={`${thBase} text-center w-[17.5%]`}>
                    {t("exam-fee")}
                    <br />
                    <span className="text-sm font-normal">{t("csgt")}</span>
                  </th>
                  <th className={`${thBase} text-center w-[17.5%]`}>
                    {t("license-fee")}
                    <br />
                    <span className="text-sm font-normal">{t("csgt")}</span>
                  </th>
                  <th className={`${thBase} text-center w-[17.5%]`}>
                    {t("total")}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className={`${tdBase} text-left`}>
                    {t("a1-title")}
                    <br />
                    <span className="text-sm text-gray-600">
                      {t("a1-desc")}
                    </span>
                  </td>
                  <td className={`${tdBase} text-center font-bold text-green-700`}>
                    435.000 VND
                  </td>
                  <td className={`${tdBase} text-center`}>130.000 VND</td>
                  <td className={`${tdBase} text-center`}>135.000 VND</td>
                  <td className={`${tdBase} text-center font-bold`}>
                    700.000 VND
                  </td>
                </tr>

                <tr className="bg-gray-100">
                  <td className={`${tdBase} text-left`}>
                    {t("a1-title")}
                    <br />
                    <span className="text-sm text-gray-600">{t("a-desc")}</span>
                  </td>
                  <td className={`${tdBase} text-center font-bold text-green-700`}>
                    1.735.000 VND
                  </td>
                  <td className={`${tdBase} text-center`}>130.000 VND</td>
                  <td className={`${tdBase} text-center`}>135.000 VND</td>
                  <td className={`${tdBase} text-center font-bold`}>
                    2.000.000 VND
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ===================== XE Ô TÔ ===================== */}
        <div className="mb-16">
          <div className="overflow-x-auto">
            <table className={tableBase}>
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className={`${thBase} text-center w-[22%]`}>
                    {t("car-title")}
                  </th>

                  <th className={`${thBase} text-center w-[28%]`}>
                    {t("practice-in-office-hours")}
                    <br />
                    <span className="text-sm font-normal">{t("mon-fri")}</span>
                  </th>

                  <th className={`${thBase} text-center w-[28%]`}>
                    {t("practice-outside-office-hours")}
                    <br />
                    <span className="text-sm font-normal">{t("sat-sun")}</span>
                  </th>

                  <th className={`${thBase} text-center w-[22%]`}>
                    {t("vip-package")}
                    <br />
                    <span className="text-sm font-normal">{t("vip-desc")}</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className={`${tdBase} text-left font-semibold`}>
                    {t("b-auto")}
                  </td>
                  <td className={`${tdBase} text-center font-bold text-green-700`}>
                    19.000.000 VND
                  </td>
                  <td className={`${tdBase} text-center font-bold`}>
                    20.000.000 VND
                  </td>
                  <td className={`${tdBase} text-center font-bold`}>
                    21.000.000 VND
                  </td>
                </tr>

                <tr className="bg-gray-100">
                  <td className={`${tdBase} text-left font-semibold`}>
                    {t("b-manual")}
                  </td>
                  <td className={`${tdBase} text-center font-bold text-green-700`}>
                    19.000.000 VND
                  </td>
                  <td className={`${tdBase} text-center font-bold`}>
                    20.000.000 VND
                  </td>
                  <td className={`${tdBase} text-center font-bold`}>
                    21.000.000 VND
                  </td>
                </tr>

                <tr>
                  <td className={`${tdBase} text-left font-semibold`}>{t("c1")}</td>
                  <td className={`${tdBase} text-center font-bold text-green-700`}>
                    21.000.000 VND
                  </td>
                  <td className={`${tdBase} text-center font-bold`}>
                    22.500.000 VND
                  </td>
                  <td className={`${tdBase} text-center font-bold`}>
                    23.500.000 VND
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6 italic max-w-6xl mx-auto">
            {t("note")}
          </p>
        </div>


        {/* ===================== NÂNG HẠNG ===================== */}
        <div>
          <div className="overflow-x-auto">
            <table className={tableBase}>
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className={`${thBase} text-left w-[30%]`}>
                    {t("upgrade-title")}
                  </th>
                  <th className={`${thBase} text-center w-[35%]`}>
                    {t("tuition")}
                  </th>
                  <th className={`${thBase} text-center w-[35%]`}>
                    {t("requirement")}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className={`${tdBase} text-left`}>{t("b-to-c")}</td>
                  <td className={`${tdBase} text-center font-bold text-green-700`}>
                    10.500.000 VND
                  </td>
                  <td className={`${tdBase} text-center`}>{t("req-b-2years")}</td>
                </tr>

                <tr className="bg-gray-100">
                  <td className={`${tdBase} text-left`}>{t("c1-to-c")}</td>
                  <td className={`${tdBase} text-center font-bold text-green-700`}>
                    8.500.000 VND
                  </td>
                  <td className={`${tdBase} text-center`}>{t("req-c1-2years")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6 italic max-w-6xl mx-auto">
            {t("note")}
          </p>
        </div>
      </div>
    </section>
  );
}
