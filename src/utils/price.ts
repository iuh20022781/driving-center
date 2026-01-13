// Định dạng giá tiền: 100000 -> "100.000"
export const formatPrice = (price: number): string => {
  if (!price) return "0";
  return new Intl.NumberFormat("vi-VN").format(price);
};

// Tính % giảm giá
export const getDiscountPercent = (
  price?: number,
  discountPrice?: number
): number | null => {
  if (!price || !discountPrice) return null;
  return Math.round(((price - discountPrice) / price) * 100);
};
