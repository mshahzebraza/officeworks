
// Input: ['c1','c2','c3']
// Output: 'c1 c2 c3'
export function concatStrings(strArr) {
  return strArr.reduce((acc, cur, arr) => {
    return acc.concat(` ${cur}`);
  }, '');
}

// Input: 'helloThereMister'
// Output: 'Hello There Mister'
export function camelToSentenceCase(ccString) {
  const sfResult = ccString.replace(/([A-Z])/g, " $1"); // sf - semi-final
  return sfResult.charAt(0).toUpperCase() + sfResult.slice(1);
}


// returns a deep copy of object
export function deepClone(original) {
  return JSON.parse(JSON.stringify(original))
}


// copy only a few keys from an object // equivalent to _.pick()
export function cloneAndPluck(sourceObject, keys) {
  const newObject = {};
  keys.forEach((obj) => { newObject[obj] = sourceObject[obj]; });
  return newObject;
};


// Input: {label1: 'value1'}, ['label2', 'value2']
// Output: {label1: 'value1', label2: 'value2'}
export function addObjectPair(parentObj, entryPairArr) {
  const newParent = deepClone(parentObj);
  newParent[`${entryPairArr[0]}`] = entryPairArr[1]
  return newParent;
}


// Input: {label1: 'value1', label2: 'value2'}
// Output: [['label1': 'value1'], ['label2': 'value2']]
// performs transformation on each object-pair and returns an array.
export function getTransformedEntries(object, transformer = pairToEntry) {
  return Object.entries(object).map((el, idx) => {
    return transformer(el, idx)
  });
}

// Input: ['label1', 'value1']
// Input: {label1: 'value1'}
export function pairToEntry(pairArr, pairIndex) {
  return {
    label: pairArr[0], value: pairArr[1]
  }
}
