'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function LargeFieldInfo() {
  const t = useTranslations('LargeFieldInfo');

  const YOUTUBE_ID = '9QEOVA8eP-U';

  return (
    <section className="py-14 bg-[#f3f8fd]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ================= LEFT: GÓC HỌC TẬP ================= */}
          <div className="lg:col-span-4">
            <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-blue-700 text-white text-center py-4 text-xl font-bold uppercase">
                {t('studyCorner')}
              </div>

              {/* Image */}
              <div className="p-4">
                <div className="relative w-full h-[220px] rounded-xl overflow-hidden">
                  <Image
                    src="/image/hoitruong.jpg"
                    alt={t('imageAlt')}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="px-6 pb-6 mt-auto space-y-4">
                <button className="w-full py-3 rounded-full bg-green-500 text-white font-bold text-lg hover:bg-green-600 transition">
                  {t('car')}
                </button>

                <button className="w-full py-3 rounded-full bg-red-500 text-white font-bold text-lg hover:bg-red-600 transition">
                  {t('motorbike')}
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: VIDEO ================= */}
          <div className="lg:col-span-8">
            <div className="h-full rounded-2xl overflow-hidden shadow-xl bg-black">
              <div className="relative w-full h-full min-h-[420px]">
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
                  title={t('videoTitle')}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
