// 두 개의 수를 입력 받아 더하기를 수행하는 제너레이터를 작성하시오.

// (실행 결과: 1과 2를 넣었을 때)
// 첫 번째 수?  → 1   next(1)
// 두 번째 수?  → 2
// Total: 3

// // 입력 받기
// const readline = require("readline");
// const { stdin: input, stdout: output } = require("process");

// // 제너레이터인 add 함수가 사용자 입력을 단계별로 받아 수행
// // yield는 질문을 내보내고
// // next(사용자가입력한값)은 그 답을 제너레이터 안으로 다시 넣는다

// function* add() {
//   const x = yield "첫 번째 수?  → ";
//   const y = yield "두 번째 수?  → ";

//   return `Total: ${x + y}`;
// }

// const rline = readline.createInterface({ input, output });
// const itAdd = add();

// output.write(itAdd.next().value);

// rline.on("line", (line) => {
//   const num = Number(line.trim());
//   const result = itAdd.next(num);
//   if (result.done) {
//     console.log(result.value);
//     rline.close();
//   } else {
//     output.write(result.value);
//   }
// });

// // 단순 실행, 위 함수와 따로 실행해야 함
// function* add() {
//   const x = yield "첫 번째 수?  → ";
//   console.log(x);
//   const y = yield "두 번째 수?  → ";
//   console.log(y);

//   return `Total: ${x + y}`;
// }
// const itAdd2 = add();
// console.log(itAdd2.next().value);
// console.log(itAdd2.next(1).value);
// console.log(itAdd2.next(2).value);

// 강사님 풀이
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

function* add() {
  const x = yield '첫 번째 수는?';
  const y = yield '두 번째 수는?';

  return x + y;
}

const adder = add();

function run({ value, done }) {
  if (done) {
    console.log(`Total: ${value}`);
    return rl.close();
  }
  rl.question(`${value} -> `, (answer) => {
    if (isNaN(answer)) {
      console.log('Input the number only!');
      run({ value, done });
    } else {
      run(adder.next(+answer));
    }
  });
}

run(adder.next());

rl.on('close', function () {
  process.exit();
});
