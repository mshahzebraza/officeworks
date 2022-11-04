import { setDigits } from "./reusable";

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
        );
}
