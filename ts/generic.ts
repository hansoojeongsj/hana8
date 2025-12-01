type X<T> = { id: T };

type IdNum = X<number>;
type IdStr = X<string>;

//
interface FailureResult {
  error: Error;
  succeeded: false;
}
interface SuccessfulResult<Data> {
  data: Data;
  succeeded: true;
}
type Result<T> = FailureResult | SuccessfulResult<T>;
type ResultX<Data> = { error?: Error; data?: Data; succeeded: boolean };

const x: Result<string> = { succeeded: true, data: 'xxx' };
x.data;

// extends keyof
// unknown -> 모든지 올 수 있음
// unknown 쓰지 않으면 any로 간주
type Y<T extends unknown[]> = T;
type Z<T extends Array<unknown>> = T;

//
interface IUser {
  id: number;
  age: number;
  name: string;
}

type Key<T> = keyof T;
type IUserKeys = Key<IUser>;
type TT = {
  // [k in IUserKeys]: k;
  [k in keyof IUser]: k;
};

// type XX<T> = {
//   [k in keyof T]: T[k];
// };
// type xx1 = XX<IUser>;

type XX<T, U> = {
  [k in keyof T]: k extends U ? T[k] : boolean;
};
type xx1 = XX<IUser, 'id'>;
type xx2 = XX<IUser, 'addr'>;

//
// type ArrayMember<T> = T[number];
type ArrayMember<T extends Array<unknown>> = T[number];

const ns = [1, 2, 3];
type NA = typeof ns;
type XX4 = ArrayMember<NA>;

const strs = ['a', 'b', 'c'];
type XX5 = ArrayMember<typeof strs>;

//
const map = new Map<string, number | string>([
  ['id', 1],
  ['age', 24],
  ['name', 'Han'],
]);

// 찍어보기 -> 함수 가득
// type MapValue<M> = M[keyof M];
type MapValue<M extends Map<unknown, unknown>> = M[keyof M];

// 위에서 exclude 사용
type MapValue1<M extends Map<unknown, unknown>> = Exclude<M[keyof M], Function>;
type XX1 = MapValue1<typeof map>;

type XX6 = MapValue<typeof map>; // number | string

type MapObject<M extends Object> = {
  [k in keyof M]: M[k];
};
type XX66 = MapObject<typeof map>;

// 또 다른, 함수가 아닌 size도 걸러야 함.
type ExcludedFunction<T> = T extends Function ? never : T;
type XX7 = ExcludedFunction<XX6>;

type XX77 = Exclude<XX6, Function>;

// infer 사용한 방법
type MapObject2<M> = M extends Map<unknown, infer Val> ? Val : unknown;
type XX8 = MapObject2<typeof map>;

//
type User = { id: number; name: string };
const getData = (url: string) => fetch(url);

async function f() {
  const res = await getData('http://example.com');
  const data = (await res.json()) as User;

  return 1;
}

const abc = f();

const pf = () =>
  new Promise((resolve) => {
    resolve(1);
  });
const y = pf();

const pf2 = () =>
  new Promise<number>((resolve) => {
    resolve(1);
  });

const y2 = pf2();

//
const pf3 = (): Promise<number> =>
  new Promise((resolve) => {
    resolve(1);
  });

const y3 = pf3();
