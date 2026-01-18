// types/order.ts
export interface OrderRequest {
  methodPayment: 'BANKING' | 'COD';
  productIds?: string[]; // ✅ Thêm field này
}

export interface OrderResponse {
  message: string; // ví dụ: "Đặt hàng thành công"
}
