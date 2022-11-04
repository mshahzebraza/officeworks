import { isArrayOfStrings, isArrayOfNumbers } from "./reusable";
import { checkDataType } from "./checkDataType";
import { checkArrType } from "./checkArrType";

/**
 * De-Dupe an array of primary-data-types and map the frequency of all items to the item as key
 * @param  {[String]} items ['itemA', 'itemA', 'itemB', 'itemB', 'itemC']
 * @returns {{}} { itemA: 2, itemB: 2, itemC: 1 }
 */
export function getItemFrequencyObject(items) {
    const typeOfArr = checkArrType(items);
    const notValidPrimaryType = typeOfArr !== 'string' && typeOfArr !== 'number'

    if (!typeOfArr || notValidPrimaryType) {
        const typeOfArrText = typeOfArr || 'different/invalid';
        throw new Error(`Invalid input passed to getItemFrequencyObject. 
        Input-Type: ${typeOfArrText}`);
    }
    if (!items.length)
        throw new Error('empty array');

    // reduces string to an object with each key mapped to a string and each value mapped to repetition in array 
    const finalFrequencyObject = items.reduce(itemsReducer, {});

    return finalFrequencyObject;

}



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
    oldFrequencyObject[curItem] = oldFrequency + 1;
    return oldFrequencyObject;
}