"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
};

export default function SelectDark<T extends string>({
  value,
  onChange,
  options,
  placeholder,
  className,
  disabled,
}: {
  value: T;
  onChange: (v: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const current = React.useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  // ✅ click outside => close
  React.useEffect(() => {
    function onDocDown(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  // ✅ esc => close
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // ✅ if value changes from parent => close (prevents “stuck open”)
  React.useEffect(() => {
    setOpen(false);
  }, [value]);

  function pick(opt: SelectOption<T>) {
    onChange(opt.value);
    // ✅ CLOSE IMMEDIATELY
    setOpen(false);
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((s) => !s)}
        className={cn(
          "w-full rounded-xl px-3 py-2 text-sm text-white/90 outline-none transition border",
          "bg-black/25 border-white/10 hover:border-white/20",
          "focus:ring-4 focus:ring-[rgba(255,77,166,0.18)] focus:border-white/25",
          disabled && "opacity-60 cursor-not-allowed"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex items-center justify-between gap-2">
          <span className={cn(!current && "text-white/40")}>
            {current?.label || placeholder || "—"}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-white/60 transition",
              open && "rotate-180"
            )}
          />
        </div>
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border",
            "bg-[rgb(15,19,26)] border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          )}
          role="listbox"
        >
          <div className="max-h-64 overflow-auto py-1">
            {options.map((opt) => {
              const active = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => pick(opt)} // ✅ pick + close
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm transition",
                    active
                      ? "bg-pink-500/15 text-white"
                      : "text-white/85 hover:bg-white/5",
                    "focus:outline-none focus:bg-pink-500/15"
                  )}
                  role="option"
                  aria-selected={active}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
