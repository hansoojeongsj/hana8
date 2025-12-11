import type { PropsWithChildren } from 'react';

export default function Small({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <small className={`text-gray-600 ${className}`}>{children}</small>;
}
