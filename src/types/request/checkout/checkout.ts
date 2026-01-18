// types/request/checkout/checkout.ts

export interface CreateOrderPayload {
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
  };
  items: Array<{
    id: string; // cartItemsId
    productId: string;
    name: string;
    price: number;
    qty: number;
  }>;
  couponCode: string | null;
  withWarranty: boolean;
  note: string;
  paymentMethod: "COD" | "BANKING";
  summary: {
    subTotal: number;
    discount: number;
    warrantyFee: number;
    shippingFee: number;
    tax: number;
    grandTotal: number;
  };
  // Thêm thông tin thẻ nếu thanh toán bằng thẻ
  cardInfo?: {
    cardNumber: string;
    expiry: string;
    cvv: string;
  };
}

// types/response/checkout/checkout.ts

export interface CreateOrderResponse {
  status: "SUCCESS" | "REQUIRES_PAYMENT" | "PENDING";
  message: string;
  orderId?: string;
  orderNumber?: string;
  payment?: {
    redirectUrl?: string;
    qrCode?: string;
  };
}