// @/types/response/blog/blog.ts

import { StaticImageData } from "next/image";

export interface Blog {
  blogId: string;
  title: string;
  slug: string;
  thumbnailUrl: StaticImageData | string;
  content: string;
  blogCategoryName: string;
  blogStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  authorName: string;
  createdAt: string; // ISO date string
  updatedAt: string | null;
}

export interface BlogResponse {
  status: number;
  message: string;
  result: Blog[];
  timestamp: number;
}