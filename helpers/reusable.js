

/**
 * @param  {[String]} strArr ['hello','-','world']
 * @param  {[{Object}]} separator ' '(default)
 * @returns {String} 'hello - world'
 */
export function concatStringsWith(strArr = [], separator = ' ') {
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
// if any of the required key is not found in sourceObject then nothing is returned against that key. (that key will not be found in returned object)
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
            body: body && JSON.stringify(body)
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
export function invalidResponse(res, message = 'Invalid response', statusCode = 400) {
    console.assert(!!res, 'res must be passed in the "invalidResponse" function');
    return res.status(statusCode).json({
        success: false,
        message,
        data: null,
        error: `Error Code ${statusCode}: ${message}`
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
            (_, idx) => (`${prefix}${separator}${setDigits(
                (indexShift + idx + 1),
                suffixDigits
            )}`)
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



/* Input for "summarizer" not "summarizerNew2" - may not be same for summarizerNew2
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

/**
 * The function is used to graphically present a set of data (usually from an object) in key-value pairs.
 * The function offers multiple use-cases
 * 
 * 
 * 
 * Use-Case-1: Partial Representation of Data
 *      The data may be "completely" or "partially" presented. In the latter case, the keys which are not meant to be shown are explicitly declared in the @param {deleteKeys}. These keys are deleted from the data-set before using it for data-representation.
 * Note: A duplicate data-set is created in the start to ensure that the deletion does not manipulate the original data-set.
 * 
 * 
 * 
 * Use-Case-2: Name Change of data-keys
 *      Sometimes the data is stored against the keys with coded terminologies to save writing effort (e.g. tc for totalCost, initCode for initialization-code etc. ). This maybe be readable/understandable by the developer but its not very intuitive and that is why it must not be used for user-facing text.
 * This is why we may want to change the name of some 'keys' to another name before letting the summarizer component use the key to represent the data-set.
 * For this reason, @param {replaceKeys}. is used to pass in the array-list of [old-key , new-key] pairs to modify the old-key to new-key.
 * 
 * 
 * 
 * Use-Case-3: Representation of Nested-Data
 *      Often we are greeted with multiple levels of nested data in out data-sets and it is really difficult to represent the nested data in the UI. The complexity of the situation is intensified due to the fact that the nested data may be present in many forms
 * 
 * 1. Array of Strings - [a,x,y,z]
 *      possible requirement of concatenating the items into a single string e.g. 'a,x,y,z'
 * 
 * 2. Array of Strings (contains potential duplicates) - [a,x,x,y,y,z]
 *      possible requirement of removing the duplicates and turning the [a,x,x,y,y,z] structure to 
 * [ {item:a,qty:1} , {item:x,qty:2} , {item:y,qty:2} , {item:z,qty:1} ]. This structure helps to remove duplicates and, at the same time, maintains a count of repetition for each item
 * 
 * 3. Array of Objects (contain potential duplicates)
 *      Sometimes the array may simply contain many items of different properties for example in an array of person each item is an object containing many properties like bloodGroup, height, complexion, age etc.
 *      possible requirement is to select on of these properties as the focal-property (aka reqKey) and de-dupe the items against the focal-key and, at the same time, maintain a count of repetition of focal-key for each item.
 * Note: It may be noted that other properties are removed in the process of de-duping
 * 
 * Possible Input for such a case:
 * @data: [
 *      { name: "Ball Lead Screw", material:'40Cr' },
 *      { name: "Screw", material:'Al' },
 *      { name: "Screw", material:'SS' },
 *      { name: "Screw", material:'Al 2024' },
 * ]
 * @focal-key: 'name'
 * Output for such input would be
 * [{name: "Ball Lead Screw", qty: 1}, {name: "Screw", qty: 3}]
 * 
 * 
 *  
 * Input Types for "data" - multiple types of data-fields (values-of-keys) can be passed into the object:-
 * 1. key(string): value(primary-data-type)
 * 2. key(string): value(reference-data-types)
 * 
 * Everything is simple and understandable with "primaries". However, "reference-data-types" bring some problems to our attention.
 * Let's see what type of ref-data-types are usually witnessed:
 * 
 * 1-a. Array of Strings 
 * { fruits: ['banana','apple','pear'] }
 * this type of data is best represented in two 
 * 
 * 
 * @param {{}} data 
 * @param {{}} options 
 * @returns {}
 */
export function summarizerNew2(
    {
        data = {},
        options = {
            // ? following 2 keys are the data-keys, and must be considered as data options
            replaceKeys: [/* ['key-to-be-replaced', 'key-to-replace'] */],// data.key-to-be-replaced -> data.key-to-replace
            deleteKeys: [/* 'parts', 'qty' */], // delete data.parts, data.qty
            // ? array options are only focussed on the keys holding array values and hence it is nested
            array: {
                // temporary solution: ideally separator should be allowed to be different for each array
                concatSeparator: ', ',
                concatenateKeys: [/* 
                         ['key-1-values-to-concatenate', 'concatSeparatorForKey1'], 
                         ['key-2-values-to-concatenate', 'concatSeparatorForKey2'], 
                    */],
                categorizeKeys: [/* 'key-3-values-to-categorize' */],
            },
            objectKeysAndPullKeys: {/* key-whose-values-to-categorize: focal-value-of-to-be-pulled */ },
        }
    }
) {
    console.log('log 1 - options: ', options)

    const concatSeparator = '--'
    const arrDeleteKeys = options.deleteKeys; //? these keys will be deleted
    // NOT WORKING
    const replaceKeysMap = new Map(options.replaceKeys); //? these key-names will be replaced
    const arrCtgKeys = options.array.categorizeKeys; //? will always be categorized
    const arrConcatKeys = options.array.concatenateKeys; //? will always be categorized
    const objectAndFocalKeySet = options.objectKeysAndPullKeys; //? will always be categorized after fetching the specified nested key
    // ObjectKeysWithFocalKeyMap
    // ObjectAndFocalKeys - a collection of keys-values where keys point to the properties of the data-object that are Objects and values point to the nested key to be pulled from that object.

    // Delete unwanted keys if any
    arrDeleteKeys.forEach(
        (key) => data.hasOwnProperty(key) && delete data[key]
    )

    const mapArrResult = Object.entries(data)
        .reduce(
            // data-key, data-value
            (acc, [dataKey, val], index/* , arr */) => {
                let returnValue;

                // *String
                // ! why not just check if its a string
                if (!isArray(val) && !isObject(val)) {
                    // console.log('index: ', index, 'key: ', key, '----  String');
                    returnValue = val;
                }

                // *Array of Strings
                if (isArrayOfStrings(val)) { //"of strings"
                    /**
                        * FLOW:
                        * Check: if the key is defined for either concatenation or categorization operation
                        * Check: if the key is not defined in concatenation or categorization operation
                        * Concat the concat-keys' values
                        * Categorize the ctg-keys' values
                        */

                    returnValue = arraySummarize(arrConcatKeys, dataKey, arrCtgKeys, val, concatSeparator);

                }

                // *Array of Objects 
                if (isArrayOfObjects(val)) { //"of objects"
                    /**
                        * FLOW:
                        * Check: if the key is defined for categorization operation
                        * Check: if the focal key is present in all the object entries
                        * Return the each object with object[focalKey] in the array
                        */

                    // ObjectAndFocalKeys - a collection of keys-values where keys point to the properties of the data-object that are Objects and values point to the nested key to be pulled from that object.
                    returnValue = arrayOfObjectsSummarize(objectAndFocalKeySet, dataKey, val);
                }

                // *Array with zero length
                if (isEmptyArray(val)) {
                    returnValue = [];
                }

                // *Object 
                // TODO: review and add support for nested objects of strings/numbers
                if (isObject(val)) {
                    returnValue = val
                }

                // *Data key replacement
                const currentKeyReplacement = replaceKeysMap.get(dataKey)
                if (!!currentKeyReplacement) { dataKey = currentKeyReplacement }

                acc.push([dataKey, returnValue]);
                return acc;
            }, [])

    const result = Object.fromEntries(mapArrResult)
    return result

}
/**
 * 
 * @param  {} objectAndFocalKeySet  a collection of keys-values where keys point to the properties of the data-object that are Objects and values point to the nested key to be pulled from that object.
 * @example 
 * `{ 
 *      object1:keyA, 
 *      object2: keyB
 * }`
 * basically means that for array-of-object1, pull keyA from each object and for array-of-object2, pull keyB from each object
 * @param  {} dataKey - current key from the data-object. used to fetch focalKey for that "Array of Objects"
 * @param  {} val
 */

export function arrayOfObjectsSummarize(objectAndFocalKeySet, dataKey, val) {
    const focalNestedKey = objectAndFocalKeySet[dataKey];
    if (!focalNestedKey)
        throw new Error(`Define the focal-key for categorization of array-of-objects for data-key: "${dataKey}"`);

    if (focalNestedKey) {
        /**
             * Maps through an array of object and replaces each object with the value at object[focalKey]
             * @param  {} arrOfObj as follows
             * ```js
             * [
             *  {
             *      mainKey:1,
             *      otherKey1:23
             *  },
             *  {
             *      mainKey: {
             *          subMainKey:7
             *      },
             *      otherKey1:53,
             *      otherKey2:95
             *  }
             * ]
             * ```
             * @param  {} pullKey "mainKey"
             * @returns {[]} [1, {subMainKey: 7}]
             */
        function mapAndPullFrom(arrOfObj, pullKey) {
            return arrOfObj.map(
                (obj, idx) => {
                    const valueAgainstPullKey = obj[pullKey];
                    // if (isArray(valueAgainstPullKey) || isObject(valueAgainstPullKey)) throw new Error(`Deep nesting support not available currently for summarize function`)
                    if (!valueAgainstPullKey)
                        throw new Error(`Pull Key: [${pullKey}], is not present for data-object[${dataKey}][${idx}]`);
                    return valueAgainstPullKey;
                }
            );
        }

        const listOfNestedCtgKeyValues = mapAndPullFrom(val, focalNestedKey);
        return getItemFrequencyObject(listOfNestedCtgKeyValues);
    }
}

function arraySummarize(arrConcatKeys, dataKey, arrCtgKeys, val, concatSeparator) {

    // Checks
    if (arrConcatKeys.includes(dataKey) && arrCtgKeys.includes(dataKey))
        throw new Error('Array can either be concatenated or categorized. Not Both');

    if (!arrConcatKeys.includes(dataKey) && !arrCtgKeys.includes(dataKey))
        throw new Error(`Define the operation (concatenate/categorize) of array-of-strings (key: "${dataKey}")`);
    // Check if the values for concatenation are strings/numbers only otherwise return error
    // values for ctg can be anything

    // Logic
    // todo: key's value to concatenate
    if (arrConcatKeys.includes(dataKey)) {
        // const concatSeparator = arrConcatMap.get(key) || ', ';
        return concatStringsWith(val, concatSeparator);
    }

    // todo: key's value to categorize
    if (arrCtgKeys.includes(dataKey)) {
        return getItemFrequencyObject(val);
    }
}


function isString(val) {
    return checkDataType(val) === 'string'
}

function isNumber(val) {
    return checkDataType(val) === 'number'
}

function isArray(val) {
    return checkDataType(val) === 'array'
}

function isEmptyArray(val) {
    return checkDataType(val) === 'array' && val.length === 0
}

function isObject(val) {
    return checkDataType(val) === 'object'
}

function isArrayOfStrings(val) {
    if (isArray(val) && val.every(arrayItem => isString(arrayItem))) return true
    return false
}

function isArrayOfNumbers(val) {
    if (isArray(val) && val.every(arrayItem => isNumber(arrayItem))) return true
    return false
}
function isArrayOfObjects(val) {
    if (isArray(val) && val.every(arrayItem => isObject(arrayItem))) return true
    return false;
}


/**
 * De-Dupe an array of primary-data-types and map the frequency of all items to the item as key
 * @param  {[String]} items ['itemA', 'itemA', 'itemB', 'itemB', 'itemC']
 * @returns {{}} { itemA: 2, itemB: 2, itemC: 1 }
 */

function getItemFrequencyObject(items) {
    if (!isArrayOfStrings(items) && !isArrayOfNumbers(items)) throw new Error(`invalid input passed to getItemFrequencyObject. Input-Type: ${checkDataType(items)}`);
    if (!items.length) throw new Error('empty array');

    /**
     * checks each string-item and increments qty if already exists in prevStrObj otherwise create a new property of the string with 1 as value
     * @param  {{itemId: itemQty}} prevStrObj this is the object that will store each itemId as key and no. of iterations of the item as its value 
     * prevStrObj = {
     *    string1: string1Qty,
     *    string2: string2Qty,
     * }
     * @param  {} curStr the current string in the iteration cycle
     */
    function itemsReducer(oldFrequencyObject, curItem) {
        // FLOW
        /**
         * 1. Check: if NOT A PrimaryDataType => throw Error: "Only Primary Data-Type Items supported for 'getItemFrequencyObject'"
         * 2. find the frequency of current-string in the frequency-object; default to 0 if not found
         * 3. increment the current-string-frequency by 1 (for new item 0+1=1)
         * 4. return frequency-object
         */
        const oldFrequency = oldFrequencyObject[curItem] || 0;
        oldFrequencyObject[curItem] = oldFrequency + 1
        return oldFrequencyObject;
    }
    // reduces string to an object with each key mapped to a string and each value mapped to repetition in array 
    const finalFrequencyObject = items.reduce(itemsReducer, {});

    return finalFrequencyObject;

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

