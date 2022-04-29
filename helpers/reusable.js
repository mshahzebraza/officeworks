import _, { startCase } from 'lodash';

// Input: ['c1','c2','c3']
// Output: 'c1 c2 c3'
export function concatStrings(strArr = [], separator = ' ') {
     return strArr.join(separator).trim();
}


// returns the type of the array if all elements are of same type otherwise returns false
export function checkArrType(arr = []) {
     const firstElType = checkDataType(arr[0]);
     const isElTypeSame = (el) => checkDataType(el) === firstElType; // returns true if all element is of same type as 'firstElType'
     const allElementsSameType = arr.every(isElTypeSame); // true
     return allElementsSameType ? firstElType : false;
}

// Input: 'helloThereMister'
// Output: 'Hello There Mister'
export function toSentenceCase(ccString) {
     return _.startCase(ccString);
}



// Input: 'Hello There Mister'
// Output: 'helloThereMister'
export function toCamelCase(inputString) {
     if (inputString === undefined) return inputString; // if false value
     return _.camelCase(inputString);
     // return inputString.trim().toLowerCase().replace(/\s+/g, '')
}



// returns a deep copy of object
export function deepClone(item /* = 'no value provided in deepClone()' */) {
     { //? The Performance expensive version
          // if (!original) console.error('original not found', original);
          // if (!original) return false;
          // return JSON.parse(JSON.stringify(original))
     }
     return _.cloneDeep(item)
}


// copy only a few keys from an object // equivalent to _.pick()
export function cloneAndPluck(sourceObject = {}, fetchKeys = [], removeKeys = []) {
     let newObject = {};

     // Fetch only the keys specified in fetchKeys and concat them to newObject
     if (fetchKeys !== 'all') {
          fetchKeys.forEach((key) => {
               if (sourceObject[key] === undefined) return;
               newObject[key] = sourceObject[key]
          });
     } else {
          newObject = deepClone(sourceObject);
     }

     // Remove the keys specified in removeKeys from newObject
     removeKeys.forEach((key) => {
          if (newObject[key] === undefined) return;
          delete newObject[key]
     });

     {    // ? Alternate Logic
          /* 
               sourceObjectCopy = deepClone(sourceObject)
          
               for (const iterator in sourceObjectCopy) {
                    if (!fetchKeys.includes(iterator)) {
                         delete sourceObjectCopy[iterator];
                    }
                    if (removeKeys.includes(iterator)) {
                         delete sourceObjectCopy[iterator];
                    }
               } 
          */
     }



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


/* Input
[
    "Ball Lead Screw",
    "Screw",
    "Screw",
    "Screw"
]
 */
/* Output
[
    {
        "item": "Ball Lead Screw",
        "qty": 1
    },
    {
        "item": "Screw",
        "qty": 3
    }
]
 */
export function removeDuplicateAndCategorize(list = [], label = 'item') {
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

export function replaceLastCharacter(char, replacement, replaceLength = 1) {
     return (char.toString()).slice(0, -replaceLength) + replacement;
};

function genErrMsg(message) {
     throw new Error(message)
}


// check if a string is non-empty and not undefined or null and capitalize the first letter
export function capitalizeFirstLetter(string) {
     return string.charAt(0).toUpperCase() + string.slice(1);
}

// check if a string is non-empty and not undefined or null and de-capitalize the first letter
export function deCapitalizeFirstLetter(string) {
     return string.charAt(0).toLowerCase() + string.slice(1);
}



export function equateCase(a, b) {
     return a.toLowerCase() === b.toLowerCase()
}

export function mapDataToCategory(dataList = [], categories = false, filter = 'type', fallbackCtg = 'others') {


     try {

          // Check if the DataList is Invalid or not an Array
          dataList ?? genErrMsg('DataList is required');
          !Array.isArray(dataList) && genErrMsg('Datalist must be an Array');

          // Check if the Categories is Invalid, not an Array or Empty
          categories ?? genErrMsg('Categories is required');
          !Array.isArray(categories) && genErrMsg('Categories must be an Array');
          (categories?.length === 0) && genErrMsg('Categories must not be empty');



          // Append the fallbackCtg (usually set to 'others') to the end of the array
          categories = categories.concat(fallbackCtg)

          // create an object with its keys set to the categories and values set to an empty array
          const result = Object.fromEntries(categories.map(ctg => [deCapitalizeFirstLetter(ctg), []]))

          dataList.forEach(
               (dataEl, idx) => {

                    // check if the dataEl[filter] is included in categories (user-defined + fallbackCategory)
                    categories.findIndex(el => equateCase(dataEl[filter], el)) >= 0
                         // Yes: add the current item in the matching category
                         ? result[deCapitalizeFirstLetter(dataEl[filter])].push(dataEl)
                         // No: add the current item in the misc(fallbackCtg) category
                         : result[deCapitalizeFirstLetter(fallbackCtg)].push(dataEl)

               }
          )


          return result;



     } catch (error) {
          // generate a console log with styling red color
          // console.log(error);

          console.log(`%c Error: ${error.message}`, `background: #f00; color: #fff; padding: 0.5rem 1rem;`);

     }
}

export async function request({
     url = '',
     params = null,
     method = 'GET',
     headers = {
          'Content-Type': 'application/json', // the request won't work without specifying headers
          'Accept': 'application/json',
     },
     body = null,
     callback = () => { },
}) {

     try {

          // Check if the callback is Invalid
          !(typeof (callback) === 'function') && genErrMsg('Callback must be a function');

          // Append the params to the url if params is not null
          if (params) url = url.concat(`?${new URLSearchParams(params)}`)

          // Create the request
          const response = await fetch(
               url, {
               method,
               headers,
               body: JSON.stringify(body)
          }
          )

          const resJson = await response.json();
          callback(resJson);
          return resJson;


     } catch (error) {
          // generate a console log with styling red color
          console.log(`%c Error: ${error.message} @ ${url}`, `background: #f00; color: #fff; padding: 0.5rem 1rem;`);

     }
}
// create a function to generate invalid response
export function invalidResponse(res, message = 'Invalid response') {
     console.assert(!!res, 'res must be passed in the "invalidResponse" function');
     return res.status(400).json({
          success: false,
          message,
          data: null,
          error: message
     })
}
export async function httpParams(apiLink = 'http://localhost:3000/api/connect', method = 'GET', data = null, params = null) {
     // convert the params object to a query string starting with a '?'
     const queryString = params
          ? `?${Object.entries(params).map(
               ([key, value]) => `${key}=${value}`).join('&')}
      ` :
          '';


     const response = await fetch(
          apiLink.concat(queryString),
          {
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
export function setDigits(num, places) {
     const zero = places - num.toString().length + 1;
     return Array(+(zero > 0 && zero)).join("0") + num;
}



// create an array of items with a prefix, separator and min-digits-of-suffix allowing to start the index from indexShift
// indexShift is the number before the first item index ( can be passed if the array needs to start from a specific index i.e indexShift +1 )
export function superArray(itemCount = 10, prefix = 'prefix', suffixDigits = 3, separator = '---', indexShift = 0) {
     const initialValue = 0;
     return Array(itemCount)
          .fill(initialValue)
          .map(
               (_, idx) => (
                    `${prefix}${separator}${setDigits((indexShift + idx + 1), suffixDigits)}`
               )
          )
}



export function getIDseries(str = 'preO-0001, preA-[01,005-075,089-115(2)] ,,, preB-009[1], preC-[01-12]-sufC,preD-001') {

     return str.replaceAll(' ', '')
          .split('')
          .reduce(
               (acc, cur, idx, arr) => {
                    const accCopy = Object.assign({}, acc);


                    // *Indices/Letter Block
                    if (cur !== ',' && cur !== '[' && cur !== ']' && cur !== '(') {

                         if (accCopy.nest === 0) {
                              (arr[idx - 1] === ']' || accCopy.suf.length > 0) ?
                                   accCopy.suf = accCopy.suf.concat(cur)
                                   : accCopy.pre = accCopy.pre.concat(cur);
                         } else if (accCopy.nest === 1) {
                              accCopy.idIndex.str = accCopy.idIndex.str?.concat(cur)
                         } else if (accCopy.nest === 2) {
                              accCopy.idIndex.length = accCopy.idIndex.length.concat(cur)
                         }
                    }

                    // *Repetition Block Check - Checks for repeated numbers and letters (Placing on top would stop normal repeated letters too)
                    if (arr[idx - 1] === arr[idx]) { return accCopy };


                    // *Digits Block / Small Brackets
                    cur === '(' && accCopy.nest++
                    cur === ')' && accCopy.nest--

                    // *Large Brackets / IDindex Block
                    if (cur === '[') {
                         accCopy.nest++;
                         accCopy.nest > 1 && alert('Nesting Is Not allowed');
                    }
                    if (cur === ']') {
                         accCopy.idIndex.list = suffixTranslator(accCopy.idIndex.str); // transform idIndex.str into a range.
                         accCopy.idIndex.str = ''; // reset idIndex.str
                         accCopy.nest--;
                    }

                    // *Closing Block / Comma Block
                    if (cur === ',' || idx === arr.length - 1 /* ,(idx === arr.length - 1 && cur===']') */) {
                         if (accCopy.nest === 0) { // no nesting at current level => finalize the part ID
                              const prefix = accCopy.pre/* .join('') */;
                              const ids = accCopy.idIndex.list;
                              const digits = parseInt(accCopy.idIndex.length) || 3;
                              const suffix = accCopy.suf;

                              (ids.length > 0)
                                   ? ids.forEach(itemIndex => {
                                        const newIdString = [prefix, setDigits(itemIndex, digits), suffix].join('')
                                        accCopy.result.push(newIdString.toUpperCase())
                                   }
                                   )
                                   : accCopy.result.push(prefix);

                              accCopy.pre = '';
                              accCopy.suf = '';
                              accCopy.idIndex.length = '';
                              accCopy.idIndex.list = [];


                              // return accCopy;
                         } else if (accCopy.nest === 1) {
                              accCopy.idIndex.str = accCopy.idIndex.str?.concat(cur)
                         } else if (accCopy.nest === 2) {
                              alert('"," not allowed in between "(" and ")"')
                         }
                    }


                    // if (idx === arr.length - 1) console.log('final result', accCopy.result);

                    return accCopy;
               },
               {
                    pre: '',
                    suf: '',
                    idIndex: {
                         length: '', // length of the id index
                         list: [],
                         str: ''
                    },
                    nest: 0,
                    result: []
               }
          ).result

}


// "01,005-007" - [1,5,6,7]  
function suffixTranslator(
     str = "01,005-075,089-115",
     separator = ',',
     seriesSymbol = '-'
) {
     const separated = str.split(separator); // [01,005-075,089-115] 

     const result = separated.reduce(
          (acc, cur, idx, arr) => {

               // "2-5" => 2,3,4,5 => (5-3)+1 = 4
               const curSplit = cur.split(seriesSymbol); // "005-075" => ["005","075"], "089-115" => ["089","115"]

               if (curSplit.length === 1) {
                    // No series
                    return [...acc, parseInt(...curSplit)]

               } else if (curSplit.length === 2) {
                    // contains series //// if the string contains a dash, then it is a series
                    return [
                         ...acc,
                         ...range(
                              parseInt(curSplit[0]),
                              parseInt(curSplit[1]))
                    ]

               } else if (curSplit.length > 2) {
                    // Multiple seriesSymbols (-) found
                    alert('Multiple seriesSymbols (-) found');
               }
          }, []
     )

     return result
}



// Sequence generator function (commonly referred to as "range")
const range = (start, stop, step = 1) => Array.from(
     { length: (stop - start) / step + 1 }, // *defining the length property of the Array as Array is a special object with a length property equal to number of elements in the array
     (_, i) => start + (i * step)
);

// Find the all indices at occurrence of 'subStr' in 'str'
function findIndices(str, subStr) {
     let i = -1;
     let indices = [];
     while ((i = str.indexOf(subStr, i + 1)) >= 0) {
          indices.push(i);
     }
     return indices;
}

// merges two arrays of equal length to a single array, making pairs of elements at same index.
function mergeToPairs(arr1 = [], arr2 = []) {
     arr2.length > 0
          && arr1.length > 0
          && arr1.map(
               (leftIdx, idx) => {
                    return [leftIdx, arr2[idx]]
               }
          )
}

// returns a single array with pairs of indices at occurrence of two enclosing strings
function getIndicesPairs(str = '[johny],[shahzeb]', matchStr1 = '[', matchStr2 = ']') {
     /* const leftBktIndices = findIndices(str, matchStr1); // [1, 9]
     const rightBktIndices = findIndices(str, matchStr2);// [7, 17]
     return mergeToPairs(leftBktIndices, rightBktIndices) // [[1, 7], [9, 17]]
      */
     return mergeToPairs(
          findIndices(str, matchStr1),// [0, 8]
          findIndices(str, matchStr2) // [6, 16]
     ) // [[0, 6], [8, 16]]
}

// returns the string enclosed in two enclosing strings
function getEnclosedStr(str = '', enclosersIndexPair = ['startIndex', 'endIndex']) {

     return str.substring(enclosersIndexPair[0] + 1, enclosersIndexPair[1]);

}


// returns the string enclosed in all the pairs of enclosing strings
function getEnclosedStrArr(str = '', IndexPairArray = []) {
     return IndexPairArray.map(indexPair => getEnclosedStr(str, indexPair));
}


// ? NOT USED
function isArrSorted(arrTest = []) {
     return arrTest.every(
          (num, idx, arr) => {
               return num > arr[idx - 1] || idx === 0
               // return num < arr[idx + 1] || idx === arr.length - 1 // Alternative
          }
     )
}

// getOpenInstances([2,5,9],[[3,4],[9,15]]) => [2,5]
// Param 01: indices of target
// Param 02: Pairs of enclosing string indices.
// Result: All the comma indices outside the enclosing string indices.
function getOpenInstances(targetIndices, enclosingIndexPairs) {

     return targetIndices.filter(
          (num, idx, arr) => { // num = current comma Index

               let isNumValid = false;
               // Indices Loop
               for (let i = 0; i < enclosingIndexPairs.length - 1; i += 2) {

                    if (
                         num > enclosingIndexPairs[i][1]
                         // ? if comma is greater than end of closing bracket Index 'AND'
                         && num < enclosingIndexPairs[i + 1][0]
                         // ? if comma is lesser than start of opening bracket Index 'OR'
                         || num > enclosingIndexPairs[enclosingIndexPairs.length - 1][1]
                         // ? if comma is after last bracket pair's end Index 'OR'
                         || num < enclosingIndexPairs[0][0]
                         // ? if comma is before first bracket pair's start index
                    ) {
                         isNumValid = true; // if any of the comma indices fails the condition, set isNumValid to false
                    }

               }
               return isNumValid; // return true if the comma index is valid
          }
     )
}



/* Input

{
    refId: 'PO-001', //* String
    totalCost: '$1,000', //* String
    commaTags: ['tag1', 'tag2', 'tag3'], //* Array of Strings
    dailySalesRepeated: [100,100,200,150,200], //* Array of Strings
    parts: //* Array of Objects - required key is a string : 'name'
      [
        { name: "Ball Lead Screw" },
        { name: "Screw" },
        { name: "Screw" },
        { name: "Screw" },
      ]
  }
 */
/* Output: A Map
  [
    "refId": 'PO-001',
    "totalCost": '$1,000',
    commaTags: 'tag1, tag2, tag3', //* Array of Strings - concatenated option
    dailySalesRepeated: [ {item:100,qty:2}, {item:200,qty:2}, {item:150,qty:1}], //* Array of Strings: remove option
    parts: [{name: "Ball Lead Screw", qty: 1}, {name: "Screw", qty: 3}] //* Array of objects reqKey @ name
  ]
 */
export function summarizer(
     data = {},
     arrOptions = [/* 
     [
         ['commaTags', '___' ], //? concatenate AoS with ___ as separator
         ['dailySalesRepeated', 'removeUnique'] //? categorize AoS
          //? Other than this, every AoS will be concatenated with ', '
          ['AoO_name', 'objKeyToCategorize']
          //? And every AoO, will first be reduced to AoS (strings being the 'objKeyToCategorize'), then will be categorized 
       ] */
     ],
     objOptions = []

  // * indicates at parent key of objects, the child keys to be used
  /* objOptions example:
    [
      ['parts', 'name'],
      ['modules', 'nomenclature']
    ]
  */,
     objDeleteKeys = []
     /* 
       objDeleteKeys example:
       [ 'index', '_id']
      */
) {

     // Delete unwanted keys if any
     if (objDeleteKeys) {
          objDeleteKeys.forEach(
               (key) => data.hasOwnProperty(key) && delete data[key]
          )
     }

     // Assuming that the arrOptions & objOptions are both array of arrays with 2 elements
     const arrOptionsMap = arrOptions && new Map(arrOptions);
     const objOptionsMap = objOptions && new Map(objOptions);
     console.log('arrOptionsMap', arrOptionsMap);

     const result = Object.entries(data)
          .reduce(
               (acc, [key, val], index/* , arr */) => {
                    let returnValue;

                    const valDataType = checkDataType(val);

                    // *String
                    if (valDataType !== 'array' && valDataType !== 'object') {
                         console.log('index: ', index, 'key: ', key, '----  String');
                         returnValue = val;
                    }

                    // *Array of Strings
                    if (valDataType === 'array' && checkArrType(val) === 'string') { //"of strings"
                         console.log('index: ', index, 'key: ', key, '---- Array of Strings');

                         // If the key is in the arrOptionsMap, then value against that key would be the 'concatenateSeparator', unless the value is 'removeUnique'
                         const arrOptionDefinedForKey = arrOptionsMap.get(key) || ', ';
                         const shouldConcatenate = arrOptionDefinedForKey !== 'removeUnique';
                         // Either concatenate or remove-duplicates-and-categorize the items
                         returnValue = shouldConcatenate
                              ? concatStrings(val, arrOptionDefinedForKey)
                              : removeDuplicateAndCategorize(val);
                    }

                    // *Array of Objects 
                    if (valDataType === 'array' && checkArrType(val) === 'object') { //"of objects"
                         console.log('index: ', index, 'key: ', key, '---- Array of Objects');


                         const selectedKeyToCategorize = arrOptionsMap.get(key) || false;
                         if (!selectedKeyToCategorize) return acc // Don't bother to return anything at all against the current-data-key, if no key is selected from the objects in AoO

                         // filter only the required key'values from the each element of array of objects and return an array of strings
                         returnValue = removeDuplicateAndCategorize(
                              val.map(AoOitem => AoOitem[selectedKeyToCategorize])
                         )

                    }

                    // *Object 
                    // TODO: review and add support for nested objects of strings/numbers
                    if (valDataType === 'object') {
                         returnValue = val
                    }

                    // *Object Options - key replacement
                    // replace the key with the value of the objOptionsMap
                    // Check:-
                    // Is the current key included in objOptionsMap
                    // If yes then get the value of map and replace the existing key with the value of map against the key
                    if (objOptions) {
                         const objOptionDefinedForKey = objOptionsMap.get(key) || false;
                         if (objOptionDefinedForKey) {
                              key = objOptionDefinedForKey;
                              // returnValue = returnValue[objOptionDefinedForKey];
                         }
                    }

                    // *Array with zero length
                    if (valDataType === 'array' && val.length === 0) {
                         returnValue = [];
                    }

                    acc.push([key, returnValue]);
                    return acc;
               }, [])

     return result

}

export function summarizerNew(
     data = {},
     options = {
          // ? following 2 keys are the data-keys, and must be considered as data options
          replaceKeys: [/* ['key-to-be-replaced', 'key-to-replace'] */],// data.key-to-be-replaced -> data.key-to-replace
          deleteKeys: [/* 'parts', 'qty' */], // delete data.parts, data.qty
          // ? array options are only focussed on the keys holding array values and hence it is nested
          array: {
               concatenateKeys: [/* 
                         ['key-1-values-to-concatenate', 'concatSeparatorForKey1'], 
                         ['key-2-values-to-concatenate', 'concatSeparatorForKey2'], 
                    */],
               categorizeKeys: [/* 'key-3-values-to-categorize' */],
          },
     },
     arrOptions = [],
     objOptions = [],
     objDeleteKeys = []
) {
     const allArrKeys = Object.keys(data).filter(key => checkDataType(data[key]) === 'array');


     // 1. Delete the data-keys matching the options.object.deleteKeys
     options.deleteKeys.forEach(
          (key) => data.hasOwnProperty(key) && delete data[key]
     )

     // 2. All the categorizeKeys-arr-values must be replaced with categorized object-data
     options.array.categorizeKeys.forEach(
          (key) => {
               const val = data[key];// [...array...]
               if (checkDataType(val) !== 'array') {
                    console.error('The key: ', key, ' is not an array and yet categorization is attempted on it.');
                    return null
               }
               // replace the key from an array of strings with an array of objects
               data[key] = removeDuplicateAndCategorize(val); // [ {name, qty}, {name, qty} ]
               // delete the key from allArrKeys - so that the same keys are not used in concatenation block
               allArrKeys.splice(allArrKeys.indexOf(key), 1);
          }
     )

     // 3. All the array-holding, non-categorizeKeys must be concatenated with ', ', unless the current key is specified in the options.array.concatenateKeys with a special 'concatenateSeparator'
     //? concatenate keys contain a map, keys of which are the keys to be concatenated and values are the concatenation separators
     const concatMap = new Map(options.array.concatenateKeys);
     const concatKeysArr = [...concatMap.keys()];

     // concatenate all the array-keys (except the categorizeKeys which have already been removed from allArrKeys)
     allArrKeys.forEach(
          (key) => {
               const val = data[key];
               let concatSeparator = ', ';
               // if concatSeparator is specifically defined for any of the keys, then use that to concatenate. Otherwise use ', ' to concatenate.
               if (concatKeysArr.includes(key)) {
                    concatSeparator = concatMap.get(key);
               }
               // replace the data-key with the concatenated string
               data[key] = concatStrings(val, concatSeparator);
          }
     )

     // 4. Replace the key-names with the values of the options.replaceKeys
     options.replaceKeys.forEach(
          (key) => {
               const [oldKey, newKey] = key;
               // check if data has the key to be replaced
               if (data.hasOwnProperty(oldKey)) {
                    const val = data[oldKey];
                    data[newKey] = val;
                    delete data[oldKey];
               }
          }
     )



     return data;
}

export function summarizerNew2(
     data = {},
     options = {
          // ? following 2 keys are the data-keys, and must be considered as data options
          replaceKeys: [/* ['key-to-be-replaced', 'key-to-replace'] */],// data.key-to-be-replaced -> data.key-to-replace
          deleteKeys: [/* 'parts', 'qty' */], // delete data.parts, data.qty
          // ? array options are only focussed on the keys holding array values and hence it is nested
          array: {
               concatenateKeys: [/* 
                         ['key-1-values-to-concatenate', 'concatSeparatorForKey1'], 
                         ['key-2-values-to-concatenate', 'concatSeparatorForKey2'], 
                    */],
               categorizeKeys: [/* 'key-3-values-to-categorize' */],
          },
          nestedArrayOfObjects: [/* ['key-4-object-values-to-categorize', 'the focal key of the objects to be categorized'] */],
     }
) {

     const arrDeleteKeys = options.deleteKeys; //? these keys will be deleted
     const replaceKeysMap = new Map(options.replaceKeys); //? these key-names will be replaced
     const arrConcatMap = new Map(options.array.concatenateKeys); //? custom concatenation separators
     const arrCtgKeys = options.array.categorizeKeys; //? will always be categorized
     const arrNestedMap = new Map(options.nestedArrayOfObjects); //? will always be categorized after fetching the specified nested key

     // Delete unwanted keys if any
     arrDeleteKeys.forEach(
          (key) => data.hasOwnProperty(key) && delete data[key]
     )

     const mapArrResult = Object.entries(data)
          .reduce(
               // data-key, data-value
               (acc, [key, val], index/* , arr */) => {
                    let returnValue;

                    const valDataType = checkDataType(val);

                    // *String
                    if (valDataType !== 'array' && valDataType !== 'object') {
                         // console.log('index: ', index, 'key: ', key, '----  String');
                         returnValue = val;
                    }

                    // *Array of Strings
                    if (valDataType === 'array' && checkArrType(val) === 'string') { //"of strings"
                         // console.log('index: ', index, 'key: ', key, '---- Array of Strings');

                         // If the key is in the arrOptionsMap, then value against that key would be the 'concatenateSeparator', unless the value is 'removeUnique'
                         const shouldCategorize = arrCtgKeys.includes(key);
                         if (shouldCategorize) {
                              returnValue = removeDuplicateAndCategorize(
                                   val,
                                   shouldCategorize
                              );
                         } else {
                              const concatSeparator = arrConcatMap.get(key) || ', ';
                              returnValue = concatStrings(val, concatSeparator);
                         }
                    }

                    // *Array of Objects 
                    if (valDataType === 'array' && checkArrType(val) === 'object') { //"of objects"
                         // console.log('index: ', index, 'key: ', key, '---- Array of Objects');

                         const nestedCtgKey = arrNestedMap.get(key);
                         if (!nestedCtgKey) {
                              console.error('No categorization options found for key: ', key);
                              // returnValue = val; //? if you want to keep the AoO data intact
                              return acc //? if you want to remove the array of objects in the final data
                         }

                         // check if the nestedCtgKey is really present in the val present in AoO
                         const isNestedKeyPresentInAllObjects = val.every(obj => obj.hasOwnProperty(nestedCtgKey));
                         if (!isNestedKeyPresentInAllObjects) {
                              console.error('nestedCtgKey: ', nestedCtgKey, ', is not present in all objects');
                              returnValue = val
                         };

                         if (nestedCtgKey) {
                              const listOfNestedCtgKeyValues = val.map(AoOitem => AoOitem[nestedCtgKey])
                              returnValue = removeDuplicateAndCategorize(listOfNestedCtgKeyValues);
                         }
                    }

                    // *Array with zero length
                    if (valDataType === 'array' && val.length === 0) {
                         returnValue = [];
                    }

                    // *Object 
                    // TODO: review and add support for nested objects of strings/numbers
                    if (valDataType === 'object') {
                         returnValue = val
                    }

                    // *Data key replacement
                    const currentKeyReplacement = replaceKeysMap.get(key)
                    if (!!currentKeyReplacement) { key = currentKeyReplacement }

                    acc.push([key, returnValue]);
                    return acc;
               }, [])

     const result = Object.fromEntries(mapArrResult)
     return result

}



/* Input
mapData =[
  keyA: 'valueA',
  keyB: 'valueB',
],
replaceOptions = [
  ['keyA', 'newKeyA'],
  ['keyB', 'newKeyB']
]
 */
/* Output: A Map
  [
    'newKeyA': 'valueA',
    'newKeyB': 'valueB'
  ]
 */
// ? Replaces the keys of a Map
export const replaceKeysMap = (mapData = [], replaceOptions = []) => {
     // Making sure the mapData is an Array of Arrays and not a Map
     mapData = [...mapData];

     replaceOptions.forEach(
          ([key, newKey]) => {
               // generate an array of keys from a duplicated data
               const keyArr = [...new Map(mapData).keys()]

               const matchIdx = keyArr.findIndex(
                    el => el === key
               )
               mapData[matchIdx]?.[0] = newKey
          }
     )
     return mapData;
}


export async function asyncForEach(array, callback) {
     for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
     }
}

export function badRequest(requestMessage) {
     return res.status(200).json({
          success: false,
          message: requestMessage,
          data: null,
          error: requestMessage
     })
}

// generate a next fetcher
export const fetcher = (...args) => fetch(...args).then(res => res.json())

