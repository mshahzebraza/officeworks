

function isString(val) {
    return checkDataType(val) === 'string'
}
function isNumber(val) {
    return checkDataType(val) === 'number'
}
function isArray(val) {
    return checkDataType(val) === 'array'
}

function isArrayOfNumbers(val) {
    if (isArray(val) && val.every(arrayItem => isNumber(arrayItem))) return true
    return false
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
function isArrayOfStrings(val) {
    if (isArray(val) && val.every(arrayItem => isString(arrayItem))) return true
    return false
}

// const t = getItemFrequencyObject(['x', 'x', 't', 't', 'v'])
// console.log(t)

/**
 * reduces string to an object with each key mapped to a string and each value mapped to repetition in array 
 * @param  {[]} items - array of strings/primary-data-types
 */

function getItemFrequencyObject(items) {
    console.log(items)
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
         * 1. check if the curItem is a primaryDataType. If not throw Error: "Only Primary Data-Type Items supported for 'getItemFrequencyObject'"
         * 2. check if the current-string is already present in the passed previous-string-object
         * 3. If it is already present: increment the value against the string-key by 1
         * 4. Otherwise: create a new entry in previous-string-object with key: curStr and value: 1
         * 5. return previous-string-object
         */
        const oldFrequency = oldFrequencyObject[curItem] || 0;
        oldFrequencyObject[curItem] = oldFrequency + 1
        return oldFrequencyObject;
    }
    // reduces string to an object with each key mapped to a string and each value mapped to repetition in array 
    const frequencyObject = items.reduce(itemsReducer, {});

    console.log(frequencyObject)
    return frequencyObject;

}

handleAoO()
function handleAoO(
    val = [
        { main: 12, other: 14124 },
        { main: 1234, other: 95 },
        // { main: { x: 1 }, other: 95 }
    ]
) { //"of objects"
    /**
        * FLOW:
        * Check: if the key is defined for categorization operation
        * Check: if the focal key is present in all the object entries
        * Return the each object with object[focalKey] in the array
        */
    const dataKey = 'dummyDataKey'
    const objectAndFocalKeySet = { dummyDataKey: 'main' }

    // ObjectAndFocalKeys - a collection of keys-values where keys point to the properties of the data-object that are Objects and values point to the nested key to be pulled from that object.
    const focalNestedKey = objectAndFocalKeySet[dataKey];
    if (!focalNestedKey) throw new Error(`Define the focal-key for categorization of array-of-objects for data-key: "${dataKey}"`)

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
                    const valueAgainstPullKey = obj[pullKey]
                    // if (isArray(valueAgainstPullKey) || isObject(valueAgainstPullKey)) throw new Error(`Deep nesting support not available currently for summarize function`)
                    if (!valueAgainstPullKey) throw new Error(`Pull Key: [${pullKey}], is not present for data-object[${dataKey}][${idx}]`);
                    return valueAgainstPullKey
                }
            )
        }

        const listOfNestedCtgKeyValues = mapAndPullFrom(val, focalNestedKey)
        console.log(listOfNestedCtgKeyValues)
        const xtra = getItemFrequencyObject(listOfNestedCtgKeyValues);
        console.log(xtra)
    }

}
