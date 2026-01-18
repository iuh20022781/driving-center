import { API_HOST } from "@/utils/env";

const BLOG_API = {
  // Lấy tất cả danh mục với phân trang
  GET_ALL_BLOGS: `${API_HOST}/api/v1/blogs`,
} as const;

export default BLOG_API;
