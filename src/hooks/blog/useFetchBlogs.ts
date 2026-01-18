"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Blog } from "@/types/response/blog/blog";
import { BlogService } from "@/api/services/blog/BlogService";

export function useFetchBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy trạng thái login từ Redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.account.isAuthenticated
  );

  // Dùng useCallback để không tạo lại hàm fetch mỗi lần render
  const fetchBlogs = useCallback(async () => {
    if (!isAuthenticated) {
      setBlogs([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await BlogService.getAllBlogs();
      setBlogs(data);
      setError(null);
    } catch (err) {
      console.error("Error loading brands:", err);
      setError("Không thể tải brands");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Dùng useMemo để tránh tính toán lại blogs khi không đổi
  const memoizedBlogs = useMemo(() => blogs, [blogs]);

  return { blogs: memoizedBlogs, loading, error };
}
