import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { TIMES } from './constants';

export default function HiLayout({ children }: PropsWithChildren) {
  return (
    <>
      <h1>Hi Layout</h1>
      <div className="flex gap-3">
        {TIMES.map((time) => (
          <Link key={time} href={`/hi/${time}`}>
            {time}
          </Link>
        ))}
      </div>
      <div className="border p-5 text-center">{children}</div>
    </>
  );
}
