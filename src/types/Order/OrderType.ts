export interface Product {
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface OrderDetails {
  orderDetailsId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Address {
  addressId: string;
  street: string;
}

export interface Payment {
  paymentId: string;
  paymentMethod: string;
}

export interface Order {
  orderId: string;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  shippingAddress: Address;
  payment: Payment;
  orderDetails: OrderDetails[];
}
