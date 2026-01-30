export function formatVnd(n: number) {
    return new Intl.NumberFormat("vi-VN").format(n) + "đ";
  }
  