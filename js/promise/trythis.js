// 연습문제 1
const randTime1 = (val) =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000 * Math.random(), val);
  });

console.log(new Date());

randTime1(100).then((res) => console.log(res, new Date()));

[1, 2, 3, 4, 5].forEach((a) =>
  randTime1(a).then((res) => console.log(res, new Date()))
);

// 연습문제 2
// 콜백 지옥을 Promise로 바꾸기
const depthTimer = (sec) =>
  new Promise((resolve, reject) => {
    console.log(`depth${sec}`, new Date());
    // setTimeout(resolve, sec * 1000, sec + 1);
    setTimeout(() => {
      if (sec >= 3) reject(new Error('Already 3-depth!!'));
      else resolve(sec + 1);
    }, sec * 1000);
  });

depthTimer(1).then(depthTimer).then(depthTimer).catch(console.error);

// 연습문제 3
// 다음 코드에서 promiseAll 함수를 직접 작성하시오.
const assert = require('assert');

const randTime = (sec) => {
  return new Promise((resolve) => {
    console.log('🚀 ~ sec:', sec);
    setTimeout(resolve, 1000 * Math.random(), sec);
  });
};

// Promise.all은 새로운 Promise를 반환
// remainCnt: promise 끝났는지
// 하나라도 실패시 전체 실패
// randTime 1,2,3이 동시에 실행

const promiseAll = (promises) =>
  new Promise((resolve, reject) => {
    const results = [];
    let remainCnt = promises.length;
    // for (const p of promises) // 첫번째는 첫번째에.. 개수가 맞아야?
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((val) => {
          results[i] = val;
          remainCnt--;
          if (remainCnt === 0) {
            resolve(results);
          }
        })
        .catch(reject);
    }
  });

promiseAll([randTime(1), randTime(2), randTime(3)])
  .then((arr) => {
    console.table(arr);
    assert.deepStrictEqual(arr, [1, 2, 3]);
  })
  .catch(console.error);

promiseAll([randTime(11), Promise.reject('RRR'), randTime(33)])
  .then((array) => {
    console.log('여긴 과연 호출될까?!');
  })
  .catch((error) => {
    console.log('reject!!!!!!>>', error);
  });

// Promise.all([randTime(1), randTime(2), randTime(3)])
//   .then((arr) => {
// // table은 객체를 찍는 함수
//     console.table(arr);
//     assert.deepStrictEqual(arr, [1, 2, 3]);
//   })
//   .catch(console.error);

// Promise.all([randTime(11), Promise.reject('RRR'), randTime(33)])
//   .then((array) => {
//     console.log('여긴 과연 호출될까?!');
//   })
//   .catch((error) => {
//     console.log('reject!!!!!!>>', error);
//   });

// 연습문제 4
// 다음 코드에서 promiseAllSettled 함수를 직접 작성하시오.

// 예상 반환 결과
const allSettledResults = [
  {
    status: 'fulfilled',
    value: 11,
  },
  {
    status: 'rejected',
    reason: 'RRR',
  },
  {
    status: 'fulfilled',
    value: 33,
  },
];

// const randTime = (value) =>
//   new Promise((resolve) => setTimeout(resolve, 1000 * Math.random(), value));

// catch에서 reject를 호출하는 대신 결과를 저장
// resolve는 모든 작업이 끝난 뒤
// finally에서 remainCnt를 줄임

const promiseAllSettled = (promises) =>
  new Promise((resolve) => {
    const results = [];
    let remainCnt = promises.length;

    if (remainCnt === 0) return resolve([]);

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((val) => {
          results[i] = { status: 'fulfilled', value: val };
        })
        .catch((err) => {
          results[i] = { status: 'rejected', reason: err };
        })
        .finally(() => {
          remainCnt--;
          if (remainCnt === 0) resolve(results);
        });
    }
  });

promiseAllSettled([randTime(11), Promise.reject('RRR'), randTime(33)])
  .then((array) => {
    console.table(array);
    // console.log(JSON.stringify(array, null, '  '));
    console.log('여긴 과연 호출될까?!');
    assert.deepStrictEqual(array, allSettledResults);
  })
  .catch((error) => {
    console.log('reject!!!!!!>>', error);
  });

// 실행
// array return, 결과 순서도 일치
// status에 따라 return 되는 타입 다름

// ┌─────────┬─────────────┬───────┬────────┐
// │ (index) │ status      │ value │ reason │
// ├─────────┼─────────────┼───────┼────────┤
// │ 0       │ 'fulfilled' │ 11    │        │
// │ 1       │ 'rejected'  │       │ 'RRR'  │
// │ 2       │ 'fulfilled' │ 33    │        │
// └─────────┴─────────────┴───────┴────────┘
// [
//   {
//     "status": "fulfilled",
//     "value": 11
//   },
//   {
//     "status": "rejected",
//     "reason": "RRR"
//   },
//   {
//     "status": "fulfilled",
//     "value": 33
//   }
// ]
// 여긴 과연 호출될까?!
// reject!!!!!!>> ReferenceError: assert is not defined

// Promise.allSettled([randTime(11), Promise.reject('RRR'), randTime(33)])
//   .then((array) => {
//     console.table(array);
//     console.log(JSON.stringify(array, null, '  '));
//     console.log('여긴 과연 호출될까?!');
//     assert.deepStrictEqual(array, allSettledResults);
//   })
//   .catch((error) => {
//     console.log('reject!!!!!!>>', error);
//   });
