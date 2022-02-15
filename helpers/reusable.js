
// Input: ['c1','c2','c3']
// Output: 'c1 c2 c3'
export function concatStrings(strArr = []) {
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
export function cloneAndPluck(sourceObject = {}, keys = []) {
  const newObject = {};
  keys.forEach((key) => {
    if (sourceObject[key] === undefined) return;
    newObject[key] = sourceObject[key]
  });
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


// Input: ['label1', 'value1']
// Input: {label1: 'value1'}
function pairToEntry(pairArr, pairIndex) {
  return Object.fromEntries(pairArr)

}

export function genLog(label, data, background = '#78f086', padding = '0.5rem 1rem', color = '#000') {
  console.log(`%c ${label}`, `background: ${background}; padding: ${padding}; color: ${color}`, data);
}

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

export function genFormFields(objData) {
  return objData.map((el, elIdx) => {
    return {
      field: el[0],
      defaultValue: el[1],
    }
  })
}


export function checkDataType(testEl) {
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

export const replaceLastCharacter = (char, replacement, replaceLength = 1) => {
  return (char.toString()).slice(0, -replaceLength) + replacement;
};



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

export async function httpParams(apiLink = 'http://localhost:3000/api/connect', method = 'GET', data = null) {
  // export const httpParams = async (apiLink = 'http://localhost:3000/api/connect', method = 'GET', data = null) => {

  // console.log("HTTP Request Params");
  // console.log(apiLink, method);
  // console.log("data: ", data);

  const response = await fetch(apiLink, {
    method: method,
    headers: {
      'Content-Type': 'application/json' // the request won't work without specifying headers
    },
    body: data && JSON.stringify(data) // returns null (default parameter) if not defined
  })
  return response;
}

// Created by Github Copilot
// create a function to format a number to 3 digits with leading zeros
export const formatNumber = (num, places) => {
  const zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}



// create an array of items with a prefix, separator and min-digits-of-suffix allowing to start the index from indexShift
// indexShift is the number before the first item index ( can be passed if the array needs to start from a specific index i.e indexShift +1 )
export const superArray = (itemCount = 10, prefix = 'prefix', suffixDigits = 3, separator = '---', indexShift = 0) => {
  const initialValue = 0;
  return Array(itemCount)
    .fill(initialValue)
    .map(
      (_, idx) => (
        `${prefix}${separator}${formatNumber((indexShift + idx + 1), suffixDigits)}`
      )
    )
}
