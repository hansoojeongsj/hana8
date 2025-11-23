function sum100() {
  let sum = 0;
  for (let i = 1; i <= 100; i++) sum += i;
  return sum;
}

console.log('sum100>>', sum100);

function sum100recur(n = 1) {
  if (n === 1) return n;

  return n + sum100recur(n + 1);
  // 1+2+3+4+...+99+100
}

console.log('sum100>>', sum100);

console.log('------------------------');

function factorial(n) {
  let ret = 1;
  while (n > 1) {
    ret *= n;
    n--;
  }
  return ret;
}

console.log('🚀 ~ factorial:', factorial(5));

console.log('------------------------');

function factorialRecur(n) {
  if (n === 1) return n;
  return n * factorialRecur(n - 1);
}

console.log('🚀 ~ factorialRecur:', factorialRecur(5));

console.log('------------------------');
// TCO? Tail Call Optimization
// => 함수의 마지막 retutn문이 함수자신만 존재!

function factorialTCO(n, acc = 1) {
  if (n === 1) return acc;
  return factorialTCO(n - 1, acc * n);
  // f(5, 1) -> f(4, 5) -> f(3, 5*4) -> f(2, 5*4*3)
}

console.log('🚀 ~ factorialTCO:', factorialTCO(5));

console.log('------------------------');

function makeArray(n) {
  if (n === 1) return [1];
  return [...makeArray(n - 1), n];
}

console.log('🚀 ~ makeArray:', makeArray(10));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 역순
function makeReverseArray(n) {
  if (n === 1) return [1];
  return [n, ...makeReverseArray(n - 1)]; // 구조분해로 앞쪽 추가
}

console.log('🚀 ~ makeReverseArray:', makeReverseArray(5).reverse());

// TCO
function makeArrayTCO(n, acc = []) {
  if (n === 0) return acc;
  return makeArrayTCO(n - 1, [n, ...acc]); // 마지막에 호출만 남음 => 꼬리 재귀
}

console.log('🚀 ~ makeArrayTCO:', makeArrayTCO(10));
// [10] -> [9, ...[10]] -> [8, ...[9, 10]];
// makeArrayTCO(2, [3]);
// makeArrayTCO(1, [2, ...[3]]);

console.log('------------------------');
// 강사님 풀이(Loop)
const m10 = makeArrayLoop(10);

function makeArrayLoop(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i + 1);
  }
  return arr;
}

console.log('🚀 ~ m10:', m10);
