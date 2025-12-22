'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SayHello from './SayHello';

export default function HelloPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const router = useRouter();

  const make200 = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', `200`);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <h1>
        Hello Page: {id} - {pathname}
      </h1>
      <SayHello name={name ?? 'Next'} />
      <button onClick={make200}>make200</button>
    </>
  );
}
