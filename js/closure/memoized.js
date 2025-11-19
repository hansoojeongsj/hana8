const memoizedTable = {};
// {2: 2 * 1}
// {3: 3 * f(2)} => {3: 3 *2}
// => {3: 6, 2: 2}

let runCnt = 0;
function factorial(n) {
  runCnt++;
  if (n === 1) return 1;
  return memoizedTable[n] ?? (memoizedTable[n] = n * factorial(n - 1));
}

console.log(factorial(3), runCnt);
runCnt = 0;
console.log(factorial(5), runCnt);
runCnt = 0;
console.log(factorial(10), runCnt);

console.log('------------------------');
// esm 아니고 cjs 방식으로 assert 사용
const assert = require('assert');

function memoized(fn) {
  const cache = {};
  return function (k) {
    return cache[k] ?? (cache[k] = fn(k));
  }; // function (k) {...} -> 클로저
}

// function facto(k) {
//   return k;
// }

const memoizedFactorial = memoized(function facto(k) {
  runCnt++;
  if (k === 1) return 1;
  return k * memoizedFactorial(k - 1);
});

console.log('------memozied------');
runCnt = 0;
console.log(memoizedFactorial(3), runCnt);
runCnt = 0;
console.log(memoizedFactorial(5), runCnt);
runCnt = 0;
console.log(memoizedFactorial(10), runCnt);

assert.strictEqual(memoizedFactorial(10), 3628800, 'xx');
// assert.strictEqual(memoizedFactorial(10), 3628801, 'xx');
// 오류

// assert
// 세 번째 인자인 message는 생략 가능.
// assert.equal(actual, expected, [message])
// -> 첫 번째 인자: 실제 결과
// -> 두 번째 인자: 기대 결과
// -> 세 번째 인자: 실패 시 출력할 메시지(선택 사항)

console.log('-------------------');
// 피보나치 수열을 1), 2), 3)에 따라 작성하시오.
// 수열의 규칙은 f(n) = f(n - 2) + f(n - 1)  (단, n <= 1 일 때 f(n) = n)
// 즉, 0 ~ 9까지의 값은 [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] 이다.

// 1) Loop를 이용하여 작성하시오.

function loopFibonacci(n) {
  if (n <= 1) return n;
  let prev = 0,
    curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

console.log(loopFibonacci(5)); // 5
console.log(loopFibonacci(7)); // 13

assert.equal(loopFibonacci(5), 5);
assert.equal(loopFibonacci(7), 13);
assert.equal(loopFibonacci(30), 832040);

// 2) 재귀함수만을 이용하여 작성하시오.

function recurFibonacci(n) {
  if (n <= 1) return n;
  return recurFibonacci(n - 1) + recurFibonacci(n - 2);
}

console.log(recurFibonacci(5)); // 5
console.log(recurFibonacci(7)); // 13

assert.equal(recurFibonacci(5), 5);
assert.equal(recurFibonacci(7), 13);
assert.equal(recurFibonacci(30), 832040);

// 3) memoized 함수를 이용하여 작성하시오.

const memo = {};

function memoFibonacci(n) {
  if (n <= 1) return n;
  return memo[n] ?? (memo[n] = memoFibonacci(n - 1) + memoFibonacci(n - 2));
}

console.log(memoFibonacci(5)); // 5
console.log(memoFibonacci(7)); // 13
console.log(memoFibonacci(30)); // 832040

assert.equal(memoFibonacci(5), 5);
assert.equal(memoFibonacci(7), 13);
assert.equal(memoFibonacci(30), 832040);

console.log('강사님 풀이 -------------------');
const assert = require('assert');

// 1)
assert.equal(loopFibonacci(5), 5);
assert.equal(loopFibonacci(7), 13);
assert.equal(loopFibonacci(30), 832040);

function loopFibonacci(n) {
  const seqs = [0, 1];
  for (let i = 2; i <= n; i++) {
    seqs.push(seqs[i - 2] + seqs[i - 1]);
  }
  return seqs[n];
}

console.log(loopFibonacci(5)); // 5
console.log(loopFibonacci(7)); // 13

// 2)

assert.equal(recurFibonacci(5), 5);
assert.equal(recurFibonacci(7), 13);
assert.equal(recurFibonacci(30), 832040);

function recurFibonacci(n) {
  if (n <= 1) return n;
  return recurFibonacci(n - 2) + recurFibonacci(n - 1);
}

console.log(recurFibonacci(5)); // 5
console.log(recurFibonacci(7)); // 13

// 3)

const memoFibonacci = memoized(function (n) {
  if (n <= 1) return n;
  return memoFibonacci(n - 2) + memoFibonacci(n - 1);
});

assert.equal(memoFibonacci(5), 5);
assert.equal(memoFibonacci(7), 13);
assert.equal(memoFibonacci(30), 832040);

function memoized(fn) {
  const cache = {};
  return function (n) {
    return cache[n] ?? (cache[n] = fn(n));
  };
}

// 검증
// 좋은 방법
function runFn(fn) {
  console.time(fn.name || 'memoFibonacci');
  for (let i = 10; i < 100; i += 10) {
    fn(i);
  }
  console.timeEnd(fn.name || 'memoFibonacci');
}
runFn(loopFibonacci);
// runFn(recurFibonacci); // 재귀함수 성능 안 좋아서 memoized 사용해야
runFn(memoFibonacci);

// 검증(은 되겠지만 좋지 못한 방법)

console.time('loopFibo');

// ...
loopFibonacci(10);
loopFibonacci(50);
loopFibonacci(100);

console.timeEnd('loopFibo');

//
console.time('loopFibo');

// ...
memoFibonacci(10);
memoFibonacci(50);
memoFibonacci(100);

console.timeEnd('loopFibo');

// ------------------------
