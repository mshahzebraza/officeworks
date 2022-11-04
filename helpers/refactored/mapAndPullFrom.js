/**
  * Maps through an array of object and replaces each object with the value at object[pullKey]
  * @param  {[object]} mapTarget as follows
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
  *      otherKey2:95
  *  }
  * ]
  * ```
  * @param  {string} pullKey "mainKey"
  * @returns {[]} [1, {subMainKey: 7}]
  */
export function mapAndPullFrom(mapTarget, pullKey) {
    return mapTarget.map(
        (obj, idx) => {
            const valueAgainstPullKey = obj[pullKey];
            // if (isArray(valueAgainstPullKey) || isObject(valueAgainstPullKey)) throw new Error(`Deep nesting support not available currently for summarize function`)
            if (!valueAgainstPullKey)
                throw new Error(`Pull Key: [${pullKey}], is not present for data-object[${dataKey}][${idx}]`);
            return valueAgainstPullKey;
        }
    );
}
