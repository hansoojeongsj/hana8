// 정적 스코프와 동적 스코프

var x = 1;
// 앞에 var 부분 선언
// 이후 실행
// x는 전역 스코프

function f1(x) {
  console.log(x); // static scope: 1, dynamic: 2
}

function f2() {
  var x = 2; // 애는 함수형(함수레벨) 스코프, 2가 밖으로 나갈 수 없음.
  f1(x);
}

f2();

// ------------------

var x = 1;

function f1(x) {
  console.log(x);
  // [[OuterEnv]] // -> 나한테 없으면 찾아가야 할 곳, 얘는 전역에서 선언되었기 때문에 전역으로 찾아감.
  function inner_f1(x) {
    console.log(x);
    // [[OuterEnv]] // -> f1.
  }
}

function f2() {
  var x = 2;
  f1(x);
}

f2();
// ------------------
// bind
var x = 1;

function f1(x) {
  console.log(x, this.y, z);
  eval('console.log(123,x)');
}

global.z = 555; // globalThis.z = 555;

function f2() {
  var x = 2;
  this.y = 999;
  f1.bind({ y: 199 })(x);
}

f2();

// ------------------
// 따라 그린거 그림 코드

var x = 1;

function f1() {
  console.log(x, this.y, z); // static: 1, dynamic: 2
  eval('console.log(123,x)');
  // [[OuterEnv]]

  function f1_inner() {
    // [[OuterEnv]] : f1
  }
}

function f2() {
  var x = 2;
  console.log('f2: ', x, new target());
  this.y = 999;
  f1 = f1.bind({ y: 100 }); // heap 어딘가에 y obj가 생김 / binding this가 이 y를 가리킴
  f1();
}
globalThis.z = 555; // 호이스팅 없이 바로 초기화

let cnt = 0;
const f3 = (cnt) => {
  cnt++;
};

f2();
console.log('------------------');
new f2();
f3();
console.log('------------------');
f1();
