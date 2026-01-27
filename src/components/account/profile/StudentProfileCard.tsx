"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type StudentProfile = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  identityCard: string;
  avatarUrl: string;
  gender: "Nam" | "Nữ" | "Khác";
  birthday: string;
  course: string;
};

export default function StudentProfileCard({ data }: { data: StudentProfile }) {
  const t = useTranslations("Profile");

  const Row = ({
    label,
    value,
    isEmail = false,
  }: {
    label: string;
    value: string;
    isEmail?: boolean;
  }) => (
    <div className="grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-4">
      <div className="text-[14px] font-medium text-gray-500">{label}</div>

      {isEmail && value ? (
        <a
          href={`mailto:${value}`}
          className="min-w-0 text-[16px] font-semibold text-blue-700 underline underline-offset-4 break-all hover:text-blue-800"
        >
          {value}
        </a>
      ) : (
        <div className="min-w-0 text-[16px] font-semibold text-gray-900 break-words">
          {value || "-"}
        </div>
      )}
    </div>
  );

  return (
    <section className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-7 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
          {t("studentInfoTitle")}
        </h2>

        <a
          href="#"
          className="
            group relative inline-flex items-center gap-2
            text-base font-extrabold text-blue-700 md:text-lg
            transition-all duration-300 hover:text-blue-800
          "
        >
          <span className="relative">
            {t("personalProfileLink")}
            <span
              className="
                absolute -bottom-1 left-0 h-[2px] w-0
                bg-blue-700 transition-all duration-300
                group-hover:w-full
              "
            />
          </span>

          <span
            className="
              absolute inset-0 -z-10 rounded-xl
              bg-blue-600/10 blur-lg opacity-0
              transition-opacity duration-300 group-hover:opacity-100
            "
          />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-blue-100 sm:h-36 sm:w-36">
            <Image src={data.avatarUrl} alt="avatar" fill className="object-cover" priority />
          </div>

          <div className="text-center">
            <div className="text-xl font-extrabold text-gray-900">{data.fullName}</div>
            <div className="mt-1 text-sm font-semibold text-gray-500">{data.course}</div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-5 min-w-0">
              <Row label={t("fields.fullName")} value={data.fullName} />
              <Row label={t("fields.phone")} value={data.phone} />
            </div>

            <div className="space-y-5 min-w-0">
              <Row label={t("fields.identityCard")} value={data.identityCard} />
              <Row label={t("fields.gender")} value={data.gender} />
              <Row label={t("fields.birthday")} value={data.birthday} />
            </div>

            <div className="md:col-span-2 space-y-5 min-w-0">
              <Row label={t("fields.address")} value={data.address} />
              <Row label={t("fields.email")} value={data.email} isEmail />
              <Row label={t("fields.course")} value={data.course} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
