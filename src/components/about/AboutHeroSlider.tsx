"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AboutHeroSlider({ images }: { images: string[] }) {
  const [idx, setIdx] = React.useState(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const go = React.useCallback(
    (next: number) => setIdx((next + images.length) % images.length),
    [images.length]
  );

  const start = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIdx((p) => (p === images.length - 1 ? 0 : p + 1));
    }, 3500);
  }, [images.length]);

  React.useEffect(() => {
    start();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [start]);

  return (
    <section className="w-full px-4 pt-2">
      {/* Khung giống ảnh: rộng, gọn, không tràn */}
      <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm">
        {/* giữ tỉ lệ đẹp trên mobile/pc */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/6]">
          {images.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === idx ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt={`about-slide-${i + 1}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}

          {/* arrows */}
          <button
            type="button"
            onClick={() => {
              go(idx - 1);
              start();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/25 p-2 text-white hover:bg-black/35"
            aria-label="Prev"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() => {
              go(idx + 1);
              start();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/25 p-2 text-white hover:bg-black/35"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go ${i + 1}`}
                onClick={() => {
                  setIdx(i);
                  start();
                }}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === idx ? "bg-white" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
