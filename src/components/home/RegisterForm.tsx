'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function RegisterForm() {
  const t = useTranslations('RegisterForm');

  return (
    <section className="py-16 bg-blue-700">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-blue-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="p-8 text-white text-center md:text-left md:w-1/3">
              <div className="flex justify-center md:justify-start mb-6">
                <Image src="/image/logotron.png" alt="Sông Tiền" width={120} height={120} />
              </div>
              <h2 className="text-3xl font-bold mb-2">{t('title')}</h2>
              <p className="text-lg">{t('subtitle')}</p>
            </div>

            <div className="p-8 md:w-2/3">
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder={t('name')}
                  className="px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="email"
                  placeholder={t('email')}
                  className="px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="tel"
                  placeholder={t('phone')}
                  className="px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <select
                  className="px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">{t('course')}</option>
                  <option>A1</option>
                  <option>A (trên 125cc)</option>
                  <option>B số tự động</option>
                  <option>B số sàn</option>
                  <option>C1</option>
                  <option>Nâng hạng C</option>
                </select>

                <button
                  type="submit"
                  className="md:col-span-4 bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-5 rounded-lg uppercase transition shadow-lg"
                >
                  {t('submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}