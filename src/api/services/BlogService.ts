// @/api/services/BlogService.ts

import { FetchServerPublicGetApi } from "@/actions/FetchServerAction";
import BLOG_API from "@/api/endpoints/blog/blog";
import { Blog, BlogResponse } from "@/types/response/blog/blog";

export class BlogService {
  /**
   * Lấy danh sách tất cả bài viết blog
   */
  static async getAllBlogs(): Promise<Blog[]> {
    try {
      const response: BlogResponse = await FetchServerPublicGetApi(
        BLOG_API.GET_ALL_BLOGS
      );
      
      // Kiểm tra response có hợp lệ không
      if (response?.status === 200 && Array.isArray(response?.result)) {
        return response.result;
      }
      
      console.warn("Invalid blog API response structure:", response);
      return [];
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return []; // Trả về mảng rỗng thay vì throw error
    }
  }

   /**
   * Lấy chi tiết blog theo slug
   */
  static async getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
      // Lấy tất cả blogs và tìm theo slug
      const blogs = await this.getAllBlogs();
      const blog = blogs.find(b => b.slug === slug);
      
      if (!blog) {
        console.warn(`Blog with slug "${slug}" not found`);
        return null;
      }
      
      // Chỉ trả về blog nếu đã PUBLISHED
      if (blog.blogStatus !== 'PUBLISHED') {
        console.warn(`Blog "${slug}" is not published`);
        return null;
      }
      
      return blog;
    } catch (error) {
      console.error(`Error fetching blog by slug "${slug}":`, error);
      return null;
    }
  }

  /**
   * Lấy blogs liên quan (cùng category, loại trừ blog hiện tại)
   */
  static async getRelatedBlogs(currentBlogId: string, categoryName: string, limit: number = 2): Promise<Blog[]> {
    try {
      const blogs = await this.getAllBlogs();
      
      return blogs
        .filter(blog => 
          blog.blogId !== currentBlogId && 
          blog.blogCategoryName === categoryName &&
          blog.blogStatus === 'PUBLISHED'
        )
        .slice(0, limit);
    } catch (error) {
      console.error("Error fetching related blogs:", error);
      return [];
    }
  }
}


export default BlogService;