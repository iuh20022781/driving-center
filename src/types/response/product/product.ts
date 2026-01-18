// Import MockProduct type from your existing file
import { MockProduct } from "@/data/mockProducts";
import { StaticImageData } from "next/image";
import { ProductOption } from "../productdetail";

// Interface cho ProductImage
export interface ProductImage {
  id?: string;
  imageUrl: string | StaticImageData; 
  isPrimary?: boolean;
}

// Interface chính cho Product theo ProductResponse từ backend
export interface Product {
  productId: string;
  productName: string;
  description?: string;
  price: number;
  quantity: number;
  status: string;
  slug: string;
  productImages: ProductImage[];
  expirationDate?: string;
  parentId?: string;

  // Thông tin liên kết
  categoryName: string;
  brandName: string;

  // Thông tin tính toán
  rating: number;
  ratingCount: number;
  soldCount: number;
  salePrice: number;
  quantityLeft: number;

  // Product options (variants)
  productOptions?: ProductOption[];
}

// Interface cho response có phân trang
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

// Interface cho API response wrapper
export interface ApiResponse<T> {
  status?: number;
  message?: string;
  result: T;
}

// Enum cho product status
export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  DISCONTINUED = "DISCONTINUED",
}

// Interface cho product search/filter params
export interface ProductSearchParams {
  name?: string;
  categoryId?: number;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
  page?: number;
  size?: number;
}

// Utility function để convert Product từ API sang MockProduct format
export const convertToMockProduct = (product: Product): MockProduct => {
  // Lấy ảnh chính hoặc ảnh đầu tiên, nếu không có thì dùng ảnh mặc định
  const primaryImage = product.productImages?.find((img) => img.isPrimary);
  const defaultImage = product.productImages?.[0];
  const imageUrl = primaryImage?.imageUrl || defaultImage?.imageUrl;

  // Xác định badge dựa trên giá sale và status
  let badge: string | undefined;
  if (product.salePrice < product.price) {
    badge = product.salePrice <= product.price * 0.7 ? "Flash sale" : "Sale";
  }

  // Xác định status hiển thị
  const getDisplayStatus = (status: string, quantityLeft: number): string => {
    switch (status) {
      case "ACTIVE":
        return quantityLeft > 0 ? "Còn hàng" : "Hết hàng";
      case "INACTIVE":
        return "Tạm ngưng";
      case "OUT_OF_STOCK":
        return "Hết hàng";
      case "DISCONTINUED":
        return "Ngưng kinh doanh";
      default:
        return "Không xác định";
    }
  };

  return {
    id: product.productId,
    name: product.productName,
    price: product.price,
    discountPrice:
      product.salePrice !== product.price ? product.salePrice : undefined,
    image: imageUrl,
    badge: badge,
    rating: product.rating || 0,
    reviews: product.ratingCount || 0,
    sold: product.soldCount || 0,
    soldCount: product.soldCount || 0,
    status: getDisplayStatus(product.status, product.quantityLeft),
  };
};