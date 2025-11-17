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

console.log("연습문제 ---------------------------");

const once = (f, rebirthDelay = 1000) => {
  let done = false;
  return (...args) => {
    if (done) return;
    done = true;
    setTimeout(() => (done = false), rebirthDelay);
    return f(...args);
  };
};
const fn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
console.log(fn(2, 7)); // undefined
console.log(fn(3, 8)); // undefined

// let cnt = 0;
// const intl = setInterval(() => console.log(cnt++, fn(cnt, -cnt)), 200);

console.log("--------------------");
const before = () => console.log("before....");
const after = (result) => console.log("after...", result);

const someFn = (name, greeting) => `${greeting}, ${name}`;
const someFn2 = (id, nickname, email, level) =>
  `${id}/${nickname}/${email}/${level}`;

const template =
  (f) =>
  (...args) => {
    before();
    const ret = f(...args);
    setImmediate(after, ret);
    return ret;
    // after();
    // return ret;
  };

const temp = template(someFn); // before → someFn → after 실행
const temp2 = template(someFn2); // before → someFn2 → after 실행

console.log("temp1>>", temp("sico", "hello"));
console.log("temp2>>", temp2(1, "sico", "sico@gmail.com", 5));

console.log("+++++++++++++++++++++++");
const weeks = ["일", "월", "화", "수", "목", "금", "토"];
const getNextWeek = (() => {
  let widx = -1;
  return () => {
    widx += 1; // side-effect!
    if (widx >= weeks.length) widx = 0;
    return `${weeks[widx]}요일`;
  };
})();

let cnt1 = 0;
const intl1 = setInterval(() => {
  // widx += 2; // side-effect!
  console.log("call", cnt1, getNextWeek());
  if ((cnt1 += 1) === 8) clearInterval(intl1);
}, 200);

// > [...'ab,cd'.split(',')]; // 멍청이는 걸러짐.
// [ 'ab', 'cd' ]
// > 'ab,cd'.split(','); // 이렇게 훨씬 좋음.
// [ 'ab', 'cd' ]
// >

// 게시글에서 찾을 떄 최신글부터 찾는게 유리하듯이..
// lastIndexOf 좋음 !
// arr.lastIndexOf(3);

// indexOf랑 findLastIndex랑 같음
