import { getItemFrequencyObject } from "./getItemFrequencyObject";
import { concatStringsWith } from "./reusable";

export function arraySummarize(arrConcatKeys, dataKey, arrCtgKeys, val, concatSeparator) {

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
