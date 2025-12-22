// 'use client';

type Props = {
  params: Promise<{ id: number }>;
};

export default async function HelloId({ params }: Props) {
  // const { id } = useParams<{ id: string }>();
  const { id } = await params;
  return `HelloId is ${id}`;
}
