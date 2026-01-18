import images from "@/assets/images";
import { Order } from "@/types/Order/OrderType";
import { StaticImageData } from "next/image";
import { ShoppingCart, CheckCircle2, Truck, Package, Star } from "lucide-react";

// Fixed MockProduct interface với tất cả properties cần thiết
export interface MockProduct {
  id: string;
  name: string;
  description?: string;
  price: number; // giá gốc
  discountPrice?: number; // giá khuyến mãi (nếu có)
  salePrice?: number; // Direct từ API
  image: StaticImageData | string; // URL hoặc StaticImageData
  images?: string[]; // Multiple images support
  
  // Rating & Reviews - make required để tránh undefined
  rating: number; // Changed from optional to required
  reviews?: number; // ratingCount từ API
  ratingCount?: number; // Direct mapping từ API
  
  // Sales & Stock info
  sold?: number; // soldCount từ API  
  soldCount: number; // Changed from optional to required - direct mapping từ API
  quantity?: number; // Available quantity
  quantityLeft?: number; // Direct mapping từ API
  
  // Product metadata
  badge?: string;
  status?: string;
  slug?: string; // Added from API
  
  // Category & Brand info (từ API)
  categoryName?: string;
  brandName?: string;
  
  // Additional API fields
  productId?: string; // Direct mapping từ API
  expirationDate?: string;
  parentId?: string | null;
  productOptions?: MockProduct[]; // For variants
}

// Updated mockSaleProducts với required fields
export const mockSaleProducts: MockProduct[] = [
  {
    id: "1",
    name: "Tai nghe Bluetooth TWS Pro Max",
    price: 299000,
    discountPrice: 199000,
    image: images.product,
    rating: 4.8,
    reviews: 1200,
    sold: 3500,
    soldCount: 3500,
    badge: "Flash sale",
    status: "Còn hàng",
  },
  {
    id: "2",
    name: "Chuột Gaming Logitech G102 Gen2",
    price: 450000,
    discountPrice: 350000,
    image: images.product,
    rating: 4.6,
    reviews: 800,
    sold: 2200,
    soldCount: 2200,
    badge: "Flash sale",
    status: "Còn hàng",
  },
  {
    id: "3",
    name: "Bàn phím cơ Keychron K2",
    price: 1890000,
    discountPrice: 1590000,
    image: images.product,
    rating: 4.9,
    reviews: 540,
    sold: 1200,
    soldCount: 1200,
    badge: "Flash sale",
    status: "Còn hàng",
  },
  {
    id: "4",
    name: "Màn hình cong Samsung 27 inch 144Hz",
    price: 4990000,
    discountPrice: 4290000,
    image: images.product,
    rating: 4.7,
    reviews: 300,
    sold: 800,
    soldCount: 800,
    badge: "Flash sale",
    status: "Còn hàng",
  },
  {
    id: "5",
    name: "Laptop Asus ROG Zephyrus G14",
    price: 29900000,
    discountPrice: 27500000,
    image: images.product,
    rating: 4.9,
    reviews: 150,
    sold: 250,
    soldCount: 250,
    badge: "Flash sale",
    status: "Hết hàng",
  },
  {
    id: "6",
    name: "Ổ cứng SSD Samsung 1TB",
    price: 2490000,
    discountPrice: 1990000,
    image: images.product,
    rating: 4.8,
    reviews: 600,
    sold: 1800,
    soldCount: 1800,
    badge: "Flash sale",
    status: "Còn hàng",
  },
  {
    id: "7",
    name: "Webcam Logitech C920 HD Pro",
    price: 1290000,
    discountPrice: 990000,
    image: images.product,
    rating: 4.5,
    reviews: 400,
    sold: 900,
    soldCount: 900,
    badge: "Flash sale",
    status: "Còn hàng",
  },
  {
    id: "8",
    name: "Loa Bluetooth JBL Flip 5",
    price: 1590000,
    discountPrice: 1290000,
    image: images.product,
    rating: 4.6,
    reviews: 700,
    sold: 1600,
    soldCount: 1600,
    badge: "Flash sale",
    status: "Còn hàng",
  },
];

// Updated mockProducts với required fields
export const mockProducts: MockProduct[] = [
  {
    id: "1",
    name: "Tai nghe Bluetooth TWS Pro Max",
    price: 299000,
    discountPrice: 199000,
    image: images.productGr1995,
    rating: 4.8,
    reviews: 1200,
    sold: 3500,
    soldCount: 3500,
    badge: "Flash sale",
    status: "Còn hàng",
  },
  {
    id: "2",
    name: "Chuột Gaming Logitech G102 Gen2",
    price: 450000,
    discountPrice: 350000,
    image: images.productGr1995,
    rating: 4.6,
    reviews: 800,
    sold: 2200,
    soldCount: 2200,
    badge: "Bán chạy",
    status: "Còn hàng",
  },
  {
    id: "3",
    name: "Bàn phím cơ Keychron K2",
    price: 1890000,
    discountPrice: 1590000,
    image: images.productGr1995,
    rating: 4.9,
    reviews: 540,
    sold: 1200,
    soldCount: 1200,
    badge: "Hàng mới",
    status: "Còn hàng",
  },
  {
    id: "4",
    name: "Màn hình cong Samsung 27 inch 144Hz",
    price: 4990000,
    discountPrice: 4290000,
    image: images.productGr1995,
    rating: 4.7,
    reviews: 300,
    sold: 800,
    soldCount: 800,
    status: "Còn hàng",
  },
  {
    id: "5",
    name: "Laptop Asus ROG Zephyrus G14",
    price: 29900000,
    discountPrice: 27500000,
    image: images.productGr1995,
    rating: 4.9,
    reviews: 150,
    sold: 250,
    soldCount: 250,
    badge: "Hot deal",
    status: "Hết hàng",
  },
  {
    id: "6",
    name: "Ổ cứng SSD Samsung 1TB",
    price: 2490000,
    discountPrice: 1990000,
    image: images.productGr1995,
    rating: 4.8,
    reviews: 600,
    sold: 1800,
    soldCount: 1800,
    badge: "Bán chạy",
    status: "Còn hàng",
  },
  {
    id: "7",
    name: "Webcam Logitech C920 HD Pro",
    price: 1290000,
    discountPrice: 990000,
    image: images.productGr1995,
    rating: 4.5,
    reviews: 400,
    sold: 900,
    soldCount: 900,
    status: "Còn hàng",
  },
  {
    id: "8",
    name: "Loa Bluetooth JBL Flip 5",
    price: 1590000,
    image: images.productGr1995,
    rating: 4.6,
    reviews: 700,
    sold: 1600,
    soldCount: 1600,
    badge: "Flash Sale",
    status: "Còn hàng",
  },
  {
    id: "9",
    name: "Balo laptop chống nước Targus",
    price: 890000,
    image: images.productGr1995,
    rating: 4.4,
    reviews: 250,
    sold: 600,
    soldCount: 600,
    status: "Còn hàng",
  },
  {
    id: "10",
    name: "Đế tản nhiệt laptop Cooler Master",
    price: 590000,
    image: images.productGr1995,
    rating: 4.3,
    reviews: 150,
    sold: 400,
    soldCount: 400,
    status: "Còn hàng",
  },
];

// Keep existing orders and orderSteps unchanged
export const orders: Order[] = [
  {
    id: "1",
    status: "delivered",
    statusLabel: "Giao hàng thành công",
    product: {
      name: "Tai nghe Bluetooth Inpods 12 - Cảm biến vân tay, chống nước, màu sắc đa dạng - 5 màu sắc lựa chọn - Màu trắng",
      shop: "Công Nghệ Việt",
      price: "77.200 ₫",
      total: "54.040 ₫",
      image: images.productGr1995,
    },
  },
  {
    id: "2",
    status: "pending",
    statusLabel: "Chờ thanh toán",
    product: {
      name: "Bàn phím cơ Akko 3068B Plus - Wireless, RGB",
      shop: "Akko Store",
      price: "2.190.000 ₫",
      total: "2.190.000 ₫",
      image: images.product,
    },
  },
  {
    id: "3",
    status: "processing",
    statusLabel: "Đang xử lý",
    product: {
      name: "Chuột Logitech G102 Lightsync - Black",
      shop: "Logitech Flagship",
      price: "299.000 ₫",
      total: "299.000 ₫",
      image: images.productGr1995,
    },
  },
  {
    id: "4",
    status: "shipping",
    statusLabel: "Đang vận chuyển",
    product: {
      name: "Màn hình Samsung 24 inch Full HD 75Hz",
      shop: "Samsung Official",
      price: "2.990.000 ₫",
      total: "2.990.000 ₫",
      image: images.product,
    },
  },
  {
    id: "5",
    status: "delivered",
    statusLabel: "Đã giao",
    product: {
      name: "Ổ cứng SSD Kingston NV2 NVMe PCIe Gen 4 - 1TB",
      shop: "Kingston VN",
      price: "1.290.000 ₫",
      total: "1.290.000 ₫",
      image: images.productGr1995,
    },
  },
  {
    id: "6",
    status: "cancelled",
    statusLabel: "Đã huỷ",
    product: {
      name: "Loa Bluetooth JBL Go 3 - Màu đỏ",
      shop: "JBL Official",
      price: "890.000 ₫",
      total: "0 ₫",
      image: images.product,
    },
  },
];

export const orderSteps = [
  { label: "Đơn Hàng Đã Đặt", time: "19:59 28-04-2025", icon: ShoppingCart },
  {
    label: "Đã Xác Nhận Thanh Toán",
    time: "20:29 28-04-2025",
    icon: CheckCircle2,
  },
  { label: "Đã Giao Cho ĐVVC", time: "09:46 29-04-2025", icon: Truck },
  { label: "Đã Nhận Được Hàng", time: "10:46 30-04-2025", icon: Package },
  { label: "Đơn Hàng Đã Hoàn Thành", time: "", icon: Star },
];