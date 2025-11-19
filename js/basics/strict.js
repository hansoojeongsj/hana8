// "use strict";
// NaN = 9;
console.log('~ NaN', NaN);

function f() {
  console.log('ff');
}
// delete f;
f();

// 노드에서는 전역객체가 나오지 않음. 참조하지 않음 ?
console.log(this);

// 리액트의 함수를 function? 화살표함수?
function Component() {
  function f1() {} // 함수 선언문 (호이스팅 O)
  const f2 = () => {}; // 함수 표현식 (호이스팅 X)
  // 리액트는 strict 모드라 블록스코프 내부에서만 사용됨
}

// 강의 pdf 63페이지
('use strict');
var gg = 1; // 전역 스코프 (var → 전역 객체에 붙음)
let bb = 2; // 전역 스코프 (let → 전역 객체에 안 붙음)

function f1(x, y) {
  var gg = 11; // 함수 스코프
  let bb = 22; // 블록 스코프
  console.log('f1>', gg, bb, zz, f2, f2.length);
  // gg → 11 (함수 안의 var)
  // bb → 22 (현재 블록의 let)
  // zz → undefined (var zz가 선언만 되어 있고 아직 초기화 전, 호이스팅됨)
  // f2 → function f2(t, u, v) ... (함수 선언문은 호이스팅되어 마지막 선언이 유효)
  // f2.length → 3 (매개변수 개수)

  f2('* first'); // 여기서 실행되는 f2는 'inner2' 함수

  {
    const xx = 99; // 블록 스코프
    f2('* nest-first'); // 여전히 f2는 함수 스코프의 f2 (블록 안에서 새로 안 만들었음)
    var zz = 88; // var는 블록 무시 → 함수 전체에서 공유됨
    function f2(t) {
      console.log(t, '`nested`', xx, zz);
    }
  }

  // 위 블록 안의 f2는 함수 선언문이므로, 블록 안에 있어도 함수 레벨로 호이스팅됨 (비엄격 모드에서는)
  // 하지만 지금은 'use strict'라서 블록 스코프에 묶임!
  // → 즉, 위 { } 안의 f2는 블록 안에서만 유효

  function f2(t, u) {
    console.log(t, '`inner`', xx, zz);
  }

  function f2(t, u, v) {
    console.log(t, '`inner2`', xx, zz);
  }

  var zz = 800; // 같은 함수 스코프의 zz 갱신
  console.log('🚀  gg:', gg); // 11
  f2('* second'); // 'inner2' 함수 실행됨
}

f1();

// -------------------------------------------------------
// 🔍 정리
// 1. var → 함수 레벨 스코프 (블록 무시)
// 2. let/const → 블록 레벨 스코프
// 3. 'use strict' 모드에서는 블록 안의 함수 선언도 그 블록에만 한정됨 (ES6 표준)
//    → 따라서 { } 안에서 선언한 f2는 밖에서 안 보임
// 4. f2는 같은 함수 안에서 여러 번 선언되었기 때문에 마지막 선언이 유효 (f2(t,u,v))
// 5. f1 함수 안의 var gg, zz는 f1 전체에서 접근 가능하지만 블록 스코프는 무시됨
// 6. console.log('f1> ...') 시점에서는 zz가 선언은 되었지만 값이 아직 undefined
// 7. 'strict 모드' + '함수 선언문 중복'은 헷갈리지만, 원칙적으로
//    - 블록 안의 함수는 그 블록 한정
//    - 함수 안의 함수 선언은 마지막 선언으로 덮임
