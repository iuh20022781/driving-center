export type ProductImageType = {
  imageId: number;
  imageUrl: string;
  thumbnail: boolean;
};

export type ProductType = {
  productId: string;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  status: string;
  slug: string;
  productImages: ProductImageType[];
  expirationDate: string;
  categoryId: number;
  brandId: number;
  parentId?: string;
};
