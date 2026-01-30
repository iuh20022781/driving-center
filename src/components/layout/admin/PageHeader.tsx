"use client";

export default function PageHeader({
  title,
  breadcrumb,
  right
}: {
  title: string;
  breadcrumb?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        {breadcrumb && <div className="text-sm text-white/50 mb-1">{breadcrumb}</div>}
        <h1 className="text-3xl font-semibold text-white/90">{title}</h1>
      </div>
      {right}
    </div>
  );
}
