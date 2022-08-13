function formatDataByDays(workerSchedules = []) {
  // each day will first have an array
  let calendar = { MO: [], TU: [], WE: [], TH: [], FR: [], SA: [], SU: [] };
  // iterate over each worker and set the data to each day
  workerSchedules.map((worker) => {
    let sections = worker.split("=");
    let name = sections[0];
    //separate each entry
    let entries = sections[1].split(",");
    entries.map((entry) => {
      let day = entry.substring(0, 2);
      let timeRange = entry.substring(2, entry.length).split("-");
      calendar[day].push({
        name: name,
        start: Number(timeRange[0].replace(":", "")),
        end: Number(timeRange[1].replace(":", "")),
        visited: false,
      });
    });
  });
  return calendar;
}
function flatDownData(dataArray) {
  let startStack = [];
  let endStack = [];

  dataArray.map((element) => {
    startStack.push({ name: element.name, value: element.start });
    endStack.push({ name: element.name, value: element.end });
  });
  startStack.sort((a, b) => (a.value > b.value ? -1 : 1));
  endStack.sort((a, b) => (a.value > b.value ? -1 : 1));
  let linearData = [];
  let startIndex = startStack.length - 1;
  let endIndex = startStack.length - 1;

  while (startStack.length !== 0 || endStack.length !== 0) {
    if (
      startIndex >= 0 &&
      startStack[startIndex].value < endStack[endIndex].value
    ) {
      linearData.push({
        name: startStack[startIndex].name,
        type: "start",
        value: startStack[startIndex].value,
      });
      startIndex--;
      startStack.pop();
    } else if (endIndex >= 0) {
      linearData.push({
        name: endStack[endIndex].name,
        type: "end",
        value: endStack[endIndex].value,
      });
      endIndex--;
      endStack.pop();
    }
  }
  return linearData;
}
function doOverlap(time1, time2) {
  return time1.start <= time2.end && time2.start <= time1.end;
}
function generateKey(arr = []) {
  let sorted = arr.sort();
  return sorted.join("-");
}
function generatePairs(list, item) {
  let pairs = [];
  list.map((element) => {
    if (element !== item) pairs.push(generateKey([element, item]));
  });
  return pairs;
}
module.exports = {
  formatDataByDays,
  doOverlap,
  generateKey,
  flatDownData,
  generatePairs,
};
