// 다음의 지하철 노선 중에서, 출발역 ~ 도착역까지만을 반환하는 클래스를 작성하시오. (단방향만!)
// start와 end인 경우 s<e s->e, s>e, e->끝->처음->s
// 은닉성 잘 줘야 함. 기차 달려가고 있는데, 외부에서 역 컨트롤 하면 안됨. 디테일 살려보기
class Subway {
  #LINE2 = [
    '신도림',
    '성수',
    '신설동',
    '용두',
    '신답',
    '용답',
    '시청',
    '충정로',
    '아현',
    '이대',
    '신촌',
    '공항철도',
    '홍대입구',
    '합정',
    '당산',
    '영등포구청',
    '문래',
    '대림',
    '구로디지털단지',
    '신대방',
    '신림',
    '봉천',
    '서울대입구',
    '낙성대',
    '사당',
    '방배',
    '서초',
    '교대',
    '강남',
    '역삼',
    '선릉',
    '삼성',
    '종합운동장',
    '신천',
    '잠실',
    '잠실나루',
    '강변',
    '구의',
    '건대입구',
    '뚝섬',
    '한양대',
    '왕십리',
    '상왕십리',
    '신당',
    '동대문역사문화공원',
    '을지로4가',
    '을지로3가',
    '을지로입구',
  ];

  constructor(start, end) {
    this.start = start;
    this.end = end;

    this.startIdx = this.#LINE2.indexOf(start);
    this.endIdx = this.#LINE2.indexOf(end);

    this.currentIdx = this.startIdx;
  }

  getRoute() {
    if (this.startIdx === -1 || this.endIdx === -1) return [];

    if (this.startIdx <= this.endIdx) {
      return this.#LINE2.slice(this.startIdx, this.endIdx + 1);
    }

    const first = this.#LINE2.slice(this.startIdx);
    const second = this.#LINE2.slice(0, this.endIdx + 1);
    return [...first, ...second];
  }

  *[Symbol.iterator]() {
    const route = this.getRoute();
    const currentStation = this.#LINE2[this.currentIdx];
    let startPos = route.indexOf(currentStation);

    for (let i = startPos; i < route.length; i++) {
      yield route[i];
    }
  }

  next() {
    this.currentIdx++;
    if (this.currentIdx === this.#LINE2.length) {
      this.currentIdx = 0;
    }
  }

  toString() {
    return `${this.start}역에서 ${this.end}역까지 가는 열차이며, 현재 ${
      this.#LINE2[this.currentIdx]
    }역입니다`;
  }
}

// pdf
// 실행
const assert = require('assert');
const routes = new Subway('문래', '신림');
console.log([...routes]);
assert.deepStrictEqual(
  [...routes],
  ['문래', '대림', '구로디지털단지', '신대방', '신림']
);

const it1 = routes[Symbol.iterator]();
['문래', '대림', '구로디지털단지', '신대방', '신림'].forEach((value, i) => {
  assert.deepStrictEqual(it1.next(), { value, done: false });
  console.log(i, routes.toString());
});
// console.log(it1.next());
assert.deepStrictEqual(it1.next(), { value: undefined, done: true });

const routes2 = new Subway('구로디지털단지', '성수'); // 32개 정거장
routes2.next();
console.log(routes2.toString());
// console.log(routes2); // '구로디지털단지역에서 성수까지 가는 열차이며, 현재 신대방역입니다'
console.log([...routes2]); // ['신대방', ..., '성수']
const it2 = routes2[Symbol.iterator]();
while (true) {
  const x = it2.next();
  console.log(x);
  if (x.done) break;
}

const route3 = new Subway('문래', '합정'); // 46개 정거장이면 통과!
assert.strictEqual([...route3].length, 46);
const route4 = new Subway('신도림', '을지로입구'); // 48개 정거장이면 통과!
assert.strictEqual([...route4].length, 48);
