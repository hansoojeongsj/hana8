const myName: string = 'soojeong';

greet(myName);

function greet(str: string) {
  console.log(`hello, ${str}`);
}

// 유니언 | 은 합집합 보단 number문, bigint문을 나간다는 생각으로
let n: number | bigint;
n = 123;
n = 123n;

interface User {
  id: number;
  name: string;
  addr: string;
}
interface Emp {
  id: number;
  namex: string;
  empno: string;
}

type Person = User | Emp;

// User문 또는 Emp문 둘 중 하나의 문만 통과 가능함.
// let p: Person = { id: 100, namex: 'Kim', addr: 'seoul' };

// 필수 필드만 맞으면 추가 필드는 있어도 됨.
let p: Person = { id: 100, namex: 'Kim', addr: 'seoul', empno: '개발부' };
console.log('🚀 ~ p:', p);

// [
//   '냐', '옹', ' ',
//   '밤', ' ',  '식',
//   ' ',  '이'
// ]
type X = string | number;
let x: X = '냐옹 밤 식 이';
if (typeof x === 'string') {
  console.log([...x]);
}


// Array.isArray 중요