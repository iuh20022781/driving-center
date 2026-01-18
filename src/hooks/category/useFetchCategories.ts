"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { CategoryResponse } from "@/types/response/category/category";
import { CategoryService } from "@/api/services/category/CategoryService";

export function useFetchCategories() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getAllCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      console.error("Error loading categories:", err);
      setError("Không thể tải categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const memoizedCategories = useMemo(() => categories, [categories]);

  return { categories: memoizedCategories, loading, error };
}
