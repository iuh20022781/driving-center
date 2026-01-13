'use client';

import { useTranslations } from 'next-intl';
import { CalendarCheck, NotebookPen, HatGlasses, BicepsFlexed } from 'lucide-react';

export default function FeaturesGrid() {
  const t = useTranslations('FeaturesGrid');

  const features = [
    { icon: CalendarCheck, title: t('title1'), desc: t('desc1') },
    { icon: NotebookPen, title: t('title2'), desc: t('desc2') },
    { icon: HatGlasses, title: t('title3'), desc: t('desc3') },
    { icon: BicepsFlexed, title: t('title4'), desc: t('desc4') },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition duration-300">
            <feature.icon className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-800 mb-3">{feature.title}</h3>
            <p className="text-gray-700">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}