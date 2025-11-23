// 1970년 1월 1일과 1970년 1월 2일의 차이를 초로 나타내시오.
const d1 = new Date(1970, 0, 1, 9);
const d2 = new Date(1970, 0, 2, 9);
console.log(`${(d2 - d1) / 1000}초`);

// 자스에서 날짜는 ms라 위처럼 출력해도 가능
console.log((d2.getTime() - d1.getTime()) / 1000);

// console.log("🚀 ~ d1:", d1);
// console.log("🚀 ~ d2:", d2);

// 이 달의 날짜 5개를 무작위로 만들어 역순으로 출력하시오.
const d3 = new Date();
d3.setMonth(d3.getMonth() + 1);
d3.setDate(0);

// moment.js 존재함
const lastday = d3.getDate();
console.log('🚀 ~ lastday:', lastday);

const rand = (s, e) => s + Math.floor((e - s + 1) * Math.random());

// const dates = Array.from({length:5}, _ =>rand(1,lastday));
const dates = [];
do {
  const r = rand(1, lastday);
  if (!dates.includes(r)) dates.push(r);
} while (dates.length < 5);

dates.sort((a, b) => (a > b ? 1 : -1)).reverse();
console.log('🚀 ~ dates:', dates);

// 날짜 함수 굉장히 무거움
const ym = `${d3.getFullYear()}-${d3.getMonth() + 1}`;

dates.forEach((d) => console.log(`${ym}-${d.toString().padStart(2, '0')}`));

// 내년(2026년) 오늘의 요일을 출력하시오.
const d4 = new Date();
d4.setFullYear(d4.getFullYear() + 1);
const fmtWeek = new Intl.DateTimeFormat('ko-KR', {
  weekday: 'long',
});

console.log('1년 후, ', fmtWeek.format(d4));

// 오늘로부터 100일 후의 날짜는?
const d5 = new Date();
d5.setDate(d5.getDate() + 100);

const fmtFull = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  weekday: 'long',
});

console.log('100일 후, ', fmtFull.format(d5));
