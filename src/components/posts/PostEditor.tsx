"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Post, PostStatus } from "@/types/post";
import { postsStore } from "@/lib/posts.store";
import { ImagePlus, Save, Send, Link2 } from "lucide-react";
import PostPreview from "./PostPreview";

async function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostEditor({
  post,
  locale,
  onSaved,
}: {
  post: Post | null;
  locale: "vi" | "en";
  onSaved: (id: string) => void;
}) {
  const t = useTranslations("PostsEditor");
  const [draft, setDraft] = useState<Post | null>(post);

  const inlineImgRef = useRef<HTMLInputElement | null>(null);
  const coverRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setDraft(post);
  }, [post]);

  const canSave = useMemo(() => {
    if (!draft) return false;
    return draft.title.trim().length > 0 && draft.contentHtml.trim().length > 0;
  }, [draft]);

  if (!draft) {
    return <div className="p-6 text-white/60">{t("pickLeft")}</div>;
  }

  function save(status: PostStatus) {
    setDraft((prev) => {
      if (!prev) return prev;

      const updated: Post = {
        ...prev,
        locale,
        status,
        slug: prev.slug?.trim() ? prev.slug : slugify(prev.title),
        updatedAt: Date.now(),
      };

      postsStore.upsert(updated);
      onSaved(updated.id);

      return updated;
    });
  }

  async function insertInlineImage(file: File) {
    const b64 = await fileToBase64(file);
    const imgTag = `<p><img src="${b64}" alt="image" style="max-width:100%;border-radius:12px;border:1px solid rgba(255,255,255,.1)" /></p>`;

    setDraft((prev) => {
      if (!prev) return prev;
      const html = prev.contentHtml || "";
      return { ...prev, contentHtml: html + imgTag };
    });
  }

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Form */}
        <div className="xl:col-span-7 panel p-5">
          <div className="text-sm text-white/70 mb-4">{t("editor")}</div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/60">{t("title")}</label>
              <input
                className="input-dark mt-2"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder={t("ph.title")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/60">{t("date")}</label>
                <input
                  type="date"
                  className="input-dark mt-2"
                  value={draft.publishedAt}
                  onChange={(e) => setDraft({ ...draft, publishedAt: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs text-white/60">{t("slug")}</label>
                <div className="mt-2 flex gap-2">
                  <input
                    className="input-dark flex-1"
                    value={draft.slug}
                    onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                    placeholder={t("ph.slug")}
                  />
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => setDraft({ ...draft, slug: slugify(draft.title) })}
                    title="auto"
                  >
                    <Link2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cover */}
            <div>
              <label className="text-xs text-white/60">{t("cover")}</label>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="btn-ghost inline-flex items-center gap-2"
                  onClick={() => coverRef.current?.click()}
                >
                  <ImagePlus className="h-4 w-4" />
                  {t("pickCover")}
                </button>
                <div className="text-xs text-white/50">{t("coverHint")}</div>

                <input
                  ref={coverRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const b64 = await fileToBase64(f);
                    setDraft({ ...draft, coverImage: b64 });
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="text-xs text-white/60">{t("content")}</label>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="btn-ghost inline-flex items-center gap-2"
                  onClick={() => inlineImgRef.current?.click()}
                >
                  <ImagePlus className="h-4 w-4" />
                  {t("insertImage")}
                </button>
                <div className="text-xs text-white/50">{t("insertHint")}</div>

                <input
                  ref={inlineImgRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    await insertInlineImage(f);
                    e.currentTarget.value = "";
                  }}
                />
              </div>

              <textarea
                className="input-dark mt-3 min-h-[260px] resize-none"
                value={draft.contentHtml}
                onChange={(e) => setDraft({ ...draft, contentHtml: e.target.value })}
                // ✅ FIX: use raw string, do not ICU-parse HTML
                placeholder={String(t.raw("ph.content") ?? "")}
              />

              <div className="mt-2 text-xs text-white/50">{t("contentHint")}</div>
            </div>

            {/* Actions */}
            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                className={`btn-pink inline-flex items-center gap-2 ${
                  !canSave ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={!canSave}
                onClick={() => save("published")}
              >
                <Send className="h-4 w-4" />
                {t("publish")}
              </button>

              <button
                type="button"
                className={`btn-ghost inline-flex items-center gap-2 ${
                  !canSave ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={!canSave}
                onClick={() => save("draft")}
              >
                <Save className="h-4 w-4" />
                {t("saveDraft")}
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="xl:col-span-5 panel p-5">
          <div className="text-sm text-white/70 mb-4">{t("preview")}</div>
          <PostPreview post={draft} />
        </div>
      </div>
    </div>
  );
}
