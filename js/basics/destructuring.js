// 객체 구조분해, destructuring

// 1번
console.log('1번-------------------------');

const user = { id: 1, name: 'Hong', addr: { city: 'Seoul' } };

function f1({ id, name }) {
  console.log(id, name);
}

function f2(user) {
  const { id, name } = user;
  console.log(id, name);
}
const hong1 = { id: 1, name: 'Hong' };
const lee2 = { id: 2, name: 'Lee' };

f1(hong1); // 1 'Hong'
f2(hong1); // 1 'Hong'
f1(lee2); // 2 'Lee'
f2(lee2); // 2 'Lee'

// 2번
console.log('2번-------------------------');

const user2 = { id: 1, name: 'Hong', passwd: 'xxx', addr: 'Seoul' };

// passwd 제외하고 나머지를 userInfo에 할당
const { passwd, ...userInfo } = user2;

console.log(userInfo);
// 출력: { id: 1, name: 'Hong', addr: 'Seoul' }

// 3번
console.log('3번-------------------------');

const arr = [[{ id: 1 }], [{ id: 2 }, { id: 3 }]];

// 중첩 구조분해
const [[{ id: id1 }], [{ id: id2 }, { id: id3 }]] = arr;

console.log(id1, id2, id3);
// 출력: 1 2 3

// 4번
console.log('4번-------------------------');

const user4 = { name: 'Hong', passwd: 'xyz', addr: 'Seoul' };

function getUserValueExceptInitial(k) {
  const { [k]: val } = user4; // (가) user 객체에서 key k에 해당하는 값 val로 구조분해
  const [, ...rest] = val; // (나) val 문자열에서 첫 글자를 제외하고 나머지를 rest 배열로 구조분해
  return rest.join(''); // (다) 배열 rest를 문자열로 합쳐서 반환
}

console.log(getUserValueExceptInitial('name')); // 'ong'
console.log(getUserValueExceptInitial('passwd')); // 'yz'
console.log(getUserValueExceptInitial('addr')); // 'eoul'

// 강사님 강의
console.log('강사님풀이 1번-------------------------');

const hong = { id: 1, name: 'Hong' };
const lee = { id: 2, name: 'Lee' };
f1(hong);
f2(hong); // ⇒ 1, 'Hong'
f1(lee);
f2(lee); //⇒ 2, 'Lee'

function f1(user) {
  const { id, name } = user;
  console.log(id, name);
}
function f2({ id, name }) {
  console.log(id, name);
}

console.log('강사님풀이 2번-------------------------');
// destructuring의 원리를 물음
// 강사님 풀이
const arr1 = [[{ id: 1 }], [{ id: 2 }], [{ id: 3 }]];
const [[{ id: id11 }], [{ id: id22 }], [{ id: id33 }]] = arr1;

console.log(id1, id2, id3);

console.log('강사님풀이 3번-------------------------');
// 다음과 같이 key를 전달하면 해당 값의 첫 글자를 제외한 문자를 리턴하는 함수를 destructing을 최대한 활용하여 (가),(나),(다) 부분을 작성하시오.

const user1 = { name: 'Hong', passwd: 'xyz', addr: 'Seoul' };
function getUserValueExceptInitial(k) {
  const { [k]: val } = user1; // user[k] vs user.k
  const [, ...rest] = val;
  return rest.join('');
}

console.log(getUserValueExceptInitial('name')); // 'ong'
console.log(getUserValueExceptInitial('passwd')); // 'yz'
console.log(getUserValueExceptInitial('addr')); // 'eoul'

console.log('강사님풀이 추가된 문제 -------------------------');
// 다음 arr의 첫 번째 원소와 두 번째 원소를 swap 해보세요.

const ar = [1, 2];

[ar[0], ar[1]] = [ar[1], ar[0]];
console.log(ar);
// 출력결과: [2, 1]
