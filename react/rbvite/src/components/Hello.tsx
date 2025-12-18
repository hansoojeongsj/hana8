import { type PropsWithChildren } from 'react';
import { useCounter } from '../hooks/CounterContext';
import { useSession } from '../hooks/SessionContext';
import { useFetch } from '../hooks/useFetch';
import { useToggle } from '../hooks/useToggle';
import Btn from './ui/Btn';

export default function Hello({ children }: PropsWithChildren) {
  const { count, plusCount } = useCounter();
  // const [toggler, toggle] = useReducer((p) => !p, false);

  // useReducer -> custom Hook
  const [, toggle] = useToggle();
  const {
    session: { loginUser },
  } = useSession();
  const { name = 'Guest', age } = loginUser || {};

  const {
    data: user,
    isLoading,
    error,
  } = useFetch<{ username: string }>(
    `https://jsonplaceholder.typicode.com/users/${count + 1}`,
    [count]
  );

  // useEffect(() => {
  //   plusCount();
  //   // console.log('🚀 ~ count:', toggler);
  //   return () => minusCount();
  // }, [plusCount, minusCount, toggler]);
  // }, [plusCount, minusCount, count, toggler]);
  // 힙의 주소가 매번 바뀌는, useEffect가 계속 반복(여러번)
  // 함수를 memoized 하는 useCallback plusCount에 씌워줘야 함.
  // plus되면서 해당 파일의 count가 재설정됨, 그러면서 useEffect의 걸린 애들이 무한으로 루프를 탐.
  // useCounter가 다시 돌아서 이 파일로 와도 useEffect 내부는 돌지 않음.

  // (주의) 의존 관계 배열 지정 시 고려 사항 (cf. 19.2)
  // const primitive = 123;
  // useEffect(() => {
  //   console.log('effect primitive 123!!!');
  // }, [primitive]);
  // 스택에 값이 담김

  // useEffect(() => {
  //   const array = [1, 2, 3];
  //   console.log('effect Array!!!', array);
  // }, []);
  // 스택에 힙의 주소가 담김

  return (
    <div className='border border-red-300 p-3 text-center'>
      {error && <h2 className='text-red-500'>Error: {error}</h2>}
      <h2 className='text-2xl'>
        {count + 1}: {isLoading ? '...' : user?.username}
      </h2>
      <input type='text' onChange={toggle} />
      <h2 className='text-2xl'>
        Hello, {name}
        {age && <small className='text-sm'>({age})</small>}
      </h2>
      <div>{children}</div>
      <Btn className='font-bold' onClick={plusCount}>
        count + 1
      </Btn>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
