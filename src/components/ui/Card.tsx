import { ReactNode } from 'react';
import { clsx } from 'clsx';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl bg-white shadow-sm border border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: ReactNode }) {
  return (
    <div className="border-b px-4 py-3 font-semibold">
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="px-4 py-3">{children}</div>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return (
    <div className="border-t px-4 py-3 text-sm text-gray-600">
      {children}
    </div>
  );
}
