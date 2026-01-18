// @/types/response/flash-sale/flash-sale.ts

export interface FlashSaleProductResponse {
  flashSaleProductId: number;
  quantityLimit: number;
  soldCount: number;
  discountPercent: number;
  flashSaleId: string | null;
  productId: string | null;
  productName: string;
}

export interface FlashSaleResponse {
  flashSaleId: string;
  flashSaleName: string;
  startDate: string; 
  endDate: string;
  products: FlashSaleProductResponse[];
}