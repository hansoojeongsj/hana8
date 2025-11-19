function* gener() {
  const x = yield "x는?";
  const y = yield `10을 더하면 ${x + 10}입니다`;
  //   console.log("🚀 ~ total:", total);
  return x + y;
}
// GENERATOR TEST
function testGenerator() {
  const iter = gener();
  console.log("🚀 ~ iter:", iter);

  const it1 = iter.next();
  console.log("🚀 ~ it1:", it1);

  const it2 = iter.next(5);
  console.log("🚀 ~ it2:", it2);

  if (it2.done) console.log("The end!");
  iter.next();

  const it3 = iter.next(100);
  console.log("🚀 ~ it3:", it3);
}
// testGenerator();

// READLINE TEST

const readline = require("readline");

const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });

function testReadlineBasic() {
  rl.question("What do you think of Node.js? ", (answer) => {
    console.log(`Thank you for your valuable feedback: ${answer}`);

    rl.close();
  });

  rl.on("close", function () {
    process.exit();
  });
}
// testReadlineBasic();

// cf. line listener
function testReadline2() {
  rl.on("line", (answer) => {
    console.log("line.answer>>", answer);
    if (answer === "bye") rl.close();
  }).on("close", () => {
    process.exit();
  });
}
// testReadline2();

// ---------
// const readline = require("readline");
// const { stdin: input, stdout: output } = require("process");

// GENERATOR + READLINE
function* add() {
  const x = yield "첫번째 수는?";
  const y = yield "두번째 수는?";
  return `Total: ${x + y}`;
}

function runAdd() {
  const gen = add();

  console.log(gen.next().value);

  rl.on("line", (line) => {
    const result = gen.next(Number(line));
    if (result.done) {
      console.log(result.value);
      rl.close();
    } else {
      console.log(result.value);
    }
  });
}
runAdd();

// 종료가 없는 상황 iterator
