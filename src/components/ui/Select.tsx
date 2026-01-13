'use client';

import { SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type Option = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
};

export default function Select({
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <select
      className={clsx(
        'rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200',
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
