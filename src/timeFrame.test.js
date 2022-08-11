const { sameTime } = require("../src/timeFrame");
const fs = require("fs").promises;

test("Runs first test", async () => {
  const data = await fs.readFile("./testFiles/test1.txt", "utf8");
  var result = sameTime(data.split(/\r?\n/));
  expect(result).toBe(["ASTRID-RENE: 2", "ASTRID-ANDRES: 3", "RENE-ANDRES: 2"]);
});

test("Runs second test", async () => {
  const data = await fs.readFile("./testFiles/test2.txt", "utf8");
  var result = sameTime(data.split(/\r?\n/));
  expect(result).toBe(["RENE-ASTRID: 3"]);
});

test("Runs third test", async () => {
  const data = await fs.readFile("./testFiles/test3.txt", "utf8");
  var result = sameTime(data.split(/\r?\n/));
  expect(result).toBe([]);
});
test("Runs fourth test", async () => {
  const data = await fs.readFile("./testFiles/test4.txt", "utf8");
  var result = sameTime(data.split(/\r?\n/));
  expect(result).toBe(["A-B:7", "B-C:7", "A-C:7"]);
});
