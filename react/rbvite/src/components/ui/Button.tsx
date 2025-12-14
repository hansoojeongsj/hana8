import type { PropsWithChildren } from 'react';

type Prop = PropsWithChildren<{
  onClick?: () => void;
  type?: 'reset' | 'submit';
  className?: string;
}>;

export default function Button({ onClick, type, className, children }: Prop) {
  return (
    <button type={type} className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
