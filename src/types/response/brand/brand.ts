import { StaticImageData } from "next/image";

export interface BrandResponse {
  brandId: number;
  brandName: string;
  originalName: string;
  imageUrl: StaticImageData | string;
}
