"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Plus, Trash2, FileText } from "lucide-react";
import type { Post } from "@/types/post";
import { cn } from "@/utils/cn";
import { postsStore } from "@/lib/posts.store";

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

export default function PostsList({
  posts,
  activeId,
  onSelect,
  onCreate,
  onDelete,
}: {
  posts: Post[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const t = useTranslations("PostsAdmin");
  const locale = (useLocale() || "vi") as "vi" | "en";
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return posts;
    return posts.filter(
      (p) => p.title.toLowerCase().includes(s) || p.slug.toLowerCase().includes(s)
    );
  }, [posts, q]);

  function createNew() {
    const now = Date.now();
    const today = new Date().toISOString().slice(0, 10);

    const title = t("newDefaultTitle");
    const p: Post = {
      id: crypto.randomUUID(),
      locale,
      title,
      slug: slugify(title),
      publishedAt: today,
      coverImage: "",
      contentHtml: `<p>${t("newDefaultContent")}</p>`,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    };

    postsStore.upsert(p);
    onCreate(p.id);
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-lg font-semibold text-white/90">{t("listTitle")}</div>

        <button type="button" className="btn-pink px-3 py-2" onClick={createNew}>
          <span className="inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {t("new")}
          </span>
        </button>
      </div>

      <div className="mt-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="input-dark"
          placeholder={t("search")}
        />
      </div>

      <div className="mt-4 space-y-2">
        {filtered.map((p) => {
          const active = p.id === activeId;

          return (
            <div
              key={p.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect(p.id);
              }}
              className={cn(
                "w-full text-left rounded-2xl border px-4 py-3 transition cursor-pointer select-none",
                "focus:outline-none focus:ring-2 focus:ring-pink-400/40",
                active
                  ? "bg-white/10 border-white/10"
                  : "bg-black/10 border-transparent hover:bg-white/[0.04] hover:border-white/10"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-white/60" />
                  </div>

                  <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="font-semibold text-white/90 truncate">{p.title}</div>

                    <span
                      className={cn(
                        "shrink-0 rounded-lg border px-2 py-0.5 text-[11px]",
                        p.locale === "vi"
                          ? "border-pink-500/40 text-pink-200 bg-pink-500/10"
                          : "border-sky-500/40 text-sky-200 bg-sky-500/10"
                      )}
                    >
                      {p.locale.toUpperCase()}
                    </span>
                  </div>

                    <div className="text-xs text-white/50 truncate">/{p.slug}</div>

                    <div className="mt-1 text-xs text-white/60">
                      {t("date")}: {p.publishedAt} •{" "}
                      <span className={p.status === "published" ? "text-pink-300" : "text-white/50"}>
                        {t(`status.${p.status}`)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ✅ Delete button is now NOT nested inside a <button> */}
                <button
                  type="button"
                  className="btn-ghost p-2 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(t("confirmDelete"))) onDelete(p.id);
                  }}
                  aria-label="delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && <div className="text-sm text-white/60 pt-4">{t("empty")}</div>}
      </div>
    </div>
  );
}
