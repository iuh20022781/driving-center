"use client";

import React from "react";
import { useTranslations } from "next-intl";
import AboutHeroSlider from "./AboutHeroSlider";
import AboutVideo from "./AboutVideo";

const SLIDES = [
  "/image/anh1.jpg",
  "/image/anh2.jpg",
  "/image/anh3.jpg",
  "/image/anh4.jpg",
];

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <div className="w-full">
      {/* HERO SLIDER (không logo) */}
      <div className="mx-auto w-full max-w-5xl">
        <AboutHeroSlider images={SLIDES} />
      </div>

      {/* CONTENT */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-10 pt-6">
        <div className="text-center">
          <div className="mx-auto mb-2 h-[3px] w-16 rounded-full bg-yellow-400" />
          <h1 className="text-2xl font-extrabold tracking-wide text-blue-700 uppercase">
            {t("title")}
          </h1>
        </div>

        <div className="mx-auto mt-6 max-w-4xl space-y-5 text-[15px] leading-7 text-gray-700">
          <p>
            <span className="font-semibold text-blue-700">{t("p1_bold")}</span>{" "}
            {t("p1_rest")}
          </p>

          <p>{t("p2")}</p>
          <p>{t("p3")}</p>

          <p className="font-medium">{t("mission")}</p>
        </div>

        {/* VIDEO */}
        <div className="mx-auto mt-10 w-full max-w-5xl">
          <AboutVideo youtubeUrl="https://youtu.be/9QEOVA8eP-U" />
        </div>
      </section>
    </div>
  );
}
