// 초성 검색을 하는 search함수를 정규식을 이용하여 작성하시오.
const assert = require('assert');
const s = [
  '강원도 고성군',
  '고성군 토성면',
  '토성면 북면',
  '북면',
  '김1수',
  '홍길동',
];
const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const JA = '가까나다따라마바빠사싸아자짜차카타파하';
// '다'의 앞글자 -> 닣
const searchByKoreanInitialSound = (data, first) => {
  const reg = [...first].reduce((acc, a) => {
    const idx = CHO.indexOf(a);

    if (idx === -1) {
      return acc + a;
    }

    const ja = JA[idx];
    const e = JA[idx + 1].charCodeAt(0) - 1;
    return `${acc}[${a}${ja}-${String.fromCharCode(e)}]`;
  }, '');
  console.log('🚀 ~ reg:', reg);
  const regExp = new RegExp(reg);
  return data.filter((d) => regExp.test(d));
};

assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㄱㅇ'), [
  '강원도 고성군',
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㄱㅅㄱ'), [
  '강원도 고성군',
  '고성군 토성면',
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㅌㅅㅁ'), [
  '고성군 토성면',
  '토성면 북면',
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㅂㅁ'), [
  '토성면 북면',
  '북면',
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㅍㅁ'), []);
assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㄱ1ㅅ'), ['김1수']);

searchByKoreanInitialSound(s, 'ㄱㅅㄱ'); // /[ㄱ가-깋][ㅅ사-싷][ㄱ가-깋]/
searchByKoreanInitialSound(s, 'ㅌㅅㅁ');
searchByKoreanInitialSound(s, 'ㅂㅁ');
searchByKoreanInitialSound(s, 'ㅍㅁ');
searchByKoreanInitialSound(s, 'ㄱ1ㅅ');
