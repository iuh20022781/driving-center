'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function CarCourses() {
  const t = useTranslations('CarCourses');

  const courses = [
    {
      img: '/image/b.jpg',
      title: t('b-auto-title'),
      price: t('b-auto-price')
    },
    {
      img: '/image/bs.png',
      title: t('b-manual-title'),
      price: t('b-manual-price')
    },
    {
      img: '/image/c1.jpg',
      title: t('c1-title'),
      price: t('c1-price')
    },
    {
      img: '/image/c.jpg',
      title: t('c-upgrade-title'),
      price: t('c-upgrade-price'),
      isSpecial: true
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold uppercase text-blue-800">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-white shadow-xl transition duration-300 hover:shadow-2xl"
            >
              <div className="relative h-64">
                <Image
                  src={course.img}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 text-center">
                <h3 className="mb-4 text-xl font-bold uppercase text-blue-800">
                  {course.title}
                </h3>

                <p className="mb-8 text-3xl font-bold text-green-600">
                  {course.price}
                </p>

                <Link
                  href="/dang-ky"
                  className={`block rounded-full py-3 font-bold text-white transition ${
                    course.isSpecial
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {t('view-detail')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
