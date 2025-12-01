// in - keyof - extends - as
type User = {
  id: number;
  name: string;
  12: number;
};

// 1) 다음에서 key가 number 타입이면 key앞에 user_를 붙이세요.
type UserNumKeyPrefix = {
  [k in keyof User as k extends number ? `user_${k}` : k]: User[k];
};
const u: UserNumKeyPrefix = {
  id: 1,
  name: 'Hong',
  user_12: 100,
};
console.log(u);

// 2) 다음에서 key가 string 타입인 것만 남기세요.
type UserOnlyStrKey = {
  [k in keyof User as User[k] extends string ? k : never]: User[k];
};
// as k extends string -> 키가 string 인거
// as User[k] extends string -> value 기준 string인거

// 3) User에서 key가 string 타입인 것만 남기고 prefix(user_)를 붙이세요 (2가지)
type UserOnlyStrKeyPrefix = {
  [k in keyof User as User[k] extends string ? `user_${k}` : never]: User[k];
};

// Utility Type 만들기, 특정 key의 타입을 변경하는 Change 유틸리티 타입 만들기

interface IUser {
  id: number;
  age: number;
  name: string;
}

interface IDept {
  id: number;
  age: string;
  dname: string;
  captain: string; // -> IUser
}

const dc: DeptCaptain = {
  id: 2,
  age: '1년',
  dname: 'Sales',
  captain: { id: 1, name: 'Hong', age: 33 },
};

type Change<T, K extends keyof T, U> = {
  [k in keyof T]: k extends K ? U : T[k];
};
type DeptCaptain = Change<IDept, 'captain', IUser>;
// type Err = Change<IDept, 'xxx', IUser>; // 존재하지 않는 키는 Error!!!

//
// 다음 코드가 오류가 나지 않도록 수정하시오.
// 단, itemPrices의 item에는 재고(stock)에 있는 item들만 가능합니다.
//  우리가 원하는 구조
// type StockItem = {item: 'X' | 'Y' | 'Z'; price: number};

type Item = { item: string; price: number };
type ItemPrice<T, U> = {
  [K in keyof T]: K extends 'item' ? keyof U : T[K];
};
// [K in keyof T] -> keyof T 으로 타입 다시 만들기
// 조건부 타입으로 item만 교체 'item' → keyof U

const stock = { X: 1, Y: 2, Z: 30 };

type StockItem = ItemPrice<Item, typeof stock>;
const itemPrices: StockItem[] = [
  { item: 'X', price: 1000 },
  { item: 'Y', price: 2000 },
  { item: 'Z', price: 3000 },
  // { item: 'P', price: 4000 }, // stock에 존재하지 않는 키는 Error!!!
];

const total = itemPrices.reduce(
  (curr, itemPrice) => curr + stock[itemPrice.item] * itemPrice.price,
  0
);
