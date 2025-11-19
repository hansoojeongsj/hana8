class Subway {
  #LINE2 = [
    "신도림",
    "성수",
    "신설동",
    "용두",
    "신답",
    "용답",
    "시청",
    "충정로",
    "아현",
    "이대",
    "신촌",
    "공항철도",
    "홍대입구",
    "합정",
    "당산",
    "영등포구청",
    "문래",
    "대림",
    "구로디지털단지",
    "신대방",
    "신림",
    "봉천",
    "서울대입구",
    "낙성대",
    "사당",
    "방배",
    "서초",
    "교대",
    "강남",
    "역삼",
    "선릉",
    "삼성",
    "종합운동장",
    "신천",
    "잠실",
    "잠실나루",
    "강변",
    "구의",
    "건대입구",
    "뚝섬",
    "한양대",
    "왕십리",
    "상왕십리",
    "신당",
    "동대문역사문화공원",
    "을지로4가",
    "을지로3가",
    "을지로입구",
  ];

  isValid(station) {
    return this.#LINE2.includes(station);
  }
}

// Subway 인스턴스 생성
const subway = new Subway();

const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const rl = readline.createInterface({ input, output });

function* route() {
  const start = yield "출발 역은?";
  const end = yield "도착 역은?";
  return `${start}역에서 출발하여 ${end}역에 도착합니다.`;
}

const station = route();

function router({ value, done }) {
  if (done) {
    console.log(value);
    return rl.close();
  }
  rl.question(`${value} -> `, (answer) => {
    const trimmed = answer.trim();
    if (!subway.isValid(trimmed)) {
      console.log("2호선 역이 아닙니다.");
      return router({ value, done });
    }
    router(station.next(trimmed));
  });
}
router(station.next());

rl.on("close", () => process.exit());
