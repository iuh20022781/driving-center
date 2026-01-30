"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { postsStore } from "@/lib/posts.store";
import type { Post } from "@/types/post";

export default function ClientPostsPage() {
  const t = useTranslations("PostsClient");
  const locale = (useLocale() || "vi") as "vi" | "en";
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(postsStore.list(locale).filter((p) => p.status === "published"));
  }, [locale]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-white/95">{t("title")}</h1>

      <div className="mt-6 space-y-4">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/${locale}/posts/${p.slug}`}
            className="block rounded-2xl border border-white/10 bg-[rgb(15,19,26)] p-4 hover:bg-white/[0.03]"
          >
            <div className="text-lg font-semibold text-white/90">{p.title}</div>
            <div className="mt-1 text-xs text-white/50">{p.publishedAt}</div>
          </Link>
        ))}
        {posts.length === 0 && <div className="text-white/60">{t("empty")}</div>}
      </div>
    </div>
  );
}
