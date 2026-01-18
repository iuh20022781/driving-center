// /src/types/response/productdetail.ts
export type ProductImageRes = {
  id: string;
  url: string;
  isPrimary?: boolean;
};

export type ProductResponseRes = {
  productId: string;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  status: string;
  slug: string;
  productImages: ProductImageRes[];
  expirationDate: string;
  categoryId: number;
  brandId: number;
  parentId: string;
};
