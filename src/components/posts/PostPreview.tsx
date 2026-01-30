"use client";

import Image from "next/image";
import type { Post } from "@/types/post";

export default function PostPreview({ post }: { post: Post }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
      {post.coverImage ? (
        <div className="relative w-full h-48">
          <Image src={post.coverImage} alt="cover" fill className="object-cover" />
        </div>
      ) : (
        <div className="h-48 bg-white/5 border-b border-white/10" />
      )}

      <div className="p-4">
        <div className="text-lg font-semibold text-white/95">
          {post.title || "—"}
        </div>
        <div className="mt-1 text-xs text-white/50">{post.publishedAt}</div>

        <div
          className="prose prose-invert mt-4 max-w-none text-white/85"
          dangerouslySetInnerHTML={{
            __html: post.contentHtml?.trim() ? post.contentHtml : "<p style='opacity:.6'>Nội dung...</p>"
          }}
        />
      </div>
    </div>
  );
}
