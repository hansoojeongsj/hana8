// ==============================
// this, new.target, arrow vs function, factory, 객체 this
// ==============================

// ⇔ function declareFn(name)
const expressFn = function (name) {
  // 일반 함수에서 this는 호출 방식에 따라 달라짐
  this.name = name;
  console.log(
    this,        // 호출 방식에 따라 달라짐 (global 또는 instance)
    new.target,  // new로 호출했는지 여부 확인
    this.name,
    name
  );
};

const arrowFn = (name) => {
  // 화살표 함수에서는 this가 lexically 바인딩
  this.name = name; // 전역(this) 또는 상위 스코프를 참조
  console.log(this, new.target, this.name, name); // new.target은 undefined
};

expressFn("expfn"); // 일반 함수 호출 → this = global object
arrowFn("afn");     // 화살표 함수 호출 → this = 상위 스코프(global)

const dfn = new expressFn("D"); // new 호출 → this = 새 객체
// const afn = new arrowFn("A"); // ❌ 화살표 함수는 constructor 불가

// ==============================
// 팩토리 함수
// ==============================
function createUser(id, name) {
  return {
    id,
    name,
    getUserInfo() {
      return `${this.id}. ${this.name}`; // this는 객체 자신을 가리킴
    },
  };
}

const lee = createUser(3, "Lee");
console.log("lee >>", lee.getUserInfo());
const park = createUser(4, "Park");

console.log("----------------------------");

// ==============================
// 객체와 this 스코프
// ==============================
globalThis.name = "Global Name";

const obj = {
  name: "Obj Name",
  printName() {
    console.log(this.name); 
    // 호출 방식에 따라 this 결정
    // obj.printName() → obj
    // const fn = obj.printName; fn() → globalThis
  },
};

const printName = obj.printName;
printName();       // 일반 호출 → this = globalThis → "Global Name"
obj.printName();   // 객체 메서드 호출 → this = obj → "Obj Name"

console.log("----------------------------");

// ==============================
// setTimeout에서 this 주의
// ==============================
const dog = {
  name: "Maxx",
  showMyName() {
    console.log(`My name is ${this.name}.`);
  },
  whatsYourName() {
    // setTimeout에 함수만 전달하면 this가 전역 객체
    setTimeout(this.showMyName, 1000); 
  },
};

dog.whatsYourName(); // 1초 후 undefined 혹은 globalThis.name

console.log("----------------------------");

const dog1 = {
  name: "Maxx",
  showMyName() {
    console.log(`My name is ${this.name}.`);
  },
  whatsYourName() {
    // 올바른 this 바인딩 방법 2가지

    // 1. 화살표 함수 사용 (lexical this)
    setTimeout(() => {
      this.showMyName();
    }, 1000);

    // 2. self(this) 변수 사용 (과거 방식)
    // const self = this;
    // setTimeout(function () {
    //   self.showMyName();
    // }, 1000);

    // 3. bind 사용 가능
    // setTimeout(this.showMyName.bind(this), 1000);
  },
};

dog1.whatsYourName(); // 1초 후 "My name is Maxx"

