'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function LargeFieldInfo() {
  const t = useTranslations('LargeFieldInfo');

  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4 uppercase">
            {t('title')}
          </h2>
          <p className="text-xl md:text-2xl text-blue-700">
            {t('distance')}
          </p>
        </div>

        {/* Ảnh load từ public/images/banner/bannerAds1.png */}
        <Image
          src="/images/banner/bannerAds1.png"
          alt={t('title')}
          width={600}
          height={400}
          className="rounded-2xl object-cover"
          priority // Tải nhanh ảnh quan trọng
        />
      </div>
    </section>
  );
}