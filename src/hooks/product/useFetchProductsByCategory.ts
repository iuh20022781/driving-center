// hooks/useFetchProductsByCategory.ts
"use client";

import ProductService from "@/api/services/ProductService";
import { Product } from "@/types/response/product/product";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useFetchProductsByCategory(id: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Callback để fetch, chỉ thay đổi khi id thay đổi
  const fetchProducts = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await ProductService.getProductsByCategoryId(id);
      setProducts(data.content || []);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Không thể tải sản phẩm");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Gọi fetchProducts khi id thay đổi
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Memoize kết quả products (chỉ thay đổi khi products thay đổi)
  const memoizedProducts = useMemo(() => products, [products]);

  return { products: memoizedProducts, loading, error, fetchProducts };
}
