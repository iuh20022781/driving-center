import { FetchServerGetApi } from "@/actions/FetchServerAction";
import API from "@/api/endpoints/api";
import { Blog } from "@/types/response/blog/blog";

export class BlogService {
  /**
   * Lấy danh sách tất cả bài viết có phân trang
   */
  static async getAllBlogs(): Promise<Blog[]> {
    try {
      const response = await FetchServerGetApi(API.BLOG.GET_ALL_BLOGS, "/");
      console.log("Fetched blogs:", response);
      return response?.result || [];
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  }
}
