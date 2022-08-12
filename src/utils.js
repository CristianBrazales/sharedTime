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
function doOverlap(time1, time2) {
  return time1.start <= time2.end && time2.start <= time1.end;
}
function generateKey(arr = []) {
  let sorted = arr.sort();
  return sorted.join("-");
}
module.exports = { formatDataByDays, doOverlap, generateKey };
