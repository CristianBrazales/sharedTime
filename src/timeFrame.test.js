const { sameTime } = require("../src/timeFrame");
const fs = require("fs").promises;
// tests adjusted since the output is the same
test("Runs first test", async () => {
  const data = await fs.readFile("./testFiles/test1.txt", "utf8");
  var result = sameTime(data.split(/\r?\n/));
  expect(result.sort()).toStrictEqual(
    ["ASTRID-RENE: 2", "ANDRES-ASTRID: 3", "ANDRES-RENE: 2"].sort()
  );
});

test("Runs second test", async () => {
  const data = await fs.readFile("./testFiles/test2.txt", "utf8");
  var result = sameTime(data.split(/\r?\n/));
  expect(result).toStrictEqual(["ASTRID-RENE: 3"]);
});

test("Runs third test", async () => {
  const data = await fs.readFile("./testFiles/test3.txt", "utf8");
  var result = sameTime(data.split(/\r?\n/));
  expect(result).toStrictEqual([]);
});
test("Runs fourth test", async () => {
  const data = await fs.readFile("./testFiles/test4.txt", "utf8");
  var result = sameTime(data.split(/\r?\n/));
  expect(result.sort()).toStrictEqual(["A-B: 7", "B-C: 7", "A-C: 7"].sort());
});
