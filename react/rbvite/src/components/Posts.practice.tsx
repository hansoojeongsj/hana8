import { useActionState } from 'react';
import Btn from './ui/Btn';
import LabelInput from './ui/LabelInput';
import { Spinner } from './ui/Spinner';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Practice() {
  const [posts, searchAction, isPending] = useActionState<Post[], FormData>(
    async (_prev, formData) => {
      const userId = formData.get('userId') as string;

      if (!userId) return [];

      await new Promise((r) => setTimeout(r, 1000));

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );

      return res.json();
    },
    []
  );

  return (
    <div className='p-4 border rounded space-y-4 w-2xl'>
      <h2 className='text-xl'>Post List</h2>

      <form action={searchAction} className='flex gap-2 items-end'>
        <LabelInput
          label='userId'
          placeholder='ex) 1 ~ 10'
          autoComplete='off'
        />

        <Btn disabled={isPending}>search</Btn>
      </form>

      <ul className='space-y-2'>
        {!isPending &&
          posts.map((post) => (
            <li key={post.id} className='p-2 border rounded'>
              <h3 className='font-semibold'>
                {post.id}. {post.title}
              </h3>
              <p className='text-sm text-gray-600'>{post.body}</p>
            </li>
          ))}
      </ul>
      {isPending && <Spinner />}

      {!isPending && posts.length === 0 && (
        <p className='text-gray-400'>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
