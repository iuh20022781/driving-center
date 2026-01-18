"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { BrandResponse } from "@/types/response/brand/brand";
import { BrandService } from "@/api/services/brand/BrandService";

export function useFetchBrands() {
  const [brands, setBrands] = useState<BrandResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy trạng thái login từ Redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.account.isAuthenticated
  );

  // Dùng useCallback để không tạo lại hàm fetch mỗi lần render
  const fetchBrands = useCallback(async () => {
    if (!isAuthenticated) {
      setBrands([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await BrandService.getAllBrands();
      setBrands(data);
      setError(null);
    } catch (err) {
      console.error("Error loading brands:", err);
      setError("Không thể tải brands");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Dùng useMemo để tránh tính toán lại brands khi không đổi
  const memoizedBrands = useMemo(() => brands, [brands]);

  return { brands: memoizedBrands, loading, error };
}
