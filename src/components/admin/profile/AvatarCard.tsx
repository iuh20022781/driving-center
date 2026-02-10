"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import type { Profile } from "@/types/profile";

export default function AvatarCard({
  t,
  data,
  edit,
  fileRef,
  onPickAvatar,
  onAvatarChange
}: {
  t: (key: string) => string;
  data: Profile;
  edit: boolean;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onPickAvatar: () => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="panel p-6 flex flex-col items-center text-center">
      {/* Title */}
      <div className="w-full text-left text-sm text-white/70 mb-5">
        {t("avatar")}
      </div>

      {/* Avatar BIG */}
      <div className="relative
        h-[160px] w-[160px]
        sm:h-[180px] sm:w-[180px]
        lg:h-[220px] lg:w-[220px]
        overflow-hidden rounded-3xl
        border border-white/10
        bg-white/5
      ">
        <Image
          src={data.avatarUrl}
          alt="Avatar"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Name */}
      <div className="mt-5 text-xl font-semibold text-white/95">
        {data.fullName}
      </div>

      {/* Hint */}
      <div className="mt-1.5 text-sm text-white/50 max-w-[260px]">
        {t("avatarHint")}
      </div>

      {/* Change avatar */}
      <div className="mt-5">
        <button
          type="button"
          onClick={onPickAvatar}
          disabled={!edit}
          className={`btn-ghost inline-flex items-center gap-2 px-5 py-2.5 ${
            !edit ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Camera className="h-4 w-4" />
          {t("changeAvatar")}
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={onAvatarChange}
        />
      </div>
    </div>
  );
}
