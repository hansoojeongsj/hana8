import { use } from 'react';

type Props = {
  params: Promise<{ time: 'morning' | 'afternoon' | 'evening' }>;
};
export default function page({ params }: Props) {
  const { time } = use(params);
  return <div>Good {time}!</div>;
}
