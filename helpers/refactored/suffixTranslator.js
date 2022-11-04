import { range } from "./reusable";

// "01,005-007" - [1,5,6,7]  



export function suffixTranslator(
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
                return [...acc, parseInt(...curSplit)];

            } else if (curSplit.length === 2) {
                // contains series //// if the string contains a dash, then it is a series
                return [
                    ...acc,
                    ...range(
                        parseInt(curSplit[0]),
                        parseInt(curSplit[1]))
                ];

            } else if (curSplit.length > 2) {
                // Multiple seriesSymbols (-) found
                alert('Multiple seriesSymbols (-) found');
            }
        }, []
    );

    return result;
}
