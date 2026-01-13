// Kiểm tra năm nhuận
export const isLeapYear = (y: number) => {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
};

// Tính số ngày trong tháng
export const getDaysInMonth = (m: number, y: number) => {
  if (!m) return 31;
  if (m === 2) {
    if (y && isLeapYear(y)) return 29;
    return 28;
  }
  if ([4, 6, 9, 11].includes(m)) return 30;
  return 31;
};

export function parseLdtToDate(ldt: string): Date {
  // hỗ trợ cả "YYYY-MM-DD HH:mm:ss" và "YYYY-MM-DDTHH:mm:ss" (+ đuôi .SSS...)
  const iso = ldt.replace(" ", "T");
  return new Date(iso);
}

// Chuyển ISO string -> { day, month, year }
export const parseBirthday = (isoString: string) => {
  if (!isoString) return { day: "", month: "", year: "" };

  const date = new Date(isoString);

  return {
    day: String(date.getUTCDate()), // "24"
    month: String(date.getUTCMonth() + 1), // "9"
    year: String(date.getUTCFullYear()), // "2025"
  };
};
