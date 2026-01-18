import CATEGORY_API from "@/api/endpoints/category/category";
import type { CategoryResponse } from "@/types/response/category/category";

export class CategoryService {
  /**
   * Lấy danh sách tất cả danh mục (public – không cần đăng nhập)
   */
  static async getAllCategories(): Promise<CategoryResponse[]> {
    try {
      const res = await fetch(CATEGORY_API.GET_ALL_CATEGORIES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "omit", // ✅ không gửi cookie / token
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Fetch lỗi HTTP:", res.status, res.statusText);
        return [];
      }

      const data = await res.json();
      return data?.result || [];
    } catch (error) {
      console.error("❌ Lỗi tải danh mục:", error);
      return [];
    }
  }
}
