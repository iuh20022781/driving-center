"use client";
import ClientPostDetailPage from "@/components/posts/ClientPostDetailPage";

export default function Page({ params }: { params: { slug: string } }) {
  return <ClientPostDetailPage slug={params.slug} />;
}
