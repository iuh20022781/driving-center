"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import PageHeader from "@/components/layout/admin/PageHeader";
import { postsStore } from "@/lib/posts.store";
import type { Post } from "@/types/post";
import PostsList from "./PostsList";
import PostEditor from "./PostEditor";

export default function AdminPostsPage() {
  const t = useTranslations("PostsAdmin");
  const locale = (useLocale() || "vi") as "vi" | "en";

  const [posts, setPosts] = useState<Post[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activePost = useMemo(() => {
    if (!activeId) return null;
    return posts.find((p) => p.id === activeId) || null;
  }, [activeId, posts]);

  function reload(selectId?: string | null) {
    const rows = postsStore.list().sort((a, b) => b.updatedAt - a.updatedAt); // ✅ load ALL
    setPosts(rows);
  
    if (rows.length === 0) {
      setActiveId(null);
      return;
    }
  
    if (selectId) setActiveId(selectId);
    else if (!activeId) setActiveId(rows[0].id);
  }
  

  useEffect(() => {
    reload(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return (
    <div>
      <PageHeader title={t("title")} breadcrumb={t("breadcrumb")} />

      <div className="panel mt-4 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
          {/* Left list */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10">
            <PostsList
              posts={posts}
              activeId={activeId}
              onSelect={setActiveId}
              onCreate={(newId) => reload(newId)}
              onDelete={(id) => {
                postsStore.remove(id);
                reload(null);
              }}
            />
          </div>

          {/* Right editor */}
          <div className="lg:col-span-8">
            <PostEditor
              post={activePost}
              locale={locale}
              onSaved={(id) => reload(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
