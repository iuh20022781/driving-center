import Image from "next/image";

export default function CourseHero({
  imageSrc,
  imageAlt,
}: {
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      {/* ✅ ảnh vừa khung như mẫu: giữ tỉ lệ + cover */}
      <div className="relative h-[300px] w-full sm:h-[340px] lg:h-[360px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 460px, 100vw"
        />
      </div>
    </div>
  );
}
