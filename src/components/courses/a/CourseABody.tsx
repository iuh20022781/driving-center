export default function CourseABody({ t }: { t: (key: string) => string }) {
    return (
      <section className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {t("body.descLabel")}
        </div>
  
        <h2 className="mt-2 text-lg font-extrabold text-blue-700">
          {t("body.title")}
        </h2>
  
        {/* I */}
        <h3 className="mt-4 text-sm font-extrabold text-gray-900">
          {t("body.s1.title")}
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>{t("body.s1.li1")}</li>
        </ul>
  
        {/* II */}
        <h3 className="mt-5 text-sm font-extrabold text-gray-900">
          {t("body.s2.title")}
        </h3>
  
        <div className="mt-2 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-yellow-200/70 text-left">
              <tr>
                <th className="px-4 py-3 font-extrabold text-gray-900">{t("body.table.col1")}</th>
                <th className="px-4 py-3 font-extrabold text-gray-900">{t("body.table.col2")}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {["r1", "r2", "r3", "r4", "r5"].map((k) => (
                <tr key={k}>
                  <td className="px-4 py-3 text-gray-800">{t(`body.table.${k}.c1`)}</td>
                  <td className="px-4 py-3 text-gray-700">{t(`body.table.${k}.c2`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* III */}
        <h3 className="mt-5 text-sm font-extrabold text-gray-900">
          {t("body.s3.title")}
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          <li>• {t("body.s3.li1")}</li>
          <li>• {t("body.s3.li2")}</li>
          <li>• {t("body.s3.li3")}</li>
          <li>• {t("body.s3.li4")}</li>
        </ul>
  
        {/* IV */}
        <h3 className="mt-5 text-sm font-extrabold text-gray-900">
          {t("body.s4.title")}
        </h3>
  
        <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border bg-gray-50 p-4">
            <div className="text-sm font-bold text-gray-900">{t("body.location.name")}</div>
            <div className="mt-2 text-sm text-gray-700">{t("body.location.addr")}</div>
            <div className="mt-2 text-sm text-gray-700">{t("body.location.phone")}</div>
            <div className="mt-2 text-sm text-gray-700">{t("body.location.email")}</div>
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
    );
  }
  