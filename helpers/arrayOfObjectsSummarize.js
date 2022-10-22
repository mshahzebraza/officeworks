import { mapAndPullFrom } from "./mapAndPullFrom";
import { getItemFrequencyObject } from "./getItemFrequencyObject";
import { checkArrType } from "./checkArrType";

/**
 * Summarizes an Array-of-Object in two steps.
 * 1. Replaces each Object in the toSummarize-Array with the Object[against] value.
 * 2.
 * Pulls out the a [focalKey] from each Object in the Array to
 * @param  {[object]} data - array of objects, each object of whose will be replaced by object[focalKey]
 * @param  {} pullKey - the key against which "Array of Objects" is to be summarized
 */
export function arrayOfObjectsSummarize({
    data, pullKey
}) {
    if (!pullKey) throw new Error(`focalKeyNotFound`);

    const listOfNestedCtgKeyValues = mapAndPullFrom(data, pullKey);
    const typeOfList = checkArrType(listOfNestedCtgKeyValues)

    if (!typeOfList) throw new Error(`Error Message: All values against the NestedKey are not of the same data-type.`);
    return getItemFrequencyObject(listOfNestedCtgKeyValues);
}
