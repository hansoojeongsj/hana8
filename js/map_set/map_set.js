// stack은 immutable
let hong = { id: 1, name: "Hong" };
const map = new Map([
  [1, 11],
  [2, 22],
]);
map.set("three", 333); // { three: 333 }
map.set("four", [1, 2, 3, 4]); // { four: [1,2, 3, 4] }
console.log("🚀 ~ map:", map);
map.set(hong.name, hong);
map.set(hong, hong.name);
console.log(map); // Map(6) {  1 => 11, 2 => 22, 'three' => 333, 'four' => [ 1, 2, 3, 4 ],    ?, ?}
console.log("111 =", map.get(hong)); // 'Hong'
hong = null;
console.log("222 =", map.get(hong)); // 'undefined'
console.log("333 =", map);
map.delete(hong); // console.log(hong?.name);
console.log("444 =", map); // ?
console.log("hasHong =", map.has(hong)); // ?
console.log("hasHongName =", map.has(hong?.name)); // ?
map.clear();
console.log("555 =", map); // ?

map.set(1, 11).set(2, 22).set(3, 33); // ⇐⇒ new Map([[1, 11], [2, 22], [3, 33]);
console.log(map.entries());
map.keys();
map.values(); // { [ 1, 11 ], [ 2, 22 ], … };  { 1, 2, … };  { 11, 22, … }
const map2 = new Map([...map]); // Map(2) { 1 => 11, 2 => 22, 3 => 33 }
console.log("🚀 ~ map1:", map);
console.log("🚀 ~ map2:", map2);
map2.set("x", 99999999);
const map3 = new Map([...map, ...map2]); // Map(2) { 1 => 11, 2 => 22, x => 99999999 }
console.log("🚀 ~ map3:", map3);
console.log("----------------------");
let kim = { id: 2, name: "Kim" };
const wmap = new WeakMap();
wmap.set(new Number(1), 11);
wmap.set(kim, kim.name);
console.log("🚀 ~ wmap:", wmap); // WeakMap { <items unknown> }
console.log("🚀 ~ wmap:", wmap.has(new Number(1))); // false
console.log("🚀 ~ wmap:", wmap.has(kim)); // true
kim = null; // &null
console.log("🚀 ~ wmap:", wmap.has(kim)); // "&100" // false

// map은 실제 주소 참조
// weakmap은 거기 값만 알고 참조는 안해, 출력도 못하고 keys도 할 수 없어
