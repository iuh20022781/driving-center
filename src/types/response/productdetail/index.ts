// Product Image Response từ API
export interface ProductImageRes {
  imageId: number;
  imageUrl: string;
  thumbnail: boolean;
}

// Product Response từ API
export interface ProductResponseRes {
  productId: string;
  productName: string;
  description?: string;
  price: number;
  quantity: number;
  status: string;
  slug: string;
  productImages: ProductImageRes[];
  expirationDate?: string;
  parentId?: string | null;
  brandId?: number;
  categoryId?: number;
  categoryName: string;
  brandName: string;
  rating: number;
  ratingCount: number;
  soldCount: number;
  salePrice?: number;
  quantityLeft: number;
  productOptions: ProductOption[]; // ← Array of full Product objects
}

// Product Option Response từ API
export interface ProductOption {
  productId: string;              // ← THÊM
  productName: string;
  description?: string;           // ← THÊM
  price: number;                  // ← THÊM
  quantity: number;               // ← THÊM
  status: string;                 // ← THÊM
  slug: string;                   // ← THÊM
  productImages: ProductImageRes[]; // ← THÊM
  expirationDate?: string;        // ← THÊM
  parentId?: string;              // ← THÊM (ID của parent product)
  brandId?: number;               // ← THÊM
  categoryId?: number;            // ← THÊM
  categoryName?: string;          // ← THÊM
  brandName?: string;             // ← THÊM
  rating?: number;                // ← THÊM
  ratingCount?: number;           // ← THÊM
  soldCount?: number;             // ← THÊM
  salePrice?: number;             // ← THÊM
  quantityLeft?: number;          // ← THÊM
  productOptions?: ProductOption[]; // ← Nested variants (thường rỗng cho child)
  
  // Legacy fields (nếu cần tương thích)
  optionId?: string;
  optionName?: string;
  optionValue?: string;
}

export type Product = ProductResponseRes;
export type ProductVariant = ProductOption;

// API Response wrapper
export interface ApiResponse<T> {
  status: number;
  message: string;
  result: T;
  timestamp: number;
}

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface ProductListResponse {
  content: Product[];
  page: PageInfo;
}