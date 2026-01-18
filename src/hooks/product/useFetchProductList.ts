// src/hooks/useFetchProducts.ts
import { useEffect, useState } from "react";
import { ProductType } from "@/types/Product/ProductType";
import ProductService1 from "@/api/services/ProductService1";

export const useFetchProducts = (page = 0, size = 10) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    ProductService1.getAllProducts(page, size)
      .then((data) => {
        if (mounted && data.status === 200) {
          setProducts(data.result.content); // ✅ luôn đúng type
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Error fetching products");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [page, size]);

  return { products, error, isLoading };
};
