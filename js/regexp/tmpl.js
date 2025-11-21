const holiday = "한글날";
const month = 10;
const day = 9;
console.log(`${holiday}은 ${month}월 ${day}일입니다.`); // 한글날은 10월 9일입니다.
f`${holiday}은 ${month}월 ${day}일입니다.`; // Template Tag Function

// Template Literal Function
function f(txts, a, b, c) {
  console.log("txts>>", txts);
  console.log("a>>", a);
  console.log("b>>", b);
  console.log("c>>", c);
}

console.log("-----------------");

for (let i = 0; i < 100; i++) {
  const x = String.fromCharCode(i);
  console.log(i, "->", x);
  console.log(`BTS${String.fromCharCode(0)}`);
}

for (let i = "가".charCodeAt(0); i < "힣".charCodeAt(); i++) {
  console.log(i, String.fromCharCode(i), (i - 16) % 28);
}

console.log("------------");

const regexp = /senior|coding/gi;
if (regexp.test("Junior Developer")) console.log("OK1");
if (regexp.test("Senior Developer")) console.log("OK2");
if (regexp.test("JS Coding")) console.log("OK3"); //
if (regexp.test("JavaScript Coding")) console.log("OK4");

// OK3 출력 되지 않음

// g 플래그(global)가 있으면 정규식이 lastIndex(다음 검색 위치)를 기억함.
// 그래서 test()를 여러 번 호출하면 문자열 처음이 아니라
// 이전 매칭이 끝난 지점부터 다시 검색을 시작함.

// "Senior Developer"에서 "Senior" 찾고 lastIndex = 6 이 돼서,
// 다음 "JS Coding"은 index 6(ing 부분)부터 검사 → "coding" 못 찾음.
// 그 다음 "JavaScript Coding"은 index 6 이후에 "Coding" 있어서 OK4 출력됨.
