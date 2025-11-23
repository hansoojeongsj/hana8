// 문자열이 한글 자음으로 끝나는지 체크하는 함수를 작성하시오.
function isEndJaum(a) {
  const last = a.slice(-1);
  const code = last.charCodeAt(0);

  // 한글
  if (code >= '가'.charCodeAt(0) && code <= '힣'.charCodeAt(0)) {
    if ((code - 16) % 28 === 0) {
      //   console.log("false");
      return false;
    } else {
      //   console.log("true");
    }
    return true;
  }

  // 자음
  if ('ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.includes(last)) {
    // console.log("true");
    return true;
  }

  // 모음
  if ('ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'.includes(last)) {
    // console.log("false");
    return false;
  }

  // 영어
  // 받침처럼 끝나는 자음
  if ('lLmMnNrR'.includes(last)) {
    // console.log("true");
    return true;
  }

  // 나머지 영어
  if ((last >= 'a' && last <= 'z') || (last >= 'A' && last <= 'Z')) {
    // console.log("false");
    return false;
  }

  // 숫자
  if ('136780'.includes(last)) {
    if (Number(last) % 2 === 1) {
      //   console.log("true");
      return true;
    }
  }

  // 기타
  //   console.log("false");
  return false;
}

// isEndJaum("강원도"); // false
// isEndJaum("바라당"); // true
// isEndJaum("ㅜㅜ"); // false
// isEndJaum("케잌"); // true
// isEndJaum("점수 A"); // false
// isEndJaum("알파벳L"); //true
// isEndJaum("24"); // false
// isEndJaum("23"); // true
// isEndJaum("27"); // true

const assert = require('assert');
assert.equal(isEndJaum('아지오'), false);
assert.equal(isEndJaum('북한강'), true);
assert.equal(isEndJaum('뷁'), true);
assert.equal(isEndJaum('강원도'), false);
assert.equal(isEndJaum('바라당'), true);
assert.equal(isEndJaum('ㅜㅜ'), false);
assert.equal(isEndJaum('케잌'), true);
assert.equal(isEndJaum('점수 A'), false);
assert.equal(isEndJaum('알파벳L'), true);
assert.equal(isEndJaum('24'), false);
assert.equal(isEndJaum('23'), true);

// 조사 '이/가, 을/를, 은/는'를 알아서 붙이는 함수를 작성하시오.
function iga(a) {
  return isEndJaum(a) ? '이' : '가';
}

function eunun(a) {
  return isEndJaum(a) ? '은' : '는';
}

function eulul(a) {
  return isEndJaum(a) ? '을' : '를';
}

// 이어야/여야
function eyuya(a) {
  return isEndJaum(a) ? '이어야' : '여야';
}
assert.equal(`고성군${iga('고성군')}`, '고성군이');
assert.equal(`고성군${eunun('고성군')}`, '고성군은');
assert.equal(`고성군${eulul('고성군')}`, '고성군을');
assert.equal(`성동구${iga('성동구')}`, '성동구가');
assert.equal(`성동구${eunun('성동구')}`, '성동구는');
assert.equal(`성동구${eulul('성동구')}`, '성동구를');
assert.equal(`고성군${eyuya('고성군')}`, '고성군이어야');
assert.equal(`성동구${eyuya('성동구')}`, '성동구여야');
