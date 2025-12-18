import { useActionState, useEffect, useMemo, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useSession, type ItemType } from '../hooks/SessionContext';
import { useInterval } from '../hooks/useTimer';
import { Button } from './ui/Button';
import LabelInput from './ui/LabelInput';
import { Spinner } from './ui/Spinner';

/**
 * My Page (학습용 정리 버전)
 *
 * [정리 목적]
 * - React 18 핵심 훅 실습에 집중
 *   - useActionState / useFormStatus
 *   - useInterval 커스텀 훅
 *   - useMemo 파생 상태
 *
 * [제거된 것]
 * - useTransition / useDeferredValue 기반 검색
 * - debounce / throttle 검색
 * - Profile / Login / Item CRUD UI
 *
 * → UI 복잡도를 낮추고 Hook 동작 확인 위주로 정리
 */

export default function My() {
  const { session } = useSession();

  /**
   * =========================
   * Timer 예제
   * =========================
   * badSec  : cleanup 없는 setInterval (안티 패턴)
   * goodSec : useInterval 커스텀 훅 사용
   */
  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);

  // ❌ 의도적으로 cleanup을 하지 않은 예제
  // 렌더링/언마운트 시 문제 발생 가능
  useEffect(() => {
    setInterval(() => setBadSec((p) => p + 1), 1000);
  }, []);

  // ✅ 항상 최신 상태를 보장하는 updater 함수
  const tickGoodSec = () => {
    setGoodSec((p) => p + 1);
  };

  // cleanup + 제어(reset, clear)를 제공하는 커스텀 훅
  const { reset, clear } = useInterval(tickGoodSec, 1000);

  /**
   * =========================
   * 파생 상태 계산
   * =========================
   * - cart 변경 시에만 총합 재계산
   */
  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  /**
   * =========================
   * Action 기반 검색
   * =========================
   * - useActionState로 비동기 로직 처리
   * - useFormStatus로 pending 상태 분리
   *
   * 기존의 transition / debounce 검색 대신
   * "서버 액션 스타일" 흐름 학습용
   */
  const [results, search, isPending] = useActionState(
    async (preResults: ItemType[], formData: FormData) => {
      const str = formData.get('ActionState') as string;

      console.log('[ActionState]', preResults, str);

      // 네트워크 요청 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return session.cart.filter((item) => item.name.includes(str));
    },
    []
  );

  return (
    <>
      {/* Timer 출력 */}
      <h1 className='text-xl'>
        bad: {badSec}, good: {goodSec}
      </h1>

      {/* Timer 제어 */}
      <div className='flex space-x-3'>
        <Button
          variant='outline'
          onClick={() => {
            setGoodSec(0);
            reset();
          }}
        >
          reset
        </Button>
        <Button variant='secondary' onClick={clear}>
          stop
        </Button>
      </div>

      <hr />

      {/* 파생 상태 출력 */}
      <h2 className='text-xl'>Tot: {totalPrice.toLocaleString()}원</h2>

      {/* ActionState 결과 */}
      {isPending ? (
        <Spinner />
      ) : (
        <div>SR_ActionState :{results.map((item) => item.name).join()}</div>
      )}

      {/* 
        action={search} 대신
        버튼의 formAction으로 Action 분리
      */}
      <form className='flex gap-2 items-end'>
        <LabelInput label='ActionState' autoComplete='off' />
        <Button formAction={search}>Action</Button>
        <SearchButton />
      </form>
    </>
  );
}

/**
 * =========================
 * Form 상태 전용 버튼
 * =========================
 * - useFormStatus는 form 하위에서만 동작
 * - pending 상태 분리 목적
 */
function SearchButton() {
  const { pending, data } = useFormStatus();

  if (data) {
    console.log('[FormStatus]', data, pending);
  }

  return (
    <Button variant='secondary' disabled={pending}>
      SearchButton
    </Button>
  );
}
