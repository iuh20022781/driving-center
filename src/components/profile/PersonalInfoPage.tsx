"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import { Save, X } from "lucide-react";
import type { Profile } from "@/types/profile";
import AvatarCard from "./AvatarCard";
import ProfileForm from "./ProfileForm";

export default function PersonalInfoPage() {
  const t = useTranslations("PersonalInformation");

  const initialProfile: Profile = useMemo(
    () => ({
      role: t("role.admin"),
      fullName: "Nguyễn Tấn Phát",
      gender: "male",
      dob: "2002-01-10",
      phone: "0369809077",
      email: "nguyentanphat100102it@gmail.com",
      address: "TP. Hồ Chí Minh",
      avatarUrl: "/images/avatar.png"
    }),
    [t]
  );

  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [draft, setDraft] = useState<Profile>(initialProfile);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const data = edit ? draft : profile;

  function onEdit() {
    setDraft(profile);
    setEdit(true);
  }

  function onCancel() {
    setDraft(profile);
    setEdit(false);
  }

  function onSave() {
    // TODO: call API update
    setProfile(draft);
    setEdit(false);
  }

  function onPickAvatar() {
    if (!edit) return;
    fileRef.current?.click();
  }

  function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDraft((p) => ({ ...p, avatarUrl: url }));
  }

  return (
    <div>
      <PageHeader
        title={t("title")}
        breadcrumb={t("breadcrumb")}
        right={
          !edit ? (
            <button className="btn-pink" onClick={onEdit} type="button">
              {t("edit")}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button className="btn-ghost" onClick={onCancel} type="button">
                <span className="inline-flex items-center gap-2">
                  <X className="h-4 w-4" />
                  {t("cancel")}
                </span>
              </button>
              <button className="btn-pink" onClick={onSave} type="button">
                <span className="inline-flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {t("save")}
                </span>
              </button>
            </div>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <AvatarCard
          t={t}
          data={data}
          edit={edit}
          fileRef={fileRef}
          onPickAvatar={onPickAvatar}
          onAvatarChange={onAvatarChange}
        />

        <ProfileForm t={t} data={data} edit={edit} setDraft={setDraft} />
      </div>
    </div>
  );
}
