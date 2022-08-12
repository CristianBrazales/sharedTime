const { KeyCounter } = require("./KeyCounter");
const { formatDataByDays, doOverlap, generateKey } = require("./utils");

function sameTime(workerSchedules = []) {
  //Algorithm:
  let calendarData = formatDataByDays(workerSchedules);
  // data stucture to keep all data
  let lookup = new KeyCounter();
  // iterate over each day
  for (const property in calendarData) {
    let dayHistory = calendarData[property];
    // cross check
    dayHistory.map((period, index) => {
      dayHistory.map((period2, index2) => {
        if (
          index != index2 &&
          period.name != period2.name &&
          period2.visited &&
          doOverlap(period, period2)
        ) {
          let key = generateKey([period.name, period2.name]);
          lookup.add(key);
        }
      });
      // exclude this number for future
      period.visited = true;
    });
  }

  return lookup.toStringArray();
}
module.exports = { sameTime };
