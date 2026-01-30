export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  locale: "vi" | "en";
  title: string;
  slug: string;
  publishedAt: string; // yyyy-mm-dd
  contentHtml: string; // lưu HTML để render giống ảnh
  coverImage?: string; // base64
  status: PostStatus;
  createdAt: number;
  updatedAt: number;
};
