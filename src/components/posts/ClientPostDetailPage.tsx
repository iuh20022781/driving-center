"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { postsStore } from "@/lib/posts.store";
import type { Post } from "@/types/post";
import Image from "next/image";

export default function ClientPostDetailPage({ slug }: { slug: string }) {
  const t = useTranslations("PostsClient");
  const locale = (useLocale() || "vi") as "vi" | "en";
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    setPost(postsStore.getBySlug(locale, slug));
  }, [locale, slug]);

  if (!post) {
    return <div className="mx-auto max-w-3xl px-4 py-10 text-white/70">{t("notFound")}</div>;
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-white/95">{post.title}</h1>
      <div className="mt-2 text-sm text-white/60">{post.publishedAt}</div>

      {post.coverImage && (
        <div className="relative mt-5 w-full h-[260px] md:h-[360px] overflow-hidden rounded-2xl border border-white/10">
          <Image src={post.coverImage} alt="cover" fill className="object-cover" />
        </div>
      )}

      <div
        className="prose prose-invert mt-6 max-w-none text-white/85"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
