
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
// Output-phase1: [ 
//   ['label1': 'name'],
//   ['label2': 'John Doe']
//  ]
// Output-phase2: [
//   {
//     label: "label1",
//     value: "name"
// },
// {
//     label: "label2",
//     value: "John Doe"
// }
// ]
// performs transformation on each object-pair and returns an array.
export function transformEntries(object, transformer = pairToEntry) {
  return Object.entries(object).map((el, idx) => {
    return transformer(el, idx)
  });
}
global.x = transformEntries;
// returns transformed data from an array
export function transformArray(array, transformer) {
  return array.map((el, idx) => {
    return transformer(el, idx)
  });
}

export function isObjEmpty(obj) {
  console.log(obj);
  return obj && Object.entries(obj).length > 0
}

// Object.entries(data[dataIndex].specification).map((specPair, specPairIndex) => {
//   return <li className={styles.pair} key={specPairIndex}>
//     <h5 className={styles.pairField}>{specPair[0]}: </h5>
//     <p className={styles.pairValue}>{specPair[1]}</p>
//   </li>
// })

// Input: ['label1', 'value1']
// Input: {label1: 'value1'}
function pairToEntry(pairArr, pairIndex) {
  return Object.fromEntries(pairArr)

}

export function genLog(label, data, background = '#78f086', padding = '0.5rem 1rem', color = '#000') {
  console.log(`%c ${label}`, `background: ${background}; padding: ${padding}; color: ${color}`, data);
}




// Input: ['s','s','y','y','y','z']
/* 
Output: [
  {item:'s', qty: 2},
  {item:'y', qty: 3}
  {item:'z', qty: 1}
]
 */
export function removeDuplicate(list, label = 'item') {
  let result;
  if (list.length === 0) {
    result = []
  } else {

    result = list.reduce((prev, cur, arr) => {

      // Check duplicate
      const duplicateIndex = prev.findIndex((el) => el[label] === cur)

      // No Duplicate
      if (duplicateIndex === -1) {
        prev.push(
          { [label]: cur, qty: 1 }
        )
      };

      // Found Duplicate
      if (duplicateIndex >= 0) {
        prev[duplicateIndex].qty++;
      };

      return prev

    }, [])
  }

  return result;
}




function genFormFields(objData) {
  return objData.map((el, elIdx) => {
    return {
      field: el[0],
      defaultValue: el[1],
    }
  })
}