const fs = require("fs").promises;
const { sameTime } = require("./src/timeFrame");
const { sameTime2 } = require("./src/timeFrame2");

const myArgs = process.argv.slice(2);
if (myArgs.length === 2) {
  let fileLocation = myArgs[0];
  let result = [];
  let typeAlgorithm = myArgs[1];
  let readFile = async () => {
    const data = await fs.readFile(fileLocation, "utf8");
    if (typeAlgorithm === 1) {
      result = sameTime(data.split(/\r?\n/));
    } else {
      result = sameTime2(data.split(/\r?\n/));
    }

  };
  readFile();
} else {
  console.log("please input the type algorithm and location as parameters");
}
