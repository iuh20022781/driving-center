// utils/slugify.ts
export function slugify(str: string): string {
  return str
    .normalize("NFD") // loại bỏ dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-") // khoảng trắng thành -
    .replace(/-+/g, "-");
}
