
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


// Input: {label1: 'value1'} (parent Obj), ['label2', 'value2'] (entry Pair Arr)
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
  return obj && // is it defined
    Object.entries(obj).length === 0 || // entries exists ?
    Object.values(obj).every( // check all attributes for the following checks
      attribute => (
        // Checks for attributes
        attribute === null ||
        attribute === undefined ||
        attribute === ''
        // || attribute === false // optional
      )
    )
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


function checkDataType(testEl) {
  const elType = typeof (testEl)
  let result;

  if (elType === 'object') {
    // Array
    if (Array.isArray(testEl)) {
      result = 'array'
      // console.log('Array Input');
    } else if (testEl === null) {
      result = 'null'
      // console.log('Null Input');
    } else {
      result = 'object'
      // console.log('Object Input');
    }
  } else if (elType == 'undefined') {
    result = 'undefined'
    // console.log('Undefined Input');
  } else { // String & Number
    result = elType
    // console.log(elType);
  }
  return result;
}


// Input: 
/* 
[
  { type: 'x', num: 1 }, 
  { type: 'y', num: 2 }, 
  { type: 'z', num: 3 }
]
 */
// Output: 
/* 
{ 
  x: { 
    num: 1
  } , 
  y: { 
    num: 2
  }, 
  z: { 
    num: 3
 } 
}
 */

export function mapDataToCategory(dataList = [], categories = false, filter = 'type', fallbackCtg = 'others') {


  // categories = ['purchased', 'manufactured']; 
  if (dataList && Array.isArray(dataList)) {


    const result = {}

    // create an array of all possible catagories
    const allCategories = categories ? categories.concat(fallbackCtg) : [fallbackCtg]
    allCategories.forEach(
      ctgName => result[ctgName] = []
    )


    // check if the input data list is valid & array
    if (dataList && Array.isArray(dataList)) {

      dataList.forEach(
        (dataEl, idx) => {

          // Check if categories are provided as Valid & Array
          if (categories && Array.isArray(categories) && categories.length > 0) {
            // Yes: add the matching in categories and others in fallbackCtg

            // check given categories include the Value-at-filter-key (V.A.F.K)
            categories.includes(dataEl[filter])
              // Yes: add the current item in the matching category
              ? result[dataEl[filter]].push(dataEl)
              // No: add the current item in the misc(fallbackCtg) category
              : result[fallbackCtg].push(dataEl)

          }
          else {
            // No: add every item in the fallbackCtgCategory
            result[fallbackCtg].push(dataEl)
          }
        }
      )
    }

    return result;

  } else {
    console.log(`Input is not valid`);
  }
}


// Input
/* 
{
  caption,
  click,
  styleArr
}
 */

export function buttonGenerator(caption = 'Button', click = () => { }, styleArr = []) {
  return <button
    onClick={click}
    className={concatStrings(styleArr)}
  >
    {caption}
  </button>
}