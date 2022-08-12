class KeyCounter {
  lookupTable;

  constructor() {
    this.lookupTable = new Map();
  }
  add(key) {
    let currentValue = this.lookupTable.get(key);
    if (currentValue !== undefined) this.lookupTable.set(key, ++currentValue);
    else this.lookupTable.set(key, 1);
  }
  toStringArray() {
    let arr = new Array();
    let entries = [...this.lookupTable.entries()];
    entries.map((e) => {
      let str = e[0] + ": " + e[1];
      arr.push(str);
    });
    return arr;
  }
}
module.exports = { KeyCounter };
