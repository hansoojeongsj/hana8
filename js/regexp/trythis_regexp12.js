// 오른 쪽과 같은 형태로 출력하는 fmt 함수를 작성하시오.
// 주문합계: 45000원
// 세액합계:  4500원

const total = { price: 45000, vat: 4500 };
console.log(fmt`주문합계: ${total.price}원`);
console.log(fmt`세액합계: ${total.vat}원`);

function fmt(strings, ...values) {
  let result = strings[0];
  values.forEach((v, i) => {
    if (typeof v === "number") v = String(v).padStart(6, " ");
    result += v + strings[i + 1];
  });
  return result;
}

// trythis: 대문자 <-> 소문자
swapCase("abc Senior Coding Learning JS");

function swapCase(a) {
  const uppers = a.match(/[A-Z]/g) || [];

  let replaced = a.replace(/[A-Z]/g, "#");
  let lowers = replaced.toUpperCase();
  let result = "";
  let index = 0;

  for (const ch of lowers) {
    if (ch === "#") {
      const original = uppers[index++];
      const processed = original.toLowerCase();
      result += processed;
    } else {
      result += ch;
    }
  }

  return result;
}

swapCase("abc Senior Coding Learning JS");

function swapCase(a) {
  const arr = a.split("");
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= "a" && arr[i] <= "z") {
      result += arr[i].toUpperCase();
    } else if (arr[i] >= "A" && arr[i] <= "Z") {
      result += arr[i].toLowerCase();
    } else {
      result += arr[i];
    }
  }
  return result;
}

const assert = require("assert");

assert.equal(
  swapCase("Senior Coding Learning JS"),
  "sENIOR cODING lEARNING js"
);
assert.equal(swapCase("Hanaro 8 Class"), "hANARO 8 cLASS");

// 전화번호를 정확한 형식으로 출력하는 함수를 작성하시오.

// 8자리 -> 4,4
// 9 -> 2,3,4
// 10 -> 010인 경우(3,3,4)와 아닌 경우(2,4,4)
// 11 자리 -> 3,4,4
// 12자리 -> 4,4,4

// 방법 1
function telfmt(a) {
  // 8자리 → 4-4
  if (a.length === 8) {
    return a.slice(0, 4) + "-" + a.slice(4);
  }

  // 9자리 → 2-3-4
  if (a.length === 9) {
    return a.slice(0, 2) + "-" + a.slice(2, 5) + "-" + a.slice(5);
  }

  // 10자리
  if (a.length === 10) {
    if (a.startsWith("02")) {
      // 02 시작 → 2-4-4
      return a.slice(0, 2) + "-" + a.slice(2, 6) + "-" + a.slice(6);
    } else {
      // 그 외 → 3-3-4
      return a.slice(0, 3) + "-" + a.slice(3, 6) + "-" + a.slice(6);
    }
  }

  // 11자리 → 3-4-4
  if (a.length === 11) {
    return a.slice(0, 3) + "-" + a.slice(3, 7) + "-" + a.slice(7);
  }

  // 12자리 → 4-4-4
  if (a.length === 12) {
    return a.slice(0, 4) + "-" + a.slice(4, 8) + "-" + a.slice(8);
  }

  // 나머지 그냥 리턴
  return a;
}

// 방법 2
function telfmt(a) {
  const len = a.length;

  // 1588, 1688 등 (4-4)
  if (/^1\d{3}/.test(a)) {
    const h = a.slice(0, 4);
    const b = a.slice(4);
    return `${h}-${b}`;
  }

  // 02 → (2-3-4)(2-4-4)
  if (a.startsWith("02")) {
    const b = a.slice(2);

    if (b.length === 7) return `02-${b.slice(0, 3)}-${b.slice(3)}`; // 9자리 전체
    if (b.length === 8) return `02-${b.slice(0, 4)}-${b.slice(4)}`; // 10자리 전체
  }

  // 0507 (4-4-4)
  if (a.startsWith("0507")) {
    return `${a.slice(0, 4)}-${a.slice(4, 8)}-${a.slice(8)}`;
  }

  // 070 (3-4-4)
  if (a.startsWith("070")) {
    return `${a.slice(0, 3)}-${a.slice(3, 7)}-${a.slice(7)}`;
  }

  // 010 → (3-4-4)(3-3-4)
  if (a.startsWith("010")) {
    const b = a.slice(3);

    if (b.length === 7) return `010-${b.slice(0, 3)}-${b.slice(3)}`; // 10자리
    if (b.length === 8) return `010-${b.slice(0, 4)}-${b.slice(4)}`; // 11자리
  }

  // 031, 033 등 → 3-(3 or 4)-4
  if (/^0\d{2}/.test(a)) {
    const h = a.slice(0, 3);
    const b = a.slice(3);

    if (b.length === 7) return `${h}-${b.slice(0, 3)}-${b.slice(3)}`;
    if (b.length === 8) return `${h}-${b.slice(0, 4)}-${b.slice(4)}`;
  }

  // 7) 그 외(형식 불명) → 그대로 반환
  return a;
}

const assert = require("assert");

assert.deepStrictEqual(telfmt("0101234567"), "010-123-4567");

assert.deepStrictEqual(telfmt("01012345678"), "010-1234-5678");
assert.deepStrictEqual(telfmt("0212345678"), "02-1234-5678");
assert.deepStrictEqual(telfmt("021234567"), "02-123-4567");
assert.deepStrictEqual(telfmt("0331234567"), "033-123-4567");
assert.deepStrictEqual(telfmt("15771577"), "1577-1577");
assert.deepStrictEqual(telfmt("08012341234"), "080-1234-1234");

assert.deepStrictEqual(telfmt("07012341234"), "070-1234-1234");
assert.deepStrictEqual(telfmt("050712345678"), "0507-1234-5678");
