// types/user.d.ts

export interface Role {
  id: number;
  name: string; // ví dụ: "ADMIN" | "USER"
}

export interface Order {
  // Define the properties of an Order here
  orderId: string;
  orderDate: string;
  status: string;
  // Add more fields as needed
}

export interface Address {
  addressId: number;
  addressLine1: string;
  addressLine2?: string | null;
  province: string;
  district: string;
  ward: string;
  city?: string | null;
  isDefault: boolean;
}

export interface Blog {
  // Define the properties of a Blog here
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string | null;
  // Add more fields as needed
}

export interface CartItem {
  // Define the properties of a CartItem here
  id: string;
  name: string;
  quantity: number;
  price: number;
  // Add more fields as needed
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
  // Add more fields as needed
}

export type SexStatus = "MALE" | "FEMALE" | "OTHER";
// tùy enum trong backend

export type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED";
// mapping từ enum UserStatus

export interface User {
  avatar(avatar: any): unknown;
  userId: string;
  userName: string;
  email: string;
  emailVerified: boolean | string; // Backend trả về string "false"/"true"
  password?: string | null;
  imageUrl?: string | null;
  phoneNumber?: string | null;
  name: string;
  sex?: SexStatus | null;
  birthday?: string | null; // LocalDateTime → string ISO
  blogs?: Blog[];
  orders?: Order[];
  cartItems?: CartItem[];
  userStatus: UserStatus;
  notifications?: Notification[];
  createdAt: string | null; // Backend có thể trả về null
  updatedAt: string | null; // Backend có thể trả về null
  addresses: Address[];
  emailVerificationCodes?: string[]; // Replace 'string' with a more specific type if needed
  orders?: Order[];
  blogs?: Blog[];
  role?: Role;
  phoneNumber?: string;
  cartItems?: CartItem[];
  notifications?: Notification[];
  countCart?: number;
}
