// 타입 서술어 (Type Predicate)
// 1번

const isStringNumber = (value: unknown): value is [string, number] =>
  Array.isArray(value) &&
  value.length === 2 &&
  typeof value[0] === 'string' &&
  typeof value[1] === 'number';

const f1 = (value: number | string | boolean | [string, number]) => {
  if (isStringNumber(value)) {
    console.log(value[0].toUpperCase(), value[1].toFixed());
  }
};

f1(['item', 1000]);

// -------------------------

interface Animal {}
interface Dog extends Animal {
  name: string;
}
interface Cat extends Animal {
  punch(): void;
}

class Navi implements Cat {
  punch() {
    console.log('navi punch!!!');
  }
}

class Retriever implements Dog {
  // name = '밤식';
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const r = new Retriever('밤식');
console.log('밤식이는 강아지 !:', isDog(r));

// function isDog(a: Animal): a is Dog {
//   // <이 부분을 작성하시오>
//   return typeof (a as Dog).name === 'string';
// }

function isDog(a: Animal): a is Dog {
  return !!a && typeof a === 'object' && 'name' in a && !('punch' in a);
}
// -------------------------

// 2번
// 2-1) 다음에서 T1과 동일한 타입으로 T2를 정의하시오.

const cart = {
  X: 1,
  Y: 2,
  Z: 3,
};

type T1 = 'X' | 'Y' | 'Z';
type T2 = keyof typeof cart;

// 2-2) 다음에서 T3과 동일한 타입으로 T4를 정의하시오.

const constCart = {
  X: 1,
  Y: 2,
  Z: 3,
} as const;

type T3 = 1 | 2 | 3;
// type T4 = (typeof constCart)['X' | 'Y' | 'Z'];
type T4 = (typeof constCart)[keyof typeof constCart];

//--------------------------

// 3번
// 다음에서 '가', '나', '다' 어떤 걸 throw 해도
// 에러 메시지를 출력하도록 (라) 부분을 수정하시오. (type predicate)

const hasMessageError = (error: unknown): error is Error =>
  error instanceof Error ||
  (error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string');

const messageError = (error: unknown) =>
  hasMessageError(error) ? error.message : JSON.stringify(error);

try {
  // throw new Error('some error!!!!'); // 가
  throw 'some string error!!!'; // 나
  // throw ['some', 'array', 'error']; // 다
} catch (error) {
  // console.log(
  //   typeof error === 'string'
  //     ? error
  //     : Array.isArray(error)
  //     ? error.join(' ')
  //     : (error as Error).message
  // );

  // if (hasMessageError(error)) console.log(error.message);

  console.log(messageError(error));
}

//--------------------------

// 4번
const arr = [1, 2, 3, 4];

const users = [
  { id: 1, name: 'Hong' },
  { id: 2, name: 'Kim' },
  { id: 3, name: 'Lee' },
];
type TUser = (typeof users)[number];

const deleteArray = (
  array: number[] | TUser[],
  startOrKey: number | keyof TUser,
  endOrValue: number | TUser[keyof TUser] = array.length
) =>
  array.filter(
    // 1번
    // typeof startOrKey === 'number' && typeof endOrValue === 'number'
    //   ? (_, i) =>
    //       i < Math.min(startOrKey, endOrValue) ||
    //       i >= Math.max(startOrKey, endOrValue)
    //   : (a) =>
    //       typeof a !== 'number' &&
    //       typeof startOrKey !== 'number' &&
    //       a[startOrKey] !== endOrValue

    // 2번
    // endOrValue가 100% number라는 확신 => as number => 가독성이 올라가 오히려 좋음
    typeof startOrKey === 'number'
      ? (_, i) =>
          i < Math.min(startOrKey, endOrValue as number) ||
          i >= Math.max(startOrKey, endOrValue as number)
      : (a) => typeof a !== 'number' && a[startOrKey] !== endOrValue
  );

console.log(deleteArray(arr, 2)); // [1, 2]
console.log(deleteArray(arr, 1, 3)); // [1, 4]
console.log(arr); // [1, 2, 3, 4]

console.log(deleteArray(users, 2)); // [Hong, Kim]
console.log(deleteArray(users, 1, 2)); // [Hong, Lee]
console.log(deleteArray(users, 'id', 2)); // [Hong, Lee]
console.log(deleteArray(users, 'name', 'Lee')); // [Hong, Kim]
