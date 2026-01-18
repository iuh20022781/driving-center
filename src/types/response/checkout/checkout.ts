/** Kết quả khi tạo đơn hàng */
export type CreateOrderResponse = {
  message: string;
  orderId: string;
  status: 'PENDING' | 'REQUIRES_PAYMENT' | 'CONFIRMED';
  payment?: {
    clientSecret?: string; // nếu cần thanh toán qua cổng thẻ
    redirectUrl?: string;  // nếu cần chuyển hướng
  };
};
