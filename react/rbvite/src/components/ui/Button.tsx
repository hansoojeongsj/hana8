import type { PropsWithChildren } from 'react';

type Prop = PropsWithChildren<{
  onClick?: () => void;
  className?: string;
}>;

export default function Button({ onClick, className, children }: Prop) {
  return (
    <button
      className={`${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
