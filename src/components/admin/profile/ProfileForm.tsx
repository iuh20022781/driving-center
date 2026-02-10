"use client";

import type { Gender, Profile } from "@/types/profile";

export default function ProfileForm({
  t,
  data,
  edit,
  setDraft
}: {
  t: (key: string) => string;
  data: Profile;
  edit: boolean;
  setDraft: React.Dispatch<React.SetStateAction<Profile>>;
}) {
  return (
    <div className="panel p-4 lg:col-span-2">
      <div className="text-sm text-white/70 mb-4">{t("info")}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Role (readonly) */}
        <div>
          <label className="text-xs text-white/60">{t("roleLabel")}</label>
          <input value={data.role} readOnly className="input-dark mt-2 opacity-70 cursor-not-allowed" />
        </div>

        {/* Full name */}
        <div>
          <label className="text-xs text-white/60">{t("fullName")}</label>
          <input
            value={data.fullName}
            onChange={(e) => setDraft((p) => ({ ...p, fullName: e.target.value }))}
            className="input-dark mt-2"
            readOnly={!edit}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-xs text-white/60">{t("gender")}</label>
          <select
            value={data.gender}
            onChange={(e) => setDraft((p) => ({ ...p, gender: e.target.value as Gender }))}
            className="input-dark mt-2"
            disabled={!edit}
          >
            <option value="male" className="bg-[rgb(15,19,26)]">
              {t("genderMale")}
            </option>
            <option value="female" className="bg-[rgb(15,19,26)]">
              {t("genderFemale")}
            </option>
            <option value="other" className="bg-[rgb(15,19,26)]">
              {t("genderOther")}
            </option>
          </select>
        </div>

        {/* DOB */}
        <div>
          <label className="text-xs text-white/60">{t("dob")}</label>
          <input
            type="date"
            value={data.dob}
            onChange={(e) => setDraft((p) => ({ ...p, dob: e.target.value }))}
            className="input-dark mt-2"
            readOnly={!edit}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs text-white/60">{t("phone")}</label>
          <input
            value={data.phone}
            onChange={(e) => setDraft((p) => ({ ...p, phone: e.target.value }))}
            className="input-dark mt-2"
            readOnly={!edit}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-white/60">{t("email")}</label>
          <input
            value={data.email}
            onChange={(e) => setDraft((p) => ({ ...p, email: e.target.value }))}
            className="input-dark mt-2"
            readOnly={!edit}
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="text-xs text-white/60">{t("address")}</label>
          <textarea
            value={data.address}
            onChange={(e) => setDraft((p) => ({ ...p, address: e.target.value }))}
            className="input-dark mt-2 min-h-[90px] resize-none"
            readOnly={!edit}
          />
        </div>
      </div>

      {!edit && <div className="mt-4 text-xs text-white/50">{t("readOnlyHint")}</div>}
    </div>
  );
}
