import { StaticImageData } from "next/image";

export function normalizeImage(
  image?: string | StaticImageData
): string | null {
  if (!image) return null;

  if (typeof image === "object" && "src" in image) {
    return image.src as string;
  }

  if (typeof image === "string") {
    // Cloudinary hoặc CDN (bắt đầu bằng http/https)
    if (/^https?:\/\//.test(image)) return image;

    // ảnh local (public/images)
    if (image.startsWith("//src/assets/images/web_logo.png")) return image;

    return `/images/${image}`;
  }

  return null;
}
