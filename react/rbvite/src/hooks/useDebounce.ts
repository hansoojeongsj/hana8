import { useEffect, useState } from 'react';
import { useTimeout } from './useTimer';

// timer 훅 활용해서 만들기
export function useDebounce<T>(state: T, delay: number, deps: unknown[] = []) {
  const [debounce, setDebounce] = useState(state);

  const { reset, clear } = useTimeout(() => {
    setDebounce(state);
  }, delay);

  useEffect(() => {
    reset();
    return clear;
  }, [state, ...deps]);

  return debounce;
}

/*
// timer 훅 없이 만들기 
export function useDebounceWithoutTimerHook<T>(state: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(state);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(state);
    }, delay);

    return () => clearTimeout(timer);
  }, [state, delay]);

  return debouncedValue;
}
*/

export function useThrottle<T>(state: T, delay: number, deps: unknown[] = []) {
  const [throttledValue, setThrottledValue] = useState<T>(state);
  const { timerRef, reset } = useTimeout(setThrottledValue, delay, state);
  useEffect(() => {
    if (timerRef.current) return;
    reset();
  }, [state, ...deps]);

  return throttledValue;
}

/*
// timer 훅 없이 만들기 
export function useThrottleWithoutTimerHook<T>(
  state: T,
  delay: number,
  deps: unknown[] = []
) {
  const [throttledValue, setThrottledValue] = useState<T>(state);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // latestRef.current = value;
  useEffect(() => {
    if (timerRef.current) return;

    timerRef.current = setTimeout(() => {
      setThrottledValue(state);
      timerRef.current = undefined;
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [state, ...deps]);

  return throttledValue;
}
*/

/**
 * ts 할 때 구현했던 코드
 *
 * debounce
 * - 마지막 입력 이후 delay가 지나면 실행
 * - 연속 호출 중 이전 호출은 모두 무시됨
 * - "멈췄을 때 한 번" 실행
 * 예: 검색 입력
 *
 * throttle
 * - delay 시간 동안 한 번만 실행
 * - 호출이 계속 들어와도 주기적으로 실행됨
 * 예: scroll, resize
 */

/*
const debounce = <T extends (...args: Parameters<T>) => void>(
  cb: T,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
};
*/

/*
const throttle = <T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout> | null;
  return (...args: T) => {
    if (timer) return;
    timer = setTimeout(() => {
      cb(...args);
      timer = null;
    }, delay);
  };
}; 
*/
