const myName: string = 'chaehyun';

console.log('hi~', myName);

// let x: string;
let x: string | undefined;

x = Math.random() < 0.5 ? 'abc' : undefined;

console.log(x?.length);

//
type TUser = { id: number; name: string };
const obj = { id: 1, name: 'Lee', addr: 'Seoul' };
const kim = { id: 2, name: 'Kim', addr: 'Jeju', age: 22 };

let user: TUser = obj;
const users1: TUser[] = [obj, { id: 3, name: 'Ki', addr: 'Daegu' }, kim]; // obj와 동일 구조(Exact)

const users2 = [obj, { id: 4, name: 'Choi', age: 33 }, kim]; // 할당될 때 모두 union 처리

const users3: TUser[] = [
  obj,
  { id: 5, name: 'Park', addr: 'seoul', age: 33 },
  kim,
]; //  'age' does not exist in type 'TUser'.(2353)

//
function f() {
  return [1, 'A'];
}
const [n1, s1] = f();
const t: [number, string] = [100, 'B'];

const [n2, s2] = t;

// Freshness
// covariance and contravariance
