'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const slides = [
  { img: '/images/banner/bannerSlide.png' },
  { img: '/images/banner/bannerSlide1.png' },
];

export default function HeroBanner() {
  const t = useTranslations('HeroBanner');
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.img}
              alt={`Banner ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}

        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition z-10">
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition z-10">
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 uppercase mb-3">
            {t('san-thi-title')}
          </h2>
          <p className="text-xl md:text-2xl text-blue-600">
            {t('san-thi-desc')}
          </p>
        </div>
      </section>
    </>
  );
}