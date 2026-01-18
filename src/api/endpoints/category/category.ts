import { API_HOST } from "@/utils/env";

const CATEGORY_API = {
  // Lấy tất cả danh mục với phân trang
  GET_ALL_CATEGORIES: `${API_HOST}/api/v1/categories`,
} as const;

export default CATEGORY_API;
