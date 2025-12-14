import type { PropsWithChildren } from 'react';
import Button from './ui/Button';

type Prop = PropsWithChildren<{
  name?: string;
  age?: number;
  // setCount: (cb: (c: number) => number) => void;
  plusCount: () => void;
}>;

export default function Hello({ name, children, age, plusCount }: Prop) {
  return (
    <div className='p-4 text-center border-2 border-pink-400 rounded-2xl'>
      <h2 className='text-2xl'>
        Hello, {name || 'guest'}
        {age && <small className='text-sm'>({age})</small>}
      </h2>
      <div>{children}</div>
      <Button onClick={() => plusCount()} className='font-bold'>
        count + 1
      </Button>
    </div>
  );
}
