import { use } from 'react';
import { TIMES } from '../constants';

type Props = {
  params: Promise<{ time: 'morning' | 'afternoon' | 'evening' }>;
};

export const generateStaticParams = async () => TIMES.map((time) => ({ time }));

// export async function generateStaticParams() {
//   return [{ time: 'morning' }, { time: 'afternoon' }, { time: 'evening' }];
// }

export default function Hi({ params }: Props) {
  const { time } = use(params);
  return (
    <h1>
      Good <span className="capitalize">{time}</span>!
    </h1>
  );
}
