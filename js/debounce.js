// setTimeout(cb, delay); delay 이후에 cb 실행

const debounce = (cb, delay) => {
  let timer;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(cb, delay);
  };
};

const f = function () {
  console.log("f>>", new Date());
};

let cnt = 0;
const search = debounce(f, 200);
const intl = setInterval(() => {
  console.log("intl", cnt);
  if (++cnt > 10) clearInterval(intl);
  search();
}, 10);

console.log("--------------------------");

const throttle = (cb, delay) => {
  let timer;
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      cb();
      timer = undefined;
    }, delay);
  };
};

let cntThrottle = 0;
const searchThrottle = throttle(f, 200);
const intlThrottle = setInterval(() => {
  console.log("intlThrottle", cntThrottle);
  if (++cntThrottle > 10) clearInterval(intlThrottle);
  searchThrottle();
}, 10);

console.log("------------------------");

// arguments 받기
const throttleAb = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      cb(...args);
      timer = undefined;
    }, delay);
  };
};

const searchAb = throttleAb((x) => console.log("throttleAb", x), 200);
searchAb(1);
searchAb(2);

console.log("------------------------");

// arguments 받으면서 .bind 쓰기
// => 화살표 함수 this 못받아서 .bind 쓸거면 function으로 고쳐줘야 함
const throttleBind = (cb, delay) => {
  let timer;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      cb.apply(this, args); // .bind 대신 apply로 this 유지
      timer = undefined;
    }, delay);
  };
};

// 예시
const obj = {
  name: "Lee",
  sayName: function () {
    console.log("name:", this.name);
  },
};

const t = throttleBind(obj.sayName, 200);
t.call(obj); // 정상적으로 this = obj 유지
