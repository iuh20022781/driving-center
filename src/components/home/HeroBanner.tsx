"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const slides = [
  { img: "/image/banner1.jpg" },
  { img: "/image/banner2.jpg" },
  { img: "/image/banner3.jpg" },
  { img: "/image/banner4.jpg" },
];

export default function HeroBanner() {
  const t = useTranslations("HeroBanner");

  const [currentSlide, setCurrentSlide] = React.useState(0);

  // thời gian tự chuyển (ms)
  const intervalMs = 3456;

  // giữ ref để reset interval khi user thao tác
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = React.useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const stopTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = React.useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, intervalMs);
  }, [stopTimer, intervalMs]);

  // auto start
  React.useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  // (tuỳ chọn) dừng khi tab hidden, chạy lại khi quay lại tab
  React.useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) stopTimer();
      else startTimer();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [startTimer, stopTimer]);

  // reset timer khi user tương tác
  const userPrev = () => {
    prevSlide();
    startTimer();
  };
  const userNext = () => {
    nextSlide();
    startTimer();
  };
  const userDot = (i: number) => {
    goTo(i);
    startTimer();
  };

  return (
    <>
      <section className="relative w-full overflow-hidden">
        {/* ✅ Giữ tỉ lệ banner theo màn hình */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/6] md:aspect-[16/5]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.img}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}
  
          {/* Prev / Next */}
          <button
            onClick={userPrev}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 rounded-full p-2.5 md:p-3 transition z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>
  
          <button
            onClick={userNext}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 rounded-full p-2.5 md:p-3 transition z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>
  
          {/* Dots */}
          <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => userDot(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
  
      <section className="bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 uppercase mb-3">
            {t("san-thi-title")}
          </h2>
          <p className="text-xl md:text-2xl text-blue-600">{t("san-thi-desc")}</p>
        </div>
      </section>
    </>
  );
}  
