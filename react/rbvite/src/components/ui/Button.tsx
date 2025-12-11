import type { PropsWithChildren } from 'react';

type Prop = PropsWithChildren<{
  onClick?: () => void;
  className?: string;
}>;

export default function Button({ onClick, className, children }: Prop) {
  return (
    <button
      className={`border py-1 px-2 rounded-md cursor-pointer hover:bg-gray-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
