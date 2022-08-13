const { KeyCounter } = require("./KeyCounter");
const {
  formatDataByDays,
  doOverlap,
  generateKey,
  flatDownData,
  generatePairs,
} = require("./utils");

function sameTime2(workerSchedules = []) {
  //Algorithm:
  // Separate data by days
  let calendarData = formatDataByDays(workerSchedules);
  // generate pairs by day
  let allPairs = [];
  for (const property in calendarData) {
    // pre process data points
    let linearInfo = flatDownData(calendarData[property]);
    let simultanueus = [];
    linearInfo.map((event) => {
      // iterate left to right, if we see the start of a period time add to the list
      if (event.type === "start") simultanueus.push(event.name);
      else {
        //on exit we need to generate the possible pairs (since they are actually overlapping) and also remove the item from the array
        const index = simultanueus.indexOf(event.name);
        if (index > -1) {
          // only splice array when item is found
          simultanueus.splice(index, 1); // 2nd parameter means remove one item only
        }
        allPairs = allPairs.concat(generatePairs(simultanueus, event.name));
      }
    });
  }
  // data stucture to keep all data
  let lookup = new KeyCounter();
  allPairs.map((key) => {
    lookup.add(key);
  });

  return lookup.toStringArray();
}
module.exports = { sameTime2 };
