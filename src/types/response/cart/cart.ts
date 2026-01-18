// cart.ts
import { User } from "../user/user";
import { Product } from "../product/product";

export interface Rating {
  ratingId: number;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
  ratings: Rating[]; // self-reference, use Rating[]
}

export interface Brand {
  brandId: number;
  brandName: string;
  originalName: string;
  imageUrl: string | null;
}

export interface CartItem {
  cartItemsId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface CartResponse {
  status: number;
  message: string;
  result: {
    content: CartItem[];
    page: PageInfo;
  };
  timestamp: number;
}
