// 호이스팅
var x;

function f() {
  conseol.log('ffffff');
}

// ----------
x = 1;
f();
y = 9;

// ----------
x = 1;
var x;
f();
y = 9;
let y;

//
function fx({ a, b, ...c }) {
  console.log(a, b, c);
}

fx({ a: 1, b: 2, x: 100, y: 200 }); // 1 2 { x: 100, y: 200 }

// ----------
class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
}
const maxx = new Dog('Maxx', 45);

console.log('🚀 ~ maxx:', maxx);

const { name: namex, age } = maxx;
console.log('🚀 ~ maxx:', namex, age);
