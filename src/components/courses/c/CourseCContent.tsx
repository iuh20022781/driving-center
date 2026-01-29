export default function CourseCContent({ t }: { t: (key: string) => string }) {
    return (
      <section className="mt-6 rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
        <div className="text-xs text-gray-500">{t("descLabel")}</div>
  
        <h2 className="mt-2 text-lg font-extrabold text-blue-700">
          {t("section.title")}
        </h2>
  
        {/* I. Thời gian */}
        <h3 className="mt-6 text-base font-extrabold text-gray-900">
          {t("section.subtitle1")}
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>{t("time.li1")}</li>
          <li>{t("time.li2")}</li>
          <li>{t("time.li3")}</li>
          <li>{t("time.li4")}</li>
        </ul>
  
        {/* II. Hồ sơ */}
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
              {["r1", "r2", "r3", "r4", "r5", "r6"].map((k) => (
                <tr key={k} className="bg-white">
                  <td className="px-4 py-3 text-gray-800">{t(`table.${k}.c1`)}</td>
                  <td className="px-4 py-3 text-gray-700">{t(`table.${k}.c2`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* III. Cam kết */}
        <h3 className="mt-6 text-base font-extrabold text-gray-900">
          {t("section.subtitle3")}
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          <li>• {t("commit.c1")}</li>
          <li>• {t("commit.c2")}</li>
          <li>• {t("commit.c3")}</li>
          <li>• {t("commit.c4")}</li>
        </ul>
  
        {/* IV. Địa điểm */}
        <h3 className="mt-6 text-base font-extrabold text-gray-900">
          {t("location.title")}
        </h3>
  
        <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border bg-gray-50 p-4">
            <div className="text-sm font-extrabold text-gray-900">{t("location.name")}</div>
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
              src={t("location.mapSrc")}
            />
          </div>
        </div>
      </section>
    );
  }
  