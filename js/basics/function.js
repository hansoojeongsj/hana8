// 카운터를 속에 숨기기 위해, 클로저로 작성하기 위해
const gate1counter = (function counter() {
  let count = 0;
  return function () {
    return ++count;
  };
})(); // IIFE

console.log('🚀 ~ gate1counter:', gate1counter());
console.log('🚀 ~ gate1counter:', gate1counter());
console.log('🚀 ~ gate1counter:', gate1counter());

async function af() {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(
    (res) => res.json()
  );
  return data;
}
const data = await af();
console.log('🚀 ~ data:', data);
