// 1번
console.log('1번-------------------------');
function p32() {
  for (let i = 0.1; i < 1; i += 0.1) {
    console.log(+i.toFixed(1));
  }
}
p32();

// for (let i = 0.1; i < 1; i += 0.1) {
//   console.log(Number(i.toFixed(1)));
// }

// 2번
console.log('2번-------------------------');

for (let x = 1; x <= 10; x++) {
  console.log(Math.sqrt(x));
}
// Math.sqrt() 없이
// for (let x = 1; x <= 10; x++) {
//   console.log(x ** 0.5);
// }

// 3번 문제
console.log('3번-------------------------');

const today = new Date();
const WEEK_NAMES = '일월화수목금토';
const dayIndex = today.getDay();
const dayName = WEEK_NAMES[dayIndex];

console.log(`오늘은 ${dayName}요일입니다.`);

// 3번 다른 풀이
// function getWeekName(date) {
//   function getWeekName() {
//     const date = arguments[0];
//     console.log("🚀 ~  date:", date);
//   }
// }
function getWeekName(date) {
  date = date || new Date();
  console.log('🚀 ~  date:', date);
  switch (date.getDay()) {
    case 0:
      weekName = '일';
      break;
    case 1:
      weekName = '월';
      break;
    case 2:
      weekName = '화';
      break;
    case 3:
      weekName = '수';
      break;
    case 4:
      weekName = '목';
      break;
    case 5:
      weekName = '금';
      break;
    case 6:
      weekName = '토';
      break;
  }
  console.log(`오늘은 ${weekName}요일입니다.`);
}

getWeekName();

// 또다른 3번
const WEEKNAMES = '일월화수목금토';
getWeekName2(new Date());

function getWeekName2(date) {
  const weekName = WEEKNAMES[(date ?? new Date()).getDay()];
  console.log(`오늘은 ${weekName}요일입니다.`);
}

// 또다른 3번
const WEEKNAMES2 = '일월화수목금토';
const getWN = (date) => WEEKNAMES2[(date ?? new Date()).getDay()];

console.log(`오늘은 ${getWN()}요일입니다.`);

// 4번
console.log('4번-------------------------');

console.log(0.21354 + 0.1);

function addPoints(a, b) {
  const aDecimal = (a.toString().split('.')[1] || '').length;
  const bDecimal = (b.toString().split('.')[1] || '').length;
  const maxDecimal = Math.max(aDecimal, bDecimal);
  const sum = a + b;

  console.log(sum.toFixed(maxDecimal));
}

// 나중에는 테스트문 짜서 할거임.
addPoints(0.21354, 0.1);
addPoints(0.143, -10.28);

// 강사님 1차 풀이
function addPoints(a, b) {
  const alen = pointLength(a);
  const blen = pointLength(b);
  // const ret = alen > blen ? (a + b).toFixed(alen) : (a + b).toFixed(alen);
  const ret = (a + b).toFixed(Math.max(alen, blen));
  console.log(a, b, '->', +ret);
}

function pointLength(num) {
  if (!num) return 0;
  return num.toString().length - Math.trunc(num).toString().length - 1; // 뒤쪽을 찾기 위해
}

// 5번
// 다음 소수 배열의 평균을 소수점 2자리까지 구해보세요.
// (단, toFixed 사용 금지.
// 정상적인 숫자가 아닌 경우는 평균에서 제외하세요! '0.5'는 숫자임)
console.log('5번-------------------------');

const prices = [
  10.34232323,
  15,
  'xxx',
  5.67899,
  null,
  20.9,
  1.005121,
  0,
  15.234,
  undefined,
  0.5,
];

// 숫자만 필터
const validNumbers = prices.filter((v) => typeof v === 'number' && !isNaN(v));

// 합계와 평균
const sum = validNumbers.reduce((acc, cur) => acc + cur, 0);
const avg = Math.round((sum / validNumbers.length) * 100) / 100;

console.log(avg); // 8.58

const prices2 = [
  10.34,
  19,
  'xxx',
  5.678,
  null,
  '20.9',
  1.005,
  0,
  undefined,
  0.5,
];

// 숫자로 변환 가능한 값만 포함
const validNumbers2 = prices2
  .map((v) => Number(v)) // 숫자로 변환
  .filter((v) => !isNaN(v)); // NaN 제외

const sum2 = validNumbers2.reduce((acc, cur) => acc + cur, 0);
const avg2 = Math.round((sum2 / validNumbers2.length) * 100) / 100;

console.log(avg2); // 8.2

// 강사님 풀이
const N = 1000000;

function avg(prices) {
  let cnt = 0;
  let sum = 0;

  for (const price of prices) {
    if (price === null || isNaN(price)) continue;
    sum += price * N * 100; // 소수점 깊어지면 100 곱해도 쓰레기값 생길 수도 있어서 그냥 더 큰 값 곱해줌.
    cnt++;
  }
  const ret = Math.trunc(sum / cnt / N) / 100;
  console.log('🚀 ~ ret:', ret);
}

// avg 함수 호출할때 N 아래에서
// N이 호이스팅은 됐지만 초기화가 되지 않았기 때문에,
avg([10.34, 19, 'xxx', 5.678, null, '20.9', 1.005, 0, undefined, 0.5]);

// 문자열 등 모든 타입 포함하려면?
// 내 추측.. isNaN(Number(price)) 으로 바꾸기
function avg(prices) {
  let cnt = 0;
  let sum = 0;

  for (const price of prices) {
    if (price === null || isNaN(Number(price))) continue;
    sum += price * N * 100; // 소수점 깊어지면 100 곱해도 쓰레기값 생길 수도 있어서 그냥 더 큰 값 곱해줌.
    cnt++;
  }
  const ret = Math.trunc(sum / cnt / N) / 100;
  console.log('🚀 ~ ret:', ret);
}
