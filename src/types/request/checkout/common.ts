// Các kiểu dùng chung giữa request/response

/** Thông tin khách hàng ở trang checkout */
export type CheckoutCustomer = {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  address: string;
};

/** Một dòng hàng trong giỏ/đơn */
export type CheckoutItem = {
  id: string;
  name: string;
  price: number; // VND
  qty: number;
};

/** Phương thức thanh toán khả dụng */
export type PaymentMethod = {
  id: string;          // 'COD' | 'CARD' | 'VNPay' ...
  name: string;        // nhãn hiển thị
  description?: string;
};
