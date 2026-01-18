// src/types/request/wishlist/wishlist.ts

export type AddWishlistReq = Record<string, never>;

export type MoveToCartReq = Record<string, never>;


export type AddWishlistUrlParams = {
  productId: string;
};

export type MoveToCartUrlParams = {
  productId: string;
  quantity?: number; // truyền qua query string, KHÔNG đặt trong body
};
