import type { Post } from "@/types/post";

const KEY = "driving_admin_posts_v1";

function readAll(): Post[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Post[];
  } catch {
    return [];
  }
}

function writeAll(posts: Post[]) {
  localStorage.setItem(KEY, JSON.stringify(posts));
}

export const postsStore = {
  list(locale?: "vi" | "en") {
    const all = readAll();
    return locale ? all.filter((p) => p.locale === locale) : all;
  },
  get(id: string) {
    return readAll().find((p) => p.id === id) || null;
  },
  getBySlug(locale: "vi" | "en", slug: string) {
    return readAll().find((p) => p.locale === locale && p.slug === slug && p.status === "published") || null;
  },
  upsert(post: Post) {
    const all = readAll();
    const idx = all.findIndex((p) => p.id === post.id);
    if (idx >= 0) all[idx] = post;
    else all.unshift(post);
    writeAll(all);
  },
  remove(id: string) {
    const all = readAll().filter((p) => p.id !== id);
    writeAll(all);
  }
};
