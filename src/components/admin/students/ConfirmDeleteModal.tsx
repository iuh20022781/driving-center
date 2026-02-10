"use client";

import { cn } from "@/utils/cn";

export default function ConfirmDeleteModal({
  open,
  title,
  description,
  onClose,
  onConfirm,
  confirmText,
  cancelText,
}: {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 panel p-4">
        <div className="text-lg font-semibold text-white/90">{title}</div>
        <div className="mt-2 text-sm text-white/70">{description}</div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button className="btn-ghost" type="button" onClick={onClose}>
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-semibold text-white transition",
              "bg-red-500 hover:bg-red-500/90"
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
