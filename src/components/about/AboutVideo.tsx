"use client";

import React from "react";

function toEmbedUrl(url: string) {
  // hỗ trợ dạng youtu.be/xxxx hoặc youtube.com/watch?v=xxxx
  try {
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("watch?v=")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch {}
  return url;
}

export default function AboutVideo({ youtubeUrl }: { youtubeUrl: string }) {
  const src = toEmbedUrl(youtubeUrl);

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="relative w-full aspect-video">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title="About video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
