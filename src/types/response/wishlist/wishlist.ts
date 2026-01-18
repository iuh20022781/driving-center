export type ApiResponse<T> = {
  status?: number;
  message?: string;
  result: T;
  timestamp?: number;
};

export type WishlistItem = {
  wishlistId: string;
  createdAt: string;
  moveToCart: boolean;
  productId: string; // <- dùng để fetch chi tiết sản phẩm
};

export type ListWishlistResp     = ApiResponse<WishlistItem[]>;
export type CreateWishlistResp   = ApiResponse<unknown>;
export type RemoveWishlistResp   = ApiResponse<string>;
export type RemoveAllWishlistResp= ApiResponse<string>;
export type MoveToCartResp       = ApiResponse<string>;
export type CountWishlistResp    = ApiResponse<number>;
