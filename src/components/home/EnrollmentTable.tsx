'use client';

import { useTranslations } from 'next-intl';

export default function EnrollmentTable() {
  const t = useTranslations('EnrollmentTable');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12 uppercase">
          {t('title')}
        </h2>

        {/* Xe máy */}
        <div className="mb-16">
          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">{t('motorcycle-title')}</th>
                  <th className="py-4 px-6 text-center font-semibold">{t('tuition')}</th>
                  <th className="py-4 px-6 text-center font-semibold">
                    {t('exam-fee')}<br />
                    <span className="text-sm font-normal">{t('csgt')}</span>
                  </th>
                  <th className="py-4 px-6 text-center font-semibold">
                    {t('license-fee')}<br />
                    <span className="text-sm font-normal">{t('csgt')}</span>
                  </th>
                  <th className="py-4 px-6 text-center font-semibold">{t('total')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-5 px-6 text-left">
                    {t('a1-title')}<br />
                    <span className="text-sm text-gray-600">{t('a1-desc')}</span>
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-green-700">435.000 VND</td>
                  <td className="py-5 px-6 text-center">130.000 VND</td>
                  <td className="py-5 px-6 text-center">135.000 VND</td>
                  <td className="py-5 px-6 text-center font-bold">700.000 VND</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="py-5 px-6 text-left">
                    {t('a1-title')}<br />
                    <span className="text-sm text-gray-600">{t('a-desc')}</span>
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-green-700">1.735.000 VND</td>
                  <td className="py-5 px-6 text-center">130.000 VND</td>
                  <td className="py-5 px-6 text-center">135.000 VND</td>
                  <td className="py-5 px-6 text-center font-bold">2.000.000 VND</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Ô tô */}
        <div className="mb-16">
          <div className="overflow-x-auto">
            <table className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th rowSpan={2} className="py-6 px-6 text-left font-semibold align-middle">{t('car-title')}</th>
                  <th colSpan={2} className="py-4 px-6 text-center font-semibold">
                    {t('practice-in-office-hours')}<br />
                    <span className="text-sm font-normal">{t('mon-fri')}</span>
                  </th>
                  <th rowSpan={2} className="py-6 px-6 text-center font-semibold align-middle">
                    {t('practice-outside-office-hours')}<br />
                    <span className="text-sm font-normal">{t('sat-sun')}</span>
                  </th>
                  <th rowSpan={2} className="py-6 px-6 text-center font-semibold align-middle">
                    {t('vip-package')}<br />
                    <span className="text-sm font-normal">{t('vip-desc')}</span>
                  </th>
                </tr>
                <tr>
                  <th className="py-3 px-6"></th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-5 px-6 text-left font-semibold">{t('b-auto')}</td>
                  <td className="py-5 px-6 text-center">19.000.000 VND</td>
                  <td className="py-5 px-6 text-center">20.000.000 VND</td>
                  <td className="py-5 px-6 text-center">21.000.000 VND</td>
                  <td className="py-5 px-6 text-center"></td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="py-5 px-6 text-left font-semibold">{t('b-manual')}</td>
                  <td className="py-5 px-6 text-center">19.000.000 VND</td>
                  <td className="py-5 px-6 text-center">20.000.000 VND</td>
                  <td className="py-5 px-6 text-center">21.000.000 VND</td>
                  <td className="py-5 px-6 text-center"></td>
                </tr>
                <tr>
                  <td className="py-5 px-6 text-left font-semibold">{t('c1')}</td>
                  <td className="py-5 px-6 text-center">21.000.000 VND</td>
                  <td className="py-5 px-6 text-center">22.500.000 VND</td>
                  <td className="py-5 px-6 text-center">23.500.000 VND</td>
                  <td className="py-5 px-6 text-center"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6 italic max-w-5xl mx-auto">
            {t('note')}
          </p>
        </div>

        {/* Nâng hạng */}
        <div>
          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">{t('upgrade-title')}</th>
                  <th className="py-4 px-6 text-center font-semibold">{t('tuition')}</th>
                  <th className="py-4 px-6 text-center font-semibold">{t('requirement')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-5 px-6 text-left">{t('b-to-c')}</td>
                  <td className="py-5 px-6 text-center font-bold text-green-700">10.500.000 VND</td>
                  <td className="py-5 px-6 text-center">{t('req-b-2years')}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="py-5 px-6 text-left">{t('c1-to-c')}</td>
                  <td className="py-5 px-6 text-center font-bold text-green-700">8.500.000 VND</td>
                  <td className="py-5 px-6 text-center">{t('req-c1-2years')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6 italic max-w-5xl mx-auto">
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}